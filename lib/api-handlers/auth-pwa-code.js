const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../redis");
/**
 * PWA-вход по Telegram username + одноразовому коду.
 * POST JSON:
 *  - { action: "request", username: "my_login" }
 *  - { action: "verify",  username: "my_login", code: "123456" }
 *
 * Доступ: @username должен быть в poker_app:visitor_usernames (бот/webhook после личного апдейта).
 * Отдельный заход в мини-приложение не требуется.
 */
const { signPwaSession } = require("../poker-pwa-session");
const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { isGazettePlannerEditor } = require("../gazette-planner-access");
const { isAdmin, isAdminUsername } = require("../api-auth");
const { ensureDtIdForUserId } = require("../account-id");
const { hasAccountPassword, setAccountPassword, verifyAccountPassword } = require("../account-password");

const BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN ||
  process.env.TELEGRAM_TOKEN ||
  process.env.BOT_TOKEN ||
  "";

const USERNAMES_KEY = "poker_app:visitor_usernames";
const CODE_KEY_PREFIX = "poker_app:pwa_login_code:";

function normalizeUsername(raw) {
  const u = String(raw || "")
    .trim()
    .replace(/^@+/, "")
    .toLowerCase();
  if (!/^[a-z0-9_]{5,32}$/.test(u)) return "";
  return u;
}

function usernameFromIdentity(identity) {
  if (!identity) return "";
  return normalizeUsername(identity.telegramUsername || identity.pwaUsername || "");
}

function usernameMatchesIdentity(identity, username) {
  const identityUsername = usernameFromIdentity(identity);
  return !!identityUsername && identityUsername === username;
}

async function findTgUserIdsByUsername(username) {
  const res = await redisPipeline([["HGETALL", USERNAMES_KEY]]);
  const raw = res && res[0] && res[0].result;
  const ids = [];
  if (Array.isArray(raw)) {
    for (let i = 0; i < raw.length; i += 2) {
      const key = raw[i] != null ? String(raw[i]) : "";
      const val = raw[i + 1] != null ? String(raw[i + 1]).trim().toLowerCase() : "";
      if (key.startsWith("tg_") && val === username) ids.push(key);
    }
  } else if (typeof raw === "object") {
    for (const key of Object.keys(raw)) {
      const val = raw[key] != null ? String(raw[key]).trim().toLowerCase() : "";
      if (String(key).startsWith("tg_") && val === username) ids.push(String(key));
    }
  }
  return Array.from(new Set(ids));
}

async function pruneDuplicateUsernameMappings(username, preferredUserId) {
  if (!username || !preferredUserId) return;
  const matches = await findTgUserIdsByUsername(username);
  const commands = matches
    .filter((id) => id !== preferredUserId)
    .map((id) => ["HDEL", USERNAMES_KEY, id]);
  commands.push(["HSET", USERNAMES_KEY, preferredUserId, username]);
  await redisPipeline(commands);
}

async function resolveCodeUserId(req, body, username) {
  const identity = resolveTelegramIdentity(req, body, BOT_TOKEN);
  const identityUserId = memberIdFromIdentity(identity);
  if (identityUserId && String(identityUserId).startsWith("tg_") && usernameMatchesIdentity(identity, username)) {
    await pruneDuplicateUsernameMappings(username, identityUserId);
    return { ok: true, userId: identityUserId };
  }

  const matches = await findTgUserIdsByUsername(username);
  if (matches.length === 1) return { ok: true, userId: matches[0] };
  if (matches.length > 1) {
    return {
      ok: false,
      status: 409,
      error:
        "Для этого @username найдено несколько старых привязок. Откройте бота с нужного Telegram-аккаунта, отправьте /start и повторите получение кода.",
    };
  }
  return {
    ok: false,
    status: 404,
    error:
      "Этот @username ещё не привязан. Напишите боту в личку (например /start), подождите несколько секунд и снова нажмите «Получить код».",
  };
}

/**
 * @returns {{ ok: true } | { ok: false, userMessage: string }}
 */
async function sendTelegramCode(tgNumericId, code) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const text =
    "Ваш код входа в TWO ACES PWA: " +
    code +
    "\n\nКод действует 10 минут.\nНикому его не сообщайте.";
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: String(tgNumericId),
        text: text,
        disable_web_page_preview: true,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (data && data.ok) return { ok: true };
    const desc = data && data.description != null ? String(data.description) : "";
    const codeErr = data && data.error_code != null ? Number(data.error_code) : 0;
    try {
      console.error("auth-pwa-code: sendMessage failed", { tgNumericId, codeErr, desc: desc.slice(0, 200) });
    } catch (eLog) {}
    const d = desc.toLowerCase();
    let userMessage = "Не удалось отправить код в Telegram. Откройте бота клуба и отправьте /start, затем нажмите «Получить код» снова.";
    if (codeErr === 403 || d.indexOf("blocked") !== -1 || d.indexOf("bot was blocked") !== -1) {
      userMessage = "Бот заблокирован или чат недоступен. Разблокируйте бота в Telegram и отправьте /start.";
    } else if (d.indexOf("chat not found") !== -1 || d.indexOf("user is deactivated") !== -1) {
      userMessage = "Чат с ботом не найден. Откройте бота и отправьте /start.";
    } else if (d.indexOf("too many requests") !== -1 || codeErr === 429) {
      userMessage = "Слишком частые запросы. Подождите минуту и попробуйте снова.";
    }
    return { ok: false, userMessage };
  } catch (e) {
    return { ok: false, userMessage: "Сеть или Telegram недоступны. Попробуйте позже." };
  }
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });

  if (!BOT_TOKEN || !redisConfigured()) {
    return res.status(500).json({ ok: false, error: "Сервер не настроен" });
  }

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  } catch (e) {
    return res.status(400).json({ ok: false, error: "Invalid JSON" });
  }

  const action = String(body.action || "").trim().toLowerCase();
  const username = normalizeUsername(body.username);
  const password = String(body.password || "");
  if (!username) {
    return res.status(400).json({ ok: false, error: "Укажите корректный Telegram username (5-32, латиница/цифры/_)." });
  }

  const resolvedUser = await resolveCodeUserId(req, body, username);
  if (!resolvedUser.ok) {
    return res.status(resolvedUser.status || 400).json({ ok: false, error: resolvedUser.error });
  }
  const userId = resolvedUser.userId;

  const codeKey = CODE_KEY_PREFIX + username;
  const dtId = await ensureDtIdForUserId(userId);
  if (!dtId) {
    return res.status(500).json({ ok: false, error: "Не удалось подготовить ID аккаунта." });
  }
  if (action === "request") {
    const code = String(Math.floor(100000 + Math.random() * 900000));
    const save = await redisPipeline([["SETEX", codeKey, "600", JSON.stringify({ userId, username, code })]]);
    if (!save || (save[0] && save[0].error)) {
      return res.status(503).json({ ok: false, error: "Сервис временно недоступен. Попробуйте позже." });
    }
    const tgNumericId = String(userId).replace(/^tg_/, "");
    const sent = await sendTelegramCode(tgNumericId, code);
    if (!sent || !sent.ok) {
      const msg =
        sent && sent.userMessage
          ? sent.userMessage
          : "Не удалось отправить код. Откройте бота и отправьте /start.";
      return res.status(502).json({ ok: false, error: msg });
    }
    return res.status(200).json({ ok: true, sent: true });
  }

  if (action === "login") {
    const hasPassword = await hasAccountPassword(dtId);
    if (!hasPassword) {
      return res.status(400).json({ ok: false, error: "Для этого аккаунта пароль ещё не установлен. Получите код в Telegram и задайте пароль.", passwordSetupRequired: true });
    }
    const verified = await verifyAccountPassword(dtId, password);
    if (!verified.ok) {
      const statusCode = verified.error === "PASSWORD_NOT_SET" ? 400 : 401;
      return res.status(statusCode).json({ ok: false, error: verified.error === "PASSWORD_NOT_SET" ? "Для этого аккаунта пароль ещё не установлен. Получите код в Telegram и задайте пароль." : verified.error, passwordSetupRequired: verified.error === "PASSWORD_NOT_SET" });
    }
    const tgIdNum = Number(String(userId).replace(/^tg_/, ""));
    const gazettePlannerAccess = isGazettePlannerEditor({
      id: tgIdNum,
      telegramUsername: username,
      pwaUsername: null,
    });
    const adminAccess = isAdmin(userId) || isAdminUsername(username);
    const pwaSession = signPwaSession({ id: tgIdNum, memberId: userId, username: username, adminAccess }, BOT_TOKEN);
    return res.status(200).json({
      ok: true,
      dtId,
      gazettePlannerAccess,
      adminAccess,
      pwaSession,
      user: {
        id: tgIdNum,
        memberId: userId,
        username: username,
        first_name: "",
        last_name: "",
        photo_url: "",
        language_code: "",
        is_premium: false,
      },
    });
  }

  if (action === "verify") {
    const code = String(body.code || "").trim();
    if (!/^\d{6}$/.test(code)) {
      return res.status(400).json({ ok: false, error: "Введите 6-значный код." });
    }
    const get = await redisPipeline([["GET", codeKey]]);
    const raw = get && get[0] && get[0].result;
    if (!raw) {
      return res.status(400).json({ ok: false, error: "Код истёк. Запросите новый." });
    }
    let saved = null;
    try {
      saved = JSON.parse(String(raw));
    } catch (e) {}
    if (!saved || saved.code !== code || saved.userId !== userId) {
      return res.status(401).json({ ok: false, error: "Неверный код." });
    }
    const passwordSaved = await setAccountPassword(dtId, password);
    if (!passwordSaved.ok) {
      return res.status(400).json({ ok: false, error: passwordSaved.error });
    }

    const tgIdNum = Number(String(userId).replace(/^tg_/, ""));
    await redisPipeline([["DEL", codeKey]]);

    const gazettePlannerAccess = isGazettePlannerEditor({
      id: tgIdNum,
      telegramUsername: username,
      pwaUsername: null,
    });
    const adminAccess = isAdmin(userId) || isAdminUsername(username);
    const pwaSession = signPwaSession({ id: tgIdNum, memberId: userId, username: username, adminAccess }, BOT_TOKEN);

    return res.status(200).json({
      ok: true,
      gazettePlannerAccess,
      adminAccess,
      pwaSession,
      user: {
        id: tgIdNum,
        username: username,
        first_name: "",
        last_name: "",
        photo_url: "",
        language_code: "",
        is_premium: false,
      },
    });
  }

  return res.status(400).json({ ok: false, error: "action: request | verify" });
};

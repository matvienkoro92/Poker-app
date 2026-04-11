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

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN ||
  process.env.TELEGRAM_TOKEN ||
  process.env.BOT_TOKEN ||
  "";

const USERNAMES_KEY = "poker_app:visitor_usernames";
const CODE_KEY_PREFIX = "poker_app:pwa_login_code:";

async function redisPipeline(commands) {
  if (!REDIS_URL || !REDIS_TOKEN) return null;
  try {
    const base = String(REDIS_URL).replace(/\/$/, "");
    const res = await fetch(base + "/pipeline", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${REDIS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commands),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

function normalizeUsername(raw) {
  const u = String(raw || "")
    .trim()
    .replace(/^@+/, "")
    .toLowerCase();
  if (!/^[a-z0-9_]{5,32}$/.test(u)) return "";
  return u;
}

async function findTgUserIdByUsername(username) {
  const res = await redisPipeline([["HGETALL", USERNAMES_KEY]]);
  const raw = res && res[0] && res[0].result;
  if (!raw) return null;
  if (Array.isArray(raw)) {
    for (let i = 0; i < raw.length; i += 2) {
      const key = raw[i] != null ? String(raw[i]) : "";
      const val = raw[i + 1] != null ? String(raw[i + 1]).trim().toLowerCase() : "";
      if (key.startsWith("tg_") && val === username) return key;
    }
  } else if (typeof raw === "object") {
    for (const key of Object.keys(raw)) {
      const val = raw[key] != null ? String(raw[key]).trim().toLowerCase() : "";
      if (String(key).startsWith("tg_") && val === username) return String(key);
    }
  }
  return null;
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

  if (!BOT_TOKEN || !REDIS_URL || !REDIS_TOKEN) {
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
  if (!username) {
    return res.status(400).json({ ok: false, error: "Укажите корректный Telegram username (5-32, латиница/цифры/_)." });
  }

  const userId = await findTgUserIdByUsername(username);
  if (!userId) {
    return res.status(404).json({
      ok: false,
      error:
        "Этот @username ещё не привязан. Напишите боту в личку (например /start), подождите несколько секунд и снова нажмите «Получить код».",
    });
  }

  const codeKey = CODE_KEY_PREFIX + username;
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

    const tgIdNum = Number(String(userId).replace(/^tg_/, ""));
    const pwaSession = signPwaSession({ id: tgIdNum, username: username }, BOT_TOKEN, 60 * 60 * 24 * 30);
    await redisPipeline([["DEL", codeKey]]);

    return res.status(200).json({
      ok: true,
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


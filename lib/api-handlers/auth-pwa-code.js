/**
 * PWA-вход по Telegram username + одноразовому коду.
 * POST JSON:
 *  - { action: "request", username: "my_login" }
 *  - { action: "verify",  username: "my_login", code: "123456" }
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
const VISITORS_KEY = "poker_app:visitors";
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
    return !!(res.ok && data && data.ok);
  } catch (e) {
    return false;
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
        "Такой @username не сопоставлен с участником клуба в базе.\n\n" +
        "Обычно это значит, что вы ещё не открывали мини-приложение TWO ACES в Telegram после того, как задали этот @username, либо недавно сменили ник — зайдите в мини-приложение в Telegram ещё раз (одного захода достаточно, чтобы ник сохранился).\n\n" +
        "Проверьте, что в настройках профиля Telegram указан именно этот @username (латиница, без опечаток). Если @username скрыт настройками приватности, мини-приложение может не передать его в клуб — сделайте ник видимым или откройте мини-приложение после смены настроек.\n\n" +
        "Либо напишите боту клуба в личку /start или любое сообщение: сервер сохранит ваш @username из Telegram для входа в PWA (нужен настроенный webhook бота).",
    });
  }

  const memberCheck = await redisPipeline([["SISMEMBER", VISITORS_KEY, userId]]);
  const isClubMember = memberCheck && memberCheck[0] && Number(memberCheck[0].result) === 1;
  if (!isClubMember) {
    return res.status(403).json({ ok: false, error: "Доступ только для участников клуба." });
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
    if (!sent) {
      return res.status(502).json({ ok: false, error: "Не удалось отправить код. Проверьте, что вы писали боту клуба." });
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


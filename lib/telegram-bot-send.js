/**
 * Единая отправка в Telegram Bot API (как в FootySquad handoff): прямой POST sendMessage,
 * опционально reply_markup.inline_keyboard с url-кнопкой.
 *
 * URL кнопки: TELEGRAM_MINI_APP_LINK (если https://t.me/… или http), иначе MINI_APP_URL / WEBAPP_URL / APP_URL / fallback.
 */
"use strict";

/**
 * @param {string} [fallbackUrl] — например deep link на чат
 * @returns {string}
 */
function resolveTelegramOpenButtonUrl(fallbackUrl) {
  const primary = String(process.env.TELEGRAM_MINI_APP_LINK || "").trim();
  if (primary.startsWith("https://t.me/") || primary.startsWith("http")) return primary;
  const chain = [
    process.env.MINI_APP_URL,
    process.env.WEBAPP_URL,
    process.env.APP_URL,
    fallbackUrl,
  ];
  for (let i = 0; i < chain.length; i++) {
    const s = String(chain[i] || "").trim();
    if (s.startsWith("http")) return s;
  }
  return String(fallbackUrl || "").trim();
}

/**
 * @param {object} opts
 * @param {string|number} opts.chatId
 * @param {string} opts.text
 * @param {string} [opts.buttonText]
 * @param {string} [opts.buttonUrl] — должен начинаться с http для кнопки
 * @param {boolean} [opts.disableWebPagePreview=true]
 * @param {number} [opts.maxText=4090]
 * @returns {Record<string, unknown>}
 */
function buildSendMessagePayload(opts) {
  const text = String(opts.text || "").slice(0, opts.maxText != null ? opts.maxText : 4090);
  const payload = {
    chat_id: opts.chatId,
    text,
    disable_web_page_preview: opts.disableWebPagePreview !== false,
  };
  const bt = opts.buttonText != null ? String(opts.buttonText).trim() : "";
  let url = opts.buttonUrl != null ? String(opts.buttonUrl).trim() : "";
  if (bt && url && url.startsWith("http")) {
    payload.reply_markup = {
      inline_keyboard: [[{ text: bt.slice(0, 64), url: url.slice(0, 512) }]],
    };
  }
  return payload;
}

/**
 * @param {string} botToken
 * @param {object} opts — как у buildSendMessagePayload
 * @returns {Promise<{ ok: boolean, hint?: string, error_code?: number }>}
 */
async function sendTelegramMessage(botToken, opts) {
  if (!botToken || !opts || opts.chatId == null || opts.chatId === "") {
    return { ok: false, hint: "bad_args" };
  }
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildSendMessagePayload(opts)),
    });
    const data = await res.json().catch(() => ({}));
    if (data && data.ok) return { ok: true };
    const desc = (data && data.description) || res.statusText || "unknown";
    if (typeof desc === "string" && (desc.indexOf("can't initiate") !== -1 || desc.indexOf("blocked") !== -1)) {
      return { ok: false, hint: "user_blocked", error_code: data.error_code };
    }
    return { ok: false, hint: desc, error_code: data.error_code };
  } catch (e) {
    return { ok: false, hint: e && e.message ? String(e.message) : "fetch_error" };
  }
}

module.exports = {
  resolveTelegramOpenButtonUrl,
  buildSendMessagePayload,
  sendTelegramMessage,
};

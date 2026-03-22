/**
 * Единая идентификация: Mini App (initData), PWA Telegram (pwaSession) или PWA ВКонтакте (pwaVkSession).
 */
const crypto = require("crypto");
const { verifyPwaSessionToken } = require("./poker-pwa-session");
const { verifyPwaVkSessionToken } = require("./poker-pwa-vk-session");

function validateMiniAppInitData(initData, botToken) {
  if (!initData || !botToken) return null;
  try {
    const params = new URLSearchParams(initData);
    const hash = params.get("hash");
    params.delete("hash");
    const dataCheckString = [...params.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}=${v}`)
      .join("\n");
    const secretKey = crypto.createHmac("sha256", "WebAppData").update(botToken).digest();
    const calculatedHash = crypto.createHmac("sha256", secretKey).update(dataCheckString).digest("hex");
    if (calculatedHash !== hash) return null;
    const user = JSON.parse(params.get("user") || "{}");
    if (!user.id) return null;
    return {
      id: user.id,
      first_name: typeof user.first_name === "string" ? user.first_name.trim() : "",
      last_name: typeof user.last_name === "string" ? user.last_name.trim() : "",
      username: typeof user.username === "string" ? user.username.replace(/^@+/, "").trim() : "",
    };
  } catch (e) {
    return null;
  }
}

/**
 * @param {import('http').IncomingMessage} req
 * @param {object} body - уже распарсенный body (или {})
 * @returns {{ id: number, rawInitData: string|null, pwaUsername: string|null, firstName: string, lastName: string, telegramUsername: string }|null}
 */
function resolveTelegramIdentity(req, body, botToken) {
  const q = req.query || {};
  const b = body || {};
  const initData = q.initData || q.init_data || b.initData || b.init_data || "";
  if (initData) {
    const u = validateMiniAppInitData(String(initData), botToken);
    if (u) {
      return {
        id: u.id,
        rawInitData: String(initData),
        pwaUsername: null,
        firstName: u.first_name || "",
        lastName: u.last_name || "",
        telegramUsername: u.username || "",
      };
    }
  }
  const pwaSession = q.pwaSession || q.pwa_session || b.pwaSession || b.pwa_session || "";
  const pv = verifyPwaSessionToken(String(pwaSession), botToken);
  if (pv && pv.id != null) {
    const un = (pv.username || "").replace(/^@+/, "").trim();
    return {
      id: pv.id,
      rawInitData: null,
      pwaUsername: un || null,
      firstName: "",
      lastName: "",
      telegramUsername: "",
    };
  }
  const pwaVk =
    q.pwaVkSession || q.pwa_vk_session || b.pwaVkSession || b.pwa_vk_session || "";
  const vk = verifyPwaVkSessionToken(String(pwaVk));
  if (vk && vk.vkId != null) {
    const dm = (vk.domain || "").replace(/^@+/, "").trim();
    return {
      id: vk.vkId,
      rawInitData: null,
      pwaUsername: dm || null,
      firstName: vk.firstName || "",
      lastName: vk.lastName || "",
      telegramUsername: "",
      vkId: vk.vkId,
      photoUrl: vk.photo_url || "",
    };
  }
  return null;
}

/** Внутренний id для Redis/чата: tg_… или vk_… */
function memberIdFromIdentity(identity) {
  if (!identity) return null;
  if (identity.vkId != null) return "vk_" + String(identity.vkId);
  if (identity.id == null || identity.id === "") return null;
  return "tg_" + String(identity.id);
}

module.exports = { validateMiniAppInitData, resolveTelegramIdentity, memberIdFromIdentity };

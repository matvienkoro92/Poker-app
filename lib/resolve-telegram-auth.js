/**
 * Единая идентификация: Mini App (initData) или PWA (pwaSession после Login Widget).
 */
const crypto = require("crypto");
const { verifyPwaSessionToken } = require("./poker-pwa-session");

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
    return user.id ? { id: user.id } : null;
  } catch (e) {
    return null;
  }
}

/**
 * @param {import('http').IncomingMessage} req
 * @param {object} body - уже распарсенный body (или {})
 * @returns {{ id: number, rawInitData: string|null, pwaUsername: string|null }|null}
 */
function resolveTelegramIdentity(req, body, botToken) {
  const q = req.query || {};
  const b = body || {};
  const initData = q.initData || q.init_data || b.initData || b.init_data || "";
  if (initData) {
    const u = validateMiniAppInitData(String(initData), botToken);
    if (u) return { id: u.id, rawInitData: String(initData), pwaUsername: null };
  }
  const pwaSession = q.pwaSession || q.pwa_session || b.pwaSession || b.pwa_session || "";
  const pv = verifyPwaSessionToken(String(pwaSession), botToken);
  if (pv && pv.id != null) return { id: pv.id, rawInitData: null, pwaUsername: pv.username || null };
  return null;
}

module.exports = { validateMiniAppInitData, resolveTelegramIdentity };

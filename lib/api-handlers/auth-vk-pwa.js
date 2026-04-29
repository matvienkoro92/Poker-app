/**
 * PWA: OAuth VK — обмен authorization code на access_token, профиль users.get, выдача pwaVkSession.
 *
 * Env: VK_APP_ID (или VK_CLIENT_ID), VK_CLIENT_SECRET (или VK_SECURE_KEY).
 * POST JSON: { code: string, redirect_uri: string } — redirect_uri должен совпадать с запросом /authorize.
 */
const { signPwaVkSession } = require("../poker-pwa-vk-session");

const VK_APP_ID = process.env.VK_APP_ID || process.env.VK_CLIENT_ID || "";
const VK_CLIENT_SECRET = process.env.VK_CLIENT_SECRET || process.env.VK_SECURE_KEY || "";

async function vkExchangeCode(code, redirectUri) {
  const params = new URLSearchParams({
    client_id: String(VK_APP_ID),
    client_secret: String(VK_CLIENT_SECRET),
    redirect_uri: redirectUri,
    code: String(code),
  });
  const url = "https://oauth.vk.com/access_token?" + params.toString();
  const res = await fetch(url);
  const j = await res.json().catch(() => ({}));
  if (!res.ok || j.error || !j.access_token || j.user_id == null) {
    const err = j.error_description || j.error || "oauth_failed";
    return { ok: false, error: String(err) };
  }
  return { ok: true, access_token: j.access_token, user_id: Number(j.user_id) };
}

async function vkUsersGet(accessToken, userId) {
  const u = new URL("https://api.vk.com/method/users.get");
  u.searchParams.set("user_ids", String(userId));
  u.searchParams.set("fields", "photo_200,domain,screen_name");
  u.searchParams.set("access_token", accessToken);
  u.searchParams.set("v", "5.199");
  const res = await fetch(u.toString());
  const j = await res.json().catch(() => ({}));
  const row = j && j.response && j.response[0];
  if (!row || row.id == null) return null;
  const domain = row.screen_name || row.domain || "";
  const photo =
    row.photo_200 ||
    row.photo_100 ||
    row.photo_50 ||
    "";
  return {
    vkId: Number(row.id),
    first_name: row.first_name != null ? String(row.first_name) : "",
    last_name: row.last_name != null ? String(row.last_name) : "",
    domain,
    photo_url: photo ? String(photo) : "",
  };
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });

  if (!VK_APP_ID || !VK_CLIENT_SECRET) {
    return res.status(500).json({ ok: false, error: "VK не настроен (VK_APP_ID, VK_CLIENT_SECRET)" });
  }

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  } catch (e) {
    return res.status(400).json({ ok: false, error: "Invalid JSON" });
  }

  const code = body.code != null ? String(body.code).trim() : "";
  const redirectUri = body.redirect_uri != null ? String(body.redirect_uri).trim() : "";
  if (!code || !redirectUri) {
    return res.status(400).json({ ok: false, error: "Нужны code и redirect_uri" });
  }

  const ex = await vkExchangeCode(code, redirectUri);
  if (!ex.ok) return res.status(401).json({ ok: false, error: ex.error || "VK OAuth" });

  const prof = await vkUsersGet(ex.access_token, ex.user_id);
  if (!prof || !prof.vkId) {
    return res.status(502).json({ ok: false, error: "Не удалось получить профиль VK" });
  }

  const pwaVkSession = signPwaVkSession(
    {
      vkId: prof.vkId,
      first_name: prof.first_name,
      last_name: prof.last_name,
      domain: prof.domain,
      photo_url: prof.photo_url,
    }
  );
  if (!pwaVkSession) {
    return res.status(500).json({ ok: false, error: "Не удалось выдать сессию" });
  }

  return res.status(200).json({
    ok: true,
    pwaVkSession,
    user: {
      id: prof.vkId,
      first_name: prof.first_name,
      last_name: prof.last_name,
      username: prof.domain || "",
      photo_url: prof.photo_url || "",
      vk: true,
    },
  });
};

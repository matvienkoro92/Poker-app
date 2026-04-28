/**
 * Twitch viewers counter.
 * Env: TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET, TWITCH_CHANNEL_LOGIN/TWITCH_LOGIN/TWITCH_CHANNEL.
 */
const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID || "";
const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET || "";
const TWITCH_CHANNEL_LOGIN =
  process.env.TWITCH_CHANNEL_LOGIN || process.env.TWITCH_LOGIN || process.env.TWITCH_CHANNEL || "";

async function getAppAccessToken() {
  const params = new URLSearchParams({
    client_id: TWITCH_CLIENT_ID,
    client_secret: TWITCH_CLIENT_SECRET,
    grant_type: "client_credentials",
  });
  const res = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });
  if (!res.ok) throw new Error("token_" + res.status);
  const data = await res.json();
  return data && data.access_token ? String(data.access_token) : "";
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ ok: false, error: "GET only" });

  const login = String(req.query.login || req.query.channel || TWITCH_CHANNEL_LOGIN || "")
    .trim()
    .replace(/^@/, "")
    .toLowerCase();
  if (!TWITCH_CLIENT_ID || !TWITCH_CLIENT_SECRET || !login) {
    return res.status(200).json({ ok: false, configured: false, error: "not_configured", viewers: 0, live: false });
  }

  try {
    const token = await getAppAccessToken();
    if (!token) throw new Error("empty_token");
    const url = "https://api.twitch.tv/helix/streams?user_login=" + encodeURIComponent(login);
    const streamRes = await fetch(url, {
      headers: {
        "Client-ID": TWITCH_CLIENT_ID,
        Authorization: "Bearer " + token,
      },
    });
    if (!streamRes.ok) throw new Error("streams_" + streamRes.status);
    const data = await streamRes.json();
    const stream = data && Array.isArray(data.data) && data.data.length ? data.data[0] : null;
    const viewers = stream && Number.isFinite(Number(stream.viewer_count)) ? Number(stream.viewer_count) : 0;
    return res.status(200).json({
      ok: true,
      configured: true,
      channel: login,
      live: !!stream,
      viewers,
      title: stream && stream.title ? stream.title : "",
      gameName: stream && stream.game_name ? stream.game_name : "",
      startedAt: stream && stream.started_at ? stream.started_at : "",
    });
  } catch (e) {
    return res.status(502).json({
      ok: false,
      configured: true,
      channel: login,
      live: false,
      viewers: 0,
      error: e && e.message ? e.message : "twitch_error",
    });
  }
};

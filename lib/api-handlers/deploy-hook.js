/**
 * Вызов после деплоя: загружает задеплоенный сайт, достаёт версию газеты и заголовок
 * первой новости, вызывает /api/gazette-notify и /api/rating-notify. Подписчики газеты
 * и рейтинга получают по одному сообщению после пуша (по одному разу на версию).
 *
 * GET/POST с secret=CRON_SECRET или заголовок X-Cron-Secret.
 * Переменные: CRON_SECRET, VERCEL_URL или APP_URL (базовый URL приложения).
 */
const CRON_SECRET = process.env.CRON_SECRET;
const READY_TIMEOUT_MS = 45000;
const READY_RETRY_MS = 2000;

function getBaseUrl() {
  const vercel = process.env.VERCEL_URL;
  if (vercel) return "https://" + vercel.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const app = process.env.APP_URL || process.env.MINI_APP_URL;
  if (app) return app.replace(/\/$/, "");
  return null;
}

function parseGazetteVersion(jsContent) {
  const m = (jsContent || "").match(/GAZETTE_VERSION\s*=\s*["']([^"']+)["']/);
  return m ? m[1].trim() : null;
}

function parseFirstNewsFromHtml(html) {
  const str = html || "";
  const articleMatch = str.match(/data-gazette-article="(\d+)"[\s\S]*?gazette-modal__headline[^>]*>([^<]+)</);
  if (!articleMatch) return { articleIndex: 0, headline: "" };
  const articleIndex = parseInt(articleMatch[1], 10);
  const headline = articleMatch[2].replace(/\s+/g, " ").trim();
  return { articleIndex: Number.isNaN(articleIndex) ? 0 : articleIndex, headline };
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchTextFresh(url) {
  const res = await fetch(url + (url.includes("?") ? "&" : "?") + "_deployHookTs=" + Date.now(), {
    cache: "no-store",
    headers: { "Cache-Control": "no-cache, no-store" },
  });
  if (!res.ok) throw new Error("HTTP " + res.status + " for " + url);
  return res.text();
}

async function waitForReadyDeploy(base) {
  const startedAt = Date.now();
  let lastError = "";
  while (Date.now() - startedAt < READY_TIMEOUT_MS) {
    try {
      const [appJs, indexHtml] = await Promise.all([
        fetchTextFresh(base + "/app.js"),
        fetchTextFresh(base + "/index.html"),
      ]);
      if (appJs && indexHtml) {
        return { appJs, indexHtml, waitedMs: Date.now() - startedAt };
      }
      lastError = "empty deploy assets";
    } catch (e) {
      lastError = e && e.message ? e.message : String(e || "unknown");
    }
    await wait(READY_RETRY_MS);
  }
  throw new Error("Deploy is not ready: " + lastError);
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Cron-Secret");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const auth =
    (req.headers && req.headers["x-cron-secret"]) ||
    (req.query && req.query.secret) ||
    ((req.headers && req.headers.authorization) || "").replace(/^Bearer\s+/i, "");
  if (!CRON_SECRET || auth !== CRON_SECRET) {
    return res.status(403).json({ ok: false, error: "Invalid or missing CRON_SECRET" });
  }

  const base = getBaseUrl();
  if (!base) {
    return res.status(500).json({ ok: false, error: "VERCEL_URL or APP_URL not set" });
  }

  let appJs = "";
  let indexHtml = "";
  let readyWaitedMs = 0;
  try {
    const ready = await waitForReadyDeploy(base);
    appJs = ready.appJs;
    indexHtml = ready.indexHtml;
    readyWaitedMs = ready.waitedMs;
  } catch (e) {
    return res.status(502).json({ ok: false, error: "Failed to fetch site: " + (e.message || "unknown") });
  }

  const version = parseGazetteVersion(appJs);
  const { articleIndex, headline } = parseFirstNewsFromHtml(indexHtml);
  const newsId = version || "deploy-" + Date.now();

  const notifyUrl = base + "/api/gazette-notify";
  const body = JSON.stringify({
    newsId,
    headline: headline || "Новая новость в газете",
    articleIndex,
    postToChat: true,
  });

  let notifyResult;
  try {
    const notifyRes = await fetch(notifyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Cron-Secret": CRON_SECRET,
      },
      body,
    });
    notifyResult = await notifyRes.json().catch(() => ({ ok: false, error: "Invalid response" }));
  } catch (e) {
    return res.status(502).json({
      ok: false,
      error: "Failed to call gazette-notify: " + (e.message || "unknown"),
    });
  }

  const ratingId = version || "deploy-" + Date.now();
  const ratingNotifyUrl = base + "/api/rating-notify";
  let ratingNotifyResult = { ok: false, skipped: true };
  try {
    const ratingRes = await fetch(ratingNotifyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Cron-Secret": CRON_SECRET,
      },
      body: JSON.stringify({ ratingId }),
    });
    ratingNotifyResult = await ratingRes.json().catch(() => ({ ok: false, error: "Invalid response" }));
  } catch (e) {
    ratingNotifyResult = { ok: false, error: (e.message || "unknown") };
  }

  return res.status(200).json({
    ok: true,
    deployHook: true,
    newsId,
    headline: headline || null,
    articleIndex,
    readyWaitedMs,
    notify: notifyResult,
    ratingNotify: ratingNotifyResult,
  });
};

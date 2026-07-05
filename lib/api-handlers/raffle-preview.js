const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../redis");
const { normalizeReferralAccountId, splitReferralStartParam } = require("../referrals");

const RAFFLE_IDS_KEY = "poker_app:raffle_ids";
const RAFFLE_PREFIX = "poker_app:raffle:";

function htmlEscape(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function normalizeRaffleCode(raw) {
  let s = String(raw || "").trim();
  if (!s) return "";
  try {
    s = decodeURIComponent(s.replace(/\+/g, " "));
  } catch (e) {}
  s = s.trim();
  const startMatch = s.match(/^startapp=([^&]+)$/i);
  if (startMatch && startMatch[1]) s = startMatch[1].trim();
  const referralSplit = splitReferralStartParam(s);
  if (referralSplit && referralSplit.routeStartParam) s = referralSplit.routeStartParam;
  const raffleMatch = s.match(/^r_(.+)$/i) || s.match(/^raffle_active_(.+)$/i);
  if (raffleMatch && raffleMatch[1]) s = raffleMatch[1].trim();
  return s.replace(/[^A-Za-z0-9_-]/g, "_").slice(0, 72);
}

function referralIdFromRequest(q, url) {
  const direct = normalizeReferralAccountId(
    (q && (q.ref || q.referrer || q.referrerId || q.referrer_id)) ||
      url.searchParams.get("ref") ||
      url.searchParams.get("referrer") ||
      ""
  );
  if (direct) return direct;
  const rawStart =
    (q && (q.startapp || q.startParam || q.start_param)) ||
    url.searchParams.get("startapp") ||
    url.searchParams.get("startParam") ||
    url.searchParams.get("start_param") ||
    "";
  const split = splitReferralStartParam(rawStart);
  return split && split.referrerId ? normalizeReferralAccountId(split.referrerId) : "";
}

function raffleShortCode(raw) {
  const id = normalizeRaffleCode(raw);
  const match = id.match(/^raffle_\d+_([A-Za-z0-9_-]+)$/);
  return match && match[1] ? match[1] : id;
}

function raffleCodeMatches(raffle, code) {
  const target = normalizeRaffleCode(code);
  if (!raffle || !target) return false;
  const id = String(raffle.id || "").trim();
  const number = parseInt(String(raffle.shareNumber || raffle.activeShareNumber || ""), 10);
  if (/^\d+$/.test(target) && Number.isFinite(number) && number > 0 && String(number) === target) return true;
  return id === target || raffleShortCode(id) === target;
}

function isTournamentDayRaffle(raffle) {
  if (!raffle) return false;
  const title = String(raffle.title || "").toLowerCase();
  if (title.includes("турнир дня")) return true;
  const groups = Array.isArray(raffle.groups) ? raffle.groups : [];
  return groups.some((group) => String((group && group.prize) || "").toLowerCase().includes("турнир дня"));
}

function parsePrizeValue(text) {
  const match = String(text || "").match(/(\d[\d\s]*(?:[.,]\d+)?)/);
  if (!match) return 0;
  const n = parseFloat(String(match[1]).replace(/\s+/g, "").replace(",", "."));
  return Number.isFinite(n) && n > 0 ? n : 0;
}

function raffleWinnersCount(raffle) {
  const total = parseInt(String((raffle && raffle.totalWinners) || ""), 10);
  if (Number.isFinite(total) && total > 0) return total;
  const groups = Array.isArray(raffle && raffle.groups) ? raffle.groups : [];
  return groups.reduce((sum, group) => sum + Math.max(0, parseInt(String((group && group.count) || ""), 10) || 0), 0);
}

function raffleTotalPrize(raffle) {
  const groups = Array.isArray(raffle && raffle.groups) ? raffle.groups : [];
  return groups.reduce((sum, group) => {
    const count = Math.max(0, parseInt(String((group && group.count) || ""), 10) || 0);
    const nominal = parsePrizeValue(group && group.prize);
    return sum + (nominal > 0 ? nominal * count : 0);
  }, 0);
}

function formatRub(value) {
  const n = Math.round(parseFloat(value) || 0);
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\u202f") + " ₽";
}

function formatDate(value) {
  const d = value ? new Date(value) : null;
  if (!d || !Number.isFinite(d.getTime())) return "";
  try {
    return d.toLocaleString("ru-RU", {
      timeZone: "Europe/Moscow",
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (e) {
    return "";
  }
}

function publicBaseUrl(req) {
  const host = String((req && req.headers && (req.headers["x-forwarded-host"] || req.headers.host)) || "").trim();
  if (host) {
    const proto = String((req && req.headers && req.headers["x-forwarded-proto"]) || "https").split(",")[0].trim() || "https";
    return proto + "://" + host;
  }
  return String(process.env.APP_URL || "https://poker-app-ebon.vercel.app").replace(/\/+$/, "");
}

async function loadRafflesForPreview() {
  if (!redisConfigured()) return [];
  const listRes = await redisPipeline([["LRANGE", RAFFLE_IDS_KEY, "0", "-1"]], {
    timeoutMs: 6500,
    context: "raffle-preview.ids",
    allowLargeRedisRead: true,
  });
  const idsRaw = (listRes && listRes[0] && listRes[0].result) || [];
  const ids = [...new Set(idsRaw.map((id) => String(id || "").trim()).filter(Boolean))];
  if (!ids.length) return [];
  const rows = await redisPipeline(ids.map((id) => ["GET", RAFFLE_PREFIX + id]), {
    timeoutMs: 6500,
    context: "raffle-preview.rows",
    allowLargeRedisRead: true,
  });
  const raffles = [];
  for (let i = 0; i < ids.length; i += 1) {
    const raw = rows && rows[i] && rows[i].result;
    if (!raw) continue;
    try {
      const raffle = JSON.parse(raw);
      if (raffle && typeof raffle === "object") raffles.push(raffle);
    } catch (e) {}
  }
  return raffles;
}

function sortedActiveRaffles(raffles) {
  const now = Date.now();
  const active = (Array.isArray(raffles) ? raffles : []).filter((raffle) => {
    if (!raffle || raffle.status !== "active") return false;
    const end = raffle.endDate ? new Date(raffle.endDate).getTime() : NaN;
    return !Number.isFinite(end) || end > now;
  });
  active.sort((a, b) => {
    const aTd = isTournamentDayRaffle(a) ? 1 : 0;
    const bTd = isTournamentDayRaffle(b) ? 1 : 0;
    if (aTd !== bTd) return bTd - aTd;
    const endA = a.endDate ? new Date(a.endDate).getTime() : 0;
    const endB = b.endDate ? new Date(b.endDate).getTime() : 0;
    return endA - endB;
  });
  active.forEach((raffle, index) => {
    raffle.shareNumber = index + 1;
    raffle.activeShareNumber = index + 1;
  });
  return active;
}

function completedRaffles(raffles) {
  return (Array.isArray(raffles) ? raffles : []).filter((raffle) => raffle && raffle.status !== "active");
}

function findRaffleByCode(raffles, code) {
  const active = sortedActiveRaffles(raffles);
  const activeMatch = active.find((item) => raffleCodeMatches(item, code));
  if (activeMatch) return activeMatch;
  return completedRaffles(raffles).find((item) => raffleCodeMatches(item, code)) || null;
}

function buildPreviewPayload(raffle, code, baseUrl) {
  const number = normalizeRaffleCode(code);
  const winners = raffleWinnersCount(raffle);
  const sum = raffleTotalPrize(raffle);
  const titleText = raffle && raffle.title ? String(raffle.title).trim() : "Розыгрыш клуба Два туза";
  const title = (number ? "Розыгрыш #" + number + ": " : "") + titleText;
  const parts = [];
  if (sum > 0) parts.push("Сумма " + formatRub(sum));
  if (winners > 0) parts.push("победителей " + winners);
  const endText = formatDate(raffle && raffle.endDate);
  if (endText) parts.push("до " + endText + " МСК");
  return {
    title,
    description: parts.length ? parts.join(" · ") : "Бесплатные розыгрыши клуба Два туза.",
    image: baseUrl + "/assets/raffles-hero.png",
  };
}

module.exports = async function handler(req, res) {
  const q = (req && req.query) || {};
  const url = new URL(req.url || "/api/raffle-preview", "https://preview.local");
  const pathMatch = String(url.pathname || "").match(/^\/r\/([^/?#]+)\/?$/i);
  const pathCode = pathMatch && pathMatch[1] ? pathMatch[1] : "";
  const code = normalizeRaffleCode(q.code || q.r || q.startapp || url.searchParams.get("code") || url.searchParams.get("r") || url.searchParams.get("startapp") || pathCode || "");
  const referrerId = referralIdFromRequest(q, url);
  const baseUrl = publicBaseUrl(req);
  let raffle = null;
  try {
    raffle = findRaffleByCode(await loadRafflesForPreview(), code);
  } catch (e) {
    try {
      console.error("[raffle-preview] load failed", e && e.message ? e.message : e);
    } catch (eLog) {}
  }
  const payload = buildPreviewPayload(raffle, code, baseUrl);
  const startParam = "r_" + (code || "1") + (referrerId ? "__ref_" + referrerId : "");
  const appUrl = baseUrl + "/?startapp=" + encodeURIComponent(startParam) + "&open=1";
  const pageUrl = baseUrl + "/r/" + encodeURIComponent(code || "1") + (referrerId ? "?ref=" + encodeURIComponent(referrerId) : "");
  const html = "<!doctype html><html lang=\"ru\"><head>" +
    "<meta charset=\"utf-8\">" +
    "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">" +
    "<title>" + htmlEscape(payload.title) + "</title>" +
    "<meta name=\"description\" content=\"" + htmlEscape(payload.description) + "\">" +
    "<meta property=\"og:type\" content=\"website\">" +
    "<meta property=\"og:title\" content=\"" + htmlEscape(payload.title) + "\">" +
    "<meta property=\"og:description\" content=\"" + htmlEscape(payload.description) + "\">" +
    "<meta property=\"og:url\" content=\"" + htmlEscape(pageUrl) + "\">" +
    "<meta property=\"og:image\" content=\"" + htmlEscape(payload.image) + "\">" +
    "<meta property=\"og:image:width\" content=\"1200\">" +
    "<meta property=\"og:image:height\" content=\"630\">" +
    "<meta name=\"twitter:card\" content=\"summary_large_image\">" +
    "<meta name=\"twitter:title\" content=\"" + htmlEscape(payload.title) + "\">" +
    "<meta name=\"twitter:description\" content=\"" + htmlEscape(payload.description) + "\">" +
    "<meta name=\"twitter:image\" content=\"" + htmlEscape(payload.image) + "\">" +
    "<link rel=\"canonical\" href=\"" + htmlEscape(pageUrl) + "\">" +
    "</head><body style=\"margin:0;background:#05070d;color:#fff7d6;font-family:Arial,sans-serif;display:grid;min-height:100vh;place-items:center;text-align:center;padding:24px;box-sizing:border-box;\">" +
    "<main><h1 style=\"font-size:22px;margin:0 0 10px;\">" + htmlEscape(payload.title) + "</h1>" +
    "<p style=\"font-size:15px;margin:0 0 18px;color:#d7c9a8;\">" + htmlEscape(payload.description) + "</p>" +
    "<a href=\"" + htmlEscape(appUrl) + "\" style=\"display:inline-block;padding:12px 18px;border-radius:12px;background:#f59e0b;color:#111827;text-decoration:none;font-weight:800;\">Открыть розыгрыш</a></main>" +
    "<script>setTimeout(function(){location.replace(" + JSON.stringify(appUrl) + ");},450);</script>" +
    "</body></html>";
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=60, stale-while-revalidate=120");
  return res.status(200).send(html);
};

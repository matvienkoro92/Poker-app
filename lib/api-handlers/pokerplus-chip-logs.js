const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { ensureDtIdForUserId } = require("../account-id");
const { isAdminReportIdentity } = require("../admin-report-access");
const { getLinkedEmailOriginalByDtId } = require("../email-auth");
const {
  getPlayerChipsChangeLog,
  hasPokerPlusConfig,
  readBoundPokerPlusUserId,
  readPokerPlusEmail,
  readPokerPlusProfile,
  readPokerPlusTelegramValue,
} = require("../pokerplus");
const { pokerPlusTelegramIdCandidates } = require("../pokerplus-identity");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const CASH_HISTORY_USER_APP_ID =
  process.env.POKERPLUS_CASH_HISTORY_USER_APP_ID || process.env.POKERPLUS_CHIP_LOG_USER_APP_ID || "";
const CASH_HISTORY_MAIL = process.env.POKERPLUS_CASH_HISTORY_MAIL || process.env.POKERPLUS_CHIP_LOG_MAIL || "";
const CASH_HISTORY_MAX_PAGES = positiveInt(process.env.POKERPLUS_CHIP_LOG_MAX_PAGES, 200, 1000);

function jsonBody(req) {
  if (!req || req.body == null) return {};
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch (e) {
      return null;
    }
  }
  return req.body || {};
}

function positiveInt(value, fallback, max) {
  const n = Math.trunc(Number(value));
  if (!Number.isFinite(n) || n < 1) return fallback;
  return Math.min(n, max);
}

function truthy(value) {
  return value === true || value === 1 || ["1", "true", "yes", "all"].includes(String(value || "").trim().toLowerCase());
}

async function getAllPlayerChipsChangeLog(options) {
  const opts = options && typeof options === "object" ? options : {};
  const pageSize = positiveInt(opts.pageSize || opts.page_size, 200, 200);
  const first = await getPlayerChipsChangeLog({
    userAppId: opts.userAppId,
    mail: opts.mail,
    page: 1,
    pageSize,
  });
  const totalPage = positiveInt(first.totalPage, 1, 1000000);
  const pagesToFetch = Math.min(totalPage, CASH_HISTORY_MAX_PAGES);
  let list = Array.isArray(first.list) ? first.list.slice() : [];
  let lastPage = first;
  for (let page = 2; page <= pagesToFetch; page += 1) {
    lastPage = await getPlayerChipsChangeLog({
      userAppId: opts.userAppId,
      mail: opts.mail,
      page,
      pageSize,
    });
    list = list.concat(Array.isArray(lastPage.list) ? lastPage.list : []);
  }
  return {
    list,
    page: 1,
    pageSize,
    totalPage: first.totalPage,
    totalCount: first.totalCount,
    fetchedPages: pagesToFetch,
    truncated: totalPage > pagesToFetch,
    lastPage: lastPage && lastPage.page,
  };
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET" && req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });
  if (!hasPokerPlusConfig()) return res.status(500).json({ ok: false, error: "Poker21 server config missing" });

  const body = jsonBody(req);
  if (body == null) return res.status(400).json({ ok: false, error: "Invalid JSON" });

  const identity = resolveTelegramIdentity(req, body, BOT_TOKEN);
  const memberId = identity ? memberIdFromIdentity(identity) : null;
  if (!memberId || /^guest_/.test(memberId)) {
    return res.status(401).json({ ok: false, error: "Войдите в аккаунт, чтобы получить операции Poker21." });
  }

  const accountId = await ensureDtIdForUserId(memberId);
  if (!accountId) return res.status(500).json({ ok: false, error: "Не удалось подготовить ID аккаунта." });

  const isReportAdmin = isAdminReportIdentity(identity, memberId);
  const envUserAppId = isReportAdmin ? String(CASH_HISTORY_USER_APP_ID || "").trim() : "";
  const envMail = isReportAdmin ? String(CASH_HISTORY_MAIL || "").trim() : "";
  const linkedUserId = await readBoundPokerPlusUserId(accountId);
  if (!linkedUserId && (!envUserAppId || !envMail)) {
    return res.status(200).json({ ok: true, linked: false, accountId, chipLogs: null });
  }

  try {
    const query = req.query || {};
    const profile = linkedUserId ? await readPokerPlusProfile(accountId) : null;
    const savedUserAppId = linkedUserId ? await readPokerPlusTelegramValue(accountId) : "";
    const candidates = linkedUserId ? (savedUserAppId ? [savedUserAppId] : await pokerPlusTelegramIdCandidates(accountId, identity)) : [];
    const userAppId = String(envUserAppId || candidates[0] || accountId || "").trim();
    const savedMail = linkedUserId ? await readPokerPlusEmail(accountId) : "";
    const linkedEmail = linkedUserId ? (await getLinkedEmailOriginalByDtId(accountId)) || "" : "";
    const clientMail = envUserAppId && envMail ? "" : body.mail || query.mail || "";
    const mail = String(envMail || savedMail || (profile && profile.email) || linkedEmail || clientMail || "").trim();
    if (!mail) {
      return res.status(400).json({
        ok: false,
        linked: !!linkedUserId,
        accountId,
        pokerPlusUserId: linkedUserId,
        error: "Для истории операций Poker21 нужен email/mail из привязки.",
      });
    }
    const page = positiveInt(body.page || query.page, 1, 1000000);
    const pageSize = positiveInt(body.pageSize || body.page_size || query.pageSize || query.page_size, truthy(body.all || query.all) ? 200 : 20, 200);
    const chipLogs = truthy(body.all || query.all)
      ? await getAllPlayerChipsChangeLog({ userAppId, mail, pageSize })
      : await getPlayerChipsChangeLog({ userAppId, mail, page, pageSize });
    return res.status(200).json({
      ok: true,
      linked: !!linkedUserId,
      accountId,
      pokerPlusUserId: linkedUserId,
      source: envUserAppId && envMail ? "cash-history-env" : "linked-user",
      chipLogs,
    });
  } catch (e) {
    return res.status(e && e.statusCode ? e.statusCode : 502).json({
      ok: false,
      linked: !!linkedUserId,
      accountId,
      pokerPlusUserId: linkedUserId,
      error: e && e.message ? String(e.message).replace(/PokerPlus/g, "Poker21") : "Poker21 chip logs failed",
    });
  }
};

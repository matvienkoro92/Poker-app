const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { ensureDtIdForUserId } = require("../account-id");
const { isAdminReportIdentity } = require("../admin-report-access");
const { getLinkedEmailOriginalByDtId } = require("../email-auth");
const {
  getPlayerChipsChangeLog,
  hasPokerPlusConfig,
  readBoundPokerPlusUserId,
  readPokerPlusEmail,
  readPokerPlusLinkedSourcesByUserAppIds,
  readPokerPlusProfile,
  readPokerPlusTelegramValue,
} = require("../pokerplus");
const { pokerPlusTelegramIdCandidates } = require("../pokerplus-identity");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const DEFAULT_CASH_HISTORY_OPERATOR_IDS = ["369073", "467511", "208238"];
const CASH_HISTORY_USER_APP_IDS =
  process.env.POKERPLUS_CASH_HISTORY_USER_APP_IDS ||
  process.env.POKERPLUS_CHIP_LOG_USER_APP_IDS ||
  process.env.POKERPLUS_CASH_HISTORY_USER_APP_ID ||
  process.env.POKERPLUS_CHIP_LOG_USER_APP_ID ||
  "";
const CASH_HISTORY_MAILS =
  process.env.POKERPLUS_CASH_HISTORY_MAILS ||
  process.env.POKERPLUS_CHIP_LOG_MAILS ||
  process.env.POKERPLUS_CASH_HISTORY_MAIL ||
  process.env.POKERPLUS_CHIP_LOG_MAIL ||
  "";
const CASH_HISTORY_OPERATOR_IDS =
  process.env.POKERPLUS_CASH_HISTORY_OPERATOR_IDS ||
  process.env.POKERPLUS_CHIP_LOG_OPERATOR_IDS ||
  DEFAULT_CASH_HISTORY_OPERATOR_IDS.join(",");
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

function splitEnvList(value) {
  return String(value || "")
    .split(/[\n,;]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeCashHistorySourceUserAppId(value) {
  return String(value || "").trim().replace(/^tg_/, "");
}

function uniqSources(sources) {
  const seen = new Set();
  const out = [];
  for (const source of sources) {
    const userAppId = source && normalizeCashHistorySourceUserAppId(source.userAppId);
    const mail = source && String(source.mail || "").trim();
    if (!userAppId || !mail) continue;
    const key = userAppId + "\n" + mail.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ userAppId, mail });
  }
  return out;
}

function cashHistoryOperatorIds() {
  return splitEnvList(CASH_HISTORY_OPERATOR_IDS)
    .map(normalizeCashHistorySourceUserAppId)
    .filter(Boolean);
}

function cashHistoryEnvSources() {
  const ids = splitEnvList(CASH_HISTORY_USER_APP_IDS);
  const mails = splitEnvList(CASH_HISTORY_MAILS);
  const sources = ids.map((id, index) => ({ userAppId: id, mail: mails[index] || mails[0] || "" }));
  if (ids.length <= 1 && mails.length) {
    cashHistoryOperatorIds().forEach((id, index) => {
      sources.push({ userAppId: id, mail: mails[index] || mails[0] });
    });
  }
  return uniqSources(sources);
}

function cashHistoryAdminLinkedMailSources(userAppId, mail) {
  const linkedMail = String(mail || "").trim();
  if (!linkedMail) return [];
  const id = normalizeCashHistorySourceUserAppId(userAppId);
  if (!id) return [];
  return uniqSources([{ userAppId: id, mail: linkedMail }]);
}

async function cashHistoryLinkedPokerPlusSources() {
  const ids = splitEnvList(CASH_HISTORY_OPERATOR_IDS);
  const sources = await readPokerPlusLinkedSourcesByUserAppIds(ids);
  return uniqSources(sources);
}

function chipLogRowKey(row) {
  const r = row || {};
  return [
    r.userId,
    r.operUserId,
    r.operType,
    r.operGold,
    r.groupId,
    r.leagueId,
    r.operTime,
  ].map((value) => value == null ? "" : String(value)).join("\u001f");
}

function mergeChipLogResults(results) {
  const seen = new Set();
  const list = [];
  let truncated = false;
  let fetchedPages = 0;
  let requestedTotalCount = 0;
  let totalPage = 0;
  let pageSize = 0;
  results.forEach((result) => {
    if (!result) return;
    const rows = Array.isArray(result.list) ? result.list : [];
    rows.forEach((row) => {
      const key = chipLogRowKey(row);
      if (seen.has(key)) return;
      seen.add(key);
      list.push(row);
    });
    truncated = truncated || result.truncated === true;
    fetchedPages += Number(result.fetchedPages || 0) || 0;
    requestedTotalCount += Number(result.totalCount || 0) || 0;
    totalPage += Number(result.totalPage || 0) || 0;
    pageSize = pageSize || Number(result.pageSize || 0) || 0;
  });
  list.sort((a, b) => {
    const ta = Number(a && a.operTime) || 0;
    const tb = Number(b && b.operTime) || 0;
    if (tb !== ta) return tb - ta;
    return chipLogRowKey(a).localeCompare(chipLogRowKey(b));
  });
  return {
    list,
    page: results.reduce((max, result) => Math.max(max, Number(result && result.page) || 1), 1),
    pageSize,
    totalPage,
    totalCount: truncated ? requestedTotalCount : list.length,
    fetchedPages,
    truncated,
    sourceCount: results.length,
  };
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

async function getCashHistoryChipLogsFromSources(sources, options) {
  const opts = options && typeof options === "object" ? options : {};
  const results = [];
  const errors = [];
  for (const source of sources) {
    try {
      const result = truthy(opts.all)
        ? await getAllPlayerChipsChangeLog({ userAppId: source.userAppId, mail: source.mail, pageSize: opts.pageSize })
        : await getPlayerChipsChangeLog({ userAppId: source.userAppId, mail: source.mail, page: opts.page, pageSize: opts.pageSize });
      results.push(result);
    } catch (err) {
      errors.push(err);
    }
  }
  if (!results.length) throw errors[0] || new Error("Poker21 chip logs failed");
  const merged = results.length === 1 ? { ...results[0], sourceCount: sources.length } : mergeChipLogResults(results);
  if (results.length > 1) merged.sourceCount = sources.length;
  if (errors.length) merged.sourceErrorCount = errors.length;
  return merged;
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
  const envSources = isReportAdmin ? cashHistoryEnvSources() : [];
  const linkedCashierSources = isReportAdmin ? await cashHistoryLinkedPokerPlusSources() : [];
  const linkedUserId = await readBoundPokerPlusUserId(accountId);
  if (!linkedUserId && !envSources.length && !linkedCashierSources.length) {
    return res.status(200).json({ ok: true, linked: false, accountId, chipLogs: null });
  }

  try {
    const query = req.query || {};
    const profile = linkedUserId ? await readPokerPlusProfile(accountId) : null;
    const savedUserAppId = linkedUserId ? await readPokerPlusTelegramValue(accountId) : "";
    const candidates = linkedUserId ? (savedUserAppId ? [savedUserAppId] : await pokerPlusTelegramIdCandidates(accountId, identity)) : [];
    const userAppId = String(candidates[0] || accountId || "").trim();
    const savedMail = linkedUserId ? await readPokerPlusEmail(accountId) : "";
    const linkedEmail = linkedUserId ? (await getLinkedEmailOriginalByDtId(accountId)) || "" : "";
    const clientMail = envSources.length ? "" : body.mail || query.mail || "";
    const mail = String(savedMail || (profile && profile.email) || linkedEmail || clientMail || "").trim();
    const adminLinkedMailSources = isReportAdmin && !envSources.length && !linkedCashierSources.length ? cashHistoryAdminLinkedMailSources(userAppId, mail) : [];
    const baseCashHistorySources = [].concat(envSources, linkedCashierSources, adminLinkedMailSources);
    const cashHistorySources = isReportAdmin ? uniqSources(baseCashHistorySources) : [];
    if (!cashHistorySources.length && !mail) {
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
    const chipLogs = cashHistorySources.length
      ? await getCashHistoryChipLogsFromSources(cashHistorySources, { all: body.all || query.all, page, pageSize })
      : truthy(body.all || query.all)
        ? await getAllPlayerChipsChangeLog({ userAppId, mail, pageSize })
        : await getPlayerChipsChangeLog({ userAppId, mail, page, pageSize });
    return res.status(200).json({
      ok: true,
      linked: !!linkedUserId,
      accountId,
      pokerPlusUserId: linkedUserId,
      source: envSources.length
        ? "cash-history-env"
        : linkedCashierSources.length > 1
          ? "cash-history-linked-bindings"
          : (adminLinkedMailSources.length ? "cash-history-admin-linked-mail" : (linkedCashierSources.length ? "cash-history-linked-bindings" : "linked-user")),
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

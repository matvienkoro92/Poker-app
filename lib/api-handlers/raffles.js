/**
 * Розыгрыши: создание (админ), участие (по PokerPlus ID), жеребьёвка по времени.
 * Redis: poker_app:raffle_ids (list), poker_app:raffle:{id} (JSON).
 */
const crypto = require("crypto");
const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { guestMemberIdFromDeviceId } = require("../guest-member-id");
const { DT_IDS_KEY, ID_TO_USER_KEY, ensureDtIdForUserId, getDtIdByUserId, getPreferredUserIdByDtId } = require("../account-id");
const { getLinkedDtIdByEmail } = require("../email-auth");
const { ADMIN_IDS, isAdmin, isAdminIdentity } = require("../api-auth");
const { rejectBlockedAppUser } = require("../app-user-blocks");
const { pipeline: rawRedisPipeline, sscanall, isConfigured: redisConfigured } = require("../redis");
const { raffleStatsIndexCommands } = require("../raffle-stats-index");
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const RAFFLE_IDS_KEY = "poker_app:raffle_ids";
const RAFFLE_ACTIVE_IDS_KEY = "poker_app:raffle_active_ids";
const RAFFLE_ACTIVE_INDEX_READY_KEY = "poker_app:raffle_active_ids:ready";
const RAFFLE_PREFIX = "poker_app:raffle:";
const RAFFLE_PARTICIPANTS_DATA_PREFIX = "poker_app:raffle_participants_data:";
const RAFFLE_PARTICIPANTS_PAGE_PREFIX = "poker_app:raffle_participants_page:";
const RAFFLE_PARTICIPANTS_PAGE_META_PREFIX = "poker_app:raffle_participants_page_meta:";

async function raffleDataPipeline(commands, options) {
  const source = Array.isArray(commands) ? commands : [];
  const prepared = [];
  const participantWrites = [];
  const statsIndexWrites = [];
  const raffleGets = [];
  source.forEach((command, index) => {
    const next = Array.isArray(command) ? command.slice() : command;
    const op = String(next && next[0] || "").toUpperCase();
    const key = String(next && next[1] || "");
    if (op === "SET" && key.startsWith(RAFFLE_PREFIX) && typeof next[2] === "string") {
      try {
        const raffle = JSON.parse(next[2]);
        const raffleId = key.slice(RAFFLE_PREFIX.length);
        statsIndexWrites.push(...raffleStatsIndexCommands(raffle, raffleId));
        if (raffle && typeof raffle === "object" && Array.isArray(raffle.participants)) {
          const participants = raffle.participants;
          const compact = { ...raffle, participantsCount: participants.length };
          delete compact.participants;
          next[2] = JSON.stringify(compact);
          participantWrites.push(["SET", RAFFLE_PARTICIPANTS_DATA_PREFIX + raffleId, JSON.stringify(participants)]);
        }
      } catch (e) {}
    } else if (op === "GET" && key.startsWith(RAFFLE_PREFIX)) {
      raffleGets.push({ index, raffleId: key.slice(RAFFLE_PREFIX.length) });
    }
    prepared.push(next);
  });
  const results = await rawRedisPipeline(prepared.concat(participantWrites, statsIndexWrites), options);
  if (!raffleGets.length) return Array.isArray(results) ? results.slice(0, source.length) : results;
  const participantRows = await rawRedisPipeline(
    raffleGets.map((item) => ["GET", RAFFLE_PARTICIPANTS_DATA_PREFIX + item.raffleId]),
    options
  );
  raffleGets.forEach((item, offset) => {
    const resultRow = results && results[item.index];
    const participantsRaw = participantRows && participantRows[offset] && participantRows[offset].result;
    if (!resultRow || !resultRow.result || participantsRaw == null) return;
    try {
      const raffle = JSON.parse(resultRow.result);
      const participants = JSON.parse(participantsRaw);
      if (raffle && !Array.isArray(raffle.participants) && Array.isArray(participants)) {
        raffle.participants = participants;
        resultRow.result = JSON.stringify(raffle);
      }
    } catch (e) {}
  });
  return Array.isArray(results) ? results.slice(0, source.length) : results;
}
const redisPipeline = raffleDataPipeline;
const RAFFLE_IPS_PREFIX = "poker_app:raffle_ips:";
const RAFFLE_DEVICES_PREFIX = "poker_app:raffle_devices:";
const RAFFLE_ACCOUNT_SUBSCRIBERS_KEY = "poker_app:raffle_account_subscribers";
const RAFFLE_COMPLETE_LOCK_PREFIX = "poker_app:raffle_complete_lock:";
const RAFFLE_READY_SETTLE_LOCK_PREFIX = "poker_app:raffle_ready_settle_lock:";
const RAFFLE_COMPLETED_SEQ_KEY = "poker_app:raffle_completed_seq";
const RAFFLE_COMPLETED_NUMBER_TO_ID_KEY = "poker_app:raffle_completed_number_to_id";
const RAFFLE_READY_WINDOW_MS = 15 * 60 * 1000;
const RAFFLE_READY_CLICK_GRACE_MS = 60 * 1000;
const RAFFLE_READY_SETTLE_LOCK_TTL_SECONDS = 60;
const RAFFLE_DRAW_SETTLE_LOCK_TTL_SECONDS = 60;
const RAFFLE_PRIZE_NOTIFY_SENT_PREFIX = "poker_app:raffle_prize_notify_sent:";
const RAFFLE_READY_ADMIN_NOTIFY_LOCK_PREFIX = "poker_app:raffle_ready_admin_notify_lock:";
const RAFFLE_READY_ADMIN_NOTIFY_SENT_PREFIX = "poker_app:raffle_ready_admin_notify_sent:";
const RAFFLE_READY_ADMIN_NOTIFY_LOCK_TTL_SECONDS = 5 * 60;
const RAFFLE_READY_ADMIN_NOTIFY_SENT_TTL_SECONDS = 60 * 60 * 24 * 14;
const RAFFLE_REMOVE_AUDIT_PREFIX = "poker_app:raffle_remove_audit:";
const RAFFLE_REMOVE_AUDIT_TTL_SECONDS = 60 * 60 * 24 * 30;
const RAFFLE_HOME_BONUS_CACHE_KEY = "poker_app:raffles_home_bonus:v1";
const RAFFLE_HOME_BONUS_CACHE_TTL_SECONDS = 30 * 60;
const RAFFLE_HOME_BONUS_RECENT_SCAN_LIMIT = 80;
const RAFFLE_ACHIEVEMENTS_CACHE_KEY = "poker_app:raffles_achievements:v1";
const RAFFLE_ACHIEVEMENTS_CACHE_TTL_SECONDS = Math.max(60, Number(process.env.RAFFLE_ACHIEVEMENTS_CACHE_TTL_SECONDS) || 15 * 60);
const RAFFLE_PUBLIC_LIST_CACHE_KEY = "poker_app:raffles_public_list:v1";
const RAFFLE_ADMIN_ACTIVE_LIST_CACHE_KEY = "poker_app:raffles_admin_active_list:v1";
const RAFFLE_ARCHIVE_INDEX_CACHE_KEY = "poker_app:raffles_archive_index:v1";
const RAFFLE_ARCHIVE_INDEX_CACHE_TTL_SECONDS = Math.max(300, Number(process.env.RAFFLE_ARCHIVE_INDEX_CACHE_TTL_SECONDS) || 6 * 60 * 60);
const RAFFLE_PUBLIC_LIST_CACHE_TTL_SECONDS = Math.max(5, Number(process.env.RAFFLE_PUBLIC_LIST_CACHE_TTL_SECONDS) || 20);
const RAFFLE_ADMIN_ACTIVE_LIST_CACHE_TTL_SECONDS = Math.max(5, Number(process.env.RAFFLE_ADMIN_ACTIVE_LIST_CACHE_TTL_SECONDS) || 8);
const RAFFLE_SUMMARY_CACHE_KEY = "poker_app:raffles_summary:v1";
const RAFFLE_WEEK_ISSUE_TOTALS_CACHE_PREFIX = "poker_app:raffles_week_issue_totals:v1:";
const RAFFLE_SUMMARY_CACHE_TTL_SECONDS = Math.max(5 * 60, Number(process.env.RAFFLE_SUMMARY_CACHE_TTL_SECONDS) || 6 * 60 * 60);
const RAFFLE_RECENT_COMPLETED_LIMIT = 2;
const RAFFLE_RECENT_COMPLETED_SCAN_LIMIT = Math.max(20, Number(process.env.RAFFLE_RECENT_COMPLETED_SCAN_LIMIT) || 20);
const PRIVATE_CASH_EVENTS_KEY = "poker_app:private_cash_events";
const PRIVATE_CASH_EVENT_PREFIX = "poker_app:private_cash_event:";
const PRIVATE_CASH_PARTICIPANTS_PREFIX = "poker_app:private_cash_participants:";
const PRIVATE_CASH_IN_GAME_SEAT_COUNT = 7;
const RAFFLE_DEFAULT_MAX_REROLL_ROUND = 1;
const RAFFLE_CASH_MAX_REROLL_ROUND = 3;
const P21_IDS_KEY = "poker_app:visitor_p21_ids";
const POKERPLUS_BIND_HASH_KEY = "poker_app:pokerplus_user_ids";
const POKERPLUS_BIND_REVERSE_HASH_KEY = "poker_app:pokerplus_accounts_by_user_id";
const POKERPLUS_PROFILE_HASH_KEY = "poker_app:pokerplus_profiles";
const PROFILE_SPECIALTY_KEY = "poker_app:profile_specialties";
/** То же, что users.js / chat.js: имя в чате и актуальный @username из бота. */
const CHAT_DISPLAY_NAMES_KEY = "poker_app:visitor_chat_display_names";
const USERNAMES_KEY = "poker_app:visitor_usernames";
const CHAT_DISPLAY_NAME_MAX = 80;
const POKERPLUS_NICKNAME_MAX = 80;
const RAFFLE_CHANNEL = process.env.RAFFLE_CHANNEL || "@Dva_tuza_club";
const CRON_SECRET = process.env.CRON_SECRET;
const QSTASH_TOKEN = process.env.QSTASH_TOKEN || "";
const QSTASH_BASE = process.env.QSTASH_URL || "https://qstash.upstash.io";
/** Идемпотентность POST create: один ключ клиента — один розыгрыш */
const RAFFLE_CREATE_IDEM_PREFIX = "poker_app:raffle_create_idem:";
const RAFFLE_DAILY_CREATE_LOCK_PREFIX = "poker_app:raffle_daily_create_lock:";
const RAFFLE_DAILY_SCHEDULE_SETUP_LOCK_PREFIX = "poker_app:raffle_daily_schedule_setup_lock:";
const RAFFLE_DAILY_QSTASH_SCHEDULE_PREFIX = "poker_raffle_daily_";
const RAFFLE_DAILY_SCHEDULE_SETUP_LOCK_TTL_SECONDS = 10 * 60;
const MSK_OFFSET_MS = 3 * 60 * 60 * 1000;
const MIN_DAILY_RAFFLE_DURATION_MS = 15 * 60 * 1000;
const DEFAULT_DAILY_RAFFLE_DURATION_MS = 24 * 60 * 60 * 1000;
const DAILY_CASH_DURATION_MS = (23 * 60 + 59) * 60 * 1000;
const DAILY_CASH_LEGACY_SERIES_ID = "raffle_daily_cash_20_16";
const DAILY_CASH_LEGACY_TITLE = "20 беккинг-байинов на кеш";
const DAILY_CASH_SERIES = [
  {
    key: "cash_5_10",
    seriesId: "raffle_daily_cash_5_10_14_30",
    startTime: "14:31",
    resultTime: "14:30",
    title: "10 байинов по 200р на кеш 5/10",
    totalWinners: 10,
    accessLevel: 1,
    groups: [
      { count: 10, prize: "Беккинг-байин 200 ₽ на кеш 5/10", accessLevel: 1 },
    ],
  },
  {
    key: "cash_20_40",
    seriesId: "raffle_daily_cash_20_40_20_15",
    startTime: "20:16",
    resultTime: "20:15",
    title: "10 байинов по 1000р на кеш 20/40",
    totalWinners: 10,
    accessLevel: 10,
    groups: [
      { count: 7, prize: "Беккинг-байин 1000 ₽ на кеш 20/40 — первые 7 победителей", accessLevel: 10 },
      { count: 3, prize: "Беккинг-байин 1000 ₽ на кеш 20/40 — вторые 3 победителя", accessLevel: 10 },
    ],
    resultBatches: [
      { label: "Первые 7 победителей", time: "19:00" },
      { label: "Вторые 3 победителя", time: "20:15" },
    ],
  },
];
const DAILY_CASH_DEFAULT_SERIES = DAILY_CASH_SERIES[1];
const DAILY_CASH_START_TIME = DAILY_CASH_DEFAULT_SERIES.startTime;
const DAILY_CASH_SERIES_ID = DAILY_CASH_DEFAULT_SERIES.seriesId;
const DAILY_CASH_TITLE = DAILY_CASH_DEFAULT_SERIES.title;
const DAILY_CASH_TOTAL_WINNERS = DAILY_CASH_DEFAULT_SERIES.totalWinners;
const MINI_APP_URL = process.env.MINI_APP_URL || process.env.APP_URL || "";
const { sendToMemberDevices } = require("../chat-webpush-notify");
const { checkTelegramParticipationGate } = require("../telegram-participation-gate");
const { participantIdentityConflict } = require("../multi-account-guard");
const {
  buildStoredRaffle,
  deriveDuplicateEndDateIso,
  getClientIp,
  buildWeightedTicketPool,
  normalizeRaffleDeviceId,
  normalizeRaffleAccessLevel: normalizeRaffleAccessLevelCore,
  normalizeRaffleGroups,
  normalizeRaffleTicketCount,
  raffleGroupAccessLevel,
  raffleHasGroupAccessLevels,
  raffleUsesWeightedTickets,
  raffleParticipantAccountId,
  raffleParticipantEligibleForGroupDraw,
  raffleEligibleParticipantsForDraw,
  drawRaffleGroups,
  runDraw,
} = require("../raffle-core");
const {
  POKER_PROFILE_LEVEL_BANDS,
  pokerProfileFeeFromCachedProfile,
  pokerProfileStatusFromCachedProfile,
  pokerProfileStatusFromRakeServer,
} = require("../chat-profile-status");
const {
  buildRaffleCompletedLink,
  buildRaffleCompletedOpenUrl,
  createRaffleNotificationService,
  resolveWorkingRaffleAdmin,
} = require("../raffle-notifications");
const { notifyAdminsRaffleCompleted, notifyWinnerReadyReminder, notifyWinnersRaffleCompleted, sendTelegramMessage } = createRaffleNotificationService({
  botToken: BOT_TOKEN,
  adminIds: ADMIN_IDS,
  miniAppUrl: MINI_APP_URL,
  rafflePrefix: RAFFLE_PREFIX,
  redisPipeline,
  sendWebPushToMember: sendToMemberDevices,
});

async function sendRaffleCompletedNotifications(raffleId, raffle) {
  const results = await Promise.allSettled([
    notifyAdminsRaffleCompleted(raffle),
    notifyWinnersRaffleCompleted(raffleId, raffle),
  ]);
  results.forEach((row, idx) => {
    if (!row || row.status !== "rejected") return;
    try {
      console.error("[raffles] completed notification failed", {
        channel: idx === 0 ? "admin" : "winner",
        raffleId: String(raffleId || ""),
        error: row.reason && row.reason.message ? row.reason.message : String(row.reason || ""),
      });
    } catch (eLog) {}
  });
}

function raffleRerollNotificationWinnerShape(winner) {
  if (!winner || typeof winner !== "object") return false;
  if (winner.winnerReroll !== true) return false;
  return raffleNotificationWinnerShape(winner);
}

function raffleNotificationWinnerShape(winner) {
  if (!winner || typeof winner !== "object") return false;
  if (!raffleWinnerIdentityKey(winner)) return false;
  const slotId = String((winner.winnerReadySlotId || winner.winnerSlotId) || "").trim();
  const prize = String(winner.prize || "").trim();
  const groupIndex = winner.groupIndex != null ? Number(winner.groupIndex) : NaN;
  return !!(slotId || prize || Number.isFinite(groupIndex));
}

async function sendRaffleWinnerNotifications(raffleId, raffle, winners, options = {}) {
  try {
    let targetRaffle = raffle;
    if (Array.isArray(winners)) {
      const safeShape = options && options.rerollOnly ? raffleRerollNotificationWinnerShape : raffleNotificationWinnerShape;
      const safeWinners = winners.filter(safeShape);
      if (safeWinners.length !== winners.length) {
        try {
          console.warn("[raffles] winner notifications blocked unsafe rows", {
            raffleId: String(raffleId || ""),
            candidateRows: winners.length,
            safeRows: safeWinners.length,
          });
        } catch (eLog) {}
      }
      if (!safeWinners.length) return;
      targetRaffle = { ...raffle, winners: safeWinners };
    }
    await notifyWinnersRaffleCompleted(raffleId, targetRaffle);
  } catch (e) {
    try {
      console.error("[raffles] winner notification failed", {
        raffleId: String(raffleId || ""),
        error: e && e.message ? e.message : String(e || ""),
      });
    } catch (eLog) {}
  }
}

function queueRaffleCompletedNotifications(raffleId, raffle) {
  sendRaffleCompletedNotifications(raffleId, raffle).catch((e) => {
    try {
      console.error("[raffles] completed notification queue failed", {
        raffleId: String(raffleId || ""),
        error: e && e.message ? e.message : String(e || ""),
      });
    } catch (eLog) {}
  });
}

function redisSetNxOk(row) {
  if (!row || row.error) return false;
  const value = row.result;
  return value === "OK" || value === true || value === 1 || String(value || "").toUpperCase() === "OK";
}

function redisNumber(row) {
  if (!row || row.error || row.result == null || row.result === false) return 0;
  const n = parseInt(String(row.result), 10);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

function redisTrimmedString(row) {
  if (!row || row.error || row.result == null || row.result === false) return "";
  return String(row.result).trim();
}

function normalizeRaffleAdminUserId(raw) {
  const s = String(raw || "").trim();
  if (!s) return "";
  if (/^\d+$/.test(s)) return "tg_" + s;
  if (/^tg_\d+$/.test(s)) return s;
  return "";
}

function raffleReadyAdminRecipients(now) {
  const recipients = new Map();
  const add = (userId, role, name) => {
    const normalized = normalizeRaffleAdminUserId(userId);
    if (!normalized || recipients.has(normalized)) return;
    recipients.set(normalized, {
      userId: normalized,
      role: role || "",
      name: String(name || "").trim(),
    });
  };
  const workingAdmin = resolveWorkingRaffleAdmin(now);
  if (workingAdmin) add(workingAdmin.userId, "shift", workingAdmin.name);
  return Array.from(recipients.values());
}

function raffleReadyAdminNotificationKey(prefix, raffleId, winner, adminUserId, channel) {
  const id = String(raffleId || "").trim();
  const winnerKey = raffleWinnerIdentityKey(winner) || String(winner && winner.userId != null ? winner.userId : "").trim();
  const slotKey = String((winner && winner.winnerReadySlotId) || "").trim();
  const adminKey = normalizeRaffleAdminUserId(adminUserId);
  const hash = crypto
    .createHash("sha1")
    .update([id, slotKey, winnerKey, adminKey, channel || ""].join("\n"))
    .digest("hex")
    .slice(0, 32);
  return prefix + hash;
}

async function hasRaffleReadyAdminNotificationSent(raffleId, winner, adminUserId, channel) {
  const key = raffleReadyAdminNotificationKey(RAFFLE_READY_ADMIN_NOTIFY_SENT_PREFIX, raffleId, winner, adminUserId, channel);
  try {
    const rows = await redisPipeline([["GET", key]]);
    return !!redisTrimmedString(rows && rows[0]);
  } catch (e) {
    return false;
  }
}

async function claimRaffleReadyAdminNotification(raffleId, winner, adminUserId, channel) {
  const key = raffleReadyAdminNotificationKey(RAFFLE_READY_ADMIN_NOTIFY_LOCK_PREFIX, raffleId, winner, adminUserId, channel);
  try {
    const rows = await redisPipeline([["SET", key, "1", "EX", String(RAFFLE_READY_ADMIN_NOTIFY_LOCK_TTL_SECONDS), "NX"]]);
    return redisSetNxOk(rows && rows[0]);
  } catch (e) {
    return false;
  }
}

async function releaseRaffleReadyAdminNotification(raffleId, winner, adminUserId, channel) {
  const key = raffleReadyAdminNotificationKey(RAFFLE_READY_ADMIN_NOTIFY_LOCK_PREFIX, raffleId, winner, adminUserId, channel);
  try {
    await redisPipeline([["DEL", key]]);
  } catch (e) {}
}

async function markRaffleReadyAdminNotificationSent(raffleId, winner, adminUserId, channel) {
  const key = raffleReadyAdminNotificationKey(RAFFLE_READY_ADMIN_NOTIFY_SENT_PREFIX, raffleId, winner, adminUserId, channel);
  try {
    await redisPipeline([["SET", key, "1", "EX", String(RAFFLE_READY_ADMIN_NOTIFY_SENT_TTL_SECONDS)]]);
  } catch (e) {}
}

function raffleWinnerAdminDisplayName(winner) {
  if (!winner) return "Победитель";
  const name = winner.name != null ? String(winner.name).trim() : "";
  if (name) return name;
  const username = winner.telegramUsername != null ? String(winner.telegramUsername).trim().replace(/^@+/, "") : "";
  if (username) return "@" + username;
  const p21Id = winner.p21Id != null ? String(winner.p21Id).trim() : "";
  if (p21Id) return p21Id;
  const accountId = raffleParticipantAccountId(winner) || (winner.accountId != null ? String(winner.accountId).trim() : "");
  if (accountId) return accountId;
  const uidRaw = winner.userId != null ? String(winner.userId).trim() : "";
  return uidRaw || "Победитель";
}

function formatRaffleReadyAdminHeadlineId(winner) {
  const idText = rafflePrizeIssuedIdText(winner);
  if (!idText) return "";
  if (/^\d+$/.test(idText)) return "ID" + idText;
  if (/^ID\d{6}$/i.test(idText)) return idText.toUpperCase();
  return "ID " + idText;
}

function formatRaffleReadyAdminHeadlinePrize(prize) {
  const text = String(prize || "").replace(/\u00a0|\u202f/g, " ").trim();
  if (!text) return "";
  const amountMatch = text.match(/(\d[\d\s]*(?:[.,]\d+)?)\s*(?:₽|р\.?|руб\.?)/i);
  if (!amountMatch) return text.toLowerCase();
  const amountRaw = String(amountMatch[1] || "").replace(/\s+/g, "").replace(",", ".");
  const amountNumber = parseFloat(amountRaw);
  const amountText = Number.isFinite(amountNumber)
    ? (Number.isInteger(amountNumber) ? String(amountNumber) : String(amountNumber).replace(".", ","))
    : amountRaw;
  const label = text
    .replace(amountMatch[0], "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
  return (amountText ? amountText + "р" : "").trim() + (label ? " " + label : "");
}

function buildRaffleReadyAdminHeadline(raffle, winner) {
  const idPart = formatRaffleReadyAdminHeadlineId(winner) || raffleWinnerAdminDisplayName(winner);
  const prizePart = formatRaffleReadyAdminHeadlinePrize(raffleWinnerPrizeText(raffle, winner));
  return idPart + (prizePart ? " готов забрать " + prizePart : " нажал «Готов»");
}

function buildRaffleReadyAdminText(raffle, winner) {
  const title = String((raffle && (raffle.title || (raffle.groups && raffle.groups[0] && raffle.groups[0].prize))) || "").trim();
  const player = raffleWinnerAdminDisplayName(winner);
  const username = winner && winner.telegramUsername != null ? String(winner.telegramUsername).trim().replace(/^@+/, "") : "";
  const idText = rafflePrizeIssuedIdText(winner);
  const prize = raffleWinnerPrizeText(raffle, winner);
  const parts = ["✅ " + buildRaffleReadyAdminHeadline(raffle, winner)];
  if (title) parts.push("Розыгрыш: " + title);
  if (player) parts.push("Игрок: " + player);
  if (username) parts.push("Telegram: @" + username);
  if (idText) parts.push("ID для начисления: " + idText);
  if (prize) parts.push("Приз: " + prize);
  parts.push("Открыть розыгрыш: " + buildRaffleCompletedLink(MINI_APP_URL, raffle));
  return parts.join("\n\n");
}

function safeRaffleReadyPushTagPart(raw) {
  return String(raw || "").replace(/[^\w-]/g, "_").slice(0, 48);
}

function buildRaffleReadyAdminPushPayload(raffleId, raffle, winner) {
  const player = raffleWinnerAdminDisplayName(winner);
  const idText = rafflePrizeIssuedIdText(winner);
  const prize = raffleWinnerPrizeText(raffle, winner);
  const headline = buildRaffleReadyAdminHeadline(raffle, winner);
  const bodyParts = [];
  bodyParts.push(player + (idText ? " · ID " + idText : ""));
  if (prize) bodyParts.push("Приз: " + prize);
  bodyParts.push("Нужно выдать приз.");
  return {
    title: headline.slice(0, 80),
    body: bodyParts.join("\n").slice(0, 180),
    tag:
      "poker-raffle-ready-" +
      safeRaffleReadyPushTagPart(raffleId) +
      "-" +
      safeRaffleReadyPushTagPart((winner && (winner.winnerReadySlotId || winner.userId || winner.accountId)) || "winner"),
    openUrl: buildRaffleCompletedOpenUrl(raffle || raffleId),
    kind: "raffle_winner_ready",
    raffleId: String(raffleId || ""),
    winnerUserId: String((winner && winner.userId) || ""),
  };
}

async function notifyRaffleWinnerReadyAdminChannel(raffleId, raffle, winner, admin, channel) {
  const adminUserId = admin && admin.userId;
  if (!adminUserId || !channel) return false;
  if (await hasRaffleReadyAdminNotificationSent(raffleId, winner, adminUserId, channel)) return false;
  const claimed = await claimRaffleReadyAdminNotification(raffleId, winner, adminUserId, channel);
  if (!claimed) return false;
  let ok = false;
  try {
    if (channel === "tg") {
      const chatId = String(adminUserId).replace(/^tg_/, "");
      const sent = await sendTelegramMessage(chatId, buildRaffleReadyAdminText(raffle, winner));
      ok = !!(sent && sent.ok);
    } else if (channel === "push") {
      const delivered = await sendToMemberDevices(adminUserId, buildRaffleReadyAdminPushPayload(raffleId, raffle, winner));
      ok = Number(delivered) > 0;
    }
  } catch (e) {
    ok = false;
  }
  if (ok) {
    await markRaffleReadyAdminNotificationSent(raffleId, winner, adminUserId, channel);
    return true;
  }
  await releaseRaffleReadyAdminNotification(raffleId, winner, adminUserId, channel);
  return false;
}

async function notifyRaffleWinnerReadyAdmins(raffleId, raffle, winner, now) {
  if (!raffleId || !raffle || !winner) return;
  const recipients = raffleReadyAdminRecipients(now);
  if (!recipients.length) return;
  const jobs = [];
  recipients.forEach((admin) => {
    jobs.push(notifyRaffleWinnerReadyAdminChannel(raffleId, raffle, winner, admin, "tg"));
    jobs.push(notifyRaffleWinnerReadyAdminChannel(raffleId, raffle, winner, admin, "push"));
  });
  const results = await Promise.allSettled(jobs);
  results.forEach((row) => {
    if (!row || row.status !== "rejected") return;
    try {
      console.error("[raffles] winner ready admin notification failed", {
        raffleId: String(raffleId || ""),
        error: row.reason && row.reason.message ? row.reason.message : String(row.reason || ""),
      });
    } catch (eLog) {}
  });
}

function queueRaffleWinnerReadyAdminNotifications(raffleId, raffle, winner, now) {
  const raffleCopy = raffle && typeof raffle === "object" ? { ...raffle } : raffle;
  const winnerCopy = winner && typeof winner === "object" ? { ...winner } : winner;
  const nowCopy = now instanceof Date ? new Date(now.getTime()) : new Date();
  notifyRaffleWinnerReadyAdmins(raffleId, raffleCopy, winnerCopy, nowCopy).catch((e) => {
    try {
      console.error("[raffles] winner ready admin notification queue failed", {
        raffleId: String(raffleId || ""),
        winnerUserId: String((winnerCopy && winnerCopy.userId) || ""),
        error: e && e.message ? e.message : String(e || ""),
      });
    } catch (eLog) {}
  });
}

function raffleCompletedNumber(raffle) {
  const n = parseInt(String(raffle && (raffle.completedNumber || raffle.completed_number) || ""), 10);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

async function countStoredCompletedRafflesForSeq() {
  try {
    const listRes = await redisPipeline([["LRANGE", RAFFLE_IDS_KEY, "0", "-1"]], {
      timeoutMs: 6500,
      context: "raffles.completedSeq.ids",
      allowLargeRedisRead: true,
    });
    const idsRaw = (listRes && listRes[0] && listRes[0].result) || [];
    const ids = [...new Set(idsRaw)];
    if (!ids.length) return 0;
    const rows = await redisPipeline(ids.map((id) => ["GET", RAFFLE_PREFIX + id]), {
      timeoutMs: 10000,
      context: "raffles.completedSeq.rows",
      allowLargeRedisRead: true,
    });
    let completedCount = 0;
    let maxNumber = 0;
    for (let i = 0; i < ids.length; i += 1) {
      const raw = rows && rows[i] && rows[i].result;
      if (!raw) continue;
      try {
        const raffle = JSON.parse(raw);
        if (raffle && raffle.status === "drawn") {
          completedCount += 1;
          maxNumber = Math.max(maxNumber, raffleCompletedNumber(raffle));
        }
      } catch (e) {}
    }
    return Math.max(completedCount, maxNumber);
  } catch (e) {
    return 0;
  }
}

async function ensureRaffleCompletedSeqInitialized() {
  const rows = await redisPipeline([["GET", RAFFLE_COMPLETED_SEQ_KEY]]);
  if (redisNumber(rows && rows[0]) > 0) return;
  const baseline = await countStoredCompletedRafflesForSeq();
  await redisPipeline([["SET", RAFFLE_COMPLETED_SEQ_KEY, String(baseline), "NX"]]);
}

async function assignNextCompletedNumber(raffle) {
  if (!raffle || raffle.status !== "drawn" || raffleCompletedNumber(raffle)) return false;
  await ensureRaffleCompletedSeqInitialized();
  const rows = await redisPipeline([["INCR", RAFFLE_COMPLETED_SEQ_KEY]]);
  const n = redisNumber(rows && rows[0]);
  if (!n) return false;
  raffle.completedNumber = n;
  if (raffle.id) {
    await redisPipeline([["HSET", RAFFLE_COMPLETED_NUMBER_TO_ID_KEY, String(n), String(raffle.id)]]).catch(() => {});
  }
  return true;
}

async function loadCompletedRaffleByTarget(rawTarget) {
  const target = String(rawTarget || "").trim().replace(/[^A-Za-z0-9_-]/g, "").slice(0, 160);
  if (!target) return null;
  if (!/^\d+$/.test(target)) return loadStoredRaffleById(target);

  const mappedRows = await redisPipeline([["HGET", RAFFLE_COMPLETED_NUMBER_TO_ID_KEY, target]], {
    timeoutMs: 2500,
    context: "raffles.completedOne.map",
  }).catch(() => null);
  const mappedId = String(mappedRows && mappedRows[0] && mappedRows[0].result || "").trim();
  if (mappedId) {
    const mappedRaffle = await loadStoredRaffleById(mappedId);
    if (mappedRaffle) return mappedRaffle;
  }

  const idsRows = await redisPipeline([["LRANGE", RAFFLE_IDS_KEY, "-80", "-1"]], {
    timeoutMs: 4500,
    context: "raffles.completedOne.ids",
  });
  const ids = [...new Set(
    (idsRows && idsRows[0] && Array.isArray(idsRows[0].result) ? idsRows[0].result : [])
      .slice()
      .reverse()
      .filter(Boolean)
  )];
  const raffleRows = ids.length ? await redisPipeline(ids.map((id) => ["GET", RAFFLE_PREFIX + id]), {
    timeoutMs: 6500,
    context: "raffles.completedOne.rows",
  }) : [];
  for (let i = 0; i < ids.length; i += 1) {
    try {
      const raffle = raffleRows && raffleRows[i] && raffleRows[i].result
        ? JSON.parse(String(raffleRows[i].result))
        : null;
      if (raffle && String(raffleCompletedNumber(raffle)) === target) {
        if (raffle.id) {
          redisPipeline([["HSET", RAFFLE_COMPLETED_NUMBER_TO_ID_KEY, target, String(raffle.id)]]).catch(() => {});
        }
        return raffle;
      }
    } catch (eParse) {}
  }
  return null;
}

function backfillCompletedNumbersByOrder(raffles) {
  if (!Array.isArray(raffles)) return { changedIds: [], maxNumber: 0 };
  const changedIds = [];
  let completedOrdinal = 0;
  let maxNumber = 0;
  raffles.forEach((raffle) => {
    if (!raffle || raffle.status !== "drawn") return;
    completedOrdinal += 1;
    const current = raffleCompletedNumber(raffle);
    if (current) {
      maxNumber = Math.max(maxNumber, current);
      return;
    }
    raffle.completedNumber = completedOrdinal;
    maxNumber = Math.max(maxNumber, completedOrdinal);
    if (raffle.id) changedIds.push(String(raffle.id));
  });
  return { changedIds, maxNumber: Math.max(maxNumber, completedOrdinal) };
}

async function seedCompletedSeqFromBackfill(maxNumber) {
  const n = parseInt(String(maxNumber || ""), 10);
  if (!Number.isFinite(n) || n <= 0) return;
  await redisPipeline([["SET", RAFFLE_COMPLETED_SEQ_KEY, String(n), "NX"]]);
}

function raffleLockKey(prefix, raffleId) {
  const id = String(raffleId || "").trim();
  const hash = crypto.createHash("sha1").update(id).digest("hex").slice(0, 32);
  return prefix + hash;
}

function rafflePrizeNotificationKey(raffleId, winner) {
  const id = String(raffleId || "").trim();
  const winnerKey = raffleWinnerIdentityKey(winner) || String(winner && winner.userId != null ? winner.userId : "").trim();
  const slotKey = String((winner && (winner.winnerReadySlotId || winner.winnerSlotId || winner.winnerTicketIndex)) || "").trim();
  const hash = crypto.createHash("sha1").update(id + "\n" + slotKey + "\n" + winnerKey + "\nprize_issued").digest("hex").slice(0, 32);
  return RAFFLE_PRIZE_NOTIFY_SENT_PREFIX + hash;
}

function normalizeRaffleTelegramUsername(raw) {
  return String(raw || "").replace(/^@+/, "").trim().toLowerCase();
}

async function raffleUsernameForUserId(userId) {
  if (!userId) return "";
  try {
    const rows = await redisPipeline([["HGET", USERNAMES_KEY, userId]]);
    return normalizeRaffleTelegramUsername(redisTrimmedString(rows && rows[0]));
  } catch (e) {
    return "";
  }
}

async function findRaffleTelegramUserIdByUsername(username) {
  const target = normalizeRaffleTelegramUsername(username);
  if (!target) return "";
  try {
    const rows = await redisPipeline([["HGET", "poker_app:visitor_username_to_user", target]]);
    const userId = rows && rows[0] && rows[0].result != null ? String(rows[0].result).trim() : "";
    if (/^tg_\d+$/.test(userId)) return userId;
    const legacyRows = await redisPipeline([["HGETALL", USERNAMES_KEY]]);
    const raw = legacyRows && legacyRows[0] ? legacyRows[0].result : null;
    if (Array.isArray(raw)) {
      const backfill = [];
      let matched = "";
      for (let i = 0; i < raw.length; i += 2) {
        const candidateId = String(raw[i] || "").trim();
        const candidateName = normalizeRaffleTelegramUsername(raw[i + 1]);
        if (!candidateId || !candidateName) continue;
        backfill.push(["HSET", "poker_app:visitor_username_to_user", candidateName, candidateId]);
        if (/^tg_\d+$/.test(candidateId) && candidateName === target) matched = candidateId;
      }
      if (backfill.length) await redisPipeline(backfill);
      return matched;
    }
  } catch (e) {}
  return "";
}

async function resolveRaffleWinnerTelegramChatId(winner) {
  if (!winner) return "";
  const uidRaw = winner.userId != null ? String(winner.userId).trim() : "";
  if (/^tg_\d+$/.test(uidRaw)) return uidRaw.replace(/^tg_/, "");
  if (/^\d+$/.test(uidRaw)) return uidRaw;
  const explicitUsername = normalizeRaffleTelegramUsername(winner.telegramUsername || winner.telegram_username);
  if (explicitUsername) {
    const byUsername = await findRaffleTelegramUserIdByUsername(explicitUsername);
    if (byUsername) return byUsername.replace(/^tg_/, "");
  }
  const candidates = [];
  const accountId = winner.accountId != null ? String(winner.accountId).trim() : "";
  const participantAccountId = raffleParticipantAccountId(winner);
  if (/^ID\d{6}$/.test(accountId)) candidates.push(accountId);
  if (/^ID\d{6}$/.test(participantAccountId)) candidates.push(participantAccountId);
  if (/^ID\d{6}$/.test(uidRaw)) candidates.push(uidRaw);
  const unique = [...new Set(candidates.filter(Boolean))];
  if (!unique.length) return "";
  try {
    const rows = await redisPipeline(unique.map((id) => ["HGET", ID_TO_USER_KEY, id]));
    for (let i = 0; i < unique.length; i += 1) {
      const mapped = redisTrimmedString(rows && rows[i]);
      const mappedUserId = /^tg_\d+$/.test(mapped) ? mapped : /^\d+$/.test(mapped) ? "tg_" + mapped : "";
      if (!mappedUserId) continue;
      if (explicitUsername) {
        const mappedUsername = await raffleUsernameForUserId(mappedUserId);
        if (mappedUsername !== explicitUsername) continue;
      }
      return mappedUserId.replace(/^tg_/, "");
    }
  } catch (e) {}
  return "";
}

function rafflePrizeIssuedIdText(winner) {
  if (!winner) return "";
  const p21Id = winner.p21Id != null ? String(winner.p21Id).trim() : "";
  if (p21Id) return p21Id;
  const accountId = raffleParticipantAccountId(winner) || (winner.accountId != null ? String(winner.accountId).trim() : "");
  if (accountId) return accountId;
  const uidRaw = winner.userId != null ? String(winner.userId).trim() : "";
  if (/^tg_\d+$/.test(uidRaw)) return uidRaw.replace(/^tg_/, "");
  return uidRaw;
}

function buildRafflePrizeIssuedText(raffle, winner) {
  const title = String((raffle && (raffle.title || (raffle.groups && raffle.groups[0] && raffle.groups[0].prize))) || "").trim();
  const prize = raffleWinnerPrizeText(raffle, winner);
  const idText = rafflePrizeIssuedIdText(winner);
  const parts = ["✅ Приз начислен."];
  if (title) parts.push("Розыгрыш: " + title);
  if (prize) parts.push("Приз: " + prize);
  parts.push("Приз начислен на ваш ID" + (idText ? ": " + idText : "") + ".");
  parts.push("Вас ждут в игре.");
  return parts.join("\n\n");
}

async function notifyRafflePrizeIssued(raffleId, raffle, winner) {
  if (!BOT_TOKEN || !raffleId || !winner) return false;
  const chatId = await resolveRaffleWinnerTelegramChatId(winner);
  if (!chatId) return false;
  const notifyKey = rafflePrizeNotificationKey(raffleId, winner);
  let claimed = false;
  try {
    const rows = await redisPipeline([["SET", notifyKey, "1", "EX", String(60 * 60 * 24 * 45), "NX"]]);
    claimed = redisSetNxOk(rows && rows[0]);
  } catch (e) {
    claimed = true;
  }
  if (!claimed) return false;
  try {
    const sent = await sendTelegramMessage(chatId, buildRafflePrizeIssuedText(raffle, winner));
    if (sent && sent.ok) return true;
  } catch (e) {}
  try {
    await redisPipeline([["DEL", notifyKey]]);
  } catch (eDel) {}
  return false;
}

function raffleWinnerCanReceivePrizeIssuedNotification(winner) {
  if (!winner || typeof winner !== "object") return false;
  const state = String(winner.winnerReadyState || "").trim().toLowerCase();
  if (winner.winnerReadyExpired === true || winner.winnerBurned === true) return false;
  if (state === "missed" || state === "burned") return false;
  return true;
}

async function claimRaffleCompletion(raffleId) {
  if (!raffleId) return false;
  const key = raffleLockKey(RAFFLE_COMPLETE_LOCK_PREFIX, raffleId);
  try {
    const rows = await redisPipeline([["SET", key, "1", "EX", "120", "NX"]]);
    return redisSetNxOk(rows && rows[0]);
  } catch (e) {
    return false;
  }
}

async function claimRaffleDrawSettlement(raffleId) {
  if (!raffleId) return "";
  const key = raffleLockKey(RAFFLE_COMPLETE_LOCK_PREFIX, raffleId);
  const token = crypto.randomBytes(12).toString("hex");
  try {
    const rows = await redisPipeline([["SET", key, token, "EX", String(RAFFLE_DRAW_SETTLE_LOCK_TTL_SECONDS), "NX"]]);
    return redisSetNxOk(rows && rows[0]) ? token : "";
  } catch (e) {
    return "";
  }
}

async function claimRaffleDrawSettlementWithRetry(raffleId) {
  const retryDelays = [40, 120, 240, 480];
  let token = "";
  for (let attempt = 0; attempt <= retryDelays.length && !token; attempt += 1) {
    token = await claimRaffleDrawSettlement(raffleId);
    if (token || attempt >= retryDelays.length) break;
    await delayMs(retryDelays[attempt]);
  }
  return token;
}

async function releaseRaffleDrawSettlement(raffleId, token) {
  if (!raffleId || !token) return;
  const key = raffleLockKey(RAFFLE_COMPLETE_LOCK_PREFIX, raffleId);
  try {
    const rows = await redisPipeline([["GET", key]]);
    const current = redisTrimmedString(rows && rows[0]);
    if (current === token) await redisPipeline([["DEL", key]]);
  } catch (e) {}
}

function delayMs(ms) {
  return new Promise((resolve) => setTimeout(resolve, Math.max(0, Number(ms) || 0)));
}

async function loadStoredRaffleById(raffleId) {
  if (!raffleId) return null;
  const rows = await redisPipeline([["GET", RAFFLE_PREFIX + raffleId]]);
  const raw = rows && rows[0] && rows[0].result;
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function raffleParticipantsFingerprint(raffle) {
  const rows = Array.isArray(raffle && raffle.participants) ? raffle.participants : [];
  return [
    rows.length,
    String(raffle && (raffle.updatedAt || raffle.completedAt || raffle.drawnAt || raffle.createdAt) || ""),
    rows.length ? JSON.stringify(rows[rows.length - 1]).length : 0,
  ].join(":");
}

async function loadRaffleParticipantsPage(raffle, page, limit, admin) {
  const raffleId = String(raffle && raffle.id || "").trim();
  const listKey = RAFFLE_PARTICIPANTS_PAGE_PREFIX + raffleId;
  const metaKey = RAFFLE_PARTICIPANTS_PAGE_META_PREFIX + raffleId;
  const fingerprint = raffleParticipantsFingerprint(raffle);
  const metaRows = await redisPipeline([["GET", metaKey]]);
  const storedFingerprint = String(metaRows && metaRows[0] && metaRows[0].result || "");
  if (storedFingerprint !== fingerprint) {
    const participants = Array.isArray(raffle && raffle.participants) ? raffle.participants : [];
    const commands = [["DEL", listKey]];
    for (let offset = 0; offset < participants.length; offset += 250) {
      commands.push(["RPUSH", listKey].concat(participants.slice(offset, offset + 250).map((row) => JSON.stringify(row))));
    }
    commands.push(["SET", metaKey, fingerprint, "EX", String(60 * 60 * 24 * 30)]);
    await redisPipeline(commands, { context: "raffles.participants-page-index" });
  }
  const start = (page - 1) * limit;
  const rows = await redisPipeline([["LRANGE", listKey, String(start), String(start + limit - 1)]], {
    context: "raffles.participants-page",
  });
  const participants = (Array.isArray(rows && rows[0] && rows[0].result) ? rows[0].result : [])
    .map((raw) => {
      try { return JSON.parse(raw); } catch (e) { return null; }
    })
    .filter(Boolean)
    .map((row) => admin ? row : sanitizeRaffleRowForPublicViewer(row));
  const total = Array.isArray(raffle && raffle.participants) ? raffle.participants.length : 0;
  return { participants, page, limit, total, hasMore: start + participants.length < total };
}

async function claimRaffleReadySettlement(raffleId) {
  if (!raffleId) return "";
  const key = raffleLockKey(RAFFLE_READY_SETTLE_LOCK_PREFIX, raffleId);
  const token = crypto.randomBytes(12).toString("hex");
  try {
    const rows = await redisPipeline([["SET", key, token, "EX", String(RAFFLE_READY_SETTLE_LOCK_TTL_SECONDS), "NX"]]);
    return redisSetNxOk(rows && rows[0]) ? token : "";
  } catch (e) {
    return "";
  }
}

async function claimRaffleReadySettlementWithRetry(raffleId) {
  const retryDelays = [40, 120, 240];
  let token = "";
  for (let attempt = 0; attempt <= retryDelays.length && !token; attempt += 1) {
    token = await claimRaffleReadySettlement(raffleId);
    if (token || attempt >= retryDelays.length) break;
    await delayMs(retryDelays[attempt]);
  }
  return token;
}

async function releaseRaffleReadySettlement(raffleId, token) {
  if (!raffleId || !token) return;
  const key = raffleLockKey(RAFFLE_READY_SETTLE_LOCK_PREFIX, raffleId);
  try {
    const rows = await redisPipeline([["GET", key]]);
    const current = redisTrimmedString(rows && rows[0]);
    if (current === token) await redisPipeline([["DEL", key]]);
  } catch (e) {}
}

function raffleDateMs(raw) {
  const ms = raw ? new Date(raw).getTime() : NaN;
  return Number.isFinite(ms) ? ms : 0;
}

function raffleWinnerIsReady(winner) {
  return !!(winner && (winner.winnerReady === true || String(winner.winnerReady || "").toLowerCase() === "true"));
}

function raffleWinnerReadyClickStillAcceptable(winner, now) {
  if (!winner || typeof winner !== "object") return false;
  if (winner.winnerReadyExpired === true || winner.winnerBurned === true) return false;
  const state = String(winner.winnerReadyState || "").trim().toLowerCase();
  if (state === "missed" || state === "burned") return false;
  const nowMs = now instanceof Date ? now.getTime() : Date.now();
  const deadlineMs = raffleDateMs(winner.winnerReadyDeadlineAt);
  return !deadlineMs || nowMs <= deadlineMs + RAFFLE_READY_CLICK_GRACE_MS;
}

function raffleWinnerCanRetryInitialNotification(raffle, winner, now) {
  if (!raffle || !winner || typeof winner !== "object") return false;
  if (raffleWinnerIsReady(winner)) return false;
  if (winner.winnerReadyExpired === true || winner.winnerBurned === true) return false;
  const state = String(winner.winnerReadyState || "").trim().toLowerCase();
  if (state === "missed" || state === "burned") return false;
  const nowMs = now instanceof Date ? now.getTime() : Date.now();
  const deadlineMs = raffleDateMs(winner.winnerReadyDeadlineAt);
  if (deadlineMs && deadlineMs <= nowMs) return false;
  const startMs = raffleDateMs(winner.winnerReadyWindowStartedAt) || raffleDateMs(raffle.drawnAt);
  if (!startMs) return false;
  return nowMs - startMs >= 0 && nowMs - startMs < RAFFLE_READY_WINDOW_MS;
}

function raffleReadyReminderRemainingText(deadlineAt, now) {
  const deadlineMs = raffleDateMs(deadlineAt);
  const nowMs = now instanceof Date ? now.getTime() : Date.now();
  const seconds = Math.max(0, Math.ceil((deadlineMs - nowMs) / 1000));
  const minutes = Math.floor(seconds / 60);
  const restSeconds = seconds % 60;
  if (minutes > 0 && restSeconds > 0) return minutes + " мин. " + restSeconds + " сек.";
  if (minutes > 0) return minutes + " мин.";
  return restSeconds + " сек.";
}

function raffleDrawnResultBatchGroupSet(raffle) {
  const groups = new Set();
  const batches = Array.isArray(raffle && raffle.resultBatches) ? raffle.resultBatches : [];
  batches.forEach((batch, index) => {
    if (!batch || !batch.drawnAt) return;
    raffleResultBatchGroupIndexes(raffle, batch, index).forEach((groupIndex) => groups.add(groupIndex));
  });
  return groups;
}

function raffleWinnerGroupIndexValue(winner) {
  const n = parseInt(String(winner && winner.groupIndex != null ? winner.groupIndex : ""), 10);
  return Number.isInteger(n) ? n : -1;
}

function raffleWinnerNotificationRetryRows(raffle, now) {
  if (!raffle || !Array.isArray(raffle.winners) || !raffle.winners.length) return [];
  if (raffle.status === "drawn") {
    return raffle.winners.filter((winner) => raffleWinnerCanRetryInitialNotification(raffle, winner, now));
  }
  if (raffle.status !== "active") return [];
  const drawnBatchGroups = raffleDrawnResultBatchGroupSet(raffle);
  if (!drawnBatchGroups.size) return [];
  return raffle.winners.filter((winner) => (
    drawnBatchGroups.has(raffleWinnerGroupIndexValue(winner)) &&
    raffleWinnerCanRetryInitialNotification(raffle, winner, now)
  ));
}

function raffleWinnerReadyRound(winner) {
  const n = parseInt(String(winner && winner.winnerReadyRound != null ? winner.winnerReadyRound : ""), 10);
  if (Number.isFinite(n) && n >= 0) return n;
  return winner && winner.winnerReroll ? 1 : 0;
}

function ensureRaffleWinnerReadySlotIds(raffle) {
  if (!raffle || !Array.isArray(raffle.winners)) return false;
  let changed = false;
  raffle.winners.forEach((winner, index) => {
    if (!winner || typeof winner !== "object" || winner.winnerReadySlotId) return;
    winner.winnerReadySlotId = (raffleWinnerReadyRound(winner) > 0 ? "reroll_" : "initial_") + String(index);
    changed = true;
  });
  return changed;
}

function raffleWinnerIdentityKey(row) {
  if (!row) return "";
  const accountId = raffleParticipantAccountId(row);
  if (accountId) return "account:" + accountId;
  const userId = row.userId != null ? String(row.userId).trim() : "";
  if (userId) return "user:" + userId;
  const p21Id = row.p21Id != null ? String(row.p21Id).trim() : "";
  if (p21Id) return "p21:" + p21Id;
  const telegramUsername = row.telegramUsername != null ? String(row.telegramUsername).trim().replace(/^@+/, "").toLowerCase() : "";
  if (telegramUsername) return "tglogin:" + telegramUsername;
  const name = row.name != null ? String(row.name).trim() : "";
  if (name) return "name:" + name.toLowerCase();
  return "";
}

function raffleWinnerPrizeText(raffle, winner) {
  if (winner && winner.prize != null && String(winner.prize).trim()) return String(winner.prize).trim();
  const groupIndex = parseInt(String(winner && winner.groupIndex != null ? winner.groupIndex : ""), 10);
  const groups = Array.isArray(raffle && raffle.groups) ? raffle.groups : [];
  if (Number.isFinite(groupIndex) && groupIndex >= 0 && groups[groupIndex] && groups[groupIndex].prize) {
    return String(groups[groupIndex].prize).trim();
  }
  return "";
}

function privateCashRaffleText(raffle, winner) {
  const groupsText = Array.isArray(raffle && raffle.groups)
    ? raffle.groups.map((group) => String((group && group.prize) || "")).join(" ")
    : "";
  return [
    raffle && raffle.title,
    raffle && raffle.cardTitle,
    raffle && raffle.cardSubtitle,
    groupsText,
    raffleWinnerPrizeText(raffle, winner),
  ].map((value) => String(value || "").toLowerCase()).join(" ");
}

function raffleWinnerNeedsPrivateCashRegistration(raffle, winner) {
  const explicit = String((winner && (winner.prizeAction || winner.fulfillment || winner.rewardType)) || (raffle && (raffle.prizeAction || raffle.fulfillment || raffle.rewardType)) || "")
    .trim()
    .toLowerCase();
  if (explicit === "private_cash" || explicit === "private-cash") return true;
  const text = privateCashRaffleText(raffle, winner);
  return !!(
    text.includes("приватный кеш") ||
    text.includes("приватного кеш") ||
    text.includes("приватном кеш") ||
    text.includes("private cash") ||
    text.includes("private_cash")
  );
}

function privateCashEventKey(id) {
  return PRIVATE_CASH_EVENT_PREFIX + String(id || "").trim();
}

function privateCashParticipantsKey(id) {
  return PRIVATE_CASH_PARTICIPANTS_PREFIX + String(id || "").trim();
}

function privateCashEventSortValue(event) {
  return String((event && event.date) || "") + "T" + String((event && event.time) || "99:99");
}

function cleanPrivateCashText(value, max) {
  return String(value == null ? "" : value)
    .trim()
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .slice(0, max || 240);
}

function parsePrivateCashJson(raw, fallback) {
  if (raw == null || raw === "") return fallback;
  try {
    return JSON.parse(String(raw));
  } catch (e) {
    return fallback;
  }
}

function normalizePrivateCashEvent(raw) {
  const event = raw && typeof raw === "object" ? raw : {};
  return {
    id: cleanPrivateCashText(event.id, 80),
    date: cleanPrivateCashText(event.date, 16),
    time: cleanPrivateCashText(event.time, 8),
    gameType: cleanPrivateCashText(event.gameType, 40),
    stakes: cleanPrivateCashText(event.stakes, 80),
    buyIn: cleanPrivateCashText(event.buyIn, 80),
    status: event.status === "closed" ? "closed" : "active",
  };
}

function normalizePrivateCashParticipant(row) {
  const p = row && typeof row === "object" ? row : {};
  const rawSeatIndex = Number.parseInt(p.seatIndex, 10);
  return {
    accountId: cleanPrivateCashText(p.accountId, 80),
    memberId: cleanPrivateCashText(p.memberId, 80),
    displayName: cleanPrivateCashText(p.displayName, 80) || "Игрок",
    pokerPlusNickname: cleanPrivateCashText(p.pokerPlusNickname || p.poker21Nickname || p.nickname || p.nick, 80),
    p21Id: cleanPrivateCashText(p.p21Id, 80),
    telegramUsername: cleanPrivateCashText(p.telegramUsername, 60).replace(/^@+/, ""),
    status: p.status === "approved" || p.status === "rejected" ? p.status : "pending",
    joinedAt: cleanPrivateCashText(p.joinedAt, 40),
    approvedAt: cleanPrivateCashText(p.approvedAt, 40),
    seatIndex: Number.isFinite(rawSeatIndex) && rawSeatIndex >= 0 ? rawSeatIndex : -1,
  };
}

function privateCashHashRows(raw) {
  const out = [];
  if (!Array.isArray(raw)) return out;
  for (let i = 0; i + 1 < raw.length; i += 2) {
    const row = parsePrivateCashJson(raw[i + 1], null);
    if (row && typeof row === "object") out.push(row);
  }
  return out;
}

function privateCashSeatIndex(row, fallbackIndex) {
  const p = normalizePrivateCashParticipant(row);
  return p.seatIndex >= 0 ? p.seatIndex : fallbackIndex;
}

function pickPrivateCashSeatForRaffleWinner(rows, accountId, old) {
  const occupied = new Set();
  let reserveCount = 0;
  (Array.isArray(rows) ? rows : []).forEach((row, index) => {
    const p = normalizePrivateCashParticipant(row);
    if (!p.accountId || p.accountId === accountId || p.status === "rejected") return;
    const seatIndex = privateCashSeatIndex(p, index);
    if (seatIndex >= 0 && seatIndex < PRIVATE_CASH_IN_GAME_SEAT_COUNT) occupied.add(seatIndex);
    else reserveCount += 1;
  });
  const oldSeatIndex = privateCashSeatIndex(old, -1);
  if (old && old.accountId && oldSeatIndex >= 0 && oldSeatIndex < PRIVATE_CASH_IN_GAME_SEAT_COUNT && !occupied.has(oldSeatIndex)) {
    return oldSeatIndex;
  }
  const available = [];
  for (let i = 0; i < PRIVATE_CASH_IN_GAME_SEAT_COUNT; i += 1) {
    if (!occupied.has(i)) available.push(i);
  }
  if (available.length) return available[crypto.randomInt(available.length)];
  return PRIVATE_CASH_IN_GAME_SEAT_COUNT + reserveCount;
}

function pickPrivateCashReserveSeatForRaffleWinner(rows, accountId, old) {
  const oldSeatIndex = privateCashSeatIndex(old, -1);
  if (old && old.accountId && oldSeatIndex >= PRIVATE_CASH_IN_GAME_SEAT_COUNT) return oldSeatIndex;
  let reserveCount = 0;
  (Array.isArray(rows) ? rows : []).forEach((row, index) => {
    const p = normalizePrivateCashParticipant(row);
    if (!p.accountId || p.accountId === accountId || p.status === "rejected") return;
    const seatIndex = privateCashSeatIndex(p, index);
    if (seatIndex >= PRIVATE_CASH_IN_GAME_SEAT_COUNT) reserveCount += 1;
  });
  return PRIVATE_CASH_IN_GAME_SEAT_COUNT + reserveCount;
}

async function resolveRaffleWinnerPrivateCashAccountId(winner) {
  const accountId = raffleParticipantAccountId(winner);
  if (accountId) return accountId;
  const userId = winner && winner.userId != null ? String(winner.userId).trim() : "";
  if (!userId || userId.startsWith("guest_") || /^manual_raffle_/i.test(userId)) return "";
  try {
    return await ensureDtIdForUserId(userId);
  } catch (e) {
    return "";
  }
}

async function findActivePrivateCashEventForRafflePrize() {
  const idRows = await redisPipeline([["LRANGE", PRIVATE_CASH_EVENTS_KEY, "0", "11"]]);
  const ids = (idRows && idRows[0] && Array.isArray(idRows[0].result) ? idRows[0].result : [])
    .map((id) => cleanPrivateCashText(id, 80))
    .filter(Boolean);
  if (!ids.length) return null;
  const eventRows = await redisPipeline(ids.map((id) => ["GET", privateCashEventKey(id)]));
  const events = [];
  for (let i = 0; i < ids.length; i += 1) {
    const event = normalizePrivateCashEvent(parsePrivateCashJson(eventRows && eventRows[i] && eventRows[i].result, null));
    if (event.id && event.status === "active") events.push(event);
  }
  return events.sort((a, b) => privateCashEventSortValue(a).localeCompare(privateCashEventSortValue(b)))[0] || null;
}

async function registerRaffleWinnerInPrivateCash(raffle, winner, now) {
  if (!raffleWinnerNeedsPrivateCashRegistration(raffle, winner)) return null;
  const accountId = await resolveRaffleWinnerPrivateCashAccountId(winner);
  if (!accountId) return { ok: false, error: "no_account" };
  const event = await findActivePrivateCashEventForRafflePrize();
  if (!event || !event.id) return { ok: false, error: "no_active_event" };
  const memberId = cleanPrivateCashText((winner && winner.userId) || "", 80);
  const key = privateCashParticipantsKey(event.id);
  const rows = await redisPipeline([
    ["HGET", key, accountId],
    ["HGETALL", key],
  ]);
  const old = normalizePrivateCashParticipant(parsePrivateCashJson(rows && rows[0] && rows[0].result, null));
  if (old.accountId && old.status === "rejected") return { ok: false, error: "rejected" };
  const allRows = privateCashHashRows(rows && rows[1] && rows[1].result).map(normalizePrivateCashParticipant);
  const approvedAt = now instanceof Date ? now.toISOString() : new Date().toISOString();
  const participant = normalizePrivateCashParticipant({
    accountId,
    memberId: memberId || old.memberId,
    displayName: (winner && (winner.pokerPlusNickname || winner.name)) || old.displayName || "Игрок",
    pokerPlusNickname: winner && winner.pokerPlusNickname,
    p21Id: winner && winner.p21Id,
    telegramUsername: winner && winner.telegramUsername,
    status: old.status === "approved" ? "approved" : "pending",
    joinedAt: old.joinedAt || approvedAt,
    approvedAt: old.approvedAt || "",
    seatIndex: pickPrivateCashReserveSeatForRaffleWinner(allRows, accountId, old),
  });
  const setRes = await redisPipeline([["HSET", key, accountId, JSON.stringify(participant)]]);
  if (!setRes || setRes[0].error) return { ok: false, error: "write_failed" };
  return { ok: true, eventId: event.id, participant };
}

function findRaffleWinnerByRequest(winners, winnerUserId, winnerSlotId) {
  const list = Array.isArray(winners) ? winners : [];
  const slot = String(winnerSlotId || "").trim();
  if (slot) {
    const bySlot = list.find((w) => String((w && (w.winnerReadySlotId || w.winnerSlotId)) || "").trim() === slot);
    if (bySlot) return bySlot;
  }
  const userId = String(winnerUserId || "").trim();
  if (!userId) return null;
  return list.find((w) => String(w && w.userId != null ? w.userId : "").trim() === userId) || null;
}

function rafflePrizeAmount(prize) {
  const text = prize != null ? String(prize).replace(/\u00a0|\u202f/g, " ") : "";
  if (!text) return 0;
  const match = text.match(/(\d[\d\s]*(?:[.,]\d+)?)\s*(?:₽|р\.?|руб\.?)/i);
  if (!match) return 0;
  const n = parseFloat(String(match[1]).replace(/\s+/g, "").replace(",", "."));
  return Number.isFinite(n) && n > 0 ? n : 0;
}

function currentMoscowWeekRange(now) {
  const nowMs = now instanceof Date ? now.getTime() : new Date(now || Date.now()).getTime();
  const cutoffMs = 6 * 60 * 60 * 1000;
  const shifted = new Date(nowMs + 3 * 60 * 60 * 1000 - cutoffMs);
  const mondayOffset = (shifted.getUTCDay() + 6) % 7;
  const startShiftedMs = Date.UTC(
    shifted.getUTCFullYear(),
    shifted.getUTCMonth(),
    shifted.getUTCDate() - mondayOffset,
    6
  );
  const startMs = startShiftedMs - 3 * 60 * 60 * 1000;
  return { startMs, endMs: startMs + 7 * 24 * 60 * 60 * 1000 };
}

function raffleWinnerIsReroll(winner) {
  if (!winner) return false;
  const round = Number.parseInt(winner.winnerReadyRound, 10);
  return winner.winnerReroll === true || (Number.isFinite(round) && round > 0);
}

function raffleWinnerPrizeText(raffle, winner) {
  if (winner && winner.prize) return winner.prize;
  const groupIndex = Number.parseInt(winner && winner.groupIndex, 10);
  const groups = Array.isArray(raffle && raffle.groups) ? raffle.groups : [];
  return Number.isInteger(groupIndex) && groups[groupIndex] ? groups[groupIndex].prize : "";
}

function currentWeekRaffleWinnerReturnAmount(raffle, winner, range) {
  if (!winner) return 0;
  const seatStatus = String(winner.winnerSeatStatus || "").toLowerCase();
  const cashoutStatus = String(winner.winnerCashoutStatus || "").toLowerCase();
  if (seatStatus !== "not_seated" && cashoutStatus !== "plus") return 0;
  const raffleDate = raffle && (raffle.drawnAt || raffle.completedAt || raffle.endDate || raffle.createdAt);
  const returnedMs = new Date(raffleDate || "").getTime();
  if (!Number.isFinite(returnedMs) || returnedMs < range.startMs || returnedMs >= range.endMs) return 0;
  if (seatStatus === "not_seated") {
    return rafflePrizeAmount(raffleWinnerPrizeText(raffle, winner));
  }
  return Math.max(0, Number(winner.winnerCashoutAmount) || 0);
}

function emptyCurrentWeekRaffleIssueTotals(range) {
  return {
    ticket: { issued: 0, returned: 0 },
    cash: { issued: 0, returned: 0 },
    returnCount: 0,
    weekStart: new Date(range.startMs).toISOString(),
    weekEnd: new Date(range.endMs).toISOString(),
  };
}

function currentWeekRaffleIssueTotalsFromRaffles(raffles, now) {
  const range = currentMoscowWeekRange(now);
  const totals = emptyCurrentWeekRaffleIssueTotals(range);
  (Array.isArray(raffles) ? raffles : []).forEach((raffle) => {
    const prizeKind = String(raffle && (raffle.prizeKind || raffle.prize_kind) || "").toLowerCase() === "cash"
      ? "cash"
      : "ticket";
    (Array.isArray(raffle && raffle.winners) ? raffle.winners : []).forEach((winner) => {
      if (!winner) return;
      const prizeAmount = rafflePrizeAmount(raffleWinnerPrizeText(raffle, winner));
      const raffleDate = raffle && (raffle.drawnAt || raffle.completedAt || raffle.endDate || raffle.createdAt);
      const raffleMs = new Date(raffleDate || "").getTime();
      const issuedMs = new Date(winner.winnerStatusAt || "").getTime();
      if (String(winner.winnerStatus || "").toLowerCase() === "ok" &&
          Number.isFinite(issuedMs) && issuedMs >= range.startMs && issuedMs < range.endMs) {
        totals[prizeKind].issued += prizeAmount;
      }
      if (String(winner.winnerSeatStatus || "").toLowerCase() === "not_seated" &&
          Number.isFinite(raffleMs) && raffleMs >= range.startMs && raffleMs < range.endMs) {
        totals[prizeKind].returned += prizeAmount;
        totals.returnCount += 1;
        return;
      }
      if (String(winner.winnerCashoutStatus || "").toLowerCase() === "plus" &&
          Number.isFinite(raffleMs) && raffleMs >= range.startMs && raffleMs < range.endMs) {
        totals[prizeKind].returned += Math.max(0, Number(winner.winnerCashoutAmount) || 0);
        totals.returnCount += 1;
      }
    });
  });
  ["ticket", "cash"].forEach((kind) => {
    totals[kind].issued = Math.round(totals[kind].issued);
    totals[kind].returned = Math.round(totals[kind].returned);
  });
  return totals;
}

async function loadCurrentWeekRaffleIssueTotals(now) {
  const range = currentMoscowWeekRange(now);
  const weekCacheKey = RAFFLE_WEEK_ISSUE_TOTALS_CACHE_PREFIX + new Date(range.startMs).toISOString();
  const cachedRows = await redisPipeline([["GET", weekCacheKey]], {
    timeoutMs: 2500,
    context: "raffles.currentWeekIssueTotals.cache.get",
  });
  const cachedRaw = cachedRows && cachedRows[0] && cachedRows[0].result;
  if (cachedRaw) {
    try {
      const cached = JSON.parse(String(cachedRaw));
      if (cached && typeof cached === "object") return cached;
    } catch (e) {}
  }
  const idsRows = await redisPipeline([["LRANGE", RAFFLE_IDS_KEY, "0", "-1"]], {
    timeoutMs: 6500,
    context: "raffles.currentWeekIssueTotals.ids",
    allowLargeRedisRead: true,
  });
  const ids = [...new Set(Array.isArray(idsRows && idsRows[0] && idsRows[0].result)
    ? idsRows[0].result.map(String).filter(Boolean)
    : [])];
  const raffles = [];
  for (let offset = 0; offset < ids.length; offset += 80) {
    const batch = ids.slice(offset, offset + 80);
    const rows = await redisPipeline(batch.map((id) => ["GET", RAFFLE_PREFIX + id]), {
      timeoutMs: 6500,
      context: "raffles.currentWeekIssueTotals.rows",
    });
    (Array.isArray(rows) ? rows : []).forEach((row) => {
      try {
        const raffle = row && row.result ? JSON.parse(row.result) : null;
        if (raffle) raffles.push(raffle);
      } catch (e) {}
    });
  }
  const totals = currentWeekRaffleIssueTotalsFromRaffles(raffles, now);
  await redisPipeline([["SET", weekCacheKey, JSON.stringify(totals), "EX", "300"]], {
    timeoutMs: 2500,
    context: "raffles.currentWeekIssueTotals.cache.set",
  }).catch(() => {});
  return totals;
}

async function loadCurrentWeekRaffleReturns(now) {
  const totals = await loadCurrentWeekRaffleIssueTotals(now);
  return {
    amount: totals.ticket.returned + totals.cash.returned,
    count: totals.returnCount,
    weekStart: totals.weekStart,
    weekEnd: totals.weekEnd,
  };
}

function raffleSummaryPersonKey(row) {
  if (!row || typeof row !== "object") return "";
  const accountId = String(row.accountId || row.dtId || "").trim();
  if (accountId) return "account:" + accountId;
  const userId = String(row.userId != null ? row.userId : "").trim();
  if (userId) return "user:" + userId;
  const p21Id = String(row.p21Id != null ? row.p21Id : "").trim();
  if (p21Id) return "p21:" + p21Id;
  const name = String(row.name || row.pokerPlusNickname || "").trim().toLowerCase();
  return name ? "name:" + name : "";
}

function raffleSummaryTotalPrize(raffle, groupFilter) {
  const groups = Array.isArray(raffle && raffle.groups) ? raffle.groups : [];
  return groups.reduce((sum, group, index) => {
    if (groupFilter && !groupFilter(index)) return sum;
    const count = Math.max(0, parseInt(String(group && group.count || "0"), 10) || 0);
    const nominal = rafflePrizeAmount(group && group.prize);
    return sum + (nominal > 0 ? nominal * count : 0);
  }, 0);
}

function raffleSummaryCompletedRaffle(raffle, nowMs) {
  if (!raffle || typeof raffle !== "object") return false;
  const status = String(raffle.status || "").trim().toLowerCase();
  if (status === "cancelled" || status === "canceled" || status === "deleted") return false;
  if (status && status !== "active") return true;
  const endMs = new Date(raffle.endDate || "").getTime();
  return Number.isFinite(endMs) && endMs <= nowMs;
}

function raffleSummaryCompletedTimeMs(raffle) {
  const raw = raffle && (raffle.drawnAt || raffle.completedAt || raffle.completed_at || raffle.endDate || raffle.createdAt);
  const ms = new Date(raw || "").getTime();
  return Number.isFinite(ms) ? ms : 0;
}

function buildRafflesSummaryPayload(raffles) {
  const list = Array.isArray(raffles) ? raffles : [];
  const nowMs = Date.now();
  const participantKeys = new Set();
  const winnerKeys = new Set();
  let completedCount = 0;
  let completedPrizeSumRub = 0;

  list.forEach((raffle) => {
    const participants = Array.isArray(raffle && raffle.participants) ? raffle.participants : [];
    const winners = Array.isArray(raffle && raffle.winners) ? raffle.winners : [];
    participants.forEach((row) => {
      const key = raffleSummaryPersonKey(row);
      if (key) participantKeys.add(key);
    });
    winners.forEach((row) => {
      const key = raffleSummaryPersonKey(row);
      if (key) participantKeys.add(key);
    });

    if (raffleSummaryCompletedRaffle(raffle, nowMs)) {
      completedCount += 1;
      completedPrizeSumRub += raffleSummaryTotalPrize(raffle);
      winners.forEach((row) => {
        const key = raffleSummaryPersonKey(row);
        if (key) winnerKeys.add(key);
      });
    }

    if (String(raffle && raffle.status || "").trim().toLowerCase() !== "active") return;
    const batches = Array.isArray(raffle && raffle.resultBatches) ? raffle.resultBatches : [];
    if (!batches.length || !winners.length) return;
    batches.forEach((batch, index) => {
      const batchMs = new Date(batch && (batch.drawnAt || batch.endDate) || "").getTime();
      if (!Number.isFinite(batchMs) || batchMs > nowMs) return;
      const groupIndexes = Array.isArray(batch && batch.groupIndexes) ? batch.groupIndexes : [index];
      const groupSet = new Set(groupIndexes.map((value) => parseInt(String(value), 10)).filter(Number.isFinite));
      if (!groupSet.size) return;
      const batchWinners = winners.filter((winner) => {
        const groupIndex = parseInt(String(winner && winner.groupIndex != null ? winner.groupIndex : ""), 10);
        return Number.isFinite(groupIndex) && groupSet.has(groupIndex);
      });
      if (!batchWinners.length) return;
      completedCount += 1;
      completedPrizeSumRub += raffleSummaryTotalPrize(raffle, (groupIndex) => groupSet.has(groupIndex));
      batchWinners.forEach((row) => {
        const key = raffleSummaryPersonKey(row);
        if (key) winnerKeys.add(key);
      });
    });
  });

  return {
    completedCount,
    completedPrizeSumRub: Math.round(completedPrizeSumRub),
    uniqueParticipantsCount: participantKeys.size,
    uniqueWinnersCount: winnerKeys.size,
    cachedAt: new Date().toISOString(),
  };
}

function shuffleRaffleRows(rows) {
  const out = Array.isArray(rows) ? rows.slice() : [];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function ensureRaffleReadyWindow(raffle, winner, index, startedMs, round) {
  if (!winner || typeof winner !== "object") return false;
  let changed = false;
  const startMs = Number.isFinite(startedMs) && startedMs > 0 ? startedMs : Date.now();
  const startIso = new Date(startMs).toISOString();
  const deadlineIso = new Date(startMs + RAFFLE_READY_WINDOW_MS).toISOString();
  if (winner.winnerReadyRound == null) {
    winner.winnerReadyRound = round;
    changed = true;
  }
  if (!winner.winnerReadySlotId) {
    winner.winnerReadySlotId = (round > 0 ? "reroll_" : "initial_") + String(index);
    changed = true;
  }
  if (!winner.winnerReadyWindowStartedAt) {
    winner.winnerReadyWindowStartedAt = startIso;
    changed = true;
  }
  if (!winner.winnerReadyDeadlineAt) {
    winner.winnerReadyDeadlineAt = deadlineIso;
    changed = true;
  }
  if (raffleWinnerIsReady(winner)) {
    if (winner.winnerReadyState !== "ready") {
      winner.winnerReadyState = "ready";
      changed = true;
    }
  } else if (!winner.winnerReadyState) {
    winner.winnerReadyState = "pending";
    changed = true;
  }
  return changed;
}

function initializeRaffleReadyWindows(raffle, now) {
  if (!raffle || !Array.isArray(raffle.winners) || raffle.winners.length === 0) return false;
  const startMs = raffleDateMs(raffle.drawnAt) || (now instanceof Date ? now.getTime() : Date.now());
  let changed = false;
  if (raffle.winnerReadyWindowMs !== RAFFLE_READY_WINDOW_MS) {
    raffle.winnerReadyWindowMs = RAFFLE_READY_WINDOW_MS;
    changed = true;
  }
  raffle.winners.forEach((winner, index) => {
    if (ensureRaffleReadyWindow(raffle, winner, index, startMs, 0)) changed = true;
  });
  return changed;
}

function raffleReadyMaxRerollRound(raffle) {
  return inferRafflePrizeKind(raffle) === "cash"
    ? RAFFLE_CASH_MAX_REROLL_ROUND
    : RAFFLE_DEFAULT_MAX_REROLL_ROUND;
}

function addRaffleBurnedPrize(raffle, winner, nowIso, reason, slotIndex) {
  if (!raffle || !winner) return false;
  if (!raffle.readyBurned || typeof raffle.readyBurned !== "object" || Array.isArray(raffle.readyBurned)) {
    raffle.readyBurned = { count: 0, totalPrizeAmount: 0, items: [] };
  }
  const summary = raffle.readyBurned;
  if (!Array.isArray(summary.items)) summary.items = [];
  const prize = raffleWinnerPrizeText(raffle, winner);
  const amount = rafflePrizeAmount(prize);
  const burnKey = [
    reason || "timeout",
    winner.winnerReadySlotId || ("slot_" + String(slotIndex || 0)),
    raffleWinnerIdentityKey(winner) || "",
    winner.groupIndex != null ? String(winner.groupIndex) : "",
    prize,
  ].join("|");
  if (summary.items.some((item) => item && item.burnKey === burnKey)) return false;
  summary.items.push({
    burnKey,
    reason: reason || "timeout",
    at: nowIso,
    prize,
    prizeAmount: amount,
    groupIndex: winner.groupIndex != null ? winner.groupIndex : -1,
    userId: winner.userId != null ? String(winner.userId).trim() : "",
    accountId: winner.accountId != null ? String(winner.accountId).trim() : "",
    p21Id: winner.p21Id != null ? String(winner.p21Id).trim() : "",
    name: winner.name != null ? String(winner.name).trim() : "",
  });
  summary.count = summary.items.length;
  summary.totalPrizeAmount = summary.items.reduce((sum, item) => sum + (parseFloat(item && item.prizeAmount) || 0), 0);
  summary.updatedAt = nowIso;
  return true;
}

function createRerollWinnerFromParticipant(raffle, participant, missedWinner, nowIso, nowMs, index, round) {
  const row = { ...(participant || {}) };
  row.groupIndex = missedWinner && missedWinner.groupIndex != null ? missedWinner.groupIndex : -1;
  row.prize = raffleWinnerPrizeText(raffle, missedWinner);
  if (!row.prize && missedWinner && missedWinner.prize != null) row.prize = String(missedWinner.prize || "");
  if (participant && participant.winnerTicketIndex != null) row.winnerTicketIndex = participant.winnerTicketIndex;
  if (participant && participant.winnerTicketCount != null) row.winnerTicketCount = participant.winnerTicketCount;
  row.winnerReadyRound = Math.max(1, Math.min(RAFFLE_CASH_MAX_REROLL_ROUND, parseInt(round, 10) || 1));
  row.winnerReroll = true;
  row.winnerRerollAt = nowIso;
  row.winnerRerollFromUserId = missedWinner && missedWinner.userId != null ? String(missedWinner.userId).trim() : "";
  row.winnerRerollFromAccountId = missedWinner ? raffleParticipantAccountId(missedWinner) : "";
  row.winnerRerollFromP21Id = missedWinner && missedWinner.p21Id != null ? String(missedWinner.p21Id).trim() : "";
  row.winnerRerollFromTelegramUsername = missedWinner && missedWinner.telegramUsername != null ? String(missedWinner.telegramUsername).trim().replace(/^@+/, "") : "";
  row.winnerRerollFromName = missedWinner && missedWinner.name != null ? String(missedWinner.name).trim() : "";
  row.winnerRerollFromSlotId = missedWinner && missedWinner.winnerReadySlotId != null ? String(missedWinner.winnerReadySlotId).trim() : "";
  row.winnerReadySlotId = "reroll_" + String(nowMs) + "_" + String(index);
  row.winnerReadyWindowStartedAt = nowIso;
  row.winnerReadyDeadlineAt = new Date(nowMs + RAFFLE_READY_WINDOW_MS).toISOString();
  row.winnerReadyState = "pending";
  delete row.winnerReady;
  delete row.winnerReadyAt;
  delete row.winnerReadyBy;
  delete row.winnerReadyAccountId;
  delete row.winnerReadyExpired;
  delete row.winnerReadyMissedAt;
  delete row.winnerBurned;
  delete row.winnerBurnedAt;
  delete row.winnerStatus;
  return row;
}

function raffleReadyWindowsNeedSettlement(raffle, now) {
  if (!raffle || !Array.isArray(raffle.winners) || raffle.winners.length === 0) {
    return false;
  }
  const nowDate = now instanceof Date ? now : new Date();
  const nowMs = nowDate.getTime();
  if (
    raffle.winnerReadyWindowMs !== RAFFLE_READY_WINDOW_MS &&
    raffle.winners.some((w) => w && w.winnerReadyDeadlineAt)
  ) {
    return true;
  }
  return raffle.winners.some((winner) => {
    if (!winner || typeof winner !== "object") return false;
    if (winner.winnerReadySlotId == null && winner.winnerReadyDeadlineAt) return true;
    if (raffleWinnerIsReady(winner) && winner.winnerReadyState !== "ready") return true;
    const deadlineMs = raffleDateMs(winner.winnerReadyDeadlineAt);
    return !!(
      deadlineMs &&
      deadlineMs <= nowMs &&
      winner.winnerReadyExpired !== true &&
      winner.winnerBurned !== true &&
      !raffleWinnerIsReady(winner)
    );
  });
}

function settleRaffleReadyWindows(raffle, now) {
  if (!raffle || !Array.isArray(raffle.winners) || raffle.winners.length === 0) {
    return { changed: false, rerolled: false, rerollWinners: [] };
  }
  const nowDate = now instanceof Date ? now : new Date();
  const nowMs = nowDate.getTime();
  const nowIso = nowDate.toISOString();
  let changed = false;
  let rerolled = false;
  const rerollWinners = [];
  if (raffle.winnerReadyWindowMs !== RAFFLE_READY_WINDOW_MS && raffle.winners.some((w) => w && w.winnerReadyDeadlineAt)) {
    raffle.winnerReadyWindowMs = RAFFLE_READY_WINDOW_MS;
    changed = true;
  }

  const missedForReroll = [];
  const maxRerollRound = raffleReadyMaxRerollRound(raffle);
  raffle.winners.forEach((winner, index) => {
    if (!winner || typeof winner !== "object") return;
    if (winner.winnerReadySlotId == null && winner.winnerReadyDeadlineAt) {
      winner.winnerReadySlotId = (raffleWinnerReadyRound(winner) > 0 ? "reroll_" : "initial_") + String(index);
      changed = true;
    }
    if (raffleWinnerIsReady(winner)) {
      if (winner.winnerReadyState !== "ready") {
        winner.winnerReadyState = "ready";
        changed = true;
      }
      return;
    }
    const deadlineMs = raffleDateMs(winner.winnerReadyDeadlineAt);
    if (!deadlineMs || deadlineMs > nowMs || winner.winnerReadyExpired === true || winner.winnerBurned === true) return;
    const round = raffleWinnerReadyRound(winner);
    winner.winnerReadyExpired = true;
    winner.winnerReadyMissedAt = nowIso;
    if (round < maxRerollRound) {
      winner.winnerReadyState = "missed";
      missedForReroll.push({ winner, index, nextRound: round + 1 });
    } else {
      winner.winnerReadyState = "burned";
      winner.winnerBurned = true;
      winner.winnerBurnedAt = nowIso;
      addRaffleBurnedPrize(raffle, winner, nowIso, "reroll_timeout", index);
    }
    changed = true;
  });

  if (missedForReroll.length > 0) {
    const usedKeys = new Set();
    raffle.winners.forEach((winner) => {
      const key = raffleWinnerIdentityKey(winner);
      if (key) usedKeys.add(key);
    });
    const eligibleParticipants = raffleEligibleParticipantsForDraw(raffle);
    const candidateSource = raffleUsesWeightedTickets(raffle)
      ? buildWeightedTicketPool(eligibleParticipants).map((entry) => ({
          ...(entry.participant || {}),
          winnerTicketIndex: entry.ticketIndex,
          winnerTicketCount: entry.ticketCount,
        }))
      : eligibleParticipants;
    const candidates = shuffleRaffleRows(candidateSource).filter((participant) => {
      const key = raffleWinnerIdentityKey(participant);
      return key && !usedKeys.has(key);
    });
    let replacementsCount = 0;
    const replacementRounds = [];
    missedForReroll.forEach((slot, index) => {
      let candidate = null;
      while (candidates.length > 0 && !candidate) {
        const next = candidates.shift();
        const nextKey = raffleWinnerIdentityKey(next);
        if (!nextKey || usedKeys.has(nextKey)) continue;
        if (!raffleParticipantEligibleForGroupDraw(raffle, next, slot.winner && slot.winner.groupIndex)) continue;
        candidate = next;
      }
      if (!candidate) {
        slot.winner.winnerBurned = true;
        slot.winner.winnerBurnedAt = nowIso;
        addRaffleBurnedPrize(raffle, slot.winner, nowIso, "no_reroll_candidate", slot.index);
        return;
      }
      const key = raffleWinnerIdentityKey(candidate);
      if (key) usedKeys.add(key);
      const replacement = createRerollWinnerFromParticipant(raffle, candidate, slot.winner, nowIso, nowMs, raffle.winners.length + index, slot.nextRound);
      raffle.winners.push(replacement);
      rerollWinners.push(replacement);
      replacementRounds.push(slot.nextRound);
      replacementsCount += 1;
      rerolled = true;
    });
    if (rerolled) {
      if (!Array.isArray(raffle.rerolls)) raffle.rerolls = [];
      const uniqueRounds = [...new Set(replacementRounds)];
      raffle.rerolls.push({
        at: nowIso,
        round: uniqueRounds.length === 1 ? uniqueRounds[0] : null,
        rounds: uniqueRounds,
        count: replacementsCount,
      });
      raffle.lastRerollAt = nowIso;
    }
    changed = true;
  }

  return { changed, rerolled, rerollWinners };
}

async function settleRaffleReadyWindowsSafely(raffleId, raffle, now) {
  const empty = { raffle, changed: false, rerolled: false, rerollWinners: [], locked: false, persisted: false };
  if (!raffleReadyWindowsNeedSettlement(raffle, now)) return empty;

  const token = await claimRaffleReadySettlementWithRetry(raffleId);

  if (!token) {
    let latest = raffle;
    try {
      latest = (await loadStoredRaffleById(raffleId)) || raffle;
    } catch (eLoad) {}
    return { ...empty, raffle: latest, locked: true };
  }

  try {
    const latest = (await loadStoredRaffleById(raffleId)) || raffle;
    if (!raffleReadyWindowsNeedSettlement(latest, now)) {
      return { ...empty, raffle: latest };
    }
    const settlement = settleRaffleReadyWindows(latest, now);
    if (settlement.changed) {
      const setRes = await redisPipeline([["SET", RAFFLE_PREFIX + raffleId, JSON.stringify(latest)]]);
      if (!setRes || setRes[0].error) {
        throw new Error("Ошибка записи реролла");
      }
    }
    return { ...settlement, raffle: latest, locked: false, persisted: !!settlement.changed };
  } finally {
    await releaseRaffleReadySettlement(raffleId, token);
  }
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function normalizeDailyStartTime(raw) {
  const m = String(raw || "").trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!m) return "";
  const hh = parseInt(m[1], 10);
  const mm = parseInt(m[2], 10);
  if (!Number.isFinite(hh) || !Number.isFinite(mm) || hh < 0 || hh > 23 || mm < 0 || mm > 59) return "";
  return `${pad2(hh)}:${pad2(mm)}`;
}

function boolFromBody(value) {
  if (value === true || value === 1) return true;
  const s = String(value || "").trim().toLowerCase();
  return s === "1" || s === "true" || s === "yes" || s === "on";
}

function moscowParts(date) {
  const d = new Date(date.getTime() + MSK_OFFSET_MS);
  return {
    year: d.getUTCFullYear(),
    month: d.getUTCMonth() + 1,
    day: d.getUTCDate(),
  };
}

function moscowDateTimeToUtc(parts, time) {
  const [hh, mm] = String(time).split(":").map((n) => parseInt(n, 10) || 0);
  return new Date(Date.UTC(parts.year, parts.month - 1, parts.day, hh - 3, mm, 0, 0));
}

function addMoscowDays(date, days) {
  const parts = moscowParts(date);
  const moscow = new Date(date.getTime() + MSK_OFFSET_MS);
  const time = `${pad2(moscow.getUTCHours())}:${pad2(moscow.getUTCMinutes())}`;
  return moscowDateTimeToUtc({ year: parts.year, month: parts.month, day: parts.day + days }, time);
}

function nextMoscowDailyStartAfter(date, time, forceNextDay) {
  const parts = moscowParts(date);
  let start = moscowDateTimeToUtc(parts, time);
  if (forceNextDay || start <= date) {
    start = moscowDateTimeToUtc({ year: parts.year, month: parts.month, day: parts.day + 1 }, time);
  }
  return start;
}

function moscowDailyStartOnOrBefore(date, time) {
  const base = date instanceof Date && !isNaN(date.getTime()) ? date : new Date();
  const parts = moscowParts(base);
  let start = moscowDateTimeToUtc(parts, time);
  if (start > base) {
    start = moscowDateTimeToUtc({ year: parts.year, month: parts.month, day: parts.day - 1 }, time);
  }
  return start;
}

function raffleDurationMs(createdAt, endDate) {
  const startMs = createdAt ? new Date(createdAt).getTime() : NaN;
  const endMs = endDate ? new Date(endDate).getTime() : NaN;
  const duration = Number.isFinite(startMs) && Number.isFinite(endMs) ? endMs - startMs : NaN;
  if (!Number.isFinite(duration) || duration < MIN_DAILY_RAFFLE_DURATION_MS) return DEFAULT_DAILY_RAFFLE_DURATION_MS;
  return duration;
}

function normalizeRafflePrizeKind(raw) {
  const s = String(raw || "").trim().toLowerCase();
  if (!s) return "";
  if (["cash", "cash_buyin", "cash_buyins", "cash-backing", "other"].includes(s)) return "cash";
  if (["ticket", "tickets", "tournament", "tournament_ticket", "tournament_tickets"].includes(s)) return "tournament_ticket";
  return "";
}

function normalizeRafflePrizeAction(raw) {
  const s = String(raw || "").trim().toLowerCase();
  if (s === "private_cash" || s === "private-cash") return "private_cash";
  return "";
}

function normalizeRaffleAccessLevel(raw) {
  const n = parseInt(String(raw == null ? "" : raw), 10);
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.max(0, Math.min(100, n));
}

function raffleAccessLevel(raffle) {
  if (!raffle || typeof raffle !== "object") return 0;
  const raw =
    raffle.accessLevel != null
      ? raffle.accessLevel
      : raffle.minAccessLevel != null
        ? raffle.minAccessLevel
        : raffle.requiredLevel != null
          ? raffle.requiredLevel
          : raffle.minimumLevel;
  return normalizeRaffleAccessLevel(raw);
}

function applyRaffleAccessLevel(raffle, level) {
  if (!raffle || typeof raffle !== "object") return raffle;
  raffle.accessLevel = normalizeRaffleAccessLevel(level);
  return raffle;
}

function raffleEffectiveGroupAccessLevel(raffle, group) {
  return normalizeRaffleAccessLevelCore(raffleGroupAccessLevel(raffle, group));
}

function raffleLowestAccessLevel(raffle) {
  const groups = Array.isArray(raffle && raffle.groups) ? raffle.groups : [];
  if (!groups.length) return raffleAccessLevel(raffle);
  return groups.reduce((min, group) => {
    const level = raffleEffectiveGroupAccessLevel(raffle, group);
    return min == null ? level : Math.min(min, level);
  }, null) || 0;
}

function raffleAccessibleTicketGroupsForLevel(raffle, viewerLevel) {
  const groups = Array.isArray(raffle && raffle.groups) ? raffle.groups : [];
  const level = normalizeRaffleAccessLevel(viewerLevel);
  return groups.reduce((rows, group, index) => {
    const accessLevel = raffleEffectiveGroupAccessLevel(raffle, group);
    if (level < accessLevel) return rows;
    rows.push({
      groupIndex: index,
      ticketCount: 1,
      accessLevel,
      prize: String((group && group.prize) || "").trim().slice(0, 200),
    });
    return rows;
  }, []);
}

function inferRafflePrizeKind(raffle) {
  const explicit = normalizeRafflePrizeKind(raffle && (raffle.prizeKind || raffle.prize_kind));
  if (explicit) return explicit;
  const title = String((raffle && raffle.title) || "").toLowerCase();
  const groupText = Array.isArray(raffle && raffle.groups)
    ? raffle.groups.map((g) => String((g && g.prize) || "")).join(" ").toLowerCase()
    : "";
  const text = title + " " + groupText;
  if (text.includes("на кеш") || text.includes("кеш") || text.includes("cash") || text.includes("бонус гейм") || text.includes("bonus game")) {
    return "cash";
  }
  return "tournament_ticket";
}

function dailyCashSeriesById(seriesId) {
  const id = String(seriesId || "").trim();
  return DAILY_CASH_SERIES.find((series) => series.seriesId === id) || null;
}

function dailyCashSeriesFromTemplate(raffle, rec) {
  const byId = dailyCashSeriesById(rec && rec.seriesId);
  if (byId) return byId;
  const sourceTemplate = rec && rec.template && typeof rec.template === "object" ? rec.template : {};
  const title = String(sourceTemplate.title || (raffle && raffle.title) || "").toLowerCase();
  const groupText = Array.isArray(sourceTemplate.groups || (raffle && raffle.groups))
    ? (sourceTemplate.groups || raffle.groups).map((g) => String((g && g.prize) || "")).join(" ").toLowerCase()
    : "";
  const text = title + " " + groupText;
  if (text.includes("5/10") || text.includes("200")) return DAILY_CASH_SERIES[0];
  if (text.includes("20/40") || text.includes("1000") || text.includes("1 000")) return DAILY_CASH_SERIES[1];
  return DAILY_CASH_DEFAULT_SERIES;
}

function dailyCashGroups(series) {
  const selected = series || DAILY_CASH_DEFAULT_SERIES;
  return selected.groups.map((group) => ({
    count: group.count,
    prize: group.prize,
    accessLevel: group.accessLevel,
  }));
}

function dailyTemplate(title, totalWinners, groups, prizeKind, accessLevel, options = {}) {
  const safeTotal = Math.max(1, Math.min(100, parseInt(totalWinners || "1", 10) || 1));
  const normalizedGroups = normalizeRaffleGroups(groups, safeTotal);
  const normalizedPrizeKind = normalizeRafflePrizeKind(prizeKind) || inferRafflePrizeKind({ title, groups: normalizedGroups });
  let normalizedAccessLevel = normalizeRaffleAccessLevel(accessLevel);
  if (normalizedPrizeKind === "cash" && !options.allowCashAllAccess) {
    normalizedAccessLevel = Math.max(3, normalizedAccessLevel);
  }
  return {
    title: String(title || "").trim().slice(0, 200),
    totalWinners: safeTotal,
    groups: normalizedGroups,
    prizeKind: normalizedPrizeKind,
    accessLevel: normalizedAccessLevel,
  };
}

function dailyCashTemplate(title, series) {
  const selected = series || DAILY_CASH_DEFAULT_SERIES;
  return dailyTemplate(
    title || selected.title,
    selected.totalWinners,
    dailyCashGroups(selected),
    "cash",
    selected.accessLevel,
    { allowCashAllAccess: true }
  );
}

function dailyCashTemplateWithSeries(series, title) {
  const selected = series || DAILY_CASH_DEFAULT_SERIES;
  return dailyCashTemplate(title || selected.title, selected);
}

function dailyCashResultBatches(series, startAt) {
  const selected = series || DAILY_CASH_DEFAULT_SERIES;
  const batches = Array.isArray(selected.resultBatches) ? selected.resultBatches : [];
  if (!batches.length || !(startAt instanceof Date) || isNaN(startAt.getTime())) return [];
  return batches.map((batch) => {
    let at = nextMoscowDailyStartAfter(startAt, batch.time, false);
    if (at.getTime() <= startAt.getTime()) at = addMoscowDays(at, 1);
    return {
      label: String(batch.label || "Итоги").trim(),
      endDate: at.toISOString(),
      time: String(batch.time || "").trim(),
    };
  });
}

function mergeRaffleResultBatchState(nextBatches, previousBatches) {
  if (!Array.isArray(nextBatches) || !nextBatches.length) return [];
  const previous = Array.isArray(previousBatches) ? previousBatches : [];
  return nextBatches.map((batch, index) => {
    const time = String(batch && batch.time || "").trim();
    const endDate = String(batch && batch.endDate || "").trim();
    const prev = previous.find((row) => (
      row &&
      ((time && String(row.time || "").trim() === time) ||
        (endDate && String(row.endDate || "").trim() === endDate))
    )) || previous[index];
    if (!prev || typeof prev !== "object") return batch;
    const merged = { ...batch };
    ["drawnAt", "groupIndexes", "winnerCount", "winnerSlots"].forEach((key) => {
      if (prev[key] != null) merged[key] = prev[key];
    });
    return merged;
  });
}

function raffleResultBatchGroupIndexes(raffle, batch, index) {
  const groups = Array.isArray(raffle && raffle.groups) ? raffle.groups : [];
  const raw =
    batch && Array.isArray(batch.groupIndexes)
      ? batch.groupIndexes
      : batch && Array.isArray(batch.group_indices)
        ? batch.group_indices
        : batch && batch.groupIndex != null
          ? [batch.groupIndex]
          : batch && batch.group_index != null
            ? [batch.group_index]
            : [];
  const indexes = raw
    .map((value) => parseInt(String(value), 10))
    .filter((value) => Number.isInteger(value) && value >= 0 && value < groups.length);
  if (indexes.length) return [...new Set(indexes)];
  return Number.isInteger(index) && index >= 0 && index < groups.length ? [index] : [];
}

function trimRaffleGroupWinnersToCurrentCounts(raffle, groupIndexes) {
  if (!raffle || !Array.isArray(raffle.winners) || !Array.isArray(raffle.groups)) return false;
  const target = new Set((Array.isArray(groupIndexes) ? groupIndexes : [])
    .map((value) => parseInt(String(value), 10))
    .filter((value) => Number.isInteger(value) && value >= 0 && value < raffle.groups.length));
  if (!target.size) return false;
  const keptByGroup = new Map();
  let changed = false;
  const nextWinners = raffle.winners.filter((winner) => {
    const groupIndex = parseInt(String(winner && winner.groupIndex != null ? winner.groupIndex : ""), 10);
    if (!target.has(groupIndex)) return true;
    const group = raffle.groups[groupIndex] || {};
    const allowed = Math.max(0, parseInt(group.count, 10) || 0);
    const kept = keptByGroup.get(groupIndex) || 0;
    if (kept >= allowed) {
      changed = true;
      return false;
    }
    keptByGroup.set(groupIndex, kept + 1);
    return true;
  });
  if (!changed) return false;
  raffle.winners = nextWinners;
  return true;
}

function settleDueRaffleResultBatches(raffle, now) {
  if (!raffle || raffle.status !== "active") return { changed: false, winners: [] };
  const batches = Array.isArray(raffle.resultBatches) ? raffle.resultBatches : [];
  if (!batches.length) return { changed: false, winners: [] };
  const nowDate = now instanceof Date ? now : new Date();
  const nowMs = nowDate.getTime();
  if (!Number.isFinite(nowMs)) return { changed: false, winners: [] };
  let changed = false;
  const winners = [];
  batches.forEach((batch, index) => {
    if (!batch || batch.drawnAt) return;
    const endMs = batch.endDate ? new Date(batch.endDate).getTime() : NaN;
    if (!Number.isFinite(endMs) || endMs > nowMs) return;
    const groupIndexes = raffleResultBatchGroupIndexes(raffle, batch, index);
    if (trimRaffleGroupWinnersToCurrentCounts(raffle, groupIndexes)) changed = true;
    const draw = drawRaffleGroups(raffle, groupIndexes);
    const batchWinners = (Array.isArray(raffle.winners) ? raffle.winners : []).filter((winner) => (
      groupIndexes.indexOf(parseInt(String(winner && winner.groupIndex != null ? winner.groupIndex : ""), 10)) !== -1
    ));
    batch.drawnAt = nowDate.toISOString();
    batch.groupIndexes = groupIndexes;
    batch.winnerCount = batchWinners.length;
    batch.winnerSlots = batchWinners.map((winner, winnerIndex) => String(
      winner && (winner.winnerReadySlotId || winner.userId || winner.accountId || winner.p21Id || ("winner_" + winnerIndex)) || ""
    ));
    if (draw.winners.length) {
      initializeRaffleReadyWindows(raffle, nowDate);
      winners.push(...draw.winners);
    }
    changed = true;
  });
  return { changed, winners };
}

function raffleDrawLifecycleNeedsSettlement(raffle, now) {
  if (!raffle || raffle.status !== "active") return false;
  const nowMs = now instanceof Date ? now.getTime() : new Date(now || Date.now()).getTime();
  if (!Number.isFinite(nowMs)) return false;
  const endMs = new Date(raffle.endDate || "").getTime();
  if (Number.isFinite(endMs) && endMs <= nowMs) return true;
  return (Array.isArray(raffle.resultBatches) ? raffle.resultBatches : []).some((batch) => {
    if (!batch || batch.drawnAt) return false;
    const batchEndMs = new Date(batch.endDate || "").getTime();
    return Number.isFinite(batchEndMs) && batchEndMs <= nowMs;
  });
}

async function settleRaffleDrawLifecycleSafely(raffleId, raffle, now) {
  const empty = {
    raffle,
    changed: false,
    completed: false,
    batchWinners: [],
    locked: false,
    persisted: false,
  };
  if (!raffleDrawLifecycleNeedsSettlement(raffle, now)) return empty;
  const token = await claimRaffleDrawSettlementWithRetry(raffleId);
  if (!token) {
    let latest = raffle;
    try {
      latest = (await loadStoredRaffleById(raffleId)) || raffle;
    } catch (eLoad) {}
    return { ...empty, raffle: latest, locked: true };
  }

  try {
    let latest = (await loadStoredRaffleById(raffleId)) || raffle;
    if (!raffleDrawLifecycleNeedsSettlement(latest, now)) {
      return { ...empty, raffle: latest };
    }
    normalizeDailyCashRaffleInPlace(latest);
    const batchSettlement = settleDueRaffleResultBatches(latest, now);
    let completed = false;
    const nowDate = now instanceof Date ? now : new Date(now || Date.now());
    const endMs = new Date(latest.endDate || "").getTime();
    if (latest.status === "active" && Number.isFinite(endMs) && endMs <= nowDate.getTime()) {
      const hydratedBeforeDraw = await hydrateRaffleParticipantNamesFromRedis(latest);
      latest = runDraw(hydratedBeforeDraw.raffle);
      initializeRaffleReadyWindows(latest, nowDate);
      await assignNextCompletedNumber(latest);
      completed = true;
    }
    const changed = !!(batchSettlement.changed || completed);
    if (changed) {
      const writeCmds = [
        ["SET", RAFFLE_PREFIX + raffleId, JSON.stringify(latest)],
        ["DEL", RAFFLE_PUBLIC_LIST_CACHE_KEY, RAFFLE_SUMMARY_CACHE_KEY, RAFFLE_ARCHIVE_INDEX_CACHE_KEY],
      ];
      if (latest.status === "active") writeCmds.push(["SADD", RAFFLE_ACTIVE_IDS_KEY, raffleId]);
      else writeCmds.push(["SREM", RAFFLE_ACTIVE_IDS_KEY, raffleId]);
      const setRes = await redisPipeline(writeCmds);
      if (!setRes || setRes[0].error) throw new Error("Ошибка записи результатов розыгрыша");
    }
    return {
      raffle: latest,
      changed,
      completed,
      batchWinners: batchSettlement.winners || [],
      locked: false,
      persisted: changed,
    };
  } finally {
    await releaseRaffleDrawSettlement(raffleId, token);
  }
}

function normalizeDailyCashRaffleInPlace(raffle) {
  if (!raffle || typeof raffle !== "object") return false;
  const rec = dailyRecurrence(raffle);
  if (!rec || (rec.seriesId !== DAILY_CASH_LEGACY_SERIES_ID && !dailyCashSeriesById(rec.seriesId))) return false;
  const series = dailyCashSeriesFromTemplate(raffle, rec);
  const before = JSON.stringify({
    totalWinners: raffle.totalWinners,
    groups: raffle.groups,
    prizeKind: raffle.prizeKind,
    accessLevel: raffle.accessLevel,
    recurrenceTemplate: raffle.recurrence && raffle.recurrence.template,
  });
  const title = series.title;
  const template = dailyCashTemplateWithSeries(series, title);
  raffle.title = title;
  raffle.totalWinners = series.totalWinners;
  raffle.groups = dailyCashGroups(series);
  raffle.prizeKind = "cash";
  applyRaffleAccessLevel(raffle, series.accessLevel);
  const endAt = dateFromIso(raffle.endDate);
  const startAt = endAt ? moscowDailyStartOnOrBefore(endAt, series.startTime) : dateFromIso(raffle.startedAt || raffle.createdAt);
  const batches = dailyCashResultBatches(series, startAt);
  if (batches.length) raffle.resultBatches = mergeRaffleResultBatchState(batches, raffle.resultBatches);
  else if (raffle.resultBatches) delete raffle.resultBatches;
  if (raffle.recurrence && typeof raffle.recurrence === "object") {
    raffle.recurrence.startTime = series.startTime;
    raffle.recurrence.seriesId = series.seriesId;
    raffle.recurrence.durationMs = DAILY_CASH_DURATION_MS;
    raffle.recurrence.template = template;
  }
  const after = JSON.stringify({
    totalWinners: raffle.totalWinners,
    groups: raffle.groups,
    prizeKind: raffle.prizeKind,
    accessLevel: raffle.accessLevel,
    recurrenceTemplate: raffle.recurrence && raffle.recurrence.template,
  });
  return before !== after;
}

function sanitizeRaffleGroupsToAppend(groupsRaw) {
  const raw = Array.isArray(groupsRaw) ? groupsRaw : [];
  return raw.slice(0, 10).reduce((groups, group) => {
    const count = Math.max(0, Math.min(100, parseInt(group && group.count, 10) || 0));
    const prize = sanitizeRaffleManualText(group && group.prize, 200);
    if (count > 0 && prize) {
      const next = { count, prize };
      const rawAccess =
        group && group.accessLevel != null
          ? group.accessLevel
          : group && group.minAccessLevel != null
            ? group.minAccessLevel
            : group && group.requiredLevel;
      if (rawAccess != null && rawAccess !== "") next.accessLevel = normalizeRaffleAccessLevel(rawAccess);
      groups.push(next);
    }
    return groups;
  }, []);
}

function raffleGroupsTotalWinners(groups) {
  return (Array.isArray(groups) ? groups : []).reduce((sum, group) => {
    return sum + Math.max(0, Math.min(100, parseInt(group && group.count, 10) || 0));
  }, 0);
}

function dailyCashTemplateFrom(raffle, rec) {
  const sourceTemplate = rec && rec.template && typeof rec.template === "object" ? rec.template : {};
  const series = dailyCashSeriesFromTemplate(raffle, rec);
  return dailyCashTemplateWithSeries(series, sourceTemplate.title || (raffle && raffle.title) || series.title);
}

function isDailyCashTemplate(raffle, rec) {
  const sourceTemplate = rec && rec.template && typeof rec.template === "object" ? rec.template : {};
  const explicit = normalizeRafflePrizeKind(sourceTemplate.prizeKind || (raffle && raffle.prizeKind));
  if (explicit) return explicit === "cash";
  return inferRafflePrizeKind({
    title: sourceTemplate.title || (raffle && raffle.title),
    groups: sourceTemplate.groups || (raffle && raffle.groups),
  }) === "cash";
}

function attachDailyRecurrence(raffle, params) {
  const startTime = normalizeDailyStartTime(params && params.startTime);
  if (!raffle || !startTime) return raffle;
  const createdAt = new Date(raffle.createdAt || Date.now());
  const prizeKind = normalizeRafflePrizeKind(params && params.prizeKind) || inferRafflePrizeKind(raffle);
  raffle.prizeKind = prizeKind;
  const cashDaily = prizeKind === "cash";
  const cashSeries = cashDaily ? DAILY_CASH_DEFAULT_SERIES : null;
  const actualStartTime = cashDaily ? cashSeries.startTime : startTime;
  const template = cashDaily
    ? dailyCashTemplateWithSeries(cashSeries, params.title || cashSeries.title)
    : dailyTemplate(params.title, params.totalWinners, params.groups, prizeKind, params.accessLevel);
  const requestedEndAt = dateFromIso(raffle.endDate);
  const currentStartAt = cashDaily && requestedEndAt
    ? moscowDailyStartOnOrBefore(requestedEndAt, cashSeries.startTime)
    : (cashDaily ? moscowDailyStartOnOrBefore(createdAt, cashSeries.startTime) : createdAt);
  const nextStartAt = nextMoscowDailyStartAfter(currentStartAt, actualStartTime, true);
  const durationMs = cashDaily ? DAILY_CASH_DURATION_MS : raffleDurationMs(raffle.createdAt, raffle.endDate);
  const seriesId = cashDaily ? cashSeries.seriesId : "raffle_daily_" + raffle.id;
  if (cashDaily) {
    raffle.createdAt = currentStartAt.toISOString();
    raffle.startedAt = currentStartAt.toISOString();
    raffle.endDate = new Date(currentStartAt.getTime() + DAILY_CASH_DURATION_MS).toISOString();
    raffle.title = cashSeries.title;
    raffle.totalWinners = cashSeries.totalWinners;
    raffle.groups = dailyCashGroups(cashSeries);
    applyRaffleAccessLevel(raffle, cashSeries.accessLevel);
    raffle.resultBatches = dailyCashResultBatches(cashSeries, currentStartAt);
  }
  raffle.daily = true;
  raffle.recurrence = {
    type: "daily",
    timeZone: "Europe/Moscow",
    startTime: actualStartTime,
    seriesId,
    scheduledStartAt: raffle.createdAt,
    nextStartAt: nextStartAt.toISOString(),
    durationMs,
    template,
  };
  return raffle;
}

async function persistCreatedRaffle(raffle, idemRedisKey) {
  const rec = dailyRecurrence(raffle);
  if (rec && !dailyRaffleScheduleConfigured(rec)) {
    const scheduled = await scheduleDailyRaffleTick(raffle);
    if (scheduled && !scheduled.ok && !scheduled.skipped) {
      try {
        console.error("[raffles] daily QStash schedule failed", {
          raffleId: String((raffle && raffle.id) || ""),
          error: scheduled.error || "",
          status: scheduled.status || "",
        });
      } catch (eLog) {}
    }
  }
  const writeCommands = [
    ["RPUSH", RAFFLE_IDS_KEY, raffle.id],
    ["SET", RAFFLE_PREFIX + raffle.id, JSON.stringify(raffle)],
    ["DEL", RAFFLE_PUBLIC_LIST_CACHE_KEY, RAFFLE_SUMMARY_CACHE_KEY, RAFFLE_ARCHIVE_INDEX_CACHE_KEY],
  ];
  if (raffle && raffle.status === "active" && raffle.id) {
    writeCommands.push(["SADD", RAFFLE_ACTIVE_IDS_KEY, raffle.id]);
    writeCommands.push(["SET", RAFFLE_ACTIVE_INDEX_READY_KEY, "1"]);
  }
  const results = await redisPipeline(writeCommands);
  if (!results || results.some((r) => r && r.error)) {
    if (idemRedisKey) await redisPipeline([["DEL", idemRedisKey]]);
    return { ok: false, error: "Ошибка создания" };
  }

  if (idemRedisKey) {
    try {
      await redisPipeline([["SET", idemRedisKey, JSON.stringify({ raffle }), "EX", "86400"]]);
    } catch (eIdem) {}
  }
  return { ok: true, raffle };
}

async function updateRaffleActiveIndex(raffleId, active) {
  const id = String(raffleId || "").trim();
  if (!id) return;
  const commands = [
    [active ? "SADD" : "SREM", RAFFLE_ACTIVE_IDS_KEY, id],
    ["SET", RAFFLE_ACTIVE_INDEX_READY_KEY, "1"],
    ["DEL", RAFFLE_PUBLIC_LIST_CACHE_KEY, RAFFLE_SUMMARY_CACHE_KEY, RAFFLE_ARCHIVE_INDEX_CACHE_KEY],
  ];
  await redisPipeline(commands, { timeoutMs: 2500, context: "raffles.activeIndex.update" }).catch(() => {});
}

async function rebuildRaffleActiveIndex() {
  const listRes = await redisPipeline([["LRANGE", RAFFLE_IDS_KEY, "0", "-1"]], {
    timeoutMs: 6500,
    context: "raffles.activeIndex.ids",
    allowLargeRedisRead: true,
  });
  const idsRaw = (listRes && listRes[0] && Array.isArray(listRes[0].result) ? listRes[0].result : []).filter(Boolean);
  const ids = [...new Set(idsRaw)];
  const rows = ids.length ? await redisPipeline(ids.map((id) => ["GET", RAFFLE_PREFIX + id]), {
    timeoutMs: 15000,
    context: "raffles.activeIndex.rows",
    allowLargeRedisRead: true,
  }) : [];
  const activeIds = [];
  const raffles = [];
  for (let i = 0; i < ids.length; i += 1) {
    const raw = rows && rows[i] && rows[i].result;
    if (!raw) continue;
    try {
      const raffle = JSON.parse(raw);
      if (!raffle || !raffle.id) continue;
      raffles.push(raffle);
      if (raffle.status === "active") activeIds.push(String(raffle.id));
    } catch (e) {}
  }
  const dailyCreated = await ensureDueDailyRaffles(raffles);
  dailyCreated.forEach((raffle) => {
    if (raffle && raffle.id && raffle.status === "active") activeIds.push(String(raffle.id));
  });
  const commands = [
    ["DEL", RAFFLE_ACTIVE_IDS_KEY],
    ["SET", RAFFLE_ACTIVE_INDEX_READY_KEY, "1"],
    ["DEL", RAFFLE_PUBLIC_LIST_CACHE_KEY, RAFFLE_SUMMARY_CACHE_KEY, RAFFLE_ARCHIVE_INDEX_CACHE_KEY],
  ];
  const uniqueActiveIds = [...new Set(activeIds.filter(Boolean))];
  if (uniqueActiveIds.length) commands.splice(1, 0, ["SADD", RAFFLE_ACTIVE_IDS_KEY, ...uniqueActiveIds]);
  await redisPipeline(commands, { timeoutMs: 6500, context: "raffles.activeIndex.rebuild" });
  return uniqueActiveIds;
}

async function readRaffleActiveIds() {
  const readyRes = await redisPipeline([["GET", RAFFLE_ACTIVE_INDEX_READY_KEY]], {
    timeoutMs: 2500,
    context: "raffles.activeIndex.ready",
  });
  const ready = readyRes && readyRes[0] && readyRes[0].result;
  if (!ready) return rebuildRaffleActiveIndex();
  const ids = await sscanall(RAFFLE_ACTIVE_IDS_KEY, {
    timeoutMs: 2500,
    context: "raffles.activeIndex.members",
    count: 200,
    maxPages: 20,
  });
  if (!ids) return rebuildRaffleActiveIndex();
  return [...new Set(ids.map((id) => String(id || "").trim()).filter(Boolean))];
}

async function loadLastStoredRaffle() {
  const idsRes = await redisPipeline([["LRANGE", RAFFLE_IDS_KEY, "-20", "-1"]]);
  const ids = idsRes && idsRes[0] && Array.isArray(idsRes[0].result) ? idsRes[0].result : [];
  if (!ids.length) return null;
  const latestIds = ids.slice().reverse().filter(Boolean);
  const getRes = await redisPipeline(latestIds.map((id) => ["GET", RAFFLE_PREFIX + String(id)]));
  if (!getRes) return null;
  for (let i = 0; i < getRes.length; i++) {
    const raw = getRes[i] && getRes[i].result;
    if (!raw) continue;
    try {
      const raffle = JSON.parse(raw);
      if (raffle && raffle.id) return raffle;
    } catch (e) {}
  }
  return null;
}

async function loadRecentStoredRaffles(limit) {
  const n = Math.max(1, Math.min(10, parseInt(limit, 10) || 3));
  const idsRes = await redisPipeline([["LRANGE", RAFFLE_IDS_KEY, String(-Math.max(20, n * 4)), "-1"]]);
  const ids = idsRes && idsRes[0] && Array.isArray(idsRes[0].result) ? idsRes[0].result : [];
  if (!ids.length) return [];
  const latestIds = [...new Set(ids.slice().reverse().filter(Boolean))];
  const getRes = await redisPipeline(latestIds.map((id) => ["GET", RAFFLE_PREFIX + String(id)]));
  const out = [];
  if (!getRes) return out;
  for (let i = 0; i < getRes.length && out.length < n; i++) {
    const raw = getRes[i] && getRes[i].result;
    if (!raw) continue;
    try {
      const raffle = JSON.parse(raw);
      if (raffle && raffle.id) out.push(raffle);
    } catch (e) {}
  }
  return out;
}

async function loadStoredRaffleById(raffleId) {
  const id = String(raffleId || "").trim();
  if (!id) return null;
  const getRes = await redisPipeline([["GET", RAFFLE_PREFIX + id]]);
  const raw = getRes && getRes[0] && getRes[0].result;
  if (!raw) return null;
  try {
    const raffle = JSON.parse(raw);
    return raffle && raffle.id ? raffle : null;
  } catch (e) {
    return null;
  }
}

function duplicateCandidatePayload(raffle) {
  const totalWinners = Math.max(
    1,
    Math.min(
      100,
      parseInt(
        raffle.totalWinners ||
          (Array.isArray(raffle.groups)
            ? raffle.groups.reduce((sum, g) => sum + (parseInt(g && g.count, 10) || 0), 0)
            : 0) ||
          "1",
        10
      ) || 1
    )
  );
  const rec = dailyRecurrence(raffle);
  return {
    id: raffle.id,
    title: String(raffle.title || "").trim().slice(0, 200),
    prizeKind: inferRafflePrizeKind(raffle),
    prizeAction: normalizeRafflePrizeAction(raffle.prizeAction || raffle.prize_action || raffle.fulfillment || raffle.rewardType || raffle.reward_type),
    drawMode: raffleUsesWeightedTickets(raffle) ? "weighted_tickets" : "",
    ticketEntryMode: String(raffle.ticketEntryMode || raffle.ticket_entry_mode || "").trim().slice(0, 40),
    promoGuarantee: sanitizeRaffleManualText(raffle.promoGuarantee || raffle.promo_guarantee || raffle.guarantee || "", 80),
    promoTournamentName: sanitizeRaffleManualText(raffle.promoTournamentName || raffle.promo_tournament_name || "", 80),
    cardTitle: sanitizeRaffleManualText(raffle.cardTitle || raffle.card_title || "", 80),
    cardSubtitle: sanitizeRaffleManualText(raffle.cardSubtitle || raffle.card_subtitle || "", 100),
    cardTheme: sanitizeRaffleManualText(raffle.cardTheme || raffle.card_theme || "", 40).toLowerCase(),
    accessLevel: raffleAccessLevel(raffle),
    totalWinners,
    groups: normalizeRaffleGroups(raffle.groups, totalWinners),
    endDate: raffle.endDate || "",
    createdAt: raffle.createdAt || "",
    status: raffle.status || "",
    participantsCount: Array.isArray(raffle.participants) ? raffle.participants.length : 0,
    winnersCount: Array.isArray(raffle.winners) ? raffle.winners.length : 0,
    daily: !!rec,
    recurrence: rec
      ? {
          type: "daily",
          timeZone: rec.timeZone || "Europe/Moscow",
          startTime: rec.startTime,
          nextStartAt: rec.nextStartAt || "",
          durationMs: parseInt(rec.durationMs, 10) || 0,
        }
      : null,
  };
}

function buildDuplicateFromSource(myId, sourceRaffle) {
  const candidate = duplicateCandidatePayload(sourceRaffle);
  const titleRaw = candidate.title;
  const groups = normalizeRaffleGroups(candidate.groups, candidate.totalWinners);
  let raffle = buildStoredRaffle(myId, titleRaw, candidate.totalWinners, groups, deriveDuplicateEndDateIso(sourceRaffle));
  raffle.prizeKind = candidate.prizeKind;
  if (candidate.prizeAction) raffle.prizeAction = candidate.prizeAction;
  applyRaffleAccessLevel(raffle, candidate.accessLevel);
  if (candidate.drawMode) {
    raffle.drawMode = candidate.drawMode;
    raffle.weightedTickets = true;
  }
  if (candidate.ticketEntryMode) raffle.ticketEntryMode = candidate.ticketEntryMode;
  if (candidate.promoGuarantee) raffle.promoGuarantee = candidate.promoGuarantee;
  if (candidate.promoTournamentName) raffle.promoTournamentName = candidate.promoTournamentName;
  if (candidate.cardTitle) raffle.cardTitle = candidate.cardTitle;
  if (candidate.cardSubtitle) raffle.cardSubtitle = candidate.cardSubtitle;
  if (candidate.cardTheme) raffle.cardTheme = candidate.cardTheme;
  return raffle;
}

function dailyRecurrence(raffle) {
  const rec = raffle && raffle.recurrence && typeof raffle.recurrence === "object" ? raffle.recurrence : null;
  if (!rec || rec.type !== "daily") return null;
  const startTime = normalizeDailyStartTime(rec.startTime);
  const seriesId = String(rec.seriesId || "").trim();
  if (!startTime || !seriesId) return null;
  if (isDailyCashTemplate(raffle, rec)) {
    const series = dailyCashSeriesFromTemplate(raffle, rec);
    const cashRec = {
      ...rec,
      startTime: series.startTime,
      seriesId: series.seriesId,
      durationMs: DAILY_CASH_DURATION_MS,
      template: dailyCashTemplateFrom(raffle, rec),
    };
    if (!dailyRaffleScheduleConfigured(cashRec)) {
      delete cashRec.qstashScheduleId;
      delete cashRec.qstashCron;
      delete cashRec.qstashScheduledAt;
    }
    return cashRec;
  }
  return { ...rec, startTime, seriesId };
}

function dailyRecurrenceCanAutoCreate(raffle, rec) {
  return !!(rec && dailyCashSeriesById(rec.seriesId) && isDailyCashTemplate(raffle, rec));
}

function dailyRaffleScheduleConfigured(rec) {
  if (!rec) return false;
  const scheduleId = String(rec.qstashScheduleId || "").trim();
  if (!scheduleId) return false;
  const cashSeries = dailyCashSeriesById(rec.seriesId);
  if (cashSeries) {
    return scheduleId === dailyRaffleQstashScheduleId(cashSeries.seriesId) &&
      String(rec.qstashCron || "").trim() === dailyRaffleCronExpression(cashSeries.startTime);
  }
  return true;
}

function copyDailyRaffleScheduleFields(targetRec, sourceRec) {
  if (!targetRec || !sourceRec) return targetRec;
  const scheduleId = String(sourceRec.qstashScheduleId || "").trim();
  if (!scheduleId) return targetRec;
  targetRec.qstashScheduleId = scheduleId;
  const cron = String(sourceRec.qstashCron || "").trim();
  if (cron) targetRec.qstashCron = cron;
  const scheduledAt = String(sourceRec.qstashScheduledAt || "").trim();
  if (scheduledAt) targetRec.qstashScheduledAt = scheduledAt;
  return targetRec;
}

function raffleCronBaseUrl() {
  const app = String(process.env.APP_URL || "").trim();
  if (/^https?:\/\//i.test(app)) return app.replace(/\/$/, "");
  const mini = String(process.env.MINI_APP_URL || "").trim();
  if (/^https?:\/\//i.test(mini) && !/\/\/t\.me\//i.test(mini)) return mini.replace(/\/$/, "");
  const vercel = String(process.env.VERCEL_URL || "").trim();
  if (vercel) return ("https://" + vercel.replace(/^https?:\/\//i, "")).replace(/\/$/, "");
  return "";
}

function dailyRaffleQstashScheduleId(seriesId) {
  const hash = crypto.createHash("sha1").update(String(seriesId || "")).digest("hex").slice(0, 32);
  return RAFFLE_DAILY_QSTASH_SCHEDULE_PREFIX + hash;
}

function dailyRaffleCronExpression(startTime) {
  const normalized = normalizeDailyStartTime(startTime);
  if (!normalized) return "";
  const parts = normalized.split(":");
  return "CRON_TZ=Europe/Moscow " + String(parseInt(parts[1], 10) || 0) + " " + String(parseInt(parts[0], 10) || 0) + " * * *";
}

async function scheduleDailyRaffleTick(raffle) {
  const rec = dailyRecurrence(raffle);
  if (!rec || !raffle || !raffle.recurrence) return { ok: false, skipped: "not_daily" };
  if (!QSTASH_TOKEN || !CRON_SECRET) return { ok: false, skipped: "qstash_not_configured" };
  const baseUrl = raffleCronBaseUrl();
  if (!baseUrl) return { ok: false, skipped: "base_url_not_configured" };
  const cron = dailyRaffleCronExpression(rec.startTime);
  if (!cron) return { ok: false, skipped: "bad_start_time" };
  const scheduleId = dailyRaffleQstashScheduleId(rec.seriesId);
  const dest =
    baseUrl +
    "/api/cron-raffles?seriesId=" +
    encodeURIComponent(rec.seriesId) +
    "&secret=" +
    encodeURIComponent(CRON_SECRET);
  const headers = {
    Authorization: "Bearer " + QSTASH_TOKEN,
    "Content-Type": "application/json",
    "Upstash-Cron": cron,
    "Upstash-Schedule-Id": scheduleId,
  };
  let timer = null;
  let signal = undefined;
  if (typeof AbortController !== "undefined") {
    const controller = new AbortController();
    signal = controller.signal;
    timer = setTimeout(() => controller.abort(), 2500);
  }
  try {
    const r = await fetch(QSTASH_BASE.replace(/\/$/, "") + "/v2/schedules/" + encodeURIComponent(dest), {
      method: "POST",
      headers,
      body: JSON.stringify({}),
      signal,
    });
    const text = await r.text().catch(() => "");
    if (!r.ok) {
      return { ok: false, error: text || ("QStash HTTP " + r.status), status: r.status };
    }
    raffle.recurrence.qstashScheduleId = scheduleId;
    raffle.recurrence.qstashCron = cron;
    raffle.recurrence.qstashScheduledAt = new Date().toISOString();
    return { ok: true, scheduleId, cron };
  } catch (e) {
    return { ok: false, error: e && e.message ? e.message : String(e || "QStash error") };
  } finally {
    if (timer) clearTimeout(timer);
  }
}

async function maybeScheduleDailyRaffleTick(raffle) {
  const rec = dailyRecurrence(raffle);
  if (!rec || !QSTASH_TOKEN || !CRON_SECRET || !raffleCronBaseUrl()) return null;
  if (dailyRaffleScheduleConfigured(rec)) return null;
  const lockKey =
    RAFFLE_DAILY_SCHEDULE_SETUP_LOCK_PREFIX +
    crypto.createHash("sha1").update(rec.seriesId + "\n" + rec.startTime).digest("hex");
  const claimRes = await redisPipeline([["SET", lockKey, "1", "NX", "EX", String(RAFFLE_DAILY_SCHEDULE_SETUP_LOCK_TTL_SECONDS)]]);
  const cr0 = claimRes && claimRes[0];
  const claimed =
    cr0 &&
    !cr0.error &&
    (cr0.result === "OK" || cr0.result === true || String(cr0.result || "").toUpperCase() === "OK");
  if (!claimed) return null;
  const scheduled = await scheduleDailyRaffleTick(raffle);
  if (scheduled && !scheduled.ok) {
    try {
      console.error("[raffles] daily QStash schedule failed", {
        raffleId: String((raffle && raffle.id) || ""),
        seriesId: rec.seriesId,
        skipped: scheduled.skipped || "",
        error: scheduled.error || "",
      });
    } catch (eLog) {}
  }
  return scheduled;
}

function dailyRaffleStartMs(raffle, rec) {
  const raw = (rec && rec.scheduledStartAt) || (raffle && raffle.createdAt) || "";
  const d = raw ? new Date(raw) : null;
  const ms = d && !isNaN(d.getTime()) ? d.getTime() : NaN;
  if (!Number.isFinite(ms)) return 0;
  const cashSeries = rec && dailyCashSeriesById(rec.seriesId);
  if (cashSeries) {
    return moscowDailyStartOnOrBefore(d, cashSeries.startTime).getTime();
  }
  return ms;
}

function dateFromIso(raw) {
  const d = raw ? new Date(raw) : null;
  return d && !isNaN(d.getTime()) ? d : null;
}

function advanceDailyStartIntoCurrentWindow(startAt, durationMs, now) {
  let next = startAt;
  let guard = 0;
  while (next.getTime() + durationMs <= now.getTime() && guard < 45) {
    next = addMoscowDays(next, 1);
    guard += 1;
  }
  return next;
}

async function ensureDueDailyRaffles(raffles) {
  if (!Array.isArray(raffles) || raffles.length === 0) return [];
  const now = new Date();
  const latestBySeries = new Map();
  const scheduledKeys = new Set();
  let cashDailySource = null;
  raffles.forEach((raffle) => {
    const rec = dailyRecurrence(raffle);
    if (!rec) return;
    if (!cashDailySource && dailyCashSeriesById(rec.seriesId)) cashDailySource = raffle;
    const current = latestBySeries.get(rec.seriesId);
    const startMs = dailyRaffleStartMs(raffle, rec);
    if (startMs) scheduledKeys.add(rec.seriesId + "|" + new Date(startMs).toISOString());
    if (!current || startMs > current.startMs) {
      latestBySeries.set(rec.seriesId, { raffle, rec, startMs });
    }
  });
  if (cashDailySource) {
    DAILY_CASH_SERIES.forEach((series) => {
      if (latestBySeries.has(series.seriesId)) return;
      const nowStart = moscowDailyStartOnOrBefore(now, series.startTime);
      const template = dailyCashTemplateWithSeries(series, series.title);
      latestBySeries.set(series.seriesId, {
        raffle: cashDailySource,
        rec: {
          type: "daily",
          timeZone: "Europe/Moscow",
          startTime: series.startTime,
          seriesId: series.seriesId,
          scheduledStartAt: nowStart.toISOString(),
          nextStartAt: addMoscowDays(nowStart, 1).toISOString(),
          durationMs: DAILY_CASH_DURATION_MS,
          template,
        },
        startMs: nowStart.getTime() - DAILY_CASH_DURATION_MS - 1,
        forceCreate: true,
      });
    });
  }

  const created = [];
  for (const latest of latestBySeries.values()) {
    const source = latest.raffle;
    let rec = latest.rec;
    if (!dailyRecurrenceCanAutoCreate(source, rec)) continue;
    if (!dailyRaffleScheduleConfigured(rec)) {
      await maybeScheduleDailyRaffleTick(source);
      rec = dailyRecurrence(source) || rec;
    }
    if (!latest.forceCreate && (!source || source.status !== "drawn")) continue;
    const recPrizeKind = (rec.template && rec.template.prizeKind) || source.prizeKind;
    const cashSeries = dailyCashSeriesById(rec && rec.seriesId);
    const template = cashSeries
      ? dailyCashTemplateWithSeries(cashSeries, (rec.template && rec.template.title) || source.title || cashSeries.title)
      : dailyTemplate(
        rec.template && rec.template.title,
        rec.template && rec.template.totalWinners,
        rec.template && rec.template.groups,
        recPrizeKind,
        rec.template && rec.template.accessLevel != null ? rec.template.accessLevel : raffleAccessLevel(source)
      );
    const durationMs = Math.max(
      MIN_DAILY_RAFFLE_DURATION_MS,
      parseInt(rec.durationMs, 10) || raffleDurationMs(source.createdAt, source.endDate)
    );
    let nextStartAt = moscowDailyStartOnOrBefore(now, rec.startTime);
    if (latest.startMs >= nextStartAt.getTime()) continue;
    nextStartAt = advanceDailyStartIntoCurrentWindow(nextStartAt, durationMs, now);
    if (nextStartAt > now) continue;
    const startIso = nextStartAt.toISOString();
    if (scheduledKeys.has(rec.seriesId + "|" + startIso)) continue;

    const lockKey =
      RAFFLE_DAILY_CREATE_LOCK_PREFIX +
      crypto.createHash("sha256").update(rec.seriesId + "\n" + startIso).digest("hex");
    const claimRes = await redisPipeline([["SET", lockKey, "__pending__", "NX", "EX", "120"]]);
    const cr0 = claimRes && claimRes[0];
    const claimed =
      cr0 &&
      !cr0.error &&
      (cr0.result === "OK" || cr0.result === true || String(cr0.result).toUpperCase() === "OK");
    if (!claimed) continue;

    const endDateIso = new Date(nextStartAt.getTime() + durationMs).toISOString();
    let raffle = buildStoredRaffle(source.createdBy || "daily", template.title, template.totalWinners, template.groups, endDateIso);
    raffle.prizeKind = template.prizeKind;
    applyRaffleAccessLevel(raffle, template.accessLevel);
    raffle.createdAt = startIso;
    raffle.startedAt = startIso;
    if (cashSeries) raffle.resultBatches = dailyCashResultBatches(cashSeries, nextStartAt);
    raffle.daily = true;
    raffle.recurrence = {
      type: "daily",
      timeZone: "Europe/Moscow",
      startTime: rec.startTime,
      seriesId: rec.seriesId,
      scheduledStartAt: startIso,
      nextStartAt: addMoscowDays(nextStartAt, 1).toISOString(),
      durationMs,
      template,
    };
    copyDailyRaffleScheduleFields(raffle.recurrence, rec);
    const persisted = await persistCreatedRaffle(raffle, lockKey);
    if (persisted && persisted.ok && persisted.raffle) {
      created.push(persisted.raffle);
      scheduledKeys.add(rec.seriesId + "|" + startIso);
    }
  }
  return created;
}

function sanitizeDispRaffleStored(raw) {
  if (raw == null || raw === false) return "";
  return String(raw)
    .trim()
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .slice(0, CHAT_DISPLAY_NAME_MAX);
}

function sanitizePokerPlusNickname(raw) {
  if (raw == null || raw === false) return "";
  return String(raw)
    .trim()
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .slice(0, POKERPLUS_NICKNAME_MAX);
}

function pokerPlusProfileFromRaw(raw) {
  if (raw == null || raw === false) return null;
  let profile = null;
  try {
    profile = typeof raw === "string" ? JSON.parse(raw) : raw;
  } catch (e) {
    profile = null;
  }
  return profile && typeof profile === "object" ? profile : null;
}

function pokerPlusNicknameFromProfileRaw(raw) {
  const profile = pokerPlusProfileFromRaw(raw);
  if (!profile) return "";
  return sanitizePokerPlusNickname(profile.nickname || profile.Nike || profile.nick || profile.name);
}

function pokerPlusStatusLevelFromProfileRaw(raw) {
  const profile = pokerPlusProfileFromRaw(raw);
  if (!profile) return null;
  const fee = pokerProfileFeeFromCachedProfile(profile);
  if (fee == null && !profile) return null;
  const status = pokerProfileStatusFromCachedProfile(profile, { pokerPlusLinked: true });
  const level = status && Number.isFinite(Number(status.level)) ? Math.trunc(Number(status.level)) : null;
  return level != null ? Math.max(0, Math.min(100, level)) : null;
}

function rafflePointsRequiredForLevel(levelValue) {
  const targetLevel = Math.max(1, Math.min(100, Math.trunc(Number(levelValue) || 1)));
  let level = 1;
  let points = 0;
  for (const band of POKER_PROFILE_LEVEL_BANDS) {
    while (level < targetLevel && level < band.until) {
      points += band.step;
      level += 1;
    }
    if (level >= targetLevel) break;
  }
  return points;
}

function raffleLevelRequiredMessage(currentLevel, accessLevel, pointsNeeded) {
  return [
    "Ваш уровень: " + currentLevel + ".",
    "Для участия конкретно в этом розыгрыше нужен уровень: " + accessLevel + ".",
    "Вам необходимо ещё " + Math.max(0, Math.round(pointsNeeded || 0)).toLocaleString("ru-RU") + " очков.",
    "",
    "Очки даются:",
    "• Кеш — 1 очко за 1 ₽ рейка.",
    "• MTT — 300 очков за участие; 700 за ITM; 3000 за победу.",
    "• SNG — 60 очков за участие; 140 за ITM; 400 за победу.",
    "• Привязка Poker21 — 500 очков.",
  ].join("\n");
}

async function resolveRaffleViewerPokerPlusStatus(accountId, memberId, p21Id) {
  const keys = [];
  const seen = new Set();
  addUniqueValue(keys, seen, accountId);
  addUniqueValue(keys, seen, memberId);
  if (/^ID\d{6}$/.test(String(accountId || "").trim())) {
    try {
      addUniqueValue(keys, seen, await getPreferredUserIdByDtId(String(accountId).trim()));
    } catch (ePreferredProfileLookup) {}
  }
  pokerPlusIdLookupAliases(p21Id).forEach(function (alias) {
    addUniqueValue(keys, seen, alias);
  });
  if (!keys.length || !redisConfigured()) return { level: 0, points: 0 };
  let res = null;
  try {
    res = await redisPipeline([["HMGET", POKERPLUS_PROFILE_HASH_KEY, ...keys]]);
  } catch (e) {
    res = null;
  }
  const rows = res && res[0] && Array.isArray(res[0].result) ? res[0].result : [];
  for (let i = 0; i < rows.length; i += 1) {
    const profile = pokerPlusProfileFromRaw(rows[i]);
    if (!profile) continue;
    const status = pokerProfileStatusFromCachedProfile(profile, { pokerPlusLinked: true });
    if (status && Number.isFinite(Number(status.level))) {
      return {
        level: Math.max(0, Math.min(100, Math.trunc(Number(status.level)))),
        points: Math.max(0, Math.round(Number(status.points) || 0)),
      };
    }
  }
  return { level: 0, points: 0 };
}

async function resolveRaffleViewerStatusForIdentity(identity, memberId) {
  const myId = String(memberId || "").trim();
  if (!identity || !myId || myId.startsWith("guest_")) return { level: 0, points: 0 };
  const accountId = await resolveRaffleAccountId(identity, myId);
  const p21Res = await redisPipeline([
    ["HGET", POKERPLUS_BIND_HASH_KEY, accountId || ""],
    ["HGET", POKERPLUS_BIND_HASH_KEY, myId],
    ["HGET", P21_IDS_KEY, accountId || ""],
    ["HGET", P21_IDS_KEY, myId],
  ]);
  let p21Id = "";
  for (let i = 0; i < 4; i += 1) {
    if (p21Res && p21Res[i] && p21Res[i].result) {
      p21Id = String(p21Res[i].result).trim();
      if (p21Id) break;
    }
  }
  return resolveRaffleViewerPokerPlusStatus(accountId, myId, p21Id);
}

async function raffleParticipantPokerPlusConflict(participants, p21Id, currentAccountId) {
  const targetP21 = String(p21Id || "").trim().toLowerCase();
  const accountId = String(currentAccountId || "").trim();
  if (!targetP21) return null;
  const rows = Array.isArray(participants) ? participants : [];
  for (const row of rows) {
    const rowP21 = String(row && row.p21Id != null ? row.p21Id : "").trim().toLowerCase();
    const rowAccountId = String(row && row.accountId != null ? row.accountId : raffleParticipantAccountId(row)).trim();
    if (rowP21 && rowP21 === targetP21 && rowAccountId !== accountId) return row;
  }
  const accountIds = Array.from(new Set(rows
    .map((row) => String(row && row.accountId != null ? row.accountId : raffleParticipantAccountId(row)).trim())
    .filter((id) => /^ID\d{6}$/.test(id) && id !== accountId)));
  if (!accountIds.length || !redisConfigured()) return null;
  try {
    const lookup = await redisPipeline([["HMGET", POKERPLUS_BIND_HASH_KEY, ...accountIds]], {
      context: "raffles.participantPokerPlusConflict.bindings",
      allowLargeRedisRead: true,
    });
    const values = lookup && lookup[0] && Array.isArray(lookup[0].result) ? lookup[0].result : [];
    for (let i = 0; i < accountIds.length; i += 1) {
      const existingP21 = String(values[i] || "").trim().toLowerCase();
      if (existingP21 && existingP21 === targetP21) {
        return rows.find((row) => String(row && row.accountId != null ? row.accountId : raffleParticipantAccountId(row)).trim() === accountIds[i]) || { accountId: accountIds[i] };
      }
    }
  } catch (e) {}
  return null;
}

function addUniqueValue(list, seen, value) {
  const v = String(value || "").trim();
  if (!v || seen.has(v)) return;
  seen.add(v);
  list.push(v);
}

function pokerPlusIdLookupAliases(raw) {
  const out = [];
  const seen = new Set();
  const value = String(raw || "").trim();
  addUniqueValue(out, seen, value);
  if (!value) return out;
  const stripped = value.replace(/^(?:poker)?21[-_:\s]*/i, "").trim();
  addUniqueValue(out, seen, stripped);
  if (/^\d+$/.test(stripped)) addUniqueValue(out, seen, "P21-" + stripped);
  return out;
}

function pokerPlusLookupKey(raw) {
  return String(raw || "").trim().toLowerCase();
}

function redisHashEntries(raw) {
  if (Array.isArray(raw)) {
    const pairs = [];
    for (let i = 0; i < raw.length; i += 2) {
      pairs.push([raw[i], raw[i + 1]]);
    }
    return pairs;
  }
  if (raw && typeof raw === "object") {
    return Object.keys(raw).map((key) => [key, raw[key]]);
  }
  return [];
}

function accountLookupKeysFromHashField(field, dtMap) {
  const keys = [];
  const seen = new Set();
  const raw = String(field || "").trim();
  addUniqueValue(keys, seen, raw);
  if (/^(?:mail_|tg_|vk_)(ID\d{6})$/.test(raw)) {
    addUniqueValue(keys, seen, raw.replace(/^(?:mail_|tg_|vk_)/, ""));
  }
  if (dtMap && dtMap[raw]) addUniqueValue(keys, seen, dtMap[raw]);
  return keys;
}

function collectRafflePokerPlusIds(rows) {
  const ids = [];
  const seen = new Set();
  (rows || []).forEach(function (row) {
    addUniqueValue(ids, seen, row && row.p21Id);
  });
  return ids;
}

function buildPokerPlusAccountLookup(bindRows, visitorP21Rows, dtMap) {
  const map = {};
  function add(rawP21Id, rawAccountKey) {
    const accountKeys = accountLookupKeysFromHashField(rawAccountKey, dtMap);
    if (!accountKeys.length) return;
    pokerPlusIdLookupAliases(rawP21Id).forEach(function (alias) {
      const key = pokerPlusLookupKey(alias);
      if (!key) return;
      if (!map[key]) map[key] = [];
      const seen = new Set(map[key]);
      accountKeys.forEach(function (accountKey) {
        addUniqueValue(map[key], seen, accountKey);
      });
    });
  }
  redisHashEntries(bindRows).forEach(function (pair) {
    add(pair[1], pair[0]);
  });
  redisHashEntries(visitorP21Rows).forEach(function (pair) {
    add(pair[1], pair[0]);
  });
  return map;
}

async function loadPokerPlusAccountLookupForRows(rows, dtMap) {
  const pokerPlusIds = collectRafflePokerPlusIds(rows);
  if (!pokerPlusIds.length || !redisConfigured()) return {};
  const reverseRows = await redisPipeline([[
    "HMGET",
    POKERPLUS_BIND_REVERSE_HASH_KEY,
    ...pokerPlusIds.map((id) => String(id).trim().toLowerCase()),
  ]]);
  const reverseValues = reverseRows && reverseRows[0] && Array.isArray(reverseRows[0].result) ? reverseRows[0].result : [];
  if (reverseValues.length === pokerPlusIds.length && reverseValues.every(Boolean)) {
    const map = {};
    pokerPlusIds.forEach((p21Id, index) => {
      pokerPlusIdLookupAliases(p21Id).forEach((alias) => {
        const key = pokerPlusLookupKey(alias);
        if (key) map[key] = accountLookupKeysFromHashField(reverseValues[index], dtMap);
      });
    });
    return map;
  }
  const res = await redisPipeline([
    ["HGETALL", POKERPLUS_BIND_HASH_KEY],
    ["HGETALL", P21_IDS_KEY],
  ]);
  return buildPokerPlusAccountLookup(
    res && res[0] ? res[0].result : null,
    res && res[1] ? res[1].result : null,
    dtMap
  );
}

function dtMapFromRedisHash(raw) {
  const map = {};
  redisHashEntries(raw).forEach(function (pair) {
    const userId = String(pair[0] || "").trim();
    const dtId = String(pair[1] || "").trim();
    if (userId && dtId) map[userId] = dtId;
  });
  return map;
}

function linkedUserIdFromAccountKeys(accountKeys) {
  const keys = Array.isArray(accountKeys) ? accountKeys : [];
  for (const key of keys) {
    const v = String(key || "").trim();
    if (/^tg_\d+$/.test(v)) return v;
  }
  for (const key of keys) {
    const v = String(key || "").trim();
    if (/^vk_/.test(v)) return v;
  }
  return "";
}

function linkedAccountIdFromAccountKeys(accountKeys, dtMap) {
  const keys = Array.isArray(accountKeys) ? accountKeys : [];
  for (const key of keys) {
    const v = String(key || "").trim();
    if (/^ID\d{6}$/.test(v)) return v;
  }
  for (const key of keys) {
    const v = String(key || "").trim();
    const dtId = dtMap && dtMap[v] ? String(dtMap[v]).trim() : "";
    if (/^ID\d{6}$/.test(dtId)) return dtId;
  }
  return keys.length ? String(keys[0] || "").trim() : "";
}

async function resolveAdminRaffleParticipantProfileByP21(p21Id) {
  const aliases = pokerPlusIdLookupAliases(p21Id);
  if (!aliases.length || !redisConfigured()) return {};

  let lookupRows;
  const directRows = await redisPipeline([[
    "HMGET",
    POKERPLUS_BIND_REVERSE_HASH_KEY,
    ...aliases.map((alias) => String(alias).trim().toLowerCase()),
  ]]);
  const directValues = directRows && directRows[0] && Array.isArray(directRows[0].result) ? directRows[0].result : [];
  const directAccountId = String(directValues.find(Boolean) || "").trim();
  if (directAccountId) {
    lookupRows = await redisPipeline([
      ["HMGET", DT_IDS_KEY, directAccountId],
    ]);
  }
  try {
    if (!directAccountId) {
      lookupRows = await redisPipeline([
        ["HGETALL", DT_IDS_KEY],
        ["HGETALL", POKERPLUS_BIND_HASH_KEY],
        ["HGETALL", P21_IDS_KEY],
      ]);
    }
  } catch (e) {
    return {};
  }

  const dtMap = directAccountId ? {} : dtMapFromRedisHash(lookupRows && lookupRows[0] ? lookupRows[0].result : null);
  const accountLookup = directAccountId
    ? Object.fromEntries(aliases.map((alias) => [pokerPlusLookupKey(alias), [directAccountId]]))
    : buildPokerPlusAccountLookup(
      lookupRows && lookupRows[1] ? lookupRows[1].result : null,
      lookupRows && lookupRows[2] ? lookupRows[2].result : null,
      dtMap
    );
  const accountKeys = [];
  const accountSeen = new Set();
  aliases.forEach(function (alias) {
    const keys = accountLookup[pokerPlusLookupKey(alias)] || [];
    keys.forEach(function (key) {
      addUniqueValue(accountKeys, accountSeen, key);
    });
  });
  if (!accountKeys.length) return {};

  const accountId = linkedAccountIdFromAccountKeys(accountKeys, dtMap);
  let userId = linkedUserIdFromAccountKeys(accountKeys);
  if (!userId && /^ID\d{6}$/.test(accountId)) {
    try {
      userId = (await getPreferredUserIdByDtId(accountId)) || "";
    } catch (e) {
      userId = "";
    }
  }
  if (!userId && /^(tg_|vk_)/.test(accountId)) userId = accountId;

  const profileLookupList = [];
  const profileSeen = new Set();
  addUniqueValue(profileLookupList, profileSeen, accountId);
  accountKeys.forEach(function (key) {
    addUniqueValue(profileLookupList, profileSeen, key);
  });
  aliases.forEach(function (alias) {
    addUniqueValue(profileLookupList, profileSeen, alias);
  });

  const commands = [];
  let usernameIdx = -1;
  let displayIdx = -1;
  let accountDisplayIdx = -1;
  let profileIdx = -1;
  if (userId) {
    usernameIdx = commands.length;
    commands.push(["HGET", USERNAMES_KEY, userId]);
    displayIdx = commands.length;
    commands.push(["HGET", CHAT_DISPLAY_NAMES_KEY, userId]);
  }
  if (accountId) {
    accountDisplayIdx = commands.length;
    commands.push(["HGET", CHAT_DISPLAY_NAMES_KEY, accountId]);
  }
  if (profileLookupList.length) {
    profileIdx = commands.length;
    commands.push(["HMGET", POKERPLUS_PROFILE_HASH_KEY, ...profileLookupList]);
  }

  let values = [];
  try {
    values = commands.length ? await redisPipeline(commands) : [];
  } catch (e) {
    values = [];
  }

  const telegramUsername = userId && /^tg_\d+$/.test(userId) && usernameIdx >= 0
    ? normalizeTelegramLoginForPrivacy(redisTrimmedString(values[usernameIdx]))
    : "";
  const displayName = sanitizeDispRaffleStored(
    (displayIdx >= 0 ? redisTrimmedString(values[displayIdx]) : "") ||
    (accountDisplayIdx >= 0 ? redisTrimmedString(values[accountDisplayIdx]) : "")
  );

  let pokerPlusNickname = "";
  let pokerPlusStatusLevel = null;
  const profileRows = profileIdx >= 0 && values[profileIdx] && Array.isArray(values[profileIdx].result)
    ? values[profileIdx].result
    : [];
  for (let i = 0; i < profileRows.length; i += 1) {
    const rawProfile = profileRows[i];
    if (!pokerPlusNickname) pokerPlusNickname = pokerPlusNicknameFromProfileRaw(rawProfile);
    if (pokerPlusStatusLevel == null) {
      const level = pokerPlusStatusLevelFromProfileRaw(rawProfile);
      if (level != null) pokerPlusStatusLevel = level;
    }
    if (pokerPlusNickname && pokerPlusStatusLevel != null) break;
  }

  return {
    userId: String(userId || "").trim(),
    accountId: String(accountId || "").trim(),
    telegramUsername,
    displayName,
    pokerPlusNickname,
    pokerPlusStatusLevel,
  };
}

function raffleRows(raffle) {
  return []
    .concat(Array.isArray(raffle && raffle.participants) ? raffle.participants : [])
    .concat(Array.isArray(raffle && raffle.winners) ? raffle.winners : []);
}

function profileLookupKeysForRaffleRow(row, dtMap, pokerPlusAccountMap) {
  const keys = [];
  const seen = new Set();
  const userId = row && row.userId != null ? String(row.userId).trim() : "";
  addUniqueValue(keys, seen, row && row.accountId);
  addUniqueValue(keys, seen, raffleParticipantAccountId(row));
  addUniqueValue(keys, seen, userId && dtMap ? dtMap[userId] : "");
  if (/^ID\d{6}$/.test(userId)) addUniqueValue(keys, seen, userId);
  pokerPlusIdLookupAliases(row && row.p21Id).forEach(function (alias) {
    addUniqueValue(keys, seen, alias);
    const lookupKey = pokerPlusLookupKey(alias);
    const accountKeys = pokerPlusAccountMap && pokerPlusAccountMap[lookupKey] ? pokerPlusAccountMap[lookupKey] : [];
    accountKeys.forEach(function (accountKey) {
      addUniqueValue(keys, seen, accountKey);
    });
  });
  return keys;
}

function normalizePokerPlusStatusLevel(value) {
  if (value == null || value === "") return null;
  const n = Number(value);
  if (!Number.isFinite(n)) return null;
  return Math.max(0, Math.min(100, Math.trunc(n)));
}

function applyPokerPlusNicknameToRow(row, dtMap, profileNickMap, pokerPlusAccountMap, profileLevelMap) {
  if (!row || typeof row !== "object") return false;
  const stored = sanitizePokerPlusNickname(row.pokerPlusNickname);
  let nickname = "";
  const keys = profileLookupKeysForRaffleRow(row, dtMap, pokerPlusAccountMap);
  for (let i = 0; i < keys.length && !nickname; i += 1) {
    nickname = profileNickMap && profileNickMap[keys[i]] ? profileNickMap[keys[i]] : "";
  }
  if (!nickname && stored) nickname = stored;
  if (!nickname) return false;
  let changed = false;
  if (nickname !== stored) {
    row.pokerPlusNickname = nickname;
    changed = true;
  }
  const oldName = sanitizeDispRaffleStored(row.name);
  const accountId = String((row && row.accountId) || raffleParticipantAccountId(row) || "").trim();
  const p21Id = String(row.p21Id || "").trim();
  if (!oldName || oldName === "Участник" || oldName === accountId || oldName === p21Id) {
    row.name = nickname;
    changed = true;
  }
  let statusLevel = null;
  for (let i = 0; i < keys.length && statusLevel == null; i += 1) {
    const key = keys[i];
    if (profileLevelMap && Object.prototype.hasOwnProperty.call(profileLevelMap, key)) {
      statusLevel = normalizePokerPlusStatusLevel(profileLevelMap[key]);
    }
  }
  if (statusLevel != null && normalizePokerPlusStatusLevel(row.pokerPlusStatusLevel) !== statusLevel) {
    row.pokerPlusStatusLevel = statusLevel;
    changed = true;
  }
  return changed;
}

/**
 * Подставляет имена из Redis для старых участников с «Участник» / пустым именем (как при join).
 * Возвращает { raffle, changed } — при changed нужно SET в Redis.
 */
async function hydrateRaffleParticipantNamesFromRedis(raffle) {
  if (!raffle || !redisConfigured()) return { raffle, changed: false };
  const ids = new Set();
  (raffle.participants || []).forEach(function (p) {
    if (p && p.userId) ids.add(String(p.userId));
  });
  (raffle.winners || []).forEach(function (w) {
    if (w && w.userId) ids.add(String(w.userId));
  });
  const uidList = [...ids].filter(Boolean);
  const res = uidList.length ? await redisPipeline([
    ["HMGET", CHAT_DISPLAY_NAMES_KEY, ...uidList],
    ["HMGET", USERNAMES_KEY, ...uidList],
    ["HMGET", DT_IDS_KEY, ...uidList],
  ], {
    context: "raffles.hydrateOne.identity",
    allowLargeRedisRead: true,
  }) : null;
  const dispRow = res && res[0] && Array.isArray(res[0].result) ? res[0].result : [];
  const unRow = res && res[1] && Array.isArray(res[1].result) ? res[1].result : [];
  const dtRow = res && res[2] && Array.isArray(res[2].result) ? res[2].result : [];
  const dispMap = {};
  const unMap = {};
  const dtMap = {};
  uidList.forEach(function (uid, i) {
    dispMap[uid] = sanitizeDispRaffleStored(dispRow[i]);
    const rawU = unRow[i];
    unMap[uid] = rawU != null && rawU !== false ? String(rawU).trim().replace(/^@+/g, "") : "";
    const rawDt = dtRow[i];
    dtMap[uid] = rawDt != null && rawDt !== false ? String(rawDt).trim() : "";
  });
  const specialtyAccounts = [];
  const specialtySeen = new Set();
  raffleRows(raffle).forEach(function (row) {
    if (!row) return;
    const uid = row.userId ? String(row.userId) : "";
    [row.accountId, row.dtId, row.memberId, uid ? dtMap[uid] : ""].forEach(function (id) {
      addUniqueValue(specialtyAccounts, specialtySeen, id);
    });
  });
  const specialtyRes = specialtyAccounts.length
    ? await redisPipeline([["HMGET", PROFILE_SPECIALTY_KEY, ...specialtyAccounts]], {
      context: "raffles.hydrateOne.specialty",
      allowLargeRedisRead: true,
    })
    : null;
  const specialtyRow = specialtyRes && specialtyRes[0] && Array.isArray(specialtyRes[0].result) ? specialtyRes[0].result : [];
  const specialtyMap = {};
  specialtyAccounts.forEach(function (id, i) {
    const value = normalizeProfileSpecialty(specialtyRow[i]);
    if (value) specialtyMap[id] = value;
  });
  const profileLookupList = [];
  const profileSeen = new Set();
  const pokerPlusAccountMap = await loadPokerPlusAccountLookupForRows(raffleRows(raffle), dtMap);
  raffleRows(raffle).forEach(function (row) {
    profileLookupKeysForRaffleRow(row, dtMap, pokerPlusAccountMap).forEach(function (key) {
      addUniqueValue(profileLookupList, profileSeen, key);
    });
  });
  const profileRes = profileLookupList.length
    ? await redisPipeline([["HMGET", POKERPLUS_PROFILE_HASH_KEY, ...profileLookupList]], {
      context: "raffles.hydrateOne.profiles",
      allowLargeRedisRead: true,
    })
    : null;
  const profileRows = profileRes && profileRes[0] && Array.isArray(profileRes[0].result) ? profileRes[0].result : [];
  const profileNickMap = {};
  const profileLevelMap = {};
  profileLookupList.forEach(function (key, i) {
    const rawProfile = profileRows[i];
    profileNickMap[key] = pokerPlusNicknameFromProfileRaw(rawProfile);
    const level = pokerPlusStatusLevelFromProfileRaw(rawProfile);
    if (level != null) profileLevelMap[key] = level;
  });

  function nameFromRedis(uid) {
    const d = dispMap[uid];
    if (d) return d;
    const u = unMap[uid] || "";
    if (u) return "@" + u;
    return null;
  }

  let changed = false;
  function bump(row) {
    if (!row || !row.userId) return;
    const uid = String(row.userId);
    const old = String(row.name || "").trim();
    if (old && old !== "Участник") return;
    const nm = nameFromRedis(uid);
    if (nm && nm !== old) {
      row.name = nm;
      changed = true;
    }
  }
  (raffle.participants || []).forEach(bump);
  (raffle.winners || []).forEach(bump);
  raffleRows(raffle).forEach(function (row) {
    if (row) {
      const uid = row.userId ? String(row.userId) : "";
      const specialty =
        normalizeProfileSpecialty(specialtyMap[row.accountId]) ||
        normalizeProfileSpecialty(specialtyMap[row.dtId]) ||
        normalizeProfileSpecialty(specialtyMap[row.memberId]) ||
        normalizeProfileSpecialty(uid ? specialtyMap[dtMap[uid]] : "");
      if (specialty && row.profileSpecialty !== specialty) {
        row.profileSpecialty = specialty;
        changed = true;
      } else if (!specialty && row.profileSpecialty) {
        delete row.profileSpecialty;
        changed = true;
      }
    }
    if (applyPokerPlusNicknameToRow(row, dtMap, profileNickMap, pokerPlusAccountMap, profileLevelMap)) changed = true;
  });
  function attachTgLogin(row) {
    if (!row || !row.userId) return;
    const uid = String(row.userId);
    if (uid.indexOf("tg_") !== 0) {
      if (row.manualRaffleParticipant === true) {
        const manualLogin = normalizeTelegramLoginForPrivacy(row.telegramUsername);
        if (manualLogin) row.telegramUsername = manualLogin;
        else {
          try {
            delete row.telegramUsername;
          } catch (eDelManual) {}
        }
        return;
      }
      try {
        delete row.telegramUsername;
      } catch (eDel) {}
      return;
    }
    const u = (unMap[uid] || "").trim();
    if (u) row.telegramUsername = u;
    else {
      try {
        delete row.telegramUsername;
      } catch (eDel2) {}
    }
  }
  (raffle.participants || []).forEach(attachTgLogin);
  (raffle.winners || []).forEach(attachTgLogin);
  return { raffle, changed };
}

async function hydrateRafflesParticipantNamesFromRedis(raffles) {
  if (!Array.isArray(raffles) || raffles.length === 0 || !redisConfigured()) {
    return { raffles: raffles || [], changedIds: [] };
  }
  const ids = new Set();
  raffles.forEach(function (raffle) {
    (raffle && raffle.participants ? raffle.participants : []).forEach(function (p) {
      if (p && p.userId) ids.add(String(p.userId));
    });
    (raffle && raffle.winners ? raffle.winners : []).forEach(function (w) {
      if (w && w.userId) ids.add(String(w.userId));
    });
  });
  const uidList = [...ids].filter(Boolean);
  const res = uidList.length ? await redisPipeline([
    ["HMGET", CHAT_DISPLAY_NAMES_KEY, ...uidList],
    ["HMGET", USERNAMES_KEY, ...uidList],
    ["HMGET", DT_IDS_KEY, ...uidList],
  ], {
    context: "raffles.hydrateMany.identity",
    allowLargeRedisRead: true,
  }) : null;
  const dispRow = res && res[0] && Array.isArray(res[0].result) ? res[0].result : [];
  const unRow = res && res[1] && Array.isArray(res[1].result) ? res[1].result : [];
  const dtRow = res && res[2] && Array.isArray(res[2].result) ? res[2].result : [];
  const dispMap = {};
  const unMap = {};
  const dtMap = {};
  uidList.forEach(function (uid, i) {
    dispMap[uid] = sanitizeDispRaffleStored(dispRow[i]);
    const rawU = unRow[i];
    unMap[uid] = rawU != null && rawU !== false ? String(rawU).trim().replace(/^@+/g, "") : "";
    const rawDt = dtRow[i];
    dtMap[uid] = rawDt != null && rawDt !== false ? String(rawDt).trim() : "";
  });
  const specialtyAccounts = [];
  const specialtySeen = new Set();
  const allRows = [];
  raffles.forEach(function (raffle) {
    raffleRows(raffle).forEach(function (row) {
      allRows.push(row);
      if (!row) return;
      const uid = row.userId ? String(row.userId) : "";
      [row.accountId, row.dtId, row.memberId, uid ? dtMap[uid] : ""].forEach(function (id) {
        addUniqueValue(specialtyAccounts, specialtySeen, id);
      });
    });
  });
  const specialtyRes = specialtyAccounts.length
    ? await redisPipeline([["HMGET", PROFILE_SPECIALTY_KEY, ...specialtyAccounts]], {
      context: "raffles.hydrateMany.specialty",
      allowLargeRedisRead: true,
    })
    : null;
  const specialtyRow = specialtyRes && specialtyRes[0] && Array.isArray(specialtyRes[0].result) ? specialtyRes[0].result : [];
  const specialtyMap = {};
  specialtyAccounts.forEach(function (id, i) {
    const value = normalizeProfileSpecialty(specialtyRow[i]);
    if (value) specialtyMap[id] = value;
  });
  const profileLookupList = [];
  const profileSeen = new Set();
  const pokerPlusAccountMap = await loadPokerPlusAccountLookupForRows(allRows, dtMap);
  raffles.forEach(function (raffle) {
    raffleRows(raffle).forEach(function (row) {
      profileLookupKeysForRaffleRow(row, dtMap, pokerPlusAccountMap).forEach(function (key) {
        addUniqueValue(profileLookupList, profileSeen, key);
      });
    });
  });
  const profileRes = profileLookupList.length
    ? await redisPipeline([["HMGET", POKERPLUS_PROFILE_HASH_KEY, ...profileLookupList]], {
      context: "raffles.hydrateMany.profiles",
      allowLargeRedisRead: true,
    })
    : null;
  const profileRows = profileRes && profileRes[0] && Array.isArray(profileRes[0].result) ? profileRes[0].result : [];
  const profileNickMap = {};
  const profileLevelMap = {};
  profileLookupList.forEach(function (key, i) {
    const rawProfile = profileRows[i];
    profileNickMap[key] = pokerPlusNicknameFromProfileRaw(rawProfile);
    const level = pokerPlusStatusLevelFromProfileRaw(rawProfile);
    if (level != null) profileLevelMap[key] = level;
  });

  function nameFromRedis(uid) {
    const d = dispMap[uid];
    if (d) return d;
    const u = unMap[uid] || "";
    if (u) return "@" + u;
    return null;
  }

  const changedIds = [];
  raffles.forEach(function (raffle) {
    if (!raffle || !raffle.id) return;
    let changed = false;
    function bump(row) {
      if (!row || !row.userId) return;
      const uid = String(row.userId);
      const old = String(row.name || "").trim();
      if (!old || old === "Участник") {
        const nm = nameFromRedis(uid);
        if (nm && nm !== old) {
          row.name = nm;
          changed = true;
        }
      }
      if (uid.indexOf("tg_") === 0) {
        const u = (unMap[uid] || "").trim();
        if (u) row.telegramUsername = u;
        else if (row.telegramUsername) {
          delete row.telegramUsername;
          changed = true;
        }
      } else if (row.telegramUsername) {
        if (row.manualRaffleParticipant === true) {
          const manualLogin = normalizeTelegramLoginForPrivacy(row.telegramUsername);
          if (manualLogin !== row.telegramUsername) {
            row.telegramUsername = manualLogin;
            changed = true;
          }
        } else {
          delete row.telegramUsername;
          changed = true;
        }
      }
    }
    (raffle.participants || []).forEach(bump);
    (raffle.winners || []).forEach(bump);
    raffleRows(raffle).forEach(function (row) {
      if (row) {
        const uid = row.userId ? String(row.userId) : "";
        const specialty =
          normalizeProfileSpecialty(specialtyMap[row.accountId]) ||
          normalizeProfileSpecialty(specialtyMap[row.dtId]) ||
          normalizeProfileSpecialty(specialtyMap[row.memberId]) ||
          normalizeProfileSpecialty(uid ? specialtyMap[dtMap[uid]] : "");
        if (specialty && row.profileSpecialty !== specialty) {
          row.profileSpecialty = specialty;
          changed = true;
        } else if (!specialty && row.profileSpecialty) {
          delete row.profileSpecialty;
          changed = true;
        }
      }
      if (applyPokerPlusNicknameToRow(row, dtMap, profileNickMap, pokerPlusAccountMap, profileLevelMap)) changed = true;
    });
    if (changed) changedIds.push(String(raffle.id));
  });
  return { raffles, changedIds };
}

function normalizeTelegramLoginForPrivacy(raw) {
  const login = raw != null ? String(raw).trim().replace(/^@+/g, "") : "";
  return /^[A-Za-z0-9_]{5,32}$/.test(login) ? login : "";
}

function hasAuthCredential(req, body) {
  const q = (req && req.query) || {};
  const b = body || {};
  return [
    q.initData,
    q.init_data,
    q.pwaSession,
    q.pwa_session,
    q.pwaVkSession,
    q.pwa_vk_session,
    b.initData,
    b.init_data,
    b.pwaSession,
    b.pwa_session,
    b.pwaVkSession,
    b.pwa_vk_session,
  ].some((value) => String(value || "").trim() !== "");
}

async function resolveLinkedEmailAccountId(identity, memberId) {
  const rawMemberId = memberId != null ? String(memberId).trim() : "";
  const email = identity && identity.email != null ? String(identity.email).trim() : "";
  const isEmailSession =
    !!String(identity && identity.emailMemberId != null ? identity.emailMemberId : "").trim() ||
    /^mail_/.test(rawMemberId) ||
    /^mail_pending_/.test(rawMemberId);
  if (!email || !isEmailSession) return "";
  try {
    const linkedDtId = await getLinkedDtIdByEmail(email);
    return /^ID\d{6}$/.test(String(linkedDtId || "").trim()) ? String(linkedDtId).trim() : "";
  } catch (eEmailDtLookup) {
    return "";
  }
}

async function resolveRaffleAccountId(identity, memberId) {
  const rawMemberId = memberId != null ? String(memberId).trim() : "";
  if (!rawMemberId) return "";
  if (rawMemberId.startsWith("guest_")) return rawMemberId;
  const linkedEmailAccountId = await resolveLinkedEmailAccountId(identity, rawMemberId);
  if (linkedEmailAccountId) return linkedEmailAccountId;
  return await ensureDtIdForUserId(rawMemberId);
}

async function resolveRaffleTelegramGateMemberId(identity, memberId) {
  const rawMemberId = memberId != null ? String(memberId).trim() : "";
  if (/^tg_\d+$/.test(rawMemberId)) return rawMemberId;
  let dtId = await resolveLinkedEmailAccountId(identity, rawMemberId);
  if (/^ID\d{6}$/.test(rawMemberId)) {
    dtId = dtId || rawMemberId;
  } else if (!dtId) {
    try {
      dtId = (await getDtIdByUserId(rawMemberId)) || "";
    } catch (eDtLookup) {
      dtId = "";
    }
  }
  if (dtId) {
    try {
      const preferredUserId = await getPreferredUserIdByDtId(dtId);
      if (/^tg_\d+$/.test(String(preferredUserId || "").trim())) return String(preferredUserId).trim();
    } catch (ePreferredTg) {}
  }
  if (identity && identity.vkId == null && !String(identity.emailMemberId || "").trim()) {
    const n = Number(identity.id);
    if (Number.isFinite(n) && n > 0) return "tg_" + String(Math.trunc(n));
  }
  return rawMemberId;
}

function redisTruthy(row) {
  if (!row || row.error) return false;
  const value = row.result;
  return value === true || value === 1 || value === "1" || String(value || "").toLowerCase() === "true";
}

async function isRaffleAccountSubscriber(accountId) {
  const id = String(accountId || "").trim();
  if (!id) return false;
  try {
    const rows = await redisPipeline([["SISMEMBER", RAFFLE_ACCOUNT_SUBSCRIBERS_KEY, id]]);
    return redisTruthy(rows && rows[0]);
  } catch (e) {
    return false;
  }
}

function sanitizeRaffleSubscriptionGate(gate) {
  if (!gate || typeof gate !== "object") return null;
  return {
    ok: gate.ok === true,
    code: gate.code || "",
    missing: Array.isArray(gate.missing) ? gate.missing : [],
    missingRequirements: Array.isArray(gate.missingRequirements) ? gate.missingRequirements : [],
    botUrl: gate.botUrl || "",
    channelUrl: gate.channelUrl || "",
    openUrl: gate.openUrl || "",
    botSubscribed: gate.botSubscribed === true,
    channelSubscribed: gate.channelSubscribed === true,
    accountSubscribed: gate.accountSubscribed === true,
    subscriptionSource: gate.subscriptionSource || "",
  };
}

async function getRaffleSubscriptionGateForViewer(identity, memberId) {
  const rawMemberId = memberId != null ? String(memberId).trim() : "";
  if (!rawMemberId || rawMemberId === "cron" || rawMemberId.startsWith("guest_")) return null;
  try {
    const accountId = await resolveRaffleAccountId(identity, rawMemberId);
    const accountSubscribed = accountId && !rawMemberId.startsWith("guest_")
      ? await isRaffleAccountSubscriber(accountId)
      : false;
    const gateMemberId = await resolveRaffleTelegramGateMemberId(identity, rawMemberId);
    const gate = await checkTelegramParticipationGate(gateMemberId, BOT_TOKEN, {
      channelHandle: RAFFLE_CHANNEL,
      featureText: "участия в розыгрыше",
      actionText: "нажмите «Участвовать» снова",
      accountSubscribed,
    });
    return sanitizeRaffleSubscriptionGate(gate);
  } catch (e) {
    return null;
  }
}

function sanitizeRaffleManualText(raw, max) {
  return String(raw == null ? "" : raw)
    .trim()
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .slice(0, max || 120);
}

function normalizeProfileSpecialty(raw) {
  const value = String(raw || "").trim().toLowerCase();
  if (value === "mtt" || value === "мтт") return "mtt";
  if (value === "cash" || value === "кеш" || value === "кэш") return "cash";
  return "";
}

function normalizeManualRaffleTicketCount(raw) {
  const n = parseInt(String(raw == null ? "" : raw), 10);
  if (!Number.isFinite(n) || n <= 0) return 1;
  return Math.max(1, Math.min(1000, n));
}

function normalizeManualRaffleP21Id(raw) {
  return sanitizeRaffleManualText(raw, 48).replace(/\s+/g, "");
}

function raffleUsesAdminTicketEntry(raffle) {
  if (!raffle || typeof raffle !== "object") return false;
  const mode = String(raffle.ticketEntryMode || raffle.ticket_entry_mode || "").trim().toLowerCase();
  return mode === "admin" || mode === "manual" || mode === "admin_tickets";
}

function raffleTicketWordRu(count) {
  const n = Math.abs(Math.trunc(Number(count) || 0));
  const mod100 = n % 100;
  const mod10 = n % 10;
  if (mod100 >= 11 && mod100 <= 14) return "билетов";
  if (mod10 === 1) return "билет";
  if (mod10 >= 2 && mod10 <= 4) return "билета";
  return "билетов";
}

function buildAdminRaffleTicketsAddedText(raffle, addedTickets, totalTickets) {
  const added = normalizeManualRaffleTicketCount(addedTickets);
  const total = normalizeManualRaffleTicketCount(totalTickets);
  const title = sanitizeRaffleManualText(
    (raffle && (raffle.title || raffle.cardTitle || raffle.name)) || "Главный розыгрыш",
    120
  ) || "Главный розыгрыш";
  return [
    "Вам добавили " + added + " " + raffleTicketWordRu(added) + " в розыгрыш \"" + title + "\".",
    "Теперь у вас " + total + " " + raffleTicketWordRu(total) + ".",
  ].join("\n");
}

async function notifyAdminRaffleTicketsAddedToParticipant(raffle, participant, addedTickets) {
  const userId = participant && participant.userId != null ? String(participant.userId).trim() : "";
  if (!/^tg_\d+$/.test(userId)) return false;
  const chatId = userId.replace(/^tg_/, "");
  const totalTickets = normalizeManualRaffleTicketCount(
    participant.ticketCount || participant.entryTicketCount || participant.tickets || participant.raffleTickets
  );
  const text = buildAdminRaffleTicketsAddedText(raffle, addedTickets, totalTickets);
  try {
    const sent = await sendTelegramMessage(chatId, text);
    if (!sent || sent.ok === false) {
      try {
        console.warn("[raffles] admin ticket notification failed", {
          raffleId: String((raffle && raffle.id) || ""),
          userId,
          error: sent && sent.error ? sent.error : "unknown",
        });
      } catch (eLog) {}
      return false;
    }
    return true;
  } catch (e) {
    try {
      console.warn("[raffles] admin ticket notification failed", {
        raffleId: String((raffle && raffle.id) || ""),
        userId,
        error: e && e.message ? e.message : String(e || ""),
      });
    } catch (eLog) {}
    return false;
  }
}

function manualRaffleParticipantUserId(seed) {
  const hash = crypto.createHash("sha1").update(String(seed || "")).digest("hex").slice(0, 18);
  return "manual_raffle_" + hash;
}

function manualRaffleParticipantMatch(row, p21Id, telegramUsername, name) {
  if (!row) return false;
  const rowP21 = normalizeManualRaffleP21Id(row.p21Id);
  if (p21Id && rowP21 && rowP21.toLowerCase() === p21Id.toLowerCase()) return true;
  const rowTg = normalizeTelegramLoginForPrivacy(row.telegramUsername);
  if (telegramUsername && rowTg && rowTg.toLowerCase() === telegramUsername.toLowerCase()) return true;
  const rowName = sanitizeRaffleManualText(row.name, 120).toLowerCase();
  return !!(!p21Id && !telegramUsername && name && rowName && rowName === name.toLowerCase());
}

function normalizeAdminRaffleParticipantTarget(body) {
  const userId = sanitizeRaffleManualText(body.userId || body.user_id || body.participantUserId || body.participant_user_id || "", 80);
  const accountId = sanitizeRaffleManualText(body.accountId || body.account_id || body.dtId || body.dt_id || "", 64);
  const p21Id = normalizeManualRaffleP21Id(body.p21Id || body.p21_id || body.playerId || body.player_id || "");
  const telegramUsername = normalizeTelegramLoginForPrivacy(body.telegramUsername || body.telegram_username || body.telegram || "");
  const name = sanitizeRaffleManualText(body.name || body.playerName || body.player_name || "", 120);
  return { userId, accountId, p21Id, telegramUsername, name };
}

function adminRaffleParticipantTargetHasStrongIdentity(target) {
  if (!target) return false;
  const userId = String(target.userId || "").trim();
  if (userId) return true;
  return !!(target.accountId || target.p21Id || target.telegramUsername);
}

function raffleParticipantMatchesAdminTarget(row, target) {
  if (!row || !target) return false;
  const rowUserId = row.userId != null ? String(row.userId).trim() : "";
  if (target.userId && rowUserId === target.userId) return true;
  const rowAccountId = raffleParticipantAccountId(row) || (row.accountId != null ? String(row.accountId).trim() : "");
  if (target.accountId && rowAccountId && rowAccountId === target.accountId) return true;
  const rowP21 = normalizeManualRaffleP21Id(row.p21Id || row.poker21Id || row.pokerPlusId || "");
  if (target.p21Id && rowP21 && rowP21.toLowerCase() === target.p21Id.toLowerCase()) return true;
  const rowTg = normalizeTelegramLoginForPrivacy(row.telegramUsername || row.telegram || row.telegramLogin || "");
  if (target.telegramUsername && rowTg && rowTg.toLowerCase() === target.telegramUsername.toLowerCase()) return true;
  const rowName = sanitizeRaffleManualText(row.name, 120).toLowerCase();
  return !!(
    !target.userId &&
    !target.accountId &&
    !target.p21Id &&
    !target.telegramUsername &&
    target.name &&
    rowName &&
    rowName === target.name.toLowerCase()
  );
}

function looksLikeTelegramLoginForPrivacy(raw, telegramUsername) {
  const text = raw != null ? String(raw).trim() : "";
  if (!text) return false;
  const normalized = normalizeTelegramLoginForPrivacy(text);
  if (!normalized) return false;
  if (text.charAt(0) === "@") return true;
  const tgLogin = normalizeTelegramLoginForPrivacy(telegramUsername);
  return !!(tgLogin && normalized.toLowerCase() === tgLogin.toLowerCase());
}

function sanitizeRaffleRowForPublicViewer(row) {
  if (!row || typeof row !== "object") return row;
  const copy = { ...row };
  const telegramUsername = copy.telegramUsername;
  delete copy.telegramUsername;
  delete copy.telegramUserId;
  delete copy.telegram_user_id;
  if (looksLikeTelegramLoginForPrivacy(copy.name, telegramUsername)) {
    copy.name = "Участник";
  }
  return copy;
}

function sanitizeRaffleForViewer(raffle, admin) {
  if (admin || !raffle || typeof raffle !== "object") return raffle;
  const out = { ...raffle };
  ["participants", "winners"].forEach((key) => {
    if (!Array.isArray(out[key])) return;
    out[key] = out[key].map((row) => sanitizeRaffleRowForPublicViewer(row));
  });
  return out;
}

function sanitizeRafflesForViewer(raffles, admin) {
  if (admin || !Array.isArray(raffles)) return raffles;
  return raffles.map((raffle) => sanitizeRaffleForViewer(raffle, false));
}

function raffleActiveScopeRequested(req) {
  if (!req || !req.query) return false;
  const scope = String(req.query.scope || req.query.mode || req.query.view || "").trim().toLowerCase();
  const value = String(req.query.activeOnly || req.query.active_only || "").trim().toLowerCase();
  return scope === "active" || value === "1" || value === "true" || value === "yes";
}

function bypassRafflePublicListCacheRequested(req) {
  if (!req || !req.query) return false;
  const value = String(req.query.bypassListCache || req.query.bypass_list_cache || req.query.noListCache || req.query.no_list_cache || "").trim().toLowerCase();
  return value === "1" || value === "true" || value === "yes";
}

async function readRafflePublicListCache() {
  try {
    const rows = await redisPipeline([["GET", RAFFLE_PUBLIC_LIST_CACHE_KEY]], {
      timeoutMs: 2500,
      context: "raffles.publicListCache.get",
    });
    const raw = rows && rows[0] && rows[0].result;
    if (!raw) return null;
    const parsed = JSON.parse(String(raw));
    if (!parsed || !Array.isArray(parsed.raffles)) return null;
    return parsed;
  } catch (e) {
    return null;
  }
}

async function writeRafflePublicListCache(payload) {
  if (!payload || !Array.isArray(payload.raffles)) return;
  await redisPipeline([["SET", RAFFLE_PUBLIC_LIST_CACHE_KEY, JSON.stringify(payload), "EX", String(RAFFLE_PUBLIC_LIST_CACHE_TTL_SECONDS)]], {
    timeoutMs: 2500,
    context: "raffles.publicListCache.set",
  });
}

async function readRaffleAdminActiveListCache() {
  try {
    const rows = await redisPipeline([["GET", RAFFLE_ADMIN_ACTIVE_LIST_CACHE_KEY]], {
      timeoutMs: 2500,
      context: "raffles.adminActiveListCache.get",
    });
    const raw = rows && rows[0] && rows[0].result;
    if (!raw) return null;
    const parsed = JSON.parse(String(raw));
    return parsed && parsed.activeOnly === true && Array.isArray(parsed.activeRaffles) ? parsed : null;
  } catch (eCache) {
    return null;
  }
}

async function writeRaffleAdminActiveListCache(payload) {
  if (!payload || payload.activeOnly !== true || !Array.isArray(payload.activeRaffles)) return;
  await redisPipeline([[
    "SET",
    RAFFLE_ADMIN_ACTIVE_LIST_CACHE_KEY,
    JSON.stringify(payload),
    "EX",
    String(RAFFLE_ADMIN_ACTIVE_LIST_CACHE_TTL_SECONDS),
  ]], {
    timeoutMs: 2500,
    context: "raffles.adminActiveListCache.set",
  });
}

async function readRaffleSummaryCache() {
  try {
    const rows = await redisPipeline([["GET", RAFFLE_SUMMARY_CACHE_KEY]], {
      timeoutMs: 2500,
      context: "raffles.summaryCache.get",
    });
    const raw = rows && rows[0] && rows[0].result;
    if (!raw) return null;
    const parsed = JSON.parse(String(raw));
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch (e) {
    return null;
  }
}

async function writeRaffleSummaryCache(summary) {
  if (!summary || typeof summary !== "object") return;
  await redisPipeline([["SET", RAFFLE_SUMMARY_CACHE_KEY, JSON.stringify(summary), "EX", String(RAFFLE_SUMMARY_CACHE_TTL_SECONDS)]], {
    timeoutMs: 2500,
    context: "raffles.summaryCache.set",
  });
}

async function loadRafflesSummaryFromRedis() {
  const cached = await readRaffleSummaryCache();
  if (cached) return cached;
  const idsRes = await redisPipeline([["LRANGE", RAFFLE_IDS_KEY, "0", "-1"]], {
    timeoutMs: 6500,
    context: "raffles.summary.ids",
    allowLargeRedisRead: true,
  });
  const idsRaw = (idsRes && idsRes[0] && Array.isArray(idsRes[0].result) ? idsRes[0].result : []).filter(Boolean);
  const ids = [...new Set(idsRaw)];
  const rows = ids.length ? await redisPipeline(ids.map((id) => ["GET", RAFFLE_PREFIX + id]), {
    timeoutMs: 6500,
    context: "raffles.summary.rows",
    allowLargeRedisRead: true,
  }) : [];
  const raffles = [];
  for (let i = 0; i < rows.length; i += 1) {
    const raw = rows[i] && rows[i].result;
    if (!raw) continue;
    try {
      const raffle = JSON.parse(raw);
      if (raffle && raffle.id) raffles.push(raffle);
    } catch (e) {}
  }
  const summary = buildRafflesSummaryPayload(raffles);
  writeRaffleSummaryCache(summary).catch(() => {});
  return summary;
}

async function loadRecentCompletedRafflesFromRedis(limit) {
  const n = Math.max(0, Math.min(5, parseInt(String(limit || RAFFLE_RECENT_COMPLETED_LIMIT), 10) || RAFFLE_RECENT_COMPLETED_LIMIT));
  if (!n) return [];
  const scanLimit = Math.max(n, RAFFLE_RECENT_COMPLETED_SCAN_LIMIT);
  const idsRes = await redisPipeline([["LRANGE", RAFFLE_IDS_KEY, String(-scanLimit), "-1"]], {
    timeoutMs: 6500,
    context: "raffles.recentCompleted.ids",
  });
  const idsRaw = idsRes && idsRes[0] && Array.isArray(idsRes[0].result) ? idsRes[0].result : [];
  const ids = [...new Set(idsRaw.slice().reverse().filter(Boolean))];
  const rows = ids.length ? await redisPipeline(ids.map((id) => ["GET", RAFFLE_PREFIX + id]), {
    timeoutMs: 6500,
    context: "raffles.recentCompleted.rows",
  }) : [];
  const nowMs = Date.now();
  const completed = [];
  for (let i = 0; i < rows.length; i += 1) {
    const raw = rows[i] && rows[i].result;
    if (!raw) continue;
    try {
      const raffle = JSON.parse(raw);
      const status = String(raffle && raffle.status || "").trim().toLowerCase();
      if (status && status !== "active" && raffleSummaryCompletedRaffle(raffle, nowMs)) completed.push(raffle);
    } catch (e) {}
  }
  completed.sort((a, b) => raffleSummaryCompletedTimeMs(b) - raffleSummaryCompletedTimeMs(a));
  return completed.slice(0, n);
}

function raffleArchiveScope(req) {
  return String(req && req.query && req.query.scope || "").trim().toLowerCase();
}

function raffleArchiveDateParts(raffle) {
  const ms = raffleSummaryCompletedTimeMs(raffle);
  if (!ms) return null;
  const shifted = new Date(ms + 3 * 60 * 60 * 1000);
  const year = shifted.getUTCFullYear();
  const month = shifted.getUTCMonth() + 1;
  const day = shifted.getUTCDate();
  const mondayOffset = (shifted.getUTCDay() + 6) % 7;
  const weekStart = new Date(Date.UTC(year, month - 1, day - mondayOffset));
  const pad = (value) => String(value).padStart(2, "0");
  return {
    monthKey: `${year}-${pad(month)}`,
    weekKey: `${weekStart.getUTCFullYear()}-${pad(weekStart.getUTCMonth() + 1)}-${pad(weekStart.getUTCDate())}`,
    weekEndKey: (() => {
      const end = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000);
      return `${end.getUTCFullYear()}-${pad(end.getUTCMonth() + 1)}-${pad(end.getUTCDate())}`;
    })(),
  };
}

async function loadCompletedRaffleArchiveRows() {
  const idsRes = await redisPipeline([["LRANGE", RAFFLE_IDS_KEY, "0", "-1"]], {
    timeoutMs: 6500,
    context: "raffles.archive.ids",
    allowLargeRedisRead: true,
  });
  const idsRaw = idsRes && idsRes[0] && Array.isArray(idsRes[0].result) ? idsRes[0].result : [];
  const ids = [...new Set(idsRaw.filter(Boolean))];
  const rows = ids.length ? await redisPipeline(ids.map((id) => ["GET", RAFFLE_PREFIX + id]), {
    timeoutMs: 10000,
    context: "raffles.archive.rows",
    allowLargeRedisRead: true,
  }) : [];
  const nowMs = Date.now();
  const completed = [];
  (Array.isArray(rows) ? rows : []).forEach((row) => {
    try {
      const raffle = row && row.result ? JSON.parse(row.result) : null;
      if (raffleSummaryCompletedRaffle(raffle, nowMs)) {
        completed.push(raffle);
        return;
      }
      if (String(raffle && raffle.status || "").toLowerCase() !== "active") return;
      const batches = Array.isArray(raffle.resultBatches) ? raffle.resultBatches : [];
      const winners = Array.isArray(raffle.winners) ? raffle.winners : [];
      batches.forEach((batch, index) => {
        const batchMs = new Date(batch && (batch.drawnAt || batch.endDate) || "").getTime();
        if (!Number.isFinite(batchMs) || batchMs > nowMs) return;
        const groupIndexes = Array.isArray(batch && batch.groupIndexes) ? batch.groupIndexes : [index];
        const groupSet = new Set(groupIndexes.map((value) => parseInt(String(value), 10)).filter(Number.isFinite));
        const batchWinners = winners.filter((winner) => {
          const groupIndex = parseInt(String(winner && winner.groupIndex != null ? winner.groupIndex : ""), 10);
          return Number.isFinite(groupIndex) && groupSet.has(groupIndex);
        }).map((winner) => ({ ...winner, sourceRaffleId: raffle.id }));
        if (!batchWinners.length) return;
        completed.push({
          ...raffle,
          id: `${raffle.id || "raffle"}__batch_${index}`,
          sourceRaffleId: raffle.id,
          status: "completed",
          completedAt: batch.drawnAt || batch.endDate || raffle.completedAt || raffle.endDate,
          drawnAt: batch.drawnAt || batch.endDate || raffle.drawnAt || raffle.endDate,
          endDate: batch.endDate || raffle.endDate,
          resultBatchLabel: String(batch.label || "").trim(),
          resultBatchTime: String(batch.time || "").trim(),
          resultBatchIndex: index,
          winners: batchWinners,
        });
      });
    } catch (e) {}
  });
  completed.sort((a, b) => raffleSummaryCompletedTimeMs(b) - raffleSummaryCompletedTimeMs(a));
  return completed.slice(RAFFLE_RECENT_COMPLETED_LIMIT);
}

function raffleArchiveGroupTotals(rows) {
  const list = Array.isArray(rows) ? rows : [];
  return {
    count: list.length,
    sum: Math.round(list.reduce((sum, raffle) => sum + raffleSummaryTotalPrize(raffle), 0)),
  };
}

function raffleArchiveCachePayloadKey(generation, scope, value) {
  return RAFFLE_ARCHIVE_INDEX_CACHE_KEY + ":" + generation + ":" + scope + (value ? ":" + value : "");
}

async function readRaffleArchiveCachedPayload(scope, value) {
  try {
    const generationRows = await redisPipeline([["GET", RAFFLE_ARCHIVE_INDEX_CACHE_KEY]], {
      timeoutMs: 2500,
      context: "raffles.archiveIndex.generation",
    });
    const generation = String(generationRows && generationRows[0] && generationRows[0].result || "").trim();
    if (!generation) return null;
    const payloadRows = await redisPipeline([["GET", raffleArchiveCachePayloadKey(generation, scope, value)]], {
      timeoutMs: 2500,
      context: "raffles.archiveIndex.payload",
    });
    const raw = payloadRows && payloadRows[0] && payloadRows[0].result;
    return raw ? JSON.parse(String(raw)) : null;
  } catch (eArchiveCache) {
    return null;
  }
}

async function writeRaffleArchiveIndexCache(rows) {
  const generation = String(Date.now());
  const byMonth = new Map();
  const byWeek = new Map();
  (Array.isArray(rows) ? rows : []).forEach((raffle) => {
    const parts = raffleArchiveDateParts(raffle);
    if (!parts) return;
    if (!byMonth.has(parts.monthKey)) byMonth.set(parts.monthKey, []);
    if (!byWeek.has(parts.weekKey)) byWeek.set(parts.weekKey, { endKey: parts.weekEndKey, rows: [] });
    byMonth.get(parts.monthKey).push(raffle);
    byWeek.get(parts.weekKey).rows.push(raffle);
  });
  const indexPayload = {
    ok: true,
    archiveScope: "index",
    totals: raffleArchiveGroupTotals(rows),
    months: [...byMonth.entries()].map(([key, items]) => ({ key, ...raffleArchiveGroupTotals(items) })),
  };
  const commands = [[
    "SET",
    raffleArchiveCachePayloadKey(generation, "index", ""),
    JSON.stringify(indexPayload),
    "EX",
    String(RAFFLE_ARCHIVE_INDEX_CACHE_TTL_SECONDS),
  ]];
  byMonth.forEach((monthRows, monthKey) => {
    const monthWeeks = new Map();
    monthRows.forEach((raffle) => {
      const parts = raffleArchiveDateParts(raffle);
      if (!parts) return;
      if (!monthWeeks.has(parts.weekKey)) monthWeeks.set(parts.weekKey, { endKey: parts.weekEndKey, rows: [] });
      monthWeeks.get(parts.weekKey).rows.push(raffle);
    });
    const weeks = [...monthWeeks.entries()]
      .map(([key, value]) => ({ key, endKey: value.endKey, ...raffleArchiveGroupTotals(value.rows) }));
    commands.push([
      "SET",
      raffleArchiveCachePayloadKey(generation, "month", monthKey),
      JSON.stringify({ ok: true, archiveScope: "month", month: monthKey, weeks }),
      "EX",
      String(RAFFLE_ARCHIVE_INDEX_CACHE_TTL_SECONDS),
    ]);
  });
  byWeek.forEach((value, weekKey) => {
    commands.push([
      "SET",
      raffleArchiveCachePayloadKey(generation, "week", weekKey),
      JSON.stringify({ ok: true, archiveScope: "week", week: weekKey, raffles: value.rows }),
      "EX",
      String(RAFFLE_ARCHIVE_INDEX_CACHE_TTL_SECONDS),
    ]);
  });
  commands.push(["SET", RAFFLE_ARCHIVE_INDEX_CACHE_KEY, generation, "EX", String(RAFFLE_ARCHIVE_INDEX_CACHE_TTL_SECONDS)]);
  await redisPipeline(commands, {
    timeoutMs: 10000,
    context: "raffles.archiveIndex.build",
    allowLargeRedisRead: true,
    maxRedisReadCommands: Math.max(220, commands.length + 5),
  });
}

async function loadRaffleArchiveScopePayload(req, admin) {
  const scope = raffleArchiveScope(req);
  const cacheValue = scope === "archive-month"
    ? String(req.query.month || "").trim()
    : scope === "archive-week"
      ? String(req.query.week || "").trim()
      : "";
  const cached = await readRaffleArchiveCachedPayload(
    scope === "archive-index" ? "index" : scope === "archive-month" ? "month" : "week",
    cacheValue
  );
  if (cached) {
    if (Array.isArray(cached.raffles)) cached.raffles = sanitizeRafflesForViewer(cached.raffles, admin);
    return cached;
  }
  const rows = await loadCompletedRaffleArchiveRows();
  await writeRaffleArchiveIndexCache(rows).catch(() => {});
  if (scope === "archive-index") {
    const grouped = new Map();
    rows.forEach((raffle) => {
      const parts = raffleArchiveDateParts(raffle);
      if (!parts) return;
      if (!grouped.has(parts.monthKey)) grouped.set(parts.monthKey, []);
      grouped.get(parts.monthKey).push(raffle);
    });
    return {
      ok: true,
      archiveScope: "index",
      totals: raffleArchiveGroupTotals(rows),
      months: [...grouped.entries()].map(([key, items]) => ({ key, ...raffleArchiveGroupTotals(items) })),
    };
  }
  const monthKey = String(req.query.month || "").trim();
  if (scope === "archive-month") {
    if (!/^\d{4}-\d{2}$/.test(monthKey)) return { ok: false, error: "Некорректный месяц" };
    const monthRows = rows.filter((raffle) => {
      const parts = raffleArchiveDateParts(raffle);
      return parts && parts.monthKey === monthKey;
    });
    const grouped = new Map();
    monthRows.forEach((raffle) => {
      const parts = raffleArchiveDateParts(raffle);
      if (!parts) return;
      if (!grouped.has(parts.weekKey)) grouped.set(parts.weekKey, { endKey: parts.weekEndKey, rows: [] });
      grouped.get(parts.weekKey).rows.push(raffle);
    });
    return {
      ok: true,
      archiveScope: "month",
      month: monthKey,
      weeks: [...grouped.entries()].map(([key, value]) => ({
        key,
        endKey: value.endKey,
        ...raffleArchiveGroupTotals(value.rows),
      })),
    };
  }
  const weekKey = String(req.query.week || "").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(weekKey)) return { ok: false, error: "Некорректная неделя" };
  const weekRows = rows.filter((raffle) => {
    const parts = raffleArchiveDateParts(raffle);
    return parts && parts.weekKey === weekKey;
  });
  return {
    ok: true,
    archiveScope: "week",
    week: weekKey,
    raffles: sanitizeRafflesForViewer(weekRows, admin),
  };
}

function buildRaffleActiveOnlyPayload(active, admin, summary, recentCompleted) {
  const safeActive = sanitizeRafflesForViewer(active, admin);
  const safeRecentCompleted = sanitizeRafflesForViewer(recentCompleted || [], admin) || [];
  return {
    // Active rows are already present in activeRaffles. Keeping a second copy in
    // raffles doubled the largest part of the response on every page opening.
    raffles: safeRecentCompleted,
    activeRaffles: safeActive,
    recentCompletedRaffles: safeRecentCompleted,
    rafflesSummary: summary || null,
    archiveDeferred: true,
    activeOnly: true,
    cachedAt: new Date().toISOString(),
  };
}

async function loadRaffleActiveOnlyPayload(admin, allowCache) {
  if (admin && allowCache) {
    const cachedAdminPayload = await readRaffleAdminActiveListCache();
    if (cachedAdminPayload) return { ...cachedAdminPayload, cached: true };
  }
  if (!admin && allowCache) {
    const cachedPayload = await readRafflePublicListCache();
    if (cachedPayload && cachedPayload.activeOnly === true && Array.isArray(cachedPayload.recentCompletedRaffles)) {
      const summary = cachedPayload.rafflesSummary || await loadRafflesSummaryFromRedis().catch(() => null);
      return { ...cachedPayload, rafflesSummary: summary || null, cached: true };
    }
  }

  const ids = await readRaffleActiveIds();
  const getRes = ids.length ? await redisPipeline(ids.map((id) => ["GET", RAFFLE_PREFIX + id]), {
    timeoutMs: 6500,
    context: "raffles.activeOnly.rows",
  }) : [];
  const active = [];
  const byId = new Map();
  const writeBackIds = new Set();
  const completedByDeadlineIds = new Set();
  const rerolledIds = new Set();
  const rerollWinnersById = new Map();
  const batchWinnersById = new Map();
  const inactiveIds = new Set();
  const drawLockedIds = new Set();
  const now = new Date();

  for (let i = 0; i < ids.length; i += 1) {
    const id = String(ids[i] || "");
    const raw = getRes && getRes[i] && getRes[i].result;
    if (!raw) {
      if (id) inactiveIds.add(id);
      continue;
    }
    let raffle = null;
    try {
      raffle = JSON.parse(raw);
    } catch (e) {}
    if (!raffle || !raffle.id) {
      if (id) inactiveIds.add(id);
      continue;
    }
    if (normalizeDailyCashRaffleInPlace(raffle)) writeBackIds.add(String(raffle.id));
    const raffleId = String(raffle.id || id);
    const drawLifecycle = await settleRaffleDrawLifecycleSafely(raffleId, raffle, now);
    raffle = drawLifecycle.raffle || raffle;
    if (drawLifecycle.locked) drawLockedIds.add(raffleId);
    if (drawLifecycle.persisted || drawLifecycle.locked) writeBackIds.delete(raffleId);
    if (drawLifecycle.completed) completedByDeadlineIds.add(raffleId);
    if (drawLifecycle.batchWinners && drawLifecycle.batchWinners.length) {
      batchWinnersById.set(raffleId, drawLifecycle.batchWinners);
    }
    if (raffle.status === "active") {
      const readySettlement = await settleRaffleReadyWindowsSafely(raffleId, raffle, now);
      raffle = readySettlement.raffle || raffle;
      if (readySettlement.rerolled) {
        rerolledIds.add(raffleId);
        rerollWinnersById.set(raffleId, readySettlement.rerollWinners || []);
      }
    }
    byId.set(raffleId, raffle);
    if (raffle.status === "active" && !(new Date(raffle.endDate) <= now)) {
      active.push(raffle);
    } else {
      inactiveIds.add(raffleId);
    }
  }

  const hydratedList = await hydrateRafflesParticipantNamesFromRedis(active);
  const hydratedActive = hydratedList.raffles || active;
  hydratedList.changedIds.forEach((id) => {
    if (!drawLockedIds.has(String(id))) writeBackIds.add(String(id));
  });
  hydratedActive.forEach((raffle) => {
    if (raffle && raffle.id) byId.set(String(raffle.id), raffle);
  });

  const writeCmds = [];
  writeBackIds.forEach((id) => {
    if (drawLockedIds.has(String(id))) return;
    const raffle = byId.get(String(id));
    if (raffle && raffle.id) writeCmds.push(["SET", RAFFLE_PREFIX + raffle.id, JSON.stringify(raffle)]);
  });
  if (inactiveIds.size) writeCmds.push(["SREM", RAFFLE_ACTIVE_IDS_KEY, ...[...inactiveIds]]);
  // Technical normalization of active rows must not invalidate the expensive
  // all-time summary/archive on every GET. Explicit raffle mutations invalidate them.
  if (writeCmds.length || inactiveIds.size) writeCmds.push(["DEL", RAFFLE_PUBLIC_LIST_CACHE_KEY]);
  if (writeCmds.length) {
    await redisPipeline(writeCmds, { timeoutMs: 6500, context: "raffles.activeOnly.writeBack" });
  }

  if (completedByDeadlineIds.size > 0) {
    await Promise.allSettled([...completedByDeadlineIds].map((id) => {
      const raffle = byId.get(String(id));
      return raffle ? sendRaffleCompletedNotifications(id, raffle) : Promise.resolve();
    }));
  }
  if (batchWinnersById.size > 0) {
    await Promise.allSettled([...batchWinnersById.keys()].map((id) => {
      if (completedByDeadlineIds.has(String(id))) return Promise.resolve();
      const raffle = byId.get(String(id));
      return raffle ? sendRaffleWinnerNotifications(id, raffle, batchWinnersById.get(String(id))) : Promise.resolve();
    }));
  }
  if (rerolledIds.size > 0) {
    await Promise.allSettled([...rerolledIds].map((id) => {
      const raffle = byId.get(String(id));
      return raffle ? sendRaffleWinnerNotifications(id, raffle, rerollWinnersById.get(String(id)), { rerollOnly: true }) : Promise.resolve();
    }));
  }

  const [summary, recentCompleted] = await Promise.all([
    loadRafflesSummaryFromRedis().catch(() => null),
    loadRecentCompletedRafflesFromRedis(RAFFLE_RECENT_COMPLETED_LIMIT).catch(() => []),
  ]);
  const payload = buildRaffleActiveOnlyPayload(hydratedActive, admin, summary, recentCompleted);
  if (!admin && allowCache) {
    writeRafflePublicListCache(payload).catch(() => {});
  } else if (admin && allowCache) {
    writeRaffleAdminActiveListCache(payload).catch(() => {});
  }
  return payload;
}

function raffleHomeBonusRequested(req) {
  if (!req || !req.query) return false;
  const value = String(req.query.homeBonus || req.query.home_bonus || "").trim().toLowerCase();
  return value === "1" || value === "true" || value === "yes";
}

function sanitizeRaffleForHomeBonus(raffle) {
  if (!raffle || typeof raffle !== "object") return null;
  const groups = Array.isArray(raffle.groups)
    ? raffle.groups.slice(0, 10).map((group) => ({
        count: parseInt(String(group && group.count || "0"), 10) || 0,
        prize: String(group && group.prize || "").trim().slice(0, 240),
        title: String(group && group.title || "").trim().slice(0, 160),
      }))
    : [];
  return {
    id: String(raffle.id || "").trim(),
    title: String(raffle.title || "").trim().slice(0, 200),
    cardTitle: String(raffle.cardTitle || raffle.card_title || "").trim().slice(0, 120),
    cardSubtitle: String(raffle.cardSubtitle || raffle.card_subtitle || "").trim().slice(0, 160),
    prizeKind: String(raffle.prizeKind || raffle.prize_kind || "").trim().slice(0, 60),
    totalWinners: parseInt(String(raffle.totalWinners || "0"), 10) || 0,
    groups,
    endDate: String(raffle.endDate || "").trim(),
    createdAt: String(raffle.createdAt || "").trim(),
    status: String(raffle.status || "").trim(),
  };
}

function raffleAchievementsRequested(req) {
  if (!req || !req.query) return false;
  const mode = String(req.query.mode || req.query.view || "").trim().toLowerCase();
  const value = String(req.query.achievements || req.query.achievementStats || req.query.achievement_stats || "").trim().toLowerCase();
  return mode === "achievements" || value === "1" || value === "true" || value === "yes";
}

function setPublicSMaxAge(res, seconds) {
  if (!res || typeof res.setHeader !== "function") return;
  const ttl = Math.max(5, Number(seconds) || 30);
  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=" + ttl + ", stale-while-revalidate=" + ttl);
}

function sanitizeRaffleAchievementWinner(row) {
  if (!row || typeof row !== "object") return null;
  const compact = {
    userId: row.userId,
    accountId: row.accountId || row.account_id || row.dtId,
    dtId: row.dtId || row.accountId || row.account_id,
    memberId: row.memberId,
    p21Id: row.p21Id || row.poker21Id || row.pokerPlusId || row.pokerPlusUserId,
    poker21Id: row.poker21Id,
    pokerPlusId: row.pokerPlusId,
    pokerPlusUserId: row.pokerPlusUserId,
    telegramUsername: row.telegramUsername,
    telegram: row.telegram,
    telegramLogin: row.telegramLogin,
    pokerPlusNickname: row.pokerPlusNickname,
    poker21Nickname: row.poker21Nickname,
    ratingNick: row.ratingNick,
    nickname: row.nickname,
    nick: row.nick,
    name: row.name,
    prize: row.prize,
    groupIndex: row.groupIndex,
    winnerReadyState: row.winnerReadyState,
    winnerReadyExpired: row.winnerReadyExpired === true,
    winnerBurned: row.winnerBurned === true,
  };
  Object.keys(compact).forEach((key) => {
    if (compact[key] == null || compact[key] === "") delete compact[key];
  });
  return sanitizeRaffleRowForPublicViewer(compact);
}

function sanitizeRaffleForAchievements(raffle) {
  if (!raffle || typeof raffle !== "object") return null;
  const winners = Array.isArray(raffle.winners)
    ? raffle.winners.map(sanitizeRaffleAchievementWinner).filter(Boolean)
    : [];
  if (!winners.length) return null;
  const groups = Array.isArray(raffle.groups)
    ? raffle.groups.slice(0, 120).map((group) => ({
        prize: String(group && group.prize || "").trim().slice(0, 240),
      }))
    : [];
  return {
    id: String(raffle.id || "").trim(),
    title: String(raffle.title || "").trim().slice(0, 200),
    status: String(raffle.status || "").trim(),
    createdAt: String(raffle.createdAt || "").trim(),
    endDate: String(raffle.endDate || "").trim(),
    completedAt: String(raffle.completedAt || raffle.completed_at || "").trim(),
    drawnAt: String(raffle.drawnAt || "").trim(),
    groups,
    winners,
  };
}

async function readRaffleAchievementsCache() {
  try {
    const rows = await redisPipeline([["GET", RAFFLE_ACHIEVEMENTS_CACHE_KEY]]);
    const raw = rows && rows[0] ? rows[0].result : null;
    if (raw == null || raw === false) return null;
    const parsed = JSON.parse(String(raw));
    if (!parsed || parsed.ok !== true || !Array.isArray(parsed.raffles)) return null;
    return Object.assign({}, parsed, { cached: true });
  } catch (eCache) {
    return null;
  }
}

async function writeRaffleAchievementsCache(payload) {
  if (!payload || payload.ok !== true || !Array.isArray(payload.raffles)) return;
  try {
    await redisPipeline([[
      "SET",
      RAFFLE_ACHIEVEMENTS_CACHE_KEY,
      JSON.stringify(payload),
      "EX",
      String(RAFFLE_ACHIEVEMENTS_CACHE_TTL_SECONDS),
    ]]).catch(function () {});
  } catch (eCache) {}
}

async function loadRaffleAchievementsPayload(req) {
  const forceDemo = req && req.query && (req.query.demo === "1" || req.query.demo === "true");
  const forceFresh = req && req.query && (req.query.fresh === "1" || req.query.noCache === "1" || req.query.no_cache === "1");
  if (!forceDemo && !forceFresh) {
    const cached = await readRaffleAchievementsCache();
    if (cached) return cached;
  }

  const listRes = await redisPipeline([["LRANGE", RAFFLE_IDS_KEY, "0", "-1"]], {
    timeoutMs: 6500,
    context: "raffles.achievements.ids",
    allowLargeRedisRead: true,
  });
  const idsRaw = listRes && listRes[0] && Array.isArray(listRes[0].result) ? listRes[0].result : [];
  const ids = [...new Set(idsRaw.map((id) => String(id || "").trim()).filter(Boolean))];
  const rows = ids.length ? await redisPipeline(ids.map((id) => ["GET", RAFFLE_PREFIX + id]), {
    timeoutMs: 6500,
    context: "raffles.achievements.rows",
    allowLargeRedisRead: true,
  }) : [];
  const raffles = [];
  for (let i = 0; i < ids.length; i += 1) {
    const raw = rows && rows[i] && rows[i].result;
    if (!raw) continue;
    try {
      const row = sanitizeRaffleForAchievements(JSON.parse(String(raw)));
      if (row && row.id) raffles.push(row);
    } catch (eParse) {}
  }
  if (forceDemo && raffles.length === 0) {
    const demo = sanitizeRaffleForAchievements(getDemoRaffle());
    if (demo) raffles.push(demo);
  }
  raffles.sort((a, b) => {
    const ad = new Date(a.drawnAt || a.completedAt || a.endDate || a.createdAt || 0).getTime() || 0;
    const bd = new Date(b.drawnAt || b.completedAt || b.endDate || b.createdAt || 0).getTime() || 0;
    return bd - ad;
  });
  const payload = {
    ok: true,
    achievements: true,
    updatedAt: new Date().toISOString(),
    totalCount: raffles.length,
    raffles,
    isAdmin: false,
  };
  if (!forceDemo) await writeRaffleAchievementsCache(payload);
  return payload;
}

async function loadHomeBonusRafflesPayload(req) {
  const forceDemo = req && req.query && (req.query.demo === "1" || req.query.demo === "true");
  if (!forceDemo) {
    try {
      const cachedRes = await redisPipeline([["GET", RAFFLE_HOME_BONUS_CACHE_KEY]]);
      const cachedRaw = cachedRes && cachedRes[0] ? cachedRes[0].result : null;
      if (cachedRaw != null && cachedRaw !== false) {
        const parsed = JSON.parse(String(cachedRaw));
        if (parsed && parsed.ok === true && Array.isArray(parsed.activeRaffles)) {
          return Object.assign({}, parsed, { cached: true });
        }
      }
    } catch (eCache) {}
  }

  const idsRes = await redisPipeline([["LRANGE", RAFFLE_IDS_KEY, String(-RAFFLE_HOME_BONUS_RECENT_SCAN_LIMIT), "-1"]]);
  const idsRaw = idsRes && idsRes[0] && Array.isArray(idsRes[0].result) ? idsRes[0].result : [];
  const ids = [...new Set(idsRaw.slice().reverse().filter(Boolean))];
  const rows = ids.length ? await redisPipeline(ids.map((id) => ["GET", RAFFLE_PREFIX + String(id)])) : [];
  const now = Date.now();
  const activeRaffles = [];
  for (let i = 0; i < ids.length; i += 1) {
    const raw = rows && rows[i] && rows[i].result;
    if (!raw) continue;
    try {
      const raffle = JSON.parse(raw);
      if (!raffle || raffle.status !== "active") continue;
      const endMs = new Date(raffle.endDate).getTime();
      if (!Number.isFinite(endMs) || endMs <= now) continue;
      const row = sanitizeRaffleForHomeBonus(raffle);
      if (row && row.id) activeRaffles.push(row);
    } catch (eParse) {}
  }
  if (forceDemo && activeRaffles.length === 0) {
    const demo = sanitizeRaffleForHomeBonus(getDemoRaffle());
    if (demo) activeRaffles.push(demo);
  }
  activeRaffles.sort((a, b) => {
    const aEnd = new Date(a.endDate).getTime();
    const bEnd = new Date(b.endDate).getTime();
    return (aEnd || 0) - (bEnd || 0);
  });
  const payload = {
    ok: true,
    homeBonus: true,
    raffles: activeRaffles,
    activeRaffles,
    activeRaffle: activeRaffles[0] || null,
    isAdmin: false,
  };
  if (!forceDemo) {
    await redisPipeline([["SET", RAFFLE_HOME_BONUS_CACHE_KEY, JSON.stringify(payload), "EX", String(RAFFLE_HOME_BONUS_CACHE_TTL_SECONDS)]]).catch(function () {});
  }
  return payload;
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Cron-Secret");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  let body = {};
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  } catch (e) {}

  const cronAuth = req.headers["x-cron-secret"] || req.query.secret || (req.headers["authorization"] || "").replace(/^Bearer\s+/i, "");
  const actionParam = body.action || req.query.action || "";
  const isCronCreate = req.method === "POST" && actionParam === "create" && CRON_SECRET && cronAuth === CRON_SECRET;
  const isCronTick = req.method === "GET" && actionParam === "tick" && CRON_SECRET && cronAuth === CRON_SECRET;
  const isCronRequest = isCronCreate || isCronTick;

  const identity = isCronRequest ? null : resolveTelegramIdentity(req, body, BOT_TOKEN);
  const authCredentialPresent = !isCronRequest && hasAuthCredential(req, body);
  let myId = null;
  if (isCronRequest) {
    myId = "cron";
  } else if (identity) {
    myId = memberIdFromIdentity(identity);
  } else if (authCredentialPresent) {
    return res.status(401).json({
      ok: false,
      error: "Сессия входа не подтвердилась. Войдите в аккаунт ещё раз и повторите попытку.",
      code: "AUTH_INVALID",
    });
  } else {
    const gd = (
      req.query.guestDeviceId ||
      req.query.guest_device_id ||
      body.guestDeviceId ||
      body.guest_device_id ||
      ""
    ).trim();
    const gid = guestMemberIdFromDeviceId(gd);
    if (gid) myId = gid;
  }
  if (!isCronRequest && !myId) {
    return res.status(401).json({ ok: false, error: "Откройте в Telegram, войдите через сайт или откройте раздел как гость с этого устройства" });
  }
  const admin = isCronRequest || !!(identity && myId && isAdminIdentity(identity, myId));

  if (!redisConfigured()) {
    return res.status(500).json({ ok: false, error: "Сервер не настроен" });
  }
  if (!isCronRequest && identity && myId && !admin && await rejectBlockedAppUser(req, res, identity, myId)) return;

  if (req.method === "GET" && String(req.query.scope || req.query.mode || "").trim().toLowerCase() === "participants") {
    const raffleId = String(req.query.raffleId || req.query.raffle_id || req.query.id || "").trim().slice(0, 160);
    if (!raffleId) return res.status(400).json({ ok: false, error: "Не указан raffleId" });
    const raffle = await loadStoredRaffleById(raffleId);
    if (!raffle) return res.status(404).json({ ok: false, error: "Розыгрыш не найден" });
    const page = Math.max(1, parseInt(req.query.page || "1", 10) || 1);
    const limit = Math.max(10, Math.min(200, parseInt(req.query.limit || "100", 10) || 100));
    const payload = await loadRaffleParticipantsPage(raffle, page, limit, admin);
    return res.status(200).json({ ok: true, raffleId, ...payload });
  }

  if (req.method === "GET" && raffleHomeBonusRequested(req)) {
    try {
      res.setHeader("Cache-Control", "public, max-age=0, s-maxage=45, stale-while-revalidate=45");
    } catch (eHeader) {}
    const payload = await loadHomeBonusRafflesPayload(req);
    return res.status(200).json(payload);
  }

  if (req.method === "GET" && raffleAchievementsRequested(req)) {
    setPublicSMaxAge(res, RAFFLE_ACHIEVEMENTS_CACHE_TTL_SECONDS);
    const payload = await loadRaffleAchievementsPayload(req);
    return res.status(200).json(payload);
  }

  if (req.method === "GET" && /^archive-(?:index|month|week)$/.test(raffleArchiveScope(req))) {
    const payload = await loadRaffleArchiveScopePayload(req, admin);
    return res.status(payload && payload.ok ? 200 : 400).json(payload);
  }

  if (req.method === "GET" && raffleArchiveScope(req) === "completed-one") {
    const raffle = await loadCompletedRaffleByTarget(req.query.target || req.query.completedNumber || req.query.completed_number);
    if (!raffle || raffle.status === "active") {
      return res.status(404).json({ ok: false, error: "Завершённый розыгрыш не найден" });
    }
    return res.status(200).json({
      ok: true,
      raffle: sanitizeRaffleForViewer(raffle, admin),
      completedOne: true,
      isAdmin: admin,
    });
  }

  if (req.method === "GET" && raffleActiveScopeRequested(req)) {
    if (!admin && !bypassRafflePublicListCacheRequested(req)) {
      setPublicSMaxAge(res, RAFFLE_PUBLIC_LIST_CACHE_TTL_SECONDS);
    }
    const [payload, subscriptionGate, currentWeekIssueTotals] = await Promise.all([
      loadRaffleActiveOnlyPayload(admin, !bypassRafflePublicListCacheRequested(req)),
      getRaffleSubscriptionGateForViewer(identity, myId),
      admin ? loadCurrentWeekRaffleIssueTotals(new Date()).catch(() => null) : Promise.resolve(null),
    ]);
    return res.status(200).json({
      ok: true,
      ...payload,
      isAdmin: admin,
      subscriptionGate,
      currentWeekIssueTotals,
    });
  }

  // POST: создать розыгрыш (админ) или участвовать (join)
  if (req.method === "POST") {
    const action = body.action || req.query.action || "join";

    if (action === "create") {
      if (!admin) return res.status(403).json({ ok: false, error: "Только для админа" });
      const idemRaw = (body.createIdempotencyKey || body.idempotencyKey || "").trim().slice(0, 128);
      let idemRedisKey = null;
      if (idemRaw && myId) {
        idemRedisKey =
          RAFFLE_CREATE_IDEM_PREFIX + crypto.createHash("sha256").update(String(myId) + "\n" + idemRaw).digest("hex");
        const prevRes = await redisPipeline([["GET", idemRedisKey]]);
        const prevStr = prevRes && prevRes[0] && prevRes[0].result != null ? String(prevRes[0].result) : "";
        if (prevStr) {
          if (prevStr === "__pending__") {
            return res.status(409).json({
              ok: false,
              error: "Создание розыгрыша уже выполняется. Подождите несколько секунд.",
            });
          }
          try {
            const prev = JSON.parse(prevStr);
            if (prev && prev.raffle && prev.raffle.id) {
              return res.status(200).json({ ok: true, raffle: sanitizeRaffleForViewer(prev.raffle, admin), idempotentReplay: true });
            }
          } catch (e1) {}
        }
        const claimRes = await redisPipeline([["SET", idemRedisKey, "__pending__", "NX", "EX", "120"]]);
        const cr0 = claimRes && claimRes[0];
        const claimed =
          cr0 &&
          !cr0.error &&
          (cr0.result === "OK" || cr0.result === true || String(cr0.result).toUpperCase() === "OK");
        if (!claimed) {
          const againRes = await redisPipeline([["GET", idemRedisKey]]);
          const againStr = againRes && againRes[0] && againRes[0].result != null ? String(againRes[0].result) : "";
          if (againStr === "__pending__") {
            return res.status(409).json({
              ok: false,
              error: "Создание розыгрыша уже выполняется. Подождите несколько секунд.",
            });
          }
          try {
            const prev2 = JSON.parse(againStr);
            if (prev2 && prev2.raffle && prev2.raffle.id) {
              return res.status(200).json({ ok: true, raffle: sanitizeRaffleForViewer(prev2.raffle, admin), idempotentReplay: true });
            }
          } catch (e2) {}
          return res.status(409).json({ ok: false, error: "Повторите создание через минуту или обновите страницу." });
        }
      }

      async function rejectCreate(status, payload) {
        if (idemRedisKey) {
          try {
            await redisPipeline([["DEL", idemRedisKey]]);
          } catch (eDelIdem) {}
        }
        return res.status(status).json(payload);
      }

      let totalWinners = Math.max(1, Math.min(100, parseInt(body.totalWinners || body.total_winners || "1", 10) || 1));
      const titleRaw = (body.title || body.name || "").trim().slice(0, 200);
      let groups = normalizeRaffleGroups(body.groups, totalWinners);
      const prizeKind = normalizeRafflePrizeKind(body.prizeKind || body.prize_kind || body.rafflePrizeKind || body.raffle_prize_kind || body.type) ||
        inferRafflePrizeKind({ title: titleRaw, groups });
      const prizeAction = normalizeRafflePrizeAction(body.prizeAction || body.prize_action || body.fulfillment || body.rewardType || body.reward_type);
      const endDateStr = (body.endDate || body.end_date || "").trim();
      const endDate = endDateStr ? new Date(endDateStr) : null;
      if (!endDate || isNaN(endDate.getTime())) {
        return rejectCreate(400, { ok: false, error: "Укажите дату завершения (endDate)" });
      }
      if (endDate <= new Date()) {
        return rejectCreate(400, { ok: false, error: "Время итогов должно быть в будущем" });
      }
      const dailyEnabled = boolFromBody(body.daily || body.isDaily || body.dailyEnabled || body.recurringDaily);
      const dailyStartTime = dailyEnabled ? normalizeDailyStartTime(body.dailyStartTime || body.daily_start_time || body.startTime || body.start_time) : "";
      if (dailyEnabled && !dailyStartTime) {
        return rejectCreate(400, { ok: false, error: "Укажите корректное время ежедневного старта (dailyStartTime)" });
      }
      if (dailyEnabled && prizeKind !== "cash") {
        return rejectCreate(400, { ok: false, error: "Ежедневный розыгрыш сейчас доступен только на кеш." });
      }
      const rawAccessLevel =
        body.accessLevel != null
          ? body.accessLevel
          : body.access_level != null
            ? body.access_level
            : body.minAccessLevel != null
              ? body.minAccessLevel
              : body.requiredLevel;
      let accessLevel = normalizeRaffleAccessLevel(rawAccessLevel);
      if (dailyEnabled && prizeKind === "cash") {
        accessLevel = DAILY_CASH_DEFAULT_SERIES.accessLevel;
        totalWinners = DAILY_CASH_TOTAL_WINNERS;
        groups = dailyCashGroups(DAILY_CASH_DEFAULT_SERIES);
      }
      let raffle = buildStoredRaffle(myId, titleRaw, totalWinners, groups, endDate.toISOString());
      raffle.prizeKind = prizeKind;
      if (prizeAction) raffle.prizeAction = prizeAction;
      applyRaffleAccessLevel(raffle, accessLevel);
      const drawMode = String(body.drawMode || body.draw_mode || "").trim().toLowerCase();
      if (drawMode === "weighted_tickets" || drawMode === "ticket_pool" || drawMode === "tickets_weighted") {
        raffle.drawMode = "weighted_tickets";
        raffle.weightedTickets = true;
      }
      const ticketEntryMode = String(body.ticketEntryMode || body.ticket_entry_mode || "").trim().toLowerCase();
      if (ticketEntryMode) raffle.ticketEntryMode = ticketEntryMode.slice(0, 40);
      const promoGuarantee = sanitizeRaffleManualText(body.promoGuarantee || body.promo_guarantee || body.guarantee || "", 80);
      if (promoGuarantee) raffle.promoGuarantee = promoGuarantee;
      const promoTournamentName = sanitizeRaffleManualText(body.promoTournamentName || body.promo_tournament_name || "", 80);
      if (promoTournamentName) raffle.promoTournamentName = promoTournamentName;
      const cardTitle = sanitizeRaffleManualText(body.cardTitle || body.card_title || "", 80);
      if (cardTitle) raffle.cardTitle = cardTitle;
      const cardSubtitle = sanitizeRaffleManualText(body.cardSubtitle || body.card_subtitle || "", 100);
      if (cardSubtitle) raffle.cardSubtitle = cardSubtitle;
      const cardTheme = sanitizeRaffleManualText(body.cardTheme || body.card_theme || "", 40).toLowerCase();
      if (cardTheme) raffle.cardTheme = cardTheme;
      if (dailyEnabled) {
        raffle = attachDailyRecurrence(raffle, {
          startTime: dailyStartTime,
          title: titleRaw,
          totalWinners,
          groups,
          prizeKind,
          accessLevel,
        });
      }
      const created = await persistCreatedRaffle(raffle, idemRedisKey);
      if (!created || !created.ok) {
        return res.status(500).json({ ok: false, error: (created && created.error) || "Ошибка создания" });
      }
      return res.status(200).json({ ok: true, raffle: sanitizeRaffleForViewer(created.raffle, admin) });
    }

    if (action === "duplicateOptions") {
      if (!admin) return res.status(403).json({ ok: false, error: "Только для админа" });
      const recent = await loadRecentStoredRaffles(3);
      return res.status(200).json({ ok: true, raffles: recent.map(duplicateCandidatePayload) });
    }

    if (action === "duplicateLast") {
      if (!admin) return res.status(403).json({ ok: false, error: "Только для админа" });
      const idemRaw = (body.createIdempotencyKey || body.idempotencyKey || "").trim().slice(0, 128);
      let idemRedisKey = null;
      if (idemRaw && myId) {
        idemRedisKey =
          RAFFLE_CREATE_IDEM_PREFIX + crypto.createHash("sha256").update(String(myId) + "\n" + idemRaw).digest("hex");
        const prevRes = await redisPipeline([["GET", idemRedisKey]]);
        const prevStr = prevRes && prevRes[0] && prevRes[0].result != null ? String(prevRes[0].result) : "";
        if (prevStr) {
          if (prevStr === "__pending__") {
            return res.status(409).json({ ok: false, error: "Повтор уже выполняется. Подождите несколько секунд." });
          }
          try {
            const prev = JSON.parse(prevStr);
            if (prev && prev.raffle && prev.raffle.id) {
              return res.status(200).json({ ok: true, raffle: sanitizeRaffleForViewer(prev.raffle, admin), idempotentReplay: true });
            }
          } catch (ePrev) {}
        }
        const claimRes = await redisPipeline([["SET", idemRedisKey, "__pending__", "NX", "EX", "120"]]);
        const cr0 = claimRes && claimRes[0];
        const claimed =
          cr0 &&
          !cr0.error &&
          (cr0.result === "OK" || cr0.result === true || String(cr0.result).toUpperCase() === "OK");
        if (!claimed) {
          return res.status(409).json({ ok: false, error: "Повтор уже выполняется. Подождите несколько секунд." });
        }
      }

      const sourceRaffleId = (body.sourceRaffleId || body.source_raffle_id || body.raffleId || body.raffle_id || "").trim();
      const sourceRaffle = sourceRaffleId ? await loadStoredRaffleById(sourceRaffleId) : await loadLastStoredRaffle();
      if (!sourceRaffle) {
        if (idemRedisKey) await redisPipeline([["DEL", idemRedisKey]]);
        return res.status(404).json({ ok: false, error: "Нет розыгрыша для повтора" });
      }
      const raffle = buildDuplicateFromSource(myId, sourceRaffle);
      const created = await persistCreatedRaffle(raffle, idemRedisKey);
      if (!created || !created.ok) {
        return res.status(500).json({ ok: false, error: (created && created.error) || "Ошибка создания" });
      }
      return res.status(200).json({ ok: true, raffle: sanitizeRaffleForViewer(created.raffle, admin) });
    }

    if (action === "adminUpsertParticipant") {
      if (!admin) return res.status(403).json({ ok: false, error: "Только для админа" });
      const raffleId = (body.raffleId || body.raffle_id || "").trim();
      if (!raffleId) return res.status(400).json({ ok: false, error: "Укажите raffleId" });

      const getRes = await redisPipeline([["GET", RAFFLE_PREFIX + raffleId]]);
      const raw = getRes && getRes[0] && getRes[0].result;
      if (!raw) return res.status(404).json({ ok: false, error: "Розыгрыш не найден" });
      let raffle;
      try {
        raffle = JSON.parse(raw);
      } catch (e) {
        return res.status(500).json({ ok: false, error: "Ошибка данных" });
      }
      if (raffle.status !== "active") {
        return res.status(400).json({ ok: false, error: "Участников можно менять только в активном розыгрыше" });
      }
      if (new Date(raffle.endDate) <= new Date()) {
        return res.status(400).json({ ok: false, error: "Приём заявок завершён" });
      }

      const p21Id = normalizeManualRaffleP21Id(body.p21Id || body.p21_id || body.playerId || body.player_id || "");
      const telegramUsername = normalizeTelegramLoginForPrivacy(body.telegramUsername || body.telegram_username || body.telegram || "");
      const name = sanitizeRaffleManualText(body.name || body.playerName || body.player_name || "", 120);
      const ticketCount = normalizeManualRaffleTicketCount(body.ticketCount || body.ticket_count || body.tickets || body.entryTicketCount);
      if (!p21Id && !telegramUsername && !name) {
        return res.status(400).json({ ok: false, error: "Укажите ID, имя или Telegram участника" });
      }

      const linkedProfile = p21Id ? await resolveAdminRaffleParticipantProfileByP21(p21Id) : {};
      const linkedTelegramUsername = telegramUsername || linkedProfile.telegramUsername || "";
      const linkedName = name || linkedProfile.pokerPlusNickname || linkedProfile.displayName || "";
      const participantTarget = {
        userId: linkedProfile.userId || "",
        accountId: linkedProfile.accountId || "",
        p21Id,
        telegramUsername: linkedTelegramUsername,
        name: linkedName,
      };
      if (!Array.isArray(raffle.participants)) raffle.participants = [];
      const existingIndex = raffle.participants.findIndex((row) => (
        raffleParticipantMatchesAdminTarget(row, participantTarget) ||
        manualRaffleParticipantMatch(row, p21Id, linkedTelegramUsername, name || linkedName)
      ));
      const nowIso = new Date().toISOString();
      const seed = p21Id || linkedTelegramUsername || linkedName || String(Date.now());
      const previous = existingIndex >= 0 ? raffle.participants[existingIndex] : null;
      const previousTicketCount = previous ? normalizeManualRaffleTicketCount(previous.ticketCount || previous.entryTicketCount || previous.tickets || previous.raffleTickets) : 0;
      const nextTicketCount = previous ? Math.max(1, Math.min(1000, previousTicketCount + ticketCount)) : ticketCount;
      const participantName = name ||
        linkedProfile.pokerPlusNickname ||
        linkedProfile.displayName ||
        (previous && previous.name) ||
        (linkedTelegramUsername ? "@" + linkedTelegramUsername : "Участник");
      const participant = {
        ...(previous || {}),
        userId: linkedProfile.userId || (previous && previous.userId) || manualRaffleParticipantUserId(seed),
        name: participantName,
        p21Id: p21Id || (previous && previous.p21Id) || "",
        ticketCount: nextTicketCount,
        entryTicketCount: nextTicketCount,
        manualRaffleParticipant: true,
        manualTicketsUpdatedBy: myId,
        manualTicketsUpdatedAt: nowIso,
        manualTicketsLastAdded: ticketCount,
      };
      if (!participant.joinedAt) participant.joinedAt = participant.manualTicketsAddedAt || nowIso;
      if (linkedProfile.accountId) participant.accountId = linkedProfile.accountId;
      else if (previous && previous.accountId) participant.accountId = previous.accountId;
      if (linkedProfile.pokerPlusNickname) participant.pokerPlusNickname = linkedProfile.pokerPlusNickname;
      if (linkedProfile.pokerPlusStatusLevel != null) participant.pokerPlusStatusLevel = linkedProfile.pokerPlusStatusLevel;
      if (linkedTelegramUsername) participant.telegramUsername = linkedTelegramUsername;
      else if (!participant.telegramUsername) delete participant.telegramUsername;
      if (!participant.manualTicketsAddedAt) participant.manualTicketsAddedAt = nowIso;
      if (existingIndex >= 0) raffle.participants[existingIndex] = participant;
      else raffle.participants.push(participant);
      raffle.drawMode = "weighted_tickets";
      raffle.ticketEntryMode = "admin";
      raffle.weightedTickets = true;

      const hydratedManual = await hydrateRaffleParticipantNamesFromRedis(raffle);
      raffle = hydratedManual.raffle;
      const setRes = await redisPipeline([
        ["SET", RAFFLE_PREFIX + raffleId, JSON.stringify(raffle)],
        ["SADD", RAFFLE_ACTIVE_IDS_KEY, raffleId],
        ["DEL", RAFFLE_PUBLIC_LIST_CACHE_KEY, RAFFLE_SUMMARY_CACHE_KEY, RAFFLE_ARCHIVE_INDEX_CACHE_KEY],
      ]);
      if (!setRes || setRes[0].error) {
        return res.status(500).json({ ok: false, error: "Ошибка записи" });
      }
      const notifiedParticipant = raffle.participants.find((row) => raffleParticipantMatchesAdminTarget(row, {
        userId: participant.userId,
        accountId: participant.accountId,
        p21Id: participant.p21Id,
        telegramUsername: participant.telegramUsername,
        name: participant.name,
      })) || participant;
      await notifyAdminRaffleTicketsAddedToParticipant(raffle, notifiedParticipant, ticketCount);
      return res.status(200).json({
        ok: true,
        raffle: sanitizeRaffleForViewer(raffle, admin),
        participant: sanitizeRaffleRowForPublicViewer(participant),
        updated: existingIndex >= 0,
      });
    }

    if (action === "adminRemoveParticipant") {
      if (!admin) return res.status(403).json({ ok: false, error: "Только для админа" });
      const raffleId = (body.raffleId || body.raffle_id || "").trim();
      if (!raffleId) return res.status(400).json({ ok: false, error: "Укажите raffleId" });

      const getRes = await redisPipeline([["GET", RAFFLE_PREFIX + raffleId]]);
      const raw = getRes && getRes[0] && getRes[0].result;
      if (!raw) return res.status(404).json({ ok: false, error: "Розыгрыш не найден" });
      let raffle;
      try {
        raffle = JSON.parse(raw);
      } catch (e) {
        return res.status(500).json({ ok: false, error: "Ошибка данных" });
      }
      if (raffle.status !== "active") {
        return res.status(400).json({ ok: false, error: "Участников можно менять только в активном розыгрыше" });
      }
      if (new Date(raffle.endDate) <= new Date()) {
        return res.status(400).json({ ok: false, error: "Приём заявок завершён" });
      }

      const target = normalizeAdminRaffleParticipantTarget(body);
      if (!target.userId && !target.accountId && !target.p21Id && !target.telegramUsername && !target.name) {
        return res.status(400).json({ ok: false, error: "Укажите участника для удаления" });
      }
      const strongTarget = adminRaffleParticipantTargetHasStrongIdentity(target);
      if (!strongTarget && (!target.name || target.name === "Участник")) {
        return res.status(400).json({ ok: false, error: "Не удалось точно определить участника для удаления" });
      }

      if (!Array.isArray(raffle.participants)) raffle.participants = [];
      const matches = [];
      raffle.participants.forEach((row, index) => {
        if (raffleParticipantMatchesAdminTarget(row, target)) matches.push({ row, index });
      });
      if (!matches.length) {
        return res.status(200).json({
          ok: true,
          raffle: sanitizeRaffleForViewer(raffle, admin),
          alreadyRemoved: true,
        });
      }
      if (!strongTarget && matches.length > 1) {
        return res.status(409).json({
          ok: false,
          error: "Найдено несколько участников с такими данными. Уточните Poker21 ID или Telegram.",
        });
      }
      if (matches.length === raffle.participants.length && matches.length > 1) {
        return res.status(409).json({
          ok: false,
          error: "Удаление отменено: выбранный признак совпал со всем списком участников.",
        });
      }

      const removeIndexes = new Set(matches.map((item) => item.index));
      const removed = [];
      const beforeParticipants = raffle.participants.slice();
      raffle.participants = raffle.participants.filter((row, index) => {
        if (!removeIndexes.has(index)) return true;
        removed.push(row);
        return false;
      });

      const auditKey =
        RAFFLE_REMOVE_AUDIT_PREFIX +
        raffleId +
        ":" +
        Date.now().toString(36) +
        ":" +
        crypto.randomBytes(3).toString("hex");
      const writeCmds = [
        ["SET", RAFFLE_PREFIX + raffleId, JSON.stringify(raffle)],
        ["DEL", RAFFLE_PUBLIC_LIST_CACHE_KEY, RAFFLE_SUMMARY_CACHE_KEY, RAFFLE_ARCHIVE_INDEX_CACHE_KEY],
        ["SETEX", auditKey, String(RAFFLE_REMOVE_AUDIT_TTL_SECONDS), JSON.stringify({
          raffleId,
          at: new Date().toISOString(),
          adminId: myId,
          target,
          removed,
          beforeParticipants,
          afterParticipants: raffle.participants,
        })],
      ];
      const ipsKey = RAFFLE_IPS_PREFIX + raffleId;
      const devicesKey = RAFFLE_DEVICES_PREFIX + raffleId;
      removed.forEach((row) => {
        if (row && row.ip) writeCmds.push(["HDEL", ipsKey, row.ip]);
        if (row && row.deviceId) writeCmds.push(["HDEL", devicesKey, row.deviceId]);
      });
      const setRes = await redisPipeline(writeCmds);
      if (!setRes || setRes[0].error) {
        return res.status(500).json({ ok: false, error: "Ошибка записи" });
      }
      return res.status(200).json({
        ok: true,
        raffle: sanitizeRaffleForViewer(raffle, admin),
        removedCount: removed.length,
        removedParticipant: sanitizeRaffleRowForPublicViewer(removed[0]),
      });
    }

    if (action === "complete") {
      if (!admin) return res.status(403).json({ ok: false, error: "Только для админа" });
      const raffleId = (body.raffleId || body.raffle_id || "").trim();
      if (!raffleId) return res.status(400).json({ ok: false, error: "Укажите raffleId" });

      const getRes = await redisPipeline([["GET", RAFFLE_PREFIX + raffleId]]);
      const raw = getRes && getRes[0] && getRes[0].result;
      if (!raw) return res.status(404).json({ ok: false, error: "Розыгрыш не найден" });
      let raffle;
      try {
        raffle = JSON.parse(raw);
      } catch (e) {
        return res.status(500).json({ ok: false, error: "Ошибка данных" });
      }
      if (raffle.status !== "active") {
        return res.status(400).json({ ok: false, error: "Розыгрыш уже завершён или отменён" });
      }
      const completeClaimed = await claimRaffleCompletion(raffleId);
      if (!completeClaimed) {
        const latestRes = await redisPipeline([["GET", RAFFLE_PREFIX + raffleId]]);
        const latestRaw = latestRes && latestRes[0] && latestRes[0].result;
        if (latestRaw) {
          try {
            const latest = JSON.parse(latestRaw);
            if (latest && latest.status === "drawn") {
              updateRaffleActiveIndex(raffleId, false).catch(() => {});
              return res.status(200).json({ ok: true, raffle: sanitizeRaffleForViewer(latest, admin), alreadyCompleted: true });
            }
          } catch (eLatestComplete) {}
        }
        return res.status(409).json({ ok: false, error: "Розыгрыш уже завершается. Обновите через пару секунд." });
      }
      raffle = (await loadStoredRaffleById(raffleId)) || raffle;
      if (raffle.status !== "active") {
        updateRaffleActiveIndex(raffleId, false).catch(() => {});
        return res.status(200).json({ ok: true, raffle: sanitizeRaffleForViewer(raffle, admin), alreadyCompleted: true });
      }
      const hydratedBeforeDraw = await hydrateRaffleParticipantNamesFromRedis(raffle);
      raffle = runDraw(hydratedBeforeDraw.raffle);
      initializeRaffleReadyWindows(raffle);
      await assignNextCompletedNumber(raffle);
      const setRes = await redisPipeline([
        ["SET", RAFFLE_PREFIX + raffleId, JSON.stringify(raffle)],
        ["SREM", RAFFLE_ACTIVE_IDS_KEY, raffleId],
        ["DEL", RAFFLE_PUBLIC_LIST_CACHE_KEY, RAFFLE_SUMMARY_CACHE_KEY, RAFFLE_ARCHIVE_INDEX_CACHE_KEY],
      ]);
      if (!setRes || setRes[0].error) {
        return res.status(500).json({ ok: false, error: "Ошибка записи" });
      }
      await sendRaffleCompletedNotifications(raffleId, raffle);
      return res.status(200).json({ ok: true, raffle: sanitizeRaffleForViewer(raffle, admin) });
    }

    if (action === "cancel") {
      if (!admin) return res.status(403).json({ ok: false, error: "Только для админа" });
      const raffleId = (body.raffleId || body.raffle_id || "").trim();
      if (!raffleId) return res.status(400).json({ ok: false, error: "Укажите raffleId" });

      const getRes = await redisPipeline([["GET", RAFFLE_PREFIX + raffleId]]);
      const raw = getRes && getRes[0] && getRes[0].result;
      if (!raw) return res.status(404).json({ ok: false, error: "Розыгрыш не найден" });
      let raffle;
      try {
        raffle = JSON.parse(raw);
      } catch (e) {
        return res.status(500).json({ ok: false, error: "Ошибка данных" });
      }
      if (raffle.status !== "active") {
        return res.status(400).json({ ok: false, error: "Можно отменить только активный розыгрыш" });
      }
      raffle.status = "cancelled";
      raffle.cancelledAt = new Date().toISOString();
      const setRes = await redisPipeline([
        ["SET", RAFFLE_PREFIX + raffleId, JSON.stringify(raffle)],
        ["SREM", RAFFLE_ACTIVE_IDS_KEY, raffleId],
        ["DEL", RAFFLE_PUBLIC_LIST_CACHE_KEY, RAFFLE_SUMMARY_CACHE_KEY, RAFFLE_ARCHIVE_INDEX_CACHE_KEY],
      ]);
      if (!setRes || setRes[0].error) {
        return res.status(500).json({ ok: false, error: "Ошибка записи" });
      }
      return res.status(200).json({ ok: true, raffle: sanitizeRaffleForViewer(raffle, admin) });
    }

    if (action === "updateEndDate") {
      if (!admin) return res.status(403).json({ ok: false, error: "Только для админа" });
      const raffleId = (body.raffleId || body.raffle_id || "").trim();
      if (!raffleId) return res.status(400).json({ ok: false, error: "Укажите raffleId" });
      const endDateStr = (body.endDate || body.end_date || "").trim();
      const endDate = endDateStr ? new Date(endDateStr) : null;
      if (!endDate || isNaN(endDate.getTime())) {
        return res.status(400).json({ ok: false, error: "Укажите корректную дату (endDate)" });
      }

      const getRes = await redisPipeline([["GET", RAFFLE_PREFIX + raffleId]]);
      const raw = getRes && getRes[0] && getRes[0].result;
      if (!raw) return res.status(404).json({ ok: false, error: "Розыгрыш не найден" });
      let raffle;
      try {
        raffle = JSON.parse(raw);
      } catch (e) {
        return res.status(500).json({ ok: false, error: "Ошибка данных" });
      }
      if (raffle.status !== "active") {
        return res.status(400).json({ ok: false, error: "Можно менять время только у активного розыгрыша" });
      }
      // Не даём поставить время в прошлом — иначе розыгрыш сразу завершится при следующей загрузке.
      if (endDate <= new Date()) {
        return res.status(400).json({ ok: false, error: "Время итогов должно быть в будущем" });
      }
      raffle.endDate = endDate.toISOString();
      const setRes = await redisPipeline([
        ["SET", RAFFLE_PREFIX + raffleId, JSON.stringify(raffle)],
        ["SADD", RAFFLE_ACTIVE_IDS_KEY, raffleId],
        ["DEL", RAFFLE_PUBLIC_LIST_CACHE_KEY, RAFFLE_SUMMARY_CACHE_KEY, RAFFLE_ARCHIVE_INDEX_CACHE_KEY],
      ]);
      if (!setRes || setRes[0].error) {
        return res.status(500).json({ ok: false, error: "Ошибка записи" });
      }
      return res.status(200).json({ ok: true, raffle: sanitizeRaffleForViewer(raffle, admin) });
    }

    if (action === "addPrizeGroups") {
      if (!admin) return res.status(403).json({ ok: false, error: "Только для админа" });
      const raffleId = (body.raffleId || body.raffle_id || "").trim();
      if (!raffleId) return res.status(400).json({ ok: false, error: "Укажите raffleId" });

      const getRes = await redisPipeline([["GET", RAFFLE_PREFIX + raffleId]]);
      const raw = getRes && getRes[0] && getRes[0].result;
      if (!raw) return res.status(404).json({ ok: false, error: "Розыгрыш не найден" });
      let raffle;
      try {
        raffle = JSON.parse(raw);
      } catch (e) {
        return res.status(500).json({ ok: false, error: "Ошибка данных" });
      }
      if (raffle.status !== "active") {
        return res.status(400).json({ ok: false, error: "Призы можно добавлять только в активный розыгрыш" });
      }
      const endDate = raffle.endDate ? new Date(raffle.endDate) : null;
      if (!endDate || isNaN(endDate.getTime()) || endDate <= new Date()) {
        return res.status(400).json({ ok: false, error: "Итоги уже наступили. Сначала перенесите время итогов." });
      }

      const currentGroups = Array.isArray(raffle.groups) ? raffle.groups : [];
      const groupIndexRaw = body.targetGroupIndex != null
        ? body.targetGroupIndex
        : body.target_group_index != null
          ? body.target_group_index
          : body.groupIndex != null
            ? body.groupIndex
            : body.group_index;
      const hasTargetGroup = groupIndexRaw !== undefined && groupIndexRaw !== null && String(groupIndexRaw).trim() !== "";
      let addedGroups = [];
      let updatedGroupIndex = -1;
      let nextGroups = currentGroups.slice();
      if (hasTargetGroup) {
        const groupIndex = parseInt(String(groupIndexRaw), 10);
        const addCount = Math.max(0, Math.min(100, parseInt(body.count || body.winners || body.totalWinners || body.total_winners, 10) || 0));
        if (!Number.isInteger(groupIndex) || groupIndex < 0 || groupIndex >= currentGroups.length) {
          return res.status(400).json({ ok: false, error: "Выберите существующую группу призов" });
        }
        if (addCount <= 0) {
          return res.status(400).json({ ok: false, error: "Укажите количество призовых мест" });
        }
        const currentGroup = currentGroups[groupIndex] || {};
        const currentCount = Math.max(0, Math.min(100, parseInt(currentGroup.count, 10) || 0));
        const nextCount = currentCount + addCount;
        nextGroups[groupIndex] = Object.assign({}, currentGroup, { count: nextCount });
        addedGroups = [{ count: addCount, prize: sanitizeRaffleManualText(currentGroup.prize || "", 200), targetGroupIndex: groupIndex }];
        updatedGroupIndex = groupIndex;
      } else {
        const requestedGroups = Array.isArray(body.groups)
          ? body.groups
          : [{ count: body.count || body.winners || body.totalWinners || body.total_winners, prize: body.prize || body.title }];
        addedGroups = sanitizeRaffleGroupsToAppend(requestedGroups);
        if (!addedGroups.length) {
          return res.status(400).json({ ok: false, error: "Укажите количество победителей и приз" });
        }
        nextGroups = currentGroups.concat(addedGroups);
      }
      const nextTotalWinners = raffleGroupsTotalWinners(nextGroups);
      if (nextTotalWinners < 1) {
        return res.status(400).json({ ok: false, error: "В розыгрыше должен быть хотя бы один приз" });
      }
      if (nextTotalWinners > 100) {
        return res.status(400).json({ ok: false, error: "Максимум 100 призовых мест в одном розыгрыше" });
      }

      raffle.groups = nextGroups;
      raffle.totalWinners = nextTotalWinners;
      raffle.prizeKind = normalizeRafflePrizeKind(raffle.prizeKind || raffle.prize_kind) || inferRafflePrizeKind(raffle);
      raffle.prizesUpdatedAt = new Date().toISOString();
      raffle.prizesUpdatedBy = myId;

      const setRes = await redisPipeline([
        ["SET", RAFFLE_PREFIX + raffleId, JSON.stringify(raffle)],
        ["DEL", RAFFLE_PUBLIC_LIST_CACHE_KEY, RAFFLE_SUMMARY_CACHE_KEY, RAFFLE_ARCHIVE_INDEX_CACHE_KEY],
      ]);
      if (!setRes || setRes[0].error) {
        return res.status(500).json({ ok: false, error: "Ошибка записи" });
      }
      return res.status(200).json({
        ok: true,
        raffle: sanitizeRaffleForViewer(raffle, admin),
        addedGroups,
        updatedGroupIndex,
      });
    }

    if (action === "setWinnerStatus") {
      if (!admin) return res.status(403).json({ ok: false, error: "Только для админа" });
      const raffleId = (body.raffleId || body.raffle_id || "").trim();
      const winnerUserId = (body.winnerUserId || body.winner_user_id || "").trim();
      const winnerSlotId = (body.winnerSlotId || body.winner_slot_id || body.winnerReadySlotId || body.winner_ready_slot_id || "").trim();
      const status = body.status;
      if (!raffleId) return res.status(400).json({ ok: false, error: "Укажите raffleId" });
      if (!winnerUserId && !winnerSlotId) return res.status(400).json({ ok: false, error: "Укажите winnerUserId или winnerSlotId" });
      const validStatus = status === "ok" || status === "fail" ? status : null;

      const statusToken = await claimRaffleReadySettlementWithRetry(raffleId);
      if (!statusToken) {
        return res.status(409).json({ ok: false, error: "Розыгрыш обновляется. Повторите через пару секунд." });
      }
      let raffle;
      let winner;
      let responseStatus = 200;
      let responsePayload = null;
      try {
        const getRes = await redisPipeline([["GET", RAFFLE_PREFIX + raffleId]]);
        const raw = getRes && getRes[0] && getRes[0].result;
        if (!raw) {
          responseStatus = 404;
          responsePayload = { ok: false, error: "Розыгрыш не найден" };
        } else {
          try {
            raffle = JSON.parse(raw);
          } catch (e) {
            responseStatus = 500;
            responsePayload = { ok: false, error: "Ошибка данных" };
          }
        }
        if (!responsePayload) {
          if (!raffle.winners || !raffle.winners.length) {
            responseStatus = 400;
            responsePayload = { ok: false, error: "Розыгрыш не завершён или нет победителей" };
          } else {
            const slotIdsChanged = ensureRaffleWinnerReadySlotIds(raffle);
            winner = findRaffleWinnerByRequest(raffle.winners, winnerUserId, winnerSlotId);
            if (!winner) {
              responseStatus = 404;
              responsePayload = { ok: false, error: "Победитель не найден" };
            } else {
              winner.winnerStatus = validStatus;
              winner.winnerStatusAt = new Date().toISOString();
              winner.winnerStatusBy = myId;
              const setRes = await redisPipeline([
                ["SET", RAFFLE_PREFIX + raffleId, JSON.stringify(raffle)],
                ["DEL", RAFFLE_PUBLIC_LIST_CACHE_KEY, RAFFLE_SUMMARY_CACHE_KEY, RAFFLE_ARCHIVE_INDEX_CACHE_KEY],
              ]);
              if (!setRes || setRes[0].error) {
                responseStatus = 500;
                responsePayload = { ok: false, error: "Ошибка записи" };
              } else {
                responsePayload = { ok: true, raffle: sanitizeRaffleForViewer(raffle, admin) };
              }
            }
            if (!winner && slotIdsChanged) {
              await redisPipeline([
                ["SET", RAFFLE_PREFIX + raffleId, JSON.stringify(raffle)],
                ["DEL", RAFFLE_PUBLIC_LIST_CACHE_KEY, RAFFLE_SUMMARY_CACHE_KEY, RAFFLE_ARCHIVE_INDEX_CACHE_KEY],
              ]).catch(() => {});
            }
          }
        }
      } finally {
        await releaseRaffleReadySettlement(raffleId, statusToken);
      }
      if (
        responseStatus === 200 &&
        responsePayload &&
        responsePayload.ok &&
        validStatus === "ok" &&
        raffleWinnerCanReceivePrizeIssuedNotification(winner)
      ) {
        // Await delivery before the serverless request finishes. The idempotency
        // key prevents duplicates, while a repeated "ok" can retry a previous
        // failed delivery because failed sends remove their key.
        await notifyRafflePrizeIssued(raffleId, raffle, winner);
      }
      return res.status(responseStatus).json(responsePayload || { ok: false, error: "Ошибка обработки" });
    }

    if (action === "remindWinnerReady") {
      if (!admin) return res.status(403).json({ ok: false, error: "Только для админа" });
      const raffleId = String(body.raffleId || body.raffle_id || "").trim();
      const winnerUserId = String(body.winnerUserId || body.winner_user_id || "").trim();
      const winnerSlotId = String(body.winnerSlotId || body.winner_slot_id || body.winnerReadySlotId || body.winner_ready_slot_id || "").trim();
      if (!raffleId) return res.status(400).json({ ok: false, error: "Укажите raffleId" });
      if (!winnerUserId && !winnerSlotId) return res.status(400).json({ ok: false, error: "Укажите победителя" });
      const reminderToken = await claimRaffleReadySettlementWithRetry(raffleId);
      if (!reminderToken) return res.status(409).json({ ok: false, error: "Розыгрыш обновляется. Повторите через пару секунд." });
      try {
        const getRes = await redisPipeline([["GET", RAFFLE_PREFIX + raffleId]]);
        const raw = getRes && getRes[0] && getRes[0].result;
        if (!raw) return res.status(404).json({ ok: false, error: "Розыгрыш не найден" });
        let raffle;
        try {
          raffle = JSON.parse(raw);
        } catch (e) {
          return res.status(500).json({ ok: false, error: "Ошибка данных" });
        }
        ensureRaffleWinnerReadySlotIds(raffle);
        const winner = findRaffleWinnerByRequest(raffle.winners || [], winnerUserId, winnerSlotId);
        if (!winner) return res.status(404).json({ ok: false, error: "Победитель не найден" });
        if (winner.winnerReadyReminderSentAt) {
          return res.status(200).json({
            ok: true,
            alreadySent: true,
            sentAt: winner.winnerReadyReminderSentAt,
            raffle: sanitizeRaffleForViewer(raffle, admin),
          });
        }
        if (raffleWinnerIsReady(winner)) return res.status(409).json({ ok: false, error: "Победитель уже нажал «Я готов»" });
        const readyState = String(winner.winnerReadyState || "").trim().toLowerCase();
        if (winner.winnerReadyExpired === true || winner.winnerBurned === true || readyState === "missed" || readyState === "burned") {
          return res.status(409).json({ ok: false, error: "Время подтверждения уже истекло" });
        }
        const now = new Date();
        const deadlineMs = raffleDateMs(winner.winnerReadyDeadlineAt);
        if (!deadlineMs || deadlineMs <= now.getTime()) {
          return res.status(409).json({ ok: false, error: "Время подтверждения уже истекло" });
        }
        const remaining = raffleReadyReminderRemainingText(winner.winnerReadyDeadlineAt, now);
        const sent = await notifyWinnerReadyReminder(raffleId, raffle, winner, remaining);
        if (!sent || !sent.ok) {
          return res.status(502).json({ ok: false, error: sent && sent.error ? sent.error : "Не удалось отправить напоминание" });
        }
        winner.winnerReadyReminderSentAt = new Date().toISOString();
        winner.winnerReadyReminderSentBy = myId;
        const saved = await redisPipeline([
          ["SET", RAFFLE_PREFIX + raffleId, JSON.stringify(raffle)],
          ["DEL", RAFFLE_PUBLIC_LIST_CACHE_KEY, RAFFLE_SUMMARY_CACHE_KEY, RAFFLE_ARCHIVE_INDEX_CACHE_KEY],
        ]);
        if (!saved || saved[0].error) {
          return res.status(500).json({ ok: false, error: "Напоминание отправлено, но отметка не сохранилась" });
        }
        return res.status(200).json({
          ok: true,
          remaining,
          sentAt: winner.winnerReadyReminderSentAt,
          raffle: sanitizeRaffleForViewer(raffle, admin),
        });
      } finally {
        await releaseRaffleReadySettlement(raffleId, reminderToken);
      }
    }

    if (action === "setWinnerFollowup") {
      if (!admin) return res.status(403).json({ ok: false, error: "Только для админа" });
      const raffleId = String(body.raffleId || body.raffle_id || "").trim();
      const winnerUserId = String(body.winnerUserId || body.winner_user_id || "").trim();
      const winnerSlotId = String(body.winnerSlotId || body.winner_slot_id || body.winnerReadySlotId || body.winner_ready_slot_id || "").trim();
      const kind = String(body.kind || "").trim().toLowerCase();
      const value = String(body.value || "").trim().toLowerCase();
      const amount = Math.round(Number(body.amount) || 0);
      if (!raffleId) return res.status(400).json({ ok: false, error: "Укажите raffleId" });
      if (!winnerUserId && !winnerSlotId) return res.status(400).json({ ok: false, error: "Укажите победителя" });
      if (kind !== "seat" && kind !== "outcome") return res.status(400).json({ ok: false, error: "Неизвестный тип отметки" });
      if (kind === "seat" && value !== "seated" && value !== "not_seated") {
        return res.status(400).json({ ok: false, error: "Выберите «Сел» или «Не сел»" });
      }
      if (kind === "outcome" && value !== "plus" && value !== "minus") {
        return res.status(400).json({ ok: false, error: "Выберите плюс или минус" });
      }
      if (kind === "outcome" && value === "plus" && amount <= 0) {
        return res.status(400).json({ ok: false, error: "Введите сумму больше нуля" });
      }

      const statusToken = await claimRaffleReadySettlementWithRetry(raffleId);
      if (!statusToken) {
        return res.status(409).json({ ok: false, error: "Розыгрыш обновляется. Повторите через пару секунд." });
      }
      let responseStatus = 200;
      let responsePayload = null;
      try {
        const getRes = await redisPipeline([["GET", RAFFLE_PREFIX + raffleId]]);
        const raw = getRes && getRes[0] && getRes[0].result;
        if (!raw) {
          responseStatus = 404;
          responsePayload = { ok: false, error: "Розыгрыш не найден" };
        } else {
          let raffle;
          try {
            raffle = JSON.parse(raw);
          } catch (e) {
            responseStatus = 500;
            responsePayload = { ok: false, error: "Ошибка данных" };
          }
          if (!responsePayload) {
            ensureRaffleWinnerReadySlotIds(raffle);
            const winner = findRaffleWinnerByRequest(raffle.winners || [], winnerUserId, winnerSlotId);
            if (!winner) {
              responseStatus = 404;
              responsePayload = { ok: false, error: "Победитель не найден" };
            } else if (winner.winnerStatus !== "ok") {
              responseStatus = 409;
              responsePayload = { ok: false, error: "Сначала подтвердите выдачу приза" };
            } else if (kind === "outcome" && winner.winnerSeatStatus !== "seated") {
              responseStatus = 409;
              responsePayload = { ok: false, error: "Сначала отметьте, что игрок сел" };
            } else {
              const nowIso = new Date().toISOString();
              if (kind === "seat") {
                winner.winnerSeatStatus = value;
                winner.winnerSeatStatusAt = nowIso;
                winner.winnerSeatStatusBy = myId;
                if (value === "not_seated") {
                  delete winner.winnerCashoutStatus;
                  delete winner.winnerCashoutAmount;
                  delete winner.winnerCashoutAt;
                  delete winner.winnerCashoutBy;
                }
              } else {
                winner.winnerCashoutStatus = value;
                winner.winnerCashoutAmount = value === "plus" ? amount : 0;
                winner.winnerCashoutAt = nowIso;
                winner.winnerCashoutBy = myId;
              }
              const setRes = await redisPipeline([
                ["SET", RAFFLE_PREFIX + raffleId, JSON.stringify(raffle)],
                ["DEL", RAFFLE_PUBLIC_LIST_CACHE_KEY, RAFFLE_SUMMARY_CACHE_KEY, RAFFLE_ARCHIVE_INDEX_CACHE_KEY],
              ]);
              if (!setRes || setRes[0].error) {
                responseStatus = 500;
                responsePayload = { ok: false, error: "Ошибка записи" };
              } else {
                responsePayload = { ok: true, raffle: sanitizeRaffleForViewer(raffle, admin) };
              }
            }
          }
        }
      } finally {
        await releaseRaffleReadySettlement(raffleId, statusToken);
      }
      // Respond as soon as the winner follow-up is persisted. The client
      // refresh that follows already receives fresh weekly totals; scanning
      // the entire raffle archive here made every +/- tap wait unnecessarily.
      return res.status(responseStatus).json(responsePayload || { ok: false, error: "Ошибка обработки" });
    }

    if (action === "setWinnerReady") {
      const raffleId = (body.raffleId || body.raffle_id || "").trim();
      const requestedWinnerUserId = (body.winnerUserId || body.winner_user_id || "").trim();
      const requestedWinnerSlotId = (body.winnerSlotId || body.winner_slot_id || body.winnerReadySlotId || body.winner_ready_slot_id || "").trim();
      if (!raffleId) return res.status(400).json({ ok: false, error: "Укажите raffleId" });

      const getRes = await redisPipeline([["GET", RAFFLE_PREFIX + raffleId]]);
      const raw = getRes && getRes[0] && getRes[0].result;
      if (!raw) return res.status(404).json({ ok: false, error: "Розыгрыш не найден" });
      let raffle;
      try {
        raffle = JSON.parse(raw);
      } catch (e) {
        return res.status(500).json({ ok: false, error: "Ошибка данных" });
      }
      if (!raffle.winners || !raffle.winners.length) {
        return res.status(400).json({ ok: false, error: "Розыгрыш не завершён или нет победителей" });
      }
      const now = new Date();
      let accountId = "";
      try {
        accountId = myId && !String(myId).startsWith("guest_") ? (await resolveRaffleAccountId(identity, myId)) || "" : "";
      } catch (eAccountId) {
        accountId = "";
      }
      const matchesViewer = (w) => {
        if (!w) return false;
        const winnerUserId = w.userId != null ? String(w.userId).trim() : "";
        if (winnerUserId && winnerUserId === myId) return true;
        const winnerAccountId = raffleParticipantAccountId(w);
        return !!(accountId && winnerAccountId && winnerAccountId === accountId);
      };
      const readyToken = await claimRaffleReadySettlementWithRetry(raffleId);
      if (!readyToken) {
        return res.status(409).json({ ok: false, error: "Розыгрыш обновляется. Обновите через пару секунд." });
      }

      let readySettlement = { changed: false, rerolled: false, rerollWinners: [] };
      let readyAdminWinner = null;
      let responseStatus = 200;
      let responsePayload = null;
      try {
        raffle = (await loadStoredRaffleById(raffleId)) || raffle;
        if (!raffle.winners || !raffle.winners.length) {
          responseStatus = 400;
          responsePayload = { ok: false, error: "Розыгрыш не завершён или нет победителей" };
        } else {
          const winners = Array.isArray(raffle.winners) ? raffle.winners : [];
          const slotIdsChanged = ensureRaffleWinnerReadySlotIds(raffle);
          const winner = (requestedWinnerUserId || requestedWinnerSlotId)
            ? findRaffleWinnerByRequest(winners, requestedWinnerUserId, requestedWinnerSlotId)
            : winners.find(matchesViewer);
          if (winner && !matchesViewer(winner)) {
            responseStatus = 403;
            responsePayload = { ok: false, error: "Подтвердить готовность можно только за себя." };
          } else if (!winner) {
            responseStatus = 403;
            responsePayload = { ok: false, error: "Подтвердить готовность может только победитель." };
          } else if (
            winner.winnerReadyExpired === true ||
            winner.winnerBurned === true ||
            winner.winnerReadyState === "missed" ||
            winner.winnerReadyState === "burned"
          ) {
            responseStatus = 400;
            responsePayload = { ok: false, error: "Время подтверждения истекло. Победитель уже ушёл в реролл." };
          } else if (!raffleWinnerReadyClickStillAcceptable(winner, now)) {
            responseStatus = 400;
            responsePayload = { ok: false, error: "Время подтверждения истекло. Победитель уже ушёл в реролл." };
          } else {
            const wasWinnerReady = raffleWinnerIsReady(winner);
            winner.winnerReady = true;
            winner.winnerReadyState = "ready";
            if (!winner.winnerReadyAt) winner.winnerReadyAt = now.toISOString();
            winner.winnerReadyBy = myId;
            if (accountId) winner.winnerReadyAccountId = accountId;
            if (!wasWinnerReady) readyAdminWinner = winner;
            const privateCashRegistration = await registerRaffleWinnerInPrivateCash(raffle, winner, now);
            if (privateCashRegistration && privateCashRegistration.ok) {
              winner.privateCashRegistered = true;
              winner.privateCashRegisteredAt = now.toISOString();
              winner.privateCashEventId = privateCashRegistration.eventId;
            } else if (privateCashRegistration && privateCashRegistration.error) {
              winner.privateCashRegistrationError = privateCashRegistration.error;
            }
            responsePayload = { ok: true, raffle: sanitizeRaffleForViewer(raffle, admin) };
          }

          if (responseStatus === 200) {
            readySettlement = settleRaffleReadyWindows(raffle, now);
            if (responsePayload && responsePayload.ok) responsePayload.raffle = sanitizeRaffleForViewer(raffle, admin);
          }

          if (slotIdsChanged || readySettlement.changed || responseStatus === 200) {
            const setRes = await redisPipeline([
              ["SET", RAFFLE_PREFIX + raffleId, JSON.stringify(raffle)],
              ["DEL", RAFFLE_PUBLIC_LIST_CACHE_KEY, RAFFLE_SUMMARY_CACHE_KEY, RAFFLE_ARCHIVE_INDEX_CACHE_KEY],
            ]);
            if (!setRes || setRes[0].error) {
              responseStatus = 500;
              responsePayload = { ok: false, error: "Ошибка записи" };
              readySettlement = { changed: false, rerolled: false, rerollWinners: [] };
              readyAdminWinner = null;
            }
          }
        }
      } finally {
        await releaseRaffleReadySettlement(raffleId, readyToken);
      }

      if (readySettlement.rerolled) await sendRaffleWinnerNotifications(raffleId, raffle, readySettlement.rerollWinners, { rerollOnly: true });
      if (readyAdminWinner) queueRaffleWinnerReadyAdminNotifications(raffleId, raffle, readyAdminWinner, now);
      return res.status(responseStatus).json(responsePayload || { ok: false, error: "Ошибка обработки" });
    }

    if (action === "delete") {
      if (!admin) return res.status(403).json({ ok: false, error: "Только для админа" });
      const raffleId = (body.raffleId || body.raffle_id || "").trim();
      if (!raffleId) return res.status(400).json({ ok: false, error: "Укажите raffleId" });

      const keys = [
        [ "LREM", RAFFLE_IDS_KEY, "0", raffleId ],
        [ "SREM", RAFFLE_ACTIVE_IDS_KEY, raffleId ],
        [ "DEL", RAFFLE_PREFIX + raffleId ],
        [ "DEL", RAFFLE_IPS_PREFIX + raffleId ],
        [ "DEL", RAFFLE_DEVICES_PREFIX + raffleId ],
        [ "DEL", RAFFLE_PUBLIC_LIST_CACHE_KEY, RAFFLE_SUMMARY_CACHE_KEY, RAFFLE_ARCHIVE_INDEX_CACHE_KEY ],
      ];
      const delRes = await redisPipeline(keys);
      if (!delRes) {
        return res.status(500).json({ ok: false, error: "Ошибка удаления" });
      }
      return res.status(200).json({ ok: true, deleted: true });
    }

    if (action === "join") {
      const raffleId = (body.raffleId || body.raffle_id || "").trim();
      if (!raffleId) return res.status(400).json({ ok: false, error: "Укажите raffleId" });

      const getRes = await redisPipeline([["GET", RAFFLE_PREFIX + raffleId]]);
      const raw = getRes && getRes[0] && getRes[0].result;
      if (!raw) return res.status(404).json({ ok: false, error: "Розыгрыш не найден" });
      let raffle;
      try {
        raffle = JSON.parse(raw);
      } catch (e) {
        return res.status(500).json({ ok: false, error: "Ошибка данных" });
      }
      const normalizedDailyCash = normalizeDailyCashRaffleInPlace(raffle);
      if (raffle.status !== "active") {
        return res.status(400).json({ ok: false, error: "Розыгрыш завершён" });
      }
      if (new Date(raffle.endDate) <= new Date()) {
        return res.status(400).json({ ok: false, error: "Приём заявок завершён" });
      }
      if (raffleUsesAdminTicketEntry(raffle)) {
        return res.status(403).json({
          ok: false,
          error: "Участников этого розыгрыша добавляет админ.",
          code: "RAFFLE_ADMIN_ENTRY",
        });
      }
      const hasGroupAccessLevels = raffleHasGroupAccessLevels(raffle);
      const minAccessLevel = hasGroupAccessLevels ? raffleLowestAccessLevel(raffle) : raffleAccessLevel(raffle);

      if (myId.startsWith("guest_")) {
        return res.status(403).json({
          ok: false,
          error: "Чтобы участвовать в розыгрышах, войдите в аккаунт.",
          code: "RAFFLE_LOGIN_REQUIRED",
        });
      }

      const accountId = await resolveRaffleAccountId(identity, myId);
      const accountSubscribed = accountId && !myId.startsWith("guest_")
        ? await isRaffleAccountSubscriber(accountId)
        : false;
      const gateMemberId = await resolveRaffleTelegramGateMemberId(identity, myId);
      const gate = await checkTelegramParticipationGate(gateMemberId, BOT_TOKEN, {
        channelHandle: RAFFLE_CHANNEL,
        featureText: "участия в розыгрыше",
        actionText: "нажмите «Участвовать» снова",
        accountSubscribed,
      });
      if (!gate.ok) {
        return res.status(gate.status || 403).json({
          ok: false,
          error: gate.error,
          code: gate.code,
          missing: gate.missing,
          missingRequirements: gate.missingRequirements,
          botUrl: gate.botUrl,
          channelUrl: gate.channelUrl,
          openUrl: gate.openUrl,
        });
      }

      const p21Res = await redisPipeline([
        ["HGET", POKERPLUS_BIND_HASH_KEY, accountId || ""],
        ["HGET", POKERPLUS_BIND_HASH_KEY, myId],
        ["HGET", P21_IDS_KEY, accountId || ""],
        ["HGET", P21_IDS_KEY, myId],
      ]);
      let p21Id = p21Res && p21Res[0] && p21Res[0].result ? String(p21Res[0].result).trim() : null;
      if (!p21Id && p21Res && p21Res[1] && p21Res[1].result) {
        p21Id = String(p21Res[1].result).trim();
      }
      if (!p21Id && p21Res && p21Res[2] && p21Res[2].result) {
        p21Id = String(p21Res[2].result).trim();
      }
      if (!p21Id && p21Res && p21Res[3] && p21Res[3].result) {
        p21Id = String(p21Res[3].result).trim();
      }
      const viewerPokerPlusStatus = await resolveRaffleViewerPokerPlusStatus(accountId, myId, p21Id || "");
      const viewerPokerPlusStatusLevel = viewerPokerPlusStatus.level;
      const accessibleTicketGroups = hasGroupAccessLevels
        ? raffleAccessibleTicketGroupsForLevel(raffle, viewerPokerPlusStatusLevel)
        : [];
      const missingAccessLevel = hasGroupAccessLevels && !accessibleTicketGroups.length
        ? minAccessLevel
        : minAccessLevel;
      if ((hasGroupAccessLevels && !accessibleTicketGroups.length) || (!hasGroupAccessLevels && minAccessLevel > 0 && viewerPokerPlusStatusLevel < minAccessLevel)) {
        const needsPoker21Profile = minAccessLevel === 1 && viewerPokerPlusStatusLevel <= 0;
        const targetPoints = rafflePointsRequiredForLevel(missingAccessLevel);
        const pointsNeeded = Math.max(0, targetPoints - viewerPokerPlusStatus.points);
        return res.status(403).json({
          ok: false,
          error: needsPoker21Profile
            ? "Привяжите аккаунт Poker21 в профиле."
            : raffleLevelRequiredMessage(viewerPokerPlusStatusLevel, missingAccessLevel, pointsNeeded),
          code: "RAFFLE_LEVEL_REQUIRED",
          accessLevel: missingAccessLevel,
          currentLevel: viewerPokerPlusStatusLevel,
          currentPoints: viewerPokerPlusStatus.points,
          targetPoints,
          pointsNeeded,
          requiresPoker21Profile: needsPoker21Profile,
        });
      }

      if (raffle.participants.some((p) => p.userId === myId)) {
        if (normalizedDailyCash) await redisPipeline([["SET", RAFFLE_PREFIX + raffleId, JSON.stringify(raffle)]]);
        return res.status(200).json({
          ok: true,
          raffle: sanitizeRaffleForViewer(raffle, admin),
          alreadyJoined: true,
          viewerPokerPlusStatusLevel,
        });
      }

      if (raffle.participants.some((p) => raffleParticipantAccountId(p) === accountId)) {
        return res.status(200).json({
          ok: true,
          raffle: sanitizeRaffleForViewer(raffle, admin),
          alreadyJoined: true,
          viewerPokerPlusStatusLevel,
        });
      }

      const identityConflict = participantIdentityConflict(raffle.participants, {
        accountId,
        userId: myId,
        telegramUserId: gateMemberId,
        p21Id: p21Id || "",
      });
      if (identityConflict && identityConflict.code !== "SAME_DT_ID") {
        return res.status(400).json({
          ok: false,
          error: identityConflict.error || "Этот игрок уже участвует через другой аккаунт.",
          code: identityConflict.code || "MULTI_ACCOUNT",
        });
      }
      const p21Conflict = await raffleParticipantPokerPlusConflict(raffle.participants, p21Id || "", accountId);
      if (p21Conflict) {
        return res.status(400).json({
          ok: false,
          error: "Этот Poker21 уже участвует через другой аккаунт.",
          code: "SAME_POKER21",
        });
      }

      const clientIp = getClientIp(req);
      const deviceId = normalizeRaffleDeviceId(body.deviceId || body.device_id) || null;
      const ipsKey = RAFFLE_IPS_PREFIX + raffleId;
      const devicesKey = RAFFLE_DEVICES_PREFIX + raffleId;
      const sameDeviceParticipant = deviceId
        ? (raffle.participants || []).find((p) => {
          if (!p) return false;
          const existingDeviceId = normalizeRaffleDeviceId(p.deviceId || p.device_id);
          if (!existingDeviceId || existingDeviceId !== deviceId) return false;
          const existingAccountId = raffleParticipantAccountId(p);
          if (existingAccountId && existingAccountId === accountId) return false;
          const existingUserId = p.userId != null ? String(p.userId).trim() : "";
          if (existingUserId && existingUserId === myId) return false;
          return true;
        })
        : null;
      if (sameDeviceParticipant) {
        return res.status(400).json({
          ok: false,
          error: "С этого устройства уже участвует другой аккаунт в данном розыгрыше.",
          code: "SAME_DEVICE",
        });
      }
      const checkCmds = [];
      if (clientIp) checkCmds.push(["HGET", ipsKey, clientIp]);
      if (deviceId) checkCmds.push(["HGET", devicesKey, deviceId]);
      if (checkCmds.length > 0) {
        const checkRes = await redisPipeline(checkCmds);
        if (checkRes) {
          let idx = 0;
          // Один внешний IP может одновременно принадлежать семье, клубному Wi‑Fi
          // или множеству абонентов мобильного оператора. Сам по себе IP не
          // доказывает мультиаккаунт: строгие проверки выше уже сравнили аккаунт,
          // Telegram/Poker21 и устройство. Оставляем IP только как аудит-метаданные.
          idx += clientIp ? 1 : 0;
          const deviceOwner =
            deviceId && checkRes[idx] && checkRes[idx].result != null && checkRes[idx].result !== false
              ? String(checkRes[idx].result).trim()
              : "";
          if (deviceId && deviceOwner && deviceOwner !== accountId) {
            return res.status(400).json({
              ok: false,
              error: "С этого устройства уже участвует другой аккаунт в данном розыгрыше.",
              code: "SAME_DEVICE",
            });
          }
        }
      }

      const profileRedis = await redisPipeline([
        ["HGET", CHAT_DISPLAY_NAMES_KEY, myId],
        ["HGET", USERNAMES_KEY, myId],
      ]);
      let redisChatDisplay = "";
      try {
        const rawD = profileRedis && profileRedis[0] && profileRedis[0].result;
        if (rawD != null && rawD !== false) {
          redisChatDisplay = String(rawD)
            .trim()
            .replace(/[\u0000-\u001f\u007f]/g, "")
            .slice(0, CHAT_DISPLAY_NAME_MAX);
        }
      } catch (eCd) {}
      let redisUsernameFromBot = "";
      try {
        const rawU = profileRedis && profileRedis[1] && profileRedis[1].result;
        if (rawU != null && rawU !== false) {
          redisUsernameFromBot = String(rawU).trim().replace(/^@+/g, "");
        }
      } catch (eUn) {}

      const name = (function raffleParticipantName() {
        if (myId.startsWith("guest_")) return "Гость";
        if (!identity) return "Участник";
        /* Имя из профиля (POST users chatDisplayName) — раньше не читалось, в списке был «Участник». */
        if (redisChatDisplay) return redisChatDisplay;
        const fn = (identity.firstName || "").trim();
        if (fn) return fn;
        const un = (identity.telegramUsername || identity.pwaUsername || "").replace(/^@+/g, "").trim();
        if (un) return "@" + un;
        if (redisUsernameFromBot) return "@" + redisUsernameFromBot;
        return "Участник";
      })();
      const partPush = {
        userId: myId,
        accountId,
        name,
        p21Id: p21Id || "",
        joinedAt: new Date().toISOString(),
        telegramUserId: gateMemberId && String(gateMemberId).startsWith("tg_") ? gateMemberId : "",
        ip: clientIp || undefined,
        deviceId: deviceId || undefined,
      };
      if (hasGroupAccessLevels) {
        partPush.ticketGroups = accessibleTicketGroups;
        partPush.accessGroupCount = accessibleTicketGroups.length;
      }
      if (p21Id && viewerPokerPlusStatusLevel > 0) partPush.pokerPlusStatusLevel = viewerPokerPlusStatusLevel;
      if (String(myId).indexOf("tg_") === 0 && redisUsernameFromBot) {
        partPush.telegramUsername = redisUsernameFromBot;
      }
      raffle.participants.push(partPush);
      const hydratedAfterJoin = await hydrateRaffleParticipantNamesFromRedis(raffle);
      raffle = hydratedAfterJoin.raffle;
      const writeCmds = [
        ["SET", RAFFLE_PREFIX + raffleId, JSON.stringify(raffle)],
        ["SADD", RAFFLE_ACTIVE_IDS_KEY, raffleId],
        ["DEL", RAFFLE_PUBLIC_LIST_CACHE_KEY, RAFFLE_SUMMARY_CACHE_KEY, RAFFLE_ARCHIVE_INDEX_CACHE_KEY],
      ];
      if (clientIp) writeCmds.push(["HSET", ipsKey, clientIp, accountId]);
      if (deviceId) writeCmds.push(["HSET", devicesKey, deviceId, accountId]);
      const setRes = await redisPipeline(writeCmds);
      if (!setRes || setRes[0].error) {
        return res.status(500).json({ ok: false, error: "Ошибка записи" });
      }
      return res.status(200).json({
        ok: true,
        raffle: sanitizeRaffleForViewer(raffle, admin),
        viewerPokerPlusStatusLevel,
      });
    }

    if (action === "leave") {
      const raffleId = (body.raffleId || body.raffle_id || "").trim();
      if (!raffleId) return res.status(400).json({ ok: false, error: "Укажите raffleId" });
      const accountId = await resolveRaffleAccountId(identity, myId);

      const getRes = await redisPipeline([["GET", RAFFLE_PREFIX + raffleId]]);
      const raw = getRes && getRes[0] && getRes[0].result;
      if (!raw) return res.status(404).json({ ok: false, error: "Розыгрыш не найден" });
      let raffle;
      try {
        raffle = JSON.parse(raw);
      } catch (e) {
        return res.status(500).json({ ok: false, error: "Ошибка данных" });
      }
      if (raffle.status !== "active") {
        return res.status(400).json({ ok: false, error: "Розыгрыш завершён" });
      }
      if (new Date(raffle.endDate) <= new Date()) {
        return res.status(400).json({ ok: false, error: "Приём заявок завершён" });
      }
      if (raffleUsesAdminTicketEntry(raffle)) {
        return res.status(403).json({
          ok: false,
          error: "Участников этого розыгрыша добавляет админ.",
          code: "RAFFLE_ADMIN_ENTRY",
        });
      }
      const leaving =
        (raffle.participants || []).find((p) => p.userId === myId) ||
        (accountId ? (raffle.participants || []).find((p) => raffleParticipantAccountId(p) === accountId) : null);
      const before = raffle.participants.length;
      raffle.participants = (raffle.participants || []).filter((p) => {
        if (!p) return false;
        if (p.userId === myId) return false;
        if (accountId && raffleParticipantAccountId(p) === accountId) return false;
        return true;
      });
      if (raffle.participants.length === before) {
        return res.status(200).json({ ok: true, raffle: sanitizeRaffleForViewer(raffle, admin), alreadyLeft: true });
      }
      const writeCmds = [
        ["SET", RAFFLE_PREFIX + raffleId, JSON.stringify(raffle)],
        ["SADD", RAFFLE_ACTIVE_IDS_KEY, raffleId],
        ["DEL", RAFFLE_PUBLIC_LIST_CACHE_KEY, RAFFLE_SUMMARY_CACHE_KEY, RAFFLE_ARCHIVE_INDEX_CACHE_KEY],
      ];
      const ipsKey = RAFFLE_IPS_PREFIX + raffleId;
      const devicesKey = RAFFLE_DEVICES_PREFIX + raffleId;
      if (leaving && leaving.ip) writeCmds.push(["HDEL", ipsKey, leaving.ip]);
      if (leaving && leaving.deviceId) writeCmds.push(["HDEL", devicesKey, leaving.deviceId]);
      const setRes = await redisPipeline(writeCmds);
      if (!setRes || setRes[0].error) {
        return res.status(500).json({ ok: false, error: "Ошибка записи" });
      }
      return res.status(200).json({ ok: true, raffle: sanitizeRaffleForViewer(raffle, admin) });
    }

    return res.status(400).json({ ok: false, error: "action: create, join, leave (и админские: complete, cancel, delete, setWinnerStatus, setWinnerFollowup, updateEndDate, duplicateOptions, duplicateLast, adminUpsertParticipant, adminRemoveParticipant)" });
  }

  // GET: список активных или один розыгрыш
  const raffleId = req.query.id || req.query.raffleId || req.query.raffle_id;
  if (raffleId) {
    const getRes = await redisPipeline([["GET", RAFFLE_PREFIX + raffleId]]);
    const raw = getRes && getRes[0] && getRes[0].result;
    if (!raw) return res.status(404).json({ ok: false, error: "Розыгрыш не найден" });
    let raffle;
    try {
      raffle = JSON.parse(raw);
    } catch (e) {
      return res.status(500).json({ ok: false, error: "Ошибка данных" });
    }
    const normalizedDailyCash = normalizeDailyCashRaffleInPlace(raffle);
    const now = new Date();
    const drawLifecycle = await settleRaffleDrawLifecycleSafely(raffleId, raffle, now);
    raffle = drawLifecycle.raffle || raffle;
    const completedByDeadline = !!drawLifecycle.completed;
    const readySettlement = await settleRaffleReadyWindowsSafely(raffleId, raffle, now);
    raffle = readySettlement.raffle || raffle;
    const hydratedOne = await hydrateRaffleParticipantNamesFromRedis(raffle);
    raffle = hydratedOne.raffle;
    if (!drawLifecycle.locked && ((!drawLifecycle.persisted && normalizedDailyCash) || hydratedOne.changed)) {
      const writeCmds = [
        ["SET", RAFFLE_PREFIX + raffleId, JSON.stringify(raffle)],
        ["DEL", RAFFLE_PUBLIC_LIST_CACHE_KEY, RAFFLE_SUMMARY_CACHE_KEY, RAFFLE_ARCHIVE_INDEX_CACHE_KEY],
      ];
      if (completedByDeadline || raffle.status !== "active") {
        writeCmds.push(["SREM", RAFFLE_ACTIVE_IDS_KEY, raffleId]);
      } else {
        writeCmds.push(["SADD", RAFFLE_ACTIVE_IDS_KEY, raffleId]);
      }
      await redisPipeline(writeCmds);
    }
    if (completedByDeadline) await sendRaffleCompletedNotifications(raffleId, raffle);
    else if (drawLifecycle.batchWinners && drawLifecycle.batchWinners.length) await sendRaffleWinnerNotifications(raffleId, raffle, drawLifecycle.batchWinners);
    else if (readySettlement.rerolled) await sendRaffleWinnerNotifications(raffleId, raffle, readySettlement.rerollWinners, { rerollOnly: true });
    const viewerPokerPlusStatus = await resolveRaffleViewerStatusForIdentity(identity, myId);
    return res.status(200).json({
      ok: true,
      raffle: sanitizeRaffleForViewer(raffle, admin),
      isAdmin: admin,
      viewerPokerPlusStatusLevel: viewerPokerPlusStatus.level,
    });
  }

  const listRes = await redisPipeline([["LRANGE", RAFFLE_IDS_KEY, "0", "-1"]], {
    timeoutMs: 6500,
    context: "raffles.fullList.ids",
    allowLargeRedisRead: true,
  });
  const idsRaw = (listRes && listRes[0] && listRes[0].result) || [];
  const ids = [...new Set(idsRaw)];
  const raffles = [];
  const getRafflesRes = ids.length ? await redisPipeline(ids.map((id) => ["GET", RAFFLE_PREFIX + id]), {
    timeoutMs: 10000,
    context: "raffles.fullList.rows",
    allowLargeRedisRead: true,
  }) : [];
  const writeBackIds = new Set();
  const completedByDeadlineIds = new Set();
  const rerolledIds = new Set();
  const inactiveIds = new Set();
  const winnerNotifyRetryIds = new Set();
  const rerollWinnersById = new Map();
  const batchWinnersById = new Map();
  const winnerNotifyRetryWinnersById = new Map();
  const drawLockedIds = new Set();
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    const str = getRafflesRes && getRafflesRes[i] && getRafflesRes[i].result;
    if (str) {
      try {
        let raffle = JSON.parse(str);
        if (normalizeDailyCashRaffleInPlace(raffle)) writeBackIds.add(String(id));
        const now = new Date();
        const drawLifecycle = await settleRaffleDrawLifecycleSafely(id, raffle, now);
        raffle = drawLifecycle.raffle || raffle;
        if (drawLifecycle.locked) drawLockedIds.add(String(id));
        if (drawLifecycle.persisted || drawLifecycle.locked) writeBackIds.delete(String(id));
        if (drawLifecycle.batchWinners && drawLifecycle.batchWinners.length) {
          batchWinnersById.set(String(id), drawLifecycle.batchWinners);
        }
        if (drawLifecycle.completed) {
          completedByDeadlineIds.add(String(id));
          inactiveIds.add(String(id));
        }
        const readySettlement = await settleRaffleReadyWindowsSafely(id, raffle, now);
        raffle = readySettlement.raffle || raffle;
        if (readySettlement.rerolled && !completedByDeadlineIds.has(String(id))) {
          rerolledIds.add(String(id));
          rerollWinnersById.set(String(id), readySettlement.rerollWinners || []);
        }
        if (isCronTick && !completedByDeadlineIds.has(String(id)) && !rerolledIds.has(String(id))) {
          const retryWinners = raffleWinnerNotificationRetryRows(raffle, now);
          if (retryWinners.length) {
            winnerNotifyRetryIds.add(String(id));
            winnerNotifyRetryWinnersById.set(String(id), retryWinners);
          }
        }
        raffles.push(raffle);
      } catch (e) {}
    }
  }
  const completedBackfill = backfillCompletedNumbersByOrder(raffles);
  completedBackfill.changedIds.forEach((id) => writeBackIds.add(String(id)));
  await seedCompletedSeqFromBackfill(completedBackfill.maxNumber);
  const hydratedList = await hydrateRafflesParticipantNamesFromRedis(raffles);
  hydratedList.changedIds.forEach((id) => {
    if (!drawLockedIds.has(String(id))) writeBackIds.add(String(id));
  });
  raffles.forEach((raffle) => {
    if (raffle && raffle.id && raffle.status !== "active") inactiveIds.add(String(raffle.id));
  });
  if (writeBackIds.size > 0) {
    const byId = new Map();
    raffles.forEach((r) => {
      if (r && r.id) byId.set(String(r.id), r);
    });
    const writeCmds = [...writeBackIds]
      .filter((id) => !drawLockedIds.has(String(id)))
      .map((id) => byId.get(String(id)))
      .filter(Boolean)
      .map((raffle) => ["SET", RAFFLE_PREFIX + raffle.id, JSON.stringify(raffle)]);
    if (inactiveIds.size) writeCmds.push(["SREM", RAFFLE_ACTIVE_IDS_KEY, ...[...inactiveIds]]);
    writeCmds.push(["DEL", RAFFLE_PUBLIC_LIST_CACHE_KEY, RAFFLE_SUMMARY_CACHE_KEY, RAFFLE_ARCHIVE_INDEX_CACHE_KEY]);
    if (writeCmds.length) await redisPipeline(writeCmds);
  } else if (inactiveIds.size) {
    await redisPipeline([
      ["SREM", RAFFLE_ACTIVE_IDS_KEY, ...[...inactiveIds]],
      ["DEL", RAFFLE_PUBLIC_LIST_CACHE_KEY, RAFFLE_SUMMARY_CACHE_KEY, RAFFLE_ARCHIVE_INDEX_CACHE_KEY],
    ]);
  }
  if (completedByDeadlineIds.size > 0) {
    await Promise.allSettled([...completedByDeadlineIds].map((id) => {
      const raffle = raffles.find((r) => r && String(r.id) === String(id));
      return raffle ? sendRaffleCompletedNotifications(id, raffle) : Promise.resolve();
    }));
  }
  if (batchWinnersById.size > 0) {
    await Promise.allSettled([...batchWinnersById.keys()].map((id) => {
      if (completedByDeadlineIds.has(String(id))) return Promise.resolve();
      const raffle = raffles.find((r) => r && String(r.id) === String(id));
      return raffle ? sendRaffleWinnerNotifications(id, raffle, batchWinnersById.get(String(id))) : Promise.resolve();
    }));
  }
  if (rerolledIds.size > 0) {
    await Promise.allSettled([...rerolledIds].map((id) => {
      const raffle = raffles.find((r) => r && String(r.id) === String(id));
      return raffle ? sendRaffleWinnerNotifications(id, raffle, rerollWinnersById.get(String(id)), { rerollOnly: true }) : Promise.resolve();
    }));
  }
  if (winnerNotifyRetryIds.size > 0) {
    await Promise.allSettled([...winnerNotifyRetryIds].map((id) => {
      const raffle = raffles.find((r) => r && String(r.id) === String(id));
      return raffle ? sendRaffleWinnerNotifications(id, raffle, winnerNotifyRetryWinnersById.get(String(id))) : Promise.resolve();
    }));
  }
  const dailyCreated = await ensureDueDailyRaffles(raffles);
  if (dailyCreated.length) {
    dailyCreated.forEach((raffle) => raffles.push(raffle));
  }
  raffles.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  let active = raffles.filter((r) => r.status === "active");
  if (isCronTick) {
    return res.status(200).json({
      ok: true,
      mode: "raffles_tick",
      completedByDeadline: completedByDeadlineIds.size,
      rerolled: rerolledIds.size,
      winnerNotificationRetries: winnerNotifyRetryIds.size,
      dailyCreated: dailyCreated.length,
      activeCount: active.length,
      totalCount: raffles.length,
    });
  }

  // Демо-розыгрыш: localhost, development или явный ?demo=1
  const host = (req.headers.host || req.headers.origin || "").toString();
  const referer = (req.headers.referer || "").toString();
  const isLocalhost = /localhost|127\.0\.0\.1|0\.0\.0\.0/i.test(host) || /localhost|127\.0\.0\.1/i.test(referer);
  const isDev = process.env.NODE_ENV === "development";
  const forceDemo = req.query && (req.query.demo === "1" || req.query.demo === "true");
  const needDemo = forceDemo || ((isLocalhost || isDev) && active.length === 0);
  if (needDemo) {
    const demo = getDemoRaffle();
    if (!raffles.some((r) => r.id === demo.id)) raffles.unshift(demo);
    active = raffles.filter((r) => r.status === "active");
    if (forceDemo && active.length > 0) active = [active.find((r) => r.id === demo.id) || active[0]];
  }
  const subscriptionGate = await getRaffleSubscriptionGateForViewer(identity, myId);
  const viewerPokerPlusStatus = await resolveRaffleViewerStatusForIdentity(identity, myId);
  const rafflesSummary = buildRafflesSummaryPayload(raffles);
  writeRaffleSummaryCache(rafflesSummary).catch(() => {});

  return res.status(200).json({
    ok: true,
    raffles: sanitizeRafflesForViewer(raffles, admin),
    activeRaffles: sanitizeRafflesForViewer(active, admin),
    activeRaffle: active[0] ? sanitizeRaffleForViewer(active[0], admin) : null,
    rafflesSummary,
    currentWeekIssueTotals: admin ? currentWeekRaffleIssueTotalsFromRaffles(raffles, new Date()) : null,
    isAdmin: admin,
    subscriptionGate,
    viewerPokerPlusStatusLevel: viewerPokerPlusStatus.level,
  });
}

function getDemoRaffle() {
  const now = new Date();
  const endDate = new Date(now.getTime() + 3 * 60 * 60 * 1000); // через 3 часа — как будто розыгрыш идёт сейчас
  return {
    id: "raffle_demo_local",
    createdBy: 0,
    title: "Беккинг-билеты на турнир дня",
    totalWinners: 3,
    groups: [
      { prize: "Беккинг-билет на турнир дня 18:00 МСК (бай-ин 500 р)", count: 2 },
      { prize: "Беккинг-билет на турнир дня 18:00 МСК (бай-ин 500 р) — 2-е место", count: 1 },
    ],
    endDate: endDate.toISOString(),
    participants: [
      { userId: "demo_1", name: "Иван", p21Id: "12345" },
      { userId: "demo_2", name: "Мария", p21Id: "67890" },
      { userId: "demo_3", name: "Алексей", p21Id: "11111" },
      { userId: "demo_4", name: "Ольга", p21Id: "22222" },
      { userId: "demo_5", name: "Дмитрий", p21Id: "33333" },
    ],
    winners: [],
    status: "active",
    createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(), // создан 2 часа назад
  };
}

module.exports._test = Object.assign({}, module.exports._test, {
  raffleLevelRequiredMessage,
  rafflePointsRequiredForLevel,
  currentMoscowWeekRange,
  currentWeekRaffleWinnerReturnAmount,
  currentWeekRaffleIssueTotalsFromRaffles,
});

"use strict";

const DEFAULT_TELEGRAM_MINI_APP = "https://t.me/Poker_dvatuza_bot/DvaTuza";
const DEFAULT_WORKING_ADMIN_CONTACTS = [
  { userId: "tg_2144406710", name: "Анна", shiftStart: 6, shiftEnd: 18 },
  { userId: "tg_1897001087", name: "Вика", shiftStart: 18, shiftEnd: 2 },
];
const ID_TO_USER_KEY = "poker_app:id_to_user";
const USERNAMES_KEY = "poker_app:visitor_usernames";
const RAFFLE_WINNER_NOTIFY_LOCK_PREFIX = "poker_app:raffle_winner_notify_lock:";
const RAFFLE_WINNER_NOTIFY_SENT_PREFIX = "poker_app:raffle_winner_notify_sent:";
const RAFFLE_WINNER_NOTIFY_AUDIT_PREFIX = "poker_app:raffle_winner_notify_audit:";
const RAFFLE_WINNER_NOTIFY_LOCK_TTL_SECONDS = 5 * 60;
const RAFFLE_WINNER_NOTIFY_SENT_TTL_SECONDS = 60 * 60 * 24 * 45;

function normalizeSupportAdminId(raw) {
  const s = String(raw || "").trim();
  if (!s) return "";
  if (/^\d+$/.test(s)) return "tg_" + s;
  if (/^tg_\d+$/.test(s)) return s;
  return "";
}

function normalizeHour(raw, fallback) {
  const n = parseInt(String(raw), 10);
  if (!Number.isFinite(n) || n < 0 || n > 23) return fallback;
  return n;
}

function normalizeWorkingAdminContacts(rawContacts) {
  const source = Array.isArray(rawContacts) && rawContacts.length ? rawContacts : DEFAULT_WORKING_ADMIN_CONTACTS;
  return source
    .map((item) => {
      const userId = normalizeSupportAdminId(item && (item.userId || item.id || item.telegramId));
      if (!userId) return null;
      return {
        userId,
        name: String((item && item.name) || "").trim(),
        shiftStart: normalizeHour(item && item.shiftStart, 0),
        shiftEnd: normalizeHour(item && item.shiftEnd, 0),
      };
    })
    .filter(Boolean);
}

function moscowHourFromDate(date) {
  const d = date instanceof Date ? date : new Date(date || Date.now());
  const hour = Number.isFinite(d.getTime()) ? d.getUTCHours() + 3 : new Date().getUTCHours() + 3;
  return ((hour % 24) + 24) % 24;
}

function isHourInShift(hour, start, end) {
  const h = normalizeHour(hour, 0);
  const s = normalizeHour(start, 0);
  const e = normalizeHour(end, 0);
  if (s === e) return true;
  return s < e ? h >= s && h < e : h >= s || h < e;
}

function resolveWorkingRaffleAdmin(now, contacts) {
  const list = normalizeWorkingAdminContacts(contacts);
  if (!list.length) return null;
  const hour = moscowHourFromDate(now);
  return list.find((item) => isHourInShift(hour, item.shiftStart, item.shiftEnd)) || list[0];
}

function resolveMiniAppBase(miniAppUrl) {
  let base = String(miniAppUrl || "").trim();
  if (!base) base = DEFAULT_TELEGRAM_MINI_APP;
  return base.replace(/\/+$/, "").replace(/\)+$/, "");
}

function appendQueryParams(base, params) {
  const pairs = Object.keys(params || {})
    .filter((key) => params[key] != null && String(params[key]).trim() !== "")
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(String(params[key])));
  if (!pairs.length) return base;
  return base + (base.includes("?") ? "&" : "?") + pairs.join("&");
}

function normalizeRaffleCompletedId(raw) {
  return String(raw || "").trim().replace(/[^A-Za-z0-9_-]/g, "_").slice(0, 72);
}

function raffleCompletedNumber(raw) {
  const source = raw && typeof raw === "object" ? raw.completedNumber || raw.completed_number : "";
  const n = parseInt(String(source || ""), 10);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

function raffleCompletedIdentity(raw) {
  if (raw && typeof raw === "object") return raw.id || raw.raffleId || raw.raffle_id || "";
  return raw;
}

function buildRaffleCompletedStartParam(raffleOrId) {
  const n = raffleCompletedNumber(raffleOrId);
  if (n) return "raffle_" + n;
  const id = normalizeRaffleCompletedId(raffleCompletedIdentity(raffleOrId));
  return id ? "raffle_" + id : "raffles";
}

function buildRaffleCompletedLink(miniAppUrl, raffleOrId) {
  return appendQueryParams(resolveMiniAppBase(miniAppUrl), { startapp: buildRaffleCompletedStartParam(raffleOrId) });
}

function buildRaffleCompletedOpenUrl(raffleOrId) {
  return "./?startapp=" + encodeURIComponent(buildRaffleCompletedStartParam(raffleOrId));
}

function buildRaffleWinnerAdminChatLink(miniAppUrl, adminOrId) {
  const adminId = normalizeSupportAdminId(
    adminOrId && typeof adminOrId === "object" ? adminOrId.userId || adminOrId.id || adminOrId.telegramId : adminOrId
  );
  const base = resolveMiniAppBase(miniAppUrl);
  if (!adminId) return appendQueryParams(base, { startapp: "club_chat" });
  if (base.indexOf("t.me/") !== -1) {
    return appendQueryParams(base, { startapp: "club_chat_dm_" + adminId });
  }
  return appendQueryParams(base, { startapp: "club_chat_dm", with: adminId });
}

function normalizeRafflePrizeKind(raw) {
  const s = String(raw || "").trim().toLowerCase();
  if (["cash", "cash_buyin", "cash_buyins", "cash-backing", "other"].includes(s)) return "cash";
  if (["ticket", "tickets", "tournament", "tournament_ticket", "tournament_tickets"].includes(s)) return "tournament_ticket";
  return "";
}

function isCashRafflePrize(raffle) {
  const explicit = normalizeRafflePrizeKind(raffle && (raffle.prizeKind || raffle.prize_kind));
  if (explicit) return explicit === "cash";
  const title = String((raffle && raffle.title) || "").toLowerCase();
  const groupText = Array.isArray(raffle && raffle.groups)
    ? raffle.groups.map((g) => String((g && g.prize) || "")).join(" ").toLowerCase()
    : "";
  const text = title + " " + groupText;
  return text.includes("на кеш") || text.includes("кеш") || text.includes("cash") || text.includes("бонус гейм") || text.includes("bonus game");
}

function raffleWinnerPushBody(title, prizeText, cashPrize) {
  const parts = [];
  const titlePart = title ? String(title).trim() : "";
  const prizePart = prizeText
    ? "Приз: " + String(prizeText).trim()
    : cashPrize ? "Приз: беккинг-байин на кеш" : "";
  if (titlePart && prizePart) parts.push(titlePart + " · " + prizePart);
  else if (titlePart) parts.push(titlePart);
  else if (prizePart) parts.push(prizePart);
  parts.push("Откройте «Розыгрыши» и нажмите «Я готов».");
  return parts.join("\n").slice(0, 180);
}

function safePushTagPart(raw) {
  return String(raw || "").replace(/[^\w-]/g, "_").slice(0, 48);
}

function redisSetNxOk(row) {
  if (!row || row.error) return false;
  const value = row.result;
  return value === "OK" || value === true || value === 1 || String(value || "").toUpperCase() === "OK";
}

function redisSetOk(row) {
  if (!row || row.error) return false;
  const value = row.result;
  return value === "OK" || value === true || value === 1 || String(value || "").toUpperCase() === "OK";
}

function redisString(row) {
  if (!row || row.error || row.result == null || row.result === false) return "";
  return String(row.result).trim();
}

function positiveInteger(raw) {
  const n = parseInt(String(raw || ""), 10);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

function raffleExpectedWinnerSlots(raffle) {
  if (!raffle || typeof raffle !== "object") return 0;
  const values = [];
  const total = positiveInteger(raffle.totalWinners || raffle.total_winners);
  if (total) values.push(total);
  if (Array.isArray(raffle.groups) && raffle.groups.length) {
    const groupTotal = raffle.groups.reduce((sum, group) => sum + positiveInteger(group && group.count), 0);
    if (groupTotal) values.push(groupTotal);
  }
  return values.length ? Math.min.apply(null, values) : 0;
}

function raffleWinnerRecipientKey(winner) {
  const w = winner || {};
  const accountId = w.accountId != null ? String(w.accountId).trim() : "";
  if (accountId) return "account:" + accountId;
  const userId = w.userId != null ? String(w.userId).trim() : "";
  if (userId) return "user:" + userId;
  return "";
}

function normalizeTelegramUsername(raw) {
  return String(raw || "").replace(/^@+/, "").trim().toLowerCase();
}

function raffleWinnerRowHasDrawShape(winner) {
  if (!winner || typeof winner !== "object") return false;
  if (winner.groupIndex != null && Number.isFinite(Number(winner.groupIndex))) return true;
  if (winner.prize != null && String(winner.prize).trim()) return true;
  return false;
}

function raffleWinnerSlotKey(winner) {
  return String((winner && winner.winnerReadySlotId) || "").trim();
}

function raffleWinnerPrizeKey(winner) {
  return String((winner && winner.prize) || "").trim();
}

function raffleWinnerGroupKey(winner) {
  return winner && winner.groupIndex != null ? String(winner.groupIndex) : "";
}

function raffleWinnerRowsReferToSameRecipient(a, b) {
  const ak = raffleWinnerRecipientKey(a);
  const bk = raffleWinnerRecipientKey(b);
  return !!(ak && bk && ak === bk);
}

function raffleWinnerRowsMatchStored(candidate, stored) {
  if (!candidate || !stored || typeof candidate !== "object" || typeof stored !== "object") return false;
  if (!raffleWinnerRowHasDrawShape(candidate) || !raffleWinnerRowHasDrawShape(stored)) return false;
  if (!raffleWinnerRowsReferToSameRecipient(candidate, stored)) return false;
  const candidateSlot = raffleWinnerSlotKey(candidate);
  const storedSlot = raffleWinnerSlotKey(stored);
  if (candidateSlot || storedSlot) return !!(candidateSlot && storedSlot && candidateSlot === storedSlot);
  const candidateGroup = raffleWinnerGroupKey(candidate);
  const storedGroup = raffleWinnerGroupKey(stored);
  if (candidateGroup && storedGroup && candidateGroup !== storedGroup) return false;
  const candidatePrize = raffleWinnerPrizeKey(candidate);
  const storedPrize = raffleWinnerPrizeKey(stored);
  if (candidatePrize && storedPrize && candidatePrize !== storedPrize) return false;
  return true;
}

function safeRaffleWinnerRowsForNotification(raffle) {
  const raw = Array.isArray(raffle && raffle.winners) ? raffle.winners : [];
  if (!raw.length) return [];
  const maxSlots = raffleExpectedWinnerSlots(raffle);
  if (maxSlots <= 0) return [];
  const source = raw.filter(raffleWinnerRowHasDrawShape);
  if (!source.length) return [];
  return maxSlots > 0 ? source.slice(0, maxSlots) : source;
}

function createRaffleNotificationService(options) {
  const opts = options && typeof options === "object" ? options : {};
  const BOT_TOKEN = opts.botToken || "";
  const ADMIN_IDS = Array.isArray(opts.adminIds) ? opts.adminIds : [];
  const MINI_APP_URL = opts.miniAppUrl || "";
  const RAFFLE_PREFIX = opts.rafflePrefix || "poker_app:raffle:";
  const redisPipeline = opts.redisPipeline;
  const workingAdminContacts = opts.workingAdminContacts;
  const sendWebPushToMember =
    typeof opts.sendWebPushToMember === "function"
      ? opts.sendWebPushToMember
      : async function () { return 0; };

  async function sendTelegramMessage(chatId, text) {
    if (!BOT_TOKEN || !chatId || !text) return { ok: false, error: "missing bot/params" };
    const url = "https://api.telegram.org/bot" + BOT_TOKEN + "/sendMessage";
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: String(chatId),
        text: String(text),
        disable_web_page_preview: true,
      }),
    }).then(function (r) {
      return r.ok ? { ok: true } : r.text().then(function (t) { return { ok: false, error: t }; }).catch(function () { return { ok: false }; });
    });
  }

  function winnerNotificationRecipientKeyPart(winner) {
    const w = winner || {};
    const accountId = w.accountId != null ? String(w.accountId).trim() : "";
    if (accountId) return accountId;
    const userId = w.userId != null ? String(w.userId).trim() : "";
    if (userId) return userId;
    return "";
  }

  function winnerNotificationSlotKeyPart(winner, fallbackIndex) {
    const w = winner || {};
    const slot =
      w.winnerReadySlotId != null
        ? String(w.winnerReadySlotId).trim()
        : w.winnerSlotId != null
          ? String(w.winnerSlotId).trim()
          : w.winnerTicketIndex != null
            ? "ticket_" + String(w.winnerTicketIndex).trim()
            : "";
    if (slot) return slot;
    const group = w.groupIndex != null ? "group_" + String(w.groupIndex).trim() : "";
    const prize = w.prize != null ? String(w.prize).trim() : "";
    if (group || prize) return [group, prize].filter(Boolean).join("_");
    return "winner_" + fallbackIndex;
  }

  function winnerNotificationKeyPart(winner, fallbackIndex, duplicateRecipientKeys) {
    const recipient = winnerNotificationRecipientKeyPart(winner);
    if (!recipient) return "winner_" + fallbackIndex;
    if (duplicateRecipientKeys && duplicateRecipientKeys.has(recipient)) {
      return recipient + ":" + winnerNotificationSlotKeyPart(winner, fallbackIndex);
    }
    return recipient;
  }

  function duplicateWinnerNotificationRecipients(winners) {
    const counts = new Map();
    (Array.isArray(winners) ? winners : []).forEach((winner) => {
      const key = winnerNotificationRecipientKeyPart(winner);
      if (!key) return;
      counts.set(key, (counts.get(key) || 0) + 1);
    });
    const dupes = new Set();
    counts.forEach((count, key) => {
      if (count > 1) dupes.add(key);
    });
    return dupes;
  }

  function winnerNotificationRedisKey(prefix, raffleId, winnerKey, channel) {
    return (
      prefix +
      safePushTagPart(raffleId) +
      ":" +
      safePushTagPart(winnerKey) +
      (channel ? ":" + safePushTagPart(channel) : "")
    );
  }

  async function claimWinnerNotificationLock(raffleId, winnerKey, channel) {
    if (!redisPipeline || !raffleId || !winnerKey) return true;
    const key = winnerNotificationRedisKey(RAFFLE_WINNER_NOTIFY_LOCK_PREFIX, raffleId, winnerKey, channel);
    try {
      const rows = await redisPipeline([["SET", key, "1", "EX", String(RAFFLE_WINNER_NOTIFY_LOCK_TTL_SECONDS), "NX"]]);
      return redisSetNxOk(rows && rows[0]);
    } catch (e) {
      return false;
    }
  }

  async function releaseWinnerNotificationLock(raffleId, winnerKey, channel) {
    if (!redisPipeline || !raffleId || !winnerKey) return false;
    const key = winnerNotificationRedisKey(RAFFLE_WINNER_NOTIFY_LOCK_PREFIX, raffleId, winnerKey, channel);
    try {
      await redisPipeline([["DEL", key]]);
      return true;
    } catch (e) {
      return false;
    }
  }

  async function hasWinnerChannelSent(raffleId, winnerKey, channel) {
    if (!redisPipeline || !raffleId || !winnerKey || !channel) return false;
    const key = winnerNotificationRedisKey(RAFFLE_WINNER_NOTIFY_SENT_PREFIX, raffleId, winnerKey, channel);
    try {
      const rows = await redisPipeline([["GET", key]]);
      return !!redisString(rows && rows[0]);
    } catch (e) {
      return false;
    }
  }

  async function markWinnerChannelSent(raffleId, winnerKey, channel) {
    if (!redisPipeline || !raffleId || !winnerKey || !channel) return false;
    const key = winnerNotificationRedisKey(RAFFLE_WINNER_NOTIFY_SENT_PREFIX, raffleId, winnerKey, channel);
    try {
      const rows = await redisPipeline([["SET", key, "1", "EX", String(RAFFLE_WINNER_NOTIFY_SENT_TTL_SECONDS)]]);
      return redisSetOk(rows && rows[0]);
    } catch (e) {
      return false;
    }
  }

  async function redisUsernameForUserId(userId) {
    if (!redisPipeline || !userId) return "";
    try {
      const rows = await redisPipeline([["HGET", USERNAMES_KEY, userId]]);
      return normalizeTelegramUsername(redisString(rows && rows[0]));
    } catch (e) {
      return "";
    }
  }

  async function findTelegramUserIdByUsername(username) {
    const target = normalizeTelegramUsername(username);
    if (!redisPipeline || !target) return "";
    try {
      const rows = await redisPipeline([["HGETALL", USERNAMES_KEY]]);
      const raw = rows && rows[0] ? rows[0].result : null;
      const pairs = [];
      if (Array.isArray(raw)) {
        for (let i = 0; i < raw.length; i += 2) pairs.push([raw[i], raw[i + 1]]);
      } else if (raw && typeof raw === "object") {
        Object.keys(raw).forEach((key) => pairs.push([key, raw[key]]));
      }
      for (const pair of pairs) {
        const userId = String(pair[0] || "").trim();
        if (!/^tg_\d+$/.test(userId)) continue;
        if (normalizeTelegramUsername(pair[1]) === target) return userId;
      }
    } catch (e) {}
    return "";
  }

  async function resolveWinnerNotificationIdentity(winner) {
    const w = winner || {};
    const uidRaw = w.userId != null ? String(w.userId).trim() : "";
    const explicitTelegramUserId = String(w.telegramUserId || w.telegram_user_id || "").trim();
    const explicitTelegramId = String(w.telegramId || w.telegram_id || "").trim();
    const explicitUsername = normalizeTelegramUsername(w.telegramUsername || w.telegram_username);
    if (/^tg_\d+$/.test(explicitTelegramUserId)) {
      return {
        telegramId: explicitTelegramUserId.replace(/^tg_/, ""),
        telegramUserId: explicitTelegramUserId,
        accountIdTrusted: true,
        reason: "winner_telegram_user_id",
      };
    }
    if (/^\d+$/.test(explicitTelegramUserId)) {
      return {
        telegramId: explicitTelegramUserId,
        telegramUserId: "tg_" + explicitTelegramUserId,
        accountIdTrusted: true,
        reason: "winner_telegram_user_id",
      };
    }
    if (/^\d+$/.test(explicitTelegramId)) {
      return {
        telegramId: explicitTelegramId,
        telegramUserId: "tg_" + explicitTelegramId,
        accountIdTrusted: true,
        reason: "winner_telegram_id",
      };
    }
    if (/^tg_\d+$/.test(uidRaw)) {
      return { telegramId: uidRaw.replace(/^tg_/, ""), telegramUserId: uidRaw, accountIdTrusted: true, reason: "direct_user_id" };
    }
    if (/^\d+$/.test(uidRaw)) {
      return { telegramId: uidRaw, telegramUserId: "tg_" + uidRaw, accountIdTrusted: true, reason: "numeric_user_id" };
    }
    if (explicitUsername) {
      const byUsername = await findTelegramUserIdByUsername(explicitUsername);
      if (byUsername) {
        return {
          telegramId: byUsername.replace(/^tg_/, ""),
          telegramUserId: byUsername,
          accountIdTrusted: false,
          reason: "telegram_username",
        };
      }
    }
    if (!redisPipeline) return { telegramId: "", telegramUserId: "", accountIdTrusted: false, reason: "no_redis" };
    const candidates = [];
    const accountId = w.accountId != null ? String(w.accountId).trim() : "";
    if (/^ID\d{6}$/.test(accountId)) candidates.push(accountId);
    if (/^ID\d{6}$/.test(uidRaw)) candidates.push(uidRaw);
    const unique = [...new Set(candidates.filter(Boolean))];
    if (!unique.length) return { telegramId: "", telegramUserId: "", accountIdTrusted: false, reason: "no_recipient" };
    try {
      const rows = await redisPipeline(unique.map((id) => ["HGET", ID_TO_USER_KEY, id]));
      for (let i = 0; i < unique.length; i++) {
        const mapped = redisString(rows && rows[i]);
        const mappedUserId = /^tg_\d+$/.test(mapped) ? mapped : /^\d+$/.test(mapped) ? "tg_" + mapped : "";
        if (!mappedUserId) continue;
        if (explicitUsername) {
          const mappedUsername = await redisUsernameForUserId(mappedUserId);
          if (mappedUsername && mappedUsername !== explicitUsername) continue;
        }
        return {
          telegramId: mappedUserId.replace(/^tg_/, ""),
          telegramUserId: mappedUserId,
          accountIdTrusted: true,
          reason: "account_id",
        };
      }
    } catch (e) {}
    return { telegramId: "", telegramUserId: "", accountIdTrusted: false, reason: explicitUsername ? "username_mismatch" : "not_found" };
  }

  async function markRaffleWinnersNotifiedAt(raffleId) {
    if (!redisPipeline || !raffleId) return false;
    try {
      const rows = await redisPipeline([[
        "SET",
        RAFFLE_WINNER_NOTIFY_AUDIT_PREFIX + safePushTagPart(raffleId),
        new Date().toISOString(),
        "EX",
        String(RAFFLE_WINNER_NOTIFY_SENT_TTL_SECONDS),
      ]]);
      return redisSetOk(rows && rows[0]);
    } catch (e) {
      return false;
    }
  }

  async function loadStoredRaffleForWinnerNotification(raffleId) {
    if (!redisPipeline || !raffleId) return null;
    try {
      const rows = await redisPipeline([["GET", RAFFLE_PREFIX + raffleId]]);
      const raw = redisString(rows && rows[0]);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch (e) {
      return null;
    }
  }

  async function confirmRaffleWinnerRowsBeforeNotification(raffleId, raffle, candidates) {
    const rows = Array.isArray(candidates) ? candidates : [];
    if (!rows.length) return { raffle: raffle || null, winners: [], blocked: 0, reason: "" };
    if (!redisPipeline || !raffleId) return { raffle: raffle || null, winners: rows, blocked: 0, reason: "no_redis_check" };
    const stored = await loadStoredRaffleForWinnerNotification(raffleId);
    if (!stored || !Array.isArray(stored.winners)) {
      return { raffle: stored || raffle || null, winners: [], blocked: rows.length, reason: "stored_raffle_not_drawn" };
    }
    const allowActiveBatchWinners = stored.status === "active" && Array.isArray(stored.resultBatches) && stored.resultBatches.some((batch) => batch && batch.drawnAt);
    if (stored.status !== "drawn" && !allowActiveBatchWinners) {
      return { raffle: stored || raffle || null, winners: [], blocked: rows.length, reason: "stored_raffle_not_drawn" };
    }
    const drawnBatchGroups = new Set();
    if (allowActiveBatchWinners) {
      stored.resultBatches.forEach((batch, index) => {
        if (!batch || !batch.drawnAt) return;
        const indexes = Array.isArray(batch.groupIndexes) ? batch.groupIndexes : [index];
        indexes.forEach((value) => {
          const n = parseInt(String(value), 10);
          if (Number.isFinite(n)) drawnBatchGroups.add(n);
        });
      });
    }
    const storedWinners = stored.winners;
    const usedIndexes = new Set();
    const confirmed = [];
    rows.forEach((candidate) => {
      let matchedIndex = -1;
      for (let i = 0; i < storedWinners.length; i += 1) {
        if (usedIndexes.has(i)) continue;
        if (!raffleWinnerRowsMatchStored(candidate, storedWinners[i])) continue;
        matchedIndex = i;
        break;
      }
      if (matchedIndex < 0) return;
      if (allowActiveBatchWinners) {
        const groupIndex = parseInt(String(storedWinners[matchedIndex] && storedWinners[matchedIndex].groupIndex != null ? storedWinners[matchedIndex].groupIndex : ""), 10);
        if (!Number.isFinite(groupIndex) || !drawnBatchGroups.has(groupIndex)) return;
      }
      usedIndexes.add(matchedIndex);
      confirmed.push(storedWinners[matchedIndex]);
    });
    return {
      raffle: stored,
      winners: confirmed,
      blocked: rows.length - confirmed.length,
      reason: confirmed.length === rows.length ? "" : "not_in_stored_winners",
    };
  }

  function uniqueWinnerPushMemberIds() {
    const seen = new Set();
    const ids = [];
    Array.prototype.slice.call(arguments).forEach((raw) => {
      const id = String(raw || "").trim();
      if (!id || id.startsWith("guest_") || id.startsWith("manual_") || seen.has(id)) return;
      seen.add(id);
      ids.push(id);
    });
    return ids;
  }

  async function sendWinnerWebPush(raffleId, raffle, accountId, uidRaw, title, prizeText, cashPrize, resolvedTelegramUserId, accountIdTrusted) {
    const memberIds = uniqueWinnerPushMemberIds(accountIdTrusted === false ? "" : accountId, uidRaw, resolvedTelegramUserId);
    for (const memberId of memberIds) {
      try {
        const pushed = await sendWebPushToMember(memberId, {
          title: "Вы выиграли розыгрыш",
          body: raffleWinnerPushBody(title, prizeText, cashPrize),
          tag: "poker-raffle-winner-" + safePushTagPart(raffleId) + "-" + safePushTagPart(memberId),
          openUrl: buildRaffleCompletedOpenUrl(raffle || raffleId),
          kind: "raffle_winner",
          raffleId: String(raffleId),
          accountId: accountId || (/^ID\d{6}$/.test(memberId) ? memberId : ""),
        });
        if (Number(pushed) > 0) return Number(pushed);
      } catch (ePush) {}
    }
    return 0;
  }

  async function notifyAdminsRaffleCompleted(raffle) {
    if (!BOT_TOKEN || !ADMIN_IDS.length) return;
    const title = (raffle.title || (raffle.groups && raffle.groups[0] && raffle.groups[0].prize) || "Розыгрыш").trim();
    const winnersCount = (raffle.winners && raffle.winners.length) || 0;
    const text =
      "🎲 Розыгрыш завершён.\n\n" +
      (title ? title + "\n\n" : "") +
      "Победителей: " + winnersCount +
      (raffle.drawnAt ? "\nВремя: " + new Date(raffle.drawnAt).toLocaleString("ru-RU", { timeZone: "Europe/Moscow" }) : "") +
      "\n\nРозыгрыш в приложении: " + buildRaffleCompletedLink(MINI_APP_URL, raffle);
    const url = "https://api.telegram.org/bot" + BOT_TOKEN + "/sendMessage";
    for (const adminId of ADMIN_IDS) {
      try {
        await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: String(adminId),
            text: text,
            disable_web_page_preview: true,
          }),
        });
      } catch (e) {}
    }
  }

  async function notifyWinnersRaffleCompleted(raffleId, raffle, candidateWinners) {
    try {
      if (!raffleId || !raffle) return;
      let winners = Array.isArray(candidateWinners) && candidateWinners.length
        ? candidateWinners.filter(raffleWinnerRowHasDrawShape)
        : safeRaffleWinnerRowsForNotification(raffle);
      if (winners.length === 0) {
        const rawWinnerCount = Array.isArray(raffle && raffle.winners) ? raffle.winners.length : 0;
        if (rawWinnerCount > 0) {
          try {
            console.warn("[raffles] winner notifications blocked by safe winner filter", {
              raffleId: String(raffleId || ""),
              rawWinnerCount,
              configuredWinnerSlots: raffleExpectedWinnerSlots(raffle),
            });
          } catch (eLog) {}
        }
        return;
      }
      const confirmed = await confirmRaffleWinnerRowsBeforeNotification(raffleId, raffle, winners);
      if (confirmed.blocked > 0) {
        try {
          console.warn("[raffles] winner notifications blocked by stored winner check", {
            raffleId: String(raffleId || ""),
            candidateWinnerCount: winners.length,
            confirmedWinnerCount: confirmed.winners.length,
            reason: confirmed.reason,
          });
        } catch (eLog) {}
      }
      if (!confirmed.winners.length) return;
      const raffleForMessage = confirmed.raffle || raffle;
      winners = confirmed.winners;

      const title = (raffleForMessage.title || (raffleForMessage.groups && raffleForMessage.groups[0] && raffleForMessage.groups[0].prize) || "Розыгрыш").trim();
      const raffleLink = buildRaffleCompletedLink(MINI_APP_URL, raffleForMessage || raffleId);
      const cashPrize = isCashRafflePrize(raffleForMessage);

      // Простое сообщение победителю. Детали приза берём из записи победителя (если она есть).
      var introText =
        "🎉 Вы выиграли розыгрыш в клубе «Два туза»!\n\n" +
        (title ? ("Розыгрыш: " + title + "\n\n") : "");
      var contactText =
        "Чтобы забрать выигрыш, подтвердите готовность в приложении:\n\n" +
        "1. Откройте этот завершённый розыгрыш: " + raffleLink + "\n" +
        "2. Рядом со своим ником нажмите кнопку «Я готов».\n\n" +
        "После этого админ увидит отметку «Готов» возле вашего ника и выдаст приз.";

      const duplicateRecipientKeys = duplicateWinnerNotificationRecipients(winners);
      for (let i = 0; i < winners.length; i++) {
        const w = winners[i] || {};
        const uidRaw = w.userId ? String(w.userId) : "";
        const accountId = w.accountId ? String(w.accountId).trim() : "";
        const pushMemberId = accountId || uidRaw;
        const prizeText = w.prize && String(w.prize).trim() ? String(w.prize).trim() : "";
        const notifyKey = winnerNotificationKeyPart(w, i, duplicateRecipientKeys);
        const recipient = await resolveWinnerNotificationIdentity(w);
        const pushAlreadySent = await hasWinnerChannelSent(raffleId, notifyKey, "push");
        const tgAlreadySent = await hasWinnerChannelSent(raffleId, notifyKey, "tg");
        if (pushMemberId && !pushMemberId.startsWith("guest_") && !pushAlreadySent) {
          const pushClaimed = await claimWinnerNotificationLock(raffleId, notifyKey, "push");
          if (pushClaimed) {
            const pushed = await sendWinnerWebPush(
              raffleId,
              raffleForMessage,
              accountId,
              uidRaw,
              title,
              prizeText,
              cashPrize,
              recipient.telegramUserId,
              recipient.accountIdTrusted
            );
            if (Number(pushed) > 0) await markWinnerChannelSent(raffleId, notifyKey, "push");
            else await releaseWinnerNotificationLock(raffleId, notifyKey, "push");
          }
        }
        if (!BOT_TOKEN || tgAlreadySent) continue;
        const tgClaimed = await claimWinnerNotificationLock(raffleId, notifyKey, "tg");
        if (!tgClaimed) continue;
        const telegramId = recipient.telegramId;
        if (!telegramId || !/^\d+$/.test(telegramId)) {
          try {
            console.warn("[raffles] winner Telegram notification skipped: recipient not resolved", {
              raffleId: String(raffleId || ""),
              notifyKey,
              winnerUserId: String(w.userId || ""),
              winnerAccountId: String(w.accountId || ""),
              winnerTelegramUsername: String(w.telegramUsername || w.telegram_username || ""),
              reason: recipient.reason || "",
            });
          } catch (eLog) {}
          await releaseWinnerNotificationLock(raffleId, notifyKey, "tg");
          continue;
        }
        const prizeLine = prizeText ? "\n\nПриз: " + prizeText : (cashPrize ? "\n\nПриз: беккинг-байин на кеш" : "");
        const text = introText + (prizeLine ? prizeLine.replace(/^\n\n/, "") + "\n\n" : "") + contactText;
        const sent = await sendTelegramMessage(telegramId, text);
        if (sent && sent.ok) await markWinnerChannelSent(raffleId, notifyKey, "tg");
        else await releaseWinnerNotificationLock(raffleId, notifyKey, "tg");
      }

      // Для истории розыгрыша оставляем отметку попытки; дедуп доставки живёт в отдельных Redis-ключах по каналам.
      await markRaffleWinnersNotifiedAt(raffleId);
    } catch (e) {
      try {
        console.error("[raffles] winner notification failed", {
          raffleId: String(raffleId || ""),
          error: e && e.message ? e.message : String(e || ""),
        });
      } catch (eLog) {}
    }
  }


  return {
    sendTelegramMessage,
    notifyAdminsRaffleCompleted,
    notifyWinnersRaffleCompleted,
  };
}

module.exports = {
  buildRaffleCompletedLink,
  buildRaffleCompletedOpenUrl,
  buildRaffleCompletedStartParam,
  buildRaffleWinnerAdminChatLink,
  createRaffleNotificationService,
  isHourInShift,
  moscowHourFromDate,
  resolveWorkingRaffleAdmin,
};

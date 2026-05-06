"use strict";

const {
  addDaily,
  dateKeyFromMs,
  msInRange,
  personalChatKey,
  redisSet,
  safeJson,
} = require("./player-crm-utils");

function createPlayerCrmChatStats(options) {
  const opts = options && typeof options === "object" ? options : {};
  const redisPipeline = opts.redisPipeline;
  const GENERAL_KEY = opts.generalKey || "poker_app:chat_messages";
  const CHAT_GROUP_MSG_PREFIX = opts.chatGroupMsgPrefix || "poker_app:chat_group_msgs:";
  const CRM_MANAGER_DIALOGS = Array.isArray(opts.managerDialogs) ? opts.managerDialogs : [];

  function parseMessageTimeMs(raw) {
    const msg = typeof raw === "string" ? safeJson(raw, null) : raw;
    const ms = Date.parse(String((msg && (msg.time || msg.at || msg.createdAt)) || ""));
    return Number.isFinite(ms) ? ms : NaN;
  }

  function parseMessage(raw) {
    const msg = typeof raw === "string" ? safeJson(raw, null) : raw;
    return msg && typeof msg === "object" ? msg : null;
  }

  function normalizeChatId(id) {
    const s = String(id || "").trim();
    if (!s) return "";
    if (s.startsWith("tg_")) return s;
    if (/^\d+$/.test(s)) return "tg_" + s;
    return s;
  }

  async function scanRedisKeys(pattern, limit = 1200) {
    const out = [];
    let cursor = "0";
    for (let i = 0; i < 20; i += 1) {
      const res = await redisPipeline([["SCAN", cursor, "MATCH", pattern, "COUNT", "500"]], { timeoutMs: 9000 });
      const row = res && res[0] ? res[0].result : null;
      if (!Array.isArray(row) || row.length < 2) break;
      cursor = String(row[0] || "0");
      const keys = Array.isArray(row[1]) ? row[1].map((x) => String(x)) : [];
      keys.forEach((key) => {
        if (out.length < limit) out.push(key);
      });
      if (cursor === "0" || out.length >= limit) break;
    }
    return out;
  }

  async function countListMessagesForRange(keys, range, maxMessagesPerList) {
    const listKeys = (Array.isArray(keys) ? keys : []).filter(Boolean);
    if (!listKeys.length) return { total: 0, period: 0, activeLists: 0 };
    const totalRows = await redisPipeline(listKeys.map((key) => ["LLEN", key]), { timeoutMs: 9000 });
    let total = 0;
    listKeys.forEach((key, idx) => {
      const n = totalRows && totalRows[idx] ? Number(totalRows[idx].result) || 0 : 0;
      total += n;
    });
    if (!range) return { total, period: 0, activeLists: 0 };
    const stop = String(Math.max(0, Number(maxMessagesPerList) || 499));
    const rawRows = await redisPipeline(listKeys.map((key) => ["LRANGE", key, "0", stop]), { timeoutMs: 12000 });
    let period = 0;
    let activeLists = 0;
    listKeys.forEach((key, idx) => {
      const rows = rawRows && rawRows[idx] && Array.isArray(rawRows[idx].result) ? rawRows[idx].result : [];
      const count = rows.reduce((sum, raw) => sum + (msInRange(parseMessageTimeMs(raw), range) ? 1 : 0), 0);
      period += count;
      if (count > 0) activeLists += 1;
    });
    return { total, period, activeLists };
  }

  function emptyListMessageStats() {
    return { total: 0, period: 0, activeLists: 0 };
  }

  function emptyDialogStats(label) {
    return { label, total: 0, period: 0, messagesTotal: 0, messagesPeriod: 0, dialogs: [] };
  }

  function emptyChatStats() {
    const managerDialogs = {};
    CRM_MANAGER_DIALOGS.forEach((manager) => {
      managerDialogs[manager.key] = emptyDialogStats(manager.label);
    });
    managerDialogs.other = emptyDialogStats("Все остальные диалоги");
    return {
      generalMessages: { total: 0, period: 0, authors: [] },
      personalDialogs: { total: 0, period: 0, messagesTotal: 0, messagesPeriod: 0 },
      groupChats: { total: 0, period: 0, messagesTotal: 0, messagesPeriod: 0 },
      managerDialogs,
    };
  }

  async function countGeneralChatAuthors(range, ctx) {
    try {
      const rows = await redisPipeline([["LRANGE", GENERAL_KEY, "0", "1999"]], { timeoutMs: 12000 });
      const rawRows = rows && rows[0] && Array.isArray(rows[0].result) ? rows[0].result : [];
      const byAuthor = new Map();
      rawRows
        .map(parseMessage)
        .filter(Boolean)
        .filter((msg) => !range || msInRange(parseMessageTimeMs(msg), range))
        .forEach((msg) => {
          const id = normalizeChatId(msg.from || msg.userId || msg.senderId || "");
          const key = id || "unknown";
          const prev = byAuthor.get(key) || {
            id: key,
            name: "",
            handle: "",
            count: 0,
          };
          prev.count += 1;
          if (!prev.name) prev.name = String(msg.fromName || msg.name || "").trim();
          byAuthor.set(key, prev);
        });
      return Array.from(byAuthor.values())
        .map((row) => {
          const name = row.name || (row.id !== "unknown" ? participantLabel(row.id, ctx) : "Неизвестно");
          return {
            id: row.id,
            name,
            handle: row.id !== "unknown" ? row.id : "",
            count: row.count,
          };
        })
        .sort((a, b) => b.count - a.count || String(a.name).localeCompare(String(b.name), "ru"));
    } catch (e) {
      return [];
    }
  }

  async function countManagerDialogStats(manager, range, ctx) {
    const safeCtx = ctx && typeof ctx === "object" ? ctx : {};
    const usernames = safeCtx.usernames || {};
    const displayNames = safeCtx.displayNames || {};
    const dtIds = safeCtx.dtIds || {};
    const partnerRes = await redisPipeline([["SMEMBERS", "poker_app:chat_partners:" + manager.id]], { timeoutMs: 9000 });
    const partners = Array.from(redisSet(partnerRes && partnerRes[0] && partnerRes[0].result))
      .filter((id) => id && id !== manager.id)
      .slice(0, 1600);
    const dialogKeys = partners.map((id) => personalChatKey(manager.id, id));
    if (!dialogKeys.length) {
      return { label: manager.label, total: 0, period: 0, messagesTotal: 0, messagesPeriod: 0, dialogs: [] };
    }
    const totalRows = await redisPipeline(dialogKeys.map((key) => ["LLEN", key]), { timeoutMs: 9000 });
    const messageLimit = range ? "499" : "79";
    const rawRows = await redisPipeline(dialogKeys.map((key) => ["LRANGE", key, "0", messageLimit]), { timeoutMs: 12000 });
    let messagesTotal = 0;
    let messagesPeriod = 0;
    let periodDialogs = 0;
    const dialogs = partners.map((partnerId, idx) => {
      const totalMessages = totalRows && totalRows[idx] ? Number(totalRows[idx].result) || 0 : 0;
      const rows = rawRows && rawRows[idx] && Array.isArray(rawRows[idx].result) ? rawRows[idx].result : [];
      const periodMessages = range
        ? rows.reduce((sum, raw) => sum + (msInRange(parseMessageTimeMs(raw), range) ? 1 : 0), 0)
        : totalMessages;
      const messageRows = rows
        .map(parseMessage)
        .filter(Boolean)
        .filter((msg) => !range || msInRange(parseMessageTimeMs(msg), range))
        .slice(0, 80)
        .reverse()
        .map((msg) => ({
          id: String(msg.id || ""),
          from: String(msg.from || ""),
          fromName: String(msg.fromName || "").trim(),
          text: String(msg.text || "").slice(0, 900),
          time: String(msg.time || msg.at || msg.createdAt || ""),
          image: !!msg.image,
          voice: !!msg.voice,
          document: !!msg.document,
          documentName: String(msg.documentName || ""),
        }));
      messagesTotal += totalMessages;
      messagesPeriod += periodMessages;
      if (periodMessages > 0) periodDialogs += 1;
      const dtId = dtIds[partnerId] || "";
      const username = usernames[partnerId] ? "@" + String(usernames[partnerId]).replace(/^@+/, "").trim() : "";
      const name = String(displayNames[partnerId] || (dtId && displayNames[dtId]) || username || dtId || partnerId).trim();
      return {
        id: partnerId,
        dtId,
        name,
        handle: username,
        totalMessages,
        periodMessages,
        messages: messageRows,
      };
    }).sort((a, b) => b.periodMessages - a.periodMessages || b.totalMessages - a.totalMessages || String(a.name).localeCompare(String(b.name), "ru"));
    return {
      label: manager.label,
      total: partners.length,
      period: range ? periodDialogs : partners.length,
      messagesTotal,
      messagesPeriod: range ? messagesPeriod : messagesTotal,
      dialogs,
    };
  }

  function participantLabel(id, ctx) {
    const safeCtx = ctx && typeof ctx === "object" ? ctx : {};
    const usernames = safeCtx.usernames || {};
    const displayNames = safeCtx.displayNames || {};
    const dtIds = safeCtx.dtIds || {};
    const username = usernames[id] ? "@" + String(usernames[id]).replace(/^@+/, "").trim() : "";
    const dtId = dtIds[id] || "";
    return String(displayNames[id] || (dtId && displayNames[dtId]) || username || dtId || id).trim();
  }

  async function countOtherDialogStats(personalListKeys, range, ctx) {
    const managerIds = new Set(CRM_MANAGER_DIALOGS.map((m) => String(m.id || "").replace(/^tg_/, "")));
    const dialogsMeta = (personalListKeys || [])
      .map((key) => {
        const match = String(key || "").match(/^poker_app:chat:([^_]+)_([^_]+)$/);
        if (!match) return null;
        const left = String(match[1] || "");
        const right = String(match[2] || "");
        if (!left || !right || managerIds.has(left) || managerIds.has(right)) return null;
        return { key, left: "tg_" + left.replace(/^tg_/, ""), right: "tg_" + right.replace(/^tg_/, "") };
      })
      .filter(Boolean)
      .slice(0, 1600);
    if (!dialogsMeta.length) {
      return { label: "Все остальные диалоги", total: 0, period: 0, messagesTotal: 0, messagesPeriod: 0, dialogs: [] };
    }
    const totalRows = await redisPipeline(dialogsMeta.map((row) => ["LLEN", row.key]), { timeoutMs: 9000 });
    const messageLimit = range ? "499" : "79";
    const rawRows = await redisPipeline(dialogsMeta.map((row) => ["LRANGE", row.key, "0", messageLimit]), { timeoutMs: 12000 });
    let messagesTotal = 0;
    let messagesPeriod = 0;
    let periodDialogs = 0;
    const dialogs = dialogsMeta.map((meta, idx) => {
      const totalMessages = totalRows && totalRows[idx] ? Number(totalRows[idx].result) || 0 : 0;
      const rows = rawRows && rawRows[idx] && Array.isArray(rawRows[idx].result) ? rawRows[idx].result : [];
      const periodMessages = range
        ? rows.reduce((sum, raw) => sum + (msInRange(parseMessageTimeMs(raw), range) ? 1 : 0), 0)
        : totalMessages;
      const messageRows = rows
        .map(parseMessage)
        .filter(Boolean)
        .filter((msg) => !range || msInRange(parseMessageTimeMs(msg), range))
        .slice(0, 80)
        .reverse()
        .map((msg) => ({
          id: String(msg.id || ""),
          from: normalizeChatId(msg.from || ""),
          fromName: String(msg.fromName || "").trim(),
          text: String(msg.text || "").slice(0, 900),
          time: String(msg.time || msg.at || msg.createdAt || ""),
          image: !!msg.image,
          voice: !!msg.voice,
          document: !!msg.document,
          documentName: String(msg.documentName || ""),
        }));
      messagesTotal += totalMessages;
      messagesPeriod += periodMessages;
      if (periodMessages > 0) periodDialogs += 1;
      const leftName = participantLabel(meta.left, ctx);
      const rightName = participantLabel(meta.right, ctx);
      return {
        id: meta.left + "__" + meta.right,
        name: leftName + " — " + rightName,
        handle: "",
        dtId: "",
        totalMessages,
        periodMessages,
        messages: messageRows,
      };
    }).sort((a, b) => b.periodMessages - a.periodMessages || b.totalMessages - a.totalMessages || String(a.name).localeCompare(String(b.name), "ru"));
    return {
      label: "Все остальные диалоги",
      total: dialogsMeta.length,
      period: range ? periodDialogs : dialogsMeta.length,
      messagesTotal,
      messagesPeriod: range ? messagesPeriod : messagesTotal,
      dialogs,
    };
  }

  async function computeChatStats(range, ctx) {
    const [general, generalAuthors, personalKeys, groupKeys] = await Promise.all([
      countListMessagesForRange([GENERAL_KEY], range, 999).catch(() => emptyListMessageStats()),
      countGeneralChatAuthors(range, ctx).catch(() => []),
      scanRedisKeys("poker_app:chat:*", 1600).catch(() => []),
      scanRedisKeys(CHAT_GROUP_MSG_PREFIX + "*", 1200).catch(() => []),
    ]);
    const personalListKeys = personalKeys.filter((key) => !String(key).startsWith(CHAT_GROUP_MSG_PREFIX));
    const [personal, groups] = await Promise.all([
      countListMessagesForRange(personalListKeys, range, 499).catch(() => emptyListMessageStats()),
      countListMessagesForRange(groupKeys, range, 499).catch(() => emptyListMessageStats()),
    ]);
    const managerDialogs = {};
    await Promise.all([
      ...CRM_MANAGER_DIALOGS.map(async (manager) => {
        managerDialogs[manager.key] = await countManagerDialogStats(manager, range, ctx).catch(() => emptyDialogStats(manager.label));
      }),
      (async () => {
        managerDialogs.other = await countOtherDialogStats(personalListKeys, range, ctx).catch(() =>
          emptyDialogStats("Все остальные диалоги")
        );
      })(),
    ]);
    return {
      generalMessages: {
        total: general.total,
        period: range ? general.period : general.total,
        authors: generalAuthors,
      },
      personalDialogs: {
        total: personalListKeys.length,
        period: range ? personal.activeLists : personalListKeys.length,
        messagesTotal: personal.total,
        messagesPeriod: range ? personal.period : personal.total,
      },
      groupChats: {
        total: groupKeys.length,
        period: range ? groups.activeLists : groupKeys.length,
        messagesTotal: groups.total,
        messagesPeriod: range ? groups.period : groups.total,
      },
      managerDialogs,
    };
  }

  async function safeComputeChatStats(range, ctx) {
    try {
      return await computeChatStats(range, ctx);
    } catch (e) {
      return emptyChatStats();
    }
  }


  async function countGeneralMessagesByDay() {
    try {
      const rows = await redisPipeline([["LRANGE", GENERAL_KEY, "0", "1999"]], { timeoutMs: 12000 });
      const rawRows = rows && rows[0] && Array.isArray(rows[0].result) ? rows[0].result : [];
      const out = {};
      rawRows.map(parseMessage).filter(Boolean).forEach((msg) => {
        addDaily(out, dateKeyFromMs(parseMessageTimeMs(msg)), 1);
      });
      return out;
    } catch (e) {
      return {};
    }
  }


  return {
    safeComputeChatStats,
    countGeneralMessagesByDay,
  };
}

module.exports = { createPlayerCrmChatStats };

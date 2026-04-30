#!/usr/bin/env node
"use strict";

const assert = require("assert");
const path = require("path");

const root = path.join(__dirname, "..");
const BOT_TOKEN = "contract-test-bot-token";

process.env.UPSTASH_REDIS_REST_URL = "https://mock-redis.local";
process.env.UPSTASH_REDIS_REST_TOKEN = "mock-token";
process.env.TELEGRAM_BOT_TOKEN = BOT_TOKEN;
process.env.TELEGRAM_ADMIN_ID = "388008256";
process.env.CLUB_CHAT_REQUIRE_APPLICATION = "0";
process.env.NODE_ENV = "test";

class MemoryRedis {
  constructor() {
    this.kv = new Map();
    this.hash = new Map();
    this.sets = new Map();
    this.zsets = new Map();
    this.lists = new Map();
  }

  h(key) {
    if (!this.hash.has(key)) this.hash.set(key, new Map());
    return this.hash.get(key);
  }

  s(key) {
    if (!this.sets.has(key)) this.sets.set(key, new Set());
    return this.sets.get(key);
  }

  z(key) {
    if (!this.zsets.has(key)) this.zsets.set(key, new Map());
    return this.zsets.get(key);
  }

  l(key) {
    if (!this.lists.has(key)) this.lists.set(key, []);
    return this.lists.get(key);
  }

  result(value) {
    return { result: value };
  }

  exec(command) {
    const cmd = String(command[0] || "").toUpperCase();
    const key = command[1] != null ? String(command[1]) : "";
    if (cmd === "GET") return this.result(this.kv.has(key) ? this.kv.get(key) : null);
    if (cmd === "SET") {
      this.kv.set(key, String(command[2] == null ? "" : command[2]));
      return this.result("OK");
    }
    if (cmd === "DEL") {
      let n = 0;
      for (let i = 1; i < command.length; i += 1) {
        const k = String(command[i]);
        if (this.kv.delete(k)) n += 1;
        if (this.hash.delete(k)) n += 1;
        if (this.sets.delete(k)) n += 1;
        if (this.zsets.delete(k)) n += 1;
        if (this.lists.delete(k)) n += 1;
      }
      return this.result(n);
    }
    if (cmd === "HGET") return this.result(this.h(key).has(String(command[2])) ? this.h(key).get(String(command[2])) : null);
    if (cmd === "HSET") {
      const h = this.h(key);
      let count = 0;
      for (let i = 2; i < command.length; i += 2) {
        const field = String(command[i]);
        if (!h.has(field)) count += 1;
        h.set(field, String(command[i + 1] == null ? "" : command[i + 1]));
      }
      return this.result(count);
    }
    if (cmd === "HDEL") {
      const h = this.h(key);
      let count = 0;
      for (let i = 2; i < command.length; i += 1) if (h.delete(String(command[i]))) count += 1;
      return this.result(count);
    }
    if (cmd === "HINCRBY") {
      const h = this.h(key);
      const field = String(command[2]);
      const next = (parseInt(h.get(field) || "0", 10) || 0) + (parseInt(command[3], 10) || 0);
      h.set(field, String(next));
      return this.result(next);
    }
    if (cmd === "HGETALL") {
      const out = [];
      for (const [field, value] of this.h(key).entries()) out.push(field, value);
      return this.result(out);
    }
    if (cmd === "HMGET") {
      const h = this.h(key);
      return this.result(command.slice(2).map((field) => h.has(String(field)) ? h.get(String(field)) : null));
    }
    if (cmd === "LPUSH") {
      const l = this.l(key);
      for (let i = 2; i < command.length; i += 1) l.unshift(String(command[i]));
      return this.result(l.length);
    }
    if (cmd === "RPUSH") {
      const l = this.l(key);
      for (let i = 2; i < command.length; i += 1) l.push(String(command[i]));
      return this.result(l.length);
    }
    if (cmd === "LRANGE") {
      const l = this.l(key);
      let start = parseInt(command[2], 10) || 0;
      let stop = parseInt(command[3], 10);
      if (start < 0) start = l.length + start;
      if (stop < 0) stop = l.length + stop;
      return this.result(l.slice(Math.max(0, start), stop + 1));
    }
    if (cmd === "LTRIM") {
      const l = this.l(key);
      let start = parseInt(command[2], 10) || 0;
      let stop = parseInt(command[3], 10);
      if (start < 0) start = l.length + start;
      if (stop < 0) stop = l.length + stop;
      this.lists.set(key, l.slice(Math.max(0, start), stop + 1));
      return this.result("OK");
    }
    if (cmd === "LINDEX") {
      const l = this.l(key);
      let idx = parseInt(command[2], 10) || 0;
      if (idx < 0) idx = l.length + idx;
      return this.result(l[idx] == null ? null : l[idx]);
    }
    if (cmd === "LSET") {
      const l = this.l(key);
      let idx = parseInt(command[2], 10) || 0;
      if (idx < 0) idx = l.length + idx;
      if (idx < 0 || idx >= l.length) return { error: "index out of range" };
      l[idx] = String(command[3]);
      return this.result("OK");
    }
    if (cmd === "LREM") {
      const l = this.l(key);
      const value = String(command[3]);
      const before = l.length;
      this.lists.set(key, l.filter((item) => item !== value));
      return this.result(before - this.lists.get(key).length);
    }
    if (cmd === "LPOS") {
      const idx = this.l(key).indexOf(String(command[2]));
      return this.result(idx >= 0 ? idx : null);
    }
    if (cmd === "LLEN") return this.result(this.l(key).length);
    if (cmd === "SADD") {
      const s = this.s(key);
      let count = 0;
      for (let i = 2; i < command.length; i += 1) {
        const size = s.size;
        s.add(String(command[i]));
        if (s.size > size) count += 1;
      }
      return this.result(count);
    }
    if (cmd === "SREM") {
      const s = this.s(key);
      let count = 0;
      for (let i = 2; i < command.length; i += 1) if (s.delete(String(command[i]))) count += 1;
      return this.result(count);
    }
    if (cmd === "SISMEMBER") return this.result(this.s(key).has(String(command[2])) ? 1 : 0);
    if (cmd === "SMEMBERS") return this.result(Array.from(this.s(key)));
    if (cmd === "ZADD") {
      this.z(key).set(String(command[3]), Number(command[2]) || 0);
      return this.result(1);
    }
    if (cmd === "ZSCORE") {
      const z = this.z(key);
      return this.result(z.has(String(command[2])) ? String(z.get(String(command[2]))) : null);
    }
    return this.result(null);
  }

  pipeline(commands) {
    return commands.map((command) => this.exec(command));
  }
}

function installFetch(redis) {
  global.fetch = async function fetchMock(url, opts) {
    const u = String(url || "");
    if (u.includes("mock-redis.local")) {
      const body = opts && opts.body ? JSON.parse(opts.body) : [];
      const payload = u.endsWith("/pipeline") ? redis.pipeline(body) : { result: null };
      return {
        ok: true,
        async json() { return payload; },
        async text() { return JSON.stringify(payload); },
      };
    }
    return {
      ok: true,
      async json() { return { ok: true, result: true }; },
      async text() { return JSON.stringify({ ok: true }); },
    };
  };
}

function clearProjectRequireCache() {
  const prefix = root + path.sep;
  Object.keys(require.cache).forEach((file) => {
    if (file.startsWith(prefix) && !file.endsWith(path.join("scripts", "contract-tests.js"))) {
      delete require.cache[file];
    }
  });
}

function req(method, query, body, headers) {
  return {
    method,
    query: query || {},
    body: body == null ? undefined : body,
    headers: Object.assign({ host: "contract.test", "x-forwarded-for": "10.0.0.1" }, headers || {}),
  };
}

function res() {
  const out = {
    statusCode: 200,
    headers: {},
    body: undefined,
    ended: false,
    setHeader(name, value) { this.headers[name.toLowerCase()] = value; },
    status(code) { this.statusCode = code; return this; },
    json(payload) { this.body = payload; this.ended = true; return this; },
    end(payload) { this.body = payload; this.ended = true; return this; },
  };
  return out;
}

function loadHandler(name) {
  clearProjectRequireCache();
  return require(path.join(root, "lib", "api-handlers", name + ".js"));
}

function sessions() {
  const { signPwaSession } = require(path.join(root, "lib", "poker-pwa-session"));
  return {
    user: signPwaSession({ id: 1001, username: "player", first_name: "Player" }, BOT_TOKEN),
    peer: signPwaSession({ id: 1002, username: "peer", first_name: "Peer" }, BOT_TOKEN),
    admin: signPwaSession({ id: 388008256, username: "admin", first_name: "Admin" }, BOT_TOKEN),
    adminSecondary: signPwaSession({ id: 2144406710, username: "admin_two", first_name: "Admin Two" }, BOT_TOKEN),
  };
}

async function call(handler, request) {
  const response = res();
  await handler(request, response);
  return response;
}

async function testAuthAndAdmin(redis) {
  const chat = loadHandler("chat");
  let r = await call(chat, req("POST", {}, { text: "no auth" }));
  assert.strictEqual(r.statusCode, 401, "chat write requires auth");

  const raffles = loadHandler("raffles");
  const s = sessions();
  r = await call(raffles, req("POST", {}, { pwaSession: s.user, action: "create", title: "X" }));
  assert.strictEqual(r.statusCode, 403, "raffle create is admin-only");

  r = await call(raffles, req("POST", {}, {
    pwaSession: s.admin,
    action: "create",
    title: "Admin raffle",
    totalWinners: 1,
    groups: [{ prize: "Ticket", count: 1 }],
    endDate: new Date(Date.now() + 3600_000).toISOString(),
    idemKey: "contract-create",
  }));
  assert.strictEqual(r.statusCode, 200, "admin can create raffle");
  assert.ok(r.body && r.body.ok && r.body.raffle && r.body.raffle.id, "create returns raffle");

  r = await call(raffles, req("POST", {}, {
    pwaSession: s.adminSecondary,
    action: "create",
    title: "Second admin raffle",
    totalWinners: 1,
    groups: [{ prize: "Ticket", count: 1 }],
    endDate: new Date(Date.now() + 3600_000).toISOString(),
    idemKey: "contract-create-secondary-admin",
  }));
  assert.strictEqual(r.statusCode, 200, "secondary known admin can create raffle");

  const plannerAccess = require(path.join(root, "lib", "gazette-planner-access"));
  assert.strictEqual(
    plannerAccess.isGazettePlannerEditor({ id: 2144406710, telegramUsername: "", pwaUsername: null }),
    true,
    "secondary known admin can use gazette planner",
  );
  assert.strictEqual(
    plannerAccess.isGazettePlannerEditor({ id: 0, telegramUsername: "roman1787443", pwaUsername: null }),
    true,
    "roman1787443 can use shared gazette planner",
  );
  assert.strictEqual(
    plannerAccess.isGazettePlannerEditor({ id: 0, telegramUsername: "polyapineapple", pwaUsername: null }),
    true,
    "polyapineapple can use solo gazette planner",
  );
  assert.strictEqual(
    plannerAccess.isGazettePlannerEditor({ id: 0, telegramUsername: "unknown_player", pwaUsername: null }),
    false,
    "unknown user cannot use gazette planner",
  );
  const apiAuth = require(path.join(root, "lib", "api-auth"));
  assert.strictEqual(apiAuth.isAdminUsername("roman1_matvienko"), true, "roman1 username is admin");
  assert.strictEqual(apiAuth.isAdminUsername("roman1787443"), false, "editor username is not full admin");
  assert.strictEqual(apiAuth.isAdminEmail("matvienkoro92@gmail.com"), true, "roman1 email is admin");
  assert.strictEqual(apiAuth.isAdminEmail("other@example.com"), false, "unknown email is not admin");
  assert.strictEqual(
    apiAuth.isAdminIdentity({ id: 0, pwaUsername: "roman1_matvienko", adminAccess: false }, "mail_ID000001"),
    true,
    "admin username grants API admin identity",
  );
  assert.strictEqual(
    apiAuth.isAdminIdentity({ id: 0, pwaUsername: "player", adminAccess: false }, "mail_ID000002"),
    false,
    "unknown identity is not admin",
  );
  const pwa = require(path.join(root, "lib", "poker-pwa-session"));
  const adminToken = pwa.signPwaSession({ id: 0, memberId: "mail_ID000001", username: "", adminAccess: true }, BOT_TOKEN);
  assert.strictEqual(pwa.verifyPwaSessionToken(adminToken, BOT_TOKEN).adminAccess, true, "pwa session carries admin access");
}

async function testChatSendEditDelete() {
  const chat = loadHandler("chat");
  const s = sessions();
  let r = await call(chat, req("POST", {}, { pwaSession: s.user, with: "tg_1002", text: "hello peer" }));
  assert.strictEqual(r.statusCode, 200, "chat DM send succeeds");
  assert.ok(r.body && r.body.message && r.body.message.id, "send returns message");
  const messageId = r.body.message.id;

  r = await call(chat, req("PATCH", {}, { pwaSession: s.user, action: "edit", with: "tg_1002", messageId, text: "edited text" }));
  assert.strictEqual(r.statusCode, 200, "chat edit succeeds");
  assert.strictEqual(r.body.message.text, "edited text", "edit updates message text");
  assert.strictEqual(r.body.message.edited, true, "edit marks message");

  r = await call(chat, req("DELETE", {}, { pwaSession: s.user, with: "tg_1002", messageId }));
  assert.strictEqual(r.statusCode, 200, "chat delete succeeds");
  assert.strictEqual(r.body.deleted, true, "delete returns deleted flag");
}

async function testRaffleJoinLeave(redis) {
  const raffles = loadHandler("raffles");
  const s = sessions();
  const raffle = {
    id: "contract_raffle",
    title: "Contract raffle",
    totalWinners: 1,
    groups: [{ prize: "Ticket", count: 1 }],
    endDate: new Date(Date.now() + 3600_000).toISOString(),
    participants: [],
    winners: [],
    status: "active",
    createdAt: new Date().toISOString(),
  };
  redis.kv.set("poker_app:raffle:contract_raffle", JSON.stringify(raffle));
  redis.l("poker_app:raffle_ids").push("contract_raffle");
  redis.h("poker_app:visitor_p21_ids").set("ID100001", "P21-1001");
  redis.h("poker_app:visitor_dt_ids").set("tg_1001", "ID100001");
  redis.h("poker_app:id_to_user").set("ID100001", "tg_1001");

  let r = await call(raffles, req("POST", {}, { pwaSession: s.user, action: "join", raffleId: "contract_raffle", deviceId: "dev-1" }));
  assert.strictEqual(r.statusCode, 200, "raffle join succeeds");
  assert.strictEqual(r.body.raffle.participants.length, 1, "join adds participant");
  assert.strictEqual(r.body.raffle.participants[0].accountId, "ID100001", "join stores account id");

  r = await call(raffles, req("POST", {}, { pwaSession: s.user, action: "leave", raffleId: "contract_raffle" }));
  assert.strictEqual(r.statusCode, 200, "raffle leave succeeds");
  assert.strictEqual(r.body.raffle.participants.length, 0, "leave removes participant");
}

async function testRespectVoteWithdraw(redis) {
  const respect = loadHandler("respect");
  const s = sessions();
  redis.h("poker_app:visitor_dt_ids").set("tg_1001", "ID100001");
  redis.h("poker_app:id_to_user").set("ID100001", "tg_1001");
  redis.h("poker_app:visitor_dt_ids").set("tg_1002", "ID100002");
  redis.h("poker_app:id_to_user").set("ID100002", "tg_1002");

  let r = await call(respect, req("POST", {}, { pwaSession: s.user, targetUserId: "tg_1002", action: "up" }));
  assert.strictEqual(r.statusCode, 200, "respect up succeeds");
  assert.strictEqual(r.body.score, 1, "respect up increments");
  assert.strictEqual(r.body.myVote, "up", "respect stores up vote");

  r = await call(respect, req("POST", {}, { pwaSession: s.user, targetUserId: "tg_1002", action: "withdraw" }));
  assert.strictEqual(r.statusCode, 200, "respect withdraw succeeds");
  assert.strictEqual(r.body.score, 0, "withdraw reverts score");
  assert.strictEqual(r.body.myVote, null, "withdraw clears vote");
}

async function testProfileUserLookup(redis) {
  const users = loadHandler("users");
  const s = sessions();
  redis.h("poker_app:visitor_dt_ids").set("tg_1001", "ID100001");
  redis.h("poker_app:id_to_user").set("ID100001", "tg_1001");
  redis.h("poker_app:visitor_dt_ids").set("tg_1002", "ID100002");
  redis.h("poker_app:id_to_user").set("ID100002", "tg_1002");
  redis.h("poker_app:visitor_usernames").set("tg_1002", "peer");
  redis.h("poker_app:visitor_personal").set("ID100002", "public bio");
  redis.h("poker_app:visitor_chat_display_names").set("ID100002", "Peer Display");
  redis.h("poker_app:pokerplus_user_ids").set("ID100002", "P21-1002");

  let r = await call(users, req("GET", { pwaSession: s.user, userId: "ID100002" }));
  assert.strictEqual(r.statusCode, 200, "profile user lookup succeeds");
  assert.strictEqual(r.body.userId, "ID100002", "lookup returns dt id");
  assert.strictEqual(r.body.chatUserId, "tg_1002", "lookup resolves chat user id");
  assert.strictEqual(r.body.userName, "@peer", "lookup returns username");
  assert.strictEqual(r.body.p21Id, "P21-1002", "lookup returns PokerPlus id");
  assert.strictEqual(r.body.chatDisplayName, "Peer Display", "lookup returns display name");
}

async function testChatCoreInvariants() {
  const core = require(path.join(root, "lib", "chat-core.js"));
  const storage = require(path.join(root, "lib", "chat-storage.js"));
  const access = require(path.join(root, "lib", "chat-access.js"));
  const groups = require(path.join(root, "lib", "chat-groups.js"));
  const groupMembers = require(path.join(root, "lib", "chat-group-members.js"));
  const messageEnrichment = require(path.join(root, "lib", "chat-message-enrichment.js"));
  const pagination = require(path.join(root, "lib", "chat-pagination.js"));
  const threadStore = require(path.join(root, "lib", "chat-thread-store.js"));
  const unread = require(path.join(root, "lib", "chat-unread.js"));
  const notifications = require(path.join(root, "lib", "chat-notifications.js"));

  assert.strictEqual(core.isGroupChatId("group_abcdefgh"), true, "valid group id is accepted");
  assert.strictEqual(core.isGroupChatId("group_short"), false, "short group id is rejected");
  assert.strictEqual(core.normalizePeerChatUserId("1001"), "tg_1001", "numeric peer becomes tg id");
  assert.strictEqual(core.normalizePeerChatUserId("tg_1001"), "tg_1001", "tg peer stays stable");
  assert.strictEqual(core.normalizePeerChatUserId("vk_99"), "vk_99", "vk peer stays stable");
  assert.strictEqual(core.normalizePeerChatUserId("tg_roman"), "tg_388008256", "roman alias is normalized");
  assert.strictEqual(core.normalizeStoredMessageFromId("1001"), "tg_1001", "legacy message sender becomes tg id");
  assert.strictEqual(core.normalizeStoredMessageFromId("guest_1"), "guest_1", "guest sender stays stable");
  assert.strictEqual(core.convKey("tg_2", "tg_10"), "poker_app:chat:10_2", "conversation key preserves old lexical order");
  assert.strictEqual(
    core.chatMessageIsNewerThanLastViewed("2026-01-01T00:00:01.000Z", "2026-01-01T00:00:00Z"),
    true,
    "newer message beats cursor",
  );
  assert.strictEqual(
    core.mergeReadCursors("2026-01-01T00:00:00Z", "2026-01-01T00:00:01.000Z"),
    "2026-01-01T00:00:01.000Z",
    "newer cursor wins",
  );
  assert.strictEqual(storage.groupMetaKey("group_abcdefgh"), "poker_app:chat_group_meta:group_abcdefgh", "group meta key is stable");
  assert.strictEqual(storage.groupMsgsKey("group_abcdefgh"), "poker_app:chat_group_msgs:group_abcdefgh", "group message key is stable");
  assert.strictEqual(storage.userChatGroupsKey("tg_1001"), "poker_app:user_chat_groups:tg_1001", "user group index key is stable");
  assert.strictEqual(
    storage.threadMetaKeyByStorageKey("poker_app:chat:1_2"),
    "poker_app:chat_thread_meta:poker_app:chat:1_2",
    "thread meta key is stable",
  );
  assert.strictEqual(
    storage.buildThreadPreviewText({ fromName: "Player", text: "hello     world" }),
    "Player: hello world",
    "thread preview compacts text",
  );
  assert.strictEqual(access.CLUB_CHAT_PENDING_KEY, "poker_app:club_chat_pending", "club pending key is stable");
  assert.strictEqual(unread.unreadHashKey("tg_1001"), "poker_app:chat_unread:tg_1001", "unread hash key is stable");
  assert.strictEqual(
    notifications.buildClubChatMiniAppLink("https://t.me/Poker_dvatuza_bot/DvaTuza)"),
    "https://t.me/Poker_dvatuza_bot/DvaTuza?startapp=club_chat",
    "club chat mini app link trims legacy closing paren",
  );
  const unreadCommands = [];
  const redisPipeline = async (commands) => {
    unreadCommands.push(...commands);
    return commands.map(() => ({ result: 1 }));
  };
  await unread.incrementThreadUnreadForRecipients(redisPipeline, ["tg_2", "tg_2", "tg_3"], "tg_1");
  assert.deepStrictEqual(
    unreadCommands,
    [
      ["HINCRBY", "poker_app:chat_unread:tg_2", "tg_1", 1],
      ["HINCRBY", "poker_app:chat_unread:tg_3", "tg_1", 1],
    ],
    "thread unread increments unique recipients",
  );
  assert.strictEqual(groups.sanitizeGroupTitle("  Team\u0007 Alpha  "), "Team Alpha", "group title strips control chars");
  assert.strictEqual(groups.sanitizeGroupDescription("x".repeat(2500)).length, 2000, "group description is capped");
  assert.strictEqual(groups.sanitizeGroupAvatarInput("https://example.com/a.png"), null, "group avatar only accepts data images");
  assert.strictEqual(groups.groupMetaHasMember({ members: ["1001"] }, "tg_1001"), true, "group membership normalizes legacy ids");
  assert.strictEqual(groups.readGroupMetaOnlyFlag({ query: { metaOnly: "1" } }), true, "group meta flag is recognized");
  assert.strictEqual(groups.readContactsMetaOnlyFlag({ query: { contactsmetaonly: "1" } }), true, "contacts meta flag is recognized");
  const messages = [{ from: "1001", replyTo: { from: "tg_1002" } }];
  assert.deepStrictEqual(messageEnrichment.collectMessageFromIdsForAlias(messages), ["1001", "tg_1002"], "message ids include replies");
  messageEnrichment.applyPeerChatDisplayNamesToMessages(messages, { tg_1001: "One", tg_1002: "Two" });
  assert.strictEqual(messages[0].fromName, "One", "display name applies to sender");
  assert.strictEqual(messages[0].replyTo.fromName, "Two", "display name applies to reply sender");
  messageEnrichment.applyViewerFriendAliasesToMessages(messages, { tg_1001: "Alias One" });
  assert.strictEqual(messages[0].fromName, "Alias One", "friend alias overrides display name");
  const pageMessages = [
    { id: "1", time: "2026-01-01T00:00:00.000Z" },
    { id: "2", time: "2026-01-01T00:00:01.000Z" },
    { id: "3", time: "2026-01-01T00:00:02.000Z" },
  ];
  assert.deepStrictEqual(pagination.filterMessagesAfterCursor(pageMessages, "1").map((m) => m.id), ["2", "3"], "after id cursor slices newer messages");
  assert.deepStrictEqual(
    pagination.sliceMessagesBeforeCursor(pageMessages, "3", "", 1),
    { messages: [{ id: "2", time: "2026-01-01T00:00:01.000Z" }], hasMoreBefore: true },
    "before cursor returns bounded previous page",
  );
  const memberRows = await groupMembers.buildGroupMembersPublicList({
    chatLastSeenHash: "seen",
    chatLastSeenIsoFromRedisRaw: (raw) => raw ? new Date(Number(raw)).toISOString() : null,
    chatOnlineKey: "online",
    creatorId: "tg_1002",
    friendAliasKeyPrefix: "alias:",
    getAvatars: async () => ({ tg_1001: "avatar" }),
    getChatDisplayNameMapForIds: async () => ({ tg_1001: "Display One" }),
    getDtIds: async () => ({ tg_1001: "ID100001" }),
    getP21Ids: async () => ({ tg_1001: "P21-1" }),
    getPokerPlusVerifiedIds: async () => ({ tg_1001: true }),
    isAdmin: (id) => id === "tg_1002",
    memberIds: ["tg_1001", "tg_1001", "tg_1002"],
    minScore: 10,
    myId: "tg_1001",
    normalizeLegacyAccountDisplayLabel: (value) => String(value || "").replace(/^tg_/, ""),
    redisPipeline: async (commands) => {
      const cmd = commands[0] || [];
      if (cmd[0] === "HMGET" && cmd[1] === "seen") return [{ result: ["0", "1000"] }];
      if (cmd[0] === "HMGET" && cmd[1] === "alias:tg_1001") return [{ result: ["Alias One", null] }];
      if (cmd[0] === "HMGET") return [{ result: ["one", "two"] }];
      return commands.map((c) => ({ result: c[2] === "tg_1001" ? "11" : "0" }));
    },
    sanitizeFriendContactNameForChat: (value) => String(value || "").trim(),
    usernamesKey: "usernames",
  });
  assert.strictEqual(memberRows.length, 2, "group member rows are de-duplicated");
  assert.strictEqual(memberRows[0].name, "Alias One", "member alias wins");
  assert.strictEqual(memberRows[0].online, true, "member online score is applied");
  assert.strictEqual(memberRows[1].isGroupCreator, true, "group creator is marked");
  const storeCommands = [];
  const storeRedis = async (commands) => {
    storeCommands.push(...commands);
    if (commands[0] && commands[0][0] === "HGET") return [{ result: JSON.stringify({ id: "m1", text: "hi" }) }];
    if (commands[0] && commands[0][0] === "LPOS") return [{ result: 0 }];
    return commands.map(() => ({ result: 1 }));
  };
  await threadStore.writeThreadMeta(storeRedis, "thread", { id: "m1", time: "2026-01-01T00:00:00Z", fromName: "A", text: "hello" });
  assert.deepStrictEqual(
    storeCommands.slice(0, 3),
    [
      ["HSET", "poker_app:chat_thread_meta:thread", "lastMessageTime", "2026-01-01T00:00:00Z"],
      ["HSET", "poker_app:chat_thread_meta:thread", "lastMessageId", "m1"],
      ["HSET", "poker_app:chat_thread_meta:thread", "lastMessagePreview", "A: hello"],
    ],
    "thread meta writes stable fields",
  );
  const located = await threadStore.locateThreadMessageById(storeRedis, "thread", "m1");
  assert.strictEqual(located.found, true, "thread locate finds indexed message");
  assert.strictEqual(located.fromIndex, true, "thread locate uses index when present");
}

async function main() {
  const tests = [
    ["chat core invariants", testChatCoreInvariants],
    ["auth required and admin-only", testAuthAndAdmin],
    ["chat send/edit/delete", testChatSendEditDelete],
    ["raffle join/leave", testRaffleJoinLeave],
    ["respect vote/withdraw", testRespectVoteWithdraw],
    ["profile/user lookup", testProfileUserLookup],
  ];
  const results = [];
  for (const [name, fn] of tests) {
    const redis = new MemoryRedis();
    installFetch(redis);
    await fn(redis);
    results.push({ name, ok: true });
  }
  console.log(JSON.stringify({ ok: true, results }, null, 2));
}

main().catch((err) => {
  console.error(err && err.stack ? err.stack : err);
  process.exit(1);
});

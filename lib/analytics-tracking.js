"use strict";

const { pipeline: redisPipeline, hashPairsToObject } = require("./redis");
const { mskDateKeyFromMs, dateKeysBetween } = require("./player-crm-utils");

const PREFIX = "poker_app:analytics:v1:";
const DAYS_KEY = PREFIX + "days";
const LINKS_KEY = PREFIX + "installation_accounts";
const LINKED_AT_KEY = PREFIX + "installation_linked_at";
const FIRST_SEEN_KEY = PREFIX + "installation_first_seen";
const VISITOR_FIRST_SEEN_KEY = "poker_app:visitor_first_seen";
const ID_TO_USER_KEY = "poker_app:id_to_user";
const STARTED_AT_KEY = PREFIX + "started_at";
const SESSION_DAY_PREFIX = PREFIX + "sessions:day:";
const SESSION_ACCOUNT_DAY_PREFIX = PREFIX + "session_accounts:day:";
const EVENT_DAY_PREFIX = PREFIX + "events:day:";
const EVENT_DEDUPE_PREFIX = PREFIX + "event:";
const DT_IDS_KEY = "poker_app:visitor_dt_ids";
const ANALYTICS_IDENTITY_READ_BATCH_SIZE = 200;

const EVENT_TYPES = new Set([
  "session_started",
  "section_opened",
  "registration_completed",
  "telegram_linked",
  "email_linked",
  "poker21_linked",
  "raffle_joined",
  "daily_poker_spin",
  "sng_joined",
  "vpn_trial_clicked",
  "private_cash_applied",
  "club_choice_voted",
  "subscription_enabled",
  "push_enabled",
  "referral_opened",
]);

function safeId(raw, max) {
  const value = String(raw || "").trim().slice(0, max || 128);
  return /^[a-zA-Z0-9_-]{6,128}$/.test(value) ? value : "";
}

function safeToken(raw, max) {
  const value = String(raw || "").trim().slice(0, max || 64);
  return /^[a-z0-9_-]{1,64}$/.test(value) ? value : "";
}

function compactEvent(input) {
  const event = input || {};
  return JSON.stringify({
    e: safeId(event.eventId, 128),
    s: safeId(event.sessionId, 128),
    i: safeId(event.installationId, 128),
    a: safeId(event.accountId, 128),
    t: safeToken(event.type, 48),
    n: safeToken(event.section || event.name, 64),
    x: Number(event.atMs) || Date.now(),
  });
}

async function resolveAnalyticsAccount(memberId) {
  const member = safeId(memberId, 128);
  if (!member) return "";
  if (/^ID\d{6}$/.test(member)) return member;
  const result = await redisPipeline([["HGET", DT_IDS_KEY, member]], { context: "analytics.resolve-account" });
  const mapped = result && result[0] && result[0].result ? safeId(result[0].result, 128) : "";
  return mapped || member;
}

async function recordAnalyticsEvent(input) {
  const event = input || {};
  const installationId = safeId(event.installationId, 128);
  const sessionId = safeId(event.sessionId, 128);
  const eventId = safeId(event.eventId, 128);
  const type = safeToken(event.type, 48);
  const accountId = safeId(event.accountId, 128);
  if (!installationId || !sessionId || !eventId || !EVENT_TYPES.has(type)) {
    return { ok: false, error: "invalid_analytics_event" };
  }

  const dedupe = await redisPipeline([
    ["SET", EVENT_DEDUPE_PREFIX + eventId, "1", "NX", "EX", String(8 * 24 * 60 * 60)],
  ], { context: "analytics.dedupe" });
  if (!dedupe || !dedupe[0] || dedupe[0].error) return { ok: false, error: "analytics_unavailable" };
  if (!dedupe[0].result) return { ok: true, duplicate: true };

  // The server clock is authoritative. A public client must not be able to backdate traffic.
  const nowMs = Date.now();
  const day = mskDateKeyFromMs(nowMs);
  const sessionMeta = JSON.stringify({ i: installationId, a: accountId, x: nowMs });
  const commands = [
    ["SADD", DAYS_KEY, day],
    ["SETNX", STARTED_AT_KEY, String(nowMs)],
    ["HSETNX", FIRST_SEEN_KEY, installationId, String(nowMs)],
    ["HSETNX", SESSION_DAY_PREFIX + day, sessionId, sessionMeta],
  ];
  if (accountId) commands.push(
    ["HSET", LINKS_KEY, installationId, accountId],
    ["HSETNX", LINKED_AT_KEY, installationId, String(nowMs)],
    ["HSET", SESSION_ACCOUNT_DAY_PREFIX + day, sessionId, accountId]
  );
  if (type !== "session_started") commands.push(["HSETNX", EVENT_DAY_PREFIX + day, eventId, compactEvent({ ...event, installationId, sessionId, accountId, type, atMs: nowMs })]);
  const result = await redisPipeline(commands, { context: "analytics.record" });
  if (!result || result.some((row) => row && row.error)) return { ok: false, error: "analytics_unavailable" };
  return { ok: true, day, accountId: accountId || null };
}

function parseHash(raw) {
  return hashPairsToObject(raw || null);
}

function parseJson(raw) {
  try { return JSON.parse(String(raw || "")); } catch (e) { return null; }
}

function isDay(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value || ""));
}

async function readAnalyticsSummary(range) {
  const dayResult = await redisPipeline([["SMEMBERS", DAYS_KEY], ["GET", STARTED_AT_KEY]], { context: "analytics.days" });
  const allDays = Array.isArray(dayResult && dayResult[0] && dayResult[0].result)
    ? dayResult[0].result.map(String).filter(isDay).sort()
    : [];
  const days = range ? dateKeysBetween(range.from, range.to).filter((day) => allDays.includes(day)) : allDays;
  const startedAtMs = Number(dayResult && dayResult[1] && dayResult[1].result) || 0;
  if (!days.length) {
    return {
      available: !!startedAtMs,
      trackingStartedAt: startedAtMs ? new Date(startedAtMs).toISOString() : "",
      trackingStartedDate: startedAtMs ? mskDateKeyFromMs(startedAtMs) : "",
      uniqueVisitors: 0, guestInstallations: 0, registeredVisitors: 0, sessions: 0,
      newVisitors: 0, returningVisitors: 0, guestConverted: 0, guestConversionRate: 0,
      averageSessionsBeforeRegistration: 0, sections: [], activities: [], daily: [],
    };
  }

  const commands = [];
  days.forEach((day) => commands.push(["HGETALL", SESSION_DAY_PREFIX + day]));
  days.forEach((day) => commands.push(["HGETALL", SESSION_ACCOUNT_DAY_PREFIX + day]));
  days.forEach((day) => commands.push(["HGETALL", EVENT_DAY_PREFIX + day]));
  const rows = await redisPipeline(commands, { context: "analytics.summary", timeoutMs: 9000 });
  if (!rows) return null;
  const sessionRows = rows.slice(0, days.length);
  const sessionAccountRows = rows.slice(days.length, days.length * 2);
  const eventRows = rows.slice(days.length * 2, days.length * 3);
  const periodInstallationIds = new Set();
  sessionRows.forEach((row) => {
    const values = Object.values(parseHash(row && row.result));
    values.forEach((raw) => {
      const meta = parseJson(raw);
      const id = meta && safeId(meta.i, 128);
      if (id) periodInstallationIds.add(id);
    });
  });
  eventRows.forEach((row) => {
    Object.values(parseHash(row && row.result)).forEach((raw) => {
      const event = parseJson(raw);
      const id = event && safeId(event.i, 128);
      if (id) periodInstallationIds.add(id);
    });
  });
  const installationIds = Array.from(periodInstallationIds);
  const links = {};
  const linkedAt = {};
  const firstSeen = {};
  if (installationIds.length) {
    const identityCommands = [];
    const identityBatches = [];
    for (let offset = 0; offset < installationIds.length; offset += ANALYTICS_IDENTITY_READ_BATCH_SIZE) {
      const ids = installationIds.slice(offset, offset + ANALYTICS_IDENTITY_READ_BATCH_SIZE);
      identityBatches.push(ids);
      identityCommands.push(
        ["HMGET", LINKS_KEY, ...ids],
        ["HMGET", LINKED_AT_KEY, ...ids],
        ["HMGET", FIRST_SEEN_KEY, ...ids]
      );
    }
    const identityRows = await redisPipeline(identityCommands, { context: "analytics.identities", timeoutMs: 9000 });
    if (identityRows) {
      identityBatches.forEach((ids, batchIndex) => {
        const rowOffset = batchIndex * 3;
        const linkedValues = Array.isArray(identityRows[rowOffset] && identityRows[rowOffset].result) ? identityRows[rowOffset].result : [];
        const linkedAtValues = Array.isArray(identityRows[rowOffset + 1] && identityRows[rowOffset + 1].result) ? identityRows[rowOffset + 1].result : [];
        const firstValues = Array.isArray(identityRows[rowOffset + 2] && identityRows[rowOffset + 2].result) ? identityRows[rowOffset + 2].result : [];
        ids.forEach((id, index) => {
          if (linkedValues[index]) links[id] = linkedValues[index];
          if (linkedAtValues[index]) linkedAt[id] = linkedAtValues[index];
          if (firstValues[index]) firstSeen[id] = firstValues[index];
        });
      });
    }
  }

  const actors = new Set();
  const guestActorsAtEvent = new Set();
  const guestCanonicalActorsAtEvent = new Set();
  const registeredActorsAtEvent = new Set();
  const actorDays = new Map();
  const actorSessions = new Map();
  const actorInstallations = new Map();
  const newActors = new Set();
  const sectionMap = new Map();
  const activityMap = new Map();
  const daily = [];
  let sessions = 0;

  function canonical(installationId, accountAtEvent) {
    return safeId(links[installationId], 128) || safeId(accountAtEvent, 128) || installationId;
  }
  function addActorDay(actor, day) {
    if (!actorDays.has(actor)) actorDays.set(actor, new Set());
    actorDays.get(actor).add(day);
  }
  function addActorSession(actor, session) {
    if (!actorSessions.has(actor)) actorSessions.set(actor, []);
    actorSessions.get(actor).push(session);
  }
  function addActorInstallation(actor, installationId) {
    if (!actorInstallations.has(actor)) actorInstallations.set(actor, new Set());
    actorInstallations.get(actor).add(installationId);
  }
  function metricRow(map, name) {
    if (!map.has(name)) map.set(name, { name, unique: new Set(), guests: new Set(), registered: new Set(), events: 0 });
    return map.get(name);
  }

  days.forEach((day, index) => {
    const sessionsHash = parseHash(sessionRows[index] && sessionRows[index].result);
    const sessionAccounts = parseHash(sessionAccountRows[index] && sessionAccountRows[index].result);
    const dayActors = new Set();
    const dayRegistered = new Set();
    const dayGuests = new Set();
    const dayNew = new Set();
    let dayParticipations = 0;
    Object.keys(sessionsHash).forEach((sessionId) => {
      const meta = parseJson(sessionsHash[sessionId]);
      if (!meta || !safeId(meta.i, 128)) return;
      sessions += 1;
      const authenticatedAccount = safeId(sessionAccounts[sessionId], 128) || safeId(meta.a, 128);
      const actor = canonical(meta.i, authenticatedAccount);
      actors.add(actor);
      dayActors.add(actor);
      addActorInstallation(actor, meta.i);
      addActorDay(actor, day);
      addActorSession(actor, { id: sessionId, installationId: meta.i, at: Number(meta.x) || 0, guestAtStart: !safeId(meta.a, 128) });
      if (authenticatedAccount) {
        registeredActorsAtEvent.add(actor);
        dayRegistered.add(actor);
      }
      if (!safeId(meta.a, 128)) {
        guestActorsAtEvent.add(meta.i);
        guestCanonicalActorsAtEvent.add(actor);
        dayGuests.add(meta.i);
      }
    });

    const rawEvents = Object.values(parseHash(eventRows[index] && eventRows[index].result));
    rawEvents.forEach((raw) => {
      const event = parseJson(raw);
      if (!event || !safeId(event.i, 128) || !EVENT_TYPES.has(String(event.t || ""))) return;
      const actor = canonical(event.i, event.a);
      if (event.t === "section_opened" && safeToken(event.n, 64)) {
        const row = metricRow(sectionMap, event.n);
        row.events += 1;
        row.unique.add(actor);
        if (safeId(event.a, 128)) row.registered.add(actor); else row.guests.add(event.i);
      } else if (event.t !== "session_started") {
        dayParticipations += 1;
        const row = metricRow(activityMap, event.t);
        row.events += 1;
        row.unique.add(actor);
        if (safeId(event.a, 128)) row.registered.add(actor); else row.guests.add(event.i);
      }
    });
    daily.push({ date: day, uniqueVisitors: dayActors.size, newVisitors: dayNew.size, guestInstallations: dayGuests.size, registeredVisitors: dayRegistered.size, sessions: Object.keys(sessionsHash).length, participations: dayParticipations });
  });

  // A new person is defined by the earliest known visit of their canonical
  // account, not by the first appearance of the current browser installation.
  // This prevents an existing player on a new phone from being counted as new.
  const accountActors = Array.from(actorInstallations.entries())
    .filter(([, ids]) => Array.from(ids).some((id) => safeId(links[id], 128)))
    .map(([actor]) => actor);
  const accountFirstSeen = {};
  if (accountActors.length) {
    const accountCommands = [];
    const accountBatches = [];
    for (let offset = 0; offset < accountActors.length; offset += ANALYTICS_IDENTITY_READ_BATCH_SIZE) {
      const actors = accountActors.slice(offset, offset + ANALYTICS_IDENTITY_READ_BATCH_SIZE);
      accountBatches.push(actors);
      accountCommands.push(
        ["HMGET", ID_TO_USER_KEY, ...actors],
        ["HMGET", VISITOR_FIRST_SEEN_KEY, ...actors]
      );
    }
    const accountRows = await redisPipeline(accountCommands, { context: "analytics.account-first-seen", timeoutMs: 9000 });
    const aliases = [];
    const values = [];
    accountBatches.forEach((actors, batchIndex) => {
      const rowOffset = batchIndex * 2;
      const batchAliases = Array.isArray(accountRows && accountRows[rowOffset] && accountRows[rowOffset].result)
        ? accountRows[rowOffset].result
        : [];
      const batchValues = Array.isArray(accountRows && accountRows[rowOffset + 1] && accountRows[rowOffset + 1].result)
        ? accountRows[rowOffset + 1].result
        : [];
      actors.forEach((actor, index) => {
        aliases.push(safeId(batchAliases[index], 128));
        values.push(batchValues[index]);
      });
    });
    const aliasCommands = [];
    for (let offset = 0; offset < aliases.length; offset += ANALYTICS_IDENTITY_READ_BATCH_SIZE) {
      aliasCommands.push([
        "HMGET",
        VISITOR_FIRST_SEEN_KEY,
        ...aliases.slice(offset, offset + ANALYTICS_IDENTITY_READ_BATCH_SIZE).map((value) => value || "missing_alias"),
      ]);
    }
    const aliasRows = aliases.some(Boolean)
      ? await redisPipeline(aliasCommands, { context: "analytics.account-alias-first-seen", timeoutMs: 9000 })
      : null;
    const aliasValues = [];
    (aliasRows || []).forEach((row) => {
      if (Array.isArray(row && row.result)) aliasValues.push(...row.result);
    });
    accountActors.forEach((actor, index) => {
      const candidates = [Number(values[index]) || 0, Number(aliasValues[index]) || 0].filter((value) => value > 0);
      if (candidates.length) accountFirstSeen[actor] = Math.min(...candidates);
    });
  }
  const newActorsByDay = {};
  actors.forEach((actor) => {
    const installations = Array.from(actorInstallations.get(actor) || []);
    const candidates = installations.map((id) => Number(firstSeen[id]) || 0).filter((value) => value > 0);
    const accountFirstMs = Number(accountFirstSeen[actor]) || 0;
    if (accountFirstMs > 0) candidates.push(accountFirstMs);
    const firstMs = candidates.length ? Math.min(...candidates) : 0;
    if (!firstMs || (range && (firstMs < range.fromMs || firstMs > range.toMs))) return;
    newActors.add(actor);
    const firstDay = mskDateKeyFromMs(firstMs);
    if (firstDay) newActorsByDay[firstDay] = (newActorsByDay[firstDay] || 0) + 1;
  });
  daily.forEach((row) => {
    row.newVisitors = newActorsByDay[row.date] || 0;
  });

  const returningVisitors = Array.from(actorDays.values()).filter((set) => set.size >= 2).length;
  const converted = new Set();
  const sessionsBeforeRegistration = new Map();
  guestActorsAtEvent.forEach((installationId) => {
    const accountId = safeId(links[installationId], 128);
    const conversionAt = Number(linkedAt[installationId]) || 0;
    if (!accountId || !conversionAt) return;
    if (range && (conversionAt < range.fromMs || conversionAt > range.toMs)) return;
    const actor = canonical(installationId, accountId);
    const priorSessions = (actorSessions.get(actor) || []).filter((session) => session.guestAtStart && session.at > 0 && session.at <= conversionAt);
    if (!priorSessions.length) return;
    converted.add(actor);
    if (!sessionsBeforeRegistration.has(actor)) sessionsBeforeRegistration.set(actor, new Set());
    priorSessions.forEach((session) => sessionsBeforeRegistration.get(actor).add(session.id));
  });
  const sessionsBeforeRegistrationTotal = Array.from(sessionsBeforeRegistration.values()).reduce((sum, set) => sum + set.size, 0);
  const averageSessionsBeforeRegistration = converted.size ? Math.round((sessionsBeforeRegistrationTotal / converted.size) * 10) / 10 : 0;
  const guestConversionRate = guestCanonicalActorsAtEvent.size ? Math.round((converted.size / guestCanonicalActorsAtEvent.size) * 1000) / 10 : 0;
  function outputRows(map) {
    return Array.from(map.values()).map((row) => ({
      name: row.name, uniqueVisitors: row.unique.size, guestInstallations: row.guests.size,
      registeredVisitors: row.registered.size, events: row.events,
    })).sort((a, b) => b.uniqueVisitors - a.uniqueVisitors || b.events - a.events);
  }
  return {
    available: true,
    trackingStartedAt: startedAtMs ? new Date(startedAtMs).toISOString() : "",
    trackingStartedDate: startedAtMs ? mskDateKeyFromMs(startedAtMs) : days[0],
    uniqueVisitors: actors.size,
    guestInstallations: guestActorsAtEvent.size,
    registeredVisitors: registeredActorsAtEvent.size,
    sessions,
    newVisitors: newActors.size,
    returningVisitors,
    guestConverted: converted.size,
    guestConversionRate,
    averageSessionsBeforeRegistration,
    sections: outputRows(sectionMap),
    activities: outputRows(activityMap),
    daily,
  };
}

module.exports = {
  EVENT_TYPES,
  recordAnalyticsEvent,
  readAnalyticsSummary,
  resolveAnalyticsAccount,
  safeId,
  safeToken,
};

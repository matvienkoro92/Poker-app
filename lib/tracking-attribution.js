"use strict";

// Persistent acquisition attribution. Account IDs are supplied only by verified server auth.
const { pipeline, sscanall } = require("./redis");
const { atomicWrite } = require("./redis-atomic");
const { safeId } = require("./analytics-tracking");
const P = "poker_app:attribution:v1:";
const META = "poker_app:track_links:meta";
const json = raw => { try { return JSON.parse(raw || "null"); } catch (_) { return null; } };
const slugOf = raw => /^[a-f0-9]{8}$/.test(String(raw || "").replace(/^ref_/, "")) ? String(raw).replace(/^ref_/, "") : "";
async function read(commands) {
  const rows = await pipeline(commands, { context: "tracking.attribution", throwOnError: true });
  if (!rows || rows.length !== commands.length || rows.some(r => !r || r.error)) throw new Error("attribution_unavailable");
  return rows.map(r => r.result);
}
function mergeContext(a, b) {
  if (!a) return b;
  if (!b) return a;
  return {
    first: a.first.at <= b.first.at ? a.first : b.first,
    last: a.last.at >= b.last.at ? a.last : b.last,
  };
}
async function recordAttribution(event) {
  const installation = safeId(event.installationId), account = safeId(event.accountId);
  if (!installation || !safeId(event.eventId) || !safeId(event.sessionId)) return;
  const ref = slugOf(event.ref);
  const at = Date.now();
  for (let attempt = 0; attempt < 4; attempt++) {
    const [guestRaw, accountRaw, owner, linkRaw, touchRaw] = await read([
      ["HGET", P + "contexts", installation], ["HGET", P + "contexts", account || "_"],
      ["HGET", P + "owners", installation], ["HGET", META, ref || "_"],
      ["HGET", P + "touches", event.sessionId + ":" + ref],
    ]);
    if (!account && owner) return; // A logged-out shared device is not proof of the previous account.
    // Never transfer a previous signed-in person's attribution to another account.
    const guest = !owner || owner === account ? json(guestRaw) : null;
    let context = mergeContext(guest, json(accountRaw));
    const touch = ref && linkRaw ? (json(touchRaw) || { ref, at, label: String((json(linkRaw) || {}).label || "") }) : null;
    if (touch) context = mergeContext(context, { first: touch, last: touch });
    if (!context) return;
    const actor = account || installation;
    const commands = [
      ["HSET", P + "contexts", actor, JSON.stringify(context)],
      ["SADD", P + "members:" + context.first.ref, actor],
      ["SADD", P + "members:" + context.last.ref, actor],
      ["HSETNX", P + "events:" + actor, event.eventId, JSON.stringify({
        id: event.eventId, at, type: event.type, section: String(event.section || "").slice(0, 64),
        entity: String(event.entityId || "").slice(0, 64), ref: context.last.ref,
      })],
    ];
    const guards = [
      { key: P + "contexts", field: installation, value: guestRaw || "" },
      { key: P + "contexts", field: account || "_", value: accountRaw || "" },
      { key: P + "owners", field: installation, value: owner || "" },
    ];
    if (touch) {
      commands.push(["HSETNX", P + "touches", event.sessionId + ":" + ref, JSON.stringify(touch)]);
      guards.push({ key: P + "touches", field: event.sessionId + ":" + ref, value: touchRaw || "" });
    }
    if (account && (!owner || owner === account)) commands.push(
      ["HSET", P + "owners", installation, account],
      ["SADD", P + "installations:" + account, installation]
    );
    try { await atomicWrite(commands, { values: guards, context: "tracking.attribution.write" }); return; }
    catch (error) { if (attempt === 3) throw error; }
  }
}

function depositRows(raw, since) {
  const seen = new Set();
  return (raw || []).map(json).filter(e => {
    if (!e || e.type !== "deposit" || !(Number(e.amount) > 0) || !Number.isFinite(Number(e.amount)) || !(Date.parse(e.at) >= since)) return false;
    const key = e.id || JSON.stringify(e);
    if (seen.has(key)) return false;
    seen.add(key); return true;
  });
}
async function readJourneys(ref, offset = 0) {
  const members = await sscanall(P + "members:" + ref, { count: 500, maxPages: 100, context: "tracking.members" });
  if (!members) throw new Error("attribution_unavailable");
  if (!members.length) return { rows: [], total: 0, nextOffset: null };
  const ownerValues = [];
  for (let i = 0; i < members.length; i += 200) {
    const [values] = await read([["HMGET", P + "owners", ...members.slice(i, i + 200)]]);
    ownerValues.push(...values);
  }
  const actors = [...new Set(members.map((id, i) => ownerValues[i] || id))].sort();
  const selected = actors.slice(offset, offset + 50);
  const rows = [];
  async function loadActor(actor) {
    const [contextRaw, pokerId, legacyId, emailAt, telegramAt] = await read([
      ["HGET", P + "contexts", actor], ["HGET", "poker_app:pokerplus_user_ids", actor],
      ["HGET", "poker_app:id_to_user", actor], ["HGET", "poker_app:email_linked_at", actor],
      ["HGET", "poker_app:telegram_login_at", actor],
    ]);
    const context = json(contextRaw);
    if (!context) return;
    const installations = await sscanall(P + "installations:" + actor, { count: 100, maxPages: 100 });
    if (!installations) throw new Error("attribution_unavailable");
    const account = installations.length ? actor : "";
    const [crm, legacyCrm] = account ? await read([
      ["LRANGE", "poker_app:crm_activity_events:" + actor, "0", "199"],
      ["LRANGE", "poker_app:crm_activity_events:" + (legacyId || actor), "0", "199"],
    ]) : [[], []];
    // Revenue belongs to the first recorded source; later campaigns are touches, not new acquisition.
    const deposits = context.first.ref === ref ? depositRows([...(crm || []), ...(legacyCrm || [])], context.first.at) : [];
    const aliasTimes = legacyId ? await read([
      ["HGET", "poker_app:email_linked_at", legacyId], ["HGET", "poker_app:telegram_login_at", legacyId],
    ]) : [];
    const registrationTimes = [emailAt, telegramAt, ...aliasTimes].map(v => Date.parse(v || "")).filter(Number.isFinite);
    rows.push({ actor, accountId: account, pokerId: pokerId || "", context,
      status: !account ? "guest" : registrationTimes.length ? (Math.min(...registrationTimes) < context.first.at ? "returning" : "new") : "unknown",
      deposits: deposits.map(e => ({ id: e.id, at: e.at, amount: Number(e.amount) })),
      depositAmount: deposits.reduce((sum, e) => sum + Number(e.amount), 0),
      depositCount: deposits.length,
    });
  }
  for (let i = 0; i < selected.length; i += 6) await Promise.all(selected.slice(i, i + 6).map(loadActor));
  rows.sort((a, b) => a.actor.localeCompare(b.actor));
  return { rows, total: actors.length, nextOffset: offset + 50 < actors.length ? offset + 50 : null };
}
async function readTimeline(ref, actor, cursor = "0") {
  if (!safeId(actor)) throw new Error("invalid_actor");
  const members = await sscanall(P + "members:" + ref, { count: 500, maxPages: 100 });
  if (!members) throw new Error("attribution_unavailable");
  const installations = await sscanall(P + "installations:" + actor, { count: 100, maxPages: 100 });
  if (!installations) throw new Error("attribution_unavailable");
  if (!members.includes(actor) && !installations.some(id => members.includes(id))) throw new Error("invalid_actor");
  // Cursor traverses durable event hashes without trimming history or returning an unbounded payload.
  const subjects = [actor, ...installations.filter(id => id !== actor)].sort();
  const [part, scan] = String(cursor).split(":");
  const index = Math.max(0, Number(part) || 0);
  if (index >= subjects.length) return { events: [], cursor: null };
  const [result] = await read([["HSCAN", P + "events:" + subjects[index], scan || "0", "COUNT", "100"]]);
  const entries = result[1] || [];
  const events = [];
  for (let i = 1; i < entries.length; i += 2) { const e = json(entries[i]); if (e) events.push(e); }
  if (index === 0 && (!scan || scan === "0")) {
    const [contextRaw, emailAt, telegramAt, pokerAt, crm, legacyId] = await read([
      ["HGET", P + "contexts", actor], ["HGET", "poker_app:email_linked_at", actor],
      ["HGET", "poker_app:telegram_login_at", actor], ["HGET", "poker_app:pokerplus_bound_at", actor],
      ["LRANGE", "poker_app:crm_activity_events:" + actor, "0", "199"],
      ["HGET", "poker_app:id_to_user", actor],
    ]);
    const [legacyCrm, legacyEmailAt, legacyTelegramAt] = legacyId ? await read([
      ["LRANGE", "poker_app:crm_activity_events:" + legacyId, "0", "199"],
      ["HGET", "poker_app:email_linked_at", legacyId], ["HGET", "poker_app:telegram_login_at", legacyId],
    ]) : [[], null, null];
    const context = json(contextRaw);
    const since = context ? context.first.at : Infinity;
    const registrationDates = [emailAt, telegramAt, legacyEmailAt, legacyTelegramAt].map(v => Date.parse(v || "")).filter(Number.isFinite);
    const milestones = [
      ["registration_completed", registrationDates.length ? Math.min(...registrationDates) : NaN],
      ["poker21_linked", Date.parse(pokerAt || "")],
    ];
    milestones.forEach(([type, at]) => {
      if (at >= since) events.push({ id: "verified_" + actor + "_" + type, at, type, verified: true, ref: context.first.ref });
    });
    depositRows([...(crm || []), ...(legacyCrm || [])], since).forEach(e => events.push({
      id: "crm_" + (e.id || e.at + "_" + e.amount), at: Date.parse(e.at), type: "deposit_confirmed",
      amount: Number(e.amount), verified: true, ref: context.first.ref,
    }));
  }
  const next = String(result[0]) !== "0" ? index + ":" + result[0] : index + 1 < subjects.length ? (index + 1) + ":0" : null;
  return { events: events.sort((a, b) => a.at - b.at), cursor: next };
}
module.exports = { recordAttribution, readJourneys, readTimeline, mergeContext, depositRows, slugOf };

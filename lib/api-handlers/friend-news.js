"use strict";
const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { rejectBlockedAppUser } = require("../app-user-blocks");
const { setCors } = require("../api-auth");
const { isConfigured } = require("../redis");
const { readNewsFriends, resolveNewsAccountId } = require("./friends");
const { buildSharedEvents, readState, readMembership, readTrackingSince, markRead } = require("../friend-news");

module.exports = async function (req, res) {
  setCors(res, "POST, OPTIONS");
  res.setHeader("Cache-Control", "no-store");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false });
  let body;
  try { body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {}; } catch (_) { return res.status(400).json({ ok: false }); }
  const identity = resolveTelegramIdentity(req, body, process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "");
  if (!identity) return res.status(401).json({ ok: false });
  if (!isConfigured()) return res.status(503).json({ ok: false });
  const member = memberIdFromIdentity(identity);
  if (await rejectBlockedAppUser(req, res, identity, member)) return;
  const accountId = await resolveNewsAccountId(identity, member);
  if (!accountId) return res.status(401).json({ ok: false });
  try {
    if (body.action === "read-status") {
      if (!Array.isArray(body.ids) || body.ids.length > 500 || body.ids.some(id => typeof id !== "string" || !id.length || id.length > 1000)) {
        return res.status(400).json({ ok: false });
      }
      return res.status(200).json({ ok: true, accountId, membership: await readMembership(accountId, body.ids) });
    }
    if (body.action === "read") {
      await markRead(accountId, body.ids);
      return res.status(200).json({ ok: true });
    }
    if (body.action && body.action !== "feed") return res.status(400).json({ ok: false });
    const [roster, readIds, trackingSince] = await Promise.all([readNewsFriends(member, accountId), body.scopedReadStatus === true ? [] : readState(accountId), readTrackingSince(accountId)]);
    const sharedEvents = buildSharedEvents(roster.self, roster.friends, require("../friend-tournament-results.json"));
    return res.status(200).json({ ok: true, accountId, scopedReadStatus: body.scopedReadStatus === true, friends: roster.friends, sharedEvents, readIds, trackingSince });
  } catch (error) {
    console.error("[friend-news]", error.message);
    return res.status(503).json({ ok: false, error: "Новости временно недоступны" });
  }
};

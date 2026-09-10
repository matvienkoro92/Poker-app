"use strict";
const redis = require("./redis");
const { resolveAccountId } = require("./account-id");
const { PROFILE_HASH_KEY } = require("./pokerplus");
const { sendToMemberDevices } = require("./chat-webpush-notify");
async function notifyProfileComment(eventId, comment, deps = {}) {
  if (!comment || !comment.id || !comment.memberId) return;
  const id = String(eventId || "");
  const match = /^(?:wall|level|club-level|rating-change|birthday|friend|achievement:[^:]+):(ID\d{6}|tg_\d+|vk_\d+):/.exec(id);
  let owner = match ? await (deps.resolveAccountId || resolveAccountId)(match[1]) : "";
  if (!owner) {
    const nickMatch = /^(?:history:tournament:rating:|birthday:club:|day-hero:\d{4}-\d{2}-\d{2}:)([^:]+):/.exec(id);
    if (!nickMatch) return;
    const normalize = value => String(value || "").trim().toLowerCase().replace(/^@+/, "");
    const profiles = await (deps.hscanall || redis.hscanall)(PROFILE_HASH_KEY);
    const matches = Object.entries(profiles || {}).filter(([, raw]) => {
      try { const p = typeof raw === "string" ? JSON.parse(raw) : raw; return normalize(p.nickname || p.nick || p.name || p.Nike) === normalize(nickMatch[1]); } catch (_) { return false; }
    });
    if (matches.length !== 1) return;
    owner = await (deps.resolveAccountId || resolveAccountId)(matches[0][0]);
  }
  if (!owner || owner === comment.memberId) return;
  return (deps.send || sendToMemberDevices)(owner, {
    title: "Комментарий к вашей записи",
    body: String(comment.author || "Игрок") + ": " + String(comment.text || "").slice(0, 160),
    kind: "profile-comment", tag: "profile-comment-" + comment.id,
    dedupeKey: "profile-comment:" + id + ":" + comment.id + ":" + owner,
    openUrl: "./?startapp=player_profile_" + encodeURIComponent(owner) + "&profile_event=" + encodeURIComponent(id),
  });
}
module.exports = { notifyProfileComment };

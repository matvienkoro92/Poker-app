"use strict";

const CLUB_CHAT_PENDING_KEY = "poker_app:club_chat_pending";
const CLUB_CHAT_MEMBERS_KEY = "poker_app:club_chat_members";
const CLUB_CHAT_MEMBER_JOINED_AT_KEY = "poker_app:club_chat_member_joined_at";
const GENERAL_CHAT_ACCESS_REVOKED_KEY = "poker_app:club_chat_general_revoked";

function clubChatApplicationRequired() {
  return String(process.env.CLUB_CHAT_REQUIRE_APPLICATION || "1").trim() !== "0";
}

async function getClubChatPendingCount(redisPipeline) {
  if (!clubChatApplicationRequired()) return 0;
  const r = await redisPipeline([["SCARD", CLUB_CHAT_PENDING_KEY]]);
  const v = r && r[0] && r[0].result;
  if (v == null) return 0;
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

async function getClubChatAccessState(myId, admin, redisPipeline) {
  if (!clubChatApplicationRequired()) {
    if (admin) return "open";
    const rev = await redisPipeline([["SISMEMBER", GENERAL_CHAT_ACCESS_REVOKED_KEY, myId]]);
    if (rev && rev[0] && rev[0].result === 1) return "revoked";
    return "open";
  }
  if (admin) return "member";
  const res = await redisPipeline([
    ["SISMEMBER", CLUB_CHAT_MEMBERS_KEY, myId],
    ["SISMEMBER", CLUB_CHAT_PENDING_KEY, myId],
  ]);
  const isMember = res && res[0] && res[0].result === 1;
  const isPending = res && res[1] && res[1].result === 1;
  if (isMember) return "member";
  if (isPending) return "pending";
  return "need_apply";
}

async function hasClubGeneralAccess(myId, admin, redisPipeline) {
  const s = await getClubChatAccessState(myId, admin, redisPipeline);
  return s === "open" || s === "member";
}

module.exports = {
  CLUB_CHAT_MEMBER_JOINED_AT_KEY,
  CLUB_CHAT_MEMBERS_KEY,
  CLUB_CHAT_PENDING_KEY,
  GENERAL_CHAT_ACCESS_REVOKED_KEY,
  clubChatApplicationRequired,
  getClubChatAccessState,
  getClubChatPendingCount,
  hasClubGeneralAccess,
};

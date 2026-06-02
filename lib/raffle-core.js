"use strict";

function getClientIp(req) {
  const forwarded = req.headers && (req.headers["x-forwarded-for"] || req.headers["x-real-ip"]);
  if (forwarded) {
    const first = String(forwarded).split(",")[0].trim();
    if (first) return first;
  }
  if (req.socket && req.socket.remoteAddress) return req.socket.remoteAddress;
  return null;
}

function normalizeRaffleDeviceId(value) {
  return String(value == null ? "" : value).trim().slice(0, 128);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function normalizeRaffleGroups(groupsRaw, totalWinners) {
  let groups = [];
  if (Array.isArray(groupsRaw) && groupsRaw.length > 0) {
    groups = groupsRaw.slice(0, 20).map((g) => ({
      count: Math.max(0, Math.min(100, parseInt(g && g.count, 10) || 0)),
      prize: String((g && g.prize) || "").trim().slice(0, 200),
    }));
  }
  if (groups.length === 0) groups = [{ count: totalWinners, prize: "Приз" }];
  return groups;
}

function buildStoredRaffle(myId, titleRaw, totalWinners, groups, endDateIso) {
  const raffleId = "raffle_" + Date.now() + "_" + Math.random().toString(36).slice(2, 9);
  return {
    id: raffleId,
    createdBy: myId,
    title: titleRaw || (groups[0] && groups[0].prize) || "",
    totalWinners,
    groups,
    endDate: endDateIso,
    participants: [],
    winners: [],
    status: "active",
    createdAt: new Date().toISOString(),
  };
}

function deriveDuplicateEndDateIso(sourceRaffle) {
  const createdMs = sourceRaffle && sourceRaffle.createdAt ? new Date(sourceRaffle.createdAt).getTime() : NaN;
  const endMs = sourceRaffle && sourceRaffle.endDate ? new Date(sourceRaffle.endDate).getTime() : NaN;
  let durationMs = Number.isFinite(createdMs) && Number.isFinite(endMs) && endMs > createdMs ? endMs - createdMs : 0;
  if (!durationMs || durationMs < 15 * 60 * 1000) durationMs = 24 * 60 * 60 * 1000;
  return new Date(Date.now() + durationMs).toISOString();
}

function runDraw(raffle) {
  if (raffle.status !== "active") return raffle;
  if (!raffle.participants || raffle.participants.length === 0) {
    raffle.winners = [];
    raffle.status = "drawn";
    raffle.drawnAt = new Date().toISOString();
    return raffle;
  }
  const total = Math.min(raffle.totalWinners, raffle.participants.length);
  const shuffled = shuffle(raffle.participants);
  const winners = [];
  let idx = 0;
  for (let g = 0; g < raffle.groups.length && idx < total; g++) {
    const group = raffle.groups[g];
    const count = Math.min(group.count, total - idx);
    for (let i = 0; i < count && idx < shuffled.length; i++, idx++) {
      winners.push({
        ...shuffled[idx],
        groupIndex: g,
        prize: group.prize || "",
      });
    }
  }
  while (idx < total && idx < shuffled.length) {
    winners.push({
      ...shuffled[idx],
      groupIndex: -1,
      prize: "",
    });
    idx++;
  }
  raffle.winners = winners;
  raffle.status = "drawn";
  raffle.drawnAt = new Date().toISOString();
  return raffle;
}

function raffleParticipantAccountId(row) {
  if (!row) return "";
  const accountId = row.accountId != null ? String(row.accountId).trim() : "";
  if (accountId) return accountId;
  const userId = row.userId != null ? String(row.userId).trim() : "";
  if (/^ID\d{6}$/.test(userId) || userId.startsWith("guest_")) return userId;
  return "";
}

module.exports = {
  getClientIp,
  normalizeRaffleDeviceId,
  normalizeRaffleGroups,
  buildStoredRaffle,
  deriveDuplicateEndDateIso,
  runDraw,
  raffleParticipantAccountId,
};

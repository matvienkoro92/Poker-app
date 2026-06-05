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

function normalizeRaffleTicketCount(row) {
  if (!row || typeof row !== "object") return 1;
  const raw =
    row.ticketCount != null
      ? row.ticketCount
      : row.tickets != null
        ? row.tickets
        : row.entryTicketCount != null
          ? row.entryTicketCount
          : row.raffleTickets;
  const n = parseInt(String(raw == null ? "" : raw), 10);
  if (!Number.isFinite(n) || n <= 0) return 1;
  return Math.max(1, Math.min(1000, n));
}

function raffleUsesWeightedTickets(raffle) {
  if (!raffle || typeof raffle !== "object") return false;
  const mode = String(raffle.drawMode || raffle.draw_mode || "").trim().toLowerCase();
  if (mode === "weighted_tickets" || mode === "ticket_pool" || mode === "tickets_weighted") return true;
  if (raffle.weightedTickets === true || raffle.weighted_tickets === true) return true;
  const participants = Array.isArray(raffle.participants) ? raffle.participants : [];
  return participants.some((row) => normalizeRaffleTicketCount(row) > 1);
}

function buildWeightedTicketPool(participants) {
  const pool = [];
  (Array.isArray(participants) ? participants : []).forEach((participant) => {
    const tickets = normalizeRaffleTicketCount(participant);
    for (let i = 1; i <= tickets; i += 1) {
      pool.push({
        participant,
        ticketIndex: i,
        ticketCount: tickets,
      });
    }
  });
  return pool;
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

function pushRaffleWinner(winners, source, groupIndex, prize) {
  if (!source) return;
  const participant = source.participant || source;
  const ticketIndex = source.ticketIndex != null ? source.ticketIndex : source.winnerTicketIndex;
  const ticketCount = source.ticketCount != null ? source.ticketCount : normalizeRaffleTicketCount(participant);
  const row = {
    ...participant,
    groupIndex,
    prize: prize || "",
  };
  if (ticketIndex != null) row.winnerTicketIndex = ticketIndex;
  if (ticketCount > 1) row.winnerTicketCount = ticketCount;
  winners.push(row);
}

function runDraw(raffle) {
  if (raffle.status !== "active") return raffle;
  if (!raffle.participants || raffle.participants.length === 0) {
    raffle.winners = [];
    raffle.status = "drawn";
    raffle.drawnAt = new Date().toISOString();
    return raffle;
  }
  const sourceRows = raffleUsesWeightedTickets(raffle)
    ? buildWeightedTicketPool(raffle.participants)
    : raffle.participants;
  const totalWinners = Math.max(0, parseInt(String(raffle.totalWinners || ""), 10) || 0);
  const total = Math.min(totalWinners, sourceRows.length);
  const shuffled = shuffle(sourceRows);
  const winners = [];
  let idx = 0;
  for (let g = 0; g < raffle.groups.length && idx < total; g++) {
    const group = raffle.groups[g];
    const count = Math.min(group.count, total - idx);
    for (let i = 0; i < count && idx < shuffled.length; i++, idx++) {
      pushRaffleWinner(winners, shuffled[idx], g, group.prize || "");
    }
  }
  while (idx < total && idx < shuffled.length) {
    pushRaffleWinner(winners, shuffled[idx], -1, "");
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
  normalizeRaffleTicketCount,
  raffleUsesWeightedTickets,
  buildWeightedTicketPool,
  buildStoredRaffle,
  deriveDuplicateEndDateIso,
  runDraw,
  raffleParticipantAccountId,
};

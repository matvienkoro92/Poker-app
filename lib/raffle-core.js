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

function normalizeRaffleAccessLevel(raw) {
  const n = parseInt(String(raw == null ? "" : raw), 10);
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.max(0, Math.min(100, n));
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
    groups = groupsRaw.slice(0, 20).map((g) => {
      const group = {
        count: Math.max(0, Math.min(100, parseInt(g && g.count, 10) || 0)),
        prize: String((g && g.prize) || "").trim().slice(0, 200),
      };
      const rawAccess =
        g && g.accessLevel != null
          ? g.accessLevel
          : g && g.minAccessLevel != null
            ? g.minAccessLevel
            : g && g.requiredLevel != null
              ? g.requiredLevel
              : g && g.minimumLevel;
      if (rawAccess != null && rawAccess !== "") group.accessLevel = normalizeRaffleAccessLevel(rawAccess);
      return group;
    });
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
  if (raffleHasGroupAccessLevels(raffle)) return false;
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

function raffleGroupOwnAccessLevel(group) {
  if (!group || typeof group !== "object") return null;
  const raw =
    group.accessLevel != null
      ? group.accessLevel
      : group.minAccessLevel != null
        ? group.minAccessLevel
        : group.requiredLevel != null
          ? group.requiredLevel
          : group.minimumLevel;
  if (raw == null || raw === "") return null;
  return normalizeRaffleAccessLevel(raw);
}

function raffleBaseAccessLevel(raffle) {
  if (!raffle || typeof raffle !== "object") return 0;
  const raw =
    raffle.accessLevel != null
      ? raffle.accessLevel
      : raffle.minAccessLevel != null
        ? raffle.minAccessLevel
        : raffle.requiredLevel != null
          ? raffle.requiredLevel
          : raffle.minimumLevel;
  return normalizeRaffleAccessLevel(raw);
}

function raffleGroupAccessLevel(raffle, group) {
  const own = raffleGroupOwnAccessLevel(group);
  return own == null ? raffleBaseAccessLevel(raffle) : own;
}

function raffleHasGroupAccessLevels(raffle) {
  const groups = Array.isArray(raffle && raffle.groups) ? raffle.groups : [];
  return groups.some((group) => raffleGroupOwnAccessLevel(group) != null);
}

function raffleParticipantStatusLevel(row) {
  return normalizeRaffleAccessLevel(row && row.pokerPlusStatusLevel);
}

function raffleParticipantEligibleForGroupDraw(raffle, participant, groupIndex) {
  const groups = Array.isArray(raffle && raffle.groups) ? raffle.groups : [];
  const index = parseInt(String(groupIndex != null ? groupIndex : ""), 10);
  const group = Number.isInteger(index) && index >= 0 && index < groups.length ? groups[index] : null;
  return raffleParticipantStatusLevel(participant) >= raffleGroupAccessLevel(raffle, group);
}

function raffleParticipantEligibleForDraw(raffle, participant) {
  if (!participant || typeof participant !== "object") return false;
  if (raffleHasGroupAccessLevels(raffle)) {
    const groups = Array.isArray(raffle && raffle.groups) ? raffle.groups : [];
    if (!groups.length) return raffleParticipantStatusLevel(participant) >= raffleBaseAccessLevel(raffle);
    return groups.some((group, index) => raffleParticipantEligibleForGroupDraw(raffle, participant, index));
  }
  return raffleParticipantStatusLevel(participant) >= raffleBaseAccessLevel(raffle);
}

function raffleEligibleParticipantsForDraw(raffle) {
  const participants = Array.isArray(raffle && raffle.participants) ? raffle.participants : [];
  return participants.filter((participant) => raffleParticipantEligibleForDraw(raffle, participant));
}

function raffleParticipantGroupTicketCount(participant, groupIndex) {
  const groups = Array.isArray(participant && participant.ticketGroups) ? participant.ticketGroups : [];
  for (let i = 0; i < groups.length; i += 1) {
    const row = groups[i] || {};
    const idx = parseInt(String(row.groupIndex != null ? row.groupIndex : row.index), 10);
    if (idx !== groupIndex) continue;
    const n = normalizeRaffleTicketCount(row);
    return n;
  }
  return 0;
}

function raffleParticipantDrawIdentity(row) {
  if (!row || typeof row !== "object") return "";
  const accountId = row.accountId != null ? String(row.accountId).trim() : "";
  if (accountId) return "account:" + accountId;
  const userId = row.userId != null ? String(row.userId).trim() : "";
  if (userId) return "user:" + userId;
  const p21Id = row.p21Id != null ? String(row.p21Id).trim().toLowerCase() : "";
  if (p21Id) return "p21:" + p21Id;
  return "";
}

function buildGroupTicketPool(raffle, groupIndex) {
  const participants = Array.isArray(raffle && raffle.participants) ? raffle.participants : [];
  const pool = [];
  participants.forEach((participant) => {
    if (!raffleParticipantEligibleForGroupDraw(raffle, participant, groupIndex)) return;
    let tickets = raffleParticipantGroupTicketCount(participant, groupIndex);
    if (!tickets && !Array.isArray(participant && participant.ticketGroups)) {
      tickets = normalizeRaffleTicketCount(participant);
    }
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

function raffleGroupDrawOrder(raffle) {
  const groups = Array.isArray(raffle && raffle.groups) ? raffle.groups : [];
  return groups
    .map((group, index) => ({
      group,
      index,
      accessLevel: raffleGroupAccessLevel(raffle, group),
    }))
    .sort((a, b) => b.accessLevel - a.accessLevel || a.index - b.index);
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

function raffleWinnerGroupIndex(row) {
  const n = parseInt(String(row && row.groupIndex != null ? row.groupIndex : ""), 10);
  return Number.isInteger(n) ? n : -1;
}

function raffleDrawnIdentitySet(winners) {
  const set = new Set();
  (Array.isArray(winners) ? winners : []).forEach((winner) => {
    const key = raffleParticipantDrawIdentity(winner);
    if (key) set.add(key);
  });
  return set;
}

function drawRaffleGroups(raffle, groupIndexes) {
  if (!raffle || raffle.status !== "active") return { changed: false, winners: [] };
  const groups = Array.isArray(raffle.groups) ? raffle.groups : [];
  const wanted = new Set((Array.isArray(groupIndexes) ? groupIndexes : [])
    .map((value) => parseInt(String(value), 10))
    .filter((value) => Number.isInteger(value) && value >= 0 && value < groups.length));
  if (!wanted.size) return { changed: false, winners: [] };
  if (!Array.isArray(raffle.winners)) raffle.winners = [];
  const newWinners = [];
  const wonKeys = raffleDrawnIdentitySet(raffle.winners);
  const groupOrder = raffleGroupDrawOrder(raffle).filter((row) => wanted.has(row.index));
  groupOrder.forEach((groupRow) => {
    const group = groupRow.group;
    const g = groupRow.index;
    const groupTotal = Math.max(0, parseInt(group && group.count, 10) || 0);
    const alreadyDrawn = raffle.winners.filter((winner) => raffleWinnerGroupIndex(winner) === g).length;
    const missing = Math.max(0, groupTotal - alreadyDrawn);
    if (!missing) return;
    const shuffled = shuffle(buildGroupTicketPool(raffle, g));
    let picked = 0;
    for (let i = 0; i < shuffled.length && picked < missing; i += 1) {
      const participant = shuffled[i] && shuffled[i].participant;
      const key = raffleParticipantDrawIdentity(participant);
      if (key && wonKeys.has(key)) continue;
      const before = raffle.winners.length;
      pushRaffleWinner(raffle.winners, shuffled[i], g, group.prize || "");
      const winner = raffle.winners[before];
      if (winner) newWinners.push(winner);
      if (key) wonKeys.add(key);
      picked += 1;
    }
  });
  return { changed: newWinners.length > 0, winners: newWinners };
}

function runDraw(raffle) {
  if (raffle.status !== "active") return raffle;
  const eligibleParticipants = raffleEligibleParticipantsForDraw(raffle);
  if (eligibleParticipants.length === 0) {
    if (!Array.isArray(raffle.winners)) raffle.winners = [];
    raffle.status = "drawn";
    raffle.drawnAt = new Date().toISOString();
    return raffle;
  }
  const sourceRows = raffleUsesWeightedTickets(raffle)
    ? buildWeightedTicketPool(eligibleParticipants)
    : eligibleParticipants;
  const totalWinners = Math.max(0, parseInt(String(raffle.totalWinners || ""), 10) || 0);
  if (raffleHasGroupAccessLevels(raffle)) {
    if (!Array.isArray(raffle.winners)) raffle.winners = [];
    const wonKeys = raffleDrawnIdentitySet(raffle.winners);
    const groupOrder = raffleGroupDrawOrder(raffle);
    for (let orderIndex = 0; orderIndex < groupOrder.length && raffle.winners.length < totalWinners; orderIndex++) {
      const groupRow = groupOrder[orderIndex];
      const group = groupRow.group;
      const g = groupRow.index;
      const groupTotal = Math.min(Math.max(0, parseInt(group && group.count, 10) || 0), totalWinners - raffle.winners.length);
      const alreadyDrawn = raffle.winners.filter((winner) => raffleWinnerGroupIndex(winner) === g).length;
      const missing = Math.max(0, groupTotal - alreadyDrawn);
      if (!missing) continue;
      const shuffled = shuffle(buildGroupTicketPool(raffle, g));
      let picked = 0;
      for (let i = 0; i < shuffled.length && picked < missing; i += 1) {
        const participant = shuffled[i] && shuffled[i].participant;
        const key = raffleParticipantDrawIdentity(participant);
        if (key && wonKeys.has(key)) continue;
        pushRaffleWinner(raffle.winners, shuffled[i], g, group.prize || "");
        if (key) wonKeys.add(key);
        picked += 1;
      }
    }
    raffle.status = "drawn";
    raffle.drawnAt = new Date().toISOString();
    return raffle;
  }
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
  normalizeRaffleAccessLevel,
  normalizeRaffleGroups,
  normalizeRaffleTicketCount,
  raffleBaseAccessLevel,
  raffleGroupAccessLevel,
  raffleHasGroupAccessLevels,
  raffleUsesWeightedTickets,
  raffleParticipantStatusLevel,
  raffleParticipantEligibleForGroupDraw,
  raffleEligibleParticipantsForDraw,
  buildWeightedTicketPool,
  drawRaffleGroups,
  buildStoredRaffle,
  deriveDuplicateEndDateIso,
  runDraw,
  raffleParticipantAccountId,
};

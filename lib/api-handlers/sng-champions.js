"use strict";

const crypto = require("crypto");
const { ADMIN_IDS, ADMIN_USERNAMES, authRequired, isAdminIdentity, parseBody, setCors } = require("../api-auth");
const { ensureDtIdForUserId } = require("../account-id");
const { createChatProfileLookupHelpers } = require("../chat-profile-lookups");
const { pokerProfileStatusFromCachedProfile } = require("../chat-profile-status");
const { PROFILE_HASH_KEY, PROFILE_SYNC_AT_HASH_KEY } = require("../pokerplus");
const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { getJson, isConfigured: redisConfigured, pipeline: redisPipeline, setJson } = require("../redis");
const { resolveTelegramOpenButtonUrl, sendTelegramMessage } = require("../telegram-bot-send");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";
const STATE_KEY = "poker_app:sng_champions";
const AVATAR_PREFIX = "poker_app:avatar:";
const DT_IDS_KEY = "poker_app:visitor_dt_ids";
const POKERPLUS_BIND_HASH_KEY = "poker_app:pokerplus_user_ids";
const PROFILE_CITY_KEY = "poker_app:profile_cities";
const TELEGRAM_VISIBLE_HASH = "poker_app:telegram_visible";
const USERNAMES_KEY = "poker_app:visitor_usernames";
const MIN_JOIN_LEVEL = 1;
const PLAYER_NAME_MAX = 80;
const PRIZE_TEXT_MAX = 160;
const BUY_IN_MAX = 80;
const DESCRIPTION_MAX = 1000;
const DEFAULT_TITLE = "1ый СНГ-баттл Лига чемпионов Два туза";
const READY_WINDOW_MS = 24 * 60 * 60 * 1000;
const SNG_APPLICATION_NOTIFY_USERNAMES = (process.env.SNG_CHAMPIONS_APPLICATION_NOTIFY_USERNAMES || "roman1787443")
  .split(",")
  .map((item) => cleanHandle(item))
  .filter(Boolean);
const SNG_APPLICATION_NOTIFY_CHAT_IDS = (process.env.SNG_CHAMPIONS_APPLICATION_NOTIFY_CHAT_IDS || process.env.TELEGRAM_ROMAN_CHAT_ID || "388008256")
  .split(",")
  .map((item) => telegramChatIdFromMemberId(item))
  .filter(Boolean);

const PRESET_AVATAR_SRC_BY_ID = {
  tiger: "./assets/avatar-tiger.jpg",
  raccoon: "./assets/avatar-raccoon.jpg",
  skull: "./assets/avatar-skull.jpg",
  phoenix: "./assets/avatar-phoenix.jpg",
  octopus: "./assets/avatar-octopus.jpg",
  cat: "./assets/avatar-cat.jpg",
  robot: "./assets/avatar-robot.jpg",
  bulldog: "./assets/avatar-bulldog.jpg",
  monkey: "./assets/daily-poker-monkey.webp",
  fox: "./assets/avatar-fox.jpg",
  chip: "./assets/avatar-chip.jpg",
  koala: "./assets/avatar-koala.jpg",
  raven: "./assets/avatar-raven.jpg",
  crocodile: "./assets/avatar-crocodile.jpg",
  rabbit: "./assets/avatar-rabbit.jpg",
  chameleon: "./assets/avatar-chameleon.jpg",
  panda: "./assets/avatar-panda.jpg",
  wolf: "./assets/avatar-wolf.jpg",
  owl: "./assets/avatar-owl.jpg",
  bat: "./assets/avatar-bat.jpg",
  gorilla: "./assets/avatar-gorilla.jpg",
};
const PRESET_AVATAR_IDS = Object.keys(PRESET_AVATAR_SRC_BY_ID);
const { getAvatars } = createChatProfileLookupHelpers({
  AVATAR_PREFIX,
  DT_IDS_KEY,
  POKERPLUS_BIND_HASH_KEY,
  PRESET_AVATAR_IDS,
  PRESET_AVATAR_SRC_BY_ID,
  redisPipeline,
});

function cleanText(value, max) {
  return String(value == null ? "" : value)
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function cleanHandle(value) {
  return cleanText(value, 80).replace(/^@+/, "").toLowerCase();
}

function cleanMultilineText(value, max) {
  return String(value == null ? "" : value)
    .replace(/\r\n?/g, "\n")
    .replace(/[^\S\n]+/g, " ")
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, max);
}

function cleanMoney(value) {
  const amount = Math.floor(Number(String(value == null ? "" : value).replace(/[^\d]/g, "")) || 0);
  return Math.max(0, Math.min(100000000, amount));
}

function normalizePayoutConfig(raw) {
  const row = raw && typeof raw === "object" ? raw : {};
  const places = {};
  for (let place = 1; place <= 5; place += 1) places[place] = cleanMoney(row.places && row.places[place]);
  const knockouts = {};
  ["1/32", "1/16", "1/8", "1/4", "1/2", "Финал"].forEach((stage) => { knockouts[stage] = cleanMoney(row.knockouts && row.knockouts[stage]); });
  return { places, knockouts };
}

function upperBracketStageCounts(state) {
  let units = Number(state && state.capacity) || 32;
  if (state && state.tournamentType === "team") units = Math.floor(units / 2);
  const out = {};
  while (units > 1) {
    const matches = units / 2;
    const label = matches === 1 ? "Финал" : "1/" + String(matches);
    out[label] = matches;
    units = matches;
  }
  return out;
}

function validatePayoutConfig(state) {
  if (!state.knockoutEnabled) return { ok: true };
  const buyIn = cleanMoney(state.buyIn);
  const totalPool = buyIn * state.capacity;
  const placesTotal = Object.values(state.payoutConfig.places).reduce((sum, value) => sum + value, 0);
  const counts = upperBracketStageCounts(state);
  const knockoutsTotal = Object.keys(counts).reduce((sum, stage) => sum + counts[stage] * (state.payoutConfig.knockouts[stage] || 0), 0);
  if (placesTotal + knockoutsTotal !== totalPool) return { ok: false, error: "Распределите весь призовой фонд: " + totalPool + "р. Сейчас распределено " + (placesTotal + knockoutsTotal) + "р" };
  return { ok: true, totalPool, placesTotal, knockoutsTotal };
}

function telegramChatIdFromMemberId(memberId) {
  const raw = cleanText(memberId, 40);
  const numeric = raw.startsWith("tg_") ? raw.slice(3) : raw;
  return /^\d{5,20}$/.test(numeric) ? numeric : "";
}

function withStartApp(rawUrl, startapp) {
  const source = cleanText(rawUrl, 512);
  const start = cleanText(startapp, 80);
  if (!source || !start) return source;
  try {
    const url = new URL(source);
    url.searchParams.set("startapp", start);
    return url.toString();
  } catch (error) {
    const clean = source.replace(/([?&])startapp=[^&#]*&?/i, "$1").replace(/[?&]$/, "");
    return clean + (clean.indexOf("?") >= 0 ? "&" : "?") + "startapp=" + encodeURIComponent(start);
  }
}

function sngOpenUrl() {
  const fallback = "https://t.me/Poker_dvatuza_bot/DvaTuza";
  const base = String(resolveTelegramOpenButtonUrl(process.env.MINI_APP_URL || process.env.APP_URL || fallback) || fallback)
    .trim()
    .replace(/\/+$/, "");
  return withStartApp(base, "sng_champions");
}

function buildEntryStatusNotification(action, entry, state) {
  const chatId = telegramChatIdFromMemberId(entry && entry.memberId);
  if (!chatId) return null;
  const title = cleanText(state && state.title || DEFAULT_TITLE, 80) || DEFAULT_TITLE;
  const buyInAmount = cleanMoney(state && state.buyIn) || 2000;
  const buyInText = buyInAmount.toLocaleString("ru-RU") + " ₽";
  const messages = {
    approve: "Ваша заявка принята в турнир СНГ Лиги Чемпионов, с вашего баланса списано " + buyInText + ", ожидайте сообщения о времени старта турнира.",
    requestBalance: "Админ не смог добавить вас в турнир СНГ Лига Чемпионов Два Туза из-за отсутствия " + buyInText + " на счету. Пополните баланс, чтобы участвовать в турнире.",
    reject: "Ваша заявка на " + title + " отклонена.\n\nЕсли это ошибка или вы уже пополнили баланс, напишите администратору.",
  };
  return {
    action,
    chatId,
    text: messages[action] || "",
  };
}

function entryPairOpponentName(id, rawPlayers, enrichedPlayers) {
  const raw = rawPlayers.get(id) || {};
  const enriched = enrichedPlayers.get(id) || raw;
  const nick = cleanText(enriched.pokerPlusNickname || raw.pokerPlusNickname, PLAYER_NAME_MAX);
  const name = cleanText(raw.displayName || raw.telegramUsername, PLAYER_NAME_MAX);
  if (nick && name && nick.toLowerCase() !== name.toLowerCase()) return nick + " (" + name + ")";
  if (nick) return nick;
  return entryPublicName(raw && raw.id ? raw : enriched);
}

function roundStageLabelForState(state, round) {
  if (round && round.loserBracket) {
    const loserIndex = Number(round.index) || 0;
    if (loserIndex === 1 || loserIndex === 2) return "L 1/8";
    if (loserIndex === 3 || loserIndex === 4) return "L 1/4";
    if (loserIndex === 5 || loserIndex === 6) return "L 1/2";
    if (loserIndex === 7) return "L финал";
    if (loserIndex === 8) return "Финал сетки №2";
    if (loserIndex === 9) return "Гранд-финал";
    return cleanText(round.name, 40) || "сетку №2";
  }
  const rounds = Array.isArray(state && state.rounds) ? state.rounds : [];
  const index = rounds.findIndex((item) => item && round && item.id === round.id);
  if (index >= 0 && rounds.length) {
    const remaining = rounds.length - index;
    if (remaining === 1) return "Финал";
    if (remaining === 2) return "1/2";
    if (remaining === 3) return "1/4";
    if (remaining === 4) return "1/8";
    if (remaining === 5) return "1/16";
  }
  const matches = Array.isArray(round && round.matches) ? round.matches.length : 0;
  if (matches >= 16) return "1/16";
  if (matches === 8) return "1/8";
  if (matches === 4) return "1/4";
  if (matches === 2) return "1/2";
  if (matches === 1) return "Финал";
  return cleanText(round && round.name, 40) || "следующий раунд";
}

function tournamentStageMessageLabel(state, round) {
  const stage = roundStageLabelForState(state, round);
  if (stage === "1/2") return "Полуфинал";
  if (stage === "L 1/2") return "Полуфинал сетки №2";
  if (stage === "L финал") return "Финал сетки №2";
  return stage;
}

function bracketLabelForRound(round) {
  return round && round.loserBracket ? "Сетка №2" : "Сетка Винеров";
}

function entriesForParticipant(state, participantId) {
  const entries = state && Array.isArray(state.entries) ? state.entries : [];
  const direct = entries.find((entry) => entry && entry.id === participantId);
  if (direct) return [direct];
  const team = (state && Array.isArray(state.teams) ? state.teams : []).find((item) => item && item.id === participantId);
  if (!team) return [];
  const memberIds = new Set(team.memberIds || []);
  return entries.filter((entry) => entry && memberIds.has(entry.id));
}

function participantDisplayName(state, participantId) {
  const team = (state && Array.isArray(state.teams) ? state.teams : []).find((item) => item && item.id === participantId);
  if (team) return cleanText(team.name, PLAYER_NAME_MAX) || "Команда";
  const entry = (state && Array.isArray(state.entries) ? state.entries : []).find((item) => item && item.id === participantId);
  return entryPublicName(entry);
}

function participantTeamMembersText(state, participantId) {
  const team = (state && Array.isArray(state.teams) ? state.teams : []).find((item) => item && item.id === participantId);
  if (!team) return "";
  return entriesForParticipant(state, participantId).map(entryPublicName).filter(Boolean).join(" и ");
}

function notificationsForParticipant(state, participantId, action, text) {
  const seen = new Set();
  return entriesForParticipant(state, participantId).map((entry) => {
    const chatId = telegramChatIdFromMemberId(entry && entry.memberId);
    if (!chatId || seen.has(chatId)) return null;
    seen.add(chatId);
    return { action, chatId, text };
  }).filter(Boolean);
}

async function buildTeamsFormedNotifications(state) {
  const enrichedEntries = await enrichEntries(state && state.entries ? state.entries : []);
  const byId = new Map(enrichedEntries.map((entry) => [entry.id, entry]));
  const title = cleanText(state && state.title || DEFAULT_TITLE, 80) || DEFAULT_TITLE;
  const notifications = [];
  (state.teams || []).forEach((team) => {
    const memberIds = Array.isArray(team.memberIds) ? team.memberIds : [];
    memberIds.forEach((memberId) => {
      const member = byId.get(memberId);
      const partnerId = memberIds.find((id) => id && id !== memberId);
      const partner = byId.get(partnerId);
      const chatId = telegramChatIdFromMemberId(member && member.memberId);
      if (!chatId) return;
      notifications.push({
        action: "teamsFormed",
        chatId,
        text:
          "Внимание! Команды на командный баттл «" + title + "» сформированы случайным образом.\n\n" +
          "Ваш напарник — " + entryPublicName(partner) + ".\n" +
          "Название команды: " + (cleanText(team.name, PLAYER_NAME_MAX) || "Команда") + ".\n\n" +
          "Ожидайте формирования турнирной сетки. Пока можете вместе придумать название команды и один раз изменить его в приложении.",
      });
    });
  });
  return notifications;
}

function buildInitialByeNotifications(state) {
  const firstRound = state && state.rounds && state.rounds[0];
  const nextRound = state && state.rounds && state.rounds[1];
  if (!firstRound || !nextRound) return [];
  const nextStage = roundStageLabelForState(state, nextRound);
  return (firstRound.matches || []).flatMap((match) => {
    const participantId = cleanText(match && match.autoWinnerId, 80);
    if (!participantId || playableIds(match).length !== 1) return [];
    return notificationsForParticipant(
      state,
      participantId,
      "bracketBye",
      "Турнир стартовал. В этапе " + roundStageLabelForState(state, firstRound) +
        " у вашей команды нет соперника — вы автоматически проходите в " + nextStage + "."
    );
  });
}

function nextRoundForMatch(state, round, match) {
  if (!state || !round || !match) return null;
  const roundIndex = Number(round.index) || 1;
  const nextRoundIndex = roundIndex + 1;
  const rounds = round && round.loserBracket ? (state.loserRounds || []) : (state.rounds || []);
  const nextRound = rounds.find((item) => item && Number(item.index) === nextRoundIndex);
  if (!nextRound) return null;
  const matchIndex = Number(match.index) || 1;
  const sameSizeLowerRound = round && round.loserBracket && [1, 3, 5].includes(roundIndex);
  const targetIndex = sameSizeLowerRound ? matchIndex : Math.ceil(matchIndex / 2);
  const targetMatch = (nextRound.matches || [])[targetIndex - 1];
  return targetMatch ? nextRound : null;
}

function buildBracketParticipantNotifications(state, action, text) {
  const selectedIds = new Set(
    (state && state.bracket && Array.isArray(state.bracket.playerIds) ? state.bracket.playerIds : [])
      .filter(Boolean)
  );
  const seen = new Set();
  return (state && Array.isArray(state.entries) ? state.entries : [])
    .filter((entry) => entry && (!selectedIds.size || selectedIds.has(entry.id) || (state.teams || []).some((team) => selectedIds.has(team.id) && (team.memberIds || []).includes(entry.id))))
    .map((entry) => {
      const chatId = telegramChatIdFromMemberId(entry && entry.memberId);
      if (!chatId || seen.has(chatId)) return null;
      seen.add(chatId);
      return {
        action,
        chatId,
        text,
      };
    })
    .filter(Boolean);
}

async function buildWinnerAdvancedNotifications(state, round, match, winnerId) {
  const nextRound = nextRoundForMatch(state, round, match);
  const loserId = playableIds(match).find((id) => id && id !== winnerId) || "";
  const winnerName = participantDisplayName(state, winnerId);
  const loserName = participantDisplayName(state, loserId);
  const nextStage = nextRound
    ? roundStageLabelForState(state, nextRound)
    : state.status === "bracket" && state.loserBracketEnabled !== false
      ? "Гранд-финал"
      : "";
  const winnerText = nextStage
    ? "Поздравляем! " + winnerName + " победила команду " + loserName + " и проходит в " + nextStage + "."
    : "Поздравляем! " + winnerName + " победила команду " + loserName + " и выиграла турнир!";
  const loserDestination = state.loserBracketEnabled === false || (round && round.loserBracket)
    ? "Вы завершаете участие в турнире."
    : "Вы переходите в сетку №2.";
  const loserText = "Матч завершён. Ваша команда уступила команде " + winnerName + ". " + loserDestination;
  return notificationsForParticipant(state, winnerId, "winnerAdvanced", winnerText)
    .concat(notificationsForParticipant(state, loserId, "matchLost", loserText));
}

async function buildMatchAdvancedBroadcastNotifications(state, round, match, winnerId) {
  const ids = playableIds(match);
  const loserId = ids.find((id) => id && id !== winnerId) || "";
  if (!winnerId || !loserId) return [];
  function participantWithMembers(participantId) {
    const name = participantDisplayName(state, participantId);
    const members = participantTeamMembersText(state, participantId);
    return name + (members ? " (" + members + ")" : "");
  }
  const winnerText = participantWithMembers(winnerId);
  const loserText = participantWithMembers(loserId);
  const stage = tournamentStageMessageLabel(state, round);
  let nextMatch = null;
  let nextRound = null;
  (state.rounds || []).concat(state.loserRounds || []).some((candidateRound) => {
    const candidate = (candidateRound && candidateRound.matches || []).find((item) =>
      item && item.id !== match.id && !cleanText(item.winnerId, 80) && playableIds(item).includes(winnerId)
    );
    if (!candidate) return false;
    nextMatch = candidate;
    nextRound = candidateRound;
    return true;
  });
  const nextOpponentId = nextMatch
    ? playableIds(nextMatch).find((id) => id && id !== winnerId) || ""
    : "";
  const destinationRound = nextRound || nextRoundForMatch(state, round, match);
  const destinationStage = destinationRound
    ? tournamentStageMessageLabel(state, destinationRound)
    : state.status === "bracket" && state.loserBracketEnabled !== false
      ? "Гранд-финал"
      : "";
  const nextText = nextOpponentId
    ? " В следующей стадии «" + destinationStage + "» встретится с " + participantWithMembers(nextOpponentId) + "."
    : destinationStage
      ? " Прошла в стадию «" + destinationStage + "»."
      : " Выиграла турнир.";
  return buildTournamentBroadcastNotifications(
    state,
    "matchAdvancedBroadcast",
    "Команда " + winnerText + " прошла " + loserText + " в стадии «" + stage + "»." + nextText
  );
}

async function buildMatchStartedNotifications(state, round, match) {
  const stage = roundStageLabelForState(state, round);
  if (!stage) return [];
  const ids = playableIds(match);
  if (ids.length < 2) return [];
  const tablePassword = cleanText(match && match.tablePassword, 4);
  const firstName = participantDisplayName(state, ids[0]);
  const secondName = participantDisplayName(state, ids[1]);
  const firstMembers = participantTeamMembersText(state, ids[0]);
  const secondMembers = participantTeamMembersText(state, ids[1]);
  const teamMembersText = firstMembers || secondMembers
    ? "\n" + firstName + ": " + (firstMembers || "—") +
      "\n" + secondName + ": " + (secondMembers || "—")
    : "";
  const text =
    "Сетка: " + bracketLabelForRound(round) + "\n" +
    "Создан стол для матча " + stage + ": " + firstName + " — " + secondName + "." +
    teamMembersText +
    (tablePassword ? "\nПароль стола: " + tablePassword : "");
  return buildTournamentBroadcastNotifications(state, "matchStarted", text);
}

async function buildTournamentBroadcastNotifications(state, action, text) {
  const seen = new Set();
  const notifications = (state && Array.isArray(state.entries) ? state.entries : [])
    .filter((entry) => entry && entry.status === "approved")
    .map((entry) => {
      const chatId = telegramChatIdFromMemberId(entry.memberId);
      if (!chatId || seen.has(chatId)) return null;
      seen.add(chatId);
      return { action, chatId, text };
    })
    .filter(Boolean);
  const adminChatIds = await resolveSngApplicationNotifyChatIds(
    SNG_APPLICATION_NOTIFY_USERNAMES.concat(ADMIN_USERNAMES),
    SNG_APPLICATION_NOTIFY_CHAT_IDS.concat(ADMIN_IDS)
  );
  adminChatIds.forEach((chatId) => {
    if (!chatId || seen.has(chatId)) return;
    seen.add(chatId);
    notifications.push({ action, chatId, text });
  });
  return notifications;
}

async function buildMatchReadyReminderNotifications(state, round, match) {
  const ids = playableIds(match);
  if (ids.length < 2) return [];
  const ready = match && match.readyById && typeof match.readyById === "object" ? match.readyById : {};
  const stage = roundStageLabelForState(state, round);
  return ids
    .filter((id) => ready[id] !== true)
    .map((id) => {
      const opponentId = ids.find((item) => item && item !== id) || "";
      return notificationsForParticipant(
        state,
        id,
        "matchReadyReminder",
          "Сетка: " + bracketLabelForRound(round) + "\n" +
          "Напоминаем об игре (" + stage + ", соперник: " +
          participantDisplayName(state, opponentId) +
          "), подтвердите готовность команды."
      );
    })
    .flat()
    .filter(Boolean);
}

function pendingOpponentSnapshot(state) {
  const snapshot = new Map();
  const allRounds = []
    .concat((state && Array.isArray(state.rounds) ? state.rounds : []))
    .concat((state && Array.isArray(state.loserRounds) ? state.loserRounds : []));
  allRounds.forEach((round) => {
    (round && Array.isArray(round.matches) ? round.matches : []).forEach((match) => {
      const ids = playableIds(match);
      if (!match || !match.id || ids.length !== 1 || cleanText(match.winnerId, 80)) return;
      snapshot.set(match.id, ids[0]);
    });
  });
  return snapshot;
}

async function buildOpponentResolvedNotifications(state, beforeSnapshot) {
  if (!beforeSnapshot || !beforeSnapshot.size) return [];
  const notifications = [];
  const allRounds = []
    .concat((state && Array.isArray(state.rounds) ? state.rounds : []))
    .concat((state && Array.isArray(state.loserRounds) ? state.loserRounds : []));
  allRounds.forEach((round) => {
    (round && Array.isArray(round.matches) ? round.matches : []).forEach((match) => {
      const waitingId = beforeSnapshot.get(match && match.id);
      if (!waitingId || cleanText(match && match.winnerId, 80)) return;
      const ids = playableIds(match);
      if (ids.length < 2 || !ids.includes(waitingId)) return;
      const ready = match && match.readyById && typeof match.readyById === "object" ? match.readyById : {};
      if (ready[waitingId] === true) return;
      const opponentId = ids.find((id) => id && id !== waitingId) || "";
      if (!opponentId) return;
      notifications.push.apply(notifications, notificationsForParticipant(
        state,
        waitingId,
        "opponentResolved",
          "Сетка: " + bracketLabelForRound(round) + "\n" +
          "В вашей паре " + roundStageLabelForState(state, round) +
          " определился соперник: " +
          participantDisplayName(state, opponentId) +
          ". Нажмите «Готов»."
      ));
    });
  });
  return notifications;
}

async function buildRoundOnePairNotifications(state) {
  const firstRound = (state.rounds || []).find((round) => round && Number(round.index) === 1);
  const notifications = [];
  (firstRound && Array.isArray(firstRound.matches) ? firstRound.matches : []).forEach((match) => {
    const ids = playableIds(match);
    if (ids.length !== 2) return;
    ids.forEach((id, index) => {
      const opponentId = ids[index === 0 ? 1 : 0];
      const opponentMembers = participantTeamMembersText(state, opponentId);
      notifications.push.apply(notifications, notificationsForParticipant(
        state,
        id,
        "roundOnePairs",
          "Сетка: Сетка Винеров\n" +
          "Турнир стартовал. Пары сформированы случайным образом. Ваши соперники — команда «" +
          participantDisplayName(state, opponentId) + "»." +
          (opponentMembers ? "\nВ составе команды: " + opponentMembers + "." : "") +
          "\nНажмите кнопку «Готов» в приложении."
      ));
    });
  });
  return notifications;
}

function entryPublicName(entry) {
  return cleanText(
    (entry && (entry.pokerPlusNickname || entry.displayName || entry.telegramUsername || entry.accountId)) || "Игрок",
    PLAYER_NAME_MAX
  ) || "Игрок";
}

function entryLevelLabel(entry) {
  const level = Number(entry && entry.level);
  if (!Number.isFinite(level)) return "не указан";
  return Math.floor(level) > 0 ? String(Math.floor(level)) : "Привяжите аккаунт";
}

function entryLevelValue(entry) {
  const level = Number(entry && entry.level);
  return Number.isFinite(level) ? Math.max(0, Math.floor(level)) : 0;
}

function entryPoker21Id(entry) {
  return cleanText(entry && (entry.pokerPlusUserId || entry.p21Id || entry.poker21Id || entry.pokerPlusId), 80);
}

function joinLevelError(entry) {
  if (entryPoker21Id(entry)) {
    return "Заявку могут подать только игроки уровня " + String(MIN_JOIN_LEVEL) + "+. Ваш уровень: " + String(entryLevelValue(entry)) + ".";
  }
  return "Заявку могут подать только игроки уровня " + String(MIN_JOIN_LEVEL) + "+. Привяжите аккаунт Poker21 в профиле, чтобы уровень подтянулся.";
}

async function buildApprovedParticipantBroadcastNotifications(state, approvedEntry) {
  const enrichedEntries = await enrichEntries(state && state.entries ? state.entries : []);
  const approvedRows = enrichedEntries.filter((entry) => entry && entry.status === "approved");
  const approvedTarget = approvedRows.find((entry) => entry.accountId === approvedEntry.accountId) || approvedEntry;
  const number = Math.max(1, approvedRows.length);
  const capacity = Number(state && state.capacity) || 32;
  const spotsLeft = Math.max(0, capacity - number);
  const nick = entryPublicName(approvedTarget);
  const level = entryLevelLabel(approvedTarget);
  const participantList = approvedRows.slice().sort((a, b) => {
    const aTime = Date.parse(a && a.approvedAt || "") || 0;
    const bTime = Date.parse(b && b.approvedAt || "") || 0;
    return aTime - bTime;
  }).map((entry, index) => String(index + 1) + ". " + entryPublicName(entry)).join("\n");
  const text =
    "Принят новый участник в СНГ-турнир Лига чемпионов.\n\n" +
    "Номер: " + String(number) + "/" + String(capacity) + "\n" +
    "Осталось мест: " + String(spotsLeft) + "\n" +
    "Ник: " + nick + "\n" +
    "Уровень: " + level + "\n\n" +
    "Полный список участников:\n" + participantList;
  const seen = new Set();
  return approvedRows
    .map((entry) => {
      const chatId = telegramChatIdFromMemberId(entry && entry.memberId);
      if (!chatId || seen.has(chatId)) return null;
      seen.add(chatId);
      return {
        action: "approvedParticipantBroadcast",
        chatId,
        text,
      };
    })
    .filter(Boolean);
}

async function resolveSngApplicationNotifyChatIds(usernames, configuredChatIds) {
  const targetUsernames = Array.isArray(usernames) ? usernames : SNG_APPLICATION_NOTIFY_USERNAMES;
  const targetChatIds = Array.isArray(configuredChatIds) ? configuredChatIds : SNG_APPLICATION_NOTIFY_CHAT_IDS;
  const seen = new Set();
  const ids = targetChatIds.map(telegramChatIdFromMemberId).filter((id) => {
    if (!id || seen.has(id)) return false;
    seen.add(id);
    return true;
  });
  if (!targetUsernames.length) return ids;
  try {
    const rows = await redisPipeline([["HGETALL", USERNAMES_KEY]], { context: "sng-champions.notify-usernames" });
    const raw = rows && rows[0] && rows[0].result;
    const map = Array.isArray(raw)
      ? raw.reduce((acc, item, index, arr) => {
          if (index % 2 === 0 && item != null) acc[String(item)] = arr[index + 1];
          return acc;
        }, {})
      : raw && typeof raw === "object"
        ? raw
        : {};
    Object.keys(map).forEach((memberId) => {
      const username = cleanHandle(map[memberId]);
      if (!targetUsernames.includes(username)) return;
      const chatId = telegramChatIdFromMemberId(memberId);
      if (chatId && !seen.has(chatId)) {
        seen.add(chatId);
        ids.push(chatId);
      }
    });
  } catch (error) {
    console.warn("sng-champions: notify username lookup failed", error && error.message ? error.message : error);
  }
  return ids;
}

function buildNewApplicationNotification(entry, state) {
  const title = cleanText(state && state.title || DEFAULT_TITLE, 80) || DEFAULT_TITLE;
  const name = entryPublicName(entry);
  const level = entryLevelLabel(entry);
  const telegram = cleanHandle(entry && entry.telegramUsername);
  const poker21Id = entryPoker21Id(entry) || cleanText(entry && entry.accountId, 40);
  const parts = [
    "Новая заявка в " + title,
    "",
    "Игрок: " + name,
    telegram ? "Telegram: @" + telegram : "",
    "Уровень: " + level,
    "ID Poker21: " + poker21Id,
  ].filter(Boolean);
  return parts.join("\n");
}

async function notifySngApplication(entry, state) {
  if (!BOT_TOKEN || !entry) return;
  const ids = await resolveSngApplicationNotifyChatIds();
  if (!ids.length) return;
  const url = sngOpenUrl();
  const text = buildNewApplicationNotification(entry, state);
  for (const chatId of ids) {
    const result = await sendTelegramMessage(BOT_TOKEN, {
      chatId,
      text,
      buttonText: url ? "Открыть СНГ Лигу" : undefined,
      buttonUrl: url || undefined,
    });
    if (!result || !result.ok) {
      console.warn("sng-champions: application notification failed", {
        chatId,
        hint: result && (result.hint || result.error || result.error_code),
      });
    }
  }
}

async function notifySngBalancePaid(entry, state) {
  if (!BOT_TOKEN || !entry) return;
  const ids = await resolveSngApplicationNotifyChatIds();
  if (!ids.length) return;
  const title = cleanText(state && state.title || DEFAULT_TITLE, 80) || DEFAULT_TITLE;
  const name = entryPublicName(entry);
  const telegram = cleanHandle(entry.telegramUsername);
  const text = [
    "Игрок пополнил баланс и хочет вступить в СНГ",
    "",
    "Турнир: " + title,
    "Игрок: " + name,
    telegram ? "Telegram: @" + telegram : "",
    "ID Poker21: " + (entryPoker21Id(entry) || cleanText(entry.accountId, 40)),
  ].filter(Boolean).join("\n");
  const url = sngOpenUrl();
  for (const chatId of ids) {
    await sendTelegramMessage(BOT_TOKEN, {
      chatId,
      text,
      buttonText: url ? "Открыть СНГ Лигу" : undefined,
      buttonUrl: url || undefined,
    });
  }
}

async function notifyEntryStatus(notification) {
  if (!notification || !BOT_TOKEN || !notification.chatId || !notification.text) return;
  const url = sngOpenUrl();
  const result = await sendTelegramMessage(BOT_TOKEN, {
    chatId: notification.chatId,
    text: notification.text,
    buttonText: url ? "СНГ Лига чемпионов" : undefined,
    buttonUrl: url || undefined,
  });
  if (!result || !result.ok) {
    console.warn("sng-champions: player notification failed", {
      action: notification.action,
      chatId: notification.chatId,
      hint: result && (result.hint || result.error || result.error_code),
    });
  }
}

function entryId() {
  return "sng_" + Date.now().toString(36) + "_" + crypto.randomBytes(4).toString("hex");
}

function matchId(roundIndex, index) {
  return "sng_r" + String(roundIndex) + "_" + String(index);
}

function loserMatchId(roundIndex, index) {
  return "sng_l" + String(roundIndex) + "_" + String(index);
}

function defaultState() {
  return {
    version: 1,
    id: "sng_" + Date.now().toString(36) + "_" + crypto.randomBytes(3).toString("hex"),
    title: DEFAULT_TITLE,
    description: "",
    tournamentType: "solo",
    loserBracketEnabled: true,
    knockoutEnabled: false,
    isTest: false,
    payoutConfig: normalizePayoutConfig(null),
    status: "draft",
    capacity: 32,
    buyIn: "0р",
    prizes: [
      { place: 1, text: "30 000р" },
      { place: 2, text: "билет на нок за 10 000р от клуба" },
    ],
    entries: [],
    teams: [],
    bracket: null,
    rounds: [],
    loserRounds: [],
    currentRoundId: "",
    history: [],
    updatedAt: new Date().toISOString(),
  };
}

function normalizePrizes(raw) {
  const fallback = defaultState().prizes;
  const rows = Array.isArray(raw) ? raw : [];
  const normalized = rows.map((item, index) => {
    const row = item && typeof item === "object" ? item : {};
    return {
      place: Math.max(1, Math.floor(Number(row.place) || index + 1)),
      text: cleanText(row.text, PRIZE_TEXT_MAX),
    };
  }).filter((item) => item.text);
  return normalized.length ? normalized.slice(0, 6) : fallback;
}

function normalizeEntry(raw) {
  const row = raw && typeof raw === "object" ? raw : {};
  const status = ["pending", "approved", "rejected", "balance_requested"].includes(row.status) ? row.status : "pending";
  const level = Number(row.level);
  return {
    id: cleanText(row.id, 80) || entryId(),
    accountId: cleanText(row.accountId, 40),
    memberId: cleanText(row.memberId, 40),
    displayName: cleanText(row.displayName, PLAYER_NAME_MAX),
    pokerPlusNickname: cleanText(row.pokerPlusNickname, PLAYER_NAME_MAX),
    pokerPlusUserId: cleanText(row.pokerPlusUserId, 80),
    level: Number.isFinite(level) ? Math.max(0, Math.floor(level)) : null,
    profileCity: cleanText(row.profileCity || row.city, 40),
    telegramUsername: cleanText(row.telegramUsername, 64),
    status,
    joinedAt: cleanText(row.joinedAt, 40),
    approvedAt: cleanText(row.approvedAt, 40),
    rejectedAt: cleanText(row.rejectedAt, 40),
    balanceRequestedAt: cleanText(row.balanceRequestedAt, 40),
    balancePaidAt: cleanText(row.balancePaidAt, 40),
    selectedForBracket: row.selectedForBracket === true,
  };
}

function entryIdentityValues(entry) {
  const row = entry && typeof entry === "object" ? entry : {};
  return [
    cleanText(row.accountId, 80),
    cleanText(row.memberId, 80),
    cleanText(row.pokerPlusUserId, 80),
  ].filter(Boolean);
}

function entriesShareIdentity(left, right) {
  const leftIds = new Set(entryIdentityValues(left));
  return entryIdentityValues(right).some((id) => leftIds.has(id));
}

function entryStatusPriority(status) {
  return { rejected: 0, pending: 1, balance_requested: 2, approved: 3 }[status] || 0;
}

function dedupeEntries(entries) {
  return (Array.isArray(entries) ? entries : []).reduce((rows, rawEntry) => {
    const entry = normalizeEntry(rawEntry);
    const duplicateIndex = rows.findIndex((item) => entriesShareIdentity(item, entry));
    if (duplicateIndex < 0) {
      rows.push(entry);
      return rows;
    }
    const previous = rows[duplicateIndex];
    const preferred = entryStatusPriority(entry.status) > entryStatusPriority(previous.status) ? entry : previous;
    const latest = String(entry.joinedAt || "") >= String(previous.joinedAt || "") ? entry : previous;
    rows[duplicateIndex] = normalizeEntry({
      ...latest,
      ...preferred,
      accountId: latest.accountId || preferred.accountId,
      memberId: latest.memberId || preferred.memberId,
      pokerPlusUserId: preferred.pokerPlusUserId || latest.pokerPlusUserId,
    });
    return rows;
  }, []);
}

async function getProfileCities(accountIds) {
  const ids = Array.from(new Set((accountIds || []).map((id) => cleanText(id, 40)).filter(Boolean)));
  const out = {};
  if (!ids.length) return out;
  try {
    const rows = await redisPipeline([["HMGET", PROFILE_CITY_KEY, ...ids]], { context: "sng-champions.profile-cities" });
    const values = rows && rows[0] && Array.isArray(rows[0].result) ? rows[0].result : [];
    ids.forEach((id, index) => {
      const city = cleanText(values[index], 40);
      if (city) out[id] = city;
    });
  } catch (e) {
    return out;
  }
  return out;
}

async function getTelegramVisibility(accountIds) {
  const ids = Array.from(new Set((accountIds || []).map((id) => cleanText(id, 40)).filter(Boolean)));
  const out = {};
  if (!ids.length) return out;
  try {
    const rows = await redisPipeline([["HMGET", TELEGRAM_VISIBLE_HASH, ...ids]], { context: "sng-champions.telegram-visibility" });
    const values = rows && rows[0] && Array.isArray(rows[0].result) ? rows[0].result : [];
    ids.forEach((id, index) => {
      if (String(values[index] || "") === "1") out[id] = true;
    });
  } catch (e) {
    return out;
  }
  return out;
}

async function getTelegramUsernames(accountIds) {
  const ids = Array.from(new Set((accountIds || []).map((id) => cleanText(id, 40)).filter(Boolean)));
  const out = {};
  if (!ids.length) return out;
  try {
    const rows = await redisPipeline([["HMGET", USERNAMES_KEY, ...ids]], { context: "sng-champions.telegram-usernames" });
    const values = rows && rows[0] && Array.isArray(rows[0].result) ? rows[0].result : [];
    ids.forEach((id, index) => {
      const username = cleanText(values[index], 64);
      if (username) out[id] = username;
    });
  } catch (e) {
    return out;
  }
  return out;
}

async function getPokerPlusBoundAccountIds(pokerPlusIds) {
  const wanted = new Set((pokerPlusIds || []).map((id) => cleanText(id, 80)).filter(Boolean));
  const out = {};
  if (!wanted.size) return out;
  try {
    const rows = await redisPipeline([["HGETALL", POKERPLUS_BIND_HASH_KEY]], { context: "sng-champions.pokerplus-bound-accounts" });
    const pairs = redisHashFlatPairs(rows && rows[0] && rows[0].result);
    for (let i = 0; i < pairs.length; i += 2) {
      const accountId = cleanText(pairs[i], 40);
      const pokerPlusId = cleanText(pairs[i + 1], 80);
      if (!accountId || !wanted.has(pokerPlusId)) continue;
      if (!out[pokerPlusId]) out[pokerPlusId] = [];
      out[pokerPlusId].push(accountId);
    }
  } catch (e) {
    return out;
  }
  return out;
}

function sngNicknameKey(value) {
  return cleanText(value, PLAYER_NAME_MAX)
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/ё/g, "е");
}

function redisHashFlatPairs(value) {
  if (Array.isArray(value)) return value;
  if (!value || typeof value !== "object") return [];
  return Object.keys(value).flatMap((key) => [key, value[key]]);
}

async function getProfileCityNickIndex(entries) {
  const wantedNicks = new Set((entries || []).flatMap((entry) => [
    entry && entry.pokerPlusNickname,
    entry && entry.displayName,
  ]).map(sngNicknameKey).filter(Boolean));
  const out = {};
  if (!wantedNicks.size) return out;
  try {
    const baseRows = await redisPipeline([
      ["HGETALL", PROFILE_CITY_KEY],
      ["HGETALL", POKERPLUS_BIND_HASH_KEY],
    ], { context: "sng-champions.profile-city-nick-base" });
    const cityPairs = redisHashFlatPairs(baseRows && baseRows[0] && baseRows[0].result);
    const bindPairs = redisHashFlatPairs(baseRows && baseRows[1] && baseRows[1].result);
    const cityByAccount = {};
    for (let i = 0; i < cityPairs.length; i += 2) {
      const accountId = cleanText(cityPairs[i], 40);
      const city = cleanText(cityPairs[i + 1], 40);
      if (accountId && city) cityByAccount[accountId] = city;
    }
    const profileIds = [];
    const profileIdToCity = {};
    for (let i = 0; i < bindPairs.length; i += 2) {
      const accountId = cleanText(bindPairs[i], 40);
      const profileId = cleanText(bindPairs[i + 1], 80);
      const city = cityByAccount[accountId];
      if (!profileId || !city) continue;
      if (!profileIdToCity[profileId]) profileIds.push(profileId);
      profileIdToCity[profileId] = city;
    }
    if (!profileIds.length) return out;
    const profileRows = await redisPipeline(profileIds.map((id) => ["HGET", PROFILE_HASH_KEY, id]), { context: "sng-champions.profile-city-nick-profiles" });
    profileIds.forEach((profileId, index) => {
      const profile = parsePokerPlusProfileLite(profileRows && profileRows[index] && profileRows[index].result, null);
      const nick = sngNicknameKey(pokerPlusNicknameFromProfile(profile));
      if (nick && wantedNicks.has(nick) && !out[nick]) out[nick] = profileIdToCity[profileId] || "";
    });
  } catch (e) {
    return out;
  }
  return out;
}

function profileCityForEntry(entry, profileCities, boundAccountIds, cityByNick) {
  if (!entry || !profileCities) return cleanText(entry && entry.profileCity, 40);
  const linkedIds = boundAccountIds && entry.pokerPlusUserId ? boundAccountIds[entry.pokerPlusUserId] || [] : [];
  const nickCity =
    (cityByNick && cityByNick[sngNicknameKey(entry.pokerPlusNickname)]) ||
    (cityByNick && cityByNick[sngNicknameKey(entry.displayName)]) ||
    "";
  return (
    profileCities[entry.accountId] ||
    profileCities[entry.memberId] ||
    profileCities[entry.pokerPlusUserId] ||
    linkedIds.map((id) => profileCities[id]).find(Boolean) ||
    nickCity ||
    cleanText(entry.profileCity || entry.city, 40) ||
    ""
  );
}

function normalizeState(raw) {
  const state = raw && typeof raw === "object" ? raw : defaultState();
  state.version = 1;
  state.id = cleanText(state.id, 80) || defaultState().id;
  state.title = cleanText(state.title || DEFAULT_TITLE, 80) || DEFAULT_TITLE;
  if (state.title === "СНГ Лига Чемпионов" || state.title === "СНГ Лига Чемпионов Два Туза") state.title = DEFAULT_TITLE;
  state.description = cleanMultilineText(state.description, DESCRIPTION_MAX);
  state.status = ["draft", "open", "bracket", "completed"].includes(state.status) ? state.status : "draft";
  state.capacity = [16, 32, 64].includes(Number(state.capacity)) ? Number(state.capacity) : 32;
  state.tournamentType = state.tournamentType === "team" ? "team" : "solo";
  state.loserBracketEnabled = state.tournamentType === "team" ? false : state.loserBracketEnabled !== false;
  state.knockoutEnabled = state.knockoutEnabled === true;
  state.isTest = state.isTest === true;
  state.payoutConfig = normalizePayoutConfig(state.payoutConfig);
  state.teams = Array.isArray(state.teams) ? state.teams.map((team) => ({
    id: cleanText(team && team.id, 80),
    name: cleanText(team && team.name, 80),
    memberIds: Array.isArray(team && team.memberIds) ? team.memberIds.map((id) => cleanText(id, 80)).filter(Boolean).slice(0, 2) : [],
    playerRenamedAt: cleanText(team && team.playerRenamedAt, 40),
  })).filter((team) => team.id && team.memberIds.length === 2) : [];
  state.buyIn = cleanText(state.buyIn || defaultState().buyIn, BUY_IN_MAX) || defaultState().buyIn;
  state.prizes = normalizePrizes(state.prizes);
  state.entries = dedupeEntries(state.entries).filter((entry) => entry.accountId);
  state.bracket = state.bracket && typeof state.bracket === "object" ? state.bracket : null;
  state.rounds = Array.isArray(state.rounds) ? state.rounds : [];
  state.loserRounds = Array.isArray(state.loserRounds) ? state.loserRounds : [];
  if (state.tournamentType === "team") state.loserRounds = [];
  state.currentRoundId = cleanText(state.currentRoundId, 80);
  state.winnersBracketWinnerId = cleanText(state.winnersBracketWinnerId, 80);
  state.history = Array.isArray(state.history) ? state.history.map(normalizeHistoryItem).filter((item) => item.completedAt && item.winners.length) : [];
  return state;
}

function normalizeHistoryWinner(raw) {
  const row = raw && typeof raw === "object" ? raw : {};
  const place = Math.max(1, Math.floor(Number(row.place) || 0));
  return {
    place,
    entryId: cleanText(row.entryId || row.id, 80),
    accountId: cleanText(row.accountId, 40),
    memberId: cleanText(row.memberId, 40),
    displayName: cleanText(row.displayName, PLAYER_NAME_MAX),
    pokerPlusNickname: cleanText(row.pokerPlusNickname, PLAYER_NAME_MAX),
    telegramUsername: cleanText(row.telegramUsername, 64),
  };
}

function normalizeHistoryItem(raw) {
  const row = raw && typeof raw === "object" ? raw : {};
  return {
    title: cleanText(row.title || DEFAULT_TITLE, 80) || DEFAULT_TITLE,
    completedAt: cleanText(row.completedAt, 40),
    season: cleanText(row.season, 40),
    winners: Array.isArray(row.winners) ? row.winners.map(normalizeHistoryWinner).filter((item) => item.place && item.entryId) : [],
  };
}

async function loadTournamentStore() {
  const raw = redisConfigured() ? await getJson(STATE_KEY, null, { context: "sng-champions.load" }) : null;
  if (raw && Array.isArray(raw.tournaments)) {
    const tournaments = raw.tournaments.map(normalizeState);
    return { version: 2, tournaments: tournaments.length ? tournaments : [defaultState()] };
  }
  return { version: 2, tournaments: [normalizeState(raw || defaultState())] };
}

function selectTournament(store, requestedId, includeTests) {
  const id = cleanText(requestedId, 80);
  const rows = includeTests ? store.tournaments : store.tournaments.filter((item) => item.isTest !== true);
  return (id && rows.find((item) => item.id === id)) ||
    rows.find((item) => item.status === "open") ||
    rows.find((item) => item.status === "bracket") || rows[0] || defaultState();
}

function activeTournamentRound(item) {
  if (!item || item.status !== "bracket") return "";
  const grandFinal = (item.loserRounds || []).find((round) => Number(round && round.index) === 9 && roundHasPlayableOpenMatch(round));
  if (grandFinal) return grandFinal;
  const current = (item.rounds || []).concat(item.loserRounds || []).find((round) => round && round.id === item.currentRoundId && roundHasPlayableOpenMatch(round));
  if (current) return current;
  const playable = (item.rounds || []).concat(item.loserRounds || []).filter(roundHasPlayableOpenMatch);
  return playable.length ? playable[playable.length - 1] : null;
}

function activeTournamentStage(item) {
  const round = activeTournamentRound(item);
  return round ? roundStageLabelForState(item, round) : "";
}

function activeTournamentPairs(item) {
  const round = activeTournamentRound(item);
  if (!round) return [];
  const names = new Map();
  (item.entries || []).forEach((entry) => {
    if (!entry || !entry.id) return;
    names.set(entry.id, cleanText(entry.pokerPlusNickname || entry.displayName || "Игрок", PLAYER_NAME_MAX) || "Игрок");
  });
  (item.teams || []).forEach((team) => {
    if (!team || !team.id) return;
    names.set(team.id, cleanText(team.name, PLAYER_NAME_MAX) || "Команда");
  });
  return (round.matches || []).filter((match) => {
    return match && !cleanText(match.winnerId, 80) && playableIds(match).length === 2;
  }).map((match) => {
    const ids = playableIds(match);
    return { left: names.get(ids[0]) || "Игрок", right: names.get(ids[1]) || "Игрок" };
  });
}

function tournamentWinnerName(item) {
  const winnerId = cleanText(item && item.winnerId, 80);
  if (!winnerId) return "";
  const entry = (item.entries || []).find((row) => row && row.id === winnerId);
  if (entry) return cleanText(entry.pokerPlusNickname || entry.displayName || "", PLAYER_NAME_MAX);
  const team = (item.teams || []).find((row) => row && row.id === winnerId);
  return team ? cleanText(team.name || "", PLAYER_NAME_MAX) : "";
}

function tournamentMenu(store, includeTests) {
  return store.tournaments.filter((item) => includeTests || item.isTest !== true).map((item) => ({ id: item.id, title: item.title, status: item.status,
    completedAt: item.completedAt || "", approved: (item.entries || []).filter((entry) => entry.status === "approved").length,
    pending: (item.entries || []).filter((entry) => entry.status === "pending" || entry.status === "balance_requested").length,
    capacity: item.capacity, activeStage: activeTournamentStage(item), activePairs: activeTournamentPairs(item), winnerName: tournamentWinnerName(item), buyIn: item.buyIn || "1000р",
    prize1: item.prizes && item.prizes[0] ? item.prizes[0].text : "50 000р",
    prize2: item.prizes && item.prizes[1] ? item.prizes[1].text : "Билет за 10 000р",
    loserBracket: item.loserBracketEnabled !== false, knockoutEnabled: item.knockoutEnabled === true, isTest: item.isTest === true, tournamentType: item.tournamentType }));
}

async function saveState(state, store) {
  state.updatedAt = new Date().toISOString();
  await setJson(STATE_KEY, store || { version: 2, tournaments: [state] }, { context: "sng-champions.save" });
}

function setShortPublicCacheHeaders(res, seconds) {
  if (!res || typeof res.setHeader !== "function") return;
  const ttl = Math.max(5, Number(seconds) || 30);
  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=" + ttl + ", stale-while-revalidate=" + ttl);
}

function publicHomeSummary(state) {
  const entries = Array.isArray(state && state.entries) ? state.entries : [];
  const counts = {
    pending: entries.filter((entry) => entry && (entry.status === "pending" || entry.status === "balance_requested")).length,
    approved: entries.filter((entry) => entry && entry.status === "approved").length,
    rejected: entries.filter((entry) => entry && entry.status === "rejected").length,
    balanceRequested: entries.filter((entry) => entry && entry.status === "balance_requested").length,
  };
  return {
    ok: true,
    tournamentId: state.id,
    summary: true,
    status: state.status,
    title: state.title,
    buyIn: state.buyIn || defaultState().buyIn,
    prizes: state.prizes || [],
    activeStage: activeTournamentStage(state),
    capacity: state.capacity,
    counts,
    updatedAt: state.updatedAt || "",
  };
}

function publicStateVersion(state) {
  const entries = Array.isArray(state && state.entries) ? state.entries : [];
  const counts = {
    pending: entries.filter((entry) => entry && (entry.status === "pending" || entry.status === "balance_requested")).length,
    approved: entries.filter((entry) => entry && entry.status === "approved").length,
    rejected: entries.filter((entry) => entry && entry.status === "rejected").length,
    balanceRequested: entries.filter((entry) => entry && entry.status === "balance_requested").length,
  };
  const revision = [
    cleanText(state && state.updatedAt, 40),
    cleanText(state && state.status, 40),
    cleanText(state && state.currentRoundId, 80),
    counts.pending,
    counts.approved,
    counts.rejected,
    counts.balanceRequested,
  ].join("|");
  return {
    ok: true,
    mode: "version",
    status: state.status,
    currentRoundId: state.currentRoundId || "",
    winnerId: state.winnerId || "",
    completedAt: state.completedAt || "",
    activeStage: activeTournamentStage(state),
    updatedAt: state.updatedAt || "",
    revision,
    counts,
    serverTime: new Date().toISOString(),
  };
}

function displayNameFromIdentity(identity, fallback) {
  const first = cleanText(identity && identity.firstName, 40);
  const last = cleanText(identity && identity.lastName, 40);
  const username = cleanText(identity && (identity.telegramUsername || identity.pwaUsername), 40);
  const name = [first, last].filter(Boolean).join(" ");
  if (name) return name;
  if (username) return "@" + username.replace(/^@+/, "");
  return fallback || "Игрок";
}

function pokerPlusNicknameFromProfile(profile) {
  return cleanText(
    profile && (profile.nickname || profile.Nike || profile.nick || profile.name || profile.displayName || profile.display_name),
    PLAYER_NAME_MAX
  );
}

function parsePokerPlusProfileLite(rawProfile, syncedAtRaw) {
  const raw = rawProfile != null ? String(rawProfile) : "";
  if (!raw) return null;
  let parsed = null;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    parsed = null;
  }
  if (!parsed || typeof parsed !== "object") return null;
  const syncedAt = syncedAtRaw != null ? Number(String(syncedAtRaw).trim()) || null : null;
  if (syncedAt) parsed.syncedAt = syncedAt;
  return parsed;
}

async function readPokerPlusProfilesLite(ids) {
  const unique = [...new Set((Array.isArray(ids) ? ids : []).map((id) => cleanText(id, 80)).filter(Boolean))];
  if (!unique.length) return new Map();
  const rows = await redisPipeline(unique.flatMap((id) => [
    ["HGET", PROFILE_HASH_KEY, id],
    ["HGET", PROFILE_SYNC_AT_HASH_KEY, id],
  ]), { context: "sng-champions.profile-lite" });
  const out = new Map();
  unique.forEach((id, index) => {
    const profileRow = rows && rows[index * 2];
    const syncRow = rows && rows[index * 2 + 1];
    const profile = parsePokerPlusProfileLite(profileRow && profileRow.result, syncRow && syncRow.result);
    if (profile) out.set(id, profile);
  });
  return out;
}

async function enrichEntries(entries) {
  const rows = Array.isArray(entries) ? entries.map((entry) => ({ ...entry })) : [];
  const lookupRows = rows.filter((entry) => entry && (entry.accountId || entry.memberId));
  if (!lookupRows.length) return rows;

  let bindRows = [];
  try {
    bindRows = await redisPipeline(lookupRows.flatMap((entry) => [
      ["HGET", POKERPLUS_BIND_HASH_KEY, entry.accountId || ""],
      ["HGET", POKERPLUS_BIND_HASH_KEY, entry.memberId || ""],
    ]));
  } catch (error) {
    bindRows = [];
  }

  const candidatesByIndex = lookupRows.map((entry, index) => {
    const accountId = cleanText(entry.accountId, 40);
    const p21Id = cleanText(
      (bindRows[index * 2] && bindRows[index * 2].result) ||
        (bindRows[index * 2 + 1] && bindRows[index * 2 + 1].result),
      80
    );
    return [p21Id, accountId].filter(Boolean);
  });
  const profileMap = await readPokerPlusProfilesLite(candidatesByIndex.flat());

  lookupRows.forEach((entry, index) => {
    const candidates = candidatesByIndex[index] || [];
    let profile = null;
    let profileId = "";
    for (const id of candidates) {
      profile = profileMap.get(id) || null;
      profileId = id;
      if (profile) break;
    }
    if (!profile) return;
    const nickname = pokerPlusNicknameFromProfile(profile);
    const status = pokerProfileStatusFromCachedProfile(profile, { pokerPlusLinked: true });
    const level = status && Number.isFinite(Number(status.level)) ? Math.max(0, Math.floor(Number(status.level))) : 0;
    const profilePoker21Id = cleanText(
      profile && (
        profile.pokerPlusUserId ||
        profile.pokerPlusUserID ||
        profile.poker21UserId ||
        profile.poker21Id ||
        profile.Id ||
        profile.id ||
        profile.userId ||
        profile.p21Id
      ),
      80
    );
    // A cached profile may be stored under the app account (DT-ID). That lookup
    // key identifies our account, not the player inside Poker21.
    if (profilePoker21Id || profileId) entry.pokerPlusUserId = profilePoker21Id || profileId;
    if (nickname) {
      entry.pokerPlusNickname = nickname;
      entry.displayName = nickname;
    }
    entry.level = level;
  });

  return rows;
}

function shuffle(items) {
  const out = (items || []).slice();
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = crypto.randomInt(i + 1);
    const tmp = out[i];
    out[i] = out[j];
    out[j] = tmp;
  }
  return out;
}

function roundName(roundIndex, count) {
  if (count === 1) return "Финал";
  if (roundIndex === 1) return "1ый раунд";
  return String(roundIndex) + "ый раунд";
}

function makeMatch(roundIndex, index, playerIds) {
  const ids = (playerIds || []).filter(Boolean);
  return {
    id: matchId(roundIndex, index),
    index,
    playerIds: ids,
    winnerId: "",
    readyById: {},
    readyMemberIds: {},
    readyDeadlineAt: "",
    playingAt: "",
    tablePassword: "",
    autoWinnerId: "",
    teamRoundWinnerId: "",
    singlesPlayers: null,
    singlesRoundWinnerId: "",
    deciderPlayers: null,
    deciderRoundWinnerId: "",
    roundPasswords: {},
    liveScore: null,
    score: null,
  };
}

function makeRound(roundIndex, playerIds) {
  const matches = [];
  for (let i = 0; i < playerIds.length; i += 2) {
    matches.push(makeMatch(roundIndex, matches.length + 1, playerIds.slice(i, i + 2)));
  }
  return {
    id: "round_" + String(roundIndex),
    index: roundIndex,
    name: roundName(roundIndex, matches.length),
    startedAt: new Date().toISOString(),
    matches,
  };
}

function makeEmptyRound(roundIndex, matchCount) {
  const matches = [];
  const count = Math.max(1, Math.floor(Number(matchCount) || 1));
  for (let i = 0; i < count; i += 1) {
    matches.push(makeMatch(roundIndex, i + 1, []));
  }
  return {
    id: "round_" + String(roundIndex),
    index: roundIndex,
    name: roundName(roundIndex, matches.length),
    startedAt: new Date().toISOString(),
    matches,
  };
}

function makeEmptyLoserRound(roundIndex, matchCount) {
  const matches = [];
  const count = Math.max(1, Math.floor(Number(matchCount) || 1));
  for (let i = 0; i < count; i += 1) {
    matches.push({
      ...makeMatch(roundIndex, i + 1, []),
      id: loserMatchId(roundIndex, i + 1),
      loserBracket: true,
    });
  }
  return {
    id: "loser_round_" + String(roundIndex),
    index: roundIndex,
    name: roundIndex === 9 ? "Гранд-финал" : "Нижняя сетка " + String(roundIndex),
    startedAt: new Date().toISOString(),
    loserBracket: true,
    matches,
  };
}

function seedFirstRound(playerIds, bracketSize) {
  const ids = (playerIds || []).filter(Boolean);
  const size = Math.max(2, Math.floor(Number(bracketSize) || ids.length || 2));
  const matchCount = Math.max(1, Math.ceil(size / 2));
  const pairedMatchCount = Math.max(0, ids.length - matchCount);
  const matches = [];
  let cursor = 0;
  for (let index = 0; index < matchCount; index += 1) {
    const shouldPair = index % 2 === 0 && pairedMatchCount > Math.floor(index / 2);
    const take = shouldPair ? 2 : 1;
    matches.push(makeMatch(1, index + 1, ids.slice(cursor, cursor + take)));
    cursor += take;
  }
  while (cursor < ids.length) {
    const target = matches.find((match) => playableIds(match).length < 2);
    if (!target) break;
    target.playerIds.push(ids[cursor]);
    cursor += 1;
  }
  return {
    id: "round_1",
    index: 1,
    name: roundName(1, matches.length),
    startedAt: new Date().toISOString(),
    matches,
  };
}

function makeBracketRounds(playerIds, bracketSize) {
  const firstRound = seedFirstRound(playerIds, bracketSize);
  const rounds = [firstRound];
  let matchCount = firstRound.matches.length;
  let roundIndex = 2;
  while (matchCount > 1) {
    matchCount = Math.ceil(matchCount / 2);
    rounds.push(makeEmptyRound(roundIndex, matchCount));
    roundIndex += 1;
  }
  return rounds;
}

function roundSourcesSettled(round) {
  return (round && Array.isArray(round.matches) ? round.matches : []).every((match) => {
    return !!cleanText(match && match.winnerId, 80) || playableIds(match).length < 2;
  });
}

function advanceBracketByes(state, nowMs) {
  if (!state || state.status !== "bracket") return false;
  let changed = false;
  let progressed = true;
  while (progressed && state.status === "bracket") {
    progressed = false;
    (state.rounds || []).forEach((round, index) => {
      if (index > 0 && !roundSourcesSettled(state.rounds[index - 1])) return;
      (round.matches || []).forEach((match) => {
        const ids = playableIds(match);
        if (ids.length !== 1 || match.winnerId) return;
        match.winnerId = ids[0];
        match.autoWinnerId = ids[0];
        match.completedAt = new Date(nowMs || Date.now()).toISOString();
        placeWinnerInNextRound(state, round, match, ids[0], nowMs);
        changed = true;
        progressed = true;
      });
    });
    (state.loserRounds || []).forEach((round, index) => {
      const previousLoserSettled = index === 0 || roundSourcesSettled(state.loserRounds[index - 1]);
      const upperSourceIndex = index === 0 ? 0 : index === 1 ? 1 : index === 3 ? 2 : index === 5 ? 3 : index === 7 ? 4 : -1;
      const upperSettled = upperSourceIndex < 0 || roundSourcesSettled(state.rounds[upperSourceIndex]);
      if (!previousLoserSettled || !upperSettled) return;
      (round.matches || []).forEach((match) => {
        const ids = playableIds(match);
        if (ids.length !== 1 || match.winnerId) return;
        match.winnerId = ids[0];
        match.autoWinnerId = ids[0];
        match.completedAt = new Date(nowMs || Date.now()).toISOString();
        placeLoserBracketWinner(state, round, match, ids[0], nowMs);
        changed = true;
        progressed = true;
      });
    });
  }
  updateCurrentRoundId(state);
  return changed;
}

function makeLoserBracketRounds() {
  return [8, 8, 4, 4, 2, 2, 1, 1, 1].map((count, index) => makeEmptyLoserRound(index + 1, count));
}

function playableIds(match) {
  return (Array.isArray(match && match.playerIds) ? match.playerIds : []).filter(Boolean);
}

function normalizeMatchRuntime(match) {
  if (!match || typeof match !== "object") return;
  const ids = playableIds(match);
  const ready = match.readyById && typeof match.readyById === "object" ? match.readyById : {};
  const normalizedReady = {};
  ids.forEach((id) => {
    if (ready[id] === true || ready[id] === "true") normalizedReady[id] = true;
  });
  match.readyById = normalizedReady;
  const readyMembers = match.readyMemberIds && typeof match.readyMemberIds === "object" ? match.readyMemberIds : {};
  match.readyMemberIds = Object.keys(readyMembers).reduce((result, id) => {
    const cleanId = cleanText(id, 80);
    if (cleanId && (readyMembers[id] === true || readyMembers[id] === "true")) result[cleanId] = true;
    return result;
  }, {});
  match.readyDeadlineAt = cleanText(match.readyDeadlineAt, 40);
  match.playingAt = cleanText(match.playingAt, 40);
  match.completedAt = cleanText(match.completedAt, 40);
  match.tablePassword = cleanText(match.tablePassword, 4);
  match.autoWinnerId = cleanText(match.autoWinnerId, 80);
  match.teamRoundWinnerId = cleanText(match.teamRoundWinnerId, 80);
  match.singlesRoundWinnerId = cleanText(match.singlesRoundWinnerId, 80);
  match.deciderRoundWinnerId = cleanText(match.deciderRoundWinnerId, 80);
  const roundPasswords = match.roundPasswords && typeof match.roundPasswords === "object" ? match.roundPasswords : {};
  match.roundPasswords = [1, 2, 3].reduce((result, game) => {
    const password = cleanText(roundPasswords[String(game)] || roundPasswords[game], 4);
    if (/^\d{4}$/.test(password)) result[String(game)] = password;
    return result;
  }, {});
  if (match.singlesPlayers && typeof match.singlesPlayers === "object") {
    match.singlesPlayers = {
      first: cleanText(match.singlesPlayers.first, 80),
      second: cleanText(match.singlesPlayers.second, 80),
    };
  } else {
    match.singlesPlayers = null;
  }
  if (match.deciderPlayers && typeof match.deciderPlayers === "object") {
    match.deciderPlayers = {
      first: cleanText(match.deciderPlayers.first, 80),
      second: cleanText(match.deciderPlayers.second, 80),
    };
  } else {
    match.deciderPlayers = null;
  }
  if (match.liveScore && typeof match.liveScore === "object") {
    const first = Number(match.liveScore.first);
    const second = Number(match.liveScore.second);
    match.liveScore = Number.isFinite(first) && Number.isFinite(second)
      ? { first: Math.max(0, Math.floor(first)), second: Math.max(0, Math.floor(second)) }
      : null;
  } else {
    match.liveScore = null;
  }
  if (match.score && typeof match.score === "object") {
    const winner = Number(match.score.winner);
    const loser = Number(match.score.loser);
    match.score = Number.isFinite(winner) && Number.isFinite(loser)
      ? {
        winnerId: cleanText(match.score.winnerId, 80),
        loserId: cleanText(match.score.loserId, 80),
        winner: Math.max(0, Math.floor(winner)),
        loser: Math.max(0, Math.floor(loser)),
        text: cleanText(match.score.text, 12),
      }
      : null;
  } else {
    match.score = null;
  }
}

function matchRequiresScore(state, found) {
  return !!(found && found.match && playableIds(found.match).length >= 2 && matchWinTarget(state, found));
}

function matchWinTarget(state, found) {
  if (state && state.tournamentType === "team") return 2;
  if (found && found.bracket === "losers") {
    const loserRoundIndex = Number(found.round && found.round.index) || 0;
    if (loserRoundIndex === 9) return 3;
    return loserRoundIndex >= 7 ? 2 : 0;
  }
  const label = roundStageLabelForState(state, found && found.round).toLowerCase();
  if (label === "1/2" || label.includes("полуфинал")) return 2;
  if (label.includes("финал")) return 3;
  return 0;
}

function normalizeIntermediateMatchScore(rawScore, targetWins) {
  const score = rawScore && typeof rawScore === "object" ? rawScore : null;
  const first = Number(score && score.first);
  const second = Number(score && score.second);
  if (!score || !Number.isFinite(first) || !Number.isFinite(second)) {
    return { ok: false, error: "Укажите промежуточный счёт матча" };
  }
  const firstGames = Math.floor(first);
  const secondGames = Math.floor(second);
  if (firstGames < 0 || secondGames < 0) return { ok: false, error: "Счёт не может быть отрицательным" };
  if (!targetWins) return { ok: false, error: "Для этого этапа промежуточный счёт не используется" };
  if (firstGames >= targetWins || secondGames >= targetWins) {
    return { ok: false, error: "При достижении нужного числа побед выберите победителя пары" };
  }
  return { ok: true, score: { first: firstGames, second: secondGames } };
}

function normalizeMatchScore(rawScore, match, winnerId, targetWins) {
  const ids = playableIds(match);
  const loserId = ids.find((id) => id && id !== winnerId) || "";
  const score = rawScore && typeof rawScore === "object" ? rawScore : null;
  const winnerScore = Number(score && score.winner);
  const loserScore = Number(score && score.loser);
  if (!score || !Number.isFinite(winnerScore) || !Number.isFinite(loserScore)) {
    return { ok: false, error: "Укажите счёт матча" };
  }
  const winnerGames = Math.floor(winnerScore);
  const loserGames = Math.floor(loserScore);
  if (winnerGames < 1 || loserGames < 0 || winnerGames <= loserGames) {
    return { ok: false, error: "Счёт должен быть в пользу выбранного победителя" };
  }
  if (targetWins && (winnerGames !== targetWins || loserGames >= targetWins)) {
    return { ok: false, error: "Итоговый счёт должен соответствовать формату игры до " + String(targetWins) + " побед" };
  }
  return {
    ok: true,
    score: {
      winnerId,
      loserId,
      winner: winnerGames,
      loser: loserGames,
      text: `${winnerGames}-${loserGames}`,
    },
  };
}

function normalizeRoundsRuntime(state) {
  (state.rounds || []).forEach((round) => {
    (round && Array.isArray(round.matches) ? round.matches : []).forEach(normalizeMatchRuntime);
  });
  (state.loserRounds || []).forEach((round) => {
    (round && Array.isArray(round.matches) ? round.matches : []).forEach(normalizeMatchRuntime);
  });
}

function readyDeadlineFrom(nowMs) {
  return new Date(nowMs + READY_WINDOW_MS).toISOString();
}

function ensureMatchReadyTimer(match, nowMs) {
  normalizeMatchRuntime(match);
  if (!match || cleanText(match.winnerId, 80)) return false;
  const ids = playableIds(match);
  if (ids.length < 2 || match.readyDeadlineAt) return false;
  match.readyDeadlineAt = readyDeadlineFrom(nowMs);
  return true;
}

function matchReadyCount(match) {
  const ready = match && match.readyById && typeof match.readyById === "object" ? match.readyById : {};
  return playableIds(match).filter((id) => ready[id] === true).length;
}

function matchAllPlayersReady(match) {
  const ids = playableIds(match);
  return ids.length >= 2 && matchReadyCount(match) === ids.length;
}

function autoWinnerFromExpiredMatch(match, nowMs) {
  normalizeMatchRuntime(match);
  if (!match || cleanText(match.winnerId, 80)) return "";
  const deadlineMs = Date.parse(match.readyDeadlineAt || "");
  if (!Number.isFinite(deadlineMs) || nowMs < deadlineMs) return "";
  const ids = playableIds(match);
  if (ids.length < 2) return "";
  const readyIds = ids.filter((id) => match.readyById && match.readyById[id] === true);
  return readyIds.length === 1 ? readyIds[0] : "";
}

function entryMap(state) {
  const map = new Map();
  (state.entries || []).forEach((entry) => {
    if (entry && entry.id) map.set(entry.id, entry);
  });
  return map;
}

function historyWinnerFromEntry(entry, place) {
  const row = entry && typeof entry === "object" ? entry : {};
  return normalizeHistoryWinner({
    place,
    entryId: row.id,
    accountId: row.accountId,
    memberId: row.memberId,
    displayName: row.pokerPlusNickname || row.displayName,
    pokerPlusNickname: row.pokerPlusNickname,
    telegramUsername: row.telegramUsername,
  });
}

function matchLosers(match) {
  const ids = Array.isArray(match && match.playerIds) ? match.playerIds : [];
  const winnerId = cleanText(match && match.winnerId, 80);
  return ids.filter((id) => id && id !== winnerId);
}

function sngTopWinners(state, championId) {
  const players = entryMap(state);
  const rounds = Array.isArray(state && state.rounds) ? state.rounds : [];
  const loserRounds = Array.isArray(state && state.loserRounds) ? state.loserRounds : [];
  const finalRound = rounds.find((round) => round && Array.isArray(round.matches) && round.matches.length === 1);
  const semiRound = rounds.find((round) => round && Array.isArray(round.matches) && round.matches.length === 2);
  const finalMatch = finalRound && finalRound.matches ? finalRound.matches[0] : null;
  const grandFinalRound = loserRounds.find((round) => round && Number(round.index) === 9);
  const grandFinalMatch = grandFinalRound && Array.isArray(grandFinalRound.matches) ? grandFinalRound.matches[0] : null;
  const rows = [];
  const seen = new Set();

  function add(entryId, place) {
    if (!entryId || seen.has(entryId)) return;
    const entry = players.get(entryId);
    if (!entry) return;
    seen.add(entryId);
    rows.push(historyWinnerFromEntry(entry, place));
  }

  add(championId, 1);
  matchLosers(grandFinalMatch || finalMatch).forEach((id) => add(id, 2));
  (semiRound && Array.isArray(semiRound.matches) ? semiRound.matches : []).forEach((match) => {
    matchLosers(match).forEach((id) => add(id, 3));
  });

  return rows.filter((row) => row && row.place && row.entryId);
}

function recordSngHistory(state, championId) {
  const winners = sngTopWinners(state, championId);
  if (!winners.length) return;
  const completedAt = state.completedAt || new Date().toISOString();
  const entry = normalizeHistoryItem({
    title: state.title || DEFAULT_TITLE,
    completedAt,
    season: completedAt.slice(0, 7),
    winners,
  });
  const key = entry.completedAt || JSON.stringify(entry.winners);
  const existing = (state.history || []).filter((item) => {
    const itemKey = item && (item.completedAt || JSON.stringify(item.winners || []));
    return itemKey !== key;
  });
  state.history = [entry].concat(existing).slice(0, 12);
}

function findRoundByMatchId(state, matchIdValue) {
  const id = cleanText(matchIdValue, 80);
  for (const round of state.rounds || []) {
    const match = (round && Array.isArray(round.matches) ? round.matches : []).find((item) => item && item.id === id);
    if (match) return { bracket: "winners", round, match };
  }
  for (const round of state.loserRounds || []) {
    const match = (round && Array.isArray(round.matches) ? round.matches : []).find((item) => item && item.id === id);
    if (match) return { bracket: "losers", round, match };
  }
  return null;
}

function roundHasPlayableOpenMatch(round) {
  return (round && Array.isArray(round.matches) ? round.matches : []).some((match) => {
    const players = (Array.isArray(match && match.playerIds) ? match.playerIds : []).filter(Boolean);
    return players.length >= 2 && !cleanText(match && match.winnerId, 80);
  });
}

function updateCurrentRoundId(state) {
  if (!state || state.status !== "bracket") return;
  const current = (state.rounds || []).find((round) => round && round.id === state.currentRoundId);
  if (roundHasPlayableOpenMatch(current)) return;
  const next = (state.rounds || []).find(roundHasPlayableOpenMatch);
  state.currentRoundId = next ? next.id : "";
}

function ensureNextRound(state, round) {
  const nextRoundIndex = (Number(round && round.index) || 1) + 1;
  let nextRound = (state.rounds || []).find((item) => item && Number(item.index) === nextRoundIndex);
  if (nextRound) return nextRound;
  nextRound = makeEmptyRound(nextRoundIndex, Math.ceil(((round && round.matches && round.matches.length) || 1) / 2));
  state.rounds = state.rounds || [];
  state.rounds.push(nextRound);
  return nextRound;
}

function ensureLoserRounds(state) {
  if (!state) return [];
  state.loserRounds = Array.isArray(state.loserRounds) && state.loserRounds.length
    ? state.loserRounds
    : makeLoserBracketRounds();
  return state.loserRounds;
}

function placePlayerInMatch(match, playerId, slot, nowMs) {
  if (!match || !playerId) return false;
  const players = Array.isArray(match.playerIds) ? match.playerIds.slice(0, 2) : [];
  while (players.length < 2) players.push("");
  players[Math.max(0, Math.min(1, Number(slot) || 0))] = playerId;
  match.playerIds = players;
  ensureMatchReadyTimer(match, nowMs || Date.now());
  return true;
}

function placePlayerInMatchEmptySlot(match, playerId, slot, nowMs) {
  if (!match || !playerId) return false;
  const targetSlot = Math.max(0, Math.min(1, Number(slot) || 0));
  const players = Array.isArray(match.playerIds) ? match.playerIds.slice(0, 2) : [];
  while (players.length < 2) players.push("");
  if (players[targetSlot] === playerId) return false;
  if (players[targetSlot]) return false;
  players[targetSlot] = playerId;
  match.playerIds = players;
  ensureMatchReadyTimer(match, nowMs || Date.now());
  return true;
}

function loserFromMatch(match, winnerId) {
  const ids = (Array.isArray(match && match.playerIds) ? match.playerIds : []).filter(Boolean);
  return ids.find((id) => id && id !== winnerId) || "";
}

function mirroredIndex(index, count) {
  const safeCount = Math.max(1, Math.floor(Number(count) || 1));
  const safeIndex = Math.max(1, Math.min(safeCount, Math.floor(Number(index) || 1)));
  return safeCount + 1 - safeIndex;
}

function shiftedIndex(index, count) {
  const safeCount = Math.max(1, Math.floor(Number(count) || 1));
  const safeIndex = Math.max(1, Math.min(safeCount, Math.floor(Number(index) || 1)));
  return ((safeIndex - 1 + Math.floor(safeCount / 2)) % safeCount) + 1;
}

function firstLoserRoundTarget(matchIndex) {
  const map = {
    1: { match: 1, slot: 0 },
    16: { match: 1, slot: 1 },
    8: { match: 2, slot: 0 },
    9: { match: 2, slot: 1 },
    5: { match: 3, slot: 0 },
    12: { match: 3, slot: 1 },
    4: { match: 4, slot: 0 },
    13: { match: 4, slot: 1 },
    3: { match: 5, slot: 0 },
    14: { match: 5, slot: 1 },
    6: { match: 6, slot: 0 },
    11: { match: 6, slot: 1 },
    7: { match: 7, slot: 0 },
    10: { match: 7, slot: 1 },
    2: { match: 8, slot: 0 },
    15: { match: 8, slot: 1 },
  };
  return map[Math.max(1, Math.min(16, Math.floor(Number(matchIndex) || 1)))] || { match: Math.ceil((Number(matchIndex) || 1) / 2), slot: ((Number(matchIndex) || 1) - 1) % 2 };
}

function winnerBracketLoserTarget(round, match) {
  const winnerRoundIndex = Number(round && round.index) || 1;
  const matchIndex = Number(match && match.index) || 1;
  let targetRoundIndex = 0;
  let targetMatchIndex = 0;
  let slot = 1;

  if (winnerRoundIndex === 1) {
    targetRoundIndex = 1;
    const target = firstLoserRoundTarget(matchIndex);
    targetMatchIndex = target.match;
    slot = target.slot;
  } else if (winnerRoundIndex === 2) {
    targetRoundIndex = 2;
    targetMatchIndex = shiftedIndex(matchIndex, 8);
    slot = 1;
  } else if (winnerRoundIndex === 3) {
    targetRoundIndex = 4;
    targetMatchIndex = shiftedIndex(matchIndex, 4);
    slot = 1;
  } else if (winnerRoundIndex === 4) {
    targetRoundIndex = 6;
    targetMatchIndex = mirroredIndex(matchIndex, 2);
    slot = 1;
  } else if (winnerRoundIndex === 5) {
    targetRoundIndex = 8;
    targetMatchIndex = 1;
    slot = 1;
  } else {
    return null;
  }

  return { targetRoundIndex, targetMatchIndex, slot };
}

function placeWinnerBracketLoser(state, round, match, winnerId, nowMs) {
  const loserId = loserFromMatch(match, winnerId);
  if (!loserId) return false;
  const rounds = ensureLoserRounds(state);
  const target = winnerBracketLoserTarget(round, match);
  if (!target) return false;
  const targetRoundIndex = target.targetRoundIndex;
  const targetMatchIndex = target.targetMatchIndex;
  const slot = target.slot;
  const targetRound = rounds[targetRoundIndex - 1];
  const targetMatch = targetRound && targetRound.matches ? targetRound.matches[targetMatchIndex - 1] : null;
  return placePlayerInMatch(targetMatch, loserId, slot, nowMs);
}

function seedLoserBracketFromWinnerResults(state, nowMs) {
  if (!state || state.status !== "bracket") return false;
  const rounds = ensureLoserRounds(state);
  let changed = false;
  (Array.isArray(state.rounds) ? state.rounds : []).forEach((round) => {
    (round && Array.isArray(round.matches) ? round.matches : []).forEach((match) => {
      const winnerId = cleanText(match && match.winnerId, 80);
      const loserId = loserFromMatch(match, winnerId);
      const target = winnerId && loserId ? winnerBracketLoserTarget(round, match) : null;
      if (!target) return;
      const targetRound = rounds[target.targetRoundIndex - 1];
      const targetMatch = targetRound && targetRound.matches ? targetRound.matches[target.targetMatchIndex - 1] : null;
      if (placePlayerInMatchEmptySlot(targetMatch, loserId, target.slot, nowMs)) changed = true;
    });
  });
  return changed;
}

function placeLoserBracketWinner(state, round, match, winnerId, nowMs) {
  const rounds = ensureLoserRounds(state);
  const roundIndex = Number(round && round.index) || 1;
  const matchIndex = Number(match && match.index) || 1;
  let targetRoundIndex = 0;
  let targetMatchIndex = 0;
  let slot = 0;

  if ([1, 3, 5].includes(roundIndex)) {
    targetRoundIndex = roundIndex + 1;
    targetMatchIndex = matchIndex;
    slot = 0;
  } else if ([2, 4, 6].includes(roundIndex)) {
    targetRoundIndex = roundIndex + 1;
    targetMatchIndex = Math.ceil(matchIndex / 2);
    slot = (matchIndex - 1) % 2;
  } else if (roundIndex === 7) {
    targetRoundIndex = 8;
    targetMatchIndex = 1;
    slot = 0;
  } else if (roundIndex === 8) {
    targetRoundIndex = 9;
    targetMatchIndex = 1;
    slot = 1;
  } else if (roundIndex === 9) {
    state.status = "completed";
    state.currentRoundId = "";
    state.completedAt = new Date().toISOString();
    state.winnerId = winnerId;
    recordSngHistory(state, winnerId);
    return true;
  } else {
    return false;
  }

  const targetRound = rounds[targetRoundIndex - 1];
  const targetMatch = targetRound && targetRound.matches ? targetRound.matches[targetMatchIndex - 1] : null;
  return placePlayerInMatch(targetMatch, winnerId, slot, nowMs);
}

function placeWinnerInNextRound(state, round, match, winnerId, nowMs) {
  if (!state || state.status !== "bracket") return false;
  if (!round || !match || !winnerId) return false;
  if ((round.matches || []).length === 1) {
    if (state.loserBracketEnabled === false) {
      state.status = "completed";
      state.currentRoundId = "";
      state.completedAt = new Date().toISOString();
      state.winnerId = winnerId;
      recordSngHistory(state, winnerId);
      return true;
    }
    ensureLoserRounds(state);
    state.winnersBracketWinnerId = winnerId;
    const grandFinal = state.loserRounds && state.loserRounds[8] && state.loserRounds[8].matches ? state.loserRounds[8].matches[0] : null;
    placePlayerInMatch(grandFinal, winnerId, 0, nowMs);
    placeWinnerBracketLoser(state, round, match, winnerId, nowMs);
    return true;
  }
  const nextRound = ensureNextRound(state, round);
  const targetIndex = Math.ceil((Number(match.index) || 1) / 2);
  const targetMatch = (nextRound.matches || [])[targetIndex - 1];
  if (!targetMatch) return false;
  const slot = ((Number(match.index) || 1) - 1) % 2;
  placePlayerInMatch(targetMatch, winnerId, slot, nowMs);
  if (state.loserBracketEnabled !== false) placeWinnerBracketLoser(state, round, match, winnerId, nowMs);
  updateCurrentRoundId(state);
  return true;
}

function placeMatchWinner(state, found, winnerId, nowMs) {
  if (!found || !found.round || !found.match) return false;
  if (found.bracket === "losers") return placeLoserBracketWinner(state, found.round, found.match, winnerId, nowMs);
  return placeWinnerInNextRound(state, found.round, found.match, winnerId, nowMs);
}

function applyExpiredReadyMatches(state, nowMs) {
  if (!state || state.status !== "bracket") return false;
  normalizeRoundsRuntime(state);
  let changed = false;
  let progressed = true;
  while (progressed && state.status === "bracket") {
    progressed = false;
    const allRounds = []
      .concat((state.rounds || []).map((round) => ({ bracket: "winners", round })))
      .concat((state.loserRounds || []).map((round) => ({ bracket: "losers", round })));
    for (const item of allRounds) {
      const round = item.round;
      for (const match of round && Array.isArray(round.matches) ? round.matches : []) {
        const winnerId = autoWinnerFromExpiredMatch(match, nowMs);
        if (!winnerId) continue;
        match.winnerId = winnerId;
        match.autoWinnerId = winnerId;
        match.completedAt = new Date(nowMs || Date.now()).toISOString();
        placeMatchWinner(state, { bracket: item.bracket, round, match }, winnerId, nowMs);
        changed = true;
        progressed = true;
      }
    }
  }
  if (advanceBracketByes(state, nowMs)) changed = true;
  updateCurrentRoundId(state);
  return changed;
}

function ensureReadyTimersForOpenMatches(state, nowMs) {
  if (!state || state.status !== "bracket") return false;
  if (state.loserBracketEnabled !== false) ensureLoserRounds(state);
  const seeded = state.loserBracketEnabled !== false ? seedLoserBracketFromWinnerResults(state, nowMs) : false;
  normalizeRoundsRuntime(state);
  let changed = seeded;
  (state.rounds || []).concat(state.loserRounds || []).forEach((round) => {
    (round && Array.isArray(round.matches) ? round.matches : []).forEach((match) => {
      if (ensureMatchReadyTimer(match, nowMs)) changed = true;
    });
  });
  return changed;
}

async function publicState(state, context) {
  const accountId = context && context.accountId ? String(context.accountId) : "";
  const memberId = context && context.memberId ? String(context.memberId) : "";
  const isAdmin = !!(context && context.isAdmin);
  normalizeRoundsRuntime(state);
  const enrichedEntries = await enrichEntries(state.entries || []);
  const boundAccountIds = await getPokerPlusBoundAccountIds(enrichedEntries.map((entry) => entry.pokerPlusUserId));
  const accountIds = enrichedEntries.flatMap((entry) => [
    entry.accountId,
    entry.memberId,
    entry.pokerPlusUserId,
    ...(boundAccountIds[entry.pokerPlusUserId] || []),
  ]);
  const [avatars, profileCities, profileCitiesByNick, telegramVisibility, telegramUsernames] = await Promise.all([
    getAvatars(accountIds),
    getProfileCities(accountIds),
    getProfileCityNickIndex(enrichedEntries),
    getTelegramVisibility(accountIds),
    getTelegramUsernames(accountIds),
  ]);
  const entries = enrichedEntries.map((entry) => {
    const linkedIds = boundAccountIds[entry.pokerPlusUserId] || [];
    const telegramIds = [entry.accountId, entry.memberId, entry.pokerPlusUserId].concat(linkedIds);
    const telegramIsPublic = telegramIds.some((id) => telegramVisibility[id]);
    const telegramUsername = cleanText(entry.telegramUsername, 64) || telegramIds.map((id) => telegramUsernames[id]).find(Boolean) || "";
    return {
      id: entry.id,
      accountId: entry.accountId,
      displayName: entry.displayName,
      pokerPlusNickname: entry.pokerPlusNickname || "",
      pokerPlusUserId: isAdmin ? entry.pokerPlusUserId || "" : "",
      level: Number.isFinite(Number(entry.level)) ? Math.max(0, Math.floor(Number(entry.level))) : null,
      profileCity: profileCityForEntry(entry, profileCities, boundAccountIds, profileCitiesByNick),
      avatar: avatars[entry.accountId] || "",
      telegramUsername: isAdmin || telegramIsPublic ? telegramUsername : "",
      status: entry.status,
      joinedAt: entry.joinedAt,
      approvedAt: entry.approvedAt,
      rejectedAt: isAdmin ? entry.rejectedAt : "",
      balanceRequestedAt: isAdmin ? entry.balanceRequestedAt : "",
      selectedForBracket: entry.selectedForBracket === true,
      mine: !!(accountId && (
        entry.accountId === accountId ||
        entry.memberId === memberId ||
        linkedIds.includes(accountId)
      )),
    };
  });
  const playersById = {};
  entries.forEach((entry) => {
    playersById[entry.id] = {
      id: entry.id,
      accountId: entry.accountId,
      displayName: entry.displayName,
      pokerPlusNickname: entry.pokerPlusNickname || "",
      level: Number.isFinite(Number(entry.level)) ? Math.max(0, Math.floor(Number(entry.level))) : null,
      profileCity: entry.profileCity || "",
      avatar: entry.avatar || "",
      telegramUsername: entry.telegramUsername || "",
      status: entry.status,
      selectedForBracket: entry.selectedForBracket === true,
    };
  });
  const teams = (state.teams || []).map((team) => ({
    id: team.id,
    name: team.name,
    memberIds: team.memberIds,
    members: team.memberIds.map((id) => playersById[id]).filter(Boolean),
    canRename: isAdmin || !!(
      state.status !== "completed" &&
      !team.playerRenamedAt &&
      accountId &&
      entries.some((entry) => entry.accountId === accountId && team.memberIds.includes(entry.id))
    ),
    playerRenameUsed: !!team.playerRenamedAt,
  }));
  teams.forEach((team) => {
    playersById[team.id] = { id: team.id, displayName: team.name, pokerPlusNickname: team.name, team: true, members: team.members };
  });
  return {
    ok: true,
    isAdmin,
    tournamentId: state.id,
    status: state.status,
    title: state.title,
    description: state.description || "",
    activeStage: activeTournamentStage(state),
    updatedAt: state.updatedAt || "",
    revision: publicStateVersion(state).revision,
    capacity: state.capacity,
    buyIn: state.buyIn || defaultState().buyIn,
    prizes: state.prizes,
    entries,
    teams,
    tournamentType: state.tournamentType,
    loserBracketEnabled: state.loserBracketEnabled,
    knockoutEnabled: state.knockoutEnabled,
    payoutConfig: state.payoutConfig,
    isTest: isAdmin && state.isTest === true,
    counts: {
      pending: entries.filter((entry) => entry.status === "pending" || entry.status === "balance_requested").length,
      approved: entries.filter((entry) => entry.status === "approved").length,
      rejected: entries.filter((entry) => entry.status === "rejected").length,
      balanceRequested: entries.filter((entry) => entry.status === "balance_requested").length,
    },
    myEntry: entries.find((entry) => entry.mine) || null,
    myEntryId: (entries.find((entry) => entry.mine) || {}).id || "",
    bracket: state.bracket,
    rounds: state.rounds || [],
    loserRounds: state.loserRounds || [],
    currentRoundId: state.currentRoundId || "",
    winnerId: state.winnerId || "",
    completedAt: state.completedAt || "",
    playersById,
    serverTime: new Date().toISOString(),
  };
}

function publicAchievementHistory(state) {
  return (Array.isArray(state && state.history) ? state.history : []).map((item) => ({
    title: item.title || DEFAULT_TITLE,
    completedAt: item.completedAt || "",
    season: item.season || "",
    winners: (Array.isArray(item.winners) ? item.winners : []).map((winner) => ({
      place: winner.place,
      entryId: winner.entryId,
      accountId: winner.accountId,
      memberId: winner.memberId,
      displayName: winner.displayName,
      pokerPlusNickname: winner.pokerPlusNickname,
      telegramUsername: winner.telegramUsername,
      nick: winner.pokerPlusNickname || winner.displayName,
    })),
  }));
}

async function optionalContext(req, body) {
  const identity = resolveTelegramIdentity(req, body || {}, BOT_TOKEN);
  if (!identity) return { identity: null, memberId: "", accountId: "", isAdmin: false };
  const memberId = memberIdFromIdentity(identity);
  const accountId = memberId ? await ensureDtIdForUserId(memberId) : "";
  return {
    identity,
    memberId,
    accountId: accountId || "",
    isAdmin: isAdminIdentity(identity, memberId),
  };
}

function findEntryByAccount(state, accountId) {
  return (state.entries || []).find((entry) => entry && entry.accountId === accountId) || null;
}

function findEntryByIdentity(state, identity) {
  return (state.entries || []).find((entry) => entry && entriesShareIdentity(entry, identity)) || null;
}

async function findEntryByAuthenticatedIdentity(state, accountId, memberId) {
  const direct = findEntryByIdentity(state, { accountId, memberId });
  if (direct || !accountId) return direct;
  try {
    const rows = await redisPipeline([["HGET", POKERPLUS_BIND_HASH_KEY, accountId]], { context: "sng-champions.ready-linked-account" });
    const pokerPlusUserId = cleanText(rows && rows[0] && rows[0].result, 80);
    if (!pokerPlusUserId) return null;
    return (state.entries || []).find((entry) => entry && cleanText(entry.pokerPlusUserId, 80) === pokerPlusUserId) || null;
  } catch (error) {
    return null;
  }
}

module.exports = async function handler(req, res) {
  setCors(res, "GET, POST, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (!redisConfigured()) return res.status(500).json({ ok: false, error: "Сервер не настроен" });

  if (req.method === "GET") {
    const mode = String((req.query && req.query.mode) || "").trim();
    const summaryMode = req.query && (req.query.summary === "1" || req.query.summary === "true" || req.query.homeSummary === "1");
    const store = await loadTournamentStore();
    const context = await optionalContext(req, {});
    const state = selectTournament(store, req.query && req.query.tournamentId, context.isAdmin);
    const nowMs = Date.now();
    const timerChanged = ensureReadyTimersForOpenMatches(state, nowMs);
    const autoChanged = applyExpiredReadyMatches(state, nowMs);
    if (timerChanged || autoChanged) await saveState(state, store);
    if (mode === "achievements") {
      res.setHeader("Cache-Control", "public, max-age=45, s-maxage=45");
      return res.status(200).json({ ok: true, rows: store.tournaments.filter((item) => item.isTest !== true).flatMap(publicAchievementHistory) });
    }
    if (mode === "version") {
      setShortPublicCacheHeaders(res, 10);
      return res.status(200).json(publicStateVersion(state));
    }
    if (summaryMode) {
      setShortPublicCacheHeaders(res, 45);
      return res.status(200).json(publicHomeSummary(state));
    }
    const payload = await publicState(state, context);
    payload.tournaments = tournamentMenu(store, context.isAdmin);
    return res.status(200).json(payload);
  }

  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "POST only" });

  let body = {};
  try {
    body = parseBody(req);
  } catch (error) {
    return res.status(400).json({ ok: false, error: "Invalid JSON" });
  }
  const auth = authRequired(req, body, BOT_TOKEN);
  if (!auth.ok) return res.status(auth.status || 401).json({ ok: false, error: auth.error || "Auth required" });
  const accountId = await ensureDtIdForUserId(auth.memberId);
  if (!accountId) return res.status(500).json({ ok: false, error: "Не удалось определить аккаунт" });

  const action = cleanText(body.action, 40);
  const store = await loadTournamentStore();
  let state = selectTournament(store, body.tournamentId, auth.isAdmin);
  const actionNowMs = Date.now();
  let changed = ensureReadyTimersForOpenMatches(state, actionNowMs);
  changed = applyExpiredReadyMatches(state, actionNowMs) || changed;
  if (changed) {
    await saveState(state, store);
    changed = false;
  }
  let playerNotifications = [];
  let applicationNotificationEntry = null;
  let balancePaidNotificationEntry = null;

  try {
    if (action === "createTournament") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только админ" });
      state = defaultState();
      state.title = cleanText(body.title, 80) || DEFAULT_TITLE;
      state.tournamentType = body.tournamentType === "team" ? "team" : "solo";
      state.capacity = [16, 32, 64].includes(Number(body.capacity)) ? Number(body.capacity) : 32;
      state.loserBracketEnabled = state.tournamentType === "team" ? false : body.loserBracketEnabled !== false;
      state.knockoutEnabled = body.knockoutEnabled === true;
      state.isTest = body.isTest === true;
      state.payoutConfig = normalizePayoutConfig(body.payoutConfig);
      state.description = cleanMultilineText(body.description, DESCRIPTION_MAX);
      state.buyIn = cleanText(body.buyIn, BUY_IN_MAX) || defaultState().buyIn;
      state.prizes = normalizePrizes([
        { place: 1, text: body.prize1 },
        { place: 2, text: body.prize2 },
      ]);
      const payoutValidation = validatePayoutConfig(state);
      if (!payoutValidation.ok) return res.status(400).json({ ok: false, error: payoutValidation.error });
      store.tournaments.unshift(state);
      changed = true;
    } else if (action === "deleteTournament") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только админ" });
      const tournamentId = cleanText(body.tournamentId, 80);
      const deletingTournament = store.tournaments.find((item) => item && item.id === tournamentId);
      if (!deletingTournament) return res.status(404).json({ ok: false, error: "Турнир не найден" });
      const registeredCount = (deletingTournament.entries || []).filter((entry) => entry && ["pending", "balance_requested", "approved"].includes(entry.status)).length;
      if (registeredCount > 1) {
        return res.status(409).json({ ok: false, error: "Нельзя удалить турнир, когда записано больше одного участника" });
      }
      if (deletingTournament.status === "bracket" || deletingTournament.status === "completed" || (deletingTournament.rounds || []).some((round) => round && (round.matches || []).some((match) => (match.playerIds || []).filter(Boolean).length >= 2))) {
        return res.status(409).json({ ok: false, error: "Нельзя удалить турнир после формирования пар или сетки" });
      }
      store.tournaments = store.tournaments.filter((item) => item && item.id !== tournamentId);
      if (!store.tournaments.length) store.tournaments.push(defaultState());
      state = selectTournament(store, "", true);
      changed = true;
    } else if (action === "open") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только админ" });
      const buyIn = cleanText(body.buyIn, BUY_IN_MAX) || defaultState().buyIn;
      const description = cleanMultilineText(body.description, DESCRIPTION_MAX);
      const prizes = normalizePrizes([
        { place: 1, text: body.prize1 },
        { place: 2, text: body.prize2 },
      ]);
      const tournamentConfig = { id: state.id, title: state.title, tournamentType: state.tournamentType, capacity: state.capacity, loserBracketEnabled: state.loserBracketEnabled, knockoutEnabled: state.knockoutEnabled, isTest: state.isTest, payoutConfig: state.payoutConfig };
      Object.assign(state, defaultState(), tournamentConfig, {
        status: "open",
        description,
        buyIn,
        prizes,
        openedAt: new Date().toISOString(),
      });
      changed = true;
    } else if (action === "updateSettings") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только админ" });
      state.description = cleanMultilineText(body.description, DESCRIPTION_MAX);
      state.buyIn = cleanText(body.buyIn, BUY_IN_MAX) || defaultState().buyIn;
      state.prizes = normalizePrizes([
        { place: 1, text: body.prize1 },
        { place: 2, text: body.prize2 },
      ]);
      changed = true;
    } else if (action === "join") {
      if (state.status !== "open") return res.status(409).json({ ok: false, error: "Запись сейчас закрыта" });
      const identity = auth.identity || {};
      const candidate = normalizeEntry({
        accountId,
        memberId: auth.memberId,
        displayName: displayNameFromIdentity(identity, accountId),
        telegramUsername: identity.telegramUsername || identity.pwaUsername || "",
      });
      const enrichedCandidate = (await enrichEntries([candidate]))[0] || candidate;
      const current = findEntryByIdentity(state, enrichedCandidate);
      if (current && current.status !== "rejected") {
        return res.status(409).json({ ok: false, error: "Вы уже подали заявку" });
      }
      const entry = normalizeEntry({
        id: current && current.id || entryId(),
        accountId,
        memberId: auth.memberId,
        displayName: candidate.displayName,
        telegramUsername: identity.telegramUsername || identity.pwaUsername || "",
        status: "pending",
        joinedAt: current && current.joinedAt || new Date().toISOString(),
      });
      const enrichedEntry = (await enrichEntries([entry]))[0] || entry;
      if (entryLevelValue(enrichedEntry) < MIN_JOIN_LEVEL) {
        return res.status(403).json({
          ok: false,
          error: joinLevelError(enrichedEntry),
          code: "SNG_MIN_LEVEL_REQUIRED",
          requiredLevel: MIN_JOIN_LEVEL,
          level: entryLevelValue(enrichedEntry),
        });
      }
      const acceptedEntry = normalizeEntry({
        ...entry,
        displayName: enrichedEntry.displayName || entry.displayName,
        pokerPlusNickname: enrichedEntry.pokerPlusNickname || entry.pokerPlusNickname,
        pokerPlusUserId: enrichedEntry.pokerPlusUserId || entry.pokerPlusUserId,
        level: entryLevelValue(enrichedEntry),
        profileCity: enrichedEntry.profileCity || entry.profileCity,
      });
      state.entries = (state.entries || []).filter((item) => !entriesShareIdentity(item, acceptedEntry));
      state.entries.push(acceptedEntry);
      applicationNotificationEntry = acceptedEntry;
      changed = true;
    } else if (action === "balancePaid") {
      if (state.status !== "open") return res.status(409).json({ ok: false, error: "Запись сейчас закрыта" });
      const current = findEntryByAccount(state, accountId);
      if (!current || current.status !== "balance_requested") return res.status(409).json({ ok: false, error: "Запрос на пополнение не найден" });
      if (current.balancePaidAt) return res.status(409).json({ ok: false, error: "Администратор уже получил сообщение" });
      current.balancePaidAt = new Date().toISOString();
      balancePaidNotificationEntry = current;
      changed = true;
    } else if (action === "cancel") {
      if (state.status !== "open") return res.status(409).json({ ok: false, error: "Запись сейчас закрыта" });
      const current = findEntryByAccount(state, accountId);
      if (!current || current.status === "rejected") return res.status(404).json({ ok: false, error: "Заявка не найдена" });
      state.entries = (state.entries || []).filter((entry) => entry.accountId !== accountId);
      changed = true;
    } else if (action === "approve" || action === "reject" || action === "requestBalance") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только админ" });
      if (state.status !== "open") return res.status(409).json({ ok: false, error: "Менять заявки можно только при открытой записи" });
      const targetAccountId = cleanText(body.accountId, 40);
      const current = findEntryByAccount(state, targetAccountId);
      if (!current) return res.status(404).json({ ok: false, error: "Заявка не найдена" });
      const wasApproved = current.status === "approved";
      current.status = action === "approve" ? "approved" : action === "reject" ? "rejected" : "balance_requested";
      if (action === "approve") current.approvedAt = new Date().toISOString();
      if (action === "reject") current.rejectedAt = new Date().toISOString();
      if (action === "requestBalance") {
        current.balanceRequestedAt = new Date().toISOString();
        current.balancePaidAt = "";
      }
      playerNotifications = [buildEntryStatusNotification(action, current, state)].filter(Boolean);
      if (action === "approve" && !wasApproved) {
        playerNotifications = playerNotifications.concat(await buildApprovedParticipantBroadcastNotifications(state, current));
      }
      changed = true;
    } else if (action === "formPairs") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только админ" });
      if (state.status !== "open") return res.status(409).json({ ok: false, error: "Сначала откройте запись" });
      const approved = (state.entries || []).filter((entry) => entry.status === "approved");
      if (approved.length < 2) return res.status(400).json({ ok: false, error: "Нужно минимум 2 подтвержденных игрока" });
      if (state.tournamentType === "team" && (!state.teams || state.teams.length < 2)) return res.status(400).json({ ok: false, error: "Сначала сформируйте минимум 2 команды" });
      const selected = shuffle(approved).slice(0, state.capacity);
      const playerIds = state.tournamentType === "team" ? shuffle(state.teams).map((team) => team.id) : selected.map((entry) => entry.id);
      const bracketSize = state.tournamentType === "team" ? state.capacity / 2 : state.capacity;
      if (state.tournamentType === "team") state.loserBracketEnabled = false;
      const rounds = makeBracketRounds(playerIds, bracketSize);
      const loserRounds = state.loserBracketEnabled ? makeLoserBracketRounds() : [];
      const round = rounds[0];
      const readyDeadlineAt = readyDeadlineFrom(Date.now());
      (round.matches || []).forEach((match) => {
        normalizeMatchRuntime(match);
        match.readyDeadlineAt = readyDeadlineAt;
      });
      const selectedSet = new Set(playerIds);
      (state.entries || []).forEach((entry) => {
        entry.selectedForBracket = selectedSet.has(entry.id) || (state.teams || []).some((team) => selectedSet.has(team.id) && (team.memberIds || []).includes(entry.id));
      });
      state.status = "bracket";
      state.bracket = {
        formedAt: new Date().toISOString(),
        playerIds,
      };
      state.rounds = rounds;
      state.loserRounds = loserRounds;
      state.currentRoundId = round.id;
      advanceBracketByes(state, Date.now());
      playerNotifications = playerNotifications.concat(await buildRoundOnePairNotifications(state));
      playerNotifications = playerNotifications.concat(buildInitialByeNotifications(state));
      state.bracket.roundOnePairsNotifiedAt = new Date().toISOString();
      changed = true;
    } else if (action === "formTeams") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только админ" });
      if (state.status !== "open" || state.tournamentType !== "team") return res.status(409).json({ ok: false, error: "Команды сейчас формировать нельзя" });
      if (Array.isArray(state.teams) && state.teams.length) return res.status(409).json({ ok: false, error: "Команды уже сформированы" });
      const approved = shuffle((state.entries || []).filter((entry) => entry.status === "approved")).slice(0, state.capacity);
      if (approved.length < 4) return res.status(400).json({ ok: false, error: "Нужно минимум 4 подтвержденных игрока" });
      if (approved.length % 2 !== 0) approved.pop();
      state.teams = [];
      for (let i = 0; i < approved.length; i += 2) state.teams.push({ id: "team_" + crypto.randomBytes(5).toString("hex"), name: "Команда " + (i / 2 + 1), memberIds: [approved[i].id, approved[i + 1].id] });
      playerNotifications = playerNotifications.concat(await buildTeamsFormedNotifications(state));
      changed = true;
    } else if (action === "renameTeam") {
      const team = (state.teams || []).find((item) => item.id === cleanText(body.teamId, 80));
      const current = findEntryByAccount(state, accountId);
      const isTeamMember = !!(current && team && team.memberIds.includes(current.id));
      if (!team || (!auth.isAdmin && !isTeamMember)) return res.status(403).json({ ok: false, error: "Название может менять только участник команды" });
      if (!auth.isAdmin && state.status === "completed") return res.status(409).json({ ok: false, error: "После завершения турнира название может менять только администратор" });
      if (!auth.isAdmin && team.playerRenamedAt) return res.status(409).json({ ok: false, error: "Команда уже использовала одно переименование" });
      team.name = cleanText(body.name, 80) || team.name;
      if (!auth.isAdmin) team.playerRenamedAt = new Date().toISOString();
      playerNotifications = playerNotifications.concat(notificationsForParticipant(
        state,
        team.id,
        "teamRenamed",
        "Название вашей команды изменено: «" + team.name + "»."
      ));
      changed = true;
    } else if (action === "broadcastRoundOnePairs") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только админ" });
      if (state.status !== "bracket") return res.status(409).json({ ok: false, error: "Сетка еще не сформирована" });
      const firstRound = (state.rounds || []).find((round) => round && Number(round.index) === 1);
      const firstMatches = firstRound && Array.isArray(firstRound.matches) ? firstRound.matches : [];
      if (!firstMatches.length) return res.status(404).json({ ok: false, error: "Пары первого раунда не найдены" });
      playerNotifications = await buildRoundOnePairNotifications(state);
      state.bracket = state.bracket && typeof state.bracket === "object" ? state.bracket : {};
      state.bracket.roundOnePairsNotifiedAt = new Date().toISOString();
      changed = true;
    } else if (action === "setReady") {
      if (state.status !== "bracket") return res.status(409).json({ ok: false, error: "Сетка еще не сформирована" });
      const found = findRoundByMatchId(state, body.matchId);
      const match = found && found.match;
      const requestedAdminEntryId = auth.isAdmin ? cleanText(body.entryId, 80) : "";
      const requestedAdminEntry = requestedAdminEntryId
        ? (state.entries || []).find((entry) => entry && entry.id === requestedAdminEntryId) || null
        : null;
      const current = requestedAdminEntry || await findEntryByAuthenticatedIdentity(state, accountId, auth.memberId);
      const currentTeam = current && state.tournamentType === "team" ? (state.teams || []).find((team) => team.memberIds.includes(current.id)) : null;
      const playerId = currentTeam ? currentTeam.id : current && current.id ? current.id : "";
      const matchPlayers = playableIds(match);
      if (!match || !playerId || !matchPlayers.includes(playerId)) {
        return res.status(403).json({ ok: false, error: "Вы не участник этой пары" });
      }
      if (cleanText(match.winnerId, 80)) return res.status(409).json({ ok: false, error: "Пара уже завершена" });
      if (matchPlayers.length < 2) return res.status(409).json({ ok: false, error: "Пара еще не сформирована полностью" });
      ensureMatchReadyTimer(match, Date.now());
      const deadlineMs = Date.parse(match.readyDeadlineAt || "");
      if (Number.isFinite(deadlineMs) && Date.now() >= deadlineMs) {
        const expiredChanged = applyExpiredReadyMatches(state, Date.now());
        if (expiredChanged) await saveState(state, store);
        return res.status(409).json({ ok: false, error: "Таймер готовности уже истек" });
      }
      match.readyById = match.readyById && typeof match.readyById === "object" ? match.readyById : {};
      if (currentTeam) {
        match.readyMemberIds = match.readyMemberIds && typeof match.readyMemberIds === "object" ? match.readyMemberIds : {};
        match.readyMemberIds[current.id] = true;
        if ((currentTeam.memberIds || []).every((memberId) => match.readyMemberIds[memberId] === true)) {
          match.readyById[playerId] = true;
        }
      } else {
        match.readyById[playerId] = true;
      }
      const participantFullyReady = match.readyById[playerId] === true;
      playerNotifications = playerNotifications.concat(notificationsForParticipant(
        state,
        playerId,
        "teamReady",
        currentTeam
          ? (participantFullyReady
            ? "Оба игрока вашей команды подтвердили готовность к матчу " + roundStageLabelForState(state, found && found.round) + "."
            : entryPublicName(current) + " подтвердил готовность. Ожидаем подтверждение второго игрока команды.")
          : "Вы подтвердили готовность к матчу " + roundStageLabelForState(state, found && found.round) + "."
      ));
      changed = true;
    } else if (action === "setPlaying") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только админ" });
      if (state.status !== "bracket") return res.status(409).json({ ok: false, error: "Сетка еще не сформирована" });
      const found = findRoundByMatchId(state, body.matchId);
      const match = found && found.match;
      const matchPlayers = playableIds(match);
      if (!match) return res.status(404).json({ ok: false, error: "Пара не найдена" });
      if (cleanText(match.winnerId, 80)) return res.status(409).json({ ok: false, error: "Пара уже завершена" });
      if (matchPlayers.length < 2) return res.status(409).json({ ok: false, error: "Пара еще не сформирована полностью" });
      const tablePassword = cleanText(body.tablePassword, 4);
      if (!/^\d{4}$/.test(tablePassword)) return res.status(400).json({ ok: false, error: "Укажите пароль стола из 4 цифр" });
      if (!match.playingAt) {
        match.tablePassword = tablePassword;
        match.playingAt = new Date().toISOString();
        changed = true;
      }
      playerNotifications = playerNotifications.concat(await buildMatchStartedNotifications(state, found && found.round, match));
    } else if (action === "remindMatchReady") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только админ" });
      if (state.status !== "bracket") return res.status(409).json({ ok: false, error: "Сетка еще не сформирована" });
      const found = findRoundByMatchId(state, body.matchId);
      const match = found && found.match;
      const matchPlayers = playableIds(match);
      if (!match) return res.status(404).json({ ok: false, error: "Пара не найдена" });
      if (cleanText(match.winnerId, 80)) return res.status(409).json({ ok: false, error: "Пара уже завершена" });
      if (matchPlayers.length < 2) return res.status(409).json({ ok: false, error: "Пара еще не сформирована полностью" });
      const reminders = await buildMatchReadyReminderNotifications(state, found && found.round, match);
      if (!reminders.length) return res.status(409).json({ ok: false, error: "Все игроки в паре уже готовы" });
      playerNotifications = playerNotifications.concat(reminders);
    } else if (action === "setTeamRoundPassword") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только админ" });
      if (state.status !== "bracket" || state.tournamentType !== "team") return res.status(409).json({ ok: false, error: "Действие доступно только для командной сетки" });
      const found = findRoundByMatchId(state, body.matchId);
      const match = found && found.match;
      const game = Number(body.game);
      const password = cleanText(body.password, 4);
      if (!match || playableIds(match).length < 2) return res.status(400).json({ ok: false, error: "Пара не найдена" });
      if (![1, 2, 3].includes(game)) return res.status(400).json({ ok: false, error: "Неизвестный номер игры" });
      if (!/^\d{4}$/.test(password)) return res.status(400).json({ ok: false, error: "Укажите пароль из 4 цифр" });
      if (game === 2 && !match.singlesPlayers) return res.status(409).json({ ok: false, error: "Сначала выберите игроков второй встречи" });
      if (game === 3 && !match.deciderPlayers) return res.status(409).json({ ok: false, error: "Третья встреча ещё не сформирована" });
      match.roundPasswords = match.roundPasswords && typeof match.roundPasswords === "object" ? match.roundPasswords : {};
      match.roundPasswords[String(game)] = password;
      const ids = playableIds(match);
      const entries = entryMap(state);
      const teamWithMembers = (participantId) => {
        const name = participantDisplayName(state, participantId);
        const members = participantTeamMembersText(state, participantId);
        return name + (members ? " (" + members + ")" : "");
      };
      const gamePlayers = game === 1
        ? teamWithMembers(ids[0]) + " — " + teamWithMembers(ids[1])
        : game === 2
          ? entryPublicName(entries.get(match.singlesPlayers.first)) + " — " + entryPublicName(entries.get(match.singlesPlayers.second))
          : entryPublicName(entries.get(match.deciderPlayers.first)) + " — " + entryPublicName(entries.get(match.deciderPlayers.second));
      const teamNames = participantDisplayName(state, ids[0]) + " — " + participantDisplayName(state, ids[1]);
      const gameLabel = game === 1 ? "1-я игра · 2×2" : game === 2 ? "2-я игра · 1×1" : "3-я игра · 1×1";
      const stageLabel = tournamentStageMessageLabel(state, found && found.round);
      const roundMatches = Array.isArray(found && found.round && found.round.matches) ? found.round.matches : [];
      const pairNumber = Math.max(1, roundMatches.findIndex((item) => item && item.id === match.id) + 1);
      playerNotifications = playerNotifications.concat(await buildTournamentBroadcastNotifications(
        state,
        "teamRoundStarted",
        "Стадия турнира: " + stageLabel + ".\n" +
        "Пара №" + pairNumber + ".\n" +
        "Команды: " + teamNames + ".\n" +
        "Создан стол: " + gameLabel + ".\n" + gamePlayers + "\nПароль стола: " + password
      ));
      changed = true;
    } else if (action === "setTeamRoundWinner") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только админ" });
      if (state.status !== "bracket" || state.tournamentType !== "team") return res.status(409).json({ ok: false, error: "Действие доступно только для командной сетки" });
      const found = findRoundByMatchId(state, body.matchId);
      const match = found && found.match;
      const winnerId = cleanText(body.playerId, 80);
      const ids = playableIds(match);
      if (!match || ids.length < 2 || !ids.includes(winnerId)) return res.status(400).json({ ok: false, error: "Команда первого раунда не найдена" });
      if (cleanText(match.winnerId, 80)) return res.status(409).json({ ok: false, error: "Пара уже завершена" });
      match.teamRoundWinnerId = winnerId;
      match.singlesRoundWinnerId = "";
      match.deciderPlayers = null;
      match.deciderRoundWinnerId = "";
      match.liveScore = { first: winnerId === ids[0] ? 1 : 0, second: winnerId === ids[1] ? 1 : 0 };
      changed = true;
    } else if (action === "setSinglesPlayers") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только админ" });
      if (state.status !== "bracket" || state.tournamentType !== "team") return res.status(409).json({ ok: false, error: "Действие доступно только для командной сетки" });
      const found = findRoundByMatchId(state, body.matchId);
      const match = found && found.match;
      const ids = playableIds(match);
      if (!match || ids.length < 2) return res.status(400).json({ ok: false, error: "Пара не найдена" });
      const firstEntryId = cleanText(body.firstEntryId, 80);
      const secondEntryId = cleanText(body.secondEntryId, 80);
      const firstTeam = (state.teams || []).find((team) => team && team.id === ids[0]);
      const secondTeam = (state.teams || []).find((team) => team && team.id === ids[1]);
      if (!firstTeam || !(firstTeam.memberIds || []).includes(firstEntryId) || !secondTeam || !(secondTeam.memberIds || []).includes(secondEntryId)) {
        return res.status(400).json({ ok: false, error: "Выберите по одному игроку из каждой команды" });
      }
      match.singlesPlayers = { first: firstEntryId, second: secondEntryId };
      match.singlesRoundWinnerId = "";
      match.deciderPlayers = null;
      match.deciderRoundWinnerId = "";
      match.liveScore = {
        first: match.teamRoundWinnerId === ids[0] ? 1 : 0,
        second: match.teamRoundWinnerId === ids[1] ? 1 : 0,
      };
      changed = true;
    } else if (action === "setTeamSinglesWinner") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только админ" });
      if (state.status !== "bracket" || state.tournamentType !== "team") return res.status(409).json({ ok: false, error: "Действие доступно только для командной сетки" });
      const found = findRoundByMatchId(state, body.matchId);
      const round = found && found.round;
      const match = found && found.match;
      const ids = playableIds(match);
      const winnerId = cleanText(body.playerId, 80);
      const game = Number(body.game);
      if (!match || ids.length < 2 || !ids.includes(winnerId)) return res.status(400).json({ ok: false, error: "Команда не найдена" });
      if (cleanText(match.winnerId, 80)) return res.status(409).json({ ok: false, error: "Пара уже завершена" });
      if (!match.teamRoundWinnerId || !match.singlesPlayers) return res.status(409).json({ ok: false, error: "Сначала заполните результаты предыдущих игр" });
      let loserScore = 0;
      if (game === 2) {
        match.singlesRoundWinnerId = winnerId;
        if (winnerId !== match.teamRoundWinnerId) {
          const firstTeam = (state.teams || []).find((team) => team && team.id === ids[0]);
          const secondTeam = (state.teams || []).find((team) => team && team.id === ids[1]);
          const firstRemaining = firstTeam && (firstTeam.memberIds || []).find((id) => id && id !== match.singlesPlayers.first);
          const secondRemaining = secondTeam && (secondTeam.memberIds || []).find((id) => id && id !== match.singlesPlayers.second);
          if (!firstRemaining || !secondRemaining) return res.status(409).json({ ok: false, error: "Не удалось определить игроков третьей встречи" });
          match.deciderPlayers = { first: firstRemaining, second: secondRemaining };
          match.deciderRoundWinnerId = "";
          match.liveScore = { first: 1, second: 1 };
          changed = true;
        } else {
          loserScore = 0;
        }
      } else if (game === 3) {
        if (!match.deciderPlayers || match.singlesRoundWinnerId === match.teamRoundWinnerId) return res.status(409).json({ ok: false, error: "Третья встреча не требуется" });
        match.deciderRoundWinnerId = winnerId;
        loserScore = 1;
      } else {
        return res.status(400).json({ ok: false, error: "Неизвестный номер игры" });
      }
      if ((game === 2 && winnerId === match.teamRoundWinnerId) || game === 3) {
        const pendingBefore = pendingOpponentSnapshot(state);
        const completedAt = new Date().toISOString();
        const loserId = ids.find((id) => id && id !== winnerId) || "";
        match.winnerId = winnerId;
        match.liveScore = null;
        match.score = { winnerId, loserId, winner: 2, loser: loserScore, text: `2-${loserScore}` };
        match.completedAt = completedAt;
        placeMatchWinner(state, found, winnerId, Date.now());
        advanceBracketByes(state, Date.now());
        playerNotifications = playerNotifications.concat(await buildOpponentResolvedNotifications(state, pendingBefore));
        playerNotifications = playerNotifications.concat(await buildWinnerAdvancedNotifications(state, round, match, winnerId));
        playerNotifications = playerNotifications.concat(await buildMatchAdvancedBroadcastNotifications(state, round, match, winnerId));
        updateCurrentRoundId(state);
        changed = true;
      }
    } else if (action === "setMatchScore") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только админ" });
      if (state.status !== "bracket") return res.status(409).json({ ok: false, error: "Сетка еще не сформирована" });
      const found = findRoundByMatchId(state, body.matchId);
      const match = found && found.match;
      if (!match) return res.status(404).json({ ok: false, error: "Пара не найдена" });
      if (playableIds(match).length < 2) return res.status(409).json({ ok: false, error: "Пара еще не сформирована полностью" });
      const targetWins = matchWinTarget(state, found);
      const winnerId = cleanText(match.winnerId, 80);
      const playerIds = playableIds(match);
      const firstScore = Number(body.score && body.score.first);
      const secondScore = Number(body.score && body.score.second);
      const scoreResult = winnerId
        ? normalizeMatchScore({
          winner: winnerId === playerIds[0] ? firstScore : secondScore,
          loser: winnerId === playerIds[0] ? secondScore : firstScore,
        }, match, winnerId, targetWins)
        : normalizeIntermediateMatchScore(body.score, targetWins);
      if (!scoreResult.ok) return res.status(400).json({ ok: false, error: scoreResult.error });
      if (winnerId) match.score = scoreResult.score;
      else match.liveScore = scoreResult.score;
      changed = true;
    } else if (action === "setWinner") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только админ" });
      if (state.status !== "bracket") return res.status(409).json({ ok: false, error: "Сетка еще не сформирована" });
      const found = findRoundByMatchId(state, body.matchId);
      const round = found && found.round;
      const match = found && found.match;
      const winnerId = cleanText(body.playerId, 80);
      const matchPlayers = (Array.isArray(match && match.playerIds) ? match.playerIds : []).filter(Boolean);
      if (!match || !winnerId || !matchPlayers.includes(winnerId)) {
        return res.status(400).json({ ok: false, error: "Пара не найдена" });
      }
      if (matchPlayers.length < 2) return res.status(409).json({ ok: false, error: "Пара еще не сформирована полностью" });
      if (cleanText(match.winnerId, 80)) return res.status(409).json({ ok: false, error: "Победитель пары уже выбран" });
      const players = entryMap(state);
      if (!players.has(winnerId) && !(state.teams || []).some((team) => team.id === winnerId)) return res.status(404).json({ ok: false, error: "Игрок или команда не найдены" });
      let matchScore = null;
      if (matchRequiresScore(state, found)) {
        const scoreResult = normalizeMatchScore(body.score, match, winnerId, matchWinTarget(state, found));
        if (!scoreResult.ok) return res.status(400).json({ ok: false, error: scoreResult.error });
        matchScore = scoreResult.score;
      }
      const pendingBefore = pendingOpponentSnapshot(state);
      const completedAt = new Date().toISOString();
      match.winnerId = winnerId;
      match.liveScore = null;
      match.score = matchScore;
      match.completedAt = completedAt;
      placeMatchWinner(state, found, winnerId, Date.now());
      advanceBracketByes(state, Date.now());
      playerNotifications = playerNotifications.concat(await buildOpponentResolvedNotifications(state, pendingBefore));
      playerNotifications = playerNotifications.concat(await buildWinnerAdvancedNotifications(state, round, match, winnerId));
      playerNotifications = playerNotifications.concat(await buildMatchAdvancedBroadcastNotifications(state, round, match, winnerId));
      updateCurrentRoundId(state);
      changed = true;
    } else if (action === "reset") {
      if (!auth.isAdmin) return res.status(403).json({ ok: false, error: "Только админ" });
      const tournamentId = state.id;
      Object.assign(state, defaultState(), { id: tournamentId });
      changed = true;
    } else {
      return res.status(400).json({ ok: false, error: "Неизвестное действие" });
    }
  } catch (error) {
    return res.status(error.status || 500).json({ ok: false, error: error.message || "Ошибка" });
  }

  if (changed) await saveState(state, store);
  if (applicationNotificationEntry) {
    try {
      const enriched = (await enrichEntries([applicationNotificationEntry]))[0] || applicationNotificationEntry;
      await notifySngApplication(enriched, state);
    } catch (error) {
      console.warn("sng-champions: application notification crashed", {
        error: error && error.message ? error.message : String(error || ""),
      });
    }
  }
  if (balancePaidNotificationEntry) {
    try {
      const enriched = (await enrichEntries([balancePaidNotificationEntry]))[0] || balancePaidNotificationEntry;
      await notifySngBalancePaid(enriched, state);
    } catch (error) {
      console.warn("sng-champions: balance paid notification crashed", {
        error: error && error.message ? error.message : String(error || ""),
      });
    }
  }
  if (playerNotifications.length) {
    for (let offset = 0; offset < playerNotifications.length; offset += 8) {
      const batch = playerNotifications.slice(offset, offset + 8);
      await Promise.all(batch.map(async (notification) => {
        try {
          await notifyEntryStatus(notification);
        } catch (error) {
          console.warn("sng-champions: player notification crashed", {
            action: notification.action,
            chatId: notification.chatId,
            error: error && error.message ? error.message : String(error || ""),
          });
        }
      }));
    }
  }
  const payload = await publicState(state, { ...auth, accountId });
  payload.tournaments = tournamentMenu(store, auth.isAdmin);
  return res.status(200).json(payload);
};

function pokerRafflesFormatCountdown(endDate) {
  if (!endDate) return "";
  var now = new Date();
  var ms = endDate.getTime() - now.getTime();
  if (ms <= 0) return "Завершён";
  var sec = Math.floor(ms / 1000) % 60;
  var min = Math.floor(ms / 60000) % 60;
  var hours = Math.floor(ms / 3600000) % 24;
  var days = Math.floor(ms / 86400000);
  var parts = [];
  if (days > 0) parts.push(days + " д.");
  if (hours > 0 || parts.length) parts.push(hours + " ч.");
  parts.push(min + " мин.");
  parts.push(sec + " сек.");
  return parts.join(" ");
}

function pokerRafflesEscapeHtml(s) {
  if (s == null) return "";
  var str = String(s);
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function pokerRafflesNormalizeTelegramLogin(raw) {
  var login = raw != null ? String(raw).trim().replace(/^@+/g, "") : "";
  return /^[A-Za-z0-9_]{5,32}$/.test(login) ? login : "";
}

function pokerRafflesLooksLikeTelegramLogin(raw, telegramUsername) {
  var text = raw != null ? String(raw).trim() : "";
  if (!text) return false;
  var normalized = pokerRafflesNormalizeTelegramLogin(text);
  if (!normalized) return false;
  if (text.charAt(0) === "@") return true;
  var tgLogin = pokerRafflesNormalizeTelegramLogin(telegramUsername);
  return !!(tgLogin && normalized.toLowerCase() === tgLogin.toLowerCase());
}

function pokerRafflesIsManualPlaceholderUserId(raw) {
  var uid = raw != null ? String(raw).trim() : "";
  return /^manual_raffle_[a-f0-9]+$/i.test(uid);
}

function pokerRafflesParticipantPublicName(p, showTelegramLogins) {
  var raw = p && p.name != null ? String(p.name).trim() : "";
  if (raw === "Участник") return "";
  if (!showTelegramLogins && pokerRafflesLooksLikeTelegramLogin(raw, p && p.telegramUsername)) return "";
  return raw;
}

function pokerRafflesParticipantIdentityKeys(p) {
  if (!p) return [];
  var keys = [];
  var seen = {};
  function add(prefix, value) {
    var text = value != null ? String(value).trim() : "";
    if (!text) return;
    var key = prefix + ":" + text.toLowerCase();
    if (seen[key]) return;
    seen[key] = true;
    keys.push(key);
  }
  add("p21", p.p21Id || p.poker21Id || p.pokerPlusId);
  add("account", p.accountId || p.dtId || p.memberId);
  var uid = p.userId != null ? String(p.userId).trim() : "";
  if (uid && !pokerRafflesIsManualPlaceholderUserId(uid)) add("user", uid);
  var tg = pokerRafflesNormalizeTelegramLogin(p.telegramUsername || p.telegram || p.telegramLogin);
  if (tg) add("tg", tg);
  var name = pokerRafflesParticipantPublicName(p, true);
  if (p.manualRaffleParticipant === true && name && name !== "Участник") add("manual-name", name);
  if (uid && !keys.length) add("row", uid);
  return keys;
}

function pokerRafflesParticipantCanOpenProfile(p) {
  var uid = p && p.userId != null ? String(p.userId).trim() : "";
  return !!(uid && (uid.indexOf("tg_") === 0 || uid.indexOf("vk_") === 0));
}

function pokerRafflesMergeParticipantForDisplay(base, row) {
  var merged = Object.assign({}, base || {});
  var ticketCount =
    pokerRafflesParticipantTicketCount(base) +
    pokerRafflesParticipantTicketCount(row);
  if (!pokerRafflesParticipantCanOpenProfile(merged) && pokerRafflesParticipantCanOpenProfile(row)) {
    merged.userId = row.userId;
  }
  [
    "accountId",
    "p21Id",
    "poker21Id",
    "pokerPlusId",
    "name",
    "telegramUsername",
    "pokerPlusNickname",
    "pokerPlusStatusLevel"
  ].forEach(function (key) {
    var current = merged[key] != null ? String(merged[key]).trim() : "";
    var next = row && row[key] != null ? String(row[key]).trim() : "";
    if ((!current || current === "Участник") && next) merged[key] = row[key];
  });
  merged.ticketCount = ticketCount;
  merged.entryTicketCount = ticketCount;
  merged.raffleTickets = ticketCount;
  return merged;
}

function pokerRafflesGroupParticipantsForDisplay(parts) {
  var rows = Array.isArray(parts) ? parts : [];
  var groups = [];
  var byKey = {};
  rows.forEach(function (row, index) {
    var keys = pokerRafflesParticipantIdentityKeys(row);
    var groupIndex = -1;
    keys.some(function (key) {
      if (byKey[key] != null) {
        groupIndex = byKey[key];
        return true;
      }
      return false;
    });
    if (groupIndex < 0) {
      groupIndex = groups.length;
      groups.push(Object.assign({}, row || {}));
      if (!keys.length) keys.push("display-row:" + index);
    } else {
      groups[groupIndex] = pokerRafflesMergeParticipantForDisplay(groups[groupIndex], row || {});
    }
    keys.forEach(function (key) {
      byKey[key] = groupIndex;
    });
  });
  return groups;
}

function pokerRafflesParticipantDisplayLine(p, showTelegramLogins, showTickets) {
  var safeName = pokerRafflesParticipantPublicName(p, !!showTelegramLogins);
  var uid0 = String(p.userId != null ? p.userId : "").trim();
  var raffleIdText = p.p21Id != null && String(p.p21Id).trim()
    ? String(p.p21Id).trim()
    : (p.accountId != null && String(p.accountId).trim()
      ? String(p.accountId).trim()
      : (pokerRafflesIsManualPlaceholderUserId(uid0) ? "" : uid0));
  var pokerNick = p && p.pokerPlusNickname != null ? String(p.pokerPlusNickname).trim() : "";
  if (pokerNick === "Участник") pokerNick = "";
  if (pokerNick && raffleIdText && pokerNick === raffleIdText) pokerNick = "";
  if (pokerNick && safeName && pokerNick.toLowerCase() === safeName.toLowerCase()) pokerNick = "";
  var namePart = safeName
    ? pokerRafflesEscapeHtml(safeName) + (pokerNick ? " (" + pokerRafflesEscapeHtml(pokerNick) + ")" : "")
    : (pokerNick ? pokerRafflesEscapeHtml(pokerNick) : "");
  var fishLevelHtml = pokerRafflesParticipantFishLevelHtml(p);
  var ticketsHtml = showTickets === false ? "" : pokerRafflesParticipantTicketsHtml(p);
  var un = pokerRafflesNormalizeTelegramLogin(p.telegramUsername);
  if (showTelegramLogins && un && uid0.indexOf("tg_") === 0) {
    namePart += " (@" + pokerRafflesEscapeHtml(un) + ")";
  }
  var mainLine = !namePart
    ? pokerRafflesEscapeHtml(raffleIdText)
    : (raffleIdText ? namePart + " — " + pokerRafflesEscapeHtml(raffleIdText) : namePart);
  if (!mainLine) mainLine = "Участник";
  return (
    '<span class="raffle-participant-line">' +
    '<span class="raffle-participant-line__main">' +
    mainLine +
    "</span>" +
    (fishLevelHtml ? '<span class="raffle-participant-line__level">' + fishLevelHtml + "</span>" : "") +
    (ticketsHtml ? '<span class="raffle-participant-line__tickets">' + ticketsHtml + "</span>" : "") +
    "</span>"
  );
}

function pokerRafflesParticipantTicketCount(p) {
  if (!p) return 1;
  var raw = p.ticketCount != null
    ? p.ticketCount
    : p.tickets != null
      ? p.tickets
      : p.entryTicketCount != null
        ? p.entryTicketCount
        : p.raffleTickets;
  var n = parseInt(String(raw == null ? "" : raw), 10);
  if (!isFinite(n) || n <= 0) return 1;
  return Math.max(1, Math.min(1000, n));
}

function pokerRafflesTicketWord(n) {
  n = Math.abs(parseInt(n, 10) || 0);
  var mod100 = n % 100;
  var mod10 = n % 10;
  if (mod100 >= 11 && mod100 <= 19) return "билетов";
  if (mod10 === 1) return "билет";
  if (mod10 >= 2 && mod10 <= 4) return "билета";
  return "билетов";
}

function pokerRafflesParticipantTicketsHtml(p) {
  var count = pokerRafflesParticipantTicketCount(p);
  if (count <= 1) return "";
  return pokerRafflesEscapeHtml(String(count) + " " + pokerRafflesTicketWord(count));
}

function pokerRafflesParticipantFishLevelHtml(p) {
  if (!p) return "";
  var hasLevel = p.pokerPlusStatusLevel != null && p.pokerPlusStatusLevel !== "";
  var level = hasLevel ? parseInt(p.pokerPlusStatusLevel, 10) : 0;
  if (!isFinite(level) || level < 0) return "";
  level = Math.min(100, level);
  var fishHtml = "";
  if (typeof pokerProfileStatusFishIconHtml === "function") {
    fishHtml = pokerProfileStatusFishIconHtml(level, "raffle-participant-status-fish");
  }
  return (
    '<span class="raffle-participant-status-level">' +
    fishHtml +
    "Уровень " +
    pokerRafflesEscapeHtml(String(level)) +
    "</span>"
  );
}

function pokerRafflesParticipantRemoveLabel(p, safeName) {
  var uid = p && p.userId != null ? String(p.userId).trim() : "";
  var accountId = p && p.accountId != null ? String(p.accountId).trim() : "";
  var p21Id = p && (p.p21Id || p.poker21Id || p.pokerPlusId) != null ? String(p.p21Id || p.poker21Id || p.pokerPlusId).trim() : "";
  var pokerNick = p && p.pokerPlusNickname != null ? String(p.pokerPlusNickname).trim() : "";
  if (pokerNick === "Участник") pokerNick = "";
  return safeName || pokerNick || p21Id || accountId || (pokerRafflesIsManualPlaceholderUserId(uid) ? "" : uid) || "участника";
}

function pokerRafflesParticipantRemoveButtonHtml(p, safeName) {
  var uid = p && p.userId != null ? String(p.userId).trim() : "";
  var accountId = p && p.accountId != null ? String(p.accountId).trim() : "";
  var p21Id = p && (p.p21Id || p.poker21Id || p.pokerPlusId) != null ? String(p.p21Id || p.poker21Id || p.pokerPlusId).trim() : "";
  var telegramUsername = pokerRafflesNormalizeTelegramLogin(p && (p.telegramUsername || p.telegram || p.telegramLogin));
  var name = p && p.name != null ? String(p.name).trim() : "";
  var label = pokerRafflesParticipantRemoveLabel(p, safeName);
  return (
    '<button type="button" class="raffle-participants__remove-btn" data-raffle-participant-remove="1"' +
    ' data-user-id="' + pokerRafflesEscapeHtml(uid) + '"' +
    ' data-account-id="' + pokerRafflesEscapeHtml(accountId) + '"' +
    ' data-p21-id="' + pokerRafflesEscapeHtml(p21Id) + '"' +
    ' data-telegram-username="' + pokerRafflesEscapeHtml(telegramUsername) + '"' +
    ' data-participant-name="' + pokerRafflesEscapeHtml(name) + '"' +
    ' data-participant-label="' + pokerRafflesEscapeHtml(label) + '"' +
    ' aria-label="Удалить ' + pokerRafflesEscapeHtml(label) + '"' +
    ' title="Удалить участника">×</button>'
  );
}

function pokerRafflesParticipantLineHtml(p, showTelegramLogins, showTickets) {
  var uid = String(p.userId != null ? p.userId : "").trim();
  var line = pokerRafflesParticipantDisplayLine(p, !!showTelegramLogins, showTickets);
  var safeName = pokerRafflesParticipantPublicName(p, !!showTelegramLogins);
  var removeHtml = showTelegramLogins ? pokerRafflesParticipantRemoveButtonHtml(p, safeName) : "";
  var itemClass = "raffle-participants-item" + (removeHtml ? " raffle-participants-item--with-remove" : "");
  var contentClass = "raffle-participants-item__content";
  if (!uid || (uid.indexOf("tg_") !== 0 && uid.indexOf("vk_") !== 0)) {
    return "<li class=\"" + itemClass + "\"><span class=\"" + contentClass + "\">" + line + "</span>" + removeHtml + "</li>";
  }
  var dataName = safeName || (p && p.pokerPlusNickname != null ? String(p.pokerPlusNickname).trim() : "");
  if (dataName === "Участник") dataName = "";
  return (
    "<li class=\"" + itemClass + "\"><button type=\"button\" class=\"raffle-participants__profile-btn " + contentClass + "\" data-user-id=\"" +
    pokerRafflesEscapeHtml(uid) +
    "\" data-user-name=\"" +
    pokerRafflesEscapeHtml(dataName || "") +
    "\">" +
    line +
    "</button>" +
    removeHtml +
    "</li>"
  );
}

function pokerRafflesDisplayPrizeText(s) {
  if (s == null || typeof s !== "string") return s;
  var ph = "\x01BECKING_PH\x02";
  return s.replace(/беккинг-билет/gi, ph).replace(/Билет/g, "Беккинг-билет").replace(/билет/g, "беккинг-билет").split(ph).join("беккинг-билет");
}

function pokerRafflesParsePrizeValue(prizeStr) {
  if (prizeStr == null || prizeStr === "") return 0;
  var m = String(prizeStr).trim().match(/\d[\d\s\u00a0\u202f]*(?:[.,]\d+)?/);
  return m ? parseFloat(m[0].replace(/[\s\u00a0\u202f]/g, "").replace(",", ".")) : 0;
}

function pokerRafflesGetTotalPrize(raffle) {
  if (!raffle || !raffle.groups) return 0;
  return raffle.groups.reduce(function (sum, g) {
    var count = Math.max(0, parseInt(g.count, 10) || 0);
    var nominal = pokerRafflesParsePrizeValue(g.prize);
    return sum + (nominal > 0 ? nominal * count : 0);
  }, 0);
}

function pokerRafflesFormatSum(rub) {
  var n = Math.round(rub);
  if (n === 0) return "0 ₽";
  return (n < 0 ? "-" : "") + String(Math.abs(n)).replace(/\B(?=(\d{3})+(?!\d))/g, "\u202f") + " ₽";
}

function pokerRafflesPluralizeBackingTicketsForHeading(n) {
  var v = Math.abs(n) % 100;
  var d = v % 10;
  if (v >= 11 && v <= 19) return "беккинг-билетов";
  if (d === 1) return "беккинг-билет";
  if (d >= 2 && d <= 4) return "беккинг-билета";
  return "беккинг-билетов";
}

function pokerRafflesPluralizeCashBuyinsForHeading(n) {
  var v = Math.abs(n) % 100;
  var d = v % 10;
  if (v >= 11 && v <= 19) return "беккинг-байинов";
  if (d === 1) return "беккинг-байин";
  if (d >= 2 && d <= 4) return "беккинг-байина";
  return "беккинг-байинов";
}

function pokerRafflesIsCashPrize(raffle) {
  if (!raffle) return false;
  var explicit = String(raffle.prizeKind || raffle.prize_kind || "").trim().toLowerCase();
  if (explicit === "cash" || explicit === "cash_buyin" || explicit === "cash_buyins" || explicit === "other") return true;
  if (explicit === "tournament_ticket" || explicit === "ticket" || explicit === "tickets") return false;
  var groups = Array.isArray(raffle.groups) ? raffle.groups : [];
  var text = String(raffle.title || "").toLowerCase();
  for (var i = 0; i < groups.length; i++) text += " " + String(groups[i] && groups[i].prize || "").toLowerCase();
  return text.indexOf("на кеш") !== -1 || text.indexOf("кеш") !== -1 || text.indexOf("cash") !== -1 || text.indexOf("бонус гейм") !== -1 || text.indexOf("bonus game") !== -1;
}

function pokerRafflesParsePrizeTournamentNameFromPrize(prizeStr) {
  var s = String(prizeStr || "").trim();
  var idx = s.indexOf(" — ");
  if (idx === -1) idx = s.search(/\s[–—-]\s/);
  if (idx === -1) return "";
  return s.slice(idx).replace(/^\s[–—-]\s/, "").trim();
}

function pokerRafflesIsGenericTitleForHeading(s) {
  var t = String(s || "").toLowerCase();
  return t.indexOf("розыгрыш") !== -1 && (t.indexOf("беккинг") !== -1 || t.indexOf("билет") !== -1);
}

function pokerRafflesBuildActiveCardHeading(raffle) {
  if (!raffle) return "";
  var groups = Array.isArray(raffle.groups) ? raffle.groups : [];
  var totalTickets = Math.max(0, parseInt(raffle.totalWinners, 10) || 0);
  if (!totalTickets && groups.length) {
    totalTickets = groups.reduce(function (s, g) {
      return s + Math.max(0, parseInt(g.count, 10) || 0);
    }, 0);
  }
  var totalPrize = pokerRafflesGetTotalPrize(raffle);
  var sumText = totalPrize > 0 ? pokerRafflesFormatSum(totalPrize) : "—";
  var rawTitle = (raffle.title || "").trim();
  var ticketWord = pokerRafflesPluralizeBackingTicketsForHeading(totalTickets || 0);
  var isCashPrize = pokerRafflesIsCashPrize(raffle);

  function tourPhraseFromNames(uniqueNames) {
    if (uniqueNames.length >= 2) return "на турниры «" + uniqueNames.join("», «") + "»";
    if (uniqueNames.length === 1) return "на турнир «" + uniqueNames[0] + "»";
    if (rawTitle && !pokerRafflesIsGenericTitleForHeading(rawTitle)) return "на турнир «" + rawTitle + "»";
    return "на турнир «турнир клуба»";
  }

  if (!groups.length) {
    if (rawTitle) return "Розыгрыш: " + rawTitle + ". Итого сумма розыгрыша " + sumText + ".";
    return "Розыгрыш. Итого сумма розыгрыша " + sumText + ".";
  }

  var rows = [];
  for (var i = 0; i < groups.length; i++) {
    var g = groups[i];
    var c = Math.max(0, parseInt(g.count, 10) || 0);
    var nom = pokerRafflesParsePrizeValue(g.prize);
    var tname = pokerRafflesParsePrizeTournamentNameFromPrize(g.prize || "");
    rows.push({ count: c, nominal: nom, tournament: tname });
  }

  var uniqueNom = [];
  for (var ni = 0; ni < rows.length; ni++) {
    var nv = rows[ni].nominal;
    if (nv > 0 && uniqueNom.indexOf(nv) === -1) uniqueNom.push(nv);
  }

  var uniqueNames = [];
  for (var nj = 0; nj < rows.length; nj++) {
    var tn = rows[nj].tournament;
    if (tn && uniqueNames.indexOf(tn) === -1) uniqueNames.push(tn);
  }

  if (isCashPrize) {
    var cashWord = pokerRafflesPluralizeCashBuyinsForHeading(totalTickets || 0);
    if (uniqueNom.length === 1) {
      var cashPrice = uniqueNom[0];
      return (
        "Розыгрыш " +
        totalTickets +
        " " +
        cashWord +
        " на кеш за " +
        pokerRafflesFormatSum(cashPrice) +
        ". Столы Бонус гейм на Poker21. Итого сумма розыгрыша " +
        sumText +
        "."
      );
    }
    if (uniqueNom.length > 1) {
      var cashParts = [];
      for (var ck = 0; ck < rows.length; ck++) {
        var cr = rows[ck];
        if (cr.count > 0 && cr.nominal > 0) cashParts.push(cr.count + "×" + pokerRafflesFormatSum(cr.nominal));
      }
      if (cashParts.length) {
        return (
          "Розыгрыш " +
          totalTickets +
          " " +
          cashWord +
          " на кеш: " +
          cashParts.join(", ") +
          ". Столы Бонус гейм на Poker21. Итого сумма розыгрыша " +
          sumText +
          "."
        );
      }
    }
    return (
      "Розыгрыш " +
      totalTickets +
      " " +
      cashWord +
      " на кеш. Столы Бонус гейм на Poker21. Итого сумма розыгрыша " +
      sumText +
      "."
    );
  }

  if (uniqueNom.length === 1) {
    var price = uniqueNom[0];
    var nomText = pokerRafflesFormatSum(price);
    var tourPhrase = tourPhraseFromNames(uniqueNames);
    return (
      "Розыгрыш " +
      totalTickets +
      " " +
      ticketWord +
      " за " +
      nomText +
      " " +
      tourPhrase +
      ". Итого сумма розыгрыша " +
      sumText +
      "."
    );
  }

  if (uniqueNom.length > 1) {
    var mixParts = [];
    for (var mk = 0; mk < rows.length; mk++) {
      var r = rows[mk];
      if (r.count > 0 && r.nominal > 0) mixParts.push(r.count + "×" + pokerRafflesFormatSum(r.nominal));
    }
    var mix = mixParts.join(", ");
    var tourPhraseM = tourPhraseFromNames(uniqueNames);
    return (
      "Розыгрыш " +
      totalTickets +
      " " +
      ticketWord +
      ": " +
      mix +
      ". " +
      tourPhraseM +
      ". Итого сумма розыгрыша " +
      sumText +
      "."
    );
  }

  var firstPrize = groups[0] && groups[0].prize ? String(groups[0].prize).trim() : "";
  var prizeLine = firstPrize ? pokerRafflesDisplayPrizeText(firstPrize) : "";
  var label = prizeLine || rawTitle || "приз";
  return "Розыгрыш " + totalTickets + " призов: " + label + ". Итого сумма розыгрыша " + sumText + ".";
}

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

function pokerRafflesParticipantDisplayLine(p) {
  var namePart = pokerRafflesEscapeHtml(p.name);
  var uid0 = String(p.userId != null ? p.userId : "").trim();
  var raffleIdText = p.p21Id != null && String(p.p21Id).trim()
    ? String(p.p21Id).trim()
    : (p.accountId != null && String(p.accountId).trim() ? String(p.accountId).trim() : uid0);
  var un = p.telegramUsername != null ? String(p.telegramUsername).trim().replace(/^@+/g, "") : "";
  if (un && uid0.indexOf("tg_") === 0) {
    namePart += " (@" + pokerRafflesEscapeHtml(un) + ")";
  }
  return raffleIdText ? namePart + " — " + pokerRafflesEscapeHtml(raffleIdText) : namePart;
}

function pokerRafflesParticipantLineHtml(p) {
  var uid = String(p.userId != null ? p.userId : "").trim();
  var line = pokerRafflesParticipantDisplayLine(p);
  if (!uid || (uid.indexOf("tg_") !== 0 && uid.indexOf("vk_") !== 0)) {
    return "<li class=\"raffle-participants-item\">" + line + "</li>";
  }
  return (
    "<li class=\"raffle-participants-item\"><button type=\"button\" class=\"raffle-participants__profile-btn\" data-user-id=\"" +
    pokerRafflesEscapeHtml(uid) +
    "\" data-user-name=\"" +
    pokerRafflesEscapeHtml(p.name || "") +
    "\">" +
    line +
    "</button></li>"
  );
}

function pokerRafflesDisplayPrizeText(s) {
  if (s == null || typeof s !== "string") return s;
  var ph = "\x01BECKING_PH\x02";
  return s.replace(/беккинг-билет/gi, ph).replace(/Билет/g, "Беккинг-билет").replace(/билет/g, "беккинг-билет").split(ph).join("беккинг-билет");
}

function pokerRafflesParsePrizeValue(prizeStr) {
  if (prizeStr == null || prizeStr === "") return 0;
  var m = String(prizeStr).trim().match(/\d+(?:[.,]\d+)?/);
  return m ? parseFloat(m[0].replace(",", ".")) : 0;
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
      " (цена билета) " +
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

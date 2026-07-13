// Rating core helpers: shared top calculations and player normalization.

// Топы по призовым за набор дат (прошлая/текущая неделя)
/** Версия газеты для /api/deploy-hook + рассылки (номер последней опубликованной новости). */
var GAZETTE_VERSION = "20";
var GAZETTE_DATES = ["15.02.2026", "16.02.2026", "17.02.2026", "18.02.2026", "19.02.2026", "20.02.2026", "21.02.2026", "22.02.2026"];
var CURRENT_WEEK_DATES = ["23.02.2026", "24.02.2026", "25.02.2026", "26.02.2026", "27.02.2026", "28.02.2026", "29.02.2026"];

function normalizeWinterNick(n) {
  n = n != null ? String(n).trim() : "";
  if (!n) return n;
  var lower = n.toLowerCase();
  if (lower === "pryanik2la") return "Пряник";
  if (lower === "фокс") return "Фокс";
  if (/^wa{3,5}r+$/.test(lower)) return "Waaar";
  if (lower === "andrushamorf" || lower === "4ezzi") return "FrankL";
  if (lower === "em13" || lower === "em13!!" || lower === "emil13" || lower === "еm13" || lower === "еm13!!") return "Em13!!";
  if (/^хер вам\)+$/.test(lower)) return "хер вам)))))";
  return n;
}
function normalizeWinterNickForFinalTable(n) {
  return normalizeWinterNick(n);
}
function winterRatingSamePlayer(nickA, nickB) {
  var a = normalizeWinterNick(nickA);
  var b = normalizeWinterNick(nickB);
  if (!a || !b) return a === b;
  return a === b;
}
function getTopByDates(dates) {
  if (!dates || !dates.length) return [];
  var byNick = {};
  dates.forEach(function (dateStr) {
    var list = getRatingByDate()[dateStr];
    if (!list || !list.length) return;
    list.forEach(function (r) {
      var nick = normalizeWinterNick(r.nick);
      var reward = r.reward != null ? Number(r.reward) : 0;
      if (!byNick[nick]) byNick[nick] = 0;
      byNick[nick] += reward;
    });
  });
  return Object.keys(byNick)
    .map(function (nick) { return { nick: nick, totalReward: byNick[nick] }; })
    .filter(function (r) { return r.totalReward > 0; })
    .sort(function (a, b) { return b.totalReward - a.totalReward; })
    .slice(0, 15);
}

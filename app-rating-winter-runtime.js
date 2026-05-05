// Winter rating runtime: winter-only season counters and data adapters.

var WINTER_RATING_START = new Date(2025, 11, 1);  // 01.12.2025
var WINTER_RATING_END = new Date(2026, 1, 28);    // последний день февраля 2026

function getWinterRatingCounters() {
  var startMs = WINTER_RATING_START.getTime();
  var endMs = WINTER_RATING_END.getTime();
  var oneDay = 24 * 3600 * 1000;
  var totalDays = Math.round((endMs - startMs) / oneDay) + 1;
  var today;
  try {
    var moscowDateStr = new Date().toLocaleString("en-CA", { timeZone: "Europe/Moscow" }).slice(0, 10);
    var parts = moscowDateStr.split("-");
    today = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  } catch (e) {
    today = new Date();
  }
  var todayMs = today.getTime();
  var daysPassed, daysLeft;
  if (todayMs < startMs) {
    daysPassed = 0;
    daysLeft = totalDays;
  } else if (todayMs > endMs) {
    daysPassed = totalDays;
    daysLeft = 0;
  } else {
    daysPassed = Math.round((todayMs - startMs) / oneDay) + 1;
    daysLeft = Math.round((endMs - todayMs) / oneDay);
  }
  return { daysPassed: daysPassed, daysLeft: daysLeft, totalDays: totalDays };
}

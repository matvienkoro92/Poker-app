"use strict";
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.join(__dirname, "..");
const context = vm.createContext({});
const totals = { reward: 0, tournaments: 0, high: 0, mid: 0 };
for (const month of ["june", "july", "august"]) {
  const file = `summer-rating-data-${month}.js`;
  vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context, { filename: file });
  const dates = context[`SUMMER_RATING_TOURNAMENTS_${month.toUpperCase()}_BY_DATE`];
  for (const [date, tournaments] of Object.entries(dates)) {
    if (!/^\d{2}\.(06|07|08)\.2026$/.test(date)) continue;
    totals.tournaments += tournaments.length;
    for (const tournament of tournaments) for (const player of tournament.players || []) {
      const reward = Math.max(0, Number(player.reward) || 0);
      totals.reward += reward;
      if (reward >= 100000) totals.high++;
      else if (reward >= 50000) totals.mid++;
    }
  }
}
const number = n => Math.round(n).toLocaleString("ru-RU");
const html = `<section class="home-summer-results" aria-label="Итоги лета 2026">
  <h3>Итоги лета 2026</h3><p>Июнь — август</p>
  <dl>${[["Общие призовые", number(totals.reward) + " ₽"], ["Турниров", number(totals.tournaments)], ["Заносов 100к+", number(totals.high)], ["Заносов 50–100к", number(totals.mid)]].map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join("")}</dl>
  <a href="#" data-view-target="summer-rating">Полный рейтинг лета →</a>
</section>`;
const indexPath = path.join(root, "index.html");
const index = fs.readFileSync(indexPath, "utf8");
const marker = /<!-- home-summer-results:start -->[\s\S]*?<!-- home-summer-results:end -->/;
if (!marker.test(index)) throw new Error("Home summer results markers are missing");
fs.writeFileSync(indexPath, index.replace(marker, `<!-- home-summer-results:start -->\n${html}\n<!-- home-summer-results:end -->`));
console.log("Home summer results:", totals);

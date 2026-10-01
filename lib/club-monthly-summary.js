"use strict";
function displayNick(value) {
  const nick = String(value || "").trim(), lower = nick.toLowerCase();
  if (/^wa+r+$/.test(lower)) return "Ваар";
  if (lower === "pryanik2la") return "Пряник";
  if (lower === "andrushamorf" || lower === "4ezzi") return "FrankL";
  if (["мужначас", "мужчина на час", "муж на час"].includes(lower)) return "Рыбнадзор";
  if (["em13", "em13!!", "emil13", "еm13", "еm13!!"].includes(lower)) return "Em13!!";
  return nick;
}
function buildMonthlySummary(rows, dayHeroes, month) {
  const players = new Map(), tournaments = new Set(), days = new Set(), wins = [];
  let totalMinor = 0, big50 = 0, big100 = 0, firstPlaces = 0, podiums = 0;
  for (const row of rows) {
    if (!String(row.date || "").startsWith(month + "-") || !row.tournamentId) continue;
    const rewardMinor = Math.round(Number(row.reward) * 100);
    if (!(rewardMinor > 0)) continue;
    const nick = displayNick(row.nick), key = nick.toLocaleLowerCase("ru").replace(/\s+/g, "");
    if (!key) continue;
    const player = players.get(key) || { nick, rewardMinor: 0, wins: 0, firstPlaces: 0, heroes: 0 };
    player.rewardMinor += rewardMinor; player.wins++;
    if (row.place === 1) { player.firstPlaces++; firstPlaces++; }
    if (row.place >= 1 && row.place <= 3) podiums++;
    players.set(key, player); tournaments.add(row.tournamentId); days.add(row.dateLabel);
    totalMinor += rewardMinor;
    if (rewardMinor >= 10000000) big100++;
    else if (rewardMinor >= 5000000) big50++;
    wins.push({ nick, reward: rewardMinor / 100, date: row.dateLabel, tournament: row.tournament, place: row.place });
  }
  let heroAwards = 0;
  for (const [date, hero] of Object.entries(dayHeroes || {})) {
    const parts = date.split('.');
    if (parts[2] + '-' + parts[1] !== month) continue;
    heroAwards++;
    const key = displayNick(hero.nick).toLocaleLowerCase('ru').replace(/\s+/g, '');
    if (players.has(key)) players.get(key).heroes++;
  }
  const totals = [...players.values()].sort((a,b)=>b.rewardMinor-a.rewardMinor || a.nick.localeCompare(b.nick,'ru'));
  return { month, totalReward:totalMinor/100, paidFinishes:wins.length, players:players.size, tournaments:tournaments.size, days:days.size, big50, big100, firstPlaces, podiums, heroAwards, millionairePlayers:totals.filter(p=>p.rewardMinor>=100000000).length,
    topWins:wins.sort((a,b)=>b.reward-a.reward || a.date.localeCompare(b.date) || a.nick.localeCompare(b.nick,'ru')).slice(0,10),
    topTotals:totals.slice(0,10).map(({rewardMinor,...player})=>({...player,reward:rewardMinor/100})) };
}
module.exports = { buildMonthlySummary };

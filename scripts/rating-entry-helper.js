#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const DATA_FILE = path.join(ROOT, "winter-rating-data.js");
const ASSETS_DIR = path.join(ROOT, "assets");
const XPOKER_POINTS = { 1: 135, 2: 110, 3: 90, 4: 70, 5: 60, 6: 50, 7: 40, 8: 30 };

function usage(exitCode) {
  const out = exitCode ? console.error : console.log;
  out(`Usage:
  node scripts/rating-entry-helper.js snippet < input.txt
  node scripts/rating-entry-helper.js validate [--strict]

Input format for snippet:
  date: 15.04.2026
  league: 1
  time: 18:00
  name: Monday 250k
  buyin: 5000
  multiplier: 100
  screens: rating-15-04-2026-league1-monday-250k-18h.png
  players:
  1 | Nick One | 12000
  2 | Nick Two | 7000
  9 | Nick Without Prize | 0

You may repeat time/name/buyin/screens/players blocks for several tournaments.`);
  process.exit(exitCode);
}

function readStdin() {
  try {
    return fs.readFileSync(0, "utf8");
  } catch (err) {
    return "";
  }
}

function parseNumber(raw, field, warnings, lineNo) {
  const s = String(raw == null ? "" : raw)
    .replace(/\s+/g, "")
    .replace(/₽|руб\.?|р\./gi, "")
    .replace(",", ".");
  if (!s) return 0;
  const n = Number(s);
  if (!Number.isFinite(n)) {
    warnings.push(`line ${lineNo}: ${field} is not a number: "${raw}"`);
    return 0;
  }
  return n;
}

function parsePlayerLine(line, warnings, lineNo) {
  const trimmed = line.trim();
  if (!trimmed) return null;
  let parts = trimmed.split("|").map((p) => p.trim());
  if (parts.length < 3) {
    const m = trimmed.match(/^(\d+|0)\s+(.+?)\s+(-?[\d\s.,]+(?:₽|руб\.?|р\.)?)$/i);
    if (!m) {
      warnings.push(`line ${lineNo}: cannot parse player row: "${line}"`);
      return null;
    }
    parts = [m[1], m[2], m[3]];
  }
  const place = parseNumber(parts[0], "place", warnings, lineNo);
  const reward = parseNumber(parts[2], "reward", warnings, lineNo);
  const nick = parts[1] || "";
  if (!nick) warnings.push(`line ${lineNo}: empty nick`);
  if (!Number.isInteger(place) || place < 0) warnings.push(`line ${lineNo}: suspicious place "${parts[0]}"`);
  if (reward < 0) warnings.push(`line ${lineNo}: negative reward "${parts[2]}"`);
  return { nick, place, reward };
}

function pointsForPlayer(player) {
  if (!player || player.reward <= 0) return 0;
  return XPOKER_POINTS[player.place] || 0;
}

function newTournament(date, defaults) {
  return {
    date,
    time: "",
    name: "",
    buyin: defaults.league === 2 ? 200 : 500,
    league: defaults.league || 1,
    multiplier: defaults.multiplier || 1,
    screens: [],
    players: []
  };
}

function parseSnippetInput(text) {
  const warnings = [];
  const defaults = { league: 1 };
  let date = "";
  let current = null;
  let inPlayers = false;
  const tournaments = [];

  function ensureTournament(lineNo) {
    if (!date) warnings.push(`line ${lineNo}: date is not set yet`);
    if (!current) current = newTournament(date, defaults);
    return current;
  }

  function flush() {
    if (!current) return;
    if (current.time || current.name || current.players.length || current.screens.length) {
      tournaments.push(current);
    }
    current = null;
    inPlayers = false;
  }

  text.split(/\r?\n/).forEach((rawLine, idx) => {
    const lineNo = idx + 1;
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      if (!line) inPlayers = false;
      return;
    }
    const kv = line.match(/^([a-zа-яё_-]+)\s*[:=]\s*(.*)$/i);
    if (kv) {
      const key = kv[1].toLowerCase();
      const value = kv[2].trim();
      if (key === "date" || key === "дата") {
        flush();
        date = value;
        if (!/^\d{2}\.\d{2}\.\d{4}$/.test(date)) warnings.push(`line ${lineNo}: date should be DD.MM.YYYY`);
        return;
      }
      if (key === "league" || key === "лига") {
        const league = parseNumber(value, "league", warnings, lineNo);
        defaults.league = league;
        if (current && !current.players.length) current.league = league;
        if (league !== 1 && league !== 2) warnings.push(`line ${lineNo}: league should be 1 or 2`);
        return;
      }
      if (key === "multiplier" || key === "множитель") {
        const multiplier = parseNumber(value, "multiplier", warnings, lineNo);
        defaults.multiplier = multiplier || 1;
        if (current && !current.players.length) current.multiplier = defaults.multiplier;
        if (![1, 100].includes(defaults.multiplier)) warnings.push(`line ${lineNo}: unusual multiplier "${value}"`);
        return;
      }
      if (key === "blue" || key === "синий" || key === "синяя") {
        const isBlue = /^(1|yes|true|да|y)$/i.test(value);
        defaults.multiplier = isBlue ? 100 : 1;
        if (current && !current.players.length) current.multiplier = defaults.multiplier;
        return;
      }
      if (key === "time" || key === "время") {
        if (current && (current.time || current.name || current.players.length || current.screens.length)) flush();
        current = newTournament(date, defaults);
        current.time = value;
        if (!/^\d{1,2}:\d{2}$/.test(value)) warnings.push(`line ${lineNo}: suspicious time "${value}"`);
        return;
      }
      const t = ensureTournament(lineNo);
      if (key === "name" || key === "турнир") t.name = value;
      else if (key === "buyin" || key === "байин") t.buyin = parseNumber(value, "buyin", warnings, lineNo);
      else if (key === "screens" || key === "screen" || key === "скрины" || key === "скрин") {
        t.screens = value.split(",").map((s) => s.trim()).filter(Boolean);
      } else if (key === "players" || key === "игроки") {
        inPlayers = true;
      } else {
        warnings.push(`line ${lineNo}: unknown field "${key}"`);
      }
      return;
    }
    if (inPlayers || /^\d+\s*[| ]/.test(line)) {
      const t = ensureTournament(lineNo);
      const player = parsePlayerLine(line, warnings, lineNo);
      if (player) t.players.push(player);
      return;
    }
    warnings.push(`line ${lineNo}: ignored line: "${line}"`);
  });
  flush();

  tournaments.forEach((t, i) => {
    if (!t.date) t.date = date;
    if (!t.time) warnings.push(`tournament ${i + 1}: missing time`);
    if (!t.name) warnings.push(`tournament ${i + 1}: missing name`);
    if (!Number.isFinite(t.buyin) || t.buyin < 0) warnings.push(`tournament ${i + 1}: suspicious buyin`);
    if (t.league !== 1 && t.league !== 2) warnings.push(`tournament ${i + 1}: league should be 1 or 2`);
    if (!Number.isFinite(t.multiplier) || t.multiplier <= 0) warnings.push(`tournament ${i + 1}: bad multiplier`);
    if (!t.players.length) warnings.push(`tournament ${i + 1}: no players`);
    t.screens.forEach((file) => {
      if (!fs.existsSync(path.join(ASSETS_DIR, file))) warnings.push(`missing asset: assets/${file}`);
    });
  });

  return { date, tournaments, warnings };
}

function q(s) {
  return JSON.stringify(String(s == null ? "" : s));
}

function tournamentToJs(t) {
  const players = t.players
    .map((p) => {
      const reward = p.reward * (t.multiplier || 1);
      const pts = pointsForPlayer(p);
      const pointsComment = pts ? ` /* ${pts} pts */` : "";
      const multiplierComment = t.multiplier && t.multiplier !== 1 && p.reward ? ` /* ${p.reward} x ${t.multiplier} */` : "";
      return `      { nick: ${q(p.nick)}, place: ${p.place}, reward: ${reward} }${pointsComment}${multiplierComment}`;
    })
    .join(",\n");
  return `    { time: ${q(t.time)}, name: ${q(t.name)}, buyin: ${t.buyin}, league: ${t.league}, players: [\n${players}\n    ] }`;
}

function printSnippet() {
  const { date, tournaments, warnings } = parseSnippetInput(readStdin());
  if (!date || !tournaments.length) {
    console.error("No tournaments parsed.\n");
    usage(1);
  }
  const byDate = {};
  tournaments.forEach((t) => {
    if (!byDate[t.date]) byDate[t.date] = [];
    byDate[t.date].push(t);
  });
  Object.keys(byDate).forEach((d) => {
    console.log(`  ${q(d)}: [`);
    console.log(byDate[d].map(tournamentToJs).join(",\n"));
    console.log("  ],");
  });
  const screensByLeague = { 1: [], 2: [] };
  tournaments.forEach((t) => {
    if (t.screens.length) screensByLeague[t.league].push(...t.screens);
  });
  [1, 2].forEach((league) => {
    if (screensByLeague[league].length) {
      console.log(`\nSPRING_RATING_IMAGES_LEAGUE${league}[${q(date)}] = ${JSON.stringify(screensByLeague[league])};`);
    }
  });
  const totals = tournaments.reduce((acc, t) => {
    t.players.forEach((p) => {
      acc.reward += p.reward * (t.multiplier || 1);
      acc.points += pointsForPlayer(p);
    });
    return acc;
  }, { points: 0, reward: 0 });
  console.log(`\n// Parsed: ${tournaments.length} tournaments, ${totals.points} points, ${totals.reward} reward.`);
  if (warnings.length) {
    console.error("\nWarnings:");
    warnings.forEach((w) => console.error(`- ${w}`));
    process.exitCode = 2;
  }
}

function loadData() {
  const code = fs.readFileSync(DATA_FILE, "utf8");
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: DATA_FILE });
  return sandbox;
}

function validateData() {
  const strict = process.argv.includes("--strict");
  const data = loadData();
  const warnings = [];
  const spring = data.SPRING_RATING_TOURNAMENTS_BY_DATE || {};
  const images = [
    ["SPRING_RATING_IMAGES_LEAGUE1", data.SPRING_RATING_IMAGES_LEAGUE1 || {}],
    ["SPRING_RATING_IMAGES_LEAGUE2", data.SPRING_RATING_IMAGES_LEAGUE2 || {}],
    ["WINTER_RATING_IMAGES", data.WINTER_RATING_IMAGES || {}]
  ];

  images.forEach(([name, map]) => {
    Object.keys(map).forEach((date) => {
      const seen = new Set();
      (map[date] || []).forEach((file) => {
        if (seen.has(file)) warnings.push(`${name} ${date}: duplicate image ${file}`);
        seen.add(file);
        if (!fs.existsSync(path.join(ASSETS_DIR, file))) warnings.push(`${name} ${date}: missing assets/${file}`);
      });
    });
  });

  Object.keys(spring).forEach((date) => {
    const list = spring[date];
    if (!Array.isArray(list)) {
      warnings.push(`${date}: tournaments value is not an array`);
      return;
    }
    list.forEach((t, ti) => {
      const leagueMissing = t.league == null;
      const leagueBad = !leagueMissing && t.league !== 1 && t.league !== 2;
      if (leagueBad) warnings.push(`${date} #${ti + 1}: league should be 1 or 2`);
      if (leagueMissing && strict && !Number.isFinite(Number(t.buyin))) {
        warnings.push(`${date} #${ti + 1}: missing league and buyin, cannot infer league`);
      }
      if (!Array.isArray(t.players) || !t.players.length) warnings.push(`${date} #${ti + 1}: no players`);
      (t.players || []).forEach((p, pi) => {
        const where = `${date} #${ti + 1} player ${pi + 1}`;
        if (!p.nick) warnings.push(`${where}: empty nick`);
        if (!Number.isFinite(Number(p.place)) || Number(p.place) < 0) warnings.push(`${where}: bad place`);
        if (!Number.isFinite(Number(p.reward)) || Number(p.reward) < 0) warnings.push(`${where}: bad reward`);
        if (strict && p.points != null) {
          const expected = pointsForPlayer({ place: Number(p.place), reward: Number(p.reward) });
          const actual = Number(p.points);
          if (Number.isFinite(actual) && actual !== expected) {
            warnings.push(`${where}: explicit points ${actual}, formula gives ${expected}`);
          }
        }
      });
    });
  });

  if (!warnings.length) {
    console.log("OK: rating data and referenced assets passed validation.");
    return;
  }
  console.error(`Found ${warnings.length} warning(s):`);
  warnings.forEach((w) => console.error(`- ${w}`));
  process.exit(2);
}

const cmd = process.argv[2];
if (cmd === "snippet") printSnippet();
else if (cmd === "validate") validateData();
else usage(cmd ? 1 : 0);

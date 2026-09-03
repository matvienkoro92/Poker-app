#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { spawnSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const DATA_FILES = [
  "summer-rating-images-league1.js",
  "summer-rating-images-league2.js",
  "summer-rating-meta.js",
  "summer-rating-data-june.js",
  "summer-rating-data-july.js",
  "summer-rating-data-august.js",
  "summer-rating-data-september.js",
  "summer-rating-data.js",
  "spring-rating-images-league1.js",
  "spring-rating-images-league2.js",
  "spring-rating-meta.js",
  "spring-rating-data-march.js",
  "spring-rating-data-april.js",
  "spring-rating-data-may.js",
  "spring-rating-data.js",
  "winter-rating-data.js",
].map((file) => path.join(ROOT, file));
const ASSETS_DIR = path.join(ROOT, "assets");
const XPOKER_POINTS = { 1: 135, 2: 110, 3: 90, 4: 70, 5: 60, 6: 50, 7: 40, 8: 30 };
const MONTH_FILES = {
  "03": { file: "spring-rating-data-march.js", varName: "SPRING_RATING_TOURNAMENTS_MARCH_BY_DATE" },
  "04": { file: "spring-rating-data-april.js", varName: "SPRING_RATING_TOURNAMENTS_APRIL_BY_DATE" },
  "05": { file: "spring-rating-data-may.js", varName: "SPRING_RATING_TOURNAMENTS_MAY_BY_DATE", season: "spring" },
  "06": { file: "summer-rating-data-june.js", varName: "SUMMER_RATING_TOURNAMENTS_JUNE_BY_DATE", season: "summer" },
  "07": { file: "summer-rating-data-july.js", varName: "SUMMER_RATING_TOURNAMENTS_JULY_BY_DATE", season: "summer" },
  "08": { file: "summer-rating-data-august.js", varName: "SUMMER_RATING_TOURNAMENTS_AUGUST_BY_DATE", season: "summer" },
  "09": { file: "summer-rating-data-september.js", varName: "SUMMER_RATING_TOURNAMENTS_SEPTEMBER_BY_DATE", season: "summer" }
};
MONTH_FILES["03"].season = "spring";
MONTH_FILES["04"].season = "spring";

function usage(exitCode) {
  const out = exitCode ? console.error : console.log;
  out(`Usage:
  node scripts/rating-entry-helper.js snippet < input.txt
  node scripts/rating-entry-helper.js import [--season=summer] < input.txt
  node scripts/rating-entry-helper.js validate [--strict]

Input format for snippet:
  date: 15.04.2026
  league: 1
  time: 18:00
  name: Monday 250k
  buyin: 5000
  multiplier: 100
  screens: rating-15-04-2026-league1-monday-250k-18h.png
  source: /Users/me/Downloads/IMG_0001.PNG
  slug: rating-15-04-2026-league1-monday-250k-18h
  players:
  1 | Nick One | 12000
  2 | Nick Two | 7000
  9 | Nick Without Prize | 0

You may repeat time/name/buyin/screens/source/players blocks for several tournaments.

Import command options:
  --dry-run          Print planned changes without writing files
  --no-build         Do not run npm run build after import
  --no-check         Do not run validation and syntax checks after import
  --force           Recompress and overwrite existing generated screenshots
  --append          Append duplicate date/time/name/league entries instead of replacing
  --season=summer    Force spring or summer destination (normally inferred by month)
  --target-kb=30    Target compressed screenshot size (default: 30 KB)`);
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
  if (reward < 0) {
    warnings.push(`line ${lineNo}: negative reward skipped "${parts[2]}"`);
    return null;
  }
  const playerId = parts[3] ? String(parts[3]).replace(/\D+/g, "") : "";
  return { nick, place, reward, playerId };
}

function pointsForPlayer(player) {
  if (!player || player.reward <= 0) return 0;
  return XPOKER_POINTS[player.place] || 0;
}

function newTournament(date, defaults) {
  const tournament = {
    date,
    time: "",
    name: "",
    buyin: defaults.league === 2 ? 200 : 500,
    league: defaults.league || 1,
    multiplier: defaults.multiplier || 1,
    screens: [],
    sources: [],
    slug: "",
    players: []
  };
  // A multiplier describes exactly one screenshot/tournament block. Do not let
  // `blue: yes` leak into the following red screenshots.
  defaults.multiplier = 1;
  return tournament;
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
    if (current.time || current.name || current.players.length || current.screens.length || current.sources.length) {
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
        const normalizedMultiplier = multiplier === 1000 ? 100 : (multiplier || 1);
        if (current && !current.players.length) current.multiplier = normalizedMultiplier;
        else defaults.multiplier = normalizedMultiplier;
        if (multiplier === 1000) warnings.push(`line ${lineNo}: multiplier 1000 normalized to 100`);
        if (![1, 100].includes(normalizedMultiplier)) warnings.push(`line ${lineNo}: unusual multiplier "${value}"`);
        return;
      }
      if (key === "blue" || key === "синий" || key === "синяя") {
        const isBlue = /^(1|yes|true|да|y)$/i.test(value);
        const multiplier = isBlue ? 100 : 1;
        if (current && !current.players.length) current.multiplier = multiplier;
        else defaults.multiplier = multiplier;
        return;
      }
      if (key === "time" || key === "время") {
        if (current && (current.time || current.name || current.players.length || current.screens.length)) flush();
        if (!current) current = newTournament(date, defaults);
        current.time = value;
        if (!/^\d{1,2}:\d{2}$/.test(value)) warnings.push(`line ${lineNo}: suspicious time "${value}"`);
        return;
      }
      const t = ensureTournament(lineNo);
      if (key === "name" || key === "турнир") t.name = value;
      else if (key === "buyin" || key === "байин") t.buyin = parseNumber(value, "buyin", warnings, lineNo);
      else if (key === "slug" || key === "alias") t.slug = value;
      else if (key === "source" || key === "sources" || key === "file" || key === "files" || key === "image" || key === "images" || key === "исходник" || key === "файл" || key === "файлы") {
        t.sources = value.split(",").map((s) => s.trim()).filter(Boolean);
      }
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
      if (looksLikeLocalSource(file)) {
        if (!fs.existsSync(expandHome(file))) warnings.push(`missing source: ${file}`);
      } else if (!fs.existsSync(path.join(ASSETS_DIR, file))) warnings.push(`missing asset: assets/${file}`);
    });
    t.sources.forEach((file) => {
      if (!fs.existsSync(expandHome(file))) warnings.push(`missing source: ${file}`);
    });
  });

  return { date, tournaments, warnings };
}

function q(s) {
  return JSON.stringify(String(s == null ? "" : s));
}

function expandHome(filePath) {
  if (!filePath) return filePath;
  if (filePath === "~") return process.env.HOME || filePath;
  if (filePath.startsWith("~/")) return path.join(process.env.HOME || "", filePath.slice(2));
  return filePath;
}

function looksLikeLocalSource(file) {
  const s = String(file || "");
  return path.isAbsolute(s) || s.startsWith("~/") || s.startsWith("../") || s.startsWith("./");
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

function parseArgs(argv) {
  const opts = {
    dryRun: false,
    force: false,
    append: false,
    build: true,
    check: true,
    // Full-size rating screenshots are opened in the lightbox. Keep enough
    // resolution for small nicknames and prize amounts to remain readable;
    // the separate 150px AVIF files are used for lightweight grid previews.
    targetKb: 180,
    width: 1080,
    season: ""
  };
  argv.forEach((arg) => {
    if (arg === "--dry-run") opts.dryRun = true;
    else if (arg === "--force") opts.force = true;
    else if (arg === "--append") opts.append = true;
    else if (arg === "--no-build") opts.build = false;
    else if (arg === "--no-check") opts.check = false;
    else if (arg.startsWith("--season=")) {
      const season = arg.slice("--season=".length).toLowerCase();
      if (season === "spring" || season === "summer") opts.season = season;
    }
    else if (arg.startsWith("--target-kb=")) {
      const n = Number(arg.slice("--target-kb=".length));
      if (Number.isFinite(n) && n > 0) opts.targetKb = n;
    } else if (arg.startsWith("--width=")) {
      const n = Number(arg.slice("--width=".length));
      if (Number.isFinite(n) && n > 0) opts.width = Math.round(n);
    }
  });
  return opts;
}

function dateToStamp(dateStr) {
  const parts = String(dateStr || "").split(".").map(Number);
  if (parts.length !== 3) return 0;
  return parts[2] * 10000 + parts[1] * 100 + parts[0];
}

function dateParts(dateStr) {
  const parts = String(dateStr || "").split(".");
  return {
    day: parts[0] || "",
    month: parts[1] || "",
    year: parts[2] || ""
  };
}

function monthNameRu(month) {
  return {
    "03": "марта",
    "04": "апреля",
    "05": "мая",
    "06": "июня",
    "07": "июля",
    "08": "августа",
    "09": "сентября"
  }[String(month).padStart(2, "0")] || "";
}

function slugify(input) {
  const map = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z", и: "i", й: "j",
    к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f",
    х: "h", ц: "c", ч: "ch", ш: "sh", щ: "shch", ы: "y", э: "e", ю: "yu", я: "ya", ъ: "", ь: ""
  };
  return String(input || "")
    .trim()
    .toLowerCase()
    .replace(/[а-яё]/g, (ch) => map[ch] || "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function defaultScreenBasename(t, index) {
  const p = dateParts(t.date);
  const name = slugify(t.slug || t.name) || "tournament";
  const timeMatch = String(t.time || "00:00").match(/^(\d{1,2}):(\d{2})$/);
  const time = timeMatch
    ? `${timeMatch[1].padStart(2, "0")}${timeMatch[2] === "00" ? "" : timeMatch[2]}h`
    : String(t.time || "00:00").replace(/[^0-9]+/g, "") + "h";
  const suffix = index > 0 ? `-${index + 1}` : "";
  return `rating-${p.day}-${p.month}-${p.year}-league${t.league}-${name}-${time}${suffix}`;
}

function normalizeScreenRelPath(raw) {
  let s = String(raw || "").trim();
  if (!s) return "";
  s = s.replace(/^assets\//, "");
  if (s.startsWith("rating-compressed-preview/")) return s;
  if (s.startsWith("rating-")) return s;
  return s;
}

function formatNumber(n) {
  const num = Number(n);
  if (!Number.isFinite(num)) return "0";
  return Number.isInteger(num) ? String(num) : String(num);
}

function formatPlayerObject(p, indent) {
  const spaces = " ".repeat(indent);
  const inner = " ".repeat(indent + 2);
  return [
    `${spaces}{`,
    `${inner}"nick": ${q(p.nick)},`,
    `${inner}"place": ${formatNumber(p.place)},`,
    `${inner}"reward": ${formatNumber(p.reward)},`,
    `${inner}"points": ${formatNumber(p.points)}`,
    `${spaces}}`
  ].join("\n");
}

function toStoredTournament(t) {
  return {
    time: String(t.time || ""),
    name: String(t.name || ""),
    buyin: Number(t.buyin) || 0,
    league: Number(t.league) || 1,
    players: (t.players || []).map((p) => {
      const reward = Number(p.reward) * (Number(t.multiplier) || 1);
      return {
        nick: String(p.nick || ""),
        place: Number(p.place) || 0,
        reward,
        points: pointsForPlayer({ place: Number(p.place) || 0, reward })
      };
    })
  };
}

function formatTournamentObject(t, indent) {
  const spaces = " ".repeat(indent);
  const inner = " ".repeat(indent + 2);
  const players = (t.players || []).map((p) => formatPlayerObject(p, indent + 4)).join(",\n");
  return [
    `${spaces}{`,
    `${inner}"time": ${q(t.time)},`,
    `${inner}"name": ${q(t.name)},`,
    `${inner}"buyin": ${formatNumber(t.buyin)},`,
    `${inner}"league": ${formatNumber(t.league)},`,
    `${inner}"players": [`,
    players,
    `${inner}]`,
    `${spaces}}`
  ].join("\n");
}

function formatDateBlock(dateStr, tournaments) {
  const list = tournaments.map((t) => formatTournamentObject(t, 4)).join(",\n");
  return `  ${q(dateStr)}: [\n${list}\n  ]`;
}

function formatImageDateBlock(dateStr, files) {
  const body = files.map((file) => `    ${q(file)}`).join(",\n");
  return `  ${q(dateStr)}: [\n${body}\n  ]`;
}

function findMatchingBracket(text, openIndex) {
  const open = text[openIndex];
  const close = open === "[" ? "]" : "}";
  let depth = 0;
  let inString = false;
  let escape = false;
  for (let i = openIndex; i < text.length; i++) {
    const ch = text[i];
    if (inString) {
      if (escape) escape = false;
      else if (ch === "\\") escape = true;
      else if (ch === "\"") inString = false;
      continue;
    }
    if (ch === "\"") {
      inString = true;
      continue;
    }
    if (ch === open) depth++;
    else if (ch === close) {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function findDatePropertyRange(text, dateStr) {
  const propRe = new RegExp(`${q(dateStr).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*:\\s*\\[`);
  const match = propRe.exec(text);
  if (!match) return null;
  const propStart = match.index;
  const lineStart = text.lastIndexOf("\n", propStart) + 1;
  const openIndex = text.indexOf("[", propStart);
  const closeIndex = findMatchingBracket(text, openIndex);
  if (closeIndex < 0) throw new Error(`Cannot find closing array bracket for ${dateStr}`);
  let end = closeIndex + 1;
  let cursor = end;
  while (cursor < text.length && /\s/.test(text[cursor])) cursor++;
  const hasComma = text[cursor] === ",";
  if (hasComma) end = cursor + 1;
  while (end < text.length && text[end] === "\n") end++;
  return { start: lineStart, end, hasComma };
}

function upsertDateBlock(text, dateStr, block, existingDates) {
  const existing = findDatePropertyRange(text, dateStr);
  if (existing) {
    return text.slice(0, existing.start) + block + (existing.hasComma ? "," : "") + "\n" + text.slice(existing.end);
  }
  const sorted = existingDates.slice().sort((a, b) => dateToStamp(a) - dateToStamp(b));
  const nextDate = sorted.find((d) => dateToStamp(d) > dateToStamp(dateStr));
  if (nextDate) {
    const next = findDatePropertyRange(text, nextDate);
    if (!next) throw new Error(`Cannot locate insertion point before ${nextDate}`);
    return text.slice(0, next.start) + block + ",\n" + text.slice(next.start);
  }
  const objectEnd = text.lastIndexOf("};");
  if (objectEnd < 0) throw new Error("Cannot locate object end");
  const prefix = sorted.length ? ",\n" : "\n";
  return text.slice(0, objectEnd) + prefix + block + "\n" + text.slice(objectEnd);
}

function sameTournament(a, b) {
  return String(a.time || "") === String(b.time || "") &&
    String(a.name || "") === String(b.name || "") &&
    Number(a.league) === Number(b.league);
}

function mergeTournamentLists(oldList, newList, append) {
  const result = Array.isArray(oldList) ? oldList.slice() : [];
  newList.forEach((next) => {
    const idx = result.findIndex((old) => sameTournament(old, next));
    if (!append && idx >= 0) result[idx] = next;
    else result.push(next);
  });
  return result;
}

function loadObjectVar(filePath, varName) {
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(filePath, "utf8"), sandbox, { filename: filePath });
  return sandbox[varName] || {};
}

function writeMonthData(dateStr, tournaments, opts) {
  const p = dateParts(dateStr);
  const cfg = MONTH_FILES[p.month];
  if (!cfg) throw new Error(`Unsupported rating month for ${dateStr}`);
  if (opts.season && cfg.season !== opts.season) {
    throw new Error(`${dateStr} belongs to ${cfg.season}, not ${opts.season}`);
  }
  const filePath = path.join(ROOT, cfg.file);
  const current = loadObjectVar(filePath, cfg.varName);
  const merged = mergeTournamentLists(current[dateStr], tournaments, opts.append);
  const text = fs.readFileSync(filePath, "utf8");
  const next = upsertDateBlock(text, dateStr, formatDateBlock(dateStr, merged), Object.keys(current));
  if (!opts.dryRun) fs.writeFileSync(filePath, next);
  return { file: cfg.file, count: tournaments.length, total: merged.length };
}

function writeImageMap(league, dateStr, files, opts, season) {
  if (!files.length) return null;
  const prefix = season === "summer" ? "summer" : "spring";
  const varPrefix = prefix.toUpperCase();
  const fileName = `${prefix}-rating-images-league${league}.js`;
  const varName = `${varPrefix}_RATING_IMAGES_LEAGUE${league}`;
  const filePath = path.join(ROOT, fileName);
  const current = loadObjectVar(filePath, varName);
  const existing = Array.isArray(current[dateStr]) ? current[dateStr].slice() : [];
  const merged = existing.slice();
  files.forEach((file) => {
    if (!merged.includes(file)) merged.push(file);
  });
  const text = fs.readFileSync(filePath, "utf8");
  const next = upsertDateBlock(text, dateStr, formatImageDateBlock(dateStr, merged), Object.keys(current));
  if (!opts.dryRun) fs.writeFileSync(filePath, next);
  return { file: fileName, count: files.length, total: merged.length };
}

function updateSpringMeta(latestDate, opts) {
  const p = dateParts(latestDate);
  const month = monthNameRu(p.month);
  if (!month) return null;
  const filePath = path.join(ROOT, "spring-rating-meta.js");
  const text = fs.readFileSync(filePath, "utf8");
  const value = `${Number(p.day)} ${month}`;
  const next = text.replace(/var SPRING_RATING_UPDATED = "[^"]*";/, `var SPRING_RATING_UPDATED = ${q(value)};`);
  if (!opts.dryRun) fs.writeFileSync(filePath, next);
  return value;
}

function replaceExact(fileName, pattern, replacement, opts) {
  const filePath = path.join(ROOT, fileName);
  const text = fs.readFileSync(filePath, "utf8");
  if (!pattern.test(text)) throw new Error(`Cannot update date label in ${fileName}`);
  const next = text.replace(pattern, replacement);
  if (!opts.dryRun) fs.writeFileSync(filePath, next);
}

function updateSummerMeta(latestDate, opts) {
  const p = dateParts(latestDate);
  if (p.month === "09") return null;
  const month = monthNameRu(p.month);
  if (!month) return null;
  const shortValue = `${Number(p.day)} ${month}`;
  const value = `обновлено ${shortValue}`;
  replaceExact(
    "summer-rating-meta.js",
    /var SUMMER_RATING_UPDATED = "[^"]*";/,
    `var SUMMER_RATING_UPDATED = ${q(value)};`,
    opts
  );
  replaceExact(
    "app-rating-summer-season.js",
    /updatedLabel:\s*"обновлено [^"]*"/,
    `updatedLabel: ${q(value)}`,
    opts
  );
  replaceExact(
    "app-rating-view-adapter.js",
    /tabsUpdatedEl\.textContent = "обновлено [^"]*";/,
    `tabsUpdatedEl.textContent = ${q(value)};`,
    opts
  );
  return value;
}

function updateMaySeasonDates(mayDates, opts) {
  const tailDates = mayDates
    .filter((date) => Number(dateParts(date).day) >= 10)
    .sort((a, b) => dateToStamp(a) - dateToStamp(b));
  if (!tailDates.length) return null;
  const lastDay = Number(dateParts(tailDates[tailDates.length - 1]).day);
  const varName = `SPRING_HOME_MAY_DAYS_10_${lastDay}`;
  const filePath = path.join(ROOT, "app-rating-spring-season.js");
  let text = fs.readFileSync(filePath, "utf8");
  const old = text.match(/var (SPRING_HOME_MAY_DAYS_10_\d+) = \[[^\]]*\];/);
  if (!old) return null;
  const oldName = old[1];
  text = text.replace(new RegExp(oldName, "g"), varName);
  text = text.replace(/var SPRING_HOME_MAY_DAYS_10_\d+ = \[[^\]]*\];/, `var ${varName} = ${JSON.stringify(tailDates)};`);
  text = text.replace(/\{ label: "10—\d+ мая", dates: SPRING_HOME_MAY_DAYS_10_\d+ \}/, `{ label: "10—${lastDay} мая", dates: ${varName} }`);
  if (!opts.dryRun) fs.writeFileSync(filePath, text);
  return { varName, label: `10—${lastDay} мая`, count: tailDates.length };
}

async function compressOneSource(srcRaw, relTarget, opts) {
  const src = expandHome(srcRaw);
  const dst = path.join(ASSETS_DIR, relTarget);
  if (!opts.force && fs.existsSync(dst)) {
    return { file: relTarget, skipped: true, size: fs.statSync(dst).size };
  }
  if (opts.dryRun) return { file: relTarget, skipped: false, size: 0 };
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  let sharp;
  try {
    sharp = require("sharp");
  } catch (err) {
    throw new Error("sharp is required for screenshot compression. Run npm install first.");
  }
  const targetBytes = Math.max(1, opts.targetKb) * 1024;
  let best = null;
  const widths = [opts.width, opts.width - 40, opts.width - 80, opts.width - 120, opts.width - 160].filter((w) => w >= 360);
  for (const width of widths) {
    for (let quality = 58; quality >= 28; quality -= 4) {
      const buffer = await sharp(src)
        .resize({ width, withoutEnlargement: true })
        .jpeg({ quality, progressive: true, mozjpeg: true })
        .toBuffer();
      if (!best || buffer.length < best.buffer.length) best = { buffer, width, quality };
      if (buffer.length <= targetBytes) {
        fs.writeFileSync(dst, buffer);
        return { file: relTarget, skipped: false, size: buffer.length, width, quality };
      }
    }
  }
  fs.writeFileSync(dst, best.buffer);
  return { file: relTarget, skipped: false, size: best.buffer.length, width: best.width, quality: best.quality };
}

async function prepareScreens(tournaments, opts) {
  const usedTargets = new Set();
  const byLeagueDate = {};
  const compressed = [];
  for (const t of tournaments) {
    const relScreens = [];
    const sourceScreens = [];
    (t.screens || []).forEach((screen) => {
      if (looksLikeLocalSource(screen)) sourceScreens.push(screen);
      else relScreens.push(normalizeScreenRelPath(screen));
    });
    (t.sources || []).forEach((source) => sourceScreens.push(source));
    for (let i = 0; i < sourceScreens.length; i++) {
      let base = t.slug ? slugify(t.slug.replace(/\.[a-z0-9]+$/i, "")) : defaultScreenBasename(t, i);
      if (!base.startsWith("rating-")) base = defaultScreenBasename({ ...t, slug: base }, i);
      let rel = `rating-compressed-preview/${base}.jpg`;
      let suffix = 2;
      while (usedTargets.has(rel)) {
        rel = `rating-compressed-preview/${base}-${suffix}.jpg`;
        suffix++;
      }
      usedTargets.add(rel);
      const out = await compressOneSource(sourceScreens[i], rel, opts);
      compressed.push({ source: sourceScreens[i], ...out });
      relScreens.push(rel);
    }
    t.finalScreens = relScreens.filter(Boolean);
    if (t.finalScreens.length) {
      const key = `${t.league}|${t.date}`;
      if (!byLeagueDate[key]) byLeagueDate[key] = [];
      t.finalScreens.forEach((file) => {
        if (!byLeagueDate[key].includes(file)) byLeagueDate[key].push(file);
      });
    }
  }
  return { byLeagueDate, compressed };
}

async function detectBlueInterface(source) {
  let sharp;
  try {
    sharp = require("sharp");
  } catch (err) {
    throw new Error("sharp is required for blue screenshot verification. Run npm install first.");
  }
  const { data, info } = await sharp(source, { limitInputPixels: false })
    .resize({ width: 120, withoutEnlargement: true })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  let blue = 0;
  let red = 0;
  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (Math.max(r, g, b) < 24) continue;
    if (b > 42 && b > r * 1.22 && b > g * 1.08) blue++;
    if (r > 42 && r > b * 1.22 && r > g * 1.08) red++;
  }
  const pixels = Math.max(1, data.length / info.channels);
  return blue / pixels >= 0.025 && blue > red * 1.15;
}

async function verifySourceMultipliers(tournaments, detectBlue = detectBlueInterface) {
  const failures = [];
  for (let index = 0; index < tournaments.length; index++) {
    const tournament = tournaments[index];
    const sources = [];
    (tournament.sources || []).forEach((file) => sources.push(expandHome(file)));
    (tournament.screens || []).forEach((file) => {
      sources.push(looksLikeLocalSource(file) ? expandHome(file) : path.join(ASSETS_DIR, file));
    });
    for (const source of sources.filter((file) => file && fs.existsSync(file))) {
      const isBlue = await detectBlue(source);
      if (isBlue && Number(tournament.multiplier) !== 100) {
        failures.push(`tournament ${index + 1} (${tournament.date} ${tournament.time} ${tournament.name}): blue screenshot ${path.basename(source)} requires blue: yes or multiplier: 100`);
      } else if (!isBlue && Number(tournament.multiplier) === 100) {
        failures.push(`tournament ${index + 1} (${tournament.date} ${tournament.time} ${tournament.name}): red screenshot ${path.basename(source)} cannot use multiplier: 100`);
      }
    }
  }
  if (failures.length) throw new Error(`Blue screenshot multiplier verification failed:\n- ${failures.join("\n- ")}`);
}

function runChecked(command, args) {
  const result = spawnSync(command, args, { cwd: ROOT, stdio: "inherit", shell: false });
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed with exit code ${result.status}`);
  }
}

async function importRatingInput() {
  const opts = parseArgs(process.argv.slice(3));
  const { tournaments, warnings } = parseSnippetInput(readStdin());
  if (!tournaments.length) {
    console.error("No tournaments parsed.\n");
    usage(1);
  }
  if (warnings.length) {
    console.error("Warnings:");
    warnings.forEach((w) => console.error(`- ${w}`));
    if (!opts.dryRun) process.exitCode = 2;
  }

  await verifySourceMultipliers(tournaments);

  const prepared = await prepareScreens(tournaments, opts);
  const byDate = {};
  tournaments.forEach((t) => {
    if (!byDate[t.date]) byDate[t.date] = [];
    byDate[t.date].push(toStoredTournament(t));
  });

  const dataResults = [];
  Object.keys(byDate).sort((a, b) => dateToStamp(a) - dateToStamp(b)).forEach((dateStr) => {
    dataResults.push(writeMonthData(dateStr, byDate[dateStr], opts));
  });

  const imageResults = [];
  Object.keys(prepared.byLeagueDate).sort().forEach((key) => {
    const [league, dateStr] = key.split("|");
    const cfg = MONTH_FILES[dateParts(dateStr).month];
    imageResults.push(writeImageMap(Number(league), dateStr, prepared.byLeagueDate[key], opts, cfg.season));
  });

  const seasons = new Set(Object.keys(byDate).map((dateStr) => MONTH_FILES[dateParts(dateStr).month].season));
  if (seasons.size !== 1) throw new Error("One import batch must belong to a single season");
  const activeSeason = Array.from(seasons)[0];
  const loaded = loadData();
  const seasonData = activeSeason === "summer"
    ? loaded.SUMMER_RATING_TOURNAMENTS_BY_DATE || {}
    : loaded.SPRING_RATING_TOURNAMENTS_BY_DATE || {};
  const allSeasonDates = new Set(
    Object.keys(seasonData).filter((dateStr) => {
      const tournamentsForDate = seasonData[dateStr];
      return Array.isArray(tournamentsForDate) && tournamentsForDate.length > 0;
    })
  );
  Object.keys(byDate).forEach((dateStr) => allSeasonDates.add(dateStr));
  const latestDate = Array.from(allSeasonDates).sort((a, b) => dateToStamp(a) - dateToStamp(b)).pop();
  const meta = activeSeason === "summer"
    ? updateSummerMeta(latestDate, opts)
    : updateSpringMeta(latestDate, opts);
  let season = null;
  if (activeSeason === "spring") {
    const mayDataPath = path.join(ROOT, MONTH_FILES["05"].file);
    const mayData = loadObjectVar(mayDataPath, MONTH_FILES["05"].varName);
    const mayDates = Object.keys(mayData).concat(Object.keys(byDate).filter((d) => dateParts(d).month === "05"));
    season = updateMaySeasonDates(Array.from(new Set(mayDates)), opts);
  }

  console.log(opts.dryRun ? "Dry run summary:" : "Import summary:");
  prepared.compressed.forEach((item) => {
    const kb = item.size ? `${Math.round(item.size / 1024)} KB` : "planned";
    console.log(`- screenshot ${item.skipped ? "reused" : "compressed"}: ${item.file} (${kb})`);
  });
  dataResults.forEach((r) => console.log(`- data: ${r.file}, ${r.count} imported, ${r.total} total on date`));
  imageResults.filter(Boolean).forEach((r) => console.log(`- images: ${r.file}, ${r.count} added/reused, ${r.total} total on date`));
  if (season) console.log(`- May calendar: ${season.label} (${season.count} dates)`);
  if (meta) console.log(`- updated label: ${meta}`);
  const summary = tournaments.reduce((acc, t) => {
    acc.tournaments++;
    acc.players += t.players.length;
    acc[`league${t.league}Tournaments`]++;
    t.players.forEach((p) => {
      acc[`league${t.league}Points`] += pointsForPlayer(p);
      acc[`league${t.league}Reward`] += Number(p.reward) * (Number(t.multiplier) || 1);
    });
    return acc;
  }, {
    tournaments: 0,
    players: 0,
    league1Tournaments: 0,
    league2Tournaments: 0,
    league1Points: 0,
    league2Points: 0,
    league1Reward: 0,
    league2Reward: 0
  });
  const rewardLabel = (value) => new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2
  }).format(value);
  console.log(`- verified: ${summary.tournaments} tournaments, ${summary.players} positive results`);
  console.log(`- league 1: ${summary.league1Tournaments} tournaments, ${summary.league1Points} points, ${rewardLabel(summary.league1Reward)} winnings`);
  console.log(`- league 2: ${summary.league2Tournaments} tournaments, ${summary.league2Points} points, ${rewardLabel(summary.league2Reward)} winnings`);

  if (!opts.dryRun && opts.check) {
    runChecked("npm", ["run", "rating:validate"]);
    runChecked("npm", ["run", "check:syntax"]);
  }
  if (!opts.dryRun && opts.build) {
    runChecked("npm", ["run", "build"]);
  }
}

function loadData() {
  const sandbox = {};
  vm.createContext(sandbox);
  DATA_FILES.forEach((file) => {
    if (!fs.existsSync(file)) return;
    const code = fs.readFileSync(file, "utf8");
    vm.runInContext(code, sandbox, { filename: file });
  });
  return sandbox;
}

function validateData() {
  const strict = process.argv.includes("--strict");
  const data = loadData();
  const warnings = [];
  const spring = data.SPRING_RATING_TOURNAMENTS_BY_DATE || {};
  const summer = data.SUMMER_RATING_TOURNAMENTS_BY_DATE || {};
  const images = [
    ["SPRING_RATING_IMAGES_LEAGUE1", data.SPRING_RATING_IMAGES_LEAGUE1 || {}],
    ["SPRING_RATING_IMAGES_LEAGUE2", data.SPRING_RATING_IMAGES_LEAGUE2 || {}],
    ["SUMMER_RATING_IMAGES_LEAGUE1", data.SUMMER_RATING_IMAGES_LEAGUE1 || {}],
    ["SUMMER_RATING_IMAGES_LEAGUE2", data.SUMMER_RATING_IMAGES_LEAGUE2 || {}],
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

  [["spring", spring], ["summer", summer]].forEach(([seasonName, seasonData]) => Object.keys(seasonData).forEach((date) => {
    const list = seasonData[date];
    if (!Array.isArray(list)) {
      warnings.push(`${seasonName} ${date}: tournaments value is not an array`);
      return;
    }
    list.forEach((t, ti) => {
      const leagueMissing = t.league == null;
      const leagueBad = !leagueMissing && t.league !== 1 && t.league !== 2;
      if (leagueBad) warnings.push(`${seasonName} ${date} #${ti + 1}: league should be 1 or 2`);
      if (leagueMissing && strict && !Number.isFinite(Number(t.buyin))) {
        warnings.push(`${seasonName} ${date} #${ti + 1}: missing league and buyin, cannot infer league`);
      }
      if (!Array.isArray(t.players) || !t.players.length) warnings.push(`${seasonName} ${date} #${ti + 1}: no players`);
      (t.players || []).forEach((p, pi) => {
        const where = `${seasonName} ${date} #${ti + 1} player ${pi + 1}`;
        if (!p.nick) warnings.push(`${where}: empty nick`);
        if (!Number.isFinite(Number(p.place)) || Number(p.place) < 0) warnings.push(`${where}: bad place`);
        if (!Number.isFinite(Number(p.reward))) warnings.push(`${where}: bad reward`);
        if (strict && p.points != null) {
          const expected = pointsForPlayer({ place: Number(p.place), reward: Number(p.reward) });
          const actual = Number(p.points);
          if (Number.isFinite(actual) && actual !== expected) {
            warnings.push(`${where}: explicit points ${actual}, formula gives ${expected}`);
          }
        }
      });
    });
  }));

  if (!warnings.length) {
    console.log("OK: rating data and referenced assets passed validation.");
    return;
  }
  console.error(`Found ${warnings.length} warning(s):`);
  warnings.forEach((w) => console.error(`- ${w}`));
  process.exit(2);
}

if (require.main === module) {
  const cmd = process.argv[2];
  if (cmd === "snippet") printSnippet();
  else if (cmd === "import") importRatingInput().catch((err) => {
    console.error(err && err.stack ? err.stack : err);
    process.exit(1);
  });
  else if (cmd === "validate") validateData();
  else usage(cmd ? 1 : 0);
}

module.exports = { detectBlueInterface, parseSnippetInput, verifySourceMultipliers };

#!/usr/bin/env node
"use strict";

const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const OCR_SCRIPT = path.join(__dirname, "rating-vision-ocr.swift");

function usage(exitCode) {
  const out = exitCode ? console.error : console.log;
  out(`Usage:
  npm run rating:ocr -- /path/to/IMG_0001.PNG [/path/to/IMG_0002.PNG ...]

Creates a draft input for npm run rating:import. The OCR draft still needs a quick human check,
especially trophy places that macOS Vision sometimes misses.`);
  process.exit(exitCode);
}

function numberFromText(text) {
  const cleaned = String(text || "")
    .replace(/\s+/g, "")
    .replace(/[OoОо]/g, "0")
    .replace(",", ".")
    .replace(/[^\d.-]/g, "");
  if (!cleaned) return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

function integerFromText(text) {
  const n = numberFromText(text);
  return n == null || !Number.isInteger(n) ? null : n;
}

function isDateTime(text) {
  return String(text || "").match(/(\d{2})\/(\d{2})\s+(\d{1,2}:\d{2})/);
}

function normalizeName(raw) {
  let name = String(raw || "").trim();
  name = name.replace(/\s+/g, " ");
  if (/^OK\b/i.test(name) || /^ОК\b/i.test(name)) return "OK🏦";
  if (/^MOK/i.test(name) || /^МОК/i.test(name)) return "MOK🏦";
  if (/^DV\s+Rebuy$/i.test(name)) return "DV Rebuy";
  if (/^Воскресный турнир$/i.test(name)) return "Воскресный турнир 🏆";
  return name;
}

function inferLeague(name) {
  const n = String(name || "").toLowerCase();
  if (n.includes("ok") || n.includes("mok") || n.includes("ок") || n.includes("мок")) return 2;
  if (n.includes("вторника") || n.includes("среды")) return 2;
  return 1;
}

function looksLikePlayerName(token) {
  const text = token.text.trim();
  if (!text || text.length < 2) return false;
  if (token.x < 0.20 || token.x > 0.52) return false;
  if (/^ID[:\s]/i.test(text)) return false;
  if (/^(MTT|7MAX|MTT-NLH|ITM|Рейтинг|Награда|Игрок|Бай-ин|Комиссия)$/i.test(text)) return false;
  if (/^[\d\s.,:-]+$/.test(text)) return false;
  return true;
}

function isRewardToken(token) {
  if (token.x < 0.66) return false;
  const n = numberFromText(token.text);
  return n != null && Math.abs(n) < 1000000;
}

function isPlaceToken(token) {
  if (token.x < 0.52 || token.x > 0.63) return false;
  const n = integerFromText(token.text);
  return n != null && n >= 0 && n <= 200;
}

function chooseClosest(tokens, predicate, targetY, maxDistance) {
  let best = null;
  let bestDistance = Infinity;
  tokens.forEach((token) => {
    if (!predicate(token)) return;
    const centerY = token.y + token.height / 2;
    const distance = Math.abs(centerY - targetY);
    if (distance < bestDistance && distance <= maxDistance) {
      best = token;
      bestDistance = distance;
    }
  });
  return best;
}

function parseOcrFile(file) {
  const tokens = (file.tokens || []).map((token) => ({
    ...token,
    text: String(token.text || "").trim()
  })).filter((token) => token.text);

  const dateToken = tokens.find((token) => isDateTime(token.text));
  const dateMatch = dateToken ? isDateTime(dateToken.text) : null;
  const date = dateMatch ? `${dateMatch[2]}.${dateMatch[1]}.2026` : "??.??.2026";
  const time = dateMatch ? dateMatch[3].padStart(5, "0") : "??:??";

  const titleTokens = tokens
    .filter((token) => token.y >= 0.690 && token.y <= 0.720 && token.x < 0.56)
    .filter((token) => !/^(MTT|7MAX|MTT-NLH)$/i.test(token.text))
    .sort((a, b) => a.x - b.x);
  const title = normalizeName(titleTokens.map((token) => token.text).join(" ") || "TODO");

  const feeToken = chooseClosest(
    tokens,
    (token) => token.x > 0.17 && token.x < 0.30 && numberFromText(token.text) != null,
    0.648,
    0.035
  );
  const buyin = feeToken ? numberFromText(feeToken.text) : 0;

  const ids = tokens
    .filter((token) => /^ID[:\s]?\d+/i.test(token.text) && token.x > 0.20 && token.x < 0.44 && token.y < 0.53 && token.y > 0.12)
    .sort((a, b) => b.y - a.y);

  const rows = ids.map((idToken, index) => {
    const idCenter = idToken.y + idToken.height / 2;
    const nameToken = chooseClosest(
      tokens,
      looksLikePlayerName,
      idCenter + 0.025,
      0.038
    );
    const placeToken = chooseClosest(tokens, isPlaceToken, idCenter + 0.018, 0.045);
    const rewardToken = chooseClosest(tokens, isRewardToken, idCenter + 0.018, 0.050);
    let place = placeToken ? integerFromText(placeToken.text) : null;
    const reward = rewardToken ? numberFromText(rewardToken.text) : 0;
    let needsPlaceCheck = place == null;

    // Gold trophy often has no OCR text, but when the list starts from first place this is safe.
    const nextKnownPlace = ids.slice(index + 1).map((nextId) => {
      const nextCenter = nextId.y + nextId.height / 2;
      const token = chooseClosest(tokens, isPlaceToken, nextCenter + 0.018, 0.045);
      return token ? integerFromText(token.text) : null;
    }).find((value) => value != null);
    if (place == null && index === 0 && nextKnownPlace === 2) {
      place = 1;
      needsPlaceCheck = false;
    }
    if (place != null && place > 8 && reward > 0 && index <= 2) {
      place = null;
      needsPlaceCheck = true;
    }

    return {
      place,
      nick: nameToken ? nameToken.text : "TODO",
      reward,
      needsPlaceCheck,
      needsNameCheck: !nameToken
    };
  }).filter((row) => row.nick !== "TODO" || row.reward || row.place != null);

  return {
    source: file.source,
    date,
    time,
    name: title,
    league: inferLeague(title),
    buyin,
    rows
  };
}

function formatDraft(tournaments) {
  return tournaments.map((tournament) => {
    const comments = [];
    if (tournament.time.includes("?") || tournament.date.includes("?")) comments.push("# TODO: проверить дату/время");
    if (!tournament.buyin) comments.push("# TODO: проверить buyin");
    const lines = [
      ...comments,
      `date: ${tournament.date}`,
      `league: ${tournament.league}`,
      `time: ${tournament.time}`,
      `name: ${tournament.name}`,
      `buyin: ${tournament.buyin}`,
      `source: ${tournament.source}`,
      "players:"
    ];
    tournament.rows.forEach((row) => {
      const place = row.place == null ? "?" : row.place;
      const suffix = row.needsPlaceCheck ? " # TODO place" : "";
      lines.push(`${place} | ${row.nick} | ${row.reward}${suffix}`);
    });
    return lines.join("\n");
  }).join("\n\n");
}

const imagePaths = process.argv.slice(2);
if (!imagePaths.length || imagePaths.includes("--help") || imagePaths.includes("-h")) usage(imagePaths.length ? 0 : 1);

const result = spawnSync("swift", [OCR_SCRIPT, ...imagePaths], {
  cwd: ROOT,
  env: {
    ...process.env,
    CLANG_MODULE_CACHE_PATH: process.env.CLANG_MODULE_CACHE_PATH || "/private/tmp/clang-module-cache"
  },
  encoding: "utf8",
  maxBuffer: 50 * 1024 * 1024
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}
if (result.status !== 0) {
  process.stderr.write(result.stderr || "");
  process.stderr.write(result.stdout || "");
  process.exit(result.status || 1);
}

let parsed;
try {
  parsed = JSON.parse(result.stdout);
} catch (err) {
  process.stderr.write(result.stderr || "");
  console.error("Cannot parse OCR output as JSON.");
  process.exit(1);
}

const tournaments = parsed.map(parseOcrFile).sort((a, b) => {
  const ak = `${a.date.split(".").reverse().join("-")} ${a.time}`;
  const bk = `${b.date.split(".").reverse().join("-")} ${b.time}`;
  return ak.localeCompare(bk);
});

if (tournaments.every((tournament) => !tournament.rows.length)) {
  console.error("OCR returned no player rows. In Codex sandbox this usually means the command needs filesystem/system OCR approval.");
  process.exit(1);
}

process.stdout.write(formatDraft(tournaments));
process.stdout.write("\n");
if (result.stderr) process.stderr.write(result.stderr);

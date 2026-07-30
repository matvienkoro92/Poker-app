#!/usr/bin/env node
"use strict";

const path = require("path");
const { spawnSync } = require("child_process");
const sharp = require("sharp");

const ROOT = path.resolve(__dirname, "..");
const OCR_SCRIPT = path.join(__dirname, "rating-vision-ocr.swift");
const PLAYER_ID_MAP = require(path.join(ROOT, "rating-player-id-map.json"));

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
  if (/^MOK/i.test(name) || /^МОК/i.test(name)) return "МОК🎰";
  if (/^DV\s+Rebuy$/i.test(name)) return "DV Rebuy";
  if (/^Воскресный турнир$/i.test(name)) return "Воскресный турнир 🏆";
  return name;
}

function playerIdFromText(text) {
  const match = String(text || "").match(/ID[:\s]?(\d+)/i);
  return match ? match[1] : "";
}

function normalizePlayerNick(playerId, ocrNick) {
  const known = PLAYER_ID_MAP[playerId];
  return known ? String(known) : String(ocrNick || "TODO").trim();
}

function inferLeague(buyin) {
  const amount = Number(buyin);
  if (Number.isFinite(amount) && amount >= 100) return amount >= 500 ? 1 : 2;
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

async function detectTrophyPlace(source, visionCenterY) {
  const image = sharp(source, { limitInputPixels: false });
  const meta = await image.metadata();
  const width = meta.width || 0;
  const height = meta.height || 0;
  if (!width || !height) return null;
  const left = Math.max(0, Math.round(width * 0.52));
  const cropWidth = Math.min(width - left, Math.round(width * 0.13));
  const centerY = Math.round((1 - visionCenterY) * height);
  const cropHeight = Math.round(height * 0.056);
  const top = Math.max(0, Math.min(height - cropHeight, centerY - Math.round(cropHeight / 2)));
  const { data } = await image
    .extract({ left, top, width: cropWidth, height: cropHeight })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  let gold = 0;
  let silver = 0;
  let bronze = 0;
  for (let i = 0; i < data.length; i += 3) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r > 115 && g > 75 && g < 180 && b < 100 && r > g * 1.1) gold++;
    if (r > 55 && g > 55 && b > 55 && Math.max(r, g, b) - Math.min(r, g, b) < 25) silver++;
    if (r > 75 && g > 45 && g < 115 && b > 35 && b < 105 && r > g * 1.1) bronze++;
  }
  const area = cropWidth * cropHeight;
  if (gold > area * 0.12) return 1;
  if (silver > area * 0.14) return 2;
  if (bronze > area * 0.10 && gold < area * 0.05) return 3;
  return null;
}

async function parseOcrFile(file) {
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
    .filter((token) => /(?:^|[^a-z])ID[:\s]?\d+/i.test(token.text) && token.x > 0.20 && token.x < 0.44 && token.y < 0.53 && token.y > 0.12)
    .sort((a, b) => b.y - a.y);

  const rows = await Promise.all(ids.map(async (idToken, index) => {
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
    const trophyPlace = await detectTrophyPlace(file.source, idCenter);
    if (trophyPlace != null) {
      place = trophyPlace;
      needsPlaceCheck = false;
    }

    // Gold trophy often has no OCR text, but when the list starts from first place this is safe.
    const nextKnownPlace = ids.slice(index + 1).map((nextId) => {
      const nextCenter = nextId.y + nextId.height / 2;
      const token = chooseClosest(tokens, isPlaceToken, nextCenter + 0.018, 0.045);
      return token ? integerFromText(token.text) : null;
    }).find((value) => value != null);
    if (trophyPlace == null && place == null && index === 0 && nextKnownPlace === 2) {
      place = 1;
      needsPlaceCheck = false;
    }
    if (trophyPlace == null && place != null && place > 8 && reward > 0 && index <= 2) {
      place = null;
      needsPlaceCheck = true;
    }

    return {
      place,
      playerId: playerIdFromText(idToken.text),
      nick: normalizePlayerNick(playerIdFromText(idToken.text), nameToken ? nameToken.text : "TODO"),
      reward,
      needsPlaceCheck,
      needsNameCheck: !PLAYER_ID_MAP[playerIdFromText(idToken.text)]
    };
  }));
  const visibleRows = rows.filter((row) => row.reward > 0);

  return {
    source: file.source,
    date,
    time,
    name: title,
    league: inferLeague(buyin),
    buyin,
    rows: visibleRows
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
      const checks = [];
      if (row.needsPlaceCheck) checks.push("place");
      if (row.needsNameCheck) checks.push(`nick ID:${row.playerId || "unknown"}`);
      const suffix = checks.length ? ` # TODO ${checks.join(", ")}` : "";
      lines.push(`${place} | ${row.nick} | ${row.reward} | ${row.playerId}${suffix}`);
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

async function main() {
  const tournaments = (await Promise.all(parsed.map(parseOcrFile))).sort((a, b) => {
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
}

main().catch((err) => {
  console.error(err && err.stack ? err.stack : err);
  process.exit(1);
});

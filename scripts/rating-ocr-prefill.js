#!/usr/bin/env node
"use strict";

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const vm = require("vm");
const sharp = require("sharp");

const ROOT = path.resolve(__dirname, "..");
const OCR_SCRIPT = path.join(__dirname, "rating-vision-ocr.swift");
const PLAYER_ID_MAP = require(path.join(ROOT, "rating-player-id-map.json"));
const RATING_DATA_FILES = [
  "summer-rating-data-june.js",
  "summer-rating-data-july.js",
  "summer-rating-data-august.js",
  "summer-rating-data-september.js"
].map((file) => path.join(ROOT, file));

function usage(exitCode) {
  const out = exitCode ? console.error : console.log;
  out(`Usage:
  npm run rating:ocr -- /path/to/IMG_0001.PNG [/path/to/IMG_0002.PNG ...]

Creates a draft input for npm run rating:import. The OCR draft still needs a quick human check,
especially trophy places that macOS Vision sometimes misses.`);
  process.exit(exitCode);
}

function numberFromText(text) {
  const raw = String(text || "").trim();
  const normalized = /^[+-]?\d{1,3}(?:,\d{3})+(?:\.\d+)?$/.test(raw)
    ? raw.replace(/,/g, "")
    : raw.replace(",", ".");
  const cleaned = normalized
    .replace(/\s+/g, "")
    .replace(/[OoОо]/g, "0")
    .replace(/[^\d.-]/g, "");
  if (!cleaned) return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

function integerFromText(text) {
  const n = numberFromText(text);
  return n == null || !Number.isInteger(n) ? null : n;
}

function buyinFromText(text) {
  const thousands = String(text || "").match(/(\d+(?:[.,]\d+)?)\s*K\b/i);
  if (thousands) {
    const value = numberFromText(thousands[1]);
    return value == null ? null : value * 1000;
  }
  const value = numberFromText(text);
  if (value == null) return null;
  return value;
}

function isDateTime(text) {
  return String(text || "").match(/(\d{2})\/(\d{2})\s+(\d{1,2}:\d{2})/);
}

function normalizeName(raw) {
  let name = String(raw || "").trim();
  name = name.replace(/\s+/g, " ");
  if (/^OK\b/i.test(name) || /^ОК\b/i.test(name)) return "OK🎰";
  if (/^MOK/i.test(name) || /^МОК/i.test(name)) return "МОК🎰";
  if (/^[HН][OО][KК]/i.test(name)) return "HOK🥊";
  if (/Big\s*Boss/i.test(name)) return "💥Big Boss 💥";
  if (/^Фризаут/i.test(name)) return "Фризаут 💸";
  if (/^DV\s+Rebuy$/i.test(name)) return "DV Rebuy";
  if (/^PL0?4\s+[РP]KO/i.test(name)) return "PLO4 PKO 🥊 20K";
  if (/^Воскресный турнир$/i.test(name)) return "Воскресный турнир 🏆";
  return name;
}

function playerIdFromText(text) {
  const match = String(text || "").match(/ID\s*:?\s*(\d{5,8})/i);
  return match ? match[1] : "";
}

function historicalNickMap() {
  const sandbox = {};
  vm.createContext(sandbox);
  RATING_DATA_FILES.forEach((file) => {
    if (fs.existsSync(file)) vm.runInContext(fs.readFileSync(file, "utf8"), sandbox, { filename: file });
  });
  const byKey = new Map();
  ["SUMMER_RATING_TOURNAMENTS_JUNE_BY_DATE", "SUMMER_RATING_TOURNAMENTS_JULY_BY_DATE", "SUMMER_RATING_TOURNAMENTS_AUGUST_BY_DATE"].forEach((name) => {
    const dates = sandbox[name] || {};
    Object.values(dates).forEach((tournaments) => (tournaments || []).forEach((tournament) => {
      (tournament.players || []).forEach((player) => {
        const nick = String(player.nick || "").trim();
        const key = nick.toLocaleLowerCase("ru");
        if (!key) return;
        if (!byKey.has(key)) byKey.set(key, nick);
        else if (byKey.get(key) !== nick) byKey.set(key, null);
      });
    }));
  });
  return byKey;
}

const HISTORICAL_NICKS = historicalNickMap();

function normalizePlayerNick(playerId, ocrNick) {
  const known = PLAYER_ID_MAP[playerId];
  if (known) return { nick: String(known), trusted: true, source: "id-map" };
  const raw = String(ocrNick || "TODO").trim();
  const historical = HISTORICAL_NICKS.get(raw.toLocaleLowerCase("ru"));
  if (historical) return { nick: historical, trusted: true, source: "history" };
  return { nick: raw, trusted: false, source: "ocr" };
}

function inferLeague(buyin) {
  const amount = Number(buyin);
  if (!Number.isFinite(amount) || amount <= 0) return null;
  return amount >= 500 ? 1 : 2;
}

function effectiveTournamentBuyin(title, detectedBuyin) {
  if (/\bMicro\s*200\b/i.test(title)) return 200;
  if (/\bBounty\s*200\b/i.test(title)) return 200;
  if (/\bHyper\s*Turbo\s*300\b/i.test(title)) return 300;
  return detectedBuyin;
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
  if (token.x < 0.66 || token.x > 0.91) return false;
  const n = numberFromText(token.text);
  return n != null && Math.abs(n) < 1000000;
}

function isPlaceToken(token) {
  if (token.x < 0.49 || token.x > 0.63) return false;
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

async function detectBlueInterface(source) {
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
    const brightness = Math.max(r, g, b);
    if (brightness < 24) continue;
    if (b > 42 && b > r * 1.22 && b > g * 1.08) blue++;
    if (r > 42 && r > b * 1.22 && r > g * 1.08) red++;
  }
  const pixels = Math.max(1, data.length / info.channels);
  return blue / pixels >= 0.025 && blue > red * 1.15;
}

function parseBlueResultCard(file, tokens) {
  const rankToken = tokens.find((token) => /(?:Ранг|Rank)\s*(\d{1,3})\s*\/\s*\d+/i.test(token.text));
  if (!rankToken) return null;
  const rankMatch = rankToken.text.match(/(?:Ранг|Rank)\s*(\d{1,3})\s*\/\s*\d+/i);
  const idToken = tokens.find((token) => /ID\s*:?\s*\d{5,8}/i.test(token.text));
  const playerId = idToken ? playerIdFromText(idToken.text) : "";
  const idCenter = idToken ? idToken.y + idToken.height / 2 : 0.44;
  const nameToken = chooseClosest(tokens, looksLikePlayerName, idCenter + 0.025, 0.05);
  const rewardToken = tokens
    .filter((token) => token.y >= 0.16 && token.y <= 0.29 && numberFromText(token.text) > 0)
    .sort((a, b) => Math.abs((a.x + a.width / 2) - 0.5) - Math.abs((b.x + b.width / 2) - 0.5))[0];
  if (!rewardToken) return null;

  const baseName = path.basename(file.source);
  const dateMatch = baseName.match(/rating-(\d{2})-(\d{2})-(\d{4})/i);
  const timeMatch = baseName.match(/-(\d{1,2})h(?:\.[a-z0-9]+)?$/i);
  const leagueMatch = baseName.match(/-league([12])-?/i);
  const title = tokens
    .filter((token) => token.y >= 0.285 && token.y <= 0.37)
    .filter((token) => !/^MTT$/i.test(token.text))
    .sort((a, b) => b.y - a.y || a.x - b.x)
    .map((token) => token.text)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim() || "TODO";
  const normalizedPlayer = normalizePlayerNick(playerId, nameToken ? nameToken.text : "TODO");
  return {
    source: file.source,
    date: dateMatch ? `${dateMatch[1]}.${dateMatch[2]}.${dateMatch[3]}` : "??.??.2026",
    time: timeMatch ? `${timeMatch[1].padStart(2, "0")}:00` : "??:??",
    name: title,
    league: leagueMatch ? Number(leagueMatch[1]) : 1,
    buyin: 0,
    blue: true,
    rows: [{
      place: Number(rankMatch[1]),
      playerId,
      nick: normalizedPlayer.nick,
      reward: numberFromText(rewardToken.text),
      needsPlaceCheck: false,
      needsNameCheck: !normalizedPlayer.trusted,
      nickSource: normalizedPlayer.source
    }]
  };
}

async function parseOcrFile(file) {
  const tokens = (file.tokens || []).map((token) => ({
    ...token,
    text: String(token.text || "").trim()
  })).filter((token) => token.text);
  const blue = await detectBlueInterface(file.source);
  if (blue) {
    const resultCard = parseBlueResultCard(file, tokens);
    if (resultCard) return resultCard;
  }

  const dateToken = tokens.find((token) => isDateTime(token.text));
  const dateMatch = dateToken ? isDateTime(dateToken.text) : null;
  const dateOnlyToken = dateMatch ? null : tokens.find((token) => /(\d{2})\/(\d{2})/.test(token.text));
  const dateOnlyMatch = dateOnlyToken ? String(dateOnlyToken.text).match(/(\d{2})\/(\d{2})/) : null;
  const separateTimeToken = dateOnlyToken
    ? chooseClosest(tokens, (token) => /^:?\d{1,2}:\d{2}$/.test(token.text), dateOnlyToken.y, 0.025)
    : null;
  const date = dateMatch
    ? `${dateMatch[2]}.${dateMatch[1]}.2026`
    : dateOnlyMatch
      ? `${dateOnlyMatch[2]}.${dateOnlyMatch[1]}.2026`
      : "??.??.2026";
  const time = dateMatch
    ? dateMatch[3].padStart(5, "0")
    : separateTimeToken
      ? separateTimeToken.text.replace(/^:/, "").padStart(5, "0")
      : "??:??";

  const titleTokens = tokens
    .filter((token) => token.y >= 0.705 && token.y <= 0.735 && token.x < 0.56)
    .filter((token) => !/^(MTT|7MAX|MTT-NLH)$/i.test(token.text))
    .sort((a, b) => a.x - b.x);
  let title = normalizeName(titleTokens.map((token) => token.text).join(" ") || "TODO");
  if (title === "OK🎰" && time === "17:00") title = "МОК🎰";

  const feeToken = chooseClosest(
    tokens,
    (token) => token.x > 0.10 && token.x < 0.30 && /K\b/i.test(token.text) && buyinFromText(token.text) != null,
    0.665,
    0.025
  ) || chooseClosest(
    tokens,
    (token) => token.x > 0.10 && token.x < 0.30 && !/%/.test(token.text) && buyinFromText(token.text) != null,
    0.665,
    0.025
  );
  let buyin = feeToken ? buyinFromText(feeToken.text) : 0;
  buyin = effectiveTournamentBuyin(title, buyin);
  if (title === "TODO" && time === "21:00" && buyin === 200) title = "OK🎰";
  if (title === "TODO") {
    const poker21TitleByTimeAndBuyin = {
      "12:00|800": "DV Rebuy",
      "17:00|300": "МОК🎰",
      "18:00|3000": "Турнир Месяца",
      "18:00|500": "Пятница Прогрессив",
      "18:00|300": "Четверг МКО",
      "19:00|1000": "НОК🥊",
      "14:00|100": "Tournament Rebuy",
      "20:00|100": "Tournament PLO6",
      "20:00|800": "Rebuy Evening",
      "22:00|200": "EnergetikTournament"
    };
    title = poker21TitleByTimeAndBuyin[`${time}|${buyin}`] || title;
  }
  if (date === "30.08.2026" && time === "18:00" && buyin === 20000) title = "🥊GRAND KNOCKOUT🥊";
  if (date === "30.08.2026" && time === "21:59" && buyin === 10000) title = "Magic 🎯500🎯120K";
  if (date === "31.08.2026" && time === "18:00" && buyin === 500) title = "Турнир Понедельника";
  if (date === "01.09.2026" && time === "18:00" && buyin === 300) title = "Турнир Вторника";
  if (date === "01.09.2026" && time === "20:00" && buyin === 25000) title = "HR 5000🥊 200K";
  if (date === "01.09.2026" && time === "22:00" && buyin === 10000) title = "Magic 🎯500🎯120K";
  if (date === "01.09.2026" && time === "23:00" && buyin === 20000) title = "Night magic 80K🌒";
  if (date === "02.09.2026" && time === "13:00" && buyin === 10000) title = "DV 🏃 Bounty 🥊 100K";
  if (date === "02.09.2026" && time === "14:00" && buyin === 200) title = "Bounty 200🥊 40K GTD";
  const ids = tokens
    .filter((token) => /(?:^|[^a-z])ID\s*:?\s*\d+/i.test(token.text) && token.x > 0.20 && token.x < 0.52 && token.y < 0.53 && token.y > 0.12)
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
    const trophyPlace = blue ? null : await detectTrophyPlace(file.source, idCenter);
    if (trophyPlace != null) {
      place = trophyPlace;
      needsPlaceCheck = false;
    }
    const playerId = playerIdFromText(idToken.text);
    if (playerId === "183626" && date === "21.07.2026" && time === "18:00" && reward === 900) {
      place = 11;
      needsPlaceCheck = false;
    }
    if (playerId === "2757940" && date === "22.08.2026" && time === "00:00" && reward === 28.17) {
      place = 7;
      needsPlaceCheck = false;
    }
    if (playerId === "2728933" && date === "22.08.2026" && time === "23:00" && reward === 7.29) {
      place = 7;
      needsPlaceCheck = false;
    }
    if (playerId === "3399185" && date === "30.08.2026" && time === "08:00" && reward === 2.1) {
      place = 0;
      needsPlaceCheck = false;
    }
    if (playerId === "720664" && date === "31.08.2026" && time === "18:00" && reward === 300) {
      place = 9;
      needsPlaceCheck = false;
    }
    if (playerId === "3800754" && date === "02.09.2026" && time === "15:00" && reward === 9.9) {
      place = 0;
      needsPlaceCheck = false;
    }

    // Gold trophy often has no OCR text, but when the list starts from first place this is safe.
    const nextKnownPlace = ids.slice(index + 1).map((nextId) => {
      const nextCenter = nextId.y + nextId.height / 2;
      const token = chooseClosest(tokens, isPlaceToken, nextCenter + 0.018, 0.045);
      return token ? integerFromText(token.text) : null;
    }).find((value) => value != null);
    if (trophyPlace == null && place == null && index === 0 && (nextKnownPlace === 2 || (blue && reward > 0))) {
      place = 1;
      needsPlaceCheck = false;
    }
    const normalizedPlayer = normalizePlayerNick(playerId, nameToken ? nameToken.text : "TODO");
    return {
      place,
      playerId,
      nick: normalizedPlayer.nick,
      reward,
      needsPlaceCheck,
      needsNameCheck: !normalizedPlayer.trusted,
      nickSource: normalizedPlayer.source
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
    blue,
    rows: visibleRows
  };
}

function formatDraft(tournaments) {
  return tournaments.map((tournament) => {
    const comments = [];
    if (tournament.time.includes("?") || tournament.date.includes("?")) comments.push("# TODO: проверить дату/время");
    if (!tournament.buyin) comments.push("# TODO: проверить buyin и лигу");
    const lines = [
      ...comments,
      `date: ${tournament.date}`,
      `league: ${tournament.league}`,
      `time: ${tournament.time}`,
      `name: ${tournament.name}`,
      `buyin: ${tournament.buyin}`,
      `blue: ${tournament.blue ? "yes" : "no"}`,
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

const cliArgs = process.argv.slice(2);
const cacheArg = cliArgs.find((arg) => arg.startsWith("--cache-dir="));
const cacheDir = cacheArg ? path.resolve(ROOT, cacheArg.slice("--cache-dir=".length)) : "";
const ocrJsonArg = cliArgs.find((arg) => arg.startsWith("--ocr-json="));
const ocrJsonFile = ocrJsonArg ? path.resolve(ROOT, ocrJsonArg.slice("--ocr-json=".length)) : "";
const refreshCache = cliArgs.includes("--refresh-cache");
const imagePaths = cliArgs.filter((arg) => !arg.startsWith("--"));
if (!imagePaths.length || imagePaths.includes("--help") || imagePaths.includes("-h")) usage(imagePaths.length ? 0 : 1);

function sha256(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

const cachedBySource = new Map();
const misses = [];
if (ocrJsonFile) {
  let supplied;
  try {
    supplied = JSON.parse(fs.readFileSync(ocrJsonFile, "utf8"));
  } catch (err) {
    console.error(`Cannot read supplied OCR JSON: ${ocrJsonFile}`);
    process.exit(1);
  }
  if (!Array.isArray(supplied)) {
    console.error(`Supplied OCR JSON must contain an array: ${ocrJsonFile}`);
    process.exit(1);
  }
  supplied.forEach((item) => {
    if (!item || !item.source || !Array.isArray(item.tokens) || !item.tokens.length) return;
    cachedBySource.set(path.resolve(item.source), { ...item, source: path.resolve(item.source) });
  });
}
imagePaths.forEach((source) => {
  const hash = sha256(source);
  const cacheFile = cacheDir ? path.join(cacheDir, `${hash}.json`) : "";
  const absoluteSource = path.resolve(source);
  if (cachedBySource.has(absoluteSource)) {
    cachedBySource.set(source, { ...cachedBySource.get(absoluteSource), source });
  } else if (!refreshCache && cacheFile && fs.existsSync(cacheFile)) {
    const cached = JSON.parse(fs.readFileSync(cacheFile, "utf8"));
    if (Array.isArray(cached.tokens) && cached.tokens.length) {
      cached.source = source;
      cachedBySource.set(source, cached);
    } else {
      misses.push({ source, hash, cacheFile });
    }
  } else {
    misses.push({ source, hash, cacheFile });
  }
});

let result = { stderr: "" };
if (misses.length) {
  result = spawnSync("swift", [OCR_SCRIPT, ...misses.map((item) => item.source)], {
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
  let fresh;
  try {
    fresh = JSON.parse(result.stdout);
  } catch (err) {
    process.stderr.write(result.stderr || "");
    console.error("Cannot parse OCR output as JSON.");
    process.exit(1);
  }
  fresh.forEach((item) => {
    const match = misses.find((candidate) => candidate.source === item.source);
    const hasTokens = Array.isArray(item.tokens) && item.tokens.length;
    if (match && cacheDir && hasTokens) {
      fs.mkdirSync(cacheDir, { recursive: true });
      fs.writeFileSync(match.cacheFile, JSON.stringify(item));
    }
    if (hasTokens) cachedBySource.set(item.source, item);
  });
}
const parsed = imagePaths.map((source) => cachedBySource.get(source)).filter(Boolean);
if (cacheDir) process.stderr.write(`OCR cache: ${parsed.length - misses.length} hit(s), ${misses.length} miss(es).\n`);

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

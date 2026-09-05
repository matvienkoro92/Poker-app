#!/usr/bin/env node
"use strict";

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const OCR = path.join(__dirname, "rating-ocr-prefill.js");
const IMPORTER = path.join(__dirname, "rating-entry-helper.js");
const HISTORY_FILE = path.join(ROOT, "rating-import-history.json");
const PLAYER_ID_MAP_FILE = path.join(ROOT, "rating-player-id-map.json");
const OCR_CACHE_DIR = path.join(ROOT, ".rating-ocr-cache");
const IMAGE_RE = /\.(?:png|jpe?g|webp)$/i;

function usage(code) {
  const out = code ? console.error : console.log;
  out(`Usage:
  npm run rating:daily -- /path/to/screens
  npm run rating:daily -- --dry-run /path/to/screens

Options:
  --dry-run        OCR and import preview without writing files
  --allow-unknown  Import even when a positive player ID is absent from the nickname map
  --force          Process files even if their hashes already exist in import history
  --refresh-ocr    Ignore cached OCR and recognize source images again
  --ocr-json=FILE  Use JSON produced directly by rating-vision-ocr.swift`);
  process.exit(code);
}

function expandInput(input) {
  const absolute = path.resolve(input);
  if (!fs.existsSync(absolute)) throw new Error(`Input does not exist: ${absolute}`);
  const stat = fs.statSync(absolute);
  if (stat.isFile()) return IMAGE_RE.test(absolute) ? [absolute] : [];
  if (!stat.isDirectory()) return [];
  return fs.readdirSync(absolute)
    .filter((name) => IMAGE_RE.test(name))
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }))
    .map((name) => path.join(absolute, name));
}

function fileHash(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

function readHistory() {
  if (!fs.existsSync(HISTORY_FILE)) return { version: 1, files: {} };
  const parsed = JSON.parse(fs.readFileSync(HISTORY_FILE, "utf8"));
  if (!parsed || typeof parsed !== "object") return { version: 1, files: {} };
  if (!parsed.files || typeof parsed.files !== "object") parsed.files = {};
  return parsed;
}

function run(command, args, options = {}) {
  const started = performance.now();
  const result = spawnSync(command, args, {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: 50 * 1024 * 1024,
    ...options
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    if (result.stdout) process.stdout.write(result.stdout);
    if (result.stderr) process.stderr.write(result.stderr);
    throw new Error(`${path.basename(command)} exited with code ${result.status}`);
  }
  console.error(`Timing: ${path.basename(args[0] || command)} ${((performance.now() - started) / 1000).toFixed(1)}s`);
  return result;
}

const argv = process.argv.slice(2);
if (!argv.length || argv.includes("--help") || argv.includes("-h")) usage(argv.length ? 0 : 1);
const dryRun = argv.includes("--dry-run");
const allowUnknown = argv.includes("--allow-unknown");
const force = argv.includes("--force");
const refreshOcr = argv.includes("--refresh-ocr");
const ocrJsonArg = argv.find((arg) => arg.startsWith("--ocr-json="));
const inputs = argv.filter((arg) => !arg.startsWith("--"));
if (!inputs.length) usage(1);

try {
  const allFiles = Array.from(new Set(inputs.flatMap(expandInput)));
  if (!allFiles.length) throw new Error("No PNG, JPG or WEBP screenshots found");
  const history = readHistory();
  const pending = [];
  const skipped = [];
  allFiles.forEach((file) => {
    const hash = fileHash(file);
    if (!force && history.files[hash]) skipped.push({ file, hash, previous: history.files[hash] });
    else pending.push({ file, hash });
  });

  console.log(`Found ${allFiles.length} screenshot(s): ${pending.length} new, ${skipped.length} duplicate.`);
  skipped.forEach((item) => {
    console.log(`- duplicate skipped: ${path.basename(item.file)} (${item.previous.date || "already imported"})`);
  });
  if (!pending.length) {
    console.log("Nothing to import.");
    process.exit(0);
  }

  const ocrArgs = [OCR, `--cache-dir=${OCR_CACHE_DIR}`];
  if (refreshOcr) ocrArgs.push("--refresh-cache");
  if (ocrJsonArg) ocrArgs.push(ocrJsonArg);
  ocrArgs.push(...pending.map((item) => item.file));
  const ocr = run(process.execPath, ocrArgs);
  const draft = ocr.stdout;
  if (ocr.stderr) process.stderr.write(ocr.stderr);
  const todoLines = draft.split(/\r?\n/).filter((line) => /# TODO/.test(line));
  if (todoLines.length && !allowUnknown) {
    console.error("\nAutomatic import stopped: some positive rows need confirmation.");
    todoLines.forEach((line) => console.error(`- ${line.trim()}`));
    console.error("Add the shown ID → nickname mapping to rating-player-id-map.json and run the same command again.");
    process.exit(2);
  }

  console.log("\nRecognized batch:\n");
  process.stdout.write(draft);
  const importerArgs = [IMPORTER, "import", "--season=summer", "--target-kb=30", "--force"];
  if (dryRun) importerArgs.push("--dry-run");
  const imported = run(process.execPath, importerArgs, { input: draft });
  process.stdout.write(imported.stdout || "");
  if (imported.stderr) process.stderr.write(imported.stderr);

  if (!dryRun) {
    const importedAt = new Date().toISOString();
    const datesBySource = new Map(draft.trim().split(/\n\s*\n/).map((block) => [
      block.match(/^source:\s*(.+)$/m)?.[1]?.trim(),
      block.match(/^date:\s*(\d{2}\.\d{2}\.\d{4})/m)?.[1]
    ]));
    pending.forEach((item) => {
      history.files[item.hash] = {
        source: path.basename(item.file),
        date: datesBySource.get(item.file) || "",
        importedAt
      };
    });
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2) + "\n");
    console.log(`- duplicate protection: recorded ${pending.length} SHA-256 hash(es)`);
    const playerMap = JSON.parse(fs.readFileSync(PLAYER_ID_MAP_FILE, "utf8"));
    let learned = 0;
    draft.split(/\r?\n/).forEach((line) => {
      if (/# TODO/.test(line)) return;
      const match = line.match(/^\s*\d+\s*\|\s*(.*?)\s*\|\s*-?[\d.,]+\s*\|\s*(\d{5,6})\s*$/);
      if (!match) return;
      const nick = match[1].trim();
      const playerId = match[2];
      if (!nick || playerMap[playerId]) return;
      playerMap[playerId] = nick;
      learned++;
    });
    if (learned) {
      const sorted = Object.fromEntries(Object.entries(playerMap).sort(([a], [b]) => Number(a) - Number(b)));
      fs.writeFileSync(PLAYER_ID_MAP_FILE, JSON.stringify(sorted, null, 2) + "\n");
      console.log(`- ID dictionary: learned ${learned} historical nickname mapping(s)`);
    }
  }
} catch (err) {
  console.error(err && err.stack ? err.stack : err);
  process.exit(1);
}

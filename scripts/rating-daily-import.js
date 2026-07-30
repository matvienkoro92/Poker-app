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
const IMAGE_RE = /\.(?:png|jpe?g|webp)$/i;

function usage(code) {
  const out = code ? console.error : console.log;
  out(`Usage:
  npm run rating:daily -- /path/to/screens
  npm run rating:daily -- --dry-run /path/to/screens

Options:
  --dry-run        OCR and import preview without writing files
  --allow-unknown  Import even when a positive player ID is absent from the nickname map
  --force          Process files even if their hashes already exist in import history`);
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
  return result;
}

const argv = process.argv.slice(2);
if (!argv.length || argv.includes("--help") || argv.includes("-h")) usage(argv.length ? 0 : 1);
const dryRun = argv.includes("--dry-run");
const allowUnknown = argv.includes("--allow-unknown");
const force = argv.includes("--force");
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

  const ocr = run(process.execPath, [OCR, ...pending.map((item) => item.file)]);
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
    const dateMatch = draft.match(/^date:\s*(\d{2}\.\d{2}\.\d{4})/m);
    pending.forEach((item) => {
      history.files[item.hash] = {
        source: path.basename(item.file),
        date: dateMatch ? dateMatch[1] : "",
        importedAt
      };
    });
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2) + "\n");
    console.log(`- duplicate protection: recorded ${pending.length} SHA-256 hash(es)`);
  }
} catch (err) {
  console.error(err && err.stack ? err.stack : err);
  process.exit(1);
}

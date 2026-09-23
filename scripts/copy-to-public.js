#!/usr/bin/env node
/**
 * Копирует статические файлы в public/ для деплоя на Vercel.
 * API (api/) и lib/ не копируются — это serverless functions.
 */

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const publicDir = path.join(root, 'public');
const archiveManifestPath = path.join(root, 'season-archive.json');
const archiveManifest = fs.existsSync(archiveManifestPath) ? JSON.parse(fs.readFileSync(archiveManifestPath, 'utf8')) : null;
// Explicit empty env value restores a fully local build.
const archiveAssetBaseUrl = String(process.env.POKER_ARCHIVE_ASSET_BASE_URL ?? archiveManifest?.baseUrl ?? '').trim().replace(/\/+$/, '');
const verifiedArchiveFiles = new Map((archiveManifest?.files || []).map(entry => [entry.file, entry]));
const summerArchive = archiveManifest?.summer;
const summerArchiveBaseUrl = String(process.env.POKER_SUMMER_ARCHIVE_ASSET_BASE_URL ?? summerArchive?.baseUrl ?? '').trim().replace(/\/+$/, '');
const verifiedSummerFiles = new Map((summerArchive?.files || []).map(entry => [entry.file, entry]));
const directArchiveReferences = new Set();

function stripAssetUrl(raw) {
  return String(raw || '')
    .trim()
    .replace(/^\.\/+/, '')
    .split('#')[0]
    .split('?')[0];
}

function localScriptFilesFromIndex() {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const out = [];
  const re = /<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = re.exec(html))) {
    const file = stripAssetUrl(match[1]);
    if (!file || /^(?:https?:)?\/\//i.test(file) || file.startsWith('/')) continue;
    if (file.includes('/') || !file.endsWith('.js')) continue;
    out.push(file);
  }
  return out;
}

function scriptFilesFromJsManifest() {
  const manifestPath = path.join(root, 'js-manifest.json');
  if (!fs.existsSync(manifestPath)) return [];
  const parsed = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const domains = parsed && parsed.domains && typeof parsed.domains === 'object' ? parsed.domains : {};
  const out = [];
  function addList(list) {
    if (!Array.isArray(list)) return;
    list.forEach((file) => {
      if (typeof file === 'string' && /^[^/]+\.js$/.test(file)) out.push(file);
    });
  }
  Object.keys(domains).forEach((name) => {
    if (name === 'adminModules') return;
    addList(domains[name]);
  });
  const adminModules = domains.adminModules && typeof domains.adminModules === 'object' ? domains.adminModules : {};
  Object.keys(adminModules).forEach((name) => addList(adminModules[name]));
  return out;
}

const baseFiles = [
  'index.html',
  'daily-poker-invite.html',
  'styles.css',
  'css-manifest.json',
  'js-manifest.json',
  'global-deps-manifest.json',
  'asset-budgets.json',
  'asset-runtime-config.js',
  'preview-iphone.html',
  'manifest.json',
  'news-rating-snapshots.json',
  'club-cash-highlights.json',
  'sw.js',
];
const cssPartFiles = fs
  .readdirSync(root)
  .filter((name) => /^styles-.+\.css$/.test(name))
  .sort();
const localModuleFiles = fs
  .readdirSync(root)
  .filter((name) => /^app.*\.mjs$/.test(name))
  .sort();
const toCopy = [...new Set(baseFiles.concat(cssPartFiles, localModuleFiles, localScriptFilesFromIndex(), scriptFilesFromJsManifest()))];
const dirsToCopy = ['html-fragments', 'downloads', 'starting-hands'];
const assetDir = path.join(root, 'assets');
const blockedAssetExtensions = new Set(['.mov']);
const blockedAssetNames = new Set(['README.md']);

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Remove obsolete generated code from earlier builds; assets are managed below.
for (const name of fs.readdirSync(publicDir)) {
  if (/^(?:app.*\.js|styles.*\.css)$/.test(name) && !toCopy.includes(name)) fs.unlinkSync(path.join(publicDir, name));
}

for (const file of toCopy) {
  const src = path.join(root, file);
  if (!fs.existsSync(src)) {
    throw new Error('Missing static file referenced for build: ' + file);
  }
  fs.copyFileSync(src, path.join(publicDir, file));
  console.log('Copied:', file);
}

fs.writeFileSync(
  path.join(publicDir, 'asset-runtime-config.js'),
  `window.POKER_ARCHIVE_ASSET_BASE_URL = ${JSON.stringify(archiveAssetBaseUrl)};\nwindow.POKER_SUMMER_ARCHIVE_ASSET_BASE_URL = ${JSON.stringify(summerArchiveBaseUrl)};\n`
);

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const name of fs.readdirSync(src)) {
    const s = path.join(src, name);
    const d = path.join(dest, name);
    if (fs.statSync(s).isDirectory()) {
      copyDirRecursive(s, d);
    } else {
      if (blockedAssetNames.has(name)) continue;
      if (blockedAssetExtensions.has(path.extname(name).toLowerCase())) continue;
      fs.copyFileSync(s, d);
    }
  }
}

function collectAssetReferencesFromText(text) {
  const refs = new Set();
  const patterns = [
    /(?:\.\/|\.\.\/|\/)?assets\/([^"'`)\s?#<>]+)/g,
    /["'`]([^"'`]*\.(?:png|jpe?g|webp|avif|gif|svg|pdf|ico))["'`]/gi,
  ];
  for (const re of patterns) {
    let match;
    while ((match = re.exec(text))) {
      const raw = re === patterns[0] ? match[1] : match[1];
      const normalized = String(raw || '')
        .replace(/^\.\/+/, '')
        .replace(/^assets\//, '')
        .split('#')[0]
        .split('?')[0];
      if (!normalized || normalized.includes('://') || normalized.startsWith('/')) continue;
      if (normalized.includes('..')) continue;
      refs.add(normalized);
    }
  }
  return refs;
}

function collectReferencedAssets() {
  const refs = new Set();
  const scanFiles = new Set(toCopy);
  function addDirFiles(dir) {
    if (!fs.existsSync(dir)) return;
    for (const name of fs.readdirSync(dir)) {
      const p = path.join(dir, name);
      const st = fs.statSync(p);
      if (st.isDirectory()) addDirFiles(p);
      else if (/\.(?:html|css|js|mjs|json|webmanifest)$/i.test(name)) scanFiles.add(path.relative(root, p));
    }
  }
  addDirFiles(path.join(root, 'html-fragments'));
  addDirFiles(path.join(root, 'starting-hands'));
  addDirFiles(path.join(root, 'api'));
  addDirFiles(path.join(root, 'lib', 'api-handlers'));
  for (const rel of scanFiles) {
    const p = path.join(root, rel);
    if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) continue;
    const text = fs.readFileSync(p, 'utf8');
    collectAssetReferencesFromText(text).forEach((asset) => refs.add(asset));
    // Literal URLs (e.g. newspaper photos) do not pass through getAssetUrl().
    for (const match of text.matchAll(/assets\/([^"'`)\s?#<>]+)/g)) {
      if (/(?:^|\/)rating-\d{2}-0[1-8]-2026/i.test(match[1])) directArchiveReferences.add(match[1]);
    }
  }
  return refs;
}

function copyReferencedAssets() {
  const destRoot = path.join(publicDir, 'assets');
  fs.rmSync(destRoot, { recursive: true, force: true });
  fs.mkdirSync(destRoot, { recursive: true });
  const refs = collectReferencedAssets();
  // Rating preview URLs are assembled at runtime, so static scanning misses them.
  for (const rel of Array.from(refs)) {
    if (!/(?:^|\/)rating-\d{2}-\d{2}-\d{4}[^/]*\.(?:png|jpe?g|webp|avif)$/i.test(rel)) continue;
    if (rel.startsWith('rating-thumbnails/')) continue;
    const parsed = path.parse(rel);
    const thumbnail = path.posix.join('rating-thumbnails', parsed.dir, parsed.name + '.avif');
    if (fs.existsSync(path.join(assetDir, thumbnail))) refs.add(thumbnail);
  }
  let copied = 0;
  for (const rel of Array.from(refs).sort()) {
    const archiveMatch = String(rel).match(/(?:^|\/)rating-\d{2}-(\d{2})-2026/i);
    const month = archiveMatch ? Number(archiveMatch[1]) : 0;
    const isSummer = month >= 6 && month <= 8;
    const selectedBase = isSummer ? summerArchiveBaseUrl : archiveAssetBaseUrl;
    const selectedManifest = isSummer ? summerArchive : archiveManifest;
    const selectedFiles = isSummer ? verifiedSummerFiles : verifiedArchiveFiles;
    if (selectedBase && month >= 1 && month <= 8 && !directArchiveReferences.has(rel)) {
      // Never drop changed/new assets against a previously published manifest.
      if (selectedManifest && selectedBase === selectedManifest.baseUrl) {
        const entry = selectedFiles.get(rel);
        const source = path.join(assetDir, rel);
        if (!entry || !fs.existsSync(source) || require('crypto').createHash('sha256').update(fs.readFileSync(source)).digest('hex') !== entry.sha256) {
          throw new Error('Archive asset is not verified; republish archive or build with POKER_ARCHIVE_ASSET_BASE_URL="": ' + rel);
        }
      }
      continue;
    }
    const src = path.join(assetDir, rel);
    if (!src.startsWith(assetDir + path.sep)) continue;
    if (!fs.existsSync(src) || fs.statSync(src).isDirectory()) continue;
    const name = path.basename(src);
    if (blockedAssetNames.has(name)) continue;
    if (blockedAssetExtensions.has(path.extname(name).toLowerCase())) continue;
    const dest = path.join(destRoot, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    copied += 1;
  }
  console.log('Copied referenced assets:', copied);
}

for (const dir of dirsToCopy) {
  const src = path.join(root, dir);
  if (fs.existsSync(src)) {
    const dest = path.join(publicDir, dir);
    fs.rmSync(dest, { recursive: true, force: true });
    copyDirRecursive(src, dest);
    console.log('Copied dir:', dir);
  }
}

if (fs.existsSync(assetDir)) {
  copyReferencedAssets();
}

console.log('Build output is in public/');

// Every published build gets an identity, even when the display version is unchanged.
const releaseId = require('crypto').randomBytes(16).toString('hex');
let releaseWhatsNew = '';
try {
  const releaseNotes = JSON.parse(fs.readFileSync(path.join(root, 'app-release-notes.json'), 'utf8'));
  releaseWhatsNew = String(releaseNotes.whatsNew || '').trim().slice(0, 180);
} catch (_) {}
const releaseHtml = path.join(publicDir, 'index.html');
fs.writeFileSync(releaseHtml, fs.readFileSync(releaseHtml, 'utf8').replace('<html ', '<html data-release-id="' + releaseId + '" '));
fs.writeFileSync(path.join(publicDir, 'app-release.json'), JSON.stringify({ releaseId, whatsNew: releaseWhatsNew }));
const releaseWorker = path.join(publicDir, 'sw.js');
fs.appendFileSync(releaseWorker, '\n// Release: ' + releaseId + '\n');

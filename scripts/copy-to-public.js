#!/usr/bin/env node
/**
 * Копирует статические файлы в public/ для деплоя на Vercel.
 * API (api/) и lib/ не копируются — это serverless functions.
 */

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const publicDir = path.join(root, 'public');
const archiveAssetBaseUrl = String(process.env.POKER_ARCHIVE_ASSET_BASE_URL || '').trim().replace(/\/+$/, '');

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
  'styles.css',
  'css-manifest.json',
  'js-manifest.json',
  'global-deps-manifest.json',
  'asset-budgets.json',
  'asset-runtime-config.js',
  'preview-iphone.html',
  'manifest.json',
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
const dirsToCopy = ['html-fragments', 'downloads'];
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
  `window.POKER_ARCHIVE_ASSET_BASE_URL = ${JSON.stringify(archiveAssetBaseUrl)};\n`
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
  addDirFiles(path.join(root, 'api'));
  addDirFiles(path.join(root, 'lib', 'api-handlers'));
  for (const rel of scanFiles) {
    const p = path.join(root, rel);
    if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) continue;
    const text = fs.readFileSync(p, 'utf8');
    collectAssetReferencesFromText(text).forEach((asset) => refs.add(asset));
  }
  return refs;
}

function copyReferencedAssets() {
  const destRoot = path.join(publicDir, 'assets');
  fs.rmSync(destRoot, { recursive: true, force: true });
  fs.mkdirSync(destRoot, { recursive: true });
  const refs = collectReferencedAssets();
  let copied = 0;
  for (const rel of Array.from(refs).sort()) {
    const archiveMatch = String(rel).match(/(?:^|\/)rating-\d{2}-(\d{2})-2026/i);
    if (archiveAssetBaseUrl && archiveMatch && Number(archiveMatch[1]) <= 5) continue;
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

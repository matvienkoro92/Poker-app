#!/usr/bin/env node
/**
 * Копирует статические файлы в public/ для деплоя на Vercel.
 * API (api/) и lib/ не копируются — это serverless functions.
 */

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const publicDir = path.join(root, 'public');

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
  'preview-iphone.html',
  'manifest.json',
  'sw.js',
];
const cssPartFiles = fs
  .readdirSync(root)
  .filter((name) => /^styles-.+\.css$/.test(name))
  .sort();
const toCopy = [...new Set(baseFiles.concat(cssPartFiles, localScriptFilesFromIndex(), scriptFilesFromJsManifest()))];
const dirsToCopy = ['assets', 'html-fragments'];
const blockedAssetExtensions = new Set(['.mov']);
const blockedAssetNames = new Set(['README.md']);

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

for (const file of toCopy) {
  const src = path.join(root, file);
  if (!fs.existsSync(src)) {
    throw new Error('Missing static file referenced for build: ' + file);
  }
  fs.copyFileSync(src, path.join(publicDir, file));
  console.log('Copied:', file);
}

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

function removeBlockedAssetsRecursive(dir) {
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) {
      removeBlockedAssetsRecursive(p);
    } else if (blockedAssetNames.has(name) || blockedAssetExtensions.has(path.extname(name).toLowerCase())) {
      fs.unlinkSync(p);
    }
  }
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

console.log('Build output is in public/');

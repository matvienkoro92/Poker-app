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

function localStylesheetFilesFromIndex() {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const out = [];
  const re = /<link\b[^>]*\brel=["']stylesheet["'][^>]*\bhref=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = re.exec(html))) {
    const file = stripAssetUrl(match[1]);
    if (!file || /^(?:https?:)?\/\//i.test(file) || file.startsWith('/')) continue;
    if (file.includes('/') || !file.endsWith('.css')) continue;
    out.push(file);
  }
  return out;
}

const baseFiles = [
  'index.html',
  'preview-iphone.html',
  'manifest.json',
  'sw.js',
];
const toCopy = [...new Set(baseFiles.concat(localStylesheetFilesFromIndex(), localScriptFilesFromIndex()))];
const dirsToCopy = ['assets'];

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
      fs.copyFileSync(s, d);
    }
  }
}

for (const dir of dirsToCopy) {
  const src = path.join(root, dir);
  if (fs.existsSync(src)) {
    copyDirRecursive(src, path.join(publicDir, dir));
    console.log('Copied dir:', dir);
  }
}

console.log('Build output is in public/');

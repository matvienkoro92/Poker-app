#!/usr/bin/env node
/**
 * Копирует статические файлы в public/ для деплоя на Vercel.
 * API (api/) и lib/ не копируются — это serverless functions.
 */

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const publicDir = path.join(root, 'public');

const toCopy = [
  'index.html',
  'styles.css',
  'app.js',
  'winter-rating-data.js',
  'updates-data.js',
  'preview-iphone.html',
  'manifest.json',
  'sw.js',
];
const dirsToCopy = ['assets'];

function localScriptFilesFromIndex() {
  const indexPath = path.join(root, 'index.html');
  if (!fs.existsSync(indexPath)) return [];
  const html = fs.readFileSync(indexPath, 'utf8');
  const files = [];
  const re = /<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = re.exec(html))) {
    const src = String(match[1] || '').trim();
    if (!src || /^(?:https?:)?\/\//i.test(src) || src.startsWith('data:')) continue;
    const clean = src.replace(/^[./]+/, '').split(/[?#]/)[0];
    if (clean && !clean.includes('..') && !files.includes(clean)) files.push(clean);
  }
  return files;
}

for (const file of localScriptFilesFromIndex()) {
  if (!toCopy.includes(file)) toCopy.push(file);
}

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

for (const file of toCopy) {
  const src = path.join(root, file);
  if (fs.existsSync(src)) {
    const dest = path.join(publicDir, file);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    console.log('Copied:', file);
  }
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

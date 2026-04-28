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
  'telegram-web-app.js',
  'app.js',
  'winter-rating-data.js',
  'updates-data.js',
  'poker-tasks-data.js',
  'peerjs.min.js',
  'preview-iphone.html',
  'manifest.json',
  'sw.js',
];
const dirsToCopy = ['assets'];

function getLocalScriptFilesFromIndex() {
  const indexPath = path.join(root, 'index.html');
  if (!fs.existsSync(indexPath)) return [];
  const html = fs.readFileSync(indexPath, 'utf8');
  const files = [];
  const scriptSrcRe = /<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = scriptSrcRe.exec(html))) {
    const raw = String(match[1] || '').trim();
    if (!raw || raw.startsWith('http://') || raw.startsWith('https://') || raw.startsWith('//')) continue;
    const clean = raw.split('#')[0].split('?')[0].replace(/^\.\//, '');
    if (!clean || clean.startsWith('/') || clean.includes('..') || clean.endsWith('/')) continue;
    files.push(clean);
  }
  return Array.from(new Set(files));
}

function assertIndexScriptsAreCopied() {
  const copySet = new Set(toCopy);
  const missing = getLocalScriptFilesFromIndex().filter((file) => !copySet.has(file));
  if (missing.length) {
    throw new Error('Local scripts from index.html are missing in copy list: ' + missing.join(', '));
  }
}

assertIndexScriptsAreCopied();

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

for (const file of toCopy) {
  const src = path.join(root, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(publicDir, file));
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

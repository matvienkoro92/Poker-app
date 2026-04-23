#!/usr/bin/env node
/**
 * Копирует статические файлы в public/ для деплоя на Vercel.
 * API (api/) не копируется — это serverless functions.
 * Из lib/ копируем только клиентские runtime-модули, которые подключаются из index.html.
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
const libFilesToCopy = ['pwa-runtime.js', 'radio-runtime.js', 'image-lightbox-runtime.js', 'home-widgets-runtime.js', 'view-runtime.js', 'tournament-share-runtime.js', 'app-state-store.js', 'home-freeroll-runtime.js'];

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

const publicLibDir = path.join(publicDir, 'lib');
if (!fs.existsSync(publicLibDir)) {
  fs.mkdirSync(publicLibDir, { recursive: true });
}

for (const file of libFilesToCopy) {
  const src = path.join(root, 'lib', file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(publicLibDir, file));
    console.log('Copied:', path.join('lib', file));
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

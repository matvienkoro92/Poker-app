#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const sourceDir = path.join(root, 'assets');
const outputDir = path.join(root, 'archived-assets');
const archivePattern = /(?:^|\/)rating-\d{2}-(?:0[1-5])-2026/i;

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

function collectFiles(dir, prefix) {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const absolute = path.join(dir, name);
    const relative = prefix ? path.join(prefix, name) : name;
    if (fs.statSync(absolute).isDirectory()) out.push(...collectFiles(absolute, relative));
    else if (archivePattern.test(relative.replace(/\\/g, '/'))) out.push(relative);
  }
  return out;
}

const files = collectFiles(sourceDir, '').sort();
let bytes = 0;
for (const relative of files) {
  const source = path.join(sourceDir, relative);
  if (!fs.statSync(source).isFile()) continue;
  const destination = path.join(outputDir, relative);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(source, destination);
  bytes += fs.statSync(source).size;
}

fs.writeFileSync(
  path.join(outputDir, 'archive-manifest.json'),
  JSON.stringify({ generatedAt: new Date().toISOString(), files: files.length, bytes }, null, 2) + '\n'
);
console.log(`Season archive: ${files.length} files, ${(bytes / 1024 / 1024).toFixed(2)} MiB`);

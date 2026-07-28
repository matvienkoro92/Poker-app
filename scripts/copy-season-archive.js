#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const sourceDir = path.join(root, 'assets');
const outputDir = path.join(root, 'archived-assets');
const archivePattern = /^rating-\d{2}-(?:0[1-5])-2026/i;

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

const files = fs.readdirSync(sourceDir).filter((name) => archivePattern.test(name)).sort();
let bytes = 0;
for (const name of files) {
  const source = path.join(sourceDir, name);
  if (!fs.statSync(source).isFile()) continue;
  fs.copyFileSync(source, path.join(outputDir, name));
  bytes += fs.statSync(source).size;
}

fs.writeFileSync(
  path.join(outputDir, 'archive-manifest.json'),
  JSON.stringify({ generatedAt: new Date().toISOString(), files: files.length, bytes }, null, 2) + '\n'
);
console.log(`Season archive: ${files.length} files, ${(bytes / 1024 / 1024).toFixed(2)} MiB`);

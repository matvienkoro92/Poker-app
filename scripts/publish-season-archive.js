#!/usr/bin/env node
'use strict';
// Publish only existing public archive assets. Activate only after every GET matches SHA-256.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { put } = require('@vercel/blob');
const root = path.resolve(__dirname, '..');
const dir = path.join(root, 'public/assets');
const summer = process.argv.includes('--summer');
const pattern = summer ? /(?:^|\/)rating-\d{2}-0[6-8]-2026/i : /(?:^|\/)rating-\d{2}-0[1-5]-2026/i;
const sha = data => crypto.createHash('sha256').update(data).digest('hex');
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);
}
async function main() {
  const files = walk(dir).map(f => ({ file: path.relative(dir, f).split(path.sep).join('/'), data: fs.readFileSync(f) }))
    .filter(e => pattern.test(e.file)).sort((a, b) => a.file.localeCompare(b.file));
  if (!files.length) throw new Error('No local archive assets. Build with POKER_ARCHIVE_ASSET_BASE_URL="" first.');
  const entries = files.map(e => ({ file: e.file, bytes: e.data.length, sha256: sha(e.data) }));
  const id = sha(JSON.stringify(entries)).slice(0, 20);
  const prefix = 'rating-archive/' + (summer ? '2026-jun-aug/' : '2026-jan-may/') + id;
  const output = path.join(root, 'output/asset-audit');
  fs.mkdirSync(output, { recursive: true });
  console.log(JSON.stringify({ files: files.length, MiB: files.reduce((n, e) => n + e.data.length, 0) / 1048576, prefix }));
  if (!process.argv.includes('--apply')) return;
  if (!process.env.BLOB_READ_WRITE_TOKEN) throw new Error('BLOB_READ_WRITE_TOKEN is required');
  let cursor = 0, done = 0, baseUrl = '';
  const checkpoint = path.join(output, 'archive-upload-' + id + '.json');
  const uploaded = fs.existsSync(checkpoint) ? JSON.parse(fs.readFileSync(checkpoint, 'utf8')) : {};
  async function worker() {
    while (cursor < files.length) {
      const index = cursor++, entry = files[index];
      let url = uploaded[entry.file];
      if (!url) {
        const blob = await put(prefix + '/' + entry.file, entry.data, {
          access: 'public', addRandomSuffix: false, allowOverwrite: false,
          cacheControlMaxAge: 31536000,
        });
        url = blob.url;
        uploaded[entry.file] = url;
        fs.writeFileSync(checkpoint, JSON.stringify(uploaded, null, 2));
      }
      const expectedSuffix = '/' + entry.file;
      const decoded = decodeURI(url);
      if (!decoded.endsWith(expectedSuffix)) throw new Error('Unexpected Blob path');
      const candidateBase = decoded.slice(0, -expectedSuffix.length);
      if (baseUrl && baseUrl !== candidateBase) throw new Error('Mixed archive origins');
      baseUrl = candidateBase;
      const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
      if (!response.ok) throw new Error('Archive GET failed: ' + entry.file + ': ' + response.status);
      if (sha(Buffer.from(await response.arrayBuffer())) !== entries[index].sha256) throw new Error('Archive checksum mismatch: ' + entry.file);
      done++;
      if (done % 100 === 0) console.log('Uploaded and verified ' + done + '/' + files.length);
    }
  }
  const results = await Promise.allSettled(Array.from({ length: 8 }, worker));
  const failed = results.find(r => r.status === 'rejected');
  if (failed) throw failed.reason;
  const manifestPath = path.join(root, 'season-archive.json');
  const previous = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')) : {};
  const verified = { baseUrl, verifiedAt: new Date().toISOString(), files: entries };
  const manifest = summer ? { ...previous, summer: verified } : { ...previous, ...verified };
  fs.writeFileSync(path.join(root, 'season-archive.json'), JSON.stringify(manifest, null, 2) + '\n');
  console.log('Verified archive manifest saved: season-archive.json');
}
main().catch(e => { console.error(e.message); process.exitCode = 1; });

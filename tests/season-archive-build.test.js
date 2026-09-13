'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'scripts/copy-to-public.js'), 'utf8');
const program = source.slice(0, source.indexOf('if (!fs.existsSync(publicDir))')) +
  source.slice(source.indexOf('function collectAssetReferencesFromText'), source.indexOf('for (const dir of dirsToCopy)')) + '\ncopyReferencedAssets();';
function run(manifest, env = {}) {
  const copied = [];
  const shim = Object.assign({}, fs, {
    existsSync(p) { return p === path.join(root, 'season-archive.json') ? !!manifest : fs.existsSync(p); },
    readFileSync(p, options) { return p === path.join(root, 'season-archive.json') ? JSON.stringify(manifest) : fs.readFileSync(p, options); },
    rmSync() {}, mkdirSync() {}, copyFileSync(src, dest) { copied.push(path.relative(path.join(root, 'assets'), src)); },
  });
  vm.runInNewContext(program, { require: name => name === 'fs' ? shim : require(name), __dirname: path.join(root, 'scripts'), process: { env }, console: { log() {} } });
  return copied;
}
const pattern = /(?:^|\/)rating-\d{2}-0[1-5]-2026/i;
const local = run(null);
const entries = local.filter(f => pattern.test(f)).map(file => ({ file, sha256: crypto.createHash('sha256').update(fs.readFileSync(path.join(root, 'assets', file))).digest('hex') }));
const manifest = { baseUrl: 'https://example.test/archive', files: entries };
test('verified archive removes bulk files but preserves newspaper URLs and current season', () => {
  const copied = run(manifest);
  assert.ok(entries.length > 1000);
  assert.ok(local.length - copied.length > 1000);
  assert.ok(copied.includes('rating-05-04-2026-league1-crazy-main-event-frankl.png'));
  assert.ok(copied.includes('rating-06-03-2026-1.png'));
  assert.deepEqual(copied.filter(f => !pattern.test(f)), local.filter(f => !pattern.test(f)));
});
test('empty override restores local assets', () => assert.deepEqual(run(manifest, { POKER_ARCHIVE_ASSET_BASE_URL: '' }), local));
test('missing or changed archive hashes stop build', () => {
  assert.throws(() => run({ ...manifest, files: [] }), /not verified/);
  assert.throws(() => run({ ...manifest, files: entries.map(e => ({ ...e, sha256: 'incorrect' })) }), /not verified/);
});
test('image and thumbnail helpers route only archived screenshots to storage', () => {
  const code = fs.readFileSync(path.join(root, 'app-home-media.js'), 'utf8').split('function initImageLightbox()')[0];
  const context = { window: { POKER_ARCHIVE_ASSET_BASE_URL: manifest.baseUrl }, document: { baseURI: 'https://app.test/' }, URL };
  vm.createContext(context);
  vm.runInContext(code, context);
  assert.equal(context.getAssetUrl('rating-01-05-2026.png'), manifest.baseUrl + '/rating-01-05-2026.png');
  assert.equal(context.getRatingThumbnailUrl('rating-compressed-preview/rating-01-05-2026.avif'), manifest.baseUrl + '/rating-thumbnails/rating-compressed-preview/rating-01-05-2026.avif');
  assert.equal(context.getAssetUrl('rating-01-09-2026.png'), 'https://app.test/assets/rating-01-09-2026.png');
  context.window.POKER_ARCHIVE_ASSET_BASE_URL = '';
  assert.equal(context.getAssetUrl('rating-01-05-2026.png'), 'https://app.test/assets/rating-01-05-2026.png');
});

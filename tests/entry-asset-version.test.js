'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { versionEntryAssets } = require('../scripts/version-entry-assets');
test('published asset changes invalidate old HTTP URLs and keep preload URLs aligned', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'entry-assets-'));
  try {
    fs.writeFileSync(path.join(dir, 'app-view-router.js'), 'old admin-only villa');
    fs.writeFileSync(path.join(dir, 'styles.css'), 'body{}');
    const html = '<script src="./app-view-router.js?v=unchanged-date"></script><link rel="preload" href="./styles.css?v=old"><link rel="stylesheet" href="./styles.css?v=other"><script src="https://example.com/external.js"></script>';
    const old = versionEntryAssets(html, dir);
    assert.equal(versionEntryAssets(old, dir), old);
    fs.writeFileSync(path.join(dir, 'app-view-router.js'), 'villa for verified players');
    const updated = versionEntryAssets(html, dir);
    assert.notEqual(updated.match(/src="([^"]+)/)[1], old.match(/src="([^"]+)/)[1]);
    const css = [...updated.matchAll(/href="([^"]+)/g)].map(m => m[1]);
    assert.equal(css[0], css[1]);
    assert.ok(updated.includes('src="https://example.com/external.js"'));
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});

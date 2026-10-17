'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const { TOKEN_TTL_SEC, signAccessToken, verifyAccessToken } = require('../lib/admin-menu-access-token');
const source = fs.readFileSync(require.resolve('../app-admin-menu-password.js'), 'utf8');

test('server access lasts exactly 24 hours and remains scoped to the member and section', () => {
  const originalNow = Date.now;
  let now = 1800000000000;
  Date.now = () => now;
  try {
    assert.equal(TOKEN_TTL_SEC, 86400);
    const token = signAccessToken('admin', 'member', 'secret');
    now += 86400000 - 1000;
    assert.equal(verifyAccessToken(token, 'admin', 'member', 'secret'), true);
    assert.equal(verifyAccessToken(token, 'crm', 'member', 'secret'), false);
    assert.equal(verifyAccessToken(token, 'admin', 'other', 'secret'), false);
    now += 1000;
    assert.equal(verifyAccessToken(token, 'admin', 'member', 'secret'), false);
  } finally { Date.now = originalNow; }
});

test('saved access survives page reload and expires after one day', () => {
  let now = 1800000000000;
  const saved = new Map([['poker_admin_menu_access_admin', JSON.stringify({token:'signed-token', expiresAt:now + 86400000})]]);
  function load() {
    const context = {window:{}, document:{addEventListener(){}}, Date:{now:()=>now},
      localStorage:{getItem:key=>saved.get(key) || null}};
    vm.runInNewContext(source, context);
    return context.window;
  }
  assert.equal(load().pokerAdminMenuAccessToken('admin'), 'signed-token');
  now += 86400000 - 1;
  assert.equal(load().pokerHasAdminMenuAccess('admin'), true);
  assert.equal(load().pokerHasAdminMenuAccess('crm'), false);
  now += 1;
  assert.equal(load().pokerHasAdminMenuAccess('admin'), false);
  saved.set('poker_admin_menu_access_admin', 'broken');
  assert.equal(load().pokerHasAdminMenuAccess('admin'), false);
});

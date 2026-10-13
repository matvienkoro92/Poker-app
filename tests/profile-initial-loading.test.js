const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

test('profile renders cached identity before a delayed account response', async () => {
  const source = fs.readFileSync('app-profile.js', 'utf8');
  const body = source.slice(source.indexOf('function loadProfilePublicShowcaseInitial()'), source.indexOf('function initProfilePublicShowcase()'));
  const renders = [], loading = [];
  let reply;
  const ctx = vm.createContext({
    pokerReadProfileUserInfoSessionCache: () => ({ok: true, userName: 'Saved'}),
    refreshProfilePublicShowcase: data => renders.push(data),
    setProfilePublicShowcaseLoading: value => loading.push(value),
    loadCurrentProfileUserInfo: () => new Promise(resolve => { reply = resolve; })
  });
  vm.runInContext(body + '\nloadProfilePublicShowcaseInitial();', ctx);
  assert.equal(renders[0].userName, 'Saved');
  assert.deepEqual(loading, [false]);
  reply({ok: true, userName: 'Updated'});
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(renders.at(-1).userName, 'Updated');
});

test('hung profile request times out even when fetch does not settle', async () => {
  const source = fs.readFileSync('app-profile-user-info.js', 'utf8');
  const body = source.slice(source.indexOf('function pokerFetchProfileUserInfo('), source.indexOf('function loadCurrentProfileUserInfo()'));
  let timeout, aborted = false;
  const ctx = vm.createContext({
    fetch: () => new Promise(() => {}),
    AbortController: class { abort() { aborted = true; } },
    setTimeout: fn => { timeout = fn; return 1; }, clearTimeout: () => {}
  });
  vm.runInContext(body, ctx);
  const request = ctx.pokerFetchProfileUserInfo('/api/users');
  timeout();
  await assert.rejects(request, /timed out/);
  assert.equal(aborted, true);
});

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function setup() {
  const values = new Map([['poker_dt_id', 'ID100001']]);
  const storage = { getItem: key => values.get(key) || null, setItem: (key, value) => values.set(key, value) };
  const context = { window: {}, localStorage: storage, sessionStorage: storage, pokerApiHasCredential: () => true };
  vm.runInNewContext(fs.readFileSync(require.resolve('../app-friend-affinity.js'), 'utf8'), context);
  return { api: context.window, storage };
}

test('preview ranks all friends by repeated clicks and successful message signals, including chat aliases', () => {
  const { api } = setup();
  const rows = [{userId:'ID100002'}, {userId:'ID100003',chatUserId:'tg_42'}, {userId:'ID100004'}, {userId:'ID100005'}];
  api.pokerRecordFriendInteraction('ID100005', 'profile');
  api.pokerRecordFriendInteraction('ID100005', 'profile');
  api.pokerRecordFriendInteraction('tg_42', 'message');
  api.pokerRecordFriendInteraction('ID999999', 'message');
  assert.deepEqual(Array.from(api.pokerRankFriendPreview(rows).slice(0,3), r => r.userId), ['ID100003','ID100005','ID100002']);
  assert.equal(rows[0].userId, 'ID100002');
});

test('account histories are isolated and absent or corrupt history yields stable ordering', () => {
  const { api, storage } = setup();
  const rows = [{userId:'ID100003'}, {userId:'ID100002'}];
  api.pokerRecordFriendInteraction('tg_ID100003', 'profile');
  assert.equal(api.pokerRankFriendPreview(rows)[0].userId, 'ID100003');
  storage.setItem('poker_dt_id', 'ID200001');
  assert.equal(api.pokerRankFriendPreview(rows)[0].userId, 'ID100002');
  storage.setItem('poker_friend_affinity_v1:ID200001', 'invalid');
  assert.equal(api.pokerRankFriendPreview(rows)[0].userId, 'ID100002');
});

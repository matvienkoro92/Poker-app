const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const { pokerProfileStatusFromCachedProfile } = require('../lib/chat-profile-status');
function loadFunction(file, from, to, context) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  vm.runInContext(source.slice(source.indexOf(from), source.indexOf(to)), context);
}
test('leaderboard XP uses the same calculation as the player profile', () => {
  const ctx = vm.createContext({ parseProfile: v => v, profileTotal: p => p.totalCounter, isoFromMs: () => '', pokerProfileStatusFromCachedProfile });
  loadFunction('lib/api-handlers/player-crm.js', 'function buildPokerPlusAccounts(', 'function betterPublicPokerLevelRow(', ctx);
  for (const fee of [0, 3499, 3500, 1900000, 100000000]) {
    const profile = { totalCounter: { fee, mttCount: 7, mttFirstCount: 1 } };
    const status = pokerProfileStatusFromCachedProfile(profile, { pokerPlusLinked: true });
    const [row] = ctx.buildPokerPlusAccounts({ pokerplusBind: { player: '123' }, pokerplusProfiles: { player: profile } });
    assert.equal(row.level, status.level);
    assert.equal(row.levelXp, Math.max(0, Math.floor(status.points - status.levelStart)));
    assert.equal(row.levelXpTarget, status.nextStart - status.levelStart);
  }
});
test('XP rendering handles real zero, missing data, invalid data and max level', () => {
  const ctx = vm.createContext({ hallFishEsc: v => String(v ?? ''), hallFishLevelPlayerImage: () => ({ src: '', kind: 'avatar' }), hallFishLevelAgeText: () => '' });
  loadFunction('app-hall-fame.js', 'function hallFishLevelRowHtml(', 'function hallFishSearchLatinToCyrillic(', ctx);
  const row = { name: 'Test', level: 71, levelXp: 0, levelXpTarget: 60000 };
  assert.match(ctx.hallFishLevelRowHtml(row, 3, ''), /aria-valuenow="0"/);
  for (const patch of [{levelXp:null}, {levelXp:NaN}, {levelXpTarget:0}, {levelXpTarget:-1}]) {
    assert.doesNotMatch(ctx.hallFishLevelRowHtml({...row,...patch},3,''), /role="meter"/);
  }
  assert.match(ctx.hallFishLevelRowHtml({...row,levelXp:999999},3,''), /aria-valuenow="60000"/);
  assert.match(ctx.hallFishLevelRowHtml(row,3,'hall-fish-level-row--sticky'), /__you">Вы/);
});

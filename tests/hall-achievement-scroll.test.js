const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require.resolve('../app-hall-fame.js'), 'utf8');
const code = source.slice(source.indexOf('function hallFishSetAchievementState('), source.indexOf('function hallFishSetBirthdaysState('));
test('achievement rerender retains trophy, month and body scroll positions', () => {
  let strips = { '.hall-fish-achievement-tabs': { scrollLeft: 540 }, '.hall-fish-day-hero-months': { scrollLeft: 120 } };
  const body = { scrollTop: 80, querySelector: s => strips[s], set innerHTML(value) { this.scrollTop = 0; strips = { '.hall-fish-achievement-tabs': { scrollLeft: 0 }, '.hall-fish-day-hero-months': { scrollLeft: 0 } }; } };
  const c = { document: { getElementById: id => id === 'hallFishRatingBody' ? body : null }, hallFishDetachEmbeddedVote() {}, hallFishEnsureModal: () => ({ hidden: false }), hallFishSetSubtitle() {}, hallFishUpdateTabs() {}, hallFishRenderAchievementRows: () => '<div>new selected award</div>', hallFishRenderAchievementSkeleton: () => '' };
  vm.createContext(c); vm.runInContext(code, c);
  c.hallFishSetAchievementState('', {});
  assert.equal(strips['.hall-fish-achievement-tabs'].scrollLeft, 540);
  assert.equal(strips['.hall-fish-day-hero-months'].scrollLeft, 120);
  assert.equal(body.scrollTop, 80);
});

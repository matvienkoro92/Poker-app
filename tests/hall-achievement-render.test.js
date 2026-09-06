const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
test('achievement rows render for every tab with populated tournament data', () => {
  const context = { console, URLSearchParams, URL, window: { addEventListener() {} }, document: {
    getElementById() { return null; }, querySelector() { return null; }, querySelectorAll() { return []; }, addEventListener() {}
  }, setTimeout() {}, clearTimeout() {}, localStorage: { getItem() { return null; } }, location: { search: '' } };
  vm.createContext(context);
  for (const file of ['app-rating-view-adapter.js', 'app-hall-fame.js', 'club-news-data.js']) {
    vm.runInContext(fs.readFileSync(require.resolve('../' + file), 'utf8'), context, { filename: file });
  }
  const data = context.hallFishAggregateTournamentAchievements([]);
  assert.ok(data.dayHero.length > 0);
  for (const spec of context.hallFishAchievementSpecs(data)) {
    const html = context.hallFishAchievementSectionHtml(spec.sectionTitle, data.dayHero.slice(0, 2), spec.description, spec.key, spec.awardText);
    assert.match(html, /hall-fish-achievement-row/);
  }
  const html = context.hallFishRenderAchievementRows(data);
  assert.match(html, /25 000 ₽/);
  assert.match(html, /hall-fish-achievement-row/);
});

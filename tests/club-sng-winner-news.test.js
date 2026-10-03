const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require('node:path').join(__dirname, '../app-home-friend-news.js'), 'utf8');
function context(extra = {}) {
  const ctx = vm.createContext({ clubProfileForNick: () => null, clubNewsFallbackAvatar: () => './avatar.webp', esc: value => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'), ...extra });
  vm.runInContext(source.slice(source.indexOf('  function clubSngWinnerPosts('), source.indexOf('  function clubAchievementPosts()')), ctx);
  return ctx;
}
test('completed SNG produces dated champion card and ordered podium', () => {
  const rows = context().clubSngWinnerPosts([{ title: '3й СНГ-баттл Лига чемпионов Два туза', completedAt: '2026-10-03T10:49:22.629Z', winners: [{ place: 2, nick: 'Пряник' }, { place: 1, nick: 'Jeweler' }, { place: 3, nick: 'VRay' }] }]);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].date, '2026-10-03T10:49:22.629Z');
  assert.match(rows[0].html, /<h3>Jeweler<\/h3>/);
  assert.match(rows[0].html, /Победитель СНГ-турнира/);
  assert.ok(rows[0].html.indexOf('value="1"') < rows[0].html.indexOf('value="2"'));
  assert.match(rows[0].html, /VRay/);
});
test('unfinished results are skipped and team champions are escaped', () => {
  const ctx = context();
  assert.equal(ctx.clubSngWinnerPosts([{ winners: [{ place: 1, nick: 'Pending' }] }, { completedAt: '2026-10-03', winners: [] }]).length, 0);
  const posts = ctx.clubSngWinnerPosts([{ title: '<team>', completedAt: '2026-10-03', winners: [{ place: 1, nick: '<A>' }, { place: 1, nick: 'B' }] }]);
  assert.match(posts[0].html, /&lt;A> и B/);
  assert.match(posts[0].html, /Победители СНГ-турнира/);
});
test('winner loader refreshes open news once and retains previous rows on failure', async () => {
  let renders = 0;
  const rows = [{ title: 'SNG', completedAt: '2026-10-03', winners: [{ place: 1, nick: 'Jeweler' }] }];
  const ctx = context({ clubSngNewsRows: [], clubSngNewsPromise: null, clubSngNewsCheckedAt: 0, apiBase: () => 'https://example.test', cachedFetchJson: async () => ({ ok: true, rows }), newsModalMode: 'club', clubNewsTab: 'news', renderModalList: () => renders++ });
  ctx.loadClubSngWinnerNews();
  await ctx.clubSngNewsPromise;
  assert.equal(ctx.clubSngNewsRows, rows);
  assert.equal(renders, 1);
  ctx.loadClubSngWinnerNews();
  assert.equal(ctx.clubSngNewsPromise, null);
  ctx.clubSngNewsCheckedAt = 0;
  ctx.cachedFetchJson = async () => { throw new Error('offline'); };
  ctx.loadClubSngWinnerNews();
  await ctx.clubSngNewsPromise;
  assert.equal(ctx.clubSngNewsRows, rows);
});

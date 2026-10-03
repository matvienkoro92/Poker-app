const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require('node:path').join(__dirname, '../app-home-friend-news.js'), 'utf8');
function context(extra = {}) {
  const ctx = vm.createContext({ clubProfileForNick: () => null, clubNewsFallbackAvatar: () => './avatar.webp', esc: value => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'), ...extra });
  ctx.window = ctx;
  ctx.escapeHtml = ctx.esc;
  ctx.sngPlayerArt = entry => entry.pokerPlusNickname === 'Jeweler' ? './assets/club-news-personal/jeweler-personal-v1.webp?v=1' : './avatar.webp';
  ctx.playerName = entry => entry.nick || entry.displayName;
  ctx.playerInitial = entry => ctx.playerName(entry).slice(0, 1);
  const archive = fs.readFileSync(require('node:path').join(__dirname, '../app-sng-champions.js'), 'utf8');
  vm.runInContext(archive.slice(archive.indexOf('  function renderCompletedTournamentOption('), archive.indexOf('  function renderTournamentMenu(')), ctx);
  vm.runInContext(source.slice(source.indexOf('  function clubSngWinnerPosts('), source.indexOf('  function clubAchievementPosts()')), ctx);
  return ctx;
}
test('completed SNG produces dated champion card and ordered podium', () => {
  const rows = context().clubSngWinnerPosts([{ title: '3й СНГ-баттл Лига чемпионов Два туза', completedAt: '2026-10-03T10:49:22.629Z', winners: [{ place: 2, nick: 'Пряник' }, { place: 1, nick: 'Jeweler' }, { place: 3, nick: 'VRay' }] }]);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].date, '2026-10-03T10:49:22.629Z');
  assert.match(rows[0].html, /<strong>Jeweler<\/strong>/);
  assert.match(rows[0].html, /Чемпион турнира/);
  assert.ok(rows[0].html.indexOf('value="1"') < rows[0].html.indexOf('value="2"'));
  assert.match(rows[0].html, /VRay/);
  assert.match(rows[0].html, /jeweler-personal-v1/);
  assert.match(rows[0].html, /sng-champions-modal__completed-winner/);
  assert.doesNotMatch(rows[0].html, /sng-champions-prize-ticket/);
});
test('unfinished results are skipped and team champions are escaped', () => {
  const ctx = context();
  assert.equal(ctx.clubSngWinnerPosts([{ winners: [{ place: 1, nick: 'Pending' }] }, { completedAt: '2026-10-03', winners: [] }]).length, 0);
  const posts = ctx.clubSngWinnerPosts([{ title: '<team>', completedAt: '2026-10-03', winners: [{ place: 1, nick: '<A>' }, { place: 1, nick: 'B' }] }]);
  assert.match(posts[0].html, /&lt;A> и B/);
  assert.match(posts[0].html, /Чемпионы турнира/);
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

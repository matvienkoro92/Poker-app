const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require.resolve('../app-hall-fame.js'), 'utf8');
function setup() {
  const rows = Array.from({ length: 485 }, (_, i) => ({ nick: 'Player' + (i + 1) }));
  const c = { hallFishLevelVisibleCount: 20, hallFishRatingRowsCache: rows,
    hallFishFindMyLevelRow: () => null,
    hallFishLevelRowHtml: (row, rank) => '<article data-rank="' + rank + '">' + row.nick + '</article>' };
  vm.createContext(c);
  vm.runInContext(source.slice(source.indexOf('function hallFishLevelBatchHtml('), source.indexOf('function hallFishRenderRows(')), c);
  return { c, rows };
}
test('initial list renders 20 out of 485 players and next batch preserves ranks', () => {
  const { c, rows } = setup();
  const html = c.hallFishRenderLevelResults(rows, [], '');
  assert.equal((html.match(/<article/g) || []).length, 20);
  assert.match(html, /Ещё 20 · показано 20 из 485/);
  const next = c.hallFishLevelBatchHtml(rows, [], 20, 40);
  assert.equal((next.match(/<article/g) || []).length, 20);
  assert.match(next, /data-rank="21"/);
  assert.match(next, /data-rank="40"/);
});
test('search results retain overall ranks and final batch removes the button', () => {
  const { c, rows } = setup();
  assert.match(c.hallFishRenderLevelResults([rows[400]], [], 'Player401'), /data-rank="401"/);
  c.hallFishLevelVisibleCount = 480;
  assert.match(c.hallFishLevelMoreHtml(rows.length), /Ещё 5/);
  assert.equal((c.hallFishLevelBatchHtml(rows, [], 480, 500).match(/<article/g) || []).length, 5);
  c.hallFishLevelVisibleCount = 500;
  assert.equal(c.hallFishLevelMoreHtml(rows.length), '');
});
test('own player stays accessible below the first page', () => {
  const { c, rows } = setup();
  c.hallFishFindMyLevelRow = () => ({ row: rows[400], rank: 401 });
  const html = c.hallFishRenderLevelResults(rows, [], '');
  assert.match(html, /hall-fish-level-sticky-mine/);
  assert.match(html, /data-rank="401"/);
});

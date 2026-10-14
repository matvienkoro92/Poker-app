const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync(require.resolve('../app-hall-fame.js'), 'utf8');
function setup(available = true) {
  const ids = [];
  const context = vm.createContext({
    window: { pokerGarageHallMediaHtml: id => { ids.push(id); return available ? '<span data-hall-showcase="' + id + '"></span>' : ''; } },
    hallFishEsc: v => String(v ?? ''),
    hallFishLevelPlayerImage: () => ({ src: 'fallback.webp', kind: 'avatar' }),
  });
  vm.runInContext(source.slice(source.indexOf('function hallFishLevelRowHtml('), source.indexOf('function hallFishSearchLatinToCyrillic(')), context);
  return { render: context.hallFishLevelRowHtml, ids };
}
const player = { accountId: 'tg_123', p21Id: '999', name: 'Игрок', level: 75 };
test('level rows and pinned self use account-bound garage media and keep one profile button', () => {
  const h = setup();
  for (const extra of ['', 'hall-fish-level-row--sticky']) {
    const html = h.render(player, 3, extra);
    assert.match(html, /data-hall-showcase="tg_123"/);
    assert.doesNotMatch(html, /fallback.webp/);
    assert.equal((html.match(/<button\b/g) || []).length, 1);
    assert.match(html, /data-user-id="tg_123"/);
  }
  assert.deepEqual(h.ids, ['tg_123', 'tg_123']);
});
test('restricted garage access, missing accounts and SNG rows preserve avatar media', () => {
  assert.match(setup(false).render(player, 1, ''), /fallback.webp/);
  const h = setup();
  assert.match(h.render({ ...player, accountId: '' }, 1, ''), /fallback.webp/);
  assert.match(h.render(player, 1, 'hall-fish-level-row--sng-finalist'), /fallback.webp/);
  assert.deepEqual(h.ids, []);
});

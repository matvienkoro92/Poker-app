'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
function runtime() {
  const source = fs.readFileSync(require('node:path').join(__dirname, '../app-rating-view-adapter.js'), 'utf8');
  const c = { window: {}, escapeHtmlRating: s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') };
  vm.createContext(c);
  vm.runInContext(source.slice(source.indexOf('var SUMMER_RATING_PLAYER_ART_BY_NICK'), source.indexOf('function syncWinterRatingPlayerModalArt')), c);
  return c;
}
test('current podium gives every known player an explicit scale in every position', () => {
  const c = runtime();
  for (const nick of Object.keys(c.SUMMER_RATING_PLAYER_ART_BY_NICK)) {
    for (const slot of ['left', 'center', 'right']) {
      const value = c.summerRatingTop3ArtSizeStyle(slot, nick);
      assert.match(value, /^--summer-top3-art-(left|center|right)-size:\d+(\.\d+)?%;$/);
    }
  }
  assert.equal(c.summerRatingTop3ArtSizeStyle('left', 'Waaar').split(':')[1], c.summerRatingTop3ArtSizeStyle('right', 'Waaar').split(':')[1]);
});
test('participants without personal artwork leave their podium place empty', () => {
  const c = runtime();
  assert.equal(c.summerRatingPlayerArtCssUrl('Бардюр'), 'none');
  assert.equal(c.summerRatingPlayerArtCssUrl(''), 'none');
  assert.ok(!c.summerRatingPlayerArtCssUrl('<').includes('<'));
  assert.equal(c.summerRatingLowerArtSizeStyle(4, 'Новый игрок'), '');
  assert.equal(c.summerRatingTop3ArtSizeStyle('right', 'Бардюр'), '');
});
test('summer archive retains its original top-three sizes', () => {
  const c = runtime();
  c.window.__pokerSummerArchive = true;
  assert.equal(c.summerRatingTop3ArtSizeStyle('left', 'Waaar'), '--summer-top3-art-left-size:22.4%;');
  assert.equal(c.summerRatingTop3ArtSizeStyle('center', 'ПокерМанки'), '--summer-top3-art-center-size:38.1%;');
});

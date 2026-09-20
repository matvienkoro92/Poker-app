'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function handler() {
  const source = fs.readFileSync(require.resolve('../app-club-reviews.js'), 'utf8');
  const start = source.indexOf("  document.addEventListener('click',function(e){var el=e.target.closest('[data-review-action]')");
  const end = source.indexOf('  window.initClubReviews=', start);
  const opened = [];
  let click;
  vm.runInNewContext(source.slice(start, end), {
    document: { addEventListener(type, fn) { click = fn; } },
    busy: false,
    open(id) { opened.push(id); }
  });
  return { opened, click(el) { click({target: {closest() {return el;}}}); } };
}

test('clicking a topic invokes its opening action, including after using emoji menu', () => {
  const h = handler();
  h.click({dataset: {reviewAction: 'open', id: 'topic-1'}});
  assert.deepEqual(h.opened, ['topic-1']);
  const picker = {hidden: true};
  const attrs = {};
  const emoji = {dataset: {reviewAction: 'emoji-toggle'}, parentElement: {querySelector() {return picker;}}, setAttribute(k,v) {attrs[k]=v;}};
  h.click(emoji);
  assert.equal(picker.hidden, false);
  assert.equal(attrs['aria-expanded'], 'true');
  h.click(emoji);
  assert.equal(picker.hidden, true);
  assert.equal(attrs['aria-expanded'], 'false');
  h.click({dataset: {reviewAction: 'open', id: 'topic-2'}});
  assert.deepEqual(h.opened, ['topic-1', 'topic-2']);
});

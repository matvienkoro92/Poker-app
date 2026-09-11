#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
async function main() {
  const source = fs.readFileSync(path.join(__dirname, '../app-home-friend-news.js'), 'utf8');
  const patch = source.slice(source.indexOf('  function patchNewsList('), source.indexOf('  function renderModalList('));
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    await page.setContent('<div id="list"></div>');
    await page.addScriptTag({ content: patch });
    const result = await page.evaluate(() => {
      const list = document.getElementById('list');
      const card = (id, count, src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="20" height="20"/%3E') =>
        `<article data-home-news-event-id="${id}"><img src='${src}'><b>${count}</b><textarea></textarea><small data-news-admin-telegram="${id}"></small></article>`;
      patchNewsList(list, card('a', 1) + card('b', 2));
      const a = list.firstChild, b = list.lastChild, img = a.querySelector('img'), input = a.querySelector('textarea');
      input.value = 'Черновик комментария'; input.focus(); input.setSelectionRange(4, 9);
      a.querySelector('small').textContent = '@player';
      let mutations = 0;
      const observer = new MutationObserver(() => {});
      observer.observe(list, { childList: true, subtree: true, attributes: true });
      patchNewsList(list, card('a', 1) + card('b', 2));
      mutations = observer.takeRecords().length;
      patchNewsList(list, card('a', 3) + card('b', 2));
      const updates = observer.takeRecords();
      const stable = list.firstChild === a && a.querySelector('img') === img && document.activeElement === input && input.value === 'Черновик комментария' && input.selectionStart === 4 && input.selectionEnd === 9;
      const feedback = a.querySelector('b').textContent;
      const admin = a.querySelector('small').textContent;
      patchNewsList(list, card('b', 2) + card('a', 3));
      const reordered = list.firstChild === b && list.lastChild === a && a.querySelector('img') === img;
      patchNewsList(list, card('a', 4));
      const removed = list.children.length === 1 && list.firstChild === a && !b.isConnected;
      patchNewsList(list, card('a', 5, 'data:image/svg+xml,new-image'));
      const changedImage = a.querySelector('img') === img && img.getAttribute('src') === 'data:image/svg+xml,new-image';
      patchNewsList(list, card('a', 1) + card('a', 2));
      patchNewsList(list, card('a', 3) + card('a', 4));
      const duplicates = list.children.length === 2 && list.children[0].querySelector('b').textContent === '3' && list.children[1].querySelector('b').textContent === '4';
      return { mutations, stable, feedback, admin, reordered, removed, changedImage, duplicates, imageMutations: updates.filter(r => r.target === img).length };
    });
    assert.deepEqual(result, { mutations: 0, stable: true, feedback: '3', admin: '@player', reordered: true, removed: true, changedImage: true, duplicates: true, imageMutations: 0 });
    console.log('News DOM update passed: unchanged refresh, feedback, image identity, focus/draft, reorder, removal, genuine image update.');
  } finally { await browser.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });

const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync(require.resolve('../app-home-friend-news.js'), 'utf8');
const start = source.indexOf('          Promise.all([', source.indexOf('var openAchievements = function'));
const code = source.slice(start, source.indexOf('          return;', start));
test('achievement dialog waits for styles even when scripts already loaded', async () => {
  let finishStyles;
  let opened = 0;
  const context = { window: {
    pokerEnsureStyleDomains: () => new Promise(resolve => { finishStyles = resolve; }),
    pokerEnsureScriptDomains: () => Promise.resolve()
  }, openAchievements: () => { opened++; return true; }, resetAchievementsButton() {} };
  const pending = vm.runInNewContext(code, context);
  await Promise.resolve();
  assert.equal(opened, 0);
  finishStyles();
  await pending;
  assert.equal(opened, 1);
});
test('failed style load preserves news and resets the button', async () => {
  let reset = 0;
  const context = { window: {
    pokerEnsureStyleDomains: () => Promise.reject(new Error('offline')),
    pokerEnsureScriptDomains: () => Promise.resolve()
  }, openAchievements: () => { throw new Error('must not open'); }, resetAchievementsButton() { reset++; }, returnToClubNewsAfterAchievements: true };
  await vm.runInNewContext(code, context);
  assert.equal(reset, 1);
  assert.equal(context.returnToClubNewsAfterAchievements, false);
});

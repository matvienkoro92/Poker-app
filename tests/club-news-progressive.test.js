const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
test('news publishes available sources before a slow rating source and tolerates failure', async () => {
  const source = fs.readFileSync(path.join(__dirname, '../app-home-friend-news.js'), 'utf8');
  const start = source.indexOf('  function publishClubNewsProgressively(');
  const end = source.indexOf('  function loadClubNews(force)',start);
  const ctx = vm.createContext({});
  vm.runInContext(source.slice(start,end),ctx);
  let finishRating;
  const updates = [];
  const pending = ctx.publishClubNewsProgressively([
    Promise.resolve({levelRows:[{name:'player'}]}),
    Promise.resolve({winners:[{name:'winner'}]}),
    new Promise(resolve => {finishRating=resolve;}),
    Promise.reject(new Error('optional source offline'))
  ], (rows,complete) => updates.push({rows,complete}));
  await new Promise(resolve=>setImmediate(resolve));
  assert.ok(updates.some(update=>update.rows[1].winners?.length===1));
  assert.ok(updates.every(update=>!update.complete));
  finishRating({player:{place:1}});
  await pending;
  assert.equal(updates.at(-1).complete,true);
  assert.equal(updates.at(-1).rows[2].player.place,1);
  assert.equal(updates.at(-1).rows[3].failed,true);
});

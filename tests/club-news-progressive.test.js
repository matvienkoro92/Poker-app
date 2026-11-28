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

test('five sources settling together produce one complete publish instead of five rebuilds',async()=>{
 const source=fs.readFileSync(path.join(__dirname,'../app-home-friend-news.js'),'utf8');
 const ctx=vm.createContext({});vm.runInContext(source.slice(source.indexOf('  function publishClubNewsProgressively('),source.indexOf('  var clubNewsSourcePromise')),ctx);
 const updates=[];await ctx.publishClubNewsProgressively(Array.from({length:5},(_,i)=>Promise.resolve({index:i})),(rows,complete)=>updates.push({rows,complete}));
 assert.equal(updates.length,1);assert.equal(updates[0].complete,true);assert.equal(updates[0].rows.length,5);
});


test('club birthdays show one greeting for duplicate player profiles', () => {
  const source = fs.readFileSync(path.join(__dirname, '../app-home-friend-news.js'), 'utf8');
  const ctx = vm.createContext({
    friendId: player => player.userId,
    friendName: player => player.pokerPlusNickname,
    friendAvatar: () => '',
  });
  for (const [start, end] of [
    ['  function matchKey(', '  function clubProfileForNick('],
    ['  function dedupeClubBirthdays(', '  function achievementEvents('],
  ]) {
    vm.runInContext(source.slice(source.indexOf(start), source.indexOf(end)), ctx);
  }
  const profile = { pokerPlusNickname: 'Damir86rus', profileBirthDate: '1990-11-28' };
  const rows = ctx.dedupeClubBirthdays(ctx.clubBirthdayEvents([
    { ...profile, userId: 'profile-1' },
    { ...profile, userId: 'profile-2', pokerPlusNickname: '@DAMIR86RUS' },
    { ...profile, userId: 'profile-2', pokerPlusNickname: 'AlternateNick' },
    { ...profile, userId: 'profile-3', pokerPlusNickname: 'AnotherPlayer' },
  ], '2026-11-28').concat({ type: 'birthday', actorNick: 'Damir86rus', newsLines: ['День рождения'] }));
  assert.equal(rows.length, 2);
  assert.equal(rows[0].actorNick, 'Damir86rus');
  assert.equal(rows[0].newsLines[0], 'День рождения · Исполнилось 36 лет');
  assert.equal(rows[1].actorNick, 'AnotherPlayer');
});

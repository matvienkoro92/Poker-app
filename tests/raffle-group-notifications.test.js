const test=require('node:test'),assert=require('node:assert/strict');
const {createRaffleGroupNotifier}=require('../lib/raffle-group-notifications');
test('only active ticket raffles are announced once with direct link',async()=>{
 const store=new Map(),sent=[];const notify=createRaffleGroupNotifier({botToken:'test',eventChatId:async()=>'-1001227353220',pipeline:async commands=>commands.map(([cmd,key,value,...args])=>{if(cmd==='DEL'){store.delete(key);return {result:1}}if(args.includes('NX')&&store.has(key))return {result:null};store.set(key,value);return {result:'OK'}}),sendTelegramMessage:async(token,payload)=>{sent.push(payload);return {ok:true}}});
 const r={id:'abc',title:'Билеты в Меджик',status:'active',prizeKind:'tournament_ticket'};
 await notify({...r,status:'draft'});await notify({...r,prizeKind:'cash'});assert.equal(sent.length,0);
 await notify(r);await notify(r);assert.equal(sent.length,1);assert.equal(sent[0].chatId,'-1001227353220');assert.equal(sent[0].notificationScope,'raffle-start');assert.equal(sent[0].parseMode,'HTML');assert.match(sent[0].buttonUrl,/startapp=r_abc$/);
});
test('announcement includes total, quantities, values and tournament description with time',()=>{
 const {buildRaffleAnnouncement}=require('../lib/raffle-group-notifications');
 const text=buildRaffleAnnouncement({title:'Розыгрыш',groups:[{count:5,prize:'Беккинг-билет 1 000 ₽ — Меджик 18:00 МСК'}]});
 assert.match(text,/Общая сумма: 5\s000 ₽/);assert.match(text,/5 бил. по 1\s000 ₽/);assert.match(text,/Меджик 18:00 МСК/);
 assert.match(text,/Розыгрыш\n\n<b>Общая сумма: 5\s000 ₽<\/b>\n\n•/);
});

const { createRaffleCompletedGroupNotifier, buildRaffleCompletedAnnouncement } = require('../lib/raffle-group-notifications');
function completedHarness() {
  const store = new Map(), sent = [];
  let fail = false, chat = '-1001227353220';
  const notify = createRaffleCompletedGroupNotifier({
    botToken: 'test', eventChatId: async () => chat,
    pipeline: async commands => commands.map(([cmd, key, value, ...args]) => {
      if (cmd === 'GET') return { result: store.get(key) || null };
      if (cmd === 'DEL') { store.delete(key); return { result: 1 }; }
      if (args.includes('NX') && store.has(key)) return { result: null };
      store.set(key, value); return { result: 'OK' };
    }),
    sendTelegramMessage: async (token, payload) => { if (fail) return { ok: false }; sent.push(payload); return { ok: true }; },
  });
  return { notify, sent, store, setFail(value) { fail = value; }, setChat(value) { chat = value; } };
}
test('completion announces actual winners for all prize types, with a button to completed results', async () => {
  const h = completedHarness();
  for (const prizeKind of ['cash', 'tournament_ticket']) {
    await h.notify({ id: prizeKind, completedNumber: 42, status: 'drawn', prizeKind, title: 'Вечерний розыгрыш', totalWinners: 10, winners: [{ userId: '1' }, { userId: '2' }] });
  }
  assert.equal(h.sent.length, 2);
  for (const message of h.sent) {
    assert.equal(message.chatId, '-1001227353220');
    assert.equal(message.notificationScope, 'raffle-completed');
    assert.match(message.text, /Розыгрыш завершён!/);
    assert.match(message.text, /Победителей: 2\n/);
    assert.equal(message.buttonText, 'Посмотреть розыгрыш');
    assert.match(message.buttonUrl, /startapp=raffle_42$/);
    assert.equal(message.parseMode, "HTML");
  }
});
test('completion ignores unfinished/cancelled raffles and deduplicates parallel or repeated callbacks', async () => {
  const h = completedHarness(), raffle = { id: 'one', status: 'drawn', winners: [] };
  for (const status of ['active', 'draft', 'cancelled']) await h.notify({ ...raffle, status });
  assert.equal(h.sent.length, 0);
  await Promise.all([h.notify(raffle), h.notify(raffle)]);
  await h.notify(raffle);
  assert.equal(h.sent.length, 1);
  assert.match(h.sent[0].text, /Победителей: 0$/);
  assert.equal(h.store.get('poker_app:raffle_group_completed:one'), 'sent');
  assert.match(h.sent[0].buttonUrl, /startapp=raffle_one$/);
});
test('completion can retry a rejected send and does not consume delivery marker without a destination', async () => {
  const h = completedHarness(), raffle = { id: 'retry', status: 'drawn' };
  h.setChat(''); await h.notify(raffle); assert.equal(h.store.size, 0);
  h.setChat('-1001227353220'); h.setFail(true);
  await assert.rejects(h.notify(raffle)); assert.equal(h.store.size, 0);
  h.setFail(false); await h.notify(raffle); assert.equal(h.sent.length, 1);
  assert.match(buildRaffleCompletedAnnouncement(raffle), /Победителей: 0$/);
});

test('winners have safe mentions, ready players first and a separated reminder', () => {
  const text = buildRaffleCompletedAnnouncement({ title: '<Итоги>', winners: [
    { name: 'Ожидает', telegramUsername: '@waiting', userId: '12' },
    { name: 'Готов & игрок', userId: '34', winnerReady: true },
  ] });
  assert.match(text, /&lt;Итоги&gt;/);
  assert.match(text, /• Готов &amp; игрок — <a href="tg:\/\/user\?id=34">Готов &amp; игрок<\/a> ✅\n\n• Ожидает — @waiting\n\nНажмите «Готов», чтобы забрать билет\./);
});
test('ready changes edit the saved message and preserve its button', async () => {
  const store = new Map(), edits = []; let sends = 0;
  const notify = createRaffleCompletedGroupNotifier({ botToken: 'test', eventChatId: async () => '-1001',
    pipeline: async commands => commands.map(([cmd, key, value, ...args]) => {
      if (cmd === 'GET') return { result: store.get(key) || null };
      if (cmd === 'DEL') { store.delete(key); return { result: 1 }; }
      if (args.includes('NX') && store.has(key)) return { result: null };
      store.set(key, value); return { result: 'OK' };
    }),
    sendTelegramMessage: async () => { sends++; return { ok: true, messageId: 75 }; },
    editTelegramMessage: async (_, payload) => { edits.push(payload); return { ok: true }; },
  });
  const raffle = { id: 'update', status: 'drawn', winners: [{ name: 'Игрок', telegramUsername: 'player' }] };
  await notify(raffle);
  raffle.winners[0].winnerReady = true;
  await notify(raffle);
  assert.equal(sends, 1); assert.equal(edits.length, 1);
  assert.equal(edits[0].messageId, 75); assert.equal(edits[0].chatId, '-1001');
  assert.match(edits[0].text, /@player ✅/); assert.doesNotMatch(edits[0].text, /Нажмите/);
  assert.equal(edits[0].buttonText, 'Посмотреть розыгрыш');
});

test('reroll retains unclaimed players separately and marks replacement winners', () => {
  const text = buildRaffleCompletedAnnouncement({ winners: [
    { name: 'Первый', telegramUsername: 'first', winnerReadyExpired: true, winnerReadyState: 'missed' },
    { name: 'Второй', telegramUsername: 'second', winnerReroll: true, winnerReady: true },
    { name: 'Третий', telegramUsername: 'third', winnerReroll: true },
    { name: 'Четвертый', telegramUsername: 'fourth', winnerBurned: true },
    { name: 'Пятый', telegramUsername: 'fifth', winnerReady: true },
  ] });
  assert.match(text, /Победителей: 3/);
  assert.match(text, /• Пятый — @fifth ✅\n\nПобедители реролла:\n• Второй — @second ✅\n\n• Третий — @third/);
  assert.match(text, /Не забрали билет:\n• Первый — @first ❌ — не забрал\n• Четвертый — @fourth ❌ — не забрал/);
  assert.match(text, /\n\nНажмите «Готов»/);
});
test('no reminder remains when all tickets expired', () => {
  const text = buildRaffleCompletedAnnouncement({ winners: [{ name: 'Игрок', winnerReadyState: 'burned' }] });
  assert.match(text, /❌ — не забрал/);
  assert.match(text, /Победителей: 0/);
  assert.doesNotMatch(text, /Нажмите «Готов»/);
});

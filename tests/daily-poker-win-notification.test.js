const test = require('node:test');
const assert = require('node:assert/strict');
const notice = require('../lib/daily-poker-win-notification');
const game = { id: 'dpg_1794900000000_abcdef123456', hand_rank: 'four_of_a_kind',
  hole_cards_contribute: true, ticket_balance_credited: 800 };

test('only credited rare hands involving a hole card qualify', () => {
  for (const [hand_rank, amount] of [['four_of_a_kind', 800], ['straight_flush', 3000], ['royal_flush', 10000]]) {
    const win = { ...game, hand_rank, ticket_balance_credited: amount };
    assert.equal(notice.eligible(win), true);
    assert.match(notice.message(win, 'Игрок').text, /Игрок: Игрок/);
  }
  for (const patch of [{ hand_rank: 'full_house' }, { hand_rank: 'flush' },
    { hole_cards_contribute: false }, { board_only_reward_blocked: true }, { ticket_balance_credited: 0 }]) {
    assert.equal(notice.eligible({ ...game, ...patch }), false);
  }
});

test('sends combination, player, credited reward and spin link only once', async () => {
  const saved = new Map(), sent = [];
  const deps = { game, name: '<Коля>', playersGroup: async () => '-100123',
    commands: async commands => commands.map(([cmd, key, value, flag]) => {
      if (cmd === 'DEL') return saved.delete(key);
      if (flag === 'NX' && saved.has(key)) return null;
      saved.set(key, value); return 'OK';
    }),
    send: async payload => { sent.push(payload); return { ok: true, json: async () => ({ ok: true, result: { message_id: 12 } }) }; } };
  assert.equal(await notice.notify(deps), true);
  assert.equal(await notice.notify(deps), false);
  assert.equal(sent.length, 1);
  assert.match(sent[0].text, /Каре/);
  assert.match(sent[0].text, /<Коля>/);
  assert.match(sent[0].text, /800 ₽/);
  assert.equal(new URL(sent[0].reply_markup.inline_keyboard[0][0].url).searchParams.get('startapp'), 'daily_poker');
});

test('missing group and ineligible wins never send; timeout cannot duplicate', async () => {
  let sends = 0, claimed = false;
  const deps = { game, playersGroup: async () => '', commands: async () => {
    if (claimed) return [null]; claimed = true; return ['OK'];
  }, send: async () => { sends++; throw Error('timeout'); } };
  assert.equal(await notice.notify(deps), false);
  assert.equal(await notice.notify({ ...deps, game: { ...game, hand_rank: 'full_house' } }), false);
  deps.playersGroup = async () => '-100123';
  await assert.rejects(notice.notify(deps), /timeout/);
  assert.equal(await notice.notify(deps), false);
  assert.equal(sends, 1);
});

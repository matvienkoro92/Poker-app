const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require.resolve('../lib/api-handlers/raffles'), 'utf8');
const start = source.indexOf('    if (action === "addPrizeGroups" || action === "replacePrizeGroups") {');
const end = source.indexOf('\n    if (action === "setWinnerStatus")', start);
async function run(action, overrides = {}, admin = true, bodyExtra = {}) {
  let saved, response, status;
  const original = { id: 'cash', status: 'active', endDate: '2099-10-06T15:30:00.000Z', title: 'Old title', cardTitle: 'Old art title', prizeKind: 'cash', participants: ['one', 'two'], groups: [{ count: 7, prize: 'Кеш 1000 ₽' }, { count: 2, prize: 'Кеш 500 ₽' }], ...overrides };
  const context = { action, admin, body: { raffleId: 'cash', groups: [{ count: 5, prize: 'Беккинг-байин 2000 ₽ на видеостол' }], ...bodyExtra }, myId: 'admin',
    RAFFLE_PREFIX: 'raffle:', RAFFLE_PUBLIC_LIST_CACHE_KEY: 'public', RAFFLE_ADMIN_ACTIVE_LIST_CACHE_KEY: 'admin', RAFFLE_SUMMARY_CACHE_KEY: 'summary', RAFFLE_ARCHIVE_INDEX_CACHE_KEY: 'archive',
    redisPipeline: async commands => { if (commands[0][0] === 'GET') return [{ result: JSON.stringify(original) }]; saved = JSON.parse(commands[0][2]); return [{ result: 'OK' }]; },
    sanitizeRaffleGroupsToAppend: groups => groups.filter(g => g.count > 0 && g.prize),
    raffleGroupsTotalWinners: groups => groups.reduce((sum, g) => sum + g.count, 0),
    normalizeRafflePrizeKind: kind => kind, inferRafflePrizeKind: () => 'tournament_ticket', sanitizeRaffleForViewer: value => value,
    res: { status: code => { status = code; return { json: value => { response = value; } }; } }
  };
  await vm.runInNewContext('(async () => {' + source.slice(start, end) + '})()', context);
  return { saved, response, status, original };
}
test('replacement removes all old groups and keeps participants and draw time', async () => {
  const { saved, status, original } = await run('replacePrizeGroups');
  assert.equal(status, 200);
  assert.deepEqual(saved.groups, [{ count: 5, prize: 'Беккинг-байин 2000 ₽ на видеостол' }]);
  assert.equal(saved.totalWinners, 5);
  assert.deepEqual(saved.participants, original.participants);
  assert.equal(saved.endDate, original.endDate);
  assert.equal(saved.prizeKind, 'cash');
  assert.match(saved.title, /5 ×.*2000.*видеостол/);
  assert.equal(saved.cardTitle, undefined);
});
test('addition still keeps existing groups', async () => {
  const { saved } = await run('addPrizeGroups');
  assert.equal(saved.groups.length, 3);
  assert.equal(saved.totalWinners, 14);
  assert.equal(saved.title, 'Old title');
});
test('replacement rejects unauthorized, completed, expired, selected winners and empty prizes', async () => {
  for (const args of [ [{}, false], [{ status: 'completed' }], [{ endDate: '2020-01-01' }], [{ winners: [{ id: 'one' }] }], [{}, true, { groups: [] }] ]) {
    const result = await run('replacePrizeGroups', ...args);
    assert.ok(result.status >= 400);
    assert.equal(result.saved, undefined);
  }
});
test('replacement form shows editable prize and sends replacement action', async () => {
  const frontend = fs.readFileSync(require.resolve('../app-raffles.js'), 'utf8');
  const html = fs.readFileSync(require.resolve('../html-fragments/raffles.html'), 'utf8');
  const from = frontend.indexOf('  function getRaffleAddPrizeMode() {');
  const to = frontend.indexOf('  function setRaffleAddPrizesFormVisible', from);
  const field = () => ({ hidden: true, disabled: true });
  const context = { raffleAddPrizeGroups: () => [], rafflePrizeActionReplace: { checked: true }, raffleAddPrizeModeNew: { checked: false }, raffleAddPrizeModeExisting: {}, raffleAddPrizeGroupSelect: null, rafflePrizeAddOptions: field(), raffleAddPrizesSubmit: {}, rafflePrizesSubmitting: false, raffleAddPrizeExistingGroupWrap: field(), raffleAddPrizeNewGroupWrap: field(), raffleAddPrizeAccessWrap: field(), raffleAddPrizeText: field(), raffleAddPrizeAccess: field(), raffleAddPrizesForm: null };
  vm.runInNewContext(frontend.slice(from, to) + '\nsyncRaffleAddPrizesMode();', context);
  assert.equal(context.raffleAddPrizesSubmit.textContent, 'Заменить');
  assert.equal(context.raffleAddPrizeText.disabled, false);
  assert.equal(context.raffleAddPrizeNewGroupWrap.hidden, false);
  assert.equal(context.rafflePrizeAddOptions.hidden, true);
  assert.match(frontend, /action: mode === "replace" \? "replacePrizeGroups" : "addPrizeGroups"/);
  assert.match(html, />Изменить призы<\/button>/);
});

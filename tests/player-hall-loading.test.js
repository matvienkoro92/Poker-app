const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

test('hall request starts alongside CSS and does not wait for the race garage', async () => {
  const source = fs.readFileSync('app-player-hall.js', 'utf8');
  const code = source.slice(source.indexOf('  function villaLoadingMarkup('), source.indexOf('  function mountEntry('));
  const calls = [];
  let stylesReady;
  const ctx = vm.createContext({
    adminVisible: () => true, guestMode: () => false, loungeLive: null, detail: null,
    dialog: {open: true, classList:{add(){},remove(...names){calls.push(names.join(','));}}}, request: 0, generation: 0,
    warmRoomArt: () => calls.push('art'),
    adminGarage:()=>false,window: {PokerGarage:{availableTransport:()=>"kart"},pokerEnsureLazyDomains: () => new Promise(resolve => { stylesReady = resolve; })},
    pokerSocialRequest: async (route,body) => { calls.push(body.action); return {hall: {featured: []}}; },
    normalizeShelves: () => {}, render: () => calls.push('render'), updateEntry: () => {},
    error: message => { throw Error(message); }
  });
  vm.runInContext(code, ctx);
  const done = ctx.open('');
  assert.deepEqual(calls, ['player-hall-dialog--immersive,player-hall-dialog--picker', 'art', 'get', 'start-room']);
  stylesReady();
  await done;
  assert.deepEqual(calls, ['player-hall-dialog--immersive,player-hall-dialog--picker', 'art', 'get', 'start-room', 'render']);
});

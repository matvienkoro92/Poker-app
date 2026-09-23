const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require.resolve('../app-tournament-bet.js'), 'utf8');
const code = source.slice(source.indexOf('  var homePlaqueLoading = false;'), source.indexOf('  window.setInterval(refreshHomePlaque'));
function setup() {
  const updates = [], calls = [];
  const ctx = {homePlaqueHasActiveEvent:true,homePlaqueLastRefreshAt:0,HOME_PLAQUE_REFRESH_MS:180000,loading:false, modal:null, document:{visibilityState:'visible',querySelector:()=>({})}, updateHomeButton:d=>updates.push(d),window:{pokerLoadTournamentBetHome(force){calls.push({force});return Promise.resolve({ok:true,participantsCount:3,bank:5900});}}};
  vm.createContext(ctx);vm.runInContext(code,ctx);return {ctx,updates,calls};
}
test('home plaque receives fresh counts without selecting or rendering an event',async()=>{
  const {ctx,updates,calls}=setup();await ctx.refreshHomePlaque();assert.equal(updates[0].participantsCount,3);assert.equal(updates[0].bank,5900);assert.equal(calls[0].force,true);
});
test('no polling while hidden, away from home or viewing the modal',async()=>{
  const {ctx,calls}=setup();ctx.document.visibilityState='hidden';await ctx.refreshHomePlaque();ctx.document.visibilityState='visible';ctx.document.querySelector=()=>null;await ctx.refreshHomePlaque();ctx.document.querySelector=()=>({});ctx.modal={hidden:false};await ctx.refreshHomePlaque();assert.equal(calls.length,0);
});

test('polling discovers a newly opened event when the plaque is empty', async()=>{
  const {ctx,calls}=setup();ctx.homePlaqueHasActiveEvent=false;await ctx.refreshHomePlaque();assert.equal(calls.length,1);
});
test('repeat triggers wait three minutes before refreshing', async()=>{
  const {ctx,calls}=setup();await ctx.refreshHomePlaque();await ctx.refreshHomePlaque();assert.equal(calls.length,1);
  ctx.homePlaqueLastRefreshAt=Date.now()-180001;await ctx.refreshHomePlaque();assert.equal(calls.length,2);
});

const homeSource = fs.readFileSync(require.resolve('../app-home-data.js'), 'utf8');
const homeContext = {window:{}, sessionStorage:{removeItem(){}}, Date};
vm.runInNewContext(homeSource, homeContext);
const matches = homeContext.window.pokerTournamentBetMatchesHome;
const matchesSelected = homeContext.window.pokerTournamentBetMatchesSelected;
const selected = {weekday:3,date:'2026-09-16'};
const event = {id:'tb_current',tournamentId:'weekly-3',status:'open',createdAt:'2026-09-16T07:00:00Z'};
const now = Date.parse('2026-09-16T12:00:00Z');
test('home Last Longer shows the current open event regardless of selected tournament',()=>{
  assert.equal(matches(event,selected,now),true);
  assert.equal(matches({...event,tournamentId:'weekly-1'},selected,now),true);
  assert.equal(matches({...event,createdAt:'2026-09-09T07:00:00Z'},selected,now),true);
  for(const status of ['closed','settled','cancelled']) assert.equal(matches({...event,status},selected,now),false);
  assert.equal(matches({...event,createdByPlayer:true},selected,now),false);
  assert.equal(matches(null,selected,now),false);
});
test('tournament share requires its selected date and tournament',()=>{
  assert.equal(matchesSelected(event,selected,now),true);
  assert.equal(matchesSelected({...event,tournamentId:'weekly-1'},selected,now),false);
  assert.equal(matchesSelected({...event,createdAt:'2026-09-09T07:00:00Z'},selected,now),false);
  assert.equal(matchesSelected(event,{weekday:4,date:'2026-09-17'},now),false);
  assert.equal(matchesSelected(event,selected,Date.parse('2026-09-16T17:00:00Z')),false);
});

test('unopened home plaque remains accessible to manage an unfinished previous event',()=>{
  const emptyLabel = {hidden:true};
  const button = {disabled:true,classList:{toggle(){}},querySelector:()=>emptyLabel,setAttribute(){}};
  const ctx = {window:{pokerTournamentBetMatchesHome:()=>false},document:{querySelector:selector=>selector==='[data-tournament-bet-open]'?button:null},Date,homePlaqueHasActiveEvent:false,homePlaqueLastRefreshAt:0};
  const renderCode = source.slice(source.indexOf('  var homePlaqueData = null;'),source.indexOf('  function load(silent)'));
  vm.runInNewContext(renderCode,ctx);
  ctx.updateHomeButton({id:'tb_previous',status:'closed',participantsCount:7,bank:7100});
  assert.equal(button.disabled,false);
  assert.equal(emptyLabel.hidden,false);
  ctx.updateHomeButton(null);
  assert.equal(button.disabled,false);
});

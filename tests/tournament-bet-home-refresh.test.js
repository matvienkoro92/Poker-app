const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require.resolve('../app-tournament-bet.js'), 'utf8');
const code = source.slice(source.indexOf('  var homePlaqueLoading = false;'), source.indexOf('  window.setInterval(refreshHomePlaque'));
function setup() {
  const updates = [], calls = [];
  const ctx = {loading:false, modal:null, document:{visibilityState:'visible',querySelector:()=>({})}, baseUrl:()=>'',API_PATH:'/api/tournament-bet',authQuery:()=>'?auth=test',updateHomeButton:d=>updates.push(d),fetch:(url,opts)=>{calls.push({url,opts});return Promise.resolve({ok:true,json:()=>Promise.resolve({ok:true,participantsCount:3,bank:5900})});}};
  vm.createContext(ctx);vm.runInContext(code,ctx);return {ctx,updates,calls};
}
test('home plaque receives fresh counts without selecting or rendering an event',async()=>{
  const {ctx,updates,calls}=setup();await ctx.refreshHomePlaque();assert.equal(updates[0].participantsCount,3);assert.equal(updates[0].bank,5900);assert.equal(calls[0].opts.cache,'no-store');assert.equal(calls[0].url.includes('eventId'),false);
});
test('no polling while hidden, away from home or viewing the modal',async()=>{
  const {ctx,calls}=setup();ctx.document.visibilityState='hidden';await ctx.refreshHomePlaque();ctx.document.visibilityState='visible';ctx.document.querySelector=()=>null;await ctx.refreshHomePlaque();ctx.document.querySelector=()=>({});ctx.modal={hidden:false};await ctx.refreshHomePlaque();assert.equal(calls.length,0);
});

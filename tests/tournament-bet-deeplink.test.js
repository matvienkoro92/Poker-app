'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.join(__dirname,'..');
const router = fs.readFileSync(path.join(root,'app-home-deeplinks.js'),'utf8');
const auth = fs.readFileSync(path.join(root,'app-auth.js'),'utf8');
const reader = auth.slice(auth.indexOf('function pokerReadTelegramLaunchStartParam()'),auth.indexOf('function pokerStartAppQueryFromUrlSearchParams'));

for (const source of ['telegram','initData','hash','query','late']) {
  test('Last Longer opens the selected event from '+source, async () => {
    const route='tournament_bet_tb_example_123', calls=[],timers=[];
    const location={href:'https://club.test/',search:source==='query'?'?startapp='+route:'',hash:source==='hash'?'#tgWebAppStartParam='+route:''};
    const webApp=source==='telegram'?{initDataUnsafe:{start_param:route}}:source==='initData'?{initData:'start_param='+route}:{};
    const context={URL,URLSearchParams,Promise,Set,location,
      window:{location,Telegram:{WebApp:webApp},addEventListener(){},pokerOpenTournamentBetDeepLink:id=>calls.push(id)},
      document:{readyState:'complete',body:{getAttribute:()=> 'home'}},
      setTimeout:fn=>timers.push(fn),isTelegramWebApp:()=>source!=='query',
      pokerNormalizeWebAppStartParam:value=>value||'',pokerStartAppQueryFromUrlSearchParams:sp=>sp.get('startapp')||''};
    vm.createContext(context);vm.runInContext(reader+'\n'+router+'\npokerInitHomeDeepLinks();',context);
    if(source==='late')webApp.initDataUnsafe={start_param:route};
    while(timers.length){timers.shift()();await Promise.resolve();await Promise.resolve();}
    await Promise.resolve();await Promise.resolve();
    assert.deepEqual(calls,['tb_example_123']);
    context.window.__pokerApplyStartAppDeepLink('tournament_bet');
    await Promise.resolve();await Promise.resolve();await Promise.resolve();
    assert.deepEqual(calls,['tb_example_123','']);
  });
}

test('event switch waits for an existing request then selects the deep-linked event', async () => {
  const client=fs.readFileSync(path.join(root,'app-tournament-bet.js'),'utf8');
  const source=client.slice(client.indexOf('  window.pokerOpenTournamentBetDeepLink ='),client.lastIndexOf('})();'));
  let finish;const pending=new Promise(resolve=>{finish=resolve});
  const context={window:{},Promise,loadPromise:pending,selectedEventId:'tb_old',deepLinkEventId:'',deepLinkSection:false,activeTab:'rating',open(){context.opened=true;}};
  vm.createContext(context);vm.runInContext(source,context);
  const result=context.window.pokerOpenTournamentBetDeepLink('tb_new');
  assert.equal(context.selectedEventId,'tb_old');finish();await result;
  assert.equal(context.selectedEventId,'tb_new');assert.equal(context.deepLinkEventId,'tb_new');assert.equal(context.activeTab,'event');assert.equal(context.opened,true);
});

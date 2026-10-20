'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const router=fs.readFileSync(require.resolve('../app-home-deeplinks.js'),'utf8');
for(const route of ['villa','player_hall','garage']){
 test(route+' loads profile scripts before opening the requested villa space',async()=>{
  const calls=[],timers=[];
  const location={href:'https://club.test/?startapp='+route,search:'?startapp='+route,hash:''};
  const window={location,addEventListener(){},pokerEnsureLazyDomains:async domains=>{
   calls.push(Array.from(domains));window.pokerOpenPlayerHall=()=>calls.push('villa');window.pokerOpenPlayerGarage=()=>calls.push('garage');
  }};
  const context={window,location,URL,URLSearchParams,Promise,Set,document:{readyState:'complete',body:{getAttribute:()=> 'home'}},setTimeout:fn=>timers.push(fn),isTelegramWebApp:()=>false,pokerReadTelegramLaunchStartParam:()=>route,pokerNormalizeWebAppStartParam:v=>v||'',pokerStartAppQueryFromUrlSearchParams:sp=>sp.get('startapp')||''};
  vm.createContext(context);vm.runInContext(router+'\npokerInitHomeDeepLinks();',context);
  for(let i=0;i<10;i++){while(timers.length)timers.shift()();await Promise.resolve();}
  assert.deepEqual(calls,[['profile'],route==='garage'?'garage':'villa']);
 });
}

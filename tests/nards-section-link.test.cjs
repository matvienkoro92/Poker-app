const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),router=fs.readFileSync('app-home-deeplinks.js','utf8');
for(const tab of ['outside','inside','pieces','dice'])test('nards link loads the account shell and opens editor tab '+tab,async()=>{
 const calls=[],timers=[],route='nards_appearance_'+tab,location={href:'https://club.test/?startapp='+route,search:'?startapp='+route,hash:''};
 const window={location,addEventListener(){},pokerEnsureLazyDomains:async domains=>{calls.push(Array.from(domains));window.pokerOpenBoardGames=(...args)=>{calls.push(Array.from(args));return true;};}};
 const ctx={window,location,URL,URLSearchParams,Promise,Set,document:{readyState:'complete',body:{getAttribute:()=> 'home'}},setTimeout:fn=>timers.push(fn),isTelegramWebApp:()=>false,pokerReadTelegramLaunchStartParam:()=>route,pokerNormalizeWebAppStartParam:v=>v||'',pokerStartAppQueryFromUrlSearchParams:sp=>sp.get('startapp')||''};
 vm.createContext(ctx);vm.runInContext(router+'\npokerInitHomeDeepLinks();',ctx);for(let i=0;i<10;i++){while(timers.length)timers.shift()();await Promise.resolve();}assert.deepEqual(calls,[['profile'],['long',null,false,tab]]);
});

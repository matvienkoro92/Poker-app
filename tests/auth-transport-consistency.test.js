'use strict';
const test=require('node:test'), assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const source=fs.readFileSync(path.join(__dirname,'../app-auth.js'),'utf8');
const query=source.slice(source.indexOf('function pokerApiAuthQuery('),source.indexOf('/** URL для <img>'));
const body=source.slice(source.indexOf('function pokerApiAuthJsonBody('),source.indexOf('/** Тот же salt'));
const guestWrappers=source.slice(source.indexOf('function pokerRafflesApiQueryLeading('),source.indexOf('function pokerCanSyncGuestProfileToServer('));
const {signPwaSession}=require('../lib/poker-pwa-session');
const {resolveTelegramIdentity,memberIdFromIdentity}=require('../lib/resolve-telegram-auth');
const token='test-bot-token';
function signedInit(id) {
 const p=new URLSearchParams({auth_date:String(Math.floor(Date.now()/1000)),user:JSON.stringify({id,first_name:'Test'})});
 const key=crypto.createHmac('sha256','WebAppData').update(token).digest();
 const data=[...p].sort(([a],[b])=>a.localeCompare(b)).map(([k,v])=>k+'='+v).join('\n');
 p.set('hash',crypto.createHmac('sha256',key).update(data).digest('hex'));return p.toString();
}
const init=signedInit(123),tgSession=signPwaSession({id:123},token),emailSession=signPwaSession({id:789,memberId:'mail_ID123456',email:'test@example.test'},token);
for(const scenario of [
 {name:'Telegram',init,expected:'tg_123'},
 {name:'PWA Telegram',saved:tgSession,expected:'tg_123'},
 {name:'PWA standalone with stale Telegram data',saved:tgSession,init:signedInit(999),standalone:true,expected:'tg_123'},
 {name:'browser with saved PWA session',saved:tgSession,init:signedInit(999),prefer:true,expected:'tg_123'},
 {name:'live Telegram with a saved different PWA account',saved:signPwaSession({id:999},token),init,expected:'tg_123'},
 {name:'explicit email login in Telegram',saved:emailSession,email:emailSession,init,expected:'mail_ID123456'},
 {name:'PWA email',saved:emailSession,email:emailSession,standalone:true,expected:'mail_ID123456'},
 {name:'guest mode',saved:tgSession,init,guest:true,expected:null},
 {name:'no credentials',expected:null},
 {name:'invalid session',saved:'invalid',expected:null},
 {name:'expired session',saved:signPwaSession({id:123},token,-60),expected:null},
 {name:'invalid Telegram signature',init:init.replace('hash=','hash=broken'),expected:null},
]) test('GET and POST identify the same account: '+scenario.name,()=>{
 const c={window:{Telegram:{WebApp:{initData:scenario.init||''}}},
 pokerReadPwaGuestMode:()=>!!scenario.guest,pokerReadPwaTgSessionToken:()=>scenario.saved||'',pokerReadPwaVkSessionToken:()=>'',
 pokerReadEmailPwaSessionToken:()=>scenario.email||'',pokerIsPwaDisplayStandalone:()=>!!scenario.standalone,pokerShouldPreferSavedPwaAuth:()=>!!scenario.prefer};
 c.pokerGetRaffleStableDeviceId=()=> 'test-device-12345';
 vm.createContext(c);vm.runInContext(query+'\n'+body+'\n'+guestWrappers,c);
 const q=Object.fromEntries(new URLSearchParams(c.pokerApiAuthQuery('?')));
 const b=c.pokerApiAuthJsonBody({action:'bet',eventId:'tb_one'});
 assert.equal(b.action,'bet');assert.equal(b.eventId,'tb_one');
 assert.equal(memberIdFromIdentity(resolveTelegramIdentity({query:q},{},token)),scenario.expected);
 assert.equal(memberIdFromIdentity(resolveTelegramIdentity({query:{}},b,token)),scenario.expected);
 assert.ok(['initData','pwaSession','pwaVkSession'].filter(k=>b[k]).length<=1);
 const guestQuery=Object.fromEntries(new URLSearchParams(c.pokerRafflesApiQueryLeading()));
 assert.equal(memberIdFromIdentity(resolveTelegramIdentity({query:guestQuery},{},token)),scenario.expected);
 for(const payload of [{text:'chat test'},{avatarId:'preset'},{action:'join',raffleId:'raffle-test'},{action:'create',amount:300},{action:'subscribe'},{action:'save',reportId:'report-test'}]) {
  const shared=c.pokerGuestOrAuthedPostBody(payload);
  for(const key of Object.keys(payload))assert.equal(shared[key],payload[key]);
  assert.equal(shared.guestDeviceId,'test-device-12345');
  assert.equal(memberIdFromIdentity(resolveTelegramIdentity({query:{}},shared,token)),scenario.expected);
 }
});

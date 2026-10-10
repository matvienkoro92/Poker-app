'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync('app-raffles-broadcast.js','utf8');
const context=vm.createContext({Date,Error,currentRaffleData:null,rafflesActiveBroadcastList:[],parsePrizeValue:s=>Number(String(s).replace(/\D/g,'')),formatRaffleSum:n=>n+' ₽',pokerRafflesIsCashPrize:r=>r.prizeKind==='cash'});
vm.runInContext(source.slice(0,source.indexOf('// Raffles broadcast runtime:'))+source.slice(source.indexOf('  function raffleManualBroadcastBodyFromCurrentRaffle('),source.indexOf('  // Админская рассылка подписчикам')),context);
(async()=>{
 const cash=(id,count,nominal)=>({id,status:'active',prizeKind:'cash',title:'Кеш 20/40',totalWinners:count,groups:[{count,prize:String(nominal)+' ₽'}]});
 const a=cash('cash1',7,1000),b=cash('cash2',25,200),ticket={id:'ticket',status:'active',title:'Турнир',totalWinners:3,groups:[{count:3,prize:'10000 ₽'}]};
 context.rafflesActiveBroadcastList=[a,b];
 let url='';const rows=await context.pokerRaffleBroadcastLoadActiveList('https://example.test','?auth=test',async u=>{url=u;return {ok:true,json:async()=>({ok:true,raffles:[a,b,ticket,{...ticket,id:'old',status:'completed'}],activeRaffles:[a,b]})};});
 assert.equal(rows.length,3);assert.match(url,/bypassListCache=1/);assert.ok(!url.includes('scope=active'));
 const body=context.raffleManualBroadcastBodyFromCurrentRaffle(rows);
 assert.equal(body.activeRafflesCount,3);assert.match(body.message,/Стартовали 3 розыгрыша/);assert.match(body.message,/3 билета/);assert.match(body.message,/7 беккинг-байинов/);assert.match(body.message,/25 беккинг-байинов/);
 await assert.rejects(()=>context.pokerRaffleBroadcastLoadActiveList('','?x=1',async()=>({ok:false,json:async()=>({ok:false})})),/не отправлена/);
 console.log('PASS fresh broadcast includes ticket raffle missing from screen, deduplicates rows and blocks failed refresh');
})().catch(e=>{console.error(e);process.exitCode=1;});

'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
test('custom option is last and unlocks amount; scheduled selection restores buy-in',()=>{
 const source=fs.readFileSync('app-admin-bonuses.js','utf8'),select={value:''},amount={focus(){}},message={};
 const c={adminBonusesState:{operation:'debit'},$:id=>({adminBonusesOperationTournament:select,adminBonusesOperationAmount:amount,adminBonusesOperationMessage:message})[id],currentScheduleTournamentOptions:()=>[{id:'scheduled',label:'Турнир',buyin:'200 ₽'}],esc:x=>x,tournamentBuyinAmount:x=>Number(x.replace(/\D/g,''))};
 vm.createContext(c);vm.runInContext(source.slice(source.indexOf('  function populateTournamentOptions()'),source.indexOf('  function rowTitle(')),c);
 c.populateTournamentOptions();assert.ok(select.innerHTML.endsWith('<option value="custom">Произвольно</option>'));
 select.value='custom';c.syncDebitAmountWithTournament();assert.equal(amount.readOnly,false);assert.equal(amount.value,'');
 select.value='scheduled';c.syncDebitAmountWithTournament();assert.equal(amount.readOnly,true);assert.equal(amount.value,'200');
});
test('server accepts arbitrary positive custom debit and preserves scheduled and balance validation',async()=>{
 const source=fs.readFileSync('lib/api-handlers/admin.js','utf8'),saved=[];
 const c={resolveTargetAccountId:async()=> 'ID240934',parsePositiveAmount:x=>{if(!Number.isSafeInteger(x)||x<=0)throw Error();return x;},apiError:(res,status,error)=>res.status(status).json({error}),tournamentBuyinAmount:x=>Number(String(x).replace(/\D/g,'')),addBonusOperation:async data=>{if(data.amount>5150)throw Error('insufficient_bonus_balance');saved.push(data);return {bonusBalance:5150-data.amount,entry:{id:'test'}};},redisPipeline:async()=>[],logAdminAction:async()=>{},publicLedgerEntry:x=>x,BONUS_BALANCES_SNAPSHOT_CACHE_KEY:'cache',BONUS_TOTALS_CACHE_KEY:'total'};
 vm.createContext(c);vm.runInContext(source.slice(source.indexOf('async function handleManualBonus('),source.indexOf('module.exports = async function handler')),c);
 async function call(amount,tournament){const res={status(code){this.code=code;return this;},json(body){this.body=body;return this;}};await c.handleManualBonus({},res,{operationId:'custom_debit_test_0001',amount,tournament},{memberId:'owner'},'ID240934','debit');return res;}
 assert.equal((await call(1234,{id:'custom'})).code,200);assert.equal(saved[0].tournamentTitle,'Произвольно');assert.equal(saved[0].amount,1234);
 assert.equal((await call(0,{id:'custom'})).code,400);assert.equal((await call(6000,{id:'custom'})).code,400);
 assert.equal((await call(1234,{id:'scheduled',title:'Турнир',buyin:'200 ₽'})).code,400);
 assert.equal((await call(200,{id:'scheduled',title:'Турнир',buyin:'200 ₽'})).code,200);
});

'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const {issuePaymentLink}=require('../lib/deposit-link-routing');
const now=Date.parse('2026-11-13T12:00:00+03:00'),start=Date.parse('2026-11-13T06:00:00+03:00');
const body=(amount=100000,id='payment_link_request_0001')=>({amount,requestId:id});
test('uses the less loaded provider from the current Moscow operational day',()=>{
 const state={paymentFormPayments:[{id:'p',providerId:'prodamus',status:'confirmed',amount:218000,confirmedAt:start},{id:'old',providerId:'robokassa',status:'confirmed',amount:9999999,confirmedAt:start-1},{id:'r',providerId:'robokassa',status:'pending',amount:9999999,confirmedAt:now}],channelOperations:[]};
 const {link}=issuePaymentLink(state,body(),'a',now);assert.equal(link.providerId,'robokassa');assert.equal(link.amount,100000);assert.equal(link.chargeAmount,110000);assert.equal(link.acceptedAmount,0);assert.equal(link.period.start,start);
});
test('linked callback counts once and voided incomes do not distort routing',()=>{
 const state={paymentFormPayments:[{id:'1',providerId:'prodamus',status:'confirmed',amount:110000,confirmedAt:start}],channelOperations:[{channelId:'prodamus',prodamusPaymentId:'1',direction:'income',amount:110000,createdAt:start},{channelId:'robokassa',direction:'income',amount:165000,createdAt:start},{channelId:'prodamus',direction:'income',amount:9999999,createdAt:start,voidedAt:now}]};
 const {link}=issuePaymentLink(state,body(),'a',now);assert.equal(link.providerId,'prodamus');assert.equal(link.acceptedAmount,110000);
});
test('ties alternate; retries return the original link without changing routing or ledger',()=>{
 const state={entries:[],channelOperations:[]};const a=issuePaymentLink(state,body(),'a',now);const revision=state.revision;
 assert.equal(issuePaymentLink(state,body(),'a',now).link,a.link);assert.equal(state.revision,revision);
 const b=issuePaymentLink(state,body(100000,'payment_link_request_0002'),'b',now);assert.notEqual(a.link.providerId,b.link.providerId);assert.deepEqual(state.entries,[]);assert.deepEqual(state.channelOperations,[]);
 assert.throws(()=>issuePaymentLink(state,body(),'b',now),/уже использован/);assert.throws(()=>issuePaymentLink(state,body(200000),'a',now),/уже использован/);
});
test('only known nominal amounts and valid request IDs are accepted; all three amounts have links',()=>{
 for(const amount of [100000,150000,200000]){const {link}=issuePaymentLink({},body(amount),'a',now);assert.equal(link.amount,amount);assert.match(link.url,/^https:\/\//);assert.ok(link.chargeAmount>amount);}
 for(const amount of [1,'100000',110000,NaN])assert.throws(()=>issuePaymentLink({},body(amount),'a',now),/Выберите сумму/);
 assert.throws(()=>issuePaymentLink({},{amount:100000,requestId:'bad'},'a',now),/Обновите/);
});

test('API serializes concurrent issuance, retries lost responses, and retains deposit authorization',async()=>{
 const fs=require('node:fs'),vm=require('node:vm');let raw='',authenticated=true,unlocked=true;
 const redis={isConfigured:()=>true,pipeline:async commands=>commands.map(([cmd,...args])=>{if(cmd==='GET')return {result:raw};if(cmd==='EVAL'){if(args[3]!==raw)return {result:0};raw=args[4];return {result:1};}throw Error(cmd);})};
 const ctx={module:{exports:{}},process:{env:{}},console,Date,Buffer,require:id=>id==='../api-auth'?{setCors(){},parseBody:r=>r.body,authRequired:()=>({ok:authenticated,memberId:'manager'})}:id==='../admin-menu-access-token'?{verifyAccessToken:()=>unlocked}:id==='../redis'?redis:require(require('node:path').resolve('lib/api-handlers',id))};
 vm.runInNewContext(fs.readFileSync('lib/api-handlers/admin-deposits.js','utf8'),ctx);
 async function call(requestId){const res={setHeader(){},status(n){this.code=n;return this;},json(b){this.body=b;}};await ctx.module.exports({method:'POST',body:{action:'issue-payment-link',amount:100000,requestId}},res);return res;}
 const [a,b]=await Promise.all([call('api_payment_link_request_001'),call('api_payment_link_request_002')]);assert.equal(a.code,200);assert.equal(b.code,200);assert.notEqual(a.body.link.providerId,b.body.link.providerId);
 assert.equal((await call('api_payment_link_request_001')).body.link.url,a.body.link.url);assert.equal(JSON.parse(raw).paymentLinkIssues.length,2);assert.equal(JSON.parse(raw).channelOperations,undefined);
 authenticated=false;assert.equal((await call('api_payment_link_request_003')).code,403);authenticated=true;unlocked=false;assert.equal((await call('api_payment_link_request_003')).code,403);
});

'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const {createHash,createHmac}=require('node:crypto');
const {issuePaymentLink}=require('../lib/deposit-link-routing');
const {buildUniqueLink,matchPayment,canonical}=require('../lib/deposit-unique-links');
const env={ROBOKASSA_MERCHANT_LOGIN:'fixture',ROBOKASSA_PASSWORD1:'fixture-password-1',ROBOKASSA_PASSWORD2:'fixture-password-2',ROBOKASSA_LINK_DESCRIPTION:'Fixture item',ROBOKASSA_LINK_FISCAL_MODE:'shop',PRODAMUS_WEBHOOK_SECRET:'fixture-prodamus',PRODAMUS_INTEGRATION_SYS:'fixture',PRODAMUS_LINK_PRODUCT_NAME:'Fixture item'};
const body={amount:100000,requestId:'unique_payment_request_0001',unique:true,room:'X',playerId:'123456',clubId:'654321'};
function withEnv(fn){const saved={...process.env};try{Object.assign(process.env,env);return fn();}finally{for(const k of Object.keys(env)){if(saved[k]===undefined)delete process.env[k];else process.env[k]=saved[k];}}}
test('separate orders have different links; retry preserves order, target and provider',()=>withEnv(()=>{
 const state={entries:[],channelOperations:[]};
 const first=issuePaymentLink(state,body,'manager');
 assert.equal(first.link.unique,true);assert.equal(first.link.playerId,body.playerId);
 assert.equal(issuePaymentLink(state,body,'manager').link,first.link);
 const second=issuePaymentLink(state,{...body,requestId:'unique_payment_request_0002'},'manager');
 assert.notEqual(first.link.url,second.link.url);assert.notEqual(first.link.orderId,second.link.orderId);
 assert.equal(state.paymentLinkOrders.length,2);assert.deepEqual(state.channelOperations,[]);
 assert.throws(()=>issuePaymentLink(state,{...body,playerId:'999'},'manager'),/уже использован/);
 assert.throws(()=>issuePaymentLink(state,{...body,unique:false},'manager'),/уже использован/);
 assert.throws(()=>issuePaymentLink(state,body,'another-manager'),/уже использован/);
 // Retries remain safe after the short legacy routing history rolls off.
 state.paymentLinkIssues=[];assert.equal(issuePaymentLink(state,body,'manager').link,first.link);
}));
test('missing identities, secrets and fiscal settings fail without creating an order',()=>{
 assert.throws(()=>issuePaymentLink({}, {...body,playerId:''},'manager'),/Укажите/);
 assert.throws(()=>buildUniqueLink({providerId:'robokassa',chargeAmount:110000},'800000000000000001',{}),/не настроены/);
 assert.throws(()=>buildUniqueLink({providerId:'robokassa',chargeAmount:110000},'800000000000000001',{...env,ROBOKASSA_LINK_FISCAL_MODE:''}),/не настроены/);
});
test('Robokassa invoice and exact charged sum are authenticated, with configured fiscal item',()=>{
 const url=new URL(buildUniqueLink({providerId:'robokassa',chargeAmount:110000},'800000000000000001',{...env,ROBOKASSA_LINK_RECEIPT_ITEM:JSON.stringify({name:'Fixture item',tax:'none',payment_method:'full_payment',payment_object:'service'})}));
 const p=url.searchParams;assert.equal(p.get('OutSum'),'1100.00');
 assert.equal(p.get('InvId'),'800000000000000001');
 assert.equal(p.get('SignatureValue'),createHash('md5').update(['fixture','1100.00','800000000000000001',p.get('Receipt'),'fixture-password-1'].join(':')).digest('hex'));
 assert.equal(JSON.parse(decodeURIComponent(p.get('Receipt'))).items[0].sum,1100);
 assert.ok(!url.toString().includes('fixture-password-1'));
});
test('Prodamus signed payment URL carries an individual external order number',()=>{
 const p=new URL(buildUniqueLink({providerId:'prodamus',chargeAmount:218000},'800000000000000002',env)).searchParams;
 assert.equal(p.get('order_id'),'800000000000000002');assert.equal(p.get('do'),'pay');assert.equal(p.get('products[0][price]'),'2180.00');
 const data={do:'pay',sys:'fixture',order_id:'800000000000000002',products:[{name:'Fixture item',price:'2180.00',quantity:'1'}]};
 assert.equal(p.get('signature'),createHmac('sha256',env.PRODAMUS_WEBHOOK_SECRET).update(canonical(data)).digest('hex'));
});
test('authenticated matching payment marks the order paid, with no automatic player credit',()=>{
 const order={id:'800000000000000002',providerId:'prodamus',amount:200000,chargeAmount:218000,room:'X',playerId:'123',clubId:'456',status:'pending'};
 const state={paymentLinkOrders:[order],channelOperations:[]};
 const payment={id:'125',providerId:'prodamus',amount:218000,confirmedAt:123};
 matchPayment(state,payment,order.id);assert.equal(order.status,'paid');assert.equal(payment.creditAmount,200000);assert.equal(payment.playerId,'123');assert.deepEqual(state.channelOperations,[]);
 const repeat={id:'126',providerId:'prodamus',amount:218000};matchPayment(state,repeat,order.id);assert.match(repeat.orderReviewReason,/Повторная/);assert.equal(repeat.creditAmount,undefined);
 const mismatch={id:'127',providerId:'prodamus',amount:200000};matchPayment(state,mismatch,order.id);assert.match(mismatch.orderReviewReason,/Сумма/);assert.equal(mismatch.creditAmount,undefined);
 const unrelated={id:'125',providerId:'robokassa',amount:218000};matchPayment(state,unrelated,order.id);assert.equal(unrelated.playerId,undefined);
});
test('Prodamus webhook matches signed order_num, checks amount and ignores forged callbacks',async()=>{
 const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
 const order={id:'800000000000000002',providerId:'prodamus',amount:200000,chargeAmount:218000,room:'X',playerId:'123',clubId:'456',status:'pending'};
 let raw=JSON.stringify({paymentLinkOrders:[order]});
 const redis={isConfigured:()=>true,pipeline:async commands=>commands.map(([cmd,...args])=>{if(cmd==='GET')return {result:raw};if(args[3]!==raw)return {result:0};raw=args[4];return {result:1};})};
 const ctx={module:{exports:{}},process:{env:{PRODAMUS_WEBHOOK_SECRET:env.PRODAMUS_WEBHOOK_SECRET}},Buffer,Response,Date,console,require:id=>id==='../redis'?redis:require(id.startsWith('.')?path.resolve('lib/api-handlers',id):id)};
 vm.runInNewContext(fs.readFileSync('lib/api-handlers/prodamus-webhook.js','utf8'),ctx);
 async function call(sum='2180.00',sign=true){
  const payload={domain:'matro.payform.ru',payment_status:'success',order_id:sum==='2000.00'?'123455':'123456',order_num:order.id,sum,date:'2026-11-13T12:00:00+03:00'};
  const signature=createHmac('sha256',env.PRODAMUS_WEBHOOK_SECRET).update(canonical(payload)).digest('hex');
  const res={status(code){this.code=code;return this;},end(){},send(body){this.body=body;return this;}};
  await ctx.module.exports({method:'POST',body:new URLSearchParams(payload).toString(),headers:{'content-type':'application/x-www-form-urlencoded',sign:sign?signature:'0'.repeat(64)}},res);return res;
 }
 assert.equal((await call('2180.00',false)).code,403);assert.equal(JSON.parse(raw).paymentLinkOrders[0].status,'pending');
 assert.equal((await call('2000.00')).code,200);assert.equal(JSON.parse(raw).paymentLinkOrders[0].status,'pending');assert.match(JSON.parse(raw).paymentFormPayments[0].orderReviewReason,/Сумма/);
 assert.equal((await call()).code,200);assert.equal((await call()).code,200);
 const state=JSON.parse(raw);assert.equal(state.paymentFormPayments.length,2);assert.equal(state.paymentFormPayments[1].playerId,'123');assert.equal(state.paymentLinkOrders[0].status,'paid');
});

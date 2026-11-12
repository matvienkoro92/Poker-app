'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const policy=require('../lib/telegram-group-policy');
function fixture(){
 let raw='',admin=true,fail=false,sent=[];const keys=new Map();
 const redis={isConfigured:()=>true,pipeline:async commands=>commands.map(([op,...args])=>{if(op==='GET')return {result:raw};if(op==='SET'){if(args.includes('NX')&&keys.has(args[0]))return {result:null};keys.set(args[0],args[1]);return {result:'OK'};}if(op==='DEL'){keys.delete(args[0]);return {result:1};}if(op==='EVAL'){if(raw!==args[3])return {result:0};raw=args[4];return {result:1};}throw Error(op);})};
 const ctx={module:{exports:{}},require:id=>id==='./redis'?redis:id==='./api-auth'?{isAdmin:()=>admin}:id==='./telegram-group-policy'?{...policy,isPaymentLinkGroup:id=>String(id)==='-123',guardedFetch:async(url,options)=>{if(fail)throw Error('offline');sent.push(JSON.parse(options.body));return {ok:true,json:async()=>({ok:true})};}}:id==='./telegram-deposit-withdrawals'?{STORE_KEY:'ledger'}:require('../lib/deposit-link-routing'),AbortSignal,Date,console};
 vm.runInNewContext(fs.readFileSync('lib/telegram-payment-links.js','utf8'),ctx);
 const update=(text='/ссылка 1000',id=1,chat=-123)=>({message:{text,message_id:id,chat:{id:chat,type:'supergroup'},from:{id:42}}});
 return {handle:ctx.module.exports.handle,update,get sent(){return sent;},get state(){return JSON.parse(raw||'{}');},admin(v){admin=v;},fail(v){fail=v;}};
}
test('exact slash and plain commands accept only three nominal amounts and this bot mention',()=>{
 for(const text of ['/ссылка 1000','ссылка 1500','/ссылка@Poker_dvatuza_bot 2000',' ССЫЛКА 2000 '])assert.ok(policy.paymentLinkCommandAmount({message:{text,chat:{type:'group'}}}));
 for(const text of ['дай ссылка 1000','/ссылка 1100','/ссылка@otherbot 1000','/ссылка 1000 ещё','/ссылка'])assert.equal(policy.paymentLinkCommandAmount({message:{text,chat:{type:'group'}}}),null);
 assert.equal(policy.paymentLinkCommandAmount({edited_message:{text:'/ссылка 1000',chat:{type:'group'}}}),null);
 assert.equal(policy.paymentLinkCommandAmount({message:{text:'/ссылка 1000',chat:{type:'private'}}}),null);
});
test('admin reply uses shared routing and shows player credit, provider charge and URL; delivery retries do not change choice',async()=>{
 const f=fixture();await f.handle(f.update(),'test');await f.handle(f.update(),'test');assert.equal(f.sent.length,1);assert.equal(f.state.paymentLinkIssues.length,1);assert.equal(f.sent[0].reply_parameters.message_id,1);assert.match(f.sent[0].text,/Пополнение игроку/);assert.match(f.sent[0].text,/1.?100 ₽/);assert.match(f.sent[0].text,/https:\/\//);
 await f.handle(f.update('/ссылка 1000',2),'test');assert.notEqual(f.state.paymentLinkIssues[0].link.providerId,f.state.paymentLinkIssues[1].link.providerId);assert.equal(f.state.channelOperations,undefined);
});
test('wrong group, non-admins, bots, edited and malformed messages stay silent',async()=>{
 const f=fixture();assert.equal(await f.handle(f.update('/ссылка 1000',1,-999),'test'),false);f.admin(false);assert.equal(await f.handle(f.update(),'test'),false);f.admin(true);
 const bot=f.update();bot.message.from.is_bot=true;assert.equal(await f.handle(bot,'test'),false);assert.equal(await f.handle({edited_message:f.update().message},'test'),false);assert.equal(await f.handle(f.update('/ссылка 1100'),'test'),false);assert.equal(f.sent.length,0);
});
test('Telegram failure retries the same stored link and 1500 uses the verified Robokassa link',async()=>{
 const f=fixture();f.fail(true);await assert.rejects(f.handle(f.update('ссылка 1500'),'test'),/offline/);const url=f.state.paymentLinkIssues[0].link.url;f.fail(false);await f.handle(f.update('ссылка 1500'),'test');assert.equal(f.state.paymentLinkIssues.length,1);assert.match(f.sent[0].text,/Робокасса/);assert.ok(f.sent[0].text.endsWith(url));assert.match(f.sent[0].text,/1.?650 ₽/);
});

'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {generateKeyPairSync}=require('node:crypto');
const {dkimSign}=require('mailauth/lib/dkim/sign');
const {dkimVerify}=require('mailauth/lib/dkim/verify');
const {parsePayment,configured}=require('../lib/robokassa-mail');
const body='Получена оплата:\r\nЦена: 1100.00\r\ninv_id: 636928784\r\nМетод оплаты: PayButton\r\nshp_interface=link\r\n';
const message=(text=body,from='robot@robokassa.ru')=>Buffer.from('From: '+from+'\r\nSubject: Notification from ROBOKASSA\r\nMIME-Version: 1.0\r\nContent-Type: text/plain; charset=utf-8\r\n\r\n'+text);
const passed={results:[{signingDomain:'robokassa.ru',status:{result:'pass'},signingHeaders:{keys:'From: Subject'}}]};
const deps={verify:async()=>passed};
test('requires mailbox credentials and explicit historical cutoff',()=>{
 assert.equal(configured({ROBOKASSA_MAIL_USER:'a',ROBOKASSA_MAIL_PASSWORD:'b'}),false);
 assert.equal(configured({ROBOKASSA_MAIL_USER:'a',ROBOKASSA_MAIL_PASSWORD:'b',ROBOKASSA_MAIL_SINCE:'2026-11-13T00:00:00+03:00'}),true);
});
test('parses real notification format with exact kopecks and common invoice ID',async()=>{
 const p=await parsePayment(message(),123456,deps);
 assert.equal(p.id,'636928784');assert.equal(p.amount,110000);assert.equal(p.confirmedAt,123456);assert.equal(p.source,'email');
});
test('rejects spoofed, unsigned and partially signed messages',async()=>{
 assert.equal(await parsePayment(message(body,'other@example.test'),123,deps),null);
 assert.equal(await parsePayment(message(),123,{verify:async()=>({results:[]})}),null);
 assert.equal(await parsePayment(message(),123,{verify:async()=>({results:[{...passed.results[0],canonBodyLengthLimited:true}]})}),null);
 assert.equal(await parsePayment(message(),123,{verify:async()=>({results:[{...passed.results[0],signingDomain:'example.test'}]})}),null);
});
test('ambiguous, zero, fractional and duplicate amounts never become payments',async()=>{
 for(const text of [body+'Цена: 1100.00',body+'inv_id: 42',body.replace('1100.00','0.00'),body.replace('1100.00','1.001')])
  assert.equal(await parsePayment(message(text),123,deps),null);
});
test('temporary signature failure retries instead of silently discarding mail',async()=>{
 await assert.rejects(parsePayment(message(),123,{verify:async()=>({results:[{status:{result:'temperror'}}]})}),/temporarily/);
});
test('verifies actual DKIM bytes and rejects edited payment body',async()=>{
 const {privateKey,publicKey}=generateKeyPairSync('rsa',{modulusLength:2048});
 const source=message();
 const signed=await dkimSign(source,{signatureData:[{signingDomain:'robokassa.ru',selector:'test',privateKey:privateKey.export({type:'pkcs8',format:'pem'})}]});
 assert.ok(signed.signatures);
 const raw=Buffer.concat([Buffer.from(signed.signatures),source]);
 const resolver=async()=>[['v=DKIM1; p='+publicKey.export({type:'spki',format:'der'}).toString('base64')]];
 const real={verify:bytes=>dkimVerify(bytes,{resolver})};
 assert.equal((await parsePayment(raw,123,real)).amount,110000);
 assert.equal(await parsePayment(Buffer.from(raw.toString().replace('1100.00','9999.00')),123,real),null);
});
test('read-only polling saves before advancing UID and retries a failed save',async()=>{
 const fs=require('node:fs'),vm=require('node:vm');
 const rows=new Map();let fail=true,options,closed=0,saved=0;
 class Client {
  constructor(value){options=value;this.mailbox={uidValidity:99};}
  on(){} async connect(){} close(){closed++;}
  async mailboxOpen(path,opts){assert.equal(path,'INBOX');assert.equal(opts.readOnly,true);}
  async search(){return [7];}
  async fetchOne(_uid,query){return query.source?{source:message()}:{size:100,internalDate:new Date('2026-11-13T10:00:00Z')};}
 }
 const store={pipeline:async commands=>commands.map(([op,key,value])=>{
  if(op==='GET')return {result:rows.get(key)};
  if(op==='SET'){rows.set(key,value);return {result:'OK'};}
  throw Error(op);
 })};
 const context={module:{exports:{}},process:{env:{}},Buffer,Date,setTimeout,clearTimeout,
  require:id=>id==='./redis'?store:id==='./robokassa-payments'?{savePayment:async()=>{if(fail)throw Error('offline');saved++;}}:
   id==='imapflow'?{ImapFlow:Client}:id==='mailauth/lib/dkim/verify'?{dkimVerify:deps.verify}:require(id)};
 vm.runInNewContext(fs.readFileSync('lib/robokassa-mail.js','utf8'),context);
 const env={ROBOKASSA_MAIL_USER:'owner@yandex.ru',ROBOKASSA_MAIL_PASSWORD:'fake',ROBOKASSA_MAIL_SINCE:'2026-11-13T00:00:00+03:00'};
 await assert.rejects(context.module.exports.poll(env),/offline/);
 assert.equal([...rows.keys()].some(key=>key.includes(':uid:')),false);
 fail=false;await context.module.exports.poll(env);await context.module.exports.poll(env);
 assert.equal(saved,1);assert.equal(options.secure,true);assert.equal(options.logger,false);assert.equal(closed,3);
});

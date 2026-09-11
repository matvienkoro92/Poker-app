"use strict";
const test=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),vm=require("node:vm"),crypto=require("node:crypto");
const source=fs.readFileSync(require.resolve("../scripts/migrate-chat-media.js"),"utf8").replace('main().catch','globalThis.finished = main().catch');
const src="https://test.public.blob.vercel-storage.com/chat/img/tg_1/a.jpg";
async function run(apply,failWrite=false){
 let mapped=null,deleted=0,read=0;const process={argv:apply?["--apply"]:[],env:{BLOB_READ_WRITE_TOKEN:"test"},exitCode:0};
 const ctx={process,Buffer,URL,console:{log(){},error(){}},require(name){
  if(name==="node:crypto")return crypto;
  if(name==="../lib/chat-media-access")return require("../lib/chat-media-access");
  if(name==="../lib/chat-media-migration")return {migrationKey:()=>"mapping"};
  if(name==="../lib/redis")return {isConfigured:()=>true,pipeline:async cmds=>cmds.map(c=>{
   if(c[0]==="SCAN")return {result:["0",c[3]==="poker_app:chat_messages"?["thread"]:[]]};
   if(c[0]==="TYPE")return {result:"list"};
   if(c[0]==="LRANGE")return {result:[JSON.stringify({image:src})]};
   if(c[0]==="GET")return {result:mapped};
   if(c[0]==="SET"){if(failWrite)throw new Error("offline");mapped=c[2];return {result:"OK"};}
   throw new Error(c[0]);
  })};
  if(name==="@vercel/blob")return {get:async()=>{read++;return {statusCode:200,blob:{contentType:"image/jpeg"},stream:new ReadableStream({start(c){c.enqueue(Buffer.from("private image"));c.close();}})};},put:async()=>{throw new Error("unexpected private upload")},del:async()=>{assert.ok(mapped?.startsWith("data:image/jpeg;base64,"));deleted++;}};
  throw new Error(name);
 }};
 vm.runInNewContext(source,ctx);await ctx.finished;return {mapped,deleted,read,code:process.exitCode};
}
test("migration dry run performs no blob reads or deletes",async()=>assert.deepEqual(await run(false),{mapped:null,deleted:0,read:0,code:0}));
test("migration persists replacement before deleting public media",async()=>{const r=await run(true);assert.equal(r.code,0);assert.equal(r.deleted,1);assert.equal(Buffer.from(r.mapped.split(',')[1],'base64').toString(),'private image');});
test("migration keeps public source if replacement persistence fails",async()=>{const r=await run(true,true);assert.equal(r.code,1);assert.equal(r.deleted,0);assert.equal(r.mapped,null);});

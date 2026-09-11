"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const access = require("../lib/chat-media-access");
const src = "https://audit.public.blob.vercel-storage.com/chat/img/tg_1/picture.jpg";

test("attachment grants are reader-bound, expire and reject tampering", () => {
  const before = process.env.CHAT_MEDIA_SIGNING_SECRET;
  process.env.CHAT_MEDIA_SIGNING_SECRET = "test-only-media-secret";
  try {
    const signed = new URL(access.signMedia(src, "tg_1", 100000), "https://app.test");
    const q = signed.searchParams;
    assert.equal(access.verifyMedia(src, "tg_1", q.get("expires"), q.get("grant"), 100000), true);
    assert.equal(access.verifyMedia(src, "tg_2", q.get("expires"), q.get("grant"), 100000), false);
    assert.equal(access.verifyMedia(src + "?changed=1", "tg_1", q.get("expires"), q.get("grant"), 100000), false);
    assert.equal(access.verifyMedia(src, "tg_1", q.get("expires"), q.get("grant"), 4000000), false);
    assert.equal(access.isChatBlobUrl("https://evilblob.vercel-storage.com/chat/img/x"), false);
    const payload = { messages: [{ image: src, voice: src, document: src, text: "unchanged" }] };
    const protectedPayload = access.protectChatResponse(payload, "tg_1");
    assert.equal(payload.messages[0].image, src, "stored message must not acquire an expiring URL");
    for (const field of ["image", "voice", "document"]) assert.match(protectedPayload.messages[0][field], /^\/api\/chat-image\?/);
  } finally {
    if (before == null) delete process.env.CHAT_MEDIA_SIGNING_SECRET;
    else process.env.CHAT_MEDIA_SIGNING_SECRET = before;
  }
});

test("media proxy rejects a stranger before reading the blob", async () => {
  let reads = 0;
  const env = { BLOB_READ_WRITE_TOKEN: "test-blob", CHAT_MEDIA_SIGNING_SECRET: "test" };
  const exports = { exports: {} };
  const code = fs.readFileSync(require.resolve("../lib/api-handlers/chat-image"), "utf8");
  vm.runInNewContext(code, { module: exports, Buffer, URL, process: {env}, require(name) {
    if (name === "../resolve-telegram-auth") return { resolveTelegramIdentity: () => ({id:2}), memberIdFromIdentity: () => "tg_2" };
    if (name === "../app-user-blocks") return { rejectBlockedAppUser: async () => false };
    if (name === "../chat-media-access") return access;
    if (name === "@vercel/blob") return { get: async () => { reads++; } };
    throw new Error(name);
  }});
  const res = { setHeader(){}, status(n){this.code=n;return this;},json(body){this.body=body;return this;} };
  await exports.exports({method:"GET",query:{src},body:{}},res);
  assert.equal(res.code,403);
  assert.equal(reads,0);
});

test("client sends media grants through the authenticated proxy in Telegram and PWA", () => {
  const source = fs.readFileSync(require.resolve("../app-auth.js"),"utf8");
  const code = source.slice(source.indexOf("function pokerChatDisplayImageSrc("),source.indexOf("function pokerApiAuthJsonBody("));
  for(const auth of ["initData=signed", "pwaSession=session", "pwaVkSession=vk"]) {
    const ctx={URL,window:{},getApiBase:()=>"https://app.test",pokerApiAuthQuery:()=>auth};
    vm.runInNewContext(code,ctx);
    assert.equal(ctx.pokerChatDisplayImageSrc('/api/chat-image?grant=x'), 'https://app.test/api/chat-image?grant=x&'+auth);
  }
});

test("authorized reader can retrieve migrated media; failed mapping reads fail closed", async () => {
  const old = process.env.CHAT_MEDIA_SIGNING_SECRET;
  process.env.CHAT_MEDIA_SIGNING_SECRET = "reader-test";
  try {
    const q=Object.fromEntries(new URL(access.signMedia(src,"tg_1"),"https://app.test").searchParams);
    let unavailable=false;
    const mod={exports:{}};
    vm.runInNewContext(fs.readFileSync(require.resolve("../lib/api-handlers/chat-image"),"utf8"), {
      module:mod,Buffer,URL,process:{env:{BLOB_READ_WRITE_TOKEN:"test"}},require(name){
        if(name==="../resolve-telegram-auth")return {resolveTelegramIdentity:()=>({id:1}),memberIdFromIdentity:()=>"tg_1"};
        if(name==="../app-user-blocks")return {rejectBlockedAppUser:async()=>false};
        if(name==="../chat-media-access")return access;
        if(name==="../chat-media-migration")return {migratedMedia:async()=>{if(unavailable)throw new Error("offline");return "data:application/pdf;base64,JVBERg==";}};
        throw new Error(name);
      }
    });
    const response=()=>({headers:{},setHeader(k,v){this.headers[k]=v;},status(n){this.code=n;return this;},json(x){this.body=x;return this;},send(x){this.body=x;return this;},end(){return this;}});
    const res=response();await mod.exports({method:"GET",query:q},res);
    assert.equal(res.code,200);assert.equal(res.body.toString(),"%PDF");
    assert.equal(res.headers["Cache-Control"],"private, no-store");
    unavailable=true;const failed=response();await mod.exports({method:"GET",query:q},failed);assert.equal(failed.code,503);
  } finally {if(old==null)delete process.env.CHAT_MEDIA_SIGNING_SECRET;else process.env.CHAT_MEDIA_SIGNING_SECRET=old;}
});

test("chat never uploads to a public store; wall and private-store policies stay separate", async () => {
  const calls=[];
  const env={BLOB_READ_WRITE_TOKEN:"public-token"};
  const mod={exports:{}};
  vm.runInNewContext(fs.readFileSync(require.resolve("../lib/chat-image-blob"),"utf8"),{module:mod,process:{env},console,Buffer,Date,Math,require(name){
    assert.equal(name,"@vercel/blob");return {put:async(path,buffer,options)=>{calls.push({path,options});return {url:"https://store.private.blob.vercel-storage.com/"+path};}};
  }});
  const data="data:image/jpeg;base64,"+Buffer.alloc(32,7).toString("base64");
  assert.equal(await mod.exports.tryUploadChatImageDataUrl(data,"tg_1"),null);
  assert.equal(calls.length,0,"existing public token must not publish a private message");
  await mod.exports.tryUploadChatImageDataUrl(data,"tg_1",true);
  assert.equal(calls[0].options.access,"public");assert.match(calls[0].path,/^wall\//);
  env.CHAT_BLOB_READ_WRITE_TOKEN="private-token";
  await mod.exports.tryUploadChatImageDataUrl(data,"tg_1");
  await mod.exports.tryUploadChatVoiceDataUrl("data:audio/webm;base64,"+Buffer.alloc(32,7).toString("base64"),"tg_1");
  await mod.exports.tryUploadChatDocumentDataUrl("data:application/pdf;base64,"+Buffer.alloc(32,7).toString("base64"),"tg_1");
  for(const call of calls.slice(1)){assert.equal(call.options.access,"private");assert.equal(call.options.token,"private-token");assert.match(call.path,/^chat\//);}
});

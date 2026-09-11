"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const { publicAvatarUrl, sendAvatarImage } = require("../lib/public-avatar");
const { homeState, bankFor } = require("../lib/api-handlers/tournament-bet");

test("public avatars preserve ordinary URLs and version uploaded image URLs", () => {
  assert.equal(publicAvatarUrl("preset:tiger", "ID1"), "preset:tiger");
  assert.equal(publicAvatarUrl("https://example.org/a.jpg", "ID1"), "https://example.org/a.jpg");
  const a = publicAvatarUrl("data:image/jpeg;base64,YQ==", "ID1");
  assert.match(a, /^\/api\/avatar\?userId=ID1&format=image&v=[a-f0-9]{16}$/);
  assert.notEqual(a, publicAvatarUrl("data:image/jpeg;base64,Yg==", "ID1"));
  assert.equal(publicAvatarUrl("data:image/jpeg;base64,YQ==", ""), "");
});

test("image responses send binary bytes with correct MIME and bounded caching", () => {
  const res = { headers: {}, setHeader(k,v) { this.headers[k]=v; }, status(v) { this.code=v; return this; }, send(v) { this.body=v; }, end() {} };
  sendAvatarImage(res, "data:image/png;base64,YWJj");
  assert.equal(res.code,200); assert.equal(res.body.toString(),"abc");
  assert.equal(res.headers["Content-Type"],"image/png");
  assert.equal(res.headers["X-Content-Type-Options"],"nosniff");
  assert.match(res.headers["Cache-Control"],/max-age=300/);
  sendAvatarImage(res, "data:image/svg+xml;base64,YQ=="); assert.equal(res.code,404);
  sendAvatarImage(res, "data:image/jpeg;base64," + Buffer.alloc(330*1024).toString("base64")); assert.equal(res.code,404);
});

test("public image GET uses the avatar handler without writes or self authorization", async () => {
  const commands=[];
  const mod={exports:{}};
  const dependencies={
    "../resolve-telegram-auth":{resolveTelegramIdentity(){throw new Error("public image must not resolve self auth");}},
    "../account-id":{},
    "../api-limits":{},
    "../public-avatar":require("../lib/public-avatar"),
    "../redis":{isConfigured:()=>true,pipeline:async(cmds)=>{commands.push(...cmds);return [{result:"data:image/jpeg;base64,YWJj"}];}},
  };
  vm.runInNewContext(fs.readFileSync(require.resolve("../lib/api-handlers/avatar"),"utf8"),{module:mod,require:name=>dependencies[name],process:{env:{}},Buffer});
  const res={headers:{},setHeader(k,v){this.headers[k]=v;},status(v){this.code=v;return this;},send(v){this.body=v;},end(){}};
  await mod.exports({method:"GET",query:{userId:"ID123",format:"image"}},res);
  assert.equal(res.code,200);assert.equal(res.body.toString(),"abc");
  assert.equal(commands.length,1);assert.equal(commands[0][0],"GET");
});

test("home summary keeps amounts, winner and counts without private lists or image bodies", () => {
  const event = {id:"tb_1",status:"settled",title:"Evening",startingBank:1000,stakePrice:500,winnerAccountId:"ID1",winnerPaidAmount:2000,winnerPaidAt:"2026-09-11T00:00:00Z",entries:[{accountId:"ID1",name:"Winner",avatar:"data:image/jpeg;base64,YQ==",stake:500},{accountId:"ID2",name:"Other"}]};
  const current = {...event,id:"tb_2",status:"open"};
  const result=homeState(current,[event,event,{...event,id:"personal",createdByPlayer:true}]);
  assert.equal(result.bank,bankFor(current)); assert.equal(result.participantsCount,2);
  assert.equal(result.completedEvents.length,1); assert.equal(result.completedEvents[0].winnerPaidAmount,2000);
  assert.equal(result.completedEvents[0].entries.length,1); assert.equal(result.completedEvents[0].entries[0].name,"Winner");
  const json=JSON.stringify(result); assert.ok(!json.includes("data:image")); assert.ok(!json.includes("Other")); assert.ok(!json.includes('"accountId"')); assert.ok(!json.includes('"rating"'));
  assert.equal(homeState(null,[event]).completedEvents.length,1);
});

function client() {
  const requests=[]; const context={window:{},getApiBase:()=>"https://api.example/",fetch:(url,options)=>new Promise(resolve=>requests.push({url,options,resolve})),Date,Promise};
  vm.runInNewContext(fs.readFileSync(require.resolve("../app-home-data.js"),"utf8"),context);
  return {api:context.window,requests,finish(i,payload={ok:true,bank:100},status=200){requests[i].resolve({ok:status===200,json:async()=>payload});}};
}
test("home widgets share one request, cache success and force refresh", async () => {
  const h=client();const a=h.api.pokerLoadTournamentBetHome(),b=h.api.pokerLoadTournamentBetHome();
  assert.equal(a,b); assert.equal(h.requests.length,1); assert.equal(h.requests[0].url,"https://api.example/api/tournament-bet?mode=home");
  h.finish(0);await a;await h.api.pokerLoadTournamentBetHome();assert.equal(h.requests.length,1);
  const fresh=h.api.pokerLoadTournamentBetHome(true);h.finish(1);await fresh;
  assert.equal(h.requests[0].options.cache,"no-store");
  assert.equal(h.api.pokerPublicImageSrc("/api/avatar?userId=ID1"),"https://api.example/api/avatar?userId=ID1");
});
test("failed summary retries and invalidated in-flight responses cannot replace fresh cache", async () => {
  const h=client();const failure=h.api.pokerLoadTournamentBetHome();h.finish(0,{},503);await assert.rejects(failure);
  const old=h.api.pokerLoadTournamentBetHome();h.api.pokerInvalidateTournamentBetHome();
  const fresh=h.api.pokerLoadTournamentBetHome();h.finish(2,{ok:true,bank:200});await fresh;
  h.finish(1,{ok:true,bank:100});await old;
  assert.equal((await h.api.pokerLoadTournamentBetHome()).bank,200);
});

test("raffle badge shares fresh data but isolates account switches and forced refresh", async () => {
  const source=fs.readFileSync(require.resolve("../app-home-init.js"),"utf8");
  const requests=[],updates=[];let auth="?pwaSession=one";
  const ctx={window:{},Date,Promise,getApiBase:()=>"https://api.example",pokerRafflesApiQueryLeading:()=>auth,updateRaffleBadge:rows=>updates.push(rows),fetch:()=>new Promise(resolve=>requests.push(resolve))};
  vm.createContext(ctx);vm.runInContext(source.slice(source.indexOf("var raffleBadgeHomeFetchPromise"),source.indexOf("hydrateRaffleBadgeFromStorage();")),ctx);
  const finish=(i,name)=>requests[i]({ok:true,json:async()=>({ok:true,activeRaffles:[name]})});
  const first=ctx.fetchRaffleBadge(),same=ctx.fetchRaffleBadge();assert.equal(first,same);
  auth="?pwaSession=two";const second=ctx.fetchRaffleBadge();assert.equal(requests.length,2);
  finish(1,"new");await second;finish(0,"old");await first;
  assert.deepEqual(updates,[["new"]]);await ctx.fetchRaffleBadge();assert.equal(requests.length,2);
  const forced=ctx.fetchRaffleBadge({force:true});assert.equal(requests.length,3);finish(2,"fresh");await forced;
  assert.deepEqual(updates.at(-1),["fresh"]);
});

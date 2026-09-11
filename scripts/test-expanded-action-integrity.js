#!/usr/bin/env node
"use strict";

// Isolated real Redis, Unix socket only, no persistence and no production credentials.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawn, execFile } = require("node:child_process");
const { promisify } = require("node:util");
const run = promisify(execFile);
const serverBin = process.env.REDIS_SERVER_BIN || "redis-server";
const cliBin = process.env.REDIS_CLI_BIN || "redis-cli";

async function main() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "poker-redis-test-"));
  const socket = path.join(dir, "redis.sock");
  const server = spawn(serverBin, ["--port", "0", "--unixsocket", socket, "--save", "", "--appendonly", "no", "--dir", dir], { stdio: "ignore" });
  let startupError;
  server.on("error", (error) => { startupError = error; });
  async function command(args) {
    const { stdout } = await run(cliBin, ["-s", socket, "--json", ...args.map(String)], { maxBuffer: 1024 * 1024 });
    if (stdout.startsWith("error:")) throw new Error(stdout.trim());
    return JSON.parse(stdout);
  }
  const originalFetch = global.fetch;
  try {
    for (let i = 0; i < 100 && !fs.existsSync(socket) && !startupError; i++) await new Promise((resolve) => setTimeout(resolve, 30));
    if (startupError) throw startupError;
    assert.equal(await command(["PING"]), "PONG");
    process.env.UPSTASH_REDIS_REST_URL = "https://isolated-redis.invalid";
    process.env.UPSTASH_REDIS_REST_TOKEN = "local-test";
    global.fetch = async (url, options) => {
      if(String(url)!=="https://isolated-redis.invalid/pipeline") return {ok:true,json:async()=>({ok:true,result:{}}),text:async()=>"{}"};
      const rows = [];
      for (const cmd of JSON.parse(options.body)) {
        try { rows.push({ result: await command(cmd) }); }
        catch (error) { rows.push({ error: error.message }); }
      }
      return { ok: true, json: async () => rows };
    };
    process.env.TELEGRAM_BOT_TOKEN="expanded-audit-token";
    process.env.TELEGRAM_ADMIN_ID="388008256";
    process.env.CLUB_CHAT_REQUIRE_APPLICATION="0";
    process.env.NODE_ENV="test";
    const root=path.resolve(__dirname,"..");
    const {signPwaSession}=require(path.join(root,"lib/poker-pwa-session"));
    const admin=signPwaSession({id:388008256,username:"admin"},process.env.TELEGRAM_BOT_TOKEN),peer=signPwaSession({id:1002},process.env.TELEGRAM_BOT_TOKEN),user=signPwaSession({id:1001},process.env.TELEGRAM_BOT_TOKEN);
    for(const [tg,dt] of [["tg_388008256","ID388008"],["tg_1001","ID100001"],["tg_1002","ID100002"]]){await command(["HSET","poker_app:visitor_dt_ids",tg,dt]);await command(["HSET","poker_app:id_to_user",dt,tg]);}
    async function invoke(h,method,token,body){const res={code:200,setHeader(){},status(n){this.code=n;return this},json(body){this.body=body;return this},end(){return this}};await h({method,query:{},body:{...body,pwaSession:token},headers:{host:"audit.local"}},res);return res;}
    const report=require(path.join(root,"lib/api-handlers/admin-report-shifts"));
    const rk="poker_app:admin_report_shifts";
    const row=id=>JSON.stringify({id,authorId:"tg_388008256",createdAt:new Date().toISOString(),deposit:100,total:100,rakeback:0,rakebackRows:[]});
    const workingFetch=global.fetch;
    await command(["RPUSH",rk,row("keep"),row("delete")]);
    global.fetch=async(url,opts)=>JSON.parse(opts.body||"[]").some(c=>c[0]==="LRANGE"&&c[1]===rk)?{ok:true,json:async()=>[{error:"injected read failure"}]}:workingFetch(url,opts);
    const deleted=await invoke(report,"DELETE",admin,{id:"delete"});global.fetch=workingFetch;
    assert.equal(deleted.code,503);assert.equal(await command(["LLEN",rk]),2);
    await command(["DEL",rk]);
    console.log("PASS: failed read cannot erase reports");
    await command(["RPUSH",rk,row("old")]);let fired=false,newId;
    global.fetch=async(url,opts)=>{const r=await workingFetch(url,opts);if(!fired&&String(url).includes("isolated-redis.invalid")&&JSON.parse(opts.body).some(c=>c[0]==="LRANGE"&&c[1]===rk)){fired=true;const created=await invoke(report,"POST",admin,{date:"11.09.2026",deposit:777,requestId:"real-report-create"});assert.equal(created.code,200);newId=created.body.report.id;}return r;};
    const edited=await invoke(report,"PUT",admin,{id:"old",deposit:900});global.fetch=workingFetch;
    const rows=(await command(["LRANGE",rk,"0","10"])).map(JSON.parse);
    assert.equal(edited.code,409);assert.equal(rows.filter(r=>r.id==="old").length,1);assert(rows.some(r=>r.id===newId));
    console.log("PASS: concurrent create survives stale edit");
    const chat=require(path.join(root,"lib/api-handlers/chat"));const group="group_real_audit",gk="poker_app:chat_group_meta:"+group;
    await command(["SET",gk,JSON.stringify({title:"Original",createdBy:"tg_388008256",members:["tg_388008256","tg_1002"]})]);fired=false;
    global.fetch=async(url,opts)=>{const r=await workingFetch(url,opts);if(!fired&&String(url).includes("isolated-redis.invalid")&&JSON.parse(opts.body).some(c=>c[0]==="GET"&&c[1]===gk)){fired=true;const leave=await invoke(chat,"POST",peer,{action:"leavegroup",groupId:group});assert.equal(leave.code,200);}return r;};
    const renamed=await invoke(chat,"POST",admin,{action:"updategroupinfo",groupId:group,title:"Renamed"});global.fetch=workingFetch;
    assert.equal(renamed.code,409);assert(!JSON.parse(await command(["GET",gk])).members.includes("tg_1002"));
    console.log("PASS: stale group rename cannot restore membership");
    const respect=require(path.join(root,"lib/api-handlers/respect"));let count=0,release;const gate=new Promise(r=>release=r);
    global.fetch=async(url,opts)=>{const r=await workingFetch(url,opts);if(String(url).includes("isolated-redis.invalid")&&JSON.parse(opts.body).some(c=>c[0]==="HGET"&&c[1]==="poker_app:respect_votes:ID100002")&&count<2){if(++count===2)release();await gate;}return r;};
    const votes=await Promise.all([1,2].map(()=>invoke(respect,"POST",user,{action:"up",targetUserId:"ID100002"})));global.fetch=workingFetch;
    assert.deepEqual(votes.map(r=>r.code).sort(),[200,400]);assert.equal(await command(["HLEN","poker_app:respect_votes:ID100002"]),1);assert.equal(await command(["HGET","poker_app:respect_score","ID100002"]),"1");
    console.log("PASS: concurrent votes count once");
    const retryBody = {date:"11.09.2026",deposit:777,requestId:"real-report-create"};
    const beforeCount = await command(["LLEN",rk]);
    const replay = await invoke(report,"POST",admin,retryBody);
    assert.equal(replay.code,200);assert.equal(replay.body.replayed,true);assert.equal(replay.body.report.id,newId);
    assert.equal(await command(["LLEN",rk]),beforeCount);
    assert.equal((await invoke(report,"POST",admin,{...retryBody,deposit:999})).code,409);
    assert.equal((await invoke(report,"POST",admin,{date:"11.09.2026"})).code,400);
    const uniqueBody = {...retryBody,requestId:"concurrent-report-retry"};
    const createdTwice = await Promise.all([1,2].map(()=>invoke(report,"POST",admin,uniqueBody)));
    assert.equal(createdTwice.filter(r=>r.code===200).length,1);
    assert.equal(await command(["LLEN",rk]),beforeCount+1);
    assert.equal((await invoke(report,"POST",admin,uniqueBody)).body.replayed,true);
    const lostBody = {...retryBody,requestId:"lost-response-report"};
    global.fetch=async(url,opts)=>{
      const response=await workingFetch(url,opts);
      if(JSON.parse(opts.body||"[]").some(c=>c[0]==="EVAL"&&String(c[1]).includes("report_transaction_v1"))) throw Error("response lost after commit");
      return response;
    };
    const lost=await invoke(report,"POST",admin,lostBody);global.fetch=workingFetch;
    assert.equal(lost.code,503);
    const storedCount=await command(["LLEN",rk]);
    const recovered=await invoke(report,"POST",admin,lostBody);
    assert.equal(recovered.code,200);assert.equal(recovered.body.replayed,true);
    assert.equal(await command(["LLEN",rk]),storedCount);
    console.log("PASS: report retries are idempotent; changed payload rejected");
    const draftKey="poker_app:admin_report_rakeback_draft:shared";
    await command(["DEL",rk,draftKey,draftKey+":meta"]);
    const tx=require(path.join(root,"lib/report-transaction"));
    async function change(label, barrier) {
      return tx.run(async()=>{
        const [draft]=await tx.pipeline([["GET",draftKey]]);
        const rows=draft.result ? JSON.parse(draft.result).rows : [];
        await tx.pipeline([["LRANGE",rk,"0","499"]]);
        if(barrier) await barrier();
        rows.push({id:label});
        await tx.pipeline([["SET",draftKey,JSON.stringify({rows})],["LPUSH",rk,row(label)]]);
        return {status:200};
      });
    }
    let arrived=0,openGate;const bothReady=new Promise(r=>openGate=r);
    const barrier=async()=>{if(++arrived===2)openGate();await bothReady};
    const changes=await Promise.allSettled([change("a",barrier),change("b",barrier)]);
    assert.equal(changes.filter(r=>r.status==="fulfilled").length,1);
    const loser=changes.find(r=>r.status==="rejected");assert.equal(loser.reason.status,409);
    const draftRows=JSON.parse(await command(["GET",draftKey])).rows;
    assert.equal(draftRows.length,1);
    assert.equal(JSON.parse((await command(["LRANGE",rk,"0","0"]))[0]).id,draftRows[0].id);
    await change("retry");assert.equal(JSON.parse(await command(["GET",draftKey])).rows.length,2);
    const snapshot=await command(["GET",draftKey]),reportSnapshot=await command(["LRANGE",rk,"0","499"]);
    global.fetch=async(url,opts)=>JSON.parse(opts.body||"[]").some(c=>c[0]==="EVAL"&&String(c[1]).includes("report_transaction_v1"))?{ok:true,json:async()=>[{error:"write failed"}]}:workingFetch(url,opts);
    await assert.rejects(change("failed"));global.fetch=workingFetch;
    assert.equal(await command(["GET",draftKey]),snapshot);assert.deepEqual(await command(["LRANGE",rk,"0","499"]),reportSnapshot);
    await command(["SET",draftKey,"broken"]);await assert.rejects(change("corrupt"));
    assert.deepEqual(await command(["LRANGE",rk,"0","499"]),reportSnapshot);
    console.log("PASS: report/draft commit together; conflicts, write errors and corruption preserve data");
    for(const [action,expected] of [["down",-1],["withdraw",0],["up",1]]) {
      const r=await invoke(respect,"POST",user,{action,targetUserId:"ID100002"});assert.equal(r.code,200);assert.equal(r.body.score,expected);
    }
    await command(["HSET","poker_app:respect_score","ID100002","broken"]);
    assert.equal((await invoke(respect,"POST",user,{action:"down",targetUserId:"ID100002"})).code,503);
    assert.equal(await command(["HGET","poker_app:respect_votes:ID100002","ID100001"]),"up");
    const {atomicWrite}=require(path.join(root,"lib/redis-atomic"));
    await command(["SET","bad-map","not-a-hash"]);
    await assert.rejects(atomicWrite([["HSET","good-map","player","value"],["HSET","bad-map","player","value"]]));
    assert.equal(await command(["EXISTS","good-map"]),0);
    await command(["RPUSH","delete-comments","comment"]);
    await atomicWrite([["LREM","delete-comments","1","comment"],["DEL","comment-reactions"]]);
    assert.equal(await command(["LLEN","delete-comments"]),0);
    console.log("PASS: vote transitions, invalid scores, atomic CRM mapping and comment deletion");
    await command(["DEL",rk,draftKey,draftKey+":meta"]);
    const seed = {id:"sync-report",authorId:"tg_388008256",createdAt:"2026-09-05T12:00:00Z",date:"05.09.2026",deposit:100,total:100,rakeback:0,rakebackRows:[]};
    await command(["RPUSH",rk,JSON.stringify(seed)]);
    const draftBody={action:"rakeback_draft_save",date:"shared",rakebackPatch:true,rakebackRows:[{groupId:"sync-player",kind:"base",room:"P21",playerId:"sync-player",rake:100,percent:50,amount:50,roomAmount:50,ownerId:"tg_388008256",saved:true,createdAt:"2026-09-05T10:00:00Z",entryAddedAt:"2026-09-05T10:00:00Z"}]};
    global.fetch=async(url,opts)=>JSON.parse(opts.body||"[]").some(c=>c[0]==="EVAL"&&String(c[1]).includes("report_transaction_v1"))?{ok:true,json:async()=>[{error:"write failed"}]}:workingFetch(url,opts);
    const failedSync=await invoke(report,"POST",admin,draftBody);global.fetch=workingFetch;
    assert.equal(failedSync.code,503);assert.equal(await command(["GET",draftKey]),null);
    assert.equal(JSON.parse((await command(["LRANGE",rk,"0","0"]))[0]).rakeback,0);
    const syncResult=await invoke(report,"POST",admin,draftBody);assert.equal(syncResult.code,200);
    assert.equal(JSON.parse((await command(["LRANGE",rk,"0","0"]))[0]).rakeback,50);
    assert.equal(JSON.parse(await command(["GET",draftKey])).rows[0].reportId,"sync-report");
    console.log("PASS: real rakeback handler commits draft and attached report together");
    const crm=require(path.join(root,"lib/api-handlers/player-crm"));
    const menuAccessToken=require(path.join(root,"lib/admin-menu-access-token")).signAccessToken("crm","tg_388008256",process.env.TELEGRAM_BOT_TOKEN);
    await command(["SET","poker_app:crm_activity_events:ID100001","wrong-type"]);
    const failedEvent=await invoke(crm,"POST",admin,{menuAccessToken,action:"record_event",accountId:"ID100001",type:"deposit",amount:100});
    assert.equal(failedEvent.code,503);assert.equal(failedEvent.body.ok,false);
    await command(["SET","poker_app:pokerplus_user_ids","wrong-type"]);
    const failedLink=await invoke(crm,"POST",admin,{menuAccessToken,action:"link_identity",accountId:"ID999999",dtId:"ID999999",telegramId:"999999",pokerPlusId:"P999999"});
    assert.equal(failedLink.code,503);assert.equal(await command(["HGET","poker_app:visitor_dt_ids","tg_999999"]),null);
    await command(["DEL","poker_app:pokerplus_user_ids"]);
    const feedback=require(path.join(root,"lib/api-handlers/profile-event-feedback"));
    const commentResult=await invoke(feedback,"POST",user,{action:"comment",eventId:"integrity-comment",text:"keep",requestId:"integrity-comment"});
    assert.equal(commentResult.code,200);const commentId=commentResult.body.feedback.comments[0].id;
    global.fetch=async(url,opts)=>JSON.parse(opts.body||"[]").some(c=>c[0]==="EVAL"&&String(c[1]).includes("guarded-write-v1"))?{ok:true,json:async()=>[{error:"write failed"}]}:workingFetch(url,opts);
    const failedDelete=await invoke(feedback,"POST",user,{action:"delete-comment",eventId:"integrity-comment",commentId});global.fetch=workingFetch;
    assert.equal(failedDelete.code,503);assert.equal(await command(["LLEN","poker_app:profile_event_comments:"+require("node:crypto").createHash("sha256").update("integrity-comment").digest("hex").slice(0,32)]),1);
    const successDelete=await invoke(feedback,"POST",user,{action:"delete-comment",eventId:"integrity-comment",commentId});assert.equal(successDelete.code,200);
    assert.equal(successDelete.body.feedback.comments.length,0);
    console.log("PASS: CRM event/link and comment deletion report storage failure honestly");

  } finally {
    global.fetch = originalFetch;
    server.kill("SIGTERM");
    await new Promise((resolve) => server.exitCode != null ? resolve() : server.once("exit", resolve));
    fs.rmSync(dir, { recursive: true, force: true });
  }
}
main().catch((error) => { console.error(error); process.exitCode = 1; });

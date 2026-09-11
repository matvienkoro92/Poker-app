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
      assert.equal(String(url), "https://isolated-redis.invalid/pipeline");
      const rows = [];
      for (const cmd of JSON.parse(options.body)) {
        try { rows.push({ result: await command(cmd) }); }
        catch (error) { rows.push({ error: error.message }); }
      }
      return { ok: true, json: async () => rows };
    };
    const { syncCalculationDraft: sync } = require("../lib/calculation-draft");
    const { saveProfileComment: comment } = require("../lib/profile-comment-store");
    const { runCampaignRecipient: deliver, withCampaignJob } = require("../lib/crm-campaign-delivery");
    const { sliceMessagesBeforeCursor: before } = require("../lib/chat-pagination");
    const key="poker_app:admin_report_calculations_draft:20260907";
    await command(["SET",key,JSON.stringify({draft:{cash:[10],roomWinLoss:[20],rake:[30]}})]);
    const load=()=>sync({action:"calculation_draft_load",weekStart:"20260907"},"admin");
    const body={action:"calculation_draft_save",weekStart:"20260907",calculationDraftGroup:"cash",calculationDraft:{cash:[99]},calculationDraftVersion:(await load()).json.calculationDraftVersion};
    const rs=await Promise.all([sync(body,"A"),sync({...body,calculationDraftGroup:"winloss",calculationDraft:{roomWinLoss:[88]}},"B")]);
    assert.deepEqual(rs.map(r=>r.status).sort(),[200,409]);
    assert.equal((await sync(body,"stale")).status,409);
    assert.equal((await sync({...body,calculationDraftVersion:undefined},"old-client")).status,409);
    const saved=JSON.parse(await command(["GET",key]));assert.deepEqual(saved.draft.rake,[30]);
    const workingFetch=global.fetch;
    global.fetch=async()=>({ok:true,json:async()=>[{error:"offline"}]});
    assert.equal((await load()).status,503);assert.equal((await sync(body,"A")).status,503);
    global.fetch=workingFetch;
    const fresh=(await load()).json.calculationDraftVersion;
    global.fetch=async(url,opts)=>JSON.parse(opts.body)[0][0]==="EVAL"?{ok:true,json:async()=>[{error:"write failed"}]}:workingFetch(url,opts);
    assert.equal((await sync({...body,calculationDraftVersion:fresh},"A")).status,503);
    global.fetch=workingFetch;assert.deepEqual(JSON.parse(await command(["GET",key])),saved);
    await command(["SET",key,"broken"]);assert.equal((await load()).status,503);
    const c={id:"c1",memberId:"ID1",text:"hello"};
    const cs=await Promise.all(Array.from({length:8},()=>comment("comments","req1",c,80)));
    assert.equal(cs.filter(x=>x===1).length,1);assert.equal(cs.filter(x=>x===0).length,7);assert.equal(await command(["LLEN","comments"]),1);
    assert.equal(await comment("comments","req1",{...c,text:"changed"},80),-1);
    await command(["SET","bad-comments","bad"]);assert.equal(await comment("bad-comments","req2",c,80),null);assert.equal(await command(["GET","req2"]),null);
    global.fetch=async(url,opts)=>{await workingFetch(url,opts);throw Error("response lost")};
    assert.equal(await comment("comments","req3",{...c,id:"c3"},80),null);
    global.fetch=workingFetch;
    assert.equal(await comment("comments","req3",{...c,id:"c3"},80),0);assert.equal(await command(["LLEN","comments"]),2);
    let sends=0;
    await Promise.allSettled(Array.from({length:4},()=>deliver("job12345","ID1",async()=>{sends++;await new Promise(r=>setTimeout(r,40));return {delivered:true,sentBot:1}})));
    assert.equal(sends,1);await deliver("job12345","ID1",async()=>{throw Error("must replay")});
    await assert.rejects(deliver("job12345","ID2",async()=>{throw Error("uncertain send")}),/uncertain/);
    await assert.rejects(deliver("job12345","ID2",async()=>{sends++;return {delivered:true}}),/не подтверждена/);assert.equal(sends,1);
    await deliver("job12345","ID3",async()=>({rateLimited:true}));
    let retried=0;await deliver("job12345","ID3",async()=>{retried++;return {delivered:true}});assert.equal(retried,1);
    const locks=await Promise.all(Array.from({length:4},()=>withCampaignJob("job12345",async()=>{await new Promise(r=>setTimeout(r,50));return {status:200}})));
    assert.equal(locks.filter(x=>x.status===200).length,1);assert.equal(await command(["GET","poker_app:crm_job_lock:job12345"]),null);
    const ms=[1,2,3].map(n=>({id:String(n),time:`2026-09-11T12:0${n}:00Z`}));
    for(const id of ["","missing","3"])assert.deepEqual(before(ms,id,ms[2].time,40).messages.map(m=>m.id),["1","2"]);
    const { recover } = require("./recover-chat-history");
    const historyKey="poker_app:chat:1_2", indexKey="poker_app:chat_thread_msg_index:"+historyKey;
    const older=JSON.stringify({id:"old",time:"2026-09-01T00:00:00Z",text:"old"});
    const recent=JSON.stringify({id:"new",time:"2026-09-02T00:00:00Z",text:"new"});
    await command(["LPUSH",historyKey,recent]);await command(["HSET",indexKey,"old",older,"new",recent]);
    assert.equal((await recover(historyKey)).recoverableMessages,1);assert.equal(await command(["LLEN",historyKey]),1);
    const restored=await recover(historyKey,{apply:true,backup:path.join(dir,"history-backup.json")});
    assert.equal(restored.totalMessages,2);assert.equal(await command(["HLEN",indexKey]),0);
    assert.deepEqual(await command(["LRANGE",historyKey,"0","1"]),[recent,older]);
    await command(["HSET",indexKey,"old",older]);
    global.fetch=async(url,opts)=>{if(JSON.parse(opts.body)[0][0]==="EVAL")await command(["LPUSH",historyKey,JSON.stringify({id:"concurrent",time:"2026-09-03T00:00:00Z"})]);return workingFetch(url,opts)};
    await assert.rejects(recover(historyKey,{apply:true,backup:path.join(dir,"conflict-backup.json")}),/Thread changed/);
    global.fetch=workingFetch;assert.equal(await command(["LLEN",historyKey]),3);assert.equal(await command(["HLEN",indexKey]),1);
    console.log("Section integrity passed: draft conflicts and failures; atomic comments/lost responses; exclusive jobs; durable delivery replay; ambiguous-send blocking; time cursors.");
  } finally {
    global.fetch = originalFetch;
    server.kill("SIGTERM");
    await new Promise((resolve) => server.exitCode != null ? resolve() : server.once("exit", resolve));
    fs.rmSync(dir, { recursive: true, force: true });
  }
}
main().catch((error) => { console.error(error); process.exitCode = 1; });

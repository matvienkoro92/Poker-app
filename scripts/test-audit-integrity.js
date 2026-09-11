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
    const { pipeline } = require("../lib/redis");
    const { compareAndSet, compareHashAndSet } = require("../lib/redis-cas");
    await command(["SET", "deal", "pending"]);
    const completed = await Promise.all(Array.from({length:8}, () => compareAndSet("deal", "pending", "completed", [
      ["HINCRBY", "deal-counts", "buyer", "1"], ["HINCRBY", "deal-counts", "seller", "1"]
    ])));
    assert.equal(completed.filter(v => v === true).length, 1);
    assert.equal(await command(["HGET", "deal-counts", "buyer"]), "1");
    assert.equal(await command(["HGET", "deal-counts", "seller"]), "1");
    await command(["SET", "deal", "pending"]);
    await command(["HSET", "deal-counts", "seller", "invalid"]);
    assert.equal(await compareAndSet("deal", "pending", "completed", [["HINCRBY", "deal-counts", "buyer", "1"], ["HINCRBY", "deal-counts", "seller", "1"]]), null);
    assert.equal(await command(["GET", "deal"]), "pending");
    assert.equal(await command(["HGET", "deal-counts", "buyer"]), "1");

    await command(["SET", "event", "active"]);
    const bookings = await Promise.all(Array.from({length:4}, (_,i) => compareHashAndSet("seats", "event", "active", [], "player"+i, JSON.stringify({seatIndex:0}))));
    assert.equal(bookings.filter(v => v === true).length, 1);
    assert.equal(await command(["HLEN", "seats"]), 1);
    const pairs = await command(["HGETALL", "seats"]);
    await command(["SET", "event", "closed"]);
    assert.equal(await compareHashAndSet("seats", "event", "active", Array.isArray(pairs) ? pairs : Object.entries(pairs).flat(), "another", "{}"), false);

    // Run the actual wall handler, with only identity/notifications substituted.
    const vm = require("node:vm"), mod = {exports:{}};
    const wallSource = fs.readFileSync(path.join(__dirname,"../lib/api-handlers/profile-wall.js"),"utf8");
    vm.runInNewContext(wallSource, {module:mod,process,console,Buffer,Date,require(name){
      if(name === "crypto") return require("node:crypto");
      if(name === "../redis") return {pipeline,isConfigured:()=>true};
      if(name === "../redis-cas") return {compareAndSet};
      if(name === "../resolve-telegram-auth") return {resolveTelegramIdentity:()=>({id:1}),memberIdFromIdentity:()=>"tg_1"};
      if(name === "../account-id") return {ensureDtIdForUserId:async()=>"ID1",getDtIdByUserId:async()=>"ID1",resolveAccountId:async()=>"ID1"};
      if(name === "../api-auth") return {setCors(){}};
      if(name === "../app-user-blocks") return {rejectBlockedAppUser:async()=>false};
      if(name === "../api-limits") return {rateLimit:()=>false,rejectIfPayloadTooLarge:()=>false};
      if(name === "../profile-wall-notify") return {notifyWallFriends:async()=>{}};
      if(name === "../chat-media-access") return {protectChatResponse:x=>x};
      throw new Error(name);
    }});
    async function post(text){const res={status(n){this.code=n;return this},json(body){this.body=body;return this},setHeader(){}};await mod.exports({method:"POST",body:{action:"create",text}},res);return res;}
    const wall = "poker_app:profile_wall:ID1";
    const writes = await Promise.all([post("first"),post("second")]);
    const stored = JSON.parse(await command(["GET",wall]));
    assert.equal(stored.length,writes.filter(x=>x.code===200).length);
    assert.ok(writes.every(x=>[200,409].includes(x.code)));
    for(let i=0;i<writes.length;i++) if(writes[i].code===409) assert.equal((await post(i===0?"first":"second")).code,200);
    assert.equal(JSON.parse(await command(["GET",wall])).length,2);
    const savedWall = await command(["GET",wall]);
    const workingFetch = global.fetch;
    global.fetch = async()=>{throw new Error("offline")};
    assert.equal((await post("must not overwrite")).code,503);
    global.fetch = workingFetch;
    assert.equal(await command(["GET",wall]),savedWall);
    global.fetch = async(url,options)=>{
      if(JSON.parse(options.body).some(c=>c[0]==="EVAL")) return {ok:true,json:async()=>[{error:"write failed"}]};
      return workingFetch(url,options);
    };
    assert.equal((await post("failed write")).code,503);
    global.fetch=workingFetch;
    assert.equal(await command(["GET",wall]),savedWall);
    console.log("Audit integrity passed on real Redis: concurrent deal counters, seat conflicts, closed event, wall conflicts/retry and read/write failures.");
  } finally {
    global.fetch = originalFetch;
    server.kill("SIGTERM");
    await new Promise((resolve) => server.exitCode != null ? resolve() : server.once("exit", resolve));
    fs.rmSync(dir, { recursive: true, force: true });
  }
}
main().catch((error) => { console.error(error); process.exitCode = 1; });

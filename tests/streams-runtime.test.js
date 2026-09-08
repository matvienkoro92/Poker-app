'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const crypto = require('node:crypto');
const source = fs.readFileSync(require.resolve('../app-streams.js'), 'utf8');
function deferred() { let resolve, reject; const promise = new Promise((a,b) => { resolve=a; reject=b; }); return {promise,resolve,reject}; }
const flush = async () => { for(let i=0;i<50;i++) await Promise.resolve(); };
function element() {
  const classes=new Set();
  return {style:{},value:'',textContent:'Запустить трансляцию',hidden:false,paused:true,disabled:false,
    classList:{add:n=>classes.add(n),remove:n=>classes.delete(n),contains:n=>classes.has(n),toggle:()=>{}},
    handlers:{}, addEventListener(n,fn){this.handlers[n]=fn;},removeAttribute(n){delete this[n];},setAttribute(){},
    pause(){this.paused=true;},play(){this.paused=false;return Promise.resolve();},load(){}};
}
function setup() {
  const elements=new Map(); const timers=new Map(); let timerId=0;
  const get=id=>{if(!elements.has(id))elements.set(id,element());return elements.get(id);};
  const ctx={console,Promise,URL,Date,Map,Math,Number,AbortController,MediaStream:class {constructor(){this.tracks=[];}getTracks(){return this.tracks;}getVideoTracks(){return this.tracks.filter(t=>t.kind==='video');}getAudioTracks(){return this.tracks.filter(t=>t.kind==='audio');}addTrack(t){this.tracks.push(t);}removeTrack(t){this.tracks=this.tracks.filter(x=>x!==t);}},
    window:{crypto,location:{origin:'https://test.invalid',href:'https://test.invalid/'},navigator:{},isSecureContext:true,addEventListener(){}},
    document:{getElementById:get,querySelector:()=>({}),querySelectorAll:()=>[],addEventListener(){}},
    setTimeout:fn=>{timers.set(++timerId,fn);return timerId;},clearTimeout:id=>timers.delete(id),
    setInterval:fn=>{timers.set(++timerId,fn);return timerId;},clearInterval:id=>timers.delete(id),
    fetch:()=>{throw new Error('Unexpected network');},getAppBaseUrlForLinks:()=> 'https://test.invalid',alert:()=>{}};
  vm.createContext(ctx);vm.runInContext(source,ctx);
  return {ctx,get,timers};
}
function videoAt(edge,time=0) {return Object.assign(element(),{currentTime:time,seekable:{length:1,start:()=>0,end:()=>edge}});}
function media(ctx) {const stream=new ctx.MediaStream();const track={kind:'video',readyState:'live',handlers:{},addEventListener(n,f){this.handlers[n]=f;},stop(){this.readyState='ended';}};stream.addTrack(track);return {stream,track};}
function publisher(ctx) {
  const rooms=[];
  class Room {constructor(options){this.options=options;this.events={};this.localParticipant={publishTrack:()=>Promise.resolve()};rooms.push(this);}on(n,fn){this.events[n]=fn;}connect(){return Promise.resolve();}disconnect(stop){this.stopTracks=stop;return Promise.resolve();}}
  ctx.streamsEnsureLiveKitClient=()=>Promise.resolve({Room});ctx.streamsFetchLiveKitToken=()=>Promise.resolve({url:'wss://test',token:'test'});
  ctx.streamsPostCurrentStream=()=>Promise.resolve(true);ctx.streamsStartCloudflareEgress=()=>Promise.resolve(true);
  ctx.streamsBroadcastSessionId=crypto.randomUUID();const {stream,track}=media(ctx);ctx.streamsBroadcastStream=stream;
  return {rooms,stream,track};
}
test('ordinary entry auto-opens current stream exactly once despite router double invocation',()=>{
 const {ctx,timers,get}=setup(); get('streamsCloudflareWrap').classList.add('streams-cloudflare-wrap--hidden');let calls=0;ctx.streamsWatchCurrentStream=()=>calls++;
 ctx.consumePendingStreamsWatchRoom();ctx.consumePendingStreamsWatchRoom();assert.equal(timers.size,1);[...timers.values()][0]();assert.equal(calls,1);
});
test('leaving streams cancels deferred auto-open and pending current response',async()=>{
 const {ctx,timers}=setup();ctx.consumePendingStreamsWatchRoom();ctx.streamsCleanup();assert.equal(timers.size,0);
 const d=deferred();ctx.streamsFetchCurrentStream=()=>d.promise;let opened=0;ctx.streamsOpenDelayedWatch=()=>opened++;
 const pending=ctx.streamsWatchCurrentStream(false);ctx.streamsCleanup();d.resolve({active:true,stream:{room:'123456',mode:'delayed'}});await pending;assert.equal(opened,0);
});
test('only newest current-stream response can change playback',async()=>{
 const {ctx}=setup();const first=deferred(),second=deferred();let count=0;ctx.streamsFetchCurrentStream=()=>++count===1?first.promise:second.promise;let opened=0;ctx.streamsOpenDelayedWatch=()=>opened++;
 const a=ctx.streamsWatchCurrentStream(false),b=ctx.streamsWatchCurrentStream(true);second.resolve({active:false});await b;first.resolve({active:true,stream:{room:'123456',mode:'delayed'}});await a;assert.equal(opened,0);
});
test('insufficient buffer hides and pauses the video instead of exposing a short delay',()=>{
 const {ctx}=setup();const video=videoAt(30,29);video.paused=false;assert.equal(ctx.streamsApplyCloudflareDelay(video,120,true),null);assert.equal(video.paused,true);assert.equal(video.style.visibility,'hidden');
 ctx.streamsPlayCloudflareVideo(video,120);assert.equal(video.paused,true);assert.equal(video.__streamsResumeAfterBuffer,true);
});
test('full buffer seeks 120 seconds behind edge; currentTime zero stays valid',()=>{
 const {ctx}=setup();const video=videoAt(300,295);const state=ctx.streamsApplyCloudflareDelay(video,120,false);assert.equal(state.currentDelay,120);assert.equal(video.currentTime,180);
 const initial=videoAt(120,0);assert.equal(ctx.streamsApplyCloudflareDelay(initial,120,false).currentDelay,120);
});
test('buffer loop resumes when ready and does not resume an intentional pause',async()=>{
 const {ctx,timers}=setup();let edge=30;const video=videoAt(edge);video.seekable.end=()=>edge;video.__streamsResumeAfterBuffer=true;
 ctx.streamsStartCloudflareDelayLoop(video,120);assert.equal(video.paused,true);edge=150;[...timers.values()][0]();await flush();assert.equal(video.paused,false);
 video.pause();[...timers.values()][0]();assert.equal(video.paused,true);
});
test('failed delayed playback never opens live iframe',()=>{
 const {ctx,get}=setup();ctx.streamsShowCloudflareIframeFallback({iframeUrl:'https://live.invalid'},'Failed');assert.equal(get('streamsCloudflareFrame').src,'about:blank');assert.equal(get('streamsCloudflareVideo').hidden,true);
});
test('failed egress stops publication and never advertises instant fallback',async()=>{
 const {ctx}=setup();const {stream,track}=publisher(ctx);ctx.streamsStartCloudflareEgress=()=>Promise.resolve(false);const modes=[];ctx.streamsPostCurrentStream=(action,room,mode)=>{modes.push(mode);return Promise.resolve(true);};
 ctx.streamsConnectLiveKitBroadcast('123456',stream,'Запустить',false,'delayed');await flush();assert.equal(ctx.streamsBroadcastStream,null);assert.equal(track.readyState,'ended');assert.ok(modes.every(m=>m==='delayed'));
});
test('failed registration never publishes screen or launches egress',async()=>{
 const {ctx}=setup();const {stream,rooms}=publisher(ctx);ctx.streamsPostCurrentStream=()=>Promise.resolve(false);ctx.streamsConnectLiveKitBroadcast('123456',stream,'Запустить',false,'delayed');await flush();assert.equal(rooms.length,0);assert.equal(ctx.streamsBroadcastStream,null);
});
test('reconnect waits for old room disconnect without stopping screen tracks',async()=>{
 const {ctx}=setup();const {stream,rooms,track}=publisher(ctx);const closed=deferred();let stopFlag;
 ctx.streamsLiveKitBroadcastRoom={disconnect(flag){stopFlag=flag;return closed.promise;}};
 ctx.streamsConnectLiveKitBroadcast('123456',stream,'Запустить',true,'instant');await flush();assert.equal(stopFlag,false);assert.equal(rooms.length,0);
 closed.resolve();await flush();assert.equal(rooms.length,1);assert.equal(track.readyState,'live');assert.equal(rooms[0].options.adaptiveStream,false);
});
test('stop during publish prevents a late egress start',async()=>{
 const {ctx}=setup();const {stream}=publisher(ctx);const publish=deferred();ctx.streamsPublishMediaStream=()=>publish.promise;let exports=0;ctx.streamsStartCloudflareEgress=()=>{exports++;return Promise.resolve(true);};
 ctx.streamsConnectLiveKitBroadcast('123456',stream,'Запустить',false,'delayed');await flush();ctx.streamsCleanup();publish.resolve();await flush();assert.equal(exports,0);
});
test('screen capture resolving after navigation is stopped, never broadcast',async()=>{
 const {ctx,get}=setup();const capture=deferred();const {stream,track}=media(ctx);ctx.window.navigator.mediaDevices={getDisplayMedia:()=>capture.promise};ctx.initStreams();get('streamsStartBtn').handlers.click();ctx.streamsCleanup();capture.resolve(stream);await flush();assert.equal(track.readyState,'ended');assert.equal(ctx.streamsBroadcastStream,null);
});
test('microphone ending does not end screen broadcast',()=>{
 const {ctx}=setup();const {stream,track}=media(ctx);const audio={kind:'audio',addEventListener(){throw new Error('Audio must not end the screen session');}};stream.addTrack(audio);ctx.streamsBroadcastStream=stream;ctx.streamsAttachBroadcastTrackGuards(stream,'Запустить');assert.equal(typeof track.handlers.ended,'function');
});
test('current writes are ordered and keep original session across cleanup',async()=>{
 const {ctx}=setup();const pending=deferred();const calls=[];ctx.streamsBroadcastSessionId='original-session';ctx.fetch=(url,options)=>{calls.push(JSON.parse(options.body));return calls.length===1?pending.promise:Promise.resolve({ok:true,json:()=>Promise.resolve({ok:true})});};
 const start=ctx.streamsPostCurrentStream('start','123456','instant');const stop=ctx.streamsPostCurrentStream('stop','123456','instant','original-session');ctx.streamsBroadcastSessionId='new-session';await flush();assert.equal(calls.length,1);pending.resolve({ok:true,json:()=>Promise.resolve({ok:true})});await Promise.all([start,stop]);assert.deepEqual(calls.map(c=>c.action),['start','stop']);assert.ok(calls.every(c=>c.sessionId==='original-session'));
});
test('lost DVR buffer pauses safely and resumes after recovery',()=>{
 const {ctx,timers}=setup();let edge=200;const video=videoAt(edge,80);video.seekable.end=()=>edge;video.paused=false;
 ctx.streamsStartCloudflareDelayLoop(video,120);edge=20;[...timers.values()][0]();assert.equal(video.paused,true);assert.equal(video.__streamsResumeAfterBuffer,true);edge=250;[...timers.values()][0]();assert.equal(video.paused,false);
});
test('final delayed minutes are released over time after ENDLIST',()=>{
 const {ctx}=setup();let now=1000000;ctx.Date={now:()=>now};const video=videoAt(600,480);video.__streamsFinalAt=now;video.__streamsFinalEdge=600;assert.equal(ctx.streamsApplyCloudflareDelay(video,120,false).currentDelay,120);
 now+=60000;video.currentTime=540;assert.equal(ctx.streamsApplyCloudflareDelay(video,120,false).currentDelay,120);assert.equal(video.currentTime,540);
});
test('brief heartbeat failure keeps screen alive; prolonged failure stops before lease expiry',async()=>{
 const {ctx,timers}=setup();let now=1000000;ctx.Date={now:()=>now};const {stream,track}=publisher(ctx);await ctx.streamsConnectLiveKitBroadcast('123456',stream,'Запустить',false,'instant');
 const beat=timers.get(ctx.streamsCurrentHeartbeat);ctx.streamsPostCurrentStream=()=>Promise.resolve(false);now+=30000;beat();await flush();assert.equal(track.readyState,'live');now+=90000;beat();await flush();assert.equal(track.readyState,'ended');
});
test('transient reconnect failure schedules retry without ending capture',async()=>{
 const {ctx,timers}=setup();const {stream,track}=publisher(ctx);ctx.streamsCurrentConfirmedAt=Date.now();ctx.streamsPostCurrentStream=()=>Promise.resolve(false);
 await ctx.streamsConnectLiveKitBroadcast('123456',stream,'Запустить',true,'instant');assert.equal(track.readyState,'live');assert.ok(timers.has(ctx.streamsBroadcastReconnectTimer));
});

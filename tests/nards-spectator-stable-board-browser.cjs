'use strict';
const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
(async()=>{for(const kind of ['short','long']){const rooms=new Map(),service=require('../lib/board-games-room')({profile:async member=>({name:member,level:1}),load:async id=>structuredClone(rooms.get(id)),create:async(id,r)=>{rooms.set(id,structuredClone(r));return true;},cas:async(id,rev,r)=>{if(rooms.get(id).revision!==rev)return false;rooms.set(id,structuredClone(r));return true;}});
 const created=await service.call('host',{action:'create',discipline:kind,timeControl:kind==='chess'?'blitz-5-5':undefined,turnSeconds:60});await service.call('guest',{action:'join',roomId:created.roomId});
 const browser=await chromium.launch();try{const page=await browser.newPage({viewport:{width:390,height:844}}),errors=[];page.on('pageerror',e=>errors.push(e.message));let releaseMove,moveRequests=0;const actions=[];
 await page.route('http://chess-latency.test/**',async route=>{const url=new URL(route.request().url());if(url.pathname.startsWith('/api/')){if(url.pathname!=='/api/board-games')return route.fulfill({json:{ok:true}});const body=route.request().postDataJSON();actions.push(body.action);if(body.action==='access')return route.fulfill({json:{ok:true,allowed:true,level:1,equipment:{board:'walnut',pieces:'classic'}}});if(body.action==='move'){moveRequests++;await new Promise(resolve=>releaseMove=resolve);}try{return route.fulfill({json:await service.call('viewer',body)});}catch(e){return route.fulfill({status:e.status||503,json:{ok:false,error:e.message}});}}const file=path.join(process.cwd(),url.pathname);return fs.existsSync(file)&&fs.statSync(file).isFile()?route.fulfill({path:file}):route.fulfill({status:404});});
 await page.addInitScript(()=>{window.lobbyFlashed=false;new MutationObserver(()=>{const el=document.querySelector('#lobby');if(el&&!el.hidden)window.lobbyFlashed=true;}).observe(document,{subtree:true,attributes:true,childList:true});});
 await page.goto('http://chess-latency.test/board-games-play.html?watch='+created.roomId);await page.waitForFunction(()=>window.PokerBoardGames?.inspect().ready);
 assert.equal(await page.evaluate(()=>PokerBoardGames.inspect().spectator),true);
 assert.equal(actions.includes('preview'),false);assert.equal(actions.includes('join'),false);assert.ok(actions.includes('watch'));
 assert.equal(await page.locator('#lobby').isVisible(),false);assert.equal(await page.locator('#access').isVisible(),false);
 assert.equal(await page.locator(kind==='chess'?'#chessBoard':'#nardsBoard').isVisible(),true);assert.equal(await page.evaluate(()=>window.lobbyFlashed),false);assert.deepEqual(errors,[]);
 for(const width of [320,390,440]){
 await page.setViewportSize({width,height:900});
 const tops=await page.evaluate(async()=>{
  const {paintRemainingDice}=await import('/scripts/board-games/remaining-dice.mjs');
  const dice=document.getElementById('remainingDice'),board=document.getElementById('nardsFrame'),tops=[];
  for(const [phase,values,rolling]of [['roll',[],false],['moving',[6,6,6,6],false],['moving',[3,1],false],['moving',[1],false],['moving',[],false],['moving',[5,2],true]]){
   paintRemainingDice(dice,{discipline:'short',phase,dice:values},rolling);
   tops.push(board.getBoundingClientRect().top);
  }
  return tops;
 });
 assert.ok(Math.max(...tops)-Math.min(...tops)<1,kind+' '+width+' board moved: '+tops.join(', '));
 }
 console.log('PASS '+kind+' spectator board stays fixed through empty, double, remaining and rolling dice at 320/390/440px');
 }finally{await browser.close();}}})().catch(e=>{console.error(e);process.exitCode=1;});

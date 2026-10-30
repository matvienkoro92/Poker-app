'use strict';
const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
(async()=>{for(const kind of ['short','long']){const rooms=new Map(),service=require('../lib/board-games-room')({profile:async member=>({name:member,level:1}),load:async id=>structuredClone(rooms.get(id)),create:async(id,r)=>{rooms.set(id,structuredClone(r));return true;},cas:async(id,rev,r)=>{if(rooms.get(id).revision!==rev)return false;rooms.set(id,structuredClone(r));return true;}});
 const created=await service.call('host',{action:'create',discipline:kind,timeControl:kind==='chess'?'blitz-5-5':undefined,turnSeconds:60});await service.call('guest',{action:'join',roomId:created.roomId});
 const browser=await chromium.launch();try{const page=await browser.newPage({viewport:{width:390,height:844}}),errors=[];page.on('pageerror',e=>errors.push(e.message));let releaseMove,moveRequests=0;const actions=[];
 await page.route('http://chess-latency.test/**',async route=>{const url=new URL(route.request().url());if(url.pathname.startsWith('/api/')){if(url.pathname!=='/api/board-games')return route.fulfill({json:{ok:true}});const body=route.request().postDataJSON();actions.push(body.action);if(body.action==='access')return route.fulfill({json:{ok:true,allowed:true,level:1,equipment:{board:'walnut',pieces:'classic'}}});if(body.action==='move'){moveRequests++;await new Promise(resolve=>releaseMove=resolve);}try{return route.fulfill({json:await service.call('viewer',body)});}catch(e){return route.fulfill({status:e.status||503,json:{ok:false,error:e.message}});}}const file=path.join(process.cwd(),url.pathname);return fs.existsSync(file)&&fs.statSync(file).isFile()?route.fulfill({path:file}):route.fulfill({status:404});});
 await page.addInitScript(()=>{window.lobbyFlashed=false;new MutationObserver(()=>{const el=document.querySelector('#lobby');if(el&&!el.hidden)window.lobbyFlashed=true;}).observe(document,{subtree:true,attributes:true,childList:true});});
 await page.goto('http://chess-latency.test/board-games-play.html?watch='+created.roomId);await page.waitForFunction(()=>window.PokerBoardGames?.inspect().ready);
 for(const width of [320,390,440]){
 await page.setViewportSize({width,height:900});
 const positions=await page.evaluate(()=>{
 const roll=document.querySelector('#roll'),history=document.querySelector('#history'),ys=[];
 for(const hidden of [true,false,true]){roll.hidden=hidden;ys.push(history.getBoundingClientRect().top);}
 roll.hidden=true;for(const id of ['clearSelection','bearOff'])document.getElementById(id).hidden=false;ys.push(history.getBoundingClientRect().top);return ys;
 });assert.ok(Math.max(...positions)-Math.min(...positions)<1,kind+' '+width+' history moved '+positions);
 }
 const actionsBox=await page.locator('#nardsMoveActions').boundingBox(),wager=await page.locator('#gameControls').boundingBox();assert.ok(actionsBox.y+actionsBox.height<=wager.y+2);assert.equal(await page.locator('#clearSelection').evaluate(el=>el.parentElement.id),'nardsMoveActions');
 assert.equal(await page.locator('#hint').isVisible(),false);assert.equal(await page.locator('#dice').isVisible(),false);
 console.log('PASS '+kind+' history stays fixed as roll button appears/disappears at 320/390/440');
 }finally{await browser.close();}}})().catch(e=>{console.error(e);process.exitCode=1;});

'use strict';
const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
(async()=>{for(const kind of ['chess','short','long']){const rooms=new Map(),service=require('../lib/board-games-room')({profile:async member=>({name:member,level:1}),load:async id=>structuredClone(rooms.get(id)),create:async(id,r)=>{rooms.set(id,structuredClone(r));return true;},cas:async(id,rev,r)=>{if(rooms.get(id).revision!==rev)return false;rooms.set(id,structuredClone(r));return true;}});
 const created=await service.call('host',{action:'create',discipline:kind,timeControl:kind==='chess'?'blitz-5-5':undefined,turnSeconds:60});await service.call('guest',{action:'join',roomId:created.roomId});
 const browser=await chromium.launch();try{const page=await browser.newPage({viewport:{width:390,height:844}}),errors=[];page.on('pageerror',e=>errors.push(e.message));let releaseMove,moveRequests=0;const actions=[];
 await page.route('http://chess-latency.test/**',async route=>{const url=new URL(route.request().url());if(url.pathname.startsWith('/api/')){if(url.pathname!=='/api/board-games')return route.fulfill({json:{ok:true}});const body=route.request().postDataJSON();actions.push(body.action);if(body.action==='access')return route.fulfill({json:{ok:true,allowed:true,level:1,equipment:{board:'walnut',pieces:'classic'}}});if(body.action==='move'){moveRequests++;await new Promise(resolve=>releaseMove=resolve);}try{return route.fulfill({json:await service.call('viewer',body)});}catch(e){return route.fulfill({status:e.status||503,json:{ok:false,error:e.message}});}}const file=path.join(process.cwd(),url.pathname);return fs.existsSync(file)&&fs.statSync(file).isFile()?route.fulfill({path:file}):route.fulfill({status:404});});
 await page.addInitScript(()=>{window.lobbyFlashed=false;new MutationObserver(()=>{const el=document.querySelector('#lobby');if(el&&!el.hidden)window.lobbyFlashed=true;}).observe(document,{subtree:true,attributes:true,childList:true});});
 await page.goto('http://chess-latency.test/board-games-play.html?watch='+created.roomId);await page.waitForFunction(()=>window.PokerBoardGames?.inspect().ready);
 await service.call('host',{action:'move',roomId:created.roomId,revision:rooms.get(created.roomId).revision,move:{type:'resign'}});
 await page.waitForFunction(()=>PokerBoardGames.inspect().state.winner!==null);
 const palettes=[];
 for(const theme of ['emerald','sapphire','burgundy','walnut','graphite']){
  await page.evaluate(theme=>{document.body.dataset.gameBackground=theme;},theme);
  const colors=await page.evaluate(()=>{
   const expected=getComputedStyle(document.body).getPropertyValue('--ui-bottom').trim();
   const panels=['#result','#resultSummary','#ranking','#scoreHelpDialog','#confirm'].map(id=>{const el=document.querySelector(id);return el?{id,bg:getComputedStyle(el).backgroundImage}:null;}).filter(Boolean);
   return {expected,panels};
  });
  for(const panel of colors.panels)assert.match(panel.bg,/linear-gradient/,kind+' '+theme+' '+panel.id);
  palettes.push(colors.panels.find(p=>p.id==='#result').bg);
  if(kind==='short'&&theme==='sapphire'){
   await page.evaluate(()=>document.querySelector('#resultSummary').close());
   await page.screenshot({path:'/tmp/nards-sapphire-result-fixed.png',fullPage:true});
  }
 }
 assert.equal(new Set(palettes).size,5);assert.deepEqual(errors,[]);
 console.log('PASS '+kind+' result and dialogs follow all five theme palettes');
 }finally{await browser.close();}}})().catch(e=>{console.error(e);process.exitCode=1;});

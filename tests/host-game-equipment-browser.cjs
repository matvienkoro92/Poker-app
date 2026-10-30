'use strict';
const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),assert=require('node:assert/strict'),fixture=require('./helpers/board-wager-fixture.cjs');
(async()=>{const browser=await chromium.launch();try{for(const kind of ['chess','short','long']){
 const f=fixture({profiles:{m1:{level:100},m2:{level:1}}}),errors=[],hostStyle={board:'imperial-palace',pieces:'regalia',checkers:'wolves',nardsInterior:'frost',nardsDice:'galaxy',nardsDiceSize:'small',nardsBoard:'obsidian'};
 const room=await f.service.call('m1',{action:'create',discipline:kind,equipment:hostStyle,turnSeconds:30,raceTo:1}),pages=[];
 for(const [member,watch] of [['m1',false],['m2',false],['viewer',true]]){
  const p=await browser.newPage({viewport:{width:390,height:844}});pages.push(p);p.on('pageerror',e=>errors.push(e.message));
  await p.route('http://host-board.test/**',async route=>{const u=new URL(route.request().url());if(u.pathname==='/api/billiards')return route.fulfill({json:{ok:true}});if(u.pathname==='/api/board-games'){const b=route.request().postDataJSON();if(b.action==='admission')return route.fulfill({json:{ok:true,conflict:null}});if(b.action==='access')return route.fulfill({json:{ok:true,allowed:true,level:member==='m1'?100:1,equipment:{}}});try{return route.fulfill({json:await f.service.call(member,b)});}catch(e){return route.fulfill({status:e.status||503,json:{ok:false,error:e.message}});}}const file=path.join(process.cwd(),u.pathname);return fs.existsSync(file)&&fs.statSync(file).isFile()?route.fulfill({path:file}):route.fulfill({status:404});});
  await p.goto('http://host-board.test/board-games-play.html?game='+kind+'&'+(watch?'watch':'room')+'='+room.roomId);if(!watch){await p.waitForFunction(()=>document.querySelector('#confirm[open]')||window.PokerBoardGames?.inspect().mode==='online');if(await p.locator('#confirm[open]').count())await p.locator('#confirm [data-yes]').click();}await p.waitForFunction(()=>PokerBoardGames.inspect().mode==='online');
 }
 for(const p of pages)await p.waitForFunction(()=>PokerBoardGames.inspect().ready);
 const expected=await pages[0].evaluate(()=>PokerBoardGames.inspect().equipment);
 for(const p of pages){assert.deepEqual(await p.evaluate(()=>PokerBoardGames.inspect().equipment),expected);assert.equal(await p.locator('[data-equipment]:enabled').count(),0);}
 const guest=pages[1],personal=await guest.evaluate(()=>PokerBoardGames.inspect().personalEquipment);assert.notDeepEqual(personal,expected);
 await guest.locator('[data-resign]').click();await guest.locator('#confirm [data-yes]').click();await guest.waitForFunction(()=>PokerBoardGames.inspect().state.winner!==null);if(await guest.locator('#resultSummary[open]').count())await guest.locator('#resultSummary [data-close]').click();await guest.locator('#backLobby').click();assert.deepEqual(await guest.evaluate(()=>PokerBoardGames.inspect().equipment),personal);assert.equal(await guest.evaluate(()=>PokerBoardGames.inspect().roomEquipment),null);assert.deepEqual(errors,[]);
 for(const p of pages)await p.close();console.log('PASS '+kind+': host inventory shared with guest and spectator; personal inventory restored');
 }}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});

'use strict';
const {chromium}=require('playwright'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({args:['--use-angle=metal']});try{
 for(const discipline of ['pool8','chess','short','long']){
  const billiards=discipline==='pool8',family=billiards?'billiards':'board-games',f=require('./helpers/'+(billiards?'billiards':'board')+'-wager-fixture.cjs')();
  let room=await f.service.call('m1',{action:'create',discipline,stake:300,raceTo:1,requestId:'existing_seat_reentry01'});room=await f.call('m2','join',room.roomId);
  const transfers=f.changes.length,page=await browser.newPage({viewport:{width:390,height:844}}),errors=[];let checks=0,inspections=0;
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('http://reentry.test/**',async route=>{
   const url=new URL(route.request().url());if(url.pathname.startsWith('/api/')){
    const body=route.request().postDataJSON();
    if(body.action==='participation'){checks++;return route.fulfill({status:503,json:{ok:false,code:'GAME_SUBSCRIPTION_UNAVAILABLE',error:'Telegram unavailable'}});}
    if(body.action==='admission'){inspections++;return route.fulfill({json:{ok:true,conflict:{canCancel:false}}});}
    if(url.pathname!=='/api/'+family||['access','active','version'].includes(body.action))return route.fulfill({json:{ok:true,allowed:true,level:100,active:null}});
    try{return route.fulfill({json:await f.service.call('m2',body)});}catch(e){return route.fulfill({status:e.status||503,json:{ok:false,error:e.message}});}
   }
   const file=path.join(process.cwd(),url.pathname);return fs.existsSync(file)&&fs.statSync(file).isFile()?route.fulfill({path:file}):route.fulfill({status:404});
  });
  const url='http://reentry.test/'+(billiards?'billiards':'board-games')+'-play.html?room='+room.roomId;
  await page.goto(url);await page.waitForFunction(b=>b?window.PokerBilliards?.inspect().ready:window.PokerBoardGames?.inspect().ready,billiards);
  await page.reload();await page.waitForFunction(b=>b?window.PokerBilliards?.inspect().ready:window.PokerBoardGames?.inspect().ready,billiards);
  assert.equal(checks,0,'A returning player must not be locked out by Telegram');assert.equal(inspections,0,'Returning to an existing seat needs no cancellation prompt');
  assert.equal(f.changes.length,transfers);assert.equal(f.balances.get('p2'),9700);assert.deepEqual(errors,[]);
  await page.close();console.log('PASS '+discipline+': reload restores the paid seat despite unavailable subscriptions, without a new debit');
 }
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});

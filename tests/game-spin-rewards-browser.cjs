'use strict';
const {chromium}=require('playwright'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({args:['--use-angle=metal']});
 try{for(const discipline of ['pool8','chess','short','long']){
  const billiards=discipline==='pool8',family=billiards?'billiards':'board-games',credited=new Set();
  const f=require('./helpers/'+(billiards?'billiards':'board')+'-wager-fixture.cjs')({grantSpins:async({wager})=>{for(const p of wager.players)credited.add(wager.id+':'+p.accountId);}});
  let room=await f.service.call('m1',{action:'create',discipline,stake:300,requestId:'browser_spin_reward_01',raceTo:1});
  room=await f.call('m2','join',room.roomId);
  const page=await browser.newPage({viewport:{width:390,height:844}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('http://game-spins.test/**',async route=>{
   const url=new URL(route.request().url());
   if(url.pathname.startsWith('/api/')){
    const body=route.request().postDataJSON();
    if(url.pathname!=='/api/'+family||['access','participation','admission','active','version'].includes(body.action))return route.fulfill({json:{ok:true,allowed:true,level:100,conflict:null,active:null}});
    try{return route.fulfill({json:await f.service.call('m1',body)});}catch(e){return route.fulfill({status:e.status||503,json:{ok:false,error:e.message}});}
   }
   const file=path.join(process.cwd(),url.pathname);
   return fs.existsSync(file)&&fs.statSync(file).isFile()?route.fulfill({path:file}):route.fulfill({status:404});
  });
  await page.goto('http://game-spins.test/'+(billiards?'billiards':'board-games')+'-play.html?room='+room.roomId);
  await page.waitForFunction(b=>b?window.PokerBilliards?.inspect().ready:window.PokerBoardGames?.inspect().ready,billiards);
  assert.equal(credited.size,0);
  await f.call('m2','move',room.roomId,{revision:room.revision,move:{type:'resign'}});
  await page.getByText('Каждому начислена 1 бесплатная крутка.',{exact:false}).filter({visible:true}).first().waitFor();
  assert.equal(credited.size,2);assert.deepEqual(errors,[]);
  const dialog=page.locator('dialog[open]').last();
  if(await dialog.count()){const bounds=await dialog.boundingBox();assert.ok(bounds.x>=0&&bounds.x+bounds.width<=391,'Result leaves mobile viewport');}
  await page.close();console.log('PASS '+discipline+': both players credited after settlement; reward shown in mobile result');
 }}finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

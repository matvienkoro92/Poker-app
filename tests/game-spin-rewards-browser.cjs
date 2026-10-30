'use strict';
const {chromium}=require('playwright'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({args:['--use-angle=metal']});
 try{for(const discipline of ['pool8','chess','short','long']){for(const raceTo of [1,3]){
  const billiards=discipline==='pool8',family=billiards?'billiards':'board-games',credited=new Set();
  const f=require('./helpers/'+(billiards?'billiards':'board')+'-wager-fixture.cjs')({grantSpins:async({wager})=>{for(const p of wager.players)credited.add(wager.id+':'+p.accountId);}});
  let room=await f.service.call('m1',{action:'create',discipline,stake:300,requestId:'browser_spin_reward_01',raceTo});
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
  const playUrl='http://game-spins.test/'+(billiards?'billiards':'board-games')+'-play.html';
  await page.goto(playUrl+'?game='+discipline);
  await page.waitForFunction(b=>b?!!window.PokerBilliards:!!window.PokerBoardGames,billiards);
  await page.locator('[data-mode='+ (billiards?'create':'friend')+']').click();
  await page.locator(billiards?'#setupNext':'#boardSetupNext').click();
  await page.locator(billiards?'#wagerModes [data-wager=chips]':'#boardWagerModes [data-wager=chips]').click();
  const amount=page.locator(billiards?'#wagerAmount':'#boardWagerAmount'),notice=page.locator(billiards?'#setupSpinReward':'#boardSetupSpinReward');
  await amount.fill('299');assert.equal(await notice.isVisible(),false);
  await amount.fill('300');await notice.waitFor();assert.match(await notice.innerText(),/этой партии/);
  await page.locator(billiards?'#setupNext':'#boardSetupNext').click();
  if(billiards)await page.locator('#setupNext').click();
  await page.locator(billiards?'#formatButtons [data-format="3"]':'#boardFormatButtons [data-format="3"]').click();
  assert.match(await notice.innerText(),/всего матча/);
  await page.locator(billiards?'#formatButtons [data-format="1"]':'#boardFormatButtons [data-format="1"]').click();
  assert.match(await notice.innerText(),/этой партии/);
  await page.goto(playUrl+'?room='+room.roomId);
  await page.waitForFunction(b=>b?window.PokerBilliards?.inspect().ready:window.PokerBoardGames?.inspect().ready,billiards);
  assert.equal(credited.size,0);
  await f.call('m2','move',room.roomId,{revision:room.revision,move:{type:'resign'}});
  await page.getByText('Каждому начислена 1 бесплатная крутка',{exact:false}).filter({visible:true}).first().waitFor();
  assert.equal(credited.size,2);assert.deepEqual(errors,[]);assert.match(await page.getByText('Каждому начислена 1 бесплатная крутка',{exact:false}).filter({visible:true}).first().innerText(),raceTo===3?/за весь матч/:/за эту партию/);
  const dialog=page.locator('dialog[open]').last();
  if(await dialog.count()){const bounds=await dialog.boundingBox();assert.ok(bounds.x>=0&&bounds.x+bounds.width<=391,'Result leaves mobile viewport');}
  await page.close();console.log('PASS '+discipline+' '+raceTo+': both players credited after settlement; reward shown in mobile result');
 }}}finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

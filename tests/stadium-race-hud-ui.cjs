// Detailed facade atlases and touring bodywork: keep the mobile scene below 350 draw calls.
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs');
(async()=>{const b=await chromium.launch({headless:true,args:['--use-angle=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});try{const p=await b.newPage({viewport:{width:390,height:844}}),errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error'&&/shader|THREE|VALIDATE_STATUS/i.test(m.text()))errors.push(m.text());});await p.route('**/api/player-hall',r=>r.fulfill({json:{ok:true,hall:{self:true,accountId:'owner',selectedTransport:'bmw-e60',garage:{loadout:{},stats:{level:100},importedCars:{'bmw-e60':{paint:'classic',wheels:'classic',glassTint:'original'}}}}}}));await p.goto(process.env.CAMPAIGN_URL||'http://127.0.0.1:4216/last-buy-in.html');await p.evaluate(()=>{window.pokerApiAuthJsonBody=()=>({pwaSession:'fixture'});const create=LastBuyInRaceEngine.create;LastBuyInRaceEngine.create=(...a)=>(window.testRace=create(...a));document.querySelector('#gameEntrance').hidden=true;playChapter(9);});await p.waitForFunction(()=>document.querySelector('.race3d-view')?.raceSnapshot?.(),null,{timeout:120000});await p.evaluate(()=>document.querySelector('.race3d-dialog').hidden=true);

 fs.mkdirSync('output/stadium-race-hud',{recursive:true});
 for(const size of [{width:320,height:740},{width:390,height:844},{width:844,height:390}]){
  await p.setViewportSize(size);
  await p.evaluate(()=>{testRace.countdown=0;testRace.notice='ТРАМПЛИН';testRace.noticeTicks=150;testRace.distance=24400;testRace.speed=6;testRace.airDuration=48;testRace.air=24;});
  await p.waitForFunction(()=>document.querySelector('.race3d-view').raceSnapshot().distance===24400);
  const boxes=await p.evaluate(()=>{const selectors=['#storyBack','.race3d-progress','.race3d-pause','#storyLives','#storySound'];return selectors.map(selector=>{const r=document.querySelector(selector).getBoundingClientRect();return {selector,x:r.x,y:r.y,right:r.right,bottom:r.bottom};});});
  for(let i=1;i<boxes.length;i++){assert.ok(boxes[i].x>=boxes[i-1].right,JSON.stringify(boxes));assert.ok(Math.abs(boxes[i].y-boxes[0].y)<3,JSON.stringify(boxes));}
  assert.equal(await p.locator('.race3d-notice').textContent(),'');
  const jump=await p.locator('.race3d-view').evaluate(v=>v.raceSnapshot().shadows);assert.ok(jump.playerY-jump.playerGroundY>1&&jump.playerY-jump.playerGroundY<1.6);
  await p.screenshot({path:'output/stadium-race-hud/'+size.width+'.png'});
 }
 assert.deepEqual(errors,[]);await p.evaluate(()=>StoryArcade.stop());console.log('PASS top row 320/390/844, no event line, bounded jump');
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});

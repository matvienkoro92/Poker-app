// A live mobile race must keep advancing through takeoff and landing.
const {chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({headless:true,args:['--use-angle=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});try{const p=await b.newPage({viewport:{width:390,height:844}}),errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error'&&/shader|THREE|VALIDATE_STATUS/i.test(m.text()))errors.push(m.text());});await p.route('**/api/player-hall',r=>r.fulfill({json:{ok:true,hall:{self:true,accountId:'owner',selectedTransport:'bmw-e60',garage:{loadout:{},stats:{level:100},importedCars:{'bmw-e60':{paint:'classic',wheels:'classic',glassTint:'original'}}}}}}));await p.goto(process.env.CAMPAIGN_URL||'http://127.0.0.1:4216/last-buy-in.html');await p.evaluate(()=>{window.pokerApiAuthJsonBody=()=>({pwaSession:'fixture'});const create=LastBuyInRaceEngine.create;LastBuyInRaceEngine.create=(...a)=>(window.testRace=create(...a));document.querySelector('#gameEntrance').hidden=true;playChapter(9);});await p.waitForFunction(()=>document.querySelector('.race3d-view')?.raceSnapshot?.(),null,{timeout:120000});await p.evaluate(()=>document.querySelector('.race3d-dialog').hidden=true);


 await p.evaluate(()=>{document.querySelector('[data-pause]').click();document.querySelector('.race3d-dialog').hidden=true;});
 require('node:fs').mkdirSync('output/stadium-race-clearance',{recursive:true});

 for(const distance of [26700,33500,34800]){
  await p.evaluate(d=>{testRace.distance=d;testRace.lateral=.5;testRace.heading=0;testRace.speed=6;testRace.tick++;testRace.countdown=0;testRace.routeZone='city';testRace.progress=65;testRace.rivals.forEach((r,i)=>{r.distance=d+[220,-300,4500][i];r.lateral=[.5,-.6,.3][i];});},distance);
  await p.waitForFunction(d=>Number(document.querySelector('.race3d-view').dataset.distance)===d,distance,{timeout:120000});
  await p.waitForFunction(()=>document.querySelector('.race3d-view').raceSnapshot().minimap.rivals.length===3);
  const snapshot=await p.evaluate(()=>document.querySelector('.race3d-view').raceSnapshot());
  assert.equal(snapshot.roadLayout.lanes,6);assert.ok(snapshot.roadLayout.laneWidth>=4);assert.ok(snapshot.cityLife.length>0);assert.equal(snapshot.minimap.rivals.length,3);assert.ok(snapshot.minimap.rivals.some(r=>r.offscreen));
  require('node:fs').mkdirSync('output/stadium-race-refresh',{recursive:true});if(process.env.CAPTURE_RACE_REFRESH)await p.screenshot({path:'output/stadium-race-refresh/'+distance+'.png',timeout:120000});
  console.log(JSON.stringify({distance,drawCalls:snapshot.drawCalls,city:snapshot.cityLife,radar:snapshot.minimap.rivals}));
 }
 assert.deepEqual(errors,[]);console.log('PASS city variety, wide lanes and live radar');
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});

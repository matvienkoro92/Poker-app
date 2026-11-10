// A live mobile race must keep advancing through takeoff and landing.
const {chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({headless:true,args:['--use-angle=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});try{const p=await b.newPage({viewport:{width:390,height:844}}),errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error'&&/shader|THREE|VALIDATE_STATUS/i.test(m.text()))errors.push(m.text());});await p.route('**/api/player-hall',r=>r.fulfill({json:{ok:true,hall:{self:true,accountId:'owner',selectedTransport:'bmw-e60',garage:{loadout:{},stats:{level:100},importedCars:{'bmw-e60':{paint:'classic',wheels:'classic',glassTint:'original'}}}}}}));await p.goto(process.env.CAMPAIGN_URL||'http://127.0.0.1:4216/last-buy-in.html');await p.evaluate(()=>{window.pokerApiAuthJsonBody=()=>({pwaSession:'fixture'});const create=LastBuyInRaceEngine.create;LastBuyInRaceEngine.create=(...a)=>(window.testRace=create(...a));document.querySelector('#gameEntrance').hidden=true;playChapter(9);});await p.waitForFunction(()=>document.querySelector('.race3d-view')?.raceSnapshot?.(),null,{timeout:120000});await p.evaluate(()=>document.querySelector('.race3d-dialog').hidden=true);


 await p.evaluate(()=>{document.querySelector('[data-pause]').click();document.querySelector('.race3d-dialog').hidden=true;});
 require('node:fs').mkdirSync('output/stadium-race-clearance',{recursive:true});


 const junction=await p.evaluate(()=>LastBuyInRaceEngine.crossings[2]);
 for(const phase of [180,400,650]){
  const tick=phase+840-junction.id*137;
  await p.evaluate(({junction,tick})=>{testRace.distance=junction.distance-140;testRace.tick=tick;testRace.lateral=.5;testRace.heading=0;testRace.speed=6;testRace.countdown=0;testRace.rivals.forEach((r,i)=>r.distance=testRace.distance+900+i*120);}, {junction,tick});
  await p.waitForFunction(t=>Number(document.querySelector('.race3d-view').dataset.tick)===t,tick,{timeout:180000});
  const snap=await p.evaluate(()=>document.querySelector('.race3d-view').raceSnapshot());const cross=snap.crossTraffic.find(c=>c.id===junction.id);
  assert.equal(cross.phase,phase);assert.equal(cross.active,phase<630);assert.equal(Math.abs(cross.heading),Math.PI/2);assert.ok(snap.drawCalls<350);
  if(phase===400){require('node:fs').mkdirSync('output/stadium-race-crossing',{recursive:true});await p.screenshot({path:'output/stadium-race-crossing/crossing.png',timeout:120000});}
  console.log(JSON.stringify({phase,active:cross.active,lateral:cross.lateral,drawCalls:snap.drawCalls}));
 }
 assert.deepEqual(errors,[]);console.log('PASS crossing car waits, crosses and clears the junction in the rendered mobile scene');
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});

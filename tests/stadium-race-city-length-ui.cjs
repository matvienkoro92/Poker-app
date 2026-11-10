// A live mobile race must keep advancing through takeoff and landing.
const {chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({headless:true,args:['--use-angle=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});try{const p=await b.newPage({viewport:{width:390,height:844}}),errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error'&&/shader|THREE|VALIDATE_STATUS/i.test(m.text()))errors.push(m.text());});await p.route('**/api/player-hall',r=>r.fulfill({json:{ok:true,hall:{self:true,accountId:'owner',selectedTransport:'bmw-e60',garage:{loadout:{},stats:{level:100},importedCars:{'bmw-e60':{paint:'classic',wheels:'classic',glassTint:'original'}}}}}}));await p.goto(process.env.CAMPAIGN_URL||'http://127.0.0.1:4216/last-buy-in.html');await p.evaluate(()=>{window.pokerApiAuthJsonBody=()=>({pwaSession:'fixture'});const create=LastBuyInRaceEngine.create;LastBuyInRaceEngine.create=(...a)=>(window.testRace=create(...a));document.querySelector('#gameEntrance').hidden=true;playChapter(9);});await p.waitForFunction(()=>document.querySelector('.race3d-view')?.raceSnapshot?.(),null,{timeout:120000});await p.evaluate(()=>document.querySelector('.race3d-dialog').hidden=true);


 await p.evaluate(()=>document.querySelector('[data-pause]').click());
 for(const distance of [30000,35000,40000]){
  await p.evaluate(d=>{testRace.distance=d;testRace.tick++;testRace.countdown=0;testRace.rivals.forEach((r,i)=>r.distance=d+100+i*100);},distance);
  await p.waitForFunction(d=>Number(document.querySelector('.race3d-view').dataset.distance)===d,distance,{timeout:120000});
  const snapshot=await p.evaluate(()=>document.querySelector('.race3d-view').raceSnapshot());
  assert.ok(snapshot.world.every(Number.isFinite));assert.ok(snapshot.scenery.some(s=>s.anchor>29400));
 }
 assert.deepEqual(errors,[]);console.log('PASS extended city renders beyond old finish through new bridge');
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});

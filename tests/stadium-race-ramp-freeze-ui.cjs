// A live mobile race must keep advancing through takeoff and landing.
const {chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({headless:true,args:['--use-angle=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});try{const p=await b.newPage({viewport:{width:390,height:844}}),errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error'&&/shader|THREE|VALIDATE_STATUS/i.test(m.text()))errors.push(m.text());});await p.route('**/api/player-hall',r=>r.fulfill({json:{ok:true,hall:{self:true,accountId:'owner',selectedTransport:'bmw-e60',garage:{loadout:{},stats:{level:100},importedCars:{'bmw-e60':{paint:'classic',wheels:'classic',glassTint:'original'}}}}}}));await p.goto(process.env.CAMPAIGN_URL||'http://127.0.0.1:4216/last-buy-in.html');await p.evaluate(()=>{window.pokerApiAuthJsonBody=()=>({pwaSession:'fixture'});const create=LastBuyInRaceEngine.create;LastBuyInRaceEngine.create=(...a)=>(window.testRace=create(...a));document.querySelector('#gameEntrance').hidden=true;playChapter(9);});await p.waitForFunction(()=>document.querySelector('.race3d-view')?.raceSnapshot?.(),null,{timeout:120000});await p.evaluate(()=>document.querySelector('.race3d-dialog').hidden=true);

 await p.evaluate(()=>{document.querySelector('[data-start]').click();testRace.countdown=0;testRace.distance=3780;testRace.speed=9;testRace.boost=120;
  window.airFrames=[];let done=false;
  function sample(){if(testRace.air)airFrames.push({distance:testRace.distance,height:LastBuyInRaceEngine.vehicleHeight(testRace)});
   else if(airFrames.length)done=true;
   if(!done&&testRace.distance<4500)requestAnimationFrame(sample);}
  requestAnimationFrame(sample);});
 await p.waitForFunction(()=>testRace.distance>4500,null,{timeout:120000});
 const flight=await p.evaluate(()=>({frames:airFrames,landings:testRace.perfectLandings}));
 assert.ok(flight.frames.length>=2&&flight.landings>0,'the car must actually take off and land');
 assert.ok(flight.frames.some((frame,i)=>i&&frame.height<flight.frames[i-1].height&&frame.distance>flight.frames[i-1].distance),'the car descends while advancing');
 assert.deepEqual(errors,[]);console.log('PASS ramp traversal',await p.evaluate(()=>({distance:testRace.distance,air:testRace.air})));
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});

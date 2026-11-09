// Detailed facade atlases and touring bodywork: keep the mobile scene below 350 draw calls.
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs');
(async()=>{const b=await chromium.launch({headless:true,args:['--use-angle=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});try{const p=await b.newPage({viewport:{width:390,height:844}}),errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error'&&/shader|THREE|VALIDATE_STATUS/i.test(m.text()))errors.push(m.text());});await p.route('**/api/player-hall',r=>r.fulfill({json:{ok:true,hall:{self:true,accountId:'owner',selectedTransport:'bmw-e60',garage:{loadout:{},stats:{level:100},importedCars:{'bmw-e60':{paint:'classic',wheels:'classic',glassTint:'original'}}}}}}));await p.goto(process.env.CAMPAIGN_URL||'http://127.0.0.1:4216/last-buy-in.html');await p.evaluate(()=>{window.pokerApiAuthJsonBody=()=>({pwaSession:'fixture'});const create=LastBuyInRaceEngine.create;LastBuyInRaceEngine.create=(...a)=>(window.testRace=create(...a));document.querySelector('#gameEntrance').hidden=true;playChapter(9);});await p.waitForFunction(()=>document.querySelector('.race3d-view')?.raceSnapshot?.(),null,{timeout:120000});await p.evaluate(()=>document.querySelector('.race3d-dialog').hidden=true);
 fs.mkdirSync('output/stadium-race-route',{recursive:true});
 await p.evaluate(()=>{testRace.countdown=0;});
 for(const target of [23900,25900,26600,29400]){
  const state=await p.evaluate(target=>{const E=LastBuyInRaceEngine,s=testRace;let steps=0;while(s.distance<target&&!s.won&&!s.lost&&steps++<5000){const r=E.road(s.distance),lane=r.city?.5:0,feed=-r.curve*.03034*(1+s.speed*.055);E.step(s,{driving:true,steer:Math.max(-1,Math.min(1,feed+(lane-s.lateral)*1.5-s.heading*2)),down:Math.abs(r.curve)>5&&s.speed>3.5,special:Math.abs(r.curve)<2&&s.nitro>10});}return {distance:Math.round(s.distance),won:s.won,lost:s.lost,tier:s.tier,hits:s.hits};},target);
  await p.waitForFunction(d=>Number(document.querySelector('.race3d-view').dataset.distance)===d,state.distance);
  await p.screenshot({path:'output/stadium-race-route/route-'+target+'.png'});
  assert.equal(state.lost,false);if(target===29400)assert.equal(state.won,true);console.log(JSON.stringify({target,...state}));
 }
 assert.deepEqual(errors,[]);await p.evaluate(()=>StoryArcade.stop());
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});

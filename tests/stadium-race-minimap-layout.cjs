const {chromium}=require('playwright'),fs=require('node:fs'),assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({headless:true});try{
 const p=await browser.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
 const source=fs.readFileSync('scripts/stadium-race/main.mjs','utf8');
 const markup=Function('return `'+source.match(/host\.innerHTML=`([\s\S]*?)`;/)[1]+'`')();
 await p.goto(process.env.CAMPAIGN_URL||'http://127.0.0.1:4216/last-buy-in.html');
 await p.evaluate(markup=>{document.body.innerHTML=markup;document.querySelector('.race3d-dialog').hidden=true;},markup);
 await p.addStyleTag({content:fs.readFileSync('styles-last-buy-in-race-3d.css','utf8')});
 await p.evaluate(async()=>{const {createMinimap}=await import('/scripts/stadium-race/minimap.mjs');const E=LastBuyInRaceEngine;const map=createMinimap(document.querySelector('.race3d-stage'),E,(d,l=0)=>({x:-l*10,y:0,z:d*.06,a:0}));const s=E.create();s.distance=26700;s.rivals.forEach((r,i)=>r.distance=s.distance+[300,-200,5000][i]);map.update(s);});
 fs.mkdirSync('output/stadium-race-refresh',{recursive:true});
 for(const viewport of [{width:390,height:844},{width:320,height:740},{width:844,height:390}]){
  await p.setViewportSize(viewport);const map=await p.locator('.race3d-minimap').boundingBox(),stick=await p.locator('.race3d-joystick').boundingBox();
  assert.ok(map.x>=0&&map.y>=0&&map.x+map.width<=viewport.width);assert.ok(map.y+map.height<stick.y,'radar must not cover steering');
  await p.screenshot({path:'output/stadium-race-refresh/layout-'+viewport.width+'.png'});
 }
 assert.deepEqual(errors,[]);console.log('PASS radar and actual controls fit 320/390 portrait and 844 landscape');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});

const {chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch();try{
 const p=await b.newPage({viewport:{width:393,height:852}}),requests=[],errors=[];
 p.on('request',r=>requests.push(r.url()));p.on('pageerror',e=>errors.push(e.message));
 await p.goto(process.env.CAMPAIGN_URL||'http://127.0.0.1:4216/last-buy-in.html');
 await p.evaluate(()=>window.StoryArcade.preload(6));
 assert.ok(!requests.some(u=>/hero-motion|league2-player-shkarubo-light/.test(u)));
 const start=Date.now();await p.evaluate(()=>{document.querySelector('#gameEntrance').hidden=true;playChapter(6);});
 await p.locator('[data-start]').waitFor();console.log('Prepared mission ready:',Date.now()-start,'ms');
 await p.locator('[data-start]').click();await p.screenshot({path:'/tmp/shkarubo-loaded.png'});
 assert.deepEqual(errors,[]);
 // A stalled asset must leave the loader and offer a working retry.
 const q=await b.newPage();await q.addInitScript(()=>{const original=window.setTimeout;window.setTimeout=(fn,ms,...args)=>original(fn,ms===15000?300:ms,...args);});
 await q.route('**/tanks-terrain-v2.webp',()=>{});
 await q.goto(process.env.CAMPAIGN_URL||'http://127.0.0.1:4216/last-buy-in.html');
 await q.evaluate(()=>{document.querySelector('#gameEntrance').hidden=true;playChapter(6);});
 await q.locator('[data-retry-art]').waitFor();await q.unroute('**/tanks-terrain-v2.webp');await q.locator('[data-retry-art]').click();await q.locator('[data-start]').waitFor();
 // Aborted requests also recover on remount in a fresh page.
 await q.close();const r=await b.newPage();await r.route('**/tanks-terrain-v2.webp',route=>route.abort());
 await r.goto(process.env.CAMPAIGN_URL||'http://127.0.0.1:4216/last-buy-in.html');await r.evaluate(()=>{document.querySelector('#gameEntrance').hidden=true;playChapter(6);});await r.locator('[data-retry-art]').waitFor();await r.unroute('**/tanks-terrain-v2.webp');await r.locator('[data-retry-art]').click();await r.locator('[data-start]').waitFor();
 console.log('PASS: no unused art, playable mission, timeout and failed-image retry');
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});

'use strict';
const {chromium}=require('playwright'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch();try{
 for(const scenario of ['GAME_ADMISSION_BUSY','ACTIVE_GAME_EXISTS','ACTIVE_GAME_STARTED','stale-request','lost-response']){
  const page=await browser.newPage({viewport:{width:390,height:844}}),requests=[],errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  if(scenario==='stale-request')await page.addInitScript(()=>sessionStorage.setItem('board-games-wager-create','old_missing_request_0001'));
  await page.route('http://create-rejected.test/**',async route=>{
   const url=new URL(route.request().url());
   if(url.pathname.startsWith('/api/')){
    const body=route.request().postDataJSON();requests.push(body);
    if(body.action==='create')return route.fulfill({status:scenario==='lost-response'?503:409,json:{ok:false,error:scenario==='lost-response'?'Connection lost':'Другая партия уже создаётся или принимается. Подождите немного.',...(scenario==='lost-response'?{}:{code:scenario})}});
    if(body.action==='recover-create')return route.fulfill({json:{ok:true,pending:true}});
    if(body.action==='cancel')return route.fulfill({json:{ok:true,cancelled:true}});
    return route.fulfill({json:{ok:true,allowed:true,level:100,active:null}});
   }
   const file=path.join(process.cwd(),url.pathname);
   return fs.existsSync(file)&&fs.statSync(file).isFile()?route.fulfill({path:file}):route.fulfill({status:404});
  });
  await page.goto('http://create-rejected.test/board-games-play.html?game=long&family=nards');
  await page.locator('#boardSetupMode').waitFor();
  if(scenario!=='stale-request'){
   await page.locator('[data-mode=friend]').click();await page.locator('#boardSetupNext').click();
   await page.locator('[data-wager=chips]').click();await page.locator('#boardWagerAmount').fill('300');
   await page.locator('#boardSetupNext').click();await page.locator('#boardSetupNext').click();
   await page.waitForFunction(()=>!document.querySelector('#boardSetupNext').disabled&&!sessionStorage.getItem('board-games-wager-create'));
  }else await page.waitForFunction(()=>!sessionStorage.getItem('board-games-wager-create'));
  assert.equal(await page.locator('#cancelPendingWager').isVisible(),false);assert.equal(await page.locator('#recoverPendingWager').isVisible(),false);
  assert.equal(await page.locator('.pending-game-create').isVisible(),false);
  if(scenario==='stale-request'||scenario==='lost-response'){
   assert.ok(requests.some(r=>r.action==='recover-create'));assert.ok(requests.some(r=>r.action==='cancel'));
   const cancel=requests.find(r=>r.action==='cancel'),recovery=requests.find(r=>r.action==='recover-create');assert.equal(cancel.requestId,recovery.requestId);
  }else assert.equal(requests.some(r=>r.action==='recover-create'),false,'A rejected creation must not launch recovery');
  assert.deepEqual(errors,[]);await page.close();console.log('PASS '+scenario+': no stuck pending creation or stray recovery buttons');
 }
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});

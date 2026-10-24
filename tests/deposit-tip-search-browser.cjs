#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('playwright');const {applyOperation,view}=require('../lib/admin-deposits');
const root=process.cwd(), output=path.join(root,'output/admin-deposits');
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.json':'application/json','.svg':'image/svg+xml'};
async function main(){
 fs.mkdirSync(output,{recursive:true});let state={revision:0,entries:[],requests:[]},lose=false;
 const server=http.createServer((req,res)=>{const pathname=new URL(req.url,'http://localhost').pathname;const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}fs.readFile(file,(e,b)=>{res.writeHead(e?404:200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'});res.end(e?'':b);});});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch();
 try{
  for(const width of [320,390,1280]){
   state=applyOperation(null,{action:'create',requestId:require('node:crypto').randomUUID(),entry:{room:'P21',playerId:'111',recipient:'Мария Смирнова',bank:'Т-банк',phone:'+79998887766',total:2200000}},'Тестовый администратор').state;
   const context=await browser.newContext({viewport:{width,height:900},serviceWorkers:'block'});
   await context.route(/^https?:\/\/(?!127\.0\.0\.1(?::|\/))/,r=>r.fulfill({status:503,body:'{}',contentType:'application/json'}));
   await context.route('**/api/**',async route=>{
    const url=route.request().url(), body=route.request().postDataJSON()||{};
    if(url.includes('/api/admin-menu-access'))return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({ok:true,token:'test-token',expiresIn:86400})});
    if(url.includes('/api/admin-deposits')){
     if(body.action!=='list')state=applyOperation(state,body,'Тестовый администратор',Date.now(),'Владелец',{canDelete:true}).state;
     if(lose&&body.action==='confirm-reservation'){lose=false;return route.abort();}
     return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({ok:true,...view(state,Date.now(),body.statisticsPeriod),recentPlayers:require('../lib/deposit-player-recents').recentPlayers(state,'Тестовый администратор'),permissions:{canDelete:true}})});
    }
    return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({ok:true,allowed:true,isAdmin:true,entries:[],events:[],levelRows:[],participants:[],winners:[]})});
   });
   const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.addInitScript(()=>sessionStorage.setItem('poker_pwa_guest_session','1'));
   await page.goto('http://127.0.0.1:'+server.address().port,{waitUntil:'networkidle'});
   await page.locator('#appBootOverlay').waitFor({state:'hidden',timeout:30000});
   await page.evaluate(()=>{
    window.getApiBase=function(){return location.origin;};
    window.pokerApiHasCredential=function(){return true;};
    window.pokerRafflesApiQueryLeading=function(){return '?fixture=1';};
    window.__pokerTelegramAuth={status:'verified',adminAccess:true,user:{id:388008256}};
    window.dispatchEvent(new Event('poker-admin-access'));
    const group=document.getElementById('headerAdminShortcuts');group.hidden=false;group.classList.add('header-admin-shortcuts--with-crm');group.closest('.card__header').classList.add('card__header--admin-shortcuts','card__header--owner-crm');
    for(const b of group.querySelectorAll('button')){b.hidden=false;b.disabled=false;b.removeAttribute('aria-hidden');b.classList.remove('header-crm-btn--hidden');}
    document.getElementById('headerGreeting').textContent='ПокерМанки';
   });
   await page.screenshot({path:path.join(output,width+'-header.png')});
   const sizes=await page.locator('#headerAdminShortcuts button').evaluateAll(bs=>bs.map(b=>({width:b.getBoundingClientRect().width,height:b.getBoundingClientRect().height})));
   for(const s of sizes){assert.ok(s.width>=44&&s.height>=44,'Large header targets: '+JSON.stringify(s));}
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
   await page.waitForFunction(()=>typeof window.__pokerApplyStartAppDeepLink==='function');
   await page.evaluate(()=>window.__pokerApplyStartAppDeepLink('admin_deposits'));
   await page.locator('#adminMenuPasswordInput').fill('1234');await page.locator('#adminMenuPasswordSubmit').click();
   await page.locator('dialog.deposits[open]').waitFor();
   await page.locator('[data-filter="active"]').waitFor();
   await page.locator('[data-dep="tips"]').click();await page.locator('[data-dep="tip-new"]').click();
   let form=page.locator('[data-form="tip"]');assert.equal(await form.locator('[name="playerName"]').getAttribute('required'),null);
   await form.locator('[data-player-query]').fill('111');await form.locator('[data-dep="pick-player"][data-player-room="P21"][data-player-id="111"]').click();
   assert.equal(await form.locator('[name="room"]').inputValue(),'P21');assert.equal(await form.locator('[name="playerId"]').inputValue(),'111');assert.equal(await form.locator('[name="playerName"]').inputValue(),'Мария Смирнова');
   await form.locator('[name="playerName"]').fill('');await form.locator('[name="amount"]').fill('100');await form.locator('[name="entryId"]').selectOption(state.entries[0].id);await form.locator('[type="submit"]').click();await page.locator('[data-tip-search]').waitFor();
   assert.equal(state.tips.length,1);assert.equal(state.tips[0].playerName,'');assert.equal(state.tips[0].amount,10000);
   await page.locator('[data-tip-search]').fill('11');assert.equal(await page.locator('[data-tip-search-text]:visible').count(),1);
   await page.locator('[data-tip-search]').fill('Мария');assert.equal(await page.locator('[data-tip-search-text]:visible').count(),1);
   await page.locator('[data-tip-search]').fill('нет_такого_игрока');assert.equal(await page.locator('[data-tip-search-text]:visible').count(),0);assert.equal(await page.locator('[data-tip-empty]').isVisible(),true);
   await page.locator('[data-dep="editor-close"]').first().click();await page.locator('[data-dep="day-player-search"]').click();await page.locator('[data-day-player-search]').fill('111');await page.getByText('Чаевые · 100 ₽',{exact:true}).waitFor();await page.screenshot({path:path.join(output,width+'-tips-id-search.png')});await page.locator('[data-dep="editor-close"]').first().click();
   await page.locator('[data-dep="tips"]').click();await page.locator('[data-dep="tip-new"]').click();form=page.locator('[data-form="tip"]');await form.locator('[name="room"]').selectOption('PP');await form.locator('[name="playerId"]').fill('tip_only_991');await form.locator('[name="amount"]').fill('50');await form.locator('[type="submit"]').click();await page.locator('[data-tip-search]').waitFor();assert.equal(state.tips.length,2);assert.equal(state.tips[1].playerName,'');
   await page.locator('[data-tip-search]').fill('991');assert.equal(await page.locator('[data-tip-search-text]:visible').count(),1);await page.locator('[data-dep="tip-new"]').click();form=page.locator('[data-form="tip"]');await form.locator('[data-player-query]').fill('991');await form.locator('[data-dep="pick-player"][data-player-id="tip_only_991"]').click();assert.equal(await form.locator('[name="room"]').inputValue(),'PP');assert.equal(await form.locator('[name="playerId"]').inputValue(),'tip_only_991');
   assert.deepEqual(errors,[]);console.log('PASS',width,'optional name, ID lookup, auto-fill, manual ID, list filters, global search and tip-only directory');await context.close();
  }
 }finally{await browser.close();server.closeAllConnections();await new Promise(r=>server.close(r));}
}
main().catch(e=>{console.error(e);process.exitCode=1;});

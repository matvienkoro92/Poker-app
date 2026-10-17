#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('playwright');const {applyOperation,view}=require('../lib/admin-deposits');
const root=path.resolve(__dirname,'..'), output=path.join(root,'output/admin-deposits');
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
     if(body.action!=='list')state=applyOperation(state,body,'Тестовый администратор').state;
     if(lose&&body.action==='confirm-reservation'){lose=false;return route.abort();}
     return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({ok:true,...view(state)})});
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
   await page.locator('#headerDepositsShortcutBtn').click();
   await page.locator('#adminMenuPasswordInput').fill('1234');await page.locator('#adminMenuPasswordSubmit').click();
   await page.locator('dialog.deposits[open]').waitFor();
   await page.locator('[data-filter="active"]').waitFor();
   await page.locator('.deposits__bottom-totals').waitFor();
   assert.deepEqual(await page.locator('.deposits__filters nav button').evaluateAll(bs=>bs.map(b=>b.dataset.filter)),['active','done','archive']);
   assert.equal(await page.locator('[data-filter="totals"]').count(),0);
   assert.ok(await page.locator('.deposits__bottom-totals').evaluate(e=>e.previousElementSibling.classList.contains('deposits__cards')));
   await page.locator('[data-filter="done"]').click();
   assert.equal(await page.locator('.deposits__totals').count(),0);
   await page.locator('[data-filter="active"]').click();
   await page.locator('.deposits__bottom-totals').waitFor();
   await page.locator('.deposits__header [data-dep="new"]').click();
   await page.locator('[name="raw"]').fill('Вывод 15к\nС покер 21\n655861 айди\nUSDT\nTSaMfZDt41PKCjk5oxcNWBdCXZH8V8HDRe\nTron TRC20');
   await page.locator('[data-form="parse"] button[type="submit"]').click();
   assert.equal(await page.locator('[name="total"]').inputValue(),'15000');
   assert.equal(await page.locator('[name="playerId"]').inputValue(),'655861');
   assert.equal(await page.locator('[name="room"][value="P21"]').isChecked(),true);
   assert.equal(await page.locator('[name="wallet"]').inputValue(),'TSaMfZDt41PKCjk5oxcNWBdCXZH8V8HDRe');
   assert.equal(await page.locator('[name="bank"]').count(),0);
   await page.screenshot({path:path.join(output,width+'-usdt-review.png')});
   await page.locator('[data-dep="back-parse"]').click();
   await page.locator('[name="raw"]').fill('Иван Петров\nСбербанк\n+7 999 123-45-67\nСумма: 15 000 ₽\nhttps://bank.example/pay');
   await page.locator('[data-form="parse"] button[type="submit"]').click();
   assert.equal(await page.locator('[name="recipient"]').inputValue(),'Иван Петров');
   assert.equal(await page.locator('[name="total"]').inputValue(),'15000');
   assert.equal(await page.locator('[name="paymentLink"]').count(),0);
   assert.equal(await page.locator('[data-form="create"] button[type="submit"]').isDisabled(),true);
   await page.locator('[name="room"][value="P21"]').check();
   assert.equal(await page.locator('[data-form="create"] button[type="submit"]').isDisabled(),true);
   await page.locator('[name="playerId"]').fill('123456');
   assert.equal(await page.locator('[data-form="create"] button[type="submit"]').isEnabled(),true);
   await page.screenshot({path:path.join(output,width+'-compact-review.png')});
   // Second viewport uses another payee so both records remain visible.
   if(width===1280){await page.locator('[name="recipient"]').fill('Анна Смирнова');await page.locator('[name="phone"]').fill('+79135554433');}
   await page.locator('[data-form="create"] button[type="submit"]').click();
   await page.locator('.deposits__card').first().waitFor();
   assert.equal(await page.locator('.deposits__card').count(),2,'Two payout cards visible');
   const columns=await page.locator('.deposits__cards').evaluate(e=>getComputedStyle(e).gridTemplateColumns.split(' ').length);
   assert.equal(columns,2,'Payout cards stay in two columns at '+width);
   assert.ok(await page.locator('.deposits').evaluate(e=>e.scrollWidth<=e.clientWidth+1),'No horizontal overflow at '+width);
   await page.screenshot({path:path.join(output,width+'-list.png')});
   assert.equal(await page.locator('.deposits').evaluate(el=>el.scrollWidth>el.clientWidth+1),false,'Dialog has no horizontal overflow');
   const reservationCard=page.locator('.deposits__card').first();
   await reservationCard.locator('[data-dep="reserve"]').click();
   assert.equal(await page.locator('.deposits__popup[open]').count(),1);
   assert.equal(await page.locator('.deposits__content').isVisible(),true);
   await page.locator('[data-form="reserve"] [name="amount"]').fill('1000');
   await page.locator('[data-form="reserve"] [name="depositorId"]').fill('987654321');
   await page.locator('[data-form="reserve"] [name="depositorRoom"][value="X"]').check();
   await page.locator('[data-form="reserve"] [name="depositorId"]').fill('987654321');
   await page.locator('[data-form="reserve"] button[type="submit"]').click();
   await page.locator('[data-dep="copy-reserved"]').waitFor();
   assert.equal(view(state).entries[0].reserved,100000);
   await page.locator('[data-dep="editor-close"]').first().click();
   await page.screenshot({path:path.join(output,width+'-reserved.png')});
   await reservationCard.locator('[data-dep="confirm-reservation"]').click();
   await page.locator('[data-form="confirm-reservation"] button[type="submit"]').click();
   await page.locator('.deposits__card').first().waitFor();
   assert.equal(view(state).entries[0].paid,100000);
   assert.equal(state.entries[0].payments[0].depositorId,'987654321');
   assert.equal(state.entries[0].payments[0].depositorRoom,'X');
   assert.equal(state.entries[0].room,'P21');
   await reservationCard.locator('summary').first().click();
   await reservationCard.locator('[data-dep="void"]').click();
   await page.locator('[data-form="void"] button[type="submit"]').click();
   await reservationCard.locator('[data-dep="reserve"]').click();
   assert.equal(await page.locator('.deposits__popup[open]').count(),1);
   assert.equal(await page.locator('.deposits__content').isVisible(),true);
   await page.locator('[data-form="reserve"] [name="amount"]').fill('15000');
   await page.locator('[data-form="reserve"] [name="depositorRoom"][value="X"]').check();
   await page.locator('[data-form="reserve"] [name="depositorId"]').fill('987654321');
   await page.locator('[data-form="reserve"] button[type="submit"]').click();
   await page.locator('[data-dep="copy-reserved"]').waitFor();
   await page.locator('[data-dep="editor-close"]').first().click();
   assert.equal(await reservationCard.locator('[data-dep="reserve"]').isDisabled(),true);
   await reservationCard.locator('[data-dep="release-reservation"]').click();
   await page.locator('[data-form="release-reservation"] button[type="submit"]').click();
   await page.locator('.deposits__card').first().waitFor();
   assert.equal(view(state).entries[0].available,1500000);
   const current=page.locator('.deposits__card').first();
   assert.equal(await current.locator('[data-dep="payment"]').count(),0);
   assert.equal(await current.locator('.deposits__card-actions button').count(),1);
   await current.locator('[data-dep="reserve"]').click();
   await page.locator('[data-form="reserve"] [name="amount"]').fill('5000');
   await page.locator('[data-form="reserve"] [name="depositorRoom"][value="X"]').check();
   await page.locator('[data-form="reserve"] [name="depositorId"]').fill('987654321');
   await page.locator('[data-form="reserve"] button[type="submit"]').click();
   await page.locator('[data-dep="copy-reserved"]').waitFor();
   await page.locator('[data-dep="editor-close"]').first().click();
   await current.locator('[data-dep="confirm-reservation"]').click();
   await page.screenshot({path:path.join(output,width+'-payment.png')});
   lose=true;await page.locator('[data-form="confirm-reservation"] button[type="submit"]').click();
   await page.locator('.deposits__retry:not([hidden])').waitFor();await page.locator('[data-dep="retry"]').click();
   await page.locator('.deposits__card').first().waitFor();assert.equal(state.entries[0].payments.filter(p=>!p.voidedAt).length,1,'Lost-response retry is idempotent');
   await current.locator('summary').first().click();await current.locator('[data-dep="void"]').click();await page.locator('[data-form="void"] button[type="submit"]').click();
   await page.locator('.deposits__card').first().waitFor();assert.equal(view(state).entries[0].remaining,1500000);
   await current.locator('[data-dep="return"]').click();
   await page.locator('[data-form="return"] [name="amount"]').fill('1000');
   await page.locator('[data-form="return"] [name="note"]').fill('Игрок попросил вернуть в кассу');
   await page.locator('[data-form="return"] button[type="submit"]').click();
   await page.locator('.deposits__card').first().waitFor();
   assert.equal(view(state).entries[0].remaining,1400000);
   assert.equal(view(state).statistics.returned,100000);
   assert.equal(view(state).statistics.deposits,0);
   assert.equal(await page.locator('.deposits__statistics > dl>div').count(),5);
   assert.equal(await page.locator('.deposits__statistics > .deposits__manager-split').first().locator('[data-manager]').count(),1);
   assert.match(await page.locator('.deposits__returns-total').last().innerText(),/1.*000/);
   await page.locator('.deposits__statistics').scrollIntoViewIfNeeded();
   await page.screenshot({path:path.join(output,width+'-statistics.png')});
   await current.locator('.deposits__returns summary').click();
   await current.locator('[data-dep="void-return"]').click();
   await page.locator('[data-form="void-return"] button[type="submit"]').click();
   await page.locator('.deposits__card').first().waitFor();
   assert.equal(view(state).entries[0].remaining,1500000);
   await page.locator('[data-dep="close"]').click();
   // This guest-mode fixture manually exposes the admin controls after identity refresh.
   await page.evaluate(()=>{document.getElementById('headerAdminShortcuts').hidden=false;document.getElementById('headerDepositsShortcutBtn').hidden=false;});
   await page.locator('#headerDepositsShortcutBtn').click();
   assert.equal(await page.locator('#adminMenuPasswordModal').isVisible(),false,'Password remembered');
   await page.locator('dialog.deposits[open]').waitFor();
   await page.locator('[data-filter="active"]').waitFor();
   await page.locator('.deposits__bottom-totals').waitFor();
   assert.deepEqual(await page.locator('.deposits__filters nav button').evaluateAll(bs=>bs.map(b=>b.dataset.filter)),['active','done','archive']);
   assert.equal(await page.locator('[data-filter="totals"]').count(),0);
   assert.ok(await page.locator('.deposits__bottom-totals').evaluate(e=>e.previousElementSibling.classList.contains('deposits__cards')));
   await page.locator('[data-filter="done"]').click();
   assert.equal(await page.locator('.deposits__totals').count(),0);
   await page.locator('[data-filter="active"]').click();
   await page.locator('.deposits__bottom-totals').waitFor();await page.locator('[data-dep="close"]').click();
   assert.deepEqual(errors,[]);await context.close();
  }
  console.log('Passed: mobile/desktop header targets, pasted text review, shared records, deposits, preview, lost response retry, undo, remembered password.');
 }finally{await browser.close();server.closeAllConnections();await new Promise(r=>server.close(r));}
}
main().catch(e=>{console.error(e);process.exitCode=1;});

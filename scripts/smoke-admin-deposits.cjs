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
  for(const width of [390,1280]){
   const context=await browser.newContext({viewport:{width,height:900},serviceWorkers:'block'});
   await context.route(/^https?:\/\/(?!127\.0\.0\.1(?::|\/))/,r=>r.fulfill({status:503,body:'{}',contentType:'application/json'}));
   await context.route('**/api/**',async route=>{
    const url=route.request().url(), body=route.request().postDataJSON()||{};
    if(url.includes('/api/admin-menu-access'))return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({ok:true,token:'test-token',expiresIn:86400})});
    if(url.includes('/api/admin-deposits')){
     if(body.action!=='list')state=applyOperation(state,body,'Тестовый администратор').state;
     if(lose&&body.action==='payment'){lose=false;return route.abort();}
     return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({ok:true,...view(state)})});
    }
    return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({ok:true,entries:[],events:[],levelRows:[],participants:[],winners:[]})});
   });
   const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.addInitScript(()=>sessionStorage.setItem('poker_pwa_guest_session','1'));
   await page.goto('http://127.0.0.1:'+server.address().port,{waitUntil:'networkidle'});
   await page.locator('#appBootOverlay').waitFor({state:'hidden',timeout:30000});
   await page.evaluate(()=>{
    const group=document.getElementById('headerAdminShortcuts');group.hidden=false;group.classList.add('header-admin-shortcuts--with-crm');group.closest('.card__header').classList.add('card__header--admin-shortcuts');
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
   await page.locator('.deposits__toolbar [data-dep="new"]').click();
   await page.locator('[name="raw"]').fill('Иван Петров\nСбербанк\n+7 999 123-45-67\nСумма: 15 000 ₽\nhttps://bank.example/pay');
   await page.locator('[data-form="parse"] button[type="submit"]').click();
   assert.equal(await page.locator('[name="recipient"]').inputValue(),'Иван Петров');
   assert.equal(await page.locator('[name="total"]').inputValue(),'15000');
   // Second viewport uses another payee so both records remain visible.
   if(width===1280){await page.locator('[name="recipient"]').fill('Анна Смирнова');await page.locator('[name="phone"]').fill('+79135554433');}
   await page.locator('[data-form="create"] button[type="submit"]').click();
   await page.locator('.deposits__card').first().waitFor();
   await page.screenshot({path:path.join(output,width+'-list.png')});
   assert.equal(await page.locator('.deposits').evaluate(el=>el.scrollWidth>el.clientWidth+1),false,'Dialog has no horizontal overflow');
   const current=page.locator('.deposits__card').first();await current.locator('[data-dep="payment"]').click();
   await page.locator('[data-dep="preset"][data-amount="500000"]').click();
   assert.match(await page.locator('[data-dep-after]').innerText(),/10.*000/);
   await page.screenshot({path:path.join(output,width+'-payment.png')});
   lose=true;await page.locator('[data-form="payment"] button[type="submit"]').click();
   await page.locator('.deposits__retry:not([hidden])').waitFor();await page.locator('[data-dep="retry"]').click();
   await page.locator('.deposits__card').first().waitFor();assert.equal(state.entries[0].payments.length,1,'Lost-response retry is idempotent');
   await current.locator('summary').first().click();await current.locator('[data-dep="void"]').click();await page.locator('[data-form="void"] button[type="submit"]').click();
   await page.locator('.deposits__card').first().waitFor();assert.equal(view(state).entries[0].remaining,1500000);
   await page.locator('[data-dep="close"]').click();await page.locator('#headerDepositsShortcutBtn').click();
   assert.equal(await page.locator('#adminMenuPasswordModal').isVisible(),false,'Password remembered');
   await page.locator('dialog.deposits[open]').waitFor();await page.locator('[data-dep="close"]').click();
   assert.deepEqual(errors,[]);await context.close();
  }
  console.log('Passed: mobile/desktop header targets, pasted text review, shared records, deposits, preview, lost response retry, undo, remembered password.');
 }finally{await browser.close();server.closeAllConnections();await new Promise(r=>server.close(r));}
}
main().catch(e=>{console.error(e);process.exitCode=1;});

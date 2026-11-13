'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{chromium}=require('playwright');
Object.assign(process.env,{ROBOKASSA_MERCHANT_LOGIN:'fixture',ROBOKASSA_PASSWORD1:'fixture-1',ROBOKASSA_PASSWORD2:'fixture-2',ROBOKASSA_LINK_DESCRIPTION:'Fixture item',ROBOKASSA_LINK_FISCAL_MODE:'shop'});
const {view}=require('../lib/admin-deposits'),{issuePaymentLink}=require('../lib/deposit-link-routing');
(async()=>{const browser=await chromium.launch();try{for(const width of [320,390]){
 const now=Date.now(),state={revision:0,entries:[],requests:[],paymentFormPayments:[{id:'pro',providerId:'prodamus',status:'confirmed',amount:218000,confirmedAt:now}],channelOperations:[]};
 const page=await browser.newPage({viewport:{width,height:900}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('https://fixture.test/api/admin-deposits',async route=>{const b=route.request().postDataJSON();if(b.action==='issue-payment-link'){const result=issuePaymentLink(state,b,'test',now);return route.fulfill({json:{ok:true,link:result.link}});}await route.fulfill({json:{ok:true,...view(state,now,b.statisticsPeriod)}});});
 await page.setContent('<meta name="viewport" content="width=device-width,initial-scale=1"><button id="headerDepositsShortcutBtn">Депозиты</button>');
 await page.addStyleTag({path:path.resolve('styles-admin-deposits.css')});await page.evaluate(()=>{window.getApiBase=()=> 'https://fixture.test';window.pokerHasAdminMenuAccess=()=>true;window.pokerAdminMenuAccessToken=()=> 'fixture';});
 await page.addScriptTag({path:path.resolve('app-admin-deposits-parser.js')});await page.addScriptTag({path:path.resolve('app-admin-deposits.js')});await page.click('#headerDepositsShortcutBtn');
 await page.locator('[data-dep="payment-link-picker"]').waitFor();assert.equal(await page.locator('[data-dep="copy-payment-link"]').count(),0);
 fs.mkdirSync('output/deposit-link-routing',{recursive:true});await page.screenshot({path:'output/deposit-link-routing/'+width+'-panel.png'});
 await page.click('[data-dep="payment-link-picker"]');
 for(const amount of [100000,150000,200000]){
  assert.equal(await page.locator('[data-dep="issue-payment-link"]').count(),3);
  await page.click('[data-dep="issue-payment-link"][data-amount="'+amount+'"]');
  const input=page.locator('.deposits__issued-link');await input.waitFor();assert.match(await input.inputValue(),amount===200000?/^https:\/\/payform.ru/:/^https:\/\/auth.robokassa.ru/);
  const popup=page.locator('.deposits__popup');assert.match(await popup.innerText(),amount===200000?/Продамус/:/Робокасса/);assert.equal(await page.locator('[data-dep="copy-issued-link"]').isVisible(),true);
  const bounds=await input.boundingBox();assert.ok(bounds.x>=0&&bounds.x+bounds.width<=width);
  await page.screenshot({path:'output/deposit-link-routing/'+width+'-'+amount+'.png'});
  await page.click('.deposits__popup [data-dep="payment-link-picker"]');
 }
 await page.locator('[data-unique-payment-link]').check();
 await page.locator('[name="linkRoom"][value="X"]').check();
 await page.locator('[name="linkPlayerId"]').fill('123456');await page.locator('[name="linkClubId"]').fill('654321');
 await page.click('[data-dep="issue-payment-link"][data-amount="100000"]');
 await page.locator('.deposits__issued-link').waitFor();
 const personal=new URL(await page.locator('.deposits__issued-link').inputValue());
 assert.equal(personal.searchParams.get('InvId'),state.paymentLinkOrders[0].id);
 assert.match(await page.locator('.deposits__popup').innerText(),/123456.*654321/);
 await page.screenshot({path:'output/deposit-link-routing/'+width+'-unique.png'});
 assert.equal(state.channelOperations.length,0);assert.equal(state.paymentLinkIssues.length,4);assert.deepEqual(errors,[]);console.log(width+': amount picker, live routing, safe display and no ledger income verified');await page.close();
}}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});

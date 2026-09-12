const fs = require('fs');
const assert = require('assert');
const { chromium } = require('playwright');
(async () => {
 const browser = await chromium.launch({headless:true});
 const page = await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1});
 const errors=[]; page.on('pageerror', e=>errors.push(e.message));
 await page.setContent('<style>'+fs.readFileSync('styles-base.css','utf8')+fs.readFileSync('styles-admin.css','utf8')+'</style><button id="adminTrackingLinksBtn">Ссылки</button>'+fs.readFileSync('html-fragments/global-modals-admin.html','utf8'));
 await page.evaluate(()=>{
  window.getApiBase=()=> 'https://test.invalid'; window.pokerApiHasCredential=()=>true;
  window.pokerRafflesApiQueryLeading=()=>'?test=1'; window.getAppBaseUrlForLinks=()=> 'https://t.me/example/app'; window.pokerHideRomanTelegramUsername=()=>false;
  window.fetch=async(url,options)=>{
   let body;
   if(options?.method==='POST'){window.createdPayload=JSON.parse(options.body);body={ok:true,startParam:'ref_aaaaaaaa'};}
   else if(url.includes('timeline=1'))body={ok:true,cursor:null,events:[{id:'evt1',at:Date.now(),type:'section_opened',section:'cashout',ref:'aaaaaaaa'},{id:'dep1',at:Date.now()+1000,type:'deposit_confirmed',amount:1500,ref:'aaaaaaaa'}]};
   else if(url.includes('journey=1'))body={ok:true,total:1,nextOffset:null,rows:[{actor:'ID123456',accountId:'ID123456',pokerId:'7788',status:'new',context:{first:{ref:'aaaaaaaa',label:'Канал Иванова',at:Date.now()},last:{ref:'bbbbbbbb',label:'Повторный пост',at:Date.now()}},deposits:[{at:Date.now(),amount:1500}],depositAmount:1500,depositCount:1}]};
   else if(url.includes('visitors=1'))body={ok:true,visitors:[]};
   else body={ok:true,links:[{id:'aaaaaaaa',label:'Канал Иванова',params:{utm_source:'Telegram'},totalClicks:10,uniqueClicks:8}]};
   return {ok:true,json:async()=>body};
  };
 });
 await page.addScriptTag({content:fs.readFileSync('app-tracking-links.js','utf8')});
 await page.evaluate(()=>initTrackingLinksAdminModal());
 await page.click('#adminTrackingLinksBtn');
 await page.fill('#trackingLinksSourceInput','Telegram-канал Иванова');
 await page.fill('#trackingLinksCampaignInput','Сентябрь');
 await page.selectOption('#trackingLinksLandingInput','download');
 await page.click('#trackingLinksCreateBtn');
 await page.waitForFunction(()=>!!window.createdPayload);
 const payload=await page.evaluate(()=>window.createdPayload);
 assert.equal(payload.params.utm_source,'Telegram-канал Иванова'); assert.equal(payload.params.target_view,'download');
 await page.screenshot({path:'output/tracking-links/form-mobile.png'});
 await page.click('[data-tracking-who]');
 await page.click('[data-journey-actor]');
 await page.waitForFunction(()=>document.querySelector('.tracking-journey__events').textContent.includes('Депозит'));
 assert.match(await page.locator('#trackingLinksJourneySummary').textContent(),/100.0%/);
 await page.screenshot({path:'output/tracking-links/journey-mobile.png'});
 assert.deepEqual(errors,[]);
 await browser.close(); console.log('Tracking links mobile UI: creation, landing, journey, deposit, timeline passed');
})().catch(e=>{console.error(e);process.exit(1)});

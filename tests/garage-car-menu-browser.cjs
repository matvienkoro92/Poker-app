'use strict';
const fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
(async()=>{
 const browser=await chromium.launch();
 try{
  const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.route('http://villa.test/**',route=>{
   const pathname=new URL(route.request().url()).pathname;
   if(pathname==='/')return route.fulfill({contentType:'text/html',body:'<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles-player-hall.css"><link rel="stylesheet" href="/styles-player-lounge.css"><style>body{margin:0;background:#10171d;font-family:Arial}</style>'});
   const file=path.join(root,pathname);if(!file.startsWith(root+path.sep)||!fs.existsSync(file))return route.fulfill({status:404,body:''});
   const type={'.js':'application/javascript','.css':'text/css','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml'}[path.extname(file)]||'application/octet-stream';
   return route.fulfill({contentType:type,body:fs.readFileSync(file)});
  });
  await page.goto('http://villa.test/');
  await page.addScriptTag({url:'/app-garage-catalog.js'});
  await page.evaluate(()=>{
   window.__pokerTelegramAuth={status:'verified',adminAccess:true};window.pokerCityAdminAllowed=true;window.pokerMountGarageWorkshop=(root,garage,self,save,options)=>{root.textContent='Мастерская '+options.transport;};
   window.testAccount='ID100001';window.testRooms={};window.testFailSave=false;
   window.pokerSocialRequest=async(name,body)=>{
    if(body.action==='start-room'){
     if(body.room!==undefined){if(window.testFailSave)throw Error('Offline');window.testRooms[window.testAccount]=body.room;}
     return {ok:true,room:window.testRooms[window.testAccount]||'hall'};
    }
    const self=!body.targetId||body.targetId===window.testAccount;
    return {hall:{self,accountId:body.targetId||window.testAccount,name:'Игрок',wins:0,items:[],featured:[],theme:'walnut',goal:'wins',themes:[],goals:[],achievementProgress:[],levelProgress:{level:100,xp:0,target:3000},character:'monkey',selectedTransport:window.testTransport||'kart',adminGameAccess:true,billiardsAccess:true,livingAccess:true,garage:{stats:{level:100},loadout:{...window.PokerGarage.defaults}},lounge:{available:false,friends:[],seats:[]}}};
   };
  });
  await page.addScriptTag({url:'/app-player-hall.js'});
  for(const transport of ['mustang-gt500','bmw-e60','kart']){
   await page.evaluate(t=>{window.testTransport=t;return pokerOpenPlayerHall();},transport);
   await page.locator('[data-hall-space="garage"]:visible').click();
   assert.equal(await page.locator('.garage-imported-upgrades').count(),0);
   const hit=page.locator('.player-hall__garage-object--kart');
   await hit.click();
   const menu=page.locator('.garage-car-menu');await menu.waitFor();
   assert.equal(await menu.locator('[data-villa-city]').count(),1);
   assert.equal(await menu.locator('[data-hall-garage="kart"]').count(),1);
   if(transport!=='kart'){
    await menu.locator('[data-hall-garage="kart"]').click();
    await page.locator('[data-imported-car-workshop="'+transport+'"]').waitFor();
   }
  }
  assert.deepEqual(errors,[]);
  console.log('PASS Mustang/BMW/MonkeyCar: no standalone actions, car click opens shared menu, imported upgrades reachable.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});

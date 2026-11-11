'use strict';
const {chromium}=require('playwright'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../public');
(async()=>{const browser=await chromium.launch();try{
 const page=await browser.newPage({viewport:{width:390,height:844}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('http://rings.test/**',route=>{const u=new URL(route.request().url());if(u.pathname==='/')return route.fulfill({contentType:'text/html',body:'<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles-club-honors.css">'});const file=path.join(root,u.pathname);return fs.existsSync(file)?route.fulfill({path:file}):route.fulfill({status:404});});
 await page.goto('http://rings.test/');await page.addScriptTag({url:'/app-club-honors.js'});
 await page.evaluate(async()=>{const names=['Waaar','ПокерМанки','Waaar','FrankL','Em13!!','Waaar','Waaar','Waaar','ПокерМанки','Luck_is_Suck'];window.pokerSocialRequest=async()=>({ok:true,current:'11.2026',through:'2026-11-09',issues:names.map((nick,i)=>({month:String(i+1).padStart(2,'0')+'.2026',final:true,winners:[{nick,accountId:'winner'+i,awards:1,prizes:100,categories:[],achievements:[]}]})),seasons:[{year:2026,final:false,winners:[]}]});await window.pokerOpenClubHonors({tab:'rewards'});});
 const rings=page.locator('.honors-ring-shelf img');assert.equal(await rings.count(),10);
 await rings.evaluateAll(async imgs=>{for(const img of imgs)img.loading='eager';await Promise.all(imgs.map(img=>img.decode()));});
 assert.equal(await rings.evaluateAll(imgs=>imgs.every(img=>img.complete&&img.naturalWidth>0&&/ring-2026-\d{2}-v3\.webp$/.test(img.src))),true);
 assert.deepEqual(errors,[]);fs.mkdirSync('output/honors-rings-fix',{recursive:true});await page.locator('.honors-ring-shelf').screenshot({path:'output/honors-rings-fix/mobile-shelf.png'});console.log('PASS all ten named rings decode in the built mobile awards shelf');
 }finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});

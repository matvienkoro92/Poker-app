'use strict';
const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const {NARDS_INTERIORS}=require('../lib/nards-equipment');
(async()=>{
 const browser=await chromium.launch();
 try{
  const page=await browser.newPage({viewport:{width:1180,height:1100}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('http://center.test/**',r=>{
   const name=new URL(r.request().url()).pathname,file=path.join(process.cwd(),name);
   if(name==='/')return r.fulfill({contentType:'text/html',body:'<!doctype html><meta charset="utf-8"><style>body{background:#17221d;color:#f5e6c5;font:14px system-ui}.samples{display:grid;grid-template-columns:repeat(3,370px);gap:16px}.sample{width:370px}.sample h2{font-size:16px}.living-top-board{width:370px}</style><div class="samples"></div>'});
   return r.fulfill({path:file});
  });
  await page.goto('http://center.test/');
  await page.addStyleTag({url:'/styles-player-hall.css'});
  await page.addScriptTag({url:'/app-living-board-preview.js'});
  await page.evaluate(()=>PokerLivingBoardPreview.preload('nards'));
  const featured=['noir','frost','obsidian-copper','arctic-ice','emerald-deco','cosmic-titanium'];
  for(const inside of NARDS_INTERIORS){
   const result=await page.evaluate(({id,keep})=>{
    const wrapper=document.createElement('section'),root=document.createElement('div'),title=document.createElement('h2');wrapper.className='sample';title.textContent=id;root.className='living-top-board';wrapper.append(title,root);document.querySelector('.samples').append(wrapper);
    PokerLivingBoardPreview.paint(root,'nards',{nardsInterior:id,nardsRailsHidden:true,nardsHome:'none'});
    const bar=root.querySelector('.living-nards-front .living-nards-shared-render').shadowRoot.querySelector('.bar'),style=getComputedStyle(bar),seam=getComputedStyle(bar,'::before');
    const result={left:style.borderLeftWidth,right:style.borderRightWidth,edge:style.borderLeftColor,shadow:style.boxShadow,seam:seam.backgroundColor,width:bar.getBoundingClientRect().width,pointer:seam.pointerEvents};
    if(!keep)wrapper.remove();return result;
   },{id:inside.id,keep:featured.includes(inside.id)});
   assert.equal(result.left,'1px',inside.id);assert.equal(result.right,'1px',inside.id);assert.equal(result.edge,'rgb(234, 216, 173)',inside.id);assert.equal(result.seam,'rgb(16, 24, 22)',inside.id);assert.notEqual(result.shadow,'none',inside.id);assert.equal(result.pointer,'none',inside.id);assert.ok(result.width>=10,inside.id);
  }
  await page.waitForLoadState('networkidle');
  fs.mkdirSync('output/nards-center-visibility',{recursive:true});await page.screenshot({path:'output/nards-center-visibility/skins.png',fullPage:true});
  assert.deepEqual(errors,[]);console.log('PASS visible centre rims and seam on all '+NARDS_INTERIORS.length+' interiors; skin textures preserved.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

'use strict';
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const sets=require('../lib/chess-equipment').PIECES;
(async()=>{
 const root=path.resolve(__dirname,'..');
 const server=http.createServer((req,res)=>{const f=path.join(root,decodeURIComponent(req.url.split('?')[0]));if(!f.startsWith(root+path.sep)||!fs.existsSync(f)||!fs.statSync(f).isFile())return res.writeHead(404).end();res.setHeader('Content-Type',({'.html':'text/html','.js':'application/javascript','.css':'text/css','.svg':'image/svg+xml','.webp':'image/webp'})[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f));});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch();
 try{
  const page=await browser.newPage();page.on('pageerror',e=>console.error(e.message));await page.route('**/api/billiards',r=>r.fulfill({json:{ok:true,allowed:true}}));let equipment={board:'emerald',pieces:'classic'};
  await page.route('**/api/board-games',r=>{const b=r.request().postDataJSON();if(b.action==='equipment')equipment=b.equipment;return r.fulfill({json:{ok:true,allowed:true,level:100,equipment}});});
  async function check(selector,label){
   const gaps=await page.locator(selector).evaluateAll(nodes=>nodes.map(el=>{const a=el.getBoundingClientRect(),b=el.parentElement.getBoundingClientRect();return {left:(a.left-b.left)/b.width,right:(b.right-a.right)/b.width,top:(a.top-b.top)/b.height,bottom:(b.bottom-a.bottom)/b.height};}));
   assert.equal(gaps.length,32,label+' has both complete sides');
   for(const gap of gaps)for(const [side,value]of Object.entries(gap))assert.ok(value>=.065,label+' '+side+' gutter: '+value+' all: '+JSON.stringify(gap));
  }
  for(const width of [320,390])for(const set of sets){
   equipment={board:'emerald',pieces:set.id};await page.setViewportSize({width,height:844});
   await page.goto('http://127.0.0.1:'+server.address().port+'/board-games-play.html?game=chess&equipment=1');
   await page.locator('#equipment[open]').waitFor();await check('#chessPreview .piece',set.id+' preview '+width);
   await page.locator('#chessPreview image').evaluateAll(nodes=>Promise.all(nodes.map(node=>{const image=new Image();image.src=node.href.baseVal;return image.decode();})));
   await page.locator('#chessPreview').screenshot({path:'output/chess-carved-preview/gutters-preview-'+set.id+'-'+width+'.png'});
   await page.locator('#saveEquipment').click();await page.locator('#equipment').waitFor({state:'hidden'});
   await require('./helpers/board-wizard.cjs').launch(page,'training');await check('#chessBoard .piece',set.id+' live '+width);
   await page.locator('#flip').click();await check('#chessBoard .piece',set.id+' flipped '+width);
  }
  await page.addStyleTag({url:'http://127.0.0.1:'+server.address().port+'/styles-player-hall.css'});
  await page.addScriptTag({url:'http://127.0.0.1:'+server.address().port+'/app-living-board-preview.js'});
  await page.evaluate(()=>{document.body.replaceChildren();const root=document.createElement('div');root.id='spacingLiving';root.className='living-top-board';root.style.cssText='position:relative;inset:auto;transform:none;width:280px;height:280px';document.body.append(root);});
  for(const set of sets){
   await page.evaluate(async id=>{const root=document.getElementById('spacingLiving');await PokerLivingBoardPreview.preload('chess',{board:'emerald',pieces:id});PokerLivingBoardPreview.paint(root,'chess',{board:'emerald',pieces:id});},set.id);
   await check('#spacingLiving .piece',set.id+' living room');
  }
  console.log('PASS all 12 sets, all 6 roles and both colors keep cell gutters in preview, live play and rotated play at 320/390px; living-room previews checked too');
 }finally{await browser.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exitCode=1;});

'use strict';
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
(async()=>{
 const root=path.resolve(__dirname,'..',process.env.CHESS_STATIC_ROOT||'.');
 const server=http.createServer((req,res)=>{const file=path.join(root,decodeURIComponent(req.url.split('?')[0]));if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404).end();return;}const ext=path.extname(file);res.setHeader('Content-Type',({'.html':'text/html','.js':'application/javascript','.css':'text/css','.svg':'image/svg+xml','.webp':'image/webp'})[ext]||'application/octet-stream');res.end(fs.readFileSync(file));});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch();
 try{
  const page=await browser.newPage({viewport:{width:390,height:844}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  let saved={board:'ebony-arabesque',pieces:'classic',nardsBoard:'imperial',checkers:'heraldic',nardsInterior:'classic',nardsDice:'classic'};
  await page.route('**/api/board-games',route=>{const body=route.request().postDataJSON();if(body.action==='equipment')saved=body.equipment;return route.fulfill({json:{ok:true,allowed:true,level:76,equipment:saved}});});
  await page.route('**/api/billiards',route=>route.fulfill({json:{ok:true,allowed:true}}));
  for(const id of ['staunton','arabesque','crystal','regalia','roman-revolt','prison-wardens']){
   await page.goto('http://127.0.0.1:'+server.address().port+'/board-games-play.html?game=chess&equipment=1');await page.locator('#equipment[open]').waitFor();await page.locator('[data-chess-tab=pieces]').click();const card=page.locator('#pieces [data-item="'+id+'"]');await card.locator('image').evaluateAll(nodes=>Promise.all(nodes.map(node=>{const img=new Image();img.src=node.href.baseVal;return img.decode();})));await card.click();await page.locator('#saveEquipment').click();await page.locator('#equipment').waitFor({state:'hidden'});assert.equal(saved.pieces,id);assert.equal(await page.evaluate(()=>PokerBoardGames.inspect().equipment.pieces),id);await require('./helpers/board-wizard.cjs').launch(page,'training');assert.equal(await page.locator('#chessBoard .piece.sculpted image').count(),32);await page.locator('#chessBoard image').evaluateAll(nodes=>Promise.all(nodes.map(node=>{const img=new Image();img.src=node.href.baseVal;return img.decode();})));await page.locator('#chessBoard [data-square=e2]').click();await page.locator('#chessBoard [data-square=e4]').click();await page.waitForFunction(()=>PokerBoardGames.inspect().state.ply===1);await page.screenshot({path:'output/chess-carved-preview/live-'+id+'-390.png'});
   for(const width of [390,320]){
    await page.setViewportSize({width,height:844});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
    const square=await page.locator('#chessBoard [data-square=e1]').boundingBox(),piece=await page.locator('#chessBoard [data-square=e1] .piece').boundingBox();
    assert.ok(Math.abs(square.width*.86-piece.width)<1,'Sculptures keep a seven-percent gutter on every side');
    await page.locator('#chessBoard').screenshot({path:'output/chess-carved-preview/fit-'+id+'-'+width+'.png'});
   }
   await page.setViewportSize({width:390,height:844});
  }
  assert.deepEqual(errors,[]);console.log('PASS six sculpted sets load, select, save and apply to the live equipment');
 }finally{await browser.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exitCode=1;});

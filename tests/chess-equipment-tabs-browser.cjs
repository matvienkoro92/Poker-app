'use strict';
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
(async()=>{
 const root=path.resolve(__dirname,'..',process.env.CHESS_STATIC_ROOT||'.');
 const server=http.createServer((req,res)=>{const file=path.join(root,decodeURIComponent(req.url.split('?')[0]));if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404).end();return;}const ext=path.extname(file);res.setHeader('Content-Type',({'.html':'text/html','.js':'application/javascript','.css':'text/css','.svg':'image/svg+xml','.webp':'image/webp'})[ext]||'application/octet-stream');res.end(fs.readFileSync(file));});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch();
 try{
  const page=await browser.newPage({viewport:{width:390,height:844}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  let saved={board:'walnut',pieces:'classic',nardsBoard:'imperial',checkers:'heraldic',nardsInterior:'classic',nardsDice:'classic'};
  await page.route('**/api/board-games',route=>{const body=route.request().postDataJSON();if(body.action==='equipment')saved=body.equipment;return route.fulfill({json:{ok:true,allowed:true,level:76,equipment:saved}});});
  for(const width of [320,390]){
   await page.setViewportSize({width,height:844});await page.goto('http://127.0.0.1:'+server.address().port+'/board-games-play.html?game=chess&equipment=1');await page.locator('#equipment[open]').waitFor();assert.equal(await page.locator('[data-chess-tab]').count(),2);assert.equal(await page.locator('#chessPanelPieces').isVisible(),false);
   const list=page.locator('#boards');assert.equal(await list.evaluate(el=>el.scrollWidth>el.clientWidth),true);await page.locator('#chessPanelBoards [data-chess-scroll="1"]').click();await page.waitForFunction(()=>document.getElementById('boards').scrollLeft>10);
   await page.locator('[data-chess-tab=pieces]').click();assert.equal(await page.locator('#chessPanelBoards').isVisible(),false);await page.locator('#pieces [data-item=roman-revolt]').click();await page.locator('#chessPreview image').evaluateAll(nodes=>Promise.all(nodes.map(node=>{const img=new Image();img.src=node.href.baseVal;return img.decode();})));assert.match(await page.locator('#chessPreview').innerText(),/Римляне/);await page.screenshot({path:'output/chess-carved-preview/tabs-pieces-'+width+'.png'});
   await page.locator('[data-chess-tab=pieces]').press('ArrowLeft');assert.equal(await page.locator('[data-chess-tab=boards]').getAttribute('aria-selected'),'true');await page.screenshot({path:'output/chess-carved-preview/tabs-boards-'+width+'.png'});
  }
  assert.deepEqual(errors,[]);console.log('PASS two keyboard-accessible tabs, horizontal arrows and selected combination at 320/390px');
 }finally{await browser.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exitCode=1;});

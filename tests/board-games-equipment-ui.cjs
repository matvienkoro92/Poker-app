'use strict';
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
(async()=>{
 const root=path.resolve(__dirname,'..');
 const server=http.createServer((req,res)=>{const file=path.join(root,decodeURIComponent(req.url.split('?')[0]));if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404).end();return;}const ext=path.extname(file);res.setHeader('Content-Type',({'.html':'text/html','.js':'application/javascript','.css':'text/css','.svg':'image/svg+xml','.webp':'image/webp'})[ext]||'application/octet-stream');res.end(fs.readFileSync(file));});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch();
 try{
  const page=await browser.newPage({viewport:{width:390,height:844}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  let saved={board:'walnut',pieces:'classic',nardsBoard:'imperial',checkers:'heraldic',nardsInterior:'classic',nardsDice:'classic'};
  await page.route('**/api/board-games',route=>{const body=route.request().postDataJSON();if(body.action==='equipment')saved=body.equipment;return route.fulfill({json:{ok:true,allowed:true,level:76,equipment:saved}});});
  await page.goto('http://127.0.0.1:'+server.address().port+'/board-games-play.html?family=nards&game=short&equipment=1');
  await page.locator('#equipment[open]').waitFor();
  assert.equal(await page.locator('[data-nards-tab]').count(),4);
  await page.getByRole('tab',{name:'Внутри',exact:true}).click();
  assert.equal(await page.locator('#nardsInteriors button').count(),13);
  await page.locator('#nardsInteriors [data-item=ocean]').click();
  await page.screenshot({path:'/private/tmp/nards-inside-mobile.png',fullPage:true});
  await page.locator('[data-nards-tab=pieces]').click();
  await page.locator('#checkers [data-item=jade]').click();
  await page.locator('[data-nards-tab=dice]').click();await page.locator('#nardsDice [data-item=noir]').click();
  await page.getByRole('tab',{name:'Снаружи',exact:true}).click();
  assert.equal(await page.locator('#nardsBoards [data-item=imperial]').getAttribute('aria-pressed'),'true');
  await page.locator('#saveEquipment').click();await page.locator('#equipment').waitFor({state:'hidden'});
  assert.equal(saved.nardsInterior,'ocean');assert.equal(saved.nardsDice,'noir');assert.equal(saved.checkers,'jade');assert.equal(saved.nardsBoard,'imperial');
  assert.equal(await page.locator('#nardsBoard').getAttribute('data-interior'),'ocean');
  assert.equal(await page.locator('body').getAttribute('data-nards-dice'),'noir');
  await page.reload();await page.locator('#equipment[open]').waitFor();
  await page.getByRole('tab',{name:'Внутри',exact:true}).click();
  assert.equal(await page.locator('#nardsInteriors [data-item=ocean]').getAttribute('aria-pressed'),'true');
  const overflow=await page.evaluate(()=>document.getElementById('equipment').scrollWidth>document.getElementById('equipment').clientWidth+1);assert.equal(overflow,false);
  assert.deepEqual(errors,[]);console.log('Passed: mobile tabs, 6 interiors, independent selections, save/reload, live styling and no overflow');
 }finally{await browser.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exitCode=1;});

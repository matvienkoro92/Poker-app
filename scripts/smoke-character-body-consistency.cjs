const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844}});
  const base=process.env.SMOKE_URL||'http://127.0.0.1:3000';
  await page.goto(base,{waitUntil:'domcontentloaded'});
  await page.setContent('<base href="'+base+'/"><main></main>');
  await page.addScriptTag({url:base+'/app-garage-catalog.js'});
  const result=await page.evaluate(async()=>{
   const G=window.PokerGarage,source=new Image();source.src=G.characterBasePath;await source.decode();
   const tops=G.catalog({level:100}).filter(i=>i.kind==='suit'&&G.curatedWardrobeItem(i));
   const regions=[[130,840,115,90],[800,840,95,90],[170,1380,680,150]],failures=[],areas=[];
   let checked=0;
   const bytes=(canvas,box)=>canvas.getContext('2d').getImageData(...box).data;
   for(const [body]of G.bodyTypes){
    const look={...G.defaults,body};await G.loadWardrobe(look);const bare=G.renderCharacter(source,look),reference=regions.map(box=>bytes(bare,box));
    const torso=bytes(bare,[250,300,530,380]);areas.push([...torso].filter((n,i)=>i%4===3&&n>100).length);
    for(const top of tops){const dressed={...look,suit:top.id,pants:'blackDenim'};await G.loadWardrobe(dressed);const art=G.renderCharacter(source,dressed);regions.forEach((box,r)=>{const actual=bytes(art,box);let max=0,count=0;for(let n=0;n<actual.length;n++)if(reference[r][n-n%4+3]>252){const diff=Math.abs(actual[n]-reference[r][n]);max=Math.max(max,diff);if(diff>2)count++;}if(count)failures.push(body+':'+top.id+':region'+r+':max'+max+':count'+count);});checked++;}
    const shorts={...look,suit:'palmTank',pants:'sandShorts'};await G.loadWardrobe(shorts);const legs=[250,1120,510,130],expected=bytes(bare,legs),actual=bytes(G.renderCharacter(source,shorts),legs);if(actual.some((v,n)=>v!==expected[n]))failures.push(body+':shorts:legs');
   }
   return {checked,failures,areas};
  });
  assert.deepEqual(result.failures,[],'Clothes must preserve the selected body’s hands, feet and exposed legs');
  assert.ok(result.areas[1]>result.areas[0]&&result.areas[2]>result.areas[1],'Bare silhouettes must visibly differ in size');
  console.log(JSON.stringify(result));
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});

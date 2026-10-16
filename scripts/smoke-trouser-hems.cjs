const {chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({headless:true});try{
 const page=await browser.newPage({viewport:{width:390,height:844}}),base=process.env.SMOKE_URL||'http://127.0.0.1:3000';
 await page.goto(base,{waitUntil:'domcontentloaded'});await page.setContent('<base href="'+base+'/"><main></main>');await page.addScriptTag({url:base+'/app-garage-catalog.js'});
 const result=await page.evaluate(async()=>{
  const G=window.PokerGarage,source=new Image();source.src=G.characterBasePath;await source.decode();
  const pants=G.catalog({level:100}).filter(i=>i.kind==='pants'&&G.curatedWardrobeItem(i)&&!['boxers','sandShorts','oceanShorts','flamingoShorts'].includes(i.id)),failures=[];
  let checked=0,worst=0;
  for(const item of pants)for(const [body]of G.bodyTypes){
   const look={...G.defaults,pants:item.id,body};await G.loadWardrobe(look);const art=G.renderCharacter(source,look),ctx=art.getContext('2d');
   const edges=y=>{const row=ctx.getImageData(150,y,724,1).data;let left=724,right=-1;for(let x=0;x<724;x++)if(row[x*4+3]>100){left=Math.min(left,x);right=Math.max(right,x);}return [left,right];};
   let previous=edges(1247);
   for(let y=1248;y<=1253;y++){const next=edges(y),jump=Math.max(...next.map((v,n)=>Math.abs(v-previous[n])));worst=Math.max(worst,jump);if(jump>10)failures.push(item.id+':'+body+':'+y+':'+jump);previous=next;}
   checked++;
  }
  return {checked,worst,failures};
 });
 assert.deepEqual(result.failures,[],'The fitted trouser silhouette must not jump at the old shadow layer boundary');console.log(JSON.stringify(result));
}finally{await browser.close();}})().catch(error=>{console.error(error);process.exitCode=1;});

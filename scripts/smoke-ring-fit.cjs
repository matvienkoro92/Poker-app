const {chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({headless:true});try{
 const page=await browser.newPage({viewport:{width:390,height:844}}),base=process.env.SMOKE_URL||'http://127.0.0.1:3000';
 await page.goto(base,{waitUntil:'domcontentloaded'});await page.setContent('<base href="'+base+'/"><main></main>');await page.addScriptTag({url:base+'/app-garage-catalog.js'});
 const result=await page.evaluate(async()=>{
  const G=window.PokerGarage,source=new Image();source.src=G.characterBasePath;await source.decode();let minimum=1,checked=0;const failures=[];
  for(const [body]of G.bodyTypes)for(const scale of [1,3]){
   const look={...G.defaults,body};await G.loadWardrobe({...look,detailHand:scale>1});
   const region=[760*scale,800*scale,130*scale,115*scale],bare=G.renderCharacter(source,look,scale).getContext('2d').getImageData(...region).data;
   for(const ring of Object.keys(G.ringDesigns)){
    await G.loadWardrobe({...look,ring,detailHand:scale>1});const worn=G.renderCharacter(source,{...look,ring},scale).getContext('2d').getImageData(...region).data;let changed=0,supported=0;
    for(let n=0;n<worn.length;n+=4){if(worn[n+3]<100||Math.max(...[0,1,2,3].map(k=>Math.abs(worn[n+k]-bare[n+k])))<32)continue;changed++;if(bare[n+3]>100)supported++;}
    const ratio=changed?supported/changed:0;minimum=Math.min(minimum,ratio);if(ratio<.95||changed<250*scale*scale)failures.push({body,scale,ring,ratio,visible:changed});checked++;
   }
  }
  return {checked,minimum,failures};
 });
 assert.deepEqual(result.failures,[],'At least 95% of each ring must lie over the hand silhouette');console.log(JSON.stringify(result));
}finally{await browser.close();}})().catch(error=>{console.error(error);process.exitCode=1;});

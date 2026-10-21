const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const chapters=require('../app-last-buy-in-chapters'),scenes=require('../app-last-buy-in-victory-scenes');
test('every mission has a readable preview, an outcome and existing art',()=>{
 assert.equal(scenes.length,chapters.length);
 for(let i=0;i<chapters.length;i++){
  const c=chapters[i];assert.ok(c.before&&c.after&&c.goal&&c.quote);
  assert.ok(c.previewFrames.length>=1&&c.previewFrames.length<=2);
  assert.equal(scenes[i].art,c.outroArt);assert.equal(scenes[i].frames,c.outroFrames);
  for(const after of [false,true])for(const f of after?c.outroFrames:c.previewFrames){
   assert.ok(f.speaker&&f.text);assert.ok(f.text.length<=225,'Overlong scene: '+i);assert.ok(fs.existsSync(f.art||(after?c.outroArt:c.previewArt)),c.title);
  }
 }
});
test('outcomes use the canonical chapter text, including late campaign additions',()=>{
 for(let i=0;i<chapters.length;i++)assert.equal(scenes[i].frames[0].text,chapters[i].after);
 for(const id of [12,13,14])assert.ok(scenes[id].art&&scenes[id].frames.length);
});

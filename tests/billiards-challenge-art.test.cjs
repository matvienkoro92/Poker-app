'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),sharp=require('sharp');
const {render,equipmentFor}=require('../lib/billiards-challenge-art');
const {skins}=require('../app-billiards-tables'),{cues}=require('../app-billiards-cues');
test('challenge artwork follows the authoritative room equipment',async()=>{
 const view={equipment:{table:skins[1].id,cue:cues[1].id}};
 assert.equal(equipmentFor(view).table,skins[1]);assert.equal(equipmentFor(view).cue,cues[1]);
 const a=await render(view),b=await render({equipment:{table:skins[0].id,cue:cues[0].id}});
 assert.notDeepEqual(a,b);const meta=await sharp(a).metadata();assert.equal(meta.width,900);assert.equal(meta.format,'jpeg');
});
test('named cue safely renders the room owner name',async()=>{
 const cue=cues.find(c=>c.named);assert.ok(cue);const image=await render({equipment:{cue:cue.id},equipmentOwner:'Игрок <&> "Тест"'});assert.ok(image.length>10000);
});

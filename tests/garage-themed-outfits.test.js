const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const G=require('../app-garage-catalog'),Garage=require('../lib/player-garage');
test('five outfits unlock every five levels from forty through sixty',()=>{
 assert.deepEqual(G.themedOutfits.map(o=>[o.id,o.level]),[['fisherman',40],['bath',45],['garden',50],['space',55],['enduro',60]]);
 const ids=new Set();
 for(const o of G.themedOutfits){
  assert.equal(Object.keys(o.pieces).length,9);
  const look=G.outfitLoadout({...G.defaults,body:'bodyBelly',hair:'hairSilver',paint:'ruby',helmet:'club',ring:'goldAces',patch:'name'},o.id);
  assert.equal(look.body,'bodyBelly');assert.equal(look.hair,'hairSilver');assert.equal(look.paint,'ruby');
  assert.equal(look.helmet,'none');assert.equal(look.ring,'none');assert.equal(look.patch,'none');
  assert.ok(G.outfitSelected(look,o.id));
  assert.throws(()=>Garage.choose(look,{stats:{level:o.level-1}}),/не открыта/);
  const saved=Garage.chooseScoped(look,{stats:{level:o.level}},{paint:'ruby'},'character');
  assert.ok(G.outfitSelected(saved,o.id));assert.equal(saved.paint,'ruby');
  for(const [kind,id]of Object.entries(o.pieces)){
   assert.ok(!ids.has(id),'Reused item '+id);ids.add(id);
   const item=G.items.find(i=>i.kind===kind&&i.id===id);assert.equal(item.target,o.level);
   assert.ok(fs.statSync(path.join(__dirname,'../assets/player-hall/wardrobe/summer',id+'.webp')).size>1000);
   const mixed={...saved,[kind]:'none'};assert.equal(G.outfitSelected(mixed,o.id),false);
  }
 }
 assert.equal(ids.size,45);
});
test('individual outfit pieces mix independently and vehicle saves retain gloves',()=>{
 const look=G.outfitLoadout(G.defaults,'enduro');look.shoes=G.themedOutfits.find(o=>o.id==='space').pieces.shoes;
 const saved=Garage.choose(look,{stats:{level:60}});assert.equal(saved.shoes,look.shoes);assert.equal(saved.suit,look.suit);
 const vehicle=Garage.chooseScoped(G.defaults,{stats:{level:60}},saved,'vehicle');assert.equal(vehicle.gloves,look.gloves);
 assert.throws(()=>G.outfitLoadout(G.defaults,'missing'),/Неизвестный/);
});

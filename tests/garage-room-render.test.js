'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync('app-garage-workshop.js','utf8');
const paint=source.slice(source.indexOf('const hallCharacterArtCache='),source.indexOf('window.pokerMountGarageWorkshop='));
const flush=()=>new Promise(resolve=>setImmediate(resolve));
function setup(){
 const counts={shelf:0,vehicle:0,character:0},frames=[];
 const room={clientWidth:390,dataset:{space:'garage'},style:{getPropertyValue(){return '';},setProperty(){}}};
 const shelf={},character={isConnected:true,dataset:{},style:{}},canvas={};
 const world={isConnected:true,offsetWidth:780,closest:()=>room,getAnimations:()=>[],querySelector:s=>s==='.garage-shelf-inventory'?shelf:s==='.player-hall__character'?character:canvas};
 const window={pokerGarageShelf:()=>{counts.shelf++;return 'shelf';}};
 const G={savedLoadout:look=>({helmet:'none',...look}),loadWardrobe:()=>Promise.resolve(),rewardShelfSlots:()=>[],renderCharacter:()=>{counts.character++;return {toDataURL:()=> 'character'};}};
 class Image{naturalWidth=100;set src(value){if(this.onload)this.onload();}}
 vm.runInNewContext(paint,{window,G,Image,paintShelf(){},paintSavedVehicle(){counts.vehicle++;},requestAnimationFrame:fn=>frames.push(fn)});
 return {counts,world,room,shelf,frames,paint:window.pokerPaintGarageRoom};
}
test('garage canvas work waits for camera animation and unchanged shelves and character are reused',async()=>{
 const s=setup(),garage={loadout:{hat:'none'},stats:{level:76}};let finish;
 const finished=new Promise(resolve=>finish=resolve);
 s.world.getAnimations=()=>[{playState:'running',finished}];
 s.paint(s.world,garage);s.frames.shift()();await flush();
 assert.equal(s.counts.shelf,0);assert.equal(s.counts.vehicle,0);assert.equal(s.counts.character,1);
 finish();await flush();assert.equal(s.counts.shelf,1);assert.equal(s.counts.vehicle,1);
 s.world.getAnimations=()=>[];s.paint(s.world,garage);s.frames.shift()();await flush();
 assert.equal(s.counts.shelf,1);assert.equal(s.counts.character,1);
 s.paint(s.world,{loadout:{hat:'cap'},stats:{level:77}});s.frames.shift()();await flush();
 assert.equal(s.counts.shelf,2);assert.equal(s.counts.character,2);
});
test('leaving garage cancels delayed canvas work',async()=>{
 const s=setup();s.paint(s.world,{loadout:{},stats:{level:0}});s.room.dataset.space='hall';s.frames.shift()();await flush();assert.equal(s.counts.shelf,0);assert.equal(s.counts.vehicle,0);
});

test('bicycles, scooters and locked vehicles never prepare the hidden kart',async()=>{
 for(const vehicle of ['5','6','1','2','3','4']){const s=setup();s.room.dataset.garageVehicle=vehicle;s.paint(s.world,{loadout:{},stats:{level:76}});s.frames.shift()();await flush();assert.equal(s.counts.vehicle,0);assert.equal(s.counts.shelf,1);}
});

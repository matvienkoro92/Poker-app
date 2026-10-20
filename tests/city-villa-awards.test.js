'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
test('villa display uses only selected, owned shelf awards in slot order',async()=>{
 const {selectedVillaAwards}=await import('../scripts/city-game/villa-awards.mjs');
 const items=[{id:'cup'},{id:'achievement'},{id:'unselected'}];
 assert.deepEqual(selectedVillaAwards({items,shelves:{cups:['cup','missing',''],achievements:['achievement','cup']}}),[items[0],items[1]]);
 assert.deepEqual(selectedVillaAwards({items,shelves:{cups:[]},featured:['cup']}),[]);
 assert.deepEqual(selectedVillaAwards(null),[]);
});
test('villa cup art is resolved by the same tournament catalog as the application',async()=>{
 const {villaAwardArt}=await import('../scripts/city-game/villa-awards.mjs'),catalog=require('../app-hall-trophies');
 const cup={id:'monday',kind:'cups',history:{tournament:'Меджик',results:[{place:1}]}};
 assert.equal(villaAwardArt(cup,catalog),catalog.forItem(cup));
 assert.equal(villaAwardArt({id:'tournament-king',kind:'achievements'},catalog),'./assets/achievement-trophy-king-v1.webp');
 assert.equal(villaAwardArt({id:'unrecognized',kind:'achievements'},catalog),'');
});

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import tables from '../app-billiards-tables.js';
test('table collection unlocks one new unique table every five levels through 100',()=>{assert.equal(tables.skins.length,21);assert.deepEqual(tables.skins.map(s=>s.level),Array.from({length:21},(_,i)=>i*5));assert.equal(new Set(tables.skins.map(s=>s.id)).size,21);assert.equal(new Set(tables.skins.map(s=>s.image)).size,21);let tier=0;for(const s of tables.skins){assert.ok(s.ornament>=tier);tier=s.ornament;assert.ok(fs.statSync(s.image).size>10000);assert.notEqual(tables.available(s.id,s.level).id,undefined);if(s.level)assert.equal(tables.available(s.id,s.level-1).id,'classic');assert.equal(tables.available(s.id,s.level).id,s.id);}});
test('old saved styles retain their unlocks and invalid levels cannot unlock premium tables',()=>{for(const [id,level]of [['ocean',25],['ruby',50],['royal',80]])assert.equal(tables.skins.find(s=>s.id===id).level,level);for(const level of [null,NaN,Infinity,'100',-1])assert.equal(tables.available('legend',level).id,'classic');assert.equal(tables.available('unknown',100).id,'classic');assert.equal(tables.skins[0].ornament,0);});
test('every table uses a clean room background without the old embedded slippers',()=>{
 for(const skin of tables.skins)assert.match(skin.image,/-v[4-9]\.webp$/,'Clean room artwork must be used for '+skin.id);
});

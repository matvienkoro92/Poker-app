'use strict';
const assert=require('node:assert/strict'),fs=require('fs'),C=require('../hero-catalog'),pilots=require('../lib/hero-pilot-accounts.json');
const ids=new Set(),assigned=new Set();
for(const m of C.models){assert.ok(!ids.has(m.id),'Duplicate model '+m.id);ids.add(m.id);assert.ok(C.slots.some(s=>s.id===m.slot),'Unknown slot '+m.id);assert.ok(m.compatibleCharacters.length&&m.compatibleCharacters.every(id=>C.hero(id)),'Unknown compatibility '+m.id);assert.ok(['starter','collection','premium'].includes(m.acquisition));if(m.acquisition==='collection')assert.ok(Number.isInteger(m.cost)&&m.cost>0,'Missing craft cost '+m.id);for(const url of [m.image,m.sceneImage].filter(Boolean))assert.ok(fs.existsSync(url),'Missing asset '+url);}
for(const h of C.heroes){assert.ok(fs.existsSync(h.base),'Missing hero base '+h.id);assert.ok(fs.existsSync(h.portrait),'Missing hero thumbnail '+h.id);for(const o of C.outfits)assert.ok(fs.existsSync(C.outfitCover(o,h.id)),'Missing outfit cover '+h.id+'/'+o.id);}
for(const [id,hero] of Object.entries(pilots)){assert.match(id,/^ID\d+$/);assert.ok(C.hero(hero),'Unknown pilot hero');}
for(const r of C.releases){assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(r.publishedAt));assert.ok(r.models.length);for(const id of r.models){assert.ok(ids.has(id),'Unknown release model '+id);assert.ok(!assigned.has(id),'Model is in two releases '+id);assert.notEqual(C.model(id).acquisition,'premium','Premium in free release');assigned.add(id);}}
for(const m of C.collectionModels())assert.ok(assigned.has(m.id),'Free model has no release '+m.id);
for(const o of C.outfits){assert.ok(o.models.every(id=>ids.has(id)));assert.equal(new Set(o.models.map(id=>C.model(id).slot)).size,o.models.length,'Two outfit items use one slot');assert.ok(fs.existsSync(o.cover));}
console.log('Hero catalog valid:',C.heroes.length,'identities,',Object.keys(pilots).length,'pilot accounts,',C.models.length,'models,',C.releases.length,'releases');

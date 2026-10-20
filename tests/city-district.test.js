const test=require('node:test'),assert=require('node:assert/strict');
test('business doors and indoor aisles are open, glazing, walls and furniture are physical',async()=>{
 const {BUILDINGS,blocked}=await import('../scripts/city-game/world.mjs'),{venuePlan,insideVenue}=await import('../scripts/city-game/district-plan.mjs');let count=0;
 for(const b of BUILDINGS){const p=venuePlan(b);if(!p)continue;count++;
  for(let z=p.front+1;z>p.front-p.depth+.65;z-=.2)assert.equal(blocked(b.x,z,.35),false,p.venue.name+' doorway/aisle');
  assert.equal(insideVenue({x:b.x,z:p.front-2},BUILDINGS),true);assert.equal(blocked(b.x,p.front-p.depth-.2,.2),true,'back wall');
  for(const f of p.items)assert.equal(blocked(f.x,f.z,.1),true,p.venue.name+' '+f.kind);
 }
 assert.equal(count,6);
});
test('service approaches reach the street without crossing buildings or terrace furniture',async()=>{
 const {BUILDINGS,blocked}=await import('../scripts/city-game/world.mjs'),{districtDriveways}=await import('../scripts/city-game/district-plan.mjs');
 for(const d of districtDriveways(BUILDINGS))for(let z=d.start+.6;z<d.end;z+=.25)assert.equal(blocked(d.x,z,.75),false,`service drive ${d.x},${z}`);
});

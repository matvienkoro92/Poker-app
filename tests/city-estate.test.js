const test=require('node:test'),assert=require('node:assert/strict');
test('private estate furniture and boundaries have physical footprints with clear owner access',async()=>{
 const {estateFeatures}=await import('../scripts/city-game/estate-plan.mjs'),{blocked,SOLIDS}=await import('../scripts/city-game/world.mjs');
 for(const f of estateFeatures){assert.equal(blocked(f.x,f.z,.2),true,f.id);assert.ok(SOLIDS.some(s=>Math.abs((s.minX+s.maxX)/2-f.x)<.001&&Math.abs((s.minZ+s.maxZ)/2-f.z)<.001),f.id);}
 for(const [x,z] of [[53,160],[60,160],[70,160],[78,160],[80.5,160],[78,171],[103,173],[103,175]])assert.equal(blocked(x,z,.5),false,`${x},${z} must stay open`);
 for(const [x,z] of [[53,130],[53,169],[80,117],[80,173],[115.8,181.7]])assert.equal(blocked(x,z,.5),true,`${x},${z} is private boundary`);
});

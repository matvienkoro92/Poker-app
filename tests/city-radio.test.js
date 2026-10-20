const test=require('node:test'),assert=require('node:assert/strict');
test('garage stereo opens only nearby on foot and does not change mission progress',async()=>{
 const {create,prompt,interact}=await import('../scripts/city-game/engine.mjs'),{GARAGE_RADIO,move}=await import('../scripts/city-game/world.mjs');
 const s=create();s.player={x:GARAGE_RADIO.x-1.8,z:GARAGE_RADIO.z,yaw:0};const phase=s.phase;
 assert.match(prompt(s),/Магнитофон/);assert.equal(interact(s),true);assert.equal(s.openRadio,true);assert.equal(s.phase,phase);assert.equal(s.driving,false);
 s.openRadio=false;s.driving=true;assert.doesNotMatch(prompt(s),/Магнитофон/);interact(s);assert.equal(s.openRadio,false);
 s.driving=false;s.player.x=10;s.player.z=10;assert.doesNotMatch(prompt(s),/Магнитофон/);
});

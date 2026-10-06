const test=require('node:test');
const assert=require('node:assert/strict');
const E=require('../app-last-buy-in-campaign-engine.js');

test('Frankl keeps warehouse progress and bonuses after losing a life',()=>{
 const s=E.create(5);s.grid[s.exit.y][s.exit.x]=0;s.exit.revealed=true;s.enemies[0].hp=0;s.cardParts=1;s.bombRange=3;s.bombCapacity=2;s.score=420;s.bombItems=[{x:3,y:1,type:'range'}];s.bombTime=3000;
 const grid=structuredClone(s.grid),enemies=structuredClone(s.enemies),exit=structuredClone(s.exit);
 s.x=7;s.y=9;s.bombs=[{x:1,y:1,fuse:1}];s.flames=[{x:1,y:1,life:30}];s.health=0;s.lost=true;
 E.revive(s);
 assert.deepEqual(s.grid,grid);assert.deepEqual(s.enemies,enemies);assert.deepEqual(s.exit,exit);
 assert.equal(s.cardParts,1);assert.equal(s.score,420);assert.equal(s.bombRange,3);assert.equal(s.bombCapacity,2);assert.equal(s.bombItems.length,1);assert.equal(s.bombTime,3000);
 assert.deepEqual([s.x,s.y],[1,1]);assert.equal(s.lost,false);assert.ok(s.inv>0);assert.deepEqual(s.bombs,[]);assert.deepEqual(s.flames,[]);
 E.step(s,{});assert.equal(s.lost,false);
});
test('Timeout grants another attempt without rebuilding the current warehouse',()=>{
 const s=E.create(5);s.bombRound=2;s.cardParts=1;s.grid[s.exit.y][s.exit.x]=0;s.exit.revealed=true;s.bombTime=0;s.lost=true;
 E.revive(s);assert.ok(s.bombTime>0);assert.equal(s.bombRound,2);assert.equal(s.cardParts,1);assert.equal(s.grid[s.exit.y][s.exit.x],0);assert.equal(s.exit.revealed,true);
 E.step(s,{});assert.equal(s.lost,false);
});

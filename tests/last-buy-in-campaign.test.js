const test=require('node:test'),assert=require('node:assert/strict'),E=require('../app-last-buy-in-campaign-engine'),C=require('../app-last-buy-in-chapters');
test('twelve ordered chapters and five boss encounters, all allies remain allies',()=>{assert.equal(C.length,12);assert.equal(C.filter(c=>c.boss).length,5);assert.equal(C[11].hero,'valera');for(const c of C)assert.ok(c.before&&c.after&&c.goal);assert.deepEqual(C.map(c=>c.mode),['chase','fight','platform','zuma','chips','bomb','tanks','hidden','zuma','race','portal','final']);});
test('Bomb explosions stop at solid walls and chain into adjacent bombs',()=>{const s=E.create(7,{archivedBomb:true});s.bombs=[{x:1,y:1,fuse:1},{x:3,y:1,fuse:99}];E.step(s,{});assert.equal(s.bombs.length,0);assert.ok(s.flames.some(f=>f.x===4&&f.y===1));assert.ok(!s.flames.some(f=>f.x===2&&f.y===2));assert.ok(s.health<5);});
test('Zuma inserts a colour and removes a real matching run; all three batches are completable',()=>{const s=E.create(8);let limit=0;while(!s.won&&limit++<5000){const at=s.chain.findIndex(c=>c.color===s.ball),aim=at<0?0:at;if(at<0){E.step(s,{special:true});E.step(s,{});continue;}E.step(s,{});E.step(s,{aim,attack:true});for(let i=0;i<16;i++)E.step(s,{});}assert.equal(s.won,true);assert.equal(s.wave,3);assert.ok(s.score>1000);});
test('Portals require carrying a cell and installing it at each receiver',()=>{const s=E.create(10);for(let n=0;n<3;n++){s.x=s.cube.x;s.y=s.cube.y;s.ground=true;E.step(s,{attack:true});assert.equal(s.carry,true);E.step(s,{});if(!s.portalPowered){s.x=s.portalConsole.x;s.y=465;s.ground=true;E.step(s,{special:true});}s.x=s.portals[0].x;s.y=465;E.step(s,{});assert.equal(s.crossedPortal,true);s.x=s.pad.x-25;s.y=s.pad.y;s.ground=true;E.step(s,{attack:true});assert.equal(s.portalCharge,1);assert.equal(s.puzzles,n);for(let t=0;t<70;t++)E.step(s,{});assert.equal(s.puzzles,n+1);}assert.equal(s.won,true);});
test('Snake supports carry the rider; locks do not auto-open and boss must be attacked after warning',()=>{const s=E.create(5,{archivedSnake:true});const p=s.platforms[2];s.x=p.x+20;s.y=p.y;s.ground=true;const x=s.x;E.step(s,{});assert.notEqual(s.x,x);assert.equal(s.picked,0);for(const l of s.locks){s.x=l.x;E.step(s,{special:true});}assert.equal(s.picked,3);s.x=s.boss.x-40;s.y=330;E.step(s,{special:true});assert.equal(s.phase,'boss');assert.equal(s.boss.hp,6);});
test('Deaths preserve route progress, collected keys and puzzle state',()=>{for(const chapter of [3,4,6,7,8,9,10]){const s=E.create(chapter);s.score=333;s.picked=2;s.health=0;s.lost=true;const x=s.x;E.revive(s);assert.equal(s.lost,false);assert.equal(s.health,s.mode==='platform'?3:s.mode==='tanks'?1:5);assert.equal(s.x,x);assert.equal(s.score,333);assert.equal(s.picked,2);}});
test('Weapon race requires a first-place finish rather than elapsed time',()=>{const s=E.create(9);s.distance=21599;s.speed=3.8;s.rivals.forEach(r=>r.distance=23000);E.step(s,{up:true});assert.equal(s.won,false);s.distance=21599;s.rivals.forEach(r=>r.distance=5000);E.step(s,{up:true});assert.equal(s.won,true);});
test('Archived swim requires all keys and exit; surface pockets replenish air',()=>{const s=E.create(5,{archivedSwim:true});s.x=150;s.y=130;s.air=100;E.step(s,{});assert.ok(s.air>100);s.x=s.world-50;E.step(s,{});assert.equal(s.won,false);for(const t of s.tokens){s.x=t.x;s.y=t.y;E.step(s,{});}s.x=s.world-50;E.step(s,{});assert.equal(s.won,true);});
test('Speed loop carries the rider through a full circular path, then returns control',()=>{const s=E.create(3,{archivedSpeed:true});s.x=1160;s.y=430;s.vx=7;E.step(s,{right:true});assert.ok(s.loop);let min=540,max=0;for(let i=0;i<150&&s.loop;i++){E.step(s,{});min=Math.min(min,s.y);max=Math.max(max,s.y);}assert.equal(s.loop,null);assert.ok(min<300&&max>440);assert.ok(s.vx>4);});
test('all nine new chapters can be completed through normal controls, sharing at most three campaign lives',()=>{const {controller}=require('./helpers/last-buy-in-campaign-player.cjs');let spent=0;for(const chapter of [2,3,4,5,6,7,8,9,10]){const s=E.create(chapter);while(!s.won&&s.tick<20000){E.step(s,controller(s));assert.ok(Number.isFinite(s.x)&&Number.isFinite(s.y));if(s.lost){spent++;assert.ok(spent<3,'campaign lives exhausted in chapter '+chapter);E.revive(s);}}assert.equal(s.won,true,'chapter '+chapter+' is not completable');const tick=s.tick;E.step(s,{right:true,attack:true});assert.equal(s.tick,tick);}});
test('Platform obstacles have solid sides, walkable tops and a one-use underside reward',()=>{
 const setup=()=>{const s=E.create(2);s.enemies=[];s.mushrooms=[];s.traps=[];s.pipes=[];s.platforms=[];s.blocks=[{x:100,y:300,w:40,h:30,kind:'question',used:false}];return s;};
 let s=setup();s.x=87;s.y=340;E.step(s,{right:true});assert.equal(s.x,88);
 s=setup();s.x=120;s.y=298;s.vy=4;E.step(s,{});assert.equal(s.y,300);assert.equal(s.ground,true);
 s=setup();s.x=120;s.y=380;s.vy=-10;E.step(s,{});assert.equal(s.y,375);assert.equal(s.blocks[0].used,true);assert.equal(s.picked,1);
 s.y=380;s.vy=-10;E.step(s,{});assert.equal(s.picked,1);
 s=setup();s.blocks[0].kind='brick';s.big=100;s.x=120;s.y=380;s.vy=-10;E.step(s,{});assert.equal(s.blocks[0].broken,true);
});
test('Pipe guard cycles and remains dangerous while the player stands nearby',()=>{
 const s=E.create(2),p=s.pipes.find(p=>p.plant);s.mushrooms=[];s.enemies=[];s.traps=[];s.tick=130-Math.floor(p.x);s.x=p.x-100;s.y=p.y+60;E.step(s,{});assert.ok(p.extension>0);
 s.x=p.x+p.w/2;s.y=p.y;s.vy=0;E.step(s,{});assert.ok(s.health<5);p.extension=0;s.inv=0;s.health=5;E.step(s,{});assert.ok(p.extension>0);assert.equal(s.health,4);
});
test('Emil charges a spin dash, releases into a roll and loses rings before health',()=>{
 const s=E.create(3,{archivedSpeed:true});assert.equal(C[3].hero,'emil');s.x=100;s.y=450;s.ground=true;
 for(let i=0;i<30;i++)E.step(s,{special:true});assert.ok(s.charge>40);E.step(s,{right:true});assert.ok(s.vx>=9);assert.equal(s.rolling,true);assert.equal(s.charge,0);
 s.rings=9;const health=s.health;E.damage(s);assert.equal(s.rings,0);assert.equal(s.health,health);assert.equal(s.scatter.length,9);E.damage(s);assert.equal(s.health,health);
 s.inv=0;E.damage(s);assert.equal(s.health,health-1);
});
test('Each speed loop requires momentum and gives control back after a full circuit',()=>{
 for(const index of [0,1,2]){const s=E.create(3,{archivedSpeed:true}),l=s.loops[index];s.x=l.x-5;s.y=440;s.vx=0;E.step(s,{});assert.ok(!s.loop);s.x=l.x-5;s.y=440;s.vx=7;E.step(s,{right:true});assert.ok(s.loop);for(let i=0;i<160&&s.loop;i++)E.step(s,{});assert.ok(!s.loop);assert.equal(l.done,true);assert.ok(s.x>l.x);}
});
test('Chip taps are precise, swipes collect combos and bombs cause damage',()=>{
 const s=E.create(4);s.nextSpawn=999;s.objects=[{id:1,x:100,y:300,vx:0,vy:0,r:18,bomb:false}];E.step(s,{slice:true,pointerX:160,pointerY:300});assert.equal(s.picked,0);E.step(s,{});E.step(s,{slice:true,pointerX:100,pointerY:300});assert.equal(s.picked,1);assert.equal(s.objects.length,0);
 E.step(s,{});s.objects=[{id:2,x:150,y:300,vx:0,vy:0,r:18,bomb:false},{id:3,x:220,y:300,vx:0,vy:0,r:18,bomb:false}];E.step(s,{slice:true,pointerX:120,pointerY:300});E.step(s,{slice:true,pointerX:250,pointerY:300});assert.equal(s.picked,3);assert.ok(s.combo>=2);
 E.step(s,{});s.objects=[{id:4,x:200,y:300,vx:0,vy:0,r:18,bomb:true}];E.step(s,{slice:true,pointerX:200,pointerY:300});assert.equal(s.health,4);assert.equal(s.picked,3);assert.equal(s.combo,0);
});
test('Three missed chips hurt once, missed bombs are harmless and replay preserves a batch',()=>{
 const s=E.create(4);s.nextSpawn=999;s.objects=Array.from({length:3},(_,i)=>({id:i,x:100,y:562,vx:0,vy:0,r:18,bomb:false}));E.step(s,{});assert.equal(s.misses,3);assert.equal(s.health,4);E.step(s,{});assert.equal(s.misses,3);
 s.inv=0;s.objects=[{id:4,x:100,y:562,vx:0,vy:0,r:18,bomb:true}];E.step(s,{});assert.equal(s.health,4);s.wave=2;s.batchPicked=7;s.health=0;s.lost=true;E.revive(s);assert.equal(s.wave,2);assert.equal(s.batchPicked,7);
});
test('City lifts carry Vaar and unsafe ledges collapse then recover',()=>{
 const s=E.create(2),p=s.platforms.find(p=>p.lift);s.mushrooms=[];s.enemies=[];s.pipes=[];s.traps=[];s.streetHazards=[];s.x=p.x+25;s.y=p.y;s.ground=true;const y=s.y;E.step(s,{});assert.notEqual(s.y,y);assert.equal(s.y,p.y);
 const c=s.platforms.find(p=>p.crumble);s.x=c.x+30;s.y=c.y;s.ground=true;for(let i=0;i<62;i++)E.step(s,{});assert.equal(c.gone,true);s.x=30;s.y=465;s.vy=0;s.ground=true;for(let i=0;i<170;i++)E.step(s,{});assert.equal(c.gone,false);
});
test('Electrical strips must be avoided; the archive action cannot disable them',()=>{
 const s=E.create(2),h=s.streetHazards[0];s.mushrooms=[];s.enemies=[];s.traps=[];s.pipes=[];s.x=h.x+30;s.y=h.y;s.ground=true;s.tick=2160-h.offset;E.step(s,{});assert.equal(h.warning,true);assert.equal(h.active,false);assert.equal(s.health,3);
 s.tick=2200-h.offset;E.step(s,{});assert.equal(h.active,true);assert.equal(s.health,2);s.inv=0;s.previous={};E.step(s,{special:true});assert.equal(h.active,true);assert.equal(s.health,1);assert.equal(h.disabledUntil,0);
});

test('Vaar can run below raised reward boxes and hit them by jumping, including a powered-up brick strike',()=>{const initial=E.create(2);for(const block of initial.blocks){const floor=initial.platforms.find(p=>block.x+block.w/2>=p.x&&block.x+block.w/2<=p.x+p.w);assert.ok(block.y+block.h<floor.y-114,'clearance above even the enlarged hero');const s=E.create(2);s.blocks=[{...block}];s.platforms=[{x:block.x-100,y:floor.y,w:300}];s.enemies=[];s.mushrooms=[];s.pipes=[];s.traps=[];s.streetHazards=[];s.x=block.x+block.w/2;s.y=floor.y;s.ground=true;s.big=block.kind==='brick'?100:0;E.step(s,{});assert.equal(s.y,floor.y);for(let i=0;i<60&&!s.blocks[0].used&&!s.blocks[0].broken;i++)E.step(s,{jump:i===0});assert.ok(s.blocks[0].used||s.blocks[0].broken,'jump reaches raised '+block.kind);}});

test('Moving, fading and suspended platforms carry Vaar and keep tokens anchored',()=>{
 for(const kind of ['slide','swing','fade']){const s=E.create(2),p=s.platforms.find(p=>p[kind]);assert.ok(p,kind);s.enemies=[];s.traps=[];s.pipes=[];s.streetHazards=[];s.mushrooms=[];if(p.fade)s.tick=300-Math.floor(p.phase*60);s.x=p.x+p.w/2;s.y=p.y;s.ground=true;const offset=s.x-p.x;for(let i=0;i<30;i++)E.step(s,{});assert.ok(Math.abs(s.x-p.x-offset)<.001,kind+' carries horizontally');assert.equal(s.y,p.y);if(kind==='fade'){s.tick=230-Math.floor(p.phase*60);E.step(s,{});assert.equal(p.gone,true);s.tick=300-Math.floor(p.phase*60);E.step(s,{});assert.equal(p.gone,false);}}
});
test('One archive press at the visible entrance takes the case',()=>{const s=E.create(2);s.caseKeys.forEach(k=>k.collected=true);s.archive.openTicks=60;s.x=s.archive.x-75;s.y=s.archive.y;s.ground=true;s.previous={special:true};E.step(s,{special:true});assert.equal(s.won,true);assert.equal(s.archive.caseTaken,true);});

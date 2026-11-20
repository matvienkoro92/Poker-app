const test=require('node:test'),assert=require('node:assert/strict'),art=require('../lib/nards-challenge-art'),fs=require('node:fs');
test('invitation artwork renders the host mural and checker art, not empty SVG placeholders',async()=>{const photo=await art.render({state:{discipline:'long'},equipment:{nardsBoard:'club-aces',nardsInterior:'waaar-master',checkers:'obsidian',nardsDice:'carbon',nardsDiceSize:'small'}});const sharp=require('sharp'),metadata=await sharp(photo).metadata(),portrait=await sharp(photo).extract({left:140,top:130,width:150,height:180}).stats();assert.equal(metadata.format,'jpeg');assert.equal(metadata.width,900);assert.equal(metadata.height,944);assert.ok(photo.length<1024*1024);assert.ok(portrait.channels.some(c=>c.stdev>25),'Embedded mural must have visible detail');});
test('only catalog equipment is used and small dice retain their material',()=>{const svg=art.svgFor({state:{discipline:'short'},equipment:{nardsInterior:'../../secret',checkers:'../../secret',nardsDice:'jade',nardsDiceSize:'small'}});assert.ok(!svg.includes('<text'),'Invitation must not depend on server Cyrillic fonts');assert.ok(svg.includes('#286b54'));assert.ok(svg.includes('width="52.2"'));assert.ok(!svg.includes('../../secret'));assert.equal((svg.match(/id="coin-/g)||[]).length,0);});

test('invite art uses the room host snapshot for both leaves, checkers and dice',()=>{
 const catalog=require('../lib/nards-equipment');
 for(const nardsInterior of ['manki-villa','club-emerald']){
 const equipment={nardsInterior,nardsBoard:'classic',checkers:'pearl',nardsDice:'jade',nardsDiceSize:'small'};
 const svg=art.svgFor({state:{discipline:'long'},equipment});
 const inside=catalog.NARDS_INTERIORS.find(b=>b.id===nardsInterior);
 const surfaces=[...svg.matchAll(/<image data-detail="board-surface" [^>]+>/g)].map(match=>match[0]);
 assert.equal(surfaces.length,2);
 for(const [index,side] of ['leftSurface','rightSurface'].entries()){
  assert.ok(surfaces[index].includes(fs.readFileSync(inside[side]).toString('base64')),'Missing corrected '+side);
  assert.ok(surfaces[index].includes('preserveAspectRatio="xMidYMid slice"'));
 }
 assert.ok(svg.includes('#286b54'));assert.ok(svg.includes('#374655'));assert.ok(svg.includes('width="52.2"'));
 const basic=art.svgFor({state:{discipline:'long'},equipment:{...equipment,nardsInterior:'classic'}});assert.notEqual(svg,basic);
 }
});

test('Monfokon hides the same point overlays in challenge artwork as in the editor',()=>{
 const painted=art.svgFor({state:{discipline:'long'},equipment:{nardsInterior:'monfokon'}});
 const classic=art.svgFor({state:{discipline:'long'},equipment:{nardsInterior:'classic'}});
 const triangles=svg=>(svg.match(/data-detail="point-inlay"/g)||[]).length;
 assert.equal(triangles(painted),0);assert.equal(triangles(classic),24);
});

test('current case details survive rasterization and preserve the selected host design',async()=>{
 const view={state:{discipline:'long'},equipment:{nardsBoard:'club-aces',nardsInterior:'club-obsidian',checkers:'jade',nardsDice:'jade'}};
 const svg=art.svgFor(view);
 for(const [detail,count] of [['case-carving',2],['brass-hinge',2],['storage-well',30]])assert.equal((svg.match(new RegExp('data-detail="'+detail+'"','g'))||[]).length,count);
 assert.doesNotMatch(svg,/data-detail="(?:straight|scalloped)-rail"/);
 const photo=await art.render(view),sharp=require('sharp');
 const carved=await sharp(photo).extract({left:15,top:0,width:860,height:18}).stats();
 assert.ok(carved.channels.some(c=>c.stdev>20),'Carved rim must retain visible relief');
});

test('long heads occupy opposite half-board points, with the same compressed stacks as live play',()=>{
 const svg=art.svgFor({state:{discipline:'long'},equipment:{}});
 // Inspect coin shadow circles, one per checker, grouped by the two starting heads.
 const heads=svg.split('<g data-detail="checker-stack"').slice(1).map(s=>s.split('<g transform="rotate(')[0]);
 assert.equal(heads.length,2);
 for(const [i,head]of heads.entries()){
  const coins=[...head.matchAll(/<circle cx="([\d.]+)" cy="([\d.]+)" r="([\d.]+)" fill="(?:#111b16|#82663d)"/g)].map(m=>({y:Number(m[2])-2,r:Number(m[3])}));
  assert.equal(coins.length,15);
  for(const c of coins){assert.ok(c.y-c.r>=20-1e-6);assert.ok(c.y+c.r<=20+828*12/11+1e-6);if(i===0)assert.ok(c.y+c.r<=20+828*6/11+2+1e-6);else assert.ok(c.y-c.r>=20+828*6/11-2-1e-6);}
 }
});

test('material collections use the same textured point assets as live play',()=>{
 const svg=art.svgFor({state:{discipline:'long'},equipment:{nardsInterior:'obsidian-copper'}});
 for(const side of ['dark','light'])assert.ok(svg.includes(fs.readFileSync('assets/board-games/nards/obsidian-copper-point-'+side+'-v2.webp').toString('base64')));
});

test('host can hide homes and carving in the invitation just as on the live board',()=>{
 const svg=art.svgFor({state:{discipline:'long'},equipment:{nardsHome:'none',nardsRailsHidden:true,nardsInterior:'obsidian-copper'}});
 for(const detail of ['storage-well','case-carving','straight-rail','brass-hinge'])assert.ok(!svg.includes('data-detail="'+detail+'"'));
 assert.ok(svg.includes('data-detail="plain-rim"'));
});

test('invitation respects independent relief selections and fitted home shapes',()=>{
 const equipment={nardsInterior:'sport-sibir',nardsRailTop:'frost',nardsRailBottom:'wave',nardsHome:'octagon',nardsHomeFull:true};
 const svg=art.svgFor({state:{discipline:'long'},equipment});
 for(const id of ['frost','wave'])assert.ok(svg.includes(fs.readFileSync('assets/board-games/nards/rail-'+id+'-relief-v3.webp').toString('base64')));
 assert.ok(svg.includes('data-home="octagon" data-home-full="true"'));
 assert.equal((svg.match(/<polygon points=/g)||[]).length,30);
 assert.ok(svg.includes('preserveAspectRatio="xMidYMid slice"'));
 const tray=art.svgFor({state:{discipline:'long'},equipment:{...equipment,nardsHome:'tray'}});
 assert.equal((tray.match(/data-detail="storage-tray"/g)||[]).length,2);
 assert.ok(!tray.includes('data-detail="storage-well"'));
});

test('ordinary points follow the six live tip gaps instead of a fixed long blade',()=>{
 const svg=art.svgFor({state:{discipline:'long'},equipment:{nardsInterior:'sport-sibir'}});
 const tips=[...svg.matchAll(/data-detail="point-inlay" d="M[\d.]+ [\d.]+H[\d.]+L[\d.]+ ([\d.]+)Z/g)].slice(0,6).map(m=>Number(m[1]));
 assert.equal(tips.length,6);
 assert.ok(tips[0]>tips[1]&&tips[1]>tips[2]);
 assert.equal(tips[0],tips[5]);assert.equal(tips[1],tips[4]);assert.equal(tips[2],tips[3]);
 assert.ok(Math.max(...tips)<250,'Sports triangles must leave the central painting visible');
});


test('retired landing wells stay hidden even in old equipment snapshots',async()=>{
 const view={state:{discipline:'long'},equipment:{nardsWells:true,nardsInterior:'classic'}};
 const svg=art.svgFor(view);
 assert.equal((svg.match(/data-detail="landing-well"/g)||[]).length,0);
 assert.ok(!art.svgFor({...view,equipment:{nardsWells:false}}).includes('data-detail="landing-well"'));
 const photo=await art.render(view);assert.ok(photo.length>10000);
});
test('reference interiors suppress wooden lips and brass hinges like the editor',()=>{
 const svg=art.svgFor({state:{discipline:'long'},equipment:{nardsInterior:'obsidian-copper'}});
 assert.ok(!svg.includes('data-detail="straight-rail"'));
 assert.ok(!svg.includes('data-detail="brass-hinge"'));
 assert.equal((svg.match(/data-detail="case-carving"/g)||[]).length,2);
});
test('hidden homes expand the field without clipping its bottom edge',async()=>{
 const photo=await art.render({state:{discipline:'long'},equipment:{nardsHome:'none'}});
 const meta=await require('sharp')(photo).metadata();assert.equal(meta.height,1005);
});

test('Sprint invitation uses each room’s starting points for three or five checkers',async()=>{
 const {createGame}=await import('../scripts/board-games/engine.mjs');
 for(const count of [3,5]){
  const state=createGame('long',{variant:'sprint',sprintCheckers:count});
  const svg=art.svgFor({state,equipment:{nardsInterior:'manki-villa'}});
  const stacks=[...svg.matchAll(/data-detail="checker-stack" data-point="(\d+)"/g)].map(match=>Number(match[1]));
  const expected=Array.from({length:count},(_,i)=>i);
  assert.deepEqual(stacks,[...expected,...expected.map(i=>24-count+i)]);
 }
});

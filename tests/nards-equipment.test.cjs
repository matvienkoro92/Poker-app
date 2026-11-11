const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),N=require('../lib/nards-equipment');
test('every checker has two distinct lightweight assets',()=>{assert.equal(N.DESIGN_CHECKERS.length,20);for(const c of N.DESIGN_CHECKERS){assert.notEqual(c.whiteArt,c.blackArt);for(const asset of [c.whiteArt,c.blackArt]){if(c.rasterArt){const data=fs.readFileSync(asset);assert.equal(data.toString('ascii',0,4),'RIFF');assert.equal(data.toString('ascii',8,12),'WEBP');assert.ok(data.length<200000);continue;}const s=fs.readFileSync(asset,'utf8');assert.match(s,/<svg/);assert.ok(s.length<(c.whiteArt.includes("designer-")&&["waaar","cooler","emil","club-aces","dragon","koi"].includes(c.id)?120000:8000));assert.doesNotMatch(s,/<animate|<script/);}}});
test('small dice are independent of material and safely persisted without a level requirement',()=>{for(const d of N.NARDS_DICE){const equipment=N.cleanNards({nardsDice:d.id,nardsDiceSize:'small'},100);assert.equal(equipment.nardsDice,d.id);assert.equal(equipment.nardsDiceSize,'small');}assert.equal(N.cleanNards({nardsDiceSize:'small'},1).nardsDiceSize,'small');for(const value of [null,{},'giant',1])assert.equal(N.cleanNards({nardsDiceSize:value},1).nardsDiceSize,'standard');});
test('new collections keep server level locks and reset unavailable choices',()=>{assert.equal(N.NARDS_DICE.length,17);for(const c of N.DESIGN_CHECKERS){assert.equal(N.cleanNards({checkers:c.id},100).checkers,c.id);if(c.level>1)assert.equal(N.cleanNards({checkers:c.id},1).checkers,'classic');}assert.equal(N.cleanNards({nardsDice:'galaxy'},1).nardsDice,'classic');});

test('the six original interiors are available at level one, illustrated sets obey their levels',()=>{for(const id of ['classic','mosaic','jade','noir','frost'])assert.equal(N.cleanNards({nardsInterior:id},1).nardsInterior,id);for(const b of N.NARDS_INTERIORS.filter(b=>b.art)){assert.equal(N.cleanNards({nardsInterior:b.id},b.level).nardsInterior,b.id);if(b.level>1)assert.equal(N.cleanNards({nardsInterior:b.id},b.level-1).nardsInterior,'manki-villa');for(const file of [b.preview,b.surface]){assert.ok(fs.readFileSync(file).length<300000);}}});

test('six club backgrounds unlock at level one and default to PokerManki villa without replacing saved choices',()=>{
 const added=N.NARDS_INTERIORS.filter(b=>b.splitArt);assert.equal(added.length,6);assert.equal(N.cleanNards({},1).nardsInterior,'manki-villa');assert.ok(!N.NARDS_INTERIORS.some(b=>b.id==='ocean'));
 for(const b of added){assert.equal(b.level,1);assert.equal(N.cleanNards({nardsInterior:b.id},1).nardsInterior,b.id);for(const side of ['leftSurface','rightSurface'])assert.ok(fs.existsSync(b[side]));}
 assert.equal(N.cleanNards({nardsInterior:'classic'},1).nardsInterior,'classic');
});

test('illustrated previews and gameplay panels have mobile size budgets',async()=>{
 const sharp=require('sharp');
 for(const b of N.NARDS_INTERIORS.filter(b=>b.art)){
  const preview=await sharp(b.preview).metadata();assert.equal(preview.format,'webp');assert.equal(preview.width,480);assert.ok(fs.statSync(b.preview).size<70000,b.id+' thumbnail too large');
  for(const side of ['leftSurface','rightSurface']){const m=await sharp(b[side]).metadata();if(b.splitArt){const source=await sharp('assets/board-games/nards/illustration-'+b.art+'-'+(side==='leftSurface'?'left':'right')+'.webp').metadata();assert.equal(m.width,source.width);assert.equal(m.height,source.height);assert.ok(m.width/m.height<.46);}else{assert.equal(m.width,582);assert.equal(m.height,1000);}assert.ok(fs.statSync(b[side]).size<150000,b.id+' panel too large');}
 }
});

test('painted point markings cannot be doubled by a legacy saved overlay preference',()=>{
 const {NARDS_INTERIORS,nardsShowPoints,cleanNards}=require('../lib/nards-equipment');
 const painted=NARDS_INTERIORS.filter(b=>b.bakedPoints);assert.equal(painted.length,6);
 for(const inside of painted){for(const requested of [undefined,null,true,false])assert.equal(nardsShowPoints(inside,requested),false,inside.id);assert.equal(cleanNards({nardsInterior:inside.id,nardsPoints:true},100).nardsPoints,false);}
 const classic=NARDS_INTERIORS.find(b=>b.id==='classic');assert.equal(nardsShowPoints(classic,null),true);assert.equal(nardsShowPoints(classic,false),false);
});

test('five reference sets unlock board, interior, checkers and dice together at their assigned levels',()=>{
 const {THEMES}=require('../lib/nards-reference-themes');
 for(const theme of THEMES){
  const selected={nardsBoard:theme.id,nardsInterior:theme.id,checkers:theme.id,nardsDice:theme.id};
  const unlocked=N.cleanNards(selected,theme.level),locked=N.cleanNards(selected,theme.level-1);
  for(const field of Object.keys(selected)){assert.equal(unlocked[field],theme.id);if(theme.level>1)assert.notEqual(locked[field],theme.id);}
  for(const items of [N.NARDS_BOARDS,N.NARDS_INTERIORS,N.DESIGN_CHECKERS,N.NARDS_DICE])assert.equal(items.find(x=>x.id===theme.id).level,theme.level);
 }
});
test('a level-one guest and spectator receive the host cosmic set without unlocking it personally',async()=>{
 const fixture=require('./helpers/board-wager-fixture.cjs')({profiles:{m1:{name:'Хозяин',level:100},m2:{name:'Гость',level:1}}});
 const equipment={nardsBoard:'cosmic-titanium',nardsInterior:'cosmic-titanium',checkers:'cosmic-titanium',nardsDice:'cosmic-titanium'};
 const host=await fixture.service.call('m1',{action:'create',discipline:'long',equipment});
 const guest=await fixture.call('m2','join',host.roomId,{equipment:{checkers:'classic'}}),viewer=await fixture.call('viewer','watch',host.roomId);
 for(const field of Object.keys(equipment)){assert.equal(guest.equipment[field],equipment[field]);assert.equal(viewer.equipment[field],equipment[field]);assert.notEqual(N.cleanNards(equipment,1)[field],equipment[field]);}
});

test('hidden homes are persisted and shared from host to guest and spectator',async()=>{
 const selected=N.cleanNards({nardsHome:'none',nardsHomeFull:true,nardsRailsHidden:true},1);assert.equal(selected.nardsHome,'none');
 const fixture=require('./helpers/board-wager-fixture.cjs')({profiles:{m1:{name:'Хозяин',level:1},m2:{name:'Гость',level:1}}});
 const host=await fixture.service.call('m1',{action:'create',discipline:'long',equipment:selected});
 assert.equal(host.equipment.nardsHome,'none');
 for(const [account,action]of [['m2','join'],['viewer','watch']]){const result=await fixture.call(account,action,host.roomId,{equipment:{nardsHome:'round'}});assert.equal(result.equipment.nardsHome,'none');assert.equal(result.equipment.nardsRailsHidden,true);}
});

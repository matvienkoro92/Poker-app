const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),N=require('../lib/nards-equipment');
test('every new checker has two distinct lightweight vector assets',()=>{assert.equal(N.DESIGN_CHECKERS.length,13);for(const c of N.DESIGN_CHECKERS){assert.notEqual(c.whiteArt,c.blackArt);for(const asset of [c.whiteArt,c.blackArt]){const s=fs.readFileSync(asset,'utf8');assert.match(s,/<svg/);assert.ok(s.length<(c.whiteArt.includes("designer-")&&["waaar","cooler","emil","club-aces","dragon","koi"].includes(c.id)?120000:8000));assert.doesNotMatch(s,/<animate|<script/);}}});
test('small dice are independent of material and safely persisted without a level requirement',()=>{for(const d of N.NARDS_DICE){const equipment=N.cleanNards({nardsDice:d.id,nardsDiceSize:'small'},50);assert.equal(equipment.nardsDice,d.id);assert.equal(equipment.nardsDiceSize,'small');}assert.equal(N.cleanNards({nardsDiceSize:'small'},1).nardsDiceSize,'small');for(const value of [null,{},'giant',1])assert.equal(N.cleanNards({nardsDiceSize:value},1).nardsDiceSize,'standard');});
test('new collections keep server level locks and reset unavailable choices',()=>{assert.equal(N.NARDS_DICE.length,11);for(const c of N.DESIGN_CHECKERS){assert.equal(N.cleanNards({checkers:c.id},50).checkers,c.id);if(c.level>1)assert.equal(N.cleanNards({checkers:c.id},1).checkers,'classic');}assert.equal(N.cleanNards({nardsDice:'galaxy'},1).nardsDice,'classic');});

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

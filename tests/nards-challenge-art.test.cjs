const test=require('node:test'),assert=require('node:assert/strict'),art=require('../lib/nards-challenge-art'),fs=require('node:fs');
test('invitation artwork renders the host mural and checker art, not empty SVG placeholders',async()=>{const photo=await art.render({state:{discipline:'long'},equipment:{nardsBoard:'club-aces',nardsInterior:'waaar-master',checkers:'obsidian',nardsDice:'carbon',nardsDiceSize:'small'}});const sharp=require('sharp'),metadata=await sharp(photo).metadata(),portrait=await sharp(photo).extract({left:140,top:130,width:150,height:180}).stats();assert.equal(metadata.format,'jpeg');assert.equal(metadata.width,900);assert.equal(metadata.height,944);assert.ok(photo.length<1024*1024);assert.ok(portrait.channels.some(c=>c.stdev>25),'Embedded mural must have visible detail');});
test('only catalog equipment is used and small dice retain their material',()=>{const svg=art.svgFor({state:{discipline:'short'},equipment:{nardsInterior:'../../secret',checkers:'../../secret',nardsDice:'jade',nardsDiceSize:'small'}});assert.ok(!svg.includes('<text'),'Invitation must not depend on server Cyrillic fonts');assert.ok(svg.includes('#286b54'));assert.ok(svg.includes('width="40"'));assert.ok(!svg.includes('../../secret'));assert.equal((svg.match(/id="coin-/g)||[]).length,0);});

test('invite art uses the room host snapshot for both leaves, checkers and dice',()=>{
 const equipment={nardsInterior:'manki-villa',nardsBoard:'classic',checkers:'pearl',nardsDice:'jade',nardsDiceSize:'small'};
 const svg=art.svgFor({state:{discipline:'long'},equipment});
 const catalog=require('../lib/nards-equipment'),inside=catalog.NARDS_INTERIORS.find(b=>b.id==='manki-villa');
 for(const side of ['leftSurface','rightSurface'])assert.ok(svg.includes(fs.readFileSync(inside[side]).toString('base64')),'Missing selected '+side);
 assert.ok(svg.includes('#286b54'));assert.ok(svg.includes('#374655'));assert.ok(svg.includes('width="40"'));
 const basic=art.svgFor({state:{discipline:'long'},equipment:{...equipment,nardsInterior:'classic'}});assert.notEqual(svg,basic);
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
 for(const [detail,count] of [['case-carving',2],['scalloped-rail',4],['brass-hinge',2],['storage-well',30]])assert.equal((svg.match(new RegExp('data-detail="'+detail+'"','g'))||[]).length,count);
 const photo=await art.render(view),sharp=require('sharp');
 const carved=await sharp(photo).extract({left:15,top:0,width:860,height:18}).stats();
 assert.ok(carved.channels.some(c=>c.stdev>20),'Carved rim must retain visible relief');
});

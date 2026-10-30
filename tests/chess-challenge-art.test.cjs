'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),sharp=require('sharp'),art=require('../lib/chess-challenge-art');
test('chess invitation uses the selected board and the same piece sprites as the preview',async()=>{
 const view={state:{discipline:'chess',whitePlayer:0},equipment:{board:'marble-brass',pieces:'arabesque'}};
 const svg=await art.svgFor(view);assert.equal((svg.match(/data-piece=/g)||[]).length,32);assert.equal((svg.match(/filter="url\(#chess-contrast-/g)||[]).length,32);assert.ok(svg.includes('#fff1ce'));assert.ok(svg.includes('#17221e'));assert.ok(!svg.includes('./assets/'));assert.ok(!svg.includes('https://'));
 const photo=await art.render(view),meta=await sharp(photo).metadata();assert.equal(meta.width,900);assert.equal(meta.height,900);assert.equal(meta.format,'jpeg');assert.ok(photo.length<1024*1024);
 const changed=await art.render({...view,equipment:{board:'ocean',pieces:'classic-navy'}});assert.notDeepEqual(photo,changed);
 const stats=await sharp(photo).stats();assert.ok(stats.channels.some(c=>c.stdev>30));require('fs').writeFileSync('/tmp/chess-host-equipment-preview.jpg',photo);
});
test('every catalog piece style renders, including meme figures and custom frame sizes',async()=>{
 const {PIECES}=require('../lib/chess-equipment');for(const pieces of PIECES){
 const view={state:{discipline:'chess',whitePlayer:1},equipment:{board:'celtic-oak',pieces:pieces.id}};
 const svg=await art.svgFor(view);assert.equal((svg.match(/data-piece=/g)||[]).length,32,pieces.id);const image=await art.render(view);assert.ok(image.length>10000,pieces.id);
 }
});
test('equipment paths are chosen only from the server catalog and room FEN is respected',async()=>{
 const svg=await art.svgFor({state:{discipline:'chess',fen:'8/8/8/8/8/8/4K3/4k3 w - - 0 1'},equipment:{board:'../../secret',pieces:'https://example.com/secret'}});
 assert.equal((svg.match(/data-piece=/g)||[]).length,2);assert.ok(!svg.includes('secret'));assert.ok(svg.includes('#769656'));
 await assert.rejects(art.svgFor({state:{fen:'bad'}}),/Invalid chess/);
});

'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
test('selection survives clock-only revisions and unrelated opponent moves, but not captures or resets',async()=>{
 const {Chess}=require('chess.js'),{retainChessSelection}=await import('../scripts/board-games/chess-input.mjs');
 const c=new Chess();c.move('e4');const prior={discipline:'chess',fen:c.fen(),ply:1,winner:null,whitePlayer:0};
 const keep=next=>retainChessSelection({prior,next,square:'g1',player:0,Chess});
 assert.equal(keep({...prior}),true);c.move('e5');assert.equal(keep({...prior,fen:c.fen(),ply:2}),true);
 assert.equal(keep({...prior,ply:0}),false);assert.equal(keep({...prior,winner:1}),false);
 const before=new Chess('4k3/8/8/8/8/8/1r6/1N2K3 b - - 0 1');
 const capturePrior={...prior,fen:before.fen(),ply:10};before.move('b2b1');
 assert.equal(retainChessSelection({prior:capturePrior,next:{...capturePrior,fen:before.fen(),ply:11},square:'b1',player:0,Chess}),false);
});
test('next input may be queued during a pending move even after polling confirmed that move',()=>{
 const source=fs.readFileSync(require.resolve('../scripts/board-games/main.mjs'),'utf8');
 const start=source.indexOf('function canPremove()'),end=source.indexOf('function ownChessColor()',start);
 const c={kind:'chess',state:{winner:null,turn:1},ready:true,spectator:false,busy:true,mode:'online',player:0,pendingChessMove:true,optimisticRevision:null};
 vm.runInNewContext(source.slice(start,end),c);
 assert.equal(c.canPremove(),true);c.state.turn=0;assert.equal(c.canPremove(),true);
 c.pendingChessMove=false;assert.equal(c.canPremove(),false);c.busy=false;assert.equal(c.canPremove(),false);
 c.state.turn=1;assert.equal(c.canPremove(),true);c.spectator=true;assert.equal(c.canPremove(),false);
});

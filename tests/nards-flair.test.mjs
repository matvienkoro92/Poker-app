import test from 'node:test';import assert from 'node:assert/strict';
const {dragonHome}=await import('../scripts/board-games/nards-flair.mjs');
test('fire starts at the last five home checkers, independently for either player and discipline',()=>{for(const discipline of ['short','long'])for(const p of [0,1]){
 const points=Array(24).fill(0),home=discipline==='long'?(p===0?18:6):(p===0?18:5),outside=discipline==='long'?(p===0?17:5):(p===0?17:6),sign=p===0?1:-1;
 const s={discipline,points,bar:[0,0],off:[0,0],winner:null};for(const n of [15,6,5,4,1,0]){points.fill(0);points[home]=n*sign;s.off[p]=15-n;assert.equal(dragonHome(s,p),n>=1&&n<=5,'remaining '+n);}
 points[home]=4*sign;points[outside]=sign;s.off[p]=10;assert.equal(dragonHome(s,p),false);points[outside]=0;s.bar[p]=1;assert.equal(dragonHome(s,p),false);s.bar[p]=0;s.winner=1-p;assert.equal(dragonHome(s,p),false);s.winner=null;assert.equal(dragonHome({...s,discipline:'chess'},p),false);
}});
test('six checkers cannot light up from a mismatched off counter',()=>{const s={discipline:'long',points:Array(24).fill(0),bar:[0,0],off:[10,0],winner:null};s.points[23]=6;assert.equal(dragonHome(s,0),false);});

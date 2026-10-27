const test=require('node:test'),assert=require('node:assert/strict'),{score,board}=require('../app-villa-darts');
test('bull, outer bull and miss',()=>{assert.equal(score(0,0).points,50);assert.equal(score(0,12).points,25);assert.equal(score(171,0).points,0);});
test('all 20 sectors have correct single, double and triple scores',()=>{const sectors=[20,1,18,4,13,6,10,15,2,17,3,19,7,16,8,11,14,9,12,5];sectors.forEach((n,i)=>{for(const [r,m]of [[60,1],[103,3],[166,2]])assert.equal(score(Math.sin(i*Math.PI/10)*r,-Math.cos(i*Math.PI/10)*r).points,n*m);});});
test('board includes all scoring sectors',()=>{assert.equal((board().match(/<path /g)||[]).length,80);assert.ok(board().includes('viewBox="0 0 400 400"'));});
const {resolveThrow}=require('../app-villa-darts');
test('straight reference swipe hits the selected point without random scatter',()=>{assert.deepEqual(resolveThrow({x:20,y:-103},{lift:100,side:0,curve:0}),{x:20,y:-103,power:1,feedback:'Ровный бросок'});});
test('weak and strong throws land below and above the target',()=>{const target={x:0,y:0};assert.ok(resolveThrow(target,{lift:50,side:0,curve:0}).y>0);assert.ok(resolveThrow(target,{lift:150,side:0,curve:0}).y<0);});
test('sideways and curved swipes move impact and can miss the board',()=>{assert.ok(resolveThrow({x:0,y:0},{lift:100,side:30,curve:20}).x>20);const miss=resolveThrow({x:160,y:0},{lift:100,side:40,curve:0});assert.equal(score(miss.x,miss.y).points,0);});

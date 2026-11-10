import test from 'node:test';import assert from 'node:assert/strict';import {radarPoint,radarMarker} from '../scripts/stadium-race/minimap.mjs';
test('heading-up radar puts forward above the player and follows actual lateral position',()=>{
 const origin={x:10,z:20};assert.deepEqual(radarPoint(origin,origin,0),{x:76,y:99});
 assert.ok(radarPoint({x:10,z:50},origin,0).y<99);assert.ok(radarPoint({x:0,z:20},origin,0).x>76);
 const east=radarPoint({x:40,z:20},origin,Math.PI/2);assert.ok(Math.abs(east.x-76)<1e-8);assert.ok(east.y<99);
});
test('distant rivals remain visible as edge arrows while nearby ones keep exact positions',()=>{
 for(const point of [{x:500,y:-200},{x:-500,y:200},{x:76,y:1000}]){const m=radarMarker(point);assert.equal(m.offscreen,true);assert.ok(m.x>=14&&m.x<=138&&m.y>=14&&m.y<=138);assert.ok(Number.isFinite(m.angle));}
 const m=radarMarker({x:80,y:70});assert.equal(m.offscreen,false);assert.equal(m.x,80);assert.equal(m.y,70);
});

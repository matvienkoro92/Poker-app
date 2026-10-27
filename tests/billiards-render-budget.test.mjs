import test from 'node:test';import assert from 'node:assert/strict';
import {mobileGraphics,createFrameBudget} from '../scripts/billiards/render-budget.mjs';
test('phone and touch tablet cap pixels and mesh cost; desktop retains detail',()=>{
 const phone=mobileGraphics({width:390,height:844,dpr:3,coarse:false}),tablet=mobileGraphics({width:1024,height:768,dpr:2,coarse:true}),desktop=mobileGraphics({width:1440,height:900,dpr:2,coarse:false});
 assert.equal(phone.pixelRatio,1.25);assert.deepEqual(phone.ballSegments,[32,24]);assert.equal(tablet.fps,30);assert.equal(desktop.fps,60);assert.equal(desktop.pixelRatio,2);
});
test('high refresh phones stay at 30 updates, stationary scenes at 15, hidden scenes stop',()=>{
 for(const hz of [60,90,120,144]){const budget=createFrameBudget(30);let active=0;for(let i=0;i<hz;i++)active+=budget.ready(i*1000/hz);assert.ok(active>=24&&active<=31,{hz,active});}
 const budget=createFrameBudget(30);let idle=0;for(let i=0;i<120;i++)idle+=budget.ready(i*1000/120,{active:false});assert.equal(idle,15);
 assert.equal(budget.ready(1000,{hidden:true}),false);assert.equal(budget.ready(1001),true);
});

test('entering the table bypasses the previous idle frame delay once',()=>{const budget=createFrameBudget(30);assert.equal(budget.ready(100,{active:false}),true);assert.equal(budget.ready(101,{active:false}),false);budget.reset();assert.equal(budget.ready(101,{active:false}),true);assert.equal(budget.ready(102,{active:false}),false);});

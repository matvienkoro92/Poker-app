import test from 'node:test';import assert from 'node:assert/strict';
import * as T from '../vendor/three/three.module.min.js';
import {streetGeometry} from '../scripts/stadium-race/lod-geometry.mjs';
test('distant cars preserve UV and hard-normal seams at coincident vertices',()=>{
 const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute([0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1],3));g.setAttribute('normal',new T.Float32BufferAttribute([0,0,1,0,0,1,0,0,1,1,0,0,1,0,0,1,0,0],3));g.setAttribute('uv',new T.Float32BufferAttribute([0,0,1,0,0,1,1,1,1,0,0,0],2));
 const result=streetGeometry(g,new T.Matrix4());assert.equal(result.attributes.position.count,6);assert.equal(result.index.count,6);assert.equal(result.attributes.uv.getX(3),1);assert.equal(result.attributes.normal.getX(3),1);result.dispose();g.dispose();
});
test('flat densely tessellated surfaces still simplify and remain finite',()=>{
 const g=new T.PlaneGeometry(1,1,100,100);g.attributes.uv.array.fill(0);const result=streetGeometry(g,new T.Matrix4());assert.ok(result.index.count<g.index.count/5);for(const value of result.attributes.position.array)assert.ok(Number.isFinite(value));assert.ok(result.boundingSphere.radius<=.72);result.dispose();g.dispose();
});

'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync('app-garage-workshop.js','utf8');
const apply=source.slice(source.indexOf(' const apply=image=>'),source.indexOf(' if(savedVehicleCache.has(key))'));
test('same-size transparent garage snapshot replaces the old vehicle instead of blending over it',()=>{
 const calls=[],ctx={clearRect:(...args)=>calls.push(['clear',...args]),drawImage:(...args)=>calls.push(['draw',...args])};const canvas={width:900,height:600,dataset:{},getContext:()=>ctx,setAttribute(){}};
 const scope={canvas,current:()=>true,key:'ruby-bike',geometryKey:'bike',loading:null};vm.createContext(scope);vm.runInContext(apply+';this.replace=apply;',scope);
 const blue={width:900,height:600},ruby={width:900,height:600};scope.replace(blue);scope.replace(ruby);
 assert.deepEqual(calls.map(c=>c[0]),['clear','draw','clear','draw']);assert.deepEqual(calls[2],['clear',0,0,900,600]);assert.equal(calls[3][1],ruby);assert.equal(canvas.dataset.vehicleLoadout,'ruby-bike');
});
test('stale asynchronous snapshots cannot clear a newer vehicle',()=>{const canvas={getContext(){throw Error('stale render touched canvas');}};const scope={canvas,current:()=>false};vm.createContext(scope);vm.runInContext(apply+';this.replace=apply;',scope);assert.doesNotThrow(()=>scope.replace({width:900,height:600}));});

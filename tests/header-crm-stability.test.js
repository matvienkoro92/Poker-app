'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync('app-visitors-admin.js','utf8');
const code=source.slice(source.indexOf('  function syncCrmButtonAccess()'),source.indexOf('  function syncHeaderAdminShortcuts()'));
test('repeat CRM access checks keep allowed buttons visible; session changes hide them',()=>{
 const changes=[];let key='session-a',requests=0;
 const context={document:{getElementById:id=>({id})},crmAccessProbeState:'allowed',crmAccessProbeKey:'session-a',buildCrmAccessProbeUrl:()=>key,setCrmButtonAllowed:(button,allowed)=>changes.push(allowed),syncHeaderAdminShortcuts(){},fetch(){requests++;return new Promise(()=>{});}};
 vm.createContext(context);vm.runInContext(code,context);
 context.syncCrmButtonAccess();context.syncCrmButtonAccess();
 assert.ok(changes.every(Boolean));assert.equal(requests,0);
 changes.length=0;key='session-b';context.syncCrmButtonAccess();
 assert.deepEqual(changes,[false,false]);assert.equal(requests,1);
 context.syncCrmButtonAccess();assert.equal(requests,1);
});
test('known owner menu appears while verification is pending; denial and logout hide it',()=>{
 const changes=[];let credential='session-a';
 const context={document:{getElementById:id=>({id})},crmAccessProbeState:'idle',crmAccessProbeKey:'',buildCrmAccessProbeUrl:()=>credential,userCanOpenCrm:()=>true,setCrmButtonAllowed:(_,allowed)=>changes.push(allowed),syncHeaderAdminShortcuts(){},fetch:()=>new Promise(()=>{})};
 vm.createContext(context);vm.runInContext(code,context);
 context.syncCrmButtonAccess();assert.ok(changes.every(Boolean));assert.equal(context.crmAccessProbeState,'pending');
 changes.length=0;context.syncCrmButtonAccess();assert.ok(changes.every(Boolean));
 changes.length=0;context.crmAccessProbeState='denied';context.syncCrmButtonAccess();assert.ok(changes.every(v=>!v));
 changes.length=0;credential='';context.crmAccessProbeState='idle';context.syncCrmButtonAccess();assert.ok(changes.every(v=>!v));
});

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

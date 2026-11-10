'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {preference}=require('../lib/villa-start-room');
test('start room belongs to authenticated account, survives reopening and does not alter hall equipment',async()=>{
 const store=new Map();
 const redis=async commands=>commands.map(([op,key,value])=>{assert.match(key,/^poker_app:villa_start_room:/);if(op==='GET')return store.get(key)||null;assert.equal(op,'SET');store.set(key,value);return 'OK';});
 const context={accountId:'ID100001',villaAccess:true,billiardsAccess:true,body:{}};
 assert.equal((await preference(context,redis)).room,'hall');
 await preference({...context,body:{room:'living',targetId:'ID100002'}},redis);
 assert.equal((await preference(context,redis)).room,'living');
 assert.equal((await preference({...context,accountId:'ID100002'},redis)).room,'hall');
 await preference({...context,body:{room:'hall'}},redis);
 assert.equal((await preference(context,redis)).room,'hall');
});
test('invalid or inaccessible destination cannot be saved; revoked access falls back without deleting preference',async()=>{
 const context={accountId:'ID100001',villaAccess:true,billiardsAccess:false};
 const noWrite=async commands=>{assert.equal(commands[0][0],'GET');return ['billiards'];};
 await assert.rejects(preference({...context,body:{room:'city'}},noWrite),{status:400});
 await assert.rejects(preference({...context,body:{room:'billiards'}},noWrite),{status:403});
 assert.equal((await preference({...context,body:{}},noWrite)).room,'hall');
 assert.equal((await preference({...context,billiardsAccess:true,body:{}},noWrite)).room,'billiards');
});

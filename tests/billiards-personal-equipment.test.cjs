const test=require('node:test'),assert=require('node:assert/strict'),equipment=require('../lib/billiards-personal-equipment');
test('personal table follows the account across devices; migration never overwrites a newer choice',async()=>{
 const values=new Map(),commands=async rows=>rows.map(([op,key,field,value])=>{if(op==='HGET')return values.get(key)||null;if(op==='HSETNX'){if(!values.has(key))values.set(key,value);return 1;}if(op==='HSET'){values.set(key,value);return 1;}throw Error(op);});
 const request=(body,member='desktop')=>equipment({member,identity:{},body,commands,profile:async()=>({level:80}),resolve:async()=> 'same-account'});
 assert.equal((await request({migrate:true})).equipment,null);
 assert.equal((await request({migrate:true,equipment:{table:'oak'}})).equipment.table,'oak');
 assert.equal((await request({},'telegram')).equipment.table,'oak');
 await request({equipment:{table:'royal'}},'telegram');
 assert.equal((await request({migrate:true,equipment:{table:'oak'}})).equipment.table,'royal');
 assert.equal((await request({},'desktop')).equipment.table,'royal');
 await assert.rejects(equipment({member:'a',body:{equipment:{table:'royal'}},commands,profile:async()=>({level:1}),resolve:async()=> 'other-account'}),e=>e.status===400);
 assert.equal(values.size,1);
});

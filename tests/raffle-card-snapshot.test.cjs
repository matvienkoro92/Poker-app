'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const {read}=require('../lib/raffle-card-snapshot');
test('reads the list, deduplicates raffle IDs and returns only compact archive rows',async()=>{
 const calls=[];const rows=await read(async commands=>{calls.push(commands[0]);if(commands[0][0]==='LRANGE')return [['a','a','b']];return [JSON.stringify([{id:'a',groups:{},winners:{}},{id:'b',groups:[{prize:'100 ₽'}],winners:[{userId:'tg_1'}]}])];});
 assert.equal(calls[0][0],'LRANGE');assert.equal(calls[1][0],'EVAL');assert.equal(calls[1][2],2);assert.equal(rows.length,2);assert.deepEqual(rows[0].winners,[]);
});
test('archive read errors do not turn into a false zero',async()=>{
 await assert.rejects(read(async()=>[null]),/unavailable/);
 await assert.rejects(read(async commands=>commands[0][0]==='LRANGE'?[['a']]:[null]),/unavailable/);
});

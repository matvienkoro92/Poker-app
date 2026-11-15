const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function fixture({receipt,submitted,due=Date.now()-1,count=1}={}){
 const mod={exports:{}},sent=[];
 vm.runInNewContext(fs.readFileSync(require.resolve('../lib/telegram-group-policy'),'utf8'),{module:mod,require:()=>({pipeline:async cmds=>cmds.map(c=>({result:c[0]==='ZSCORE'?due:c[0]==='EVAL'?count:c[1].includes('delete-permit')?receipt:submitted}))}),globalThis:{fetch:async(url,opts)=>{sent.push(JSON.parse(opts.body));return {ok:true};}}});
 return {sent,send:(chat=-123,id=7)=>mod.exports.guardedFetch('https://api.telegram.org/bottest/deleteMessage',{body:JSON.stringify({chat_id:chat,message_id:id})},'exchange-command')};
}
const board=()=>({type:'board',chat:'-123',messageId:7,createdAt:Date.now()});
test('queue entry alone never permits deleting a message',async()=>{
 for(const receipt of [undefined,'1','broken',JSON.stringify({...board(),chat:'-999'}),JSON.stringify({...board(),messageId:8}),JSON.stringify({...board(),createdAt:0})]){
  const f=fixture({receipt});assert.equal((await f.send()).ok,false);assert.equal(f.sent.length,0);
 }
});
test('only a registered bot board or a confirmed amount can be deleted',async()=>{
 const b=fixture({receipt:JSON.stringify(board())});assert.equal((await b.send()).ok,true);
 const amount={type:'amount',chat:'-123',messageId:7,createdAt:Date.now(),userId:42,amount:300};
 const a=fixture({submitted:JSON.stringify(amount)});assert.equal((await a.send()).ok,true);
 for(const patch of [{amount:1001},{userId:0},{type:'other'},{chat:'-999'}]){
  const f=fixture({submitted:JSON.stringify({...amount,...patch})});assert.equal((await f.send()).ok,false);
 }
});
test('future timers and missing queue entries fail closed',async()=>{
 for(const due of [null,Date.now()+60000]){const f=fixture({receipt:JSON.stringify(board()),due});assert.equal((await f.send()).ok,false);assert.equal(f.sent.length,0);}
});
test('deletion stops above twenty attempts per minute',async()=>{
 const f=fixture({receipt:JSON.stringify(board()),count:21});assert.equal((await f.send()).status,429);assert.equal(f.sent.length,0);
});

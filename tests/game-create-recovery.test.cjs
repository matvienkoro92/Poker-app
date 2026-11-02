const test=require('node:test'),assert=require('node:assert/strict');
test('pending and lost recovery responses never repeat create or cancel',async()=>{
 const {recoverGameCreate}=await import('../scripts/shared/game-create-recovery.mjs');let calls=0;
 const view=await recoverGameCreate(async body=>{assert.deepEqual(body,{action:'recover-create',requestId:'original'});calls++;if(calls===1)throw new TypeError('offline');return calls<4?{pending:true}:{roomId:'ABCDEFGHJK'};},'original',{wait:async()=>{}});
 assert.equal(view.roomId,'ABCDEFGHJK');assert.equal(calls,4);
});
test('unconfirmed creation stays recoverable after bounded waiting',async()=>{
 const {recoverGameCreate}=await import('../scripts/shared/game-create-recovery.mjs');let calls=0;
 await assert.rejects(recoverGameCreate(async()=>{calls++;return {pending:true};},'original',{wait:async()=>{}}),/Восстановите/);assert.equal(calls,5);
});
test('leaving stops recovery before accessing the server',async()=>{
 const {recoverGameCreate}=await import('../scripts/shared/game-create-recovery.mjs');await assert.rejects(recoverGameCreate(()=>assert.fail(), 'original',{active:()=>false}),{name:'AbortError'});
});
test('billiards restores a lost paid creation and retains room when Telegram fails',async()=>{
 const {createSession}=await import('../scripts/billiards/network.mjs');const calls=[],updates=[],errors=[];
 const session=createSession({request:async body=>{calls.push(body.action);if(body.action==='create')throw new TypeError('lost response');if(body.action==='recover-create')return {roomId:'ABCDEFGHJK',revision:1};if(body.action==='challenge')throw Error('Telegram offline');},onUpdate:view=>updates.push(view),onError:(...args)=>errors.push(args)});
 try{await session.start(true,'',{requestId:'original',challenge:true});assert.deepEqual(calls,['create','recover-create','challenge']);assert.equal(updates[0].roomId,'ABCDEFGHJK');assert.equal(errors[0][0],'Telegram offline');assert.notEqual(errors[0][1],true);}finally{session.close();}
});

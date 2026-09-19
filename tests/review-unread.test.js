const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
async function unread(replies,seen){
 const t={id:'a'.repeat(24),type:'hand',authorId:'me',version:replies.length,replies,followers:{},votes:{}};
 const module={exports:{}};
 vm.runInNewContext(fs.readFileSync(require.resolve('../lib/club-reviews'),'utf8'),{module,require:name=>{
  if(name==='crypto')return require('crypto');
  if(name.includes('hand-share'))return require('../starting-hands/hand-share');
  if(name==='./club-social')return {clean:s=>s||'',redis:async cmds=>cmds.map(c=>c[0]==='ZREVRANGE'?[t.id]:c[0]==='GET'?JSON.stringify(t):seen)};
  throw Error(name);
 }});
 return (await module.exports.list({accountId:'me'},true)).threads[0].unread;
}
test('read replies, own replies and deleted replies do not inflate badge',async()=>{
 assert.equal(await unread([{authorId:'other'}],1),false);
 assert.equal(await unread([{authorId:'me'}],0),false);
 assert.equal(await unread([{authorId:'other',deleted:true}],0),false);
 assert.equal(await unread([{authorId:'other'},{authorId:'me'}],1),false);
});
test('new external reply remains unread, including after a deleted reply',async()=>{
 assert.equal(await unread([{authorId:'other'}],0),true);
 assert.equal(await unread([{authorId:'other',deleted:true},{authorId:'other'}],1),true);
});

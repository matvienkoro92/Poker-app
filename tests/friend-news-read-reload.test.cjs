const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const source=fs.readFileSync('app-home-friend-news.js','utf8');
function boot(storage,account,serverRead=[]){
 const c={localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},friendNewsAccountId:'',friendReadIds:{},friendReadPending:{},friendReadTimer:0,friendAuthGeneration:0,envelopePromise:null,envelopeAt:0,envelopeValue:null,hasNewsAuth:()=>true,friendNewsRequest:async()=>({ok:true,accountId:account,trackingSince:'2026-09-10',readIds:serverRead}),updateFriendNewsBadges(){},flushFriendNewsRead(){},setTimeout(){c.retries++;return 1},clearTimeout(){},retries:0};
 vm.createContext(c);vm.runInContext(source.slice(source.indexOf('  var FRIEND_READ_CACHE_PREFIX'),source.indexOf('  function isUnreadFriendEvent')),c);return c;
}
test('unacknowledged read survives reload and is retried; new events stay unread',async()=>{
 const storage=new Map();let c=boot(storage,'A');await c.loadFriendNewsEnvelope();c.friendReadPending.old=true;c.saveFriendReadCache();
 c=boot(storage,'A');await c.loadFriendNewsEnvelope();assert.equal(c.friendReadPending.old,true);assert.equal(c.retries,1);assert.equal(c.friendReadIds.new,undefined);assert.equal(c.friendReadPending.new,undefined);
 c=boot(storage,'A',['old']);await c.loadFriendNewsEnvelope();assert.equal(c.friendReadIds.old,true);assert.equal(c.friendReadPending.old,undefined);assert.equal(c.retries,0);
 c=boot(storage,'A');await c.loadFriendNewsEnvelope();assert.equal(c.friendReadIds.old,true);
 c=boot(storage,'B');await c.loadFriendNewsEnvelope();assert.equal(c.friendReadIds.old,undefined);assert.equal(c.friendReadPending.old,undefined);
});

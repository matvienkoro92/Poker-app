'use strict';
// Only an authenticated, successful room cancellation may release its sender cooldown.
// Keep the room invitation lock so cancellation never permits duplicate delivery.
const RELEASE="local value=redis.call('GET',KEYS[1]); if value==ARGV[1] or value=='1' then return redis.call('DEL',KEYS[1]) end; return 0";
async function release({family,member,roomId,commands}){
 if(!/^[A-HJ-NP-Z2-9]{10}$/.test(String(roomId||'')))return;
 const key=family==='billiards'?'poker_app:billiards:challenge:member:':'poker_app:board-games:challenge:rate:';
 await commands([['EVAL',RELEASE,1,key+member,roomId]]);
}
const BOARD_RESERVE="local prior=redis.call('GET',KEYS[2]); if redis.call('EXISTS',KEYS[1])==1 or (prior and prior~='1') then return 0 end; redis.call('SET',KEYS[1],ARGV[1],'EX',7200); redis.call('SET',KEYS[2],ARGV[2],'EX',300); return 1";
module.exports={release,RELEASE,BOARD_RESERVE};

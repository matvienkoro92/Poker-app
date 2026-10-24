'use strict';
const BUDGET=60000,STALE=5000;
const key=r=>JSON.stringify([r.match?.number,r.match?.round,r.state.turn,r.state.ply,r.state.phase,r.state.shot,r.state.pending?.type]);
function start(r,time){const seconds=r.timeControl?r.clockRemaining?.[r.state.turn]/1000:require('./nards-turn-clock')(r.state,r.turnSeconds);return Math.min(time,r.turnDeadline-(Number(seconds)||0)*1000);}
function sync(r,time){if(!r.connectionProtection)return;const c=r.connectionProtection;if(c.match!==r.match?.number){c.match=r.match?.number;c.used=[0,0];c.pause=null;}if(c.turnKey!==key(r)){c.turnKey=key(r);c.started=start(r,time);c.pause=null;}}
function update(r,player,time,seen){
 if(!r.players[1]||!r.turnDeadline||r.state.winner!==null)return false;
 const before=JSON.stringify(r.connectionProtection);
 r.connectionProtection ||= {match:r.match?.number,used:[0,0],turnKey:key(r),started:start(r,time),pause:null};sync(r,time);
 const c=r.connectionProtection,p=r.state.turn,last=Number(seen[p])||c.started,left=Math.max(0,BUDGET-c.used[p]);
 let since=Math.max(last+STALE,c.started);
 // A missed heartbeat near flag fall also gets a chance to recover.
 if(time>=r.turnDeadline&&time-last>=2000)since=Math.min(since,r.turnDeadline);
 if(!c.pause&&left>0&&time>=since&&since<=r.turnDeadline)c.pause={player:p,start:since,deadline:r.turnDeadline,budget:left};
 if(c.pause){const pause=c.pause,spent=Math.min(pause.budget,Math.max(0,time-pause.start));if(player===p||spent>=pause.budget){r.turnDeadline=pause.deadline+spent;c.used[p]+=spent;c.pause=null;}}
 return before!==JSON.stringify(r.connectionProtection);
}
function deadline(r,time){if(r.state.winner!==null)return r.turnDeadline;const p=r.connectionProtection?.pause;return p?p.deadline+Math.min(p.budget,Math.max(0,time-p.start)):r.turnDeadline;}
function status(r,time){const p=r.connectionProtection?.pause;return p&&r.state.winner===null?{paused:true,player:p.player,remainingSeconds:Math.max(0,Math.ceil((p.budget-(time-p.start))/1000))}:null;}
function presence(commands,family){return async(id,player,time)=>{const [seen]=await commands([['EVAL',"local a=redis.call('HGET',KEYS[1],'0');local b=redis.call('HGET',KEYS[1],'1');if not a then a=ARGV[2];redis.call('HSET',KEYS[1],'0',a) end;if not b then b=ARGV[2];redis.call('HSET',KEYS[1],'1',b) end;redis.call('HSET',KEYS[1],ARGV[1],ARGV[2]);redis.call('EXPIRE',KEYS[1],86400);return {a,b}",1,'poker_app:game-presence:'+family+':'+id,String(player),time]]);return seen.map(Number);};}
module.exports={update,sync,deadline,status,presence,BUDGET};

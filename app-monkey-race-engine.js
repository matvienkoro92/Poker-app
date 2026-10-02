/* Deterministic race shared by client and verified server replay. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.MonkeyRaceEngine=factory();})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';const MAX_TICKS=36000;
function random(s){s.random=(Math.imul(s.random,1664525)+1013904223)>>>0;return s.random/4294967296;}
function create(seed,version){return {version:version===2?2:1,seed:seed>>>0,random:seed>>>0,tick:0,lane:1,y:345,x:94,jump:0,jumpVelocity:0,lastInput:-7,score:0,perfect:0,passes:0,distance:0,stage:1,alive:true,obstacles:[],nextId:0,spawnDistance:0,finished:false,boosts:0,boostUntil:0};}
function step(s,action){if(!s.alive)return s;
 if(action&&s.tick-s.lastInput>=7){if(action===1)s.lane=Math.max(0,s.lane-1);if(action===2)s.lane=Math.min(2,s.lane+1);if(action===3&&s.jump===0)s.jumpVelocity=9;if(action===4&&Math.floor(s.perfect/3)>s.boosts){s.boosts++;s.boostUntil=s.tick+90;}s.lastInput=s.tick;}
 s.y+=(240+s.lane*105-s.y)*.25;
 if(s.jumpVelocity||s.jump){s.jump+=s.jumpVelocity;s.jumpVelocity-=.55;if(s.jump<=0){s.jump=0;s.jumpVelocity=0;}}
 s.stage=1+Math.floor(s.passes/6);const speed=Math.min(6.2,3.2+(s.stage-1)*.22)*(s.tick<s.boostUntil?1.25:1);s.distance+=speed;s.spawnDistance+=speed;
 if(!s.nextId||s.spawnDistance>=290){const lane=Math.floor(random(s)*3),kind=random(s)<.45?'chips':'table';s.obstacles.push({id:s.nextId++,x:480,lane,kind,scored:false,collected:false});s.spawnDistance=0;}
 for(const o of s.obstacles){o.x-=speed;const same=Math.abs(s.y-(240+o.lane*105))<44;
 if(o.kind==='coin'){if(!o.collected&&same&&Math.abs(o.x-s.x)<26){o.collected=true;s.perfect++;}}
 else {if(same&&Math.abs(o.x-s.x)<40&&(o.kind==='table'||s.jump<40))s.alive=false;if(!o.scored&&o.x<s.x-45){o.scored=true;s.passes++;}}
 }
 // Collectibles on a different lane from each obstacle, leaving a safe route.
 if(s.spawnDistance===0){const last=s.obstacles[s.obstacles.length-1];s.obstacles.push({id:s.nextId++,x:480,lane:(last.lane+1+Math.floor(random(s)*2))%3,kind:'coin',collected:false});}
 s.obstacles=s.obstacles.filter(o=>o.x>-90);s.tick++;s.score=Math.floor(s.distance/10)+s.perfect*5;
 if(s.tick>=MAX_TICKS||s.version===2&&s.tick>=3600){s.finished=true;s.alive=false;}return s;}
function replay(seed,taps,ticks,version){if(!Number.isInteger(seed)||seed<0||seed>4294967295||!Number.isInteger(ticks)||ticks<1||ticks>MAX_TICKS||!Array.isArray(taps)||taps.length>Math.ceil(MAX_TICKS/7))throw Error('Invalid replay');let previous=-7;for(const n of taps){const tick=Math.floor(n/5),action=n%5;if(!Number.isInteger(n)||n<0||tick>=ticks||action<1||action>4||tick-previous<7)throw Error('Invalid input');previous=tick;}const s=create(seed,version);let at=0;while(s.alive&&s.tick<ticks){let action=0;if(at<taps.length&&Math.floor(taps[at]/5)===s.tick)action=taps[at++]%5;step(s,action);}if(s.alive||s.tick!==ticks||at!==taps.length)throw Error('Unfinished replay');return s;}
return {VERSION:1,MAX_TICKS,FLOOR:540,create,step,replay};
});

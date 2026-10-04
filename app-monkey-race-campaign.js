/* Story-only boss encounter; records and duels keep the original race rules. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./app-monkey-race-engine'));else root.MonkeyRaceCampaign=factory(root.MonkeyRaceEngine);})(typeof globalThis!=='undefined'?globalThis:this,function(E){
function create(){const supporters=[0,1,2,3,4];for(let i=supporters.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[supporters[i],supporters[j]]=[supporters[j],supporters[i]];}return {phase:'route',introTick:0,dialogueIndex:0,gateClosed:false,impactX:52,tick:0,hp:6,maxHp:6,warning:false,lane:1,won:false,goal:90,attack:'ram',cycle:0,impact:180,crashed:false,defeated:false,projectiles:[],troopers:[],inv:0,heartGate:70+Math.floor(Math.random()*21),spawned:0,lifeAwards:0,supporters:supporters.slice(0,3),supporterLines:Array.from({length:3},()=>Math.floor(Math.random()*3)),supporterIndex:0,supporter:null};}
const dialogue=[
 'Попалася, рыбешка!',
 'Давно хотели прихлопнуть тебя, ПокерМанки. Слишком весело живётся вашим горожанам Poker21!',
 'Розыгрыши, турниры, призы… Сегодня человек бедный, завтра уже богатый. А как нам тогда контролировать социальное расслоение?',
 'По нашему порядку каждый должен знать своё место. А ты всё перемешал своими фишками!',
 'Шлагбаум закрыт. Теперь мой таран наведёт порядок!',
 'Манки: «Тогда попробуй догони. Только шлагбаум за моей спиной не резиновый!»'
];
function enterBoss(c,s){c.phase='closing';c.introTick=0;c.dialogueIndex=0;c.gateClosed=false;c.tick=0;c.cycle=0;c.supporter=null;s.obstacles=[];s.spawnDistance=-1000000;s.boostUntil=0;}
function nextDialogue(c){if(c.phase!=='dialogue')return;if(c.dialogueIndex<dialogue.length-1)c.dialogueIndex++;else{c.phase='boss';c.tick=0;}}
function step(c,s,action){if(c.won||!s.alive)return;if(c.phase==='closing'){c.introTick++;if(c.introTick>=90){c.gateClosed=true;c.phase='dialogue';}return;}if(c.phase==='dialogue')return;if(c.phase==='route'){const extra=.6*Math.max(0,Math.min(1,(s.passes-30)/60));s.distance+=extra;s.spawnDistance+=extra;for(const o of s.obstacles)o.x-=extra;}const nextId=s.nextId;if(action===5||action===6)s.lastInput=Math.min(s.lastInput,s.tick-7);const distance=s.distance,score=s.score;if(c.phase==='boss'){s.obstacles=[];s.spawnDistance=-1000000;}E.step(s,action);if(c.phase==='boss'){s.distance=distance;s.score=score;s.spawnDistance=-1000000;}if(c.phase==='route'&&s.nextId>nextId){c.spawned++;if(c.spawned===c.heartGate){const coin=s.obstacles.find(o=>o.id>=nextId&&o.kind==='coin');if(coin)coin.bonusLife=true;}}for(const o of s.obstacles){if(o.bonusLife&&o.collected&&!o.lifeAwarded){o.lifeAwarded=true;s.perfect--;s.score=Math.floor(s.distance/10)+s.perfect*5;c.lifeAwards++;}}if(c.inv>0){c.inv--;s.alive=true;}if(!s.alive)return;if(c.phase==='route'&&c.supporterIndex<3&&s.passes>=[18,48,78][c.supporterIndex]){c.supporter={hero:c.supporters[c.supporterIndex++],start:s.tick,distance:s.distance,line:Math.floor(Math.random()*3)};}if(c.supporter&&s.tick-c.supporter.start>360)c.supporter=null;if(c.phase==='route'&&s.passes>=c.goal){enterBoss(c,s);}else if(c.phase==='boss')stepBoss(c,s);}
function stepBoss(c,s){c.tick++;s.obstacles=[];s.spawnDistance=-1000000;if(c.defeated){if(c.tick>=c.impact+70){c.won=true;s.alive=false;}return;}
if(c.tick===1){c.attack=['ram','shots','jump','ram','cops','duck'][c.cycle%6];c.impact=180-Math.min(30,(c.maxHp-c.hp)*5);c.warning=false;c.crashed=false;c.projectiles=[];c.troopers=[];}
if(c.tick===60){c.lane=s.lane;c.warning=true;}
if(c.attack==='shots'&&[65,110].includes(c.tick)){c.projectiles.push({x:440,lane:s.lane,age:0,hit:false});}
if(c.attack==='cops'&&c.tick===65){c.troopers=[{x:440,lane:c.lane,age:0,hit:false},{x:485,lane:(c.lane+1)%3,age:0,hit:false}];}
for(const shot of c.projectiles){shot.age++;if(shot.age>30)shot.x-=7;if(!shot.hit&&shot.x<110&&shot.x>70){shot.hit=true;if(Math.abs(s.y-(240+shot.lane*105))<37&&!s.duck&&s.jump<40&&!c.inv)s.alive=false;}}
for(const cop of c.troopers){cop.age++;if(cop.age>35)cop.x-=5.8;if(!cop.hit&&cop.x<115&&cop.x>65){cop.hit=true;if(Math.abs(s.y-(240+cop.lane*105))<42&&s.jump<42&&!c.inv)s.alive=false;}}
if(c.tick===c.impact){if(['ram','jump','duck'].includes(c.attack)){const failed=c.attack==='ram'?Math.abs(s.y-(240+c.lane*105))<50:c.attack==='jump'?s.jump<40:!s.duck||s.jump>0;if(failed){if(!c.inv)s.alive=false;}else if(c.attack==='ram'){c.hp--;s.score+=100;c.crashed=true;if(c.hp===0){c.defeated=true;c.projectiles=[];c.troopers=[];}}}c.warning=false;}
if(c.tick>=c.impact+100){c.tick=0;c.cycle++;}}

function revive(c,s){s.alive=true;s.finished=false;s.obstacles=s.obstacles.filter(o=>o.kind==='coin'||Math.abs(o.x-s.x)>65);c.inv=180;c.warning=false;if(c.phase==='boss'){c.tick=0;c.projectiles=[];c.troopers=[];c.crashed=false;}return s;}
return {create,step,revive,enterBoss,nextDialogue,dialogue};});

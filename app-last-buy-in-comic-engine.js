/* Original comic-panel brawler; fixed-step gameplay independent of rendering. */
(function(root,factory){const E=factory();if(typeof module==='object'&&module.exports)module.exports=E;else root.LastBuyInComicEngine=E;})(globalThis,function(){
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
function panel(s){const n=s.panel;s.x=45;s.y=420;s.vy=0;s.ground=true;s.face=1;s.crate={x:170,hp:n===0?2:0};s.switchOff=n!==1;s.enemies=Array.from({length:n===2?1:n+2},(_,i)=>({x:245+i*45,y:420,hp:n===2?9:3+n,max:n===2?9:3+n,boss:n===2,shield:n===1&&i===2,windup:0,cooldown:80+i*35,stun:0,face:-1}));s.paper=2;s.shots=[];s.transition=0;}
function create(chapter=9){const s={chapter,mode:'comic',panel:0,tick:0,health:3,hits:0,score:0,won:false,lost:false,inv:0,attack:0,attackCooldown:0,combo:0,comboTime:0,dodge:0,dodgeCooldown:0,effects:[],previous:{}};panel(s);return s;}
function hit(s){if(s.inv||s.lost||s.won)return;s.health--;s.hits++;s.inv=90;s.effects.push({x:s.x,y:s.y-55,text:'АЙ!',life:40});if(!s.health)s.lost=true;}
function impact(s,e,power){if(!e.hp)return;e.hp=Math.max(0,e.hp-power);e.stun=24;e.windup=0;e.x=clamp(e.x+s.face*20,25,355);s.score+=e.hp?30:150;s.effects.push({x:e.x,y:e.y-75,text:power>1?'БАХ!':'ПАФ!',life:35});}
function step(s,a={}){if(s.won||s.lost)return s;s.tick++;for(const k of ['inv','attack','attackCooldown','comboTime','dodge','dodgeCooldown'])s[k]=Math.max(0,s[k]-1);s.effects=s.effects.filter(e=>--e.life>0);const pressed=k=>a[k]&&!s.previous[k];if(s.transition){if(--s.transition===0){if(s.panel===2)s.won=true;else{s.panel++;panel(s);s.inv=120;}}s.previous={...a};return s;}
let dx=(a.right?1:0)-(a.left?1:0);if(dx)s.face=dx;if(pressed('dodge')&&!s.dodgeCooldown){s.dodge=16;s.dodgeCooldown=70;s.inv=Math.max(s.inv,20);}s.x=clamp(s.x+dx*(s.dodge?5.5:2.5),25,360);
if(pressed('jump')&&s.ground){s.vy=-9.4;s.ground=false;}s.vy+=.45;s.y+=s.vy;if(s.y>=420){s.y=420;s.vy=0;s.ground=true;}
if(s.crate.hp&&Math.abs(s.x-s.crate.x)<30)s.x=s.crate.x+(s.x<s.crate.x?-30:30);
if(a.attack&&!s.attackCooldown){s.combo=s.comboTime?(s.combo%3)+1:1;s.comboTime=75;s.attack=12;s.attackCooldown=23;const power=s.combo===3||!s.ground?2:1;for(const e of s.enemies)if(e.hp&&Math.abs(e.x-s.x)<68&&(e.x-s.x)*s.face>-12){if(e.shield&&s.ground&&s.combo!==3&&(s.x-e.x)*e.face>0){s.effects.push({x:e.x,y:345,text:'ЩИТ!',life:25});}else impact(s,e,power);}if(s.crate.hp&&Math.abs(s.x-s.crate.x)<70){s.crate.hp--;s.effects.push({x:s.crate.x,y:375,text:'ХРУСТЬ!',life:30});if(!s.crate.hp)s.score+=100;}}
if(pressed('special')){if(s.panel===1&&!s.switchOff&&Math.abs(s.x-120)<42){s.switchOff=true;s.score+=100;s.effects.push({x:120,y:335,text:'ТОК ВЫКЛ.',life:60});}else if(s.paper){s.paper--;s.shots.push({x:s.x,y:s.y-48,dx:s.face,life:85,hit:[]});}}
for(const p of s.shots){p.x+=p.dx*5;p.life--;if(p.x<20||p.x>370){p.dx*=-1;}for(const e of s.enemies)if(e.hp&&!p.hit.includes(e)&&Math.abs(e.x-p.x)<24&&Math.abs(e.y-45-p.y)<50){impact(s,e,3);p.hit.push(e);}}s.shots=s.shots.filter(p=>p.life>0);
for(const e of s.enemies){if(!e.hp)continue;e.stun=Math.max(0,e.stun-1);e.cooldown=Math.max(0,e.cooldown-1);e.face=s.x<e.x?-1:1;if(e.stun)continue;if(e.windup){if(--e.windup===0){if(Math.abs(s.x-e.x)<(e.boss?90:48)&&s.y>365)hit(s);e.cooldown=e.boss?65:100;}continue;}if(Math.abs(s.x-e.x)>(e.boss?72:38))e.x=clamp(e.x+e.face*(e.boss?1.15:.7+s.panel*.15),25,355);else if(!e.cooldown)e.windup=e.boss?36:28;}
if(s.panel===1&&!s.switchOff&&s.tick%180>80&&s.tick%180<140&&s.x>190&&s.x<250&&s.y>390)hit(s);
if(s.enemies.every(e=>!e.hp)&&!s.crate.hp&&s.x>335&&s.ground){s.score+=250;s.transition=50;s.inv=100;}
s.previous={...a};return s;}
function revive(s){s.health=3;s.lost=false;s.x=45;s.y=420;s.vy=0;s.ground=true;s.inv=180;s.shots=[];return s;}
return {create,step,revive};});

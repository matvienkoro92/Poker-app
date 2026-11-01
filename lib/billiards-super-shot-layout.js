'use strict';
// Curated long cut shots. Difficulty is a layout grade, not a success probability.
// Every template has a successful reference shot verified against the game engine.
const TEMPLATES=[
 {cue:[120,200],target:[700,140],difficulty:85,reference:{angle:-0.09247643256096581,power:.5}},
 {cue:[150,120],target:[720,190],difficulty:90,reference:{angle:0.1447297146062434,power:.65}}
];
async function layout(index){
 const {createGame}=await import('../scripts/billiards/engine.mjs');
 const n=Math.abs(Math.trunc(index))%8,t=TEMPLATES[n%2],flipX=!!(n&2),flipY=!!(n&4);
 const point=([x,y])=>[flipX?1000-x:x,flipY?500-y:y];
 const state=createGame({discipline:'pyramid',seed:1});
 for(const b of state.balls){b.pocket=b.id>1;b.vx=b.vy=0;}
 const [cx,cy]=point(t.cue),[tx,ty]=point(t.target);
 Object.assign(state.balls.find(b=>b.id===0),{x:cx,y:cy});Object.assign(state.balls.find(b=>b.id===1),{x:tx,y:ty});
 Object.assign(state,{breakPending:false,cueId:0,message:'Решающий бонус удар! Забейте белый шар одним ударом.'});
 return {state,difficulty:t.difficulty};
}
async function simulate(state,angle,power,spin){
 const E=await import('../scripts/billiards/engine.mjs'),s=structuredClone(state);
 if(!Number.isFinite(angle)||Math.abs(angle)>Math.PI||!Number.isFinite(power)||power<.05||power>1||!E.shoot(s,angle,power,{cueId:0,spin}))throw Object.assign(Error('Выберите направление и силу удара.'),{status:400});
 let ticks=0;while(s.moving&&ticks++<7200)E.step(s);
 if(s.moving)throw Error('Не удалось рассчитать бонусный удар.');
 return {state:s,success:!s.pending&&s.captured[0].includes(1)&&!s.balls.find(b=>b.id===0).pocket};
}
module.exports={layout,simulate,TEMPLATES};

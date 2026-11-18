const tanks = require('../../app-last-buy-in-tanks-engine');
const plans = new WeakMap();
const directions = ['up','left','right','down','hold'];

function score(state) {
  if (state.lost) return -1e6;
  const p = state.player;
  const target = Math.min(30,...state.enemies.map(e=>Math.abs(p.x-e.x)+Math.abs(p.y-e.y)));
  return (state.won ? 1e5 : 0) + state.picked*100 + state.score*.005 - target -
    Math.abs(p.y-14)*.2 - Math.abs(p.x-13)*.1;
}

module.exports = function tankPlayer(state) {
  let plan = plans.get(state);
  if (!plan || plan.until <= state.tick) {
    let beam = [{state,first:null}];
    for (let depth=0; depth<4; depth++) {
      const choices=[];
      for (const candidate of beam) for (const direction of directions) {
        const copy=structuredClone(candidate.state);
        const action={attack:true,[direction]:true};
        for(let i=0;i<45 && !copy.lost && !copy.won;i++) tanks.step(copy,action);
        choices.push({state:copy,first:candidate.first||action,value:score(copy)});
      }
      choices.sort((a,b)=>b.value-a.value);
      const seen=new Set();
      beam=choices.filter(c=>{
        const key=[c.state.player.x,c.state.player.y,c.state.player.dir,c.state.picked,c.state.lost].join('/');
        if(seen.has(key)) return false;
        seen.add(key); return true;
      }).slice(0,5);
    }
    plan={action:beam[0].first,until:state.tick+45};
    plans.set(state,plan);
  }
  return plan.action;
};

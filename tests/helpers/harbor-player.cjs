// Plan one move-and-plant sequence at a time on copies of the deterministic game.
// Replay only ordinary button presses against the state under test.
const engine = require('../../app-last-buy-in-campaign-engine');
const plans = new WeakMap();
const steps = [['right',1,0],['left',-1,0],['down',0,1],['up',0,-1]];

function routes(state, maxDistance) {
  const queue = [{x:state.x, y:state.y, moves:[]}];
  const seen = new Set([state.x + ':' + state.y]);
  for (const spot of queue) {
    if (spot.moves.length >= maxDistance) continue;
    for (const [key, dx, dy] of steps) {
      const x = spot.x + dx, y = spot.y + dy, id = x + ':' + y;
      if (seen.has(id) || state.grid[y]?.[x] !== 0) continue;
      seen.add(id);
      queue.push({x,y,moves:[...spot.moves,key]});
    }
  }
  return queue;
}

function simulate(state, moves) {
  const keys = [];
  for (const key of moves) {
    do {
      keys.push(key);
      const x = state.x, y = state.y;
      engine.step(state,{[key]:true});
      if (state.lost || state.won || state.x !== x || state.y !== y) break;
      if (!state.moveCooldown) return null;
    } while (true);
    if (state.lost) return null;
    if (state.won) break;
  }
  return keys;
}

function plan(start) {
  let best = -Infinity, sequence;
  const enemies = s => s.enemies.filter(e => e.hp);
  const crates = s => s.grid.flat().filter(v => v === 2).length;
  const initialEnemies = enemies(start).length, initialCrates = crates(start);
  for (const spot of routes(start, 24)) {
    const planted = structuredClone(start);
    const approach = simulate(planted,spot.moves);
    if (!approach) continue;
    if (planted.won || planted.bombRound !== start.bombRound) return approach;
    engine.step(planted,{attack:true});
    if (!planted.bombs.length || planted.lost) continue;
    for (const shelter of routes(planted,5)) {
      const state = structuredClone(planted);
      const escape = simulate(state,shelter.moves);
      if (!escape) continue;
      const keys = [...approach,'attack',...escape];
      for (let i=0;i<220 && !state.lost && (state.bombs.length || state.flames.length);i++) {
        const key = state.bombRemote && i===0 ? 'special' : 'wait';
        engine.step(state,{[key]:true});
        keys.push(key);
      }
      if (state.lost || state.bombs.length) continue;
      const remaining = enemies(state);
      const progress = (initialEnemies-remaining.length)*1000 + (initialCrates-crates(state))*20 +
        (Number(state.exit.revealed)-Number(start.exit.revealed))*70;
      const distance = remaining.length ? Math.min(...remaining.map(e=>Math.abs(e.x-state.x)+Math.abs(e.y-state.y))) :
        Math.abs(state.exit.x-state.x)+Math.abs(state.exit.y-state.y);
      const score = progress - distance - keys.length*.01;
      if (score>best) { best=score; sequence=keys; }
      if (progress>=1000) return keys;
    }
  }
  return sequence || ['wait'];
}

module.exports = function harborPlayer(state) {
  let queue = plans.get(state);
  if (!queue?.length) { queue=plan(state); plans.set(state,queue); }
  return {[queue.shift()]:true};
};

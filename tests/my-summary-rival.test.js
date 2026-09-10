const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
function render(heroes, nick) {
  const nodes = {};
  const context = {window: {addEventListener(){}, POKER_CLUB_NEWS_DATA:{dayHeroes:heroes}},
    document:{addEventListener(){},getElementById(id){return nodes[id] ||= {}; }},
    winterRatingSamePlayer:(a,b)=>a===b, Intl, Date:class extends Date {constructor(...args){super(...(args.length?args:['2026-09-10T12:00:00Z']));}},setInterval(){}};
  context.window.winterRatingSamePlayer=context.winterRatingSamePlayer;
  let source=fs.readFileSync(require.resolve('../app-my-summary.js'),'utf8');
  source=source.replace('  window.initMySummary = init;', '  window.testStats = function (nick) { nickname=nick; renderStats({rows:[]}); };');
  vm.createContext(context);vm.runInContext(source,context);context.window.testStats(nick);
  return nodes['summary-rival'].innerHTML;
}
const heroes={'01.09.2026':{nick:'Leader',reward:500},'02.09.2026':{nick:'Leader',reward:600},'03.09.2026':{nick:'Second',reward:400},'04.09.2026':{nick:'Third',reward:300},'31.08.2026':{nick:'Old',reward:900000}};
test('nearest rival follows month standings and prize tie breaker',()=>{
  assert.match(render(heroes,'Third'),/Second/);
  assert.doesNotMatch(render(heroes,'Third'),/Leader|Old/);
  assert.match(render(heroes,'Third'),/Званий поровну/);
  assert.match(render(heroes,'Leader'),/Second/);
  assert.match(render(heroes,'Leader'),/Ближайший преследователь/);
  assert.match(render(heroes,'New'),/Third/);
});
test('empty and single-player races do not invent an opponent',()=>{
  assert.match(render({},'New'),/Гонка ещё не началась/);
  assert.match(render({'01.09.2026':{nick:'Solo',reward:1}},'Solo'),/Вы лидируете/);
});

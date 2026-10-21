/* Browser adaptation of the extracted Burbenog 2.43 rules; no JASS execution. */
(function (root, factory) {
  const api = factory(typeof module === 'object' && module.exports ? require('./app-last-buy-in-td-data.js') : root.BurbenogData);
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.LastBuyInTD = api;
})(globalThis, function (D) {
  'use strict';
  const SCALE = 500 / 10752;
  const clean = text => String(text || '').replace(/\|c[0-9a-f]{8}|\|r/gi, '').replace(/\|n/g, '\n');
  const list = text => String(text || '').split(',').filter(Boolean);
  const val = (a, k, fallback = 0) => Number(Array.isArray(a?.[k]) ? a[k][0] : a?.[k]) || fallback;
  const colors = ['#f4c467', '#ee7852', '#83dfee', '#bc9af1', '#b5de82', '#f2dc9b', '#d4d9ed', '#a488bc', '#94cb65', '#b2a080', '#eac654', '#be83cf', '#87bbd4', '#e7b26d', '#97dcda'];
  const builderIds = ['hpea', 'ncpn', 'ohun', 'nchg', 'ewsp', 'nemi', 'edot', 'uaco', 'opeo', 'ogru', 'n00A', 'n00B', 'h00G', 'h00L', 'h00R'];
  const builders = builderIds.map((id, i) => ({ id, name: clean(D.units[id].name).replace(' Builder', ''), color: colors[i], units: list(D.units[id].builds) }));
  const governors = D.governors.map(id => ({ id, name: clean(D.units[id].name), builders: list(D.units[id].trains), detail: clean(D.units[id].ubertip) }));
  const abilities = u => list(u.abillist).map(id => ({ ...D.abilities[id], id })).filter(a => a.name);
  const catalog = Object.create(null);
  for (const builder of builders) for (const id of builder.units) {
    const u = D.units[id];
    if (!u) continue;
    catalog[id] = { id, name: clean(u.name), cost: u.goldcost || 0, timber: u.lumbercost || 0, buildTime: u.bldtm || 0,
      builder: builder.id, color: builder.color, requires: list(u.requires), trains: list(u.trains), description: 'Тип атаки: '+(u.atktype1||'способности')+'. Цели: '+((u.targs1||'').includes('air')?'земля и воздух':'земля')+'. Способности: '+(abilities(u).map(a=>clean(a.name)).join(', ')||'нет')+'. Требования: '+(list(u.requires).map(id=>clean(D.units[id]?.name||id)).join(', ')||'нет')+'.',
      range: Math.max(u.rangen1 || 0, u.rangen2 || 0) * SCALE, abilities: abilities(u), raw: u };
  }
  // Ordered route regions and buildable cells come from the original JASS/pathing map.
  const paths = D.routes, airPaths=D.airRoutes;
  const slots = D.positions.filter(p=>Math.hypot(p[0]-250,p[1]-250)>32);
  const sectors = slots.map(([x,y])=>(x>=250?1:0)+(y>=250?2:0));
  const matrix = { normal: { small: 1, medium: 1.5, large: 1, fort: .7, hero: 1, divine: .05, none: 1 }, pierce: { small: 2, medium: .75, large: 1, fort: .35, hero: .5, divine: .05, none: 1.5 }, siege: { small: 1, medium: .5, large: 1, fort: 1.5, hero: .5, divine: .05, none: 1.5 }, magic: { small: 1.25, medium: .75, large: 2, fort: .35, hero: .5, divine: .05, none: 1 }, chaos: { small: 1, medium: 1, large: 1, fort: 1, hero: 1, divine: 1, none: 1 }, hero: { small: 1, medium: 1, large: 1, fort: .5, hero: 1, divine: .05, none: 1 }, spells: { small: 1, medium: 1, large: 1, fort: 1, hero: .7, divine: .05, none: 1 } };
  function create(options = {}) {
    const picks = options.governors || ['hC24', 'hC26', 'hC27', 'hC39'];
    const difficulty = options.difficulty || 'easy';
    return { players: picks.map(id => { const g = governors.find(g => g.id === id) || governors[0]; return { governor: g.id, builders: [g.builders[0]], gold: 30, timber: 0, hero: null,research:{},researching:{} }; }), difficulty,
      lives: difficulty === 'easy' ? 50 : difficulty === 'normal' ? 25 : 1, maxLives: difficulty === 'easy' ? 50 : difficulty === 'normal' ? 25 : 1,
      wave: 0, totalWaves: difficulty === 'easy' ? 40 : 42, active: false, won: false, over: false, enemies: [], towers: [], shots: [], kills: 0, lost: 0, nextId: 1, seed: 243,
      prep:30,autostart:options.autostart!==false,shared: options.shared !== false, blitz: !!options.blitz, pending: 0, spawn: 0, timer: 0, time: 0, roundBonus: 10, damageTest: 0, message: 'Выбери башню и построй её на площадке. Все четыре сектора под твоим управлением.' };
  }
  function random(s) { s.seed = (Math.imul(s.seed, 1664525) + 1013904223) >>> 0; return s.seed / 4294967296; }
  function has(s, owner, id) { return s.players[owner].governor === id || (s.players[owner].research[id]||0)>0 || s.towers.some(t => t.owner === owner && t.type === id && t.ready <= 0); }
  function canBuild(s, owner, type) {
    const p = s.players[owner], t = catalog[type];
    if (!p || !t) return 'Нет такого строения';
    if (!p.builders.includes(t.builder)) return 'Нужен строитель ' + (builders.find(b => b.id === t.builder)?.name || '');
    const missing = t.requires.filter(id => !has(s, owner, id));
    if (missing.length) return 'Нужно: ' + missing.map(id => clean(D.units[id]?.name || D.upgrades[id]?.name?.[0] || id)).join(', ');
    if (p.gold < t.cost) return 'Недостаточно золота';
    if (p.timber < t.timber) return 'Недостаточно дерева';
    return '';
  }
  function commission(s, owner, builder) {
    const p = s.players[owner], g = governors.find(g => g.id === p?.governor);
    if (s.over || s.won || !g?.builders.includes(builder) || p.builders.includes(builder) || p.timber < 1) return false;
    p.timber--; p.builders.push(builder); return true;
  }
  function build(s, slot, type, owner = sectors[slot]) {
    if (s.over || s.won || !slots[slot] || sectors[slot] !== owner || s.towers.some(t => t.slot === slot) || canBuild(s, owner, type)) return false;
    const a = catalog[type], p = s.players[owner]; p.gold -= a.cost; p.timber -= a.timber;
    s.towers.push({ id: s.nextId++, slot, type, owner, cool: 0, spells: {}, ready: a.buildTime, hp: a.raw.hp, max: a.raw.hp, paid: a.cost }); return true;
  }
  function sell(s, slot) {
    const i = s.towers.findIndex(t => t.slot === slot); if (s.over || s.won || i < 0) return false;
    const t = s.towers[i]; s.players[t.owner].gold += t.ready > 0 ? t.paid : Math.floor(t.paid / 2);
    if (t.ready > 0) s.players[t.owner].timber += catalog[t.type].timber;
    s.towers.splice(i, 1); return true;
  }
  function transfer(s, slot, owner) {
    const t = s.towers.find(t => t.slot === slot); if (s.over || s.won || !t || !s.players[owner] || t.ready > 0 || catalog[t.type].trains.length) return false;
    t.owner = owner; return true;
  }
  function give(s, from, to, gold) {
    if (s.over || s.won || !s.players[from] || !s.players[to] || !Number.isInteger(gold) || gold <= 0 || s.players[from].gold < gold || from === to) return false;
    s.players[from].gold -= gold; s.players[to].gold += gold; return true;
  }
  function trainHero(s, owner, id) {
    const p = s.players[owner], u = D.units[id];
    const tech = s.towers.some(t => t.owner === owner && t.ready <= 0 && catalog[t.type].trains.includes(id));
    if (s.over || s.won || !p || !u || p.hero || !tech || p.gold < u.goldcost || p.timber < u.lumbercost) return false;
    p.gold -= u.goldcost; p.timber -= u.lumbercost;
    p.hero = { type: id, x: 250, y: 250, target: [250, 250], level: 1, xp: 0, cool: 0, cast: 0, mana: (u.manan||0)+(u.int||0)*15 || 100, maxMana: (u.manan||0)+(u.int||0)*15 || 100, abilities: list(u.heroabillist).filter(id => D.abilities[id]), raw: u }; return true;
  }
  function moveHero(s, owner, x, y) { const h = s.players[owner]?.hero; if (!h || !Number.isFinite(x) || !Number.isFinite(y)) return false; h.target = [Math.max(10, Math.min(490, x)), Math.max(10, Math.min(490, y))]; return true; }
  function start(s) {
    if (s.active || s.won || s.over || s.wave >= s.totalWaves) return false;
    s.wave++; s.active = true; s.pending = D.waves[s.wave - 1].countPerLane * 4 * (s.blitz ? 2 : 1); s.spawn = 0; s.timer = 0; s.damageTest = s.wave === 41 ? 30 : 0;
    s.message = clean(D.waves[s.wave - 1].name); return true;
  }
  function reward(s, owner, amount) {
    if (s.shared) for (const p of s.players) p.gold += amount / 4;
    else s.players[owner].gold += amount;
  }
  function spawn(s) {
    const wave = D.waves[s.wave - 1], u = D.units[wave.unit], lane = s.spawn % 4;
    const p = paths[lane][0], hp = u.hp;
    s.enemies.push({ id: s.nextId++, lane, x: p[0], y: p[1], node: 1, hp, max: hp, type: wave.unit, raw: u, air: u.movetp === 'fly', invisible: [17,25,30,35].includes(s.wave), immune: [10,27,31,39].includes(s.wave), undead: [3,13,17,18,22,30,36].includes(s.wave), mechanical: [15,29,37].includes(s.wave), slow: 0, slowFactor: 1, stun: 0, poison: {}, armor: u.def || 0, owner: lane, travelled: 0, attack: 0 });
    s.pending--; s.spawn++;
  }
  function hit(s, e, amount, kind, owner) {
    if (e.hp <= 0 || amount <= 0 || !Number.isFinite(amount)) return;
    if (kind === 'spells' && e.immune) return;
    const armor = e.armor, reduction = armor >= 0 ? 1 / (1 + .06 * armor) : 2 - Math.pow(.94, -armor);
    const factor = kind === 'typeless' ? 1 : (matrix[kind]?.[e.raw.deftype] ?? 1) * (kind === 'spells' ? 1 : reduction);
    const damage = amount * factor; e.hp -= damage; e.owner = owner;
    if (s.wave === 41) { s.damageTestScore = (s.damageTestScore || 0) + damage; e.hp = e.max; }
  }
  function slow(e, seconds, factor) { if (e.immune || e.mechanical) return; e.slow = Math.max(e.slow, seconds); e.slowFactor = Math.min(e.slowFactor, factor); }
  function seen(s,e) {return !e.invisible||e.detected===true;}
  function updateVision(s) {
    const detectors=s.towers.filter(t=>t.ready<=0&&catalog[t.type].abilities.some(a=>['Adts','Adtg'].includes(a.base))&&(t.type!=='oC14'||s.players[t.owner].research.Rhse>0));
    for(const e of s.enemies)e.detected=!e.invisible||detectors.some(t=>Math.hypot(slots[t.slot][0]-e.x,slots[t.slot][1]-e.y)<Math.max(catalog[t.type].range,1500*SCALE));
  }
  function onHit(s, t, e) {
    const a = catalog[t.type];
    for (const ab of a.abilities) {
      if (ab.id === 'A01J' && random(s) * 100 < Math.max(0, 45 - s.wave)) hit(s,e,e.max,'typeless',t.owner);
      else if (ab.id === 'A01G') hit(s,e,e.hp * Math.max(.02, (s.wave <= 20 ? 50 : 90 - 2*s.wave)/100),'typeless',t.owner);
      else if (ab.id === 'A01H' && [3,8,20,25,38].includes(s.wave)) hit(s,e,e.max*.5,'spells',t.owner);
      else if (ab.id === 'A016' && e.mechanical) hit(s,e,400,'typeless',t.owner);
      else if (ab.id === 'A01F' && Object.keys(e.poison).length) hit(s,e,500*Object.keys(e.poison).length,'typeless',t.owner);
      else if (['Aspo','Apo2','Apoi'].includes(ab.base) && !e.immune && !e.mechanical) { e.poison[ab.id] = { remaining: val(ab,'dur',5), damage: val(ab,'dataa',4), owner:t.owner }; slow(e,val(ab,'dur',5),1-val(ab,'datab',.5)); }
      else if (['Afra','Afrb','AIob'].includes(ab.base)) slow(e,val(ab,'dur',5),.5);
      else if (ab.base === 'ACbh' && random(s)*100<val(ab,'dataa',25) && !e.immune) e.stun=val(ab,'dur',2);
      else if (ab.base === 'ACcs' && random(s)*100<val(ab,'dataa',15)) hit(s,e,(val(ab,'datab',2)-1)*a.raw.dmgplus1,'normal',t.owner);
      else if (ab.id === 'A01A' && e.undead) hit(s,e,a.raw.dmgplus1,'typeless',t.owner);
    }
  }
  const damageSpells=new Set(['AHtb','ANfb','ACfb','ACcb','AOcl','ACcl','AOsh','ACsh','AHbz','ACbz','AEfk','ANfl','ANbf','ACbf','AUfn','ACfn','AUdc','ACdc','AEsh','ACss','AHfs']);
  const controlSpells=new Set(['AOhx','AChx','AEer','ACen','ANst','AOws','ACst','AUsl']);
  function heroSpellKind(a) {
    const code=a?._code||a?.base;
    if(['AHhb','Anhe','ACrj','Arej'].includes(code))return 'heal';
    if(damageSpells.has(code))return 'damage';
    if(controlSpells.has(code))return 'control';
    return 'passive-or-unsupported';
  }
  function castSpell(s, owner, abilityIndex = 0) {
    const h=s.players[owner]?.hero;if(!h||h.cast>0||!s.active||s.over||s.won)return false;
    const a=D.abilities[h.abilities[abilityIndex]],kind=heroSpellKind(a);if(!a||kind==='passive-or-unsupported')return false;
    const level=Math.min((a.levels||1)-1,Math.floor((h.level-1)/3));
    const n=(key,fallback)=>Number(Array.isArray(a[key])?a[key][level]??a[key][0]:a[key])||fallback;
    const cost=n('cost',0);if(h.mana<cost)return false;
    const targets=s.enemies.filter(e=>e.hp>0&&seen(s,e)&&Math.hypot(e.x-h.x,e.y-h.y)<=n('rng',800)*SCALE).sort((a,b)=>Math.hypot(a.x-h.x,a.y-h.y)-Math.hypot(b.x-h.x,b.y-h.y));
    let target=targets[0];
    if(kind==='heal') {const t=s.towers.find(t=>t.hp<t.max&&Math.hypot(slots[t.slot][0]-h.x,slots[t.slot][1]-h.y)<=n('rng',800)*SCALE);if(!t)return false;t.hp=Math.min(t.max,t.hp+n('dataa',200));}
    else {if(!target)return false;if(kind==='control'){if(target.immune)return false;target.stun=n('dur',3);}else{const code=a._code||a.base,radius=n('area',0)*SCALE,damage=['AHbz','ACbz'].includes(code)?n('datab',100)*n('dataa',1):n('dataa',100);for(const e of targets)if(e===target||(radius>0&&Math.hypot(e.x-target.x,e.y-target.y)<radius))hit(s,e,damage,'spells',owner);}}
    h.mana-=cost;h.cast=n('cool',12);if(target)s.shots.push({a:[h.x,h.y],b:[target.x,target.y],color:'#fff0a8',ttl:.3});return true;
  }
  function towerSpells(s,t,dt) {
    const a=catalog[t.type], p=slots[t.slot];
    for(const ab of a.abilities) {
      t.spells[ab.id]=Math.max(0,(t.spells[ab.id]||0)-dt);
      if (['ACav','ACua','ACat','ACba','ACac'].includes(ab.base)) continue;
      if (['Aap1','Apts','ANpi'].includes(ab.base)) for(const e of s.enemies) if(Math.hypot(e.x-p[0],e.y-p[1])<val(ab,'area',200)*SCALE)hit(s,e,val(ab,'dataa',10)*dt,'spells',t.owner);
      if(t.spells[ab.id]>0)continue;
      const targets=s.enemies.filter(e=>e.hp>0&&!e.immune&&seen(s,e)&&Math.hypot(e.x-p[0],e.y-p[1])<=Math.max(a.range,val(ab,'rng',700)*SCALE));
      if(!targets.length)continue;
      const target=targets.sort((a,b)=>b.travelled-a.travelled)[0];
      if(['ACrf','ACbz','AHbz'].includes(ab.base)) { const radius=val(ab,'area',250)*SCALE; for(const e of targets)if(Math.hypot(e.x-target.x,e.y-target.y)<=radius)hit(s,e,val(ab,'datab',100)*val(ab,'dataa',1),'spells',t.owner);t.spells[ab.id]=val(ab,'cool',12); }
      else if(['AChx','Amls','Afrz'].includes(ab.base)){target.stun=val(ab,'dur',3);t.spells[ab.id]=val(ab,'cool',12);}
      else if(['Aslo','ACsw','ACcr'].includes(ab.base)){slow(target,val(ab,'dur',10),1-val(ab,'dataa',.5));t.spells[ab.id]=val(ab,'cool',8);}
      else if(['ACdc','ACcl','Aprg','Adsm','ACsh','AUin'].includes(ab.base)){hit(s,target,val(ab,'dataa',100),'spells',t.owner);t.spells[ab.id]=val(ab,'cool',10);}
    }
  }
  function shoot(s,t,dt) {
    const a=catalog[t.type],u=a.raw,p=slots[t.slot];t.cool-=dt;
    towerSpells(s,t,dt); if(t.cool>0)return;
    let shot=null;
    for(const e of s.enemies) {if(e.hp<=0||!seen(s,e))continue;for(const weapon of [1,2]) {
      if(!(u.weapson & weapon))continue;
      const targets=u['targs'+weapon]||'';if(e.air?!targets.includes('air'):!targets.includes('ground'))continue;
      if(Math.hypot(p[0]-e.x,p[1]-e.y)>(u['rangen'+weapon]||0)*SCALE)continue;
      if(!shot||e.travelled>shot.e.travelled)shot={e,weapon};
    }}
    if(!shot)return;const {e,weapon}=shot;let damage=(u['dmgplus'+weapon]||0);
    for(let i=0;i<(u['dice'+weapon]||0);i++)damage+=1+Math.floor(random(s)*Math.max(1,u['sides'+weapon]||1));
    let speedBonus=0;
    for(const other of s.towers){if(other.ready>0)continue;for(const ab of catalog[other.type].abilities)if(Math.hypot(slots[other.slot][0]-p[0],slots[other.slot][1]-p[1])<=val(ab,'area',600)*SCALE){if(ab.base==='ACat')damage*=1+val(ab,'dataa',.1);if(ab.base==='ACba')speedBonus=Math.max(speedBonus,val(ab,'dataa',.1));}}
    hit(s,e,damage,u['atktype'+weapon],t.owner);onHit(s,t,e);
    const full=(u['farea'+weapon]||0)*SCALE,half=(u['harea'+weapon]||0)*SCALE,quarter=(u['qarea'+weapon]||0)*SCALE;
    if(quarter||half||full)for(const other of s.enemies)if(other!==e&&other.air===e.air){const d=Math.hypot(e.x-other.x,e.y-other.y);if(d<=Math.max(full,half,quarter))hit(s,other,damage*(d<=full?1:d<=half?.5:.25),u['atktype'+weapon],t.owner);}
    t.cool=Math.max(.05,(u['cool'+weapon]||1)/(1+speedBonus));s.shots.push({a:p,b:[e.x,e.y],color:a.color,ttl:.12});
  }
  function step(s,dt) {
    if(s.over||s.won||!Number.isFinite(dt)||dt<=0)return;dt=Math.min(.1,dt);s.time+=dt;s.shots=s.shots.filter(x=>(x.ttl-=dt)>0);
    for(const t of s.towers)t.ready=Math.max(0,t.ready-dt);
    for(const p of s.players)for(const [id,remaining]of Object.entries(p.researching)){p.researching[id]=remaining-dt;if(p.researching[id]<=0){p.research[id]=(p.research[id]||0)+1;delete p.researching[id];s.message='Исследование завершено: '+clean(D.upgrades[id].name[0]);}}
    for(let owner=0;owner<4;owner++){const h=s.players[owner].hero;if(!h)continue;h.cast=Math.max(0,h.cast-dt);h.cool-=dt;h.mana=Math.min(h.maxMana,h.mana+(h.raw.regenmana||1)*dt);const d=Math.hypot(h.target[0]-h.x,h.target[1]-h.y);if(d>1){const move=Math.min(d,(h.raw.spd||300)*SCALE*dt);h.x+=(h.target[0]-h.x)/d*move;h.y+=(h.target[1]-h.y)/d*move;}if(h.cool<=0&&s.active){const e=s.enemies.find(e=>e.hp>0&&seen(s,e)&&Math.hypot(e.x-h.x,e.y-h.y)<Math.max(200,h.raw.rangen1)*SCALE);if(e){hit(s,e,(h.raw.dmgplus1||10)+(h.raw[h.raw.primary?.toLowerCase()]||10)+h.level*3,h.raw.atktype1,owner);h.cool=h.raw.cool1||1.5;}}}
    if(!s.active){if(s.autostart){s.prep-=dt;if(s.prep<=0)start(s);}return;}
    s.timer-=dt;if(s.pending>0&&s.timer<=0){for(let i=0;i<4&&s.pending>0;i++)spawn(s);s.timer=.35;}
    updateVision(s);
    for(const e of s.enemies){e.armor=e.raw.def||0;for(const t of s.towers)if(t.ready<=0)for(const ab of catalog[t.type].abilities)if(ab.base==='ACav'&&val(ab,'dataa')<0&&Math.hypot(slots[t.slot][0]-e.x,slots[t.slot][1]-e.y)<val(ab,'area',900)*SCALE)e.armor=Math.min(e.armor,(e.raw.def||0)+val(ab,'dataa'));}
    for(const t of s.towers)if(t.ready<=0)shoot(s,t,dt);
    const alive=[];
    for(const e of s.enemies){for(const [key,dot]of Object.entries(e.poison)){hit(s,e,dot.damage*dt,'spells',dot.owner);dot.remaining-=dt;if(dot.remaining<=0)delete e.poison[key];}
      if(e.hp<=0){s.kills++;const u=e.raw;let bounty=u.bountyplus||0;for(let i=0;i<(u.bountydice||0);i++)bounty+=1+Math.floor(random(s)*Math.max(1,u.bountysides||1));reward(s,e.owner,bounty);for(const p of s.players)if(p.hero){p.hero.xp+=1;p.hero.level=Math.min(12,1+Math.floor(p.hero.xp/80));}continue;}
      if(s.wave===41){alive.push(e);continue;}
      e.stun=Math.max(0,e.stun-dt);e.slow=Math.max(0,e.slow-dt);if(!e.slow)e.slowFactor=1;
      if(e.stun>0){alive.push(e);continue;}
      const route=e.air?airPaths[e.lane]:paths[e.lane],p=route[e.node],distance=Math.hypot(p[0]-e.x,p[1]-e.y),speed=(e.raw.spd||300)*SCALE*(e.slow>0?e.slowFactor:1)*([23,40].includes(s.wave)?1.4:1),move=Math.min(distance,speed*dt);
      if(distance>0){e.x+=(p[0]-e.x)/distance*move;e.y+=(p[1]-e.y)/distance*move;e.travelled+=move;}
      if(distance<=move+.001){e.node++;if(e.node===route.length){s.lives--;s.lost++;continue;}}
      // Siege waves can attack nearby defenses, giving repair/support a purpose.
      if([19,27,34,37,42].includes(s.wave)){e.attack-=dt;if(e.attack<=0){const target=s.towers.find(t=>Math.hypot(slots[t.slot][0]-e.x,slots[t.slot][1]-e.y)<(e.raw.rangen1||100)*SCALE+10);if(target){target.hp-=(e.raw.dmgplus1||10);e.attack=e.raw.cool1||2;}}}
      alive.push(e);
    }
    s.enemies=alive;s.towers=s.towers.filter(t=>t.hp>0);
    if(s.lives<=0){s.over=true;s.message='Оборона прорвана';return;}
    if(s.wave===41){s.damageTest-=dt;if(s.damageTest<=0){s.enemies=[];s.pending=0;}}
    if(!s.pending&&!s.enemies.length){s.active=false;s.prep=50+1.25*(s.wave+1);s.roundBonus+=2;for(let owner=0;owner<4;owner++){const p=s.players[owner];p.gold+=s.roundBonus;if(s.wave%5===0)p.timber++;for(const t of s.towers)if(t.owner===owner&&t.type==='ngol'&&t.ready<=0)p.gold+=2*s.wave;}s.message='Рубеж удержан. Доход +'+s.roundBonus+' каждому'+(s.wave%5===0?' · +1 дерево':'');if(s.wave===s.totalWaves){s.won=true;s.message='Все волны отбиты! TWO ACES спасён.';}}
  }
  function repair(s,slot){const t=s.towers.find(t=>t.slot===slot);if(!t||s.over||s.won||t.hp>=t.max||s.players[t.owner].gold<1)return false;s.players[t.owner].gold--;t.hp=Math.min(t.max,t.hp+t.max*.1);return true;}
  function research(s,owner,id) {
    const p=s.players[owner],r=D.upgrades[id];if(s.over||s.won||!p||!r||p.researching[id]!==undefined)return false;
    const level=p.research[id]||0;if(level>=(r.maxlevel||1))return false;
    if(!s.towers.some(t=>t.owner===owner&&t.ready<=0&&String(catalog[t.type].raw.researches||'').split(',').includes(id)))return false;
    const gold=(r.goldbase||0)+level*(r.goldmod||0),wood=(r.lumberbase||0)+level*(r.lumbermod||0);
    if(p.gold<gold||p.timber<wood)return false;p.gold-=gold;p.timber-=wood;p.researching[id]=(r.timebase||0)+level*(r.timemod||0);return true;
  }
  function checkpoint(s) {
    if(s.active||s.over||s.won)return null;
    return {version:2,options:{difficulty:s.difficulty,governors:s.players.map(p=>p.governor),shared:s.shared,blitz:s.blitz},wave:s.wave,lives:s.lives,kills:s.kills,lost:s.lost,seed:s.seed,nextId:s.nextId,players:s.players.map(p=>({...p,hero:p.hero?{...p.hero,raw:undefined}:null})),towers:s.towers};
  }
  function restore(c) {
    if(!c||c.version!==2||!c.options||!Array.isArray(c.players)||c.players.length!==4||!Array.isArray(c.towers))return null;
    const s=create(c.options);
    if(!Number.isInteger(c.wave)||c.wave<0||c.wave>=s.totalWaves||!Number.isFinite(c.lives)||c.lives<=0||c.lives>s.maxLives)return null;
    for(let i=0;i<4;i++) {const p=c.players[i];if(!Number.isFinite(p.gold)||p.gold<0||p.gold>1000000||!Number.isInteger(p.timber)||p.timber<0||!Array.isArray(p.builders)||p.builders.some(b=>!builders.some(x=>x.id===b)))return null;}
    if(c.towers.length>slots.length||c.towers.some(t=>!catalog[t.type]||!slots[t.slot]||!Number.isInteger(t.owner)||t.owner<0||t.owner>3||!Number.isFinite(t.hp)||!Number.isFinite(t.ready)))return null;
    if(new Set(c.towers.map(t=>t.slot)).size!==c.towers.length)return null;
    s.wave=c.wave;s.lives=c.lives;s.kills=c.kills||0;s.lost=c.lost||0;s.seed=c.seed||243;s.nextId=c.nextId||1000;s.roundBonus=10+2*c.wave;s.players=c.players.map(p=>({...p,research:p.research||{},researching:p.researching||{},hero:p.hero&&D.units[p.hero.type]?{...p.hero,raw:D.units[p.hero.type]}:null}));s.towers=c.towers.map(t=>({...t,spells:{...t.spells}}));s.message='Сохранённая оборона · следующая волна '+(s.wave+1);return s;
  }
  return {D,SCALE,clean,builders,governors,catalog,paths,airPaths,slots,sectors,matrix,create,build,sell,transfer,give,commission,trainHero,moveHero,castSpell,canBuild,start,step,repair,research,heroSpellKind,checkpoint,restore};
});

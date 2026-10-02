/* Fixed-step simulation shared by the browser and server replay verification. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.CoolerFlightEngine = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  var VERSION = 6, WIDTH = 390, HEIGHT = 600, FLOOR = 548, MAX_TICKS = 36000;
  function random(s) { s.random = (Math.imul(s.random, 1664525) + 1013904223) >>> 0; return s.random / 4294967296; }
  function create(seed, version) {
    return { version: version === 3 || version === 4 || version === 5 ? version : VERSION, seed: seed >>> 0, random: seed >>> 0, tick: 0, y: 270, vy: 0, x: 94,
      score: 0, passes: 0, stage: 1, perfect: 0, alive: true, obstacles: [], nextId: 0, spawnDistance: 0, distance: 0, lastFlap: -20 };
  }
  function step(s, flap) {
    if (!s.alive) return s;
    if (flap && s.tick - s.lastFlap >= 7) { s.vy = s.version === 3 ? -4.6 : s.version === 4 ? -4.75 : -4.8; s.lastFlap = s.tick; }
    s.vy = Math.min(s.version < 5 ? 7 : 6.6, s.vy + (s.version < 5 ? 0.245 : 0.235));
    s.y += s.vy;
    s.stage = 1 + Math.floor(s.passes / 5);
    var speed = Math.min(s.version >= 6 ? 4.85 : 4.3, (s.version < 5 ? 2.1 : 2.35) + (s.stage - 1) * 0.25);
    s.distance += speed; s.spawnDistance += speed;
    if (!s.nextId || s.spawnDistance >= 236) {
      var gap = Math.max(148, (s.version < 5 ? 260 : 244) - (s.stage - 1) * 16);
      var roll = random(s);
      var center = s.nextId ? Math.max(180, Math.min(350, s.lastCenter + (roll * 2 - 1) * 55)) : 180 + roll * 170;
      if(s.version >= 5){
        var low = 36 + gap / 2, high = FLOOR - 12 - gap / 2;
        if(!s.nextId)center=240 + roll * 60;
        else {var direction = s.nextId % 4 < 2 ? 1 : -1;var change=48 + roll * (s.stage < 4 ? 42 : 27);center=s.lastCenter+direction*change;if(center<low||center>high)center=s.lastCenter-direction*change;}
        center=Math.max(low,Math.min(high,center));
      }
      s.lastCenter = center;
      s.obstacles.push({ id: s.nextId++, x: s.nextId === 1 ? 450 : WIDTH + 80, width: 62,
        center: center, gap: gap, scored: false, collected: false, variant: Math.floor(random(s) * 3) });
      s.spawnDistance = 0;
    }
    var radius = s.version >= 6 && s.passes >= 30 ? 24 : 48;
    s.obstacles.forEach(function (o) {
      o.x -= speed;
      if (!o.collected && Math.hypot(s.x - (o.x + o.width / 2), s.y - o.center) < 58) { o.collected = true; s.score++; s.perfect++; }
      var dx = Math.max(o.x - 8 - s.x, 0, s.x - (o.x + o.width + 8));
      var top = o.center - o.gap / 2, bottom = o.center + o.gap / 2;
      if (Math.hypot(dx, Math.max(0, s.y - top)) < radius || Math.hypot(dx, Math.max(0, bottom - s.y)) < radius) s.alive = false;
      if (!o.scored && o.x + o.width < s.x - radius) {
        o.scored = true; s.passes++;
      }
    });
    s.obstacles = s.obstacles.filter(function (o) { return o.x > -150; });
    s.tick++;
    if (s.y - radius < 24 || s.y + radius > FLOOR || s.tick >= MAX_TICKS) s.alive = false;
    return s;
  }
  function replay(seed, taps, ticks, version) {
    if (!Number.isInteger(seed) || seed < 0 || seed > 4294967295 || !Number.isInteger(ticks) || ticks < 1 || ticks > MAX_TICKS ||
        !Array.isArray(taps) || taps.length > Math.ceil(MAX_TICKS / 7)) throw new Error('Invalid flight replay');
    var prev = -7;
    taps.forEach(function (t) {
      if (!Number.isInteger(t) || t < 0 || t >= ticks || t - prev < 7) throw new Error('Invalid flap sequence');
      prev = t;
    });
    var s = create(seed, version), at = 0;
    while (s.alive && s.tick < ticks) { var flap = taps[at] === s.tick; if (flap) at++; step(s, flap); }
    if (s.alive || s.tick !== ticks || at !== taps.length) throw new Error('Flight has not ended at the supplied frame');
    return s;
  }
  return { VERSION: VERSION, WIDTH: WIDTH, HEIGHT: HEIGHT, FLOOR: FLOOR, MAX_TICKS: MAX_TICKS, RADIUS: 48, create: create, step: step, replay: replay };
});

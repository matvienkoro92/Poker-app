/* Fixed-step simulation shared by the browser and server replay verification. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.CoolerFlightEngine = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  var VERSION = 1, WIDTH = 390, HEIGHT = 600, FLOOR = 548, MAX_TICKS = 36000;
  function random(s) { s.random = (Math.imul(s.random, 1664525) + 1013904223) >>> 0; return s.random / 4294967296; }
  function create(seed) {
    return { version: VERSION, seed: seed >>> 0, random: seed >>> 0, tick: 0, y: 270, vy: 0, x: 94,
      score: 0, perfect: 0, alive: true, obstacles: [], nextId: 0, spawnDistance: 0, distance: 0, lastFlap: -20 };
  }
  function step(s, flap) {
    if (!s.alive) return s;
    if (flap && s.tick - s.lastFlap >= 7) { s.vy = -4.6; s.lastFlap = s.tick; }
    s.vy = Math.min(7, s.vy + 0.245);
    s.y += s.vy;
    var speed = Math.min(4.3, 2.1 + s.score * 0.035);
    s.distance += speed; s.spawnDistance += speed;
    if (!s.nextId || s.spawnDistance >= 236) {
      var gap = Math.max(158, 206 - s.score * 0.7);
      var center = 180 + random(s) * 170;
      s.obstacles.push({ id: s.nextId++, x: s.nextId === 1 ? 450 : WIDTH + 80, width: 62,
        center: center, gap: gap, scored: false, variant: Math.floor(random(s) * 3) });
      s.spawnDistance = 0;
    }
    var radius = 16;
    s.obstacles.forEach(function (o) {
      o.x -= speed;
      if (s.x + radius > o.x && s.x - radius < o.x + o.width &&
          (s.y - radius < o.center - o.gap / 2 || s.y + radius > o.center + o.gap / 2)) s.alive = false;
      if (!o.scored && o.x + o.width < s.x - radius) {
        o.scored = true; s.score++;
        if (Math.abs(s.y - o.center) < 22) s.perfect++;
      }
    });
    s.obstacles = s.obstacles.filter(function (o) { return o.x > -150; });
    s.tick++;
    if (s.y - radius < 24 || s.y + radius > FLOOR || s.tick >= MAX_TICKS) s.alive = false;
    return s;
  }
  function replay(seed, taps, ticks) {
    if (!Number.isInteger(seed) || seed < 0 || seed > 4294967295 || !Number.isInteger(ticks) || ticks < 1 || ticks > MAX_TICKS ||
        !Array.isArray(taps) || taps.length > Math.ceil(MAX_TICKS / 7)) throw new Error('Invalid flight replay');
    var prev = -7;
    taps.forEach(function (t) {
      if (!Number.isInteger(t) || t < 0 || t >= ticks || t - prev < 7) throw new Error('Invalid flap sequence');
      prev = t;
    });
    var s = create(seed), at = 0;
    while (s.alive && s.tick < ticks) { var flap = taps[at] === s.tick; if (flap) at++; step(s, flap); }
    if (s.alive || s.tick !== ticks || at !== taps.length) throw new Error('Flight has not ended at the supplied frame');
    return s;
  }
  return { VERSION: VERSION, WIDTH: WIDTH, HEIGHT: HEIGHT, FLOOR: FLOOR, MAX_TICKS: MAX_TICKS, create: create, step: step, replay: replay };
});

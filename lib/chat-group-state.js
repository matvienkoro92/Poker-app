"use strict";
const rawValues = new WeakMap();
function remember(meta, raw) { rawValues.set(meta, raw); return meta; }
function original(meta) {
  if (!meta || !rawValues.has(meta)) throw new Error("Group snapshot unavailable");
  return rawValues.get(meta);
}
module.exports = { remember, original };

'use strict';
const { AsyncLocalStorage } = require('node:async_hooks');
const redis = require('./redis');
const storage = new AsyncLocalStorage();
function withReadScope(build) { return storage.getStore() ? build() : storage.run(new Map(), build); }
function memo(key, build) {
  const scope = storage.getStore();
  if (!scope) return build();
  if (!scope.has(key)) scope.set(key, Promise.resolve().then(build));
  return scope.get(key);
}
const READ_OPS = new Set(['HGET', 'HMGET', 'HSCAN', 'SSCAN', 'LRANGE', 'GET', 'SISMEMBER']);
async function pipeline(commands, options) {
  if (!storage.getStore() || !commands.every(c => READ_OPS.has(c[0]))) return redis.pipeline(commands, options);
  // Preserve batching for misses while sharing individual reads between callers.
  const scope = storage.getStore(), missing = [], keys = [];
  for (const command of commands) {
    const key = 'redis:' + JSON.stringify(command);
    keys.push(key);
    if (!scope.has(key)) { missing.push(command); scope.set(key, null); }
  }
  if (missing.length) {
    const batch = redis.pipeline(missing, options);
    missing.forEach((command, i) => scope.set('redis:' + JSON.stringify(command), batch.then(rows => rows?.[i])));
  }
  return Promise.all(keys.map(key => scope.get(key)));
}
function sscanall(key, options) { return memo('set:' + key, () => redis.sscanall(key, options)); }
module.exports = { withReadScope, memo, pipeline, sscanall };

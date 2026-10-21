'use strict';
const { createHash } = require('node:crypto');
const { gzipSync, gunzipSync } = require('node:zlib');
const redis = require('./redis');
const inflight = new Map();
// Shared across serverless instances; cache failures must never hide live data.
async function cachedRead(namespace, identity, ttl, build, valid = value => value != null) {
  const key = 'poker_app:crm:read-cache:v1:' + namespace + ':' + createHash('sha256').update(JSON.stringify(identity)).digest('hex');
  if (inflight.has(key)) return inflight.get(key);
  const configured = typeof redis.isConfigured === "function" && redis.isConfigured();
  const pending = (async () => {
    if (configured) {
      try {
        const rows = await redis.pipeline([['GET', key]], { context: 'crm.read-cache', timeoutMs: 2500 });
        const raw = rows?.[0]?.result;
        if (typeof raw === 'string' && raw.startsWith('gz:')) {
          const saved = JSON.parse(gunzipSync(Buffer.from(raw.slice(3), 'base64'), { maxOutputLength: 64 * 1024 * 1024 }).toString());
          if (saved.expires > Date.now() && valid(saved.value)) return saved.value;
        }
      } catch (_) {}
    }
    const value = await build();
    if (configured && valid(value)) {
      try {
        const raw = 'gz:' + gzipSync(JSON.stringify({ expires: Date.now() + ttl * 1000, value })).toString('base64');
        if (Buffer.byteLength(raw) <= 4 * 1024 * 1024) {
          await redis.pipeline([['SET', key, raw, 'EX', String(ttl)]], { context: 'crm.read-cache', timeoutMs: 2500 });
        }
      } catch (_) {}
    }
    return value;
  })();
  inflight.set(key, pending);
  try { return await pending; } finally { if (inflight.get(key) === pending) inflight.delete(key); }
}
module.exports = { cachedRead };

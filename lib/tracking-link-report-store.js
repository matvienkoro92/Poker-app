'use strict';
const { randomUUID } = require('node:crypto');
const { gzipSync, gunzipSync } = require('node:zlib');
const redis = require('./redis');
const TTL = 15 * 60;
const key = (ref, token) => 'poker_app:crm:link-report:v1:' + ref + ':' + token;
// A report is immutable: pagination must never silently switch to newer data.
async function save(ref, rows) {
  const token = randomUUID();
  const raw = gzipSync(JSON.stringify(rows)).toString('base64');
  if (Buffer.byteLength(raw) > 4 * 1024 * 1024) return null;
  try {
    const result = await redis.pipeline([['SET', key(ref, token), raw, 'EX', String(TTL)]], {context:'tracking.report', timeoutMs:2500});
    return result?.[0]?.result === 'OK' ? token : null;
  } catch (_) { return null; }
}
async function read(ref, token) {
  if (!/^[a-f0-9-]{36}$/.test(String(token))) return null;
  const result = await redis.pipeline([['GET', key(ref, token)]], {context:'tracking.report', timeoutMs:2500, throwOnError:true});
  const raw = result?.[0]?.result;
  if (!raw) return null;
  const rows = JSON.parse(gunzipSync(Buffer.from(raw, 'base64'), {maxOutputLength:64*1024*1024}).toString());
  return Array.isArray(rows) ? rows : null;
}
module.exports = {save, read};

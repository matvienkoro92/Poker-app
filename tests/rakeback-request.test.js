'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require.resolve('../app-admin-reports-rakeback.js'), 'utf8');
const requestSource = source.slice(source.indexOf('  function requestJson('), source.indexOf('  function createRoomOptions('));
function load(fetch) {
  return vm.runInNewContext(requestSource + '; requestJson', {
    window: { fetch }, AbortController,
    setTimeout: callback => setTimeout(callback, 10), clearTimeout,
  });
}
test('rakeback request times out while fetching or reading the response body', async () => {
  for (const fetch of [() => new Promise(() => {}), async () => ({status:200,json:()=>new Promise(()=>{})})]) {
    await assert.rejects(load(fetch)('/test'), /request_timeout/);
  }
});
test('rakeback response preserves the HTTP status for expired-session messages', async () => {
  const data = await load(async () => ({status:403,json:async()=>({ok:false})}))('/test');
  assert.equal(data.__httpStatus,403);
  assert.equal(data.ok,false);
});

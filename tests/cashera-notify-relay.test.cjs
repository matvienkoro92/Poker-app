'use strict';
const {test} = require('node:test');
const assert = require('node:assert/strict');
const relay = require('../services/robokassa-notify/api/cashera-webhook');
const backend = require('../lib/api-handlers/cashera-webhook');

function response() {
  return {setHeader(){},status(n){ this.statusCode=n; return this; },end(){}};
}

test('Cashera test event reaches the main handler without forwarding merchant credentials', async t => {
  t.mock.method(global, 'fetch', async (url, options) => {
    assert.equal(url, 'https://poker-app-ebon.vercel.app/api/cashera-webhook');
    assert.equal(options.redirect, 'error');
    const headers = Object.fromEntries(Object.entries(options.headers).map(([k,v]) => [k.toLowerCase(),v]));
    assert.equal(headers['x-secret'], undefined);
    assert.equal(headers['x-api-key'], undefined);
    const upstream = response();
    await backend({method:'POST',headers,body:options.body},upstream);
    return {status:upstream.statusCode};
  });
  const previous = [process.env.CASHERA_API_KEY,process.env.CASHERA_API_SECRET];
  t.after(() => {
    for (const [index,name] of ['CASHERA_API_KEY','CASHERA_API_SECRET'].entries()) {
      if (previous[index]===undefined) delete process.env[name];
      else process.env[name]=previous[index];
    }
  });
  process.env.CASHERA_API_KEY='fixture-key';
  process.env.CASHERA_API_SECRET='fixture-secret';
  for (const [secret,expected] of [['fixture-secret',200],['invalid',401]]) {
    const result=response();
    await relay({method:'POST',headers:{'x-api-key':'fixture-key','x-secret':secret,'content-type':'application/json'},body:{event:'webhook.test'}},result);
    assert.equal(result.statusCode,expected);
  }
});

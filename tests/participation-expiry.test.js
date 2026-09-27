'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
function load(until, permanent = false) {
  const module = { exports: {} };
  const pipeline = async commands => commands.map(([op,key]) => ({result: op === 'SISMEMBER' ? Number(permanent) : key.startsWith('poker_app:participation_blocked_until:') ? String(until) : null}));
  vm.runInNewContext(fs.readFileSync(require.resolve('../lib/app-user-blocks'),'utf8'), {module, exports: module.exports, Date, Intl, require: name => name === 'crypto' ? require('crypto') : name === './redis' ? {pipeline} : name === './account-id' ? {DT_IDS_KEY:'ids',ID_TO_USER_KEY:'users'} : {isAdmin:()=>false,normalizeTelegramId:x=>x}});
  return module.exports.rejectBlockedParticipation;
}
test('timed participation restrictions expire in both scopes; permanent bans remain', async () => {
  for (const scope of ['raffles','daily-poker']) {
    let body; const res={status(code){assert.equal(code,403);return this},json(x){body=x}};
    assert.equal(await load(Date.now()+60000)(res,'ID723161',{},scope),true);
    assert.equal(body.code,'PARTICIPATION_BLOCKED');assert.ok(body.blockedUntil);
    assert.equal(await load(Date.now()-1000)(res,'ID723161',{},scope),false);
    assert.equal(await load(0)(res,'ID723161',{},scope),false);
    assert.equal(await load(Date.now()-1000,true)(res,'ID723161',{},scope),true);
  }
});

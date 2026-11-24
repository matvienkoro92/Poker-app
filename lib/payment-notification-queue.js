'use strict';

// Update the retry index in the same compare-and-set as the ledger receipt.
const save = `
if (redis.call('GET',KEYS[1]) or '') ~= ARGV[1] then return 0 end
if ARGV[4]=='pending' then redis.call('ZADD',KEYS[2],'NX',0,ARGV[3])
else redis.call('ZREM',KEYS[2],ARGV[3]) end
redis.call('SET',KEYS[1],ARGV[2]); return 1`;

const take = `
if redis.call('EXISTS',KEYS[3])==0 then
  local raw=redis.call('GET',KEYS[1])
  local ledger=raw and cjson.decode(raw) or {}
  local function missing(v) return not v or v==cjson.null or v==0 or v=='' end
  for _,p in ipairs(ledger.paymentFormPayments or {}) do
    if p.providerId==ARGV[1] and p.status=='confirmed' and
      (missing(p.notifiedAt) or p.incomeNotificationPending==true or (p.providerId=='mandarin' and missing(p.incomeNotifiedAt)) or (p.providerId=='cashera' and (missing(p.incomeNotifiedAt) or missing(p.dialogNotifiedAt)))) then
      redis.call('ZADD',KEYS[2],'NX',0,tostring(p.id))
    end
  end
  redis.call('SET',KEYS[3],'1')
end
local ids=redis.call('ZRANGEBYSCORE',KEYS[2],'-inf',ARGV[2],'LIMIT',0,5)
for _,id in ipairs(ids) do redis.call('ZADD',KEYS[2],ARGV[3],id) end
return ids`;

function key(provider) { return 'poker21:'+provider+':notification-queue:v1'; }
function saveCommand(ledger, raw, state, payment) {
  const pending = payment.status === 'confirmed' && (!payment.notifiedAt || payment.incomeNotificationPending ||
    payment.providerId === 'mandarin' && !payment.incomeNotifiedAt ||
    payment.providerId === 'cashera' && (!payment.incomeNotifiedAt || !payment.dialogNotifiedAt));
  return ['EVAL',save,2,ledger,key(payment.providerId),raw,JSON.stringify(state),payment.id,pending?'pending':'done'];
}
async function takeDue(redis, ledger, provider, now = Date.now()) {
  const queue = key(provider);
  const [row] = await redis.pipeline([['EVAL',take,3,ledger,queue,queue+':initialized',provider,now,now+60000]],{throwOnError:true});
  return row.result;
}
// A Telegram success is already final. Retry only the idempotent Redis acknowledgement.
async function acknowledge(write) {
  try { return await write(); }
  catch { return write(); }
}
module.exports = {saveCommand,takeDue,acknowledge};

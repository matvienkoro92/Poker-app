const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
function runtime(load) {
  const alerts=[];
  const context={window:{alert:message=>alerts.push(message)},ensureDomainsMaybeAsync:load};
  const source=fs.readFileSync(path.join(__dirname,'../app-lazy-loader.js'),'utf8');
  vm.createContext(context);
  vm.runInContext(source.slice(source.indexOf('  window.pokerCreateModalStyleGate ='),source.indexOf('  window.pokerEnsureStyleDomains =')),context);
  return {create:context.window.pokerCreateModalStyleGate,alerts};
}
const flush=()=>new Promise(resolve=>setImmediate(resolve));
test('loaded modal CSS allows synchronous opening',()=>{
  const r=runtime(()=>true);
  assert.equal(r.create('info').wait(()=>assert.fail('No deferred callback needed')),false);
});
test('closing a modal cancels its pending reveal without cancelling shared CSS',async()=>{
  let resolve;
  const pending=new Promise(r=>resolve=r),r=runtime(()=>pending);
  const first=r.create('info'),second=r.create('info');let opened=0;
  first.wait(()=>assert.fail('Closed dialog reopened'));
  second.wait(()=>opened++);
  first.cancel();resolve(true);await flush();
  assert.equal(opened,1);
});
test('repeated opens during CSS loading reveal only the latest request',async()=>{
  let resolve;const pending=new Promise(r=>resolve=r),r=runtime(()=>pending),gate=r.create('info');
  const opened=[];gate.wait(()=>opened.push('first'));gate.wait(()=>opened.push('latest'));
  resolve(true);await flush();assert.deepEqual(opened,['latest']);
});
test('CSS failure reports an error and the next attempt can succeed',async()=>{
  let failed=true;const r=runtime(()=>failed?Promise.reject(new Error('offline')):Promise.resolve(true)),gate=r.create('info');
  gate.wait(()=>assert.fail('Failed CSS opened dialog'));await flush();assert.equal(r.alerts.length,1);
  failed=false;let opened=false;gate.wait(()=>opened=true);await flush();assert.equal(opened,true);
});

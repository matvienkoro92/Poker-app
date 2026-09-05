const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
test('home news binds immediately while the profile is still unmounted', () => {
  const source = fs.readFileSync(path.join(__dirname, '../app-home-friend-news.js'), 'utf8');
  const start = source.indexOf('  function mountWhenProfileReady()');
  const end = source.indexOf('  function load(friendsOverride)', start);
  let binds=0, mounted=false, observerCallback;
  const context={
    ensureDom(){}, bind(){binds++;},render(){},
    el:()=>mounted?{}:null,document:{body:{}},
    MutationObserver:class {constructor(cb){observerCallback=cb;}observe(){}disconnect(){}}
  };
  vm.createContext(context);
  vm.runInContext(source.slice(start,end),context);
  context.mountWhenProfileReady();
  assert.equal(binds,1,'home button must not wait for the profile');
  mounted=true;
  observerCallback();
  assert.equal(binds,2,'new profile controls are bound when they arrive');
});

const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(require.resolve('../app-view-router.js'),'utf8');
test('navigation hides the shared header outside Home and restores it on return',()=>{
 const properties=new Map(),header={hidden:false,style:{setProperty:(k,v,p)=>properties.set(k,{v,p}),removeProperty:k=>properties.delete(k)}};
 const c={document:{querySelectorAll:()=>[header]}};vm.createContext(c);
 vm.runInContext(source.slice(source.indexOf('function pokerSyncHomeHeaderVisibility('),source.indexOf('// Простая навигация')),c);
 for(const view of ['profile','raffles','download','chat','hall-of-fame','player-hall']){
  c.pokerSyncHomeHeaderVisibility(view);assert.equal(header.hidden,true);assert.deepEqual(properties.get('display'),{v:'none',p:'important'});
  c.pokerSyncHomeHeaderVisibility('home');assert.equal(header.hidden,false);assert.equal(properties.has('display'),false);
 }
});

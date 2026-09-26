const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require.resolve('../app-sng-champions.js'), 'utf8');
const code = source.slice(source.indexOf('  var profileTournamentsRequest ='), source.indexOf('  function bind()'));
test('profile includes only approved started tournaments and hides on logout', async () => {
  const panel = {hidden:true, innerHTML:''};
  let loggedIn = true;
  const context = {document:{getElementById:()=>panel},pokerApiHasCredential:()=>loggedIn,apiAuthQuery:()=>'?auth=user',baseUrl:()=>'',API_PATH:'/api/sng-champions',escapeHtml:String,fetch:async()=>({ok:true,json:async()=>({ok:true,tournaments:[
    {id:'playing',title:'Playing',status:'bracket',myEntryStatus:'approved'},
    {id:'finished',title:'Finished',status:'completed',myEntryStatus:'approved'},
    {id:'waiting',title:'Waiting',status:'open',myEntryStatus:'approved'},
    {id:'stranger',title:'Stranger',status:'bracket',myEntryStatus:''},
    {id:'pending',title:'Pending',status:'bracket',myEntryStatus:'pending'}
  ]})})};
  vm.createContext(context);vm.runInContext(code,context);
  context.refreshProfileTournaments();
  await new Promise(resolve=>setImmediate(resolve));
  assert.equal(panel.hidden,false);
  assert.match(panel.innerHTML,/Playing/);assert.match(panel.innerHTML,/Finished/);
  assert.doesNotMatch(panel.innerHTML,/Waiting|Stranger|Pending/);
  loggedIn=false;context.refreshProfileTournaments();
  assert.equal(panel.hidden,true);assert.equal(panel.innerHTML,'');
});

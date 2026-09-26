const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require.resolve('../app-sng-champions.js'), 'utf8');
const code = source.slice(source.indexOf('  var profileTournamentsRequest ='), source.indexOf('  function bind()'));
test('profile shows ongoing tournaments to participants, nonparticipants and guests', async () => {
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
  assert.match(panel.innerHTML,/Playing/);
  assert.doesNotMatch(panel.innerHTML,/Finished|Waiting/);
  assert.match(panel.innerHTML,/Stranger/);
  assert.match(panel.innerHTML,/Pending/);
  loggedIn=false;context.refreshProfileTournaments();
  await new Promise(resolve=>setImmediate(resolve));
  assert.equal(panel.hidden,false);assert.match(panel.innerHTML,/Stranger/);
});

test('public ongoing list excludes drafts, completed and test tournaments and exposes only card fields', () => {
  const handler = fs.readFileSync(require.resolve('../lib/api-handlers/sng-champions.js'), 'utf8');
  const start = handler.indexOf('    if (mode === "ongoing-tournaments")');
  const end = handler.indexOf('    const context = await optionalContext(req, {});', start);
  const context = {mode:'ongoing-tournaments',store:{tournaments:[
    {id:'live',title:'Live',status:'bracket',entries:[{accountId:'private'}]},
    {id:'test',status:'bracket',isTest:true},
    {id:'draft',status:'draft'}, {id:'done',status:'completed'}
  ]},setShortPublicCacheHeaders(){},res:{status(){return this;},json(value){return value;}}};
  const result = vm.runInNewContext('(function(){' + handler.slice(start,end) + '})()',context);
  assert.deepEqual(JSON.parse(JSON.stringify(result)),{ok:true,tournaments:[{id:'live',title:'Live',status:'bracket'}]});
});

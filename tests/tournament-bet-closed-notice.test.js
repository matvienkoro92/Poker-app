const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
test('closed notice lists participants and is deduplicated',async()=>{
 const source=fs.readFileSync(require.resolve('../lib/tournament-bet-subscriptions'),'utf8');let locked=false;const messages=[];
 const ctx={URL,process:{env:{}},pipeline:async cmds=>cmds.map(([cmd,key,v,...args])=>{if(cmd==='DEL'){locked=false;return {result:1}}if(args.includes('NX')&&locked)return {result:null};locked=true;return {result:'OK'}}),notifyGroup:async(e,text,url)=>{messages.push({text,url});return {sent:1}}};vm.createContext(ctx);vm.runInContext(source.slice(source.indexOf('async function notifyClosed'),source.indexOf('module.exports =')),ctx);
 const e={id:'one',status:'closed',title:'Меджик',entries:[{name:'Анна'},{name:'Venius'}]};await ctx.notifyClosed({...e,status:'open'},'token');assert.equal(messages.length,0);await ctx.notifyClosed(e,'token');await ctx.notifyClosed(e,'token');assert.equal(messages.length,1);assert.match(messages[0].text,/1. Анна\n2. Venius/);assert.match(messages[0].text,/Регистрация.*закрыта/);assert.match(messages[0].url,/tournament_bet_one/);
});

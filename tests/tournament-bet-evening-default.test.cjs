const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(require.resolve('../app-tournament-bet'),'utf8');
const helper=source.slice(source.indexOf('  function adminHtml('),source.indexOf('  function render()'));
test('event creation selects tonight in club schedule timezone and previews the same tournament',()=>{
 const rows=Array.from({length:7},(_,i)=>({id:'weekly-'+((i+1)%7),weekday:(i+1)%7,day:'day',name:'Tournament '+i,buyin:'500'}));
 const context={Date:class extends Date{constructor(){super('2026-10-28T14:23:00Z');}},Intl,eveningTournaments:()=>rows,esc:String,tournamentBannerHtml:item=>'PREVIEW:'+item.id};
 vm.createContext(context);vm.runInContext(helper,context);const html=context.adminHtml({isAdmin:true},true);
 assert.match(html, /value="weekly-3" selected/);assert.doesNotMatch(html,/value="weekly-1" selected/);assert.match(html,/PREVIEW:weekly-3/);
});

const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm');
const source=fs.readFileSync('app-admin-deposits.js','utf8');
function fixture(filter='done',query=''){
 const node={innerHTML:'',insertAdjacentHTML(_,html){this.innerHTML+=html;}};
 const ctx={closedVisibleCount:10,filter,query,data:{entries:Array.from({length:25},(_,i)=>({id:i,recipient:'Игрок '+i,createdAt:i,closedAt:i,remaining:filter==='active'?100:0,archived:filter==='archive'}))},host:{querySelector:()=>node},card:e=>'[card:'+e.id+']',isCryptoWithdrawal:()=>false,icon:()=>'',esc:s=>s};
 vm.createContext(ctx);vm.runInContext(source.slice(source.indexOf('  function renderCards()'),source.indexOf('  function bankStyle')),ctx);
 return {ctx,node,render:()=>ctx.renderCards()};
}
test('closed cards initially render newest ten and then another ten',()=>{
 const f=fixture();f.render();assert.equal((f.node.innerHTML.match(/\[card:/g)||[]).length,10);assert.match(f.node.innerHTML,/card:24/);assert.doesNotMatch(f.node.innerHTML,/card:14/);assert.match(f.node.innerHTML,/Показать ещё 10/);
 f.ctx.closedVisibleCount=20;f.render();assert.equal((f.node.innerHTML.match(/\[card:/g)||[]).length,20);assert.match(f.node.innerHTML,/Показать ещё 5/);
 f.ctx.closedVisibleCount=30;f.render();assert.equal((f.node.innerHTML.match(/\[card:/g)||[]).length,25);assert.doesNotMatch(f.node.innerHTML,/withdrawals-more/);
});
test('search finds entries beyond the first page; active withdrawals remain visible',()=>{
 const f=fixture('done','Игрок 0');f.render();assert.match(f.node.innerHTML,/card:0/);assert.doesNotMatch(f.node.innerHTML,/withdrawals-more/);
 const active=fixture('active');active.render();assert.equal((active.node.innerHTML.match(/\[card:/g)||[]).length,25);
});

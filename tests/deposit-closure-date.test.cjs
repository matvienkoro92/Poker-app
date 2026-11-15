const {test}=require('node:test'),assert=require('node:assert/strict'),{summary,applyOperation}=require('../lib/admin-deposits');
const entry=()=>({id:'withdrawal',total:10000,createdAt:1000,payments:[],changes:[],reservations:[],returns:[]});
test('legacy closed withdrawal uses latest non-void financial operation',()=>{
 const e={...entry(),payments:[{amount:5000,createdAt:2000},{amount:5000,createdAt:3000},{amount:5000,createdAt:5000,voidedAt:6000}]};
 assert.equal(summary(e).closedAt,3000);assert.equal(summary(entry()).closedAt,null);
});
test('closing, reopening and closing again tracks the latest closure',()=>{
 let state={revision:0,entries:[entry()],requests:[]};
 state=applyOperation(state,{action:'payment',entryId:'withdrawal',amount:10000,requestId:'closure_payment_0001'},'admin',2000).state;
 assert.equal(summary(state.entries[0]).closedAt,2000);
 state=applyOperation(state,{action:'void',entryId:'withdrawal',paymentId:'closure_payment_0001',requestId:'closure_void_000001'},'admin',3000).state;
 assert.equal(summary(state.entries[0]).closedAt,null);
 state=applyOperation(state,{action:'return',entryId:'withdrawal',amount:10000,requestId:'closure_return_00001'},'admin',4000).state;
 assert.equal(summary(state.entries[0]).closedAt,4000);
});
test('closed cards sort by closure time regardless of creation time and currency',()=>{
 const fs=require('fs'),vm=require('vm'),src=fs.readFileSync('app-admin-deposits.js','utf8');
 const node={innerHTML:''},ctx={data:{entries:[{id:'old',createdAt:900,closedAt:200,remaining:0},{id:'new',createdAt:100,closedAt:300,remaining:0}]},filter:'done',closedVisibleCount:10,query:'',host:{querySelector:()=>node},card:e=>e.id,isCryptoWithdrawal:e=>e.id==='new'};
 vm.createContext(ctx);vm.runInContext(src.slice(src.indexOf('  function renderCards()'),src.indexOf('  function bankStyle')),ctx);ctx.renderCards();assert.equal(node.innerHTML,'newold');
});

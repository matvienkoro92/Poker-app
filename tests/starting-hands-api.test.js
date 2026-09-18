const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const zlib=require('node:zlib');
async function call(body,linked='208238',authorized=true){
 const commands=[];const res={setHeader(){},status(n){this.statusCode=n;return this;},json(d){this.data=d;return this;}};
 const module={exports:{}};
 vm.runInNewContext(fs.readFileSync('lib/api-handlers/starting-hands.js','utf8'),{module,Buffer,require(name){
 if(name==='node:zlib')return zlib;
 if(name==='../../starting-hands/insights')return require('../starting-hands/insights');
 if(name==='../pokerplus')return {readBoundPokerPlusUserId:async()=>linked};
 if(name==='../club-social')return {context:async()=>authorized?{accountId:'owner',body}:(res.status(401).json({ok:false}),null),redis:async cmds=>{commands.push(...cmds);return cmds.map(c=>c[0]==='GET'?'v1':zlib.gzipSync(JSON.stringify(c[2]==='list'?{playerId:linked,rows:[]}:{events:[],stacks:[{actor:'Вы',amount:12.5}]})).toString('base64'));}};
 throw Error(name);
 }});await module.exports({method:'POST'},res);return {res,commands};
}
test('rejects unauthenticated reads without storage access',async()=>{const {res,commands}=await call({},'208238',false);assert.equal(res.statusCode,401);assert.equal(commands.length,0);});
test('ignores requested player ID and scopes list and replay to binding',async()=>{for(const action of ['list','replay']){const {res,commands}=await call({action,playerId:'208238',handId:'123'},'999');assert.equal(res.statusCode,200);assert.ok(commands.every(c=>c[1].startsWith('poker_app:starting-hands:999:')));}});
test('unbound account does not read imported history',async()=>{const {res,commands}=await call({},'');assert.equal(res.data.rows.length,0);assert.equal(commands.length,0);});
test('version check reads only active history pointer',async()=>{const {res,commands}=await call({action:'version'},'999');assert.equal(res.statusCode,200);assert.equal(res.data.version,'v1');assert.equal(res.data.playerId,'999');assert.equal(commands.length,1);assert.equal(commands[0][0],'GET');});
test('invalid hand identifiers are rejected',async()=>{const {res}=await call({action:'replay',handId:'../list'});assert.equal(res.statusCode,400);});

test('insights batch is bounded and uses only bound owner keys',async()=>{
 for(const handIds of [[],['../list'],Array(101).fill('1')])assert.equal((await call({action:'insights',handIds})).res.statusCode,400);
 const {res,commands}=await call({action:'insights',handIds:['123','456'],playerId:'208238'},'999');
 assert.equal(res.statusCode,200);assert.deepEqual(Object.keys(res.data.signals),['123','456']);
 assert.ok(commands.every(c=>c[1].startsWith('poker_app:starting-hands:999:')));
 assert.ok(!JSON.stringify(res.data).includes('events'));
});
test('stack batch returns only the bound hero stack in minor units',async()=>{
 const {res,commands}=await call({action:'stacks',handIds:['123','456'],playerId:'208238'},'999');
 assert.equal(res.statusCode,200);assert.equal(res.data.stacks['123'],1250);assert.equal(res.data.stacks['456'],1250);
 assert.ok(commands.every(c=>c[1].startsWith('poker_app:starting-hands:999:')));
 assert.ok(!JSON.stringify(res.data).includes('events'));
});

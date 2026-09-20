const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
test('private cash fetch scopes follow the explicitly selected tab',async()=>{
 const source=fs.readFileSync(require.resolve('../app-private-cash.js'),'utf8');
 const urls=[];const context={baseUrl:()=>'',API_PATH:'/api/private-cash',apiAuthQuery:()=>'?auth=test',fetch:async url=>{urls.push(url);return {json:async()=>({ok:true})};}};
 vm.createContext(context);vm.runInContext(source.slice(source.indexOf('  function fetchState(tab)'),source.indexOf('  function fetchHomeSummary')),context);
 await context.fetchState('signup');await context.fetchState('archive');
 assert.doesNotMatch(urls[0],/scope=archive/);assert.match(urls[1],/scope=archive/);
});
test('private cash archive index does not request participants',async()=>{
 const source=fs.readFileSync(require.resolve('../lib/api-handlers/private-cash.js'),'utf8');
 const commands=[];const context={resolveViewer:async()=>({}),EVENTS_KEY:'events',MAX_EVENTS:50,cleanText:String,eventKey:id=>id,parseJson:JSON.parse,normalizeEvent:x=>x,
 redisPipeline:async rows=>{commands.push(...rows);return rows[0][0]==='LRANGE'?[{result:['old']}]:[{result:JSON.stringify({id:'old',status:'completed',date:'2026-09-01'})}];}};
 vm.createContext(context);vm.runInContext(source.slice(source.indexOf('async function loadState(auth'),source.indexOf('async function broadcastCreated')),context);
 const result=await context.loadState({isAdmin:false},{scope:'archive'});
 assert.equal(result.events.length,1);assert.ok(commands.every(c=>c[0]!=='HGETALL'));assert.equal(result.events[0].participants,undefined);
});
test('current rating domain excludes summer tournament archive chunks',()=>{
 const html=fs.readFileSync(require.resolve('../index.html'),'utf8');
 const current=html.split('\n').filter(line=>line.includes('data-poker-lazy-domain="rating-current"')).join('\n');
 assert.match(current,/summer-rating-data-september/);assert.doesNotMatch(current,/summer-rating-data-(june|july|august)/);
});

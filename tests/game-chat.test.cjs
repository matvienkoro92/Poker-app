const test=require('node:test'),assert=require('node:assert/strict'),{handle,SEND,RATE}=require('../lib/game-chat');
function fixture(family='board-games',discipline='chess'){
 const room={players:['host','guest'],playerProfiles:[{name:'Автор'},{name:'Друг'}],state:{discipline,winner:null},expires:100000};const messages=[],saved=new Map();let time=1000,seq=0,cooldown=false;const calls=[];
 const commands=async rows=>rows.map(([op,...a])=>{calls.push(op);if(op==='GET')return JSON.stringify(room);if(op==='LRANGE')return messages.slice(-80).map(JSON.stringify);if(op==='EVAL'&&a[0]===RATE)return 1;if(op==='EVAL'&&a[0]===SEND){const key=a[4];if(saved.has(key))return saved.get(key);if(cooldown)return '';const m={...JSON.parse(a[6]),sequence:++seq},encoded=JSON.stringify(m);saved.set(key,encoded);messages.push(m);return encoded;}throw Error(op);});
 const f={family,member:'host',body:{action:'chat-send',roomId:'ABCDEFGHJK',text:'Привет!',messageId:'abcdefghijklmnop'},commands,now:()=>time};return {f,room,messages,calls,cooldown:v=>cooldown=v};
}
for(const family of ['board-games','billiards'])test(family+': messages are scoped, server named, idempotent and independent from game state',async()=>{
 const {f,room,calls}=fixture(family);const before=structuredClone(room),a=await handle(f),b=await handle(f);assert.equal(a.message.nick,'Автор');assert.equal(a.message.player,0);assert.equal(a.message.id,b.message.id);assert.equal(a.message.sequence,1);
 const read=await handle({...f,member:'viewer',body:{action:'chat-read',roomId:f.body.roomId}});assert.equal(read.messages.length,1);const unchanged=await handle({...f,body:{action:'chat-read',roomId:f.body.roomId,sinceSequence:read.sequence}});assert.deepEqual(unchanged.messages,[]);assert.equal(unchanged.sequence,1);assert.equal(JSON.stringify(read).includes('host'),false);assert.deepEqual(room,before);assert.ok(!calls.includes('SET'));await assert.rejects(handle({...f,member:'viewer'}),e=>e.status===403);
});
test('chat rejects empty, oversized, invalid rooms and closed games without opening darts',async()=>{
 const {f,room}=fixture();for(const text of ['', ' ', 'a'.repeat(501)])await assert.rejects(handle({...f,body:{...f.body,text}}),e=>e.status===400);
 await assert.rejects(handle({...f,body:{...f.body,roomId:'x'}}),e=>e.status===400);room.cancelled=true;await assert.rejects(handle(f),e=>e.status===404);
 await assert.rejects(handle(fixture('board-games','darts').f),e=>e.status===403);
});
test('chat keeps literal text, strips control characters, and allows retry after cooldown',async()=>{
 const {f,cooldown}=fixture();cooldown(true);await assert.rejects(handle(f),e=>e.status===429);cooldown(false);const r=await handle({...f,body:{...f.body,text:' <img src=x onerror=alert(1)>\u0000 '}});assert.equal(r.message.text,'<img src=x onerror=alert(1)>');
});

// Execute the production atomic send script, including retries and retention, in Lua.
test('atomic Redis send deduplicates retries and bounds history to 80 messages',()=>{
 const {lua,lauxlib,lualib,to_luastring,to_jsstring}=require('fengari'),L=lauxlib.luaL_newstate();lualib.luaL_openlibs(L);
 const code=`local values,lists,json={},{},{};local n=0
 cjson={decode=function(v) local copy={} for k,x in pairs(json[v]) do copy[k]=x end return copy end,encode=function(v) n=n+1;json['json'..n]=v;return 'json'..n end}
 redis={call=function(cmd,k,...)
 local a={...};if cmd=='GET' then return values[k] or false elseif cmd=='SET' then if a[2]=='NX' and values[k] then return false end;values[k]=a[1];return 'OK'
 elseif cmd=='INCR' then values[k]=(values[k] or 0)+1;return values[k] elseif cmd=='RPUSH' then lists[k]=lists[k] or {};table.insert(lists[k],a[1]) elseif cmd=='LTRIM' then while #lists[k]>80 do table.remove(lists[k],1) end elseif cmd~='EXPIRE' then error(cmd) end end}
 local function send(id) KEYS={'messages','seq','id:'..id,'cooldown'};ARGV={cjson.encode({text='message',player=0})};return assert(load(${JSON.stringify(SEND)}))() end
 local first=send('one');assert(first~='');assert(send('one')==first);assert(values.seq==1);assert(send('two')=='');values.cooldown=nil
 for i=2,100 do values.cooldown=nil;assert(send(tostring(i))~='') end
 assert(#lists.messages==80);assert(json[lists.messages[1]].sequence==21);assert(json[lists.messages[80]].sequence==100)`;
 try{const status=lauxlib.luaL_dostring(L,to_luastring(code));assert.equal(status,lua.LUA_OK,status===lua.LUA_OK?'':to_jsstring(lua.lua_tostring(L,-1)));}finally{lua.lua_close(L);}
});

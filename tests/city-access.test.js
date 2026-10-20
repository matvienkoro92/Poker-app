const test=require('node:test'),assert=require('node:assert/strict');
const {signPwaSession}=require('../lib/poker-pwa-session');
const handler=require('../lib/api-handlers/city-access');
test('city access rejects guests and regular players, accepts a signed administrator',async()=>{
const before=process.env.TELEGRAM_BOT_TOKEN;process.env.TELEGRAM_BOT_TOKEN='city-access-test-secret';
try{for(const [body,status]of [[{},401],[{adminAccess:true},401],[{pwaSession:'forged'},401],[{pwaSession:signPwaSession({id:123,adminAccess:true},process.env.TELEGRAM_BOT_TOKEN)},403],[{pwaSession:signPwaSession({id:1897001087},process.env.TELEGRAM_BOT_TOKEN)},200]]){
const res={setHeader(){},status(n){this.code=n;return this;},json(d){this.data=d;return this;}};
await handler({method:'POST',query:{},body},res);assert.equal(res.code,status);assert.equal(res.data.allowed,status===200);
}}finally{if(before===undefined)delete process.env.TELEGRAM_BOT_TOKEN;else process.env.TELEGRAM_BOT_TOKEN=before;}
});

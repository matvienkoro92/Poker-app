const test=require('node:test'),assert=require('node:assert/strict');
test('living access uses the authenticated administrator flag, ignoring saved profile and request flags',async()=>{
 const social=require('../lib/club-social'),hall=require('../lib/player-hall'),oldContext=social.context,oldRead=hall.read,key=require.resolve('../lib/api-handlers/player-hall');let admin=false;
 try{social.context=async()=>({body:{action:'get',livingAccess:true,admin:true},accountId:'test',villaAccess:true,billiardsAccess:true,admin});hall.read=async()=>({livingAccess:true});delete require.cache[key];const handler=require(key);for(const value of [false,undefined,'true',true]){admin=value;let data;await handler({}, {status(){return this;},json(v){data=v;}});assert.equal(data.hall.livingAccess,value===true);}}finally{social.context=oldContext;hall.read=oldRead;delete require.cache[key];}
});

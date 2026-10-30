const test=require('node:test'),assert=require('node:assert/strict'),{registrationStatus}=require('../lib/tracking-registration-status');
test('older evidence establishes a returning player without inventing a registration date',()=>{
 assert.equal(registrationStatus('ID123456',null,50,100),'returning');
 assert.equal(registrationStatus('ID123456',150,50,100),'returning');
 assert.equal(registrationStatus('ID123456',null,150,100),'unknown');
 assert.equal(registrationStatus('ID123456',NaN,NaN,100),'unknown');
 assert.equal(registrationStatus('ID123456',150,NaN,100),'new');
 assert.equal(registrationStatus('',null,50,100),'guest');
});

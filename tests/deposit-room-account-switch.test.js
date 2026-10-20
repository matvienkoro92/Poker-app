const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const source=fs.readFileSync(require.resolve('../app-admin-deposits.js'),'utf8');
test('changing room clears the previous ID or uses the selected player account',()=>{
 const input={value:'338241'},caption={},picker={dataset:{profileKey:'player'},querySelector:()=>caption};
 const scope={querySelector:s=>s==='[data-player-picker]'?picker:input};
 const room={value:'X',closest:()=>scope};
 const c={data:{playerDirectory:[{profileKey:'player',room:'P21',playerId:'338241'},{profileKey:'other',room:'X',playerId:'999'}]}};
 vm.createContext(c);vm.runInContext(source.slice(source.indexOf('  function syncAllocationAccount('),source.indexOf('  function allocationRow(')),c);
 c.syncAllocationAccount(room);assert.equal(input.value,'');
 c.data.playerDirectory.push({profileKey:'player',room:'X',playerId:'123'});
 c.syncAllocationAccount(room);assert.equal(input.value,'123');
 room.value='P21';c.syncAllocationAccount(room);assert.equal(input.value,'338241');
 delete picker.dataset.profileKey;room.value='X';c.syncAllocationAccount(room);assert.equal(input.value,'');
});

test('withdrawal review includes player search, link saving, room and ID in the same scope',()=>{
 let html='';
 const picker={dataset:{},querySelector:()=>({})};
 const context={data:{playerDirectory:[]},editor:{querySelector:()=>({querySelector:()=>picker})},esc:String,inputMoney:n=>String(n/100),icon:()=>'',showEditor:(_title,body)=>{html=body;},playerChoicesHtml:()=>'',accountChoicesHtml:()=>'',depositRooms:[['P21','Покер21'],['X','Хпокер'],['Supr','Супрема'],['PP','PPpoker']]};
 vm.createContext(context);
 for(const [start,end] of [['  function playerPickerHtml(', '  function renderPlayerChoices('],['  function field(', '  var depositRooms='],['  function roomFields(', '  function reservedCopyText(']])vm.runInContext(source.slice(source.indexOf(start),source.indexOf(end)),context);
 context.review({warnings:[],paymentType:'bank',room:'P21',playerId:'208238',amount:100000});
 assert.match(html,/data-withdrawal-player/);assert.match(html,/Выбрать игрока/);assert.match(html,/data-dep="save-player-account"/);
 assert.match(html,/name="playerId" value="208238"/);assert.match(html,/name="total" value="1000"/);
 const scope=html.split('data-withdrawal-player>')[1].split('</fieldset></div>')[0];
 assert.match(scope,/data-player-picker/);assert.match(scope,/name="room"/);assert.match(scope,/name="playerId"/);
});

test('withdrawal submission includes the selected profile and requires confirmation for a new room ID',()=>{
 const picker={dataset:{profileKey:'P21|208238'}},checkbox={checked:true};
 const c={data:{playerDirectory:[]},tell:()=>{}};vm.createContext(c);
 vm.runInContext(source.slice(source.indexOf('  function withdrawalPlayerLink('),source.indexOf('  function reservedCopyText(')),c);
 const form={querySelector:s=>s==='[data-player-picker]'?picker:checkbox},values={room:'X',playerId:'2299644'};
 assert.equal(c.withdrawalPlayerLink(form,values),true);assert.equal(values.selectedProfileKey,'P21|208238');assert.equal(values.confirmAccountLink,true);
 checkbox.checked=false;assert.equal(c.withdrawalPlayerLink(form,{room:'X',playerId:'2299644'}),false);
 c.data.playerDirectory=[{room:'X',playerId:'2299644',profileKey:'P21|208238'}];
 assert.equal(c.withdrawalPlayerLink(form,{room:'X',playerId:'2299644'}),true);
 assert.match(source,/if\(!withdrawalPlayerLink\(form,values\)\)return;\s+values.total=total;await save/);
});

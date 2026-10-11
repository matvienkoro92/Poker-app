'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync('app-chat-user-modal.js','utf8');
const fragment=source.slice(source.indexOf('  var chatUserModalStyleReady = null;'),source.indexOf('  function waitChatUserModalAsset('));
function fixture(){let ready,opens=0;const state={Promise,chatUserModalOpenSeq:1,chatUserModalUserId:'ID1',chatUserModalAffinitySeq:1,chatUserModalEl:{classList:{contains:()=>false,add:()=>opens++},setAttribute(){}},document:{dispatchEvent(){}},CustomEvent:class{},window:{pokerEnsureStyleDomains:()=>new Promise(resolve=>{ready=resolve;})}};vm.createContext(state);vm.runInContext(fragment,state);return {state,resolve:()=>ready(),opens:()=>opens};}
test('profile reveal waits for lazy styles to finish',async()=>{const f=fixture();f.state.revealChatUserModal(1);assert.equal(f.opens(),0);f.resolve();await new Promise(setImmediate);assert.equal(f.opens(),1);});
test('a stale profile request cannot reveal after style loading',async()=>{const f=fixture();f.state.revealChatUserModal(1);f.state.chatUserModalOpenSeq=2;f.resolve();await new Promise(setImmediate);assert.equal(f.opens(),0);});

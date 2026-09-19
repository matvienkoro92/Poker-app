'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
test('profile title uses nickname and never duplicates a technical ID', () => {
  const source = fs.readFileSync(path.join(__dirname, '../app-chat-user-modal.js'), 'utf8');
  const c = { modalTitle: {}, modalAvatar: {style:{}}, modalAvatarPlaceholder: {}, modalLoginSub: {}, chatUserModalRatingNickFromData: d => d.pokerPlusNickname || '' };
  vm.createContext(c);
  vm.runInContext(source.slice(source.indexOf('  function syncChatUserModalTitleFromProfileData'), source.indexOf('  function updateChatUserModalFriendState')), c);
  assert.equal(c.syncChatUserModalTitleFromProfileData({userName:'ID403173',contactName:'ID403173',pokerPlusNickname:'EnotSimuran'}, 'ID403173'), 'EnotSimuran');
  assert.equal(c.modalLoginSub.hidden, true);
  assert.equal(c.syncChatUserModalTitleFromProfileData({userName:'ID403173'}, 'ID403173'), 'Игрок');
  assert.equal(c.syncChatUserModalTitleFromProfileData({userName:'@private_name',telegramVisible:false,pokerPlusNickname:'EnotSimuran'}, ''), 'EnotSimuran');
});
test('an incomplete account cache does not hide a nickname in its linked profile', async () => {
  const source = fs.readFileSync(path.join(__dirname, '../lib/api-handlers/users.js'), 'utf8');
  const c = {readPokerPlusProfile: async id => id==='ID403173'?{level:11}:{nickname:'EnotSimuran'}};
  vm.createContext(c);
  vm.runInContext(source.slice(source.indexOf('function uniquePokerProfileLookupIds'), source.indexOf('async function readPokerPlusStatsVisibilityFromCandidates')), c);
  assert.equal((await c.readPokerPlusProfileFromCandidates(['ID403173','telegram-linked'])).nickname, 'EnotSimuran');
});

test('profile payload prefers the current Poker21 nickname over the cached nickname', () => {
  const source = fs.readFileSync(path.join(__dirname, '../lib/api-handlers/users.js'), 'utf8');
  const applyBlock = source.slice(source.indexOf('async function applyPokerProfileStatusPayload'), source.indexOf('function sanitizeChatDisplayName'));
  assert.match(applyBlock, /getGroupMemberData\(\{ userId: payload\.p21Id \}\)/);
  assert.match(applyBlock, /payload\.pokerPlusNickname = String\(currentNickname\)/);
});

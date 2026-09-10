const { pipeline } = require('./redis');
const { sendToMemberDevices } = require('./chat-webpush-notify');
async function notifyWallFriends(accountId, post, deps = {}) {
  const redis = deps.pipeline || pipeline;
  const send = deps.send || sendToMemberDevices;
  if (!accountId || !post || !post.id) return;
  const rows = await redis([['SMEMBERS', 'poker_app:friendships:' + accountId]]);
  const friends = [...new Set((rows[0] && Array.isArray(rows[0].result) ? rows[0].result : []).map(String))].filter(id => id && id !== accountId);
  for (let i = 0; i < friends.length; i += 10) {
    await Promise.allSettled(friends.slice(i, i + 10).map(id => send(id, {
      title: 'Новая запись на стене друга',
      body: String(post.text || 'Друг опубликовал фото').slice(0, 160),
      tag: 'friend-wall-' + accountId + '-' + post.id,
      kind: 'friend-wall',
      openUrl: './?startapp=profile_friends',
      dedupeKey: 'friend-wall:' + accountId + ':' + post.id + ':' + id,
    })));
  }
}
module.exports = { notifyWallFriends };

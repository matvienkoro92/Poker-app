'use strict';

const ROOMS = new Set(['hall', 'lounge', 'garage', 'living', 'billiards']);
const PREFIX = 'poker_app:villa_start_room:';

function available(room, access) {
  return ROOMS.has(room) && (room !== 'billiards' || access.billiardsAccess === true)
    && (room !== 'living' || access.villaAccess === true);
}

async function preference({ accountId, body, billiardsAccess, villaAccess }, redis) {
  const access = { billiardsAccess, villaAccess };
  const key = PREFIX + accountId;
  if (body.room !== undefined) {
    if (!ROOMS.has(body.room)) throw Object.assign(Error('Неизвестная комната виллы'), { status: 400 });
    if (!available(body.room, access)) throw Object.assign(Error('Эта комната пока недоступна'), { status: 403 });
    await redis([['SET', key, body.room]]);
    return { ok: true, room: body.room };
  }
  const [saved] = await redis([['GET', key]]);
  return { ok: true, room: available(saved, access) ? saved : 'hall' };
}

module.exports = { preference };

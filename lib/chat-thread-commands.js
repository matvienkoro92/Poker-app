async function resolveMessageCommandThread(opts) {
  opts = opts || {};
  const withId = opts.withId;
  const myId = opts.myId;
  const admin = !!opts.admin;
  const generalKey = opts.generalKey;
  let redisKey = generalKey;

  if (withId) {
    const w = String(withId).trim();
    if (opts.isGroupChatId && opts.isGroupChatId(w)) {
      const gMeta = opts.getGroupMeta ? await opts.getGroupMeta(w) : null;
      if (!gMeta || !opts.groupMetaHasMember || !opts.groupMetaHasMember(gMeta, myId)) {
        return { ok: false, status: 403, error: "Нет доступа к группе" };
      }
      redisKey = opts.groupMsgsKey(w);
    } else {
      redisKey = opts.convKey(myId, opts.normalizePeerChatUserId(withId));
    }
  }

  if (redisKey === generalKey && opts.hasClubGeneralAccess && !(await opts.hasClubGeneralAccess(myId, admin))) {
    return { ok: false, status: 403, error: "Нет доступа к общему чату" };
  }
  return { ok: true, redisKey };
}

module.exports = {
  resolveMessageCommandThread,
};

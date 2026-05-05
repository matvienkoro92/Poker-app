function createChatDeleteHandler(deps) {
  const {
    GENERAL_KEY,
    GENERAL_PINNED_KEY,
    bumpThreadPollGen,
    convKey,
    deleteThreadMessageIndex,
    getGroupMeta,
    groupMetaHasMember,
    groupMsgsKey,
    hasClubGeneralAccess,
    isGroupChatId,
    locateThreadMessageById,
    normalizePeerChatUserId,
    normalizeStoredMessageFromId,
    redisPipeline,
    resolveMessageCommandThread,
  } = deps;

  return async function handleChatDelete(ctx) {
    const { req, res, body, myId, admin } = ctx;
    const messageIdRaw = body.messageId || body.message_id || req.query.messageId;
    const messageId = messageIdRaw != null && messageIdRaw !== "" ? String(messageIdRaw).trim() : "";
    const withId = body.with || body.conversationWith || req.query.with;
    if (!messageId) return res.status(400).json({ ok: false, error: "messageId обязателен" });

    const thread = await resolveMessageCommandThread({
      withId,
      myId,
      admin,
      generalKey: GENERAL_KEY,
      isGroupChatId,
      getGroupMeta,
      groupMetaHasMember,
      groupMsgsKey,
      convKey,
      normalizePeerChatUserId,
      hasClubGeneralAccess,
    });
    if (!thread.ok) return res.status(thread.status).json({ ok: false, error: thread.error });
    const redisKey = thread.redisKey;
    const located = await locateThreadMessageById(redisKey, messageId);
    const toRemove = located && located.found ? located.raw : null;
    const msgFrom = located && located.found && located.message ? located.message.from : null;
    if (!toRemove) return res.status(404).json({ ok: false, error: "Сообщение не найдено" });
    if (!admin && normalizeStoredMessageFromId(msgFrom) !== normalizeStoredMessageFromId(myId)) {
      return res.status(403).json({ ok: false, error: "Можно удалить только своё сообщение" });
    }

    const results2 = await redisPipeline([["LREM", redisKey, "0", toRemove]]);
    if (!results2 || results2[0]?.error) return res.status(500).json({ ok: false, error: "Ошибка удаления" });
    await deleteThreadMessageIndex(redisKey, messageId);
    await bumpThreadPollGen(redisKey);
    if (redisKey === GENERAL_KEY) {
      try {
        const pinRes = await redisPipeline([["GET", GENERAL_PINNED_KEY]]);
        const pr = pinRes && pinRes[0] && pinRes[0].result != null ? pinRes[0].result : null;
        if (pr && typeof pr === "string") {
          try {
            const p = JSON.parse(pr);
            if (p && String(p.id) === String(messageId)) {
              await redisPipeline([["DEL", GENERAL_PINNED_KEY]]);
            }
          } catch (ePin) {}
        }
      } catch (eUnpinDel) {}
    }
    return res.status(200).json({ ok: true, deleted: true });
  };
}

function createChatPatchHandler(deps) {
  const {
    BLOCKED_KEY,
    CHAT_MESSAGE_TEXT_MAX,
    CHAT_REACTION_EMOJI_ALLOWED,
    CHAT_TYPING_TTL_SEC,
    CLUB_CHAT_MEMBER_JOINED_AT_KEY,
    CLUB_CHAT_MEMBERS_KEY,
    CLUB_CHAT_PENDING_KEY,
    GENERAL_CHAT_ACCESS_REVOKED_KEY,
    GENERAL_KEY,
    GENERAL_PINNED_KEY,
    VISITORS_SET_KEY,
    buildGeneralPinnedSnapshot,
    bumpThreadPollGen,
    chatTypingKey,
    clubChatApplicationRequired,
    convKey,
    findMessageByIdTailFirst,
    getClubChatAccessState,
    getGroupMeta,
    groupMetaHasMember,
    groupMsgsKey,
    hasClubGeneralAccess,
    isAdmin: isAdminUser,
    isGroupChatId,
    locateThreadMessageById,
    normalizePeerChatUserId,
    normalizeStoredMessageFromId,
    notifyAdminsNewClubChatApplication,
    redisPipeline,
    resolveMessageCommandThread,
    writeThreadMessageIndex,
  } = deps;

  return async function handleChatPatch(ctx) {
    const { req, res, body, identity, myId, admin } = ctx;
    const action = body.action || req.query.action;

    if (action === "edit") {
      const messageIdRaw = body.messageId || body.message_id || req.query.messageId;
      const messageId = messageIdRaw != null && messageIdRaw !== "" ? String(messageIdRaw).trim() : "";
      const newText = (body.text || body.message || "").trim();
      const withId = body.with || body.conversationWith || req.query.with;
      if (!messageId) return res.status(400).json({ ok: false, error: "messageId обязателен" });
      if (!newText || newText.length > CHAT_MESSAGE_TEXT_MAX) {
        return res.status(400).json({ ok: false, error: "Текст от 1 до " + CHAT_MESSAGE_TEXT_MAX + " символов" });
      }
      const thread = await resolveMessageCommandThread({
        withId,
        myId,
        admin,
        generalKey: GENERAL_KEY,
        isGroupChatId,
        getGroupMeta,
        groupMetaHasMember,
        groupMsgsKey,
        convKey,
        normalizePeerChatUserId,
        hasClubGeneralAccess,
      });
      if (!thread.ok) return res.status(thread.status).json({ ok: false, error: thread.error });
      const redisKey = thread.redisKey;
      const located = await locateThreadMessageById(redisKey, messageId);
      let idx = located && located.found ? located.index : -1;
      let msgObj = located && located.found ? located.message : null;
      if (msgObj && normalizeStoredMessageFromId(msgObj.from) !== normalizeStoredMessageFromId(myId)) {
        return res.status(403).json({ ok: false, error: "Можно редактировать только свои сообщения" });
      }
      if (idx < 0 || !msgObj) return res.status(404).json({ ok: false, error: "Сообщение не найдено" });
      msgObj.text = newText;
      msgObj.edited = true;
      msgObj.editedAt = new Date().toISOString();
      const newStr = JSON.stringify(msgObj);
      const resSet = await redisPipeline([["LSET", redisKey, String(idx), newStr]]);
      if (!resSet || resSet[0]?.error) return res.status(500).json({ ok: false, error: "Ошибка сохранения" });
      await writeThreadMessageIndex(redisKey, msgObj, newStr);
      await bumpThreadPollGen(redisKey);
      return res.status(200).json({ ok: true, message: msgObj });
    }

    if (action === "block" || action === "unblock") {
      const targetId = (body.userId || body.targetId || req.query.userId || "").toString().trim();
      if (!admin) return res.status(403).json({ ok: false, error: "Только для админа" });
      if (!targetId || (!targetId.startsWith("tg_") && !targetId.startsWith("vk_"))) {
        return res.status(400).json({ ok: false, error: "userId обязателен (tg_… или vk_…)" });
      }
      const cmd = action === "block" ? ["SADD", BLOCKED_KEY, targetId] : ["SREM", BLOCKED_KEY, targetId];
      const resBlock = await redisPipeline([cmd]);
      if (!resBlock || resBlock[0]?.error) return res.status(500).json({ ok: false, error: "Ошибка операции" });
      return res.status(200).json({ ok: true, blocked: action === "block" });
    }

    if (action === "clubChatApply") {
      if (!clubChatApplicationRequired()) {
        const stOpen = await getClubChatAccessState(myId, false);
        if (stOpen === "revoked") {
          return res.status(200).json({ ok: true, clubChatAccess: "revoked" });
        }
        return res.status(200).json({ ok: true, clubChatAccess: "open" });
      }
      if (admin) return res.status(200).json({ ok: true, clubChatAccess: "member" });
      const st = await getClubChatAccessState(myId, false);
      if (st === "member" || st === "open") return res.status(200).json({ ok: true, clubChatAccess: st });
      if (st === "pending") return res.status(200).json({ ok: true, alreadyPending: true, clubChatAccess: "pending" });
      const r = await redisPipeline([["SADD", CLUB_CHAT_PENDING_KEY, myId]]);
      if (!r || r[0]?.error) return res.status(500).json({ ok: false, error: "Ошибка сохранения заявки" });
      const added = Number(r[0]?.result) === 1;
      if (added) {
        try {
          await notifyAdminsNewClubChatApplication(myId, identity.id, identity);
        } catch (e) {
          /* уведомление не блокирует заявку */
        }
      }
      return res.status(200).json({ ok: true, clubChatAccess: "pending" });
    }

    if (action === "clubChatApprove" || action === "clubChatReject" || action === "clubChatRevoke") {
      if (!admin) return res.status(403).json({ ok: false, error: "Только для админа" });
      const targetId = (body.userId || body.targetId || req.query.userId || "").toString().trim();
      if (!targetId || (!targetId.startsWith("tg_") && !targetId.startsWith("vk_"))) {
        return res.status(400).json({ ok: false, error: "Нужен userId вида tg_… или vk_…" });
      }
      if (isAdminUser(targetId)) return res.status(400).json({ ok: false, error: "Нельзя изменить доступ администратора" });
      if (action === "clubChatApprove") {
        const admittedAt = new Date().toISOString();
        const r = await redisPipeline([
          ["SREM", CLUB_CHAT_PENDING_KEY, targetId],
          ["SADD", CLUB_CHAT_MEMBERS_KEY, targetId],
          ["HSET", CLUB_CHAT_MEMBER_JOINED_AT_KEY, targetId, admittedAt],
        ]);
        if (!r || r.some((x) => x && x.error)) return res.status(500).json({ ok: false, error: "Ошибка Redis" });
        return res.status(200).json({ ok: true });
      }
      if (action === "clubChatReject") {
        const r = await redisPipeline([["SREM", CLUB_CHAT_PENDING_KEY, targetId]]);
        if (!r || r[0]?.error) return res.status(500).json({ ok: false, error: "Ошибка Redis" });
        return res.status(200).json({ ok: true });
      }
      if (clubChatApplicationRequired()) {
        const r = await redisPipeline([
          ["SREM", CLUB_CHAT_MEMBERS_KEY, targetId],
          ["SREM", CLUB_CHAT_PENDING_KEY, targetId],
          ["HDEL", CLUB_CHAT_MEMBER_JOINED_AT_KEY, targetId],
        ]);
        if (!r || r.some((x) => x && x.error)) return res.status(500).json({ ok: false, error: "Ошибка Redis" });
      } else {
        const r = await redisPipeline([
          ["SADD", GENERAL_CHAT_ACCESS_REVOKED_KEY, targetId],
          ["SREM", VISITORS_SET_KEY, targetId],
        ]);
        if (!r || r.some((x) => x && x.error)) return res.status(500).json({ ok: false, error: "Ошибка Redis" });
      }
      return res.status(200).json({ ok: true });
    }

    if (action === "generalPin") {
      if (!admin) return res.status(403).json({ ok: false, error: "Только для админа" });
      const withId = body.with || body.conversationWith || req.query.with;
      if (withId) return res.status(400).json({ ok: false, error: "Только для общего чата" });
      if (!(await hasClubGeneralAccess(myId, admin))) {
        return res.status(403).json({ ok: false, error: "Нет доступа к общему чату" });
      }
      const messageId = body.messageId || body.message_id || req.query.messageId;
      if (!messageId) return res.status(400).json({ ok: false, error: "messageId обязателен" });
      const found = await findMessageByIdTailFirst(GENERAL_KEY, messageId, 120);
      if (!found) return res.status(404).json({ ok: false, error: "Сообщение не найдено" });
      const snapshot = buildGeneralPinnedSnapshot(found, myId);
      if (!snapshot) return res.status(500).json({ ok: false, error: "Не удалось сохранить закрепление" });
      const resPin = await redisPipeline([["SET", GENERAL_PINNED_KEY, JSON.stringify(snapshot)]]);
      if (!resPin || resPin[0]?.error) return res.status(500).json({ ok: false, error: "Ошибка Redis" });
      return res.status(200).json({ ok: true, generalPinned: snapshot });
    }

    if (action === "generalUnpin") {
      if (!admin) return res.status(403).json({ ok: false, error: "Только для админа" });
      const withId = body.with || body.conversationWith || req.query.with;
      if (withId) return res.status(400).json({ ok: false, error: "Только для общего чата" });
      await redisPipeline([["DEL", GENERAL_PINNED_KEY]]);
      return res.status(200).json({ ok: true });
    }

    if (action === "reaction") {
      const messageIdRaw = body.messageId || body.message_id || req.query.messageId;
      const messageId = messageIdRaw != null && messageIdRaw !== "" ? String(messageIdRaw).trim() : "";
      const emoji = (body.emoji || req.query.emoji || "").toString().trim();
      const withId = body.with || body.conversationWith || req.query.with;
      if (!messageId) return res.status(400).json({ ok: false, error: "messageId обязателен" });
      if (!CHAT_REACTION_EMOJI_ALLOWED.includes(emoji)) return res.status(400).json({ ok: false, error: "Недопустимая реакция" });
      const threadReact = await resolveMessageCommandThread({
        withId,
        myId,
        admin,
        generalKey: GENERAL_KEY,
        isGroupChatId,
        getGroupMeta,
        groupMetaHasMember,
        groupMsgsKey,
        convKey,
        normalizePeerChatUserId,
        hasClubGeneralAccess,
      });
      if (!threadReact.ok) return res.status(threadReact.status).json({ ok: false, error: threadReact.error });
      const redisKeyReact = threadReact.redisKey;
      const located = await locateThreadMessageById(redisKeyReact, messageId);
      let idx = located && located.found ? located.index : -1;
      let msgObj = located && located.found ? located.message : null;
      if (idx < 0 || !msgObj) return res.status(404).json({ ok: false, error: "Сообщение не найдено" });
      if (!msgObj.reactions || typeof msgObj.reactions !== "object") msgObj.reactions = {};
      if (!Array.isArray(msgObj.reactions[emoji])) msgObj.reactions[emoji] = [];
      const arr = msgObj.reactions[emoji];
      const myIdx = arr.indexOf(myId);
      if (myIdx >= 0) {
        arr.splice(myIdx, 1);
        if (arr.length === 0) delete msgObj.reactions[emoji];
      } else {
        arr.push(myId);
      }
      const newStr = JSON.stringify(msgObj);
      const resSet = await redisPipeline([["LSET", redisKeyReact, String(idx), newStr]]);
      if (!resSet || resSet[0]?.error) return res.status(500).json({ ok: false, error: "Ошибка сохранения" });
      await writeThreadMessageIndex(redisKeyReact, msgObj, newStr);
      await bumpThreadPollGen(redisKeyReact);
      return res.status(200).json({ ok: true, message: msgObj });
    }

    if (action === "typing") {
      const withId = body.with || body.conversationWith || req.query.with;
      const activeTyping = !(body.active === false || body.active === 0 || body.active === "0" || body.active === "false");
      const targetId = withId != null ? String(withId).trim() : "";
      if (!targetId || isGroupChatId(targetId) || targetId === myId) {
        return res.status(200).json({ ok: true, typing: false });
      }
      const otherId = normalizePeerChatUserId(targetId);
      const typingKey = chatTypingKey(otherId, myId);
      const cmds = activeTyping
        ? [["SET", typingKey, "1", "EX", String(CHAT_TYPING_TTL_SEC)]]
        : [["DEL", typingKey]];
      await redisPipeline(cmds);
      return res.status(200).json({ ok: true, typing: !!activeTyping });
    }

    return res.status(400).json({
      ok: false,
      error:
        "action: edit, block, unblock, reaction, typing, generalPin, generalUnpin, clubChatApply, clubChatApprove, clubChatReject, clubChatRevoke",
    });
  };
}

module.exports = {
  createChatDeleteHandler,
  createChatPatchHandler,
};

const { normalizeChatPostMedia } = require("./chat-route-post-media");
const { createChatPostNotifyHelpers } = require("./chat-route-post-notify");

function createChatPostSendHandler(deps) {
  deps = deps || {};
  const {
    ADMIN_IDS,
    AVATAR_PREFIX,
    BLOCKED_KEY,
    BOT_TOKEN,
    CHAT_DISPLAY_NAMES_KEY,
    CHAT_DISPLAY_NAME_MAX,
    CHAT_DM_FOCUS_KEY_PREFIX,
    CHAT_GENERAL_SEEN_HASH,
    CHAT_GENERAL_UNREAD_HASH,
    CHAT_GROUP_MEMBERS_MAX,
    CHAT_LAST_SEEN_HASH,
    CHAT_MESSAGE_TEXT_MAX,
    CHAT_ONLINE_KEY,
    CHAT_SEEN_CURSOR_KEY,
    CHAT_THREAD_POLL_GEN_HASH,
    CHAT_TYPING_TTL_SEC,
    CLUB_CHAT_MEMBER_JOINED_AT_KEY,
    CLUB_CHAT_MEMBERS_KEY,
    CLUB_CHAT_PENDING_KEY,
    DT_IDS_KEY,
    FRIENDS_SET_KEY_PREFIX,
    FRIEND_ALIAS_KEY_PREFIX,
    GENERAL_CHAT_ACCESS_REVOKED_KEY,
    GENERAL_CHAT_CONTACTS_STATS_CACHE_KEY,
    GENERAL_CHAT_CONTACTS_STATS_TTL_SEC,
    GENERAL_CHAT_ROSTER_SCORE_CHUNK,
    GENERAL_KEY,
    GENERAL_PINNED_KEY,
    MAX_MESSAGES,
    MINI_APP_URL,
    OLDER_MESSAGES_BATCH,
    ONLINE_TTL_MS,
    POKERPLUS_BIND_HASH_KEY,
    PRESET_AVATAR_IDS,
    PRESET_AVATAR_SRC_BY_ID,
    PROFILE_HASH_KEY,
    RESPECT_SCORE_KEY,
    TELEGRAM_ROMAN_NUMERIC,
    USERNAMES_KEY,
    VISITORS_SET_KEY,
    applyPeerChatDisplayNamesToMessages,
    applyPeerReadReceiptsToMyMessages,
    applyViewerFriendAliasesToMessages,
    buildChatDisplayName,
    buildChatTrace,
    buildClubChatMiniAppLink,
    buildContactsMetaOnlyPayload,
    buildGeneralChatRosterPayload,
    buildGeneralChatStatsForContacts,
    buildGeneralPinnedSnapshot,
    buildGroupMembersPublicList,
    buildThreadPreviewText,
    bumpContactsUpdateRev,
    bumpGeneralLastSeen,
    bumpSeenCursor,
    bumpThreadPollGen,
    chatLastSeenIsoFromRedisRaw,
    chatMessageIsNewerThanLastViewed,
    chatMessageTimeMs,
    clubChatApplicationRequired,
    collectMessageFromIdsForAlias,
    computeContactsMetaPollRev,
    computeDmThreadPollRev,
    computeGeneralPollRev,
    computeGroupThreadPollRev,
    convKey,
    countOnlineAmongMemberIds,
    delay,
    ensureDtIdForUserId,
    enrichClubUserList,
    filterChatPartnersWithThreadContent,
    filterMessagesAfterCursor,
    findMessageByIdTailFirst,
    getAvatars,
    getChatDisplayNameMapForIds,
    getClubChatAccessState,
    getClubChatPendingCount,
    getDtIds,
    getFriendAliasMapForViewer,
    getGeneralChatRosterMemberIds,
    getGeneralLastSeen,
    getGroupMeta,
    getP21Ids,
    getPokerPlusVerifiedIds,
    getPokerProfileStatusMeta,
    getPreferredUserIdByDtId,
    getRespectScores,
    getSeenCursor,
    getVisitorChatDisplayName,
    getVisitorUsername,
    groupMetaHasMember,
    groupMetaKey,
    groupMsgsKey,
    hasClubGeneralAccess,
    incrementGeneralUnreadForRecipients,
    incrementThreadUnreadForRecipients,
    isAdmin,
    isGroupChatId,
    locateThreadMessageById,
    mergeReadCursors,
    normalizeLegacyAccountDisplayLabel,
    normalizePeerChatUserId,
    normalizeStoredMessageFromId,
    notifyAdminsNewClubChatApplication,
    pipelineCommandResults,
    pokerProfileFeeFromCachedProfile,
    pokerProfileStatusFromRakeServer,
    presetAvatarIdForAccountId,
    readContactsMetaOnlyFlag,
    readGroupMetaOnlyFlag,
    redisPipeline,
    resetGeneralUnread,
    resetThreadUnread,
    resolveChatAvatarValue,
    runAsyncChatSideEffect,
    sanitizeAvatarAccountId,
    sanitizeChatDisplayNameStored,
    sanitizeFriendContactNameForChat,
    sanitizeGroupAvatarInput,
    sanitizeGroupDescription,
    sanitizeGroupTitle,
    seenCursorField,
    sendTelegram,
    sliceMessagesBeforeCursor,
    sortContactsByLastMessageTime,
    threadMetaKeyByStorageKey,
    threadMessageIndexKey,
    touchChatLastSeenCmd,
    tryBuildFastTailResponse,
    userChatGroupsKey,
    waitForPollRevChange,
    writeThreadMessageIndex,
    writeThreadMeta,
  } = deps;

  return async function handleChatPostSend(ctx) {
    const { req, res, body, identity, myId, admin } = ctx;
      const chatPostNotify = createChatPostNotifyHelpers({
        BOT_TOKEN,
        buildClubChatMiniAppLink,
        runAsyncChatSideEffect,
        sendTelegram,
      });
      const withId = body.with || body.to || body.userId;
      const text = (body.text || body.message || "").trim();
      const media = await normalizeChatPostMedia(body, myId);
      if (media.error) return res.status(500).json({ ok: false, error: media.error });
      const { image, voice, document, documentName } = media;
      const replyTo = body.replyTo && typeof body.replyTo === "object" ? {
        id: body.replyTo.id || null,
        text: String(body.replyTo.text || "").slice(0, CHAT_MESSAGE_TEXT_MAX),
        from: body.replyTo.from || null,
        fromName: String(body.replyTo.fromName || "Игрок").slice(0, 100),
      } : null;
    
      const redisNickSender = await getVisitorUsername(myId);
      const customChatSender = await getVisitorChatDisplayName(myId);
      const senderDisplayName =
        customChatSender && String(customChatSender).trim()
          ? String(customChatSender).trim()
          : buildChatDisplayName(identity, redisNickSender);
    
      if ((!text || text.length > CHAT_MESSAGE_TEXT_MAX) && !image && !voice && !document) {
        return res.status(400).json({
          ok: false,
          error: "Текст от 1 до " + CHAT_MESSAGE_TEXT_MAX + " символов, картинка, голосовое или документ PDF",
        });
      }
      if (text && text.length > CHAT_MESSAGE_TEXT_MAX) {
        return res.status(400).json({ ok: false, error: "Текст до " + CHAT_MESSAGE_TEXT_MAX + " символов" });
      }
    
      if (withId) {
        const rawPostWith = String(withId).trim();
        if (isGroupChatId(rawPostWith)) {
          const gMetaPost = await getGroupMeta(rawPostWith);
          if (!gMetaPost || !groupMetaHasMember(gMetaPost, myId)) {
            return res.status(403).json({ ok: false, error: "Нет доступа к группе" });
          }
          const dtIdsGrp = await getDtIds([myId]);
          const msgIdG = "msg_" + Date.now() + "_" + Math.random().toString(36).slice(2, 9);
          const msgG = {
            id: msgIdG,
            from: myId,
            fromName: senderDisplayName,
            fromDtId: dtIdsGrp[myId] || null,
            text: text || "",
            time: new Date().toISOString(),
            ...(image ? { image } : {}),
            ...(voice ? { voice } : {}),
            ...(document ? { document, documentName } : {}),
            ...(replyTo && replyTo.text ? { replyTo } : {}),
          };
          const nowGrp = Date.now();
          const gKey = groupMsgsKey(rawPostWith);
          const touchGrp = touchChatLastSeenCmd(myId, nowGrp);
          const rawMsgG = JSON.stringify(msgG);
          const resultsG2 = await redisPipeline([
            ["LPUSH", gKey, rawMsgG],
            ["LTRIM", gKey, "0", String(MAX_MESSAGES - 1)],
            ["ZADD", CHAT_ONLINE_KEY, String(nowGrp), myId],
            ...(touchGrp ? [touchGrp] : []),
          ]);
          if (!resultsG2 || !Array.isArray(resultsG2) || resultsG2.some((r) => r && r.error)) {
            return res.status(500).json({ ok: false, error: "Ошибка сохранения" });
          }
          await writeThreadMessageIndex(gKey, msgG, rawMsgG);
          await writeThreadMeta(gKey, msgG);
          await bumpThreadPollGen(gKey);
          await bumpContactsUpdateRev(gMetaPost.members);
          try {
            const recipientsGrp = Array.isArray(gMetaPost.members)
              ? gMetaPost.members.map((x) => String(x).trim()).filter((rid) => rid && rid !== myId)
              : [];
            if (recipientsGrp.length) await incrementThreadUnreadForRecipients(recipientsGrp, rawPostWith);
          } catch (eUnreadGrp) {}
          const snippetG = chatPostNotify.buildSnippet({ text, image, voice, documentName });
          const membersPush = Array.isArray(gMetaPost.members)
            ? gMetaPost.members.map((x) => String(x).trim()).filter(Boolean)
            : [];
          const groupTitlePush = gMetaPost.title != null ? String(gMetaPost.title).trim() : "";
          chatPostNotify.notifyGroupWebPush({
            members: membersPush,
            senderId: myId,
            groupId: rawPostWith,
            senderName: senderDisplayName,
            snippet: snippetG,
            groupTitle: groupTitlePush,
          });
          const groupPollRevPost = await computeGroupThreadPollRev(gKey);
          return res.status(200).json({ ok: true, message: msgG, pollRev: groupPollRevPost, trace: buildChatTrace({ mode: "post_group", waited: false }) });
        }
    
        const otherId = normalizePeerChatUserId(withId);
        if (otherId === myId) return res.status(400).json({ ok: false, error: "Нельзя отправить себе" });
    
        const key = convKey(myId, otherId);
        const dtIdsForMsg = await getDtIds([myId]);
        const msgId = "msg_" + Date.now() + "_" + Math.random().toString(36).slice(2, 9);
        const msg = {
          id: msgId,
          from: myId,
          fromName: senderDisplayName,
          fromDtId: dtIdsForMsg[myId] || null,
          text: text || "",
          time: new Date().toISOString(),
          ...(image ? { image } : {}),
          ...(voice ? { voice } : {}),
          ...(document ? { document, documentName } : {}),
          ...(replyTo && replyTo.text ? { replyTo } : {}),
        };
    
        const now = Date.now();
        const cleanupRomanAlias =
          otherId === "tg_" + TELEGRAM_ROMAN_NUMERIC ? [["SREM", "poker_app:chat_partners:" + myId, "tg_roman"]] : [];
        const touchDmSend = touchChatLastSeenCmd(myId, now);
        const rawMsg = JSON.stringify(msg);
        const results = await redisPipeline([
          ["LPUSH", key, rawMsg],
          ["LTRIM", key, "0", String(MAX_MESSAGES - 1)],
          ["SADD", "poker_app:chat_partners:" + myId, otherId],
          ["SADD", "poker_app:chat_partners:" + otherId, myId],
          ["ZADD", CHAT_ONLINE_KEY, String(now), myId],
          ...(touchDmSend ? [touchDmSend] : []),
          ...cleanupRomanAlias,
        ]);
    
        if (!results || !Array.isArray(results) || results.some((r) => r && r.error)) {
          return res.status(500).json({ ok: false, error: "Ошибка сохранения" });
        }
        await writeThreadMessageIndex(key, msg, rawMsg);
        await writeThreadMeta(key, msg);
        await bumpThreadPollGen(key);
        await bumpContactsUpdateRev([myId, otherId]);
        try {
          await incrementThreadUnreadForRecipients([otherId], myId);
        } catch (eUnreadDm) {}
    
        chatPostNotify.notifyTelegramDm({
          recipientId: otherId,
          senderName: senderDisplayName,
          text,
          image,
          voice,
          documentName,
        });
    
        const snippet = chatPostNotify.buildSnippet({ text, image, voice, documentName });
        chatPostNotify.notifyDmWebPush({
          recipientId: otherId,
          senderId: myId,
          senderName: senderDisplayName,
          snippet,
        });
    
        const dmPollRevPost = await computeDmThreadPollRev(key, myId, otherId);
        return res.status(200).json({ ok: true, message: msg, pollRev: dmPollRevPost, trace: buildChatTrace({ mode: "post_dm", waited: false }) });
      }
    
      const blockedCheck = await redisPipeline([["SISMEMBER", BLOCKED_KEY, myId]]);
      const amBlocked = blockedCheck && blockedCheck[0] && blockedCheck[0].result === 1;
      if (amBlocked) return res.status(403).json({ ok: false, error: "Вы заблокированы в чате" });
    
      if (!(await hasClubGeneralAccess(myId, admin))) {
        const stPost = await getClubChatAccessState(myId, admin);
        if (stPost === "revoked") {
          return res.status(403).json({ ok: false, error: "Доступ к общему чату отозван администратором." });
        }
        return res.status(403).json({
          ok: false,
          error: clubChatApplicationRequired()
            ? "Нет доступа к общему чату. Подайте заявку и дождитесь одобрения."
            : "Нет доступа к общему чату.",
        });
      }
    
      const dtIds = await getDtIds([myId]);
      const msgId = "msg_" + Date.now() + "_" + Math.random().toString(36).slice(2, 9);
      const msg = {
        id: msgId,
        from: myId,
        fromName: senderDisplayName,
        fromDtId: dtIds[myId] || null,
        text: text || "",
        time: new Date().toISOString(),
        ...(image ? { image } : {}),
        ...(voice ? { voice } : {}),
        ...(document ? { document, documentName } : {}),
        ...(replyTo && replyTo.text ? { replyTo } : {}),
      };
    
      const now = Date.now();
      const touchPostGen = touchChatLastSeenCmd(myId, now);
      const rawGeneralMsg = JSON.stringify(msg);
      const results = await redisPipeline([
        ["LPUSH", GENERAL_KEY, rawGeneralMsg],
        ["LTRIM", GENERAL_KEY, "0", String(MAX_MESSAGES - 1)],
        ["ZADD", CHAT_ONLINE_KEY, String(now), myId],
        ...(touchPostGen ? [touchPostGen] : []),
      ]);
    
      if (!results || !Array.isArray(results) || results.some((r) => r && r.error)) {
        return res.status(500).json({ ok: false, error: "Ошибка сохранения" });
      }
      await writeThreadMessageIndex(GENERAL_KEY, msg, rawGeneralMsg);
      await writeThreadMeta(GENERAL_KEY, msg);
      try {
        const rosterIds = await getGeneralChatRosterMemberIds(myId, admin);
        const recipientsGeneral = (rosterIds && Array.isArray(rosterIds.memberIds) ? rosterIds.memberIds : []).filter((id) => id && id !== myId);
        if (recipientsGeneral.length) await incrementGeneralUnreadForRecipients(recipientsGeneral);
      } catch (eUnreadGeneral) {}
    
      const snippet = chatPostNotify.buildSnippet({ text, image, voice, documentName });
      chatPostNotify.notifyGeneralWebPush({
        senderId: myId,
        senderName: senderDisplayName,
        snippet,
      });
    
      const generalPollRevPost = await computeGeneralPollRev(myId, admin);
      return res.status(200).json({ ok: true, message: msg, pollRev: generalPollRevPost, trace: buildChatTrace({ mode: "post_general", waited: false }) });
  };
}

module.exports = {
  createChatPostSendHandler,
};

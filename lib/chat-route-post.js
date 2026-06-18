const { createChatPostGroupCommandHandler } = require("./chat-route-post-groups");
const { createChatPostSendHandler } = require("./chat-route-post-send");

function createChatPostHandler(deps) {
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

  const handleChatPostGroupCommand = createChatPostGroupCommandHandler(deps);
  const handleChatPostSend = createChatPostSendHandler(deps);

  return async function handleChatPost(ctx) {
      const { req, res, body, identity, myId, admin } = ctx;
      // POST
      const postAction = String(body.action || "")
        .trim()
        .toLowerCase()
        .replace(/_/g, "");
      if (postAction === "dmfocusping") {
        const focusWith = body.with || body.other || body.peer || body.userId;
        const peer = focusWith ? normalizePeerChatUserId(String(focusWith).trim()) : "";
        if (!peer || peer === myId) {
          await redisPipeline([["DEL", CHAT_DM_FOCUS_KEY_PREFIX + myId]]);
        } else {
          await redisPipeline([["SET", CHAT_DM_FOCUS_KEY_PREFIX + myId, peer, "EX", "55"]]);
        }
        return res.status(200).json({ ok: true });
      }
      if (postAction === "dmfocusclear") {
        await redisPipeline([["DEL", CHAT_DM_FOCUS_KEY_PREFIX + myId]]);
        return res.status(200).json({ ok: true });
      }
      if (postAction === "dmblock" || postAction === "dmunblock" || postAction === "dmblockstatus") {
        const rawTarget = body.userId || body.targetId || body.with || body.peer || "";
        const targetId = rawTarget != null ? normalizePeerChatUserId(String(rawTarget).trim()) : "";
        if (!targetId || targetId === myId) {
          return res.status(400).json({ ok: false, error: "userId обязателен" });
        }
        const key = "poker_app:chat_user_blocks:" + myId;
        const commands = postAction === "dmblockstatus"
          ? [["SISMEMBER", key, targetId]]
          : [
              postAction === "dmblock" ? ["SADD", key, targetId] : ["SREM", key, targetId],
              ["SISMEMBER", key, targetId],
            ];
        const blockRes = await redisPipeline(commands);
        const blockRows = blockRes && !Array.isArray(blockRes) && Array.isArray(blockRes.result) ? blockRes.result : blockRes;
        if (!blockRows || !Array.isArray(blockRows) || blockRows.some((r) => r && r.error)) {
          return res.status(500).json({ ok: false, error: "Ошибка операции" });
        }
        if (postAction !== "dmblockstatus") await bumpContactsUpdateRev([myId, targetId]);
        const statusIndex = postAction === "dmblockstatus" ? 0 : 1;
        return res.status(200).json({
          ok: true,
          userId: targetId,
          blockedByMe: blockRows[statusIndex] && Number(blockRows[statusIndex].result) === 1,
        });
      }
      const groupCommandResponse = await handleChatPostGroupCommand(ctx, postAction);
      if (groupCommandResponse) return groupCommandResponse;

      return handleChatPostSend(ctx);

  };
}

module.exports = {
  createChatPostHandler,
};

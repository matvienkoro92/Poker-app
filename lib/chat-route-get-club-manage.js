function createChatGetClubManageHandler(deps) {
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


  return async function handleChatGetClubManage(ctx, opts) {
    opts = opts || {};
    const { res, myId, admin } = ctx;
    const { mode } = opts;
    if (mode !== "clubChatManage") return null;
          if (!admin) return res.status(403).json({ ok: false, error: "Только для админа" });
          const [pendRes, memRes] = await Promise.all([
            redisPipeline([["SMEMBERS", CLUB_CHAT_PENDING_KEY]]),
            redisPipeline([["SMEMBERS", CLUB_CHAT_MEMBERS_KEY]]),
          ]);
          const pendingIds = Array.isArray(pendRes?.[0]?.result) ? pendRes[0].result : [];
          const memberIds = Array.isArray(memRes?.[0]?.result) ? memRes[0].result : [];
          const lookupIds = Array.from(new Set(pendingIds.concat(memberIds).map((id) => String(id || "").trim()).filter(Boolean)));
          const [namesRes, joinRes] = lookupIds.length
            ? await Promise.all([
                redisPipeline([["HMGET", "poker_app:visitor_usernames", ...lookupIds]]),
                redisPipeline([["HMGET", CLUB_CHAT_MEMBER_JOINED_AT_KEY, ...lookupIds]]),
              ])
            : [[], []];
          const ur = namesRes?.[0]?.result;
          let usernames = {};
          if (Array.isArray(ur)) {
            for (let i = 0; i < ur.length; i += 1) {
              if (lookupIds[i] && ur[i]) usernames[lookupIds[i]] = String(ur[i]).trim();
            }
          }
          const jr = joinRes?.[0]?.result;
          const joinedAtByUser = {};
          if (Array.isArray(jr)) {
            for (let i = 0; i < jr.length; i += 1) {
              if (lookupIds[i]) joinedAtByUser[lookupIds[i]] = String(jr[i] || "").trim();
            }
          }
          const pending = await enrichClubUserList(pendingIds, usernames);
          const adminIdsNormalized = ADMIN_IDS.map((id) => (String(id).startsWith("tg_") ? String(id) : "tg_" + id));
          const adminSet = new Set(adminIdsNormalized);
          const inChatCount = new Set([...adminIdsNormalized, ...memberIds]).size;
          const adminsInChat = adminIdsNormalized
            .map((id) => ({
              userId: id,
              name: usernames[id] ? "@" + usernames[id] : id,
              isAdmin: true,
              joinedAt: null,
            }))
            .sort((a, b) => (a.name || "").localeCompare(b.name || "", "ru"));
          const memberOnlyEnriched = await enrichClubUserList(
            memberIds.filter((id) => id && !adminSet.has(id)),
            usernames
          );
          const membersPlain = memberOnlyEnriched.map((u) => ({
            ...u,
            isAdmin: false,
            joinedAt: joinedAtByUser[u.userId] || null,
          }));
          membersPlain.sort((a, b) => {
            const ma = chatMessageTimeMs(a.joinedAt);
            const mb = chatMessageTimeMs(b.joinedAt);
            const na = Number.isNaN(ma);
            const nb = Number.isNaN(mb);
            if (na && nb) return (a.name || "").localeCompare(b.name || "", "ru");
            if (na) return 1;
            if (nb) return -1;
            return ma - mb;
          });
          const inChat = [...adminsInChat, ...membersPlain];
          return res.status(200).json({
            ok: true,
            pending,
            pendingCount: pending.length,
            inChat,
            inChatCount,
            gateEnabled: clubChatApplicationRequired(),
          });

    return null;
  };
}

module.exports = {
  createChatGetClubManageHandler,
};

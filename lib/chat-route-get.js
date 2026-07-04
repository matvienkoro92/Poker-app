const { createChatGetUpdatesHandler } = require("./chat-route-get-updates");
const { createChatGetContactsHandler } = require("./chat-route-get-contacts");
const { createChatGetThreadHandler } = require("./chat-route-get-thread");
const { createChatGetClubManageHandler } = require("./chat-route-get-club-manage");
const { createChatGetGeneralHandler } = require("./chat-route-get-general");

function parseUnreadCount(raw) {
  if (raw == null || raw === false) return 0;
  const n = parseInt(String(raw), 10);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

function sumUnreadHash(raw) {
  if (!raw) return 0;
  if (Array.isArray(raw)) {
    let sum = 0;
    for (let i = 1; i < raw.length; i += 2) sum += parseUnreadCount(raw[i]);
    return sum;
  }
  if (typeof raw === "object") {
    return Object.keys(raw).reduce((sum, key) => sum + parseUnreadCount(raw[key]), 0);
  }
  return 0;
}

function createChatGetHandler(deps) {
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
    unreadHashKey,
    userChatGroupsKey,
    waitForPollRevChange,
    writeThreadMessageIndex,
    writeThreadMeta,
  } = deps;

  const handleChatGetUpdates = createChatGetUpdatesHandler(deps);
  const handleChatGetContacts = createChatGetContactsHandler(deps);
  const handleChatGetThread = createChatGetThreadHandler(deps);
  const handleChatGetClubManage = createChatGetClubManageHandler(deps);
  const handleChatGetGeneral = createChatGetGeneralHandler(deps);

  return async function handleChatGet(ctx) {
      const { req, res, body, identity, myId, admin } = ctx;
        const withId = req.query.with || req.query.other;
        const mode = req.query.mode || body.mode;
        const afterIdRaw = req.query.afterId != null ? String(req.query.afterId).trim() : "";
        const afterTimeRaw = req.query.afterTime != null ? String(req.query.afterTime).trim() : "";
        const beforeIdRaw = req.query.beforeId != null ? String(req.query.beforeId).trim() : "";
        const beforeTimeRaw = req.query.beforeTime != null ? String(req.query.beforeTime).trim() : "";
        const waitForChange = req.query.wait === "1" || req.query.wait === "true";
        const waitTimeoutMs = Math.min(20000, Math.max(1000, parseInt(String(req.query.waitTimeoutMs || "18000"), 10) || 18000));
          const fastOpenThread = req.query.fastOpen === "1" || req.query.fastOpen === "true";
          const messagesBare = req.query.messagesBare === "1" || req.query.messagesBare === "true";
    
        if (mode === "homeSummary") {
          let lastViewed = {};
          try {
            const lv = req.query.lastViewed;
            if (lv && typeof lv === "string") lastViewed = JSON.parse(lv);
          } catch (e) {}
          const unreadRows = await redisPipeline([
            ["HGETALL", unreadHashKey(myId)],
            ["HGET", CHAT_GENERAL_UNREAD_HASH, myId],
            ["HGET", CHAT_GENERAL_SEEN_HASH, myId],
          ]);
          const personalUnreadTotal = sumUnreadHash(unreadRows && unreadRows[0] && unreadRows[0].result);
          let generalUnreadCount = parseUnreadCount(unreadRows && unreadRows[1] && unreadRows[1].result);
          const serverGenLv = unreadRows && unreadRows[2] && unreadRows[2].result != null
            ? String(unreadRows[2].result).trim()
            : "";
          const clientGenLv = lastViewed.general != null ? String(lastViewed.general) : "";
          const lastViewGeneralMerged = mergeReadCursors(clientGenLv, serverGenLv);
          if (!lastViewGeneralMerged || String(lastViewGeneralMerged).trim() === "") generalUnreadCount = 0;
          if (!admin && !(await hasClubGeneralAccess(myId, admin))) generalUnreadCount = 0;
          let clubChatPendingReviewCount = 0;
          if (admin && clubChatApplicationRequired()) {
            clubChatPendingReviewCount = await getClubChatPendingCount();
          }
          return res.status(200).json({
            ok: true,
            homeSummary: true,
            isAdmin: admin,
            generalUnreadCount,
            personalUnreadTotal,
            personalUnreadCount: personalUnreadTotal,
            unreadTotal: generalUnreadCount + personalUnreadTotal,
            clubChatPendingReviewCount,
            trace: buildChatTrace({ mode: "home-summary", waited: false }),
          });
        }

        const updatesResponse = await handleChatGetUpdates(ctx, { mode, waitForChange, waitTimeoutMs });
        if (updatesResponse) return updatesResponse;

        const threadResponse = await handleChatGetThread(ctx, {
          withId,
          afterIdRaw,
          afterTimeRaw,
          beforeIdRaw,
          beforeTimeRaw,
          waitForChange,
          waitTimeoutMs,
          fastOpenThread,
          messagesBare,
        });
        if (threadResponse) return threadResponse;

    
        if (mode === "adminOnline") {
          const now = Date.now();
          const minScore = now - ONLINE_TTL_MS;
          const adminIds = ADMIN_IDS.map((id) => (id.startsWith("tg_") ? id : "tg_" + id));
          const touchAdm = touchChatLastSeenCmd(myId, now);
          const scoreCmds = [
            ["ZADD", CHAT_ONLINE_KEY, String(now), myId],
            ["ZREMRANGEBYSCORE", CHAT_ONLINE_KEY, "-inf", String(minScore)],
            ...(touchAdm ? [touchAdm] : []),
            ...adminIds.flatMap((id) => [["ZSCORE", CHAT_ONLINE_KEY, id]]),
          ];
          const scoreResults = await redisPipeline(scoreCmds);
          const onlineAdminIds = [];
          if (scoreResults && Array.isArray(scoreResults) && scoreResults.length >= 2) {
            const scores = scoreResults.slice(touchAdm ? 3 : 2);
            adminIds.forEach((id, i) => {
              const s = scores[i]?.result;
              if (s != null && parseFloat(s) >= minScore) onlineAdminIds.push(id);
            });
          }
          return res.status(200).json({ ok: true, onlineAdminIds });
        }
    
    
        const clubManageResponse = await handleChatGetClubManage(ctx, { mode });
        if (clubManageResponse) return clubManageResponse;

        const generalResponse = await handleChatGetGeneral(ctx, {
          mode,
          afterIdRaw,
          afterTimeRaw,
          beforeIdRaw,
          beforeTimeRaw,
          waitForChange,
          waitTimeoutMs,
        });
        if (generalResponse) return generalResponse;

        return handleChatGetContacts(ctx, { waitForChange, waitTimeoutMs });

  };
}

module.exports = {
  createChatGetHandler,
};

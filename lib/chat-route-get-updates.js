function createChatGetUpdatesHandler(deps) {
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

  return async function handleChatGetUpdates(ctx, opts) {
    opts = opts || {};
    const { req, res, body, identity, myId, admin } = ctx;
    const mode = opts.mode;
    const waitForChange = !!opts.waitForChange;
    const waitTimeoutMs = opts.waitTimeoutMs;
        if (mode === "updates") {
          const threadScope = String(req.query.threadScope || "").trim();
          const threadIdRaw = String(req.query.threadId || "").trim();
          const threadSinceRev = String(req.query.threadRev || "").trim();
          const contactsSinceRev = String(req.query.contactsRev || "").trim();
    
          async function buildUpdatesPollState() {
            let threadPollRev = "";
            let threadChanged = false;
            let threadAllowed = false;
            if (threadScope === "general") {
              const accessUpd = await getClubChatAccessState(myId, admin);
              threadPollRev = await computeGeneralPollRev(myId, admin, accessUpd);
              threadAllowed = true;
              threadChanged = !!(threadSinceRev && threadPollRev && threadSinceRev !== threadPollRev);
            } else if (threadScope === "personal" && threadIdRaw) {
              if (isGroupChatId(threadIdRaw)) {
                const metaUpd = await getGroupMeta(threadIdRaw);
                if (metaUpd && groupMetaHasMember(metaUpd, myId)) {
                  threadPollRev = await computeGroupThreadPollRev(groupMsgsKey(threadIdRaw));
                  threadAllowed = true;
                  threadChanged = !!(threadSinceRev && threadPollRev && threadSinceRev !== threadPollRev);
                }
              } else {
                const otherUpd = normalizePeerChatUserId(threadIdRaw);
                if (otherUpd && otherUpd !== myId) {
                  const keyUpd = convKey(myId, otherUpd);
                  threadPollRev = await computeDmThreadPollRev(keyUpd, myId, otherUpd);
                  threadAllowed = true;
                  threadChanged = !!(threadSinceRev && threadPollRev && threadSinceRev !== threadPollRev);
                }
              }
            }
            const contactsMetaPayload = contactsSinceRev ? await buildContactsMetaOnlyPayload(myId, admin, req) : null;
            const contactsPollRev = contactsMetaPayload ? computeContactsMetaPollRev(contactsMetaPayload) : "";
            const contactsChanged = !!(contactsSinceRev && contactsPollRev && contactsSinceRev !== contactsPollRev);
            return {
              threadAllowed,
              threadPollRev,
              contactsPollRev,
              changed: {
                thread: threadChanged,
                contacts: contactsChanged,
              },
            };
          }
    
          let updatesState = await buildUpdatesPollState();
          if (
            waitForChange &&
            !updatesState.changed.thread &&
            !updatesState.changed.contacts &&
            (threadSinceRev || contactsSinceRev)
          ) {
            const waitResUpdates = await waitForPollRevChange(
              async () => {
                const nextState = await buildUpdatesPollState();
                updatesState = nextState;
                return [
                  nextState.threadAllowed ? nextState.threadPollRev : "",
                  nextState.contactsPollRev || "",
                ].join("||");
              },
              [
                updatesState.threadAllowed ? updatesState.threadPollRev : "",
                updatesState.contactsPollRev || "",
              ].join("||"),
              waitTimeoutMs,
              450
            );
            if (!waitResUpdates.changed) {
              return res.status(200).json({
                ok: true,
                updates: true,
                notModified: true,
                threadPollRev: updatesState.threadPollRev || "",
                contactsPollRev: updatesState.contactsPollRev || "",
                waited: true,
                trace: buildChatTrace({ mode: "updates", waited: true }),
              });
            }
          }
          return res.status(200).json({
            ok: true,
            updates: true,
            changed: updatesState.changed,
            threadPollRev: updatesState.threadPollRev || "",
            contactsPollRev: updatesState.contactsPollRev || "",
            waited: !!waitForChange,
            trace: buildChatTrace({ mode: "updates", waited: !!waitForChange }),
          });
        }
    

    return null;
  };
}

module.exports = {
  createChatGetUpdatesHandler,
};

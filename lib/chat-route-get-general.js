function createChatGetGeneralHandler(deps) {
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


  return async function handleChatGetGeneral(ctx, opts) {
    opts = opts || {};
    const { req, res, myId, admin } = ctx;
    const { mode, afterIdRaw, afterTimeRaw, beforeIdRaw, beforeTimeRaw, waitForChange, waitTimeoutMs } = opts;
    if (mode !== "general") return null;
          const clubChatAccess = await getClubChatAccessState(myId, admin);
          const includeRoster = req.query.includeRoster === "1" || req.query.roster === "1";
          const wantPoll = String(req.query.poll || "") === "1";
          const sinceRev = String(req.query.sinceRev || "").trim();
          let pollRevPre = null;
          if (wantPoll) {
            pollRevPre = await computeGeneralPollRev(myId, admin, clubChatAccess);
            if (sinceRev && pollRevPre && sinceRev === pollRevPre) {
              if (waitForChange) {
                const waitResGeneral = await waitForPollRevChange(
                  () => computeGeneralPollRev(myId, admin, clubChatAccess),
                  pollRevPre,
                  waitTimeoutMs,
                  400
                );
                if (!waitResGeneral.changed) {
                    return res.status(200).json({ ok: true, notModified: true, pollRev: waitResGeneral.pollRev || pollRevPre, waited: true, trace: buildChatTrace({ mode: "general", waited: true }) });
                }
                pollRevPre = waitResGeneral.pollRev || pollRevPre;
              } else {
                return res.status(200).json({ ok: true, notModified: true, pollRev: pollRevPre });
              }
            }
          }
          const now = Date.now();
          const minScore = now - ONLINE_TTL_MS;
          const touchGen = touchChatLastSeenCmd(myId, now);
          const wantsOlderGeneral = !!(beforeIdRaw || beforeTimeRaw);
          const canTryFastTailGeneral = !wantsOlderGeneral && !!(afterIdRaw || afterTimeRaw);
          const fastTailGeneral = canTryFastTailGeneral
            ? await tryBuildFastTailResponse(GENERAL_KEY, afterIdRaw, afterTimeRaw, MAX_MESSAGES)
            : null;
          const needPendingBadge = admin && clubChatApplicationRequired();
          const [msgResults, blockedResults, onlineResults, pendingCountPipe, pinnedResults] = await Promise.all([
            redisPipeline([
              ["LRANGE", GENERAL_KEY, "0", wantsOlderGeneral || !fastTailGeneral ? "-1" : String(MAX_MESSAGES - 1)],
              ["LLEN", GENERAL_KEY],
            ]),
            redisPipeline([["SMEMBERS", BLOCKED_KEY]]),
            redisPipeline([
              ["ZADD", CHAT_ONLINE_KEY, String(now), myId],
              ["ZREMRANGEBYSCORE", CHAT_ONLINE_KEY, "-inf", String(minScore)],
              ...(touchGen ? [touchGen] : []),
              ["ZCOUNT", CHAT_ONLINE_KEY, String(minScore), "+inf"],
            ]),
            needPendingBadge ? redisPipeline([["SCARD", CLUB_CHAT_PENDING_KEY]]) : Promise.resolve([{ result: 0 }]),
            redisPipeline([["GET", GENERAL_PINNED_KEY]]),
          ]);
          const clubChatPendingReviewCount =
            needPendingBadge && pendingCountPipe && pendingCountPipe[0] && pendingCountPipe[0].result != null
              ? Number(pendingCountPipe[0].result) || 0
              : 0;
          const zcIdx = touchGen ? 3 : 2;
          const onlineCount =
            onlineResults && onlineResults[zcIdx] && typeof onlineResults[zcIdx].result === "number"
              ? onlineResults[zcIdx].result
              : 0;
          if (!admin && !(await hasClubGeneralAccess(myId, admin))) {
            return res.status(200).json({
              ok: true,
              messages: [],
              isAdmin: admin,
              participantsCount: 0,
              onlineCount,
              clubChatAccess,
              clubChatPendingReviewCount,
              generalPinned: null,
              generalMembers: includeRoster ? [] : undefined,
              pollRev: pollRevPre,
            });
          }
          let listResp = msgResults;
          if (msgResults && typeof msgResults === "object" && !Array.isArray(msgResults) && Array.isArray(msgResults.result)) {
            listResp = msgResults.result;
          }
          let raw = [];
          let totalMessagesGeneral = 0;
          if (listResp && Array.isArray(listResp)) {
            const first = listResp[0];
            if (first && first.error) {
              return res.status(500).json({ ok: false, error: "Ошибка загрузки сообщений" });
            }
            raw = Array.isArray(first?.result) ? first.result : (typeof first?.result === "string" ? [first.result] : []);
            totalMessagesGeneral =
              listResp[1] && listResp[1].result != null
                ? Math.max(0, parseInt(String(listResp[1].result), 10) || 0)
                : 0;
          }
          const blockedSet = new Set(Array.isArray(blockedResults?.[0]?.result) ? blockedResults[0].result : []);
          const messages = (Array.isArray(raw) ? raw : [])
            .map((s) => {
              try {
                return typeof s === "string" ? JSON.parse(s) : null;
              } catch (e) {
                return null;
              }
            })
            .filter(Boolean)
            .map((m) => {
              if (m && m.from != null && m.from !== "") m.from = normalizeStoredMessageFromId(m.from);
              return m;
            })
            .filter((m) => !m.from || !blockedSet.has(m.from))
            .reverse();
          const seen = new Set();
          const deduped = messages.filter((m) => {
            const key =
              m.id !== null && m.id !== undefined && m.id !== ""
                ? String(m.id)
                : m.from + "|" + (m.time || "") + "|" + (m.text || "");
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });
          const participantsSet = new Set(deduped.map((m) => m.from).filter(Boolean));
          const fromIds = [...participantsSet];
          const [dtIds, avatars, p21Ids, verifiedIds, respectScores, statusMeta] = await Promise.all([
            getDtIds(fromIds),
            getAvatars(fromIds),
            getP21Ids(fromIds),
            getPokerPlusVerifiedIds(fromIds),
            getRespectScores(fromIds),
            getPokerProfileStatusMeta(fromIds),
          ]);
          deduped.forEach((m) => {
            if (m.from) {
              if (dtIds[m.from]) m.fromDtId = dtIds[m.from];
              if (avatars[m.from]) m.fromAvatar = avatars[m.from];
              if (p21Ids[m.from]) m.fromP21Id = p21Ids[m.from];
              m.fromPokerPlusVerified = !!verifiedIds[m.from];
              m.fromRespect = respectScores[m.from] != null ? respectScores[m.from] : 0;
              if (statusMeta[m.from]) {
                m.fromStatusLevel = statusMeta[m.from].level;
                m.fromStatusValue = statusMeta[m.from].valuePercent;
              } else if (m.fromPokerPlusVerified) {
                m.fromStatusLevel = 1;
                m.fromStatusValue = 0;
              }
              m.fromAdmin = isAdmin(m.from);
            }
          });
          const idsAliasGen = collectMessageFromIdsForAlias(deduped);
          const displayMapGen = await getChatDisplayNameMapForIds(idsAliasGen);
          applyPeerChatDisplayNamesToMessages(deduped, displayMapGen);
          const aliasMapGen = await getFriendAliasMapForViewer(myId, idsAliasGen);
          applyViewerFriendAliasesToMessages(deduped, aliasMapGen);
          const trackSeenGeneral = req.query.trackSeen !== "0" && req.query.trackSeen !== "false";
          const latestInGeneral = deduped.length ? deduped[deduped.length - 1].time : null;
          if (trackSeenGeneral && latestInGeneral) await bumpGeneralLastSeen(myId, String(latestInGeneral).trim());
          let generalPinned = null;
          let pinnedRaw = null;
          if (pinnedResults && Array.isArray(pinnedResults) && pinnedResults[0] && pinnedResults[0].result != null) {
            pinnedRaw = pinnedResults[0].result;
          }
          if (pinnedRaw != null && pinnedRaw !== "") {
            if (typeof pinnedRaw !== "string") {
              try {
                await redisPipeline([["DEL", GENERAL_PINNED_KEY]]);
              } catch (eBadPin) {}
            } else {
              try {
                const p = JSON.parse(pinnedRaw);
                if (p && p.id != null && p.id !== "") {
                  const idStr = String(p.id);
                  if (deduped.some((m) => m && String(m.id) === idStr)) {
                    generalPinned = {
                      ...p,
                      own: normalizeStoredMessageFromId(p.from) === normalizeStoredMessageFromId(myId),
                    };
                    if (
                      generalPinned.imageSrc &&
                      String(generalPinned.imageSrc).trim() &&
                      !generalPinned.hasImage
                    ) {
                      generalPinned.hasImage = true;
                    }
                  } else {
                    await redisPipeline([["DEL", GENERAL_PINNED_KEY]]);
                  }
                } else {
                  await redisPipeline([["DEL", GENERAL_PINNED_KEY]]);
                }
              } catch (eParse) {
                try {
                  await redisPipeline([["DEL", GENERAL_PINNED_KEY]]);
                } catch (eDelCorrupt) {}
              }
            }
          }
          if (generalPinned && generalPinned.from) {
            const pn = normalizeStoredMessageFromId(generalPinned.from);
            if (pn) {
              const pinDisp = await getChatDisplayNameMapForIds([pn]);
              if (pinDisp[pn]) generalPinned.fromName = pinDisp[pn];
              if (aliasMapGen[pn]) generalPinned.fromName = aliasMapGen[pn];
            }
          }
          let roster = null;
          if (includeRoster) roster = await buildGeneralChatRosterPayload(myId, admin);
          const generalStats = includeRoster
            ? roster
            : await buildGeneralChatStatsForContacts(myId, admin);
          let outMessagesGen = fastTailGeneral ? fastTailGeneral.messages : filterMessagesAfterCursor(deduped, afterIdRaw, afterTimeRaw);
          let hasMoreBeforeGen = totalMessagesGeneral > deduped.length ? true : totalMessagesGeneral > outMessagesGen.length;
          if (wantsOlderGeneral) {
            const olderSliceGen = sliceMessagesBeforeCursor(deduped, beforeIdRaw, beforeTimeRaw, OLDER_MESSAGES_BATCH);
            outMessagesGen = olderSliceGen.messages;
            hasMoreBeforeGen = olderSliceGen.hasMoreBefore;
          }
          return res.status(200).json({
            ok: true,
            messages: outMessagesGen,
            partial: !!(afterIdRaw || afterTimeRaw || beforeIdRaw || beforeTimeRaw),
            hasMoreBefore: !!hasMoreBeforeGen,
            isAdmin: admin,
            participantsCount: generalStats.participantsCount != null
              ? generalStats.participantsCount
              : generalStats.generalChatParticipantsCount,
            onlineCount: generalStats.onlineCount != null
              ? generalStats.onlineCount
              : generalStats.generalChatOnlineCount,
            clubChatAccess,
            clubChatPendingReviewCount,
            generalPinned,
            generalMembers: includeRoster && roster ? roster.generalMembers : undefined,
            pollRev: pollRevPre,
            trace: buildChatTrace({ mode: "general", waited: false }),
          });

    return null;
  };
}

module.exports = {
  createChatGetGeneralHandler,
};

const CHAT_MESSAGE_USER_FIELDS_FOR_RESPONSE = [
  "fromName",
  "fromDtId",
  "fromAvatar",
  "fromP21Id",
  "fromPokerPlusVerified",
  "fromRespect",
  "fromStatusLevel",
  "fromStatusValue",
  "fromAdmin",
];

function wantChatUsersByIdPayload(req) {
  return req && req.query && (req.query.usersById === "1" || req.query.usersById === "true");
}

function buildUsersByIdFromChatMessages(messages) {
  const usersById = {};
  const list = Array.isArray(messages) ? messages : [];
  list.forEach((msg) => {
    if (!msg || msg.from == null || msg.from === "") return;
    const id = String(msg.from);
    const row = usersById[id] || (usersById[id] = {});
    CHAT_MESSAGE_USER_FIELDS_FOR_RESPONSE.forEach((key) => {
      if (msg[key] != null) row[key] = msg[key];
    });
    if (msg.fromName != null) row.name = msg.fromName;
  });
  return usersById;
}

function stripChatMessageUserFields(message) {
  if (!message || typeof message !== "object") return message;
  const out = { ...message };
  CHAT_MESSAGE_USER_FIELDS_FOR_RESPONSE.forEach((key) => {
    delete out[key];
  });
  return out;
}

function prepareChatMessagesUsersByIdResponse(messages, sourceMessages, req) {
  if (!wantChatUsersByIdPayload(req)) return { messages, usersById: undefined };
  return {
    messages: (Array.isArray(messages) ? messages : []).map(stripChatMessageUserFields),
    usersById: buildUsersByIdFromChatMessages(sourceMessages || messages),
  };
}

function createChatGetThreadHandler(deps) {
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

    return async function handleChatGetThread(ctx, opts) {
      opts = opts || {};
      const { req, res, myId, admin } = ctx;
      const {
        withId,
        afterIdRaw,
        afterTimeRaw,
        beforeIdRaw,
        beforeTimeRaw,
        waitForChange,
        waitTimeoutMs,
        fastOpenThread,
        messagesBare,
      } = opts;
      if (!withId) return null;
          const rawWith = String(withId).trim();
          if (isGroupChatId(rawWith)) {
            const groupId = rawWith;
            const meta = await getGroupMeta(groupId);
            if (!meta || !groupMetaHasMember(meta, myId)) {
              return res.status(403).json({ ok: false, error: "Нет доступа к этой группе" });
            }
            const metaOnly = readGroupMetaOnlyFlag(req);
            if (metaOnly) {
              const nowM = Date.now();
              const minScoreM = nowM - ONLINE_TTL_MS;
              const touchM = touchChatLastSeenCmd(myId, nowM);
              await redisPipeline([
                ["ZADD", CHAT_ONLINE_KEY, String(nowM), myId],
                ["ZREMRANGEBYSCORE", CHAT_ONLINE_KEY, "-inf", String(minScoreM)],
                ...(touchM ? [touchM] : []),
              ]);
              const membersList = await buildGroupMembersPublicList(
                myId,
                meta.members,
                minScoreM,
                meta.createdBy,
              );
              const groupTitleMeta = meta.title != null ? String(meta.title).trim() : "Группа";
              const groupDescMeta = sanitizeGroupDescription(meta.description != null ? String(meta.description) : "");
              const groupAvatarMeta =
                meta.avatar && typeof meta.avatar === "string" && meta.avatar.startsWith("data:") ? meta.avatar : null;
              const creatorNorm =
                meta.createdBy != null && String(meta.createdBy).trim() !== ""
                  ? normalizeStoredMessageFromId(String(meta.createdBy).trim())
                  : "";
              const myNormCr = normalizeStoredMessageFromId(myId);
              const iAmCreator = !!(creatorNorm && creatorNorm === myNormCr);
              const iCanManageGroupMeta = !!admin;
              const iCanChangeGroupAvatar = !!(admin || iAmCreator);
              return res.status(200).json({
                ok: true,
                groupMetaOnly: true,
                group: {
                  id: groupId,
                  title: groupTitleMeta,
                  description: groupDescMeta,
                  avatar: groupAvatarMeta,
                  createdBy: meta.createdBy != null ? String(meta.createdBy) : null,
                  createdAt: meta.createdAt != null ? String(meta.createdAt) : null,
                  memberCount: meta.members.length,
                  members: membersList,
                  iAmCreator,
                  iCanManageGroupMeta,
                  iCanChangeGroupAvatar,
                },
              });
            }
            const gKeyPoll = groupMsgsKey(groupId);
            const wantPollGr = String(req.query.poll || "") === "1";
            const sinceRevGr = String(req.query.sinceRev || "").trim();
            let groupPollRevPre = null;
            if (wantPollGr) {
              groupPollRevPre = await computeGroupThreadPollRev(gKeyPoll);
              if (sinceRevGr && groupPollRevPre && sinceRevGr === groupPollRevPre) {
                if (waitForChange) {
                  const waitResGroup = await waitForPollRevChange(
                    () => computeGroupThreadPollRev(gKeyPoll),
                    groupPollRevPre,
                    waitTimeoutMs,
                    400
                  );
                  if (!waitResGroup.changed) {
                    return res.status(200).json({ ok: true, notModified: true, pollRev: waitResGroup.pollRev || groupPollRevPre, waited: true, trace: buildChatTrace({ mode: "group", waited: true }) });
                  }
                  groupPollRevPre = waitResGroup.pollRev || groupPollRevPre;
                } else {
                  return res.status(200).json({ ok: true, notModified: true, pollRev: groupPollRevPre });
                }
              }
            }
            const members = meta.members;
            const skipPresenceG = req.query.skipPresence === "1" || req.query.skipPresence === "true";
            const nowG = Date.now();
            const minScoreG = nowG - ONLINE_TTL_MS;
            const touchG = touchChatLastSeenCmd(myId, nowG);
            const wantsOlderGroup = !!(beforeIdRaw || beforeTimeRaw);
            const canTryFastTailGroup = !wantsOlderGroup && !!(afterIdRaw || afterTimeRaw);
            const fastTailGroup = canTryFastTailGroup
              ? await tryBuildFastTailResponse(groupMsgsKey(groupId), afterIdRaw, afterTimeRaw, MAX_MESSAGES)
              : null;
            const needsFullGroupRange = wantsOlderGroup || (canTryFastTailGroup && !fastTailGroup);
            const pipelineG = [
              ["LRANGE", groupMsgsKey(groupId), "0", needsFullGroupRange ? "-1" : String(MAX_MESSAGES - 1)],
              ["ZADD", CHAT_ONLINE_KEY, String(nowG), myId],
              ["ZREMRANGEBYSCORE", CHAT_ONLINE_KEY, "-inf", String(minScoreG)],
              ...(touchG ? [touchG] : []),
              ["LLEN", groupMsgsKey(groupId)],
            ];
            const resultsG = await redisPipeline(pipelineG);
            let listRespG = resultsG;
            if (resultsG && typeof resultsG === "object" && !Array.isArray(resultsG) && Array.isArray(resultsG.result)) {
              listRespG = resultsG.result;
            }
            let rawG = [];
            if (listRespG && Array.isArray(listRespG)) {
              const firstG = listRespG[0];
              if (firstG && firstG.error) {
                return res.status(500).json({ ok: false, error: "Ошибка загрузки сообщений" });
              }
              rawG = Array.isArray(firstG?.result)
                ? firstG.result
                : typeof firstG?.result === "string"
                  ? [firstG.result]
                  : [];
            }
            const messagesG = (Array.isArray(rawG) ? rawG : [])
              .map((s) => {
                try {
                  return typeof s === "string" ? JSON.parse(s) : null;
                } catch (e) {
                  return null;
                }
              })
              .filter(Boolean)
              .reverse();
            const seenG = new Set();
            const dedupedG = messagesG.filter((m) => {
              if (m && m.from != null && m.from !== "") m.from = normalizeStoredMessageFromId(m.from);
              const k =
                m.id !== null && m.id !== undefined && m.id !== ""
                  ? String(m.id)
                  : m.from + "|" + (m.time || "") + "|" + (m.text || "");
              if (seenG.has(k)) return false;
              seenG.add(k);
              return true;
            });
            const fromIdsG = [...new Set(dedupedG.map((m) => m.from).filter(Boolean))];
            if (!fastOpenThread) {
              const [dtIdsMapG, avatarsMapG, p21IdsMapG, verifiedIdsMapG, respectScoresG, statusMetaG] = await Promise.all([
                getDtIds(fromIdsG),
                getAvatars(fromIdsG),
                getP21Ids(fromIdsG),
                getPokerPlusVerifiedIds(fromIdsG),
                getRespectScores(fromIdsG),
                getPokerProfileStatusMeta(fromIdsG),
              ]);
              dedupedG.forEach((m) => {
                if (m.from) {
                  if (dtIdsMapG[m.from]) m.fromDtId = dtIdsMapG[m.from];
                  if (avatarsMapG[m.from]) m.fromAvatar = avatarsMapG[m.from];
                  if (p21IdsMapG[m.from]) m.fromP21Id = p21IdsMapG[m.from];
                  m.fromPokerPlusVerified = !!verifiedIdsMapG[m.from];
                  m.fromRespect = respectScoresG[m.from] != null ? respectScoresG[m.from] : 0;
                  if (statusMetaG[m.from]) {
                    m.fromStatusLevel = statusMetaG[m.from].level;
                    m.fromStatusValue = statusMetaG[m.from].valuePercent;
                  }
                  m.fromAdmin = isAdmin(m.from);
                }
              });
            } else {
              dedupedG.forEach((m) => {
                if (m && m.from) m.fromAdmin = isAdmin(m.from);
              });
            }
            const latestInGroup = dedupedG.length ? dedupedG[dedupedG.length - 1].time : null;
            const trackSeenG = req.query.trackSeen !== "0" && req.query.trackSeen !== "false";
            if (trackSeenG && latestInGroup) await bumpSeenCursor(myId, groupId, latestInGroup);
            if (!fastOpenThread) {
              const idsAliasG = collectMessageFromIdsForAlias(dedupedG);
              const displayMapG = await getChatDisplayNameMapForIds(idsAliasG);
              applyPeerChatDisplayNamesToMessages(dedupedG, displayMapG);
              const aliasMapG = await getFriendAliasMapForViewer(myId, idsAliasG);
              applyViewerFriendAliasesToMessages(dedupedG, aliasMapG);
            }
            let onlineCountG = 0;
            if (!skipPresenceG) {
              const scoreCmdsG = members.flatMap((id) => [["ZSCORE", CHAT_ONLINE_KEY, id]]);
              const scoreResultsG = await redisPipeline(scoreCmdsG);
              if (scoreResultsG && Array.isArray(scoreResultsG)) {
                members.forEach((id, i) => {
                  const sc = scoreResultsG[i]?.result;
                  if (sc != null && parseFloat(sc) >= minScoreG) onlineCountG++;
                });
              }
            }
            const totalMessagesG =
              listRespG && listRespG[(touchG ? 3 : 2)] && listRespG[(touchG ? 3 : 2)].result != null
                ? Math.max(0, parseInt(String(listRespG[(touchG ? 3 : 2)].result), 10) || 0)
                : dedupedG.length;
            const groupTitleOut = meta.title != null ? String(meta.title).trim() : "Группа";
            const groupDescriptionOut = sanitizeGroupDescription(meta.description != null ? String(meta.description) : "");
            const groupAvatarOut =
              meta.avatar && typeof meta.avatar === "string" && meta.avatar.startsWith("data:") ? meta.avatar : null;
            const creatorNormMsgs =
              meta.createdBy != null && String(meta.createdBy).trim() !== ""
                ? normalizeStoredMessageFromId(String(meta.createdBy).trim())
                : "";
            const iAmCreatorMsgs = !!(
              creatorNormMsgs && creatorNormMsgs === normalizeStoredMessageFromId(myId)
            );
            const iCanChangeGroupAvatarMsgs = !!(admin || iAmCreatorMsgs);
            if (!groupPollRevPre && !fastOpenThread) groupPollRevPre = await computeGroupThreadPollRev(gKeyPoll);
            let outMessagesG = fastTailGroup ? fastTailGroup.messages : filterMessagesAfterCursor(dedupedG, afterIdRaw, afterTimeRaw);
            let hasMoreBeforeG = totalMessagesG > dedupedG.length ? true : totalMessagesG > outMessagesG.length;
            if (wantsOlderGroup) {
              const olderSliceG = sliceMessagesBeforeCursor(dedupedG, beforeIdRaw, beforeTimeRaw, OLDER_MESSAGES_BATCH);
              outMessagesG = olderSliceG.messages;
              hasMoreBeforeG = olderSliceG.hasMoreBefore;
            }
            const preparedMessagesG = prepareChatMessagesUsersByIdResponse(outMessagesG, dedupedG, req);
            return res.status(200).json({
              ok: true,
              messages: preparedMessagesG.messages,
              usersById: preparedMessagesG.usersById,
              partial: !!(afterIdRaw || afterTimeRaw || beforeIdRaw || beforeTimeRaw),
              hasMoreBefore: !!hasMoreBeforeG,
              isAdmin: admin,
              participantsCount: members.length,
              onlineCount: skipPresenceG ? undefined : onlineCountG,
              isGroupChat: true,
              groupTitle: groupTitleOut,
              groupDescription: groupDescriptionOut,
              groupAvatar: groupAvatarOut,
              groupCreatorId: meta.createdBy != null ? String(meta.createdBy) : null,
              iAmGroupCreator: iAmCreatorMsgs,
              iCanManageGroupMeta: !!admin,
              iCanChangeGroupAvatar: iCanChangeGroupAvatarMsgs,
              pollRev: groupPollRevPre,
              trace: buildChatTrace({ mode: "group", waited: false }),
            });
          }
    
          const otherId = normalizePeerChatUserId(withId);
          const trackSeen = req.query.trackSeen !== "0" && req.query.trackSeen !== "false";
          const key = convKey(myId, otherId);
          const wantPollDm = String(req.query.poll || "") === "1";
          const sinceRevDm = String(req.query.sinceRev || "").trim();
          let dmPollRevPre = null;
          if (wantPollDm) {
            dmPollRevPre = await computeDmThreadPollRev(key, myId, otherId);
            if (sinceRevDm && dmPollRevPre && sinceRevDm === dmPollRevPre) {
              if (waitForChange) {
                const waitResDm = await waitForPollRevChange(
                  () => computeDmThreadPollRev(key, myId, otherId),
                  dmPollRevPre,
                  waitTimeoutMs,
                  400
                );
                if (!waitResDm.changed) {
                    return res.status(200).json({ ok: true, notModified: true, pollRev: waitResDm.pollRev || dmPollRevPre, waited: true, trace: buildChatTrace({ mode: "dm", waited: true }) });
                }
                dmPollRevPre = waitResDm.pollRev || dmPollRevPre;
              } else {
                return res.status(200).json({ ok: true, notModified: true, pollRev: dmPollRevPre });
              }
            }
          }
          const now = Date.now();
          const minScore = now - ONLINE_TTL_MS;
          const touchDm = touchChatLastSeenCmd(myId, now);
          const wantsOlderDm = !!(beforeIdRaw || beforeTimeRaw);
          const canTryFastTailDm = !wantsOlderDm && !!(afterIdRaw || afterTimeRaw);
          const fastTailDm = canTryFastTailDm
            ? await tryBuildFastTailResponse(key, afterIdRaw, afterTimeRaw, MAX_MESSAGES)
            : null;
          const needsFullDmRange = wantsOlderDm || (canTryFastTailDm && !fastTailDm);
          if (messagesBare && !wantsOlderDm && !canTryFastTailDm) {
            const bareRes = await redisPipeline([["LRANGE", key, "0", String(MAX_MESSAGES - 1)]]);
            let bareListResp = bareRes;
            if (bareRes && typeof bareRes === "object" && !Array.isArray(bareRes) && Array.isArray(bareRes.result)) {
              bareListResp = bareRes.result;
            }
            const bareFirst = bareListResp && Array.isArray(bareListResp) ? bareListResp[0] : null;
            if (bareFirst && bareFirst.error) {
              return res.status(500).json({ ok: false, error: "Ошибка загрузки сообщений" });
            }
            const bareRow = Array.isArray(bareFirst?.result)
              ? bareFirst.result
              : typeof bareFirst?.result === "string"
                ? [bareFirst.result]
                : [];
            const bareMessages = bareRow
              .map((s) => {
                try {
                  return typeof s === "string" ? JSON.parse(s) : null;
                } catch (e) {
                  return null;
                }
              })
              .filter(Boolean)
              .reverse()
              .map((m) => {
                if (m && m.from != null && m.from !== "") {
                  m.from = normalizeStoredMessageFromId(m.from);
                  m.fromAdmin = isAdmin(m.from);
                }
                return m;
              });
            return res.status(200).json({
              ok: true,
              messages: bareMessages,
              partial: false,
              hasMoreBefore: false,
              isAdmin: admin,
              participantsCount: 0,
              onlineCount: undefined,
              peerTyping: false,
              messagesBare: true,
              trace: buildChatTrace({ mode: "dm", waited: false }),
            });
          }
          const pipeline = [
            ["LRANGE", key, "0", needsFullDmRange ? "-1" : String(MAX_MESSAGES - 1)],
            ["ZADD", CHAT_ONLINE_KEY, String(now), myId],
            ["ZREMRANGEBYSCORE", CHAT_ONLINE_KEY, "-inf", String(minScore)],
            ...(touchDm ? [touchDm] : []),
            ["ZSCORE", CHAT_ONLINE_KEY, myId],
            ["ZSCORE", CHAT_ONLINE_KEY, otherId],
            ["GET", chatTypingKey(myId, otherId)],
            ["LLEN", key],
          ];
          const results = await redisPipeline(pipeline);
          /* Как в mode=general: разные формы ответа pipeline у Upstash */
          let listResp = results;
          if (results && typeof results === "object" && !Array.isArray(results) && Array.isArray(results.result)) {
            listResp = results.result;
          }
          let raw = [];
          if (listResp && Array.isArray(listResp)) {
            const first = listResp[0];
            if (first && first.error) {
              return res.status(500).json({ ok: false, error: "Ошибка загрузки сообщений" });
            }
            raw = Array.isArray(first?.result) ? first.result : typeof first?.result === "string" ? [first.result] : [];
          }
          const messages = (Array.isArray(raw) ? raw : [])
            .map((s) => {
              try {
                return typeof s === "string" ? JSON.parse(s) : null;
              } catch (e) {
                return null;
              }
            })
            .filter(Boolean)
            .reverse();
          const seen = new Set();
          const deduped = messages.filter((m) => {
            if (m && m.from != null && m.from !== "") m.from = normalizeStoredMessageFromId(m.from);
            const k =
              m.id !== null && m.id !== undefined && m.id !== ""
                ? String(m.id)
                : m.from + "|" + (m.time || "") + "|" + (m.text || "");
            if (seen.has(k)) return false;
            seen.add(k);
            return true;
          });
          const fromIds = [...new Set(deduped.map((m) => m.from).filter(Boolean))];
          const participantsCount = fromIds.length;
          const myScore = listResp && listResp[4] && listResp[4].result != null ? parseFloat(listResp[4].result) : 0;
          const otherScore = listResp && listResp[5] && listResp[5].result != null ? parseFloat(listResp[5].result) : 0;
          const peerTyping = !!(listResp && listResp[6] && listResp[6].result != null && listResp[6].result !== false);
          const totalMessagesDm =
            listResp && listResp[7] && listResp[7].result != null
              ? Math.max(0, parseInt(String(listResp[7].result), 10) || 0)
              : deduped.length;
          let onlineCount = 0;
          if (fromIds.includes(myId) && myScore >= minScore) onlineCount++;
          if (fromIds.includes(otherId) && otherScore >= minScore) onlineCount++;
          let dtIdsMap = {};
          let avatarsMap = {};
          let p21IdsMap = {};
          let verifiedIdsMap = {};
          let statusMetaDm = {};
          if (!fastOpenThread) {
            let respectScoresDm = {};
            [dtIdsMap, avatarsMap, p21IdsMap, verifiedIdsMap, respectScoresDm, statusMetaDm] = await Promise.all([
              getDtIds(fromIds),
              getAvatars(fromIds),
              getP21Ids(fromIds),
              getPokerPlusVerifiedIds(fromIds),
              getRespectScores(fromIds),
              getPokerProfileStatusMeta(fromIds),
            ]);
            deduped.forEach((m) => {
              if (m.from) {
                if (dtIdsMap[m.from]) m.fromDtId = dtIdsMap[m.from];
                if (avatarsMap[m.from]) m.fromAvatar = avatarsMap[m.from];
                if (p21IdsMap[m.from]) m.fromP21Id = p21IdsMap[m.from];
                m.fromPokerPlusVerified = !!verifiedIdsMap[m.from];
                m.fromRespect = respectScoresDm[m.from] != null ? respectScoresDm[m.from] : 0;
                if (statusMetaDm[m.from]) {
                  m.fromStatusLevel = statusMetaDm[m.from].level;
                  m.fromStatusValue = statusMetaDm[m.from].valuePercent;
                }
                m.fromAdmin = isAdmin(m.from);
              }
            });
          } else {
            deduped.forEach((m) => {
              if (m && m.from) m.fromAdmin = isAdmin(m.from);
            });
          }
          const latestInThread = deduped.length ? deduped[deduped.length - 1].time : null;
          if (trackSeen && latestInThread) await bumpSeenCursor(myId, otherId, latestInThread);
          if (!fastOpenThread) {
            const peerSeenUpTo = await getSeenCursor(otherId, myId);
            applyPeerReadReceiptsToMyMessages(deduped, myId, peerSeenUpTo);
            const idsAliasDm = collectMessageFromIdsForAlias(deduped);
            const displayMapDm = await getChatDisplayNameMapForIds(idsAliasDm);
            applyPeerChatDisplayNamesToMessages(deduped, displayMapDm);
            const aliasMapDm = await getFriendAliasMapForViewer(myId, idsAliasDm);
            applyViewerFriendAliasesToMessages(deduped, aliasMapDm);
          }
          const otherDtId = dtIdsMap && otherId ? (dtIdsMap[otherId] || null) : null;
          const otherP21Id = p21IdsMap && otherId ? (p21IdsMap[otherId] != null ? p21IdsMap[otherId] : null) : null;
          const otherPokerPlusVerified = !!(verifiedIdsMap && otherId && verifiedIdsMap[otherId]);
          const otherStatus = statusMetaDm && otherId ? statusMetaDm[otherId] : null;
          const otherAvatar =
            otherId && avatarsMap && avatarsMap[otherId] ? avatarsMap[otherId] : null;
          if (!dmPollRevPre && !fastOpenThread) dmPollRevPre = await computeDmThreadPollRev(key, myId, otherId);
          let outMessagesDm = fastTailDm ? fastTailDm.messages : filterMessagesAfterCursor(deduped, afterIdRaw, afterTimeRaw);
          let hasMoreBeforeDm = totalMessagesDm > deduped.length ? true : totalMessagesDm > outMessagesDm.length;
          if (wantsOlderDm) {
            const olderSliceDm = sliceMessagesBeforeCursor(deduped, beforeIdRaw, beforeTimeRaw, OLDER_MESSAGES_BATCH);
            outMessagesDm = olderSliceDm.messages;
            hasMoreBeforeDm = olderSliceDm.hasMoreBefore;
          }
          const preparedMessagesDm = prepareChatMessagesUsersByIdResponse(outMessagesDm, deduped, req);
          return res.status(200).json({
            ok: true,
            messages: preparedMessagesDm.messages,
            usersById: preparedMessagesDm.usersById,
            partial: !!(afterIdRaw || afterTimeRaw || beforeIdRaw || beforeTimeRaw),
            hasMoreBefore: !!hasMoreBeforeDm,
            isAdmin: admin,
            participantsCount,
            onlineCount,
            otherDtId: otherDtId || undefined,
            otherP21Id: otherP21Id != null && otherP21Id !== "" ? otherP21Id : undefined,
            otherPokerPlusVerified,
            otherStatusLevel: otherStatus ? otherStatus.level : undefined,
            otherStatusValue: otherStatus ? otherStatus.valuePercent : undefined,
            otherAvatar: otherAvatar != null && otherAvatar !== "" ? otherAvatar : undefined,
            peerTyping,
            pollRev: dmPollRevPre,
            trace: buildChatTrace({ mode: "dm", waited: false }),
          });

      return null;
    };
}

module.exports = {
  createChatGetThreadHandler,
};

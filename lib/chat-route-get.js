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
    userChatGroupsKey,
    waitForPollRevChange,
    writeThreadMessageIndex,
    writeThreadMeta,
  } = deps;

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
    
        if (withId) {
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
                  } else if (m.fromPokerPlusVerified) {
                    m.fromStatusLevel = 1;
                    m.fromStatusValue = 0;
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
            return res.status(200).json({
              ok: true,
              messages: outMessagesG,
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
                } else if (m.fromPokerPlusVerified) {
                  m.fromStatusLevel = 1;
                  m.fromStatusValue = 0;
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
          return res.status(200).json({
            ok: true,
            messages: outMessagesDm,
            partial: !!(afterIdRaw || afterTimeRaw || beforeIdRaw || beforeTimeRaw),
            hasMoreBefore: !!hasMoreBeforeDm,
            isAdmin: admin,
            participantsCount,
            onlineCount,
            otherDtId: otherDtId || undefined,
            otherP21Id: otherP21Id != null && otherP21Id !== "" ? otherP21Id : undefined,
            otherPokerPlusVerified,
            otherStatusLevel: otherStatus ? otherStatus.level : (otherPokerPlusVerified ? 1 : undefined),
            otherStatusValue: otherStatus ? otherStatus.valuePercent : (otherPokerPlusVerified ? 0 : undefined),
            otherAvatar: otherAvatar != null && otherAvatar !== "" ? otherAvatar : undefined,
            peerTyping,
            pollRev: dmPollRevPre,
            trace: buildChatTrace({ mode: "dm", waited: false }),
          });
        }
    
        if (mode === "clubChatManage") {
          if (!admin) return res.status(403).json({ ok: false, error: "Только для админа" });
          const [pendRes, memRes, namesRes, joinRes] = await Promise.all([
            redisPipeline([["SMEMBERS", CLUB_CHAT_PENDING_KEY]]),
            redisPipeline([["SMEMBERS", CLUB_CHAT_MEMBERS_KEY]]),
            redisPipeline([["HGETALL", "poker_app:visitor_usernames"]]),
            redisPipeline([["HGETALL", CLUB_CHAT_MEMBER_JOINED_AT_KEY]]),
          ]);
          const pendingIds = Array.isArray(pendRes?.[0]?.result) ? pendRes[0].result : [];
          const memberIds = Array.isArray(memRes?.[0]?.result) ? memRes[0].result : [];
          const ur = namesRes?.[0]?.result;
          let usernames = {};
          if (Array.isArray(ur)) {
            for (let i = 0; i < ur.length; i += 2) {
              if (ur[i] && ur[i + 1]) usernames[ur[i]] = String(ur[i + 1]).trim();
            }
          }
          const jr = joinRes?.[0]?.result;
          const joinedAtByUser = {};
          if (Array.isArray(jr)) {
            for (let i = 0; i < jr.length; i += 2) {
              if (jr[i]) joinedAtByUser[jr[i]] = String(jr[i + 1] || "").trim();
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
        }
    
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
    
        if (mode === "general") {
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
        }
    
        const contactsMetaOnly = readContactsMetaOnlyFlag(req);
        if (contactsMetaOnly) {
          const metaPayload = await buildContactsMetaOnlyPayload(myId, admin, req);
          const contactsMetaPollRequested = req.query.poll === "1" || req.query.poll === "true";
          const contactsMetaSinceRev = String(req.query.sinceRev || "").trim();
          const contactsMetaPollRev = computeContactsMetaPollRev(metaPayload);
          if (contactsMetaPollRequested && contactsMetaSinceRev && contactsMetaSinceRev === contactsMetaPollRev) {
            if (waitForChange) {
              const waitResContacts = await waitForPollRevChange(
                async () => computeContactsMetaPollRev(await buildContactsMetaOnlyPayload(myId, admin, req)),
                contactsMetaPollRev,
                waitTimeoutMs,
                500
              );
              if (!waitResContacts.changed) {
                return res.status(200).json({
                  ok: true,
                  notModified: true,
                  pollRev: waitResContacts.pollRev || contactsMetaPollRev,
                  waited: true,
                  trace: buildChatTrace({ mode: "contacts", waited: true }),
                });
              }
              const freshMetaPayload = await buildContactsMetaOnlyPayload(myId, admin, req);
              return res.status(200).json(
                Object.assign({}, freshMetaPayload, {
                  pollRev: computeContactsMetaPollRev(freshMetaPayload),
                  trace: buildChatTrace({ mode: "contacts", waited: true }),
                })
              );
            }
            return res.status(200).json({ ok: true, notModified: true, pollRev: contactsMetaPollRev });
          }
          return res.status(200).json(Object.assign({}, metaPayload, { pollRev: contactsMetaPollRev, trace: buildChatTrace({ mode: "contacts", waited: false }) }));
        }
        const now = Date.now();
        const minScore = now - ONLINE_TTL_MS;
        const touchCt = touchChatLastSeenCmd(myId, now);
        const results = await redisPipeline([
          ["SMEMBERS", "poker_app:chat_partners:" + myId],
          ["ZADD", CHAT_ONLINE_KEY, String(now), myId],
          ["ZREMRANGEBYSCORE", CHAT_ONLINE_KEY, "-inf", String(minScore)],
          ...(touchCt ? [touchCt] : []),
        ]);
        if (!results || !Array.isArray(results) || results.length < 1) {
          const clubEmpty = await getClubChatAccessState(myId, admin);
          return res.status(200).json({
            ok: true,
            contacts: [],
            friendIds: [],
            chatPartnerIds: [],
            isAdmin: admin,
            participantsCount: 0,
            onlineCount: 0,
            clubChatAccess: clubEmpty,
            generalChatPickMembers: [],
          });
        }
        const partners = Array.isArray(results[0]?.result) ? results[0].result : [];
    
        /* Все id из chat_partners (нормализованные). Раньше админам скрывали других админов — тогда личка админ↔админ
           (например с @roman1_matvienko / tg_388008256) не попадала в mode=contacts, хотя SADD уже был. */
        const partnerIds = [...new Set(partners.map((id) => normalizePeerChatUserId(String(id))))].filter(
          (id) => (id.startsWith("tg_") || id.startsWith("vk_")) && id !== myId
        );
        const viewerAccountId = myId.startsWith("guest_") ? myId : await ensureDtIdForUserId(myId);
        const friendsEarlyRes = await redisPipeline([["SMEMBERS", FRIENDS_SET_KEY_PREFIX + viewerAccountId]]);
        const friendIdsForResponse =
          friendsEarlyRes && friendsEarlyRes[0] && Array.isArray(friendsEarlyRes[0].result)
            ? friendsEarlyRes[0].result.map((x) => (x != null ? String(x) : "")).filter(Boolean)
            : [];
        const contactsFast = req.query.contactsFast === "1" || req.query.contactsFast === "true";
        if (contactsFast) {
          const FAST_CONTACTS_LIMIT = 80;
          const FAST_CONTACTS_RICH_META_LIMIT = 18;
          let fastIds = partnerIds.slice(0, FAST_CONTACTS_LIMIT);
          const fastLastMessageTime = {};
          const fastLastMessagePreview = {};
          if (fastIds.length > 0) {
            const fastMetaRes = await redisPipeline(
              fastIds.flatMap((id) => [
                ["HGET", threadMetaKeyByStorageKey(convKey(myId, id)), "lastMessageTime"],
                ["HGET", threadMetaKeyByStorageKey(convKey(myId, id)), "lastMessagePreview"],
              ])
            );
            const fastMetaRows = fastMetaRes && Array.isArray(fastMetaRes) ? fastMetaRes : [];
            fastIds.forEach((id, idx) => {
              const timeIdx = idx * 2;
              const previewIdx = timeIdx + 1;
              const rawTime =
                fastMetaRows[timeIdx] && fastMetaRows[timeIdx].result != null
                  ? String(fastMetaRows[timeIdx].result).trim()
                  : "";
              const rawPreview =
                fastMetaRows[previewIdx] && fastMetaRows[previewIdx].result != null
                  ? String(fastMetaRows[previewIdx].result).trim()
                  : "";
              if (rawTime) fastLastMessageTime[id] = rawTime;
              if (rawPreview) fastLastMessagePreview[id] = rawPreview;
            });
            fastIds = fastIds.slice().sort((a, b) => {
              const tA = fastLastMessageTime[a] || "";
              const tB = fastLastMessageTime[b] || "";
              if (tA && !tB) return -1;
              if (!tA && tB) return 1;
              if (tB !== tA) return tB.localeCompare(tA);
              return String(a || "").localeCompare(String(b || ""));
            });
          }
          const contactsBare = req.query.contactsBare === "1" || req.query.contactsBare === "true";
          if (contactsBare) {
            const fastNamesRes = fastIds.length > 0 ? await redisPipeline([["HMGET", USERNAMES_KEY, ...fastIds]]) : [];
            const fastNamesRow =
              fastNamesRes && fastNamesRes[0] && Array.isArray(fastNamesRes[0].result) ? fastNamesRes[0].result : [];
            const bareContacts = fastIds.map((id, idx) => {
              const rawName = fastNamesRow[idx] != null && fastNamesRow[idx] !== false ? String(fastNamesRow[idx]).trim() : "";
              return {
                id,
                name: rawName ? "@" + rawName : normalizeLegacyAccountDisplayLabel(id),
                online: false,
                admin: isAdmin(id),
                unreadCount: 0,
                lastMessageTime: fastLastMessageTime[id] || "",
                lastMessagePreview: fastLastMessagePreview[id] || "",
                fast: true,
                bare: true,
              };
            });
            return res.status(200).json({
              ok: true,
              contacts: bareContacts,
              friendIds: friendIdsForResponse,
              chatPartnerIds: fastIds,
              isAdmin: admin,
              participantsCount: bareContacts.length,
              onlineCount: 0,
              generalUnreadCount: 0,
              clubChatAccess: await getClubChatAccessState(myId, admin),
              generalChatPickMembers: [],
              contactsFast: true,
              contactsBare: true,
            });
          }
          const fastRichIds = fastIds.slice(0, FAST_CONTACTS_RICH_META_LIMIT);
          const [fastDtIds, fastNamesRes, fastDisplayByPeer, fastAvatars, fastP21Ids, fastVerified, fastStatusMeta] =
            fastIds.length > 0
              ? await Promise.all([
                  getDtIds(fastRichIds),
                  redisPipeline([["HMGET", USERNAMES_KEY, ...fastIds]]),
                  getChatDisplayNameMapForIds(fastRichIds),
                  getAvatars(fastRichIds),
                  getP21Ids(fastRichIds),
                  getPokerPlusVerifiedIds(fastRichIds),
                  getPokerProfileStatusMeta(fastRichIds),
                ])
              : [{}, [], {}, {}, {}, {}, {}];
          const fastNamesRow =
            fastNamesRes && fastNamesRes[0] && Array.isArray(fastNamesRes[0].result) ? fastNamesRes[0].result : [];
          const fastContacts = fastIds.map((id, idx) => {
            const rawName = fastNamesRow[idx] != null && fastNamesRow[idx] !== false ? String(fastNamesRow[idx]).trim() : "";
            const displayName =
              normalizeLegacyAccountDisplayLabel((fastDisplayByPeer[id] && String(fastDisplayByPeer[id]).trim()) || "") ||
              (rawName ? "@" + rawName : normalizeLegacyAccountDisplayLabel(id));
            return {
              id,
              name: displayName,
              dtId: fastDtIds[id] || null,
              p21Id: fastP21Ids[id] != null ? fastP21Ids[id] : null,
              pokerPlusVerified: !!fastVerified[id],
              statusLevel: fastStatusMeta[id] ? fastStatusMeta[id].level : (fastVerified[id] ? 1 : null),
              statusValue: fastStatusMeta[id] ? fastStatusMeta[id].valuePercent : (fastVerified[id] ? 0 : null),
              avatar: fastAvatars[id] || null,
              online: false,
              admin: isAdmin(id),
              unreadCount: 0,
              lastMessageTime: fastLastMessageTime[id] || "",
              lastMessagePreview: fastLastMessagePreview[id] || "",
              fast: true,
            };
          });
          const fastClubChatAccess = await getClubChatAccessState(myId, admin);
          return res.status(200).json({
            ok: true,
            contacts: fastContacts,
            friendIds: friendIdsForResponse,
            chatPartnerIds: fastIds,
            isAdmin: admin,
            participantsCount: fastContacts.length,
            onlineCount: 0,
            generalUnreadCount: 0,
            clubChatAccess: fastClubChatAccess,
            generalChatPickMembers: [],
            contactsFast: true,
          });
        }
        const idsForOnline = [...new Set(partnerIds)];
        const onlineSet = new Set();
        let onlineCount = 0;
        if (idsForOnline.length > 0) {
          const scoreCmds = idsForOnline.flatMap((id) => [["ZSCORE", CHAT_ONLINE_KEY, id]]);
          const scoreResults = await redisPipeline(scoreCmds);
          if (scoreResults && Array.isArray(scoreResults)) {
            idsForOnline.forEach((id, i) => {
              const s = scoreResults[i]?.result;
              if (s != null && parseFloat(s) >= minScore) {
                onlineCount++;
                onlineSet.add(id);
              }
            });
          }
        }
        let participantsCount = partnerIds.length;
    
        let lastViewed = {};
        try {
          const lv = req.query.lastViewed;
          if (lv && typeof lv === "string") lastViewed = JSON.parse(lv);
        } catch (e) {}
    
        const adminIds = ADMIN_IDS.map((id) => (id.startsWith("tg_") ? id : "tg_" + id));
        const allIdsForUnread = [...partnerIds, ...adminIds];
        const unreadCounts = {};
        let generalUnreadCount = 0;
        let lastViewGeneralMerged = "";
        const unreadCmds = [];
        if (allIdsForUnread.length > 0) unreadCmds.push(["HMGET", unreadHashKey(myId), ...allIdsForUnread]);
        unreadCmds.push(["HGET", CHAT_GENERAL_UNREAD_HASH, myId]);
        unreadCmds.push(["HGET", CHAT_GENERAL_SEEN_HASH, myId]);
        const unreadPipe = await redisPipeline(unreadCmds);
        let unreadRow = [];
        let generalUnreadRaw = null;
        let generalSeenRaw = null;
        if (unreadPipe && Array.isArray(unreadPipe)) {
          let idxUnread = 0;
          if (allIdsForUnread.length > 0) {
            unreadRow = unreadPipe[idxUnread] && Array.isArray(unreadPipe[idxUnread].result) ? unreadPipe[idxUnread].result : [];
            idxUnread++;
          }
          generalUnreadRaw = unreadPipe[idxUnread] ? unreadPipe[idxUnread].result : null;
          idxUnread++;
          generalSeenRaw = unreadPipe[idxUnread] ? unreadPipe[idxUnread].result : null;
        }
        allIdsForUnread.forEach((id, i) => {
          const raw = unreadRow[i];
          const n = raw != null && raw !== false ? parseInt(String(raw), 10) : 0;
          unreadCounts[id] = Number.isFinite(n) && n > 0 ? n : 0;
        });
        generalUnreadCount =
          generalUnreadRaw != null && generalUnreadRaw !== false
            ? Math.max(0, parseInt(String(generalUnreadRaw), 10) || 0)
            : 0;
        const serverGenLv = generalSeenRaw != null ? String(generalSeenRaw).trim() : "";
        const clientGenLv = lastViewed.general != null ? String(lastViewed.general) : "";
        lastViewGeneralMerged = mergeReadCursors(clientGenLv, serverGenLv);
        if (!lastViewGeneralMerged || String(lastViewGeneralMerged).trim() === "") generalUnreadCount = 0;
    
        const lastMessageTime = {};
        const lastMessagePreview = {};
        if (partnerIds.length > 0) {
          const dmMetaRes = await redisPipeline(
            partnerIds.flatMap((id) => [
              ["HGET", threadMetaKeyByStorageKey(convKey(myId, id)), "lastMessageTime"],
              ["HGET", threadMetaKeyByStorageKey(convKey(myId, id)), "lastMessagePreview"],
            ])
          );
          const metaResults = dmMetaRes && Array.isArray(dmMetaRes) ? dmMetaRes : [];
          partnerIds.forEach((id, i) => {
            const timeIdx = i * 2;
            const previewIdx = timeIdx + 1;
            const rawTime = metaResults[timeIdx] && metaResults[timeIdx].result != null ? String(metaResults[timeIdx].result).trim() : "";
            const rawPreview =
              metaResults[previewIdx] && metaResults[previewIdx].result != null
                ? String(metaResults[previewIdx].result).trim()
                : "";
            if (rawTime) lastMessageTime[id] = rawTime;
            if (rawPreview) lastMessagePreview[id] = rawPreview;
          });
        }
    
        const visiblePartnerIds = await filterChatPartnersWithThreadContent(myId, partnerIds, lastMessageTime, lastMessagePreview, unreadCounts);
        participantsCount = visiblePartnerIds.length;
        onlineCount = visiblePartnerIds.reduce((count, id) => count + (onlineSet.has(id) ? 1 : 0), 0);
    
        const idsForMeta = [...new Set(visiblePartnerIds)];
        const resolvedPeerIds = {};
        const usernames = {};
        if (idsForMeta.length > 0) {
          const preferredPeerIds = await Promise.all(
            idsForMeta.map(async (pid) => {
              if (!/^ID\d{6}$/.test(String(pid || "").trim())) return String(pid || "").trim();
              const preferred = await getPreferredUserIdByDtId(String(pid).trim());
              return preferred ? String(preferred).trim() : String(pid).trim();
            })
          );
          idsForMeta.forEach((pid, idx) => {
            resolvedPeerIds[pid] = preferredPeerIds[idx] || String(pid).trim();
          });
          const usernamesRes = await redisPipeline([["HMGET", USERNAMES_KEY, ...preferredPeerIds]]);
          const usernamesRow =
            usernamesRes && usernamesRes[0] && Array.isArray(usernamesRes[0].result) ? usernamesRes[0].result : [];
          idsForMeta.forEach((pid, idx) => {
            const raw = usernamesRow[idx];
            if (raw != null && raw !== false) usernames[pid] = String(raw).trim();
          });
        }
        const [dtIds, avatars, p21IdsContacts, pokerPlusVerifiedContacts, statusMetaContacts] = await Promise.all([
          getDtIds(idsForMeta),
          getAvatars(idsForMeta),
          getP21Ids(idsForMeta),
          getPokerPlusVerifiedIds(idsForMeta),
          getPokerProfileStatusMeta(idsForMeta),
        ]);
        const friendContactNameByPeer = {};
        if (idsForMeta.length > 0) {
          const aliasRes = await redisPipeline([["HMGET", FRIEND_ALIAS_KEY_PREFIX + viewerAccountId, ...idsForMeta]]);
          const aliasRow =
            aliasRes && aliasRes[0] && Array.isArray(aliasRes[0].result) ? aliasRes[0].result : [];
          idsForMeta.forEach((pid, idx) => {
            const raw = aliasRow[idx];
            if (raw == null || raw === false) return;
            const cn = sanitizeFriendContactNameForChat(raw);
            if (cn) friendContactNameByPeer[pid] = cn;
          });
        }
        const chatDisplayByPeer =
          idsForMeta.length > 0 ? await getChatDisplayNameMapForIds(idsForMeta) : {};
        const lastSeenByPeer = {};
        if (idsForMeta.length > 0) {
          const lsRes = await redisPipeline([["HMGET", CHAT_LAST_SEEN_HASH, ...idsForMeta]]);
          const lsRow = lsRes && lsRes[0] && Array.isArray(lsRes[0].result) ? lsRes[0].result : [];
          idsForMeta.forEach((pid, lsi) => {
            const iso = chatLastSeenIsoFromRedisRaw(lsRow[lsi]);
            if (iso) lastSeenByPeer[pid] = iso;
          });
        }
        const contactsFromPartners = visiblePartnerIds.map((id) => {
          const baseDisplay =
            normalizeLegacyAccountDisplayLabel((chatDisplayByPeer[id] && String(chatDisplayByPeer[id]).trim()) || "") ||
            (usernames[id] ? "@" + usernames[id] : normalizeLegacyAccountDisplayLabel(id));
          const onC = onlineSet.has(id);
          const entry = {
            id,
            name: baseDisplay,
            dtId: dtIds[id] || null,
            p21Id: p21IdsContacts[id] != null ? p21IdsContacts[id] : null,
            pokerPlusVerified: !!pokerPlusVerifiedContacts[id],
            statusLevel: statusMetaContacts[id] ? statusMetaContacts[id].level : (pokerPlusVerifiedContacts[id] ? 1 : null),
            statusValue: statusMetaContacts[id] ? statusMetaContacts[id].valuePercent : (pokerPlusVerifiedContacts[id] ? 0 : null),
            avatar: avatars[id] || null,
            online: onC,
            admin: isAdmin(id),
            unreadCount: unreadCounts[id] != null ? unreadCounts[id] : 0,
            lastMessageTime: lastMessageTime[id] || "",
            lastMessagePreview: lastMessagePreview[id] || "",
          };
          const aliasLabel = friendContactNameByPeer[id];
          if (aliasLabel) entry.contactName = aliasLabel;
          if (!onC && lastSeenByPeer[id]) entry.lastSeenAt = lastSeenByPeer[id];
          return entry;
        });
        let contactsAll = contactsFromPartners;
        let myGroupsRes = await redisPipeline([["SMEMBERS", userChatGroupsKey(myId)]]);
        if (!myGroupsRes || !Array.isArray(myGroupsRes)) {
          myGroupsRes = await redisPipeline([["SMEMBERS", userChatGroupsKey(myId)]]);
        }
        const rawGroupIds = Array.isArray(myGroupsRes?.[0]?.result) ? myGroupsRes[0].result : [];
        const groupIdsList = [
          ...new Set(rawGroupIds.map((g) => String(g).trim()).filter((x) => isGroupChatId(x))),
        ];
        const groupEntries = [];
        if (groupIdsList.length > 0) {
          const nGrp = groupIdsList.length;
          const metaCmdsGrp = groupIdsList.map((gid) => ["GET", groupMetaKey(gid)]);
          const metaLastCmdsGrp = groupIdsList.map((gid) => ["HGET", threadMetaKeyByStorageKey(groupMsgsKey(gid)), "lastMessageTime"]);
          const metaPreviewCmdsGrp = groupIdsList.map((gid) => ["HGET", threadMetaKeyByStorageKey(groupMsgsKey(gid)), "lastMessagePreview"]);
          const unreadCmdsGrp = [["HMGET", unreadHashKey(myId), ...groupIdsList]];
          const grpPipe = await redisPipeline([...metaCmdsGrp, ...metaLastCmdsGrp, ...metaPreviewCmdsGrp, ...unreadCmdsGrp]);
          for (let gi = 0; gi < groupIdsList.length; gi++) {
            const gid = groupIdsList[gi];
            const metaRawG = grpPipe && grpPipe[gi] ? grpPipe[gi].result : null;
            const metaStrG = metaRawG != null ? String(metaRawG) : "";
            let metaObjG = null;
            try {
              metaObjG = metaStrG ? JSON.parse(metaStrG) : null;
            } catch (eParseG) {}
            const gMembers = metaObjG && Array.isArray(metaObjG.members) ? metaObjG.members.map(String) : [];
            if (!metaObjG || !groupMetaHasMember({ members: gMembers }, myId)) continue;
            const titleEntry = sanitizeGroupTitle(metaObjG.title != null ? String(metaObjG.title) : "") || "Группа";
            const gaRaw = metaObjG.avatar && typeof metaObjG.avatar === "string" ? metaObjG.avatar : "";
            const gaList =
              gaRaw && gaRaw.startsWith("data:") && gaRaw.length <= 52000 ? gaRaw : null;
            const metaLastRawG = grpPipe && grpPipe[gi + nGrp] && grpPipe[gi + nGrp].result != null
              ? String(grpPipe[gi + nGrp].result).trim()
              : "";
            const metaPreviewRawG =
              grpPipe && grpPipe[gi + 2 * nGrp] && grpPipe[gi + 2 * nGrp].result != null
                ? String(grpPipe[gi + 2 * nGrp].result).trim()
                : "";
            let lastTGrp = metaLastRawG || "";
            const grpUnreadRow =
              grpPipe && grpPipe[3 * nGrp] && Array.isArray(grpPipe[3 * nGrp].result) ? grpPipe[3 * nGrp].result : [];
            const unreadRawGrp = grpUnreadRow[gi];
            const unreadGrp =
              unreadRawGrp != null && unreadRawGrp !== false
                ? Math.max(0, parseInt(String(unreadRawGrp), 10) || 0)
                : 0;
            groupEntries.push({
              id: gid,
              name: titleEntry,
              dtId: null,
              p21Id: null,
              avatar: gaList,
              online: false,
              admin: false,
              unreadCount: unreadGrp,
              isGroupChat: true,
              memberCount: gMembers.length,
            });
            lastMessageTime[gid] = lastTGrp;
            if (metaPreviewRawG) lastMessagePreview[gid] = metaPreviewRawG;
          }
        }
        contactsAll = groupEntries.concat(contactsAll);
        sortContactsByLastMessageTime(contactsAll, lastMessageTime);
        const adminUnread = {};
        adminIds.forEach((id) => {
          if (unreadCounts[id] != null && unreadCounts[id] > 0) adminUnread[id] = unreadCounts[id];
        });
        const clubChatAccess = await getClubChatAccessState(myId, admin);
        let outGeneralUnread = generalUnreadCount;
        if (!admin && !(await hasClubGeneralAccess(myId, admin))) {
          outGeneralUnread = 0;
        }
        let clubChatPendingReviewCount = 0;
        if (admin && clubChatApplicationRequired()) {
          clubChatPendingReviewCount = await getClubChatPendingCount();
        }
        const generalChatStats = await buildGeneralChatStatsForContacts(myId, admin);
        const generalPreviewRes = await redisPipeline([["HGET", threadMetaKeyByStorageKey(GENERAL_KEY), "lastMessagePreview"]]);
        const generalChatPreview =
          generalPreviewRes && generalPreviewRes[0] && generalPreviewRes[0].result != null
            ? String(generalPreviewRes[0].result).trim()
            : "";
        /* Ростер общего чата (сотни участников + аватары) на каждый poll mode=contacts раздувал исходящий трафик Vercel.
         * Клиент не использует generalChatPickMembers; состав общего чата — из loadGeneral → _chatGeneralCache.generalMembers. */
        const generalChatPickMembers = [];
        return res.status(200).json({
          ok: true,
          contacts: contactsAll,
          friendIds: friendIdsForResponse,
          chatPartnerIds: visiblePartnerIds,
          isAdmin: admin,
          participantsCount,
          onlineCount,
          adminUnread: Object.keys(adminUnread).length ? adminUnread : undefined,
          generalUnreadCount: outGeneralUnread > 0 ? outGeneralUnread : 0,
          clubChatAccess,
          clubChatPendingReviewCount,
          generalChatParticipantsCount: generalChatStats.generalChatParticipantsCount,
          generalChatOnlineCount: generalChatStats.generalChatOnlineCount,
          generalChatPreview: generalChatPreview || undefined,
          generalChatPickMembers,
        });
  };
}

module.exports = {
  createChatGetHandler,
};

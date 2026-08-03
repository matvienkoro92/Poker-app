function createChatGetContactsHandler(deps) {
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
    FRIENDSHIPS_SET_KEY_PREFIX,
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
    getContactsUpdateRev,
    bumpGeneralLastSeen,
    bumpSeenCursor,
    bumpThreadPollGen,
    chatLastSeenIsoFromRedisRaw,
    chatMessageIsNewerThanLastViewed,
    chatMessageTimeMs,
    clubChatApplicationRequired,
    collectMessageFromIdsForAlias,
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

  return async function handleChatGetContacts(ctx, opts) {
    opts = opts || {};
    const { req, res, body, identity, myId, admin } = ctx;
    const waitForChange = !!opts.waitForChange;
    const waitTimeoutMs = opts.waitTimeoutMs;
        const contactsPresenceOnly =
          req.query.contactsPresenceOnly === "1" ||
          req.query.contactsPresenceOnly === "true" ||
          req.query.presenceOnly === "1" ||
          req.query.presenceOnly === "true";
        if (contactsPresenceOnly) {
          const nowPresence = Date.now();
          const minScorePresence = nowPresence - ONLINE_TTL_MS;
          const touchPresence = touchChatLastSeenCmd(myId, nowPresence);
          const presenceBaseResults = await redisPipeline([
            ["SMEMBERS", "poker_app:chat_partners:" + myId],
            ["ZADD", CHAT_ONLINE_KEY, String(nowPresence), myId],
            ["ZREMRANGEBYSCORE", CHAT_ONLINE_KEY, "-inf", String(minScorePresence)],
            ...(touchPresence ? [touchPresence] : []),
          ]);
          const partnersPresence = Array.isArray(presenceBaseResults?.[0]?.result)
            ? presenceBaseResults[0].result
            : [];
          const partnerIdsPresence = [...new Set(partnersPresence.map((id) => normalizePeerChatUserId(String(id))))].filter(
            (id) => (id.startsWith("tg_") || id.startsWith("vk_")) && id !== myId
          );
          const onlineById = {};
          let onlineCountPresence = 0;
          if (partnerIdsPresence.length > 0) {
            const scoreResultsPresence = await redisPipeline(
              partnerIdsPresence.flatMap((id) => [["ZSCORE", CHAT_ONLINE_KEY, id]])
            );
            const rowsPresence = scoreResultsPresence && Array.isArray(scoreResultsPresence) ? scoreResultsPresence : [];
            partnerIdsPresence.forEach((id, idx) => {
              const rawScore = rowsPresence[idx] && rowsPresence[idx].result != null ? rowsPresence[idx].result : null;
              const isOnline = rawScore != null && parseFloat(rawScore) >= minScorePresence;
              onlineById[id] = isOnline;
              if (isOnline) onlineCountPresence++;
            });
          }
          const generalChatStatsPresence = await buildGeneralChatStatsForContacts(myId, admin);
          return res.status(200).json({
            ok: true,
            contactsPresenceOnly: true,
            onlineById,
            onlineCount: onlineCountPresence,
            participantsCount: partnerIdsPresence.length,
            isAdmin: admin,
            generalChatParticipantsCount: generalChatStatsPresence.generalChatParticipantsCount,
            generalChatOnlineCount: generalChatStatsPresence.generalChatOnlineCount,
            trace: buildChatTrace({ mode: "contacts-presence", waited: false }),
          });
        }
        const contactsMetaOnly = readContactsMetaOnlyFlag(req);
        if (contactsMetaOnly) {
          const contactsMetaPollRequested = req.query.poll === "1" || req.query.poll === "true";
          const contactsMetaSinceRev = String(req.query.sinceRev || "").trim();
          let contactsMetaPollRev = await getContactsUpdateRev(myId);
          if (contactsMetaPollRequested && contactsMetaSinceRev && contactsMetaSinceRev === contactsMetaPollRev) {
            if (waitForChange) {
              const waitResContacts = await waitForPollRevChange(
                () => getContactsUpdateRev(myId),
                contactsMetaPollRev,
                waitTimeoutMs,
                5000
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
              contactsMetaPollRev = waitResContacts.pollRev || contactsMetaPollRev;
              const freshMetaPayload = await buildContactsMetaOnlyPayload(myId, admin, req);
              return res.status(200).json(
                Object.assign({}, freshMetaPayload, {
                  pollRev: contactsMetaPollRev,
                  trace: buildChatTrace({ mode: "contacts", waited: true }),
                })
              );
            }
            return res.status(200).json({ ok: true, notModified: true, pollRev: contactsMetaPollRev });
          }
          const metaPayload = await buildContactsMetaOnlyPayload(myId, admin, req);
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
            confirmedFriendIds: true,
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
        const confirmedFriendsKeyPrefix = FRIENDSHIPS_SET_KEY_PREFIX || "poker_app:friendships:";
        const friendsEarlyRes = await redisPipeline([["SMEMBERS", confirmedFriendsKeyPrefix + viewerAccountId]]);
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
              confirmedFriendIds: true,
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
              statusLevel: fastStatusMeta[id] ? fastStatusMeta[id].level : null,
              statusValue: fastStatusMeta[id] ? fastStatusMeta[id].valuePercent : null,
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
            confirmedFriendIds: true,
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
            statusLevel: statusMetaContacts[id] ? statusMetaContacts[id].level : null,
            statusValue: statusMetaContacts[id] ? statusMetaContacts[id].valuePercent : null,
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
          confirmedFriendIds: true,
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
  createChatGetContactsHandler,
};

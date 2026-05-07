function createChatPostGroupCommandHandler(deps) {
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

  return async function handleChatPostGroupCommand(ctx, postAction) {
    const { req, res, body, identity, myId, admin } = ctx;
      if (postAction === "creategroup") {
        const title = sanitizeGroupTitle(body.title || body.groupTitle || "");
        if (!title) return res.status(400).json({ ok: false, error: "Укажите название группы" });
        let rawMembers = body.memberIds || body.members || [];
        if (!Array.isArray(rawMembers)) rawMembers = [];
        const others = [
          ...new Set(
            rawMembers
              .map((x) => normalizePeerChatUserId(String(x).trim()))
              .filter((id) => id && (id.startsWith("tg_") || id.startsWith("vk_")) && id !== myId)
          ),
        ];
        if (others.length === 0) {
          return res.status(400).json({ ok: false, error: "Добавьте хотя бы одного участника" });
        }
        if (others.length > CHAT_GROUP_MEMBERS_MAX - 1) {
          return res.status(400).json({ ok: false, error: "Слишком много участников" });
        }
        const partnersCreateRes = await redisPipeline([["SMEMBERS", "poker_app:chat_partners:" + myId]]);
        const partnerSetCreate = new Set(
          (Array.isArray(partnersCreateRes?.[0]?.result) ? partnersCreateRes[0].result : [])
            .map((id) => normalizePeerChatUserId(String(id)))
            .filter((id) => id && (id.startsWith("tg_") || id.startsWith("vk_")))
        );
        for (let oi = 0; oi < others.length; oi++) {
          if (!partnerSetCreate.has(others[oi])) {
            return res.status(400).json({
              ok: false,
              error: "В группу можно добавить только тех, с кем у вас был личный диалог в чате клуба",
            });
          }
        }
        const allMembers = [myId, ...others];
        const groupId =
          "group_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 11);
        const avatarRaw = body.avatar || body.groupAvatar;
        const avatarStored = avatarRaw ? sanitizeGroupAvatarInput(String(avatarRaw)) : null;
        const metaOut = {
          title,
          members: allMembers,
          createdBy: myId,
          createdAt: new Date().toISOString(),
        };
        if (avatarStored) metaOut.avatar = avatarStored;
        const descCreate = sanitizeGroupDescription(body.description || body.groupDescription || "");
        if (descCreate) metaOut.description = descCreate;
        const cmdsCreate = [["SET", groupMetaKey(groupId), JSON.stringify(metaOut)]];
        for (let mi = 0; mi < allMembers.length; mi++) {
          cmdsCreate.push(["SADD", userChatGroupsKey(allMembers[mi]), groupId]);
        }
        const rCreate = await redisPipeline(cmdsCreate);
        if (!rCreate || !Array.isArray(rCreate) || rCreate.some((x) => x && x.error)) {
          return res.status(500).json({ ok: false, error: "Ошибка создания группы" });
        }
        await bumpContactsUpdateRev(allMembers);
        return res.status(200).json({
          ok: true,
          group: { id: groupId, title, avatar: avatarStored || undefined },
        });
      }
      if (postAction === "addgroupmembers") {
        const groupId = String(body.groupId || body.with || "").trim();
        if (!isGroupChatId(groupId)) {
          return res.status(400).json({ ok: false, error: "Некорректная группа" });
        }
        const metaAdd = await getGroupMeta(groupId);
        if (!metaAdd || !groupMetaHasMember(metaAdd, myId)) {
          return res.status(403).json({ ok: false, error: "Нет доступа к группе" });
        }
        let rawAddList = body.memberIds || body.members || [];
        if (!Array.isArray(rawAddList)) rawAddList = [];
        const wantAdd = [
          ...new Set(
            rawAddList
              .map((x) => normalizePeerChatUserId(String(x).trim()))
              .filter((id) => id && (id.startsWith("tg_") || id.startsWith("vk_"))),
          ),
        ];
        const curMembers = Array.isArray(metaAdd.members)
          ? metaAdd.members.map((x) => normalizeStoredMessageFromId(String(x).trim())).filter(Boolean)
          : [];
        const curSet = new Set(curMembers.map((x) => normalizeStoredMessageFromId(x)));
        const toAddList = wantAdd.filter((nid) => !curSet.has(normalizeStoredMessageFromId(nid)));
        if (toAddList.length === 0) {
          return res.status(400).json({
            ok: false,
            error: "Некого добавить — выберите участников, которых ещё нет в группе",
          });
        }
        if (curMembers.length + toAddList.length > CHAT_GROUP_MEMBERS_MAX) {
          return res.status(400).json({
            ok: false,
            error: "Превышен лимит участников (" + CHAT_GROUP_MEMBERS_MAX + ")",
          });
        }
        const partnersAddRes = await redisPipeline([["SMEMBERS", "poker_app:chat_partners:" + myId]]);
        const partnerSetAdd = new Set(
          (Array.isArray(partnersAddRes?.[0]?.result) ? partnersAddRes[0].result : [])
            .map((id) => normalizePeerChatUserId(String(id)))
            .filter((id) => id && (id.startsWith("tg_") || id.startsWith("vk_")))
        );
        for (let ai = 0; ai < toAddList.length; ai++) {
          const pidChk = normalizePeerChatUserId(String(toAddList[ai]).trim());
          if (!partnerSetAdd.has(pidChk)) {
            return res.status(400).json({
              ok: false,
              error: "В группу можно добавить только тех, с кем у вас был личный диалог в чате клуба",
            });
          }
        }
        metaAdd.members = curMembers.concat(toAddList.map((x) => normalizeStoredMessageFromId(x)));
        const cmdsAddM = [["SET", groupMetaKey(groupId), JSON.stringify(metaAdd)]];
        for (let ai = 0; ai < toAddList.length; ai++) {
          cmdsAddM.push(["SADD", userChatGroupsKey(normalizeStoredMessageFromId(toAddList[ai])), groupId]);
        }
        const rAddM = await redisPipeline(cmdsAddM);
        if (!rAddM || !Array.isArray(rAddM) || rAddM.some((x) => x && x.error)) {
          return res.status(500).json({ ok: false, error: "Не удалось сохранить состав группы" });
        }
        try {
          const addedNorm = toAddList.map((x) => normalizeStoredMessageFromId(x));
          const nameIds = [...new Set([normalizeStoredMessageFromId(myId), ...addedNorm])];
          let displayMap = {};
          try {
            displayMap = await getChatDisplayNameMapForIds(nameIds);
          } catch (eNm) {
            displayMap = {};
          }
          const usernameResAdd =
            addedNorm.length > 0 ? await redisPipeline([["HMGET", USERNAMES_KEY, ...addedNorm]]) : null;
          const usernameRowAdd =
            usernameResAdd && usernameResAdd[0] && Array.isArray(usernameResAdd[0].result)
              ? usernameResAdd[0].result
              : [];
          const actorNorm = normalizeStoredMessageFromId(myId);
          const redisNickActor = await getVisitorUsername(myId);
          const actorLabel =
            (displayMap[actorNorm] && String(displayMap[actorNorm]).trim()) ||
            buildChatDisplayName(identity, redisNickActor) ||
            "Участник";
          const addedMembersPayload = addedNorm.map((nid, idx) => {
            const rawUn = usernameRowAdd[idx];
            const tgLogin =
              rawUn != null && rawUn !== false ? String(rawUn).trim().replace(/^@/, "") : "";
            const disp =
              (displayMap[nid] && String(displayMap[nid]).trim()) ||
              (tgLogin ? tgLogin : String(nid).replace(/^(tg_|vk_)/, "")) ||
              "Участник";
            return {
              userId: nid,
              displayName: disp,
              telegramUsername: tgLogin || null,
            };
          });
          const addedLabels = addedMembersPayload
            .map((e) =>
              e.telegramUsername ? `${e.displayName} (@${e.telegramUsername})` : e.displayName,
            )
            .join(", ");
          const systemText = `${actorLabel} добавил(а) в группу: ${addedLabels}`;
          const sysMsg = {
            id: "grp_sys_" + Date.now() + "_" + Math.random().toString(36).slice(2, 10),
            groupSystemEvent: "members_added",
            text: systemText.slice(0, CHAT_MESSAGE_TEXT_MAX),
            time: new Date().toISOString(),
            from: null,
            groupSystemMembersAdded: {
              actorLabel,
              members: addedMembersPayload.map((e) => ({
                userId: e.userId,
                displayName: e.displayName,
                ...(e.telegramUsername ? { telegramUsername: e.telegramUsername } : {}),
              })),
            },
          };
          const gKeySys = groupMsgsKey(groupId);
          const nowSys = Date.now();
          const touchSys = touchChatLastSeenCmd(myId, nowSys);
          const sysMsgRaw = JSON.stringify(sysMsg);
          await redisPipeline([
            ["LPUSH", gKeySys, sysMsgRaw],
            ["LTRIM", gKeySys, "0", String(MAX_MESSAGES - 1)],
            ["ZADD", CHAT_ONLINE_KEY, String(nowSys), myId],
            ...(touchSys ? [touchSys] : []),
          ]);
          await writeThreadMessageIndex(gKeySys, sysMsg, sysMsgRaw);
          await writeThreadMeta(gKeySys, sysMsg);
          await bumpThreadPollGen(gKeySys);
        } catch (eSys) {
          console.error("[chat] addgroupmembers system message", eSys && eSys.message ? eSys.message : eSys);
        }
        await bumpContactsUpdateRev(metaAdd.members);
        return res.status(200).json({
          ok: true,
          added: toAddList,
          memberCount: metaAdd.members.length,
        });
      }
      if (postAction === "updategroupavatar") {
        const groupId = String(body.groupId || body.with || "").trim();
        if (!isGroupChatId(groupId)) {
          return res.status(400).json({ ok: false, error: "Некорректная группа" });
        }
        const metaUg = await getGroupMeta(groupId);
        if (!metaUg || !groupMetaHasMember(metaUg, myId)) {
          return res.status(403).json({ ok: false, error: "Нет доступа к группе" });
        }
        const createdByNormUg =
          metaUg.createdBy != null && String(metaUg.createdBy).trim() !== ""
            ? normalizeStoredMessageFromId(String(metaUg.createdBy).trim())
            : "";
        const myNormUg = normalizeStoredMessageFromId(myId);
        const isGroupCreatorUg = !!(createdByNormUg && createdByNormUg === myNormUg);
        if (!admin && !isGroupCreatorUg) {
          return res.status(403).json({
            ok: false,
            error: "Менять аватар может только создатель группы или администратор клуба",
          });
        }
        const avatarUg = sanitizeGroupAvatarInput(String(body.avatar || body.groupAvatar || ""));
        if (!avatarUg) {
          return res.status(400).json({
            ok: false,
            error: "Укажите изображение (JPEG, PNG, GIF или WebP в формате data URL)",
          });
        }
        metaUg.avatar = avatarUg;
        const rUg = await redisPipeline([["SET", groupMetaKey(groupId), JSON.stringify(metaUg)]]);
        if (!rUg || !Array.isArray(rUg) || rUg.some((x) => x && x.error)) {
          return res.status(500).json({ ok: false, error: "Не удалось сохранить аватар" });
        }
        await bumpContactsUpdateRev(metaUg.members);
        return res.status(200).json({ ok: true, groupAvatar: avatarUg });
      }
      if (postAction === "updategroupinfo") {
        const groupId = String(body.groupId || body.with || "").trim();
        if (!isGroupChatId(groupId)) {
          return res.status(400).json({ ok: false, error: "Некорректная группа" });
        }
        const metaGi = await getGroupMeta(groupId);
        if (!metaGi || !groupMetaHasMember(metaGi, myId)) {
          return res.status(403).json({ ok: false, error: "Нет доступа к группе" });
        }
        if (!admin) {
          return res.status(403).json({ ok: false, error: "Менять название и описание может только администратор клуба" });
        }
        const titleIn = body.title !== undefined || body.groupTitle !== undefined;
        const descIn = body.description !== undefined || body.groupDescription !== undefined;
        if (!titleIn && !descIn) {
          return res.status(400).json({ ok: false, error: "Укажите название или описание" });
        }
        if (titleIn) {
          const newTitle = sanitizeGroupTitle(body.title != null ? body.title : body.groupTitle);
          if (!newTitle) return res.status(400).json({ ok: false, error: "Название не может быть пустым" });
          metaGi.title = newTitle;
        }
        if (descIn) {
          metaGi.description = sanitizeGroupDescription(
            body.description != null ? body.description : body.groupDescription,
          );
        }
        const rGi = await redisPipeline([["SET", groupMetaKey(groupId), JSON.stringify(metaGi)]]);
        if (!rGi || !Array.isArray(rGi) || rGi.some((x) => x && x.error)) {
          return res.status(500).json({ ok: false, error: "Не удалось сохранить" });
        }
        await bumpContactsUpdateRev(metaGi.members);
        const titleOutGi = metaGi.title != null ? String(metaGi.title).trim() : "Группа";
        const descOutGi = sanitizeGroupDescription(metaGi.description != null ? String(metaGi.description) : "");
        return res.status(200).json({ ok: true, title: titleOutGi, description: descOutGi });
      }
      if (postAction === "deletegroup") {
        const groupId = String(body.groupId || body.with || "").trim();
        if (!isGroupChatId(groupId)) {
          return res.status(400).json({ ok: false, error: "Некорректная группа" });
        }
        const confirmRaw = String(body.confirm || body.confirmText || body.deleteConfirm || "").trim();
        if (confirmRaw.toLowerCase() !== "удалить") {
          return res.status(400).json({
            ok: false,
            error: "Для удаления введите слово «удалить»",
          });
        }
        const metaDel = await getGroupMeta(groupId);
        if (!metaDel || !groupMetaHasMember(metaDel, myId)) {
          return res.status(403).json({ ok: false, error: "Нет доступа к группе" });
        }
        if (!admin) {
          return res.status(403).json({ ok: false, error: "Удалить группу может только администратор клуба" });
        }
        const membersDel = Array.isArray(metaDel.members)
          ? metaDel.members.map((x) => String(x).trim()).filter(Boolean)
          : [];
        const cmdsDel = [
          ["DEL", groupMetaKey(groupId)],
          ["DEL", groupMsgsKey(groupId)],
          ["DEL", threadMetaKeyByStorageKey(groupMsgsKey(groupId))],
        ];
        for (let di = 0; di < membersDel.length; di++) {
          cmdsDel.push(["SREM", userChatGroupsKey(membersDel[di]), groupId]);
        }
        const seenFields = membersDel.map((uid) => seenCursorField(uid, groupId));
        if (seenFields.length > 0) cmdsDel.push(["HDEL", CHAT_SEEN_CURSOR_KEY, ...seenFields]);
        const rDel = await redisPipeline(cmdsDel);
        if (!rDel || !Array.isArray(rDel) || rDel.some((x) => x && x.error)) {
          return res.status(500).json({ ok: false, error: "Не удалось удалить группу" });
        }
        await bumpContactsUpdateRev(membersDel);
        return res.status(200).json({ ok: true, deleted: true, groupId });
      }
      if (postAction === "leavegroup") {
        const groupId = String(body.groupId || body.with || "").trim();
        if (!isGroupChatId(groupId)) {
          return res.status(400).json({ ok: false, error: "Некорректная группа" });
        }
        const metaLeave = await getGroupMeta(groupId);
        if (!metaLeave || !groupMetaHasMember(metaLeave, myId)) {
          return res.status(403).json({ ok: false, error: "Нет доступа к группе" });
        }
        const myNormLeave = normalizeStoredMessageFromId(myId);
        const curMembersLeave = Array.isArray(metaLeave.members)
          ? metaLeave.members.map((x) => String(x).trim()).filter(Boolean)
          : [];
        const newMembersLeave = curMembersLeave.filter(
          (x) => normalizeStoredMessageFromId(x) !== myNormLeave,
        );
        if (newMembersLeave.length === curMembersLeave.length) {
          return res.status(400).json({ ok: false, error: "Вы не состоите в этой группе" });
        }
        if (newMembersLeave.length === 0) {
          const cmdsLast = [
            ["DEL", groupMetaKey(groupId)],
            ["DEL", groupMsgsKey(groupId)],
            ["DEL", threadMetaKeyByStorageKey(groupMsgsKey(groupId))],
            ["SREM", userChatGroupsKey(myId), groupId],
            ["HDEL", CHAT_SEEN_CURSOR_KEY, seenCursorField(myId, groupId)],
          ];
          const rLast = await redisPipeline(cmdsLast);
          if (!rLast || !Array.isArray(rLast) || rLast.some((x) => x && x.error)) {
            return res.status(500).json({ ok: false, error: "Не удалось выйти из группы" });
          }
          await bumpContactsUpdateRev([myId]);
          return res.status(200).json({ ok: true, left: true, groupId, groupDeleted: true });
        }
        const creatorNormLeave =
          metaLeave.createdBy != null && String(metaLeave.createdBy).trim() !== ""
            ? normalizeStoredMessageFromId(String(metaLeave.createdBy).trim())
            : "";
        if (creatorNormLeave && creatorNormLeave === myNormLeave) {
          const pick = [...newMembersLeave].sort((a, b) =>
            normalizeStoredMessageFromId(String(a)).localeCompare(normalizeStoredMessageFromId(String(b))),
          );
          metaLeave.createdBy = String(pick[0]).trim();
        }
        metaLeave.members = newMembersLeave;
        const cmdsLeave = [
          ["SET", groupMetaKey(groupId), JSON.stringify(metaLeave)],
          ["SREM", userChatGroupsKey(myId), groupId],
          ["HDEL", CHAT_SEEN_CURSOR_KEY, seenCursorField(myId, groupId)],
        ];
        const rLeave = await redisPipeline(cmdsLeave);
        if (!rLeave || !Array.isArray(rLeave) || rLeave.some((x) => x && x.error)) {
          return res.status(500).json({ ok: false, error: "Не удалось выйти из группы" });
        }
        try {
          let displayMapL = {};
          try {
            displayMapL = await getChatDisplayNameMapForIds([myNormLeave]);
          } catch (eNmL) {
            displayMapL = {};
          }
          const redisNickL = await getVisitorUsername(myId);
          const leaverLabel =
            (displayMapL[myNormLeave] && String(displayMapL[myNormLeave]).trim()) ||
            buildChatDisplayName(identity, redisNickL) ||
            "Участник";
          const sysMsgL = {
            id: "grp_sys_" + Date.now() + "_" + Math.random().toString(36).slice(2, 10),
            groupSystemEvent: "member_left",
            text: `${leaverLabel} вышел(ла) из группы`.slice(0, CHAT_MESSAGE_TEXT_MAX),
            time: new Date().toISOString(),
            from: null,
          };
          const gKeyL = groupMsgsKey(groupId);
          const nowL = Date.now();
          const touchL = touchChatLastSeenCmd(myId, nowL);
          const sysMsgLRaw = JSON.stringify(sysMsgL);
          await redisPipeline([
            ["LPUSH", gKeyL, sysMsgLRaw],
            ["LTRIM", gKeyL, "0", String(MAX_MESSAGES - 1)],
            ["ZADD", CHAT_ONLINE_KEY, String(nowL), myId],
            ...(touchL ? [touchL] : []),
          ]);
          await writeThreadMessageIndex(gKeyL, sysMsgL, sysMsgLRaw);
          await writeThreadMeta(gKeyL, sysMsgL);
          await bumpThreadPollGen(gKeyL);
        } catch (eSysL) {
          console.error("[chat] leavegroup system message", eSysL && eSysL.message ? eSysL.message : eSysL);
        }
        await bumpContactsUpdateRev(curMembersLeave);
        return res.status(200).json({
          ok: true,
          left: true,
          groupId,
          memberCount: newMembersLeave.length,
        });
      }
      if (postAction === "removegroupmember") {
        const groupId = String(body.groupId || body.with || "").trim();
        if (!isGroupChatId(groupId)) {
          return res.status(400).json({ ok: false, error: "Некорректная группа" });
        }
        const targetRaw = body.memberId || body.userId || body.removeUserId;
        if (targetRaw == null || String(targetRaw).trim() === "") {
          return res.status(400).json({ ok: false, error: "Укажите участника" });
        }
        const metaRm = await getGroupMeta(groupId);
        if (!metaRm || !groupMetaHasMember(metaRm, myId)) {
          return res.status(403).json({ ok: false, error: "Нет доступа к группе" });
        }
        const creatorNormRm =
          metaRm.createdBy != null && String(metaRm.createdBy).trim() !== ""
            ? normalizeStoredMessageFromId(String(metaRm.createdBy).trim())
            : "";
        const myNormRm = normalizeStoredMessageFromId(myId);
        if (!creatorNormRm || creatorNormRm !== myNormRm) {
          return res.status(403).json({
            ok: false,
            error: "Исключать участников может только создатель группы",
          });
        }
        const targetNormRm = normalizeStoredMessageFromId(
          normalizePeerChatUserId(String(targetRaw).trim()),
        );
        if (!targetNormRm || targetNormRm === myNormRm) {
          return res.status(400).json({
            ok: false,
            error: "Нельзя исключить себя — используйте «Выйти из группы»",
          });
        }
        const curMembersRm = Array.isArray(metaRm.members)
          ? metaRm.members.map((x) => String(x).trim()).filter(Boolean)
          : [];
        const newMembersRm = curMembersRm.filter(
          (x) => normalizeStoredMessageFromId(x) !== targetNormRm,
        );
        if (newMembersRm.length === curMembersRm.length) {
          return res.status(400).json({ ok: false, error: "Пользователь не в группе" });
        }
        metaRm.members = newMembersRm;
        const cmdsRm = [
          ["SET", groupMetaKey(groupId), JSON.stringify(metaRm)],
          ["SREM", userChatGroupsKey(targetNormRm), groupId],
          ["HDEL", CHAT_SEEN_CURSOR_KEY, seenCursorField(targetNormRm, groupId)],
        ];
        const rRm = await redisPipeline(cmdsRm);
        if (!rRm || !Array.isArray(rRm) || rRm.some((x) => x && x.error)) {
          return res.status(500).json({ ok: false, error: "Не удалось обновить состав группы" });
        }
        try {
          let displayMapRm = {};
          try {
            displayMapRm = await getChatDisplayNameMapForIds([myNormRm, targetNormRm]);
          } catch (eNmRm) {
            displayMapRm = {};
          }
          const redisNickActorRm = await getVisitorUsername(myId);
          const actorLabelRm =
            (displayMapRm[myNormRm] && String(displayMapRm[myNormRm]).trim()) ||
            buildChatDisplayName(identity, redisNickActorRm) ||
            "Участник";
          const removedLabelRm =
            (displayMapRm[targetNormRm] && String(displayMapRm[targetNormRm]).trim()) ||
            String(targetNormRm).replace(/^(tg_|vk_)/, "") ||
            "Участник";
          const sysMsgRm = {
            id: "grp_sys_" + Date.now() + "_" + Math.random().toString(36).slice(2, 10),
            groupSystemEvent: "member_removed",
            text: `${actorLabelRm} исключил(а) из группы: ${removedLabelRm}`.slice(0, CHAT_MESSAGE_TEXT_MAX),
            time: new Date().toISOString(),
            from: null,
          };
          const gKeyRm = groupMsgsKey(groupId);
          const nowRm = Date.now();
          const touchRm = touchChatLastSeenCmd(myId, nowRm);
          const sysMsgRmRaw = JSON.stringify(sysMsgRm);
          await redisPipeline([
            ["LPUSH", gKeyRm, sysMsgRmRaw],
            ["LTRIM", gKeyRm, "0", String(MAX_MESSAGES - 1)],
            ["ZADD", CHAT_ONLINE_KEY, String(nowRm), myId],
            ...(touchRm ? [touchRm] : []),
          ]);
          await writeThreadMessageIndex(gKeyRm, sysMsgRm, sysMsgRmRaw);
          await writeThreadMeta(gKeyRm, sysMsgRm);
          await bumpThreadPollGen(gKeyRm);
        } catch (eSysRm) {
          console.error(
            "[chat] removegroupmember system message",
            eSysRm && eSysRm.message ? eSysRm.message : eSysRm,
          );
        }
        await bumpContactsUpdateRev(curMembersRm);
        return res.status(200).json({
          ok: true,
          groupId,
          memberCount: newMembersRm.length,
          removedUserId: targetNormRm,
        });
      }
    

    return null;
  };
}

module.exports = {
  createChatPostGroupCommandHandler,
};

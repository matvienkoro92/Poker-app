// Chat conversation shell: list view and opening a personal/group conversation.

function initChatConversationShell(opts) {
  opts = opts || {};
  var tg = opts.tg || null;
  var getChatWithUserId = typeof opts.getChatWithUserId === "function" ? opts.getChatWithUserId : function () { return null; };
  var setChatWithUserId = typeof opts.setChatWithUserId === "function" ? opts.setChatWithUserId : function () {};
  var getChatWithUserName = typeof opts.getChatWithUserName === "function" ? opts.getChatWithUserName : function () { return ""; };
  var setChatWithUserName = typeof opts.setChatWithUserName === "function" ? opts.setChatWithUserName : function () {};
  var getChatWithPeerAvatarUrl = typeof opts.getChatWithPeerAvatarUrl === "function" ? opts.getChatWithPeerAvatarUrl : function () { return ""; };
  var setChatWithPeerAvatarUrl = typeof opts.setChatWithPeerAvatarUrl === "function" ? opts.setChatWithPeerAvatarUrl : function () {};
  var getConvTitle = typeof opts.getConvTitle === "function" ? opts.getConvTitle : function () { return null; };
  var getListView = typeof opts.getListView === "function" ? opts.getListView : function () { return null; };
  var getConvView = typeof opts.getConvView === "function" ? opts.getConvView : function () { return null; };
  var getConvPeerAvatarPh = typeof opts.getConvPeerAvatarPh === "function" ? opts.getConvPeerAvatarPh : function () { return null; };
  var getConvPeerAvatar = typeof opts.getConvPeerAvatar === "function" ? opts.getConvPeerAvatar : function () { return null; };
  var getMessagesEl = typeof opts.getMessagesEl === "function" ? opts.getMessagesEl : function () { return null; };
  var setPersonalReplyTo = typeof opts.setPersonalReplyTo === "function" ? opts.setPersonalReplyTo : function () {};
  var setPersonalImage = typeof opts.setPersonalImage === "function" ? opts.setPersonalImage : function () {};
  var setPersonalVoice = typeof opts.setPersonalVoice === "function" ? opts.setPersonalVoice : function () {};
  var setConvGroupCanChangeAvatar = typeof opts.setConvGroupCanChangeAvatar === "function" ? opts.setConvGroupCanChangeAvatar : function () {};
  var setScrollPersonalToBottomOnNextRender = typeof opts.setScrollPersonalToBottomOnNextRender === "function" ? opts.setScrollPersonalToBottomOnNextRender : function () {};
  var setLastPersonalMessagesSig = typeof opts.setLastPersonalMessagesSig === "function" ? opts.setLastPersonalMessagesSig : function () {};
  var pokerPushOpenStateDebug = typeof opts.pokerPushOpenStateDebug === "function" ? opts.pokerPushOpenStateDebug : function () {};
  var pokerGetActivePushDmTarget = typeof opts.pokerGetActivePushDmTarget === "function" ? opts.pokerGetActivePushDmTarget : function () { return ""; };
  var pokerPushOpenDebug = typeof opts.pokerPushOpenDebug === "function" ? opts.pokerPushOpenDebug : function () {};
  var pokerGuardDefaultDialogsOpen = typeof opts.pokerGuardDefaultDialogsOpen === "function" ? opts.pokerGuardDefaultDialogsOpen : null;
  var pokerPushOpenTraceTransition = typeof opts.pokerPushOpenTraceTransition === "function" ? opts.pokerPushOpenTraceTransition : function () {};
  var setChatConvTitleIdText = typeof opts.setChatConvTitleIdText === "function" ? opts.setChatConvTitleIdText : function () {};
  var clearConvPeerAvatarHeader = typeof opts.clearConvPeerAvatarHeader === "function" ? opts.clearConvPeerAvatarHeader : function () {};
  var syncChatConvGroupAddMembersBtn = typeof opts.syncChatConvGroupAddMembersBtn === "function" ? opts.syncChatConvGroupAddMembersBtn : function () {};
  var updateChatHeaderStats = typeof opts.updateChatHeaderStats === "function" ? opts.updateChatHeaderStats : function () {};
  var loadContacts = typeof opts.loadContacts === "function" ? opts.loadContacts : function () {};
  var refreshChatSelfPinBars = typeof opts.refreshChatSelfPinBars === "function" ? opts.refreshChatSelfPinBars : function () {};
  var pokerUpdateChatDmFocusFromUiState = typeof opts.pokerUpdateChatDmFocusFromUiState === "function" ? opts.pokerUpdateChatDmFocusFromUiState : function () {};
  var pokerEnsureChatTelegramVerified = typeof opts.pokerEnsureChatTelegramVerified === "function" ? opts.pokerEnsureChatTelegramVerified : null;
  var resolveMyChatMemberId = typeof opts.resolveMyChatMemberId === "function" ? opts.resolveMyChatMemberId : function () { return ""; };
  var setChatConvTitleFish = typeof opts.setChatConvTitleFish === "function" ? opts.setChatConvTitleFish : function () {};
  var peerChatIdsEqual = typeof opts.peerChatIdsEqual === "function" ? opts.peerChatIdsEqual : function (a, b) { return String(a) === String(b); };
  var setChatPeerVerified = typeof opts.setChatPeerVerified === "function" ? opts.setChatPeerVerified : function () {};
  var normalizePeerIdForChat = typeof opts.normalizePeerIdForChat === "function" ? opts.normalizePeerIdForChat : function (id) { return String(id || ""); };
  var syncConvGroupAvatarEditUi = typeof opts.syncConvGroupAvatarEditUi === "function" ? opts.syncConvGroupAvatarEditUi : function () {};
  var applyConvPeerAvatarHeader = typeof opts.applyConvPeerAvatarHeader === "function" ? opts.applyConvPeerAvatarHeader : function () {};
  var applyConvGroupDescription = typeof opts.applyConvGroupDescription === "function" ? opts.applyConvGroupDescription : function () {};
  var getInlineChatHeaderTopOffsetPx = typeof opts.getInlineChatHeaderTopOffsetPx === "function" ? opts.getInlineChatHeaderTopOffsetPx : function () { return "0px"; };
  var pokerHydrateOpenDmHeaderFromContacts = typeof opts.pokerHydrateOpenDmHeaderFromContacts === "function" ? opts.pokerHydrateOpenDmHeaderFromContacts : function () {};
  var getPersonalMessagesSnapshotForOpen = typeof opts.getPersonalMessagesSnapshotForOpen === "function" ? opts.getPersonalMessagesSnapshotForOpen : function () { return null; };
  var pokerMessagesForFastOpenSnapshot = typeof opts.pokerMessagesForFastOpenSnapshot === "function" ? opts.pokerMessagesForFastOpenSnapshot : function (messages) { return messages || []; };
  var personalRenderSignature = typeof opts.personalRenderSignature === "function" ? opts.personalRenderSignature : function () { return ""; };
  var renderMessages = typeof opts.renderMessages === "function" ? opts.renderMessages : function () {};
  var pokerSchedulePushDmHeaderHydrate = typeof opts.pokerSchedulePushDmHeaderHydrate === "function" ? opts.pokerSchedulePushDmHeaderHydrate : function () {};
  var loadMessages = typeof opts.loadMessages === "function" ? opts.loadMessages : function () {};
  var mountChatComposer = typeof opts.mountChatComposer === "function" ? opts.mountChatComposer : function () {};
  var syncChatInertForIosAccessory = typeof opts.syncChatInertForIosAccessory === "function" ? opts.syncChatInertForIosAccessory : function () {};

function showList() {
  try {
    pokerPushOpenStateDebug("showList-enter", "");
  } catch (eShowListDbg0) {}
  try {
    var pendingPeerListHard = pokerGetActivePushDmTarget();
    if (pendingPeerListHard) {
      pokerPushOpenDebug("showList-hard-blocked", pendingPeerListHard);
      if (typeof pokerGuardDefaultDialogsOpen === "function" && pokerGuardDefaultDialogsOpen()) return;
    }
    var forcedPeer = window.__pokerForcePushDmPeer;
    var forcedUntil = Number(window.__pokerForcePushDmPeerUntil || 0);
    if (
      forcedPeer &&
      forcedUntil > Date.now() &&
      typeof window.chatOpenConvFromDialogs === "function"
    ) {
      pokerPushOpenDebug("showList-blocked", forcedPeer);
      window.chatOpenConvFromDialogs(forcedPeer, forcedPeer);
      return;
    }
  } catch (eForceList) {}
  pokerPushOpenTraceTransition("showList-commit", "");
  setChatWithUserId(null);
  if (getConvTitle()) getConvTitle().textContent = "";
  setChatConvTitleIdText("");
  clearConvPeerAvatarHeader();
  syncChatConvGroupAddMembersBtn();
  if (getListView()) getListView().classList.remove("chat-list-view--hidden");
  if (getConvView()) getConvView().classList.add("chat-conv-view--hidden");
  updateChatHeaderStats();
  loadContacts();
  try {
    refreshChatSelfPinBars();
  } catch (ePinLst) {}
  try {
    pokerUpdateChatDmFocusFromUiState();
  } catch (eDmLst) {}
}

function showConv(userId, userName, peerP21IdFromContact, peerAvatarUrlOpt, peerVerifiedOpt, peerStatusLevelOpt) {
  pokerPushOpenTraceTransition("showConv-enter", String(userId || ""));
  var allowPendingPushOpen = !!window.__pokerForceAllowPendingPushConvOpen;
  if (!allowPendingPushOpen && typeof pokerEnsureChatTelegramVerified === "function" && !pokerEnsureChatTelegramVerified()) return;
  var myOpen = resolveMyChatMemberId();
  var isGroupConv = userId && String(userId).indexOf("group_") === 0;
  setChatConvTitleFish(isGroupConv ? null : peerStatusLevelOpt);
  if (myOpen && userId && !isGroupConv && peerChatIdsEqual(userId, myOpen)) {
    var selfMsg =
      "Это личный чат с самим собой — входящие от игроков здесь не отображаются. Откройте диалог с игроком из списка контактов ниже или найдите человека по ID / нику.";
    if (tg && tg.showAlert) tg.showAlert(selfMsg);
    else if (typeof alert === "function") alert(selfMsg);
    return;
  }
  setChatWithUserId(userId);
  setChatWithUserName(userName || userId);
  setChatPeerVerified(!isGroupConv && !!peerVerifiedOpt);
  try {
    if (
      window.__pokerForcePushDmPeer &&
      peerChatIdsEqual(window.__pokerForcePushDmPeer, userId)
    ) {
      window.__pokerForcePushDmPeer = normalizePeerIdForChat(userId);
      window.__pokerForcePushDmPeerUntil = Date.now() + 8000;
      pokerPushOpenDebug("conv-locked", String(userId || ""));
    }
  } catch (eForceConv) {}
  try {
    if (!window.__pokerPersonalPollFor || !peerChatIdsEqual(window.__pokerPersonalPollFor, userId)) {
      window.__pokerPersonalPollFor = userId;
      window.__pokerPersonalPollRev = "";
    }
  } catch (ePrPoll) {}
  setConvGroupCanChangeAvatar(false);
  syncConvGroupAvatarEditUi();
  var peerAvParam = peerAvatarUrlOpt != null && String(peerAvatarUrlOpt).trim() ? String(peerAvatarUrlOpt).trim() : "";
  var peerAvCache = "";
  if (isGroupConv) {
    var gAvOpen = peerAvParam != null && String(peerAvParam).trim() ? String(peerAvParam).trim() : "";
    if (gAvOpen) {
      setChatWithPeerAvatarUrl(gAvOpen);
      applyConvPeerAvatarHeader(gAvOpen, getChatWithUserName());
    } else {
      applyConvPeerAvatarHeader("", "");
      if (getConvPeerAvatarPh()) {
        getConvPeerAvatarPh().textContent = "\uD83D\uDC65";
        getConvPeerAvatarPh().classList.remove("chat-conv-peer-avatar--hidden");
      }
      if (getConvPeerAvatar()) getConvPeerAvatar().classList.add("chat-conv-peer-avatar--hidden");
    }
  }
  var peerAv = isGroupConv ? (peerAvParam || peerAvCache || "") : peerAvParam || peerAvCache || "";
  setChatWithPeerAvatarUrl(peerAv || null);
  if (!isGroupConv) applyConvPeerAvatarHeader(peerAv, getChatWithUserName());
  if (getConvTitle()) {
    var nm = (userName && String(userName).trim()) ? String(userName).trim() : (userId ? String(userId) : "");
    getConvTitle().textContent = nm;
  }
  setChatConvTitleIdText(isGroupConv ? "" : peerP21IdFromContact);
  applyConvGroupDescription("");
  var convProfBtn = document.getElementById("chatConvProfileOpenBtn");
  if (convProfBtn) {
    convProfBtn.setAttribute("aria-label", isGroupConv ? "Информация о группе" : "Профиль собеседника");
  }
  setPersonalReplyTo(null);
  setPersonalImage(null);
  setPersonalVoice(null);
  var prevP = document.getElementById("chatPersonalReplyPreview");
  if (prevP) { prevP.classList.remove("chat-reply-preview--visible"); prevP.querySelector(".chat-reply-preview__text").textContent = ""; }
  var imgP = document.getElementById("chatPersonalImagePreview");
  if (imgP) { imgP.classList.remove("chat-image-preview--visible"); imgP.innerHTML = ""; }
  var voicePrevP = document.getElementById("chatPersonalVoicePreview");
  if (voicePrevP) voicePrevP.classList.remove("chat-voice-preview--visible");
  if (getListView()) getListView().classList.add("chat-list-view--hidden");
  if (getConvView()) getConvView().classList.remove("chat-conv-view--hidden");
  try {
    var convTop = document.querySelector("#chatConvView .chat-conv-top");
    if (convTop) {
      convTop.style.top = getInlineChatHeaderTopOffsetPx();
      convTop.style.left = "0";
      convTop.style.right = "0";
      convTop.style.transform = "none";
      convTop.style.width = "100%";
      convTop.style.maxWidth = "none";
    }
  } catch (eConvTopLayout) {}
  updateChatHeaderStats();
  setScrollPersonalToBottomOnNextRender(true);
  try {
    pokerHydrateOpenDmHeaderFromContacts(userId);
  } catch (eHdrConvOpen) {}
  var renderedOpenSnapshot = false;
  try {
    var openSnapshot = getPersonalMessagesSnapshotForOpen(userId);
    var openMessages = openSnapshot && Array.isArray(openSnapshot.messages) ? openSnapshot.messages : null;
    if (openMessages && openMessages.length) {
      var openMessagesCopy = pokerMessagesForFastOpenSnapshot(openMessages);
      setLastPersonalMessagesSig(personalRenderSignature(userId || "", openMessagesCopy, false));
      renderMessages(openMessagesCopy);
      renderedOpenSnapshot = true;
    }
  } catch (eOpenSnapshot) {}
  if (!renderedOpenSnapshot && getMessagesEl()) {
    getMessagesEl().innerHTML = '<p class="chat-empty">Загрузка...</p>';
    getMessagesEl().scrollTop = 0;
  }
  try {
    pokerSchedulePushDmHeaderHydrate(userId);
  } catch (eHdrConvSched) {}
  setTimeout(function () {
    if (getChatWithUserId() && peerChatIdsEqual(getChatWithUserId(), userId)) loadMessages();
  }, 0);
  pokerPushOpenTraceTransition("showConv-after-load", String(userId || ""));
  mountChatComposer("personal");
  syncChatInertForIosAccessory();
  try {
    pokerUpdateChatDmFocusFromUiState();
  } catch (eDmCv) {}
  syncChatConvGroupAddMembersBtn();
}

  return {
    showList: showList,
    showConv: showConv,
  };
}

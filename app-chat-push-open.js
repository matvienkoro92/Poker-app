// Chat push-open hooks: foreground placeholders, poll bursts, and unread badge refresh.

function initChatPushOpenHandlers(opts) {
  opts = opts || {};
  var chatOutgoingState = opts.chatOutgoingState || {};
  var personalMessagesCache = opts.personalMessagesCache || {};
  var getChatActiveTab = typeof opts.getChatActiveTab === "function" ? opts.getChatActiveTab : function () { return ""; };
  var getChatWithUserId = typeof opts.getChatWithUserId === "function" ? opts.getChatWithUserId : function () { return ""; };
  var getGeneralView = typeof opts.getGeneralView === "function" ? opts.getGeneralView : function () { return null; };
  var getConvView = typeof opts.getConvView === "function" ? opts.getConvView : function () { return null; };
  var getDialogsView = typeof opts.getDialogsView === "function" ? opts.getDialogsView : function () { return null; };
  var getListView = typeof opts.getListView === "function" ? opts.getListView : function () { return null; };
  var loadGeneral = typeof opts.loadGeneral === "function" ? opts.loadGeneral : function () {};
  var loadContacts = typeof opts.loadContacts === "function" ? opts.loadContacts : function () {};
  var loadMessages = typeof opts.loadMessages === "function" ? opts.loadMessages : function () {};
  var renderGeneralMessages = typeof opts.renderGeneralMessages === "function" ? opts.renderGeneralMessages : function () {};
  var renderMessages = typeof opts.renderMessages === "function" ? opts.renderMessages : function () {};
  var mergeIncomingPushGeneralIntoMessages =
    typeof opts.mergeIncomingPushGeneralIntoMessages === "function" ? opts.mergeIncomingPushGeneralIntoMessages : function (messages) { return messages || []; };
  var mergeIncomingPushPersonalIntoMessages =
    typeof opts.mergeIncomingPushPersonalIntoMessages === "function" ? opts.mergeIncomingPushPersonalIntoMessages : function (messages) { return messages || []; };
  var chatPushPlaceholderFromPayload =
    typeof opts.chatPushPlaceholderFromPayload === "function" ? opts.chatPushPlaceholderFromPayload : function () { return null; };
  var pokerNormalizeWebAppStartParam =
    typeof opts.pokerNormalizeWebAppStartParam === "function" ? opts.pokerNormalizeWebAppStartParam : function (value) { return String(value || ""); };
  var pokerStartAppQueryFromUrlSearchParams =
    typeof opts.pokerStartAppQueryFromUrlSearchParams === "function" ? opts.pokerStartAppQueryFromUrlSearchParams : function (sp) { return sp.get("startapp") || ""; };
  var pokerResolveChatPeerLabel =
    typeof opts.pokerResolveChatPeerLabel === "function" ? opts.pokerResolveChatPeerLabel : function (peerId, fallback) { return fallback || peerId || ""; };
  var peerChatIdsEqual = typeof opts.peerChatIdsEqual === "function" ? opts.peerChatIdsEqual : function (a, b) { return String(a || "") === String(b || ""); };
  var pokerChatRecordTrace = typeof opts.pokerChatRecordTrace === "function" ? opts.pokerChatRecordTrace : function () {};
  var pokerChatRequestPollBurst = typeof opts.pokerChatRequestPollBurst === "function" ? opts.pokerChatRequestPollBurst : function () {};
  var pokerChatRefreshLongPollTargets = typeof opts.pokerChatRefreshLongPollTargets === "function" ? opts.pokerChatRefreshLongPollTargets : function () {};

  window.__pokerHandleIncomingChatPush = function (payload) {
    try {
      if (typeof pokerReadPwaGuestMode === "function" && pokerReadPwaGuestMode()) return;
      if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return;
      var startApp = "";
      var withPeer = "";
      var chatViewActiveNow = false;
      try {
        var rawUrl = payload && payload.openUrl ? String(payload.openUrl) : "./?startapp=club_chat";
        var urlObj = new URL(rawUrl, window.location.href);
        var sp = new URLSearchParams(urlObj.search || "");
        startApp = pokerNormalizeWebAppStartParam(pokerStartAppQueryFromUrlSearchParams(sp));
        withPeer = (sp.get("with") || "").trim();
        var isDmPush = startApp === "club_chat_dm" && !!withPeer;
        var isGeneralPush = startApp === "club_chat";
        var pushPlaceholder = chatPushPlaceholderFromPayload(payload);
        chatViewActiveNow = !!document.querySelector('[data-view="chat"].view--active');
        if (pushPlaceholder && chatViewActiveNow && isGeneralPush) {
          chatOutgoingState.incomingPushGeneralPayload = pushPlaceholder;
          var generalView = getGeneralView();
          if (
            getChatActiveTab() === "general" &&
            generalView &&
            !generalView.classList.contains("chat-general-view--hidden") &&
            window._chatGeneralCache &&
            Array.isArray(window._chatGeneralCache.messages)
          ) {
            renderGeneralMessages(mergeIncomingPushGeneralIntoMessages(window._chatGeneralCache.messages.slice()));
          }
        } else if (pushPlaceholder && chatViewActiveNow && isDmPush) {
          var resolvedPushDmName = pokerResolveChatPeerLabel(withPeer, pushPlaceholder.fromName || withPeer);
          chatOutgoingState.incomingPushPersonalPayloadByPeer[withPeer] = Object.assign({}, pushPlaceholder, {
            from: withPeer,
            fromName: resolvedPushDmName,
          });
          var convView = getConvView();
          var chatWithUserId = getChatWithUserId();
          if (
            chatWithUserId &&
            peerChatIdsEqual(chatWithUserId, withPeer) &&
            convView &&
            !convView.classList.contains("chat-conv-view--hidden")
          ) {
            var cacheNow = personalMessagesCache[withPeer] && Array.isArray(personalMessagesCache[withPeer]) ? personalMessagesCache[withPeer] : [];
            renderMessages(mergeIncomingPushPersonalIntoMessages(cacheNow.slice(), withPeer));
          }
        }
      } catch (ePushPlaceholder) {}
      var now = Date.now();
      window.__pokerLastIncomingChatPushAt = now;
      pokerChatRecordTrace("push-incoming", {
        startApp: startApp || "",
        peer: withPeer || "",
      });
      if (startApp === "club_chat") pokerChatRequestPollBurst("general");
      else if (startApp === "club_chat_dm") pokerChatRequestPollBurst("personal");
      pokerChatRequestPollBurst("contacts");
      pokerChatRefreshLongPollTargets();
      try {
        var dialogsView = getDialogsView();
        var listView = getListView();
        var dialogsListVisibleNow = !!(
          chatViewActiveNow &&
          dialogsView &&
          !dialogsView.classList.contains("chat-dialogs-view--hidden") &&
          listView &&
          !listView.classList.contains("chat-list-view--hidden")
        );
        if (dialogsListVisibleNow && typeof loadContacts === "function") loadContacts({ metaOnly: true });
      } catch (ePushDialogsRefresh) {}
      if (window.__pokerChatPushRefetchTimer) return;
      window.__pokerChatPushRefetchTimer = setTimeout(function () {
        window.__pokerChatPushRefetchTimer = 0;
        try {
          if (typeof pokerReadPwaGuestMode === "function" && pokerReadPwaGuestMode()) return;
          if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return;
          if (typeof loadContacts === "function") loadContacts({ metaOnly: true });
          var generalView = getGeneralView();
          if (
            startApp === "club_chat" &&
            getChatActiveTab() === "general" &&
            generalView &&
            !generalView.classList.contains("chat-general-view--hidden") &&
            typeof loadGeneral === "function"
          ) {
            loadGeneral();
          }
          var convView = getConvView();
          var chatWithUserId = getChatWithUserId();
          if (
            startApp === "club_chat_dm" &&
            chatWithUserId &&
            withPeer &&
            peerChatIdsEqual(chatWithUserId, withPeer) &&
            convView &&
            !convView.classList.contains("chat-conv-view--hidden") &&
            typeof loadMessages === "function"
          ) {
            loadMessages();
          }
        } catch (eChatPushFlush) {}
      }, 120);
    } catch (eChatPushRefetch) {}
  };

  window.__pokerRefreshChatUnreadForPwaBadge = function () {
    try {
      if (typeof pokerReadPwaGuestMode === "function" && pokerReadPwaGuestMode()) return;
      if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return;
      loadGeneral();
      loadContacts({ metaOnly: true });
    } catch (eUnreadRef) {}
  };
}

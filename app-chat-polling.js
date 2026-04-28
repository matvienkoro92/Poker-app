// Chat polling, burst intervals, long-poll scheduling and perf traces.

function initChatPolling(opts) {
  opts = opts || {};
  var getDialogsView = typeof opts.getDialogsView === "function" ? opts.getDialogsView : function () { return null; };
  var getChatActiveTab = typeof opts.getChatActiveTab === "function" ? opts.getChatActiveTab : function () { return ""; };
  var getGeneralView = typeof opts.getGeneralView === "function" ? opts.getGeneralView : function () { return null; };
  var getConvView = typeof opts.getConvView === "function" ? opts.getConvView : function () { return null; };
  var getChatWithUserId = typeof opts.getChatWithUserId === "function" ? opts.getChatWithUserId : function () { return ""; };
  var pokerApiHasCredential = typeof opts.pokerApiHasCredential === "function" ? opts.pokerApiHasCredential : function () { return false; };
  var loadGeneral = typeof opts.loadGeneral === "function" ? opts.loadGeneral : function () {};
  var loadContacts = typeof opts.loadContacts === "function" ? opts.loadContacts : function () {};
  var loadMessages = typeof opts.loadMessages === "function" ? opts.loadMessages : function () {};

var CHAT_POLL_TICK_MS = 1000;
var CHAT_OPEN_IDLE_MS = 5000;
var CHAT_OPEN_BURST_MS = 1000;
var CHAT_DIALOGS_IDLE_MS = 15000;
var CHAT_DIALOGS_ACTIVE_IDLE_MS = 4000;
var CHAT_DIALOGS_BURST_MS = 1000;
var CHAT_HIDDEN_IDLE_MS = 60000;
var CHAT_ACTIVITY_BURST_WINDOW_MS = 15000;
var CHAT_LONG_POLL_TIMEOUT_MS = 18000;
var chatBurstUntilByScope = { general: 0, personal: 0, contacts: 0 };
var chatLastPollAt = { general: 0, personal: 0, contacts: 0, admins: 0 };
var chatLongPollTimers = { general: 0, personal: 0, contacts: 0 };
var chatLongPollTokens = { general: 0, personal: 0, contacts: 0 };

function pokerChatRequestPollBurst(scope, durationMs) {
  var key = scope === "general" || scope === "personal" || scope === "contacts" ? scope : "personal";
  var dur = Number(durationMs);
  if (!isFinite(dur) || dur <= 0) dur = CHAT_ACTIVITY_BURST_WINDOW_MS;
  chatBurstUntilByScope[key] = Date.now() + dur;
}

function pokerChatPollIntervalForScope(scope) {
  var now = Date.now();
  if (scope === "contacts") {
    var dialogsVisible = !!(
      typeof document !== "undefined" &&
      document.querySelector('[data-view="chat"].view--active') &&
      getDialogsView() &&
      !getDialogsView().classList.contains("chat-dialogs-view--hidden")
    );
    if (now < (chatBurstUntilByScope.contacts || 0)) return CHAT_DIALOGS_BURST_MS;
    return dialogsVisible ? CHAT_DIALOGS_ACTIVE_IDLE_MS : CHAT_DIALOGS_IDLE_MS;
  }
  if (scope === "admins") return CHAT_OPEN_IDLE_MS;
  if (scope === "general" || scope === "personal") {
    return now < (chatBurstUntilByScope[scope] || 0) ? CHAT_OPEN_BURST_MS : CHAT_OPEN_IDLE_MS;
  }
  return CHAT_OPEN_IDLE_MS;
}

function pokerChatShouldRunPoll(scope, nowMs) {
  var key = String(scope || "");
  var now = Number(nowMs) || Date.now();
  var interval = pokerChatPollIntervalForScope(key);
  var last = chatLastPollAt[key] || 0;
  if (now - last < interval) return false;
  chatLastPollAt[key] = now;
  return true;
}

function pokerChatCanRunLongPoll(scope) {
  if (typeof document === "undefined" || document.visibilityState !== "visible") return false;
  if (!document.querySelector('[data-view="chat"].view--active')) return false;
  if (scope === "general") {
    return !!(
      getChatActiveTab() === "general" &&
      getGeneralView() &&
      !getGeneralView().classList.contains("chat-general-view--hidden") &&
      typeof pokerApiHasCredential === "function" &&
      pokerApiHasCredential()
    );
  }
  if (scope === "personal") {
    return !!(
      getChatActiveTab() === "personal" &&
      getChatWithUserId() &&
      getConvView() &&
      !getConvView().classList.contains("chat-conv-view--hidden") &&
      typeof pokerApiHasCredential === "function" &&
      pokerApiHasCredential()
    );
  }
  if (scope === "contacts") {
    return !!(
      typeof pokerApiHasCredential === "function" &&
      pokerApiHasCredential() &&
      document.querySelector('[data-view="chat"].view--active')
    );
  }
  return false;
}

function pokerChatStopLongPoll(scope) {
  var key = scope === "general" || scope === "contacts" ? scope : "personal";
  chatLongPollTokens[key] = (chatLongPollTokens[key] || 0) + 1;
  if (chatLongPollTimers[key]) {
    clearTimeout(chatLongPollTimers[key]);
    chatLongPollTimers[key] = 0;
  }
}

function pokerChatScheduleLongPoll(scope, delayMs) {
  var key = scope === "general" || scope === "contacts" ? scope : "personal";
  pokerChatStopLongPoll(key);
  if (!pokerChatCanRunLongPoll(key)) return;
  var token = chatLongPollTokens[key];
  chatLongPollTimers[key] = setTimeout(function () {
    if (token !== chatLongPollTokens[key]) return;
    if (!pokerChatCanRunLongPoll(key)) return;
    if (key === "general") loadGeneral({ waitForChange: true });
    else if (key === "contacts") loadContacts({ metaOnly: true, waitForChange: true });
    else loadMessages({ waitForChange: true });
  }, Math.max(0, Number(delayMs) || 0));
}

function pokerChatRefreshLongPollTargets() {
  if (pokerChatCanRunLongPoll("general")) pokerChatScheduleLongPoll("general", 0);
  else pokerChatStopLongPoll("general");
  if (pokerChatCanRunLongPoll("personal")) pokerChatScheduleLongPoll("personal", 0);
  else pokerChatStopLongPoll("personal");
  if (pokerChatCanRunLongPoll("contacts")) pokerChatScheduleLongPoll("contacts", 0);
  else pokerChatStopLongPoll("contacts");
}

function pokerChatRecordTrace(stage, data) {
  try {
    var payload = data && typeof data === "object" ? data : {};
    window.__pokerChatPerfLast = Object.assign({ stage: String(stage || ""), at: Date.now() }, payload);
    if (typeof console !== "undefined" && console.info) console.info("[chat-perf]", window.__pokerChatPerfLast);
  } catch (eChatPerf) {}
}

  return {
    constants: {
      CHAT_POLL_TICK_MS: CHAT_POLL_TICK_MS,
      CHAT_OPEN_IDLE_MS: CHAT_OPEN_IDLE_MS,
      CHAT_OPEN_BURST_MS: CHAT_OPEN_BURST_MS,
      CHAT_DIALOGS_IDLE_MS: CHAT_DIALOGS_IDLE_MS,
      CHAT_DIALOGS_ACTIVE_IDLE_MS: CHAT_DIALOGS_ACTIVE_IDLE_MS,
      CHAT_DIALOGS_BURST_MS: CHAT_DIALOGS_BURST_MS,
      CHAT_HIDDEN_IDLE_MS: CHAT_HIDDEN_IDLE_MS,
      CHAT_ACTIVITY_BURST_WINDOW_MS: CHAT_ACTIVITY_BURST_WINDOW_MS,
      CHAT_LONG_POLL_TIMEOUT_MS: CHAT_LONG_POLL_TIMEOUT_MS,
    },
    state: {
      chatBurstUntilByScope: chatBurstUntilByScope,
      chatLastPollAt: chatLastPollAt,
      chatLongPollTimers: chatLongPollTimers,
      chatLongPollTokens: chatLongPollTokens,
    },
    pokerChatRequestPollBurst: pokerChatRequestPollBurst,
    pokerChatPollIntervalForScope: pokerChatPollIntervalForScope,
    pokerChatShouldRunPoll: pokerChatShouldRunPoll,
    pokerChatCanRunLongPoll: pokerChatCanRunLongPoll,
    pokerChatStopLongPoll: pokerChatStopLongPoll,
    pokerChatScheduleLongPoll: pokerChatScheduleLongPoll,
    pokerChatRefreshLongPollTargets: pokerChatRefreshLongPollTargets,
    pokerChatRecordTrace: pokerChatRecordTrace,
  };
}

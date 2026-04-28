// Chat club gate: opening access checks, application flow and general composer lock.

function initChatClubGate(opts) {
  opts = opts || {};
  var base = opts.base || "";
  var tg = opts.tg || null;
  var POKER_NET_ERR = opts.POKER_NET_ERR || "Ошибка сети";
  var getOpenClubChat = typeof opts.getOpenClubChat === "function" ? opts.getOpenClubChat : function () { return null; };
  var getChatIsAdmin = typeof opts.getChatIsAdmin === "function" ? opts.getChatIsAdmin : function () { return false; };
  var getClubChatAccess = typeof opts.getClubChatAccess === "function" ? opts.getClubChatAccess : function () { return "open"; };
  var setClubChatAccess = typeof opts.setClubChatAccess === "function" ? opts.setClubChatAccess : function () {};
  var getGeneralView = typeof opts.getGeneralView === "function" ? opts.getGeneralView : function () { return null; };
  var getChatActiveTab = typeof opts.getChatActiveTab === "function" ? opts.getChatActiveTab : function () { return "dialogs"; };
  var getGeneralMessages = typeof opts.getGeneralMessages === "function" ? opts.getGeneralMessages : function () { return null; };
  var getChatComposerEl = typeof opts.getChatComposerEl === "function" ? opts.getChatComposerEl : function () { return null; };
  var getChatComposerMounted = typeof opts.getChatComposerMounted === "function" ? opts.getChatComposerMounted : function () { return ""; };
  var pokerEnsureChatTelegramVerified = typeof opts.pokerEnsureChatTelegramVerified === "function" ? opts.pokerEnsureChatTelegramVerified : null;
  var pokerApiHasCredential = typeof opts.pokerApiHasCredential === "function" ? opts.pokerApiHasCredential : function () { return false; };
  var pokerApiAuthJsonBody = typeof opts.pokerApiAuthJsonBody === "function" ? opts.pokerApiAuthJsonBody : function (x) { return x || {}; };
  var loadContacts = typeof opts.loadContacts === "function" ? opts.loadContacts : function () {};
  var loadGeneral = typeof opts.loadGeneral === "function" ? opts.loadGeneral : function () {};
  var updateClubChatPreview = typeof opts.updateClubChatPreview === "function" ? opts.updateClubChatPreview : null;
  var escapeHtml = typeof opts.escapeHtml === "function" ? opts.escapeHtml : function (s) { return String(s == null ? "" : s); };

  function openClubChat() {
    var fn = getOpenClubChat();
    if (typeof fn === "function") fn();
  }

function tryOpenClubChatFromDialogs() {
  if (getChatIsAdmin() || getClubChatAccess() === "open" || getClubChatAccess() === "member") {
    openClubChat();
    return;
  }
  if (getClubChatAccess() === "revoked") {
    if (tg && tg.showAlert) tg.showAlert("Доступ к главному чату отозван администратором.");
    else if (typeof alert === "function") alert("Доступ к главному чату отозван администратором.");
    return;
  }
  if (getClubChatAccess() === "pending") {
    if (tg && tg.showAlert) tg.showAlert("Заявка на рассмотрении. Ожидайте решения администратора.");
    else if (typeof alert === "function") alert("Заявка на рассмотрении.");
    return;
  }
  if (getClubChatAccess() === "need_apply") {
    if (tg && tg.showConfirm) {
      tg.showConfirm("Подать заявку на доступ к главному чату клуба?", function (ok) {
        if (ok) submitClubChatApplication();
      });
    } else if (typeof confirm === "function" && confirm("Подать заявку на доступ к главному чату?")) {
      submitClubChatApplication();
    }
    return;
  }
  openClubChat();
}

function submitClubChatApplication() {
  if (typeof pokerEnsureChatTelegramVerified === "function" && !pokerEnsureChatTelegramVerified()) return;
  if (!pokerApiHasCredential()) {
    if (tg && tg.showAlert) tg.showAlert("Откройте приложение в Telegram.");
    else if (typeof alert === "function") alert("Войдите через Telegram, чтобы подать заявку.");
    return;
  }
  fetch(base + "/api/chat", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pokerApiAuthJsonBody({ action: "clubChatApply" })),
  })
    .then(function (r) {
      return r.json();
    })
    .then(function (d) {
      if (d && d.ok) {
        setClubChatAccess(d.clubChatAccess || "pending");
        if (getClubChatAccess() === "revoked") {
          if (tg && tg.showAlert) tg.showAlert("Доступ к главному чату отозван администратором.");
          else if (typeof alert === "function") alert("Доступ к главному чату отозван администратором.");
          loadContacts();
          if (typeof loadGeneral === "function") loadGeneral();
          if (typeof updateClubChatPreview === "function") updateClubChatPreview([]);
          return;
        }
        if (tg && tg.showAlert) tg.showAlert("Заявка отправлена. После одобрения администратором чат откроется.");
        else if (typeof alert === "function") alert("Заявка отправлена.");
        try {
          var chatViewOn = !!document.querySelector('[data-view="chat"].view--active');
          var genVis = getGeneralView() && !getGeneralView().classList.contains("chat-general-view--hidden");
          if (chatViewOn && getChatActiveTab() === "general" && genVis && getGeneralMessages()) {
            renderGeneralAccessGate(getClubChatAccess());
            updateGeneralInputLocked(true);
          }
        } catch (eGateApply) {}
        loadContacts();
        if (typeof loadGeneral === "function") loadGeneral();
        if (typeof updateClubChatPreview === "function") updateClubChatPreview([]);
      } else if (tg && tg.showAlert) tg.showAlert((d && d.error) || "Ошибка");
      else if (typeof alert === "function") alert((d && d.error) || "Ошибка");
    })
    .catch(function () {
      if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
      else if (typeof alert === "function") alert(POKER_NET_ERR);
    });
}

function updateGeneralInputLocked(locked) {
  var area = document.getElementById("chatGeneralInputArea");
  if (area) area.classList.toggle("chat-input-area--locked", !!locked);
  if (getChatComposerEl() && getChatComposerMounted() === "general") getChatComposerEl().disabled = !!locked;
  var ab = document.getElementById("chatGeneralAttachBtn");
  if (ab) ab.disabled = !!locked;
  var eb = document.getElementById("chatGeneralEmojiBtn");
  if (eb) eb.disabled = !!locked;
  var sb = document.getElementById("chatGeneralSendBtn");
  if (sb) sb.disabled = !!locked;
}

function renderGeneralAccessGate(state) {
  if (!getGeneralMessages()) return;
  var wrapG = getGeneralMessages().parentElement;
  if (wrapG && wrapG.classList) wrapG.classList.remove("chat-messages-wrap--settling");
  var msg =
    state === "pending"
      ? "Заявка на рассмотрении. После одобрения администратором здесь появятся сообщения."
      : state === "revoked"
        ? "Доступ к главному чату отозван администратором."
        : "Главный чат доступен по заявке. Вернитесь к списку чатов, нажмите «Главный чат» и подайте заявку.";
  getGeneralMessages().innerHTML =
    '<div class="chat-general-gate"><p class="chat-empty">' + escapeHtml(msg) + "</p></div>";
}

  return {
    tryOpenClubChatFromDialogs: tryOpenClubChatFromDialogs,
    submitClubChatApplication: submitClubChatApplication,
    updateGeneralInputLocked: updateGeneralInputLocked,
    renderGeneralAccessGate: renderGeneralAccessGate,
  };
}

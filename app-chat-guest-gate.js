function initChatGuestGateRuntime(opts) {
  opts = opts || {};

  function getDialogsGuestGate() {
    return typeof opts.getDialogsGuestGate === "function" ? opts.getDialogsGuestGate() : null;
  }

  function setDialogsGuestGate(value) {
    if (typeof opts.setDialogsGuestGate === "function") opts.setDialogsGuestGate(value);
  }

  function isWebsiteGuestChatGateMode() {
    var isTelegramMini = !!(window.Telegram && window.Telegram.WebApp);
    if (isTelegramMini) return false;
    var hasSession = !!(pokerReadPwaTgSessionToken() || pokerReadPwaVkSessionToken());
    var isPwaGuest = false;
    try {
      isPwaGuest = !!pokerReadPwaGuestMode();
    } catch (ePwaGuestChat) {}
    var isPwaLike = false;
    try {
      isPwaLike =
        !!(
          document.documentElement &&
          document.documentElement.classList &&
          (document.documentElement.classList.contains("poker-ios-pwa") ||
            document.documentElement.classList.contains("poker-android-pwa"))
        );
    } catch (ePwaLikeChat) {}
    var hasTelegramIdentity = false;
    try {
      var resolvedUser =
        typeof getPokerResolvedTelegramUser === "function"
          ? getPokerResolvedTelegramUser()
          : null;
      if (
        resolvedUser &&
        ((resolvedUser.username && String(resolvedUser.username).trim()) ||
          (resolvedUser.first_name && String(resolvedUser.first_name).trim()) ||
          (resolvedUser.last_name && String(resolvedUser.last_name).trim()))
      ) {
        hasTelegramIdentity = true;
      }
    } catch (eResolvedChatUser) {}
    try {
      if (!hasTelegramIdentity) {
        var tgChat = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        var tgUser = tgChat && tgChat.initDataUnsafe ? tgChat.initDataUnsafe.user : null;
        if (
          tgUser &&
          ((tgUser.username && String(tgUser.username).trim()) ||
            (tgUser.first_name && String(tgUser.first_name).trim()) ||
            (tgUser.last_name && String(tgUser.last_name).trim()))
        ) {
          hasTelegramIdentity = true;
        }
      }
    } catch (eTelegramChatUser) {}
    var isStandaloneMode =
      (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
      window.navigator.standalone === true ||
      document.referrer.indexOf("android-app://") === 0;
    return !hasSession && !hasTelegramIdentity && !isStandaloneMode && !isPwaGuest && !isPwaLike;
  }

  function forceHideChatGuestGateForTelegram() {
    var isTelegramMini = !!(window.Telegram && window.Telegram.WebApp);
    if (!isTelegramMini) return false;
    var isGuestTelegram = false;
    try {
      isGuestTelegram = typeof pokerReadPwaGuestMode === "function" && pokerReadPwaGuestMode();
    } catch (eGuestTelegram) {}
    if (isGuestTelegram) return false;
    try {
      var dialogsGuestGate = getDialogsGuestGate();
      if (dialogsGuestGate) {
        dialogsGuestGate.hidden = true;
        dialogsGuestGate.style.display = "none";
        if (dialogsGuestGate.parentNode) dialogsGuestGate.parentNode.removeChild(dialogsGuestGate);
        setDialogsGuestGate(null);
      }
    } catch (eDlgGateHide) {}
    try {
      if (opts.contactsEl) {
        var guestBlocks = opts.contactsEl.querySelectorAll(".chat-guest-cta");
        var i;
        for (i = 0; i < guestBlocks.length; i++) {
          guestBlocks[i].hidden = true;
          guestBlocks[i].style.display = "none";
          if (guestBlocks[i].parentNode) guestBlocks[i].parentNode.removeChild(guestBlocks[i]);
        }
      }
    } catch (eContactsGateHide) {}
    return true;
  }

  function syncChatWebsiteGuestGate() {
    if (forceHideChatGuestGateForTelegram()) return false;
    var isPwaGuest = false;
    try {
      isPwaGuest = typeof pokerReadPwaGuestMode === "function" && pokerReadPwaGuestMode();
    } catch (eChatPwaGuestMode) {}
    var guestMode = isWebsiteGuestChatGateMode();
    var contactsFilter = document.getElementById("chatContactsFilter");
    var findWrap = opts.findByIdInputDialogs ? opts.findByIdInputDialogs.closest(".chat-find-by-id") : null;
    var dialogsGuestGate = getDialogsGuestGate();
    if (isPwaGuest) {
      if (dialogsGuestGate) dialogsGuestGate.hidden = true;
      if (opts.dialogsPrimaryBlock) opts.dialogsPrimaryBlock.classList.remove("profile-guest-hidden");
      if (contactsFilter) contactsFilter.classList.remove("profile-guest-hidden");
      if (opts.contactsEl) opts.contactsEl.classList.remove("profile-guest-hidden");
      if (findWrap) findWrap.classList.remove("profile-guest-hidden");
      if (opts.chatNewGroupBtn) opts.chatNewGroupBtn.classList.remove("profile-guest-hidden");
      return false;
    }
    if (dialogsGuestGate) dialogsGuestGate.hidden = !guestMode;
    if (opts.dialogsPrimaryBlock) opts.dialogsPrimaryBlock.classList.toggle("profile-guest-hidden", guestMode);
    if (contactsFilter) contactsFilter.classList.toggle("profile-guest-hidden", guestMode);
    if (opts.contactsEl) opts.contactsEl.classList.toggle("profile-guest-hidden", guestMode);
    if (findWrap) findWrap.classList.toggle("profile-guest-hidden", guestMode);
    if (opts.chatNewGroupBtn) opts.chatNewGroupBtn.classList.toggle("profile-guest-hidden", guestMode);
    if (!guestMode) return false;
    if (opts.contactsEl) opts.contactsEl.innerHTML = "";
    return true;
  }

  function bindGuestAuthButton() {
    var btn = opts.dialogsGuestAuthBtn;
    if (!btn || btn.dataset.bound === "1") return;
    btn.dataset.bound = "1";
    btn.addEventListener("click", function () {
      if (typeof window.__pokerOpenSiteHomeInstructionModal === "function") {
        window.__pokerOpenSiteHomeInstructionModal();
      }
    });
  }

  return {
    forceHideChatGuestGateForTelegram: forceHideChatGuestGateForTelegram,
    isWebsiteGuestChatGateMode: isWebsiteGuestChatGateMode,
    syncChatWebsiteGuestGate: syncChatWebsiteGuestGate,
    bindGuestAuthButton: bindGuestAuthButton,
  };
}

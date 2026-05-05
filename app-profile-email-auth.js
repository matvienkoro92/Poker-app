function syncProfileEmailAuthUi() {
  var section = document.getElementById("profileEmailAuthSection");
  var titleEl = document.getElementById("profileEmailAuthTitle");
  var textEl = document.getElementById("profileEmailAuthText");
  var linkedRow = document.getElementById("profileEmailAuthLinkedRow");
  var linkedValue = document.getElementById("profileEmailAuthLinkedValue");
  var tgLinkedRow = document.getElementById("profileTelegramLinkedRow");
  var tgLinkedValue = document.getElementById("profileTelegramLinkedValue");
  var formWrap = document.getElementById("profileEmailAuthForm");
  var emailInput = document.getElementById("profileEmailAuthInput");
  var codeInput = document.getElementById("profileEmailAuthCodeInput");
  var sendBtn = document.getElementById("profileEmailAuthSendBtn");
  var verifyBtn = document.getElementById("profileEmailAuthVerifyBtn");
  var feedbackEl = document.getElementById("profileEmailAuthFeedback");
  var tgSection = document.getElementById("profileTelegramLinkSection");
  var auth = window.__pokerTelegramAuth;
  var isGuest = !!(auth && auth.status === "guest");
  if (!isGuest) {
    try {
      isGuest = typeof pokerReadPwaGuestMode === "function" && pokerReadPwaGuestMode();
    } catch (eGuestMode) {}
  }
  var isVerified = !!(auth && (auth.status === "verified" || auth.status === "dev_skip"));
  var hasStoredSession = false;
  try {
    hasStoredSession = !!(pokerReadPwaTgSessionToken() || pokerReadPwaVkSessionToken());
  } catch (eProfileSession) {}
  var showProfileShell = !isGuest && (isVerified || hasStoredSession);
  syncProfileStatusVisibility(showProfileShell);
  syncProfileVerifiedContentVisibility(showProfileShell);
  var authMethod = pokerGetAuthMethod();
  var currentMemberId = "";
  try {
    currentMemberId =
      auth && auth.user && auth.user.memberId != null ? String(auth.user.memberId).trim() : "";
  } catch (eMemberId) {}
  if (!currentMemberId && typeof window.pokerResolveMyChatMemberId === "function") {
    try {
      currentMemberId = String(window.pokerResolveMyChatMemberId() || "").trim();
    } catch (eResolvedMid) {}
  }
  if (/^mail_/.test(currentMemberId) || /^mail_pending_/.test(currentMemberId)) authMethod = "email";
  else if (/^tg_/.test(currentMemberId) || /^vk_/.test(currentMemberId)) authMethod = "telegram";
  var linkedEmail = "";
  var linkedTelegramUsername = "";
  try {
    linkedEmail = String(window.__pokerProfileLinkedEmail || "").trim();
  } catch (e) {}
  if (!linkedEmail) linkedEmail = pokerReadProfileStorage(POKER_PROFILE_LINKED_EMAIL_CACHE_KEY);
  try {
    linkedTelegramUsername = String(window.__pokerProfileTelegramUsername || "").trim().replace(/^@+/, "");
  } catch (eTgLinked) {}
  if (!linkedTelegramUsername) {
    linkedTelegramUsername = pokerReadProfileStorage(POKER_PROFILE_TELEGRAM_USERNAME_CACHE_KEY).replace(/^@+/, "");
  }
  if (!linkedTelegramUsername) {
    try {
      linkedTelegramUsername =
        auth && auth.user && auth.user.username != null ? String(auth.user.username).trim().replace(/^@+/, "") : "";
    } catch (eAuthTgUsername) {}
  }
  if (!linkedTelegramUsername) {
    try {
      var resolvedUser = typeof getPokerResolvedTelegramUser === "function" ? getPokerResolvedTelegramUser() : null;
      linkedTelegramUsername = resolvedUser && resolvedUser.username != null ? String(resolvedUser.username).trim().replace(/^@+/, "") : "";
    } catch (eResolvedTgUsername) {}
  }
  if (!linkedEmail) {
    try {
      linkedEmail = auth && auth.user && auth.user.email != null ? String(auth.user.email).trim() : "";
    } catch (eAuthEmail) {}
  }
  if (linkedEmail && authMethod !== "telegram") authMethod = "email";
  if (section) section.hidden = !!isGuest || !isVerified;
  if (section && section.classList) section.classList.toggle("profile-email-auth--email-linked", !!linkedEmail);
  if (titleEl) titleEl.hidden = true;
  if (linkedRow) linkedRow.hidden = !linkedEmail;
  if (linkedValue && linkedEmail) linkedValue.textContent = linkedEmail;
  if (tgLinkedRow) tgLinkedRow.hidden = !linkedTelegramUsername;
  if (tgLinkedValue && linkedTelegramUsername) tgLinkedValue.textContent = "@" + linkedTelegramUsername;
  if (tgSection) tgSection.hidden = !!isGuest || !isVerified || authMethod !== "email";
  if (textEl) {
    if (isGuest) textEl.textContent = "Гостевой режим не поддерживает привязку почты. Сначала войдите в аккаунт.";
    else if (authMethod === "email" && linkedEmail) textEl.textContent = "Вы вошли по этой почте. Это ваш текущий способ входа.";
    else if (linkedEmail) textEl.textContent = "Эта почта уже привязана. По ней можно входить в аккаунт на экране авторизации.";
    else textEl.textContent = "Привяжите email, чтобы потом можно было входить в аккаунт по почте.";
    textEl.hidden = true;
  }
  if (formWrap) {
    formWrap.hidden = !!isGuest || !isVerified || !!linkedEmail;
    formWrap.style.display = isGuest || !isVerified || linkedEmail ? "none" : "";
  }
  if (emailInput) emailInput.style.display = isGuest || !isVerified || linkedEmail ? "none" : "";
  if (codeInput) codeInput.style.display = isGuest || !isVerified || linkedEmail ? "none" : "";
  if (sendBtn) sendBtn.style.display = isGuest || !isVerified || linkedEmail ? "none" : "";
  if (verifyBtn) verifyBtn.style.display = isGuest || !isVerified || linkedEmail ? "none" : "";
  if (feedbackEl) feedbackEl.style.display = isGuest || !isVerified || linkedEmail ? "none" : "";
  var disableInputs = !isVerified || isGuest;
  if (emailInput) {
    emailInput.disabled = disableInputs;
    if (linkedEmail && !emailInput.value) emailInput.value = linkedEmail;
  }
  if (codeInput) codeInput.disabled = disableInputs;
  if (sendBtn) sendBtn.disabled = disableInputs;
  if (verifyBtn) verifyBtn.disabled = disableInputs;
}

function initProfileEmailAuth() {
  var emailInput = document.getElementById("profileEmailAuthInput");
  var codeInput = document.getElementById("profileEmailAuthCodeInput");
  var sendBtn = document.getElementById("profileEmailAuthSendBtn");
  var verifyBtn = document.getElementById("profileEmailAuthVerifyBtn");
  var feedback = document.getElementById("profileEmailAuthFeedback");
  var tgLinkBtn = document.getElementById("profileTelegramLinkBtn");
  var tgLinkFeedback = document.getElementById("profileTelegramLinkFeedback");
  if (!emailInput || !codeInput || !sendBtn || !verifyBtn) return;
  if (sendBtn.dataset.bound === "1") {
    syncProfileEmailAuthUi();
    return;
  }
  sendBtn.dataset.bound = "1";
  var base = getApiBase();
  function setFeedback(text, isError) {
    if (!feedback) return;
    feedback.textContent = text || "";
    feedback.style.color = isError ? "#ef4444" : "";
  }
  function authBody(extra) {
    return pokerGuestOrAuthedPostBody(extra || {});
  }
  function refreshLinkedEmail() {
    if (!base) return Promise.resolve();
    if (typeof pokerApiHasCredential === "function" && pokerApiHasCredential()) {
      return loadCurrentProfileUserInfo()
        .then(function (data) {
          pokerApplyProfileUserInfo(data);
          syncProfileEmailAuthUi();
        })
        .catch(function () {});
    }
    return fetch(base + "/api/auth-email-link" + (typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("?") : "?initData="))
      .then(function (r) { return r.json().catch(function () { return {}; }); })
      .then(function (data) {
        if (data && data.ok) {
          try {
            window.__pokerProfileLinkedEmail = data.email != null ? String(data.email).trim() : "";
            pokerWriteProfileStorage(POKER_PROFILE_LINKED_EMAIL_CACHE_KEY, window.__pokerProfileLinkedEmail);
          } catch (eLinkedEmail) {}
          syncProfileEmailAuthUi();
        }
      })
      .catch(function () {});
  }
  codeInput.addEventListener("input", function () {
    codeInput.value = String(codeInput.value || "").replace(/\D/g, "").slice(0, 6);
  });
  sendBtn.addEventListener("click", function () {
    if (!base) {
      setFeedback("Сервер недоступен.", true);
      return;
    }
    setFeedback("Отправляем код…", false);
    fetch(base + "/api/auth-email-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authBody({ action: "request", email: emailInput.value })),
    })
      .then(function (r) { return r.json().catch(function () { return {}; }); })
      .then(function (data) {
        setFeedback(data && data.ok ? "Код отправлен на почту." : ((data && data.error) || "Не удалось отправить код."), !(data && data.ok));
      })
      .catch(function () {
        setFeedback(POKER_NET_ERR, true);
      });
  });
  verifyBtn.addEventListener("click", function () {
    if (!base) {
      setFeedback("Сервер недоступен.", true);
      return;
    }
    setFeedback("Проверяем код…", false);
    fetch(base + "/api/auth-email-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authBody({ action: "verify", email: emailInput.value, code: codeInput.value })),
    })
      .then(function (r) { return r.json().catch(function () { return {}; }); })
      .then(function (data) {
        if (data && data.ok) {
          window.__pokerProfileLinkedEmail = data.email ? String(data.email).trim() : String(emailInput.value || "").trim();
          pokerWriteProfileStorage(POKER_PROFILE_LINKED_EMAIL_CACHE_KEY, window.__pokerProfileLinkedEmail);
          setFeedback("Почта привязана.", false);
          syncProfileEmailAuthUi();
          updateProfileUserMeta();
          return;
        }
        setFeedback((data && data.error) || "Не удалось привязать почту.", true);
      })
      .catch(function () {
        setFeedback(POKER_NET_ERR, true);
      });
  });
  if (tgLinkBtn && tgLinkBtn.dataset.bound !== "1") {
    tgLinkBtn.dataset.bound = "1";
    tgLinkBtn.addEventListener("click", function () {
      try {
        if (tgLinkFeedback) tgLinkFeedback.textContent = "";
        if (typeof window.__pokerOpenPwaLoginScreen === "function") {
          window.__pokerOpenPwaLoginScreen();
          if (tgLinkFeedback) tgLinkFeedback.textContent = "Откройте вход через Telegram и завершите привязку.";
        } else if (tgLinkFeedback) {
          tgLinkFeedback.textContent = "Откройте вход через Telegram на этом устройстве.";
        }
      } catch (eTgLink) {
        if (tgLinkFeedback) tgLinkFeedback.textContent = "Не удалось открыть привязку Telegram.";
      }
    });
  }
  syncProfileEmailAuthUi();
  refreshLinkedEmail();
}

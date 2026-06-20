function getProfileGreetingName() {
  var preferredName = "";
  try {
    preferredName = typeof pokerPreferredProfileDisplayName === "function" ? pokerPreferredProfileDisplayName() : "";
  } catch (ePreferredName) {}
  if (preferredName) return preferredName;

  var chatDisplayName = "";
  try {
    chatDisplayName = String(window.__pokerChatDisplayName || "").trim();
  } catch (eChatDisplay) {}
  if (chatDisplayName) return chatDisplayName;

  var tgUsername = "";
  try {
    var auth = window.__pokerTelegramAuth;
    tgUsername =
      auth && auth.user && auth.user.username != null ? String(auth.user.username).trim().replace(/^@+/, "") : "";
  } catch (eAuthUsername) {}
  if (!tgUsername) {
    try {
      var resolvedUser = typeof getPokerResolvedTelegramUser === "function" ? getPokerResolvedTelegramUser() : null;
      tgUsername = resolvedUser && resolvedUser.username != null ? String(resolvedUser.username).trim().replace(/^@+/, "") : "";
    } catch (eResolvedUsername) {}
  }
  if (tgUsername) return "@" + tgUsername;

  var authMethod = "";
  try {
    authMethod = String(pokerGetAuthMethod() || "").trim().toLowerCase();
  } catch (eAuthMethod) {}
  if (authMethod === "email") return "NoName";

  var linkedEmail = "";
  try {
    linkedEmail = String(window.__pokerProfileLinkedEmail || "").trim();
  } catch (eLinkedEmail) {}
  if (linkedEmail) return "NoName";

  return "NoName";
}

function updateProfileUserName() {
  var el = document.getElementById("profileUserName");
  if (!el) return;
  var textEl = document.getElementById("profileUserNameText") || el;
  var name = getProfileGreetingName();
  var isEmptyName = !name || String(name).trim() === "NoName";
  textEl.textContent = isEmptyName ? "Добавьте имя" : name;
  el.classList.toggle("profile-hero-card__name--empty", isEmptyName);
  updateProfileUserMeta();
  if (typeof refreshProfilePublicShowcase === "function") refreshProfilePublicShowcase();
  pokerScheduleProfileHeroTextFit();
}

function pokerFitProfileTextOneLine(el, cssVarName, maxPx, minPx) {
  if (!el) return;
  var parent = el.parentElement || el;
  var available = Math.floor(el.clientWidth || parent.clientWidth || 0);
  if (!available) return;
  el.style.setProperty(cssVarName, maxPx + "px");
  var size = maxPx;
  while (size > minPx && el.scrollWidth > available + 1) {
    size -= 1;
    el.style.setProperty(cssVarName, size + "px");
  }
}

function pokerFitProfileHeroText() {
  var nameEl = document.getElementById("profileUserName");
  var nameTextEl = document.getElementById("profileUserNameText");
  var idEl = document.getElementById("profileUserId");
  var idRow = idEl && idEl.closest ? idEl.closest(".profile-hero-card__id") : null;
  var vw = Math.max(320, Math.min(window.innerWidth || 390, 900));
  var nameMax = Math.max(18, Math.min(42, Math.round(vw * 0.072)));
  if (nameEl && nameEl.classList.contains("profile-hero-card__name--empty")) {
    nameMax = Math.max(18, Math.min(30, Math.round(vw * 0.064)));
  }
  var idMax = vw <= 430 ? 16 : 15;
  pokerFitProfileTextOneLine(nameTextEl || nameEl, "--profile-name-font-size", nameMax, 10);
  if (idRow && !idRow.hidden) pokerFitProfileTextOneLine(idRow, "--profile-id-font-size", idMax, 10);
}

function pokerScheduleProfileHeroTextFit() {
  var raf = window.requestAnimationFrame || function (fn) { return setTimeout(fn, 16); };
  raf(function () {
    pokerFitProfileHeroText();
    raf(pokerFitProfileHeroText);
  });
}

if (!window.__pokerProfileHeroTextFitBound) {
  window.__pokerProfileHeroTextFitBound = true;
  window.addEventListener("resize", pokerScheduleProfileHeroTextFit, { passive: true });
  try {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(pokerScheduleProfileHeroTextFit).catch(function () {});
    }
  } catch (eProfileFontsFit) {}
}

function closeProfileNameEditor() {
  var editor = document.getElementById("profileChatNameEditor");
  if (editor) editor.hidden = true;
}

function openProfileNameEditor() {
  var editor = document.getElementById("profileChatNameEditor");
  var input = document.getElementById("profileChatDisplayNameInput");
  if (!editor || !input) return;
  editor.hidden = false;
  try {
    input.value = pokerPreferredProfileDisplayName() || "";
  } catch (eNamePrefill) {}
  requestAnimationFrame(function () {
    try {
      input.focus({ preventScroll: true });
      input.select();
    } catch (eNameFocus) {}
  });
}

function initProfileNameEditor() {
  var btn = document.getElementById("profileNameEditBtn");
  var input = document.getElementById("profileChatDisplayNameInput");
  if (!btn || !input || btn.dataset.bound === "1") return;
  btn.dataset.bound = "1";
  btn.addEventListener("click", function () {
    var editor = document.getElementById("profileChatNameEditor");
    if (editor && !editor.hidden) closeProfileNameEditor();
    else openProfileNameEditor();
  });
  input.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      e.preventDefault();
      closeProfileNameEditor();
    } else if (e.key === "Enter") {
      e.preventDefault();
      var saveBtn = document.getElementById("profileSaveBtn");
      if (saveBtn) saveBtn.click();
    }
  });
}

// Local chat message templates modal.

function initChatTemplatesModal(opts) {
  opts = opts || {};
  var escapeHtml = typeof opts.escapeHtml === "function"
    ? opts.escapeHtml
    : function (s) {
        return String(s == null ? "" : s)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
      };
  var applyTemplateToComposer = typeof opts.applyTemplateToComposer === "function"
    ? opts.applyTemplateToComposer
    : function () {};
  var sendTemplateMessage = typeof opts.sendTemplateMessage === "function"
    ? opts.sendTemplateMessage
    : function () {};

// Шаблоны сообщений (локально в браузере, вызываются через "/").
// Формат: [{ title: string, text: string }]. Старый формат ({ text }) мигрируем на лету.
var CHAT_TEMPLATES_KEY = "chat_message_templates_v1";
function normalizeTemplateTitleFromText(text) {
  var t = (text || "").trim();
  if (!t) return "";
  var firstLine = t.split("\n")[0] || t;
  firstLine = firstLine.trim().replace(/\s+/g, " ");
  return firstLine.slice(0, 40) || "Шаблон";
}
function loadTemplates() {
  try {
    var raw = localStorage.getItem(CHAT_TEMPLATES_KEY);
    var arr = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(arr)) return [];
    var out = [];
    for (var i = 0; i < arr.length; i++) {
      var it = arr[i];
      if (!it) continue;
      var text = typeof it.text === "string" ? it.text.trim() : "";
      if (!text) continue;
      var title = typeof it.title === "string" ? it.title.trim() : "";
      if (!title) title = normalizeTemplateTitleFromText(text);
      out.push({ title: title.slice(0, 40), text: text });
    }
    return out.slice(0, 20);
  } catch (e) { return []; }
}
function saveTemplates(list) {
  try {
    localStorage.setItem(CHAT_TEMPLATES_KEY, JSON.stringify(list || []));
  } catch (e) {}
}
var chatTemplates = loadTemplates();
function upsertTemplate(title, text) {
  var tText = (text || "").trim();
  if (!tText) return;
  var tTitle = (title || "").trim();
  if (!tTitle) tTitle = normalizeTemplateTitleFromText(tText);
  tTitle = tTitle.slice(0, 40);
  var key = tTitle.toLowerCase();
  var existingIndex = -1;
  for (var i = 0; i < chatTemplates.length; i++) {
    var k = (chatTemplates[i] && chatTemplates[i].title ? String(chatTemplates[i].title) : "").trim().toLowerCase();
    if (k === key) { existingIndex = i; break; }
  }
  if (existingIndex >= 0) {
    chatTemplates.splice(existingIndex, 1);
  }
  chatTemplates.unshift({ title: tTitle, text: tText });
  if (chatTemplates.length > 20) chatTemplates.length = 20;
  saveTemplates(chatTemplates);
}

// UI: модалка шаблонов
var chatTemplatesModal = document.getElementById("chatTemplatesModal");
var chatTemplatesModalBackdrop = document.getElementById("chatTemplatesModalBackdrop");
var chatTemplatesModalClose = document.getElementById("chatTemplatesModalClose");
var chatTemplatesModalAddBtn = document.getElementById("chatTemplatesModalAddBtn");
var chatTemplatesModalList = document.getElementById("chatTemplatesModalList");
var chatTemplatesModalForm = document.getElementById("chatTemplatesModalForm");
var chatTemplatesModalTitleInput = document.getElementById("chatTemplatesModalTitleInput");
var chatTemplatesModalTextInput = document.getElementById("chatTemplatesModalTextInput");
var chatTemplatesModalCancelBtn = document.getElementById("chatTemplatesModalCancelBtn");
var chatTemplatesModalSaveBtn = document.getElementById("chatTemplatesModalSaveBtn");
var chatTemplatesModalHint = document.getElementById("chatTemplatesModalHint");
var chatTemplatesTargetChannel = null;
var chatTemplatesEditingIndex = -1;

function setTemplatesHint(text) {
  if (!chatTemplatesModalHint) return;
  chatTemplatesModalHint.textContent = text || "";
}
function templatesShowForm(show, editIndex) {
  if (!chatTemplatesModalForm) return;
  chatTemplatesEditingIndex = typeof editIndex === "number" && editIndex >= 0 ? editIndex : -1;
  if (show) chatTemplatesModalForm.classList.remove("chat-templates-modal__form--hidden");
  else chatTemplatesModalForm.classList.add("chat-templates-modal__form--hidden");
  setTemplatesHint("");
}
function templatesResetForm() {
  if (chatTemplatesModalTitleInput) chatTemplatesModalTitleInput.value = "";
  if (chatTemplatesModalTextInput) chatTemplatesModalTextInput.value = "";
  chatTemplatesEditingIndex = -1;
  setTemplatesHint("");
}
function templatesFillForm(title, text) {
  if (chatTemplatesModalTitleInput) chatTemplatesModalTitleInput.value = title || "";
  if (chatTemplatesModalTextInput) chatTemplatesModalTextInput.value = text || "";
}
function deleteTemplateAtIndex(idx) {
  chatTemplates = loadTemplates();
  if (idx < 0 || idx >= chatTemplates.length) return;
  chatTemplates.splice(idx, 1);
  saveTemplates(chatTemplates);
  renderTemplatesList();
}
function replaceTemplateAtIndex(idx, title, text) {
  chatTemplates = loadTemplates();
  if (idx < 0 || idx >= chatTemplates.length) return;
  var tTitle = (title || "").trim().slice(0, 40);
  var tText = (text || "").trim();
  if (!tText) return;
  chatTemplates[idx] = { title: tTitle || "Шаблон", text: tText };
  saveTemplates(chatTemplates);
  renderTemplatesList();
}
function renderTemplatesList() {
  if (!chatTemplatesModalList) return;
  chatTemplates = loadTemplates();
  if (!chatTemplates || chatTemplates.length === 0) {
    chatTemplatesModalList.innerHTML = "<p class=\"chat-templates-modal__empty\">Пока нет шаблонов. Нажмите «＋», чтобы добавить.</p>";
    return;
  }
  chatTemplatesModalList.innerHTML = chatTemplates.map(function (t, idx) {
    var title = escapeHtml((t && t.title) || ("Шаблон " + (idx + 1)));
    return "<div class=\"chat-templates-modal__item\" data-template-index=\"" + idx + "\">" +
      "<button type=\"button\" class=\"chat-templates-modal__item-main\">" +
        "<span class=\"chat-templates-modal__item-title\">" + title + "</span>" +
        "<span class=\"chat-templates-modal__item-arrow\" aria-hidden=\"true\">→</span>" +
      "</button>" +
      "<button type=\"button\" class=\"chat-templates-modal__item-btn chat-templates-modal__item-btn--edit\" data-action=\"edit\" data-template-index=\"" + idx + "\" aria-label=\"Редактировать\">✎</button>" +
      "<button type=\"button\" class=\"chat-templates-modal__item-btn chat-templates-modal__item-btn--delete\" data-action=\"delete\" data-template-index=\"" + idx + "\" aria-label=\"Удалить\">✕</button>" +
    "</div>";
  }).join("");
}
function openTemplatesModal(targetChannel) {
  if (!chatTemplatesModal) return;
  if (targetChannel !== "general" && targetChannel !== "personal") return;
  chatTemplatesTargetChannel = targetChannel;
  // базовый пример, чтобы было что выбрать
  chatTemplates = loadTemplates();
  if (!chatTemplates || chatTemplates.length === 0) {
    upsertTemplate("Приветствие", "Добрый вечер!");
  }
  renderTemplatesList();
  templatesShowForm(false);
  templatesResetForm();
  chatTemplatesModal.classList.add("chat-templates-modal--open");
  chatTemplatesModal.setAttribute("aria-hidden", "false");
}
function closeTemplatesModal() {
  if (!chatTemplatesModal) return;
  chatTemplatesModal.classList.remove("chat-templates-modal--open");
  chatTemplatesModal.setAttribute("aria-hidden", "true");
  chatTemplatesTargetChannel = null;
  templatesShowForm(false);
  templatesResetForm();
}

if (chatTemplatesModal) {
  if (chatTemplatesModalBackdrop) chatTemplatesModalBackdrop.addEventListener("click", closeTemplatesModal);
  if (chatTemplatesModalClose) chatTemplatesModalClose.addEventListener("click", closeTemplatesModal);
  if (chatTemplatesModalAddBtn) chatTemplatesModalAddBtn.addEventListener("click", function () {
    templatesResetForm();
    templatesShowForm(true);
    if (chatTemplatesModalTitleInput) chatTemplatesModalTitleInput.focus();
  });
  if (chatTemplatesModalCancelBtn) chatTemplatesModalCancelBtn.addEventListener("click", function () {
    templatesShowForm(false);
    templatesResetForm();
  });
  if (chatTemplatesModalSaveBtn) chatTemplatesModalSaveBtn.addEventListener("click", function () {
    var title = chatTemplatesModalTitleInput ? chatTemplatesModalTitleInput.value : "";
    var text = chatTemplatesModalTextInput ? chatTemplatesModalTextInput.value : "";
    title = (title || "").trim();
    text = (text || "").trim();
    if (!title) { setTemplatesHint("Введите заголовок."); if (chatTemplatesModalTitleInput) chatTemplatesModalTitleInput.focus(); return; }
    if (!text) { setTemplatesHint("Введите текст шаблона."); if (chatTemplatesModalTextInput) chatTemplatesModalTextInput.focus(); return; }
    if (chatTemplatesEditingIndex >= 0) {
      replaceTemplateAtIndex(chatTemplatesEditingIndex, title, text);
    } else {
      upsertTemplate(title, text);
    }
    renderTemplatesList();
    templatesShowForm(false);
    templatesResetForm();
    setTemplatesHint("Сохранено.");
  });
  chatTemplatesModal.addEventListener("click", function (e) {
    var editBtn = e.target && e.target.closest ? e.target.closest(".chat-templates-modal__item-btn[data-action=\"edit\"]") : null;
    var delBtn = e.target && e.target.closest ? e.target.closest(".chat-templates-modal__item-btn[data-action=\"delete\"]") : null;
    var mainBtn = e.target && e.target.closest ? e.target.closest(".chat-templates-modal__item-main") : null;
    if (editBtn) {
      e.preventDefault();
      e.stopPropagation();
      var idx = parseInt(editBtn.getAttribute("data-template-index") || "", 10);
      if (isNaN(idx) || idx < 0) return;
      chatTemplates = loadTemplates();
      var t = chatTemplates[idx];
      if (t) {
        templatesFillForm(t.title, t.text);
        templatesShowForm(true, idx);
        if (chatTemplatesModalTitleInput) chatTemplatesModalTitleInput.focus();
      }
      return;
    }
    if (delBtn) {
      e.preventDefault();
      e.stopPropagation();
      var idx = parseInt(delBtn.getAttribute("data-template-index") || "", 10);
      if (!isNaN(idx) && idx >= 0 && (typeof confirm === "undefined" || confirm("Удалить этот шаблон?"))) {
        deleteTemplateAtIndex(idx);
      }
      return;
    }
    if (mainBtn) {
      var row = mainBtn.closest(".chat-templates-modal__item");
      if (!row) return;
      var idx = parseInt(row.getAttribute("data-template-index") || "", 10);
      if (isNaN(idx) || idx < 0) return;
      chatTemplates = loadTemplates();
      var t = chatTemplates[idx];
      if (!t || !t.text) return;
      var ch = chatTemplatesTargetChannel;
      applyTemplateToComposer(ch, t.text);
      closeTemplatesModal();
      sendTemplateMessage(ch, t.text);
    }
  });
  document.addEventListener("keydown", function (e) {
    if (!chatTemplatesModal || chatTemplatesModal.getAttribute("aria-hidden") !== "false") return;
    if (e.key === "Escape") closeTemplatesModal();
  });
}

function showTemplatesMenu(channel) {
  openTemplatesModal(channel);
}
try {
  window.__pokerOpenChatTemplatesMenu = showTemplatesMenu;
} catch (eExposeTemplates) {}

  return showTemplatesMenu;
}

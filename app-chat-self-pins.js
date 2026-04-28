// Chat self pins: local pin storage, pinned bars and jump-to-message behavior.

function initChatSelfPins(opts) {
  opts = opts || {};
  var tg = opts.tg || null;
  var normalizePeerIdForChat = typeof opts.normalizePeerIdForChat === "function" ? opts.normalizePeerIdForChat : function (id) { return String(id || ""); };
  var pokerChatMessageHasPersistedId = typeof opts.pokerChatMessageHasPersistedId === "function" ? opts.pokerChatMessageHasPersistedId : function (id) { return id != null && String(id) !== ""; };
  var resolveMyChatDisplayName = typeof opts.resolveMyChatDisplayName === "function" ? opts.resolveMyChatDisplayName : function () { return "Игрок"; };
  var linkTgUsernames = typeof opts.linkTgUsernames === "function" ? opts.linkTgUsernames : function (s) { return s; };
  var linkAppIds = typeof opts.linkAppIds === "function" ? opts.linkAppIds : function (s) { return s; };
  var linkUrls = typeof opts.linkUrls === "function" ? opts.linkUrls : function (s) { return s; };
  var escapeHtml = typeof opts.escapeHtml === "function" ? opts.escapeHtml : function (s) { return String(s == null ? "" : s); };
  var pokerChatDisplayImageSrc = typeof opts.pokerChatDisplayImageSrc === "function" ? opts.pokerChatDisplayImageSrc : function (src) { return src || ""; };
  var getChatWithUserId = typeof opts.getChatWithUserId === "function" ? opts.getChatWithUserId : function () { return null; };
  var getGeneralMessagesEl = typeof opts.getGeneralMessagesEl === "function" ? opts.getGeneralMessagesEl : function () { return null; };
  var getMessagesEl = typeof opts.getMessagesEl === "function" ? opts.getMessagesEl : function () { return null; };
  var attachContextMenuForOthers = typeof opts.attachContextMenuForOthers === "function" ? opts.attachContextMenuForOthers : function () {};

var CHAT_SELF_PINS_STORAGE_KEY = "poker_chat_self_pins_v1";
function pokerSelfPinStorageKey(source, peerId) {
  return source === "general" ? "g" : "p:" + normalizePeerIdForChat(peerId || "");
}
function pokerLoadSelfPinsBucket() {
  try {
    var raw = localStorage.getItem(CHAT_SELF_PINS_STORAGE_KEY);
    var o = raw ? JSON.parse(raw) : {};
    return o && typeof o === "object" ? o : {};
  } catch (eB) {
    return {};
  }
}
function pokerPersistSelfPinsBucket(bucket) {
  try {
    localStorage.setItem(CHAT_SELF_PINS_STORAGE_KEY, JSON.stringify(bucket));
  } catch (eP) {}
}
function pokerGetSelfPin(source, peerId) {
  var b = pokerLoadSelfPinsBucket();
  var rec = b[pokerSelfPinStorageKey(source, peerId)];
  return rec && pokerChatMessageHasPersistedId(rec.id) ? rec : null;
}
function pokerSetSelfPin(source, peerId, record) {
  if (!record || !pokerChatMessageHasPersistedId(record.id)) return;
  var b = pokerLoadSelfPinsBucket();
  b[pokerSelfPinStorageKey(source, peerId)] = record;
  pokerPersistSelfPinsBucket(b);
}
function pokerClearSelfPin(source, peerId) {
  var b = pokerLoadSelfPinsBucket();
  delete b[pokerSelfPinStorageKey(source, peerId)];
  pokerPersistSelfPinsBucket(b);
}
function pokerMaybeClearSelfPinIfIdMissing(source, peerId, messages) {
  var pin = pokerGetSelfPin(source, peerId);
  if (!pin || !pokerChatMessageHasPersistedId(pin.id)) return;
  var list = messages || [];
  if (!list.some(function (m) {
    return m && String(m.id) === String(pin.id);
  })) {
    pokerClearSelfPin(source, peerId);
  }
}
function pokerBuildSelfPinRecord(msg, el) {
  if (!msg || !pokerChatMessageHasPersistedId(msg.id)) return null;
  var fromName = (msg.fromName || (msg.own ? resolveMyChatDisplayName() : "Игрок") || "Игрок").trim();
  var text = (msg.text != null ? String(msg.text) : "").trim();
  if (text.length > 400) text = text.slice(0, 400) + "…";
  var imgEl = el && el.querySelector ? el.querySelector(".chat-msg__image") : null;
  var imageSrc = imgEl && imgEl.src ? String(imgEl.src) : "";
  if (!imageSrc && msg.image) imageSrc = String(msg.image);
  var docName = "";
  if (el && el.querySelector) {
    var dl = el.querySelector(".chat-msg__document-link--view");
    if (dl && dl.textContent) docName = String(dl.textContent).replace(/^📄\s*/, "").trim();
  }
  return {
    id: String(msg.id),
    own: !!msg.own,
    fromName: fromName || "Игрок",
    text: text,
    hasImage: !!(msg.hasImage || msg.image),
    hasVoice: !!msg.hasVoice,
    hasDocument: !!msg.hasDocument,
    imageSrc: imageSrc && imageSrc.indexOf("blob:") !== 0 ? imageSrc : "",
    documentName: docName || "",
  };
}
function pokerRenderSelfPinnedInnerHtml(pin, labelOpt, stubExtraClass) {
  if (!pin || !pokerChatMessageHasPersistedId(pin.id)) return "";
  var label = typeof labelOpt === "string" && labelOpt.trim() ? labelOpt.trim() : "Закреплено для вас";
  var extraStub =
    stubExtraClass && String(stubExtraClass).trim() ? String(stubExtraClass).trim() + " " : "";
  var isOwn = !!pin.own;
  var cls = "chat-msg " + extraStub + "chat-msg--self-pin-stub " + (isOwn ? "chat-msg--own" : "chat-msg--other");
  var bodyMain = "";
  var pinThumbSrc = pin.imageSrc && String(pin.imageSrc).trim() && String(pin.imageSrc).indexOf("blob:") !== 0
    ? String(pin.imageSrc).trim()
    : "";
  if (pinThumbSrc) {
    cls += " chat-msg--pin-with-thumb";
    var textCol = "";
    if (pin.text) {
      textCol =
        '<div class="chat-pinned-self__text-col"><div class="chat-msg__text">' +
        linkTgUsernames(linkAppIds(linkUrls(escapeHtml(pin.text).replace(/\n/g, "<br>")))) +
        "</div></div>";
    }
    bodyMain +=
      '<div class="chat-pinned-self__media-row' +
      (textCol ? "" : " chat-pinned-self__media-row--thumb-only") +
      '">' +
      '<div class="chat-pinned-self__thumb-wrap"><img class="chat-pinned-self__thumb" src="' +
      escapeHtml(pokerChatDisplayImageSrc(pinThumbSrc)) +
      '" alt="" loading="lazy" decoding="async" /></div>' +
      textCol +
      "</div>";
  } else if (pin.hasVoice) {
    bodyMain += '<div class="chat-msg__text"><span class="chat-pinned-self__placeholder">[Голосовое сообщение]</span></div>';
  } else if (pin.hasDocument) {
    bodyMain +=
      '<div class="chat-msg__text"><span class="chat-pinned-self__placeholder">📄 ' +
      escapeHtml((pin.documentName || "Документ").slice(0, 80)) +
      "</span></div>";
  } else if (pin.text) {
    bodyMain +=
      '<div class="chat-msg__text">' +
      linkTgUsernames(linkAppIds(linkUrls(escapeHtml(pin.text).replace(/\n/g, "<br>")))) +
      "</div>";
  } else {
    bodyMain += '<div class="chat-msg__text"><span class="chat-pinned-self__placeholder">[Сообщение]</span></div>';
  }
  var who = escapeHtml(pin.fromName || "Игрок");
  var foot =
    '<div class="chat-msg__footer"><span class="chat-msg__time" aria-hidden="true"> </span></div>';
  var innerMsg =
    '<div class="' +
    cls +
    '" data-msg-id="' +
    escapeHtml(pin.id) +
    '" data-msg-from-name="' +
    who +
    '"' +
    (pin.text ? ' data-msg-text="' + escapeHtml(pin.text) + '"' : "") +
    ">" +
    '<div class="chat-msg__row"><div class="chat-msg__body chat-msg__body--has-text">' +
    '<div class="chat-msg__body-main">' +
    bodyMain +
    foot +
    "</div></div></div></div>";
  return (
    '<div class="chat-pinned-self__label">' +
    escapeHtml(label) +
    "</div>" +
    innerMsg
  );
}
/** Прокрутка ленты к сообщению без scrollIntoView (не тянет document на iOS). */
function scrollChatListToMessageById(scrollEl, msgId) {
  if (!scrollEl || msgId == null || msgId === "") return;
  var want = String(msgId);
  var el = null;
  try {
    var nodes = scrollEl.querySelectorAll(".chat-msg[data-msg-id]");
    for (var i = 0; i < nodes.length; i++) {
      if (String(nodes[i].getAttribute("data-msg-id")) === want) {
        el = nodes[i];
        break;
      }
    }
  } catch (eQ) {
    return;
  }
  if (!el) {
    try {
      if (typeof tg !== "undefined" && tg && tg.showAlert) {
        tg.showAlert("Сообщения нет в загруженной части чата");
      } else if (typeof alert === "function") alert("Сообщения нет в загруженной части чата");
    } catch (eA) {}
    return;
  }
  var pad = 16;
  var cRect = scrollEl.getBoundingClientRect();
  var eRect = el.getBoundingClientRect();
  var relTop = eRect.top - cRect.top + scrollEl.scrollTop;
  try {
    scrollEl.scrollTop = Math.max(0, relTop - pad);
  } catch (eSc) {}
  try {
    el.classList.add("chat-msg--pinned-jump-flash");
    setTimeout(function () {
      try {
        el.classList.remove("chat-msg--pinned-jump-flash");
      } catch (eR) {}
    }, 1400);
  } catch (eF) {}
}
/** Тап по полосе закрепления — перейти к сообщению в ленте (длинное нажатие по-прежнему открывает меню). */
function bindChatPinnedBarNavigate(host, scrollEl) {
  if (!host || host.dataset.pokerPinnedBarNavigate === "1") return;
  host.dataset.pokerPinnedBarNavigate = "1";
  host.addEventListener("click", function (e) {
    if (!scrollEl) return;
    try {
      var menu = document.getElementById("chatContextMenu");
      if (menu && menu.classList.contains("chat-ctx-menu--visible")) return;
    } catch (eM) {}
    if (e.target && e.target.closest && e.target.closest("a")) return;
    var stub = null;
    try {
      stub = host.querySelector(".chat-msg[data-msg-id]");
    } catch (eStub) {}
    if (!stub) return;
    var mid = stub.getAttribute("data-msg-id");
    if (!mid) return;
    scrollChatListToMessageById(scrollEl, mid);
  });
}
function refreshChatSelfPinBars() {
  var gView = document.getElementById("chatGeneralView");
  var hasGlobalPinned = false;
  var hasSelfGeneralPinned = false;
  var gGlobalHost = document.getElementById("chatGeneralPinnedGlobal");
  if (gGlobalHost) {
    var gPinAll = window._chatGeneralCache && window._chatGeneralCache.generalPinned;
    if (!gPinAll || !pokerChatMessageHasPersistedId(gPinAll.id)) {
      gGlobalHost.classList.remove("chat-pinned-self--visible");
      gGlobalHost.innerHTML = "";
      gGlobalHost.setAttribute("aria-hidden", "true");
    } else {
      gGlobalHost.innerHTML = pokerRenderSelfPinnedInnerHtml(gPinAll, "Закреплено для всех", "chat-msg--global-pin-stub");
      gGlobalHost.classList.add("chat-pinned-self--visible");
      gGlobalHost.setAttribute("aria-hidden", "false");
      attachContextMenuForOthers(gGlobalHost, "general", getGeneralMessagesEl());
      hasGlobalPinned = true;
    }
  }
  var gHost = document.getElementById("chatGeneralPinnedSelf");
  if (gHost) {
    var gPin = pokerGetSelfPin("general", null);
    if (!gPin || !pokerChatMessageHasPersistedId(gPin.id)) {
      gHost.classList.remove("chat-pinned-self--visible");
      gHost.innerHTML = "";
      gHost.setAttribute("aria-hidden", "true");
    } else {
      gHost.innerHTML = pokerRenderSelfPinnedInnerHtml(gPin);
      gHost.classList.add("chat-pinned-self--visible");
      gHost.setAttribute("aria-hidden", "false");
      attachContextMenuForOthers(gHost, "general", getGeneralMessagesEl());
      hasSelfGeneralPinned = true;
    }
  }
  if (gView) {
    if (hasGlobalPinned || hasSelfGeneralPinned) gView.classList.add("chat-general-view--any-pinned");
    else gView.classList.remove("chat-general-view--any-pinned");
  }
  if (gGlobalHost) bindChatPinnedBarNavigate(gGlobalHost, getGeneralMessagesEl());
  if (gHost) bindChatPinnedBarNavigate(gHost, getGeneralMessagesEl());
  var convViewEl = document.getElementById("chatConvView");
  var pHost = document.getElementById("chatPersonalPinnedSelf");
  if (pHost) {
    var peerP = getChatWithUserId();
    var pPin = peerP ? pokerGetSelfPin("personal", peerP) : null;
    if (!pPin || !pokerChatMessageHasPersistedId(pPin.id) || !peerP) {
      pHost.classList.remove("chat-pinned-self--visible");
      pHost.innerHTML = "";
      pHost.setAttribute("aria-hidden", "true");
      if (convViewEl) convViewEl.classList.remove("chat-conv-view--self-pinned");
    } else {
      pHost.innerHTML = pokerRenderSelfPinnedInnerHtml(pPin);
      pHost.classList.add("chat-pinned-self--visible");
      pHost.setAttribute("aria-hidden", "false");
      if (convViewEl) convViewEl.classList.add("chat-conv-view--self-pinned");
      attachContextMenuForOthers(pHost, "personal", getMessagesEl());
    }
  } else if (convViewEl) {
    convViewEl.classList.remove("chat-conv-view--self-pinned");
  }
  if (pHost) bindChatPinnedBarNavigate(pHost, getMessagesEl());
}

  return {
    pokerSelfPinStorageKey: pokerSelfPinStorageKey,
    pokerLoadSelfPinsBucket: pokerLoadSelfPinsBucket,
    pokerPersistSelfPinsBucket: pokerPersistSelfPinsBucket,
    pokerGetSelfPin: pokerGetSelfPin,
    pokerSetSelfPin: pokerSetSelfPin,
    pokerClearSelfPin: pokerClearSelfPin,
    pokerMaybeClearSelfPinIfIdMissing: pokerMaybeClearSelfPinIfIdMissing,
    pokerBuildSelfPinRecord: pokerBuildSelfPinRecord,
    pokerRenderSelfPinnedInnerHtml: pokerRenderSelfPinnedInnerHtml,
    scrollChatListToMessageById: scrollChatListToMessageById,
    bindChatPinnedBarNavigate: bindChatPinnedBarNavigate,
    refreshChatSelfPinBars: refreshChatSelfPinBars,
  };
}

// Chat friend actions: add-friend prompt and dialog-preview friend button state.

function initChatFriendActions(opts) {
  opts = opts || {};
  var base = opts.base || "";
  var tg = opts.tg || null;
  var POKER_NET_ERR = opts.POKER_NET_ERR || "Ошибка сети";
  var resolveMyChatMemberId = typeof opts.resolveMyChatMemberId === "function" ? opts.resolveMyChatMemberId : function () { return ""; };
  var pokerApiHasCredential = typeof opts.pokerApiHasCredential === "function" ? opts.pokerApiHasCredential : function () { return false; };
  var peerChatIdsEqual = typeof opts.peerChatIdsEqual === "function" ? opts.peerChatIdsEqual : function (a, b) { return String(a || "") === String(b || ""); };
  var pokerChatPeerIdIsFriend = typeof opts.pokerChatPeerIdIsFriend === "function" ? opts.pokerChatPeerIdIsFriend : function () { return false; };
  var pokerApplyLocalFriendToChatContacts = typeof opts.pokerApplyLocalFriendToChatContacts === "function" ? opts.pokerApplyLocalFriendToChatContacts : function () {};
  var pokerRemoveLocalFriendFromChatContacts = typeof opts.pokerRemoveLocalFriendFromChatContacts === "function" ? opts.pokerRemoveLocalFriendFromChatContacts : function () {};
  var pokerApiAuthJsonBody = typeof opts.pokerApiAuthJsonBody === "function" ? opts.pokerApiAuthJsonBody : function (x) { return x || {}; };

function pokerDebugChatFriendAction(stage, payload) {
  try {
    var oldOverlay = document.getElementById("chatFriendDebugOverlay");
    if (oldOverlay && oldOverlay.parentNode) oldOverlay.parentNode.removeChild(oldOverlay);
  } catch (eDbgCleanup) {}
}
function syncChatDialogPreviewAddFriendBtn() {
  var btn = document.getElementById("chatDialogPreviewAddFriendBtn");
  var modal = document.getElementById("chatDialogPreviewModal");
  if (!btn || !modal) return;
  if (!modal.classList.contains("chat-dialog-preview-modal--open")) {
    btn.hidden = true;
    btn.style.display = "none";
    return;
  }
  var uid = modal.dataset.previewUserId;
  var myId = typeof resolveMyChatMemberId === "function" ? resolveMyChatMemberId() : "";
  var cant =
    !uid ||
    (typeof pokerApiHasCredential === "function" && !pokerApiHasCredential()) ||
    (myId && peerChatIdsEqual(uid, myId)) ||
    pokerChatPeerIdIsFriend(uid);
  btn.hidden = !!cant;
  btn.style.display = cant ? "none" : "";
  if (!cant) btn.disabled = false;
}
function pokerChatAddFriendWithPrompt(targetUserId, nameHint, onDone) {
  pokerDebugChatFriendAction("addFriendWithPrompt:start", {
    targetUserId: targetUserId || "",
    nameHint: nameHint || "",
    hasBase: !!base,
    base: base || "",
    hasAuthFn: typeof pokerApiHasCredential === "function",
    hasCredential:
      typeof pokerApiHasCredential === "function" ? !!pokerApiHasCredential() : false,
    isAlreadyFriend: typeof pokerChatPeerIdIsFriend === "function" ? !!pokerChatPeerIdIsFriend(targetUserId) : false,
  });
  if (!targetUserId || !base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
    pokerDebugChatFriendAction("addFriendWithPrompt:blocked", {
      targetUserId: targetUserId || "",
      hasTargetUserId: !!targetUserId,
      hasBase: !!base,
      hasAuthFn: typeof pokerApiHasCredential === "function",
      hasCredential:
        typeof pokerApiHasCredential === "function" ? !!pokerApiHasCredential() : false,
    });
    if (typeof onDone === "function") onDone();
    return;
  }
  var defaultContact = (nameHint || "").trim();
  var prompted = null;
  try {
    prompted =
      typeof window.prompt === "function"
        ? window.prompt(
            "Имя контакта в списке друзей (над логином в Telegram).\nМожно оставить как есть или изменить:",
            defaultContact
          )
        : defaultContact;
  } catch (ePr) {
    prompted = defaultContact;
  }
  pokerDebugChatFriendAction("addFriendWithPrompt:promptResult", {
    targetUserId: targetUserId || "",
    defaultContact: defaultContact,
    promptedIsNull: prompted === null,
    promptedValue: prompted === null ? null : String(prompted),
  });
  if (prompted === null) {
    if (typeof onDone === "function") onDone();
    return;
  }
  var contactName = String(prompted).trim();
  pokerDebugChatFriendAction("addFriendWithPrompt:beforeOptimistic", {
    targetUserId: targetUserId || "",
    contactName: contactName,
    isFriendBeforeOptimistic:
      typeof pokerChatPeerIdIsFriend === "function" ? !!pokerChatPeerIdIsFriend(targetUserId) : false,
  });
  pokerApplyLocalFriendToChatContacts(targetUserId, contactName);
  syncChatDialogPreviewAddFriendBtn();
  pokerDebugChatFriendAction("addFriendWithPrompt:request", {
    targetUserId: targetUserId || "",
    requestUrl: base + "/api/friends",
    body: {
      targetUserId: targetUserId,
      contactName: contactName,
    },
  });
  fetch(base + "/api/friends", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pokerApiAuthJsonBody({ targetUserId: targetUserId, contactName: contactName })),
  })
    .then(function (r) {
      return r.json();
    })
    .then(function (d) {
      pokerDebugChatFriendAction("addFriendWithPrompt:response", {
        targetUserId: targetUserId || "",
        ok: !!(d && d.ok),
        response: d || null,
        isFriendAfterResponse:
          typeof pokerChatPeerIdIsFriend === "function" ? !!pokerChatPeerIdIsFriend(targetUserId) : false,
      });
      if (d && d.ok) {
        if (typeof window.__pokerReloadChatContacts === "function") window.__pokerReloadChatContacts();
        if (typeof window.chatRefresh === "function") window.chatRefresh();
        syncChatDialogPreviewAddFriendBtn();
      } else if (tg && tg.showAlert) {
        pokerRemoveLocalFriendFromChatContacts(targetUserId);
        syncChatDialogPreviewAddFriendBtn();
        tg.showAlert((d && d.error) || "Ошибка");
      }
    })
    .catch(function () {
      pokerDebugChatFriendAction("addFriendWithPrompt:error", {
        targetUserId: targetUserId || "",
        requestUrl: base + "/api/friends",
      });
      pokerRemoveLocalFriendFromChatContacts(targetUserId);
      syncChatDialogPreviewAddFriendBtn();
      if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
    })
    .finally(function () {
      pokerDebugChatFriendAction("addFriendWithPrompt:finally", {
        targetUserId: targetUserId || "",
        isFriendAtFinally:
          typeof pokerChatPeerIdIsFriend === "function" ? !!pokerChatPeerIdIsFriend(targetUserId) : false,
      });
      if (typeof onDone === "function") onDone();
    });
}

  return {
    pokerDebugChatFriendAction: pokerDebugChatFriendAction,
    syncChatDialogPreviewAddFriendBtn: syncChatDialogPreviewAddFriendBtn,
    pokerChatAddFriendWithPrompt: pokerChatAddFriendWithPrompt,
  };
}

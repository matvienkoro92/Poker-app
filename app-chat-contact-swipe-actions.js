// Chat contact swipe row actions: pin, add/remove friend, and swipe reveal.

function initChatContactSwipeActions(opts) {
  opts = opts || {};
  var contactsEl = opts.contactsEl || null;
  var base = opts.base || "";
  var tg = opts.tg || null;
  var POKER_NET_ERR = opts.POKER_NET_ERR || "Ошибка сети";
  var loadContacts = typeof opts.loadContacts === "function" ? opts.loadContacts : function () {};
  var pokerApiAuthJsonBody =
    typeof opts.pokerApiAuthJsonBody === "function" ? opts.pokerApiAuthJsonBody : function (body) { return body || {}; };
  var pokerDebugChatFriendAction =
    typeof opts.pokerDebugChatFriendAction === "function" ? opts.pokerDebugChatFriendAction : function () {};
  var pokerChatAddFriendWithPrompt =
    typeof opts.pokerChatAddFriendWithPrompt === "function" ? opts.pokerChatAddFriendWithPrompt : function () {};
  var pokerRemoveLocalFriendFromChatContacts =
    typeof opts.pokerRemoveLocalFriendFromChatContacts === "function" ? opts.pokerRemoveLocalFriendFromChatContacts : function () {};
  var pokerApplyLocalFriendToChatContacts =
    typeof opts.pokerApplyLocalFriendToChatContacts === "function" ? opts.pokerApplyLocalFriendToChatContacts : function () {};
  var pokerChatPeerIdIsFriend =
    typeof opts.pokerChatPeerIdIsFriend === "function" ? opts.pokerChatPeerIdIsFriend : function () { return false; };

  if (!contactsEl || contactsEl._chatContactSwipePinInit) return {};
  contactsEl._chatContactSwipePinInit = true;

  function getSwipeRevealPx(panel) {
    if (!panel) return 52;
    var w = panel.closest(".chat-contact-swipe");
    var actions = w && w.querySelector ? w.querySelector(".chat-contact-swipe__actions") : null;
    var measured = actions && actions.getBoundingClientRect ? Math.ceil(actions.getBoundingClientRect().width) : 0;
    if (measured > 0) return measured;
    if (w && w.classList.contains("chat-contact-swipe--pending-friend")) return 286;
    return w && w.classList.contains("chat-contact-swipe--wide-actions") ? 104 : 52;
  }
  var swipeState = null;
  function getPanelTx(panel) {
    if (!panel || !panel.style || !panel.style.transform) return 0;
    var m = String(panel.style.transform).match(/translateX\(\s*(-?[0-9.]+)px\s*\)/);
    return m ? parseFloat(m[1], 10) : 0;
  }
  function closeOtherSwipePanels(exceptPanel) {
    if (!contactsEl) return;
    contactsEl.querySelectorAll(".chat-contact-swipe__panel").forEach(function (p) {
      if (exceptPanel && p === exceptPanel) return;
      p.style.transform = "";
      p.classList.remove("chat-contact-swipe__panel--open");
      p.classList.remove("chat-contact-swipe__panel--dragging");
      var w0 = p.closest(".chat-contact-swipe");
      if (w0) w0.classList.remove("chat-contact-swipe--show-actions");
    });
  }
  function snapPanel(panel, open) {
    if (!panel) return;
    var rev = getSwipeRevealPx(panel);
    panel.style.transform = open ? "translateX(-" + rev + "px)" : "";
    panel.classList.toggle("chat-contact-swipe__panel--open", !!open);
  }
  function setSwipeFriendPending(btn, cbtn, pending) {
    if (!btn) return;
    var wrap = btn.closest(".chat-contact-swipe");
    var actions = wrap && wrap.querySelector ? wrap.querySelector(".chat-contact-swipe__actions") : null;
    if (actions) {
      actions.querySelectorAll(".chat-contact-swipe__friend, .chat-contact-swipe__friend-pending, .chat-contact-swipe__friend-cancel").forEach(function (el) {
        if (el && el.parentNode) el.parentNode.removeChild(el);
      });
      if (pending) {
        actions.insertAdjacentHTML("beforeend",
          '<span class="chat-contact-swipe__friend-pending" aria-label="Заявка в друзья отправлена">Заявка в друзья отправлена</span>' +
          '<button type="button" class="chat-contact-swipe__friend-cancel" data-chat-swipe-cancel-friend="1" aria-label="Отменить заявку" title="Отменить заявку">Отменить заявку</button>'
        );
      } else {
        actions.insertAdjacentHTML("beforeend", '<button type="button" class="chat-contact-swipe__friend" tabindex="-1" data-chat-swipe-add-friend="1" aria-label="В друзья" title="В друзья"><span class="chat-contact-swipe__friend-icon" aria-hidden="true">+</span></button>');
      }
    }
    if (wrap) wrap.classList.toggle("chat-contact-swipe--pending-friend", !!pending);
    if (cbtn) cbtn.setAttribute("data-chat-friend-pending", pending ? "1" : "0");
  }
  function clearLocalOutgoingFriendRequest(targetUserId) {
    var uid = targetUserId != null ? String(targetUserId) : "";
    if (!uid) return;
    try {
      var set = window.__pokerChatOutgoingFriendRequestIdsSet || {};
      delete set[uid];
      if (typeof normalizePeerIdForChat === "function") {
        var nxUid = normalizePeerIdForChat(uid);
        if (nxUid) delete set[nxUid];
      }
      try {
        for (var key in set) {
          if (set[key] && typeof peerChatIdsEqual === "function" && peerChatIdsEqual(key, uid)) delete set[key];
        }
      } catch (eClearLoop) {}
      window.__pokerChatOutgoingFriendRequestIdsSet = set;
    } catch (eClearReq) {}
  }

  contactsEl.addEventListener(
    "click",
    function (e) {
      var cbtn = e.target && e.target.closest ? e.target.closest(".chat-contact") : null;
      if (!cbtn || !contactsEl.contains(cbtn)) return;
      var u = cbtn._suppressNextClickUntil;
      if (u != null && Date.now() < Number(u)) {
        e.preventDefault();
        e.stopPropagation();
        cbtn._suppressNextClickUntil = 0;
      }
    },
    true
  );

  contactsEl.addEventListener(
    "click",
    function (e) {
      var cancelB = e.target && e.target.closest ? e.target.closest(".chat-contact-swipe__friend-cancel") : null;
      if (!cancelB || !contactsEl.contains(cancelB)) return;
      e.preventDefault();
      e.stopPropagation();
      var wrap = cancelB.closest(".chat-contact-swipe");
      var cbtn = wrap && wrap.querySelector(".chat-contact");
      var cid = cbtn && cbtn.dataset.chatId;
      var panel = wrap && wrap.querySelector(".chat-contact-swipe__panel");
      if (!cid || !base) return;
      cancelB.disabled = true;
      fetch(base + "/api/friends", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pokerApiAuthJsonBody({ action: "cancel", targetUserId: cid })),
      })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (d && d.ok) {
            clearLocalOutgoingFriendRequest(cid);
            setSwipeFriendPending(cancelB, cbtn, false);
            snapPanel(panel, true);
            if (typeof window.__pokerReloadChatContacts === "function") window.__pokerReloadChatContacts();
            if (typeof window.chatRefresh === "function") window.chatRefresh();
          } else {
            cancelB.disabled = false;
            if (tg && tg.showAlert) tg.showAlert((d && d.error) || "Ошибка");
          }
        })
        .catch(function () {
          cancelB.disabled = false;
          if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
        });
    },
    true
  );

  contactsEl.addEventListener(
    "click",
    function (e) {
      var pinB = e.target && e.target.closest ? e.target.closest(".chat-contact-swipe__pin") : null;
      if (!pinB || !contactsEl.contains(pinB)) return;
      e.preventDefault();
      e.stopPropagation();
      var wrap = pinB.closest(".chat-contact-swipe");
      var cbtn = wrap && wrap.querySelector(".chat-contact");
      var cid = cbtn && cbtn.dataset.chatId;
      if (!cid) return;
      var removing = pokerContactIsDialogListPinned(cid);
      pokerToggleChatDialogListPin(cid, removing);
      closeOtherSwipePanels(null);
      try {
        if (window.__pokerLastContactsApiData && typeof window.__pokerApplyContactsApiResponse === "function") {
          window.__pokerApplyContactsApiResponse(window.__pokerLastContactsApiData);
        }
      } catch (ePinApplyFast) {}
      loadContacts({ metaOnly: true });
    },
    true
  );

  contactsEl.addEventListener(
    "click",
    function (e) {
      var frB = e.target && e.target.closest ? e.target.closest(".chat-contact-swipe__friend") : null;
      pokerDebugChatFriendAction("click:add:received", {
        targetClassName: e.target && e.target.className ? String(e.target.className) : "",
        foundButton: !!frB,
        buttonClassName: frB && frB.className ? String(frB.className) : "",
        contactsContainsButton: !!(frB && contactsEl.contains(frB)),
      });
      if (!frB || !contactsEl.contains(frB)) return;
      if (frB.classList && frB.classList.contains("chat-contact-swipe__friend--remove")) {
        pokerDebugChatFriendAction("click:add:skipRemoveButton", {
          buttonClassName: frB.className ? String(frB.className) : "",
        });
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      var wrap = frB.closest(".chat-contact-swipe");
      var cbtn = wrap && wrap.querySelector(".chat-contact");
      var cid = cbtn && cbtn.dataset.chatId;
      var cnm = cbtn && cbtn.getAttribute("data-chat-name");
      pokerDebugChatFriendAction("click:add:resolved", {
        chatId: cid || "",
        chatName: cnm || "",
        isFriendNow: cbtn && cbtn.getAttribute("data-chat-friend") === "1",
        wrapClassName: wrap && wrap.className ? String(wrap.className) : "",
        contactButtonFound: !!cbtn,
        chatGroup: cbtn && cbtn.getAttribute ? cbtn.getAttribute("data-chat-group") : "",
      });
      if (!cid) return;
      var panel = wrap && wrap.querySelector(".chat-contact-swipe__panel");
      closeOtherSwipePanels(panel);
      setSwipeFriendPending(frB, cbtn, true);
      snapPanel(panel, true);
      pokerChatAddFriendWithPrompt(cid, cnm || "", function (d) {
        if (d && d.ok) {
          setSwipeFriendPending(frB, cbtn, true);
          snapPanel(panel, true);
          return;
        }
        setSwipeFriendPending(frB, cbtn, false);
        snapPanel(panel, true);
      });
    },
    true
  );

  contactsEl.addEventListener(
    "click",
    function (e) {
      var rmB = e.target && e.target.closest ? e.target.closest(".chat-contact-swipe__friend--remove") : null;
      pokerDebugChatFriendAction("click:remove:received", {
        targetClassName: e.target && e.target.className ? String(e.target.className) : "",
        foundButton: !!rmB,
        buttonClassName: rmB && rmB.className ? String(rmB.className) : "",
        contactsContainsButton: !!(rmB && contactsEl.contains(rmB)),
      });
      if (!rmB || !contactsEl.contains(rmB)) return;
      e.preventDefault();
      e.stopPropagation();
      var wrap = rmB.closest(".chat-contact-swipe");
      var cbtn = wrap && wrap.querySelector(".chat-contact");
      var cid = cbtn && cbtn.dataset.chatId;
      var prevName = cbtn && cbtn.getAttribute("data-chat-name");
      pokerDebugChatFriendAction("click:remove:resolved", {
        chatId: cid || "",
        prevName: prevName || "",
        isFriendNow: cbtn && cbtn.getAttribute("data-chat-friend") === "1",
        wrapClassName: wrap && wrap.className ? String(wrap.className) : "",
        contactButtonFound: !!cbtn,
        hasBase: !!base,
        base: base || "",
      });
      if (!cid) return;
      try {
        closeOtherSwipePanels(null);
      } catch (eClosePanels) {
        pokerDebugChatFriendAction("click:remove:closeOtherPanelsError", {
          chatId: cid || "",
          error: eClosePanels && eClosePanels.message ? eClosePanels.message : String(eClosePanels || ""),
        });
        throw eClosePanels;
      }
      try {
        pokerRemoveLocalFriendFromChatContacts(cid);
      } catch (eRemoveLocal) {
        pokerDebugChatFriendAction("click:remove:removeLocalError", {
          chatId: cid || "",
          error: eRemoveLocal && eRemoveLocal.message ? eRemoveLocal.message : String(eRemoveLocal || ""),
        });
        throw eRemoveLocal;
      }
      pokerDebugChatFriendAction("click:remove:afterOptimistic", {
        chatId: cid || "",
        isFriendAfterOptimistic: !!pokerChatPeerIdIsFriend(cid),
        requestUrl: base + "/api/friends",
      });
      fetch(base + "/api/friends", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pokerApiAuthJsonBody({ targetUserId: cid })),
      })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          pokerDebugChatFriendAction("click:remove:response", {
            chatId: cid || "",
            ok: !!(d && d.ok),
            response: d || null,
            isFriendAfterResponse: !!pokerChatPeerIdIsFriend(cid),
          });
          if (d && d.ok) {
            if (typeof window.__pokerReloadChatContacts === "function") window.__pokerReloadChatContacts();
            if (typeof window.chatRefresh === "function") window.chatRefresh();
          } else if (tg && tg.showAlert) {
            pokerApplyLocalFriendToChatContacts(cid, prevName || "");
            tg.showAlert((d && d.error) || "Ошибка");
          }
        })
        .catch(function () {
          pokerDebugChatFriendAction("click:remove:error", {
            chatId: cid || "",
            requestUrl: base + "/api/friends",
          });
          pokerApplyLocalFriendToChatContacts(cid, prevName || "");
          if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
        });
    },
    true
  );

  function onDocMove(e) {
    if (!swipeState || e.pointerId !== swipeState.ptrId) return;
    var dx = e.clientX - swipeState.startX;
    var dy = e.clientY - swipeState.startY;
    if (swipeState.mode == null) {
      var adx = Math.abs(dx);
      var ady = Math.abs(dy);
      if (ady > 22 && ady > adx * 1.35) {
        swipeState.mode = "vert";
        return;
      }
      if (adx > 10 && adx >= ady * 0.92) {
        swipeState.mode = "horiz";
        swipeState.panel.classList.add("chat-contact-swipe__panel--dragging");
        var wHoriz = swipeState.panel.closest(".chat-contact-swipe");
        if (wHoriz) wHoriz.classList.add("chat-contact-swipe--show-actions");
        closeOtherSwipePanels(swipeState.panel);
        try {
          swipeState.panel.setPointerCapture(e.pointerId);
        } catch (eCap) {}
      } else {
        return;
      }
    }
    if (swipeState.mode !== "horiz") return;
    e.preventDefault();
    var rev = swipeState.revealPx || 52;
    var tx = Math.max(-rev, Math.min(0, swipeState.startTx + dx));
    swipeState.panel.style.transform = "translateX(" + tx + "px)";
    if (Math.abs(dx) > 14) swipeState.didAxisDrag = true;
  }

  function onDocUp(e) {
    if (!swipeState || e.pointerId !== swipeState.ptrId) return;
    var st = swipeState;
    swipeState = null;
    try {
      if (st.panel && st.panel.releasePointerCapture) st.panel.releasePointerCapture(e.pointerId);
    } catch (eRel) {}
    document.removeEventListener("pointermove", onDocMove, true);
    document.removeEventListener("pointerup", onDocUp, true);
    document.removeEventListener("pointercancel", onDocUp, true);
    if (st.mode !== "horiz") return;
    if (st.panel) st.panel.classList.remove("chat-contact-swipe__panel--dragging");
    var txNow = getPanelTx(st.panel);
    var revUp = st.revealPx || 52;
    var snapOpen = txNow <= -revUp / 2;
    snapPanel(st.panel, snapOpen);
    var wUp = st.panel.closest(".chat-contact-swipe");
    if (wUp) wUp.classList.toggle("chat-contact-swipe--show-actions", !!snapOpen);
    if (st.didAxisDrag) {
      var cInner = st.panel.querySelector(".chat-contact");
      if (cInner) cInner._suppressNextClickUntil = Date.now() + 420;
    }
  }

  contactsEl.addEventListener(
    "pointerdown",
    function (e) {
      if (e.pointerType === "mouse" && e.button != null && e.button !== 0) return;
      var panel = e.target && e.target.closest ? e.target.closest(".chat-contact-swipe__panel") : null;
      if (!panel || !contactsEl.contains(panel)) return;
      if (e.target.closest && e.target.closest(".chat-contact-swipe__pin")) return;
      if (e.target.closest && e.target.closest(".chat-contact-swipe__friend")) return;
      var revealPx = getSwipeRevealPx(panel);
      if (swipeState) {
        document.removeEventListener("pointermove", onDocMove, true);
        document.removeEventListener("pointerup", onDocUp, true);
        document.removeEventListener("pointercancel", onDocUp, true);
        if (swipeState.panel) {
          swipeState.panel.classList.remove("chat-contact-swipe__panel--dragging");
          var wPr = swipeState.panel.closest(".chat-contact-swipe");
          if (wPr && !swipeState.panel.classList.contains("chat-contact-swipe__panel--open")) {
            wPr.classList.remove("chat-contact-swipe--show-actions");
          }
        }
        swipeState = null;
      }
      swipeState = {
        ptrId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        startTx: getPanelTx(panel),
        panel: panel,
        mode: null,
        didAxisDrag: false,
        revealPx: revealPx,
      };
      document.addEventListener("pointermove", onDocMove, true);
      document.addEventListener("pointerup", onDocUp, true);
      document.addEventListener("pointercancel", onDocUp, true);
    },
    { passive: true }
  );

  var listScroll = document.querySelector(".chat-dialogs-list");
  if (listScroll && !listScroll._chatSwipeScrollCloseBound) {
    listScroll._chatSwipeScrollCloseBound = true;
    listScroll.addEventListener("scroll", function () { closeOtherSwipePanels(null); }, { passive: true });
  }

  return {
    closeOtherSwipePanels: closeOtherSwipePanels,
  };
}

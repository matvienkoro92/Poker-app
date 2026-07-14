// Home VPN/proxy modal and comment feed runtime.

function initHomeVpnProxyModal(opts) {
  opts = opts || {};
  with (opts) {
  (function initVpnProxyModal() {
    var VPN_PROXY_HASH = "#vpn-proxy";
    var VPN_PROXY_HASH_PROXY = "#vpn-proxy-proxy";
    var modal = document.getElementById("vpnProxyModal");
    var openButtons = document.querySelectorAll("#vpnProxyOpenBtn, [data-vpn-proxy-open]");
    var closeBtn = document.getElementById("vpnProxyModalClose");
    var backdrop = document.getElementById("vpnProxyModalBackdrop");
    var paper = modal && modal.querySelector(".club-charter-modal__paper");
    var tabVpn = document.getElementById("vpnProxyTabVpn");
    var tabProxy = document.getElementById("vpnProxyTabProxy");
    var panelVpn = document.getElementById("vpnProxyPanelVpn");
    var panelProxy = document.getElementById("vpnProxyPanelProxy");
    var feedVpn = document.getElementById("vpnProxyFeedVpn");
    var feedProxy = document.getElementById("vpnProxyFeedProxy");
    var hintVpn = document.getElementById("vpnProxyHintVpn");
    var hintProxy = document.getElementById("vpnProxyHintProxy");
    var compVpn = document.getElementById("vpnProxyComposerVpn");
    var compProxy = document.getElementById("vpnProxyComposerProxy");
    var lockY = 0;
    var behindLocked = false;

    function esc(s) {
      return String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }
    function renderVpnProxyFeed(feed, items, isAdmin) {
      if (!feed) return;
      var linkify = feed.getAttribute("data-vpn-proxy-linkify") === "1";
      if (!items || !items.length) {
        feed.innerHTML =
          '<p class="gazette-article-comments__empty">Пока нет сообщений — напишите первым.</p>';
        return;
      }
      var aidAttrV = esc(String(feed.getAttribute("data-gazette-article-comments-article-id") || ""));
      feed.innerHTML = items
        .map(function (c) {
          return pokerBuildGazetteCommentItemHtml(c, aidAttrV, isAdmin, !!linkify);
        })
        .join("");
    }
    function loadVpnProxyFeed(feed) {
      if (!feed) return;
      var aid = feed.getAttribute("data-gazette-article-comments-article-id");
      if (!aid) return;
      var base = typeof getApiBase === "function" ? getApiBase() : "";
      if (!base) {
        renderVpnProxyFeed(feed, [], false);
        return;
      }
      feed.innerHTML = '<p class="gazette-article-comments__loading">Загрузка…</p>';
      var q =
        "?articleId=" +
        encodeURIComponent(aid) +
        (typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("&") : "");
      fetch(base + "/api/gazette-article-comments" + q)
        .then(function (r) {
          return r.json().then(function (data) {
            return { ok: r.ok, data: data };
          });
        })
        .then(function (res) {
          if (res.ok && res.data && res.data.ok && Array.isArray(res.data.comments)) {
            if (res.data.isAdmin && typeof window.pokerMarkAdminAccess === "function") {
              window.pokerMarkAdminAccess("vpn-proxy-comments");
            }
            renderVpnProxyFeed(feed, res.data.comments, !!res.data.isAdmin);
          } else {
            renderVpnProxyFeed(feed, [], false);
          }
        })
        .catch(function () {
          renderVpnProxyFeed(feed, [], false);
        });
    }
    function refreshVpnProxyAuthUi() {
      var cred = typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
      if (hintVpn) {
        if (cred) hintVpn.setAttribute("hidden", "");
        else hintVpn.removeAttribute("hidden");
      }
      if (hintProxy) {
        if (cred) hintProxy.setAttribute("hidden", "");
        else hintProxy.removeAttribute("hidden");
      }
      if (compVpn) {
        if (cred) compVpn.removeAttribute("hidden");
        else compVpn.setAttribute("hidden", "");
      }
      if (compProxy) {
        if (cred) compProxy.removeAttribute("hidden");
        else compProxy.setAttribute("hidden", "");
      }
    }
    function lockBehind() {
      if (behindLocked || !modal) return;
      behindLocked = true;
      lockY =
        window.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop) || 0;
      try {
        document.documentElement.classList.add("vpn-proxy-modal-open");
        var b = document.body;
        if (b) {
          b.style.overflow = "hidden";
          b.style.position = "fixed";
          b.style.top = "-" + lockY + "px";
          b.style.left = "0";
          b.style.right = "0";
          b.style.width = "100%";
        }
      } catch (eL) {}
    }
    function unlockBehind() {
      if (!behindLocked) return;
      behindLocked = false;
      try {
        document.documentElement.classList.remove("vpn-proxy-modal-open");
        var b = document.body;
        if (b) {
          b.style.overflow = "";
          b.style.position = "";
          b.style.top = "";
          b.style.left = "";
          b.style.right = "";
          b.style.width = "";
        }
        window.scrollTo(0, lockY);
      } catch (eU) {}
    }
    function vpnProxyHashToTab(h) {
      return h === VPN_PROXY_HASH_PROXY ? "proxy" : "vpn";
    }
    function isVpnProxyHash(h) {
      return h === VPN_PROXY_HASH || h === VPN_PROXY_HASH_PROXY;
    }
    function syncVpnProxyLocationHashForTab(which) {
      try {
        var want = which === "proxy" ? VPN_PROXY_HASH_PROXY : VPN_PROXY_HASH;
        if (String(window.location.hash || "") !== want) {
          window.history.replaceState({}, "", window.location.pathname + window.location.search + want);
        }
      } catch (eHash) {}
    }
    function vpnProxyCurrentHash() {
      return panelProxy && !panelProxy.hidden ? VPN_PROXY_HASH_PROXY : VPN_PROXY_HASH;
    }
    function vpnProxyShareAbsoluteUrl() {
      try {
        if (typeof buildMiniAppStartLink === "function") {
          var hTg = vpnProxyCurrentHash();
          return buildMiniAppStartLink(hTg === VPN_PROXY_HASH_PROXY ? "vpn_proxy_proxy" : "vpn_proxy");
        }
      } catch (eU) {}
      return "";
    }
    function setVpnProxyTab(which) {
      var isVpn = which === "vpn";
      if (tabVpn) {
        tabVpn.setAttribute("aria-selected", isVpn ? "true" : "false");
        tabVpn.classList.toggle("club-charter-modal__menu-item--active", isVpn);
      }
      if (tabProxy) {
        tabProxy.setAttribute("aria-selected", isVpn ? "false" : "true");
        tabProxy.classList.toggle("club-charter-modal__menu-item--active", !isVpn);
      }
      if (panelVpn) {
        panelVpn.hidden = !isVpn;
        panelVpn.setAttribute("aria-hidden", isVpn ? "false" : "true");
      }
      if (panelProxy) {
        panelProxy.hidden = isVpn;
        panelProxy.setAttribute("aria-hidden", isVpn ? "true" : "false");
      }
    }
    function openModal(opts) {
      opts = opts || {};
      if (!modal) return;
      try {
        if (typeof window.closeClubCharterModal === "function") window.closeClubCharterModal();
      } catch (eCh) {}
      try {
        if (typeof window.closeClubWelcomeModal === "function") window.closeClubWelcomeModal();
      } catch (eWel) {}
      var tab = opts.tab === "proxy" ? "proxy" : "vpn";
      try {
        if (typeof window.pokerRecordSectionViewOpen === "function") window.pokerRecordSectionViewOpen(tab === "proxy" ? "vpn-proxy-proxy" : "vpn-proxy");
      } catch (eTrack) {}
      lockBehind();
      modal.setAttribute("aria-hidden", "false");
      refreshVpnProxyAuthUi();
      setVpnProxyTab(tab);
      if (paper) paper.scrollTop = 0;
      loadVpnProxyFeed(feedVpn);
      loadVpnProxyFeed(feedProxy);
      if (!opts.skipHistory) {
        syncVpnProxyLocationHashForTab(tab);
      }
    }
    function closeModal() {
      if (!modal) return;
      modal.setAttribute("aria-hidden", "true");
      unlockBehind();
      try {
        var h = String(window.location.hash || "");
        if (h === VPN_PROXY_HASH || h === VPN_PROXY_HASH_PROXY) {
          window.history.replaceState({}, "", window.location.pathname + window.location.search);
        }
      } catch (eCloseH) {}
    }
    window.__pokerVpnProxyReloadCommentFeed = loadVpnProxyFeed;
    window.closeVpnProxyModal = closeModal;
    window.openVpnProxyModal = function (opts) {
      openModal(opts || {});
    };
    if (!modal) return;
    openButtons.forEach(function (openBtn) {
      openBtn.addEventListener("click", function (e) {
        e.preventDefault();
        openModal({ tab: "vpn" });
      });
    });
    if (closeBtn) {
      closeBtn.addEventListener("click", function (e) {
        e.preventDefault();
        closeModal();
      });
    }
    if (backdrop) backdrop.addEventListener("click", closeModal);
    if (tabVpn) {
      tabVpn.addEventListener("click", function (e) {
        e.preventDefault();
        setVpnProxyTab("vpn");
        if (modal.getAttribute("aria-hidden") === "false") syncVpnProxyLocationHashForTab("vpn");
      });
    }
    if (tabProxy) {
      tabProxy.addEventListener("click", function (e) {
        e.preventDefault();
        setVpnProxyTab("proxy");
        if (modal.getAttribute("aria-hidden") === "false") syncVpnProxyLocationHashForTab("proxy");
      });
    }
    var vpnProxyCopyBtn = document.getElementById("vpnProxyCopyLinkBtn");
    if (vpnProxyCopyBtn && vpnProxyCopyBtn.getAttribute("data-vpn-proxy-share-bound") !== "1") {
      vpnProxyCopyBtn.setAttribute("data-vpn-proxy-share-bound", "1");
      vpnProxyCopyBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
        var linkCp = vpnProxyShareAbsoluteUrl();
        if (!linkCp) return;
        var msgCp = "Ссылка скопирована. Отправьте другу — откроется подборка ВПН и прокси.";
        pokerCopyTextToClipboard(linkCp).then(function (copied) {
          var tgCp = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          if (copied) {
            if (tgCp && tgCp.showAlert) tgCp.showAlert(msgCp);
            else alert("Ссылка скопирована.");
            if (typeof recordShareButtonClick === "function") recordShareButtonClick("vpn_proxy_modal_copy");
          } else if (tgCp && tgCp.showAlert) {
            tgCp.showAlert("Ссылка: " + linkCp);
          } else {
            alert("Ссылка: " + linkCp);
          }
        });
      });
    }
    var vpnProxyShareBtn = document.getElementById("vpnProxyShareBtn");
    if (vpnProxyShareBtn && vpnProxyShareBtn.getAttribute("data-vpn-proxy-share-bound") !== "1") {
      vpnProxyShareBtn.setAttribute("data-vpn-proxy-share-bound", "1");
      vpnProxyShareBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
        var linkSh = vpnProxyShareAbsoluteUrl();
        if (!linkSh) return;
        var shareBody =
          "Подборка ВПН и прокси от игроков клуба «Два туза»:\n" + linkSh;
        var shareCaption = "Подборка ВПН и прокси от игроков клуба «Два туза».";
        var shareUrl =
          typeof pokerBuildTelegramShareUrlDialog === "function"
            ? pokerBuildTelegramShareUrlDialog(linkSh, shareCaption)
            : "";
        pokerTryPwaWebShare({ text: shareBody, url: linkSh }).then(function (pwaOk) {
          if (pwaOk) {
            if (typeof recordShareButtonClick === "function") recordShareButtonClick("vpn_proxy_modal");
            return;
          }
          var tgSh = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          if (tgSh && tgSh.openTelegramLink) tgSh.openTelegramLink(shareUrl);
          else window.open(shareUrl, "_blank");
          if (typeof recordShareButtonClick === "function") recordShareButtonClick("vpn_proxy_modal");
        });
      });
    }
    window.addEventListener("hashchange", function () {
      var h = String(window.location.hash || "");
      if (isVpnProxyHash(h)) {
        openModal({ skipHistory: true, tab: vpnProxyHashToTab(h) });
      } else if (modal.getAttribute("aria-hidden") === "false") {
        closeModal();
      }
    });
    setTimeout(function () {
      var h0 = String(window.location.hash || "");
      if (isVpnProxyHash(h0)) openModal({ skipHistory: true, tab: vpnProxyHashToTab(h0) });
    }, 0);
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if (!modal || modal.getAttribute("aria-hidden") !== "false") return;
      closeModal();
    });
    modal.addEventListener("submit", function (ev) {
      var form = ev.target;
      if (!form || !form.classList || !form.classList.contains("gazette-article-comments__form")) return;
      if (!modal.contains(form)) return;
      ev.preventDefault();
      var section = form.closest(".gazette-article-comments");
      var feed = section && section.querySelector(".gazette-article-comments__feed");
      var ta = form.querySelector(".gazette-article-comments__textarea");
      var st = form.querySelector(".gazette-article-comments__form-status");
      var sub = form.querySelector(".gazette-article-comments__submit");
      if (!feed || !ta) return;
      var aid = feed.getAttribute("data-gazette-article-comments-article-id");
      var text = ta.value ? ta.value.trim() : "";
      if (!text) {
        if (st) st.textContent = "Введите текст.";
        return;
      }
      if (typeof pokerApiHasCredential === "function" && !pokerApiHasCredential()) {
        if (st) st.textContent = "Войдите в приложение.";
        return;
      }
      var basePost = typeof getApiBase === "function" ? getApiBase() : "";
      if (!basePost || typeof pokerApiAuthJsonBody !== "function") {
        if (st) st.textContent = "Не удалось отправить.";
        return;
      }
      if (sub) sub.disabled = true;
      if (st) st.textContent = "Отправляем…";
      var profileHint = {};
      try {
        var authG = window.__pokerTelegramAuth;
        if (authG && authG.status === "verified" && authG.user) {
          var uG = authG.user;
          if (uG.first_name) profileHint.profileFirstName = String(uG.first_name).trim().slice(0, 64);
          if (uG.last_name) profileHint.profileLastName = String(uG.last_name).trim().slice(0, 64);
        }
      } catch (eHint) {}
      var payload = pokerApiAuthJsonBody(
        Object.assign({ articleId: parseInt(aid, 10), text: text }, profileHint)
      );
      fetch(basePost + "/api/gazette-article-comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(function (r) {
          return r.json().then(function (data) {
            return { ok: r.ok, data: data };
          });
        })
        .then(function (res) {
          if (sub) sub.disabled = false;
          if (res.ok && res.data && res.data.ok) {
            ta.value = "";
            if (st) st.textContent = "Опубликовано.";
            loadVpnProxyFeed(feed);
            return;
          }
          var msg =
            res.data && res.data.error ? String(res.data.error) : "Не удалось отправить.";
          if (st) st.textContent = msg;
        })
        .catch(function () {
          if (sub) sub.disabled = false;
          if (st) st.textContent = "Сеть недоступна.";
        });
    });
    modal.addEventListener("click", function (ev) {
      var profBtn = ev.target && ev.target.closest && ev.target.closest("[data-gazette-comment-member-id]");
      if (profBtn && modal.contains(profBtn)) {
        ev.preventDefault();
        ev.stopPropagation();
        var midP = profBtn.getAttribute("data-gazette-comment-member-id");
        if (!midP) return;
        var nameP =
          (profBtn.getAttribute("data-gazette-comment-display-name") || "").trim() ||
          (profBtn.textContent || "").trim() ||
          "Игрок";
        if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
        if (typeof window.openChatUserModalById === "function") {
          window.openChatUserModalById(midP, nameP, null);
        }
        return;
      }
    });
    (function bindVpnProxyKbRepair() {
      if (!modal) return;
      var blurTimer = null;
      function scheduleFin() {
        clearTimeout(blurTimer);
        blurTimer = setTimeout(function () {
          blurTimer = null;
          var active = document.activeElement;
          if (
            active &&
            active.classList &&
            active.classList.contains("gazette-article-comments__textarea") &&
            modal.contains(active)
          ) {
            return;
          }
          try {
            document.documentElement.classList.remove("gazette-comment-keyboard");
          } catch (eRm) {}
          try {
            if (typeof window.__pokerFinalizeChatKeyboardDismiss === "function") {
              window.__pokerFinalizeChatKeyboardDismiss();
            }
          } catch (eFin) {}
        }, 120);
      }
      modal.addEventListener(
        "focusin",
        function (ev) {
          var t = ev.target;
          if (!t || !t.classList || !t.classList.contains("gazette-article-comments__textarea")) return;
          if (!modal.contains(t)) return;
          try {
            document.documentElement.classList.add("gazette-comment-keyboard");
          } catch (eIn) {}
        },
        true
      );
      modal.addEventListener(
        "focusout",
        function (ev) {
          var t = ev.target;
          if (!t || !t.classList || !t.classList.contains("gazette-article-comments__textarea")) return;
          if (!modal.contains(t)) return;
          scheduleFin();
        },
        true
      );
    })();
  })();

  }
}

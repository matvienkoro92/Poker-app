// Home club charter and welcome modal runtimes.

function initHomeClubInfoModals() {
  (function initClubCharterModal() {
    var CLUB_CHARTER_HASH = "#club-charter";
    var modal = document.getElementById("clubCharterModal");
    var openBtn = document.getElementById("clubCharterOpenBtn");
    var closeBtn = document.getElementById("clubCharterModalClose");
    var backBtn = document.getElementById("clubCharterModalBack");
    var shareBtn = document.getElementById("clubCharterShareBtn");
    var copyBtn = document.getElementById("clubCharterCopyBtn");
    var backdrop = document.getElementById("clubCharterModalBackdrop");
    var paper = modal && modal.querySelector(".club-charter-modal__paper");
    var tabRaffle = document.getElementById("clubCharterTabRaffle");
    var tabComm = document.getElementById("clubCharterTabComm");
    var panelRaffle = document.getElementById("clubCharterPanelRaffle");
    var panelComm = document.getElementById("clubCharterPanelComm");
    var charterScrollLockY = 0;
    var charterBehindLocked = false;
    function lockCharterBehindScroll() {
      if (charterBehindLocked) return;
      charterScrollLockY =
        window.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop) || 0;
      charterBehindLocked = true;
      try {
        document.documentElement.classList.add("club-charter-modal-open");
        var b = document.body;
        if (b) {
          b.style.overflow = "hidden";
          b.style.position = "fixed";
          b.style.top = "-" + charterScrollLockY + "px";
          b.style.left = "0";
          b.style.right = "0";
          b.style.width = "100%";
        }
      } catch (eLock) {}
    }
    function unlockCharterBehindScroll() {
      if (!charterBehindLocked) return;
      charterBehindLocked = false;
      try {
        document.documentElement.classList.remove("club-charter-modal-open");
        var b = document.body;
        if (b) {
          b.style.overflow = "";
          b.style.position = "";
          b.style.top = "";
          b.style.left = "";
          b.style.right = "";
          b.style.width = "";
        }
        window.scrollTo(0, charterScrollLockY);
      } catch (eUnlock) {}
    }
    if (!modal || !openBtn) return;
    function setCharterTab(which) {
      var isRaffle = which === "raffle";
      if (tabRaffle) {
        tabRaffle.setAttribute("aria-selected", isRaffle ? "true" : "false");
        tabRaffle.classList.toggle("club-charter-modal__menu-item--active", isRaffle);
      }
      if (tabComm) {
        tabComm.setAttribute("aria-selected", isRaffle ? "false" : "true");
        tabComm.classList.toggle("club-charter-modal__menu-item--active", !isRaffle);
      }
      if (panelRaffle) {
        panelRaffle.hidden = !isRaffle;
        panelRaffle.setAttribute("aria-hidden", isRaffle ? "false" : "true");
      }
      if (panelComm) {
        panelComm.hidden = isRaffle;
        panelComm.setAttribute("aria-hidden", isRaffle ? "true" : "false");
      }
    }
    function openCharter(opts) {
      opts = opts || {};
      try {
        if (typeof window.closeVpnProxyModal === "function") window.closeVpnProxyModal();
      } catch (eVpnClose) {}
      try {
        if (typeof window.closeClubWelcomeModal === "function") window.closeClubWelcomeModal();
      } catch (eWelClose) {}
      lockCharterBehindScroll();
      modal.setAttribute("aria-hidden", "false");
      setCharterTab("raffle");
      if (paper) paper.scrollTop = 0;
      if (!opts.skipHistory) {
        try {
          if (String(window.location.hash || "") !== CLUB_CHARTER_HASH) {
            window.history.replaceState({}, "", window.location.pathname + window.location.search + CLUB_CHARTER_HASH);
          }
        } catch (eHist) {}
      }
    }
    function closeCharter() {
      modal.setAttribute("aria-hidden", "true");
      unlockCharterBehindScroll();
      try {
        if (String(window.location.hash || "") === CLUB_CHARTER_HASH) {
          window.history.replaceState({}, "", window.location.pathname + window.location.search);
        }
      } catch (eCloseHist) {}
    }
    function getCharterShareText() {
      return "Устав клуба «Два туза»";
    }
    function getCharterShareLink() {
      if (typeof buildMiniAppStartLink === "function") {
        var tgl = buildMiniAppStartLink("club_charter");
        if (tgl) return tgl;
      }
      var fb = String(POKER_DEFAULT_TELEGRAM_MINI_APP_URL || "")
        .trim()
        .replace(/\/+$/, "");
      if (!fb) return "";
      var sep = fb.indexOf("?") >= 0 ? "&" : "?";
      var needSlash = sep === "?" && /^https?:\/\/[^/?#]+$/i.test(fb);
      return fb + (needSlash ? "/" : "") + sep + "startapp=" + encodeURIComponent("club_charter");
    }
    function notifyUser(text) {
      var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (tg && typeof tg.showAlert === "function") tg.showAlert(text);
      else if (typeof alert === "function") alert(text);
    }
    function runCharterShare() {
      var link = getCharterShareLink();
      var shareText = getCharterShareText();
      var shareUrl = "https://t.me/share/url?url=" + encodeURIComponent(link) + "&text=" + encodeURIComponent(shareText);
      pokerTryPwaWebShare({ title: shareText, text: shareText + "\n" + link, url: link }).then(function (pwaOk) {
        if (pwaOk) return;
        var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tg && typeof tg.openTelegramLink === "function") tg.openTelegramLink(shareUrl);
        else if (tg && typeof tg.openLink === "function") tg.openLink(shareUrl);
        else window.open(shareUrl, "_blank");
      });
    }
    function runCharterCopy() {
      var link = getCharterShareLink();
      var textToCopy = link;
      if (!textToCopy) {
        notifyUser("Не удалось сформировать ссылку.");
        return;
      }
      pokerCopyTextToClipboard(textToCopy).then(function (copied) {
        notifyUser(copied ? "Ссылка скопирована." : "Скопируйте ссылку вручную: " + textToCopy);
      });
    }
    window.openClubCharterModal = openCharter;
    window.closeClubCharterModal = closeCharter;
    openBtn.addEventListener("click", function (e) {
      e.preventDefault();
      openCharter();
    });
    if (closeBtn) closeBtn.addEventListener("click", closeCharter);
    if (backBtn) {
      backBtn.addEventListener("click", function (e) {
        e.preventDefault();
        closeCharter();
      });
    }
    if (backdrop) backdrop.addEventListener("click", closeCharter);
    if (shareBtn) {
      shareBtn.addEventListener("click", function (e) {
        e.preventDefault();
        runCharterShare();
      });
    }
    if (copyBtn) {
      copyBtn.addEventListener("click", function (e) {
        e.preventDefault();
        runCharterCopy();
      });
    }
    if (tabRaffle) {
      tabRaffle.addEventListener("click", function (e) {
        e.preventDefault();
        setCharterTab("raffle");
      });
    }
    if (tabComm) {
      tabComm.addEventListener("click", function (e) {
        e.preventDefault();
        setCharterTab("comm");
      });
    }
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if (modal.getAttribute("aria-hidden") !== "false") return;
      closeCharter();
    });
    window.addEventListener("hashchange", function () {
      if (window.location.hash === CLUB_CHARTER_HASH) {
        openCharter({ skipHistory: true });
      } else if (modal.getAttribute("aria-hidden") === "false") {
        closeCharter();
      }
    });
    setTimeout(function () {
      if (window.location.hash === CLUB_CHARTER_HASH) openCharter({ skipHistory: true });
    }, 0);
  })();

  (function initClubWelcomeModal() {
    var modal = document.getElementById("clubWelcomeModal");
    var openBtn = document.getElementById("headerClubWelcomeBtn");
    var closeBtn = document.getElementById("clubWelcomeModalClose");
    var backdrop = document.getElementById("clubWelcomeModalBackdrop");
    var paper = modal && modal.querySelector(".club-welcome-modal__paper");
    var welcomeLockY = 0;
    var welcomeBehindLocked = false;
    function lockWelcomeBehindScroll() {
      if (welcomeBehindLocked) return;
      welcomeLockY =
        window.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop) || 0;
      welcomeBehindLocked = true;
      try {
        document.documentElement.classList.add("club-charter-modal-open");
        var b = document.body;
        if (b) {
          b.style.overflow = "hidden";
          b.style.position = "fixed";
          b.style.top = "-" + welcomeLockY + "px";
          b.style.left = "0";
          b.style.right = "0";
          b.style.width = "100%";
        }
      } catch (eLock) {}
    }
    function unlockWelcomeBehindScroll() {
      if (!welcomeBehindLocked) return;
      welcomeBehindLocked = false;
      try {
        document.documentElement.classList.remove("club-charter-modal-open");
        var b = document.body;
        if (b) {
          b.style.overflow = "";
          b.style.position = "";
          b.style.top = "";
          b.style.left = "";
          b.style.right = "";
          b.style.width = "";
        }
        window.scrollTo(0, welcomeLockY);
      } catch (eUnlock) {}
    }
    if (!modal) return;
    function openWelcome() {
      try {
        if (typeof window.closeClubCharterModal === "function") window.closeClubCharterModal();
      } catch (eC) {}
      try {
        if (typeof window.closeVpnProxyModal === "function") window.closeVpnProxyModal();
      } catch (eV) {}
      lockWelcomeBehindScroll();
      modal.setAttribute("aria-hidden", "false");
      if (paper) paper.scrollTop = 0;
    }
    function closeWelcome() {
      modal.setAttribute("aria-hidden", "true");
      unlockWelcomeBehindScroll();
    }
    window.closeClubWelcomeModal = closeWelcome;
    window.openClubWelcomeModal = openWelcome;
    function bindWelcomeOpen(el) {
      if (!el) return;
      el.addEventListener("click", function (e) {
        e.preventDefault();
        if (window.__touchWasScroll && window.__touchWasScroll()) return;
        openWelcome();
      });
    }
    bindWelcomeOpen(openBtn);
    bindWelcomeOpen(document.getElementById("homeWelcomeTitleBtn"));
    if (closeBtn) closeBtn.addEventListener("click", closeWelcome);
    if (backdrop) backdrop.addEventListener("click", closeWelcome);
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if (!modal || modal.getAttribute("aria-hidden") !== "false") return;
      closeWelcome();
    });
  })();


}

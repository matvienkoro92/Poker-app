(function () {
  "use strict";

  var ADMIN_MENU_PASSWORD = "7889";
  var PROTECTED_SELECTOR = "#adminReportBtn, #adminBonusBalancesHeaderBtn, [data-crm-open=\"player-crm\"]";
  var bypassTargets = typeof WeakSet === "function" ? new WeakSet() : null;
  var pendingTarget = null;

  function ensurePasswordModal() {
    var modal = document.getElementById("adminMenuPasswordModal");
    if (modal) return modal;
    modal = document.createElement("div");
    modal.className = "admin-menu-password-modal";
    modal.id = "adminMenuPasswordModal";
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML =
      '<div class="admin-menu-password-modal__backdrop" data-admin-menu-password-close></div>' +
      '<form class="admin-menu-password-modal__panel" id="adminMenuPasswordForm" role="dialog" aria-modal="true" aria-labelledby="adminMenuPasswordTitle">' +
        '<button type="button" class="admin-menu-password-modal__close" data-admin-menu-password-close aria-label="Закрыть">×</button>' +
        '<span class="admin-menu-password-modal__eyebrow">Закрытый раздел</span>' +
        '<h2 class="admin-menu-password-modal__title" id="adminMenuPasswordTitle">Введите пароль</h2>' +
        '<input class="admin-menu-password-modal__input" id="adminMenuPasswordInput" type="password" inputmode="numeric" autocomplete="off" maxlength="12" aria-label="Пароль" required />' +
        '<p class="admin-menu-password-modal__message" id="adminMenuPasswordMessage" aria-live="polite"></p>' +
        '<button type="submit" class="admin-menu-password-modal__submit">Открыть</button>' +
      '</form>';
    document.body.appendChild(modal);

    modal.addEventListener("click", function (event) {
      if (event.target && event.target.closest && event.target.closest("[data-admin-menu-password-close]")) closePasswordModal();
    });
    modal.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closePasswordModal();
    });
    var form = document.getElementById("adminMenuPasswordForm");
    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        var input = document.getElementById("adminMenuPasswordInput");
        var message = document.getElementById("adminMenuPasswordMessage");
        if (!input || input.value !== ADMIN_MENU_PASSWORD) {
          if (message) message.textContent = "Неверный пароль";
          if (input) {
            input.value = "";
            input.focus();
          }
          return;
        }
        var target = pendingTarget;
        closePasswordModal();
        if (!target || !target.isConnected) return;
        if (bypassTargets) bypassTargets.add(target);
        target.click();
      });
    }
    return modal;
  }

  function openPasswordModal(target) {
    var modal = ensurePasswordModal();
    pendingTarget = target;
    var input = document.getElementById("adminMenuPasswordInput");
    var message = document.getElementById("adminMenuPasswordMessage");
    if (input) input.value = "";
    if (message) message.textContent = "";
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("admin-menu-password-open");
    setTimeout(function () {
      if (input) input.focus();
    }, 0);
  }

  function closePasswordModal() {
    var modal = document.getElementById("adminMenuPasswordModal");
    if (modal) {
      modal.hidden = true;
      modal.setAttribute("aria-hidden", "true");
    }
    document.body.classList.remove("admin-menu-password-open");
    pendingTarget = null;
  }

  function interceptProtectedOpen(event) {
    var target = event.target && event.target.closest ? event.target.closest(PROTECTED_SELECTOR) : null;
    if (!target || target.disabled || target.hidden || target.getAttribute("aria-hidden") === "true") return;
    if (event.type === "touchend" && typeof window.__touchWasScroll === "function" && window.__touchWasScroll()) return;
    if (bypassTargets && bypassTargets.has(target)) {
      bypassTargets.delete(target);
      return;
    }
    event.preventDefault();
    if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();
    else event.stopPropagation();
    openPasswordModal(target);
  }

  document.addEventListener("touchend", interceptProtectedOpen, { capture: true, passive: false });
  document.addEventListener("click", interceptProtectedOpen, true);
})();

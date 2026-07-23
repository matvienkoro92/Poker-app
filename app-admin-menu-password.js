(function () {
  "use strict";

  var CRM_SELECTOR = '[data-crm-open="player-crm"]';
  var CALCULATIONS_SELECTOR = '[data-admin-report-tab="calculations"], [data-admin-report-tab="cash-total"]';
  var ADMIN_SELECTOR = "#adminReportBtn, #adminBonusBalancesHeaderBtn, #headerReportsShortcutBtn, #headerBalancesShortcutBtn";
  var PROTECTED_SELECTOR = ADMIN_SELECTOR + ", " + CRM_SELECTOR + ", " + CALCULATIONS_SELECTOR;
  var bypassTargets = typeof WeakSet === "function" ? new WeakSet() : null;
  var pendingTarget = null;
  var submitting = false;

  function scopeForTarget(target) {
    if (target && target.matches && target.matches(CALCULATIONS_SELECTOR)) return "calculations";
    if (target && target.matches && target.matches(CRM_SELECTOR)) return "crm";
    return "admin";
  }

  function cacheKey(scope) {
    return "poker_admin_menu_access_" + scope;
  }

  function readCachedAccess(scope) {
    try {
      var parsed = JSON.parse(sessionStorage.getItem(cacheKey(scope)) || "null");
      if (!parsed || !parsed.token || Number(parsed.expiresAt || 0) <= Date.now()) return null;
      return parsed;
    } catch (error) {
      return null;
    }
  }

  function writeCachedAccess(scope, token, expiresIn) {
    try {
      sessionStorage.setItem(cacheKey(scope), JSON.stringify({
        token: String(token || ""),
        expiresAt: Date.now() + Math.max(60, Number(expiresIn) || 1800) * 1000,
      }));
    } catch (error) {}
  }

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
        '<input class="admin-menu-password-modal__input" id="adminMenuPasswordInput" type="password" inputmode="numeric" autocomplete="off" maxlength="32" aria-label="Пароль" required />' +
        '<p class="admin-menu-password-modal__message" id="adminMenuPasswordMessage" aria-live="polite"></p>' +
        '<button type="submit" class="admin-menu-password-modal__submit" id="adminMenuPasswordSubmit">Открыть</button>' +
      '</form>';
    document.body.appendChild(modal);

    modal.addEventListener("click", function (event) {
      if (event.target && event.target.closest && event.target.closest("[data-admin-menu-password-close]")) closePasswordModal();
    });
    modal.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closePasswordModal();
    });
    var form = document.getElementById("adminMenuPasswordForm");
    if (form) form.addEventListener("submit", submitPassword);
    return modal;
  }

  function titleForScope(scope) {
    if (scope === "crm") return "Пароль для CRM";
    if (scope === "calculations") return "Пароль для закрытой вкладки";
    return "Введите пароль";
  }

  function openPasswordModal(target) {
    var modal = ensurePasswordModal();
    pendingTarget = target;
    var input = document.getElementById("adminMenuPasswordInput");
    var message = document.getElementById("adminMenuPasswordMessage");
    var title = document.getElementById("adminMenuPasswordTitle");
    if (input) input.value = "";
    if (message) message.textContent = "";
    if (title) title.textContent = titleForScope(scopeForTarget(target));
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("admin-menu-password-open");
    setTimeout(function () { if (input) input.focus(); }, 0);
  }

  function closePasswordModal() {
    if (submitting) return;
    var modal = document.getElementById("adminMenuPasswordModal");
    if (modal) {
      modal.hidden = true;
      modal.setAttribute("aria-hidden", "true");
    }
    document.body.classList.remove("admin-menu-password-open");
    pendingTarget = null;
  }

  function submitPassword(event) {
    event.preventDefault();
    if (submitting || !pendingTarget) return;
    var target = pendingTarget;
    var scope = scopeForTarget(target);
    var input = document.getElementById("adminMenuPasswordInput");
    var message = document.getElementById("adminMenuPasswordMessage");
    var submit = document.getElementById("adminMenuPasswordSubmit");
    var password = input ? input.value : "";
    var payload = typeof pokerGuestOrAuthedPostBody === "function"
      ? pokerGuestOrAuthedPostBody({ scope: scope, password: password })
      : { scope: scope, password: password };
    submitting = true;
    if (submit) {
      submit.disabled = true;
      submit.textContent = "Проверяем…";
    }
    if (message) message.textContent = "";
    fetch((typeof getApiBase === "function" ? getApiBase() : "") + "/api/admin-menu-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(function (response) {
        return response.json().catch(function () { return {}; }).then(function (data) {
          return { ok: response.ok, data: data || {} };
        });
      })
      .then(function (result) {
        if (!result.ok || !result.data.ok) throw new Error(result.data.error || "Пароль не принят");
        writeCachedAccess(scope, result.data.token, result.data.expiresIn);
        submitting = false;
        closePasswordModal();
        if (!target || !target.isConnected) return;
        if (bypassTargets) bypassTargets.add(target);
        target.click();
      })
      .catch(function (error) {
        if (message) message.textContent = error && error.message ? error.message : "Не удалось проверить пароль";
        if (input) {
          input.value = "";
          input.focus();
        }
      })
      .finally(function () {
        submitting = false;
        if (submit) {
          submit.disabled = false;
          submit.textContent = "Открыть";
        }
      });
  }

  function interceptProtectedOpen(event) {
    var target = event.target && event.target.closest ? event.target.closest(PROTECTED_SELECTOR) : null;
    if (!target || target.disabled || target.hidden || target.getAttribute("aria-hidden") === "true") return;
    if (bypassTargets && bypassTargets.has(target)) {
      bypassTargets.delete(target);
      return;
    }
    if (readCachedAccess(scopeForTarget(target))) return;
    event.preventDefault();
    if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();
    else event.stopPropagation();
    openPasswordModal(target);
  }

  document.addEventListener("click", interceptProtectedOpen, true);
})();

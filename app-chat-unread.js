/** PWA на рабочем столе: цифра на иконке (Badging API) — то же «общий + личные», что и в таббаре (updateChatNavDot), до 99. Пока приложение закрыто — только push/ОС. */
function pokerSyncPwaAppIconUnreadBadge(unreadTotal) {
  try {
    var isStandalone =
      typeof window !== "undefined" &&
      ((window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
        window.navigator.standalone === true);
    if (!isStandalone) return;
    var nav = typeof navigator !== "undefined" ? navigator : null;
    if (!nav || typeof nav.clearAppBadge !== "function") return;
    var n = typeof unreadTotal === "number" && !isNaN(unreadTotal) ? Math.max(0, Math.floor(unreadTotal)) : 0;
    if (n > 0) {
      if (typeof nav.setAppBadge === "function") {
        nav.setAppBadge(Math.min(n, 99)).catch(function () {});
      }
    } else {
      nav.clearAppBadge().catch(function () {});
    }
  } catch (eBadge) {}
}

function updateChatNavDot() {
  var personalUnread =
    typeof window.chatPersonalUnreadTotalFromContacts === "number"
      ? window.chatPersonalUnreadTotalFromContacts
      : window.chatPersonalUnreadCount || 0;
  var raw = (window.chatGeneralUnreadCount || 0) + personalUnread;
  // Если какие-то непрочитанные помечены флагами, но счётчик не пришёл — показываем хотя бы 1.
  if (raw === 0 && (window.chatGeneralUnread || window.chatPersonalUnread)) raw = 1;
  // В бейдже хотим реальное количество непрочитанных (общий чат + личные), без деления пополам.
  var count = raw > 0 ? raw : 0;
  var badge = document.getElementById("chatNavBadge");
  var headerBadge = document.getElementById("headerNotificationsBadge");
  var display = count > 99 ? "99+" : (count > 0 ? String(count) : "0");
  var on = count > 0;
  if (badge) {
    /* Частые перерисовки одним и тем же числом (опрос loadGeneral/loadContacts) дёргали DOM и aria-live */
    if (badge.getAttribute("data-poker-unread-display") !== display) {
      badge.setAttribute("data-poker-unread-display", display);
      badge.textContent = display;
    }
    if (badge.classList.contains("bottom-nav__badge--on") !== on) {
      badge.classList.toggle("bottom-nav__badge--on", on);
    }
    badge.setAttribute("aria-label", on ? "Непрочитанных: " + count : "Нет непрочитанных");
  }
  if (headerBadge) {
    headerBadge.hidden = !on;
    headerBadge.textContent = display;
    headerBadge.setAttribute("aria-hidden", on ? "false" : "true");
    headerBadge.setAttribute("aria-label", on ? "Непрочитанных: " + count : "Нет непрочитанных");
  }
  pokerSyncPwaAppIconUnreadBadge(count);
}

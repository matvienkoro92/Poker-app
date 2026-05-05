// Chat identity helpers and message text formatters.

function resolveMyChatMemberId() {
  try {
    var auth = window.__pokerTelegramAuth;
    if (auth && auth.user && auth.user.id != null && (auth.status === "verified" || auth.status === "dev_skip")) {
      var u = auth.user;
      if (u.memberId != null && String(u.memberId).trim() !== "") return String(u.memberId).trim();
      var raw = String(u.id);
      if (raw.indexOf("tg_") === 0 || raw.indexOf("vk_") === 0) return raw;
      if (u.is_vk || u.vk) return "vk_" + raw;
      return "tg_" + raw;
    }
  } catch (eAuth) {}
  try {
    var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user && tg.initData && String(tg.initData).trim()) {
      var tgUser = tg.initDataUnsafe.user;
      if (tgUser && tgUser.id != null) return "tg_" + String(tgUser.id);
    }
  } catch (eTelegram) {}
  return null;
}

try {
  window.__pokerResolveMyChatMemberId = resolveMyChatMemberId;
  window.pokerResolveMyChatMemberId = resolveMyChatMemberId;
} catch (eExposeMyChatMemberId) {}

function resolveMyChatDisplayName() {
  try {
    var cached = window.__pokerChatDisplayName;
    if (cached != null && String(cached).trim()) return String(cached).trim();
  } catch (eCachedName) {}
  try {
    var auth = window.__pokerTelegramAuth;
    if (auth && auth.user && (auth.status === "verified" || auth.status === "dev_skip")) {
      if (typeof telegramUserDisplayName === "function") {
        var name = telegramUserDisplayName(auth.user);
        if (name) return name;
      }
      var u = auth.user;
      if (u.first_name) return String(u.first_name);
      if (u.username && typeof pokerHideRomanTelegramUsername === "function" && !pokerHideRomanTelegramUsername(u.username)) {
        return String(u.username);
      }
      if (u.username) return String(u.username);
    }
  } catch (eAuthName) {}
  try {
    var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
      var tgUser = tg.initDataUnsafe.user;
      return (
        tgUser.first_name ||
        (tgUser.username && typeof pokerHideRomanTelegramUsername === "function" && !pokerHideRomanTelegramUsername(tgUser.username)
          ? tgUser.username
          : "") ||
        "Вы"
      );
    }
  } catch (eTelegramName) {}
  return "Вы";
}

function escapeHtml(s) {
  if (!s) return "";
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function linkTgUsernames(escapedText) {
  if (!escapedText) return "";
  return String(escapedText).replace(/@([a-zA-Z0-9_]{5,32})(?![a-zA-Z0-9_])/g, function (_, username) {
    return '<a href="https://t.me/' + escapeHtml(username) + '" class="chat-msg__tg-link">@' + escapeHtml(username) + "</a>";
  });
}

function linkUrls(escapedText) {
  if (!escapedText) return "";
  return String(escapedText).replace(/(https?:\/\/[^\s<>&"']+)/g, function (url) {
    var href = url.replace(/&amp;/g, "&");
    return '<a href="' + escapeHtml(href).replace(/"/g, "&quot;") + '" class="chat-msg__link" target="_blank" rel="noopener noreferrer">' + url + "</a>";
  });
}

function linkAppIds(escapedText) {
  if (!escapedText) return "";
  return String(escapedText).replace(/\b(ID\d{6})\b/gi, function (_, id) {
    var idUp = id.toUpperCase();
    return '<button type="button" class="chat-msg__id-link" data-app-id="' + escapeHtml(idUp) + '">' + escapeHtml(idUp) + "</button>";
  });
}

function chatMessageBodyHtml(m) {
  var raw = String((m && m.text) || "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&/g, "&amp;");
  return linkTgUsernames(linkAppIds(linkUrls(raw)));
}

// Chat roster counters for the club dialog row and general chat header.

function syncClubChatRosterUi() {
  var title = document.getElementById("chatDialogClubTitle");
  var titleMeta = document.getElementById("chatDialogClubParticipantsMeta");
  var sub = document.getElementById("chatGeneralHeaderRosterMeta");
  var access = typeof clubChatAccess !== "undefined" ? clubChatAccess : "open";
  if (access === "need_apply" || access === "pending") {
    if (title) setTextContentIfChanged(title, "Главный чат");
    if (titleMeta) setTextContentIfChanged(titleMeta, "");
    if (sub) {
      sub.hidden = true;
      sub.textContent = "";
    }
    return;
  }
  var cache = window._chatGeneralCache;
  var participants = cache && cache.participantsCount != null ? cache.participantsCount : null;
  if (participants == null) {
    if (title) setTextContentIfChanged(title, "Главный чат");
    if (titleMeta) setTextContentIfChanged(titleMeta, "");
    if (sub) {
      sub.hidden = true;
      sub.textContent = "";
    }
    return;
  }
  if (title) setTextContentIfChanged(title, "Главный чат");
  if (titleMeta) setTextContentIfChanged(titleMeta, String(participants) + " участника");
  if (sub) {
    sub.textContent = "Участников: " + String(participants);
    sub.hidden = false;
  }
}

try {
  window.__pokerSyncClubChatRosterUi = syncClubChatRosterUi;
} catch (eSyncRoster) {}

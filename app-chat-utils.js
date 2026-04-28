var CHAT_ADMIN_IDS = ["tg_2144406710", "tg_1897001087"];

/** Как на сервере normalizePeerChatUserId — для сравнения peer id и защиты от «чата с собой». */
function normalizePeerIdForChat(raw) {
  var s = String(raw || "").trim();
  if (!s) return "";
  if (s.indexOf("group_") === 0) return s;
  if (s.indexOf("tg_") === 0 || s.indexOf("vk_") === 0 || s.indexOf("guest_") === 0) return s;
  if (/^\d+$/.test(s)) return "tg_" + s;
  return "tg_" + s;
}
function pokerChatMessageTimeMs(t) {
  if (t == null || t === "") return NaN;
  var ms = Date.parse(String(t).trim());
  return isNaN(ms) ? NaN : ms;
}
/** Строго новее отметки просмотра (без бага строкового сравнения ISO). */
function pokerChatMessageIsNewerThanViewed(messageTime, lastViewed) {
  var msgMs = pokerChatMessageTimeMs(messageTime);
  if (isNaN(msgMs)) return false;
  if (lastViewed == null || lastViewed === "") return true;
  var lastMs = pokerChatMessageTimeMs(lastViewed);
  if (isNaN(lastMs)) return true;
  return msgMs > lastMs;
}
function peerChatIdsEqual(a, b) {
  if (!a || !b) return false;
  return normalizePeerIdForChat(a) === normalizePeerIdForChat(b);
}
/** id сообщения может быть числом 0 — нельзя проверять через if (m.id). */
function pokerChatMessageHasPersistedId(id) {
  return id !== null && id !== undefined && id !== "";
}
/** Закреплённые админы (Анна, Вика) — не дублировать в #chatContacts. */
function chatContactIsDuplicateOfPinnedDialog(c) {
  if (!c || !c.id) return false;
  if (c.isGroupChat) return false;
  for (var pi = 0; pi < CHAT_ADMIN_IDS.length; pi++) {
    if (peerChatIdsEqual(c.id, CHAT_ADMIN_IDS[pi])) return true;
  }
  return false;
}
var CHAT_DIALOG_LIST_PINS_KEY = "poker_chat_dialog_list_pins_v1";
function pokerChatDialogListPinsStorageKey() {
  var fp = typeof pokerChatContactsAuthFingerprint === "function" ? pokerChatContactsAuthFingerprint() : "";
  return fp ? CHAT_DIALOG_LIST_PINS_KEY + ":" + fp : "";
}
function pokerLoadChatDialogListPins() {
  try {
    if (typeof localStorage === "undefined") return [];
    var k = pokerChatDialogListPinsStorageKey();
    if (!k) return [];
    var raw = localStorage.getItem(k);
    if (!raw) return [];
    var arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr.map(function (x) { return String(x); }).filter(function (s) { return s.length; });
  } catch (ePins) {
    return [];
  }
}
function pokerSaveChatDialogListPins(ids) {
  try {
    var k = pokerChatDialogListPinsStorageKey();
    if (!k || typeof localStorage === "undefined") return;
    localStorage.setItem(k, JSON.stringify(ids));
  } catch (eSav) {}
}
function pokerSortContactsByDialogListPins(contacts) {
  if (!contacts || !contacts.length) return contacts || [];
  var pins = pokerLoadChatDialogListPins();
  if (!pins.length) return contacts;
  var used = Object.create(null);
  var out = [];
  for (var pi = 0; pi < pins.length; pi++) {
    var p = pins[pi];
    for (var j = 0; j < contacts.length; j++) {
      if (used[j]) continue;
      var c = contacts[j];
      if (c && c.id && peerChatIdsEqual(c.id, p)) {
        out.push(c);
        used[j] = true;
        break;
      }
    }
  }
  for (var k2 = 0; k2 < contacts.length; k2++) {
    if (!used[k2]) out.push(contacts[k2]);
  }
  return out;
}
function pokerContactIsDialogListPinned(contactId) {
  if (!contactId) return false;
  var pins = pokerLoadChatDialogListPins();
  for (var i = 0; i < pins.length; i++) {
    if (peerChatIdsEqual(pins[i], contactId)) return true;
  }
  return false;
}
function pokerToggleChatDialogListPin(contactId, removeOnly) {
  var pins = pokerLoadChatDialogListPins();
  var next = pins.filter(function (p) { return !peerChatIdsEqual(p, contactId); });
  if (!removeOnly) next.unshift(String(contactId));
  pokerSaveChatDialogListPins(next);
}

try {
  window.__pokerPeerChatIdsEqual = peerChatIdsEqual;
} catch (ePeerExpose) {}

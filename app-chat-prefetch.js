var personalPrefetchInFlight = {};
var PERSONAL_PREFETCH_TTL_MS = 90000;
var PERSONAL_PREFETCH_BATCH = 12;
/** Не запускать волну prefetch слишком часто: ответы лёгкие, но mode=contacts дергается фоном. */
var PERSONAL_PREFETCH_COOLDOWN_MS = 45000;
var personalPrefetchLastBulkAt = 0;

function pokerChatPrefetchPeerIdsEqual(a, b) {
  try {
    if (typeof window !== "undefined" && typeof window.__pokerPeerChatIdsEqual === "function") {
      return window.__pokerPeerChatIdsEqual(a, b);
    }
  } catch (ePeerEq) {}
  return String(a || "") === String(b || "");
}

function shouldUsePersonalCache(userId) {
  if (!userId) return false;
  var cache = personalMessagesCache[userId];
  if (!Array.isArray(cache) || cache.length === 0) return false;
  var meta = personalMessagesCacheMeta[userId];
  if (!meta || !meta.ts) return true;
  return (Date.now() - meta.ts) < PERSONAL_PREFETCH_TTL_MS;
}
function prefetchPersonalMessages(userId) {
  if (!userId || !pokerApiHasCredential()) return;
  if (chatWithUserId && peerChatIdsEqual(chatWithUserId, userId)) return;
  if (personalPrefetchInFlight[userId]) return;
  if (shouldUsePersonalCache(userId)) return;
  personalPrefetchInFlight[userId] = true;
  var apiBase = typeof getApiBase === "function" ? getApiBase() : "";
  var url = apiBase + "/api/chat" + pokerApiAuthQuery("?") + "&with=" + encodeURIComponent(userId) + "&trackSeen=0&fastOpen=1";
  fetch(url, { cache: "no-store" })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (!data || !data.ok || !Array.isArray(data.messages)) return;
      personalMessagesCache[userId] = data.messages.slice();
      personalMessagesCacheMeta[userId] = { ts: Date.now() };
      try {
        pokerWritePersonalPeerSnapshotToDisk(userId, personalMessagesCache[userId]);
      } catch (ePfDisk) {}
    })
    .catch(function () {})
    .then(function () {
      delete personalPrefetchInFlight[userId];
    });
}

function prefetchTopPersonalDialogs(contacts) {
  if (!Array.isArray(contacts) || contacts.length === 0) return;
  var nowPf = Date.now();
  if (personalPrefetchLastBulkAt && nowPf - personalPrefetchLastBulkAt < PERSONAL_PREFETCH_COOLDOWN_MS) return;
  personalPrefetchLastBulkAt = nowPf;
  var picked = [];
  for (var i = 0; i < contacts.length && picked.length < PERSONAL_PREFETCH_BATCH; i++) {
    var id = contacts[i] && contacts[i].id ? String(contacts[i].id) : "";
    if (!id) continue;
    if (chatWithUserId && peerChatIdsEqual(chatWithUserId, id)) continue;
    picked.push(id);
  }
  picked.forEach(function (id, idx) {
    setTimeout(function () { prefetchPersonalMessages(id); }, idx * 70);
  });
}

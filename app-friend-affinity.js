(function () {
  "use strict";
  function accountKey() {
    if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return "";
    var id = sessionStorage.getItem("poker_dt_id") || localStorage.getItem("poker_dt_id") || "";
    return /^ID\d{6}$/i.test(id) ? "poker_friend_affinity_v1:" + id.toUpperCase() : "";
  }
  function peerId(value) {
    return String(value || "").trim().replace(/^(tg_|mail_)(ID\d+)$/i, "$2");
  }
  function read(key) {
    var data = JSON.parse(localStorage.getItem(key) || "{}");
    return data && typeof data === "object" && !Array.isArray(data) ? data : {};
  }
  window.pokerRecordFriendInteraction = function (id, kind) {
    try {
      var key = accountKey();
      id = peerId(id);
      if (!key || !id || (kind !== "message" && kind !== "profile")) return;
      var data = read(key);
      var row = Object.prototype.hasOwnProperty.call(data, id) ? data[id] : null;
      data[id] = { score: Math.max(0, Number(row && row.score) || 0) + (kind === "message" ? 3 : 1), at: Date.now() };
      Object.keys(data).sort(function (a, b) { return data[b].at - data[a].at; }).slice(500).forEach(function (old) { delete data[old]; });
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {}
  };
  window.pokerRankFriendPreview = function (rows) {
    var data = {};
    try { var key = accountKey(); if (key) data = read(key); } catch (e) {}
    function score(row) {
      var ids = [row.userId, row.chatUserId, row.id].map(peerId).filter(function (id, i, all) { return id && all.indexOf(id) === i; });
      return ids.reduce(function (sum, id) { return sum + (Object.prototype.hasOwnProperty.call(data, id) ? Math.max(0, Number(data[id].score) || 0) : 0); }, 0);
    }
    return (Array.isArray(rows) ? rows : []).slice().sort(function (a, b) {
      return score(b) - score(a) || String(a.userId || a.chatUserId || a.id || "").localeCompare(String(b.userId || b.chatUserId || b.id || ""));
    });
  };
})();

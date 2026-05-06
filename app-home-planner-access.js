function initHomePlannerAccessRuntime(options) {
  var cfg = options || {};
  var sharedUsernames = cfg.sharedUsernames || {};
  var soloUsernames = cfg.soloUsernames || {};
  var allowedTelegramIds = cfg.allowedTelegramIds || {};
  var polyTelegramId = cfg.polyTelegramId;
  var sharedStorageKey = cfg.sharedStorageKey;

  function getPlannerTelegramUser() {
    var user =
      typeof getPokerResolvedTelegramUser === "function" ? getPokerResolvedTelegramUser() : null;
    if (!user && window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe) {
      user = window.Telegram.WebApp.initDataUnsafe.user;
    }
    return user || null;
  }

  function plannerAuthUsernameLower() {
    try {
      var _ap = window.__pokerTelegramAuth;
      if (_ap && _ap.user && _ap.user.username != null) {
        return String(_ap.user.username).replace(/^@+/, "").trim().toLowerCase();
      }
    } catch (eAu) {}
    try {
      var _rec = typeof pokerReadPwaTgSessionRecord === "function" ? pokerReadPwaTgSessionRecord() : null;
      if (_rec && _rec.user && _rec.user.username != null) {
        return String(_rec.user.username).replace(/^@+/, "").trim().toLowerCase();
      }
    } catch (eRec) {}
    return "";
  }

  function plannerAuthEmailLower() {
    try {
      var _ap = window.__pokerTelegramAuth;
      if (_ap && _ap.user && _ap.user.email != null) {
        return String(_ap.user.email).trim().toLowerCase();
      }
    } catch (eAuEmail) {}
    try {
      var _rec = typeof pokerReadPwaTgSessionRecord === "function" ? pokerReadPwaTgSessionRecord() : null;
      if (_rec && _rec.user && _rec.user.email != null) {
        return String(_rec.user.email).trim().toLowerCase();
      }
    } catch (eRecEmail) {}
    return "";
  }

  function normUser() {
    var user = getPlannerTelegramUser();
    var u = user && user.username ? String(user.username) : "";
    var n = u.replace(/^@+/, "").trim().toLowerCase();
    if (n) return n;
    return plannerAuthUsernameLower();
  }

  function isPlannerSoloUser() {
    var u = normUser();
    if (u && soloUsernames[u]) return true;
    var user = getPlannerTelegramUser();
    if (user && user.id != null && polyTelegramId != null) {
      if (Number(user.id) === polyTelegramId) return true;
    }
    try {
      var _ap = window.__pokerTelegramAuth;
      if (_ap && _ap.user && _ap.user.id != null && polyTelegramId != null) {
        if (Number(_ap.user.id) === polyTelegramId) return true;
      }
      var _recTg = typeof pokerReadPwaTgSessionRecord === "function" ? pokerReadPwaTgSessionRecord() : null;
      if (_recTg && _recTg.user && _recTg.user.id != null && polyTelegramId != null) {
        if (Number(_recTg.user.id) === polyTelegramId) return true;
      }
    } catch (eSo) {}
    return false;
  }

  function isPlannerAllowedUser() {
    try {
      var _ap = window.__pokerTelegramAuth;
      if (_ap && _ap.adminAccess === true) return true;
      if (_ap && _ap.gazettePlannerAccess === true) return true;
      var _recTg = typeof pokerReadPwaTgSessionRecord === "function" ? pokerReadPwaTgSessionRecord() : null;
      if (_recTg && _recTg.adminAccess === true) return true;
      if (_recTg && _recTg.gazettePlannerAccess === true) return true;
    } catch (ePlAllow) {}
    var ua = plannerAuthUsernameLower();
    if (ua && (soloUsernames[ua] || sharedUsernames[ua])) return true;
    if (ua === "roman1_matvienko") return true;
    if (plannerAuthEmailLower() === "matvienkoro92@gmail.com") return true;
    var user = getPlannerTelegramUser();
    if (user) {
      var u = user.username != null ? String(user.username).replace(/^@+/, "").trim().toLowerCase() : "";
      if (u && soloUsernames[u]) return true;
      if (u && sharedUsernames[u]) return true;
      if (u === "roman1_matvienko") return true;
      if (user.id != null) {
        var idNum = Number(user.id);
        if (!isNaN(idNum)) {
          if (polyTelegramId != null && idNum === polyTelegramId) return true;
          if (allowedTelegramIds[idNum]) return true;
        }
      }
    }
    try {
      var authCandidates = [];
      var auth = window.__pokerTelegramAuth;
      if (auth && auth.user) authCandidates.push(auth.user);
      var rec = typeof pokerReadPwaTgSessionRecord === "function" ? pokerReadPwaTgSessionRecord() : null;
      if (rec && rec.user) authCandidates.push(rec.user);
      for (var i = 0; i < authCandidates.length; i++) {
        var id = authCandidates[i] && authCandidates[i].id != null ? Number(authCandidates[i].id) : NaN;
        if (!isNaN(id) && allowedTelegramIds[id]) return true;
      }
    } catch (eAuthIds) {}
    return false;
  }

  function plannerStorageKey() {
    if (!isPlannerAllowedUser()) return null;
    if (isPlannerSoloUser()) {
      var u = normUser();
      if ((!u || !soloUsernames[u]) && polyTelegramId != null) {
        var userK = getPlannerTelegramUser();
        var idK = userK && userK.id != null ? Number(userK.id) : NaN;
        if (idK === polyTelegramId) u = "polyapineapple";
      }
      if (!u || !soloUsernames[u]) u = plannerAuthUsernameLower();
      if (u && soloUsernames[u]) return "poker_gazette_editor_planner_solo_" + u + "_v1";
      return "poker_gazette_editor_planner_solo_polyapineapple_v1";
    }
    return sharedStorageKey;
  }

  return {
    getPlannerTelegramUser: getPlannerTelegramUser,
    isPlannerAllowedUser: isPlannerAllowedUser,
    isPlannerSoloUser: isPlannerSoloUser,
    normUser: normUser,
    plannerAuthEmailLower: plannerAuthEmailLower,
    plannerAuthUsernameLower: plannerAuthUsernameLower,
    plannerStorageKey: plannerStorageKey,
  };
}

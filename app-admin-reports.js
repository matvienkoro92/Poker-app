function initAdminReportModal() {
  var btn = document.getElementById("adminReportBtn");
  var modal = document.getElementById("adminReportModal");
  var closeBtn = document.getElementById("adminReportModalClose");
  var backdrop = document.getElementById("adminReportModalBackdrop");
  var dateEl = document.getElementById("adminReportDate");
  var tabs = modal ? modal.querySelectorAll(".admin-report-tab") : null;
  var panels = modal ? modal.querySelectorAll(".admin-report-panel") : null;
  var submitBtn = document.getElementById("adminReportSubmitBtn");
  var sentList = document.getElementById("adminReportSentList");
  var formBody = document.getElementById("adminReportFormBody");
  var rakebackBody = document.getElementById("adminReportRakebackTableBody");
  var rakebackAddBtn = document.getElementById("adminReportRakebackAddBtn");
  var rakebackRefreshBtn = document.getElementById("adminReportRakebackRefreshBtn");
  var rakebackSearchInput = document.getElementById("adminReportRakebackSearch");
  var rakebackSortSelect = document.getElementById("adminReportRakebackSort");
  var rakebackRoomTabs = modal ? modal.querySelectorAll("[data-rakeback-room-tab]") : null;
  var rakebackArchiveBtn = document.getElementById("adminReportRakebackArchiveBtn");
  var rakebackTotalEl = document.getElementById("adminReportRakebackTotal");
  var rakebackRoomTotalLabelEl = document.getElementById("adminReportRakebackRoomTotalLabel");
  var rakebackRoomTotalEl = document.getElementById("adminReportRakebackRoomTotal");
  var rakebackTotalInput = document.getElementById("adminReportRakeback");
  var rakebackStatusEl = document.getElementById("adminReportRakebackStatus");
  var rakebackGrandTotalBtn = document.getElementById("adminReportRakebackGrandTotalBtn");
  var rakebackTotalsModal = document.getElementById("adminReportRakebackTotalsModal");
  var rakebackTotalsList = document.getElementById("adminReportRakebackTotalsList");
  var rakebackTotalsClose = document.getElementById("adminReportRakebackTotalsClose");
  var rakebackTotalsBackdrop = document.getElementById("adminReportRakebackTotalsBackdrop");
  var rakebackSummaryEl = modal ? modal.querySelector(".admin-report-rakeback-summary") : null;
  var calculationsRoot = document.getElementById("adminReportCalculations");
  var calculationGroupSaveBtns = modal ? modal.querySelectorAll("[data-admin-report-calc-save]") : null;
  var calculationGroupEditBtns = modal ? modal.querySelectorAll("[data-admin-report-calc-edit]") : null;
  var calculationGroupStatusEls = modal ? modal.querySelectorAll("[data-admin-report-calc-status]") : null;
  var calculationsCashInputs = modal ? modal.querySelectorAll("[data-admin-report-calc-cash]") : null;
  var calculationsWinLossInputs = modal ? modal.querySelectorAll("[data-admin-report-calc-winloss]") : null;
  var calculationsArchiveEl = document.getElementById("adminReportCalcArchive");
  var calculationsCashTotalEl = document.getElementById("adminReportCalcCashTotal");
  var calculationsWinLossTotalEl = document.getElementById("adminReportCalcWinLossTotal");
  var calculationsWeekLabelEl = document.getElementById("adminReportCalcWeekLabel");
  var calculationsDepositEl = document.getElementById("adminReportCalcDeposit");
  var calculationsBonusesEl = document.getElementById("adminReportCalcBonuses");
  var calculationsRakebackEl = document.getElementById("adminReportCalcRakeback");
  var calculationsRakeTotalEl = document.getElementById("adminReportCalcRakeTotal");
  var calculationsCashoutEl = document.getElementById("adminReportCalcCashout");
  var calculationsBotExchipCashoutEl = document.getElementById("adminReportCalcBotExchipCashout");
  var calculationsGrandTotalEl = document.getElementById("adminReportCalcGrandTotal");
  var figuresRoot = document.getElementById("adminReportCalcFigures");
  var figuresRakeInputs = modal ? modal.querySelectorAll("[data-admin-report-figures-rake]") : null;
  var figuresPercentOutputs = modal ? modal.querySelectorAll("[data-admin-report-figures-percent]") : null;
  var figuresRakeTotalEl = document.getElementById("adminReportFiguresRakeTotal");
  var figuresRakeTotalMirrorEl = document.getElementById("adminReportFiguresRakeTotalMirror");
  var figuresPercentTotalEl = document.getElementById("adminReportFiguresPercentTotal");
  var figuresPercentTotalMirrorEl = document.getElementById("adminReportFiguresPercentTotalMirror");
  var figuresRakebackEl = document.getElementById("adminReportFiguresRakeback");
  var figuresBonusesEl = document.getElementById("adminReportFiguresBonuses");
  var figuresSalaryEl = document.getElementById("adminReportFiguresSalary");
  var figuresSaveBtn = document.getElementById("adminReportFiguresSaveBtn");
  var figuresEditBtn = document.getElementById("adminReportFiguresEditBtn");
  var figuresSaveStatusEl = document.getElementById("adminReportFiguresSaveStatus");
  var figuresRomanPaidInput = document.getElementById("adminReportFiguresRomanPaid");
  var figuresWinLossInput = document.getElementById("adminReportFiguresWinLoss");
  var figuresAgentsPaidInput = document.getElementById("adminReportFiguresAgentsPaid");
  var figuresExtrasEl = document.getElementById("adminReportFiguresExtras");
  var figuresAddFieldBtn = document.getElementById("adminReportFiguresAddField");
  var figuresApproxRakebackEnabledInput = document.getElementById("adminReportFiguresApproxRakebackEnabled");
  var figuresApproxRateInputs = modal ? modal.querySelectorAll("input[name='adminReportFiguresApproxRate']") : null;
  var figuresApproxRomanRakeInput = document.getElementById("adminReportFiguresApproxRomanRake");
  var figuresApproxRakebackEl = document.getElementById("adminReportFiguresApproxRakeback");
  var figuresApproxTotalRakeEl = document.getElementById("adminReportFiguresApproxTotalRake");
  var figuresApproxAgentsRakeEl = document.getElementById("adminReportFiguresApproxAgentsRake");
  var figuresApproxIssuedRakeEl = document.getElementById("adminReportFiguresApproxIssuedRake");
  var figuresApproxFormulaEl = document.getElementById("adminReportFiguresApproxFormula");
  var figuresGrandTotalEl = document.getElementById("adminReportFiguresGrandTotal");
  var editingReportId = null;
  var editingReport = null;
  var rakebackGroupSeq = 0;
  var activeRakebackRoom = "P21";
  var rakebackArchiveMode = false;
  var rakebackRoomTotals = {};
  var rakebackDraftSaveTimer = null;
  var rakebackDraftSaveIdle = null;
  var rakebackDraftLoadIdle = null;
  var rakebackStatusClearTimer = null;
  var rakebackDraftMutationSeq = 0;
  var rakebackDraftLocalEditUntil = 0;
  var loadingRakebackDraft = false;
  var savingRakebackDraft = false;
  var rakebackDraftNeedsMigration = false;
  var rakebackDragState = null;
  var rakebackPendingIdCopy = null;
  var rakebackSuppressIdClickInput = null;
  var rakebackSuppressIdClickAt = 0;
  var rakebackDeferredSyncSeq = 0;
  var rakebackSummaryTimer = null;
  var rakebackSearchRefreshTimer = null;
  var rakebackDecorationTimer = null;
  var rakebackDecorationSeq = 0;
  var rakebackRefreshAttentionDismissed = false;
  var rakebackSearchDetachedRows = [];
  var rakebackSuspendedRows = [];
  var rakebackLazyTemplateRows = [];
  var rakebackWeekArchiveOpen = {};
  var rakebackWeekRoomArchiveOpen = {};
  var manualRakebackInputTouched = false;
  var calculationCashTotal = 0;
  var calculationWeekTotals = {};
  var calculationReportsCache = [];
  var calculationsDraftHydrated = false;
  var figuresRakeTotal = 0;
  var figuresPercentTotal = 0;
  var issuedRakebackReportRakeTotal = 0;
  var figuresSavedLocked = false;
  var calculationGroupLocks = { cash: false, week: false, rake: false, winloss: false };
  var calculationsStatusTimer = null;
  var figuresStatusTimer = null;
  var calculationCashUpdateTimer = null;
  var calculationGrandUpdateTimer = null;
  var figuresTotalsUpdateTimer = null;
  var sentReportsLoadedAt = 0;
  var sentReportsLoading = false;
  var SENT_REPORTS_CACHE_TTL_MS = 5 * 60 * 1000;
  var DEFAULT_RAKEBACK_SORT_MODE = "created";
  var RAKEBACK_ROOMS = ["P21", "X", "Supr", "PP"];
  var RAKEBACK_EDITOR_IDS = ["1897001087"];
  var RAKEBACK_EDITOR_USERNAMES = [];
  var RAKEBACK_REFRESH_ACCESS_IDS = ["388008256", "2144406710"];
  var RAKEBACK_REFRESH_ACCESS_USERNAMES = ["roman1787443", "roman1_matvienko"];
  var RAKEBACK_REFRESH_ACCESS_EMAILS = ["matvienkoro92@gmail.com"];
  var rakebackAccessCache = null;
  if (!btn || !modal) return;
  if (btn.dataset.adminReportBound === "1") return;
  btn.dataset.adminReportBound = "1";

  var P21_RAKEBACK_TEMPLATE_IDS = [
    "691016", "778130", "397790", "482282", "771674", "229705",
    "915671", "602193", "234380", "348482", "267345", "751126",
    "931569", "720457", "816444", "524129", "233111", "429724", "730377", "436507",
    "465670", "408548", "434456", "594679", "445976", "221494", "653205", "772700",
    "964474", "682754", "398176", "804788", "662772", "177939", "839673", "318625",
    "338241", "293980", "113524", "792152", "930194", "885844",
    "312695", "173085", "501327", "281356", "942620", "148233", "305625", "834131",
    "183626", "933670", "124128", "676837", "144210", "680677", "606081", "398340",
    "503309", "256073", "892420", "998051", "548617", "655861", "985253", "725035",
    "429112", "665755", "534992", "327409", "292523", "937862", "121231", "764264",
    "427286", "973892", "720664", "243324", "275834", "483686", "471918", "612591",
    "961288", "735493", "512401", "782834", "347414", "540684", "641852", "275753",
    "634104", "251026", "723468", "113729", "489011", "383397", "992854", "679605",
    "285184", "888986", "696773", "228739", "766984", "644584", "854203", "925668",
    "129591", "367580", "232000", "120005", "222856", "532224", "724113", "616036",
    "312553", "415786", "508434", "255750", "740805", "879744", "915144", "663224",
    "938160", "481398", "922387", "874665", "497881", "328866", "832294", "986689",
    "986658", "849319", "797365", "589618", "299085", "839736", "738748", "677471",
    "290183", "431231", "605805", "144177", "480283", "253212", "802622", "271525",
    "532558", "642007", "678396", "513734", "902183", "532205", "533528", "370806",
    "944547", "621649", "411042", "779404", "998528", "289397", "933695", "560179",
    "299085", "969218", "552972", "468274"
  ];
  var X_RAKEBACK_TEMPLATE_IDS = [
    "2818330", "2212719", "1236324", "2979672", "3683162", "2421898", "3062335", "3156827",
    "3651673", "3624812", "3679582", "3635957", "2808506", "171982", "2778706", "3243055",
    "3084293", "2728933", "2998793", "3861075", "2624851", "2697289", "2853060", "2890645",
    "2553706", "2354339", "2701935", "3546001", "2670997", "3497335", "3095671", "3000308",
    "1933875", "2188305", "2335996", "2390619", "2465472", "2491095", "2462690", "2983615",
    "3505261", "2373626", "2427758", "3033015", "2625453", "3349828", "139934", "4012970",
    "3674918", "4005689", "3008666", "3856540", "3284188", "2464200", "3723391", "507910",
    "3413977", "3800754", "3618829", "2522764", "3058876", "3443666", "2361032", "3890004",
    "3185830", "2844936", "2331856", "3350763", "2816893", "3095323", "2757940", "2321387",
    "3917759", "3158540", "3384538", "3287589", "2354645", "3972821", "2191331", "3973346",
    "2527435", "2315119", "2380577", "2313932", "3904233", "1886757", "2318455", "3181513",
    "3010068", "3849977", "2317823", "2323362", "3250268", "3426114", "2825889", "1970348",
    "2041755", "1649261", "3381251", "3832436", "2251501", "3618781", "1194609", "3205083",
    "3624774", "2285564", "3627740", "3139796", "3157488", "3606600", "1114745", "3112807",
    "3018756", "3571637", "2775905", "2863955", "3544409", "2368957", "3221045", "2925302",
    "2225551", "3689494", "3442715", "2319734", "3621933", "2684594", "3041746", "3618153",
    "2455586", "3808395", "3806265", "3943809", "3178997", "2068680", "3935850"
  ];
  var PP_RAKEBACK_TEMPLATE_IDS = ["552903", "435607", "11782814", "590773", "563356", "635675", "347375"];
  var SUPR_RAKEBACK_TEMPLATE_IDS = [
    "1048441", "527634", "831611", "889188", "517643", "1682364", "1650900", "1165667",
    "605232", "776949", "1550929", "543758", "1162188", "1408160", "1525558", "830328",
    "859380", "1195602", "923422", "1375569", "1551750", "713977", "993270", "1023438",
    "999691", "854809", "1262781", "1072049", "1375862", "764750", "973916", "1221334",
    "1346459", "1190499", "1237899", "1069215", "712970", "1185486", "1050952", "865362",
    "1053772", "1285806", "1611851", "630124", "1377722", "1575192", "1570839", "1102639",
    "725076", "885558", "1073571", "1459747", "802380", "1509751", "1411436", "1308425"
  ];
  var RAKEBACK_TEMPLATE_CREATED_AT = Date.parse("2026-05-08T22:20:00+03:00");
  var RAKEBACK_TEMPLATE_RESET_AT = Date.parse("2026-05-15T23:27:13.189Z");
  var RAKEBACK_ROW_COLORS = [
    { value: "#4a3205", label: "Золотой мягкий" },
    { value: "#73510b", label: "Золотой средний" },
    { value: "#9a6b10", label: "Золотой яркий" },
    { value: "#63330e", label: "Оранжевый мягкий" },
    { value: "#965019", label: "Оранжевый средний" },
    { value: "#c96b20", label: "Оранжевый яркий" },
    { value: "#064b2f", label: "Зеленый мягкий" },
    { value: "#087a48", label: "Зеленый средний" },
    { value: "#0a9f5c", label: "Зеленый яркий" },
    { value: "#064b4b", label: "Бирюзовый мягкий" },
    { value: "#087878", label: "Бирюзовый средний" },
    { value: "#0f9f9a", label: "Бирюзовый яркий" },
    { value: "#123a66", label: "Синий мягкий" },
    { value: "#155996", label: "Синий средний" },
    { value: "#1d75c7", label: "Синий яркий" },
    { value: "#3a2466", label: "Фиолетовый мягкий" },
    { value: "#5b35a0", label: "Фиолетовый средний" },
    { value: "#7c4ddb", label: "Фиолетовый яркий" },
    { value: "#5f1b45", label: "Розовый мягкий" },
    { value: "#8f2869", label: "Розовый средний" },
    { value: "#c23a8a", label: "Розовый яркий" },
    { value: "#5f1d1d", label: "Красный мягкий" },
    { value: "#8f2b2b", label: "Красный средний" },
    { value: "#bd3a3a", label: "Красный яркий" },
    { value: "#2c3440", label: "Серый мягкий" },
    { value: "#46515f", label: "Серый яркий" },
  ];
  var RAKEBACK_ROW_LEGACY_COLOR_MAP = {
    "#332411": "#73510b",
    "#173520": "#087a48",
    "#152b46": "#155996",
    "#331b24": "#8f2b2b",
    "#2d2344": "#5b35a0",
    "#26313a": "#46515f",
  };

  function canViewSentReports() {
    try {
      var auth = window.__pokerTelegramAuth;
      if (auth && (auth.adminAccess === true || auth.adminReportAccess === true)) return true;
      var rec = typeof pokerReadPwaTgSessionRecord === "function" ? pokerReadPwaTgSessionRecord() : null;
      if (rec && (rec.adminAccess === true || rec.adminReportAccess === true)) return true;
    } catch (eAuth) {}
    var users = [];
    try {
      var resolved = typeof getPokerResolvedTelegramUser === "function" ? getPokerResolvedTelegramUser() : null;
      if (resolved) users.push(resolved);
    } catch (eResolved) {}
    try {
      if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user) {
        users.push(window.Telegram.WebApp.initDataUnsafe.user);
      }
    } catch (eTg) {}
    try {
      var authUser = window.__pokerTelegramAuth && window.__pokerTelegramAuth.user ? window.__pokerTelegramAuth.user : null;
      if (authUser) users.push(authUser);
    } catch (eAuthUser) {}
    try {
      var recUser = typeof pokerReadPwaTgSessionRecord === "function" ? pokerReadPwaTgSessionRecord() : null;
      if (recUser && recUser.user) users.push(recUser.user);
    } catch (eRecUser) {}
    for (var i = 0; i < users.length; i++) {
      var u = users[i] || {};
      var id = u.id != null ? String(u.id).replace(/^tg_/, "").trim() : "";
      if (id === "388008256" || id === "2144406710" || id === "1897001087") return true;
      var username = u.username != null ? String(u.username).replace(/^@+/, "").trim().toLowerCase() : "";
      if (username === "roman1787443" || username === "roman1_matvienko") return true;
      var email = u.email != null ? String(u.email).trim().toLowerCase() : "";
      if (email === "matvienkoro92@gmail.com") return true;
    }
    return false;
  }

  function canViewCalculationsReports() {
    var users = [];
    try {
      var resolved = typeof getPokerResolvedTelegramUser === "function" ? getPokerResolvedTelegramUser() : null;
      if (resolved) users.push(resolved);
    } catch (eResolved) {}
    try {
      if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user) {
        users.push(window.Telegram.WebApp.initDataUnsafe.user);
      }
    } catch (eTg) {}
    try {
      var authUser = window.__pokerTelegramAuth && window.__pokerTelegramAuth.user ? window.__pokerTelegramAuth.user : null;
      if (authUser) users.push(authUser);
    } catch (eAuthUser) {}
    try {
      var recUser = typeof pokerReadPwaTgSessionRecord === "function" ? pokerReadPwaTgSessionRecord() : null;
      if (recUser && recUser.user) users.push(recUser.user);
    } catch (eRecUser) {}
    for (var i = 0; i < users.length; i++) {
      var u = users[i] || {};
      var names = [u.username, u.telegramUsername, u.pwaUsername];
      for (var j = 0; j < names.length; j++) {
        var username = names[j] != null ? String(names[j]).replace(/^@+/, "").trim().toLowerCase() : "";
        if (username === "roman1787443" || username === "roman1_matvienko") return true;
      }
    }
    return false;
  }

  function getRakebackIdentityCandidates() {
    var users = [];
    try {
      var resolved = typeof getPokerResolvedTelegramUser === "function" ? getPokerResolvedTelegramUser() : null;
      if (resolved) users.push(resolved);
    } catch (eResolved) {}
    try {
      if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user) {
        users.push(window.Telegram.WebApp.initDataUnsafe.user);
      }
    } catch (eTg) {}
    try {
      var auth = window.__pokerTelegramAuth || null;
      if (auth) users.push(auth);
      if (auth && auth.user) users.push(auth.user);
    } catch (eAuthUser) {}
    try {
      var rec = typeof pokerReadPwaTgSessionRecord === "function" ? pokerReadPwaTgSessionRecord() : null;
      if (rec) users.push(rec);
      if (rec && rec.user) users.push(rec.user);
    } catch (eRec) {}
    return users;
  }

  function rakebackIdentityMatches(users, idsList, usernamesList, emailsList) {
    var idsAllowed = Array.isArray(idsList) ? idsList : [];
    var usernamesAllowed = Array.isArray(usernamesList) ? usernamesList : [];
    var emailsAllowed = Array.isArray(emailsList) ? emailsList : [];
    for (var i = 0; i < users.length; i++) {
      var u = users[i] || {};
      var ids = [u.id, u.memberId, u.telegramId, u.telegram_id, u.uid, u.userId, u.user_id];
      for (var j = 0; j < ids.length; j++) {
        var rawId = ids[j] != null ? String(ids[j]).replace(/^tg_/, "").trim() : "";
        if (idsAllowed.indexOf(rawId) >= 0) return true;
      }
      var names = [u.username, u.telegramUsername, u.pwaUsername];
      for (var k = 0; k < names.length; k++) {
        var username = names[k] != null ? String(names[k]).replace(/^@+/, "").trim().toLowerCase() : "";
        if (usernamesAllowed.indexOf(username) >= 0) return true;
      }
      var emails = [u.email, u.pwaEmail, u.mail];
      for (var m = 0; m < emails.length; m++) {
        var email = emails[m] != null ? String(emails[m]).trim().toLowerCase() : "";
        if (emailsAllowed.indexOf(email) >= 0) return true;
      }
    }
    return false;
  }

  function getRakebackAccessState() {
    var now = Date.now();
    if (rakebackAccessCache && now - rakebackAccessCache.at < 1000) return rakebackAccessCache;
    var users = getRakebackIdentityCandidates();
    rakebackAccessCache = {
      at: now,
      canEdit: rakebackIdentityMatches(users, RAKEBACK_EDITOR_IDS, RAKEBACK_EDITOR_USERNAMES),
      canRefresh: rakebackIdentityMatches(users, RAKEBACK_REFRESH_ACCESS_IDS, RAKEBACK_REFRESH_ACCESS_USERNAMES, RAKEBACK_REFRESH_ACCESS_EMAILS),
    };
    return rakebackAccessCache;
  }

  function resetRakebackAccessCache() {
    rakebackAccessCache = null;
  }

  function canManageAllRakebackRows() {
    return !!getRakebackAccessState().canEdit;
  }

  function canRefreshSharedRakebackDraft() {
    return !!getRakebackAccessState().canRefresh;
  }

  function canSyncSharedRakebackDraft() {
    return canManageAllRakebackRows() || canRefreshSharedRakebackDraft();
  }

  function canEditRakebackDraftRows() {
    return canManageAllRakebackRows() || canRefreshSharedRakebackDraft();
  }

  function syncRakebackRefreshButtonAccess() {
    if (!rakebackRefreshBtn) return false;
    var allowed = canSyncSharedRakebackDraft();
    rakebackRefreshBtn.hidden = !allowed;
    rakebackRefreshBtn.disabled = !allowed;
    rakebackRefreshBtn.classList.toggle("admin-report-rakeback-refresh-btn--attention", allowed && !rakebackRefreshAttentionDismissed);
    return allowed;
  }

  function syncRakebackAddButtonAccess() {
    if (!rakebackAddBtn) return;
    var allowed = canEditRakebackDraftRows() && !rakebackArchiveMode;
    rakebackAddBtn.hidden = !allowed;
    rakebackAddBtn.disabled = !allowed;
  }

  function syncRakebackAccessControls() {
    syncRakebackRefreshButtonAccess();
    syncRakebackAddButtonAccess();
    if (!rakebackBody) return;
    Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]")).forEach(function (row) {
      setRakebackRowSaved(row, row.getAttribute("data-rakeback-saved") === "1");
    });
  }

  function syncSentReportsAccess() {
    var allowed = canViewSentReports();
    var calculationsAllowed = canViewCalculationsReports();
    if (tabs && tabs.length) {
      tabs.forEach(function (tab) {
        if (tab.getAttribute("data-admin-report-tab") === "sent") tab.hidden = !allowed;
        if (tab.getAttribute("data-admin-report-tab") === "calculations") tab.hidden = !calculationsAllowed;
      });
    }
    if (panels && panels.length) {
      panels.forEach(function (panel) {
        if (panel.getAttribute("data-admin-report-panel") === "sent") panel.hidden = !allowed;
        if (panel.getAttribute("data-admin-report-panel") === "calculations") panel.hidden = !calculationsAllowed;
      });
    }
    if (!allowed && sentList) sentList.innerHTML = "";
    return allowed || calculationsAllowed;
  }

  function parseReportNumber(raw) {
    var n = typeof raw === "number" ? raw : parseFloat(String(raw != null ? raw : "").replace(",", "."));
    return isNaN(n) ? 0 : n;
  }

  function formatReportNumber(n) {
    var num = parseReportNumber(n);
    if (!num) return "0";
    var rounded = Math.round(num * 100) / 100;
    return String(rounded).replace(".", ",");
  }

  function formatReportInputNumber(n) {
    var num = parseReportNumber(n);
    if (!num) return "";
    var rounded = Math.round(num * 100) / 100;
    return String(rounded);
  }

  function formatRakebackCellNumber(n) {
    return parseReportNumber(n) === 0 ? "" : formatReportNumber(n);
  }

  function formatRakebackAmountCell(n) {
    return parseReportNumber(n) === 0 ? "" : formatReportRubleNumber(n);
  }

  function formatReportRubleNumber(n) {
    var num = parseReportNumber(n);
    if (!num) return "0";
    return String(Math.round(num));
  }

  function getRakebackRoomLabel(room) {
    var normalized = normalizeRakebackRoom(room);
    if (normalized === "X") return "Хпокер";
    if (normalized === "Supr") return "Супрема";
    if (normalized === "PP") return "PPpoker";
    return "Покер21";
  }

  function getRakebackRoomMultiplier(room) {
    var normalized = normalizeRakebackRoom(room);
    if (normalized === "X") return 100;
    if (normalized === "Supr" || normalized === "PP") return 115;
    return 1;
  }

  function getRakebackReportAmount(room, displayAmount) {
    var amount = Math.round(parseReportNumber(displayAmount));
    return amount * getRakebackRoomMultiplier(room);
  }

  function getRakebackReportRake(row) {
    var room = getRakebackRowRoom(row);
    return getRakebackReportAmount(room, getRakebackRowCalculationBase(row));
  }

  function getRakebackRowRawRake(row) {
    if (!row) return 0;
    var rakeInput = row.querySelector("[data-rakeback-rake]");
    return parseReportNumber(rakeInput ? rakeInput.value : "");
  }

  function getRakebackRowFullReportRake(row) {
    if (!row) return 0;
    return getRakebackReportAmount(getRakebackRowRoom(row), getRakebackRowRawRake(row));
  }

  function addRakebackLatestGroupRake(latestByGroup, row, index) {
    if (!latestByGroup || !row) return;
    var groupId = row.getAttribute("data-rakeback-group") || ("__row_" + (Number(index) || 0));
    latestByGroup[groupId] = row;
  }

  function sumRakebackLatestGroupRake(latestByGroup) {
    return Object.keys(latestByGroup || {}).reduce(function (sum, key) {
      return sum + getRakebackRowFullReportRake(latestByGroup[key]);
    }, 0);
  }

  function addCollectedLatestGroupRake(latestByGroup, row, index) {
    if (!latestByGroup || !row) return;
    var groupId = row.groupId || ("__row_" + (Number(index) || 0));
    latestByGroup[groupId] = row;
  }

  function getCollectedRowFullReportRake(row) {
    if (!row) return 0;
    return getRakebackReportAmount(row.room, parseReportNumber(row.rake));
  }

  function sumCollectedLatestGroupRake(latestByGroup) {
    return Object.keys(latestByGroup || {}).reduce(function (sum, key) {
      return sum + getCollectedRowFullReportRake(latestByGroup[key]);
    }, 0);
  }

  function formatRakebackRoomTotal(room, displayAmount, reportAmount) {
    var multiplier = getRakebackRoomMultiplier(room);
    if (multiplier === 1) return formatReportRubleNumber(reportAmount);
    var chips = Math.round(parseReportNumber(displayAmount));
    return formatReportRubleNumber(chips) + " фишек × " + multiplier + " = " + formatReportRubleNumber(reportAmount);
  }

  function formatRakebackSummaryPair(rake, rakeback) {
    return formatReportRubleNumber(rake) + " / " + formatReportRubleNumber(rakeback);
  }

  function copyReportText(text) {
    var value = String(text != null ? text : "").trim();
    if (!value) return Promise.reject(new Error("empty"));
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(value);
    }
    return new Promise(function (resolve, reject) {
      var textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      textarea.style.top = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        if (document.execCommand("copy")) resolve();
        else reject(new Error("copy"));
      } catch (err) {
        reject(err);
      } finally {
        textarea.parentNode.removeChild(textarea);
      }
    });
  }

  function nextRakebackGroupId() {
    rakebackGroupSeq += 1;
    return "rb-" + Date.now().toString(36) + "-" + rakebackGroupSeq;
  }

  function getCurrentRakebackOwnerId() {
    var users = [];
    try {
      var resolved = typeof getPokerResolvedTelegramUser === "function" ? getPokerResolvedTelegramUser() : null;
      if (resolved) users.push(resolved);
    } catch (eResolved) {}
    try {
      var authUser = window.__pokerTelegramAuth && window.__pokerTelegramAuth.user ? window.__pokerTelegramAuth.user : null;
      if (authUser) users.push(authUser);
    } catch (eAuthUser) {}
    try {
      var rec = typeof pokerReadPwaTgSessionRecord === "function" ? pokerReadPwaTgSessionRecord() : null;
      if (rec && rec.user) users.push(rec.user);
    } catch (eRec) {}
    for (var i = 0; i < users.length; i++) {
      var u = users[i] || {};
      var memberId = u.memberId != null ? String(u.memberId).trim() : "";
      if (memberId) return memberId;
      var rawId = u.id != null ? String(u.id).trim() : "";
      if (!rawId) continue;
      if (rawId.indexOf("tg_") === 0 || rawId.indexOf("vk_") === 0) return rawId;
      if (u.is_vk || u.vk || u.vkId != null) return "vk_" + rawId.replace(/^vk_/, "");
      return "tg_" + rawId.replace(/^tg_/, "");
    }
    return "";
  }

  function getRakebackRoomOptions(selected) {
    selected = normalizeRakebackRoom(selected);
    return RAKEBACK_ROOMS.map(function (room) {
      return '<option value="' + escapeReportHtml(room) + '"' + (room === selected ? " selected" : "") + ">" + escapeReportHtml(room) + "</option>";
    }).join("");
  }

  function getRakebackTotalsByDate() {
    if (!rakebackBody) return [];
    var dateMap = {};
    Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]")).forEach(function (row, index) {
      var rowStamp = getRakebackRowEntryAddedAt(row, index);
      if (!Number.isFinite(rowStamp)) return;
      var archived = isRakebackEntryArchivedByStamp(rowStamp);
      if (rakebackArchiveMode ? !archived : archived) return;
      var room = getRakebackRowRoom(row);
      var roomAmount = Math.round(getRakebackRowAmount(row));
      var rakeback = getRakebackReportAmount(room, roomAmount);
      if (rakeback === 0) return;
      var key = getRakebackMoscowDayKey(rowStamp);
      if (!dateMap[key]) dateMap[key] = { key: key, stamp: rowStamp, rakeback: 0 };
      dateMap[key].stamp = Math.max(dateMap[key].stamp, rowStamp);
      dateMap[key].rakeback += rakeback;
    });
    return Object.keys(dateMap).map(function (key) {
      return dateMap[key];
    }).sort(function (a, b) {
      return b.stamp - a.stamp;
    });
  }

  function renderRakebackTotalsModal() {
    if (!rakebackTotalsList) return;
    var roomHtml = RAKEBACK_ROOMS.map(function (room) {
      var total = rakebackRoomTotals[room] || { display: 0, report: 0, rake: 0 };
      var multiplier = getRakebackRoomMultiplier(room);
      var amount = formatRakebackSummaryPair(total.rake, total.report);
      var formula = "";
      if (multiplier !== 1 && parseReportNumber(total.display) !== 0) {
        formula = '<span class="admin-report-rakeback-totals-modal__formula">' + escapeReportHtml(formatRakebackRoomTotal(room, total.display, total.report)) + "</span>";
      }
      return '<div class="admin-report-rakeback-totals-modal__row">' +
        '<span class="admin-report-rakeback-totals-modal__room">' + escapeReportHtml(getRakebackRoomLabel(room)) + "</span>" +
        '<span class="admin-report-rakeback-totals-modal__amount">' + escapeReportHtml(amount) + "</span>" +
        formula +
      "</div>";
    }).join("");
    var dateRows = getRakebackTotalsByDate();
    var dateHtml = dateRows.length ? '<div class="admin-report-rakeback-totals-modal__section-title">Итого по датам</div>' + dateRows.map(function (day) {
      return '<div class="admin-report-rakeback-totals-modal__row admin-report-rakeback-totals-modal__row--date">' +
        '<span class="admin-report-rakeback-totals-modal__room">' + escapeReportHtml(getRakebackDateSeparatorLabel(day.stamp)) + "</span>" +
        '<span class="admin-report-rakeback-totals-modal__amount">' + escapeReportHtml(formatReportRubleNumber(day.rakeback)) + "</span>" +
      "</div>";
    }).join("") : "";
    rakebackTotalsList.innerHTML = roomHtml + dateHtml;
  }

  function openRakebackTotalsModal() {
    if (!rakebackTotalsModal) return;
    renderRakebackTotalsModal();
    rakebackTotalsModal.hidden = false;
    if (rakebackGrandTotalBtn) rakebackGrandTotalBtn.setAttribute("aria-expanded", "true");
  }

  function closeRakebackTotalsModal() {
    if (!rakebackTotalsModal) return;
    rakebackTotalsModal.hidden = true;
    if (rakebackGrandTotalBtn) rakebackGrandTotalBtn.setAttribute("aria-expanded", "false");
  }

  function normalizeRakebackRowColor(color) {
    color = String(color || "").trim().toLowerCase();
    if (RAKEBACK_ROW_LEGACY_COLOR_MAP[color]) return RAKEBACK_ROW_LEGACY_COLOR_MAP[color];
    for (var i = 0; i < RAKEBACK_ROW_COLORS.length; i++) {
      if (RAKEBACK_ROW_COLORS[i].value.toLowerCase() === color) return RAKEBACK_ROW_COLORS[i].value;
    }
    return "";
  }

  function getRakebackRowColorButtons(selectedColor) {
    selectedColor = normalizeRakebackRowColor(selectedColor);
    var buttons = RAKEBACK_ROW_COLORS.map(function (color) {
      var selected = color.value === selectedColor;
      return '<button type="button" class="admin-report-rakeback-color-swatch" data-rakeback-color-value="' + escapeReportHtml(color.value) + '" title="' + escapeReportHtml(color.label) + '" aria-label="' + escapeReportHtml(color.label) + '"' + (selected ? ' data-rakeback-color-selected="1"' : "") + ' style="--rakeback-swatch:' + escapeReportHtml(color.value) + '"></button>';
    });
    buttons.push('<button type="button" class="admin-report-rakeback-color-swatch admin-report-rakeback-color-swatch--clear" data-rakeback-color-value="" title="Сбросить цвет" aria-label="Сбросить цвет">×</button>');
    return buttons.join("");
  }

  function closeRakebackColorMenus(exceptRow) {
    if (!rakebackBody) return;
    Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-color-menu]")).forEach(function (menu) {
      var row = menu.closest("[data-rakeback-row]");
      if (exceptRow && row === exceptRow) return;
      menu.hidden = true;
    });
  }

  function markRakebackCell(cell, copied) {
    if (!rakebackBody || !cell) return;
    var skipCellHighlight = cell.classList && cell.classList.contains("admin-report-rakeback-discount-cell");
    Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-cell-selected],[data-rakeback-cell-copied]")).forEach(function (td) {
      if (td === cell) return;
      td.removeAttribute("data-rakeback-cell-selected");
      td.removeAttribute("data-rakeback-cell-copied");
    });
    if (skipCellHighlight) {
      cell.removeAttribute("data-rakeback-cell-selected");
      cell.removeAttribute("data-rakeback-cell-copied");
      return;
    }
    cell.setAttribute("data-rakeback-cell-selected", "1");
    if (copied) cell.setAttribute("data-rakeback-cell-copied", "1");
    else cell.removeAttribute("data-rakeback-cell-copied");
  }

  function applyRakebackRowColor(row, color) {
    if (!row) return;
    color = normalizeRakebackRowColor(color);
    if (color) {
      row.setAttribute("data-rakeback-row-color", color);
      row.style.setProperty("--rakeback-row-bg", color);
      row.style.setProperty("--rakeback-row-button-color", color);
    } else {
      row.removeAttribute("data-rakeback-row-color");
      row.style.removeProperty("--rakeback-row-bg");
      row.style.removeProperty("--rakeback-row-button-color");
    }
    var menu = row.querySelector("[data-rakeback-color-menu]");
    if (menu) {
      Array.prototype.slice.call(menu.querySelectorAll("[data-rakeback-color-value]")).forEach(function (btn) {
        btn.toggleAttribute("data-rakeback-color-selected", normalizeRakebackRowColor(btn.getAttribute("data-rakeback-color-value")) === color);
      });
    }
  }

  function normalizeRakebackRoom(room) {
    var raw = String(room || "").trim();
    var lower = raw.toLowerCase();
    if (!raw || raw === "Покер21" || lower === "poker21" || lower === "покер21" || lower === "p21") return "P21";
    if (raw === "Х" || lower === "x" || lower === "xpoker" || lower === "хпокер") return "X";
    if (raw === "Супрема" || lower === "suprema" || lower === "supr") return "Supr";
    if (lower === "pp" || lower === "pppoker") return "PP";
    return raw;
  }

  function parseRakebackTimeValue(raw) {
    if (raw == null || raw === "") return NaN;
    if (typeof raw === "number") return Number.isFinite(raw) ? raw : NaN;
    var text = String(raw).trim();
    if (!text) return NaN;
    if (/^\d+(?:\.\d+)?$/.test(text)) {
      var numeric = Number(text);
      return Number.isFinite(numeric) ? numeric : NaN;
    }
    var parsed = Date.parse(text);
    return Number.isFinite(parsed) ? parsed : NaN;
  }

  function getFirstRakebackTimeValue(values, fallback) {
    for (var i = 0; i < values.length; i++) {
      var parsed = parseRakebackTimeValue(values[i]);
      if (Number.isFinite(parsed)) return parsed;
    }
    return fallback;
  }

  function getRakebackTemplateIdsForRoom(room) {
    var normalizedRoom = normalizeRakebackRoom(room || "P21");
    if (normalizedRoom === "P21") return P21_RAKEBACK_TEMPLATE_IDS;
    if (normalizedRoom === "X") return X_RAKEBACK_TEMPLATE_IDS;
    if (normalizedRoom === "PP") return PP_RAKEBACK_TEMPLATE_IDS;
    if (normalizedRoom === "Supr") return SUPR_RAKEBACK_TEMPLATE_IDS;
    return [];
  }

  function getRakebackTemplateCreatedAt(room, playerId) {
    playerId = String(playerId || "").trim();
    if (!playerId) return NaN;
    var ids = getRakebackTemplateIdsForRoom(room);
    return ids.indexOf(playerId) !== -1 ? RAKEBACK_TEMPLATE_CREATED_AT : NaN;
  }

  function isRakebackTemplateEntryStamp(room, playerId, stamp) {
    var templateStamp = getRakebackTemplateCreatedAt(room, playerId);
    stamp = Number(stamp);
    return Number.isFinite(templateStamp) && Number.isFinite(stamp) && Math.abs(stamp - templateStamp) < 1000;
  }

  function getRakebackTemplateKey(room, playerId) {
    var normalizedRoom = normalizeRakebackRoom(room || "P21");
    var id = String(playerId || "").trim();
    return normalizedRoom && id ? normalizedRoom + "\u0000" + id : "";
  }

  function isRakebackTemplateId(room, playerId) {
    playerId = String(playerId || "").trim();
    if (!playerId) return false;
    return getRakebackTemplateIdsForRoom(room).indexOf(playerId) !== -1;
  }

  function normalizeRakebackDeletedTemplates(items) {
    var seen = {};
    var out = [];
    if (!Array.isArray(items)) return out;
    items.forEach(function (item) {
      if (!item) return;
      var room = normalizeRakebackRoom(item.room || "P21");
      var playerId = String(item.playerId || item.id || "").trim();
      var key = getRakebackTemplateKey(room, playerId);
      if (!key || seen[key]) return;
      seen[key] = true;
      out.push({
        room: room,
        playerId: playerId,
        deletedAt: item.deletedAt || Date.now(),
        deletedBy: item.deletedBy || item.ownerId || getCurrentRakebackOwnerId(),
      });
    });
    return out;
  }

  function isRakebackTemplateLikeData(data) {
    if (!data) return false;
    if (data.carryForward === true || data.templateCarryForward === true) return false;
    if (data.rakeZero === true || data.explicitZeroRake === true || data.zeroRake === true) return false;
    return parseReportNumber(data.rake) === 0 &&
      parseReportNumber(data.roomAmount) === 0 &&
      parseReportNumber(data.chipAmount) === 0 &&
      parseReportNumber(data.amount) === 0;
  }

  function isRakebackLazyTemplateData(data) {
    if (!data) return false;
    var kind = data.kind === "addon" || data.isAddon ? "addon" : "base";
    if (kind === "addon") return false;
    if (data.carryForward !== true && data.templateCarryForward !== true) return false;
    if (data.rakeZero === true || data.explicitZeroRake === true || data.zeroRake === true) return false;
    if (data.accounted || data.reportedAt || data.reportId) return false;
    return parseReportNumber(data.rake) === 0 &&
      parseReportNumber(data.roomAmount) === 0 &&
      parseReportNumber(data.chipAmount) === 0 &&
      parseReportNumber(data.amount) === 0;
  }

  function normalizeRakebackLazyTemplateData(data) {
    if (!data) return null;
    var room = normalizeRakebackRoom(data.room || "P21");
    var playerId = String(data.playerId || data.id || "").trim();
    if (!playerId) return null;
    return {
      groupId: data.groupId || "",
      kind: "base",
      room: room,
      playerId: playerId,
      rake: "",
      percent: data.percent != null ? data.percent : "",
      carryForward: true,
      templateCarryForward: true,
      discount15: !!(data.discount15 || data.subtract15),
      ownerId: data.ownerId || data.authorId || "",
      color: data.color || data.rowColor || data.highlightColor || "",
      createdAt: data.createdAt || data.addedAt || data.created || getRakebackTemplateCreatedAt(room, playerId) || "",
      standardAt: data.standardAt || data.orderAt || data.sortAt || "",
      entryAddedAt: data.entryAddedAt || data.firstAddedAt || "",
      saved: data.saved !== false,
    };
  }

  function rememberRakebackLazyTemplateRows(rows) {
    var byKey = {};
    rakebackLazyTemplateRows.forEach(function (row) {
      var normalized = normalizeRakebackLazyTemplateData(row);
      var key = normalized ? getRakebackTemplateKey(normalized.room, normalized.playerId) : "";
      if (key) byKey[key] = normalized;
    });
    (Array.isArray(rows) ? rows : []).forEach(function (row) {
      if (!isRakebackLazyTemplateData(row)) return;
      var normalized = normalizeRakebackLazyTemplateData(row);
      var key = normalized ? getRakebackTemplateKey(normalized.room, normalized.playerId) : "";
      if (key) byKey[key] = normalized;
    });
    rakebackLazyTemplateRows = Object.keys(byKey).map(function (key) { return byKey[key]; });
  }

  function hasRakebackStoredEntryData(data) {
    if (!data) return false;
    if (data.rakeZero === true || data.explicitZeroRake === true || data.zeroRake === true) return true;
    if (data.accounted || data.reportedAt || data.reportId) return true;
    return parseReportNumber(data.rake) !== 0 ||
      parseReportNumber(data.percent) !== 0 ||
      parseReportNumber(data.roomAmount) !== 0 ||
      parseReportNumber(data.chipAmount) !== 0 ||
      parseReportNumber(data.amount) !== 0;
  }

  function getRakebackStoredRowMergeKey(data) {
    if (!data) return "";
    var room = normalizeRakebackRoom(data.room || "P21");
    var kind = data.kind === "addon" || data.isAddon ? "addon" : "base";
    var playerId = String(data.playerId || data.id || "").trim();
    var stamp = getFirstRakebackTimeValue([data.entryAddedAt, data.firstAddedAt, data.reportedAt, data.createdAt, data.addedAt, data.created], NaN);
    var dayKey = Number.isFinite(stamp) ? getRakebackMoscowDayKey(stamp) : "";
    return [
      room,
      kind,
      playerId,
      dayKey,
      String(Math.round(parseReportNumber(data.rake) * 100) / 100),
      String(Math.round(parseReportNumber(data.percent) * 100) / 100),
      data.discount15 || data.subtract15 ? "15" : "",
      data.groupId || "",
    ].join("|");
  }

  function getRakebackDeletedRowKey(data) {
    if (!data) return "";
    var room = normalizeRakebackRoom(data.room || "P21");
    var playerId = String(data.playerId || data.id || "").trim();
    return room && playerId ? room + "\u0000" + playerId : "";
  }

  function getRakebackDeletedStoredRowKey(data) {
    if (!data) return "";
    var groupId = String(data.groupId || "").trim();
    var kind = data.kind === "addon" || data.isAddon ? "addon" : "base";
    var room = normalizeRakebackRoom(data.room || "P21");
    var playerId = String(data.playerId || data.id || "").trim();
    if (!groupId || !room || !playerId) return "";
    return [
      groupId,
      kind,
      room,
      playerId,
      String(data.reportId || "").trim(),
      String(data.reportedAt || "").trim(),
    ].join("|");
  }

  function normalizeRakebackDeletedRows(items) {
    var seen = {};
    var out = [];
    if (!Array.isArray(items)) return out;
    items.forEach(function (item) {
      if (!item) return;
      var room = normalizeRakebackRoom(item.room || "P21");
      var playerId = String(item.playerId || item.id || "").trim();
      var groupId = String(item.groupId || "").trim();
      var kind = item.kind === "addon" || item.isAddon ? "addon" : "base";
      var key = getRakebackDeletedStoredRowKey({
        groupId: groupId,
        kind: kind,
        room: room,
        playerId: playerId,
        reportId: item.reportId || "",
        reportedAt: item.reportedAt || "",
      });
      if (!key || seen[key]) return;
      seen[key] = true;
      out.push({
        groupId: groupId,
        kind: kind,
        room: room,
        playerId: playerId,
        reportId: item.reportId || "",
        reportedAt: item.reportedAt || "",
        ownerId: item.ownerId || item.authorId || "",
        deletedAt: item.deletedAt || Date.now(),
        deletedBy: item.deletedBy || getCurrentRakebackOwnerId(),
      });
    });
    return out;
  }

  function isDeletedRakebackTemplateRow(data) {
    if (!data) return false;
    var kind = data.kind === "addon" || data.isAddon ? "addon" : "base";
    if (kind === "addon") return false;
    if (data.accounted || data.reportedAt || data.reportId) return false;
    if (data.rakeZero === true || data.explicitZeroRake === true || data.zeroRake === true) return false;
    if (parseReportNumber(data.rake) !== 0 ||
      parseReportNumber(data.roomAmount) !== 0 ||
      parseReportNumber(data.chipAmount) !== 0 ||
      parseReportNumber(data.amount) !== 0) {
      return false;
    }
    return data.carryForward === true || data.templateCarryForward === true || isRakebackTemplateLikeData(data);
  }

  function filterDeletedRakebackStoredRows(rows, deletedTemplates, deletedRows) {
    var deletedMap = {};
    normalizeRakebackDeletedTemplates(deletedTemplates).forEach(function (item) {
      var key = getRakebackDeletedRowKey(item);
      if (key) deletedMap[key] = true;
    });
    var deletedRowsMap = {};
    normalizeRakebackDeletedRows(deletedRows).forEach(function (item) {
      var key = getRakebackDeletedStoredRowKey(item);
      if (key) deletedRowsMap[key] = true;
    });
    return (Array.isArray(rows) ? rows : []).filter(function (row) {
      var storedKey = getRakebackDeletedStoredRowKey(row);
      if (storedKey && deletedRowsMap[storedKey]) return false;
      var key = getRakebackDeletedRowKey(row);
      return !key || !deletedMap[key] || !isDeletedRakebackTemplateRow(row);
    });
  }

  function isRakebackEmptyTemplateDuplicateRow(data) {
    if (!data) return false;
    var kind = data.kind === "addon" || data.isAddon ? "addon" : "base";
    if (kind === "addon") return false;
    if (data.accounted || data.reportedAt || data.reportId) return false;
    if (data.rakeZero === true || data.explicitZeroRake === true || data.zeroRake === true) return false;
    if ((data.carryForward === true || data.templateCarryForward === true) &&
      (parseReportNumber(data.percent) !== 0 || data.discount15 === true || data.subtract15 === true)) {
      return false;
    }
    return parseReportNumber(data.rake) === 0 &&
      parseReportNumber(data.roomAmount) === 0 &&
      parseReportNumber(data.chipAmount) === 0 &&
      parseReportNumber(data.amount) === 0;
  }

  function dedupeRakebackTemplateRows(rows) {
    var list = Array.isArray(rows) ? rows.filter(Boolean) : [];
    var groupHasAddon = {};
    list.forEach(function (row) {
      if (!row) return;
      var groupId = String(row.groupId || "").trim();
      if (!groupId) return;
      if (row.kind === "addon" || row.isAddon) groupHasAddon[groupId] = true;
    });
    var realByKey = {};
    list.forEach(function (row) {
      if (!row || isRakebackEmptyTemplateDuplicateRow(row)) return;
      var kind = row.kind === "addon" || row.isAddon ? "addon" : "base";
      if (kind === "addon") return;
      var key = getRakebackTemplateKey(row.room || "P21", row.playerId || row.id || "");
      if (key) realByKey[key] = true;
    });
    var templateSeen = {};
    return list.filter(function (row) {
      if (!row || !isRakebackEmptyTemplateDuplicateRow(row)) return !!row;
      var groupId = String(row.groupId || "").trim();
      if (groupId && groupHasAddon[groupId]) return true;
      var key = getRakebackTemplateKey(row.room || "P21", row.playerId || row.id || "");
      if (!key) return true;
      if (realByKey[key]) return false;
      if (templateSeen[key]) return false;
      templateSeen[key] = true;
      return true;
    });
  }

  function mergeRakebackDraftRows(serverRows, localRows) {
    var merged = dedupeRakebackTemplateRows(serverRows);
    var seen = {};
    merged.forEach(function (row) {
      var key = getRakebackStoredRowMergeKey(row);
      if (key) seen[key] = true;
    });
    (Array.isArray(localRows) ? localRows : []).forEach(function (row) {
      if (!row || !hasRakebackStoredEntryData(row)) return;
      if (row.carryForward === true || row.templateCarryForward === true) return;
      if (isRakebackTemplateLikeData(row)) return;
      var key = getRakebackStoredRowMergeKey(row);
      if (!key || seen[key]) return;
      seen[key] = true;
      merged.push(row);
    });
    return merged;
  }

  function createRakebackRow(data) {
    data = data || {};
    var tr = document.createElement("tr");
    var kind = data.kind === "addon" || data.isAddon ? "addon" : "base";
    var groupId = data.groupId || nextRakebackGroupId();
    var explicitZeroRake = data.rakeZero === true || data.explicitZeroRake === true || data.zeroRake === true;
    var templateCreatedAt = getRakebackTemplateCreatedAt(data.room || "P21", data.playerId || data.id || "");
    var createdAt = getFirstRakebackTimeValue([data.createdAt, data.addedAt, data.created], Date.now());
    var createdAtIsTemplate = isRakebackTemplateEntryStamp(data.room || "P21", data.playerId || data.id || "", createdAt);
    if (Number.isFinite(templateCreatedAt) && isRakebackTemplateLikeData(data)) {
      createdAt = Math.min(createdAt, templateCreatedAt);
      createdAtIsTemplate = true;
    }
    var standardAt = getFirstRakebackTimeValue([data.standardAt, data.orderAt, data.sortAt], createdAt);
    var templateLikeData = isRakebackTemplateLikeData(data);
    var accountedData = !templateLikeData && (data.accounted || data.reportedAt || data.reportId);
    var hasInitialEntryData = !templateLikeData && (data.saved || accountedData || explicitZeroRake ||
      parseReportNumber(data.rake) !== 0 || parseReportNumber(data.roomAmount) !== 0 ||
      parseReportNumber(data.chipAmount) !== 0 || parseReportNumber(data.amount) !== 0);
    var entryAddedAt = getFirstRakebackTimeValue([data.entryAddedAt, data.firstAddedAt], NaN);
    var reportedAt = parseRakebackTimeValue(data.reportedAt);
    if (Number.isFinite(reportedAt) && (!Number.isFinite(entryAddedAt) || reportedAt < entryAddedAt)) {
      entryAddedAt = reportedAt;
    }
    if (hasInitialEntryData && !data.accounted && !data.reportedAt && !data.reportId && isRakebackTemplateEntryStamp(data.room || "P21", data.playerId || data.id || "", entryAddedAt)) {
      entryAddedAt = Date.now();
      rakebackDraftNeedsMigration = true;
    }
    if (hasInitialEntryData && !createdAtIsTemplate && Number.isFinite(createdAt) && (!Number.isFinite(entryAddedAt) || createdAt < entryAddedAt)) {
      entryAddedAt = createdAt;
    }
    if (!Number.isFinite(entryAddedAt) && hasInitialEntryData) {
      entryAddedAt = getFirstRakebackTimeValue([data.addedAt, data.reportedAt], createdAtIsTemplate ? Date.now() : createdAt);
    }
    if ((data.carryForward === true || data.templateCarryForward === true) &&
      !explicitZeroRake &&
      !accountedData &&
      parseReportNumber(data.rake) === 0 &&
      parseReportNumber(data.roomAmount) === 0 &&
      parseReportNumber(data.chipAmount) === 0 &&
      parseReportNumber(data.amount) === 0) {
      entryAddedAt = NaN;
    }
    if (templateLikeData) entryAddedAt = NaN;
    tr.className = "admin-report-rakeback-row" + (kind === "addon" ? " admin-report-rakeback-row--addon" : "");
    tr.setAttribute("data-rakeback-row", "");
    tr.setAttribute("data-rakeback-kind", kind);
    tr.setAttribute("data-rakeback-group", groupId);
    tr.setAttribute("data-rakeback-owner", data.ownerId || data.authorId || getCurrentRakebackOwnerId());
    tr.setAttribute("data-rakeback-created-at", String(createdAt));
    tr.setAttribute("data-rakeback-standard-at", String(standardAt));
    if (explicitZeroRake) tr.setAttribute("data-rakeback-explicit-zero-rake", "1");
    if (data.carryForward === true || data.templateCarryForward === true) tr.setAttribute("data-rakeback-carry-forward", "1");
    if (Number.isFinite(entryAddedAt)) tr.setAttribute("data-rakeback-entry-added-at", String(entryAddedAt));
    if (accountedData) {
      tr.setAttribute("data-rakeback-accounted", "1");
      if (data.reportedAt) tr.setAttribute("data-rakeback-reported-at", String(data.reportedAt));
      if (data.reportId) tr.setAttribute("data-rakeback-report-id", String(data.reportId));
      var reportedAmount = parseReportNumber(data.reportedAmount != null ? data.reportedAmount : data.amount);
      tr.setAttribute("data-rakeback-reported-amount", String(reportedAmount));
    }
    tr.innerHTML =
      '<td><select class="admin-report-rakeback-select" data-rakeback-room>' + getRakebackRoomOptions(data.room || "P21") + "</select></td>" +
      '<td class="admin-report-rakeback-id-cell"><span class="admin-report-rakeback-row-number" data-rakeback-row-number aria-label="Номер строки"></span><input type="text" class="admin-report-rakeback-input admin-report-rakeback-input--id" data-rakeback-player-id enterkeyhint="next" autocomplete="off" /></td>' +
      '<td>' +
        (kind === "addon"
          ? '<div class="admin-report-rakeback-rake-with-rest"><input type="number" inputmode="decimal" class="admin-report-rakeback-input" data-rakeback-rake enterkeyhint="next" /><span class="admin-report-rakeback-rest" data-rakeback-rest title="Остаток"></span></div>'
          : '<input type="number" inputmode="decimal" class="admin-report-rakeback-input" data-rakeback-rake enterkeyhint="next" />') +
      '</td>' +
      '<td><input type="number" inputmode="decimal" class="admin-report-rakeback-input" data-rakeback-percent enterkeyhint="next" /></td>' +
      '<td class="admin-report-rakeback-discount-cell"><label class="admin-report-rakeback-discount-control" title="Отнять 15%"><input type="checkbox" class="admin-report-rakeback-discount" data-rakeback-discount15 aria-label="Отнять 15%" /><span class="admin-report-rakeback-discount-box" aria-hidden="true"></span></label></td>' +
      '<td><span class="admin-report-rakeback-amount" data-rakeback-amount></span></td>' +
      '<td class="admin-report-rakeback-actions">' +
        '<button type="button" class="admin-report-rakeback-icon-btn admin-report-rakeback-icon-btn--save" data-rakeback-save title="Сохранить строку" aria-label="Сохранить строку">✓</button>' +
        '<button type="button" class="admin-report-rakeback-icon-btn admin-report-rakeback-icon-btn--edit" data-rakeback-edit title="Редактировать строку" aria-label="Редактировать строку" hidden>✎</button>' +
        '<button type="button" class="admin-report-rakeback-icon-btn admin-report-rakeback-icon-btn--add" data-rakeback-add-addon title="Добавить подзапись" aria-label="Добавить подзапись">+</button>' +
        '<button type="button" class="admin-report-rakeback-icon-btn admin-report-rakeback-icon-btn--delete" data-rakeback-remove title="Удалить строку" aria-label="Удалить строку">×</button>' +
        '<button type="button" class="admin-report-rakeback-icon-btn admin-report-rakeback-icon-btn--color" data-rakeback-color-toggle title="Выделить цветом" aria-label="Выделить цветом"><span class="admin-report-rakeback-color-dot" aria-hidden="true"></span></button>' +
        '<div class="admin-report-rakeback-color-menu" data-rakeback-color-menu hidden>' + getRakebackRowColorButtons(data.color || data.rowColor || data.highlightColor || "") + "</div>" +
      "</td>";
    var idInput = tr.querySelector("[data-rakeback-player-id]");
    var rakeInput = tr.querySelector("[data-rakeback-rake]");
    var percentInput = tr.querySelector("[data-rakeback-percent]");
    var discountInput = tr.querySelector("[data-rakeback-discount15]");
    if (idInput) idInput.value = data.playerId != null ? String(data.playerId) : "";
    if (rakeInput) rakeInput.value = data.rake != null && data.rake !== "" ? (explicitZeroRake && parseReportNumber(data.rake) === 0 ? "0" : formatReportInputNumber(data.rake)) : "";
    if (percentInput) percentInput.value = data.percent != null && data.percent !== "" ? formatReportInputNumber(data.percent) : "";
    if (discountInput) discountInput.checked = !!(data.discount15 || data.subtract15);
    if (kind === "addon") {
      var roomSelect = tr.querySelector("[data-rakeback-room]");
      if (roomSelect) roomSelect.disabled = true;
      if (idInput) idInput.readOnly = true;
    }
    syncRakebackRowLookupAttrs(tr);
    applyRakebackRowColor(tr, data.color || data.rowColor || data.highlightColor || "");
    setRakebackRowSaved(tr, data.editing === true && !accountedData ? false : true);
    return tr;
  }

  function getRakebackRowRoom(row) {
    if (!row) return "P21";
    var roomSelect = row.querySelector("[data-rakeback-room]");
    return normalizeRakebackRoom(roomSelect && roomSelect.value ? roomSelect.value : row.getAttribute("data-rakeback-room") || "P21");
  }

  function syncRakebackRowLookupAttrs(row) {
    if (!row) return;
    var roomSelect = row.querySelector("[data-rakeback-room]");
    var idInput = row.querySelector("[data-rakeback-player-id]");
    row.setAttribute("data-rakeback-room-current", normalizeRakebackRoom(roomSelect && roomSelect.value ? roomSelect.value : row.getAttribute("data-rakeback-room") || "P21"));
    row.setAttribute("data-rakeback-player-id-current", idInput && idInput.value ? String(idInput.value).trim().toLowerCase() : "");
  }

  function getRakebackRowRoomFast(row) {
    return normalizeRakebackRoom(row && row.getAttribute("data-rakeback-room-current") || getRakebackRowRoom(row));
  }

  function getRakebackRowPlayerIdFast(row) {
    if (!row) return "";
    var cached = row.getAttribute("data-rakeback-player-id-current");
    return cached != null ? cached : getRakebackRowPlayerId(row);
  }

  function getRakebackSearchQuery() {
    return rakebackSearchInput && rakebackSearchInput.value ? String(rakebackSearchInput.value).trim().toLowerCase() : "";
  }

  function getRakebackRowPlayerId(row) {
    var idInput = row ? row.querySelector("[data-rakeback-player-id]") : null;
    return idInput && idInput.value ? String(idInput.value).trim().toLowerCase() : "";
  }

  function getRakebackSortMode() {
    return normalizeRakebackSortMode(rakebackSortSelect && rakebackSortSelect.value ? String(rakebackSortSelect.value) : DEFAULT_RAKEBACK_SORT_MODE);
  }

  function normalizeRakebackSortMode(mode) {
    mode = String(mode || DEFAULT_RAKEBACK_SORT_MODE);
    return /^(standard|created|created_percent|color|rake|percent)$/.test(mode) ? mode : DEFAULT_RAKEBACK_SORT_MODE;
  }

  function getRakebackSortStorageKey() {
    return "poker_admin_report_rakeback_sort_mode:" + (getCurrentRakebackOwnerId() || "local");
  }

  function readSavedRakebackSortMode() {
    try {
      if (!window.localStorage) return DEFAULT_RAKEBACK_SORT_MODE;
      var savedMode = normalizeRakebackSortMode(window.localStorage.getItem(getRakebackSortStorageKey()));
      return savedMode === "standard" ? DEFAULT_RAKEBACK_SORT_MODE : savedMode;
    } catch (e) {
      return DEFAULT_RAKEBACK_SORT_MODE;
    }
  }

  function saveRakebackSortMode(mode) {
    try {
      if (window.localStorage) window.localStorage.setItem(getRakebackSortStorageKey(), normalizeRakebackSortMode(mode));
    } catch (e) {}
  }

  function setRakebackSortMode(mode, saveLocal) {
    mode = normalizeRakebackSortMode(mode);
    if (rakebackSortSelect) rakebackSortSelect.value = mode;
    if (saveLocal) saveRakebackSortMode(mode);
  }

  function applySavedRakebackSortMode() {
    setRakebackSortMode(readSavedRakebackSortMode(), false);
  }

  function getRakebackRowCreatedAt(row, fallbackIndex) {
    var raw = row ? parseRakebackTimeValue(row.getAttribute("data-rakeback-created-at") || "") : NaN;
    if (!Number.isFinite(raw)) {
      raw = Date.now() + (Number(fallbackIndex) || 0);
      if (row) row.setAttribute("data-rakeback-created-at", String(raw));
    }
    return raw;
  }

  function getRakebackRowStandardAt(row, fallbackIndex) {
    var raw = row ? parseRakebackTimeValue(row.getAttribute("data-rakeback-standard-at") || "") : NaN;
    if (!Number.isFinite(raw)) {
      raw = getRakebackRowCreatedAt(row, fallbackIndex);
      if (row) row.setAttribute("data-rakeback-standard-at", String(raw));
    }
    return raw;
  }

  function getRakebackTopStandardAt(room) {
    if (!rakebackBody) return Date.now();
    var targetRoom = normalizeRakebackRoom(room || activeRakebackRoom || "P21");
    var values = Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]")).filter(function (row) {
      return row.getAttribute("data-rakeback-kind") !== "addon" && getRakebackRowRoom(row) === targetRoom;
    }).map(function (row, index) {
      return getRakebackRowStandardAt(row, index);
    }).filter(function (value) {
      return Number.isFinite(value);
    });
    return values.length ? Math.min.apply(Math, values) - 1 : Date.now();
  }

  function getRakebackRowEntryAddedAtForSave(row) {
    var raw = row ? parseRakebackTimeValue(row.getAttribute("data-rakeback-entry-added-at") || "") : NaN;
    return Number.isFinite(raw) ? raw : "";
  }

  function hasRakebackRowEntryTimeData(row) {
    if (!row) return false;
    if (isRakebackCarryForwardPlaceholderRow(row)) return false;
    if (Number.isFinite(parseRakebackTimeValue(row.getAttribute("data-rakeback-entry-added-at") || ""))) return true;
    return row.getAttribute("data-rakeback-saved") === "1" ||
      isRakebackRowAccounted(row);
  }

  function getRakebackRowBoundEntryAddedAt(row, fallbackIndex) {
    if (!hasRakebackRowEntryTimeData(row)) return NaN;
    return getRakebackRowEntryAddedAt(row, fallbackIndex);
  }

  function setRakebackGroupEntryAddedAt(row, stamp) {
    if (!row || !Number.isFinite(stamp)) return;
    getRakebackGroupRows(row).forEach(function (groupRow) {
      var existing = parseRakebackTimeValue(groupRow.getAttribute("data-rakeback-entry-added-at") || "");
      if (!Number.isFinite(existing)) groupRow.setAttribute("data-rakeback-entry-added-at", String(stamp));
    });
  }

  function replaceRakebackGroupEntryAddedAt(row, stamp) {
    if (!row || !Number.isFinite(stamp)) return;
    getRakebackGroupRows(row).forEach(function (groupRow) {
      groupRow.setAttribute("data-rakeback-entry-added-at", String(stamp));
    });
  }

  function ensureRakebackEntryAddedAt(row, force) {
    if (!row) return "";
    var raw = parseRakebackTimeValue(row.getAttribute("data-rakeback-entry-added-at") || "");
    if (Number.isFinite(raw) && hasRakebackRowEntryTimeData(row) && !isRakebackRowAccounted(row) && isRakebackTemplateEntryStamp(getRakebackRowRoom(row), getRakebackRowPlayerId(row), raw)) {
      raw = Date.now();
      replaceRakebackGroupEntryAddedAt(row, raw);
      return raw;
    }
    if (Number.isFinite(raw)) return raw;
    if (!force) return "";
    var stamp = Date.now();
    setRakebackGroupEntryAddedAt(row, stamp);
    return stamp;
  }

  function getRakebackRowEntryAddedAt(row, fallbackIndex) {
    var raw = row ? parseRakebackTimeValue(row.getAttribute("data-rakeback-entry-added-at") || "") : NaN;
    if (Number.isFinite(raw)) return raw;
    if (hasRakebackRowEntryTimeData(row)) {
      raw = getRakebackRowCreatedAt(row, fallbackIndex);
      setRakebackGroupEntryAddedAt(row, raw);
      return raw;
    }
    return getRakebackRowCreatedAt(row, fallbackIndex);
  }

  function syncExplicitZeroRakeMarker(target) {
    if (!target || !target.matches || !target.matches("[data-rakeback-rake]")) return;
    var row = target.closest ? target.closest("[data-rakeback-row]") : null;
    if (!row) return;
    var raw = target.value != null ? String(target.value).trim() : "";
    if (raw && parseReportNumber(raw) === 0) {
      row.setAttribute("data-rakeback-explicit-zero-rake", "1");
    } else if (!raw || parseReportNumber(raw) !== 0) {
      row.removeAttribute("data-rakeback-explicit-zero-rake");
    }
  }

  function getRakebackGroupKeyRow(rows) {
    rows = Array.isArray(rows) ? rows : [];
    return rows.find(function (row) {
      return row && row.getAttribute("data-rakeback-kind") !== "addon";
    }) || rows[0] || null;
  }

  function getRakebackGroupEntryAddedAt(group, fallbackIndex) {
    if (!group || !group.rows || !group.rows.length) return NaN;
    return group.rows.reduce(function (max, row, index) {
      var value = getRakebackRowBoundEntryAddedAt(row, index + (Number(fallbackIndex) || 0));
      return Number.isFinite(value) ? Math.max(max, value) : max;
    }, -Infinity);
  }

  function getRakebackWeekStart(ts) {
    ts = Number(ts);
    if (!Number.isFinite(ts)) return NaN;
    return weekStartMsForReport(ts);
  }

  function getCurrentRakebackWeekStart() {
    var week = getCalculationWeekMeta();
    return week && Number.isFinite(week.start) ? week.start : getRakebackWeekStart(Date.now());
  }

  function formatRakebackWeekRange(weekStart) {
    weekStart = Number(weekStart);
    if (!Number.isFinite(weekStart)) return "";
    return formatReportWeekBoundary(weekStart) + " - " + formatReportWeekBoundary(weekStart + REPORT_WEEK_MS - 1);
  }

  function isRakebackEntryArchivedByStamp(stamp) {
    var weekStart = Number.isFinite(stamp) ? getRakebackWeekStart(stamp) : NaN;
    var currentWeekStart = getCurrentRakebackWeekStart();
    return Number.isFinite(weekStart) && Number.isFinite(currentWeekStart) && weekStart < currentWeekStart;
  }

  function isRakebackRowInArchive(row, fallbackIndex) {
    if (isRakebackCarryForwardPlaceholderRow(row)) return false;
    var stamp = getRakebackRowBoundEntryAddedAt(row, fallbackIndex);
    return isRakebackEntryArchivedByStamp(stamp);
  }

  function isRakebackGroupInArchive(group, fallbackIndex) {
    if (isRakebackCarryForwardPlaceholderGroup(group)) return false;
    var stamp = getRakebackGroupEntryAddedAt(group, fallbackIndex);
    return isRakebackEntryArchivedByStamp(stamp);
  }

  function isRakebackCollectedRowArchived(row) {
    var stamp = parseRakebackTimeValue(row && row.entryAddedAt);
    return isRakebackEntryArchivedByStamp(stamp);
  }

  function getRakebackMoscowDayKey(ts) {
    ts = Number(ts);
    if (!Number.isFinite(ts)) ts = Date.now();
    var shifted = new Date(ts - 13 * 60 * 60 * 1000);
    return shifted.getUTCFullYear() + "-" + String(shifted.getUTCMonth() + 1).padStart(2, "0") + "-" + String(shifted.getUTCDate()).padStart(2, "0");
  }

  function getRakebackDateSeparatorLabel(ts) {
    var key = getRakebackMoscowDayKey(ts);
    var todayKey = getRakebackMoscowDayKey(Date.now());
    var yesterdayKey = getRakebackMoscowDayKey(Date.now() - 24 * 60 * 60 * 1000);
    var parts = key.split("-");
    var date = parts.length === 3 ? parts[2] + "." + parts[1] + "." + parts[0] : key;
    if (key === todayKey) return "Сегодня · " + date;
    if (key === yesterdayKey) return "Вчера · " + date;
    return date;
  }

  function removeRakebackDateSeparators() {
    if (!rakebackBody) return;
    Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-date-separator],[data-rakeback-week-separator],[data-rakeback-week-room-tabs]")).forEach(function (row) {
      row.parentNode.removeChild(row);
    });
    Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-week-hidden]")).forEach(function (row) {
      row.hidden = false;
      row.removeAttribute("data-rakeback-week-hidden");
    });
  }

  function getRakebackDateGroupTotals(groups, dayKey) {
    var totals = { rake: 0, rakeback: 0 };
    var latestRakeByGroup = {};
    (groups || []).forEach(function (group) {
      (group && group.rows ? group.rows : []).forEach(function (row, index) {
        if (!row || row.hidden) return;
        var rowStamp = getRakebackRowEntryAddedAt(row, index);
        if (!Number.isFinite(rowStamp) || getRakebackMoscowDayKey(rowStamp) !== dayKey) return;
        var room = getRakebackRowRoom(row);
        var roomAmount = Math.round(getRakebackRowAmount(row));
        addRakebackLatestGroupRake(latestRakeByGroup, row, index);
        totals.rakeback += getRakebackReportAmount(room, roomAmount);
      });
    });
    totals.rake = sumRakebackLatestGroupRake(latestRakeByGroup);
    return totals;
  }

  function getRakebackDateRowsTotals(rows, dayKey) {
    var totals = { rake: 0, rakeback: 0 };
    var latestRakeByGroup = {};
    (rows || []).forEach(function (row, index) {
      var rowStamp = getRakebackRowBoundEntryAddedAt(row, index);
      if (!Number.isFinite(rowStamp) || getRakebackMoscowDayKey(rowStamp) !== dayKey) return;
      var room = getRakebackRowRoom(row);
      var roomAmount = Math.round(getRakebackRowAmount(row));
      addRakebackLatestGroupRake(latestRakeByGroup, row, index);
      totals.rakeback += getRakebackReportAmount(room, roomAmount);
    });
    totals.rake = sumRakebackLatestGroupRake(latestRakeByGroup);
    return totals;
  }

  function getRakebackWeekGroupTotals(groups, weekStart) {
    var totals = { rake: 0, rakeback: 0 };
    var latestRakeByGroup = {};
    (groups || []).forEach(function (group) {
      (group && group.rows ? group.rows : []).forEach(function (row, index) {
        var rowStamp = getRakebackRowBoundEntryAddedAt(row, index);
        if (!Number.isFinite(rowStamp) || getRakebackWeekStart(rowStamp) !== weekStart) return;
        var room = getRakebackRowRoom(row);
        var roomAmount = Math.round(getRakebackRowAmount(row));
        addRakebackLatestGroupRake(latestRakeByGroup, row, index);
        totals.rakeback += getRakebackReportAmount(room, roomAmount);
      });
    });
    totals.rake = sumRakebackLatestGroupRake(latestRakeByGroup);
    return totals;
  }

  function getRakebackWeekRoomTotals(groups, weekStart) {
    var totals = {};
    var latestRakeByRoomGroup = {};
    RAKEBACK_ROOMS.forEach(function (room) {
      totals[room] = { rake: 0, rakeback: 0, count: 0 };
      latestRakeByRoomGroup[room] = {};
    });
    (groups || []).forEach(function (group) {
      (group && group.rows ? group.rows : []).forEach(function (row, index) {
        var rowStamp = getRakebackRowBoundEntryAddedAt(row, index);
        if (!Number.isFinite(rowStamp) || getRakebackWeekStart(rowStamp) !== weekStart) return;
        var room = normalizeRakebackRoom(getRakebackRowRoom(row));
        if (!totals[room]) totals[room] = { rake: 0, rakeback: 0, count: 0 };
        if (!latestRakeByRoomGroup[room]) latestRakeByRoomGroup[room] = {};
        var roomAmount = Math.round(getRakebackRowAmount(row));
        addRakebackLatestGroupRake(latestRakeByRoomGroup[room], row, index);
        totals[room].rakeback += getRakebackReportAmount(room, roomAmount);
        totals[room].count += 1;
      });
    });
    Object.keys(latestRakeByRoomGroup).forEach(function (room) {
      if (!totals[room]) totals[room] = { rake: 0, rakeback: 0, count: 0 };
      totals[room].rake = sumRakebackLatestGroupRake(latestRakeByRoomGroup[room]);
    });
    return totals;
  }

  function createRakebackDateSeparator(label, totals) {
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var span = document.createElement("span");
    var meta = document.createElement("small");
    tr.className = "admin-report-rakeback-date-separator";
    tr.setAttribute("data-rakeback-date-separator", "");
    td.colSpan = 7;
    span.textContent = label || "";
    totals = totals || { rake: 0, rakeback: 0 };
    meta.textContent = "Рейк " + formatReportRubleNumber(totals.rake) + " · РБ " + formatReportRubleNumber(totals.rakeback);
    td.appendChild(span);
    td.appendChild(meta);
    tr.appendChild(td);
    return tr;
  }

  function createRakebackTemplateSeparator() {
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var span = document.createElement("span");
    tr.className = "admin-report-rakeback-date-separator admin-report-rakeback-date-separator--templates";
    tr.setAttribute("data-rakeback-date-separator", "");
    td.colSpan = 7;
    span.textContent = "Пустые записи недели";
    td.appendChild(span);
    tr.appendChild(td);
    return tr;
  }

  function isRakebackCarryForwardPlaceholderRow(row) {
    if (!row || row.getAttribute("data-rakeback-carry-forward") !== "1") return false;
    if (isRakebackRowAccounted(row)) return false;
    if (row.getAttribute("data-rakeback-explicit-zero-rake") === "1") return false;
    var rakeInput = row.querySelector("[data-rakeback-rake]");
    var rake = parseReportNumber(rakeInput ? rakeInput.value : "");
    return rake === 0 && Math.round(getRakebackRowAmount(row)) === 0;
  }

  function shouldCopyRakebackIdInput(row, input) {
    if (!row || !input) return false;
    if (row.getAttribute("data-rakeback-saved") === "1") return true;
    if (input.readOnly) return true;
    return isRakebackCarryForwardPlaceholderRow(row);
  }

  function copyRakebackIdInput(input) {
    if (!input) return false;
    var row = input.closest("[data-rakeback-row]");
    var cell = input.closest("td");
    var id = input.value ? String(input.value).trim() : "";
    if (!row || !id || !shouldCopyRakebackIdInput(row, input)) return false;
    rakebackSuppressIdClickInput = input;
    rakebackSuppressIdClickAt = Date.now();
    copyReportText(id).then(function () {
      markRakebackCell(cell, true);
      showRakebackStatusBriefly("Скопировано");
    }).catch(function () {
      showRakebackAlert("Не удалось скопировать айди.");
    });
    return true;
  }

  function isRakebackCarryForwardPlaceholderGroup(group) {
    var keyRow = getRakebackGroupKeyRow(group && group.rows ? group.rows : []);
    return isRakebackCarryForwardPlaceholderRow(keyRow);
  }

  function isRakebackTodayPlaceholderGroup(group, fallbackIndex) {
    if (!isRakebackCarryForwardPlaceholderGroup(group)) return false;
    var stamp = getRakebackGroupEntryAddedAt(group, fallbackIndex);
    return Number.isFinite(stamp) && getRakebackMoscowDayKey(stamp) === getRakebackMoscowDayKey(Date.now());
  }

  function getRakebackLazyTemplateDomData(row) {
    if (!row || !isRakebackCarryForwardPlaceholderRow(row)) return null;
    var room = getRakebackRowRoom(row);
    var playerId = getRakebackRowPlayerId(row);
    if (!playerId) return null;
    var percentInput = row.querySelector("[data-rakeback-percent]");
    var discountInput = row.querySelector("[data-rakeback-discount15]");
    return normalizeRakebackLazyTemplateData({
      groupId: row.getAttribute("data-rakeback-group") || "",
      room: room,
      playerId: playerId,
      percent: percentInput && percentInput.value ? percentInput.value : "",
      carryForward: true,
      discount15: !!(discountInput && discountInput.checked),
      ownerId: row.getAttribute("data-rakeback-owner") || "",
      color: row.getAttribute("data-rakeback-row-color") || "",
      createdAt: row.getAttribute("data-rakeback-created-at") || "",
      standardAt: row.getAttribute("data-rakeback-standard-at") || "",
      entryAddedAt: row.getAttribute("data-rakeback-entry-added-at") || "",
    });
  }

  function dehydrateRakebackLazyTemplateRows(options) {
    if (!rakebackBody) return false;
    return false;
  }

  function hydrateRakebackLazyTemplateRowsForSearch() {
    if (!rakebackBody) return false;
    var query = getRakebackSearchQuery();
    if (!query) return false;
    var deletedTemplates = getRakebackDeletedTemplateMap();
    var existing = {};
    getRakebackAllDataRows().forEach(function (row) {
      var key = getRakebackTemplateKey(getRakebackRowRoom(row), getRakebackRowPlayerId(row));
      if (key) existing[key] = true;
    });
    var remaining = [];
    var hydrated = false;
    rakebackLazyTemplateRows.forEach(function (row) {
      var data = normalizeRakebackLazyTemplateData(row);
      var key = data ? getRakebackTemplateKey(data.room, data.playerId) : "";
      if (!data || !key || (deletedTemplates[key] && !isRakebackTemplateId(data.room, data.playerId))) return;
      if (data.room !== activeRakebackRoom || existing[key] || String(data.playerId).toLowerCase().indexOf(query) === -1) {
        remaining.push(data);
        return;
      }
      rakebackBody.appendChild(createRakebackRow(data));
      existing[key] = true;
      hydrated = true;
    });
    rakebackLazyTemplateRows = remaining;
    return hydrated;
  }

  function ensureRakebackSearchTemplateRows() {
    if (!rakebackBody || rakebackArchiveMode) return false;
    var query = getRakebackSearchQuery();
    if (!query) return false;
    var targetRoom = normalizeRakebackRoom(activeRakebackRoom || "P21");
    var ids = getRakebackTemplateIdsForCurrentWeek(targetRoom, getRakebackTemplateIdsForRoom(targetRoom));
    var existing = {};
    rakebackLazyTemplateRows.forEach(function (row) {
      var data = normalizeRakebackLazyTemplateData(row);
      var key = data ? getRakebackTemplateKey(data.room, data.playerId) : "";
      if (key) existing[key] = true;
    });
    getRakebackAllDataRows().forEach(function (row) {
      var key = getRakebackTemplateKey(getRakebackRowRoom(row), getRakebackRowPlayerId(row));
      if (key) existing[key] = true;
    });
    var added = false;
    ids.forEach(function (playerId) {
      playerId = String(playerId || "").trim();
      var key = getRakebackTemplateKey(targetRoom, playerId);
      if (!playerId || existing[key] || playerId.toLowerCase().indexOf(query) === -1) return;
      rakebackBody.appendChild(createRakebackRow({
        kind: "base",
        room: targetRoom,
        playerId: playerId,
        carryForward: true,
        templateCarryForward: true,
        createdAt: Date.now(),
        entryAddedAt: Date.now(),
      }));
      existing[key] = true;
      added = true;
    });
    return added;
  }

  function createRakebackWeekSeparator(weekStart, totals, open) {
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var button = document.createElement("button");
    var label = document.createElement("span");
    var meta = document.createElement("small");
    var key = String(weekStart);
    tr.className = "admin-report-rakeback-week-separator";
    tr.setAttribute("data-rakeback-week-separator", "");
    td.colSpan = 7;
    button.type = "button";
    button.className = "admin-report-rakeback-week-separator__button";
    button.setAttribute("data-rakeback-week-toggle", key);
    button.setAttribute("aria-expanded", open ? "true" : "false");
    label.textContent = formatRakebackWeekRange(weekStart);
    totals = totals || { rake: 0, rakeback: 0 };
    meta.textContent = "Рейк " + formatReportRubleNumber(totals.rake) + " · РБ " + formatReportRubleNumber(totals.rakeback);
    button.appendChild(label);
    button.appendChild(meta);
    td.appendChild(button);
    tr.appendChild(td);
    return tr;
  }

  function createRakebackWeekRoomTabs(weekStart, roomTotals) {
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var wrap = document.createElement("div");
    var weekKey = String(weekStart);
    tr.className = "admin-report-rakeback-week-room-tabs";
    tr.setAttribute("data-rakeback-week-room-tabs", "");
    td.colSpan = 7;
    wrap.className = "admin-report-rakeback-week-room-tabs__grid";
    RAKEBACK_ROOMS.forEach(function (room) {
      var key = weekKey + "|" + room;
      var open = rakebackWeekRoomArchiveOpen[key] !== false;
      var totals = roomTotals && roomTotals[room] ? roomTotals[room] : { rake: 0, rakeback: 0, count: 0 };
      var button = document.createElement("button");
      var label = document.createElement("span");
      var meta = document.createElement("small");
      button.type = "button";
      button.className = "admin-report-rakeback-week-room-tabs__button";
      button.setAttribute("data-rakeback-week-room-toggle", key);
      button.setAttribute("aria-expanded", open ? "true" : "false");
      button.classList.toggle("admin-report-rakeback-week-room-tabs__button--empty", !totals.count);
      label.textContent = getRakebackRoomLabel(room);
      meta.textContent = "Рейк " + formatReportRubleNumber(totals.rake) + " · РБ " + formatReportRubleNumber(totals.rakeback);
      button.appendChild(label);
      button.appendChild(meta);
      wrap.appendChild(button);
    });
    td.appendChild(wrap);
    tr.appendChild(td);
    return tr;
  }

  function createRakebackWeekTotalRow(totals) {
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var row = document.createElement("div");
    var label = document.createElement("span");
    var value = document.createElement("span");
    tr.className = "admin-report-rakeback-week-total";
    tr.setAttribute("data-rakeback-week-room-tabs", "");
    td.colSpan = 7;
    row.className = "admin-report-rakeback-week-total__row";
    label.className = "admin-report-rakeback-week-total__label";
    value.className = "admin-report-rakeback-week-total__value";
    label.textContent = "Итого по всем румам";
    value.textContent = formatReportRubleNumber(totals && totals.rakeback);
    row.appendChild(label);
    row.appendChild(value);
    td.appendChild(row);
    tr.appendChild(td);
    return tr;
  }

  function insertRakebackDateSeparators() {
    var mode = getRakebackSortMode();
    if (!rakebackBody || (!rakebackArchiveMode && mode !== "created" && mode !== "created_percent" && mode !== "standard")) return;
    var dayGroups = {};
    var weekGroups = {};
    var currentWeekStart = getCurrentRakebackWeekStart();
    var visibleGroups = getRakebackVisibleGroups();
    visibleGroups.forEach(function (group, index) {
      if (!group || !group.rows || !group.rows.length) return;
      if (!rakebackArchiveMode && isRakebackCarryForwardPlaceholderGroup(group) && !isRakebackTodayPlaceholderGroup(group, index)) return;
      var stamp = getRakebackGroupEntryAddedAt(group, index);
      if (!Number.isFinite(stamp)) return;
      var weekStart = getRakebackWeekStart(stamp);
      if (Number.isFinite(weekStart) && Number.isFinite(currentWeekStart) && weekStart < currentWeekStart) {
        if (!weekGroups[String(weekStart)]) weekGroups[String(weekStart)] = { weekStart: weekStart, groups: [] };
        weekGroups[String(weekStart)].groups.push(group);
        return;
      }
      var key = getRakebackMoscowDayKey(stamp);
      if (!dayGroups[key]) {
        dayGroups[key] = { stamp: stamp, groups: [] };
      }
      dayGroups[key].groups.push(group);
    });
    var lastKey = "";
    var lastWeekKey = "";
    var handledWeekKeys = {};
    var templateGroups = [];
    visibleGroups.forEach(function (group, index) {
      if (!group || !group.rows || !group.rows.length) return;
      if (!rakebackArchiveMode && isRakebackCarryForwardPlaceholderGroup(group) && !isRakebackTodayPlaceholderGroup(group, index)) {
        templateGroups.push(group);
        return;
      }
      var stamp = getRakebackGroupEntryAddedAt(group, index);
      if (!Number.isFinite(stamp)) return;
      var weekStart = getRakebackWeekStart(stamp);
      if (Number.isFinite(weekStart) && Number.isFinite(currentWeekStart) && weekStart < currentWeekStart) {
        var weekKey = String(weekStart);
        if (handledWeekKeys[weekKey]) return;
        handledWeekKeys[weekKey] = true;
        var open = rakebackWeekArchiveOpen[weekKey] === true;
        var weekSeparator = null;
        if (weekKey !== lastWeekKey) {
          lastWeekKey = weekKey;
          weekSeparator = createRakebackWeekSeparator(weekStart, getRakebackWeekGroupTotals(weekGroups[weekKey] ? weekGroups[weekKey].groups : [], weekStart), open);
          rakebackBody.insertBefore(weekSeparator, group.rows[0]);
        }
        var weekGroupsList = weekGroups[weekKey] ? weekGroups[weekKey].groups : [];
        if (!open) {
          weekGroupsList.forEach(function (weekGroup) {
            (weekGroup.rows || []).forEach(function (row) {
              row.hidden = true;
              row.setAttribute("data-rakeback-week-hidden", "1");
            });
          });
          return;
        }
        var marker = document.createComment("rakeback-week-details");
        rakebackBody.insertBefore(marker, weekSeparator ? weekSeparator.nextSibling : group.rows[0]);
        var fragment = document.createDocumentFragment();
        var weekTotals = getRakebackWeekGroupTotals(weekGroupsList, weekStart);
        fragment.appendChild(createRakebackWeekRoomTabs(weekStart, getRakebackWeekRoomTotals(weekGroupsList, weekStart)));
        fragment.appendChild(createRakebackWeekTotalRow(weekTotals));
        RAKEBACK_ROOMS.forEach(function (room) {
          var roomOpen = rakebackWeekRoomArchiveOpen[weekKey + "|" + room] !== false;
          var roomRows = [];
          weekGroupsList.forEach(function (weekGroup) {
            var keyRow = getRakebackGroupKeyRow(weekGroup.rows || []);
            if (normalizeRakebackRoom(getRakebackRowRoom(keyRow)) !== room) return;
            roomRows = roomRows.concat(weekGroup.rows || []);
          });
          var lastRoomDayKey = "";
          weekGroupsList.forEach(function (weekGroup) {
            var keyRow = getRakebackGroupKeyRow(weekGroup.rows || []);
            if (normalizeRakebackRoom(getRakebackRowRoom(keyRow)) !== room) return;
            (weekGroup.rows || []).forEach(function (row) {
              row.hidden = !roomOpen;
              if (!roomOpen) row.setAttribute("data-rakeback-week-hidden", "1");
              else row.removeAttribute("data-rakeback-week-hidden");
              if (roomOpen) {
                var rowStamp = getRakebackRowBoundEntryAddedAt(row, 0);
                var roomDayKey = Number.isFinite(rowStamp) ? getRakebackMoscowDayKey(rowStamp) : "";
                if (roomDayKey && roomDayKey !== lastRoomDayKey) {
                  lastRoomDayKey = roomDayKey;
                  fragment.appendChild(createRakebackDateSeparator(getRakebackDateSeparatorLabel(rowStamp), getRakebackDateRowsTotals(roomRows, roomDayKey)));
                }
              }
              fragment.appendChild(row);
            });
          });
        });
        rakebackBody.insertBefore(fragment, marker);
        if (marker.parentNode) marker.parentNode.removeChild(marker);
        return;
      }
      var key = getRakebackMoscowDayKey(stamp);
      if (key === lastKey) return;
      lastKey = key;
      rakebackBody.insertBefore(createRakebackDateSeparator(getRakebackDateSeparatorLabel(stamp), getRakebackDateGroupTotals(dayGroups[key] ? dayGroups[key].groups : [], key)), group.rows[0]);
    });
    if (templateGroups.length) {
      var templateFragment = document.createDocumentFragment();
      templateFragment.appendChild(createRakebackTemplateSeparator());
      templateGroups.forEach(function (group) {
        (group.rows || []).forEach(function (row) {
          templateFragment.appendChild(row);
        });
      });
      rakebackBody.appendChild(templateFragment);
    }
  }

  function getRakebackRowSortColor(row) {
    var color = normalizeRakebackRowColor(row ? row.getAttribute("data-rakeback-row-color") || "" : "");
    if (!color) return RAKEBACK_ROW_COLORS.length + 1;
    for (var i = 0; i < RAKEBACK_ROW_COLORS.length; i++) {
      if (RAKEBACK_ROW_COLORS[i].value === color) return i;
    }
    return RAKEBACK_ROW_COLORS.length + 1;
  }

  function sortRakebackRows(rows) {
    if (!rakebackBody || !rows || rows.length < 2) return rows || [];
    var mode = getRakebackSortMode();
    var groupMap = {};
    var groups = [];
    rows.forEach(function (row, index) {
      var groupId = row.getAttribute("data-rakeback-group") || ("__row_" + index);
      if (!groupMap[groupId]) {
        groupMap[groupId] = {
          rows: [],
          index: index,
          createdAt: getRakebackRowCreatedAt(row, index),
          standardAt: getRakebackRowStandardAt(row, index),
          entryAddedAt: getRakebackRowEntryAddedAt(row, index),
          hasEntryTime: hasRakebackRowEntryTimeData(row),
        };
        groups.push(groupMap[groupId]);
      }
      groupMap[groupId].rows.push(row);
      groupMap[groupId].createdAt = Math.min(groupMap[groupId].createdAt, getRakebackRowCreatedAt(row, index));
      groupMap[groupId].standardAt = Math.min(groupMap[groupId].standardAt, getRakebackRowStandardAt(row, index));
      groupMap[groupId].entryAddedAt = Math.max(groupMap[groupId].entryAddedAt, getRakebackRowEntryAddedAt(row, index));
      groupMap[groupId].hasEntryTime = groupMap[groupId].hasEntryTime || hasRakebackRowEntryTimeData(row);
    });
    groups.forEach(function (group, index) {
      group.keyRow = getRakebackGroupKeyRow(group.rows);
      group.createdAt = getRakebackRowCreatedAt(group.keyRow, index);
      group.entryAddedAt = getRakebackGroupEntryAddedAt(group, index);
    });
    groups.sort(function (a, b) {
      var diff = 0;
      if (mode === "color") {
        diff = getRakebackRowSortColor(a.keyRow) - getRakebackRowSortColor(b.keyRow);
        if (!diff) diff = a.standardAt - b.standardAt;
      } else if (mode === "rake") {
        diff = parseReportNumber((b.keyRow.querySelector("[data-rakeback-rake]") || {}).value) - parseReportNumber((a.keyRow.querySelector("[data-rakeback-rake]") || {}).value);
        if (!diff) diff = a.standardAt - b.standardAt;
      } else if (mode === "percent") {
        diff = parseReportNumber((b.keyRow.querySelector("[data-rakeback-percent]") || {}).value) - parseReportNumber((a.keyRow.querySelector("[data-rakeback-percent]") || {}).value);
        if (!diff) diff = a.standardAt - b.standardAt;
      } else if (mode === "standard") {
        diff = a.standardAt - b.standardAt;
      } else if (mode === "created_percent") {
        var aDayKey = getRakebackMoscowDayKey(a.entryAddedAt);
        var bDayKey = getRakebackMoscowDayKey(b.entryAddedAt);
        diff = bDayKey.localeCompare(aDayKey);
        if (!diff) diff = parseReportNumber((b.keyRow.querySelector("[data-rakeback-percent]") || {}).value) - parseReportNumber((a.keyRow.querySelector("[data-rakeback-percent]") || {}).value);
        if (!diff) diff = b.entryAddedAt - a.entryAddedAt;
        if (!diff) diff = a.standardAt - b.standardAt;
      } else if (mode === "created") {
        diff = b.entryAddedAt - a.entryAddedAt;
        if (!diff) diff = a.standardAt - b.standardAt;
      } else {
        diff = a.createdAt - b.createdAt;
      }
      return diff || (a.index - b.index);
    });
    var sortedRows = [];
    groups.forEach(function (group) {
      group.rows.forEach(function (row) {
        rakebackBody.appendChild(row);
        sortedRows.push(row);
      });
    });
    return sortedRows;
  }

  function getRakebackDomRows() {
    return rakebackBody ? Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]")) : [];
  }

  function ensureRakebackSearchOrder(rows) {
    var maxOrder = -1;
    (rows || []).forEach(function (row) {
      var order = Number(row && row.getAttribute("data-rakeback-search-order"));
      if (Number.isFinite(order)) maxOrder = Math.max(maxOrder, order);
    });
    (rows || []).forEach(function (row) {
      if (!row || row.getAttribute("data-rakeback-search-order") !== null) return;
      maxOrder += 1;
      row.setAttribute("data-rakeback-search-order", String(maxOrder));
    });
  }

  function getRakebackAllDataRows() {
    var rows = getRakebackDomRows();
    (rakebackSearchDetachedRows || []).forEach(function (row) {
      if (row && rows.indexOf(row) === -1) rows.push(row);
    });
    (rakebackSuspendedRows || []).forEach(function (row) {
      if (row && rows.indexOf(row) === -1) rows.push(row);
    });
    ensureRakebackSearchOrder(rows);
    return rows.sort(function (a, b) {
      return Number(a.getAttribute("data-rakeback-search-order")) - Number(b.getAttribute("data-rakeback-search-order"));
    });
  }

  function getRakebackGroupsFromRows(rows) {
    var groups = [];
    var byGroup = {};
    (rows || []).forEach(function (row, index) {
      var groupId = row.getAttribute("data-rakeback-group") || ("__row_" + index);
      if (!byGroup[groupId]) {
        byGroup[groupId] = { groupId: groupId, rows: [], index: index };
        groups.push(byGroup[groupId]);
      }
      byGroup[groupId].rows.push(row);
    });
    return groups;
  }

  function restoreRakebackSearchDetachedRows() {
    if (!rakebackBody || !rakebackSearchDetachedRows.length) return;
    var rows = getRakebackAllDataRows();
    var fragment = document.createDocumentFragment();
    rows.forEach(function (row) {
      row.hidden = false;
      fragment.appendChild(row);
    });
    rakebackBody.appendChild(fragment);
    rakebackSearchDetachedRows = [];
  }

  function ensureRakebackVisibleAddonBaseRows() {
    if (!rakebackBody) return;
    var allRows = getRakebackAllDataRows();
    var baseByGroup = {};
    allRows.forEach(function (row) {
      if (!row || row.getAttribute("data-rakeback-kind") === "addon") return;
      var groupId = row.getAttribute("data-rakeback-group") || "";
      if (groupId && !baseByGroup[groupId]) baseByGroup[groupId] = row;
    });
    getRakebackDomRows().forEach(function (row) {
      if (!row || row.hidden || row.getAttribute("data-rakeback-kind") !== "addon") return;
      var groupId = row.getAttribute("data-rakeback-group") || "";
      var base = groupId ? baseByGroup[groupId] : null;
      if (!base || base === row) return;
      base.hidden = false;
      syncRakebackRowLookupAttrs(base);
      var rowBeforeBase = base.parentNode === rakebackBody &&
        typeof base.compareDocumentPosition === "function" &&
        typeof Node !== "undefined" &&
        (base.compareDocumentPosition(row) & Node.DOCUMENT_POSITION_PRECEDING);
      if (base.parentNode !== rakebackBody || rowBeforeBase) {
        rakebackBody.insertBefore(base, row);
      }
    });
  }

  function suspendRakebackDomRows() {
    if (!rakebackBody) return;
    restoreRakebackSearchDetachedRows();
    removeRakebackGeneratedRows();
    var rows = getRakebackDomRows();
    if (!rows.length) return;
    ensureRakebackSearchOrder(rows);
    var fragment = document.createDocumentFragment();
    rows.forEach(function (row) {
      fragment.appendChild(row);
    });
    rakebackSuspendedRows = rows;
  }

  function restoreRakebackSuspendedRows() {
    if (!rakebackBody || !rakebackSuspendedRows.length) return;
    var rows = rakebackSuspendedRows.slice().sort(function (a, b) {
      return Number(a.getAttribute("data-rakeback-search-order")) - Number(b.getAttribute("data-rakeback-search-order"));
    });
    var fragment = document.createDocumentFragment();
    rows.forEach(function (row) {
      fragment.appendChild(row);
    });
    rakebackBody.appendChild(fragment);
    rakebackSuspendedRows = [];
  }

  function getRakebackGroupRows(row) {
    if (!rakebackBody || !row) return [];
    var groupId = row.getAttribute("data-rakeback-group") || "";
    if (!groupId) return [row];
    var rows = [row];
    var prev = row.previousElementSibling;
    while (prev && prev.hasAttribute("data-rakeback-row") && prev.getAttribute("data-rakeback-group") === groupId) {
      rows.unshift(prev);
      prev = prev.previousElementSibling;
    }
    var next = row.nextElementSibling;
    while (next && next.hasAttribute("data-rakeback-row") && next.getAttribute("data-rakeback-group") === groupId) {
      rows.push(next);
      next = next.nextElementSibling;
    }
    return rows;
  }

  function getRakebackVisibleGroups() {
    if (!rakebackBody) return [];
    var groups = [];
    var byGroup = {};
    Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]")).forEach(function (row) {
      var groupId = row.getAttribute("data-rakeback-group") || "";
      if (!groupId) return;
      if (!byGroup[groupId]) {
        byGroup[groupId] = { groupId: groupId, rows: [], visible: false };
        groups.push(byGroup[groupId]);
      }
      byGroup[groupId].rows.push(row);
      if (!row.hidden) byGroup[groupId].visible = true;
    });
    return groups.filter(function (group) { return group.visible; });
  }

  function syncRakebackStandardOrder() {
    if (!rakebackBody) return;
    var base = Date.now();
    Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]")).forEach(function (row, index) {
      row.setAttribute("data-rakeback-standard-at", String(base + index));
    });
  }

  function moveRakebackGroupBefore(sourceRows, targetGroup, afterTarget) {
    if (!rakebackBody || !sourceRows || !sourceRows.length || !targetGroup || !targetGroup.rows || !targetGroup.rows.length) return false;
    if (sourceRows.indexOf(targetGroup.rows[0]) !== -1) return false;
    var fragment = document.createDocumentFragment();
    sourceRows.forEach(function (row) { fragment.appendChild(row); });
    var anchor = afterTarget ? targetGroup.rows[targetGroup.rows.length - 1].nextSibling : targetGroup.rows[0];
    rakebackBody.insertBefore(fragment, anchor);
    syncRakebackStandardOrder();
    return true;
  }

  function beginRakebackRowDrag(row, pointerId, clientY) {
    if (!row || !rakebackBody || !canEditRakebackRow(row)) return;
    if (rakebackSortSelect && rakebackSortSelect.value !== "standard") setRakebackSortMode("standard", true);
    if (document.activeElement && row.contains(document.activeElement) && typeof document.activeElement.blur === "function") {
      try { document.activeElement.blur(); } catch (errBlur) {}
    }
    var groupRows = getRakebackGroupRows(row);
    rakebackDragState = {
      active: true,
      pointerId: pointerId,
      startY: clientY,
      currentY: clientY,
      groupRows: groupRows,
      moved: false,
    };
    groupRows.forEach(function (groupRow) {
      groupRow.classList.add("admin-report-rakeback-row--dragging");
    });
    document.body.classList.add("admin-report-rakeback-drag-active");
    showRakebackStatus("Перенос строки");
  }

  function finishRakebackRowDrag(saveChanges) {
    if (!rakebackDragState) return;
    var moved = rakebackDragState.moved;
    rakebackDragState.groupRows.forEach(function (row) {
      row.classList.remove("admin-report-rakeback-row--dragging");
    });
    document.body.classList.remove("admin-report-rakeback-drag-active");
    rakebackDragState = null;
    syncRakebackTable();
    if (saveChanges && moved) {
      markRakebackDraftLocalEdit();
      saveRakebackDraftRows();
      showRakebackStatusBriefly("Строка перенесена");
    } else {
      showRakebackStatus("");
    }
  }

  function updateRakebackRowDrag(clientY) {
    if (!rakebackDragState || !rakebackDragState.groupRows.length) return;
    rakebackDragState.currentY = clientY;
    var groups = getRakebackVisibleGroups();
    for (var i = 0; i < groups.length; i++) {
      var group = groups[i];
      if (rakebackDragState.groupRows.indexOf(group.rows[0]) !== -1) continue;
      var firstRect = group.rows[0].getBoundingClientRect();
      var lastRect = group.rows[group.rows.length - 1].getBoundingClientRect();
      var top = firstRect.top;
      var bottom = lastRect.bottom;
      if (clientY < top || clientY > bottom) continue;
      var after = clientY > (top + bottom) / 2;
      if (moveRakebackGroupBefore(rakebackDragState.groupRows, group, after)) {
        rakebackDragState.moved = true;
        syncRakebackRoomVisibility();
      }
      break;
    }
  }

  function cancelPendingRakebackDrag() {
    if (!rakebackDragState || rakebackDragState.active) return;
    if (rakebackDragState.timer) clearTimeout(rakebackDragState.timer);
    rakebackDragState = null;
  }

  function shouldStartRakebackDragFrom(target) {
    if (!target || !target.closest) return false;
    if (target.closest("[data-rakeback-color-menu],[data-rakeback-color-toggle],[data-rakeback-save],[data-rakeback-edit],[data-rakeback-add-addon],[data-rakeback-remove]")) return false;
    if (target.closest("select,textarea,input[type='checkbox']")) return false;
    return !!target.closest("[data-rakeback-row]");
  }

  function setRakebackRoomTab(room) {
    rakebackArchiveMode = false;
    activeRakebackRoom = normalizeRakebackRoom(room || activeRakebackRoom || "P21");
    if (rakebackRoomTabs && rakebackRoomTabs.length) {
      rakebackRoomTabs.forEach(function (tab) {
        var selected = normalizeRakebackRoom(tab.getAttribute("data-rakeback-room-tab")) === activeRakebackRoom;
        tab.classList.toggle("admin-report-rakeback-room-tab--active", selected);
        tab.setAttribute("aria-selected", selected ? "true" : "false");
      });
    }
    if (rakebackArchiveBtn) {
      rakebackArchiveBtn.classList.remove("admin-report-rakeback-archive-tab--active");
      rakebackArchiveBtn.setAttribute("aria-pressed", "false");
    }
    syncRakebackAddButtonAccess();
    if (getRakebackSearchQuery()) {
      scheduleRakebackSearchRefresh({ immediate: true });
      return;
    }
    refreshRakebackFilterView({ fastSummary: true, deferDecorations: true });
  }

  function setRakebackArchiveMode(active) {
    rakebackArchiveMode = !!active;
    if (rakebackRoomTabs && rakebackRoomTabs.length) {
      rakebackRoomTabs.forEach(function (tab) {
        tab.classList.remove("admin-report-rakeback-room-tab--active");
        tab.setAttribute("aria-selected", "false");
      });
    }
    if (rakebackArchiveBtn) {
      rakebackArchiveBtn.classList.toggle("admin-report-rakeback-archive-tab--active", rakebackArchiveMode);
      rakebackArchiveBtn.setAttribute("aria-pressed", rakebackArchiveMode ? "true" : "false");
    }
    syncRakebackAddButtonAccess();
    refreshRakebackVisibleView();
  }

  function syncRakebackRoomVisibility() {
    if (!rakebackBody) return;
    var searchQuery = getRakebackSearchQuery();
    var visibleIndex = 0;
    var groups = [];
    var byGroup = {};
    Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]")).forEach(function (row, index) {
      var groupId = row.getAttribute("data-rakeback-group") || ("__row_" + index);
      if (!byGroup[groupId]) {
        byGroup[groupId] = { groupId: groupId, rows: [], index: index };
        groups.push(byGroup[groupId]);
      }
      byGroup[groupId].rows.push(row);
    });
    groups.forEach(function (group, index) {
      var keyRow = getRakebackGroupKeyRow(group.rows);
      var matchesRoom = rakebackArchiveMode || getRakebackRowRoomFast(keyRow) === activeRakebackRoom;
      var matchesSearch = !searchQuery || group.rows.some(function (row) {
        return getRakebackRowPlayerIdFast(row).indexOf(searchQuery) !== -1;
      });
      var visible = false;
      if (matchesRoom && matchesSearch) {
        var archived = isRakebackGroupInArchive(group, index);
        visible = rakebackArchiveMode ? archived : !archived;
      }
      var hidden = !visible;
      group.rows.forEach(function (row) {
        if (row.hidden !== hidden) row.hidden = hidden;
      });
      group.rows.forEach(function (row) {
        var numberEl = row.querySelector("[data-rakeback-row-number]");
        if (numberEl) {
          var isAddon = row.getAttribute("data-rakeback-kind") === "addon";
          var nextNumber = visible && row === keyRow && !isAddon ? String(++visibleIndex) : "";
          if (numberEl.hidden !== isAddon) numberEl.hidden = isAddon;
          if (numberEl.textContent !== nextNumber) numberEl.textContent = nextNumber;
        }
      });
    });
  }

  function syncRakebackVisibleRowNumbers() {
    if (!rakebackBody) return;
    var visibleIndex = 0;
    Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]")).forEach(function (row) {
      var numberEl = row.querySelector("[data-rakeback-row-number]");
      if (!numberEl) return;
      var isAddon = row.getAttribute("data-rakeback-kind") === "addon";
      var nextNumber = !row.hidden && !isAddon ? String(++visibleIndex) : "";
      if (numberEl.hidden !== isAddon) numberEl.hidden = isAddon;
      if (numberEl.textContent !== nextNumber) numberEl.textContent = nextNumber;
    });
  }

  function scheduleRakebackTableSync(options) {
    var seq = ++rakebackDeferredSyncSeq;
    runAdminReportAfterPaint(function () {
      if (seq !== rakebackDeferredSyncSeq) return;
      syncRakebackTable(options || { skipSort: true });
    });
  }

  function removeRakebackGeneratedRows() {
    if (!rakebackBody) return;
    rakebackDecorationSeq += 1;
    if (rakebackDecorationTimer) {
      clearTimeout(rakebackDecorationTimer);
      rakebackDecorationTimer = null;
    }
    removeRakebackDateSeparators();
    Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-total-row]")).forEach(function (row) {
      row.parentNode.removeChild(row);
    });
  }

  function renderRakebackSummaryFromCache() {
    if (!rakebackRoomTotals) return false;
    var activeTotal = rakebackRoomTotals[activeRakebackRoom] || { display: 0, report: 0, rake: 0 };
    var total = 0;
    var rakeTotal = 0;
    RAKEBACK_ROOMS.forEach(function (room) {
      var item = rakebackRoomTotals[room] || { report: 0, rake: 0 };
      total += parseReportNumber(item.report);
      rakeTotal += parseReportNumber(item.rake);
    });
    if (rakebackSummaryEl) rakebackSummaryEl.hidden = rakebackArchiveMode;
    if (rakebackRoomTotalLabelEl) rakebackRoomTotalLabelEl.textContent = rakebackArchiveMode ? "Итого архив" : "Итого " + getRakebackRoomLabel(activeRakebackRoom);
    if (rakebackRoomTotalEl) rakebackRoomTotalEl.textContent = rakebackArchiveMode ? formatRakebackSummaryPair(rakeTotal, total) : formatRakebackSummaryPair(activeTotal.rake, activeTotal.report);
    if (rakebackTotalEl) rakebackTotalEl.textContent = formatRakebackSummaryPair(rakeTotal, total);
    showRakebackStatus("");
    return true;
  }

  function refreshRakebackVisibleView(options) {
    if (!rakebackBody) return 0;
    options = options || {};
    restoreRakebackSuspendedRows();
    restoreRakebackSearchDetachedRows();
    if (rakebackSearchRefreshTimer) {
      clearTimeout(rakebackSearchRefreshTimer);
      rakebackSearchRefreshTimer = null;
    }
    removeRakebackGeneratedRows();
    dehydrateRakebackLazyTemplateRows({ keepSearchMatches: true });
    ensureRakebackSearchTemplateRows();
    hydrateRakebackLazyTemplateRowsForSearch();
    ensureRakebackBaseRow(activeRakebackRoom);
    syncRakebackRoomVisibility();
    ensureRakebackVisibleAddonBaseRows();
    if (options.deferDecorations) scheduleRakebackDecorations();
    else insertRakebackDateSeparators();
    syncRakebackVisibleRowNumbers();
    if (options.fastSummary && renderRakebackSummaryFromCache()) return 0;
    return updateRakebackSummaryTotals();
  }

  function scheduleRakebackDecorations() {
    if (!rakebackBody) return;
    var seq = ++rakebackDecorationSeq;
    if (rakebackDecorationTimer) clearTimeout(rakebackDecorationTimer);
    rakebackDecorationTimer = setTimeout(function () {
      rakebackDecorationTimer = null;
      runAdminReportAfterPaint(function () {
        if (seq !== rakebackDecorationSeq) return;
        insertRakebackDateSeparators();
        syncRakebackVisibleRowNumbers();
      });
    }, 80);
  }

  function refreshRakebackFilterView(options) {
    if (!rakebackBody) return 0;
    options = options || {};
    restoreRakebackSuspendedRows();
    if (getRakebackSearchQuery()) {
      scheduleRakebackSearchRefresh({ immediate: true });
      if (options.fastSummary && renderRakebackSummaryFromCache()) return 0;
      return 0;
    }
    restoreRakebackSearchDetachedRows();
    if (rakebackSearchRefreshTimer) {
      clearTimeout(rakebackSearchRefreshTimer);
      rakebackSearchRefreshTimer = null;
    }
    removeRakebackGeneratedRows();
    syncRakebackRoomVisibility();
    ensureRakebackVisibleAddonBaseRows();
    if (options.deferDecorations) scheduleRakebackDecorations();
    else insertRakebackDateSeparators();
    syncRakebackVisibleRowNumbers();
    if (options.fastSummary && renderRakebackSummaryFromCache()) return 0;
    return updateRakebackSummaryTotals();
  }

  function applyRakebackSearchRefresh() {
    if (!rakebackBody) return;
    removeRakebackGeneratedRows();
    var query = getRakebackSearchQuery();
    if (query) {
      ensureRakebackSearchTemplateRows();
      hydrateRakebackLazyTemplateRowsForSearch();
      var rows = getRakebackAllDataRows();
      var groups = getRakebackGroupsFromRows(rows);
      var visibleFragment = document.createDocumentFragment();
      var detachedFragment = document.createDocumentFragment();
      var detachedRows = [];
      var visibleIndex = 0;
      groups.forEach(function (group, index) {
        var keyRow = getRakebackGroupKeyRow(group.rows);
        var matchesRoom = rakebackArchiveMode || getRakebackRowRoomFast(keyRow) === activeRakebackRoom;
        var matchesSearch = group.rows.some(function (row) {
          return getRakebackRowPlayerIdFast(row).indexOf(query) !== -1;
        });
        var visible = false;
        if (matchesRoom && matchesSearch) {
          var archived = isRakebackGroupInArchive(group, index);
          visible = rakebackArchiveMode ? archived : !archived;
        }
        group.rows.forEach(function (row) {
          if (!visible) {
            detachedRows.push(row);
            detachedFragment.appendChild(row);
            return;
          }
          row.hidden = false;
          var numberEl = row.querySelector("[data-rakeback-row-number]");
          if (numberEl) {
            var isAddon = row.getAttribute("data-rakeback-kind") === "addon";
            var nextNumber = row === keyRow && !isAddon ? String(++visibleIndex) : "";
            if (numberEl.hidden !== isAddon) numberEl.hidden = isAddon;
            if (numberEl.textContent !== nextNumber) numberEl.textContent = nextNumber;
          }
          visibleFragment.appendChild(row);
        });
      });
      rakebackBody.appendChild(visibleFragment);
      rakebackSearchDetachedRows = detachedRows;
      ensureRakebackVisibleAddonBaseRows();
    } else {
      restoreRakebackSearchDetachedRows();
      dehydrateRakebackLazyTemplateRows();
      ensureRakebackBaseRow(activeRakebackRoom);
      syncRakebackRoomVisibility();
      ensureRakebackVisibleAddonBaseRows();
      insertRakebackDateSeparators();
      syncRakebackVisibleRowNumbers();
    }
    renderRakebackSummaryFromCache();
  }

  function scheduleRakebackSearchRefresh(options) {
    if (!rakebackBody) return;
    options = options || {};
    if (rakebackSearchRefreshTimer) {
      clearTimeout(rakebackSearchRefreshTimer);
      rakebackSearchRefreshTimer = null;
    }
    var delay = options.immediate ? 0 : 220;
    rakebackSearchRefreshTimer = setTimeout(function () {
      rakebackSearchRefreshTimer = null;
      runAdminReportAfterPaint(applyRakebackSearchRefresh);
    }, delay);
  }

  function showRakebackStatus(message) {
    if (!rakebackStatusEl) return;
    if (rakebackStatusClearTimer) {
      clearTimeout(rakebackStatusClearTimer);
      rakebackStatusClearTimer = null;
    }
    rakebackStatusEl.textContent = message || "";
    rakebackStatusEl.hidden = !message;
  }

  function showRakebackStatusBriefly(message) {
    showRakebackStatus(message);
    rakebackStatusClearTimer = setTimeout(function () {
      rakebackStatusClearTimer = null;
      if (rakebackStatusEl && rakebackStatusEl.textContent === message) showRakebackStatus("");
    }, 1000);
  }

  function markRakebackDraftLocalEdit() {
    rakebackDraftLocalEditUntil = Date.now() + 8000;
  }

  function showRakebackAlert(message) {
    var text = message || "";
    var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    if (tg && tg.showAlert) tg.showAlert(text);
    showRakebackStatus(text);
  }

  function setRakebackRowSaved(row, saved) {
    if (!row) return;
    var isAddon = row.getAttribute("data-rakeback-kind") === "addon";
    var lockPlayerId = isAddon || isRakebackCarryForwardPlaceholderRow(row);
    var canEditRow = canEditRakebackRow(row);
    row.classList.toggle("admin-report-rakeback-row--saved", !!saved);
    row.setAttribute("data-rakeback-saved", saved ? "1" : "0");
    row.querySelectorAll("input").forEach(function (input) {
      if (input.hasAttribute("data-rakeback-discount15")) {
        input.disabled = !canEditRow || !!saved;
        return;
      }
      input.readOnly = !canEditRow || !!saved || (lockPlayerId && input.hasAttribute("data-rakeback-player-id"));
    });
    row.querySelectorAll("select").forEach(function (select) {
      select.disabled = !canEditRow || !!saved || isAddon;
    });
    updateRakebackRowActions(row);
  }

  function getRakebackTemplateIdsFromPreviousWeek(room) {
    var defaults = getRakebackTemplateDefaultsFromPreviousWeek(room);
    return Object.keys(defaults);
  }

  function getRakebackTemplateDefaultsFromPreviousWeek(room) {
    if (!rakebackBody) return {};
    var normalizedRoom = normalizeRakebackRoom(room);
    var currentWeekStart = getCurrentRakebackWeekStart();
    var previousWeekStart = Number.isFinite(currentWeekStart) ? currentWeekStart - REPORT_WEEK_MS : NaN;
    if (!Number.isFinite(previousWeekStart)) return {};
    var defaults = {};
    Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]")).forEach(function (row, index) {
      if (!row || row.getAttribute("data-rakeback-kind") === "addon") return;
      if (getRakebackRowRoom(row) !== normalizedRoom) return;
      var stamp = getRakebackRowBoundEntryAddedAt(row, index);
      if (!Number.isFinite(stamp) || getRakebackWeekStart(stamp) !== previousWeekStart) return;
      var playerId = getRakebackRowPlayerId(row);
      if (!playerId || defaults[playerId]) return;
      var percentInput = row.querySelector("[data-rakeback-percent]");
      var discountInput = row.querySelector("[data-rakeback-discount15]");
      defaults[playerId] = {
        percent: percentInput && percentInput.value ? percentInput.value : "",
        discount15: !!(discountInput && discountInput.checked),
      };
    });
    return defaults;
  }

  function getRakebackTemplateIdsForCurrentWeek(room, fallbackIds) {
    var previousWeekIds = getRakebackTemplateIdsFromPreviousWeek(room);
    var ids = previousWeekIds.slice();
    var seen = {};
    ids.forEach(function (id) { seen[id] = true; });
    (Array.isArray(fallbackIds) ? fallbackIds : []).forEach(function (id) {
      if (!id || seen[id]) return;
      seen[id] = true;
      ids.push(id);
    });
    return ids;
  }

  function ensureRakebackTemplateRows(room, playerIds, options) {
    if (!rakebackBody || !Array.isArray(playerIds) || !playerIds.length) return false;
    options = options || {};
    var normalizedRoom = normalizeRakebackRoom(room);
    var deletedTemplates = getRakebackDeletedTemplateMap();
    var previousWeekDefaults = getRakebackTemplateDefaultsFromPreviousWeek(normalizedRoom);
    var currentWeekStart = getCurrentRakebackWeekStart();
    var existingIds = {};
    rakebackLazyTemplateRows.forEach(function (row) {
      var data = normalizeRakebackLazyTemplateData(row);
      if (data && data.room === normalizedRoom && data.playerId) existingIds[data.playerId] = true;
    });
    getRakebackAllDataRows().forEach(function (row, index) {
      if (getRakebackRowRoom(row) !== normalizedRoom) return;
      var stamp = getRakebackRowBoundEntryAddedAt(row, index);
      if (Number.isFinite(stamp) && Number.isFinite(currentWeekStart) && getRakebackWeekStart(stamp) < currentWeekStart) return;
      var idInput = row.querySelector("[data-rakeback-player-id]");
      var playerId = idInput && idInput.value ? String(idInput.value).trim() : "";
      if (playerId) existingIds[playerId] = true;
    });
    var added = false;
    playerIds.forEach(function (playerId) {
      if (!options.includeDeletedTemplates && deletedTemplates[getRakebackTemplateKey(normalizedRoom, playerId)]) return;
      if (existingIds[playerId]) return;
      rakebackBody.appendChild(createRakebackRow({
        kind: "base",
        room: normalizedRoom,
        playerId: playerId,
        percent: previousWeekDefaults[playerId] ? previousWeekDefaults[playerId].percent : "",
        discount15: previousWeekDefaults[playerId] ? previousWeekDefaults[playerId].discount15 : false,
        carryForward: true,
        createdAt: getRakebackTemplateCreatedAt(normalizedRoom, playerId),
      }));
      existingIds[playerId] = true;
      added = true;
    });
    return added;
  }

  function ensureRakebackBaseRow(room) {
    if (!rakebackBody) return;
    if (rakebackArchiveMode) return;
    var targetRoom = normalizeRakebackRoom(room || activeRakebackRoom || "P21");
    if (targetRoom === "P21") ensureRakebackTemplateRows("P21", getRakebackTemplateIdsForCurrentWeek("P21", P21_RAKEBACK_TEMPLATE_IDS));
    if (targetRoom === "X") ensureRakebackTemplateRows("X", getRakebackTemplateIdsForCurrentWeek("X", X_RAKEBACK_TEMPLATE_IDS));
    if (targetRoom === "PP") ensureRakebackTemplateRows("PP", getRakebackTemplateIdsForCurrentWeek("PP", PP_RAKEBACK_TEMPLATE_IDS));
    if (targetRoom === "Supr") ensureRakebackTemplateRows("Supr", getRakebackTemplateIdsForCurrentWeek("Supr", SUPR_RAKEBACK_TEMPLATE_IDS));
    var rows = Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]"));
    rows.forEach(function (row, index) {
      getRakebackRowCreatedAt(row, index);
      getRakebackRowStandardAt(row, index);
      syncRakebackRowLookupAttrs(row);
    });
    var hasRoomRow = rows.some(function (row) {
      return getRakebackRowRoom(row) === targetRoom && !isRakebackRowInArchive(row, 0);
    });
    if (hasRoomRow) return;
    var now = Date.now();
    rakebackBody.appendChild(createRakebackRow({
      kind: "base",
      room: targetRoom,
      createdAt: now,
      entryAddedAt: now,
      editing: true,
    }));
  }

  function isRakebackRowFilled(row) {
    if (!row) return false;
    var rakeInput = row.querySelector("[data-rakeback-rake]");
    var percentInput = row.querySelector("[data-rakeback-percent]");
    var rake = parseReportNumber(rakeInput ? rakeInput.value : "");
    var percent = parseReportNumber(percentInput ? percentInput.value : "");
    return rake !== 0 ||
      percent !== 0 ||
      row.getAttribute("data-rakeback-carry-forward") === "1" ||
      row.getAttribute("data-rakeback-explicit-zero-rake") === "1" ||
      isRakebackRowAccounted(row);
  }

  function hasRakebackRakeValue(row) {
    if (!row) return false;
    var rakeInput = row.querySelector("[data-rakeback-rake]");
    return parseReportNumber(rakeInput ? rakeInput.value : "") !== 0;
  }

  function canAddRakebackAddon(row) {
    if (!row) return false;
    if (!canEditRakebackDraftRows()) return false;
    if (!isCurrentRakebackOwner(row.getAttribute("data-rakeback-owner") || "")) return false;
    return !!getRakebackRowPlayerId(row) && isRakebackRowFilled(row) && hasRakebackRakeValue(row);
  }

  function updateRakebackRowActions(row) {
    if (!row) return;
    var saved = row.getAttribute("data-rakeback-saved") === "1";
    var accounted = isRakebackRowAccounted(row);
    var canEditRow = canEditRakebackRow(row);
    var saveBtn = row.querySelector("[data-rakeback-save]");
    var editBtn = row.querySelector("[data-rakeback-edit]");
    var addBtn = row.querySelector("[data-rakeback-add-addon]");
    var removeBtn = row.querySelector("[data-rakeback-remove]");
    var colorBtn = row.querySelector("[data-rakeback-color-toggle]");
    if (saveBtn) {
      saveBtn.disabled = !canEditRow;
      saveBtn.hidden = !canEditRow || saved;
    }
    if (editBtn) editBtn.hidden = !canEditRow || !saved || accounted;
    if (addBtn) {
      var canAdd = canAddRakebackAddon(row);
      addBtn.disabled = !canAdd;
      addBtn.hidden = !canAdd;
    }
    if (removeBtn) {
      var canRemove = canRemoveRakebackRow(row);
      removeBtn.disabled = !canRemove;
      removeBtn.hidden = !canRemove;
    }
    if (colorBtn) {
      colorBtn.disabled = !canEditRow;
      colorBtn.hidden = !canEditRow;
    }
  }

  function getRakebackPreviousRake(row, groupRows) {
    if (!rakebackBody || !row || row.getAttribute("data-rakeback-kind") !== "addon") return 0;
    var groupId = row.getAttribute("data-rakeback-group") || "";
    var previousRake = 0;
    var rows = Array.isArray(groupRows) ? groupRows : getRakebackAllDataRows();
    for (var i = 0; i < rows.length; i++) {
      var current = rows[i];
      if (current === row) break;
      if (current.getAttribute("data-rakeback-group") !== groupId) continue;
      var rakeInput = current.querySelector("[data-rakeback-rake]");
      previousRake = parseReportNumber(rakeInput ? rakeInput.value : "");
    }
    return previousRake;
  }

  function getRakebackRowCalculationBase(row, previousRake) {
    if (!row) return 0;
    var rakeInput = row.querySelector("[data-rakeback-rake]");
    var rake = parseReportNumber(rakeInput ? rakeInput.value : "");
    if (row.getAttribute("data-rakeback-kind") === "addon") {
      return Math.max(0, rake - (arguments.length > 1 ? parseReportNumber(previousRake) : getRakebackPreviousRake(row)));
    }
    return rake;
  }

  function getRakebackRowAmount(row, previousRake) {
    if (!row) return 0;
    var percentInput = row.querySelector("[data-rakeback-percent]");
    var discountInput = row.querySelector("[data-rakeback-discount15]");
    var base = arguments.length > 1 ? getRakebackRowCalculationBase(row, previousRake) : getRakebackRowCalculationBase(row);
    var amount = base * parseReportNumber(percentInput ? percentInput.value : "") / 100;
    if (discountInput && discountInput.checked) amount *= 0.85;
    return amount;
  }

  function syncRakebackRowGroupDisplay(row) {
    if (!row) return;
    var rows = getRakebackGroupRows(row);
    var base = getRakebackGroupKeyRow(rows);
    var previousRake = 0;
    rows.forEach(function (current) {
      if (current !== base && base) {
        var baseRoom = base.querySelector("[data-rakeback-room]");
        var baseId = base.querySelector("[data-rakeback-player-id]");
        var room = current.querySelector("[data-rakeback-room]");
        var id = current.querySelector("[data-rakeback-player-id]");
        if (room && baseRoom) room.value = baseRoom.value;
        if (id && baseId) id.value = baseId.value;
        syncRakebackRowLookupAttrs(current);
      }
      var rakeInput = current.querySelector("[data-rakeback-rake]");
      var amountEl = current.querySelector("[data-rakeback-amount]");
      var restEl = current.querySelector("[data-rakeback-rest]");
      var rake = parseReportNumber(rakeInput ? rakeInput.value : "");
      var rowPreviousRake = current.getAttribute("data-rakeback-kind") === "addon" ? previousRake : 0;
      if (restEl) restEl.textContent = formatRakebackCellNumber(Math.max(0, rake - rowPreviousRake));
      if (amountEl) amountEl.textContent = formatRakebackAmountCell(getRakebackRowAmount(current, rowPreviousRake));
      updateRakebackRowActions(current);
      previousRake = rake;
    });
  }

  function isCurrentRakebackOwner(ownerId) {
    if (canManageAllRakebackRows()) return true;
    var currentOwnerId = getCurrentRakebackOwnerId();
    ownerId = String(ownerId || "").trim();
    return !ownerId || !currentOwnerId || ownerId === currentOwnerId;
  }

  function isCurrentRakebackReportOwner(ownerId) {
    // Editing the shared draft is a permission, not report ownership.
    var currentOwnerId = getCurrentRakebackOwnerId();
    ownerId = String(ownerId || "").trim();
    return !ownerId || !currentOwnerId || ownerId === currentOwnerId;
  }

  function isRakebackRowAccounted(row) {
    return !!(row && row.getAttribute("data-rakeback-accounted") === "1");
  }

  function getRakebackRowReportedAmount(row, fallbackAmount) {
    var raw = row ? row.getAttribute("data-rakeback-reported-amount") : "";
    if (raw != null && raw !== "") return parseReportNumber(raw);
    return isRakebackRowAccounted(row) ? parseReportNumber(fallbackAmount) : 0;
  }

  function canEditRakebackRow(row) {
    if (!row) return false;
    if (!canEditRakebackDraftRows()) return false;
    if (isRakebackRowAccounted(row)) return false;
    return isCurrentRakebackOwner(row.getAttribute("data-rakeback-owner") || "");
  }

  function canRemoveRakebackRow(row) {
    if (!row || !rakebackBody) return false;
    if (!canEditRakebackDraftRows()) return false;
    if (isRakebackRowAccounted(row)) return false;
    if (!isCurrentRakebackOwner(row.getAttribute("data-rakeback-owner") || "")) return false;
    if (row.getAttribute("data-rakeback-kind") !== "base") return true;
    var groupId = row.getAttribute("data-rakeback-group") || "";
    var groupRows = Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]"));
    return groupRows.every(function (candidate) {
      if (candidate.getAttribute("data-rakeback-group") !== groupId) return true;
      return isCurrentRakebackOwner(candidate.getAttribute("data-rakeback-owner") || "");
    });
  }

  function collectRakebackRows(includeEmpty, currentOwnerOnly) {
    if (!rakebackBody) return [];
    var rows = getRakebackAllDataRows();
    var previousRakeByGroup = {};
    return rows.map(function (row) {
      var roomSelect = row.querySelector("[data-rakeback-room]");
      var idInput = row.querySelector("[data-rakeback-player-id]");
      var rakeInput = row.querySelector("[data-rakeback-rake]");
      var percentInput = row.querySelector("[data-rakeback-percent]");
      var discountInput = row.querySelector("[data-rakeback-discount15]");
      var room = normalizeRakebackRoom(roomSelect && roomSelect.value ? roomSelect.value : "P21");
      var playerId = idInput && idInput.value ? String(idInput.value).trim() : "";
      var rake = parseReportNumber(rakeInput ? rakeInput.value : "");
      var percent = parseReportNumber(percentInput ? percentInput.value : "");
      var groupId = row.getAttribute("data-rakeback-group") || "";
      var kind = row.getAttribute("data-rakeback-kind") === "addon" ? "addon" : "base";
      var previousRake = kind === "addon" ? parseReportNumber(previousRakeByGroup[groupId]) : 0;
      var roomAmount = Math.round(getRakebackRowAmount(row, previousRake));
      var amount = getRakebackReportAmount(room, roomAmount);
      var reportedAmount = getRakebackRowReportedAmount(row, amount);
      var discount15 = !!(discountInput && discountInput.checked);
      var explicitZeroRake = row.getAttribute("data-rakeback-explicit-zero-rake") === "1";
      var carryForward = row.getAttribute("data-rakeback-carry-forward") === "1";
      var saved = row.getAttribute("data-rakeback-saved") === "1";
      var accounted = isRakebackRowAccounted(row);
      var templateDefaults = carryForward && (percent !== 0 || discount15);
      var filled = rake !== 0 || roomAmount !== 0 || explicitZeroRake || accounted || (!carryForward && percent !== 0) || templateDefaults;
      var emptyCarryForwardTemplate = carryForward && rake === 0 && roomAmount === 0 && !explicitZeroRake && !accounted;
      previousRakeByGroup[groupId] = rake;
      if (!includeEmpty && !filled) return null;
      var ownerId = row.getAttribute("data-rakeback-owner") || "";
      if (currentOwnerOnly && !isCurrentRakebackReportOwner(ownerId)) return null;
      var color = normalizeRakebackRowColor(row.getAttribute("data-rakeback-row-color") || "");
      return {
        groupId: groupId,
        kind: kind,
        room: room,
        playerId: playerId,
        rake: rake,
        rakeZero: explicitZeroRake,
        percent: percent,
        carryForward: carryForward,
        discount15: discount15,
        roomAmount: roomAmount,
        chipAmount: room === "X" ? roomAmount : null,
        amount: amount,
        reportedAmount: reportedAmount,
        saved: saved,
        color: color,
        createdAt: getRakebackRowCreatedAt(row, 0),
        standardAt: getRakebackRowStandardAt(row, 0),
        entryAddedAt: getRakebackRowEntryAddedAtForSave(row),
        accounted: accounted,
        reportedAt: row.getAttribute("data-rakeback-reported-at") || "",
        reportId: row.getAttribute("data-rakeback-report-id") || "",
        ownerId: ownerId || (emptyCarryForwardTemplate ? "" : getCurrentRakebackOwnerId()),
      };
    }).filter(Boolean);
  }

  function sumRakebackReportRows(rows) {
    return (Array.isArray(rows) ? rows : []).reduce(function (sum, row) {
      return sum + parseReportNumber(row && row.amount);
    }, 0);
  }

  function updateRakebackSummaryTotals() {
    if (rakebackSummaryTimer) {
      clearTimeout(rakebackSummaryTimer);
      rakebackSummaryTimer = null;
    }
    var allRows = collectRakebackRows(false, false);
    var issuedLatestRakeByGroup = {};
    allRows.filter(function (row) {
      return row && !isRakebackCollectedRowArchived(row);
    }).forEach(function (row, index) {
      addCollectedLatestGroupRake(issuedLatestRakeByGroup, row, index);
    });
    issuedRakebackReportRakeTotal = sumCollectedLatestGroupRake(issuedLatestRakeByGroup);
    var collected = allRows.filter(function (row) {
      var archived = isRakebackCollectedRowArchived(row);
      return rakebackArchiveMode ? archived : !archived;
    });
    var roomTotals = {};
    var latestRakeByRoomGroup = {};
    var latestRakeByGroup = {};
    RAKEBACK_ROOMS.forEach(function (room) {
      roomTotals[room] = { display: 0, report: 0, rake: 0 };
      latestRakeByRoomGroup[room] = {};
    });
    collected.forEach(function (row, index) {
      var room = normalizeRakebackRoom(row.room);
      if (!roomTotals[room]) roomTotals[room] = { display: 0, report: 0, rake: 0 };
      if (!latestRakeByRoomGroup[room]) latestRakeByRoomGroup[room] = {};
      roomTotals[room].display += parseReportNumber(row.roomAmount != null ? row.roomAmount : row.amount);
      roomTotals[room].report += parseReportNumber(row.amount);
      addCollectedLatestGroupRake(latestRakeByRoomGroup[room], row, index);
      addCollectedLatestGroupRake(latestRakeByGroup, row, index);
    });
    Object.keys(latestRakeByRoomGroup).forEach(function (room) {
      if (!roomTotals[room]) roomTotals[room] = { display: 0, report: 0, rake: 0 };
      roomTotals[room].rake = sumCollectedLatestGroupRake(latestRakeByRoomGroup[room]);
    });
    var total = collected.reduce(function (sum, row) {
      return sum + parseReportNumber(row.amount);
    }, 0);
    var rakeTotal = sumCollectedLatestGroupRake(latestRakeByGroup);
    var reportRakebackTotal = sumRakebackReportRows(allRows.filter(function (row) {
      return row && isCurrentRakebackReportOwner(row.ownerId) && !row.accounted && hasRakebackReportValue(row) && !isRakebackCollectedRowArchived(row);
    }));
    var activeTotal = roomTotals[activeRakebackRoom] || { display: 0, report: 0, rake: 0 };
    rakebackRoomTotals = roomTotals;
    if (rakebackSummaryEl) rakebackSummaryEl.hidden = rakebackArchiveMode;
    if (rakebackRoomTotalLabelEl) rakebackRoomTotalLabelEl.textContent = rakebackArchiveMode ? "Итого архив" : "Итого " + getRakebackRoomLabel(activeRakebackRoom);
    if (rakebackRoomTotalEl) rakebackRoomTotalEl.textContent = rakebackArchiveMode ? formatRakebackSummaryPair(rakeTotal, total) : formatRakebackSummaryPair(activeTotal.rake, activeTotal.report);
    if (rakebackTotalEl) rakebackTotalEl.textContent = formatRakebackSummaryPair(rakeTotal, total);
    if (rakebackTotalInput && !manualRakebackInputTouched) rakebackTotalInput.value = String(Math.round(reportRakebackTotal) || "");
    if (rakebackTotalsModal && !rakebackTotalsModal.hidden) renderRakebackTotalsModal();
    updateFiguresTotals({ syncExtras: false });
    showRakebackStatus("");
    return reportRakebackTotal;
  }

  function scheduleRakebackSummaryTotals() {
    if (rakebackSummaryTimer) clearTimeout(rakebackSummaryTimer);
    rakebackSummaryTimer = setTimeout(function () {
      rakebackSummaryTimer = null;
      runAdminReportAfterPaint(updateRakebackSummaryTotals);
    }, 160);
  }

  function getReportStoredRakebackTotal(report) {
    if (report && report.rakeback === "") return 0;
    if (report && report.rakeback != null) return parseReportNumber(report.rakeback);
    if (report && Array.isArray(report.rakebackRows) && report.rakebackRows.length) {
      return sumRakebackReportRows(report.rakebackRows);
    }
    return parseReportNumber(report && report.rakeback);
  }

  function hasRakebackReportValue(row) {
    if (!row) return false;
    return parseReportNumber(row.rake) !== 0 ||
      parseReportNumber(row.roomAmount) !== 0 ||
      parseReportNumber(row.amount) !== 0 ||
      row.rakeZero === true ||
      row.accounted === true;
  }

  function getUnaccountedRakebackReportRows() {
    return collectRakebackRows(false, true).filter(function (row) {
      return row && !row.accounted && hasRakebackReportValue(row) && !isRakebackCollectedRowArchived(row);
    });
  }

  function markUnaccountedRakebackRowsAccounted(reportId, reportedAtOverride) {
    if (!rakebackBody) return;
    var parsedReportedAt = parseRakebackTimeValue(reportedAtOverride);
    var reportedAt = Number.isFinite(parsedReportedAt) ? new Date(parsedReportedAt).toISOString() : new Date().toISOString();
    getRakebackAllDataRows().forEach(function (row) {
      var ownerId = row.getAttribute("data-rakeback-owner") || "";
      if (!isCurrentRakebackReportOwner(ownerId)) return;
      if (!isRakebackRowFilled(row)) return;
      if (isRakebackRowAccounted(row)) return;
      var room = getRakebackRowRoom(row);
      var currentAmount = getRakebackReportAmount(room, Math.round(getRakebackRowAmount(row)));
      row.setAttribute("data-rakeback-accounted", "1");
      row.setAttribute("data-rakeback-reported-at", reportedAt);
      row.setAttribute("data-rakeback-reported-amount", String(Math.round(currentAmount * 100) / 100));
      if (!Number.isFinite(parseRakebackTimeValue(row.getAttribute("data-rakeback-entry-added-at") || ""))) {
        row.setAttribute("data-rakeback-entry-added-at", reportedAt);
      }
      if (reportId) row.setAttribute("data-rakeback-report-id", String(reportId));
    });
  }

  function ensureRakebackTemplateRowsFromReportedRows(rows) {
    if (!rakebackBody || !Array.isArray(rows) || !rows.length) return false;
    var templateByKey = {};
    getRakebackAllDataRows().forEach(function (row) {
      if (!isRakebackCarryForwardPlaceholderRow(row)) return;
      var key = getRakebackTemplateKey(getRakebackRowRoom(row), getRakebackRowPlayerId(row));
      if (key) templateByKey[key] = row;
    });
    var changed = false;
    rows.forEach(function (data) {
      if (!data) return;
      var kind = data.kind === "addon" || data.isAddon ? "addon" : "base";
      var room = normalizeRakebackRoom(data.room || "P21");
      var playerId = String(data.playerId || data.id || "").trim();
      var percent = parseReportNumber(data.percent);
      var key = getRakebackTemplateKey(room, playerId);
      if (kind === "addon" || !key || percent === 0) return;
      var templateRow = templateByKey[key];
      if (templateRow) {
        var percentInput = templateRow.querySelector("[data-rakeback-percent]");
        if (percentInput && parseReportNumber(percentInput.value) !== percent) {
          percentInput.value = formatReportInputNumber(percent);
          changed = true;
        }
        return;
      }
      var now = Date.now();
      templateRow = createRakebackRow({
        kind: "base",
        room: room,
        playerId: playerId,
        percent: percent,
        carryForward: true,
        templateCarryForward: true,
        createdAt: now,
        standardAt: getRakebackTopStandardAt(room),
      });
      rakebackBody.appendChild(templateRow);
      templateByKey[key] = templateRow;
      changed = true;
    });
    return changed;
  }

  function syncRakebackTable(options) {
    if (!rakebackBody) return 0;
    options = options || {};
    restoreRakebackSuspendedRows();
    restoreRakebackSearchDetachedRows();
    removeRakebackGeneratedRows();
    dehydrateRakebackLazyTemplateRows({ keepSearchMatches: true });
    ensureRakebackSearchTemplateRows();
    hydrateRakebackLazyTemplateRowsForSearch();
    ensureRakebackBaseRow(activeRakebackRoom);
    var rows = Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]"));
    rows.forEach(function (row, index) {
      getRakebackRowCreatedAt(row, index);
      getRakebackRowStandardAt(row, index);
      syncRakebackRowLookupAttrs(row);
    });
    var baseByGroup = {};
    rows.forEach(function (row) {
      var groupId = row.getAttribute("data-rakeback-group");
      if (!groupId) {
        groupId = nextRakebackGroupId();
        row.setAttribute("data-rakeback-group", groupId);
      }
      if (row.getAttribute("data-rakeback-kind") !== "addon" && !baseByGroup[groupId]) baseByGroup[groupId] = row;
    });
    var previousRakeByGroup = {};
    rows.forEach(function (row) {
      var groupId = row.getAttribute("data-rakeback-group") || "";
      var kind = row.getAttribute("data-rakeback-kind") === "addon" ? "addon" : "base";
      var base = baseByGroup[groupId];
      if (kind === "addon" && base) {
        var baseRoom = base.querySelector("[data-rakeback-room]");
        var baseId = base.querySelector("[data-rakeback-player-id]");
        var room = row.querySelector("[data-rakeback-room]");
        var id = row.querySelector("[data-rakeback-player-id]");
        if (room && baseRoom) room.value = baseRoom.value;
        if (id && baseId) id.value = baseId.value;
        syncRakebackRowLookupAttrs(row);
      }
      var rakeInput = row.querySelector("[data-rakeback-rake]");
      var percentInput = row.querySelector("[data-rakeback-percent]");
      var amountEl = row.querySelector("[data-rakeback-amount]");
      var restEl = row.querySelector("[data-rakeback-rest]");
      var rake = parseReportNumber(rakeInput ? rakeInput.value : "");
      var previousRake = kind === "addon" ? parseReportNumber(previousRakeByGroup[groupId]) : 0;
      if (restEl) {
        restEl.textContent = formatRakebackCellNumber(Math.max(0, rake - previousRake));
      }
      var amount = getRakebackRowAmount(row, previousRake);
      if (amountEl) amountEl.textContent = formatRakebackAmountCell(amount);
      updateRakebackRowActions(row);
      previousRakeByGroup[groupId] = rake;
    });
    if (!options.skipSort) rows = sortRakebackRows(rows);
    syncRakebackRoomVisibility();
    ensureRakebackVisibleAddonBaseRows();
    if (options.deferDecorations) scheduleRakebackDecorations();
    else insertRakebackDateSeparators();
    syncRakebackVisibleRowNumbers();
    if (options.fastSummary && renderRakebackSummaryFromCache()) {
      scheduleRakebackSummaryTotals();
      return 0;
    }
    return updateRakebackSummaryTotals();
  }

  function fillRakebackTable(rows, legacyRakeback) {
    if (!rakebackBody) return;
    rakebackDraftNeedsMigration = false;
    var list = Array.isArray(rows) ? rows.filter(Boolean) : [];
    if (!list.length && legacyRakeback != null && legacyRakeback !== "" && parseReportNumber(legacyRakeback) !== 0) {
      list = [{ kind: "base", room: "P21", playerId: "", rake: legacyRakeback, percent: 100 }];
    }
    if (!list.length) {
      rakebackLazyTemplateRows = [];
      rakebackSearchDetachedRows = [];
      rakebackSuspendedRows = [];
      rakebackBody.innerHTML = "";
      syncRakebackTable();
      return;
    }
    var fragment = document.createDocumentFragment();
    list.forEach(function (row) {
      var tr = createRakebackRow({
        groupId: row.groupId || "",
        kind: row.kind === "addon" || row.isAddon ? "addon" : "base",
        room: normalizeRakebackRoom(row.room || "P21"),
        playerId: row.playerId || row.id || "",
        rake: row.rake != null ? row.rake : "",
        rakeZero: row.rakeZero === true || row.explicitZeroRake === true || row.zeroRake === true,
        percent: row.percent != null ? row.percent : "",
        carryForward: row.carryForward === true || row.templateCarryForward === true,
        discount15: !!(row.discount15 || row.subtract15),
        ownerId: row.ownerId || row.authorId || "",
        color: row.color || row.rowColor || row.highlightColor || "",
        createdAt: row.createdAt || row.addedAt || row.created || "",
        standardAt: row.standardAt || row.orderAt || row.sortAt || "",
        entryAddedAt: row.entryAddedAt || row.firstAddedAt || "",
        accounted: row.accounted || row.reportedAt || row.reportId,
        reportedAt: row.reportedAt || "",
        reportId: row.reportId || "",
      });
      fragment.appendChild(tr);
      if (row.saved) setRakebackRowSaved(tr, true);
    });
    rakebackLazyTemplateRows = [];
    rakebackSearchDetachedRows = [];
    rakebackSuspendedRows = [];
    rakebackBody.replaceChildren(fragment);
    if (list.length > 200) {
      syncRakebackTable({ skipSort: true, deferDecorations: true, fastSummary: true });
    } else {
      syncRakebackTable();
    }
    if (rakebackDraftNeedsMigration && !editingReportId) saveRakebackDraftRowsNow(true);
  }

  function addRakebackBaseRow() {
    if (!rakebackBody) return;
    if (!canEditRakebackDraftRows()) {
      showRakebackStatusBriefly("Нет доступа к редактированию рейкбека");
      return;
    }
    if (rakebackSearchInput && rakebackSearchInput.value) rakebackSearchInput.value = "";
    rakebackDraftMutationSeq += 1;
    var now = Date.now();
    var row = createRakebackRow({
      kind: "base",
      room: activeRakebackRoom,
      createdAt: now,
      standardAt: getRakebackTopStandardAt(activeRakebackRoom),
      entryAddedAt: now,
    });
    var firstRow = rakebackBody.querySelector("[data-rakeback-row]");
    if (firstRow) rakebackBody.insertBefore(row, firstRow);
    else rakebackBody.appendChild(row);
    syncRakebackTable();
    focusRakebackRow(row);
  }

  function addRakebackAddonRow(baseRow) {
    if (!rakebackBody || !baseRow) return;
    if (!canEditRakebackDraftRows()) return;
    var groupId = baseRow.getAttribute("data-rakeback-group") || nextRakebackGroupId();
    baseRow.setAttribute("data-rakeback-group", groupId);
    var roomSelect = baseRow.querySelector("[data-rakeback-room]");
    var idInput = baseRow.querySelector("[data-rakeback-player-id]");
    var percentInput = baseRow.querySelector("[data-rakeback-percent]");
    var discountInput = baseRow.querySelector("[data-rakeback-discount15]");
    var entryAddedAt = getRakebackRowEntryAddedAtForSave(baseRow) || Date.now();
    var addon = createRakebackRow({
      kind: "addon",
      groupId: groupId,
      room: roomSelect && roomSelect.value ? roomSelect.value : "P21",
      playerId: idInput && idInput.value ? idInput.value : "",
      percent: percentInput && percentInput.value ? percentInput.value : "",
      discount15: !!(discountInput && discountInput.checked),
      entryAddedAt: entryAddedAt,
      editing: true,
    });
    var rows = Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]"));
    var anchor = baseRow;
    rows.forEach(function (candidate) {
      if (candidate.getAttribute("data-rakeback-group") === groupId) anchor = candidate;
    });
    if (anchor.nextSibling) rakebackBody.insertBefore(addon, anchor.nextSibling);
    else rakebackBody.appendChild(addon);
    syncRakebackTable({ skipSort: true });
    markRakebackDraftLocalEdit();
    saveRakebackDraftRowsNow(true);
    var rakeInput = addon.querySelector("[data-rakeback-rake]");
    if (rakeInput && typeof rakeInput.focus === "function") rakeInput.focus();
  }

  /** Суммирует доп. строки отчёта в map по названию (без дубля с extraFields + legacy). */
  function mergeReportExtrasIntoMap(map, r) {
    if (!r || !map) return;
    function addExtra(name, raw) {
      name = name != null ? String(name).trim() : "";
      if (!name) name = "Доп.";
      if (isReportManualRakebackFieldName(name)) return;
      var n = typeof raw === "number" ? raw : parseFloat(String(raw != null ? raw : "").replace(",", "."));
      if (isNaN(n)) n = 0;
      if (isReportUsdtRateFieldName(name)) {
        var prev = map[name] && map[name].__avg ? map[name] : { __avg: true, sum: 0, count: 0 };
        if (n !== 0) {
          prev.sum += n;
          prev.count += 1;
        }
        map[name] = prev;
        return;
      }
      map[name] = (map[name] || 0) + n;
    }
    if (Array.isArray(r.extraFields) && r.extraFields.length > 0) {
      r.extraFields.forEach(function (f) {
        if (!f) return;
        addExtra(f.name != null ? f.name : f.extraName, f.amount != null ? f.amount : f.extraAmount);
      });
      return;
    }
    if (r.extraName || r.extraAmount != null) {
      addExtra(r.extraName, r.extraAmount);
    }
  }

  function mergeRakebackRowsIntoMap(map, r) {
    if (!r || !map || !Array.isArray(r.rakebackRows)) return;
    r.rakebackRows.forEach(function (row) {
      if (!row) return;
      var room = row.room != null ? String(row.room).trim() : "";
      var playerId = row.playerId != null ? String(row.playerId).trim() : "";
      if (!room && !playerId) return;
      var key = room + "\u0000" + playerId;
      if (!map[key]) map[key] = { room: room, playerId: playerId, rake: 0, amount: 0 };
      map[key].rake += parseReportNumber(row.rake);
      map[key].amount += parseReportNumber(row.amount);
    });
  }

  function moscowPartsFromTs(ts) {
    var d = new Date(ts);
    var f = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Europe/Moscow",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      hour12: false,
    });
    var parts = f.formatToParts(d);
    var o = {};
    parts.forEach(function (p) {
      if (p.type !== "literal") o[p.type] = p.value;
    });
    return { y: o.year, m: o.month, d: o.day, h: parseInt(o.hour, 10) || 0 };
  }

  var REPORT_DAY_MS = 24 * 60 * 60 * 1000;
  var REPORT_WEEK_MS = 7 * REPORT_DAY_MS;
  var REPORT_MSK_SHIFT_MS = 3 * 60 * 60 * 1000;
  var REPORT_DAY_CUTOFF_MS = 16 * 60 * 60 * 1000;

  function reportBusinessTimestampMs(ts) {
    var raw = Number(ts);
    if (!Number.isFinite(raw)) return raw;
    var p = moscowPartsFromTs(raw - REPORT_DAY_CUTOFF_MS);
    return new Date(p.y + "-" + p.m + "-" + p.d + "T12:00:00+03:00").getTime();
  }

  /** Отчётный день переключается в 16:00 МСК: до 16:00 идёт предыдущая дата. */
  function reportEffectiveTimestampMs(r) {
    var raw = r && r.createdAt ? new Date(r.createdAt).getTime() : NaN;
    if (!r || !r.createdAt || raw !== raw) return raw;
    return reportBusinessTimestampMs(raw);
  }

  function formatRuWeekdayDateFromTs(ts) {
    if (ts !== ts) return { weekday: "", date: "" };
    var cap = function (s) {
      if (!s) return "";
      return s.charAt(0).toUpperCase() + s.slice(1);
    };
    var wd = new Intl.DateTimeFormat("ru-RU", { timeZone: "Europe/Moscow", weekday: "long" }).format(new Date(ts));
    var dd = new Intl.DateTimeFormat("ru-RU", { timeZone: "Europe/Moscow", day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(ts));
    return { weekday: cap(wd), date: dd };
  }

  /** Дата/день недели для новой формы: отчётный день начинается в 16:00 МСК. */
  function getShiftReportDateInfo() {
    var effTs = reportBusinessTimestampMs(Date.now());
    var meta = formatRuWeekdayDateFromTs(effTs);
    var wdl = meta.weekday.toLowerCase();
    return { label: meta.weekday + ", " + meta.date, weekday: wdl, date: meta.date, iso: new Date(effTs).toISOString() };
  }

  function getAdminReportAppVersionLabel() {
    var version = document.documentElement ? document.documentElement.getAttribute("data-app-version") : "";
    return version ? "v" + String(version).trim() : "";
  }

  function formatAdminReportDateLabel(label) {
    var version = getAdminReportAppVersionLabel();
    return version ? String(label || "").trim() + " · " + version : String(label || "").trim();
  }

  function mskDateFromReportTs(ts) {
    return new Date(ts + REPORT_MSK_SHIFT_MS);
  }

  /** Неделя отчётных дат: Пн -> Вс; реальный переход недели происходит в Пн 16:00 МСК. */
  function weekStartMsForReport(ts) {
    var msk = mskDateFromReportTs(ts);
    var y = msk.getUTCFullYear();
    var m = msk.getUTCMonth();
    var d = msk.getUTCDate();
    var wd = msk.getUTCDay();
    var daysFromMonday = (wd + 6) % 7;
    var mondayStartMskMs = Date.UTC(y, m, d, 0, 0, 0, 0) - daysFromMonday * REPORT_DAY_MS;
    return mondayStartMskMs - REPORT_MSK_SHIFT_MS;
  }

  function formatReportWeekBoundary(ms) {
    return new Intl.DateTimeFormat("ru-RU", {
      timeZone: "Europe/Moscow",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(ms));
  }

  function getCalculationWeekMeta() {
    var info = getShiftReportDateInfo();
    var baseTs = info && info.iso ? new Date(info.iso).getTime() : Date.now();
    if (baseTs !== baseTs) baseTs = Date.now();
    var start = weekStartMsForReport(baseTs);
    var end = start + REPORT_WEEK_MS - 1;
    return {
      start: start,
      end: end,
      label: formatReportWeekBoundary(start) + " – " + formatReportWeekBoundary(end),
    };
  }

  function getCalculationWeekMetaFromStart(start) {
    start = Number(start);
    if (!Number.isFinite(start)) return getCalculationWeekMeta();
    return {
      start: start,
      end: start + REPORT_WEEK_MS - 1,
      label: formatReportWeekBoundary(start) + " – " + formatReportWeekBoundary(start + REPORT_WEEK_MS - 1),
    };
  }

  function getCalculationArchiveMinWeekStart() {
    return weekStartMsForReport(Date.UTC(2026, 4, 13, 9, 0, 0));
  }

  function getCalculationDraftKey() {
    var week = getCalculationWeekMeta();
    return "poker_admin_report_calculations_draft:" + String(week.start || "current");
  }

  function getRakebackDraftKey() {
    return "poker_admin_report_rakeback_draft:shared";
  }

  function getLegacyRakebackDraftKey() {
    var info = getShiftReportDateInfo();
    return "poker_admin_report_rakeback_draft:" + String(info.date || "today");
  }

  function readRakebackDraftData() {
    try {
      var raw = window.localStorage ? window.localStorage.getItem(getRakebackDraftKey()) : "";
      if (!raw && window.localStorage) raw = window.localStorage.getItem(getLegacyRakebackDraftKey());
      if (!raw) return { rows: [], deletedTemplates: [], deletedRows: [] };
      var parsed = JSON.parse(raw);
      var deletedTemplates = normalizeRakebackDeletedTemplates(parsed && parsed.deletedTemplates);
      var deletedRows = normalizeRakebackDeletedRows(parsed && parsed.deletedRows);
      var rows = parsed && Array.isArray(parsed.rows) ? dedupeRakebackTemplateRows(parsed.rows.filter(hasRakebackStoredEntryData)) : [];
      return {
        rows: dedupeRakebackTemplateRows(filterDeletedRakebackStoredRows(rows, deletedTemplates, deletedRows)),
        deletedTemplates: deletedTemplates,
        deletedRows: deletedRows,
        updatedAt: parsed && parsed.updatedAt ? String(parsed.updatedAt) : "",
      };
    } catch (e) {
      return { rows: [], deletedTemplates: [], deletedRows: [] };
    }
  }

  function readRakebackDraftRows() {
    return readRakebackDraftData().rows;
  }

  function readRakebackDeletedTemplates() {
    return readRakebackDraftData().deletedTemplates;
  }

  function readRakebackDeletedRows() {
    return readRakebackDraftData().deletedRows || [];
  }

  function clearStaleRakebackLocalDraftAfterTemplateReset() {
    if (!canSyncSharedRakebackDraft()) return false;
    var data = readRakebackDraftData();
    var hasRows = !!(data.rows && data.rows.length);
    var hasDeletes = !!((data.deletedTemplates && data.deletedTemplates.length) || (data.deletedRows && data.deletedRows.length));
    if (hasRows || !hasDeletes) return false;
    var updatedAt = parseRakebackTimeValue(data.updatedAt);
    if (Number.isFinite(updatedAt) && updatedAt >= RAKEBACK_TEMPLATE_RESET_AT) return false;
    clearRakebackDraftRows();
    return true;
  }

  function getRakebackDeletedTemplateMap() {
    var map = {};
    readRakebackDeletedTemplates().forEach(function (item) {
      var key = getRakebackTemplateKey(item.room, item.playerId);
      if (key) map[key] = true;
    });
    return map;
  }

  function getAdminReportApiBase() {
    return typeof getApiBase === "function" ? getApiBase() : "";
  }

  function buildAuthBody(payload) {
    return typeof pokerGuestOrAuthedPostBody === "function"
      ? pokerGuestOrAuthedPostBody(payload)
      : payload;
  }

  function saveLocalRakebackDraftRows(rows, deletedTemplates, updatedAt, deletedRows) {
    try {
      if (!window.localStorage) return;
      var normalizedDeleted = normalizeRakebackDeletedTemplates(deletedTemplates != null ? deletedTemplates : readRakebackDeletedTemplates());
      var normalizedDeletedRows = normalizeRakebackDeletedRows(deletedRows != null ? deletedRows : readRakebackDeletedRows());
      var filteredRows = dedupeRakebackTemplateRows(filterDeletedRakebackStoredRows(rows || [], normalizedDeleted, normalizedDeletedRows));
      var normalizedUpdatedAt = updatedAt ? String(updatedAt) : "";
      if ((filteredRows && filteredRows.length) || normalizedDeleted.length || normalizedDeletedRows.length) {
        window.localStorage.setItem(getRakebackDraftKey(), JSON.stringify({
          rows: filteredRows || [],
          deletedTemplates: normalizedDeleted,
          deletedRows: normalizedDeletedRows,
          updatedAt: normalizedUpdatedAt,
          savedAt: Date.now()
        }));
      } else {
        window.localStorage.removeItem(getRakebackDraftKey());
      }
    } catch (e) {}
  }

  function rememberDeletedRakebackTemplates(rows) {
    var current = readRakebackDeletedTemplates();
    var currentDeletedRows = readRakebackDeletedRows();
    var byKey = {};
    var deletedRowsByKey = {};
    current.forEach(function (item) {
      var key = getRakebackTemplateKey(item.room, item.playerId);
      if (key) byKey[key] = item;
    });
    currentDeletedRows.forEach(function (item) {
      var key = getRakebackDeletedStoredRowKey(item);
      if (key) deletedRowsByKey[key] = item;
    });
    Array.prototype.slice.call(rows || []).forEach(function (row) {
      var room = getRakebackRowRoom(row);
      var playerId = getRakebackRowPlayerId(row);
      var groupId = row.getAttribute("data-rakeback-group") || "";
      var kind = row.getAttribute("data-rakeback-kind") === "addon" ? "addon" : "base";
      var reportId = row.getAttribute("data-rakeback-report-id") || "";
      var reportedAt = row.getAttribute("data-rakeback-reported-at") || "";
      var ownerId = row.getAttribute("data-rakeback-owner") || "";
      var deletedRowKey = getRakebackDeletedStoredRowKey({
        groupId: groupId,
        kind: kind,
        room: room,
        playerId: playerId,
        reportId: reportId,
        reportedAt: reportedAt,
      });
      if (deletedRowKey && !deletedRowsByKey[deletedRowKey]) {
        deletedRowsByKey[deletedRowKey] = {
          groupId: groupId,
          kind: kind,
          room: normalizeRakebackRoom(room),
          playerId: playerId,
          reportId: reportId,
          reportedAt: reportedAt,
          ownerId: ownerId,
          deletedAt: Date.now(),
          deletedBy: getCurrentRakebackOwnerId(),
        };
      }
      var key = getRakebackTemplateKey(room, playerId);
      if (!key || byKey[key]) return;
      byKey[key] = {
        room: normalizeRakebackRoom(room),
        playerId: playerId,
        deletedAt: Date.now(),
        deletedBy: getCurrentRakebackOwnerId(),
      };
    });
    rakebackLazyTemplateRows = rakebackLazyTemplateRows.filter(function (row) {
      var data = normalizeRakebackLazyTemplateData(row);
      var key = data ? getRakebackTemplateKey(data.room, data.playerId) : "";
      return !key || !byKey[key];
    });
    saveLocalRakebackDraftRows(
      collectRakebackRows(false),
      Object.keys(byKey).map(function (key) { return byKey[key]; }),
      "",
      Object.keys(deletedRowsByKey).map(function (key) { return deletedRowsByKey[key]; })
    );
  }

  function saveRakebackDraftRowsNow(force) {
    if (editingReportId) return;
    if (!canEditRakebackDraftRows()) return;
    if (loadingRakebackDraft && !force) return;
    if (rakebackDraftSaveTimer) {
      clearTimeout(rakebackDraftSaveTimer);
      rakebackDraftSaveTimer = null;
    }
    if (rakebackDraftSaveIdle) {
      cancelAdminReportIdle(rakebackDraftSaveIdle);
      rakebackDraftSaveIdle = null;
    }
    rakebackDraftMutationSeq += 1;
    var rows = collectRakebackRows(false);
    var deletedTemplates = readRakebackDeletedTemplates();
    var deletedRows = readRakebackDeletedRows();
    saveLocalRakebackDraftRows(rows, deletedTemplates, "", deletedRows);
    var base = getAdminReportApiBase();
    if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return;
    savingRakebackDraft = true;
    var payload = buildAuthBody({
      action: "rakeback_draft_save",
      date: "shared",
      rakebackRows: rows,
      deletedTemplates: deletedTemplates,
      deletedRows: deletedRows,
      allowAccountedRakebackOverwrite: canManageAllRakebackRows(),
    });
    fetch(base.replace(/\/$/, "") + "/api/admin-report-shifts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data && data.ok && data.rakebackDraft && Array.isArray(data.rakebackDraft.rows)) {
          rakebackDraftLocalEditUntil = 0;
          saveLocalRakebackDraftRows(data.rakebackDraft.rows, data.rakebackDraft.deletedTemplates || deletedTemplates, data.rakebackDraft.updatedAt, data.rakebackDraft.deletedRows || deletedRows);
        }
      })
      .catch(function () {
        showRakebackStatusBriefly("Не удалось сохранить черновик");
      })
      .then(function () {
        savingRakebackDraft = false;
      });
  }

  function saveRakebackDraftRows() {
    if (!canEditRakebackDraftRows()) return;
    rakebackDraftMutationSeq += 1;
    if (rakebackDraftSaveTimer) clearTimeout(rakebackDraftSaveTimer);
    if (rakebackDraftSaveIdle) {
      cancelAdminReportIdle(rakebackDraftSaveIdle);
      rakebackDraftSaveIdle = null;
    }
    var seq = rakebackDraftMutationSeq;
    rakebackDraftSaveTimer = setTimeout(function () {
      rakebackDraftSaveTimer = null;
      rakebackDraftSaveIdle = runAdminReportWhenIdle(function () {
        rakebackDraftSaveIdle = null;
        if (seq !== rakebackDraftMutationSeq) return;
        saveRakebackDraftRowsNow();
      }, 2000);
    }, 700);
  }

  function focusRakebackRow(row) {
    if (!row) return;
    var focusTarget = row.querySelector("[data-rakeback-player-id]:not([readonly]),[data-rakeback-rake]:not([readonly]),[data-rakeback-percent]:not([readonly])");
    setTimeout(function () {
      try {
        if (typeof row.scrollIntoView === "function") row.scrollIntoView({ block: "nearest", inline: "nearest" });
      } catch (eScroll) {}
      if (focusTarget && typeof focusTarget.focus === "function") {
        try {
          focusTarget.focus({ preventScroll: true });
        } catch (eFocus) {
          focusTarget.focus();
        }
      }
    }, 0);
  }

  function clearRakebackDraftRows() {
    try {
      if (window.localStorage) window.localStorage.removeItem(getRakebackDraftKey());
    } catch (e) {}
  }

  function loadSharedRakebackDraftRows(options) {
    options = options || {};
    if (rakebackDraftLoadIdle) {
      cancelAdminReportIdle(rakebackDraftLoadIdle);
      rakebackDraftLoadIdle = null;
    }
    var focusedInRakeback = rakebackBody && document.activeElement && rakebackBody.contains(document.activeElement);
    var focusedInRakebackControl = focusedInRakeback && document.activeElement && document.activeElement.matches && document.activeElement.matches("input,select,textarea");
    if (!options.force && focusedInRakebackControl) return;
    if (!options.force && focusedInRakeback && Date.now() < rakebackDraftLocalEditUntil) return;
    if (rakebackDraftSaveTimer || savingRakebackDraft) return;
    var base = getAdminReportApiBase();
    if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
      fillRakebackTable(readRakebackDraftRows(), "");
      if (options.showStatus) showRakebackStatusBriefly("Нет подключения для обновления");
      return;
    }
    if (options.showStatus) showRakebackStatus("Обновляю…");
    if (rakebackRefreshBtn) rakebackRefreshBtn.disabled = true;
    var localDraft = readRakebackDraftData();
    var visibleRowsBeforeRefresh = [];
    if (!(localDraft.rows || []).length && (rakebackBody && rakebackBody.querySelector("[data-rakeback-row]"))) {
      visibleRowsBeforeRefresh = collectRakebackRows(false);
    }
    var q = typeof pokerRafflesApiQueryLeading === "function" ? pokerRafflesApiQueryLeading() : "?initData=";
    q += (q.indexOf("?") >= 0 ? "&" : "?") + "rakebackDraft=1&date=shared";
    var shouldUploadLocalDraft = false;
    var loadMutationSeq = rakebackDraftMutationSeq;
    var canEditDraft = canEditRakebackDraftRows();
    loadingRakebackDraft = true;
    fetch(base.replace(/\/$/, "") + "/api/admin-report-shifts" + q)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (loadMutationSeq !== rakebackDraftMutationSeq) return;
        var serverDraft = data && data.ok && data.rakebackDraft ? data.rakebackDraft : null;
        var hasServerDraft = !!serverDraft && serverDraft.notModified !== true;
        var serverRows = hasServerDraft && Array.isArray(serverDraft.rows) ? serverDraft.rows : [];
        var serverHasDeletedTemplates = hasServerDraft && Array.isArray(serverDraft.deletedTemplates);
        var serverHasDeletedRows = hasServerDraft && Array.isArray(serverDraft.deletedRows);
        var serverDeletedTemplates = serverHasDeletedTemplates ? normalizeRakebackDeletedTemplates(serverDraft.deletedTemplates) : [];
        var serverDeletedRows = serverHasDeletedRows ? normalizeRakebackDeletedRows(serverDraft.deletedRows) : [];
        var localRows = localDraft.rows || [];
        if (!localRows.length && visibleRowsBeforeRefresh.length) localRows = visibleRowsBeforeRefresh;
        var deletedTemplates = serverHasDeletedTemplates ? serverDeletedTemplates : (localDraft.deletedTemplates || []);
        var deletedRows = serverHasDeletedRows ? serverDeletedRows : (localDraft.deletedRows || []);
        var serverUpdatedAt = parseRakebackTimeValue(serverDraft && serverDraft.updatedAt);
        var serverHistoryResetAt = parseRakebackTimeValue(serverDraft && serverDraft.historyResetAt);
        var localUpdatedAt = parseRakebackTimeValue(localDraft.updatedAt);
        var shouldMergeLocalRows = canEditDraft && !Number.isFinite(serverHistoryResetAt) && (
          !Number.isFinite(serverUpdatedAt) ||
          (Number.isFinite(localUpdatedAt) && localUpdatedAt > serverUpdatedAt)
        );
        var rows = hasServerDraft
          ? (shouldMergeLocalRows ? mergeRakebackDraftRows(serverRows, localRows) : serverRows)
          : (canEditDraft ? localRows : []);
        var rowsBeforeCleanup = rows.length;
        rows = dedupeRakebackTemplateRows(filterDeletedRakebackStoredRows(rows, deletedTemplates, deletedRows));
        shouldUploadLocalDraft = canEditDraft && (
          rows.length !== rowsBeforeCleanup ||
          (shouldMergeLocalRows && (!!localRows.length || !!(localDraft.deletedTemplates || []).length || !!(localDraft.deletedRows || []).length)) ||
          (!hasServerDraft && !serverRows.length && !serverDeletedTemplates.length && !serverDeletedRows.length && (!!localRows.length || !!(localDraft.deletedTemplates || []).length || !!(localDraft.deletedRows || []).length))
        );
        saveLocalRakebackDraftRows(rows, deletedTemplates, serverDraft && serverDraft.updatedAt, deletedRows);
        fillRakebackTable(rows, "");
        rakebackDraftLocalEditUntil = 0;
        if (options.showStatus) showRakebackStatusBriefly("Обновлено");
      })
      .catch(function () {
        if (loadMutationSeq !== rakebackDraftMutationSeq) return;
        fillRakebackTable(readRakebackDraftRows(), "");
        if (options.showStatus) showRakebackStatusBriefly("Не удалось обновить");
      })
      .then(function () {
        loadingRakebackDraft = false;
        if (rakebackRefreshBtn) rakebackRefreshBtn.disabled = false;
        if (shouldUploadLocalDraft) saveRakebackDraftRowsNow(true);
      });
  }

  function scheduleSharedRakebackDraftLoad(options) {
    if (!canSyncSharedRakebackDraft()) return;
    if (rakebackDraftLoadIdle) cancelAdminReportIdle(rakebackDraftLoadIdle);
    runAdminReportAfterPaint(function () {
      rakebackDraftLoadIdle = runAdminReportWhenIdle(function () {
        rakebackDraftLoadIdle = null;
        loadSharedRakebackDraftRows(options || { showStatus: false });
      }, 1800);
    });
  }

  function loadLocalRakebackDraftRows() {
    clearStaleRakebackLocalDraftAfterTemplateReset();
    var rows = readRakebackDraftRows();
    fillRakebackTable(rows, "");
    return rows.length;
  }

  function clearInitialRakebackSeedRows() {
    if (!rakebackBody) return false;
    var rows = Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]"));
    if (!rows.length) return false;
    var onlyInitialEmptyRows = rows.every(function (row) {
      if (!row || row.getAttribute("data-rakeback-group") || row.getAttribute("data-rakeback-owner")) return false;
      var idInput = row.querySelector("[data-rakeback-player-id]");
      var rakeInput = row.querySelector("[data-rakeback-rake]");
      var percentInput = row.querySelector("[data-rakeback-percent]");
      return !String(idInput && idInput.value ? idInput.value : "").trim() &&
        parseReportNumber(rakeInput ? rakeInput.value : "") === 0 &&
        parseReportNumber(percentInput ? percentInput.value : "") === 0;
    });
    if (!onlyInitialEmptyRows) return false;
    rakebackBody.innerHTML = "";
    return true;
  }

  function refreshLocalRakebackView() {
    clearStaleRakebackLocalDraftAfterTemplateReset();
    clearInitialRakebackSeedRows();
    if (rakebackSuspendedRows.length) {
      restoreRakebackSuspendedRows();
      syncRakebackTable({ skipSort: true });
      scheduleSharedRakebackDraftLoad({ showStatus: false });
      return;
    }
    if (rakebackBody && rakebackBody.querySelector("[data-rakeback-row]")) {
      syncRakebackTable({ skipSort: true });
      scheduleSharedRakebackDraftLoad({ showStatus: false });
      return;
    }
    loadLocalRakebackDraftRows();
    scheduleSharedRakebackDraftLoad({ force: true, showStatus: false });
  }

  function runAdminReportAfterPaint(fn) {
    if (typeof fn !== "function") return;
    var raf = typeof window !== "undefined" ? window["requestAnimationFrame"] : null;
    if (typeof raf === "function") {
      raf(function () {
        setTimeout(fn, 0);
      });
      return;
    }
    setTimeout(fn, 0);
  }

  function runAdminReportWhenIdle(fn, timeout) {
    if (typeof fn !== "function") return null;
    var ric = typeof window !== "undefined" ? window["requestIdleCallback"] : null;
    if (typeof ric === "function") {
      return { type: "idle", id: ric(fn, { timeout: timeout || 1500 }) };
    }
    return { type: "timeout", id: setTimeout(fn, 0) };
  }

  function cancelAdminReportIdle(handle) {
    if (!handle) return;
    var cancelIdle = typeof window !== "undefined" ? window["cancelIdleCallback"] : null;
    if (handle.type === "idle" && typeof cancelIdle === "function") {
      cancelIdle(handle.id);
    } else {
      clearTimeout(handle.id);
    }
  }

  function setActiveTab(name) {
    if (!tabs || !panels) return;
    if (name === "sent" && !canViewSentReports()) name = "form";
    if (name === "calculations" && !canViewCalculationsReports()) name = "form";
    if (name !== "rakeback") suspendRakebackDomRows();
    tabs.forEach(function (tab) {
      var isActive = tab.getAttribute("data-admin-report-tab") === name;
      tab.classList.toggle("admin-report-tab--active", isActive);
    });
    panels.forEach(function (panel) {
      var isActive = panel.getAttribute("data-admin-report-panel") === name;
      panel.classList.toggle("admin-report-panel--active", isActive);
    });
  }

  function escapeReportHtml(s) {
    if (s == null || s === undefined) return "";
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function normalizeReportDetailName(name) {
    return String(name || "").trim().toLowerCase().replace(/\s+/g, " ");
  }

  function isReportUsdtRateFieldName(name) {
    var normalized = normalizeReportDetailName(name);
    return normalized.indexOf("курс") !== -1 && (normalized.indexOf("usdt") !== -1 || normalized.indexOf("юсдт") !== -1);
  }

  function isReportManualRakebackFieldName(name) {
    return normalizeReportDetailName(name) === "рейкбек";
  }

  function isReportAnyaSalaryFieldName(name) {
    var normalized = normalizeReportDetailName(name);
    return normalized === "аня зп" || normalized === "аня зарплата";
  }

  function getReportAnyaSalaryTotal(it) {
    return getReportExtraEntries(it).reduce(function (sum, extra) {
      if (!extra || !isReportAnyaSalaryFieldName(extra.name)) return sum;
      return sum + parseReportNumber(extra.value);
    }, 0);
  }

  function updateCalculationCashTotal() {
    if (calculationCashUpdateTimer) {
      clearTimeout(calculationCashUpdateTimer);
      calculationCashUpdateTimer = null;
    }
    var total = 0;
    if (calculationsCashInputs && calculationsCashInputs.length) {
      calculationsCashInputs.forEach(function (input) {
        total += parseReportNumber(input ? input.value : "");
      });
    }
    calculationCashTotal = total;
    if (calculationsCashTotalEl) calculationsCashTotalEl.textContent = formatReportRubleNumber(total);
    updateCalculationGrandTotal();
  }

  function scheduleCalculationCashTotal() {
    if (calculationCashUpdateTimer) clearTimeout(calculationCashUpdateTimer);
    calculationCashUpdateTimer = setTimeout(function () {
      calculationCashUpdateTimer = null;
      updateCalculationCashTotal();
    }, 80);
  }

  function getCalculationRoomWinLossTotal() {
    var total = 0;
    if (calculationsWinLossInputs && calculationsWinLossInputs.length) {
      calculationsWinLossInputs.forEach(function (input) {
        total += parseReportNumber(input ? input.value : "");
      });
    }
    return total;
  }

  function updateCalculationGrandTotal() {
    if (calculationGrandUpdateTimer) {
      clearTimeout(calculationGrandUpdateTimer);
      calculationGrandUpdateTimer = null;
    }
    if (!calculationsGrandTotalEl) return;
    var totals = calculationWeekTotals || {};
    var roomWinLossTotal = getCalculationRoomWinLossTotal();
    var grand =
      parseReportNumber(calculationCashTotal) +
      roomWinLossTotal +
      parseReportNumber(totals.deposit) +
      parseReportNumber(totals.bonuses) +
      parseReportNumber(totals.rakeback) -
      parseReportNumber(figuresRakeTotal) -
      parseReportNumber(totals.cashout) -
      parseReportNumber(totals.botExchipCashout);
    if (calculationsWinLossTotalEl) calculationsWinLossTotalEl.textContent = formatReportRubleNumber(roomWinLossTotal);
    if (calculationsRakeTotalEl) calculationsRakeTotalEl.textContent = formatReportNegativeDisplay(figuresRakeTotal);
    calculationsGrandTotalEl.textContent = formatReportRubleNumber(grand);
  }

  function scheduleCalculationGrandTotal() {
    if (calculationGrandUpdateTimer) clearTimeout(calculationGrandUpdateTimer);
    calculationGrandUpdateTimer = setTimeout(function () {
      calculationGrandUpdateTimer = null;
      updateCalculationGrandTotal();
    }, 80);
  }

  function getFiguresExtraAmountTotal() {
    var total = 0;
    if (!figuresExtrasEl) return total;
    figuresExtrasEl.querySelectorAll("[data-admin-report-figures-extra-amount]").forEach(function (input) {
      total += parseReportNumber(input ? input.value : "");
    });
    return total;
  }

  function getFiguresExtraRakeTotal() {
    var total = 0;
    if (!figuresExtrasEl) return total;
    figuresExtrasEl.querySelectorAll("[data-admin-report-figures-extra-rake]").forEach(function (input) {
      total += parseReportNumber(input ? input.value : "");
    });
    return total;
  }

  function getApproxFiguresRakebackAmount() {
    return -(getApproxFiguresRakebackBase() * getApproxFiguresRakebackRate() / 100);
  }

  function getApproxFiguresRakebackRate() {
    var selected = null;
    if (figuresApproxRateInputs && figuresApproxRateInputs.length) {
      figuresApproxRateInputs.forEach(function (input) {
        if (input && input.checked) selected = input;
      });
    }
    return parseReportNumber(selected ? selected.value : "30") || 30;
  }

  function getIssuedRakebackReportRakeTotal() {
    return issuedRakebackReportRakeTotal;
  }

  function getApproxFiguresRakebackBase() {
    return Math.max(
      0,
      parseReportNumber(figuresRakeTotal) -
        parseReportNumber(figuresApproxRomanRakeInput ? figuresApproxRomanRakeInput.value : "") -
        getFiguresExtraRakeTotal() -
        getIssuedRakebackReportRakeTotal()
    );
  }

  function syncFiguresExtraRow(row) {
    if (!row) return;
    var rakeInput = row.querySelector("[data-admin-report-figures-extra-rake]");
    var percentInput = row.querySelector("[data-admin-report-figures-extra-percent]");
    var amountInput = row.querySelector("[data-admin-report-figures-extra-amount]");
    if (!amountInput) return;
    var rakeRaw = rakeInput ? String(rakeInput.value || "").trim() : "";
    var percentRaw = percentInput ? String(percentInput.value || "").trim() : "";
    if (!rakeRaw && !percentRaw) return;
    var amount = parseReportNumber(rakeRaw) * parseReportNumber(percentRaw) / 100;
    amountInput.value = amount ? formatReportInputNumber(amount) : "";
  }

  function formatReportNegativeDisplay(value) {
    var n = parseReportNumber(value);
    if (!n) return formatReportRubleNumber(0);
    return formatReportRubleNumber(-Math.abs(n));
  }

  function updateFiguresTotals(options) {
    if (figuresTotalsUpdateTimer) {
      clearTimeout(figuresTotalsUpdateTimer);
      figuresTotalsUpdateTimer = null;
    }
    options = options || {};
    figuresRakeTotal = 0;
    figuresPercentTotal = 0;
    if (options.syncExtras !== false && figuresExtrasEl) {
      figuresExtrasEl.querySelectorAll(".admin-report-calculations__field--extra").forEach(syncFiguresExtraRow);
    }
    if (figuresRakeInputs && figuresRakeInputs.length) {
      figuresRakeInputs.forEach(function (input, index) {
        var rake = parseReportNumber(input ? input.value : "");
        var multiplier = parseReportNumber(input ? input.getAttribute("data-admin-report-figures-multiplier") : "");
        var rakeAmount = rake * (multiplier || 1);
        var rate = parseReportNumber(input ? input.getAttribute("data-admin-report-figures-rate") : "");
        var percent = -(rakeAmount * rate / 100);
        figuresRakeTotal += rakeAmount;
        figuresPercentTotal += percent;
        var out = figuresPercentOutputs && figuresPercentOutputs[index] ? figuresPercentOutputs[index] : null;
        if (out) out.textContent = formatReportRubleNumber(percent);
      });
    }
    var totals = calculationWeekTotals || {};
    if (figuresRakeTotalEl) figuresRakeTotalEl.textContent = formatReportRubleNumber(figuresRakeTotal);
    if (figuresRakeTotalMirrorEl) figuresRakeTotalMirrorEl.textContent = formatReportRubleNumber(figuresRakeTotal);
    if (figuresPercentTotalEl) figuresPercentTotalEl.textContent = formatReportRubleNumber(figuresPercentTotal);
    if (figuresPercentTotalMirrorEl) figuresPercentTotalMirrorEl.textContent = formatReportNegativeDisplay(figuresPercentTotal);
    if (figuresRakebackEl) figuresRakebackEl.textContent = formatReportNegativeDisplay(totals.rakeback);
    if (figuresBonusesEl) figuresBonusesEl.textContent = formatReportNegativeDisplay(totals.bonuses);
    if (figuresSalaryEl) figuresSalaryEl.textContent = formatReportNegativeDisplay(totals.anyaSalary);
    var approxAgentsRake = getFiguresExtraRakeTotal();
    var approxIssuedRake = getIssuedRakebackReportRakeTotal();
    var approxBase = getApproxFiguresRakebackBase();
    var approxRate = getApproxFiguresRakebackRate();
    var approxRakeback = getApproxFiguresRakebackAmount();
    var includeApproxRakeback = !!(figuresApproxRakebackEnabledInput && figuresApproxRakebackEnabledInput.checked);
    if (figuresApproxRakebackEl) figuresApproxRakebackEl.textContent = includeApproxRakeback ? formatReportRubleNumber(approxRakeback) : "0";
    if (figuresApproxTotalRakeEl) figuresApproxTotalRakeEl.textContent = formatReportRubleNumber(figuresRakeTotal);
    if (figuresApproxAgentsRakeEl) figuresApproxAgentsRakeEl.textContent = formatReportRubleNumber(approxAgentsRake);
    if (figuresApproxIssuedRakeEl) figuresApproxIssuedRakeEl.textContent = formatReportRubleNumber(approxIssuedRake);
    if (figuresApproxFormulaEl) figuresApproxFormulaEl.textContent = formatReportRubleNumber(approxBase) + " × " + formatReportInputNumber(approxRate) + "% = " + formatReportRubleNumber(approxRakeback);
    if (figuresGrandTotalEl) {
      var grand =
        figuresRakeTotal +
        figuresPercentTotal -
        parseReportNumber(totals.rakeback) -
        parseReportNumber(totals.bonuses) -
        parseReportNumber(totals.anyaSalary) -
        parseReportNumber(figuresRomanPaidInput ? figuresRomanPaidInput.value : "") +
        parseReportNumber(figuresWinLossInput ? figuresWinLossInput.value : "") -
        parseReportNumber(figuresAgentsPaidInput ? figuresAgentsPaidInput.value : "") -
        getFiguresExtraAmountTotal() +
        (includeApproxRakeback ? approxRakeback : 0);
      figuresGrandTotalEl.textContent = formatReportRubleNumber(grand);
    }
    updateCalculationGrandTotal();
  }

  function scheduleFiguresTotals(options) {
    if (figuresTotalsUpdateTimer) clearTimeout(figuresTotalsUpdateTimer);
    figuresTotalsUpdateTimer = setTimeout(function () {
      figuresTotalsUpdateTimer = null;
      updateFiguresTotals(options || { syncExtras: false });
    }, 80);
  }

  function setCalculationTotalsText(totals) {
    totals = totals || {};
    calculationWeekTotals = totals;
    if (calculationsDepositEl) calculationsDepositEl.textContent = formatReportRubleNumber(totals.deposit);
    if (calculationsBonusesEl) calculationsBonusesEl.textContent = formatReportRubleNumber(totals.bonuses);
    if (calculationsRakebackEl) calculationsRakebackEl.textContent = formatReportRubleNumber(totals.rakeback);
    if (calculationsCashoutEl) calculationsCashoutEl.textContent = formatReportNegativeDisplay(totals.cashout);
    if (calculationsBotExchipCashoutEl) calculationsBotExchipCashoutEl.textContent = formatReportNegativeDisplay(totals.botExchipCashout);
    updateCalculationGrandTotal();
    updateFiguresTotals({ syncExtras: false });
  }

  function sumCalculationReports(items, week) {
    var totals = {
      deposit: 0,
      bonuses: 0,
      rakeback: 0,
      cashout: 0,
      botExchipCashout: 0,
      anyaSalary: 0,
    };
    if (!Array.isArray(items) || !week) return totals;
    items.forEach(function (report) {
      var t = reportEffectiveTimestampMs(report);
      if (!t || t < week.start || t > week.end) return;
      totals.deposit += parseReportNumber(report && report.deposit);
      totals.bonuses += parseReportNumber(report && report.bonuses);
      totals.rakeback += getReportStoredRakebackTotal(report);
      totals.cashout += parseReportNumber(report && report.cashout);
      totals.botExchipCashout += parseReportNumber(report && report.botExchipCashout);
      totals.anyaSalary += getReportAnyaSalaryTotal(report);
    });
    return totals;
  }

  function getCalculationArchiveReportRows(report) {
    var rows = [];
    function add(label, value, negative) {
      var numeric = parseReportNumber(value);
      rows.push({
        label: label,
        value: negative ? formatReportNegativeDisplay(numeric) : formatReportRubleNumber(numeric),
        className: negative ? "admin-report-calculations__archive-row--negative" : "admin-report-calculations__archive-row--positive",
      });
    }
    add("Депозит", report && report.deposit, false);
    add("Продамус", report && report.prodamus, false);
    add("Робокасса", report && report.robokassa, false);
    add("Рома крипта", report && report.romaCrypto, false);
    add("Бот крипта деп", report && report.botCryptoDep, false);
    add("Бот Эксчип деп", report && report.botExchipDep, false);
    add("Бонусы", report && report.bonuses, false);
    add("Переводы", report && report.transfers, false);
    add("Возврат", report && report.ret, false);
    add("Сергей/Марина", report && report.sergeyMarina, false);
    add("Рейкбек", getReportStoredRakebackTotal(report), false);
    add("Выводы", report && report.cashout, true);
    add("Бот Эксчип вывод", report && report.botExchipCashout, true);
    var salaryTotal = getReportAnyaSalaryTotal(report);
    if (salaryTotal !== 0) add("ЗП", salaryTotal, true);
    getReportExtraEntries(report).forEach(function (extra) {
      if (isReportManualRakebackFieldName(extra.name)) return;
      var normalizedName = normalizeReportDetailName(extra.name);
      if (isReportAnyaSalaryFieldName(normalizedName)) return;
      rows.push({
        label: extra.name || "Доп",
        value: formatReportRubleNumber(extra.value),
        className: "admin-report-calculations__archive-row--neutral",
      });
    });
    return rows;
  }

  function renderCalculationArchiveReport(report, index) {
    var effMs = reportEffectiveTimestampMs(report);
    var dateMeta = formatRuWeekdayDateFromTs(effMs);
    var title = (dateMeta.date || report && report.date || "Без даты") + (report && report.authorName ? " · " + report.authorName : "");
    var rows = getCalculationArchiveReportRows(report).map(function (row) {
      return '<div class="admin-report-calculations__archive-report-row ' + escapeReportHtml(row.className) + '">' +
        '<span>' + escapeReportHtml(row.label) + "</span>" +
        '<output>' + escapeReportHtml(row.value) + "</output>" +
      "</div>";
    }).join("");
    var comment = report && report.comment ? (
      '<div class="admin-report-calculations__archive-comment">' +
        '<span>Комментарий</span><p>' + escapeReportHtml(report.comment) + "</p>" +
      "</div>"
    ) : "";
    return '<article class="admin-report-calculations__archive-report">' +
      '<h4>' + escapeReportHtml(String(index + 1) + ". " + title) + "</h4>" +
      '<div class="admin-report-calculations__archive-report-grid">' + rows + "</div>" +
      comment +
    "</article>";
  }

  function renderCalculationArchiveWeek(items, weekStart) {
    var week = getCalculationWeekMetaFromStart(weekStart);
    var reports = (items || []).filter(function (report) {
      var t = reportEffectiveTimestampMs(report);
      return t && t >= week.start && t <= week.end;
    }).sort(function (a, b) {
      return (reportEffectiveTimestampMs(b) || 0) - (reportEffectiveTimestampMs(a) || 0);
    });
    var totals = sumCalculationReports(reports, week);
    var totalHtml =
      '<div class="admin-report-calculations__archive-totals">' +
        '<div class="admin-report-calculations__field admin-report-calculations__field--positive"><span>Депозиты за неделю</span><output>' + escapeReportHtml(formatReportRubleNumber(totals.deposit)) + "</output></div>" +
        '<div class="admin-report-calculations__field admin-report-calculations__field--positive"><span>Бонусы</span><output>' + escapeReportHtml(formatReportRubleNumber(totals.bonuses)) + "</output></div>" +
        '<div class="admin-report-calculations__field admin-report-calculations__field--positive"><span>Рейкбек</span><output>' + escapeReportHtml(formatReportRubleNumber(totals.rakeback)) + "</output></div>" +
        '<div class="admin-report-calculations__field admin-report-calculations__field--negative"><span>Выводов игроками</span><output>' + escapeReportHtml(formatReportNegativeDisplay(totals.cashout)) + "</output></div>" +
        '<div class="admin-report-calculations__field admin-report-calculations__field--negative"><span>Выводов Эксчип бот</span><output>' + escapeReportHtml(formatReportNegativeDisplay(totals.botExchipCashout)) + "</output></div>" +
        '<div class="admin-report-calculations__field admin-report-calculations__field--negative"><span>ЗП</span><output>' + escapeReportHtml(formatReportNegativeDisplay(totals.anyaSalary)) + "</output></div>" +
      "</div>";
    var reportsHtml = reports.map(renderCalculationArchiveReport).join("");
    return '<details class="admin-report-calculations__archive-details">' +
      '<summary class="admin-report-calculations__archive-summary">Неделя ' + escapeReportHtml(week.label) + "</summary>" +
      '<div class="admin-report-calculations__archive-inner">' +
        totalHtml +
        (reportsHtml || '<p class="admin-report-calculations__archive-empty">За эту неделю отчетов пока нет.</p>') +
      "</div>" +
    "</details>";
  }

  function renderCalculationArchive(items) {
    if (!calculationsArchiveEl) return;
    var currentWeek = getCalculationWeekMeta();
    var minArchiveWeekStart = getCalculationArchiveMinWeekStart();
    var source = Array.isArray(items) ? items : [];
    var weekStarts = {};
    source.forEach(function (report) {
      var t = reportEffectiveTimestampMs(report);
      if (!t || t >= currentWeek.start) return;
      var weekStart = weekStartMsForReport(t);
      if (!Number.isFinite(weekStart)) return;
      if (weekStart < minArchiveWeekStart) return;
      weekStarts[String(weekStart)] = weekStart;
    });
    var sortedWeekStarts = Object.keys(weekStarts).map(function (key) {
      return weekStarts[key];
    }).sort(function (a, b) {
      return b - a;
    });
    calculationsArchiveEl.hidden = sortedWeekStarts.length === 0;
    calculationsArchiveEl.innerHTML = sortedWeekStarts.map(function (weekStart) {
      return renderCalculationArchiveWeek(source, weekStart);
    }).join("");
  }

  function loadCalculationsReports() {
    if (!canViewCalculationsReports()) return;
    var week = getCalculationWeekMeta();
    if (calculationsWeekLabelEl) calculationsWeekLabelEl.textContent = week.label;
    setCalculationTotalsText({});
    renderCalculationArchive(calculationReportsCache);
    var base = typeof getApiBase === "function" ? getApiBase() : "";
    if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return;
    var q = typeof pokerRafflesApiQueryLeading === "function" ? pokerRafflesApiQueryLeading() : "?initData=";
    fetch(base.replace(/\/$/, "") + "/api/admin-report-shifts" + q)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var items = (data && data.ok && data.reports) ? data.reports : [];
        calculationReportsCache = Array.isArray(items) ? items : [];
        setCalculationTotalsText(sumCalculationReports(items, week));
        renderCalculationArchive(calculationReportsCache);
      })
      .catch(function () {
        calculationReportsCache = [];
        setCalculationTotalsText({});
        renderCalculationArchive([]);
      });
  }

  function bindFiguresExtraInputs(scope) {
    if (!scope) return;
    scope.querySelectorAll("[data-admin-report-figures-extra-rake],[data-admin-report-figures-extra-percent],[data-admin-report-figures-extra-amount]").forEach(function (input) {
      input.addEventListener("input", function (e) {
        syncFiguresExtraRow(e.target && e.target.closest ? e.target.closest(".admin-report-calculations__field--extra") : null);
        scheduleFiguresTotals({ syncExtras: false });
      });
      input.addEventListener("change", function (e) {
        syncFiguresExtraRow(e.target && e.target.closest ? e.target.closest(".admin-report-calculations__field--extra") : null);
        updateFiguresTotals({ syncExtras: false });
      });
    });
  }

  function addFiguresExtraField() {
    if (!figuresExtrasEl) return;
    if (figuresSavedLocked) return;
    var template = figuresExtrasEl.querySelector(".admin-report-calculations__field--extra");
    if (!template) return;
    var clone = template.cloneNode(true);
    clone.querySelectorAll("input").forEach(function (input) { input.value = ""; });
    figuresExtrasEl.appendChild(clone);
    bindFiguresExtraInputs(clone);
    var nameInput = clone.querySelector("[data-admin-report-figures-extra-name]");
    if (nameInput && typeof nameInput.focus === "function") nameInput.focus();
    updateFiguresTotals();
  }

  function getCalculationGroupStatusEl(group) {
    var target = String(group || "");
    var found = null;
    if (calculationGroupStatusEls && calculationGroupStatusEls.length) {
      calculationGroupStatusEls.forEach(function (el) {
        if (!found && el && el.getAttribute("data-admin-report-calc-status") === target) found = el;
      });
    }
    return found;
  }

  function setCalculationsStatus(group, text) {
    var statusEl = getCalculationGroupStatusEl(group);
    if (!statusEl) return;
    statusEl.textContent = text || "";
    if (calculationsStatusTimer) clearTimeout(calculationsStatusTimer);
    if (text) {
      calculationsStatusTimer = setTimeout(function () {
        if (statusEl) statusEl.textContent = "";
      }, 1800);
    }
  }

  function setFiguresStatus(text) {
    if (!figuresSaveStatusEl) return;
    figuresSaveStatusEl.textContent = text || "";
    if (figuresStatusTimer) clearTimeout(figuresStatusTimer);
    if (text) {
      figuresStatusTimer = setTimeout(function () {
        if (figuresSaveStatusEl) figuresSaveStatusEl.textContent = "";
      }, 1800);
    }
  }

  function getCalculationGroupInputSelector(group) {
    if (group === "cash") return "[data-admin-report-calc-cash]";
    if (group === "rake") return "[data-admin-report-figures-rake]";
    if (group === "winloss") return "[data-admin-report-calc-winloss]";
    return "";
  }

  function setCalculationGroupButtons(group, locked) {
    if (calculationGroupSaveBtns && calculationGroupSaveBtns.length) {
      calculationGroupSaveBtns.forEach(function (btn) {
        if (btn && btn.getAttribute("data-admin-report-calc-save") === group) btn.hidden = locked;
      });
    }
    if (calculationGroupEditBtns && calculationGroupEditBtns.length) {
      calculationGroupEditBtns.forEach(function (btn) {
        if (btn && btn.getAttribute("data-admin-report-calc-edit") === group) btn.hidden = !locked;
      });
    }
  }

  function setCalculationGroupLocked(group, locked) {
    if (!group) return;
    calculationGroupLocks[group] = !!locked;
    var selector = getCalculationGroupInputSelector(group);
    if (calculationsRoot && selector) {
      calculationsRoot.querySelectorAll(selector).forEach(function (input) {
        input.readOnly = !!locked;
      });
    }
    setCalculationGroupButtons(group, !!locked);
  }

  function setCalculationsLocked(locked) {
    Object.keys(calculationGroupLocks).forEach(function (group) {
      setCalculationGroupLocked(group, locked);
    });
    if (calculationsRoot) {
      calculationsRoot.classList.toggle("admin-report-calculations--locked", Object.keys(calculationGroupLocks).every(function (group) {
        return calculationGroupLocks[group];
      }));
    }
  }

  function setFiguresLocked(locked) {
    figuresSavedLocked = !!locked;
    if (figuresRoot) {
      figuresRoot.querySelectorAll("input").forEach(function (input) {
        input.readOnly = input === figuresApproxRomanRakeInput ? false : figuresSavedLocked;
      });
    }
    if (figuresAddFieldBtn) figuresAddFieldBtn.disabled = figuresSavedLocked;
    if (figuresSaveBtn) figuresSaveBtn.hidden = figuresSavedLocked;
    if (figuresEditBtn) figuresEditBtn.hidden = !figuresSavedLocked;
  }

  function saveCalculationsDraftQuiet() {
    try {
      if (window.localStorage) {
        window.localStorage.setItem(getCalculationDraftKey(), JSON.stringify(collectCalculationsDraft()));
      }
    } catch (e) {}
  }

  function collectCalculationsDraft() {
    function valuesFrom(list) {
      return Array.prototype.slice.call(list || []).map(function (input) { return input ? input.value : ""; });
    }
    var extras = [];
    if (figuresExtrasEl) {
      figuresExtrasEl.querySelectorAll(".admin-report-calculations__field--extra").forEach(function (row) {
        var name = row.querySelector("[data-admin-report-figures-extra-name]");
        var rake = row.querySelector("[data-admin-report-figures-extra-rake]");
        var percent = row.querySelector("[data-admin-report-figures-extra-percent]");
        var amount = row.querySelector("[data-admin-report-figures-extra-amount]");
        extras.push({
          name: name ? name.value : "",
          rake: rake ? rake.value : "",
          percent: percent ? percent.value : "",
          amount: amount ? amount.value : "",
        });
      });
    }
    return {
      cash: valuesFrom(calculationsCashInputs),
      roomWinLoss: valuesFrom(calculationsWinLossInputs),
      rake: valuesFrom(figuresRakeInputs),
      romanPaid: figuresRomanPaidInput ? figuresRomanPaidInput.value : "",
      winLoss: figuresWinLossInput ? figuresWinLossInput.value : "",
      agentsPaid: figuresAgentsPaidInput ? figuresAgentsPaidInput.value : "",
      approxRakebackEnabled: !!(figuresApproxRakebackEnabledInput && figuresApproxRakebackEnabledInput.checked),
      approxRakebackRate: getApproxFiguresRakebackRate(),
      approxRomanRake: figuresApproxRomanRakeInput ? figuresApproxRomanRakeInput.value : "",
      extras: extras,
    };
  }

  function ensureFiguresExtraRows(count) {
    if (!figuresExtrasEl) return;
    var rows = Array.prototype.slice.call(figuresExtrasEl.querySelectorAll(".admin-report-calculations__field--extra"));
    if (!rows.length) return;
    var target = Math.max(1, count || 1);
    while (rows.length < target) {
      var clone = rows[0].cloneNode(true);
      clone.querySelectorAll("input").forEach(function (input) { input.value = ""; });
      figuresExtrasEl.appendChild(clone);
      rows.push(clone);
      bindFiguresExtraInputs(clone);
    }
    while (rows.length > target) {
      var row = rows.pop();
      if (row && row.parentNode) row.parentNode.removeChild(row);
    }
  }

  function applyCalculationsDraft(draft) {
    if (!draft) return false;
    var cash = Array.isArray(draft.cash) ? draft.cash : [];
    if (calculationsCashInputs && calculationsCashInputs.length) {
      calculationsCashInputs.forEach(function (input, index) {
        if (input) input.value = cash[index] != null ? cash[index] : "";
      });
    }
    var roomWinLoss = Array.isArray(draft.roomWinLoss) ? draft.roomWinLoss : [];
    if (calculationsWinLossInputs && calculationsWinLossInputs.length) {
      calculationsWinLossInputs.forEach(function (input, index) {
        if (input) input.value = roomWinLoss[index] != null ? roomWinLoss[index] : "";
      });
    }
    var rake = Array.isArray(draft.rake) ? draft.rake : [];
    if (figuresRakeInputs && figuresRakeInputs.length) {
      figuresRakeInputs.forEach(function (input, index) {
        if (input) input.value = rake[index] != null ? rake[index] : "";
      });
    }
    if (figuresRomanPaidInput) figuresRomanPaidInput.value = draft.romanPaid != null ? draft.romanPaid : "";
    if (figuresWinLossInput) figuresWinLossInput.value = draft.winLoss != null ? draft.winLoss : "";
    if (figuresAgentsPaidInput) figuresAgentsPaidInput.value = draft.agentsPaid != null ? draft.agentsPaid : "";
    if (figuresApproxRakebackEnabledInput) figuresApproxRakebackEnabledInput.checked = draft.approxRakebackEnabled === true;
    if (figuresApproxRateInputs && figuresApproxRateInputs.length) {
      var draftRate = parseReportNumber(draft.approxRakebackRate != null ? draft.approxRakebackRate : "30") || 30;
      figuresApproxRateInputs.forEach(function (input) {
        if (input) input.checked = parseReportNumber(input.value) === draftRate;
      });
    }
    if (figuresApproxRomanRakeInput) figuresApproxRomanRakeInput.value = draft.approxRomanRake != null ? draft.approxRomanRake : "";
    var extras = Array.isArray(draft.extras) ? draft.extras : [];
    ensureFiguresExtraRows(extras.length || 1);
    if (figuresExtrasEl) {
      figuresExtrasEl.querySelectorAll(".admin-report-calculations__field--extra").forEach(function (row, index) {
        var extra = extras[index] || {};
        var name = row.querySelector("[data-admin-report-figures-extra-name]");
        var rake = row.querySelector("[data-admin-report-figures-extra-rake]");
        var percent = row.querySelector("[data-admin-report-figures-extra-percent]");
        var amount = row.querySelector("[data-admin-report-figures-extra-amount]");
        if (name) name.value = extra.name != null ? extra.name : "";
        if (rake) rake.value = extra.rake != null ? extra.rake : "";
        if (percent) percent.value = extra.percent != null ? extra.percent : "";
        if (amount) amount.value = extra.amount != null ? extra.amount : "";
      });
    }
    updateCalculationCashTotal();
    updateFiguresTotals();
    setCalculationsLocked(true);
    setFiguresLocked(true);
    return true;
  }

  function loadCalculationsDraft() {
    var raw = null;
    try {
      raw = window.localStorage ? window.localStorage.getItem(getCalculationDraftKey()) : null;
    } catch (e) {}
    if (!raw) {
      setCalculationsLocked(false);
      setFiguresLocked(false);
      return false;
    }
    try {
      return applyCalculationsDraft(JSON.parse(raw));
    } catch (eParse) {
      setCalculationsLocked(false);
      setFiguresLocked(false);
      return false;
    }
  }

  function hydrateCalculationsDraftOnce() {
    if (calculationsDraftHydrated) return;
    calculationsDraftHydrated = true;
    var loaded = loadCalculationsDraft();
    if (!loaded) {
      updateCalculationCashTotal();
      updateFiguresTotals();
    }
  }

  function saveCalculationsDraft(group) {
    group = group || "cash";
    try {
      if (window.localStorage) {
        window.localStorage.setItem(getCalculationDraftKey(), JSON.stringify(collectCalculationsDraft()));
      }
      setCalculationGroupLocked(group, true);
      setCalculationsStatus(group, "Сохранено");
    } catch (e) {
      setCalculationsStatus(group, "Не удалось сохранить");
    }
  }

  function editCalculationsDraft(group) {
    group = group || "cash";
    setCalculationGroupLocked(group, false);
    setCalculationsStatus(group, "Редактирование");
  }

  function saveFiguresDraft() {
    try {
      if (window.localStorage) {
        window.localStorage.setItem(getCalculationDraftKey(), JSON.stringify(collectCalculationsDraft()));
      }
      setFiguresLocked(true);
      setFiguresStatus("Сохранено");
    } catch (e) {
      setFiguresStatus("Не удалось сохранить");
    }
  }

  function editFiguresDraft() {
    setFiguresLocked(false);
    setFiguresStatus("Редактирование");
  }

  function getReportExtraEntries(it) {
    var entries = [];
    if (!it) return entries;
    if (Array.isArray(it.extraFields) && it.extraFields.length) {
      it.extraFields.forEach(function (f) {
        if (!f || !(f.name || f.amount != null && f.amount !== "")) return;
        entries.push({ name: f.name || "Доп", value: f.amount != null ? f.amount : "" });
      });
    } else if (it.extraName || it.extraAmount != null) {
      entries.push({ name: it.extraName || "Доп", value: it.extraAmount != null ? it.extraAmount : "" });
    }
    return entries;
  }

  function getReportUsdtRate(it) {
    var entries = getReportExtraEntries(it);
    for (var i = 0; i < entries.length; i++) {
      if (!isReportUsdtRateFieldName(entries[i].name)) continue;
      var rate = parseReportNumber(entries[i].value);
      if (rate > 0) return rate;
    }
    return 0;
  }

  function buildReportDetailHtml(it) {
    var labels = { deposit: "Депозит", cashout: "Выводы", prodamus: "Продамус", robokassa: "Робокасса", romaCrypto: "Рома крипта", botCryptoDep: "Боткрипта", botExchipDep: "Ботэксчип деп", botExchipCashout: "Ботэксчип вывод", bonuses: "Бонусы", transfers: "Переводы", ret: "Возврат", sergeyMarina: "Сергей/Марина", rakeback: "Рейкбек" };
    var depositChildren = ["cashout", "prodamus", "robokassa", "romaCrypto", "botCryptoDep", "botExchipDep", "sergeyMarina"];
    var parts = [];
    function hasReportValue(value) {
      return value != null && value !== "" && (typeof value !== "number" || value !== 0);
    }
    function buildDetailBlock(className, entries) {
      if (!entries.length) return "";
      return '<div class="admin-report-sent-detail__field-block ' + className + '">' + entries.map(function (entry) {
        return '<div class="admin-report-sent-detail__field-block-row">' +
          '<span class="admin-report-sent-detail__label">' + escapeReportHtml(entry.label) + "</span>" +
          '<span class="admin-report-sent-detail__value">' + escapeReportHtml(entry.value) + "</span>" +
        "</div>";
      }).join("") + "</div>";
    }
    var childParts = [];
    var childTotal = 0;
    depositChildren.forEach(function (k) {
      if (!hasReportValue(it[k])) return;
      childTotal += parseReportNumber(it[k]);
      childParts.push(
        '<div class="admin-report-sent-detail__deposit-child admin-report-sent-detail__deposit-child--' + escapeReportHtml(k) + '">' +
          '<span class="admin-report-sent-detail__deposit-child-label">' + escapeReportHtml(labels[k]) + "</span>" +
          '<span class="admin-report-sent-detail__deposit-child-value">' + escapeReportHtml(it[k]) + "</span>" +
        "</div>"
      );
    });
    var anyaSalaryTotal = getReportAnyaSalaryTotal(it);
    if (anyaSalaryTotal !== 0) {
      childTotal += anyaSalaryTotal;
      childParts.push(
        '<div class="admin-report-sent-detail__deposit-child admin-report-sent-detail__deposit-child--anya-salary">' +
          '<span class="admin-report-sent-detail__deposit-child-label">Аня ЗП</span>' +
          '<span class="admin-report-sent-detail__deposit-child-value">' + escapeReportHtml(formatReportRubleNumber(anyaSalaryTotal)) + "</span>" +
        "</div>"
      );
    }
    if (childParts.length) {
      var depositValue = hasReportValue(it.deposit) ? parseReportNumber(it.deposit) : 0;
      childParts.push(
        '<div class="admin-report-sent-detail__deposit-child admin-report-sent-detail__deposit-child--summary">' +
          '<span class="admin-report-sent-detail__deposit-child-label">Итого</span>' +
          '<span class="admin-report-sent-detail__deposit-child-value">' + escapeReportHtml(formatReportRubleNumber(childTotal)) + "</span>" +
        "</div>" +
        '<div class="admin-report-sent-detail__deposit-child admin-report-sent-detail__deposit-child--summary">' +
          '<span class="admin-report-sent-detail__deposit-child-label">Разница с депозитом</span>' +
          '<span class="admin-report-sent-detail__deposit-child-value">' + escapeReportHtml(formatReportRubleNumber(depositValue - childTotal)) + "</span>" +
        "</div>"
      );
    }
    if (hasReportValue(it.deposit) || childParts.length) {
      parts.push(
        '<div class="admin-report-sent-detail__deposit-group">' +
          '<div class="admin-report-sent-detail__deposit-main">' +
            '<span class="admin-report-sent-detail__label">Депозит</span>' +
            '<span class="admin-report-sent-detail__value">' + escapeReportHtml(hasReportValue(it.deposit) ? it.deposit : 0) + "</span>" +
          "</div>" +
          (childParts.length ? '<div class="admin-report-sent-detail__deposit-subcolumn">' + childParts.join("") + "</div>" : "") +
        "</div>"
      );
    }
    var expenseEntries = [];
    var otherEntries = [];
    var calcEntries = [];
    var anyaEntries = [];
    function pushEntry(list, label, value, roundValue) {
      if (!hasReportValue(value)) return;
      list.push({ label: label, value: roundValue ? formatReportRubleNumber(value) : String(value) });
    }
    if (hasReportValue(it.botExchipDep) || hasReportValue(it.botExchipCashout)) {
      var exchipDep = parseReportNumber(it.botExchipDep);
      var exchipCashout = parseReportNumber(it.botExchipCashout);
      calcEntries.push({
        label: "Итого Эксчип",
        value: formatReportRubleNumber(exchipDep) + " - " + formatReportRubleNumber(exchipCashout) + " = " + formatReportRubleNumber(exchipDep - exchipCashout),
      });
    }
    pushEntry(expenseEntries, labels.bonuses, it.bonuses, false);
    pushEntry(expenseEntries, labels.rakeback, getReportStoredRakebackTotal(it), true);
    pushEntry(otherEntries, labels.botExchipCashout, it.botExchipCashout, false);
    pushEntry(otherEntries, labels.transfers, it.transfers, false);
    pushEntry(otherEntries, labels.ret, it.ret, false);
    getReportExtraEntries(it).forEach(function (extra) {
      var normalizedName = normalizeReportDetailName(extra.name);
      if (isReportManualRakebackFieldName(extra.name)) return;
      var entry = { label: extra.name, value: String(extra.value) };
      if (isReportAnyaSalaryFieldName(normalizedName)) anyaEntries.push(entry);
      else otherEntries.push(entry);
    });
    parts.push(buildDetailBlock("admin-report-sent-detail__field-block--calc", calcEntries));
    parts.push(buildDetailBlock("admin-report-sent-detail__field-block--danger", expenseEntries.concat(anyaEntries)));
    parts.push(buildDetailBlock("admin-report-sent-detail__field-block--other", otherEntries));
    // Раньше здесь была строка с общим итогом по смене ("Итого, ₽").
    // По просьбе убираем её из детального вида отчёта.
    return parts.join("");
  }

  function loadSentReports(forceRefresh) {
    if (!sentList) return;
    if (!canViewSentReports()) {
      sentList.innerHTML = "";
      return;
    }
    if (!forceRefresh && sentReportsLoading) return;
    if (!forceRefresh && sentReportsLoadedAt && sentList.innerHTML && Date.now() - sentReportsLoadedAt < SENT_REPORTS_CACHE_TTL_MS) return;
    var base = typeof getApiBase === "function" ? getApiBase() : "";
    if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
      sentList.innerHTML = '<p class="admin-report-sent-empty">Не удалось загрузить отчёты (войдите в Telegram или PWA).</p>';
      return;
    }
    sentList.innerHTML = '<p class="admin-report-sent-empty">Загрузка…</p>';
    sentReportsLoading = true;
    var q = typeof pokerRafflesApiQueryLeading === "function" ? pokerRafflesApiQueryLeading() : "?initData=";
    fetch(base.replace(/\/$/, "") + "/api/admin-report-shifts" + q)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        sentReportsLoading = false;
        if (!sentList) return;
        var items = (data && data.ok && data.reports) ? data.reports : [];
        if (!Array.isArray(items) || items.length === 0) {
          sentList.innerHTML = '<p class="admin-report-sent-empty">Пока нет отправленных отчётов.</p>';
          sentReportsLoadedAt = Date.now();
          return;
        }
        var weekdayOrder = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
        var weekdayOrderDesc = weekdayOrder.slice().reverse();
        var DAY_MS = 24 * 60 * 60 * 1000;
        var WEEK_MS = 7 * DAY_MS;
        var MSK_SHIFT_MS = 3 * 60 * 60 * 1000;
        function mskDateFromTs(ts) {
          return new Date(ts + MSK_SHIFT_MS);
        }
        function formatRuMonthDay(ms, withMonth) {
          return new Intl.DateTimeFormat("ru-RU", {
            timeZone: "Europe/Moscow",
            day: "numeric",
            month: withMonth ? "long" : undefined,
          }).format(new Date(ms));
        }
        function weekLabelFromStartMs(weekStartMs) {
          var weekEndDateMs = weekStartMs + (6 * DAY_MS);
          var fromMonth = new Intl.DateTimeFormat("ru-RU", { timeZone: "Europe/Moscow", month: "long" }).format(new Date(weekStartMs));
          var toMonth = new Intl.DateTimeFormat("ru-RU", { timeZone: "Europe/Moscow", month: "long" }).format(new Date(weekEndDateMs));
          var fromDay = formatRuMonthDay(weekStartMs, false);
          var toDay = formatRuMonthDay(weekEndDateMs, false);
          if (fromMonth === toMonth) return fromDay + "–" + toDay + " " + toMonth;
          return formatRuMonthDay(weekStartMs, true) + " – " + formatRuMonthDay(weekEndDateMs, true);
        }
        function weekCompactLabelFromStartMs(weekStartMs) {
          var weekEndDateMs = weekStartMs + (6 * DAY_MS);
          var fromCompact = formatRuMonthDay(weekStartMs, true).replace(/\s+/g, "");
          var toCompact = formatRuMonthDay(weekEndDateMs, true).replace(/\s+/g, "");
          return fromCompact + "-" + toCompact;
        }
        /** Неделя отчётных дат: Пн -> Вс; реальный переход недели происходит в Пн 16:00 МСК. */
        function weekStartMsForReport(ts) {
          var msk = mskDateFromTs(ts);
          var y = msk.getUTCFullYear();
          var m = msk.getUTCMonth();
          var d = msk.getUTCDate();
          var wd = msk.getUTCDay(); // 0=Вс..6=Сб
          var daysFromMonday = (wd + 6) % 7;
          var mondayStartMskMs = Date.UTC(y, m, d, 0, 0, 0, 0) - daysFromMonday * DAY_MS;
          return mondayStartMskMs - MSK_SHIFT_MS;
        }
        function weekMetaFromStart(weekStartMs) {
          return {
            start: weekStartMs,
            end: weekStartMs + WEEK_MS - 1,
            label: weekLabelFromStartMs(weekStartMs),
            key: "w-" + String(weekStartMs),
          };
        }
        var currentWeekTs = reportBusinessTimestampMs(Date.now());
        var currentWeek = weekMetaFromStart(weekStartMsForReport(currentWeekTs));

        function emptyWeekTotals() {
          return {
            deposit: 0, cashout: 0, prodamus: 0, robokassa: 0, romaCrypto: 0,
            botCryptoDep: 0, botExchipDep: 0, botExchipCashout: 0,
            bonuses: 0, transfers: 0, ret: 0, sergeyMarina: 0, rakeback: 0
          };
        }

        function addNumericToTotals(totals, r) {
          Object.keys(totals).forEach(function (k) {
            if (k === "extraFields") return;
            var v = k === "rakeback" ? getReportStoredRakebackTotal(r) : r[k];
            if (v == null || v === "") return;
            var n = typeof v === "number" ? v : parseFloat(String(v).replace(",", "."));
            if (!isNaN(n)) totals[k] += n;
          });
        }

        function sumReportsInWindow(allItems, fromMs, toMs) {
          var weekTotals = emptyWeekTotals();
          var extraMap = {};
          allItems.forEach(function (r) {
            var t = reportEffectiveTimestampMs(r);
            if (!t || t < fromMs || t > toMs) return;
            addNumericToTotals(weekTotals, r);
            mergeReportExtrasIntoMap(extraMap, r);
          });
          weekTotals.extraFields = Object.keys(extraMap).sort().map(function (name) {
            var value = extraMap[name];
            if (value && value.__avg) value = value.count ? value.sum / value.count : 0;
            return { name: name, amount: value };
          }).filter(function (f) {
            return f.amount !== 0 && !isNaN(f.amount);
          });
          return weekTotals;
        }

        function buildDaysHtmlFromList(list, idPrefix) {
          if (!list || list.length === 0) return "";
          var byDay = {};
          list.forEach(function (r) {
            var eff = reportEffectiveTimestampMs(r);
            var meta = formatRuWeekdayDateFromTs(eff);
            var d = (meta.weekday || "").trim() || "—";
            if (!byDay[d]) byDay[d] = [];
            byDay[d].push(r);
          });
          var daysToRender = weekdayOrderDesc.filter(function (d) { return byDay[d] && byDay[d].length > 0; });
          Object.keys(byDay).forEach(function (d) {
            if (weekdayOrder.indexOf(d) === -1) daysToRender.push(d);
          });
          var parts = [];
          daysToRender.forEach(function (day) {
            var listDay = byDay[day];
            if (!listDay || listDay.length === 0) return;
            listDay.sort(function (a, b) {
              var ta = a.createdAt ? new Date(a.createdAt).getTime() : 0;
              var tb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
              return tb - ta;
            });
            parts.push("<div class=\"admin-report-sent-day\"><div class=\"admin-report-sent-day-title\">" + escapeReportHtml(day) + "</div>");
            listDay.forEach(function (it, idx) {
              var who = it.authorName || "";
              var comment = it.comment || "";
              var id = idPrefix + (it.id || day + "-" + idx);
              var detailHtml = buildReportDetailHtml(it);
              var reportId = (it.id || "").toString();
              var effMs = reportEffectiveTimestampMs(it);
              var dispDate = formatRuWeekdayDateFromTs(effMs).date || it.date || "";
              parts.push("<div class=\"admin-report-sent-item\" data-report-id=\"" + escapeReportHtml(reportId) + "\"><div class=\"admin-report-sent-item__head\" role=\"button\" tabindex=\"0\" aria-expanded=\"false\" aria-controls=\"" + id + "-detail\"><span class=\"admin-report-sent-item__date\">" + escapeReportHtml(dispDate) + "</span><span class=\"admin-report-sent-item__who\">" + escapeReportHtml(who) + "</span><span class=\"admin-report-sent-item__actions\"><button type=\"button\" class=\"admin-report-sent-edit-btn\" data-report-id=\"" + escapeReportHtml(reportId) + "\" title=\"Редактировать\">✎</button><button type=\"button\" class=\"admin-report-sent-delete-btn\" data-report-id=\"" + escapeReportHtml(reportId) + "\" title=\"Удалить\">✕</button></span><span class=\"admin-report-sent-item__toggle\" aria-hidden=\"true\">▼</span></div><div class=\"admin-report-sent-detail\" id=\"" + id + "-detail\" hidden><div class=\"admin-report-sent-detail__inner\">" + (comment ? "<div class=\"admin-report-sent-detail__row\"><span class=\"admin-report-sent-detail__label\">Комментарий</span><span class=\"admin-report-sent-detail__value\">" + escapeReportHtml(comment) + "</span></div>" : "") + detailHtml + "</div></div></div>");
            });
            parts.push("</div>");
          });
          return parts.join("");
        }
        function buildDaysSpoilersHtmlFromList(list, idPrefix) {
          if (!list || list.length === 0) return '<p class="admin-report-sent-period-hint">В этой неделе отчётов по дням пока нет.</p>';
          var byDay = {};
          list.forEach(function (r) {
            var eff = reportEffectiveTimestampMs(r);
            var meta = formatRuWeekdayDateFromTs(eff);
            var d = (meta.weekday || "").trim() || "—";
            if (!byDay[d]) byDay[d] = [];
            byDay[d].push(r);
          });
          var daysToRender = weekdayOrderDesc.filter(function (d) { return byDay[d] && byDay[d].length > 0; });
          Object.keys(byDay).forEach(function (d) {
            if (weekdayOrder.indexOf(d) === -1) daysToRender.push(d);
          });
          var parts = [];
          daysToRender.forEach(function (day) {
            var listDay = byDay[day];
            if (!listDay || listDay.length === 0) return;
            listDay.sort(function (a, b) {
              var ta = a.createdAt ? new Date(a.createdAt).getTime() : 0;
              var tb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
              return tb - ta;
            });
            parts.push('<details class="admin-report-sent-day-spoiler">');
            parts.push('<summary class="admin-report-sent-day-title">' + escapeReportHtml(day) + "</summary>");
            parts.push('<div class="admin-report-sent-day-spoiler__inner">');
            listDay.forEach(function (it, idx) {
              var who = it.authorName || "";
              var comment = it.comment || "";
              var id = idPrefix + (it.id || day + "-" + idx);
              var detailHtml = buildReportDetailHtml(it);
              var reportId = (it.id || "").toString();
              var effMs = reportEffectiveTimestampMs(it);
              var dispDate = formatRuWeekdayDateFromTs(effMs).date || it.date || "";
              parts.push("<div class=\"admin-report-sent-item\" data-report-id=\"" + escapeReportHtml(reportId) + "\"><div class=\"admin-report-sent-item__head\" role=\"button\" tabindex=\"0\" aria-expanded=\"false\" aria-controls=\"" + id + "-detail\"><span class=\"admin-report-sent-item__date\">" + escapeReportHtml(dispDate) + "</span><span class=\"admin-report-sent-item__who\">" + escapeReportHtml(who) + "</span><span class=\"admin-report-sent-item__actions\"><button type=\"button\" class=\"admin-report-sent-edit-btn\" data-report-id=\"" + escapeReportHtml(reportId) + "\" title=\"Редактировать\">✎</button><button type=\"button\" class=\"admin-report-sent-delete-btn\" data-report-id=\"" + escapeReportHtml(reportId) + "\" title=\"Удалить\">✕</button></span><span class=\"admin-report-sent-item__toggle\" aria-hidden=\"true\">▼</span></div><div class=\"admin-report-sent-detail\" id=\"" + id + "-detail\" hidden><div class=\"admin-report-sent-detail__inner\">" + (comment ? "<div class=\"admin-report-sent-detail__row\"><span class=\"admin-report-sent-detail__label\">Комментарий</span><span class=\"admin-report-sent-detail__value\">" + escapeReportHtml(comment) + "</span></div>" : "") + detailHtml + "</div></div></div>");
            });
            parts.push("</div></details>");
          });
          return parts.join("");
        }

        function buildWeekTotalRow(weekTotals, label, weekId) {
          var hasNumeric = Object.keys(weekTotals).some(function (k) {
            if (k === "extraFields") return false;
            return typeof weekTotals[k] === "number" && weekTotals[k] !== 0;
          });
          var hasExtra = weekTotals.extraFields && weekTotals.extraFields.length > 0;
          if (!hasNumeric && !hasExtra) return "";
          var weekDetail = buildReportDetailHtml(weekTotals);
          return (
            '<div class="admin-report-sent-day admin-report-sent-week-total">' +
              '<div class="admin-report-sent-item admin-report-sent-item--week">' +
                '<div class="admin-report-sent-item__head" role="button" tabindex="0" aria-expanded="false" aria-controls="' + weekId + '-detail">' +
                  '<span class="admin-report-sent-item__date">Итого за неделю ' + escapeReportHtml(label) + "</span>" +
                  '<button type="button" class="admin-report-week-copy-btn" data-week-id="' + escapeReportHtml(weekId) + '" title="Скопировать итог за неделю">⧉</button>' +
                  '<span class="admin-report-sent-item__toggle" aria-hidden="true">▼</span>' +
                "</div>" +
                '<div class="admin-report-sent-detail" id="' + weekId + '-detail" hidden>' +
                  '<div class="admin-report-sent-detail__inner">' + weekDetail + "</div>" +
                "</div>" +
              "</div>" +
            "</div>"
          );
        }

        var weeksByKey = {};
        items.forEach(function (r) {
          var eff = reportEffectiveTimestampMs(r);
          if (!eff || eff !== eff) return;
          var ws = weekStartMsForReport(eff);
          var key = String(ws);
          if (!weeksByKey[key]) weeksByKey[key] = [];
          weeksByKey[key].push(r);
        });
        var weekStartsDesc = Object.keys(weeksByKey).map(function (s) {
          return Number(s);
        }).filter(function (n) {
          return n === n;
        }).sort(function (a, b) {
          return b - a;
        });
        var currentItems = weeksByKey[String(currentWeek.start)] || [];
        var archiveWeekStarts = weekStartsDesc.filter(function (ws) {
          return ws !== currentWeek.start;
        });
        function buildWeekBlock(weekStartMs, list, idPrefixBase, isCurrent) {
          var meta = weekMetaFromStart(weekStartMs);
          var totals = sumReportsInWindow(list || [], meta.start, meta.end);
          var detailsHtml = buildDaysSpoilersHtmlFromList(list, idPrefixBase + meta.key + "-");
          var totalDetailHtml = buildReportDetailHtml(totals);
          return {
            html:
              '<details class="admin-report-sent-week"' + (isCurrent ? " open" : "") + ">" +
                '<summary class="admin-report-sent-archive__summary">Неделя ' + escapeReportHtml(weekCompactLabelFromStartMs(meta.start)) + "</summary>" +
                '<div class="admin-report-sent-week__inner">' +
                  '<details class="admin-report-sent-week-subspoiler"' + (isCurrent ? " open" : "") + ">" +
                    '<summary class="admin-report-sent-day-title">Итого по неделе' +
                      '<button type="button" class="admin-report-week-copy-btn" data-week-id="' + escapeReportHtml("ar-week-" + meta.key) + '" title="Скопировать итог за неделю">⧉</button>' +
                    "</summary>" +
                    '<div class="admin-report-sent-week-subspoiler__inner">' +
                      (totalDetailHtml ? '<div class="admin-report-sent-detail__inner">' + totalDetailHtml + "</div>" : '<p class="admin-report-sent-period-hint">Итогов за неделю пока нет.</p>') +
                    "</div>" +
                  "</details>" +
                  '<details class="admin-report-sent-week-subspoiler">' +
                    '<summary class="admin-report-sent-day-title">По дням</summary>' +
                    '<div class="admin-report-sent-week-subspoiler__inner">' + detailsHtml + "</div>" +
                  "</details>" +
                "</div>" +
              "</details>",
            weekId: "ar-week-" + meta.key,
            totals: totals,
            label: meta.label,
          };
        }

        var currentBlock = buildWeekBlock(currentWeek.start, currentItems, "ar-cur-", true);
        var html = [];
        html.push('<div class="admin-report-sent-current">');
        html.push(currentBlock.html);
        html.push("</div>");

        if (archiveWeekStarts.length > 0) {
          html.push(
            '<details class="admin-report-sent-archive" data-admin-report-sent-archive>' +
              '<summary class="admin-report-sent-archive__summary">Прошлые недели</summary>' +
              '<div class="admin-report-sent-archive__inner">' +
              '<p class="admin-report-sent-period-hint">Откройте, чтобы загрузить прошлые недели.</p>' +
              "</div></details>"
          );
        }

        sentList.innerHTML = html.join("");
        sentReportsLoadedAt = Date.now();

        var reportById = {};
        items.forEach(function (r) { reportById[r.id] = r; });
        var weekTotalsById = {};
        weekTotalsById[currentBlock.weekId] = { totals: currentBlock.totals, label: currentBlock.label };
        var weekLabels = {
          deposit: "Депозит",
          cashout: "Выводы",
          prodamus: "Продамус",
          robokassa: "Робокасса",
          romaCrypto: "Рома крипта",
          botCryptoDep: "Бот крипта деп",
          botExchipDep: "Бот эксчип деп",
          botExchipCashout: "Бот эксчип вывод",
          bonuses: "Бонусы",
          transfers: "Переводы",
          ret: "Возврат",
          sergeyMarina: "Сергей/Марина",
          rakeback: "Рейкбек",
        };
        var weekKeys = ["deposit", "cashout", "prodamus", "robokassa", "romaCrypto", "botCryptoDep", "botExchipDep", "botExchipCashout", "bonuses", "transfers", "ret", "sergeyMarina", "rakeback"];

        function copyTextToClipboard(text) {
          if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text);
          var ta = document.createElement("textarea");
          ta.value = text;
          ta.setAttribute("readonly", "true");
          ta.style.position = "fixed";
          ta.style.top = "-1000px";
          ta.style.left = "-1000px";
          document.body.appendChild(ta);
          ta.select();
          try {
            document.execCommand("copy");
          } catch (e) {}
          try {
            document.body.removeChild(ta);
          } catch (e2) {}
        }

        function weekTotalsToText(totals, label) {
          var lines = [];
          if (!totals) return "";
          lines.push("Итого за неделю " + label);
          weekKeys.forEach(function (k) {
            var v = totals[k];
            if (v != null && v !== "" && (typeof v !== "number" || v !== 0)) lines.push(weekLabels[k] + ": " + (k === "rakeback" ? formatReportRubleNumber(v) : String(v)));
          });
          if (totals.extraFields && totals.extraFields.length) {
            totals.extraFields.forEach(function (f) {
              if (!f) return;
              var name = f.name != null ? String(f.name).trim() : "";
              if (!name) name = "Доп.";
              var a = f.amount != null ? f.amount : "";
              if (a === "" || a === "—") return;
              lines.push(name + ": " + String(a));
            });
          }
          return lines.join("\n");
        }

        function bindSentReportControls(scope) {
          scope = scope || sentList;
          if (!scope) return;
          scope.querySelectorAll(".admin-report-week-copy-btn").forEach(function (btn) {
            if (btn.getAttribute("data-admin-report-bound") === "1") return;
            btn.setAttribute("data-admin-report-bound", "1");
            btn.addEventListener("click", function (e) {
              e.preventDefault();
              e.stopPropagation();
              var weekId = btn.getAttribute("data-week-id") || "";
              var info = weekTotalsById[weekId];
              if (!info || !info.totals) return;
              var text = weekTotalsToText(info.totals, info.label);
              copyTextToClipboard(text);
              var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
              if (tg && tg.showAlert) tg.showAlert("Скопировано");
            });
          });

          scope.querySelectorAll(".admin-report-sent-item__head").forEach(function (head) {
            if (head.getAttribute("data-admin-report-bound") === "1") return;
            head.setAttribute("data-admin-report-bound", "1");
            head.addEventListener("click", function (e) {
              if (e.target.closest(".admin-report-sent-edit-btn") || e.target.closest(".admin-report-sent-delete-btn")) return;
              var item = head.closest(".admin-report-sent-item");
              if (!item) return;
              var detail = item.querySelector(".admin-report-sent-detail");
              var toggle = head.querySelector(".admin-report-sent-item__toggle");
              var isOpen = !detail.hidden;
              detail.hidden = isOpen;
              head.setAttribute("aria-expanded", !isOpen);
              if (toggle) toggle.textContent = isOpen ? "▼" : "▲";
            });
          });

          scope.querySelectorAll(".admin-report-sent-edit-btn").forEach(function (editBtn) {
            if (editBtn.getAttribute("data-admin-report-bound") === "1") return;
            editBtn.setAttribute("data-admin-report-bound", "1");
            editBtn.addEventListener("click", function (e) {
              e.preventDefault();
              e.stopPropagation();
              var id = editBtn.getAttribute("data-report-id");
              var report = reportById[id];
              if (!report) return;
              editingReportId = id;
              editingReport = report;
              fillReportForm(report);
              if (submitBtn) submitBtn.textContent = "Сохранить";
              setActiveTab("form");
              if (dateEl) {
                var effEd = reportEffectiveTimestampMs(report);
                var metaEd = formatRuWeekdayDateFromTs(effEd);
                var editDateLabel = metaEd.weekday && metaEd.date ? metaEd.weekday + ", " + metaEd.date : (report.weekday || "") + ", " + (report.date || "");
                dateEl.textContent = formatAdminReportDateLabel(editDateLabel);
              }
            });
          });

          scope.querySelectorAll(".admin-report-sent-delete-btn").forEach(function (delBtn) {
            if (delBtn.getAttribute("data-admin-report-bound") === "1") return;
            delBtn.setAttribute("data-admin-report-bound", "1");
            delBtn.addEventListener("click", function (e) {
              e.preventDefault();
              e.stopPropagation();
              var id = delBtn.getAttribute("data-report-id");
              var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
              function doDelete(reportId) {
                var base = typeof getApiBase === "function" ? getApiBase() : "";
                if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
                  if (tg && tg.showAlert) tg.showAlert("Войдите в приложение (Telegram или PWA), чтобы удалить отчёт.");
                  return;
                }
                var delBody =
                  typeof pokerGuestOrAuthedPostBody === "function"
                    ? pokerGuestOrAuthedPostBody({ action: "delete", id: reportId })
                    : { action: "delete", id: reportId };
                fetch(base.replace(/\/$/, "") + "/api/admin-report-shifts", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(delBody)
                })
                  .then(function (r) { return r.json(); })
                  .then(function (data) {
                    if (data && data.ok) loadSentReports(true);
                    else if (tg && tg.showAlert) tg.showAlert((data && data.error) || "Не удалось удалить.");
                  })
                  .catch(function () {
                    if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
                  });
              }
              if (typeof confirm === "function") {
                if (confirm("Удалить этот отчёт?")) doDelete(id);
              } else if (tg && tg.showConfirm) {
                tg.showConfirm("Удалить этот отчёт?", function (ok) { if (ok) doDelete(id); });
              }
            });
          });
        }

        bindSentReportControls(sentList);
        var archiveEl = sentList.querySelector("[data-admin-report-sent-archive]");
        if (archiveEl) {
          archiveEl.addEventListener("toggle", function () {
            if (!archiveEl.open || archiveEl.getAttribute("data-admin-report-archive-built") === "1") return;
            archiveEl.setAttribute("data-admin-report-archive-built", "1");
            var inner = archiveEl.querySelector(".admin-report-sent-archive__inner");
            if (!inner) return;
            inner.innerHTML = '<p class="admin-report-sent-period-hint">Загрузка прошлых недель…</p>';
            setTimeout(function () {
              var archiveHtml = [];
              archiveWeekStarts.forEach(function (ws) {
                var block = buildWeekBlock(ws, weeksByKey[String(ws)] || [], "ar-arch-", false);
                weekTotalsById[block.weekId] = { totals: block.totals, label: block.label };
                archiveHtml.push(block.html);
              });
              inner.innerHTML = archiveHtml.join("");
              bindSentReportControls(inner);
            }, 0);
          });
        }
      })
      .catch(function () {
        sentReportsLoading = false;
        if (sentList) sentList.innerHTML = '<p class="admin-report-sent-empty">Ошибка загрузки. Попробуйте позже.</p>';
      });
  }

  function closeModal() {
    suspendRakebackDomRows();
    modal.setAttribute("aria-hidden", "true");
    closeRakebackTotalsModal();
    if (document.documentElement) document.documentElement.classList.remove("admin-report-modal-open");
    if (document.body) {
      document.body.classList.remove("admin-report-modal-open");
      document.body.style.overflow = "";
    }
  }
  function openModal() {
    modal.setAttribute("aria-hidden", "false");
    if (document.documentElement) document.documentElement.classList.add("admin-report-modal-open");
    if (document.body) {
      document.body.classList.add("admin-report-modal-open");
      document.body.style.overflow = "hidden";
    }
    syncSentReportsAccess();
    syncRakebackAccessControls();
    editingReportId = null;
    editingReport = null;
    if (submitBtn) submitBtn.textContent = "Отправить отчёт";
    var info = getShiftReportDateInfo();
    if (dateEl) dateEl.textContent = formatAdminReportDateLabel(info.label);
    applySavedRakebackSortMode();
    calculationsDraftHydrated = false;
    setActiveTab("form");
    fillReportForm(null, { skipRakeback: true });
    syncRakebackAccessControls();
  }
  btn.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);
  if (rakebackTotalInput) {
    rakebackTotalInput.addEventListener("input", function () {
      manualRakebackInputTouched = true;
    });
    rakebackTotalInput.addEventListener("change", function () {
      manualRakebackInputTouched = true;
    });
  }
  if (rakebackRefreshBtn) {
    syncRakebackRefreshButtonAccess();
    rakebackRefreshBtn.addEventListener("click", function () {
      if (!canRefreshSharedRakebackDraft()) return;
      rakebackRefreshAttentionDismissed = true;
      rakebackRefreshBtn.classList.remove("admin-report-rakeback-refresh-btn--attention");
      loadSharedRakebackDraftRows({ force: true, showStatus: true });
    });
  }
  if (rakebackGrandTotalBtn) rakebackGrandTotalBtn.addEventListener("click", openRakebackTotalsModal);
  if (rakebackTotalsClose) rakebackTotalsClose.addEventListener("click", closeRakebackTotalsModal);
  if (rakebackTotalsBackdrop) rakebackTotalsBackdrop.addEventListener("click", closeRakebackTotalsModal);
  if (tabs && tabs.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var name = tab.getAttribute("data-admin-report-tab") || "form";
        if (name === "sent" && !canViewSentReports()) return;
        if (name === "calculations" && !canViewCalculationsReports()) return;
        setActiveTab(name);
        if (name === "rakeback") {
          applySavedRakebackSortMode();
          runAdminReportAfterPaint(refreshLocalRakebackView);
        }
        if (name === "sent") runAdminReportAfterPaint(loadSentReports);
        if (name === "calculations") runAdminReportAfterPaint(function () {
          hydrateCalculationsDraftOnce();
          loadCalculationsReports();
        });
      });
    });
  }
  if (calculationsCashInputs && calculationsCashInputs.length) {
    calculationsCashInputs.forEach(function (input) {
      input.addEventListener("input", scheduleCalculationCashTotal);
      input.addEventListener("change", updateCalculationCashTotal);
    });
  }
  if (calculationsWinLossInputs && calculationsWinLossInputs.length) {
    calculationsWinLossInputs.forEach(function (input) {
      input.addEventListener("input", scheduleCalculationGrandTotal);
      input.addEventListener("change", updateCalculationGrandTotal);
    });
  }
  if (figuresRakeInputs && figuresRakeInputs.length) {
    figuresRakeInputs.forEach(function (input) {
      input.addEventListener("input", function () { scheduleFiguresTotals({ syncExtras: false }); });
      input.addEventListener("change", function () { updateFiguresTotals({ syncExtras: false }); });
    });
  }
  [figuresRomanPaidInput, figuresWinLossInput, figuresAgentsPaidInput, figuresApproxRakebackEnabledInput, figuresApproxRomanRakeInput].forEach(function (input) {
    if (!input) return;
    input.addEventListener("input", function () { scheduleFiguresTotals({ syncExtras: false }); });
    input.addEventListener("change", function () { updateFiguresTotals({ syncExtras: false }); });
  });
  if (figuresApproxRateInputs && figuresApproxRateInputs.length) {
    figuresApproxRateInputs.forEach(function (input) {
      if (!input) return;
      input.addEventListener("change", function () {
        updateFiguresTotals();
        saveCalculationsDraftQuiet();
      });
    });
  }
  if (figuresApproxRomanRakeInput) {
    figuresApproxRomanRakeInput.addEventListener("change", saveCalculationsDraftQuiet);
  }
  bindFiguresExtraInputs(figuresExtrasEl);
  if (figuresAddFieldBtn) figuresAddFieldBtn.addEventListener("click", addFiguresExtraField);
  if (calculationGroupSaveBtns && calculationGroupSaveBtns.length) {
    calculationGroupSaveBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        saveCalculationsDraft(btn.getAttribute("data-admin-report-calc-save") || "cash");
      });
    });
  }
  if (calculationGroupEditBtns && calculationGroupEditBtns.length) {
    calculationGroupEditBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        editCalculationsDraft(btn.getAttribute("data-admin-report-calc-edit") || "cash");
      });
    });
  }
  if (figuresSaveBtn) figuresSaveBtn.addEventListener("click", saveFiguresDraft);
  if (figuresEditBtn) figuresEditBtn.addEventListener("click", editFiguresDraft);
  var addExtraBtn = document.getElementById("adminReportAddExtraBtn");
  if (addExtraBtn && modal) {
    addExtraBtn.addEventListener("click", function () {
      var tbody = document.getElementById("adminReportTableBody");
      if (!tbody) return;
      var template = tbody.querySelector(".admin-report-extra-row");
      if (!template) return;
      var clone = template.cloneNode(true);
      clone.querySelectorAll("input").forEach(function (inp) { inp.value = ""; });
      tbody.insertBefore(clone, template.nextSibling);
    });
  }
  if (rakebackAddBtn) {
    rakebackAddBtn.addEventListener("click", addRakebackBaseRow);
  }
  window.addEventListener("poker-telegram-auth", function () {
    resetRakebackAccessCache();
    syncSentReportsAccess();
    syncRakebackAccessControls();
  });
  if (rakebackRoomTabs && rakebackRoomTabs.length) {
    rakebackRoomTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        setRakebackRoomTab(tab.getAttribute("data-rakeback-room-tab"));
      });
    });
  }
  if (rakebackArchiveBtn) {
    rakebackArchiveBtn.addEventListener("click", function () {
      setRakebackArchiveMode(!rakebackArchiveMode);
    });
  }
  if (rakebackSearchInput) {
    rakebackSearchInput.addEventListener("input", scheduleRakebackSearchRefresh);
    rakebackSearchInput.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      rakebackSearchInput.value = "";
      scheduleRakebackSearchRefresh({ immediate: true });
    });
  }
  if (rakebackSortSelect) {
    rakebackSortSelect.addEventListener("change", function () {
      var nextMode = getRakebackSortMode();
      setRakebackSortMode(nextMode, true);
      syncRakebackTable();
    });
  }
  if (rakebackBody) {
    rakebackBody.addEventListener("pointerdown", function (e) {
      var idInput = e.target && e.target.closest ? e.target.closest("[data-rakeback-player-id]") : null;
      if (idInput) {
        var idRow = idInput.closest("[data-rakeback-row]");
        if (shouldCopyRakebackIdInput(idRow, idInput) && String(idInput.value || "").trim()) {
          cancelPendingRakebackDrag();
          rakebackPendingIdCopy = {
            input: idInput,
            pointerId: e.pointerId,
            startX: e.clientX,
            startY: e.clientY,
          };
          e.preventDefault();
          e.stopPropagation();
          return;
        }
      }
      if (!shouldStartRakebackDragFrom(e.target)) return;
      var row = e.target.closest("[data-rakeback-row]");
      if (!row || row.hidden || !canEditRakebackRow(row)) return;
      cancelPendingRakebackDrag();
      var startX = e.clientX;
      var startY = e.clientY;
      var pointerId = e.pointerId;
      var timer = setTimeout(function () {
        if (!rakebackDragState || rakebackDragState.pointerId !== pointerId || rakebackDragState.active) return;
        beginRakebackRowDrag(row, pointerId, rakebackDragState.latestY || startY);
      }, 420);
      rakebackDragState = {
        active: false,
        pointerId: pointerId,
        startX: startX,
        startY: startY,
        latestX: startX,
        latestY: startY,
        timer: timer,
      };
      if (row.setPointerCapture) {
        try { row.setPointerCapture(pointerId); } catch (err) {}
      }
    });
    rakebackBody.addEventListener("pointermove", function (e) {
      if (rakebackPendingIdCopy && rakebackPendingIdCopy.pointerId === e.pointerId) {
        var copyDx = Math.abs(e.clientX - rakebackPendingIdCopy.startX);
        var copyDy = Math.abs(e.clientY - rakebackPendingIdCopy.startY);
        if (copyDx > 14 || copyDy > 14) rakebackPendingIdCopy = null;
        return;
      }
      if (!rakebackDragState || rakebackDragState.pointerId !== e.pointerId) return;
      if (!rakebackDragState.active) {
        rakebackDragState.latestX = e.clientX;
        rakebackDragState.latestY = e.clientY;
        var dx = Math.abs(e.clientX - rakebackDragState.startX);
        var dy = Math.abs(e.clientY - rakebackDragState.startY);
        if (dx > 26 || dy > 26) cancelPendingRakebackDrag();
        return;
      }
      e.preventDefault();
      updateRakebackRowDrag(e.clientY);
    });
    rakebackBody.addEventListener("pointerup", function (e) {
      if (rakebackPendingIdCopy && rakebackPendingIdCopy.pointerId === e.pointerId) {
        var copyInput = rakebackPendingIdCopy.input;
        rakebackPendingIdCopy = null;
        e.preventDefault();
        e.stopPropagation();
        copyRakebackIdInput(copyInput);
        return;
      }
      if (!rakebackDragState || rakebackDragState.pointerId !== e.pointerId) return;
      if (rakebackDragState.active) finishRakebackRowDrag(true);
      else cancelPendingRakebackDrag();
    });
    rakebackBody.addEventListener("pointercancel", function (e) {
      if (rakebackPendingIdCopy && rakebackPendingIdCopy.pointerId === e.pointerId) rakebackPendingIdCopy = null;
      if (!rakebackDragState || rakebackDragState.pointerId !== e.pointerId) return;
      if (rakebackDragState.active) finishRakebackRowDrag(false);
      else cancelPendingRakebackDrag();
    });
    rakebackBody.addEventListener("contextmenu", function (e) {
      if (rakebackDragState && e.target && e.target.closest && e.target.closest("[data-rakeback-row]")) e.preventDefault();
    });
    rakebackBody.addEventListener("input", function (e) {
      if (!canEditRakebackDraftRows()) return;
      markRakebackDraftLocalEdit();
      syncExplicitZeroRakeMarker(e.target);
      var inputRow = e.target && e.target.closest ? e.target.closest("[data-rakeback-row]") : null;
      if (inputRow && e.target && e.target.matches && e.target.matches("[data-rakeback-player-id],[data-rakeback-room]")) {
        syncRakebackRowLookupAttrs(inputRow);
      }
      syncRakebackRowGroupDisplay(inputRow);
      scheduleRakebackSummaryTotals();
      saveRakebackDraftRows();
    });
    rakebackBody.addEventListener("change", function (e) {
      if (!canEditRakebackDraftRows()) return;
      markRakebackDraftLocalEdit();
      var changeRow = e.target && e.target.closest ? e.target.closest("[data-rakeback-row]") : null;
      syncExplicitZeroRakeMarker(e.target);
      if (changeRow && e.target && e.target.matches && e.target.matches("[data-rakeback-player-id],[data-rakeback-room]")) {
        syncRakebackRowLookupAttrs(changeRow);
      }
      if (e.target && e.target.matches && e.target.matches("[data-rakeback-percent]") && parseReportNumber(e.target.value) === 0) {
        e.target.value = "";
      }
      if (e.target && e.target.matches && e.target.matches("[data-rakeback-discount15]")) {
        syncRakebackRowGroupDisplay(changeRow);
        scheduleRakebackSummaryTotals();
        saveRakebackDraftRows();
        return;
      }
      syncRakebackTable({ skipSort: true });
      saveRakebackDraftRows();
    });
    rakebackBody.addEventListener("focusin", function (e) {
      var focusCell = e.target && e.target.closest ? e.target.closest("td") : null;
      if (focusCell && focusCell.closest("[data-rakeback-row]")) markRakebackCell(focusCell, false);
    });
    rakebackBody.addEventListener("click", function (e) {
      var weekToggle = e.target && e.target.closest ? e.target.closest("[data-rakeback-week-toggle]") : null;
      if (weekToggle) {
        e.preventDefault();
        var weekKey = weekToggle.getAttribute("data-rakeback-week-toggle") || "";
        if (weekKey) rakebackWeekArchiveOpen[weekKey] = !rakebackWeekArchiveOpen[weekKey];
        syncRakebackTable({ skipSort: true });
        return;
      }
      var weekRoomToggle = e.target && e.target.closest ? e.target.closest("[data-rakeback-week-room-toggle]") : null;
      if (weekRoomToggle) {
        e.preventDefault();
        var weekRoomKey = weekRoomToggle.getAttribute("data-rakeback-week-room-toggle") || "";
        if (weekRoomKey) rakebackWeekRoomArchiveOpen[weekRoomKey] = rakebackWeekRoomArchiveOpen[weekRoomKey] === false;
        syncRakebackTable({ skipSort: true });
        return;
      }
      var colorControl = e.target && e.target.closest ? e.target.closest("[data-rakeback-color-toggle],[data-rakeback-color-value],[data-rakeback-color-menu]") : null;
      if (!colorControl) closeRakebackColorMenus();
      var copyIdInput = e.target && e.target.closest ? e.target.closest("[data-rakeback-player-id]") : null;
      if (copyIdInput) {
        var recentlyCopied = rakebackSuppressIdClickInput === copyIdInput && Date.now() - rakebackSuppressIdClickAt < 800;
        if (recentlyCopied) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        if (copyRakebackIdInput(copyIdInput)) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
      }
      var clickedCell = e.target && e.target.closest ? e.target.closest("td") : null;
      if (clickedCell && clickedCell.closest("[data-rakeback-row]") && !colorControl) markRakebackCell(clickedCell, false);
      var saveBtn = e.target && e.target.closest ? e.target.closest("[data-rakeback-save]") : null;
      if (saveBtn) {
        var saveRow = saveBtn.closest("[data-rakeback-row]");
        syncExplicitZeroRakeMarker(saveRow ? saveRow.querySelector("[data-rakeback-rake]") : null);
        if (!saveRow) return;
        if (!canEditRakebackRow(saveRow)) {
          showRakebackStatusBriefly("Можно сохранять только свои неучтенные записи");
          return;
        }
        markRakebackDraftLocalEdit();
        ensureRakebackEntryAddedAt(saveRow, true);
        syncRakebackTable();
        setRakebackRowSaved(saveRow, true);
        saveRakebackDraftRows();
        showRakebackStatus("Редактирование завершено");
        return;
      }
      var editBtn = e.target && e.target.closest ? e.target.closest("[data-rakeback-edit]") : null;
      if (editBtn) {
        var editRow = editBtn.closest("[data-rakeback-row]");
        if (!canEditRakebackRow(editRow)) {
          showRakebackStatusBriefly("Можно редактировать только свои неучтенные записи");
          return;
        }
        markRakebackDraftLocalEdit();
        setRakebackRowSaved(editRow, false);
        showRakebackStatus("");
        return;
      }
      var addAddonBtn = e.target && e.target.closest ? e.target.closest("[data-rakeback-add-addon]") : null;
      if (addAddonBtn) {
        e.preventDefault();
        e.stopPropagation();
        var addonBaseRow = addAddonBtn.closest("[data-rakeback-row]");
        if (!canAddRakebackAddon(addonBaseRow)) {
          showRakebackStatusBriefly("Для подзаписи нужны ID и рейк");
          return;
        }
        markRakebackDraftLocalEdit();
        ensureRakebackEntryAddedAt(addonBaseRow, true);
        setRakebackRowSaved(addonBaseRow, true);
        addRakebackAddonRow(addonBaseRow);
        saveRakebackDraftRows();
        showRakebackStatus("Подзапись добавлена");
        return;
      }
      var colorOption = e.target && e.target.closest ? e.target.closest("[data-rakeback-color-value]") : null;
      if (colorOption) {
        var colorRow = colorOption.closest("[data-rakeback-row]");
        if (!canEditRakebackRow(colorRow)) return;
        markRakebackDraftLocalEdit();
        applyRakebackRowColor(colorRow, colorOption.getAttribute("data-rakeback-color-value") || "");
        closeRakebackColorMenus();
        syncRakebackTable();
        saveRakebackDraftRowsNow(true);
        showRakebackStatusBriefly("Цвет выбран");
        return;
      }
      var colorToggle = e.target && e.target.closest ? e.target.closest("[data-rakeback-color-toggle]") : null;
      if (colorToggle) {
        var toggleRow = colorToggle.closest("[data-rakeback-row]");
        if (!canEditRakebackRow(toggleRow)) return;
        var menu = toggleRow ? toggleRow.querySelector("[data-rakeback-color-menu]") : null;
        if (!menu) return;
        var willOpen = menu.hidden;
        closeRakebackColorMenus(toggleRow);
        menu.hidden = !willOpen;
        return;
      }
      var removeBtn = e.target && e.target.closest ? e.target.closest("[data-rakeback-remove]") : null;
      if (!removeBtn) return;
      var row = removeBtn.closest("[data-rakeback-row]");
      if (!row) return;
      if (!canRemoveRakebackRow(row)) {
        showRakebackAlert(canEditRakebackDraftRows() ? "Нельзя удалять чужие или уже учтенные записи." : "Нет доступа к редактированию рейкбека.");
        return;
      }
      var removeConfirmed = removeBtn.getAttribute("data-rakeback-remove-confirmed") === "1";
      if (removeConfirmed) {
        removeBtn.removeAttribute("data-rakeback-remove-confirmed");
      } else if (typeof confirm === "function") {
        removeConfirmed = confirm("Удалить эту запись?");
      } else if (tg && tg.showConfirm) {
        tg.showConfirm("Удалить эту запись?", function (ok) {
          if (!ok) return;
          removeBtn.setAttribute("data-rakeback-remove-confirmed", "1");
          removeBtn.click();
        });
        return;
      } else {
        removeConfirmed = true;
      }
      if (!removeConfirmed) return;
      markRakebackDraftLocalEdit();
      var dataRows = rakebackBody.querySelectorAll("[data-rakeback-row]");
      var groupId = row.getAttribute("data-rakeback-group") || "";
      var rowsToRemove = [row];
      if (row.getAttribute("data-rakeback-kind") === "base") {
        Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]")).forEach(function (candidate) {
          if (candidate.getAttribute("data-rakeback-group") === groupId && candidate !== row) {
            rowsToRemove.push(candidate);
            candidate.parentNode.removeChild(candidate);
          }
        });
      }
      rememberDeletedRakebackTemplates(rowsToRemove);
      if (dataRows.length <= 1) {
        row.querySelectorAll("input").forEach(function (inp) { inp.value = ""; });
        var select = row.querySelector("select");
        if (select) select.value = "P21";
        applyRakebackRowColor(row, "");
      } else {
        row.parentNode.removeChild(row);
      }
      syncRakebackTable();
      saveRakebackDraftRowsNow(true);
    });
  }
  document.addEventListener("click", function (e) {
    if (!rakebackBody || !e.target || !e.target.closest) return;
    if (e.target.closest("[data-rakeback-color-toggle]") || e.target.closest("[data-rakeback-color-menu]")) return;
    closeRakebackColorMenus();
  });
  if (modal) {
    modal.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" || !e.target || !e.target.matches || !e.target.matches("input.admin-report-input,input.admin-report-rakeback-input")) return;
      e.preventDefault();
      var activePanel = modal.querySelector(".admin-report-panel--active");
      if (!activePanel) return;
      var inputs = activePanel.querySelectorAll("input.admin-report-input:not([readonly]),input.admin-report-rakeback-input:not([readonly])");
      var idx = -1;
      for (var i = 0; i < inputs.length; i++) {
        if (inputs[i] === e.target) { idx = i; break; }
      }
      if (idx < 0) return;
      if (idx + 1 < inputs.length) {
        inputs[idx + 1].focus();
      } else if (submitBtn) {
        submitBtn.focus();
      }
    });
  }
  function buildPayload() {
    var d = getShiftReportDateInfo();
    var getVal = function (id) {
      var el = document.getElementById(id);
      if (!el) return 0;
      return parseReportNumber(el.value);
    };
    syncRakebackTable();
    var rakebackRows = getUnaccountedRakebackReportRows();
    var rakebackTotal = sumRakebackReportRows(rakebackRows);
    var manualRakebackTotal = getVal("adminReportRakeback");
    var reportRakebackTotal = manualRakebackInputTouched ? manualRakebackTotal : rakebackTotal;
    var extraRows = modal.querySelectorAll(".admin-report-extra-row");
    var extraFields = [];
    var extraTotal = 0;
    extraRows.forEach(function (row) {
      var nameInput = row.querySelector(".admin-report-extra-name");
      var amountInput = row.querySelector(".admin-report-extra-amount");
      var name = nameInput && nameInput.value ? String(nameInput.value).trim() : "";
      var amount = 0;
      if (amountInput) {
        var v = parseFloat(String(amountInput.value || "").replace(",", "."));
        amount = isNaN(v) ? 0 : v;
      }
      if (name || amount) {
        extraFields.push({ name: name, amount: amount });
        extraTotal += amount;
      }
    });
    var corePayload = {
      iso: d.iso,
      date: d.date,
      weekday: d.weekday.charAt(0).toUpperCase() + d.weekday.slice(1),
      deposit: getVal("adminReportDeposit"),
      cashout: getVal("adminReportCashout"),
      prodamus: getVal("adminReportProdamus"),
      robokassa: getVal("adminReportRobokassa"),
      romaCrypto: getVal("adminReportRomaCrypto"),
      botCryptoDep: getVal("adminReportBotCryptoDep"),
      botExchipDep: getVal("adminReportBotExchipDep"),
      botExchipCashout: getVal("adminReportBotExchipCashout"),
      bonuses: getVal("adminReportBonuses"),
      transfers: getVal("adminReportTransfers"),
      ret: getVal("adminReportReturn"),
      sergeyMarina: getVal("adminReportSergeyMarina"),
      rakeback: Math.round(reportRakebackTotal * 100) / 100,
      rakebackRows: rakebackRows,
      extraFields: extraFields
    };
    var payload =
      typeof pokerGuestOrAuthedPostBody === "function"
        ? pokerGuestOrAuthedPostBody(corePayload)
        : corePayload;
    var total = payload.deposit - payload.cashout + payload.prodamus + payload.robokassa + payload.romaCrypto + payload.botCryptoDep + payload.botExchipDep - payload.botExchipCashout - payload.bonuses + payload.transfers + payload.ret + payload.sergeyMarina + payload.rakeback + extraTotal;
    payload.total = total;
    payload.extraName = extraFields[0] ? extraFields[0].name : "";
    payload.extraAmount = extraTotal;
    payload.comment = extraFields.map(function (f) { return f.name; }).filter(Boolean).join(", ");
    return payload;
  }

  function setFormVal(id, val) {
    var el = document.getElementById(id);
    if (!el) return;
    el.value = val != null && val !== "" ? String(val) : "";
  }

  function fillReportForm(report, options) {
    options = options || {};
    manualRakebackInputTouched = !!(report && report.rakeback != null && report.rakeback !== "");
    if (!report) {
      setFormVal("adminReportDeposit", "");
      setFormVal("adminReportCashout", "");
      setFormVal("adminReportProdamus", "");
      setFormVal("adminReportRobokassa", "");
      setFormVal("adminReportRomaCrypto", "");
      setFormVal("adminReportBotCryptoDep", "");
      setFormVal("adminReportBotExchipDep", "");
      setFormVal("adminReportBotExchipCashout", "");
      setFormVal("adminReportBonuses", "");
      setFormVal("adminReportTransfers", "");
      setFormVal("adminReportReturn", "");
      setFormVal("adminReportSergeyMarina", "");
      setFormVal("adminReportRakeback", "");
      if (!options.skipRakeback) fillRakebackTable([], "");
      var tbody = document.getElementById("adminReportTableBody");
      if (tbody) {
        var extras = tbody.querySelectorAll(".admin-report-extra-row");
        extras.forEach(function (row, i) {
          if (i === 0) {
            row.querySelectorAll("input").forEach(function (inp) { inp.value = ""; });
          } else {
            row.parentNode.removeChild(row);
          }
        });
      }
      return;
    }
    setFormVal("adminReportDeposit", report.deposit);
    setFormVal("adminReportCashout", report.cashout);
    setFormVal("adminReportProdamus", report.prodamus);
    setFormVal("adminReportRobokassa", report.robokassa);
    setFormVal("adminReportRomaCrypto", report.romaCrypto);
    setFormVal("adminReportBotCryptoDep", report.botCryptoDep);
    setFormVal("adminReportBotExchipDep", report.botExchipDep);
    setFormVal("adminReportBotExchipCashout", report.botExchipCashout);
    setFormVal("adminReportBonuses", report.bonuses);
    setFormVal("adminReportTransfers", report.transfers);
    setFormVal("adminReportReturn", report.ret);
    setFormVal("adminReportSergeyMarina", report.sergeyMarina);
    setFormVal("adminReportRakeback", report.rakeback != null ? report.rakeback : "");
    fillRakebackTable(report.rakebackRows, report.rakeback);
    var tbody = document.getElementById("adminReportTableBody");
    if (tbody) {
      var template = tbody.querySelector(".admin-report-extra-row");
      var extras = tbody.querySelectorAll(".admin-report-extra-row");
      extras.forEach(function (row, i) {
        if (i === 0) {
          var nameInput = row.querySelector(".admin-report-extra-name");
          var amountInput = row.querySelector(".admin-report-extra-amount");
          if (report.extraFields && report.extraFields[0]) {
            if (nameInput) nameInput.value = report.extraFields[0].name != null ? report.extraFields[0].name : "";
            if (amountInput) amountInput.value = report.extraFields[0].amount != null ? report.extraFields[0].amount : "";
          } else {
            if (nameInput) nameInput.value = "";
            if (amountInput) amountInput.value = "";
          }
        } else {
          row.parentNode.removeChild(row);
        }
      });
      if (report.extraFields && report.extraFields.length > 1) {
        for (var j = 1; j < report.extraFields.length; j++) {
          var clone = template.cloneNode(true);
          clone.querySelector(".admin-report-extra-name").value = report.extraFields[j].name != null ? report.extraFields[j].name : "";
          clone.querySelector(".admin-report-extra-amount").value = report.extraFields[j].amount != null ? report.extraFields[j].amount : "";
          tbody.insertBefore(clone, template.nextSibling);
        }
      }
    }
  }

  if (submitBtn) {
    submitBtn.addEventListener("click", function () {
      var base = typeof getApiBase === "function" ? getApiBase() : "";
      var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
        if (tg && tg.showAlert) tg.showAlert("Войдите в приложение (Telegram или PWA), чтобы отправить отчёт.");
        return;
      }
      var payload = buildPayload();
      if (editingReportId && editingReport) {
        payload.id = editingReportId;
        payload.date = editingReport.date || payload.date;
        payload.weekday = editingReport.weekday || payload.weekday;
      }
      submitBtn.disabled = true;
      var method = editingReportId ? "PUT" : "POST";
      var url = base.replace(/\/$/, "") + "/api/admin-report-shifts";
      fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          submitBtn.disabled = false;
          if (data && data.ok) {
            var accountedRakebackRows = null;
            if (!editingReportId) {
              markUnaccountedRakebackRowsAccounted(data.report && data.report.id, data.report && data.report.createdAt);
              ensureRakebackTemplateRowsFromReportedRows(payload.rakebackRows);
              syncRakebackTable();
              accountedRakebackRows = collectRakebackRows(false, false);
              saveLocalRakebackDraftRows(accountedRakebackRows);
              saveRakebackDraftRowsNow(true);
            }
            editingReportId = null;
            editingReport = null;
            if (submitBtn) submitBtn.textContent = "Отправить отчёт";
            fillReportForm(null);
            if (accountedRakebackRows) {
              fillRakebackTable(accountedRakebackRows, "");
            } else {
              loadLocalRakebackDraftRows();
            }
            if (canViewSentReports()) {
              loadSentReports(true);
              setActiveTab("sent");
            } else if (tg && tg.showAlert) {
              tg.showAlert("Отчёт отправлен.");
            }
          } else {
            if (tg && tg.showAlert) tg.showAlert((data && data.error) || "Ошибка отправки.");
          }
        })
        .catch(function () {
          submitBtn.disabled = false;
          if (tg && tg.showAlert) tg.showAlert(POKER_NET_ERR);
        });
    });
  }
}
window.pokerInitAdminReportModal = initAdminReportModal;

function initBroadcastReportsModal() {
  var btn = document.getElementById("adminBroadcastReportsBtn");
  var modal = document.getElementById("broadcastReportsModal");
  var closeBtn = document.getElementById("broadcastReportsModalClose");
  var backdrop = document.getElementById("broadcastReportsModalBackdrop");
  if (!btn || !modal) return;
  if (btn.dataset.broadcastReportsBound === "1") return;
  btn.dataset.broadcastReportsBound = "1";
  function closeModal() {
    modal.setAttribute("aria-hidden", "true");
    if (document.body) document.body.style.overflow = "";
  }
  function openModal() {
    modal.setAttribute("aria-hidden", "false");
    if (document.body) document.body.style.overflow = "hidden";
  }
  btn.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);
}
window.pokerInitBroadcastReportsModal = initBroadcastReportsModal;
function initAdminReportModalsRuntime() {
  initAdminReportModal();
  initBroadcastReportsModal();
}
initAdminReportModalsRuntime();
if (
  typeof window.pokerEnsureGlobalModalsHtml === "function" &&
  (!document.getElementById("adminReportModal") || !document.getElementById("broadcastReportsModal"))
) {
  window.pokerEnsureGlobalModalsHtml().then(initAdminReportModalsRuntime).catch(function () {});
}

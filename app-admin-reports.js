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
  var rakebackSearchInput = document.getElementById("adminReportRakebackSearch");
  var rakebackSortSelect = document.getElementById("adminReportRakebackSort");
  var rakebackRoomTabs = modal ? modal.querySelectorAll("[data-rakeback-room-tab]") : null;
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
  var calculationsRoot = document.getElementById("adminReportCalculations");
  var calculationGroupSaveBtns = modal ? modal.querySelectorAll("[data-admin-report-calc-save]") : null;
  var calculationGroupEditBtns = modal ? modal.querySelectorAll("[data-admin-report-calc-edit]") : null;
  var calculationGroupStatusEls = modal ? modal.querySelectorAll("[data-admin-report-calc-status]") : null;
  var calculationsCashInputs = modal ? modal.querySelectorAll("[data-admin-report-calc-cash]") : null;
  var calculationsWinLossInputs = modal ? modal.querySelectorAll("[data-admin-report-calc-winloss]") : null;
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
  var figuresGrandTotalEl = document.getElementById("adminReportFiguresGrandTotal");
  var editingReportId = null;
  var editingReport = null;
  var rakebackGroupSeq = 0;
  var activeRakebackRoom = "P21";
  var rakebackRoomTotals = {};
  var rakebackDraftSaveTimer = null;
  var rakebackDraftRefreshTimer = null;
  var rakebackStatusClearTimer = null;
  var rakebackDraftMutationSeq = 0;
  var rakebackDraftLocalEditUntil = 0;
  var loadingRakebackDraft = false;
  var savingRakebackDraft = false;
  var rakebackDraftNeedsMigration = false;
  var rakebackDragState = null;
  var calculationCashTotal = 0;
  var calculationWeekTotals = {};
  var figuresRakeTotal = 0;
  var figuresPercentTotal = 0;
  var figuresSavedLocked = false;
  var calculationGroupLocks = { cash: false, week: false, rake: false, winloss: false };
  var calculationsStatusTimer = null;
  var figuresStatusTimer = null;
  var sentReportsLoadedAt = 0;
  var sentReportsLoading = false;
  var SENT_REPORTS_CACHE_TTL_MS = 5 * 60 * 1000;
  var DEFAULT_RAKEBACK_SORT_MODE = "created";
  var RAKEBACK_ROOMS = ["P21", "X", "Supr", "PP"];
  var RAKEBACK_FULL_ACCESS_IDS = ["388008256", "2144406710", "1897001087"];
  var RAKEBACK_FULL_ACCESS_USERNAMES = ["roman1787443", "roman1_matvienko"];
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

  function canManageAllRakebackRows() {
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
    for (var i = 0; i < users.length; i++) {
      var u = users[i] || {};
      var ids = [u.id, u.memberId, u.telegramId, u.telegram_id, u.uid, u.userId, u.user_id];
      for (var j = 0; j < ids.length; j++) {
        var rawId = ids[j] != null ? String(ids[j]).replace(/^tg_/, "").trim() : "";
        if (RAKEBACK_FULL_ACCESS_IDS.indexOf(rawId) >= 0) return true;
      }
      var names = [u.username, u.telegramUsername, u.pwaUsername];
      for (var k = 0; k < names.length; k++) {
        var username = names[k] != null ? String(names[k]).replace(/^@+/, "").trim().toLowerCase() : "";
        if (RAKEBACK_FULL_ACCESS_USERNAMES.indexOf(username) >= 0) return true;
      }
    }
    return false;
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

  function formatRakebackRoomTotal(room, displayAmount, reportAmount) {
    var multiplier = getRakebackRoomMultiplier(room);
    if (multiplier === 1) return formatReportRubleNumber(reportAmount);
    var chips = Math.round(parseReportNumber(displayAmount));
    return formatReportRubleNumber(chips) + " фишек × " + multiplier + " = " + formatReportRubleNumber(reportAmount);
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
      var total = rakebackRoomTotals[room] || { display: 0, report: 0 };
      var multiplier = getRakebackRoomMultiplier(room);
      var amount = formatReportRubleNumber(total.report);
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
    Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-cell-selected],[data-rakeback-cell-copied]")).forEach(function (td) {
      if (td === cell) return;
      td.removeAttribute("data-rakeback-cell-selected");
      td.removeAttribute("data-rakeback-cell-copied");
    });
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
    return parseReportNumber(data.rake) === 0 &&
      parseReportNumber(data.roomAmount) === 0 &&
      parseReportNumber(data.chipAmount) === 0 &&
      parseReportNumber(data.amount) === 0;
  }

  function createRakebackRow(data) {
    data = data || {};
    var tr = document.createElement("tr");
    var kind = data.kind === "addon" || data.isAddon ? "addon" : "base";
    var groupId = data.groupId || nextRakebackGroupId();
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
    var hasInitialEntryData = !templateLikeData && (data.saved || accountedData ||
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
    if (templateLikeData) entryAddedAt = NaN;
    tr.className = "admin-report-rakeback-row" + (kind === "addon" ? " admin-report-rakeback-row--addon" : "");
    tr.setAttribute("data-rakeback-row", "");
    tr.setAttribute("data-rakeback-kind", kind);
    tr.setAttribute("data-rakeback-group", groupId);
    tr.setAttribute("data-rakeback-owner", data.ownerId || data.authorId || getCurrentRakebackOwnerId());
    tr.setAttribute("data-rakeback-created-at", String(createdAt));
    tr.setAttribute("data-rakeback-standard-at", String(standardAt));
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
          ? '<div class="admin-report-rakeback-rake-with-rest"><input type="number" inputmode="decimal" class="admin-report-rakeback-input" data-rakeback-rake enterkeyhint="next" placeholder="0" /><span class="admin-report-rakeback-rest" data-rakeback-rest title="Остаток">0</span></div>'
          : '<input type="number" inputmode="decimal" class="admin-report-rakeback-input" data-rakeback-rake enterkeyhint="next" placeholder="0" />') +
      '</td>' +
      '<td><input type="number" inputmode="decimal" class="admin-report-rakeback-input" data-rakeback-percent enterkeyhint="next" placeholder="0" /></td>' +
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
    if (rakeInput) rakeInput.value = data.rake != null && data.rake !== "" ? formatReportInputNumber(data.rake) : "";
    if (percentInput) percentInput.value = data.percent != null && data.percent !== "" ? formatReportInputNumber(data.percent) : "";
    if (discountInput) discountInput.checked = !!(data.discount15 || data.subtract15);
    if (kind === "addon") {
      var roomSelect = tr.querySelector("[data-rakeback-room]");
      if (roomSelect) roomSelect.disabled = true;
      if (idInput) idInput.readOnly = true;
    }
    applyRakebackRowColor(tr, data.color || data.rowColor || data.highlightColor || "");
    if (accountedData || (data.saved && !templateLikeData)) setRakebackRowSaved(tr, true);
    return tr;
  }

  function getRakebackRowRoom(row) {
    if (!row) return "P21";
    var roomSelect = row.querySelector("[data-rakeback-room]");
    return normalizeRakebackRoom(roomSelect && roomSelect.value ? roomSelect.value : row.getAttribute("data-rakeback-room") || "P21");
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
    return /^(standard|created|color|rake|percent)$/.test(mode) ? mode : DEFAULT_RAKEBACK_SORT_MODE;
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
    var rakeInput = row.querySelector("[data-rakeback-rake]");
    return row.getAttribute("data-rakeback-saved") === "1" ||
      isRakebackRowAccounted(row) ||
      parseReportNumber(rakeInput ? rakeInput.value : "") !== 0 ||
      Math.round(getRakebackRowAmount(row)) !== 0;
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
    if (!force && !hasRakebackRowEntryTimeData(row)) return "";
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

  function getRakebackGroupKeyRow(rows) {
    rows = Array.isArray(rows) ? rows : [];
    return rows.find(function (row) {
      return row && row.getAttribute("data-rakeback-kind") !== "addon";
    }) || rows[0] || null;
  }

  function getRakebackGroupEntryAddedAt(group, fallbackIndex) {
    if (!group || !group.rows || !group.rows.length) return NaN;
    return group.rows.reduce(function (max, row, index) {
      var value = getRakebackRowEntryAddedAt(row, index + (Number(fallbackIndex) || 0));
      return Number.isFinite(value) ? Math.max(max, value) : max;
    }, -Infinity);
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
    Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-date-separator]")).forEach(function (row) {
      row.parentNode.removeChild(row);
    });
    Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row-section-date]")).forEach(function (row) {
      row.removeAttribute("data-rakeback-row-section-date");
      row.removeAttribute("data-rakeback-row-day-key");
    });
  }

  function getRakebackDateGroupTotals(groups, dayKey) {
    var totals = { rake: 0, rakeback: 0 };
    (groups || []).forEach(function (group) {
      (group && group.rows ? group.rows : []).forEach(function (row, index) {
        if (!row || row.hidden) return;
        var rowStamp = getRakebackRowEntryAddedAt(row, index);
        if (!Number.isFinite(rowStamp) || getRakebackMoscowDayKey(rowStamp) !== dayKey) return;
        var room = getRakebackRowRoom(row);
        var roomAmount = Math.round(getRakebackRowAmount(row));
        totals.rake += getRakebackRowCalculationBase(row);
        totals.rakeback += getRakebackReportAmount(room, roomAmount);
      });
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

  function insertRakebackDateSeparators() {
    var mode = getRakebackSortMode();
    if (!rakebackBody || (mode !== "created" && mode !== "standard")) return;
    var dayGroups = {};
    var visibleGroups = getRakebackVisibleGroups();
    visibleGroups.forEach(function (group, index) {
      if (!group || !group.rows || !group.rows.length) return;
      var stamp = getRakebackGroupEntryAddedAt(group, index);
      if (!Number.isFinite(stamp)) return;
      var key = getRakebackMoscowDayKey(stamp);
      if (!dayGroups[key]) {
        dayGroups[key] = { stamp: stamp, groups: [] };
      }
      dayGroups[key].groups.push(group);
    });
    var lastKey = "";
    visibleGroups.forEach(function (group, index) {
      if (!group || !group.rows || !group.rows.length) return;
      var stamp = getRakebackGroupEntryAddedAt(group, index);
      if (!Number.isFinite(stamp)) return;
      var key = getRakebackMoscowDayKey(stamp);
      group.rows.forEach(function (row, rowIndex) {
        var rowStamp = getRakebackRowEntryAddedAt(row, rowIndex);
        var rowKey = Number.isFinite(rowStamp) ? getRakebackMoscowDayKey(rowStamp) : "";
        if (rowKey) row.setAttribute("data-rakeback-row-day-key", rowKey);
        else row.removeAttribute("data-rakeback-row-day-key");
        if (rowKey === key) row.setAttribute("data-rakeback-row-section-date", "1");
        else row.removeAttribute("data-rakeback-row-section-date");
      });
      if (key === lastKey) return;
      lastKey = key;
      rakebackBody.insertBefore(createRakebackDateSeparator(getRakebackDateSeparatorLabel(stamp), getRakebackDateGroupTotals(dayGroups[key] ? dayGroups[key].groups : [], key)), group.rows[0]);
    });
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

  function getRakebackGroupRows(row) {
    if (!rakebackBody || !row) return [];
    var groupId = row.getAttribute("data-rakeback-group") || "";
    if (!groupId) return [row];
    return Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]")).filter(function (candidate) {
      return candidate.getAttribute("data-rakeback-group") === groupId;
    });
  }

  function getRakebackVisibleGroups() {
    if (!rakebackBody) return [];
    var groups = [];
    var seen = {};
    Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]")).forEach(function (row) {
      if (row.hidden) return;
      var groupId = row.getAttribute("data-rakeback-group") || "";
      if (!groupId || seen[groupId]) return;
      seen[groupId] = true;
      groups.push({ groupId: groupId, rows: getRakebackGroupRows(row) });
    });
    return groups;
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
    activeRakebackRoom = normalizeRakebackRoom(room || activeRakebackRoom || "P21");
    if (rakebackRoomTabs && rakebackRoomTabs.length) {
      rakebackRoomTabs.forEach(function (tab) {
        var selected = normalizeRakebackRoom(tab.getAttribute("data-rakeback-room-tab")) === activeRakebackRoom;
        tab.classList.toggle("admin-report-rakeback-room-tab--active", selected);
        tab.setAttribute("aria-selected", selected ? "true" : "false");
      });
    }
    syncRakebackTable();
  }

  function syncRakebackRoomVisibility() {
    if (!rakebackBody) return;
    var searchQuery = getRakebackSearchQuery();
    var visibleIndex = 0;
    Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]")).forEach(function (row) {
      var matchesRoom = getRakebackRowRoom(row) === activeRakebackRoom;
      var matchesSearch = !searchQuery || getRakebackRowPlayerId(row).indexOf(searchQuery) !== -1;
      var visible = matchesRoom && matchesSearch;
      row.hidden = !visible;
      var numberEl = row.querySelector("[data-rakeback-row-number]");
      if (numberEl) {
        var isAddon = row.getAttribute("data-rakeback-kind") === "addon";
        numberEl.hidden = isAddon;
        numberEl.textContent = visible && !isAddon ? String(++visibleIndex) : "";
      }
    });
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
    row.classList.toggle("admin-report-rakeback-row--saved", !!saved);
    row.setAttribute("data-rakeback-saved", saved ? "1" : "0");
    row.querySelectorAll("input").forEach(function (input) {
      if (input.hasAttribute("data-rakeback-discount15")) {
        input.disabled = !!saved;
        return;
      }
      input.readOnly = !!saved || (isAddon && input.hasAttribute("data-rakeback-player-id"));
    });
    row.querySelectorAll("select").forEach(function (select) {
      select.disabled = !!saved || isAddon;
    });
    updateRakebackRowActions(row);
  }

  function ensureRakebackTemplateRows(room, playerIds) {
    if (!rakebackBody || !Array.isArray(playerIds) || !playerIds.length) return false;
    var normalizedRoom = normalizeRakebackRoom(room);
    var deletedTemplates = getRakebackDeletedTemplateMap();
    var existingIds = {};
    Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]")).forEach(function (row) {
      if (getRakebackRowRoom(row) !== normalizedRoom) return;
      var idInput = row.querySelector("[data-rakeback-player-id]");
      var playerId = idInput && idInput.value ? String(idInput.value).trim() : "";
      if (playerId) existingIds[playerId] = true;
    });
    var addedTemplates = false;
    playerIds.forEach(function (playerId) {
      if (deletedTemplates[getRakebackTemplateKey(normalizedRoom, playerId)]) return;
      if (existingIds[playerId]) return;
      rakebackBody.appendChild(createRakebackRow({
        kind: "base",
        room: normalizedRoom,
        playerId: playerId,
        createdAt: getRakebackTemplateCreatedAt(normalizedRoom, playerId),
      }));
      existingIds[playerId] = true;
      addedTemplates = true;
    });
    return addedTemplates;
  }

  function ensureRakebackBaseRow(room) {
    if (!rakebackBody) return;
    var targetRoom = normalizeRakebackRoom(room || activeRakebackRoom || "P21");
    if (targetRoom === "P21" && ensureRakebackTemplateRows("P21", P21_RAKEBACK_TEMPLATE_IDS)) return;
    if (targetRoom === "X" && ensureRakebackTemplateRows("X", X_RAKEBACK_TEMPLATE_IDS)) return;
    if (targetRoom === "PP" && ensureRakebackTemplateRows("PP", PP_RAKEBACK_TEMPLATE_IDS)) return;
    if (targetRoom === "Supr" && ensureRakebackTemplateRows("Supr", SUPR_RAKEBACK_TEMPLATE_IDS)) return;
    var rows = Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]"));
    rows.forEach(function (row, index) {
      getRakebackRowCreatedAt(row, index);
      getRakebackRowStandardAt(row, index);
    });
    var hasRoomRow = rows.some(function (row) {
      return getRakebackRowRoom(row) === targetRoom;
    });
    if (hasRoomRow) return;
    rakebackBody.appendChild(createRakebackRow({ kind: "base", room: targetRoom }));
  }

  function isRakebackRowFilled(row) {
    if (!row) return false;
    var idInput = row.querySelector("[data-rakeback-player-id]");
    var rakeInput = row.querySelector("[data-rakeback-rake]");
    var percentInput = row.querySelector("[data-rakeback-percent]");
    var id = idInput && idInput.value ? String(idInput.value).trim() : "";
    var rake = parseReportNumber(rakeInput ? rakeInput.value : "");
    var percent = parseReportNumber(percentInput ? percentInput.value : "");
    return !!id || rake !== 0 || percent !== 0;
  }

  function hasRakebackRakeValue(row) {
    if (!row) return false;
    var rakeInput = row.querySelector("[data-rakeback-rake]");
    return parseReportNumber(rakeInput ? rakeInput.value : "") !== 0;
  }

  function canAddRakebackAddon(row) {
    if (!row) return false;
    return row.getAttribute("data-rakeback-saved") === "1" && isRakebackRowFilled(row) && hasRakebackRakeValue(row);
  }

  function updateRakebackRowActions(row) {
    if (!row) return;
    var saved = row.getAttribute("data-rakeback-saved") === "1";
    var accounted = isRakebackRowAccounted(row);
    var filled = isRakebackRowFilled(row);
    var saveBtn = row.querySelector("[data-rakeback-save]");
    var editBtn = row.querySelector("[data-rakeback-edit]");
    var addBtn = row.querySelector("[data-rakeback-add-addon]");
    if (saveBtn) {
      saveBtn.disabled = !filled;
      saveBtn.hidden = saved || !filled;
    }
    if (editBtn) editBtn.hidden = !saved || accounted;
    if (addBtn) {
      var canAdd = canAddRakebackAddon(row);
      addBtn.disabled = !canAdd;
      addBtn.hidden = !canAdd;
    }
  }

  function getRakebackPreviousRake(row) {
    if (!rakebackBody || !row || row.getAttribute("data-rakeback-kind") !== "addon") return 0;
    var groupId = row.getAttribute("data-rakeback-group") || "";
    var previousRake = 0;
    var rows = Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]"));
    for (var i = 0; i < rows.length; i++) {
      var current = rows[i];
      if (current === row) break;
      if (current.getAttribute("data-rakeback-group") !== groupId) continue;
      var rakeInput = current.querySelector("[data-rakeback-rake]");
      previousRake = parseReportNumber(rakeInput ? rakeInput.value : "");
    }
    return previousRake;
  }

  function getRakebackRowCalculationBase(row) {
    if (!row) return 0;
    var rakeInput = row.querySelector("[data-rakeback-rake]");
    var rake = parseReportNumber(rakeInput ? rakeInput.value : "");
    if (row.getAttribute("data-rakeback-kind") === "addon") return rake - getRakebackPreviousRake(row);
    return rake;
  }

  function getRakebackRowAmount(row) {
    if (!row) return 0;
    var percentInput = row.querySelector("[data-rakeback-percent]");
    var discountInput = row.querySelector("[data-rakeback-discount15]");
    var amount = getRakebackRowCalculationBase(row) * parseReportNumber(percentInput ? percentInput.value : "") / 100;
    if (discountInput && discountInput.checked) amount *= 0.85;
    return amount;
  }

  function isCurrentRakebackOwner(ownerId) {
    if (canManageAllRakebackRows()) return true;
    var currentOwnerId = getCurrentRakebackOwnerId();
    ownerId = String(ownerId || "").trim();
    return !ownerId || !currentOwnerId || ownerId === currentOwnerId;
  }

  function isCurrentRakebackReportOwner(ownerId) {
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
    if (isRakebackRowAccounted(row)) return false;
    return isCurrentRakebackOwner(row.getAttribute("data-rakeback-owner") || "");
  }

  function canRemoveRakebackRow(row) {
    if (!row || !rakebackBody) return false;
    if (isRakebackRowAccounted(row) && !canManageAllRakebackRows()) return false;
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
    var rows = Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]"));
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
      var roomAmount = Math.round(getRakebackRowAmount(row));
      var amount = getRakebackReportAmount(room, roomAmount);
      var reportedAmount = getRakebackRowReportedAmount(row, amount);
      var discount15 = !!(discountInput && discountInput.checked);
      var filled = !!playerId || rake !== 0 || percent !== 0 || roomAmount !== 0;
      if (!includeEmpty && !filled) return null;
      var ownerId = row.getAttribute("data-rakeback-owner") || "";
      if (currentOwnerOnly && !isCurrentRakebackReportOwner(ownerId)) return null;
      var color = normalizeRakebackRowColor(row.getAttribute("data-rakeback-row-color") || "");
      return {
        groupId: row.getAttribute("data-rakeback-group") || "",
        kind: row.getAttribute("data-rakeback-kind") === "addon" ? "addon" : "base",
        room: room,
        playerId: playerId,
        rake: rake,
        percent: percent,
        discount15: discount15,
        roomAmount: roomAmount,
        chipAmount: room === "X" ? roomAmount : null,
        amount: amount,
        reportedAmount: reportedAmount,
        saved: row.getAttribute("data-rakeback-saved") === "1",
        color: color,
        createdAt: getRakebackRowCreatedAt(row, 0),
        standardAt: getRakebackRowStandardAt(row, 0),
        entryAddedAt: getRakebackRowEntryAddedAtForSave(row),
        accounted: isRakebackRowAccounted(row),
        reportedAt: row.getAttribute("data-rakeback-reported-at") || "",
        reportId: row.getAttribute("data-rakeback-report-id") || "",
        ownerId: ownerId || getCurrentRakebackOwnerId(),
      };
    }).filter(Boolean);
  }

  function sumRakebackReportRows(rows) {
    return (Array.isArray(rows) ? rows : []).reduce(function (sum, row) {
      return sum + parseReportNumber(row && row.amount);
    }, 0);
  }

  function getReportStoredRakebackTotal(report) {
    if (report && report.rakeback === "") return 0;
    if (report && Array.isArray(report.rakebackRows) && report.rakebackRows.length) {
      return sumRakebackReportRows(report.rakebackRows);
    }
    return parseReportNumber(report && report.rakeback);
  }

  function getUnaccountedRakebackReportRows() {
    return collectRakebackRows(false, true).filter(function (row) {
      return row && !row.accounted;
    });
  }

  function markUnaccountedRakebackRowsAccounted(reportId, reportedAtOverride) {
    if (!rakebackBody) return;
    var parsedReportedAt = parseRakebackTimeValue(reportedAtOverride);
    var reportedAt = Number.isFinite(parsedReportedAt) ? new Date(parsedReportedAt).toISOString() : new Date().toISOString();
    Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]")).forEach(function (row) {
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

  function syncRakebackTable(options) {
    if (!rakebackBody) return 0;
    options = options || {};
    ensureRakebackBaseRow(activeRakebackRoom);
    removeRakebackDateSeparators();
    Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-total-row]")).forEach(function (row) {
      row.parentNode.removeChild(row);
    });
    var rows = Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]"));
    rows.forEach(function (row, index) {
      getRakebackRowCreatedAt(row, index);
      getRakebackRowStandardAt(row, index);
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
      }
      var rakeInput = row.querySelector("[data-rakeback-rake]");
      var percentInput = row.querySelector("[data-rakeback-percent]");
      var amountEl = row.querySelector("[data-rakeback-amount]");
      var restEl = row.querySelector("[data-rakeback-rest]");
      var rake = parseReportNumber(rakeInput ? rakeInput.value : "");
      if (restEl) {
        var previousRake = getRakebackPreviousRake(row);
        restEl.textContent = formatRakebackCellNumber(rake - previousRake);
      }
      var amount = getRakebackRowAmount(row);
      if (amountEl) amountEl.textContent = formatRakebackAmountCell(amount);
      updateRakebackRowActions(row);
    });
    if (!options.skipSort) rows = sortRakebackRows(rows);
    syncRakebackRoomVisibility();
    insertRakebackDateSeparators();
    var collected = collectRakebackRows(false, false);
    var roomTotals = {};
    RAKEBACK_ROOMS.forEach(function (room) {
      roomTotals[room] = { display: 0, report: 0 };
    });
    collected.forEach(function (row) {
      var room = normalizeRakebackRoom(row.room);
      if (!roomTotals[room]) roomTotals[room] = { display: 0, report: 0 };
      roomTotals[room].display += parseReportNumber(row.roomAmount != null ? row.roomAmount : row.amount);
      roomTotals[room].report += parseReportNumber(row.amount);
    });
    var total = collected.reduce(function (sum, row) {
      return sum + parseReportNumber(row.amount);
    }, 0);
    var reportRakebackTotal = sumRakebackReportRows(getUnaccountedRakebackReportRows());
    var activeTotal = roomTotals[activeRakebackRoom] || { display: 0, report: 0 };
    rakebackRoomTotals = roomTotals;
    if (rakebackRoomTotalLabelEl) rakebackRoomTotalLabelEl.textContent = "Итого " + getRakebackRoomLabel(activeRakebackRoom);
    if (rakebackRoomTotalEl) rakebackRoomTotalEl.textContent = formatRakebackRoomTotal(activeRakebackRoom, activeTotal.display, activeTotal.report);
    if (rakebackTotalEl) rakebackTotalEl.textContent = formatReportRubleNumber(total);
    if (rakebackTotalInput) rakebackTotalInput.value = String(Math.round(reportRakebackTotal) || "");
    if (rakebackTotalsModal && !rakebackTotalsModal.hidden) renderRakebackTotalsModal();
    showRakebackStatus("");
    return reportRakebackTotal;
  }

  function fillRakebackTable(rows, legacyRakeback) {
    if (!rakebackBody) return;
    rakebackDraftNeedsMigration = false;
    rakebackBody.innerHTML = "";
    var list = Array.isArray(rows) ? rows.filter(Boolean) : [];
    if (!list.length && legacyRakeback != null && legacyRakeback !== "" && parseReportNumber(legacyRakeback) !== 0) {
      list = [{ kind: "base", room: "P21", playerId: "", rake: legacyRakeback, percent: 100 }];
    }
    if (!list.length) {
      rakebackBody.appendChild(createRakebackRow({ kind: "base" }));
      syncRakebackTable();
      return;
    }
    list.forEach(function (row) {
      var tr = createRakebackRow({
        groupId: row.groupId || "",
        kind: row.kind === "addon" || row.isAddon ? "addon" : "base",
        room: normalizeRakebackRoom(row.room || "P21"),
        playerId: row.playerId || row.id || "",
        rake: row.rake != null ? row.rake : "",
        percent: row.percent != null ? row.percent : "",
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
      rakebackBody.appendChild(tr);
      if (row.saved) setRakebackRowSaved(tr, true);
    });
    syncRakebackTable();
    if (rakebackDraftNeedsMigration && !editingReportId) saveRakebackDraftRowsNow(true);
  }

  function addRakebackBaseRow() {
    if (!rakebackBody) return;
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
    var groupId = baseRow.getAttribute("data-rakeback-group") || nextRakebackGroupId();
    baseRow.setAttribute("data-rakeback-group", groupId);
    var roomSelect = baseRow.querySelector("[data-rakeback-room]");
    var idInput = baseRow.querySelector("[data-rakeback-player-id]");
    var addon = createRakebackRow({
      kind: "addon",
      groupId: groupId,
      room: roomSelect && roomSelect.value ? roomSelect.value : "P21",
      playerId: idInput && idInput.value ? idInput.value : "",
      entryAddedAt: Date.now(),
    });
    var rows = Array.prototype.slice.call(rakebackBody.querySelectorAll("[data-rakeback-row]"));
    var anchor = baseRow;
    rows.forEach(function (candidate) {
      if (candidate.getAttribute("data-rakeback-group") === groupId) anchor = candidate;
    });
    if (anchor.nextSibling) rakebackBody.insertBefore(addon, anchor.nextSibling);
    else rakebackBody.appendChild(addon);
    syncRakebackTable();
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
      if (!raw) return { rows: [], deletedTemplates: [] };
      var parsed = JSON.parse(raw);
      return {
        rows: parsed && Array.isArray(parsed.rows) ? parsed.rows : [],
        deletedTemplates: normalizeRakebackDeletedTemplates(parsed && parsed.deletedTemplates),
      };
    } catch (e) {
      return { rows: [], deletedTemplates: [] };
    }
  }

  function readRakebackDraftRows() {
    return readRakebackDraftData().rows;
  }

  function readRakebackDeletedTemplates() {
    return readRakebackDraftData().deletedTemplates;
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

  function saveLocalRakebackDraftRows(rows, deletedTemplates) {
    try {
      if (!window.localStorage) return;
      var normalizedDeleted = normalizeRakebackDeletedTemplates(deletedTemplates != null ? deletedTemplates : readRakebackDeletedTemplates());
      if ((rows && rows.length) || normalizedDeleted.length) {
        window.localStorage.setItem(getRakebackDraftKey(), JSON.stringify({ rows: rows || [], deletedTemplates: normalizedDeleted, savedAt: Date.now() }));
      } else {
        window.localStorage.removeItem(getRakebackDraftKey());
      }
    } catch (e) {}
  }

  function rememberDeletedRakebackTemplates(rows) {
    var current = readRakebackDeletedTemplates();
    var byKey = {};
    current.forEach(function (item) {
      var key = getRakebackTemplateKey(item.room, item.playerId);
      if (key) byKey[key] = item;
    });
    Array.prototype.slice.call(rows || []).forEach(function (row) {
      var room = getRakebackRowRoom(row);
      var playerId = getRakebackRowPlayerId(row);
      if (!isRakebackTemplateId(room, playerId)) return;
      var key = getRakebackTemplateKey(room, playerId);
      if (!key || byKey[key]) return;
      byKey[key] = {
        room: normalizeRakebackRoom(room),
        playerId: playerId,
        deletedAt: Date.now(),
        deletedBy: getCurrentRakebackOwnerId(),
      };
    });
    saveLocalRakebackDraftRows(collectRakebackRows(false), Object.keys(byKey).map(function (key) { return byKey[key]; }));
  }

  function saveRakebackDraftRowsNow(force) {
    if (editingReportId) return;
    if (loadingRakebackDraft && !force) return;
    if (rakebackDraftSaveTimer) {
      clearTimeout(rakebackDraftSaveTimer);
      rakebackDraftSaveTimer = null;
    }
    rakebackDraftMutationSeq += 1;
    var rows = collectRakebackRows(false);
    var deletedTemplates = readRakebackDeletedTemplates();
    saveLocalRakebackDraftRows(rows, deletedTemplates);
    var base = getAdminReportApiBase();
    if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return;
    savingRakebackDraft = true;
    var payload = buildAuthBody({
      action: "rakeback_draft_save",
      date: "shared",
      rakebackRows: rows,
      deletedTemplates: deletedTemplates,
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
          saveLocalRakebackDraftRows(data.rakebackDraft.rows, data.rakebackDraft.deletedTemplates || deletedTemplates);
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
    rakebackDraftMutationSeq += 1;
    if (rakebackDraftSaveTimer) clearTimeout(rakebackDraftSaveTimer);
    rakebackDraftSaveTimer = setTimeout(saveRakebackDraftRowsNow, 450);
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

  function loadSharedRakebackDraftRows() {
    var focusedInRakeback = rakebackBody && document.activeElement && rakebackBody.contains(document.activeElement);
    if (focusedInRakeback && Date.now() < rakebackDraftLocalEditUntil) return;
    if (rakebackDraftSaveTimer || savingRakebackDraft) return;
    var base = getAdminReportApiBase();
    if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
      fillRakebackTable(readRakebackDraftRows(), "");
      return;
    }
    var q = typeof pokerRafflesApiQueryLeading === "function" ? pokerRafflesApiQueryLeading() : "?initData=";
    q += (q.indexOf("?") >= 0 ? "&" : "?") + "rakebackDraft=1&date=shared";
    var shouldUploadLocalDraft = false;
    var loadMutationSeq = rakebackDraftMutationSeq;
    loadingRakebackDraft = true;
    fetch(base.replace(/\/$/, "") + "/api/admin-report-shifts" + q)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (loadMutationSeq !== rakebackDraftMutationSeq) return;
        var serverDraft = data && data.ok && data.rakebackDraft ? data.rakebackDraft : null;
        var serverRows = serverDraft && Array.isArray(serverDraft.rows) ? serverDraft.rows : [];
        var serverDeletedTemplates = serverDraft ? normalizeRakebackDeletedTemplates(serverDraft.deletedTemplates) : [];
        var localDraft = readRakebackDraftData();
        var localRows = localDraft.rows || [];
        var deletedTemplates = serverDeletedTemplates.length ? serverDeletedTemplates : (localDraft.deletedTemplates || []);
        var rows = serverRows.length ? serverRows : localRows;
        shouldUploadLocalDraft = !serverRows.length && !serverDeletedTemplates.length && (!!localRows.length || !!(localDraft.deletedTemplates || []).length);
        saveLocalRakebackDraftRows(rows, deletedTemplates);
        fillRakebackTable(rows, "");
        rakebackDraftLocalEditUntil = 0;
      })
      .catch(function () {
        if (loadMutationSeq !== rakebackDraftMutationSeq) return;
        fillRakebackTable(readRakebackDraftRows(), "");
      })
      .then(function () {
        loadingRakebackDraft = false;
        if (shouldUploadLocalDraft) saveRakebackDraftRowsNow(true);
      });
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

  function isRakebackPanelActive() {
    var panel = modal ? modal.querySelector('[data-admin-report-panel="rakeback"]') : null;
    return !!(panel && panel.classList.contains("admin-report-panel--active"));
  }

  function stopRakebackDraftRefresh() {
    if (rakebackDraftRefreshTimer) clearInterval(rakebackDraftRefreshTimer);
    rakebackDraftRefreshTimer = null;
  }

  function startRakebackDraftRefresh() {
    stopRakebackDraftRefresh();
    rakebackDraftRefreshTimer = setInterval(function () {
      if (!modal || modal.getAttribute("aria-hidden") === "true") return;
      if (!isRakebackPanelActive()) return;
      loadSharedRakebackDraftRows();
    }, 4000);
  }

  function setActiveTab(name) {
    if (!tabs || !panels) return;
    if (name === "sent" && !canViewSentReports()) name = "form";
    if (name === "calculations" && !canViewCalculationsReports()) name = "form";
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

  function getFiguresExtraAmountTotal() {
    var total = 0;
    if (!figuresExtrasEl) return total;
    figuresExtrasEl.querySelectorAll("[data-admin-report-figures-extra-amount]").forEach(function (input) {
      total += parseReportNumber(input ? input.value : "");
    });
    return total;
  }

  function formatReportNegativeDisplay(value) {
    var n = parseReportNumber(value);
    if (!n) return formatReportRubleNumber(0);
    return formatReportRubleNumber(-Math.abs(n));
  }

  function updateFiguresTotals() {
    figuresRakeTotal = 0;
    figuresPercentTotal = 0;
    if (figuresRakeInputs && figuresRakeInputs.length) {
      figuresRakeInputs.forEach(function (input, index) {
        var rake = parseReportNumber(input ? input.value : "");
        var rate = parseReportNumber(input ? input.getAttribute("data-admin-report-figures-rate") : "");
        var percent = -(rake * rate / 100);
        figuresRakeTotal += rake;
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
        getFiguresExtraAmountTotal();
      figuresGrandTotalEl.textContent = formatReportRubleNumber(grand);
    }
    updateCalculationGrandTotal();
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
    updateFiguresTotals();
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

  function loadCalculationsReports() {
    if (!canViewCalculationsReports()) return;
    var week = getCalculationWeekMeta();
    if (calculationsWeekLabelEl) calculationsWeekLabelEl.textContent = week.label;
    setCalculationTotalsText({});
    var base = typeof getApiBase === "function" ? getApiBase() : "";
    if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return;
    var q = typeof pokerRafflesApiQueryLeading === "function" ? pokerRafflesApiQueryLeading() : "?initData=";
    fetch(base.replace(/\/$/, "") + "/api/admin-report-shifts" + q)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var items = (data && data.ok && data.reports) ? data.reports : [];
        setCalculationTotalsText(sumCalculationReports(items, week));
      })
      .catch(function () {
        setCalculationTotalsText({});
      });
  }

  function bindFiguresExtraInputs(scope) {
    if (!scope) return;
    scope.querySelectorAll("[data-admin-report-figures-extra-amount]").forEach(function (input) {
      input.addEventListener("input", updateFiguresTotals);
      input.addEventListener("change", updateFiguresTotals);
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
        input.readOnly = figuresSavedLocked;
      });
    }
    if (figuresAddFieldBtn) figuresAddFieldBtn.disabled = figuresSavedLocked;
    if (figuresSaveBtn) figuresSaveBtn.hidden = figuresSavedLocked;
    if (figuresEditBtn) figuresEditBtn.hidden = !figuresSavedLocked;
  }

  function collectCalculationsDraft() {
    function valuesFrom(list) {
      return Array.prototype.slice.call(list || []).map(function (input) { return input ? input.value : ""; });
    }
    var extras = [];
    if (figuresExtrasEl) {
      figuresExtrasEl.querySelectorAll(".admin-report-calculations__field--extra").forEach(function (row) {
        var name = row.querySelector("[data-admin-report-figures-extra-name]");
        var amount = row.querySelector("[data-admin-report-figures-extra-amount]");
        extras.push({ name: name ? name.value : "", amount: amount ? amount.value : "" });
      });
    }
    return {
      cash: valuesFrom(calculationsCashInputs),
      roomWinLoss: valuesFrom(calculationsWinLossInputs),
      rake: valuesFrom(figuresRakeInputs),
      romanPaid: figuresRomanPaidInput ? figuresRomanPaidInput.value : "",
      winLoss: figuresWinLossInput ? figuresWinLossInput.value : "",
      agentsPaid: figuresAgentsPaidInput ? figuresAgentsPaidInput.value : "",
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
    var extras = Array.isArray(draft.extras) ? draft.extras : [];
    ensureFiguresExtraRows(extras.length || 1);
    if (figuresExtrasEl) {
      figuresExtrasEl.querySelectorAll(".admin-report-calculations__field--extra").forEach(function (row, index) {
        var extra = extras[index] || {};
        var name = row.querySelector("[data-admin-report-figures-extra-name]");
        var amount = row.querySelector("[data-admin-report-figures-extra-amount]");
        if (name) name.value = extra.name != null ? extra.name : "";
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
                dateEl.textContent = metaEd.weekday && metaEd.date ? metaEd.weekday + ", " + metaEd.date : (report.weekday || "") + ", " + (report.date || "");
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
    modal.setAttribute("aria-hidden", "true");
    closeRakebackTotalsModal();
    stopRakebackDraftRefresh();
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
    editingReportId = null;
    editingReport = null;
    if (submitBtn) submitBtn.textContent = "Отправить отчёт";
    var info = getShiftReportDateInfo();
    if (dateEl) dateEl.textContent = info.label;
    applySavedRakebackSortMode();
    loadCalculationsDraft();
    updateCalculationCashTotal();
    updateFiguresTotals();
    setActiveTab("form");
    fillReportForm(null, { skipRakeback: true });
    runAdminReportAfterPaint(function () {
      if (!modal || modal.getAttribute("aria-hidden") === "true" || editingReportId) return;
      loadSharedRakebackDraftRows();
      startRakebackDraftRefresh();
    });
  }
  btn.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);
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
          loadSharedRakebackDraftRows();
        }
        if (name === "sent") loadSentReports();
        if (name === "calculations") loadCalculationsReports();
      });
    });
  }
  if (calculationsCashInputs && calculationsCashInputs.length) {
    calculationsCashInputs.forEach(function (input) {
      input.addEventListener("input", updateCalculationCashTotal);
      input.addEventListener("change", updateCalculationCashTotal);
    });
  }
  if (calculationsWinLossInputs && calculationsWinLossInputs.length) {
    calculationsWinLossInputs.forEach(function (input) {
      input.addEventListener("input", updateCalculationGrandTotal);
      input.addEventListener("change", updateCalculationGrandTotal);
    });
  }
  if (figuresRakeInputs && figuresRakeInputs.length) {
    figuresRakeInputs.forEach(function (input) {
      input.addEventListener("input", updateFiguresTotals);
      input.addEventListener("change", updateFiguresTotals);
    });
  }
  [figuresRomanPaidInput, figuresWinLossInput, figuresAgentsPaidInput].forEach(function (input) {
    if (!input) return;
    input.addEventListener("input", updateFiguresTotals);
    input.addEventListener("change", updateFiguresTotals);
  });
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
  if (rakebackRoomTabs && rakebackRoomTabs.length) {
    rakebackRoomTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        setRakebackRoomTab(tab.getAttribute("data-rakeback-room-tab"));
      });
    });
  }
  if (rakebackSearchInput) {
    rakebackSearchInput.addEventListener("input", syncRakebackRoomVisibility);
    rakebackSearchInput.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      rakebackSearchInput.value = "";
      syncRakebackRoomVisibility();
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
      if (!rakebackDragState || rakebackDragState.pointerId !== e.pointerId) return;
      if (rakebackDragState.active) finishRakebackRowDrag(true);
      else cancelPendingRakebackDrag();
    });
    rakebackBody.addEventListener("pointercancel", function (e) {
      if (!rakebackDragState || rakebackDragState.pointerId !== e.pointerId) return;
      if (rakebackDragState.active) finishRakebackRowDrag(false);
      else cancelPendingRakebackDrag();
    });
    rakebackBody.addEventListener("contextmenu", function (e) {
      if (rakebackDragState && e.target && e.target.closest && e.target.closest("[data-rakeback-row]")) e.preventDefault();
    });
    rakebackBody.addEventListener("input", function (e) {
      markRakebackDraftLocalEdit();
      var inputRow = e.target && e.target.closest ? e.target.closest("[data-rakeback-row]") : null;
      ensureRakebackEntryAddedAt(inputRow, false);
      syncRakebackTable({ skipSort: true });
      saveRakebackDraftRows();
    });
    rakebackBody.addEventListener("change", function (e) {
      markRakebackDraftLocalEdit();
      var changeRow = e.target && e.target.closest ? e.target.closest("[data-rakeback-row]") : null;
      if (e.target && e.target.matches && e.target.matches("[data-rakeback-rake],[data-rakeback-percent]") && parseReportNumber(e.target.value) === 0) {
        e.target.value = "";
      }
      ensureRakebackEntryAddedAt(changeRow, false);
      syncRakebackTable();
      saveRakebackDraftRows();
    });
    rakebackBody.addEventListener("focusin", function (e) {
      var focusCell = e.target && e.target.closest ? e.target.closest("td") : null;
      if (focusCell && focusCell.closest("[data-rakeback-row]")) markRakebackCell(focusCell, false);
    });
    rakebackBody.addEventListener("click", function (e) {
      var colorControl = e.target && e.target.closest ? e.target.closest("[data-rakeback-color-toggle],[data-rakeback-color-value],[data-rakeback-color-menu]") : null;
      if (!colorControl) closeRakebackColorMenus();
      var clickedCell = e.target && e.target.closest ? e.target.closest("td") : null;
      if (clickedCell && clickedCell.closest("[data-rakeback-row]") && !colorControl) markRakebackCell(clickedCell, false);
      var copyIdInput = e.target && e.target.closest ? e.target.closest("[data-rakeback-player-id]") : null;
      if (copyIdInput) {
        var copyRow = copyIdInput.closest("[data-rakeback-row]");
        var copyCell = copyIdInput.closest("td");
        var copyId = copyIdInput.value ? String(copyIdInput.value).trim() : "";
        if (copyRow && copyRow.getAttribute("data-rakeback-saved") === "1" && copyId) {
          e.preventDefault();
          copyReportText(copyId).then(function () {
            markRakebackCell(copyCell, true);
            showRakebackStatusBriefly("Скопировано");
          }).catch(function () {
            showRakebackAlert("Не удалось скопировать айди.");
          });
          return;
        }
      }
      var saveBtn = e.target && e.target.closest ? e.target.closest("[data-rakeback-save]") : null;
      if (saveBtn) {
        var saveRow = saveBtn.closest("[data-rakeback-row]");
        if (!saveRow || !isRakebackRowFilled(saveRow)) return;
        markRakebackDraftLocalEdit();
        ensureRakebackEntryAddedAt(saveRow, true);
        syncRakebackTable();
        setRakebackRowSaved(saveRow, true);
        saveRakebackDraftRows();
        showRakebackStatus("Запись добавлена");
        return;
      }
      var editBtn = e.target && e.target.closest ? e.target.closest("[data-rakeback-edit]") : null;
      if (editBtn) {
        var editRow = editBtn.closest("[data-rakeback-row]");
        markRakebackDraftLocalEdit();
        setRakebackRowSaved(editRow, false);
        saveRakebackDraftRows();
        showRakebackStatus("");
        return;
      }
      var addAddonBtn = e.target && e.target.closest ? e.target.closest("[data-rakeback-add-addon]") : null;
      if (addAddonBtn) {
        var addonBaseRow = addAddonBtn.closest("[data-rakeback-row]");
        if (!canAddRakebackAddon(addonBaseRow)) return;
        markRakebackDraftLocalEdit();
        addRakebackAddonRow(addonBaseRow);
        saveRakebackDraftRows();
        showRakebackStatus("Подзапись добавлена");
        return;
      }
      var colorOption = e.target && e.target.closest ? e.target.closest("[data-rakeback-color-value]") : null;
      if (colorOption) {
        var colorRow = colorOption.closest("[data-rakeback-row]");
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
        showRakebackAlert("Нельзя удалять чужие записи, только свои.");
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
      rakeback: Math.round(rakebackTotal * 100) / 100,
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
              loadSharedRakebackDraftRows();
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
initAdminReportModal();

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
initBroadcastReportsModal();

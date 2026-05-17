function initAdminReportModal() {
  var btn = document.getElementById("adminReportBtn");
  var modal = document.getElementById("adminReportModal");
  var closeBtn = document.getElementById("adminReportModalClose");
  var backdrop = document.getElementById("adminReportModalBackdrop");
  var dateEl = document.getElementById("adminReportDate");
  var tabs = modal ? modal.querySelectorAll(".admin-report-tab") : null;
  var panels = modal ? modal.querySelectorAll(".admin-report-panel") : null;
  var submitBtn = document.getElementById("adminReportSubmitBtn");
  var addExtraBtn = document.getElementById("adminReportAddExtraBtn");
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
  var rakebackRoomSwitchSeq = 0;
  var rakebackActiveHydrateTimer = null;
  var rakebackRefreshAttentionDismissed = false;
  var rakebackSearchDetachedRows = [];
  var rakebackSuspendedRows = [];
  var rakebackLazyTemplateRows = [];
  var rakebackDeferredRows = [];
  var rakebackWeekArchiveOpen = {};
  var rakebackWeekRoomArchiveOpen = {};
  var RAKEBACK_TEMPLATE_ONLY_MODE = true;
  var manualRakebackInputTouched = false;
  var issuedRakebackReportRakeTotal = 0;
  var tabsModule = null;
  var formModule = null;
  var calculationsModule = null;
  var sentReportsModule = null;
  var sentReportsModuleLoadPromise = null;
  var REPORT_DAY_MS = 24 * 60 * 60 * 1000;
  var REPORT_WEEK_MS = 7 * REPORT_DAY_MS;
  var REPORT_MSK_SHIFT_MS = 3 * 60 * 60 * 1000;
  var REPORT_DAY_CUTOFF_MS = 16 * 60 * 60 * 1000;
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

  function collectAdminReportIdentityCandidates() {
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
    return users;
  }

  function isKnownAdminUserForReportButton(user) {
    if (!user) return false;
    var id = user.id != null ? String(user.id).replace(/^tg_/, "").trim() : "";
    if (id === "388008256" || id === "2144406710" || id === "1897001087") return true;
    var username = user.username != null ? String(user.username).replace(/^@+/, "").trim().toLowerCase() : "";
    if (username === "roman1_matvienko") return true;
    var email = user.email != null ? String(user.email).trim().toLowerCase() : "";
    return email === "matvienkoro92@gmail.com";
  }

  function isLocalAdminReportDevHost() {
    try {
      return !!(window.location && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"));
    } catch (eHost) {}
    return false;
  }

  function canOpenAdminReportModal() {
    if (isLocalAdminReportDevHost()) return true;
    try {
      var auth = window.__pokerTelegramAuth;
      if (auth && auth.adminAccess === true) return true;
      var rec = typeof pokerReadPwaTgSessionRecord === "function" ? pokerReadPwaTgSessionRecord() : null;
      if (rec && rec.adminAccess === true) return true;
    } catch (eAuth) {}
    var users = collectAdminReportIdentityCandidates();
    for (var i = 0; i < users.length; i++) {
      if (isKnownAdminUserForReportButton(users[i])) return true;
    }
    return false;
  }

  function syncAdminReportButtonVisibility() {
    var allowed = canOpenAdminReportModal();
    btn.classList.toggle("header-admin-report--hidden", !allowed);
    btn.toggleAttribute("aria-hidden", !allowed);
    btn.disabled = !allowed;
    return allowed;
  }
  syncAdminReportButtonVisibility();

  var rakebackStaticData = window.AdminReportRakebackStaticData || {};
  var rakebackTemplates = rakebackStaticData.templates || {};
  var P21_RAKEBACK_TEMPLATE_IDS = rakebackTemplates.P21 || [];
  var X_RAKEBACK_TEMPLATE_IDS = rakebackTemplates.X || [];
  var PP_RAKEBACK_TEMPLATE_IDS = rakebackTemplates.PP || [];
  var SUPR_RAKEBACK_TEMPLATE_IDS = rakebackTemplates.Supr || [];
  var RAKEBACK_TEMPLATE_CREATED_AT = rakebackStaticData.templateCreatedAt || 0;
  var RAKEBACK_TEMPLATE_RESET_AT = rakebackStaticData.templateResetAt || 0;
  var RAKEBACK_ROW_COLORS = rakebackStaticData.rowColors || [];
  var RAKEBACK_ROW_LEGACY_COLOR_MAP = rakebackStaticData.legacyColorMap || {};
  var rakebackModule = window.AdminReportRakebackTab && typeof window.AdminReportRakebackTab.init === "function"
    ? window.AdminReportRakebackTab.init({
      modal: modal,
      body: rakebackBody,
      addBtn: rakebackAddBtn,
      archiveBtn: rakebackArchiveBtn,
      refreshBtn: rakebackRefreshBtn,
      roomTabs: rakebackRoomTabs,
      searchInput: rakebackSearchInput,
      sortSelect: rakebackSortSelect,
      totalEl: rakebackTotalEl,
      roomTotalLabelEl: rakebackRoomTotalLabelEl,
      roomTotalEl: rakebackRoomTotalEl,
      statusEl: rakebackStatusEl,
      summaryEl: rakebackSummaryEl,
      templates: {
        P21: P21_RAKEBACK_TEMPLATE_IDS,
        X: X_RAKEBACK_TEMPLATE_IDS,
        Supr: SUPR_RAKEBACK_TEMPLATE_IDS,
        PP: PP_RAKEBACK_TEMPLATE_IDS,
      },
      activeRoom: activeRakebackRoom,
    })
    : null;
  calculationsModule = window.AdminReportCalculationsTab && typeof window.AdminReportCalculationsTab.init === "function"
    ? window.AdminReportCalculationsTab.init({
      modal: modal,
      elements: {
        root: calculationsRoot,
        cashInputs: calculationsCashInputs,
        winLossInputs: calculationsWinLossInputs,
        rakeInputs: figuresRakeInputs,
        romanPaidInput: figuresRomanPaidInput,
        winLossInput: figuresWinLossInput,
        agentsPaidInput: figuresAgentsPaidInput,
        approxEnabledInput: figuresApproxRakebackEnabledInput,
        approxRateInputs: figuresApproxRateInputs,
        approxRomanRakeInput: figuresApproxRomanRakeInput,
        extrasEl: figuresExtrasEl,
        addFieldBtn: figuresAddFieldBtn,
        groupSaveBtns: calculationGroupSaveBtns,
        groupEditBtns: calculationGroupEditBtns,
        figuresSaveBtn: figuresSaveBtn,
        figuresEditBtn: figuresEditBtn,
      },
      callbacks: {
        addExtraField: addFiguresExtraField,
        bindExtraInputs: bindFiguresExtraInputs,
        editDraft: editCalculationsDraft,
        editFiguresDraft: editFiguresDraft,
        hydrateDraftOnce: hydrateCalculationsDraftOnce,
        loadReports: loadCalculationsReports,
        resetHydration: resetCalculationsHydration,
        saveDraft: saveCalculationsDraft,
        saveDraftQuiet: saveCalculationsDraftQuiet,
        saveFiguresDraft: saveFiguresDraft,
        scheduleCashTotal: scheduleCalculationCashTotal,
        scheduleFiguresTotals: scheduleFiguresTotals,
        scheduleGrandTotal: scheduleCalculationGrandTotal,
        updateCashTotal: updateCalculationCashTotal,
        updateFiguresTotals: updateFiguresTotals,
        updateGrandTotal: updateCalculationGrandTotal,
      },
    })
    : null;
  formModule = window.AdminReportFormTab && typeof window.AdminReportFormTab.init === "function"
    ? window.AdminReportFormTab.init({
      modal: modal,
      submitBtn: submitBtn,
      addExtraBtn: addExtraBtn,
      callbacks: {
        submit: submitAdminReport,
      },
    })
    : null;

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
      var ids = [u.id, u.memberId, u.telegramId, u.telegram_id, u.uid, u.userId, u.user_id];
      for (var idIndex = 0; idIndex < ids.length; idIndex++) {
        var rawId = ids[idIndex] != null ? String(ids[idIndex]).replace(/^tg_/, "").trim() : "";
        if (rawId === "388008256" || rawId === "2144406710") return true;
      }
      var names = [u.username, u.telegramUsername, u.pwaUsername];
      for (var j = 0; j < names.length; j++) {
        var username = names[j] != null ? String(names[j]).replace(/^@+/, "").trim().toLowerCase() : "";
        if (username === "roman1787443" || username === "roman1_matvienko") return true;
      }
      var emails = [u.email, u.pwaEmail, u.mail];
      for (var emailIndex = 0; emailIndex < emails.length; emailIndex++) {
        var email = emails[emailIndex] != null ? String(emails[emailIndex]).trim().toLowerCase() : "";
        if (email === "matvienkoro92@gmail.com") return true;
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
    if (rakebackModule) return rakebackModule.syncAccessControls();
    if (!rakebackRefreshBtn) return false;
    if (RAKEBACK_TEMPLATE_ONLY_MODE) {
      rakebackRefreshBtn.hidden = true;
      rakebackRefreshBtn.disabled = true;
      rakebackRefreshBtn.classList.remove("admin-report-rakeback-refresh-btn--attention");
      return false;
    }
    var allowed = canSyncSharedRakebackDraft();
    rakebackRefreshBtn.hidden = !allowed;
    rakebackRefreshBtn.disabled = !allowed;
    rakebackRefreshBtn.classList.toggle("admin-report-rakeback-refresh-btn--attention", allowed && !rakebackRefreshAttentionDismissed);
    return allowed;
  }

  function syncRakebackAddButtonAccess() {
    if (rakebackModule) return rakebackModule.syncAccessControls();
    if (!rakebackAddBtn) return;
    if (RAKEBACK_TEMPLATE_ONLY_MODE) {
      rakebackAddBtn.hidden = true;
      rakebackAddBtn.disabled = true;
      return;
    }
    var allowed = canEditRakebackDraftRows() && !rakebackArchiveMode;
    rakebackAddBtn.hidden = !allowed;
    rakebackAddBtn.disabled = !allowed;
  }

  function syncRakebackAccessControls() {
    if (rakebackModule) {
      if (typeof rakebackModule.isArchiveMode === "function") rakebackArchiveMode = rakebackModule.isArchiveMode();
      rakebackModule.syncAccessControls();
      return;
    }
    syncRakebackRefreshButtonAccess();
    syncRakebackAddButtonAccess();
    if (RAKEBACK_TEMPLATE_ONLY_MODE && rakebackArchiveBtn) {
      rakebackArchiveBtn.hidden = false;
      rakebackArchiveBtn.disabled = false;
      rakebackArchiveBtn.classList.toggle("admin-report-rakeback-archive-tab--active", rakebackArchiveMode);
      rakebackArchiveBtn.setAttribute("aria-pressed", rakebackArchiveMode ? "true" : "false");
    }
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

  function ensureSentReportsModule() {
    if (sentReportsModule) return sentReportsModule;
    if (!window.AdminReportSentTab || typeof window.AdminReportSentTab.init !== "function") return null;
    sentReportsModule = window.AdminReportSentTab.init({
      list: sentList,
      cacheTtlMs: 5 * 60 * 1000,
      netErrorMessage: typeof POKER_NET_ERR !== "undefined" ? POKER_NET_ERR : "Ошибка сети",
      helpers: {
        buildReportDetailHtml: buildReportDetailHtml,
        escapeReportHtml: escapeReportHtml,
        formatReportRubleNumber: formatReportRubleNumber,
        formatRuWeekdayDateFromTs: formatRuWeekdayDateFromTs,
        getReportStoredRakebackTotal: getReportStoredRakebackTotal,
        mergeReportExtrasIntoMap: mergeReportExtrasIntoMap,
        reportBusinessTimestampMs: reportBusinessTimestampMs,
        reportEffectiveTimestampMs: reportEffectiveTimestampMs,
      },
      callbacks: {
        canView: canViewSentReports,
        editReport: function (id, report) {
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
        },
        syncAccess: syncSentReportsAccess,
      },
    });
    return sentReportsModule;
  }

  sentReportsModule = ensureSentReportsModule();

  tabsModule = window.AdminReportTabs && typeof window.AdminReportTabs.init === "function"
    ? window.AdminReportTabs.init({
      tabs: tabs,
      panels: panels,
      callbacks: {
        canOpen: function (name) {
          if (name === "sent") return canViewSentReports();
          if (name === "calculations") return canViewCalculationsReports();
          return true;
        },
        beforeSwitch: function (name) {
          if (name !== "rakeback" && !rakebackModule) suspendRakebackDomRows();
        },
        afterSwitch: function (name) {
          if (name === "rakeback") {
            if (rakebackModule) runAdminReportAfterPaint(function () { rakebackModule.open(); });
            else {
              applySavedRakebackSortMode();
              runAdminReportAfterPaint(refreshLocalRakebackView);
            }
          }
          if (name === "sent") {
            runAdminReportAfterPaint(function () {
              if (sentReportsModule) sentReportsModule.open();
              else loadSentReports();
            });
          }
          if (name === "calculations") {
            runAdminReportAfterPaint(function () {
              if (calculationsModule) calculationsModule.open();
              else {
                hydrateCalculationsDraftOnce();
                loadCalculationsReports();
              }
            });
          }
        },
      },
    })
    : null;

  var legacyModule = null;

  function createLegacyScope() {
    var scope = {
      btn: btn,
      modal: modal,
      closeBtn: closeBtn,
      backdrop: backdrop,
      dateEl: dateEl,
      tabs: tabs,
      panels: panels,
      submitBtn: submitBtn,
      addExtraBtn: addExtraBtn,
      sentList: sentList,
      formBody: formBody,
      rakebackBody: rakebackBody,
      rakebackAddBtn: rakebackAddBtn,
      rakebackRefreshBtn: rakebackRefreshBtn,
      rakebackSearchInput: rakebackSearchInput,
      rakebackSortSelect: rakebackSortSelect,
      rakebackRoomTabs: rakebackRoomTabs,
      rakebackArchiveBtn: rakebackArchiveBtn,
      rakebackTotalEl: rakebackTotalEl,
      rakebackRoomTotalLabelEl: rakebackRoomTotalLabelEl,
      rakebackRoomTotalEl: rakebackRoomTotalEl,
      rakebackTotalInput: rakebackTotalInput,
      rakebackStatusEl: rakebackStatusEl,
      rakebackGrandTotalBtn: rakebackGrandTotalBtn,
      rakebackTotalsModal: rakebackTotalsModal,
      rakebackTotalsList: rakebackTotalsList,
      rakebackTotalsClose: rakebackTotalsClose,
      rakebackTotalsBackdrop: rakebackTotalsBackdrop,
      rakebackSummaryEl: rakebackSummaryEl,
      calculationsRoot: calculationsRoot,
      calculationGroupSaveBtns: calculationGroupSaveBtns,
      calculationGroupEditBtns: calculationGroupEditBtns,
      calculationGroupStatusEls: calculationGroupStatusEls,
      calculationsCashInputs: calculationsCashInputs,
      calculationsWinLossInputs: calculationsWinLossInputs,
      calculationsArchiveEl: calculationsArchiveEl,
      calculationsCashTotalEl: calculationsCashTotalEl,
      calculationsWinLossTotalEl: calculationsWinLossTotalEl,
      calculationsWeekLabelEl: calculationsWeekLabelEl,
      calculationsDepositEl: calculationsDepositEl,
      calculationsBonusesEl: calculationsBonusesEl,
      calculationsRakebackEl: calculationsRakebackEl,
      calculationsRakeTotalEl: calculationsRakeTotalEl,
      calculationsCashoutEl: calculationsCashoutEl,
      calculationsBotExchipCashoutEl: calculationsBotExchipCashoutEl,
      calculationsGrandTotalEl: calculationsGrandTotalEl,
      figuresRoot: figuresRoot,
      figuresRakeInputs: figuresRakeInputs,
      figuresPercentOutputs: figuresPercentOutputs,
      figuresRakeTotalEl: figuresRakeTotalEl,
      figuresRakeTotalMirrorEl: figuresRakeTotalMirrorEl,
      figuresPercentTotalEl: figuresPercentTotalEl,
      figuresPercentTotalMirrorEl: figuresPercentTotalMirrorEl,
      figuresRakebackEl: figuresRakebackEl,
      figuresBonusesEl: figuresBonusesEl,
      figuresSalaryEl: figuresSalaryEl,
      figuresSaveBtn: figuresSaveBtn,
      figuresEditBtn: figuresEditBtn,
      figuresSaveStatusEl: figuresSaveStatusEl,
      figuresRomanPaidInput: figuresRomanPaidInput,
      figuresWinLossInput: figuresWinLossInput,
      figuresAgentsPaidInput: figuresAgentsPaidInput,
      figuresExtrasEl: figuresExtrasEl,
      figuresAddFieldBtn: figuresAddFieldBtn,
      figuresApproxRakebackEnabledInput: figuresApproxRakebackEnabledInput,
      figuresApproxRateInputs: figuresApproxRateInputs,
      figuresApproxRomanRakeInput: figuresApproxRomanRakeInput,
      figuresApproxRakebackEl: figuresApproxRakebackEl,
      figuresApproxTotalRakeEl: figuresApproxTotalRakeEl,
      figuresApproxAgentsRakeEl: figuresApproxAgentsRakeEl,
      figuresApproxIssuedRakeEl: figuresApproxIssuedRakeEl,
      figuresApproxFormulaEl: figuresApproxFormulaEl,
      figuresGrandTotalEl: figuresGrandTotalEl,
      editingReportId: editingReportId,
      editingReport: editingReport,
      rakebackGroupSeq: rakebackGroupSeq,
      activeRakebackRoom: activeRakebackRoom,
      rakebackArchiveMode: rakebackArchiveMode,
      rakebackRoomTotals: rakebackRoomTotals,
      rakebackDraftSaveTimer: rakebackDraftSaveTimer,
      rakebackDraftSaveIdle: rakebackDraftSaveIdle,
      rakebackDraftLoadIdle: rakebackDraftLoadIdle,
      rakebackStatusClearTimer: rakebackStatusClearTimer,
      rakebackDraftMutationSeq: rakebackDraftMutationSeq,
      rakebackDraftLocalEditUntil: rakebackDraftLocalEditUntil,
      loadingRakebackDraft: loadingRakebackDraft,
      savingRakebackDraft: savingRakebackDraft,
      rakebackDraftNeedsMigration: rakebackDraftNeedsMigration,
      rakebackDragState: rakebackDragState,
      rakebackPendingIdCopy: rakebackPendingIdCopy,
      rakebackSuppressIdClickInput: rakebackSuppressIdClickInput,
      rakebackSuppressIdClickAt: rakebackSuppressIdClickAt,
      rakebackDeferredSyncSeq: rakebackDeferredSyncSeq,
      rakebackSummaryTimer: rakebackSummaryTimer,
      rakebackSearchRefreshTimer: rakebackSearchRefreshTimer,
      rakebackDecorationTimer: rakebackDecorationTimer,
      rakebackDecorationSeq: rakebackDecorationSeq,
      rakebackRoomSwitchSeq: rakebackRoomSwitchSeq,
      rakebackActiveHydrateTimer: rakebackActiveHydrateTimer,
      rakebackRefreshAttentionDismissed: rakebackRefreshAttentionDismissed,
      rakebackSearchDetachedRows: rakebackSearchDetachedRows,
      rakebackSuspendedRows: rakebackSuspendedRows,
      rakebackLazyTemplateRows: rakebackLazyTemplateRows,
      rakebackDeferredRows: rakebackDeferredRows,
      rakebackWeekArchiveOpen: rakebackWeekArchiveOpen,
      rakebackWeekRoomArchiveOpen: rakebackWeekRoomArchiveOpen,
      RAKEBACK_TEMPLATE_ONLY_MODE: RAKEBACK_TEMPLATE_ONLY_MODE,
      manualRakebackInputTouched: manualRakebackInputTouched,
      issuedRakebackReportRakeTotal: issuedRakebackReportRakeTotal,
      tabsModule: tabsModule,
      formModule: formModule,
      calculationsModule: calculationsModule,
      sentReportsModule: sentReportsModule,
      DEFAULT_RAKEBACK_SORT_MODE: DEFAULT_RAKEBACK_SORT_MODE,
      RAKEBACK_ROOMS: RAKEBACK_ROOMS,
      RAKEBACK_EDITOR_IDS: RAKEBACK_EDITOR_IDS,
      RAKEBACK_EDITOR_USERNAMES: RAKEBACK_EDITOR_USERNAMES,
      RAKEBACK_REFRESH_ACCESS_IDS: RAKEBACK_REFRESH_ACCESS_IDS,
      RAKEBACK_REFRESH_ACCESS_USERNAMES: RAKEBACK_REFRESH_ACCESS_USERNAMES,
      RAKEBACK_REFRESH_ACCESS_EMAILS: RAKEBACK_REFRESH_ACCESS_EMAILS,
      rakebackAccessCache: rakebackAccessCache,
      rakebackStaticData: rakebackStaticData,
      rakebackTemplates: rakebackTemplates,
      P21_RAKEBACK_TEMPLATE_IDS: P21_RAKEBACK_TEMPLATE_IDS,
      X_RAKEBACK_TEMPLATE_IDS: X_RAKEBACK_TEMPLATE_IDS,
      PP_RAKEBACK_TEMPLATE_IDS: PP_RAKEBACK_TEMPLATE_IDS,
      SUPR_RAKEBACK_TEMPLATE_IDS: SUPR_RAKEBACK_TEMPLATE_IDS,
      RAKEBACK_TEMPLATE_CREATED_AT: RAKEBACK_TEMPLATE_CREATED_AT,
      RAKEBACK_TEMPLATE_RESET_AT: RAKEBACK_TEMPLATE_RESET_AT,
      RAKEBACK_ROW_COLORS: RAKEBACK_ROW_COLORS,
      RAKEBACK_ROW_LEGACY_COLOR_MAP: RAKEBACK_ROW_LEGACY_COLOR_MAP,
      rakebackModule: rakebackModule,
      canViewSentReports: canViewSentReports,
      canViewCalculationsReports: canViewCalculationsReports,
      getRakebackIdentityCandidates: getRakebackIdentityCandidates,
      rakebackIdentityMatches: rakebackIdentityMatches,
      getRakebackAccessState: getRakebackAccessState,
      resetRakebackAccessCache: resetRakebackAccessCache,
      canManageAllRakebackRows: canManageAllRakebackRows,
      canRefreshSharedRakebackDraft: canRefreshSharedRakebackDraft,
      canSyncSharedRakebackDraft: canSyncSharedRakebackDraft,
      canEditRakebackDraftRows: canEditRakebackDraftRows,
      syncRakebackRefreshButtonAccess: syncRakebackRefreshButtonAccess,
      syncRakebackAddButtonAccess: syncRakebackAddButtonAccess,
      syncRakebackAccessControls: syncRakebackAccessControls,
      syncSentReportsAccess: syncSentReportsAccess,
      escapeReportHtml: escapeReportHtml,
      normalizeReportDetailName: normalizeReportDetailName,
      isReportUsdtRateFieldName: isReportUsdtRateFieldName,
      isReportManualRakebackFieldName: isReportManualRakebackFieldName,
      isReportAnyaSalaryFieldName: isReportAnyaSalaryFieldName,
      getReportAnyaSalaryTotal: getReportAnyaSalaryTotal,
      createCalculationsLogicScope: createCalculationsLogicScope,
      getCalculationsLogic: getCalculationsLogic,
      callCalculationsLogic: callCalculationsLogic,
      updateCalculationCashTotal: updateCalculationCashTotal,
      scheduleCalculationCashTotal: scheduleCalculationCashTotal,
      getCalculationRoomWinLossTotal: getCalculationRoomWinLossTotal,
      updateCalculationGrandTotal: updateCalculationGrandTotal,
      scheduleCalculationGrandTotal: scheduleCalculationGrandTotal,
      getFiguresExtraAmountTotal: getFiguresExtraAmountTotal,
      getFiguresExtraRakeTotal: getFiguresExtraRakeTotal,
      getApproxFiguresRakebackAmount: getApproxFiguresRakebackAmount,
      getApproxFiguresRakebackRate: getApproxFiguresRakebackRate,
      getIssuedRakebackReportRakeTotal: getIssuedRakebackReportRakeTotal,
      getApproxFiguresRakebackBase: getApproxFiguresRakebackBase,
      syncFiguresExtraRow: syncFiguresExtraRow,
      formatReportNegativeDisplay: formatReportNegativeDisplay,
      updateFiguresTotals: updateFiguresTotals,
      scheduleFiguresTotals: scheduleFiguresTotals,
      setCalculationTotalsText: setCalculationTotalsText,
      sumCalculationReports: sumCalculationReports,
      getCalculationArchiveReportRows: getCalculationArchiveReportRows,
      renderCalculationArchiveReport: renderCalculationArchiveReport,
      renderCalculationArchiveWeek: renderCalculationArchiveWeek,
      renderCalculationArchive: renderCalculationArchive,
      loadCalculationsReports: loadCalculationsReports,
      bindFiguresExtraInputs: bindFiguresExtraInputs,
      addFiguresExtraField: addFiguresExtraField,
      getCalculationGroupStatusEl: getCalculationGroupStatusEl,
      setCalculationsStatus: setCalculationsStatus,
      setFiguresStatus: setFiguresStatus,
      getCalculationGroupInputSelector: getCalculationGroupInputSelector,
      setCalculationGroupButtons: setCalculationGroupButtons,
      setCalculationGroupLocked: setCalculationGroupLocked,
      setCalculationsLocked: setCalculationsLocked,
      setFiguresLocked: setFiguresLocked,
      saveCalculationsDraftQuiet: saveCalculationsDraftQuiet,
      collectCalculationsDraft: collectCalculationsDraft,
      ensureFiguresExtraRows: ensureFiguresExtraRows,
      applyCalculationsDraft: applyCalculationsDraft,
      loadCalculationsDraft: loadCalculationsDraft,
      hydrateCalculationsDraftOnce: hydrateCalculationsDraftOnce,
      saveCalculationsDraft: saveCalculationsDraft,
      editCalculationsDraft: editCalculationsDraft,
      saveFiguresDraft: saveFiguresDraft,
      editFiguresDraft: editFiguresDraft,
      resetCalculationsHydration: resetCalculationsHydration,
      getReportExtraEntries: getReportExtraEntries,
      getReportUsdtRate: getReportUsdtRate,
      buildReportDetailHtml: buildReportDetailHtml,
      loadSentReports: loadSentReports,
      closeModal: closeModal,
      openModal: openModal,
      createFormLogicScope: createFormLogicScope,
      getFormLogicModule: getFormLogicModule,
      callFormLogicModule: callFormLogicModule,
      buildPayload: buildPayload,
      setFormVal: setFormVal,
      fillReportForm: fillReportForm,
      submitAdminReport: submitAdminReport,
      window: typeof window !== "undefined" ? window : undefined,
      document: typeof document !== "undefined" ? document : undefined,
      navigator: typeof navigator !== "undefined" ? navigator : undefined,
      fetch: typeof fetch !== "undefined" ? fetch : undefined,
      setTimeout: typeof setTimeout !== "undefined" ? setTimeout : undefined,
      clearTimeout: typeof clearTimeout !== "undefined" ? clearTimeout : undefined,
      Date: typeof Date !== "undefined" ? Date : undefined,
      Intl: typeof Intl !== "undefined" ? Intl : undefined,
      Promise: typeof Promise !== "undefined" ? Promise : undefined,
      Number: typeof Number !== "undefined" ? Number : undefined,
      Math: typeof Math !== "undefined" ? Math : undefined,
      Array: typeof Array !== "undefined" ? Array : undefined,
      Object: typeof Object !== "undefined" ? Object : undefined,
      String: typeof String !== "undefined" ? String : undefined,
      parseFloat: typeof parseFloat !== "undefined" ? parseFloat : undefined,
      isNaN: typeof isNaN !== "undefined" ? isNaN : undefined,
      confirm: typeof confirm !== "undefined" ? confirm : undefined,
      alert: typeof alert !== "undefined" ? alert : undefined,
      getApiBase: typeof getApiBase !== "undefined" ? getApiBase : undefined,
      pokerApiHasCredential: typeof pokerApiHasCredential !== "undefined" ? pokerApiHasCredential : undefined,
      pokerGuestOrAuthedPostBody: typeof pokerGuestOrAuthedPostBody !== "undefined" ? pokerGuestOrAuthedPostBody : undefined,
      pokerRafflesApiQueryLeading: typeof pokerRafflesApiQueryLeading !== "undefined" ? pokerRafflesApiQueryLeading : undefined,
      POKER_NET_ERR: typeof POKER_NET_ERR !== "undefined" ? POKER_NET_ERR : undefined
    };
    Object.defineProperty(scope, "activeRakebackRoom", {
      get: function () { return activeRakebackRoom; },
      set: function (value) { activeRakebackRoom = value; }
    });
    Object.defineProperty(scope, "rakebackArchiveMode", {
      get: function () { return rakebackArchiveMode; },
      set: function (value) { rakebackArchiveMode = value; }
    });
    Object.defineProperty(scope, "rakebackRoomTotals", {
      get: function () { return rakebackRoomTotals; },
      set: function (value) { rakebackRoomTotals = value; }
    });
    Object.defineProperty(scope, "rakebackDraftSaveTimer", {
      get: function () { return rakebackDraftSaveTimer; },
      set: function (value) { rakebackDraftSaveTimer = value; }
    });
    Object.defineProperty(scope, "rakebackDraftSaveIdle", {
      get: function () { return rakebackDraftSaveIdle; },
      set: function (value) { rakebackDraftSaveIdle = value; }
    });
    Object.defineProperty(scope, "rakebackDraftLoadIdle", {
      get: function () { return rakebackDraftLoadIdle; },
      set: function (value) { rakebackDraftLoadIdle = value; }
    });
    Object.defineProperty(scope, "rakebackStatusClearTimer", {
      get: function () { return rakebackStatusClearTimer; },
      set: function (value) { rakebackStatusClearTimer = value; }
    });
    Object.defineProperty(scope, "rakebackDraftMutationSeq", {
      get: function () { return rakebackDraftMutationSeq; },
      set: function (value) { rakebackDraftMutationSeq = value; }
    });
    Object.defineProperty(scope, "rakebackDraftLocalEditUntil", {
      get: function () { return rakebackDraftLocalEditUntil; },
      set: function (value) { rakebackDraftLocalEditUntil = value; }
    });
    Object.defineProperty(scope, "loadingRakebackDraft", {
      get: function () { return loadingRakebackDraft; },
      set: function (value) { loadingRakebackDraft = value; }
    });
    Object.defineProperty(scope, "savingRakebackDraft", {
      get: function () { return savingRakebackDraft; },
      set: function (value) { savingRakebackDraft = value; }
    });
    Object.defineProperty(scope, "rakebackDraftNeedsMigration", {
      get: function () { return rakebackDraftNeedsMigration; },
      set: function (value) { rakebackDraftNeedsMigration = value; }
    });
    Object.defineProperty(scope, "rakebackDragState", {
      get: function () { return rakebackDragState; },
      set: function (value) { rakebackDragState = value; }
    });
    Object.defineProperty(scope, "rakebackPendingIdCopy", {
      get: function () { return rakebackPendingIdCopy; },
      set: function (value) { rakebackPendingIdCopy = value; }
    });
    Object.defineProperty(scope, "rakebackSuppressIdClickInput", {
      get: function () { return rakebackSuppressIdClickInput; },
      set: function (value) { rakebackSuppressIdClickInput = value; }
    });
    Object.defineProperty(scope, "rakebackSuppressIdClickAt", {
      get: function () { return rakebackSuppressIdClickAt; },
      set: function (value) { rakebackSuppressIdClickAt = value; }
    });
    Object.defineProperty(scope, "rakebackDeferredSyncSeq", {
      get: function () { return rakebackDeferredSyncSeq; },
      set: function (value) { rakebackDeferredSyncSeq = value; }
    });
    Object.defineProperty(scope, "rakebackSummaryTimer", {
      get: function () { return rakebackSummaryTimer; },
      set: function (value) { rakebackSummaryTimer = value; }
    });
    Object.defineProperty(scope, "rakebackSearchRefreshTimer", {
      get: function () { return rakebackSearchRefreshTimer; },
      set: function (value) { rakebackSearchRefreshTimer = value; }
    });
    Object.defineProperty(scope, "rakebackDecorationTimer", {
      get: function () { return rakebackDecorationTimer; },
      set: function (value) { rakebackDecorationTimer = value; }
    });
    Object.defineProperty(scope, "rakebackDecorationSeq", {
      get: function () { return rakebackDecorationSeq; },
      set: function (value) { rakebackDecorationSeq = value; }
    });
    Object.defineProperty(scope, "rakebackRoomSwitchSeq", {
      get: function () { return rakebackRoomSwitchSeq; },
      set: function (value) { rakebackRoomSwitchSeq = value; }
    });
    Object.defineProperty(scope, "rakebackActiveHydrateTimer", {
      get: function () { return rakebackActiveHydrateTimer; },
      set: function (value) { rakebackActiveHydrateTimer = value; }
    });
    Object.defineProperty(scope, "rakebackRefreshAttentionDismissed", {
      get: function () { return rakebackRefreshAttentionDismissed; },
      set: function (value) { rakebackRefreshAttentionDismissed = value; }
    });
    Object.defineProperty(scope, "rakebackSearchDetachedRows", {
      get: function () { return rakebackSearchDetachedRows; },
      set: function (value) { rakebackSearchDetachedRows = value; }
    });
    Object.defineProperty(scope, "rakebackSuspendedRows", {
      get: function () { return rakebackSuspendedRows; },
      set: function (value) { rakebackSuspendedRows = value; }
    });
    Object.defineProperty(scope, "rakebackLazyTemplateRows", {
      get: function () { return rakebackLazyTemplateRows; },
      set: function (value) { rakebackLazyTemplateRows = value; }
    });
    Object.defineProperty(scope, "rakebackDeferredRows", {
      get: function () { return rakebackDeferredRows; },
      set: function (value) { rakebackDeferredRows = value; }
    });
    Object.defineProperty(scope, "rakebackWeekArchiveOpen", {
      get: function () { return rakebackWeekArchiveOpen; },
      set: function (value) { rakebackWeekArchiveOpen = value; }
    });
    Object.defineProperty(scope, "rakebackWeekRoomArchiveOpen", {
      get: function () { return rakebackWeekRoomArchiveOpen; },
      set: function (value) { rakebackWeekRoomArchiveOpen = value; }
    });
    Object.defineProperty(scope, "manualRakebackInputTouched", {
      get: function () { return manualRakebackInputTouched; },
      set: function (value) { manualRakebackInputTouched = value; }
    });
    Object.defineProperty(scope, "issuedRakebackReportRakeTotal", {
      get: function () { return issuedRakebackReportRakeTotal; },
      set: function (value) { issuedRakebackReportRakeTotal = value; }
    });
    return scope;
  }

  function getLegacyModule() {
    if (!legacyModule && window.AdminReportLegacy && typeof window.AdminReportLegacy.init === "function") {
      legacyModule = window.AdminReportLegacy.init(createLegacyScope());
    }
    return legacyModule;
  }

  function callLegacyModule(method, args) {
    try {
      var mod = getLegacyModule();
      return mod && typeof mod[method] === "function" ? mod[method].apply(mod, args || []) : undefined;
    } catch (e) {
      return undefined;
    }
  }

  function fallbackParseReportNumber(raw) {
    var n = typeof raw === "number" ? raw : parseFloat(String(raw != null ? raw : "").replace(/\s+/g, "").replace("₽", "").replace(",", "."));
    return isNaN(n) ? 0 : n;
  }

  function fallbackFormatReportNumber(n) {
    var num = fallbackParseReportNumber(n);
    if (!num) return "0";
    var rounded = Math.round(num * 100) / 100;
    return String(rounded).replace(".", ",");
  }

  function fallbackFormatReportInputNumber(n) {
    var num = fallbackParseReportNumber(n);
    if (!num) return "";
    var rounded = Math.round(num * 100) / 100;
    return String(rounded);
  }

  function fallbackFormatReportRubleNumber(n) {
    var num = fallbackParseReportNumber(n);
    if (!num) return "0";
    return String(Math.round(num));
  }

  function fallbackSumRakebackReportRows(rows) {
    return (Array.isArray(rows) ? rows : []).reduce(function (sum, row) {
      return sum + fallbackParseReportNumber(row && row.amount);
    }, 0);
  }

  function fallbackMoscowPartsFromTs(ts) {
    var date = new Date(ts);
    var parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Europe/Moscow",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(date);
    var out = {};
    parts.forEach(function (part) {
      if (part.type !== "literal") out[part.type] = part.value;
    });
    return { y: out.year, m: out.month, d: out.day };
  }

  function fallbackReportBusinessTimestampMs(raw) {
    raw = raw == null ? Date.now() : Number(raw);
    if (!Number.isFinite(raw)) raw = Date.now();
    var p = fallbackMoscowPartsFromTs(raw - REPORT_DAY_CUTOFF_MS);
    return new Date(p.y + "-" + p.m + "-" + p.d + "T12:00:00+03:00").getTime();
  }

  function fallbackReportEffectiveTimestampMs(r) {
    var raw = r && r.createdAt ? new Date(r.createdAt).getTime() : NaN;
    if (!r || !r.createdAt || raw !== raw) return raw;
    return fallbackReportBusinessTimestampMs(raw);
  }

  function fallbackFormatRuWeekdayDateFromTs(ts) {
    if (ts !== ts) return { weekday: "", date: "" };
    var cap = function (s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ""; };
    var wd = new Intl.DateTimeFormat("ru-RU", { timeZone: "Europe/Moscow", weekday: "long" }).format(new Date(ts));
    var dd = new Intl.DateTimeFormat("ru-RU", { timeZone: "Europe/Moscow", day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(ts));
    return { weekday: cap(wd), date: dd };
  }

  function fallbackWeekStartMsForReport(ts) {
    var msk = new Date(ts + REPORT_MSK_SHIFT_MS);
    var y = msk.getUTCFullYear();
    var m = msk.getUTCMonth();
    var d = msk.getUTCDate();
    var wd = msk.getUTCDay();
    var daysFromMonday = (wd + 6) % 7;
    var mondayStartMskMs = Date.UTC(y, m, d, 0, 0, 0, 0) - daysFromMonday * REPORT_DAY_MS;
    return mondayStartMskMs - REPORT_MSK_SHIFT_MS;
  }

  function fallbackFormatReportWeekBoundary(ms) {
    return new Intl.DateTimeFormat("ru-RU", {
      timeZone: "Europe/Moscow",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(ms));
  }

  function parseReportNumber() {
    var value = callLegacyModule("parseReportNumber", arguments);
    return value !== undefined ? value : fallbackParseReportNumber(arguments[0]);
  }

  function formatReportNumber() {
    var value = callLegacyModule("formatReportNumber", arguments);
    return value !== undefined ? value : fallbackFormatReportNumber(arguments[0]);
  }

  function formatReportInputNumber() {
    var value = callLegacyModule("formatReportInputNumber", arguments);
    return value !== undefined ? value : fallbackFormatReportInputNumber(arguments[0]);
  }

  function formatRakebackCellNumber() {
    return callLegacyModule("formatRakebackCellNumber", arguments);
  }

  function formatRakebackAmountCell() {
    return callLegacyModule("formatRakebackAmountCell", arguments);
  }

  function formatReportRubleNumber() {
    var value = callLegacyModule("formatReportRubleNumber", arguments);
    return value !== undefined ? value : fallbackFormatReportRubleNumber(arguments[0]);
  }

  function getRakebackRoomLabel() {
    return callLegacyModule("getRakebackRoomLabel", arguments);
  }

  function getRakebackRoomMultiplier() {
    return callLegacyModule("getRakebackRoomMultiplier", arguments);
  }

  function getRakebackReportAmount() {
    return callLegacyModule("getRakebackReportAmount", arguments);
  }

  function getRakebackReportRake() {
    return callLegacyModule("getRakebackReportRake", arguments);
  }

  function getRakebackRowRawRake() {
    return callLegacyModule("getRakebackRowRawRake", arguments);
  }

  function getRakebackRowFullReportRake() {
    return callLegacyModule("getRakebackRowFullReportRake", arguments);
  }

  function addRakebackLatestGroupRake() {
    return callLegacyModule("addRakebackLatestGroupRake", arguments);
  }

  function sumRakebackLatestGroupRake() {
    return callLegacyModule("sumRakebackLatestGroupRake", arguments);
  }

  function addCollectedLatestGroupRake() {
    return callLegacyModule("addCollectedLatestGroupRake", arguments);
  }

  function getCollectedRowFullReportRake() {
    return callLegacyModule("getCollectedRowFullReportRake", arguments);
  }

  function sumCollectedLatestGroupRake() {
    return callLegacyModule("sumCollectedLatestGroupRake", arguments);
  }

  function formatRakebackRoomTotal() {
    return callLegacyModule("formatRakebackRoomTotal", arguments);
  }

  function formatRakebackSummaryPair() {
    return callLegacyModule("formatRakebackSummaryPair", arguments);
  }

  function copyReportText() {
    return callLegacyModule("copyReportText", arguments);
  }

  function nextRakebackGroupId() {
    return callLegacyModule("nextRakebackGroupId", arguments);
  }

  function getCurrentRakebackOwnerId() {
    return callLegacyModule("getCurrentRakebackOwnerId", arguments);
  }

  function getRakebackRoomOptions() {
    return callLegacyModule("getRakebackRoomOptions", arguments);
  }

  function getRakebackTotalsByDate() {
    return callLegacyModule("getRakebackTotalsByDate", arguments);
  }

  function renderRakebackTotalsModal() {
    return callLegacyModule("renderRakebackTotalsModal", arguments);
  }

  function openRakebackTotalsModal() {
    return callLegacyModule("openRakebackTotalsModal", arguments);
  }

  function closeRakebackTotalsModal() {
    return callLegacyModule("closeRakebackTotalsModal", arguments);
  }

  function normalizeRakebackRowColor() {
    return callLegacyModule("normalizeRakebackRowColor", arguments);
  }

  function getRakebackRowColorButtons() {
    return callLegacyModule("getRakebackRowColorButtons", arguments);
  }

  function closeRakebackColorMenus() {
    return callLegacyModule("closeRakebackColorMenus", arguments);
  }

  function markRakebackCell() {
    return callLegacyModule("markRakebackCell", arguments);
  }

  function applyRakebackRowColor() {
    return callLegacyModule("applyRakebackRowColor", arguments);
  }

  function normalizeRakebackRoom() {
    return callLegacyModule("normalizeRakebackRoom", arguments);
  }

  function parseRakebackTimeValue() {
    return callLegacyModule("parseRakebackTimeValue", arguments);
  }

  function getFirstRakebackTimeValue() {
    return callLegacyModule("getFirstRakebackTimeValue", arguments);
  }

  function getRakebackTemplateIdsForRoom() {
    return callLegacyModule("getRakebackTemplateIdsForRoom", arguments);
  }

  function getRakebackTemplateCreatedAt() {
    return callLegacyModule("getRakebackTemplateCreatedAt", arguments);
  }

  function isRakebackTemplateEntryStamp() {
    return callLegacyModule("isRakebackTemplateEntryStamp", arguments);
  }

  function getRakebackTemplateKey() {
    return callLegacyModule("getRakebackTemplateKey", arguments);
  }

  function isRakebackTemplateId() {
    return callLegacyModule("isRakebackTemplateId", arguments);
  }

  function normalizeRakebackDeletedTemplates() {
    return callLegacyModule("normalizeRakebackDeletedTemplates", arguments);
  }

  function isRakebackTemplateLikeData() {
    return callLegacyModule("isRakebackTemplateLikeData", arguments);
  }

  function isRakebackLazyTemplateData() {
    return callLegacyModule("isRakebackLazyTemplateData", arguments);
  }

  function normalizeRakebackLazyTemplateData() {
    return callLegacyModule("normalizeRakebackLazyTemplateData", arguments);
  }

  function rememberRakebackLazyTemplateRows() {
    return callLegacyModule("rememberRakebackLazyTemplateRows", arguments);
  }

  function hasRakebackStoredEntryData() {
    return callLegacyModule("hasRakebackStoredEntryData", arguments);
  }

  function getRakebackStoredRowMergeKey() {
    return callLegacyModule("getRakebackStoredRowMergeKey", arguments);
  }

  function getRakebackDeletedRowKey() {
    return callLegacyModule("getRakebackDeletedRowKey", arguments);
  }

  function getRakebackDeletedStoredRowKey() {
    return callLegacyModule("getRakebackDeletedStoredRowKey", arguments);
  }

  function normalizeRakebackDeletedRows() {
    return callLegacyModule("normalizeRakebackDeletedRows", arguments);
  }

  function isDeletedRakebackTemplateRow() {
    return callLegacyModule("isDeletedRakebackTemplateRow", arguments);
  }

  function filterDeletedRakebackStoredRows() {
    return callLegacyModule("filterDeletedRakebackStoredRows", arguments);
  }

  function isRakebackEmptyTemplateDuplicateRow() {
    return callLegacyModule("isRakebackEmptyTemplateDuplicateRow", arguments);
  }

  function dedupeRakebackTemplateRows() {
    return callLegacyModule("dedupeRakebackTemplateRows", arguments);
  }

  function mergeRakebackDraftRows() {
    return callLegacyModule("mergeRakebackDraftRows", arguments);
  }

  function createRakebackRow() {
    return callLegacyModule("createRakebackRow", arguments);
  }

  function normalizeRakebackStoredRowData() {
    return callLegacyModule("normalizeRakebackStoredRowData", arguments);
  }

  function isRakebackStoredCarryForwardPlaceholder() {
    return callLegacyModule("isRakebackStoredCarryForwardPlaceholder", arguments);
  }

  function getRakebackStoredRowEntryStamp() {
    return callLegacyModule("getRakebackStoredRowEntryStamp", arguments);
  }

  function isRakebackStoredRowArchived() {
    return callLegacyModule("isRakebackStoredRowArchived", arguments);
  }

  function getRakebackRowRoom() {
    return callLegacyModule("getRakebackRowRoom", arguments);
  }

  function syncRakebackRowLookupAttrs() {
    return callLegacyModule("syncRakebackRowLookupAttrs", arguments);
  }

  function getRakebackRowRoomFast() {
    return callLegacyModule("getRakebackRowRoomFast", arguments);
  }

  function getRakebackRowPlayerIdFast() {
    return callLegacyModule("getRakebackRowPlayerIdFast", arguments);
  }

  function getRakebackSearchQuery() {
    return callLegacyModule("getRakebackSearchQuery", arguments);
  }

  function getRakebackRowPlayerId() {
    return callLegacyModule("getRakebackRowPlayerId", arguments);
  }

  function getRakebackSortMode() {
    return callLegacyModule("getRakebackSortMode", arguments);
  }

  function normalizeRakebackSortMode() {
    return callLegacyModule("normalizeRakebackSortMode", arguments);
  }

  function getRakebackSortStorageKey() {
    return callLegacyModule("getRakebackSortStorageKey", arguments);
  }

  function readSavedRakebackSortMode() {
    return callLegacyModule("readSavedRakebackSortMode", arguments);
  }

  function saveRakebackSortMode() {
    return callLegacyModule("saveRakebackSortMode", arguments);
  }

  function setRakebackSortMode() {
    return callLegacyModule("setRakebackSortMode", arguments);
  }

  function applySavedRakebackSortMode() {
    return callLegacyModule("applySavedRakebackSortMode", arguments);
  }

  function getRakebackRowCreatedAt() {
    return callLegacyModule("getRakebackRowCreatedAt", arguments);
  }

  function getRakebackRowStandardAt() {
    return callLegacyModule("getRakebackRowStandardAt", arguments);
  }

  function getRakebackTopStandardAt() {
    return callLegacyModule("getRakebackTopStandardAt", arguments);
  }

  function getRakebackRowEntryAddedAtForSave() {
    return callLegacyModule("getRakebackRowEntryAddedAtForSave", arguments);
  }

  function hasRakebackRowEntryTimeData() {
    return callLegacyModule("hasRakebackRowEntryTimeData", arguments);
  }

  function getRakebackRowBoundEntryAddedAt() {
    return callLegacyModule("getRakebackRowBoundEntryAddedAt", arguments);
  }

  function setRakebackGroupEntryAddedAt() {
    return callLegacyModule("setRakebackGroupEntryAddedAt", arguments);
  }

  function replaceRakebackGroupEntryAddedAt() {
    return callLegacyModule("replaceRakebackGroupEntryAddedAt", arguments);
  }

  function ensureRakebackEntryAddedAt() {
    return callLegacyModule("ensureRakebackEntryAddedAt", arguments);
  }

  function getRakebackRowEntryAddedAt() {
    return callLegacyModule("getRakebackRowEntryAddedAt", arguments);
  }

  function syncExplicitZeroRakeMarker() {
    return callLegacyModule("syncExplicitZeroRakeMarker", arguments);
  }

  function getRakebackGroupKeyRow() {
    return callLegacyModule("getRakebackGroupKeyRow", arguments);
  }

  function getRakebackGroupEntryAddedAt() {
    return callLegacyModule("getRakebackGroupEntryAddedAt", arguments);
  }

  function getRakebackWeekStart() {
    return callLegacyModule("getRakebackWeekStart", arguments);
  }

  function getCurrentRakebackWeekStart() {
    return callLegacyModule("getCurrentRakebackWeekStart", arguments);
  }

  function formatRakebackWeekRange() {
    return callLegacyModule("formatRakebackWeekRange", arguments);
  }

  function isRakebackEntryArchivedByStamp() {
    return callLegacyModule("isRakebackEntryArchivedByStamp", arguments);
  }

  function isRakebackRowInArchive() {
    return callLegacyModule("isRakebackRowInArchive", arguments);
  }

  function isRakebackGroupInArchive() {
    return callLegacyModule("isRakebackGroupInArchive", arguments);
  }

  function isRakebackCollectedRowArchived() {
    return callLegacyModule("isRakebackCollectedRowArchived", arguments);
  }

  function getRakebackMoscowDayKey() {
    return callLegacyModule("getRakebackMoscowDayKey", arguments);
  }

  function getRakebackDateSeparatorLabel() {
    return callLegacyModule("getRakebackDateSeparatorLabel", arguments);
  }

  function removeRakebackDateSeparators() {
    return callLegacyModule("removeRakebackDateSeparators", arguments);
  }

  function getRakebackDateGroupTotals() {
    return callLegacyModule("getRakebackDateGroupTotals", arguments);
  }

  function getRakebackDateRowsTotals() {
    return callLegacyModule("getRakebackDateRowsTotals", arguments);
  }

  function getRakebackWeekGroupTotals() {
    return callLegacyModule("getRakebackWeekGroupTotals", arguments);
  }

  function getRakebackWeekRoomTotals() {
    return callLegacyModule("getRakebackWeekRoomTotals", arguments);
  }

  function createRakebackDateSeparator() {
    return callLegacyModule("createRakebackDateSeparator", arguments);
  }

  function createRakebackTemplateSeparator() {
    return callLegacyModule("createRakebackTemplateSeparator", arguments);
  }

  function isRakebackCarryForwardPlaceholderRow() {
    return callLegacyModule("isRakebackCarryForwardPlaceholderRow", arguments);
  }

  function shouldCopyRakebackIdInput() {
    return callLegacyModule("shouldCopyRakebackIdInput", arguments);
  }

  function copyRakebackIdInput() {
    return callLegacyModule("copyRakebackIdInput", arguments);
  }

  function isRakebackCarryForwardPlaceholderGroup() {
    return callLegacyModule("isRakebackCarryForwardPlaceholderGroup", arguments);
  }

  function isRakebackTodayPlaceholderGroup() {
    return callLegacyModule("isRakebackTodayPlaceholderGroup", arguments);
  }

  function getRakebackLazyTemplateDomData() {
    return callLegacyModule("getRakebackLazyTemplateDomData", arguments);
  }

  function dehydrateRakebackLazyTemplateRows() {
    return callLegacyModule("dehydrateRakebackLazyTemplateRows", arguments);
  }

  function hydrateRakebackLazyTemplateRowsForSearch() {
    return callLegacyModule("hydrateRakebackLazyTemplateRowsForSearch", arguments);
  }

  function ensureRakebackSearchTemplateRows() {
    return callLegacyModule("ensureRakebackSearchTemplateRows", arguments);
  }

  function createRakebackWeekSeparator() {
    return callLegacyModule("createRakebackWeekSeparator", arguments);
  }

  function createRakebackWeekRoomTabs() {
    return callLegacyModule("createRakebackWeekRoomTabs", arguments);
  }

  function createRakebackWeekTotalRow() {
    return callLegacyModule("createRakebackWeekTotalRow", arguments);
  }

  function insertRakebackDateSeparators() {
    return callLegacyModule("insertRakebackDateSeparators", arguments);
  }

  function getRakebackRowSortColor() {
    return callLegacyModule("getRakebackRowSortColor", arguments);
  }

  function sortRakebackRows() {
    return callLegacyModule("sortRakebackRows", arguments);
  }

  function getRakebackDomRows() {
    return callLegacyModule("getRakebackDomRows", arguments);
  }

  function pushUniqueRakebackRow() {
    return callLegacyModule("pushUniqueRakebackRow", arguments);
  }

  function ensureRakebackSearchOrder() {
    return callLegacyModule("ensureRakebackSearchOrder", arguments);
  }

  function getRakebackAllDataRows() {
    return callLegacyModule("getRakebackAllDataRows", arguments);
  }

  function getRakebackGroupsFromRows() {
    return callLegacyModule("getRakebackGroupsFromRows", arguments);
  }

  function restoreRakebackSearchDetachedRows() {
    return callLegacyModule("restoreRakebackSearchDetachedRows", arguments);
  }

  function ensureRakebackVisibleAddonBaseRows() {
    return callLegacyModule("ensureRakebackVisibleAddonBaseRows", arguments);
  }

  function suspendRakebackDomRows() {
    return callLegacyModule("suspendRakebackDomRows", arguments);
  }

  function restoreRakebackSuspendedRows() {
    return callLegacyModule("restoreRakebackSuspendedRows", arguments);
  }

  function storeRakebackSuspendedRows() {
    return callLegacyModule("storeRakebackSuspendedRows", arguments);
  }

  function mergeRakebackStoredRows() {
    return callLegacyModule("mergeRakebackStoredRows", arguments);
  }

  function deferRakebackRenderedRows() {
    return callLegacyModule("deferRakebackRenderedRows", arguments);
  }

  function hasDeferredRowsForActiveRoom() {
    return callLegacyModule("hasDeferredRowsForActiveRoom", arguments);
  }

  function renderRakebackDeferredRowsForActiveRoom() {
    return callLegacyModule("renderRakebackDeferredRowsForActiveRoom", arguments);
  }

  function scheduleRakebackActiveRoomHydration() {
    return callLegacyModule("scheduleRakebackActiveRoomHydration", arguments);
  }

  function hydrateRakebackDeferredRowsForSearch() {
    return callLegacyModule("hydrateRakebackDeferredRowsForSearch", arguments);
  }

  function getRakebackGroupRows() {
    return callLegacyModule("getRakebackGroupRows", arguments);
  }

  function getRakebackVisibleGroups() {
    return callLegacyModule("getRakebackVisibleGroups", arguments);
  }

  function syncRakebackStandardOrder() {
    return callLegacyModule("syncRakebackStandardOrder", arguments);
  }

  function moveRakebackGroupBefore() {
    return callLegacyModule("moveRakebackGroupBefore", arguments);
  }

  function beginRakebackRowDrag() {
    return callLegacyModule("beginRakebackRowDrag", arguments);
  }

  function finishRakebackRowDrag() {
    return callLegacyModule("finishRakebackRowDrag", arguments);
  }

  function updateRakebackRowDrag() {
    return callLegacyModule("updateRakebackRowDrag", arguments);
  }

  function cancelPendingRakebackDrag() {
    return callLegacyModule("cancelPendingRakebackDrag", arguments);
  }

  function shouldStartRakebackDragFrom() {
    return callLegacyModule("shouldStartRakebackDragFrom", arguments);
  }

  function setRakebackRoomTab() {
    return callLegacyModule("setRakebackRoomTab", arguments);
  }

  function setRakebackArchiveMode() {
    return callLegacyModule("setRakebackArchiveMode", arguments);
  }

  function syncRakebackRoomVisibility() {
    return callLegacyModule("syncRakebackRoomVisibility", arguments);
  }

  function syncRakebackVisibleRowNumbers() {
    return callLegacyModule("syncRakebackVisibleRowNumbers", arguments);
  }

  function scheduleRakebackTableSync() {
    return callLegacyModule("scheduleRakebackTableSync", arguments);
  }

  function removeRakebackGeneratedRows() {
    return callLegacyModule("removeRakebackGeneratedRows", arguments);
  }

  function renderRakebackSummaryFromCache() {
    return callLegacyModule("renderRakebackSummaryFromCache", arguments);
  }

  function refreshRakebackVisibleView() {
    return callLegacyModule("refreshRakebackVisibleView", arguments);
  }

  function scheduleRakebackDecorations() {
    return callLegacyModule("scheduleRakebackDecorations", arguments);
  }

  function refreshRakebackFilterView() {
    return callLegacyModule("refreshRakebackFilterView", arguments);
  }

  function applyRakebackSearchRefresh() {
    return callLegacyModule("applyRakebackSearchRefresh", arguments);
  }

  function scheduleRakebackSearchRefresh() {
    return callLegacyModule("scheduleRakebackSearchRefresh", arguments);
  }

  function showRakebackStatus() {
    return callLegacyModule("showRakebackStatus", arguments);
  }

  function showRakebackStatusBriefly() {
    return callLegacyModule("showRakebackStatusBriefly", arguments);
  }

  function markRakebackDraftLocalEdit() {
    return callLegacyModule("markRakebackDraftLocalEdit", arguments);
  }

  function showRakebackAlert() {
    return callLegacyModule("showRakebackAlert", arguments);
  }

  function setRakebackRowSaved() {
    return callLegacyModule("setRakebackRowSaved", arguments);
  }

  function getRakebackTemplateIdsFromPreviousWeek() {
    return callLegacyModule("getRakebackTemplateIdsFromPreviousWeek", arguments);
  }

  function getRakebackTemplateDefaultsFromPreviousWeek() {
    return callLegacyModule("getRakebackTemplateDefaultsFromPreviousWeek", arguments);
  }

  function getRakebackTemplateIdsForCurrentWeek() {
    return callLegacyModule("getRakebackTemplateIdsForCurrentWeek", arguments);
  }

  function ensureRakebackTemplateRows() {
    return callLegacyModule("ensureRakebackTemplateRows", arguments);
  }

  function ensureRakebackBaseRow() {
    return callLegacyModule("ensureRakebackBaseRow", arguments);
  }

  function isRakebackRowFilled() {
    return callLegacyModule("isRakebackRowFilled", arguments);
  }

  function hasRakebackRakeValue() {
    return callLegacyModule("hasRakebackRakeValue", arguments);
  }

  function canAddRakebackAddon() {
    return callLegacyModule("canAddRakebackAddon", arguments);
  }

  function updateRakebackRowActions() {
    return callLegacyModule("updateRakebackRowActions", arguments);
  }

  function getRakebackPreviousRake() {
    return callLegacyModule("getRakebackPreviousRake", arguments);
  }

  function getRakebackRowCalculationBase() {
    return callLegacyModule("getRakebackRowCalculationBase", arguments);
  }

  function getRakebackRowAmount() {
    return callLegacyModule("getRakebackRowAmount", arguments);
  }

  function syncRakebackRowGroupDisplay() {
    return callLegacyModule("syncRakebackRowGroupDisplay", arguments);
  }

  function isCurrentRakebackOwner() {
    return callLegacyModule("isCurrentRakebackOwner", arguments);
  }

  function isCurrentRakebackReportOwner() {
    return callLegacyModule("isCurrentRakebackReportOwner", arguments);
  }

  function isRakebackRowAccounted() {
    return callLegacyModule("isRakebackRowAccounted", arguments);
  }

  function getRakebackRowReportedAmount() {
    return callLegacyModule("getRakebackRowReportedAmount", arguments);
  }

  function canEditRakebackRow() {
    return callLegacyModule("canEditRakebackRow", arguments);
  }

  function canRemoveRakebackRow() {
    return callLegacyModule("canRemoveRakebackRow", arguments);
  }

  function collectRakebackDomRowsFromNodes() {
    return callLegacyModule("collectRakebackDomRowsFromNodes", arguments);
  }

  function collectRakebackDeferredRows() {
    return callLegacyModule("collectRakebackDeferredRows", arguments);
  }

  function collectRakebackRows() {
    return callLegacyModule("collectRakebackRows", arguments);
  }

  function sumRakebackReportRows() {
    return callLegacyModule("sumRakebackReportRows", arguments);
  }

  function updateRakebackSummaryTotals() {
    return callLegacyModule("updateRakebackSummaryTotals", arguments);
  }

  function scheduleRakebackSummaryTotals() {
    return callLegacyModule("scheduleRakebackSummaryTotals", arguments);
  }

  function getReportStoredRakebackTotal() {
    var value = callLegacyModule("getReportStoredRakebackTotal", arguments);
    var report = arguments[0];
    var rowsTotal = report && Array.isArray(report.rakebackRows) && report.rakebackRows.length
      ? fallbackSumRakebackReportRows(report.rakebackRows)
      : 0;
    if (value !== undefined && !(value === 0 && rowsTotal && report && (report.rakeback == null || report.rakeback === ""))) return value;
    if (rowsTotal && report && (report.rakeback == null || report.rakeback === "")) return rowsTotal;
    if (value !== undefined) return value;
    if (report && report.rakeback != null && report.rakeback !== "") return fallbackParseReportNumber(report.rakeback);
    if (rowsTotal) return rowsTotal;
    return fallbackParseReportNumber(report && report.rakeback);
  }

  function hasRakebackReportValue() {
    return callLegacyModule("hasRakebackReportValue", arguments);
  }

  function getUnaccountedRakebackReportRows() {
    return callLegacyModule("getUnaccountedRakebackReportRows", arguments);
  }

  function markUnaccountedRakebackRowsAccounted() {
    return callLegacyModule("markUnaccountedRakebackRowsAccounted", arguments);
  }

  function ensureRakebackTemplateRowsFromReportedRows() {
    return callLegacyModule("ensureRakebackTemplateRowsFromReportedRows", arguments);
  }

  function syncRakebackTable() {
    return callLegacyModule("syncRakebackTable", arguments);
  }

  function fillRakebackTable() {
    return callLegacyModule("fillRakebackTable", arguments);
  }

  function addRakebackBaseRow() {
    return callLegacyModule("addRakebackBaseRow", arguments);
  }

  function addRakebackAddonRow() {
    return callLegacyModule("addRakebackAddonRow", arguments);
  }

  function mergeReportExtrasIntoMap() {
    return callLegacyModule("mergeReportExtrasIntoMap", arguments);
  }

  function mergeRakebackRowsIntoMap() {
    return callLegacyModule("mergeRakebackRowsIntoMap", arguments);
  }

  function moscowPartsFromTs() {
    var value = callLegacyModule("moscowPartsFromTs", arguments);
    return value !== undefined ? value : fallbackMoscowPartsFromTs(arguments[0]);
  }

  function reportBusinessTimestampMs() {
    var value = callLegacyModule("reportBusinessTimestampMs", arguments);
    return value !== undefined ? value : fallbackReportBusinessTimestampMs(arguments[0]);
  }

  function reportEffectiveTimestampMs() {
    var value = callLegacyModule("reportEffectiveTimestampMs", arguments);
    return value !== undefined ? value : fallbackReportEffectiveTimestampMs(arguments[0]);
  }

  function formatRuWeekdayDateFromTs() {
    var value = callLegacyModule("formatRuWeekdayDateFromTs", arguments);
    return value !== undefined ? value : fallbackFormatRuWeekdayDateFromTs(arguments[0]);
  }

  function getShiftReportDateInfo() {
    var value = callLegacyModule("getShiftReportDateInfo", arguments);
    if (value !== undefined) return value;
    var effTs = fallbackReportBusinessTimestampMs(Date.now());
    var meta = fallbackFormatRuWeekdayDateFromTs(effTs);
    var wdl = meta.weekday.toLowerCase();
    return { label: meta.weekday + ", " + meta.date, weekday: wdl, date: meta.date, iso: new Date(effTs).toISOString() };
  }

  function getAdminReportAppVersionLabel() {
    return callLegacyModule("getAdminReportAppVersionLabel", arguments);
  }

  function formatAdminReportDateLabel() {
    return callLegacyModule("formatAdminReportDateLabel", arguments);
  }

  function mskDateFromReportTs() {
    var value = callLegacyModule("mskDateFromReportTs", arguments);
    return value !== undefined ? value : new Date(arguments[0] + REPORT_MSK_SHIFT_MS);
  }

  function weekStartMsForReport() {
    var value = callLegacyModule("weekStartMsForReport", arguments);
    return value !== undefined ? value : fallbackWeekStartMsForReport(arguments[0]);
  }

  function formatReportWeekBoundary() {
    var value = callLegacyModule("formatReportWeekBoundary", arguments);
    return value !== undefined ? value : fallbackFormatReportWeekBoundary(arguments[0]);
  }

  function getCalculationWeekMeta() {
    var value = callLegacyModule("getCalculationWeekMeta", arguments);
    if (value !== undefined) return value;
    var info = getShiftReportDateInfo();
    var baseTs = info && info.iso ? new Date(info.iso).getTime() : Date.now();
    if (baseTs !== baseTs) baseTs = Date.now();
    var start = fallbackWeekStartMsForReport(baseTs);
    var end = start + REPORT_WEEK_MS - 1;
    return { start: start, end: end, label: fallbackFormatReportWeekBoundary(start) + " – " + fallbackFormatReportWeekBoundary(end) };
  }

  function getCalculationWeekMetaFromStart() {
    var value = callLegacyModule("getCalculationWeekMetaFromStart", arguments);
    if (value !== undefined) return value;
    var start = Number(arguments[0]);
    if (!Number.isFinite(start)) return getCalculationWeekMeta();
    return { start: start, end: start + REPORT_WEEK_MS - 1, label: fallbackFormatReportWeekBoundary(start) + " – " + fallbackFormatReportWeekBoundary(start + REPORT_WEEK_MS - 1) };
  }

  function getCalculationArchiveMinWeekStart() {
    return callLegacyModule("getCalculationArchiveMinWeekStart", arguments);
  }

  function getCalculationDraftKey() {
    return callLegacyModule("getCalculationDraftKey", arguments);
  }

  function getRakebackDraftKey() {
    return callLegacyModule("getRakebackDraftKey", arguments);
  }

  function getLegacyRakebackDraftKey() {
    return callLegacyModule("getLegacyRakebackDraftKey", arguments);
  }

  function readRakebackDraftData() {
    return callLegacyModule("readRakebackDraftData", arguments);
  }

  function readRakebackDraftRows() {
    return callLegacyModule("readRakebackDraftRows", arguments);
  }

  function readRakebackDeletedTemplates() {
    return callLegacyModule("readRakebackDeletedTemplates", arguments);
  }

  function readRakebackDeletedRows() {
    return callLegacyModule("readRakebackDeletedRows", arguments);
  }

  function clearStaleRakebackLocalDraftAfterTemplateReset() {
    return callLegacyModule("clearStaleRakebackLocalDraftAfterTemplateReset", arguments);
  }

  function getRakebackDeletedTemplateMap() {
    return callLegacyModule("getRakebackDeletedTemplateMap", arguments);
  }

  function getAdminReportApiBase() {
    return callLegacyModule("getAdminReportApiBase", arguments);
  }

  function buildAuthBody() {
    return callLegacyModule("buildAuthBody", arguments);
  }

  function saveLocalRakebackDraftRows() {
    return callLegacyModule("saveLocalRakebackDraftRows", arguments);
  }

  function rememberDeletedRakebackTemplates() {
    return callLegacyModule("rememberDeletedRakebackTemplates", arguments);
  }

  function saveRakebackDraftRowsNow() {
    return callLegacyModule("saveRakebackDraftRowsNow", arguments);
  }

  function saveRakebackDraftRows() {
    return callLegacyModule("saveRakebackDraftRows", arguments);
  }

  function focusRakebackRow() {
    return callLegacyModule("focusRakebackRow", arguments);
  }

  function clearRakebackDraftRows() {
    return callLegacyModule("clearRakebackDraftRows", arguments);
  }

  function loadSharedRakebackDraftRows() {
    return callLegacyModule("loadSharedRakebackDraftRows", arguments);
  }

  function scheduleSharedRakebackDraftLoad() {
    return callLegacyModule("scheduleSharedRakebackDraftLoad", arguments);
  }

  function renderRakebackTemplateOnlyView() {
    return callLegacyModule("renderRakebackTemplateOnlyView", arguments);
  }

  function loadLocalRakebackDraftRows() {
    return callLegacyModule("loadLocalRakebackDraftRows", arguments);
  }

  function clearInitialRakebackSeedRows() {
    return callLegacyModule("clearInitialRakebackSeedRows", arguments);
  }

  function hasRakebackTemplateRowsForActiveRoom() {
    return callLegacyModule("hasRakebackTemplateRowsForActiveRoom", arguments);
  }

  function clearRakebackSeedRowsWhenTemplatesExist() {
    return callLegacyModule("clearRakebackSeedRowsWhenTemplatesExist", arguments);
  }

  function refreshLocalRakebackView() {
    return callLegacyModule("refreshLocalRakebackView", arguments);
  }

  function runAdminReportAfterPaint() {
    var mod = getLegacyModule();
    if (mod && typeof mod.runAdminReportAfterPaint === "function") {
      return mod.runAdminReportAfterPaint.apply(mod, arguments);
    }
    var fn = arguments[0];
    if (typeof fn !== "function") return undefined;
    if (typeof requestAnimationFrame === "function") {
      return requestAnimationFrame(function () { fn(); });
    }
    return setTimeout(fn, 0);
  }

  function runAdminReportWhenIdle() {
    return callLegacyModule("runAdminReportWhenIdle", arguments);
  }

  function cancelAdminReportIdle() {
    return callLegacyModule("cancelAdminReportIdle", arguments);
  }

  function fallbackSetActiveTab(name) {
    var activeName = String(name || "form");
    if (activeName === "sent" && !canViewSentReports()) activeName = "form";
    if (activeName === "calculations" && !canViewCalculationsReports()) activeName = "form";
    if (tabs && tabs.length) {
      tabs.forEach(function (tab) {
        var selected = tab.getAttribute("data-admin-report-tab") === activeName;
        tab.classList.toggle("admin-report-tab--active", selected);
      });
    }
    if (panels && panels.length) {
      panels.forEach(function (panel) {
        var selected = panel.getAttribute("data-admin-report-panel") === activeName;
        panel.classList.toggle("admin-report-panel--active", selected);
      });
    }
    return activeName;
  }

  function setActiveTab() {
    var result = callLegacyModule("setActiveTab", arguments);
    return result === undefined ? fallbackSetActiveTab(arguments[0]) : result;
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

  var calculationsLogic = null;

  function createCalculationsLogicScope() {
    var scope = {
      calculationCashTotal: 0,
      calculationWeekTotals: {},
      calculationReportsCache: [],
      calculationsDraftHydrated: false,
      figuresRakeTotal: 0,
      figuresPercentTotal: 0,
      figuresSavedLocked: false,
      calculationGroupLocks: { cash: false, week: false, rake: false, winloss: false },
      calculationsStatusTimer: null,
      figuresStatusTimer: null,
      calculationCashUpdateTimer: null,
      calculationGrandUpdateTimer: null,
      figuresTotalsUpdateTimer: null,
      calculationGroupStatusEls: calculationGroupStatusEls,
      calculationsArchiveEl: calculationsArchiveEl,
      calculationsCashInputs: calculationsCashInputs,
      calculationsWinLossInputs: calculationsWinLossInputs,
      calculationsCashTotalEl: calculationsCashTotalEl,
      calculationsWinLossTotalEl: calculationsWinLossTotalEl,
      calculationsWeekLabelEl: calculationsWeekLabelEl,
      calculationsDepositEl: calculationsDepositEl,
      calculationsBonusesEl: calculationsBonusesEl,
      calculationsRakebackEl: calculationsRakebackEl,
      calculationsRakeTotalEl: calculationsRakeTotalEl,
      calculationsCashoutEl: calculationsCashoutEl,
      calculationsBotExchipCashoutEl: calculationsBotExchipCashoutEl,
      calculationsGrandTotalEl: calculationsGrandTotalEl,
      calculationsRoot: calculationsRoot,
      figuresRoot: figuresRoot,
      figuresRakeInputs: figuresRakeInputs,
      figuresPercentOutputs: figuresPercentOutputs,
      figuresRakeTotalEl: figuresRakeTotalEl,
      figuresRakeTotalMirrorEl: figuresRakeTotalMirrorEl,
      figuresPercentTotalEl: figuresPercentTotalEl,
      figuresPercentTotalMirrorEl: figuresPercentTotalMirrorEl,
      figuresRakebackEl: figuresRakebackEl,
      figuresBonusesEl: figuresBonusesEl,
      figuresSalaryEl: figuresSalaryEl,
      figuresSaveBtn: figuresSaveBtn,
      figuresEditBtn: figuresEditBtn,
      figuresSaveStatusEl: figuresSaveStatusEl,
      figuresRomanPaidInput: figuresRomanPaidInput,
      figuresWinLossInput: figuresWinLossInput,
      figuresAgentsPaidInput: figuresAgentsPaidInput,
      figuresExtrasEl: figuresExtrasEl,
      figuresAddFieldBtn: figuresAddFieldBtn,
      figuresApproxRakebackEnabledInput: figuresApproxRakebackEnabledInput,
      figuresApproxRateInputs: figuresApproxRateInputs,
      figuresApproxRomanRakeInput: figuresApproxRomanRakeInput,
      figuresApproxRakebackEl: figuresApproxRakebackEl,
      figuresApproxTotalRakeEl: figuresApproxTotalRakeEl,
      figuresApproxAgentsRakeEl: figuresApproxAgentsRakeEl,
      figuresApproxIssuedRakeEl: figuresApproxIssuedRakeEl,
      figuresApproxFormulaEl: figuresApproxFormulaEl,
      figuresGrandTotalEl: figuresGrandTotalEl,
      calculationGroupSaveBtns: calculationGroupSaveBtns,
      calculationGroupEditBtns: calculationGroupEditBtns,
      canViewCalculationsReports: canViewCalculationsReports,
      escapeReportHtml: escapeReportHtml,
      formatReportInputNumber: formatReportInputNumber,
      formatReportRubleNumber: formatReportRubleNumber,
      formatRuWeekdayDateFromTs: formatRuWeekdayDateFromTs,
      getCalculationArchiveMinWeekStart: getCalculationArchiveMinWeekStart,
      getCalculationDraftKey: getCalculationDraftKey,
      getCalculationWeekMeta: getCalculationWeekMeta,
      getCalculationWeekMetaFromStart: getCalculationWeekMetaFromStart,
      getReportAnyaSalaryTotal: getReportAnyaSalaryTotal,
      getReportExtraEntries: getReportExtraEntries,
      getReportStoredRakebackTotal: getReportStoredRakebackTotal,
      isReportAnyaSalaryFieldName: isReportAnyaSalaryFieldName,
      isReportManualRakebackFieldName: isReportManualRakebackFieldName,
      normalizeReportDetailName: normalizeReportDetailName,
      parseReportNumber: parseReportNumber,
      reportEffectiveTimestampMs: reportEffectiveTimestampMs,
      weekStartMsForReport: weekStartMsForReport
    };
    Object.defineProperty(scope, "issuedRakebackReportRakeTotal", {
      get: function () { return issuedRakebackReportRakeTotal; },
      set: function (value) { issuedRakebackReportRakeTotal = value; }
    });
    return scope;
  }

  function getCalculationsLogic() {
    if (!calculationsLogic && window.AdminReportCalculationsLogic && typeof window.AdminReportCalculationsLogic.init === "function") {
      calculationsLogic = window.AdminReportCalculationsLogic.init(createCalculationsLogicScope());
    }
    return calculationsLogic;
  }

  function callCalculationsLogic(method, args) {
    var logic = getCalculationsLogic();
    return logic && typeof logic[method] === "function" ? logic[method].apply(logic, args || []) : undefined;
  }

  function updateCalculationCashTotal() {
    return callCalculationsLogic("updateCalculationCashTotal", arguments);
  }

  function scheduleCalculationCashTotal() {
    return callCalculationsLogic("scheduleCalculationCashTotal", arguments);
  }

  function getCalculationRoomWinLossTotal() {
    return callCalculationsLogic("getCalculationRoomWinLossTotal", arguments);
  }

  function updateCalculationGrandTotal() {
    return callCalculationsLogic("updateCalculationGrandTotal", arguments);
  }

  function scheduleCalculationGrandTotal() {
    return callCalculationsLogic("scheduleCalculationGrandTotal", arguments);
  }

  function getFiguresExtraAmountTotal() {
    return callCalculationsLogic("getFiguresExtraAmountTotal", arguments);
  }

  function getFiguresExtraRakeTotal() {
    return callCalculationsLogic("getFiguresExtraRakeTotal", arguments);
  }

  function getApproxFiguresRakebackAmount() {
    return callCalculationsLogic("getApproxFiguresRakebackAmount", arguments);
  }

  function getApproxFiguresRakebackRate() {
    return callCalculationsLogic("getApproxFiguresRakebackRate", arguments);
  }

  function getIssuedRakebackReportRakeTotal() {
    return callCalculationsLogic("getIssuedRakebackReportRakeTotal", arguments);
  }

  function getApproxFiguresRakebackBase() {
    return callCalculationsLogic("getApproxFiguresRakebackBase", arguments);
  }

  function syncFiguresExtraRow() {
    return callCalculationsLogic("syncFiguresExtraRow", arguments);
  }

  function formatReportNegativeDisplay() {
    return callCalculationsLogic("formatReportNegativeDisplay", arguments);
  }

  function updateFiguresTotals() {
    return callCalculationsLogic("updateFiguresTotals", arguments);
  }

  function scheduleFiguresTotals() {
    return callCalculationsLogic("scheduleFiguresTotals", arguments);
  }

  function setCalculationTotalsText() {
    return callCalculationsLogic("setCalculationTotalsText", arguments);
  }

  function sumCalculationReports() {
    return callCalculationsLogic("sumCalculationReports", arguments);
  }

  function getCalculationArchiveReportRows() {
    return callCalculationsLogic("getCalculationArchiveReportRows", arguments);
  }

  function renderCalculationArchiveReport() {
    return callCalculationsLogic("renderCalculationArchiveReport", arguments);
  }

  function renderCalculationArchiveWeek() {
    return callCalculationsLogic("renderCalculationArchiveWeek", arguments);
  }

  function renderCalculationArchive() {
    return callCalculationsLogic("renderCalculationArchive", arguments);
  }

  function loadCalculationsReports() {
    return callCalculationsLogic("loadCalculationsReports", arguments);
  }

  function bindFiguresExtraInputs() {
    return callCalculationsLogic("bindFiguresExtraInputs", arguments);
  }

  function addFiguresExtraField() {
    return callCalculationsLogic("addFiguresExtraField", arguments);
  }

  function getCalculationGroupStatusEl() {
    return callCalculationsLogic("getCalculationGroupStatusEl", arguments);
  }

  function setCalculationsStatus() {
    return callCalculationsLogic("setCalculationsStatus", arguments);
  }

  function setFiguresStatus() {
    return callCalculationsLogic("setFiguresStatus", arguments);
  }

  function getCalculationGroupInputSelector() {
    return callCalculationsLogic("getCalculationGroupInputSelector", arguments);
  }

  function setCalculationGroupButtons() {
    return callCalculationsLogic("setCalculationGroupButtons", arguments);
  }

  function setCalculationGroupLocked() {
    return callCalculationsLogic("setCalculationGroupLocked", arguments);
  }

  function setCalculationsLocked() {
    return callCalculationsLogic("setCalculationsLocked", arguments);
  }

  function setFiguresLocked() {
    return callCalculationsLogic("setFiguresLocked", arguments);
  }

  function saveCalculationsDraftQuiet() {
    return callCalculationsLogic("saveCalculationsDraftQuiet", arguments);
  }

  function collectCalculationsDraft() {
    return callCalculationsLogic("collectCalculationsDraft", arguments);
  }

  function ensureFiguresExtraRows() {
    return callCalculationsLogic("ensureFiguresExtraRows", arguments);
  }

  function applyCalculationsDraft() {
    return callCalculationsLogic("applyCalculationsDraft", arguments);
  }

  function loadCalculationsDraft() {
    return callCalculationsLogic("loadCalculationsDraft", arguments);
  }

  function hydrateCalculationsDraftOnce() {
    return callCalculationsLogic("hydrateCalculationsDraftOnce", arguments);
  }

  function saveCalculationsDraft() {
    return callCalculationsLogic("saveCalculationsDraft", arguments);
  }

  function editCalculationsDraft() {
    return callCalculationsLogic("editCalculationsDraft", arguments);
  }

  function saveFiguresDraft() {
    return callCalculationsLogic("saveFiguresDraft", arguments);
  }

  function editFiguresDraft() {
    return callCalculationsLogic("editFiguresDraft", arguments);
  }

  function resetCalculationsHydration() {
    return callCalculationsLogic("resetHydration", arguments);
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

  function buildSentReportsLoadingShellHtml() {
    return (
      '<div class="admin-report-sent-current admin-report-sent-current--loading">' +
        '<details class="admin-report-sent-week" open>' +
          '<summary class="admin-report-sent-archive__summary">Текущая неделя</summary>' +
          '<div class="admin-report-sent-week__inner">' +
            '<details class="admin-report-sent-week-subspoiler" open>' +
              '<summary class="admin-report-sent-day-title">Итого по неделе</summary>' +
              '<div class="admin-report-sent-week-subspoiler__inner">' +
                '<p class="admin-report-sent-period-hint">Обновляю текущую неделю…</p>' +
              "</div>" +
            "</details>" +
            '<details class="admin-report-sent-week-subspoiler">' +
              '<summary class="admin-report-sent-day-title">По дням</summary>' +
              '<div class="admin-report-sent-week-subspoiler__inner">' +
                '<p class="admin-report-sent-period-hint">Дни появятся сразу после ответа сервера.</p>' +
              "</div>" +
            "</details>" +
          "</div>" +
        "</details>" +
      "</div>" +
      '<details class="admin-report-sent-archive" data-admin-report-sent-archive>' +
        '<summary class="admin-report-sent-archive__summary">Прошлые недели</summary>' +
        '<div class="admin-report-sent-archive__inner">' +
          '<p class="admin-report-sent-period-hint">Откройте, чтобы загрузить прошлые недели.</p>' +
        "</div>" +
      "</details>"
    );
  }

  function loadSentReports(forceRefresh) {
    var mod = ensureSentReportsModule();
    if (mod) return mod.open(forceRefresh);
    if (!sentList) return undefined;
    if (!canViewSentReports()) {
      sentList.innerHTML = '<p class="admin-report-sent-empty">Нет доступа к отправленным отчётам.</p>';
      return undefined;
    }
    sentList.innerHTML = buildSentReportsLoadingShellHtml();
    if (!sentReportsModuleLoadPromise) {
      sentReportsModuleLoadPromise = loadAdminReportScript("app-admin-reports-sent.js")
        .catch(function (err) {
          sentReportsModuleLoadPromise = null;
          throw err;
        });
    }
    return sentReportsModuleLoadPromise
      .then(function () {
        var loadedMod = ensureSentReportsModule();
        if (loadedMod) return loadedMod.open(forceRefresh);
        if (sentList) sentList.innerHTML = '<p class="admin-report-sent-empty">Не удалось открыть отправленные отчёты.</p>';
        return undefined;
      })
      .catch(function () {
        if (sentList) sentList.innerHTML = '<p class="admin-report-sent-empty">Ошибка загрузки. Попробуйте позже.</p>';
      });
  }

  function closeModal() {
    if (rakebackModule) rakebackModule.close();
    else suspendRakebackDomRows();
    modal.setAttribute("aria-hidden", "true");
    if (!rakebackModule) closeRakebackTotalsModal();
    if (document.documentElement) document.documentElement.classList.remove("admin-report-modal-open");
    if (document.body) {
      document.body.classList.remove("admin-report-modal-open");
      document.body.style.overflow = "";
    }
  }
  function openModal() {
    if (!syncAdminReportButtonVisibility()) return false;
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
    if (!rakebackModule) applySavedRakebackSortMode();
    if (calculationsModule) calculationsModule.reset();
    else resetCalculationsHydration();
    setActiveTab("form");
    fillReportForm(null, { skipRakeback: true });
    syncRakebackAccessControls();
    return true;
  }
  window.pokerOpenAdminReportModal = function () {
    return openModal();
  };
  btn.addEventListener("click", function (e) {
    if (openModal() === false) {
      if (e && typeof e.preventDefault === "function") e.preventDefault();
      if (e && typeof e.stopPropagation === "function") e.stopPropagation();
    }
  });
  btn.dataset.adminReportBound = "1";
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
    if (!rakebackModule) syncRakebackRefreshButtonAccess();
    if (!rakebackModule) rakebackRefreshBtn.addEventListener("click", function () {
      if (!canRefreshSharedRakebackDraft()) return;
      rakebackRefreshAttentionDismissed = true;
      rakebackRefreshBtn.classList.remove("admin-report-rakeback-refresh-btn--attention");
      loadSharedRakebackDraftRows({ force: true, showStatus: true });
    });
  }
  if (!rakebackModule && rakebackGrandTotalBtn) rakebackGrandTotalBtn.addEventListener("click", openRakebackTotalsModal);
  if (!rakebackModule && rakebackTotalsClose) rakebackTotalsClose.addEventListener("click", closeRakebackTotalsModal);
  if (!rakebackModule && rakebackTotalsBackdrop) rakebackTotalsBackdrop.addEventListener("click", closeRakebackTotalsModal);
  if (tabsModule) tabsModule.bind();
  else if (tabs && tabs.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var name = tab.getAttribute("data-admin-report-tab") || "form";
        if (name === "sent" && !canViewSentReports()) return;
        if (name === "calculations" && !canViewCalculationsReports()) return;
        setActiveTab(name);
        if (name === "rakeback") {
          if (rakebackModule) runAdminReportAfterPaint(function () { rakebackModule.open(); });
          else {
            applySavedRakebackSortMode();
            runAdminReportAfterPaint(refreshLocalRakebackView);
          }
        }
        if (name === "sent") runAdminReportAfterPaint(function () {
          if (sentReportsModule) sentReportsModule.open();
          else loadSentReports();
        });
        if (name === "calculations") runAdminReportAfterPaint(function () {
          if (calculationsModule) calculationsModule.open();
          else {
            hydrateCalculationsDraftOnce();
            loadCalculationsReports();
          }
        });
      });
    });
  }
  if (modal && modal.dataset.adminReportSentLoadGuardBound !== "1") {
    modal.dataset.adminReportSentLoadGuardBound = "1";
    modal.addEventListener("click", function (e) {
      var target = e.target && e.target.closest ? e.target.closest("[data-admin-report-tab]") : null;
      if (!target || target.getAttribute("data-admin-report-tab") !== "sent") return;
      var run = function () {
        if (!sentList || String(sentList.innerHTML || "").trim()) return;
        loadSentReports();
      };
      if (typeof requestAnimationFrame === "function") {
        requestAnimationFrame(function () { setTimeout(run, 0); });
      } else {
        setTimeout(run, 0);
      }
    });
  }
  if (!calculationsModule && calculationsCashInputs && calculationsCashInputs.length) {
    calculationsCashInputs.forEach(function (input) {
      input.addEventListener("input", scheduleCalculationCashTotal);
      input.addEventListener("change", updateCalculationCashTotal);
    });
  }
  if (!calculationsModule && calculationsWinLossInputs && calculationsWinLossInputs.length) {
    calculationsWinLossInputs.forEach(function (input) {
      input.addEventListener("input", scheduleCalculationGrandTotal);
      input.addEventListener("change", updateCalculationGrandTotal);
    });
  }
  if (!calculationsModule && figuresRakeInputs && figuresRakeInputs.length) {
    figuresRakeInputs.forEach(function (input) {
      input.addEventListener("input", function () { scheduleFiguresTotals({ syncExtras: false }); });
      input.addEventListener("change", function () { updateFiguresTotals({ syncExtras: false }); });
    });
  }
  if (!calculationsModule) [figuresRomanPaidInput, figuresWinLossInput, figuresAgentsPaidInput, figuresApproxRakebackEnabledInput, figuresApproxRomanRakeInput].forEach(function (input) {
    if (!input) return;
    input.addEventListener("input", function () { scheduleFiguresTotals({ syncExtras: false }); });
    input.addEventListener("change", function () { updateFiguresTotals({ syncExtras: false }); });
  });
  if (!calculationsModule && figuresApproxRateInputs && figuresApproxRateInputs.length) {
    figuresApproxRateInputs.forEach(function (input) {
      if (!input) return;
      input.addEventListener("change", function () {
        updateFiguresTotals();
        saveCalculationsDraftQuiet();
      });
    });
  }
  if (!calculationsModule && figuresApproxRomanRakeInput) {
    figuresApproxRomanRakeInput.addEventListener("change", saveCalculationsDraftQuiet);
  }
  if (!calculationsModule) bindFiguresExtraInputs(figuresExtrasEl);
  if (!calculationsModule && figuresAddFieldBtn) figuresAddFieldBtn.addEventListener("click", addFiguresExtraField);
  if (!calculationsModule && calculationGroupSaveBtns && calculationGroupSaveBtns.length) {
    calculationGroupSaveBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        saveCalculationsDraft(btn.getAttribute("data-admin-report-calc-save") || "cash");
      });
    });
  }
  if (!calculationsModule && calculationGroupEditBtns && calculationGroupEditBtns.length) {
    calculationGroupEditBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        editCalculationsDraft(btn.getAttribute("data-admin-report-calc-edit") || "cash");
      });
    });
  }
  if (!calculationsModule && figuresSaveBtn) figuresSaveBtn.addEventListener("click", saveFiguresDraft);
  if (!calculationsModule && figuresEditBtn) figuresEditBtn.addEventListener("click", editFiguresDraft);
  if (!formModule && addExtraBtn && modal) {
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
    if (!rakebackModule) rakebackAddBtn.addEventListener("click", addRakebackBaseRow);
  }
  window.addEventListener("poker-telegram-auth", function () {
    resetRakebackAccessCache();
    syncSentReportsAccess();
    syncRakebackAccessControls();
  });
  if (rakebackRoomTabs && rakebackRoomTabs.length) {
    if (!rakebackModule) rakebackRoomTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        setRakebackRoomTab(tab.getAttribute("data-rakeback-room-tab"));
      });
    });
  }
  if (rakebackArchiveBtn) {
    rakebackArchiveBtn.addEventListener("click", function () {
      if (rakebackModule && typeof rakebackModule.isArchiveMode === "function") {
        rakebackArchiveMode = rakebackModule.isArchiveMode();
      }
      var nextArchiveMode = !rakebackArchiveMode;
      rakebackArchiveMode = nextArchiveMode;
      if (rakebackModule && typeof rakebackModule.setArchiveMode === "function") {
        rakebackModule.setArchiveMode(nextArchiveMode);
        return;
      }
      setRakebackArchiveMode(nextArchiveMode);
    });
  }
  if (rakebackSearchInput) {
    if (!rakebackModule) rakebackSearchInput.addEventListener("input", scheduleRakebackSearchRefresh);
    if (!rakebackModule) rakebackSearchInput.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      rakebackSearchInput.value = "";
      scheduleRakebackSearchRefresh({ immediate: true });
    });
  }
  if (rakebackSortSelect) {
    if (!rakebackModule) rakebackSortSelect.addEventListener("change", function () {
      var nextMode = getRakebackSortMode();
      setRakebackSortMode(nextMode, true);
      syncRakebackTable();
    });
  }
  if (rakebackBody && !rakebackModule) {
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
  var formLogicModule = null;

  function createFormLogicScope() {
    var scope = {
      btn: btn,
      modal: modal,
      closeBtn: closeBtn,
      backdrop: backdrop,
      dateEl: dateEl,
      tabs: tabs,
      panels: panels,
      submitBtn: submitBtn,
      addExtraBtn: addExtraBtn,
      sentList: sentList,
      formBody: formBody,
      rakebackBody: rakebackBody,
      rakebackAddBtn: rakebackAddBtn,
      rakebackRefreshBtn: rakebackRefreshBtn,
      rakebackSearchInput: rakebackSearchInput,
      rakebackSortSelect: rakebackSortSelect,
      rakebackRoomTabs: rakebackRoomTabs,
      rakebackArchiveBtn: rakebackArchiveBtn,
      rakebackTotalEl: rakebackTotalEl,
      rakebackRoomTotalLabelEl: rakebackRoomTotalLabelEl,
      rakebackRoomTotalEl: rakebackRoomTotalEl,
      rakebackTotalInput: rakebackTotalInput,
      rakebackStatusEl: rakebackStatusEl,
      rakebackGrandTotalBtn: rakebackGrandTotalBtn,
      rakebackTotalsModal: rakebackTotalsModal,
      rakebackTotalsList: rakebackTotalsList,
      rakebackTotalsClose: rakebackTotalsClose,
      rakebackTotalsBackdrop: rakebackTotalsBackdrop,
      rakebackSummaryEl: rakebackSummaryEl,
      calculationsRoot: calculationsRoot,
      calculationGroupSaveBtns: calculationGroupSaveBtns,
      calculationGroupEditBtns: calculationGroupEditBtns,
      calculationGroupStatusEls: calculationGroupStatusEls,
      calculationsCashInputs: calculationsCashInputs,
      calculationsWinLossInputs: calculationsWinLossInputs,
      calculationsArchiveEl: calculationsArchiveEl,
      calculationsCashTotalEl: calculationsCashTotalEl,
      calculationsWinLossTotalEl: calculationsWinLossTotalEl,
      calculationsWeekLabelEl: calculationsWeekLabelEl,
      calculationsDepositEl: calculationsDepositEl,
      calculationsBonusesEl: calculationsBonusesEl,
      calculationsRakebackEl: calculationsRakebackEl,
      calculationsRakeTotalEl: calculationsRakeTotalEl,
      calculationsCashoutEl: calculationsCashoutEl,
      calculationsBotExchipCashoutEl: calculationsBotExchipCashoutEl,
      calculationsGrandTotalEl: calculationsGrandTotalEl,
      figuresRoot: figuresRoot,
      figuresRakeInputs: figuresRakeInputs,
      figuresPercentOutputs: figuresPercentOutputs,
      figuresRakeTotalEl: figuresRakeTotalEl,
      figuresRakeTotalMirrorEl: figuresRakeTotalMirrorEl,
      figuresPercentTotalEl: figuresPercentTotalEl,
      figuresPercentTotalMirrorEl: figuresPercentTotalMirrorEl,
      figuresRakebackEl: figuresRakebackEl,
      figuresBonusesEl: figuresBonusesEl,
      figuresSalaryEl: figuresSalaryEl,
      figuresSaveBtn: figuresSaveBtn,
      figuresEditBtn: figuresEditBtn,
      figuresSaveStatusEl: figuresSaveStatusEl,
      figuresRomanPaidInput: figuresRomanPaidInput,
      figuresWinLossInput: figuresWinLossInput,
      figuresAgentsPaidInput: figuresAgentsPaidInput,
      figuresExtrasEl: figuresExtrasEl,
      figuresAddFieldBtn: figuresAddFieldBtn,
      figuresApproxRakebackEnabledInput: figuresApproxRakebackEnabledInput,
      figuresApproxRateInputs: figuresApproxRateInputs,
      figuresApproxRomanRakeInput: figuresApproxRomanRakeInput,
      figuresApproxRakebackEl: figuresApproxRakebackEl,
      figuresApproxTotalRakeEl: figuresApproxTotalRakeEl,
      figuresApproxAgentsRakeEl: figuresApproxAgentsRakeEl,
      figuresApproxIssuedRakeEl: figuresApproxIssuedRakeEl,
      figuresApproxFormulaEl: figuresApproxFormulaEl,
      figuresGrandTotalEl: figuresGrandTotalEl,
      editingReportId: editingReportId,
      editingReport: editingReport,
      rakebackGroupSeq: rakebackGroupSeq,
      activeRakebackRoom: activeRakebackRoom,
      rakebackArchiveMode: rakebackArchiveMode,
      rakebackRoomTotals: rakebackRoomTotals,
      rakebackDraftSaveTimer: rakebackDraftSaveTimer,
      rakebackDraftSaveIdle: rakebackDraftSaveIdle,
      rakebackDraftLoadIdle: rakebackDraftLoadIdle,
      rakebackStatusClearTimer: rakebackStatusClearTimer,
      rakebackDraftMutationSeq: rakebackDraftMutationSeq,
      rakebackDraftLocalEditUntil: rakebackDraftLocalEditUntil,
      loadingRakebackDraft: loadingRakebackDraft,
      savingRakebackDraft: savingRakebackDraft,
      rakebackDraftNeedsMigration: rakebackDraftNeedsMigration,
      rakebackDragState: rakebackDragState,
      rakebackPendingIdCopy: rakebackPendingIdCopy,
      rakebackSuppressIdClickInput: rakebackSuppressIdClickInput,
      rakebackSuppressIdClickAt: rakebackSuppressIdClickAt,
      rakebackDeferredSyncSeq: rakebackDeferredSyncSeq,
      rakebackSummaryTimer: rakebackSummaryTimer,
      rakebackSearchRefreshTimer: rakebackSearchRefreshTimer,
      rakebackDecorationTimer: rakebackDecorationTimer,
      rakebackDecorationSeq: rakebackDecorationSeq,
      rakebackRoomSwitchSeq: rakebackRoomSwitchSeq,
      rakebackActiveHydrateTimer: rakebackActiveHydrateTimer,
      rakebackRefreshAttentionDismissed: rakebackRefreshAttentionDismissed,
      rakebackSearchDetachedRows: rakebackSearchDetachedRows,
      rakebackSuspendedRows: rakebackSuspendedRows,
      rakebackLazyTemplateRows: rakebackLazyTemplateRows,
      rakebackDeferredRows: rakebackDeferredRows,
      rakebackWeekArchiveOpen: rakebackWeekArchiveOpen,
      rakebackWeekRoomArchiveOpen: rakebackWeekRoomArchiveOpen,
      RAKEBACK_TEMPLATE_ONLY_MODE: RAKEBACK_TEMPLATE_ONLY_MODE,
      manualRakebackInputTouched: manualRakebackInputTouched,
      issuedRakebackReportRakeTotal: issuedRakebackReportRakeTotal,
      tabsModule: tabsModule,
      formModule: formModule,
      calculationsModule: calculationsModule,
      sentReportsModule: sentReportsModule,
      DEFAULT_RAKEBACK_SORT_MODE: DEFAULT_RAKEBACK_SORT_MODE,
      RAKEBACK_ROOMS: RAKEBACK_ROOMS,
      RAKEBACK_EDITOR_IDS: RAKEBACK_EDITOR_IDS,
      RAKEBACK_EDITOR_USERNAMES: RAKEBACK_EDITOR_USERNAMES,
      RAKEBACK_REFRESH_ACCESS_IDS: RAKEBACK_REFRESH_ACCESS_IDS,
      RAKEBACK_REFRESH_ACCESS_USERNAMES: RAKEBACK_REFRESH_ACCESS_USERNAMES,
      RAKEBACK_REFRESH_ACCESS_EMAILS: RAKEBACK_REFRESH_ACCESS_EMAILS,
      rakebackAccessCache: rakebackAccessCache,
      rakebackStaticData: rakebackStaticData,
      rakebackTemplates: rakebackTemplates,
      P21_RAKEBACK_TEMPLATE_IDS: P21_RAKEBACK_TEMPLATE_IDS,
      X_RAKEBACK_TEMPLATE_IDS: X_RAKEBACK_TEMPLATE_IDS,
      PP_RAKEBACK_TEMPLATE_IDS: PP_RAKEBACK_TEMPLATE_IDS,
      SUPR_RAKEBACK_TEMPLATE_IDS: SUPR_RAKEBACK_TEMPLATE_IDS,
      RAKEBACK_TEMPLATE_CREATED_AT: RAKEBACK_TEMPLATE_CREATED_AT,
      RAKEBACK_TEMPLATE_RESET_AT: RAKEBACK_TEMPLATE_RESET_AT,
      RAKEBACK_ROW_COLORS: RAKEBACK_ROW_COLORS,
      RAKEBACK_ROW_LEGACY_COLOR_MAP: RAKEBACK_ROW_LEGACY_COLOR_MAP,
      rakebackModule: rakebackModule,
      REPORT_DAY_MS: REPORT_DAY_MS,
      REPORT_WEEK_MS: REPORT_WEEK_MS,
      REPORT_MSK_SHIFT_MS: REPORT_MSK_SHIFT_MS,
      REPORT_DAY_CUTOFF_MS: REPORT_DAY_CUTOFF_MS,
      calculationsLogic: calculationsLogic,
      canViewSentReports: canViewSentReports,
      canViewCalculationsReports: canViewCalculationsReports,
      getRakebackIdentityCandidates: getRakebackIdentityCandidates,
      rakebackIdentityMatches: rakebackIdentityMatches,
      getRakebackAccessState: getRakebackAccessState,
      resetRakebackAccessCache: resetRakebackAccessCache,
      canManageAllRakebackRows: canManageAllRakebackRows,
      canRefreshSharedRakebackDraft: canRefreshSharedRakebackDraft,
      canSyncSharedRakebackDraft: canSyncSharedRakebackDraft,
      canEditRakebackDraftRows: canEditRakebackDraftRows,
      syncRakebackRefreshButtonAccess: syncRakebackRefreshButtonAccess,
      syncRakebackAddButtonAccess: syncRakebackAddButtonAccess,
      syncRakebackAccessControls: syncRakebackAccessControls,
      syncSentReportsAccess: syncSentReportsAccess,
      parseReportNumber: parseReportNumber,
      formatReportNumber: formatReportNumber,
      formatReportInputNumber: formatReportInputNumber,
      formatRakebackCellNumber: formatRakebackCellNumber,
      formatRakebackAmountCell: formatRakebackAmountCell,
      formatReportRubleNumber: formatReportRubleNumber,
      getRakebackRoomLabel: getRakebackRoomLabel,
      getRakebackRoomMultiplier: getRakebackRoomMultiplier,
      getRakebackReportAmount: getRakebackReportAmount,
      getRakebackReportRake: getRakebackReportRake,
      getRakebackRowRawRake: getRakebackRowRawRake,
      getRakebackRowFullReportRake: getRakebackRowFullReportRake,
      addRakebackLatestGroupRake: addRakebackLatestGroupRake,
      sumRakebackLatestGroupRake: sumRakebackLatestGroupRake,
      addCollectedLatestGroupRake: addCollectedLatestGroupRake,
      getCollectedRowFullReportRake: getCollectedRowFullReportRake,
      sumCollectedLatestGroupRake: sumCollectedLatestGroupRake,
      formatRakebackRoomTotal: formatRakebackRoomTotal,
      formatRakebackSummaryPair: formatRakebackSummaryPair,
      copyReportText: copyReportText,
      nextRakebackGroupId: nextRakebackGroupId,
      getCurrentRakebackOwnerId: getCurrentRakebackOwnerId,
      getRakebackRoomOptions: getRakebackRoomOptions,
      getRakebackTotalsByDate: getRakebackTotalsByDate,
      renderRakebackTotalsModal: renderRakebackTotalsModal,
      openRakebackTotalsModal: openRakebackTotalsModal,
      closeRakebackTotalsModal: closeRakebackTotalsModal,
      normalizeRakebackRowColor: normalizeRakebackRowColor,
      getRakebackRowColorButtons: getRakebackRowColorButtons,
      closeRakebackColorMenus: closeRakebackColorMenus,
      markRakebackCell: markRakebackCell,
      applyRakebackRowColor: applyRakebackRowColor,
      normalizeRakebackRoom: normalizeRakebackRoom,
      parseRakebackTimeValue: parseRakebackTimeValue,
      getFirstRakebackTimeValue: getFirstRakebackTimeValue,
      getRakebackTemplateIdsForRoom: getRakebackTemplateIdsForRoom,
      getRakebackTemplateCreatedAt: getRakebackTemplateCreatedAt,
      isRakebackTemplateEntryStamp: isRakebackTemplateEntryStamp,
      getRakebackTemplateKey: getRakebackTemplateKey,
      isRakebackTemplateId: isRakebackTemplateId,
      normalizeRakebackDeletedTemplates: normalizeRakebackDeletedTemplates,
      isRakebackTemplateLikeData: isRakebackTemplateLikeData,
      isRakebackLazyTemplateData: isRakebackLazyTemplateData,
      normalizeRakebackLazyTemplateData: normalizeRakebackLazyTemplateData,
      rememberRakebackLazyTemplateRows: rememberRakebackLazyTemplateRows,
      hasRakebackStoredEntryData: hasRakebackStoredEntryData,
      getRakebackStoredRowMergeKey: getRakebackStoredRowMergeKey,
      getRakebackDeletedRowKey: getRakebackDeletedRowKey,
      getRakebackDeletedStoredRowKey: getRakebackDeletedStoredRowKey,
      normalizeRakebackDeletedRows: normalizeRakebackDeletedRows,
      isDeletedRakebackTemplateRow: isDeletedRakebackTemplateRow,
      filterDeletedRakebackStoredRows: filterDeletedRakebackStoredRows,
      isRakebackEmptyTemplateDuplicateRow: isRakebackEmptyTemplateDuplicateRow,
      dedupeRakebackTemplateRows: dedupeRakebackTemplateRows,
      mergeRakebackDraftRows: mergeRakebackDraftRows,
      createRakebackRow: createRakebackRow,
      normalizeRakebackStoredRowData: normalizeRakebackStoredRowData,
      isRakebackStoredCarryForwardPlaceholder: isRakebackStoredCarryForwardPlaceholder,
      getRakebackStoredRowEntryStamp: getRakebackStoredRowEntryStamp,
      isRakebackStoredRowArchived: isRakebackStoredRowArchived,
      getRakebackRowRoom: getRakebackRowRoom,
      syncRakebackRowLookupAttrs: syncRakebackRowLookupAttrs,
      getRakebackRowRoomFast: getRakebackRowRoomFast,
      getRakebackRowPlayerIdFast: getRakebackRowPlayerIdFast,
      getRakebackSearchQuery: getRakebackSearchQuery,
      getRakebackRowPlayerId: getRakebackRowPlayerId,
      getRakebackSortMode: getRakebackSortMode,
      normalizeRakebackSortMode: normalizeRakebackSortMode,
      getRakebackSortStorageKey: getRakebackSortStorageKey,
      readSavedRakebackSortMode: readSavedRakebackSortMode,
      saveRakebackSortMode: saveRakebackSortMode,
      setRakebackSortMode: setRakebackSortMode,
      applySavedRakebackSortMode: applySavedRakebackSortMode,
      getRakebackRowCreatedAt: getRakebackRowCreatedAt,
      getRakebackRowStandardAt: getRakebackRowStandardAt,
      getRakebackTopStandardAt: getRakebackTopStandardAt,
      getRakebackRowEntryAddedAtForSave: getRakebackRowEntryAddedAtForSave,
      hasRakebackRowEntryTimeData: hasRakebackRowEntryTimeData,
      getRakebackRowBoundEntryAddedAt: getRakebackRowBoundEntryAddedAt,
      setRakebackGroupEntryAddedAt: setRakebackGroupEntryAddedAt,
      replaceRakebackGroupEntryAddedAt: replaceRakebackGroupEntryAddedAt,
      ensureRakebackEntryAddedAt: ensureRakebackEntryAddedAt,
      getRakebackRowEntryAddedAt: getRakebackRowEntryAddedAt,
      syncExplicitZeroRakeMarker: syncExplicitZeroRakeMarker,
      getRakebackGroupKeyRow: getRakebackGroupKeyRow,
      getRakebackGroupEntryAddedAt: getRakebackGroupEntryAddedAt,
      getRakebackWeekStart: getRakebackWeekStart,
      getCurrentRakebackWeekStart: getCurrentRakebackWeekStart,
      formatRakebackWeekRange: formatRakebackWeekRange,
      isRakebackEntryArchivedByStamp: isRakebackEntryArchivedByStamp,
      isRakebackRowInArchive: isRakebackRowInArchive,
      isRakebackGroupInArchive: isRakebackGroupInArchive,
      isRakebackCollectedRowArchived: isRakebackCollectedRowArchived,
      getRakebackMoscowDayKey: getRakebackMoscowDayKey,
      getRakebackDateSeparatorLabel: getRakebackDateSeparatorLabel,
      removeRakebackDateSeparators: removeRakebackDateSeparators,
      getRakebackDateGroupTotals: getRakebackDateGroupTotals,
      getRakebackDateRowsTotals: getRakebackDateRowsTotals,
      getRakebackWeekGroupTotals: getRakebackWeekGroupTotals,
      getRakebackWeekRoomTotals: getRakebackWeekRoomTotals,
      createRakebackDateSeparator: createRakebackDateSeparator,
      createRakebackTemplateSeparator: createRakebackTemplateSeparator,
      isRakebackCarryForwardPlaceholderRow: isRakebackCarryForwardPlaceholderRow,
      shouldCopyRakebackIdInput: shouldCopyRakebackIdInput,
      copyRakebackIdInput: copyRakebackIdInput,
      isRakebackCarryForwardPlaceholderGroup: isRakebackCarryForwardPlaceholderGroup,
      isRakebackTodayPlaceholderGroup: isRakebackTodayPlaceholderGroup,
      getRakebackLazyTemplateDomData: getRakebackLazyTemplateDomData,
      dehydrateRakebackLazyTemplateRows: dehydrateRakebackLazyTemplateRows,
      hydrateRakebackLazyTemplateRowsForSearch: hydrateRakebackLazyTemplateRowsForSearch,
      ensureRakebackSearchTemplateRows: ensureRakebackSearchTemplateRows,
      createRakebackWeekSeparator: createRakebackWeekSeparator,
      createRakebackWeekRoomTabs: createRakebackWeekRoomTabs,
      createRakebackWeekTotalRow: createRakebackWeekTotalRow,
      insertRakebackDateSeparators: insertRakebackDateSeparators,
      getRakebackRowSortColor: getRakebackRowSortColor,
      sortRakebackRows: sortRakebackRows,
      getRakebackDomRows: getRakebackDomRows,
      pushUniqueRakebackRow: pushUniqueRakebackRow,
      ensureRakebackSearchOrder: ensureRakebackSearchOrder,
      getRakebackAllDataRows: getRakebackAllDataRows,
      getRakebackGroupsFromRows: getRakebackGroupsFromRows,
      restoreRakebackSearchDetachedRows: restoreRakebackSearchDetachedRows,
      ensureRakebackVisibleAddonBaseRows: ensureRakebackVisibleAddonBaseRows,
      suspendRakebackDomRows: suspendRakebackDomRows,
      restoreRakebackSuspendedRows: restoreRakebackSuspendedRows,
      storeRakebackSuspendedRows: storeRakebackSuspendedRows,
      mergeRakebackStoredRows: mergeRakebackStoredRows,
      deferRakebackRenderedRows: deferRakebackRenderedRows,
      hasDeferredRowsForActiveRoom: hasDeferredRowsForActiveRoom,
      renderRakebackDeferredRowsForActiveRoom: renderRakebackDeferredRowsForActiveRoom,
      scheduleRakebackActiveRoomHydration: scheduleRakebackActiveRoomHydration,
      hydrateRakebackDeferredRowsForSearch: hydrateRakebackDeferredRowsForSearch,
      getRakebackGroupRows: getRakebackGroupRows,
      getRakebackVisibleGroups: getRakebackVisibleGroups,
      syncRakebackStandardOrder: syncRakebackStandardOrder,
      moveRakebackGroupBefore: moveRakebackGroupBefore,
      beginRakebackRowDrag: beginRakebackRowDrag,
      finishRakebackRowDrag: finishRakebackRowDrag,
      updateRakebackRowDrag: updateRakebackRowDrag,
      cancelPendingRakebackDrag: cancelPendingRakebackDrag,
      shouldStartRakebackDragFrom: shouldStartRakebackDragFrom,
      setRakebackRoomTab: setRakebackRoomTab,
      setRakebackArchiveMode: setRakebackArchiveMode,
      syncRakebackRoomVisibility: syncRakebackRoomVisibility,
      syncRakebackVisibleRowNumbers: syncRakebackVisibleRowNumbers,
      scheduleRakebackTableSync: scheduleRakebackTableSync,
      removeRakebackGeneratedRows: removeRakebackGeneratedRows,
      renderRakebackSummaryFromCache: renderRakebackSummaryFromCache,
      refreshRakebackVisibleView: refreshRakebackVisibleView,
      scheduleRakebackDecorations: scheduleRakebackDecorations,
      refreshRakebackFilterView: refreshRakebackFilterView,
      applyRakebackSearchRefresh: applyRakebackSearchRefresh,
      scheduleRakebackSearchRefresh: scheduleRakebackSearchRefresh,
      showRakebackStatus: showRakebackStatus,
      showRakebackStatusBriefly: showRakebackStatusBriefly,
      markRakebackDraftLocalEdit: markRakebackDraftLocalEdit,
      showRakebackAlert: showRakebackAlert,
      setRakebackRowSaved: setRakebackRowSaved,
      getRakebackTemplateIdsFromPreviousWeek: getRakebackTemplateIdsFromPreviousWeek,
      getRakebackTemplateDefaultsFromPreviousWeek: getRakebackTemplateDefaultsFromPreviousWeek,
      getRakebackTemplateIdsForCurrentWeek: getRakebackTemplateIdsForCurrentWeek,
      ensureRakebackTemplateRows: ensureRakebackTemplateRows,
      ensureRakebackBaseRow: ensureRakebackBaseRow,
      isRakebackRowFilled: isRakebackRowFilled,
      hasRakebackRakeValue: hasRakebackRakeValue,
      canAddRakebackAddon: canAddRakebackAddon,
      updateRakebackRowActions: updateRakebackRowActions,
      getRakebackPreviousRake: getRakebackPreviousRake,
      getRakebackRowCalculationBase: getRakebackRowCalculationBase,
      getRakebackRowAmount: getRakebackRowAmount,
      syncRakebackRowGroupDisplay: syncRakebackRowGroupDisplay,
      isCurrentRakebackOwner: isCurrentRakebackOwner,
      isCurrentRakebackReportOwner: isCurrentRakebackReportOwner,
      isRakebackRowAccounted: isRakebackRowAccounted,
      getRakebackRowReportedAmount: getRakebackRowReportedAmount,
      canEditRakebackRow: canEditRakebackRow,
      canRemoveRakebackRow: canRemoveRakebackRow,
      collectRakebackDomRowsFromNodes: collectRakebackDomRowsFromNodes,
      collectRakebackDeferredRows: collectRakebackDeferredRows,
      collectRakebackRows: collectRakebackRows,
      sumRakebackReportRows: sumRakebackReportRows,
      updateRakebackSummaryTotals: updateRakebackSummaryTotals,
      scheduleRakebackSummaryTotals: scheduleRakebackSummaryTotals,
      getReportStoredRakebackTotal: getReportStoredRakebackTotal,
      hasRakebackReportValue: hasRakebackReportValue,
      getUnaccountedRakebackReportRows: getUnaccountedRakebackReportRows,
      markUnaccountedRakebackRowsAccounted: markUnaccountedRakebackRowsAccounted,
      ensureRakebackTemplateRowsFromReportedRows: ensureRakebackTemplateRowsFromReportedRows,
      syncRakebackTable: syncRakebackTable,
      fillRakebackTable: fillRakebackTable,
      addRakebackBaseRow: addRakebackBaseRow,
      addRakebackAddonRow: addRakebackAddonRow,
      mergeReportExtrasIntoMap: mergeReportExtrasIntoMap,
      mergeRakebackRowsIntoMap: mergeRakebackRowsIntoMap,
      moscowPartsFromTs: moscowPartsFromTs,
      reportBusinessTimestampMs: reportBusinessTimestampMs,
      reportEffectiveTimestampMs: reportEffectiveTimestampMs,
      formatRuWeekdayDateFromTs: formatRuWeekdayDateFromTs,
      getShiftReportDateInfo: getShiftReportDateInfo,
      getAdminReportAppVersionLabel: getAdminReportAppVersionLabel,
      formatAdminReportDateLabel: formatAdminReportDateLabel,
      mskDateFromReportTs: mskDateFromReportTs,
      weekStartMsForReport: weekStartMsForReport,
      formatReportWeekBoundary: formatReportWeekBoundary,
      getCalculationWeekMeta: getCalculationWeekMeta,
      getCalculationWeekMetaFromStart: getCalculationWeekMetaFromStart,
      getCalculationArchiveMinWeekStart: getCalculationArchiveMinWeekStart,
      getCalculationDraftKey: getCalculationDraftKey,
      getRakebackDraftKey: getRakebackDraftKey,
      getLegacyRakebackDraftKey: getLegacyRakebackDraftKey,
      readRakebackDraftData: readRakebackDraftData,
      readRakebackDraftRows: readRakebackDraftRows,
      readRakebackDeletedTemplates: readRakebackDeletedTemplates,
      readRakebackDeletedRows: readRakebackDeletedRows,
      clearStaleRakebackLocalDraftAfterTemplateReset: clearStaleRakebackLocalDraftAfterTemplateReset,
      getRakebackDeletedTemplateMap: getRakebackDeletedTemplateMap,
      getAdminReportApiBase: getAdminReportApiBase,
      buildAuthBody: buildAuthBody,
      saveLocalRakebackDraftRows: saveLocalRakebackDraftRows,
      rememberDeletedRakebackTemplates: rememberDeletedRakebackTemplates,
      saveRakebackDraftRowsNow: saveRakebackDraftRowsNow,
      saveRakebackDraftRows: saveRakebackDraftRows,
      focusRakebackRow: focusRakebackRow,
      clearRakebackDraftRows: clearRakebackDraftRows,
      loadSharedRakebackDraftRows: loadSharedRakebackDraftRows,
      scheduleSharedRakebackDraftLoad: scheduleSharedRakebackDraftLoad,
      renderRakebackTemplateOnlyView: renderRakebackTemplateOnlyView,
      loadLocalRakebackDraftRows: loadLocalRakebackDraftRows,
      clearInitialRakebackSeedRows: clearInitialRakebackSeedRows,
      hasRakebackTemplateRowsForActiveRoom: hasRakebackTemplateRowsForActiveRoom,
      clearRakebackSeedRowsWhenTemplatesExist: clearRakebackSeedRowsWhenTemplatesExist,
      refreshLocalRakebackView: refreshLocalRakebackView,
      runAdminReportAfterPaint: runAdminReportAfterPaint,
      runAdminReportWhenIdle: runAdminReportWhenIdle,
      cancelAdminReportIdle: cancelAdminReportIdle,
      setActiveTab: setActiveTab,
      escapeReportHtml: escapeReportHtml,
      normalizeReportDetailName: normalizeReportDetailName,
      isReportUsdtRateFieldName: isReportUsdtRateFieldName,
      isReportManualRakebackFieldName: isReportManualRakebackFieldName,
      isReportAnyaSalaryFieldName: isReportAnyaSalaryFieldName,
      getReportAnyaSalaryTotal: getReportAnyaSalaryTotal,
      createCalculationsLogicScope: createCalculationsLogicScope,
      getCalculationsLogic: getCalculationsLogic,
      callCalculationsLogic: callCalculationsLogic,
      updateCalculationCashTotal: updateCalculationCashTotal,
      scheduleCalculationCashTotal: scheduleCalculationCashTotal,
      getCalculationRoomWinLossTotal: getCalculationRoomWinLossTotal,
      updateCalculationGrandTotal: updateCalculationGrandTotal,
      scheduleCalculationGrandTotal: scheduleCalculationGrandTotal,
      getFiguresExtraAmountTotal: getFiguresExtraAmountTotal,
      getFiguresExtraRakeTotal: getFiguresExtraRakeTotal,
      getApproxFiguresRakebackAmount: getApproxFiguresRakebackAmount,
      getApproxFiguresRakebackRate: getApproxFiguresRakebackRate,
      getIssuedRakebackReportRakeTotal: getIssuedRakebackReportRakeTotal,
      getApproxFiguresRakebackBase: getApproxFiguresRakebackBase,
      syncFiguresExtraRow: syncFiguresExtraRow,
      formatReportNegativeDisplay: formatReportNegativeDisplay,
      updateFiguresTotals: updateFiguresTotals,
      scheduleFiguresTotals: scheduleFiguresTotals,
      setCalculationTotalsText: setCalculationTotalsText,
      sumCalculationReports: sumCalculationReports,
      getCalculationArchiveReportRows: getCalculationArchiveReportRows,
      renderCalculationArchiveReport: renderCalculationArchiveReport,
      renderCalculationArchiveWeek: renderCalculationArchiveWeek,
      renderCalculationArchive: renderCalculationArchive,
      loadCalculationsReports: loadCalculationsReports,
      bindFiguresExtraInputs: bindFiguresExtraInputs,
      addFiguresExtraField: addFiguresExtraField,
      getCalculationGroupStatusEl: getCalculationGroupStatusEl,
      setCalculationsStatus: setCalculationsStatus,
      setFiguresStatus: setFiguresStatus,
      getCalculationGroupInputSelector: getCalculationGroupInputSelector,
      setCalculationGroupButtons: setCalculationGroupButtons,
      setCalculationGroupLocked: setCalculationGroupLocked,
      setCalculationsLocked: setCalculationsLocked,
      setFiguresLocked: setFiguresLocked,
      saveCalculationsDraftQuiet: saveCalculationsDraftQuiet,
      collectCalculationsDraft: collectCalculationsDraft,
      ensureFiguresExtraRows: ensureFiguresExtraRows,
      applyCalculationsDraft: applyCalculationsDraft,
      loadCalculationsDraft: loadCalculationsDraft,
      hydrateCalculationsDraftOnce: hydrateCalculationsDraftOnce,
      saveCalculationsDraft: saveCalculationsDraft,
      editCalculationsDraft: editCalculationsDraft,
      saveFiguresDraft: saveFiguresDraft,
      editFiguresDraft: editFiguresDraft,
      resetCalculationsHydration: resetCalculationsHydration,
      getReportExtraEntries: getReportExtraEntries,
      getReportUsdtRate: getReportUsdtRate,
      buildReportDetailHtml: buildReportDetailHtml,
      loadSentReports: loadSentReports,
      closeModal: closeModal,
      openModal: openModal,
      window: typeof window !== "undefined" ? window : undefined,
      document: typeof document !== "undefined" ? document : undefined,
      fetch: typeof fetch !== "undefined" ? fetch : undefined,
      JSON: typeof JSON !== "undefined" ? JSON : undefined,
      Math: typeof Math !== "undefined" ? Math : undefined,
      String: typeof String !== "undefined" ? String : undefined,
      parseFloat: typeof parseFloat !== "undefined" ? parseFloat : undefined,
      isNaN: typeof isNaN !== "undefined" ? isNaN : undefined,
      getApiBase: typeof getApiBase !== "undefined" ? getApiBase : undefined,
      pokerApiHasCredential: typeof pokerApiHasCredential !== "undefined" ? pokerApiHasCredential : undefined,
      pokerGuestOrAuthedPostBody: typeof pokerGuestOrAuthedPostBody !== "undefined" ? pokerGuestOrAuthedPostBody : undefined,
      POKER_NET_ERR: typeof POKER_NET_ERR !== "undefined" ? POKER_NET_ERR : undefined
    };
    Object.defineProperty(scope, "editingReportId", {
      get: function () { return editingReportId; },
      set: function (value) { editingReportId = value; }
    });
    Object.defineProperty(scope, "editingReport", {
      get: function () { return editingReport; },
      set: function (value) { editingReport = value; }
    });
    Object.defineProperty(scope, "manualRakebackInputTouched", {
      get: function () { return manualRakebackInputTouched; },
      set: function (value) { manualRakebackInputTouched = value; }
    });
    return scope;
  }

  function getFormLogicModule() {
    if (!formLogicModule && window.AdminReportFormLogic && typeof window.AdminReportFormLogic.init === "function") {
      formLogicModule = window.AdminReportFormLogic.init(createFormLogicScope());
    }
    return formLogicModule;
  }

  function callFormLogicModule(method, args) {
    var mod = getFormLogicModule();
    return mod && typeof mod[method] === "function" ? mod[method].apply(mod, args || []) : undefined;
  }

  function buildPayload() {
    return callFormLogicModule("buildPayload", arguments);
  }

  function setFormVal() {
    return callFormLogicModule("setFormVal", arguments);
  }

  function fillReportForm() {
    return callFormLogicModule("fillReportForm", arguments);
  }

  function submitAdminReport() {
    return callFormLogicModule("submitAdminReport", arguments);
  }

}
var adminReportModuleLoadPromise = null;
var ADMIN_REPORT_MODULE_SCRIPTS = [
  "app-admin-reports-tabs.js",
  "app-admin-reports-form.js",
  "app-admin-reports-form-logic.js",
  "app-admin-reports-sent.js",
  "app-admin-reports-rakeback-data.js",
  "app-admin-reports-legacy.js",
  "app-admin-reports-rakeback.js",
  "app-admin-reports-calculations-logic.js",
  "app-admin-reports-calculations.js",
  "app-admin-broadcast-reports.js",
];
function areAdminReportModulesReady() {
  return !!(
    window.AdminReportTabs &&
    window.AdminReportFormTab &&
    window.AdminReportFormLogic &&
    window.AdminReportSentTab &&
    window.AdminReportRakebackStaticData &&
    window.AdminReportLegacy &&
    window.AdminReportRakebackTab &&
    window.AdminReportCalculationsLogic &&
    window.AdminReportCalculationsTab &&
    window.pokerInitBroadcastReportsModal
  );
}
function getAdminReportAssetVersion() {
  return document.documentElement ? String(document.documentElement.getAttribute("data-app-version") || "").trim() : "";
}
function loadAdminReportScript(file) {
  return new Promise(function (resolve, reject) {
    var existing = document.querySelector('script[data-admin-report-module="' + file + '"]');
    if (existing && existing.getAttribute("data-admin-report-loaded") === "1") {
      resolve();
      return;
    }
    if (existing) {
      existing.addEventListener("load", resolve, { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }
    var script = document.createElement("script");
    var version = getAdminReportAssetVersion();
    script.src = "./" + file + (version ? "?v=" + encodeURIComponent(version) : "");
    script.defer = true;
    script.dataset.adminReportModule = file;
    script.onload = function () {
      script.setAttribute("data-admin-report-loaded", "1");
      resolve();
    };
    script.onerror = reject;
    (document.head || document.documentElement).appendChild(script);
  });
}
function ensureAdminReportModulesLoaded() {
  if (areAdminReportModulesReady()) return Promise.resolve();
  if (adminReportModuleLoadPromise) return adminReportModuleLoadPromise;
  adminReportModuleLoadPromise = ADMIN_REPORT_MODULE_SCRIPTS.reduce(function (chain, file) {
    return chain.then(function () {
      return loadAdminReportScript(file).catch(function () {
        return undefined;
      });
    });
  }, Promise.resolve());
  return adminReportModuleLoadPromise;
}
function initAdminReportModalsRuntime() {
  initAdminReportModal();
  ensureAdminReportModulesLoaded()
    .then(function () {
      initAdminReportModal();
      if (typeof window.pokerInitBroadcastReportsModal === "function") {
        window.pokerInitBroadcastReportsModal();
      }
      return true;
    })
    .catch(function () {
      initAdminReportModal();
      return true;
    });
  return true;
}
window.pokerInitAdminReportModal = initAdminReportModalsRuntime;
initAdminReportModalsRuntime();
var ensureGlobalModalsHtml = window["poker" + "EnsureGlobalModalsHtml"];
if (
  typeof ensureGlobalModalsHtml === "function" &&
  (!document.getElementById("adminReportModal") || !document.getElementById("broadcastReportsModal"))
) {
  ensureGlobalModalsHtml().then(initAdminReportModalsRuntime).catch(function () {});
}

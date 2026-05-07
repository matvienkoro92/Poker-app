// CRM игроков: компактная админ-панель для массового потока в переписке.
(function () {
  var state = {
    loaded: false,
    loading: false,
    heavyLoading: false,
    loadingScope: "",
    tab: "overview",
    period: "30",
    dateFrom: "",
    dateTo: "",
    chartPeriod: "30",
    chartDateFrom: "",
    chartDateTo: "",
    filter: "has_bot",
    search: "",
    selectedId: "",
    players: [],
    registeredAccounts: [],
    registrationModalMethod: "",
    showAllRegistrationModal: false,
    pokerPlusModalOpen: false,
    generalMessagesModalOpen: false,
    showAllGeneralMessagesModal: false,
    visitsModalOpen: false, visitsModalMode: "users",
    botModalOpen: false,
    pushModalOpen: false,
    registrationMethod: "all",
    registrationSort: "name",
    pokerPlusAccounts: [],
    pokerPlusLevelMin: "",
    pokerPlusLevelMax: "",
    pokerPlusDateFrom: "",
    pokerPlusDateTo: "",
    pokerPlusSortField: "level",
    pokerPlusSortDir: "desc",
    registrationModalSortField: "linkedAt",
    registrationModalSortDir: "desc",
    botModalSortField: "botSubscribedAt",
    botModalSortDir: "desc",
    pushModalSortField: "pushSubscribedAt",
    pushModalSortDir: "desc",
    visitsModalSortField: "firstSeenAt",
    visitsModalSortDir: "desc",
    campaigns: [],
    sourceAnalytics: [],
    statsSummary: null,
    chartAnalytics: null,
    chartSeriesEnabled: {
      players: true,
      registrations: true,
      poker21: true,
      bot: true,
      push: true,
      deposits: true,
      crmMessages: true,
      generalMessages: true,
    },
    chatStats: null,
    chatDialogManager: "",
    selectedManagerDialogId: "",
    playerModalOpen: false,
    permissions: null,
    pushConfigured: false,
    source: "api",
    crmError: "",
    showAllPlayers: false,
    loadStartedAt: 0,
  };

  var esc = pokerPlayerCrmEsc;
  var money = pokerPlayerCrmMoney;
  var pct = pokerPlayerCrmPct;
  var intFmt = pokerPlayerCrmIntFmt;
  var daysLabel = pokerPlayerCrmDaysLabel;
  var isoDate = pokerPlayerCrmIsoDate;
  var localDateKey = pokerPlayerCrmLocalDateKey;

  var playerCrmPeriodSegmentsRuntime = typeof initPlayerCrmPeriodSegmentsRuntime === "function"
    ? initPlayerCrmPeriodSegmentsRuntime({
      state: state,
      esc: esc,
      isoDate: isoDate,
      localDateKey: localDateKey,
      dateOnly: dateOnly
    })
    : {};
  var setDefaultDates = playerCrmPeriodSegmentsRuntime.setDefaultDates || function () {};
  var setDefaultChartDates = playerCrmPeriodSegmentsRuntime.setDefaultChartDates || function () {};
  var normalizeDateRange = playerCrmPeriodSegmentsRuntime.normalizeDateRange || function () {};
  var normalizeChartDateRange = playerCrmPeriodSegmentsRuntime.normalizeChartDateRange || function () {};
  var periodKey = playerCrmPeriodSegmentsRuntime.periodKey || function () { return "30"; };
  var periodLabel = playerCrmPeriodSegmentsRuntime.periodLabel || function () { return ""; };
  var periodRangeLabel = playerCrmPeriodSegmentsRuntime.periodRangeLabel || function () { return ""; };
  var fixedPeriodRange = playerCrmPeriodSegmentsRuntime.fixedPeriodRange || function () { return null; };
  var selectedPeriodRange = playerCrmPeriodSegmentsRuntime.selectedPeriodRange || function () { return null; };
  var dateInSelectedPeriod = playerCrmPeriodSegmentsRuntime.dateInSelectedPeriod || function () { return true; };
  var playersInSelectedPeriodByDate = playerCrmPeriodSegmentsRuntime.playersInSelectedPeriodByDate || function () { return []; };
  var chartPeriodLabel = playerCrmPeriodSegmentsRuntime.chartPeriodLabel || function () { return ""; };
  var periodOptionsHtml = playerCrmPeriodSegmentsRuntime.periodOptionsHtml || function () { return ""; };
  var renderModalPeriodControls = playerCrmPeriodSegmentsRuntime.renderModalPeriodControls || function () { return ""; };
  var periodData = playerCrmPeriodSegmentsRuntime.periodData || function () { return { deposits: 0, depositCount: 0, messages: 0 }; };
  var segments = playerCrmPeriodSegmentsRuntime.segments || [];
  var segmentByKey = playerCrmPeriodSegmentsRuntime.segmentByKey || function (key) { return segments[0] || { key: key, label: key }; };
  var segmentPlayers = playerCrmPeriodSegmentsRuntime.segmentPlayers || function () { return []; };
  var filteredPlayers = playerCrmPeriodSegmentsRuntime.filteredPlayers || function () { return []; };
  var sortForWork = playerCrmPeriodSegmentsRuntime.sortForWork || function () { return 0; };
  var playerCrmRegistrationsRuntime = typeof initPlayerCrmRegistrationsRuntime === "function"
    ? initPlayerCrmRegistrationsRuntime({
      state: state,
      esc: esc,
      intFmt: intFmt,
      dateInSelectedPeriod: dateInSelectedPeriod,
      periodLabel: periodLabel,
      registrationTelegramLabel: registrationTelegramLabel,
      dateTime: dateTime,
      renderStats: function () { return renderStats(); }
    })
    : {};
  var hasRegistrationMethod = playerCrmRegistrationsRuntime.hasRegistrationMethod || function () { return false; }, registrationRowsByMethod = playerCrmRegistrationsRuntime.registrationRowsByMethod || function () { return []; };
  var renderRegistrationModal = playerCrmRegistrationsRuntime.renderRegistrationModal || function () {}, closeRegistrationModal = playerCrmRegistrationsRuntime.closeRegistrationModal || function () {}, exportRegistrationModalRows = playerCrmRegistrationsRuntime.exportRegistrationModalRows || function () {};
  function noOpenDialogModals() { return !state.chatDialogManager && !state.registrationModalMethod && !state.pokerPlusModalOpen && !state.generalMessagesModalOpen && !state.visitsModalOpen && !state.botModalOpen && !state.pushModalOpen && !state.playerModalOpen; }
  var playerCrmVisitsRuntime = typeof initPlayerCrmVisitsRuntime === "function"
    ? initPlayerCrmVisitsRuntime({ state: state, esc: esc, intFmt: intFmt, dateTime: dateTime, dateInSelectedPeriod: dateInSelectedPeriod, periodLabel: periodLabel, noOpenDialogModals: noOpenDialogModals, renderStats: function () { return renderStats(); } })
    : {};
  var renderVisitsModal = playerCrmVisitsRuntime.renderVisitsModal || function () {}, closeVisitsModal = playerCrmVisitsRuntime.closeVisitsModal || function () {};

  var playerCrmStatsRuntime = typeof initPlayerCrmStatsRuntime === "function"
    ? initPlayerCrmStatsRuntime({
      state: state,
      esc: esc,
      intFmt: intFmt,
      money: money,
      periodData: periodData,
      periodLabel: periodLabel,
      chartPeriodLabel: chartPeriodLabel,
      dateInSelectedPeriod: dateInSelectedPeriod,
      playersInSelectedPeriodByDate: playersInSelectedPeriodByDate,
      registrationRowsByMethod: registrationRowsByMethod
    })
    : {};
  function renderStats() {
    return playerCrmStatsRuntime && typeof playerCrmStatsRuntime.renderStats === "function" ? playerCrmStatsRuntime.renderStats() : null;
  }

  function renderManagerDialogsList() {
    var key = state.chatDialogManager;
    var chat = state.chatStats || {};
    var data = chat.managerDialogs && key ? chat.managerDialogs[key] : null;
    if (!data) return "";
    var rows = Array.isArray(data.dialogs) ? data.dialogs : [];
    var title = key === "vika" ? "Диалоги Вики" : key === "other" ? "Все остальные диалоги" : "Диалоги Ани";
    var empty = "<div class=\"player-crm__timeline-item\">В этом разделе пока нет диалогов.</div>";
    var body = rows.length ? rows.map(function (row) {
      var active = state.selectedManagerDialogId === row.id;
      return "<div class=\"player-crm__manager-dialog-wrap\">" +
        "<button type=\"button\" class=\"player-crm__manager-dialog" + (active ? " player-crm__manager-dialog--active" : "") + "\" data-crm-manager-dialog-id=\"" + esc(row.id || "") + "\">" +
          "<span><strong>" + esc(row.name || row.handle || row.id || "—") + "</strong><small>" + esc([row.handle, row.dtId || row.id].filter(Boolean).join(" · ")) + "</small></span>" +
          "<span>" + esc(intFmt(row.totalMessages)) + " / " + esc(intFmt(row.periodMessages)) + "</span>" +
        "</button>" +
        (active ? renderManagerConversation(row, key) : "") +
      "</div>";
    }).join("") : empty;
    return "<div class=\"player-crm__modal-content player-crm__modal-content--manager-dialogs\">" + renderModalPeriodControls() +
      "<div class=\"player-crm__manager-dialogs\" aria-label=\"" + esc(title) + "\">" + body + "</div></div>";
  }

  function renderManagerDialogModal() {
    var modal = document.getElementById("playerCrmManagerDialogModal");
    var titleEl = document.getElementById("playerCrmManagerDialogTitle");
    var subtitleEl = document.getElementById("playerCrmManagerDialogSubtitle");
    var bodyEl = document.getElementById("playerCrmManagerDialogBody");
    if (!modal || !bodyEl) return;
    var html = renderManagerDialogsList();
    if (!state.chatDialogManager || !html) {
      modal.hidden = true;
      if (document.body && noOpenDialogModals()) document.body.classList.remove("player-crm-dialog-modal-open");
      return;
    }
    if (titleEl) titleEl.textContent = state.chatDialogManager === "vika" ? "Диалоги Вики" : state.chatDialogManager === "other" ? "Все остальные диалоги" : "Диалоги Ани";
    if (subtitleEl) subtitleEl.textContent = "Сообщений всего / за " + periodLabel();
    bodyEl.innerHTML = html;
    modal.hidden = false;
    if (document.body) document.body.classList.add("player-crm-dialog-modal-open");
  }

  function closeManagerDialogModal() {
    state.chatDialogManager = "";
    state.selectedManagerDialogId = "";
    renderStats();
    renderManagerDialogModal();
  }

  function managerDisplayName(key) {
    return key === "vika" ? "Вика" : "Аня";
  }

  function renderManagerConversation(row, key) {
    var messages = Array.isArray(row.messages) ? row.messages : [];
    var empty = "<div class=\"player-crm__conversation-empty\">Сообщений за выбранный период в этом диалоге нет.</div>";
    var body = messages.length ? messages.map(function (msg) {
      var mine = key !== "other" && String(msg.from || "") === (key === "vika" ? "tg_1897001087" : "tg_2144406710");
      var who = mine ? managerDisplayName(key) : (msg.fromName || msg.from || row.name || row.handle || "Игрок");
      var media = msg.image ? " [фото]" : msg.voice ? " [голосовое]" : msg.document ? " [" + (msg.documentName || "документ") + "]" : "";
      return "<div class=\"player-crm__conversation-msg" + (mine ? " player-crm__conversation-msg--manager" : "") + "\">" +
        "<span><strong>" + esc(who) + "</strong><time>" + esc(msg.time ? new Date(msg.time).toLocaleString("ru-RU") : "") + "</time></span>" +
        "<p>" + esc((msg.text || "").trim() || media.trim() || "Сообщение") + "</p>" +
      "</div>";
    }).join("") : empty;
    return "<div class=\"player-crm__conversation\">" +
      "<div class=\"player-crm__conversation-head\">Переписка: " + esc(row.name || row.handle || row.id || "—") + "</div>" +
      body +
    "</div>";
  }

  function renderChips() {
    var el = document.getElementById("playerCrmFilterChips");
    if (!el) return;
    el.innerHTML = segments.map(function (seg) {
      var count = segmentPlayers(seg.key).length;
      var cls = "player-crm__chip" + (state.filter === seg.key ? " player-crm__chip--active" : "");
      return "<button type=\"button\" class=\"" + cls + "\" data-crm-filter=\"" + esc(seg.key) + "\">" + esc(seg.label) + " · " + count + "</button>";
    }).join("");
  }

  function renderList() {
    var el = document.getElementById("playerCrmList");
    if (!el) return;
    var items = filteredPlayers().sort(sortForWork);
    var total = items.length;
    var visibleItems = state.showAllPlayers ? items : items.slice(0, 15);
    if (!items.length) {
      el.innerHTML = "<div class=\"player-crm__timeline-item\">По этому фильтру пока пусто.</div>";
      return;
    }
    el.innerHTML = visibleItems.map(function (p) {
      var pd = periodData(p);
      var cls = "player-crm__player" + (p.id === state.selectedId ? " player-crm__player--active" : "");
      return "<button type=\"button\" class=\"" + cls + "\" data-crm-player=\"" + esc(p.id) + "\">" +
        "<span class=\"player-crm__player-head\"><span class=\"player-crm__player-name\">" + esc(p.name) + "</span></span>" +
        "<span class=\"player-crm__player-meta\">" + esc(p.handle) + " · " + esc(p.source) + " · " + esc(p.manager) + "</span>" +
        "<span class=\"player-crm__player-note\">" + esc(money(pd.deposits)) + " · сообщений " + esc(pd.messages) + "</span>" +
        "</button>";
    }).join("") + (!state.showAllPlayers && total > visibleItems.length
      ? "<button type=\"button\" class=\"player-crm__show-all\" id=\"playerCrmShowAllBtn\">Показать всех " + esc(total) + "</button>"
      : "");
  }

  function selectedPlayer() {
    for (var i = 0; i < state.players.length; i++) {
      if (state.players[i].id === state.selectedId) return state.players[i];
    }
    return null;
  }

  function renderDetail() {
    var modal = document.getElementById("playerCrmPlayerModal");
    var titleEl = document.getElementById("playerCrmPlayerModalTitle");
    var subtitleEl = document.getElementById("playerCrmPlayerModalSubtitle");
    var el = document.getElementById("playerCrmPlayerModalBody");
    if (!modal || !el) return;
    modal.hidden = !state.playerModalOpen;
    if (!state.playerModalOpen) {
      el.innerHTML = "";
      if (document.body && noOpenDialogModals()) document.body.classList.remove("player-crm-dialog-modal-open");
      return;
    }
    var p = selectedPlayer();
    if (!p) {
      el.innerHTML = "<div class=\"player-crm__timeline-item\">Выберите игрока слева.</div>";
      if (titleEl) titleEl.textContent = "Карточка игрока";
      if (subtitleEl) subtitleEl.textContent = "нет игрока";
      if (document.body) document.body.classList.add("player-crm-dialog-modal-open");
      return;
    }
    var pd = periodData(p);
    if (titleEl) titleEl.textContent = "Карточка игрока";
    if (subtitleEl) subtitleEl.textContent = p.handle || p.accountId || p.id || "игрок";
    if (document.body) document.body.classList.add("player-crm-dialog-modal-open");
    var avg = pd.depositCount ? Math.round(pd.deposits / pd.depositCount) : 0;
    el.innerHTML =
      "<div class=\"player-crm__modal-content player-crm__modal-content--player\">" +
      "<div class=\"player-crm__detail-head\">" +
        "<div><h3 class=\"player-crm__detail-title\">" + esc(p.name) + "</h3><div class=\"player-crm__detail-muted\">" + esc(p.handle) + " · " + esc(p.source) + " · менеджер " + esc(p.manager) + "</div></div>" +
      "</div>" +
      "<div>" + (p.tags || []).map(function (t) { return "<span class=\"player-crm__tag\">" + esc(t) + "</span>"; }).join("") + "</div>" +
      "<div class=\"player-crm__metrics\">" +
        metric("Депозит", money(pd.deposits)) +
        metric("Депозитов", pd.depositCount) +
        metric("Средний депозит", avg ? money(avg) : "—") +
        metric("Сообщений", pd.messages) +
      "</div>" +
      "<div class=\"player-crm__metrics\">" +
        metric("Последний депозит", daysLabel(p.lastDepositDays)) +
        metric("Последнее сообщение", daysLabel(p.lastMessageDays)) +
        metric("Открытия бота", pct(p.botOpenRate)) +
        metric("Открытия push", pct(p.pushOpenRate)) +
      "</div>" +
      "<div class=\"player-crm__metrics\">" +
        metric("Account ID", p.accountId || p.id || "—") +
        metric("DT ID", p.dtId || "—") +
        metric("Telegram", (p.telegramIds && p.telegramIds[0]) || "—") +
        metric("PokerPlus", p.pokerPlusUserId || "—") +
      "</div>" +
      "<div class=\"player-crm__timeline-item\"><strong>Заметка:</strong> " + esc(p.note) + "</div>" +
      "<div class=\"player-crm__edit\" data-crm-edit-player=\"" + esc(p.accountId || p.id) + "\">" +
        "<h4 class=\"player-crm__edit-title\">CRM-поля</h4>" +
        "<div class=\"player-crm__form-grid\">" +
          "<label><span>Менеджер</span><input id=\"playerCrmEditManager\" value=\"" + esc(p.manager || "") + "\" /></label>" +
          "<label><span>Источник</span><input id=\"playerCrmEditSource\" value=\"" + esc(p.source || "") + "\" /></label>" +
          "<label><span>Теги через запятую</span><input id=\"playerCrmEditTags\" value=\"" + esc((p.tags || []).join(", ")) + "\" /></label>" +
        "</div>" +
        "<label class=\"player-crm__message-label\"><span>Заметка</span><textarea id=\"playerCrmEditNote\" rows=\"3\">" + esc(p.note || "") + "</textarea></label>" +
        "<div class=\"player-crm__broadcast-actions\"><button type=\"button\" class=\"player-crm__primary-btn\" id=\"playerCrmSavePlayerBtn\">Сохранить карточку</button></div>" +
        "<h4 class=\"player-crm__edit-title\">Связки ID</h4>" +
        "<div class=\"player-crm__form-grid\">" +
          "<label><span>DT ID</span><input id=\"playerCrmLinkDtId\" value=\"" + esc(p.dtId || "") + "\" placeholder=\"ID123456\" /></label>" +
          "<label><span>Telegram ID</span><input id=\"playerCrmLinkTelegramId\" value=\"" + esc((p.telegramIds && p.telegramIds[0]) || "") + "\" placeholder=\"tg_123456\" /></label>" +
          "<label><span>PokerPlus ID</span><input id=\"playerCrmLinkPokerPlusId\" value=\"" + esc(p.pokerPlusUserId || "") + "\" /></label>" +
          "<label><span>Имя</span><input id=\"playerCrmLinkDisplayName\" value=\"" + esc(p.name || "") + "\" /></label>" +
        "</div>" +
        "<div class=\"player-crm__broadcast-actions\"><button type=\"button\" class=\"player-crm__ghost-btn\" id=\"playerCrmLinkIdentityBtn\">Связать ID</button></div>" +
        "<h4 class=\"player-crm__edit-title\">Быстрое событие</h4>" +
        "<div class=\"player-crm__form-grid\">" +
          "<label><span>Тип</span><select id=\"playerCrmEventType\"><option value=\"deposit\">Депозит</option><option value=\"message\">Сообщение</option></select></label>" +
          "<label><span>Сумма</span><input id=\"playerCrmEventAmount\" type=\"number\" inputmode=\"numeric\" min=\"0\" placeholder=\"0\" /></label>" +
        "</div>" +
        "<label class=\"player-crm__message-label\"><span>Комментарий к событию</span><input id=\"playerCrmEventNote\" placeholder=\"например: импорт из кассы / написал в бот\" /></label>" +
        "<div class=\"player-crm__broadcast-actions\"><button type=\"button\" class=\"player-crm__ghost-btn\" id=\"playerCrmAddEventBtn\">Добавить событие</button></div>" +
      "</div>" +
      "<div class=\"player-crm__timeline\">" +
        (p.timeline || []).map(function (row) { return "<div class=\"player-crm__timeline-item\">" + esc(row) + "</div>"; }).join("") +
        renderTouches(p) +
      "</div>" +
      "</div>";
  }

  function closePlayerModal() {
    state.playerModalOpen = false;
    state.selectedId = "";
    renderList();
    renderDetail();
  }

  function renderTouches(p) {
    if (!p || !Array.isArray(p.touches) || !p.touches.length) return "";
    return p.touches.slice(0, 5).map(function (t) {
      var at = t.at ? new Date(t.at).toLocaleString("ru-RU") : "";
      return "<div class=\"player-crm__timeline-item\"><strong>Касание</strong> · " + esc(at) + " · " + esc(t.channel || "канал") + " · " + esc(t.segment || "") + "</div>";
    }).join("");
  }

  function metric(label, value) {
    return "<div class=\"player-crm__metric\"><span>" + esc(label) + "</span><strong>" + esc(value) + "</strong></div>";
  }

  function registrationMethodLabel(methods) {
    var list = Array.isArray(methods) ? methods : [];
    var out = [];
    if (list.indexOf("email") >= 0) out.push("Почта");
    if (list.indexOf("telegram") >= 0) out.push("Telegram");
    return out.length ? out.join(" + ") : "—";
  }

  function registrationTelegramLabel(row) {
    if (!row) return "—";
    if (row.telegramUsername) return row.telegramUsername;
    if (Array.isArray(row.telegramIds) && row.telegramIds.length) return row.telegramIds.join(", ");
    return "—";
  }

  function filteredRegistrations() {
    var rows = Array.isArray(state.registeredAccounts) ? state.registeredAccounts.slice() : [];
    rows = rows.filter(function (r) { return dateInSelectedPeriod(r && r.linkedAt); });
    if (state.registrationMethod === "email") {
      rows = rows.filter(function (r) { return r.methods && r.methods.indexOf("email") >= 0; });
    } else if (state.registrationMethod === "telegram") {
      rows = rows.filter(function (r) { return r.methods && r.methods.indexOf("telegram") >= 0; });
    }
    var sort = state.registrationSort || "name";
    rows.sort(function (a, b) {
      function val(row) {
        if (sort === "email") return row.email || "";
        if (sort === "telegram") return registrationTelegramLabel(row);
        if (sort === "method") return registrationMethodLabel(row.methods);
        return row.name || row.accountId || "";
      }
      return String(val(a)).toLowerCase().localeCompare(String(val(b)).toLowerCase(), "ru");
    });
    return rows;
  }

  function renderRegistrations() {
    var el = document.getElementById("playerCrmRegistrations");
    if (!el) return;
    var allRows = (Array.isArray(state.registeredAccounts) ? state.registeredAccounts : []).filter(function (r) { return dateInSelectedPeriod(r && r.linkedAt); });
    var rows = filteredRegistrations();
    var emailOnlyCount = registrationRowsByMethod("email").length;
    var telegramOnlyCount = registrationRowsByMethod("telegram").length;
    var bothCount = registrationRowsByMethod("both").length;
    if (!allRows.length) {
      el.innerHTML = "<div class=\"player-crm__timeline-item\">Зарегистрированных аккаунтов по почте или Telegram-боту пока нет.</div>";
      return;
    }
    var summary =
      "<div class=\"player-crm__metrics player-crm__metrics--registrations\">" +
        metric("Показано", intFmt(rows.length)) +
        metric("Всего", intFmt(allRows.length)) +
        metric("Только почта", intFmt(emailOnlyCount)) +
        metric("Только Telegram", intFmt(telegramOnlyCount)) +
        metric("И то и то", intFmt(bothCount)) +
      "</div>";
    if (!rows.length) {
      el.innerHTML = summary + "<div class=\"player-crm__timeline-item\">По этому фильтру пусто.</div>";
      return;
    }
    var table = "<div class=\"player-crm__source-table-wrap\"><table class=\"player-crm__source-table player-crm__registrations-table\"><thead><tr>" +
      "<th>Аккаунт</th><th>Регистрация</th><th>Email</th><th>Telegram-логин</th><th>Имя</th>" +
      "</tr></thead><tbody>" + rows.map(function (r) {
        var tg = registrationTelegramLabel(r);
        return "<tr>" +
          "<td>" + esc(r.accountId || r.dtId || "—") + "</td>" +
          "<td>" + esc(tg !== "—" ? tg : registrationMethodLabel(r.methods)) + "</td>" +
          "<td>" + esc(r.email || "—") + "</td>" +
          "<td>" + esc(tg) + "</td>" +
          "<td>" + esc(r.name || "—") + "</td>" +
        "</tr>";
      }).join("") + "</tbody></table></div>";
    el.innerHTML = summary + table;
  }

  function dateOnly(iso) {
    return String(iso || "").slice(0, 10);
  }

  function dateTime(iso) {
    var d = iso ? new Date(iso) : null;
    if (!d || isNaN(d.getTime())) return "—";
    return d.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  var crmTableSortKeys = {
    pokerplus: ["pokerPlusSortField", "pokerPlusSortDir"],
    "registration-modal": ["registrationModalSortField", "registrationModalSortDir"],
    "bot-modal": ["botModalSortField", "botModalSortDir"],
    "push-modal": ["pushModalSortField", "pushModalSortDir"],
    "visits-modal": ["visitsModalSortField", "visitsModalSortDir"],
  };
  function setTableSort(scope, field) {
    var keys = crmTableSortKeys[scope];
    if (!keys || !field) return false;
    if (state[keys[0]] === field) state[keys[1]] = state[keys[1]] === "asc" ? "desc" : "asc";
    else { state[keys[0]] = field; state[keys[1]] = field === "name" ? "asc" : "desc"; }
    return true;
  }
  function renderSortScope(scope) {
    if (scope === "pokerplus") { renderPokerPlusAccounts(); renderPokerPlusModal(); }
    else if (scope === "registration-modal") renderRegistrationModal();
    else if (scope === "bot-modal") renderBotModal();
    else if (scope === "push-modal") renderPushModal();
    else if (scope === "visits-modal") renderVisitsModal();
  }
  var playerCrmPokerPlusRuntime = typeof initPlayerCrmPokerPlusRuntime === "function"
    ? initPlayerCrmPokerPlusRuntime({
      state: state,
      esc: esc,
      money: money,
      intFmt: intFmt,
      dateInSelectedPeriod: dateInSelectedPeriod,
      periodLabel: periodLabel,
      dateOnly: dateOnly,
      dateTime: dateTime,
      metric: metric,
      noOpenDialogModals: noOpenDialogModals,
      renderStats: function () { return renderStats(); }
    })
    : {};
  var filteredPokerPlusAccounts = playerCrmPokerPlusRuntime.filteredPokerPlusAccounts || function () { return []; };
  var renderPokerPlusAccounts = playerCrmPokerPlusRuntime.renderPokerPlusAccounts || function () {};
  var renderPokerPlusModal = playerCrmPokerPlusRuntime.renderPokerPlusModal || function () {};
  var closePokerPlusModal = playerCrmPokerPlusRuntime.closePokerPlusModal || function () {};

  function renderGeneralMessagesModalList() {
    var chat = state.chatStats || {};
    var rows = chat.generalMessages && Array.isArray(chat.generalMessages.authors) ? chat.generalMessages.authors : [];
    if (!rows.length) return renderModalPeriodControls() + "<div class=\"player-crm__timeline-item\">За выбранный период сообщений в главном чате пока нет.</div>";
    var visibleRows = state.showAllGeneralMessagesModal ? rows : rows.slice(0, 10);
    return renderModalPeriodControls() + "<div class=\"player-crm__modal-content\"><div class=\"player-crm__source-table-wrap\"><table class=\"player-crm__source-table\"><thead><tr>" +
      "<th>Игрок</th><th>ID</th><th>Сообщений</th>" +
      "</tr></thead><tbody>" + visibleRows.map(function (r) {
        return "<tr>" +
          "<td>" + esc(r.name || "—") + "</td>" +
          "<td>" + esc(r.handle || r.id || "—") + "</td>" +
          "<td>" + esc(intFmt(r.count || 0)) + "</td>" +
        "</tr>";
      }).join("") + "</tbody></table></div>" +
      (!state.showAllGeneralMessagesModal && rows.length > 10
        ? "<div class=\"player-crm__modal-actions\"><button type=\"button\" class=\"player-crm__ghost-btn\" data-crm-show-all-general-messages>Показать всех " + esc(intFmt(rows.length)) + "</button></div>"
        : "") + "</div>";
  }

  function renderGeneralMessagesModal() {
    var modal = document.getElementById("playerCrmGeneralMessagesModal");
    var subtitleEl = document.getElementById("playerCrmGeneralMessagesModalSubtitle");
    var bodyEl = document.getElementById("playerCrmGeneralMessagesModalBody");
    if (!modal || !bodyEl) return;
    if (!state.generalMessagesModalOpen) {
      modal.hidden = true;
      if (document.body && noOpenDialogModals()) document.body.classList.remove("player-crm-dialog-modal-open");
      return;
    }
    var chat = state.chatStats || {};
    var rows = chat.generalMessages && Array.isArray(chat.generalMessages.authors) ? chat.generalMessages.authors : [];
    if (subtitleEl) subtitleEl.textContent = "Главный чат · " + periodLabel() + " · " + intFmt(rows.length) + " участников";
    bodyEl.innerHTML = renderGeneralMessagesModalList();
    modal.hidden = false;
    if (document.body) document.body.classList.add("player-crm-dialog-modal-open");
  }

  function closeGeneralMessagesModal() {
    state.generalMessagesModalOpen = false;
    state.showAllGeneralMessagesModal = false;
    renderStats();
    renderGeneralMessagesModal();
  }

  function channelSubscribersRows(channel) {
    var rows = (Array.isArray(state.players) ? state.players.slice() : [])
      .filter(function (p) {
        var field = channel === "push" ? "pushSubscribedAt" : "botSubscribedAt";
        return !!(p.channels && p.channels[channel]) && dateInSelectedPeriod(p[field]);
      });
    return sortChannelSubscribersRows(rows, channel);
  }

  function channelSortValue(row, field) {
    if (field === "botSubscribedAt" || field === "pushSubscribedAt") return pokerPlayerCrmSortDateValue(row && row[field]);
    return String((row && (row.name || row.handle || row.id)) || "").toLowerCase();
  }

  function sortChannelSubscribersRows(rows, channel) {
    var fieldKey = channel === "push" ? "pushModalSortField" : "botModalSortField";
    var dirKey = channel === "push" ? "pushModalSortDir" : "botModalSortDir";
    var field = state[fieldKey] || (channel === "push" ? "pushSubscribedAt" : "botSubscribedAt");
    return pokerPlayerCrmSortRows(rows, function (row) {
      return channelSortValue(row, field);
    }, state[dirKey] || "desc", function (a, b) {
      return String(a.name || a.handle || a.id || "").localeCompare(String(b.name || b.handle || b.id || ""), "ru");
    });
  }

  function renderChannelSubscribersTable(rows, emptyText, dateField, dateHeader) {
    if (!rows.length) return "<div class=\"player-crm__timeline-item\">" + esc(emptyText) + "</div>";
    var isPush = dateField === "pushSubscribedAt";
    var scope = isPush ? "push-modal" : "bot-modal";
    var sortField = state[isPush ? "pushModalSortField" : "botModalSortField"] || dateField;
    var sortDir = state[isPush ? "pushModalSortDir" : "botModalSortDir"] || "desc";
    return "<div class=\"player-crm__modal-content\"><div class=\"player-crm__source-table-wrap\"><table class=\"player-crm__source-table player-crm__channel-table\"><thead><tr>" +
      pokerPlayerCrmSortableTh(esc, scope, dateField, dateHeader, sortField, sortDir) + "<th>Игрок</th><th>Telegram</th><th>ID</th><th>Источник</th>" +
      "</tr></thead><tbody>" + rows.map(function (p) {
        return "<tr>" +
          "<td>" + esc(dateTime(p[dateField])) + "</td>" +
          "<td>" + esc(p.name || "—") + "</td>" +
          "<td>" + esc(p.handle || "—") + "</td>" +
          "<td>" + esc(p.accountId || p.dtId || p.id || "—") + "</td>" +
          "<td>" + esc(p.source || "—") + "</td>" +
        "</tr>";
      }).join("") + "</tbody></table></div></div>";
  }

  function botSubscribersRows() {
    return channelSubscribersRows("bot");
  }

  function renderBotModalList() {
    return renderChannelSubscribersTable(botSubscribersRows(), "Новых подписок на бот за период пока нет.", "botSubscribedAt", "Дата подписки");
  }

  function renderBotModal() {
    var modal = document.getElementById("playerCrmBotModal");
    var subtitleEl = document.getElementById("playerCrmBotModalSubtitle");
    var bodyEl = document.getElementById("playerCrmBotModalBody");
    if (!modal || !bodyEl) return;
    if (!state.botModalOpen) {
      modal.hidden = true;
      if (document.body && noOpenDialogModals()) document.body.classList.remove("player-crm-dialog-modal-open");
      return;
    }
    var rows = botSubscribersRows();
    if (subtitleEl) subtitleEl.textContent = "Новые подписки · " + periodLabel() + " · " + intFmt(rows.length) + " игроков";
    bodyEl.innerHTML = renderBotModalList();
    modal.hidden = false;
    if (document.body) document.body.classList.add("player-crm-dialog-modal-open");
  }

  function closeBotModal() {
    state.botModalOpen = false;
    renderStats();
    renderBotModal();
  }

  function pushSubscribersRows() {
    return channelSubscribersRows("push");
  }

  function renderPushModalList() {
    return renderChannelSubscribersTable(pushSubscribersRows(), "Новых push-подписок за период пока нет.", "pushSubscribedAt", "Дата привязки push");
  }

  function renderPushModal() {
    var modal = document.getElementById("playerCrmPushModal");
    var subtitleEl = document.getElementById("playerCrmPushModalSubtitle");
    var bodyEl = document.getElementById("playerCrmPushModalBody");
    if (!modal || !bodyEl) return;
    if (!state.pushModalOpen) {
      modal.hidden = true;
      if (document.body && noOpenDialogModals()) document.body.classList.remove("player-crm-dialog-modal-open");
      return;
    }
    var rows = pushSubscribersRows();
    if (subtitleEl) subtitleEl.textContent = "Новые подписки · " + periodLabel() + " · " + intFmt(rows.length) + " игроков";
    bodyEl.innerHTML = renderPushModalList();
    modal.hidden = false;
    if (document.body) document.body.classList.add("player-crm-dialog-modal-open");
  }

  function closePushModal() {
    state.pushModalOpen = false;
    renderStats();
    renderPushModal();
  }

  function renderSegments() {
    var el = document.getElementById("playerCrmSegments");
    if (!el) return;
    el.innerHTML = segments.filter(function (s) { return s.key !== "all"; }).map(function (seg) {
      var players = segmentPlayers(seg.key);
      var dep = players.reduce(function (sum, p) { return sum + periodData(p).deposits; }, 0);
      return "<article class=\"player-crm__segment-card\">" +
        "<h4>" + esc(seg.label) + "</h4>" +
        "<p>" + esc(seg.desc) + "</p>" +
        "<div class=\"player-crm__segment-actions\"><span class=\"player-crm__badge\">" + players.length + " игроков</span><span class=\"player-crm__detail-muted\">" + esc(money(dep)) + " · " + esc(periodLabel()) + "</span></div>" +
        "<div class=\"player-crm__broadcast-actions\"><button type=\"button\" class=\"player-crm__ghost-btn\" data-crm-use-segment=\"" + esc(seg.key) + "\">Открыть список</button><button type=\"button\" class=\"player-crm__primary-btn\" data-crm-broadcast-segment=\"" + esc(seg.key) + "\">Рассылка</button></div>" +
      "</article>";
    }).join("");
  }

  function renderBroadcastOptions() {
    var sel = document.getElementById("playerCrmBroadcastSegment");
    if (!sel) return;
    var prev = sel.value || state.filter || "has_bot";
    sel.innerHTML = segments.map(function (seg) {
      return "<option value=\"" + esc(seg.key) + "\">" + esc(seg.label) + "</option>";
    }).join("");
    sel.value = segmentByKey(prev).key;
    updateBroadcastAudience();
  }

  function updateBroadcastAudience() {
    var sel = document.getElementById("playerCrmBroadcastSegment");
    var el = document.getElementById("playerCrmBroadcastAudience");
    var key = sel ? sel.value : state.filter;
    var players = segmentPlayers(key);
    if (el) el.textContent = players.length + " получателей";
    return players;
  }

  var playerCrmChartsRuntime = typeof initPlayerCrmChartsRuntime === "function"
    ? initPlayerCrmChartsRuntime({
      state: state,
      esc: esc,
      intFmt: intFmt
    })
    : {};
  var renderAnalytics = playerCrmChartsRuntime.renderAnalytics || function () {};
  var showChartTooltip = playerCrmChartsRuntime.showChartTooltip || function () {};
  var hideChartTooltip = playerCrmChartsRuntime.hideChartTooltip || function () {};

  function showChatModalLoading() {
    var html = "<div class=\"player-crm__modal-content player-crm__modal-content--manager-dialogs\">" + renderModalPeriodControls() +
      "<div class=\"player-crm__notice player-crm__notice--loading\">Загрузка данных…</div></div>";
    var generalBody = document.getElementById("playerCrmGeneralMessagesModalBody");
    var managerBody = document.getElementById("playerCrmManagerDialogBody");
    if (state.generalMessagesModalOpen && generalBody) generalBody.innerHTML = html;
    if (state.chatDialogManager && managerBody) managerBody.innerHTML = html;
  }

  function reloadCrmDataFromModal() {
    state.showAllGeneralMessagesModal = false;
    syncPeriodInputs();
    showChatModalLoading();
    loadCrmData("data");
  }

  function bars(rows, max) {
    return "<div class=\"player-crm__bar\">" + rows.map(function (row) {
      var w = max ? Math.max(4, Math.round((row.value / max) * 100)) : 0;
      return "<div class=\"player-crm__bar-row\"><span>" + esc(row.label) + "</span><span class=\"player-crm__bar-track\"><span class=\"player-crm__bar-fill\" style=\"width:" + w + "%\"></span></span><strong>" + esc(row.value) + "</strong></div>";
    }).join("") + "</div>";
  }

  function renderAll() {
    syncTabCounts();
    renderStats();
    renderChips();
    renderList();
    renderDetail();
    renderRegistrations();
    renderPokerPlusAccounts();
    renderSegments();
    renderBroadcastOptions();
    renderAnalytics();
    syncPeriodInputs();
    syncTabs();
    renderManagerDialogModal();
    renderRegistrationModal();
    renderPokerPlusModal();
    renderVisitsModal();
    renderGeneralMessagesModal();
    renderBotModal();
    renderPushModal();
  }

  function syncTabCounts() {
  }

  function syncTabs() {
    var tabs = document.querySelectorAll(".player-crm__tab[data-crm-tab]");
    var panels = document.querySelectorAll(".player-crm__tab-panel[data-crm-panel]");
    tabs.forEach(function (tab) {
      tab.classList.toggle("player-crm__tab--active", tab.getAttribute("data-crm-tab") === state.tab);
    });
    panels.forEach(function (panel) {
      panel.classList.toggle("player-crm__tab-panel--active", panel.getAttribute("data-crm-panel") === state.tab);
    });
  }

  function getApiBaseSafe() {
    try {
      return typeof getApiBase === "function" ? getApiBase() : "";
    } catch (e) {
      return "";
    }
  }

  function authQuerySafe() {
    try {
      return typeof pokerRafflesApiQueryLeading === "function" ? pokerRafflesApiQueryLeading() : "?initData=";
    } catch (e) {
      return "?initData=";
    }
  }

  function postBodySafe(extra) {
    try {
      return typeof pokerGuestOrAuthedPostBody === "function" ? pokerGuestOrAuthedPostBody(extra) : extra;
    } catch (e) {
      return extra;
    }
  }

  function showCrmLoading(scope) {
    state.loadingScope = scope || "all";
    state.crmError = "";
    renderStats();
    renderAnalytics();
  }

  function applyCrmData(data, heavyOnly) {
    if (!data || !data.ok || !Array.isArray(data.players)) return false;
    if (!heavyOnly) {
      state.players = data.players;
      state.registeredAccounts = Array.isArray(data.registeredAccounts) ? data.registeredAccounts : [];
      state.pokerPlusAccounts = Array.isArray(data.pokerPlusAccounts) ? data.pokerPlusAccounts : [];
      state.campaigns = Array.isArray(data.campaigns) ? data.campaigns : [];
      state.sourceAnalytics = Array.isArray(data.sourceAnalytics) ? data.sourceAnalytics : [];
      state.statsSummary = data.statsSummary && typeof data.statsSummary === "object" ? data.statsSummary : null;
      state.permissions = data.permissions || null;
      state.pushConfigured = data.pushConfigured === true;
      state.source = data.source || "api";
      state.crmError = "";
    } else {
      state.players = data.players;
      state.registeredAccounts = Array.isArray(data.registeredAccounts) ? data.registeredAccounts : state.registeredAccounts;
      state.pokerPlusAccounts = Array.isArray(data.pokerPlusAccounts) ? data.pokerPlusAccounts : state.pokerPlusAccounts;
      state.campaigns = Array.isArray(data.campaigns) ? data.campaigns : state.campaigns;
      state.sourceAnalytics = Array.isArray(data.sourceAnalytics) ? data.sourceAnalytics : state.sourceAnalytics;
      state.statsSummary = data.statsSummary && typeof data.statsSummary === "object" ? data.statsSummary : state.statsSummary;
      state.permissions = data.permissions || state.permissions;
      state.pushConfigured = data.pushConfigured === true || state.pushConfigured === true;
      state.source = data.source || state.source;
      state.crmError = "";
    }
    state.chartAnalytics = data.chartAnalytics || null;
    state.chatStats = data.chatStats || null;
    if (data.range && data.range.key === "custom" && !(state.period === "yesterday" && isLocalYesterdayRange(data.range)) && !isFixedPeriodRange(state.period, data.range)) {
      state.period = "custom";
      state.dateFrom = data.range.from || state.dateFrom;
      state.dateTo = data.range.to || state.dateTo;
    }
    if (data.chartRange && data.chartRange.key === "custom" && !(state.chartPeriod === "yesterday" && isLocalYesterdayRange(data.chartRange)) && !isFixedPeriodRange(state.chartPeriod, data.chartRange)) {
      state.chartPeriod = "custom";
      state.chartDateFrom = data.chartRange.from || state.chartDateFrom;
      state.chartDateTo = data.chartRange.to || state.chartDateTo;
    } else if (data.chartRange && data.chartRange.key) {
      state.chartPeriod = String(data.chartRange.key);
    }
    return true;
  }

  function loadCrmHeavyData(scope) {
    if (state.heavyLoading) return Promise.resolve(false);
    state.heavyLoading = true;
    renderStats();
    renderAnalytics();
    var base = getApiBaseSafe();
    if (!base) {
      state.heavyLoading = false;
      return Promise.resolve(false);
    }
    return fetch(base + "/api/player-crm" + crmQuery({ mode: "heavy" }))
      .then(function (r) {
        return r.json().then(function (data) {
          data = data || {};
          data.__httpOk = r.ok;
          data.__status = r.status;
          return data;
        });
      })
      .then(function (data) {
        if (data && data.ok && Array.isArray(data.players)) applyCrmData(data, true);
      })
      .catch(function () {})
      .then(function () {
        state.heavyLoading = false;
        renderAll();
        return true;
      });
  }

  function loadCrmData(scope) {
    if (scope === "chart" && state.loaded) return loadCrmHeavyData(scope);
    if (state.loading && state.loadStartedAt && Date.now() - state.loadStartedAt > 18000) {
      state.loading = false;
      state.loadingScope = "";
    }
    if (state.loading) return Promise.resolve(false);
    state.loading = true;
    state.loadStartedAt = Date.now();
    showCrmLoading(scope || "all");
    var base = getApiBaseSafe();
    var hasCred = false;
    try {
      hasCred = typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
    } catch (eCred) {}
    if (!base || !hasCred) {
      state.players = [];
      state.registeredAccounts = [];
      state.pokerPlusAccounts = [];
      state.campaigns = [];
      state.sourceAnalytics = [];
      state.chartAnalytics = null;
      state.chatStats = null;
      state.permissions = null;
      state.source = "no-auth";
      state.crmError = "CRM не загрузилась: нет авторизации. Войди по email владельца CRM.";
      state.loading = false;
      state.loadStartedAt = 0;
      state.loadingScope = "";
      state.loaded = true;
      renderAll();
      return Promise.resolve(true);
    }
    var controller = null;
    var timeoutId = null;
    if (typeof AbortController !== "undefined") {
      controller = new AbortController();
      timeoutId = setTimeout(function () {
        try { controller.abort(); } catch (eAbort) {}
      }, 16000);
    }
    var shouldLoadHeavy = false;
    return fetch(base + "/api/player-crm" + crmQuery({ mode: "core" }), controller ? { signal: controller.signal } : undefined)
      .then(function (r) {
        return r.json()
          .then(function (data) {
            data = data || {};
            data.__httpOk = r.ok;
            data.__status = r.status;
            return data;
          })
          .catch(function () {
            return { ok: false, __httpOk: r.ok, __status: r.status, error: "CRM не вернула данные." };
          });
      })
      .then(function (data) {
        if (applyCrmData(data, false)) {
          shouldLoadHeavy = data && data.heavyPending === true;
        } else {
          state.players = [];
          state.registeredAccounts = [];
          state.pokerPlusAccounts = [];
          state.campaigns = [];
          state.sourceAnalytics = [];
          state.statsSummary = null;
          state.chartAnalytics = null;
          state.chatStats = null;
          state.permissions = null;
          state.source = data && data.__status === 403 ? "forbidden" : "empty";
          state.crmError = formatCrmLoadError(data);
        }
      })
      .catch(function (error) {
        state.players = [];
        state.registeredAccounts = [];
        state.pokerPlusAccounts = [];
        state.campaigns = [];
        state.sourceAnalytics = [];
        state.statsSummary = null;
        state.chartAnalytics = null;
        state.chatStats = null;
        state.permissions = null;
        state.source = "error";
        state.crmError = error && error.name === "AbortError"
          ? "CRM не загрузилась: API отвечает слишком долго. Попробуй открыть раздел ещё раз через несколько секунд."
          : "CRM не загрузилась: ошибка сети или API.";
      })
      .then(function () {
        if (timeoutId) clearTimeout(timeoutId);
        state.loading = false;
        state.loadStartedAt = 0;
        state.loadingScope = "";
        state.loaded = true;
        renderAll();
        if (shouldLoadHeavy) loadCrmHeavyData("heavy");
        return true;
      });
  }

  function formatCrmLoadError(data) {
    data = data || {};
    if (data.__status === 403) {
      return ((data.error || "CRM доступна только владельцам") + ". Если ты уже вошёл под нужной почтой, выйди и войди по email ещё раз.");
    }
    var code = data.code ? " Код: " + String(data.code) + "." : "";
    var detail = data.details ? " Деталь: " + String(data.details) + "." : "";
    if (data.__status >= 500 || data.code) {
      return "CRM не загрузилась: API упала при сборке данных." + code + detail;
    }
    return (data.error || "CRM не загрузилась: API не вернул живые данные.") + code + detail;
  }

  function runBroadcast(action) {
    var segEl = document.getElementById("playerCrmBroadcastSegment");
    var channelEl = document.getElementById("playerCrmBroadcastChannel");
    var textEl = document.getElementById("playerCrmBroadcastText");
    var out = document.getElementById("playerCrmBroadcastResult");
    var segment = segEl ? segEl.value : "has_bot";
    var channel = channelEl ? channelEl.value : "bot";
    var text = textEl ? String(textEl.value || "").trim() : "";
    var players = segmentPlayers(segment);
    if (!text) {
      if (out) out.textContent = "Нужно написать текст сообщения.";
      return;
    }
    if (action === "send_campaign") {
      if (state.permissions && state.permissions.canSendCampaign === false) {
        if (out) out.textContent = "У твоей роли нет права отправлять массовые рассылки.";
        return;
      }
      var ok = window.confirm ? window.confirm("Отправить рассылку сейчас: " + players.length + " игроков, канал " + channelLabel(channel) + "?") : false;
      if (!ok) return;
    }
    if (out) out.textContent = action === "send_campaign" ? "Отправляем: " + players.length + " игроков..." : "Готовим аудиторию: " + players.length + " игроков...";
    var base = getApiBaseSafe();
    var hasCred = false;
    try {
      hasCred = typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
    } catch (eCred) {}
    if (!base || !hasCred) {
      if (out) out.textContent = "Нет авторизации/API: живая аудитория недоступна.";
      return;
    }
    fetch(base + "/api/player-crm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postBodySafe({
        action: action,
        segment: segment,
        channel: channel,
        text: text,
        audienceIds: players.map(function (p) { return p.accountId || p.id; }),
        period: state.period === "custom" ? "30" : state.period,
        range: requestRange(),
      })),
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data && data.ok) {
          if (out) out.textContent = (action === "send_campaign" ? "Рассылка отправлена" : "Черновик рассылки готов") + ": " + data.audience + " игроков, бот " + (data.sentBot || 0) + ", push " + (data.sentPush || 0) + ", антиспам пропустил " + (data.skippedAntispam || 0) + ", ошибок " + (data.failed || 0) + ". ID: " + (data.id || data.campaignId || "—") + ".";
          loadCrmData();
        } else if (out) {
          out.textContent = data && data.error ? data.error : "Не удалось подготовить рассылку.";
        }
      })
      .catch(function () {
        if (out) out.textContent = typeof POKER_NET_ERR !== "undefined" ? POKER_NET_ERR : "Ошибка сети.";
      });
  }

  function prepareBroadcast() {
    runBroadcast("prepare_campaign");
  }

  function sendBroadcastNow() {
    runBroadcast("send_campaign");
  }

  function saveSelectedPlayer() {
    var p = selectedPlayer();
    if (!p) return;
    var base = getApiBaseSafe();
    var out = document.getElementById("playerCrmBroadcastResult");
    var hasCred = false;
    try {
      hasCred = typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
    } catch (eCred) {}
    if (!base || !hasCred) {
      if (out) out.textContent = "Сохранение доступно после входа админа.";
      return;
    }
    var payload = {
      action: "save_player",
      accountId: p.accountId || p.id,
      manager: val("playerCrmEditManager"),
      source: val("playerCrmEditSource"),
      tags: val("playerCrmEditTags"),
      note: val("playerCrmEditNote"),
    };
    fetch(base + "/api/player-crm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postBodySafe(payload)),
    }).then(function (r) { return r.json(); }).then(function (data) {
      if (out) out.textContent = data && data.ok ? "Карточка сохранена." : (data && data.error ? data.error : "Не удалось сохранить.");
      if (data && data.ok) loadCrmData();
    }).catch(function () {
      if (out) out.textContent = typeof POKER_NET_ERR !== "undefined" ? POKER_NET_ERR : "Ошибка сети.";
    });
  }

  function addSelectedEvent() {
    var p = selectedPlayer();
    if (!p) return;
    var base = getApiBaseSafe();
    var out = document.getElementById("playerCrmBroadcastResult");
    var hasCred = false;
    try {
      hasCred = typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
    } catch (eCred) {}
    if (!base || !hasCred) {
      if (out) out.textContent = "События можно добавлять после входа админа.";
      return;
    }
    fetch(base + "/api/player-crm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postBodySafe({
        action: "record_event",
        accountId: p.accountId || p.id,
        type: val("playerCrmEventType"),
        amount: val("playerCrmEventAmount"),
        note: val("playerCrmEventNote"),
      })),
    }).then(function (r) { return r.json(); }).then(function (data) {
      if (out) out.textContent = data && data.ok ? "Событие добавлено." : (data && data.error ? data.error : "Не удалось добавить событие.");
      if (data && data.ok) loadCrmData();
    }).catch(function () {
      if (out) out.textContent = typeof POKER_NET_ERR !== "undefined" ? POKER_NET_ERR : "Ошибка сети.";
    });
  }

  function linkSelectedIdentity() {
    var p = selectedPlayer();
    if (!p) return;
    postCrmAction({
      action: "link_identity",
      accountId: p.accountId || p.id,
      dtId: val("playerCrmLinkDtId"),
      telegramId: val("playerCrmLinkTelegramId"),
      pokerPlusId: val("playerCrmLinkPokerPlusId"),
      displayName: val("playerCrmLinkDisplayName"),
    }, "Связки ID сохранены.");
  }

  function postCrmAction(payload, okText) {
    var base = getApiBaseSafe();
    var out = document.getElementById("playerCrmBroadcastResult");
    var hasCred = false;
    try {
      hasCred = typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
    } catch (eCred) {}
    if (!base || !hasCred) {
      if (out) out.textContent = "Действие доступно после входа админа.";
      return;
    }
    fetch(base + "/api/player-crm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postBodySafe(payload)),
    }).then(function (r) { return r.json(); }).then(function (data) {
      if (out) out.textContent = data && data.ok ? okText : (data && data.error ? data.error : "Не удалось выполнить действие.");
      if (data && data.ok) loadCrmData();
    }).catch(function () {
      if (out) out.textContent = typeof POKER_NET_ERR !== "undefined" ? POKER_NET_ERR : "Ошибка сети.";
    });
  }

  function val(id) {
    var el = document.getElementById(id);
    return el ? el.value || "" : "";
  }

  function requestRange() {
    if (state.period === "custom" && state.dateFrom && state.dateTo) return { from: state.dateFrom, to: state.dateTo };
    if (state.period === "yesterday") return localYesterdayRange();
    return null;
  }

  function isFixedPeriodRange(key, range) {
    var fixed = fixedPeriodRange(key);
    return !!(fixed && range && fixed.from === range.from && fixed.to === range.to);
  }

  function localDateKeyForQuery(date) {
    var y = date.getFullYear();
    var m = String(date.getMonth() + 1).padStart(2, "0");
    var d = String(date.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + d;
  }

  function localYesterdayRange() {
    var now = new Date();
    var yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    var key = localDateKeyForQuery(yesterday);
    return { from: key, to: key };
  }

  function isLocalYesterdayRange(range) {
    var yesterday = localYesterdayRange();
    return !!(range && range.from === yesterday.from && range.to === yesterday.to);
  }

  function crmQuery(extra) {
    var q = authQuerySafe();
    var sep = q.indexOf("?") >= 0 ? "&" : "?";
    extra = extra && typeof extra === "object" ? extra : {};
    if (extra.mode) {
      q += sep + "mode=" + encodeURIComponent(extra.mode);
      sep = "&";
    }
    if (state.period === "custom") {
      setDefaultDates();
      q += sep + "from=" + encodeURIComponent(state.dateFrom) + "&to=" + encodeURIComponent(state.dateTo);
    } else if (state.period === "yesterday") {
      var yesterday = localYesterdayRange();
      q += sep + "from=" + encodeURIComponent(yesterday.from) + "&to=" + encodeURIComponent(yesterday.to);
    } else if (state.period === "all") {
      q += sep + "period=all";
    } else {
      q += sep + "period=" + encodeURIComponent(state.period || "30");
    }
    sep = "&";
    if (state.chartPeriod === "custom") {
      setDefaultChartDates();
      q += sep + "chartFrom=" + encodeURIComponent(state.chartDateFrom) + "&chartTo=" + encodeURIComponent(state.chartDateTo);
    } else if (state.chartPeriod === "yesterday") {
      var chartYesterday = localYesterdayRange();
      q += sep + "chartFrom=" + encodeURIComponent(chartYesterday.from) + "&chartTo=" + encodeURIComponent(chartYesterday.to);
    } else if (state.chartPeriod === "all") {
      q += sep + "chartPeriod=all";
    } else {
      q += sep + "chartPeriod=" + encodeURIComponent(state.chartPeriod || "30");
    }
    return q;
  }

  function syncPeriodInputs() {
    var period = document.getElementById("playerCrmPeriodSelect");
    var from = document.getElementById("playerCrmDateFrom");
    var to = document.getElementById("playerCrmDateTo");
    var periodRange = document.getElementById("playerCrmPeriodRange");
    var chartPeriod = document.getElementById("playerCrmChartPeriodSelect");
    var chartFrom = document.getElementById("playerCrmChartDateFrom");
    var chartTo = document.getElementById("playerCrmChartDateTo");
    if (period) period.value = state.period || "30";
    if (from) {
      from.value = state.dateFrom || "";
      from.max = state.dateTo || "";
    }
    if (to) {
      to.value = state.dateTo || "";
      to.min = state.dateFrom || "";
    }
    var showDates = state.period === "custom";
    document.querySelectorAll(".player-crm__date-field").forEach(function (el) {
      el.classList.toggle("player-crm__date-field--visible", showDates);
    });
    if (periodRange) {
      var rangeLabel = periodRangeLabel();
      periodRange.textContent = rangeLabel;
      periodRange.hidden = !rangeLabel;
    }
    if (chartPeriod) chartPeriod.value = state.chartPeriod || "30";
    if (chartFrom) {
      chartFrom.value = state.chartDateFrom || "";
      chartFrom.max = state.chartDateTo || "";
    }
    if (chartTo) {
      chartTo.value = state.chartDateTo || "";
      chartTo.min = state.chartDateFrom || "";
    }
    var showChartDates = state.chartPeriod === "custom";
    document.querySelectorAll(".player-crm__chart-date-field").forEach(function (el) {
      el.classList.toggle("player-crm__chart-date-field--visible", showChartDates);
    });
  }

  function openDatePicker(input) {
    if (!input) return;
    input.focus({ preventScroll: true });
    if (typeof input.showPicker === "function") {
      try {
        input.showPicker();
        return;
      } catch (err) {}
    }
    input.click();
  }

  var playerCrmReportsRuntime = typeof initPlayerCrmReportsRuntime === "function"
    ? initPlayerCrmReportsRuntime({
      state: state,
      money: money,
      intFmt: intFmt,
      periodLabel: periodLabel,
      chartPeriodLabel: chartPeriodLabel,
      periodData: periodData,
      playersInSelectedPeriodByDate: playersInSelectedPeriodByDate,
      dateInSelectedPeriod: dateInSelectedPeriod,
      filteredPlayers: filteredPlayers,
      segmentByKey: segmentByKey,
      filteredRegistrations: filteredRegistrations,
      registrationRowsByMethod: registrationRowsByMethod,
      registrationTelegramLabel: registrationTelegramLabel,
      filteredPokerPlusAccounts: filteredPokerPlusAccounts,
      dateOnly: dateOnly,
      segmentPlayers: segmentPlayers,
      segments: segments
    })
    : {};
  var channelLabel = playerCrmReportsRuntime.channelLabel || function (channel) {
    if (channel === "push") return "push";
    if (channel === "bot_push") return "бот + push";
    return "бот";
  };
  var sendCrmSectionData = playerCrmReportsRuntime.sendCrmSectionData || function () {};

  function bindOnce() {
    var root = document.getElementById("playerCrmView");
    if (!root || root.dataset.crmBound === "1") return;
    root.dataset.crmBound = "1";
    root.addEventListener("click", function (e) {
      var tab = e.target.closest("[data-crm-tab]");
      if (tab) {
        state.tab = tab.getAttribute("data-crm-tab") || "overview";
        syncTabs();
        return;
      }
      var sendSection = e.target.closest("[data-crm-send-section]");
      if (sendSection) {
        sendCrmSectionData(sendSection.getAttribute("data-crm-send-section") || state.tab);
        return;
      }
      var sortButton = e.target.closest("[data-crm-sort-field]");
      if (sortButton) {
        e.preventDefault();
        if (setTableSort(sortButton.getAttribute("data-crm-sort-scope") || "", sortButton.getAttribute("data-crm-sort-field") || "")) {
          renderSortScope(sortButton.getAttribute("data-crm-sort-scope") || "");
        }
        return;
      }
      var filter = e.target.closest("[data-crm-filter]");
      if (filter) {
        state.filter = filter.getAttribute("data-crm-filter") || "all";
        state.selectedId = "";
        state.showAllPlayers = false;
        renderAll();
        return;
      }
      var player = e.target.closest("[data-crm-player]");
      if (player) {
        state.selectedId = player.getAttribute("data-crm-player") || "";
        state.playerModalOpen = true;
        state.tab = "players";
        renderAll();
        return;
      }
      var open = e.target.closest("[data-crm-open-player]");
      if (open) {
        state.selectedId = open.getAttribute("data-crm-open-player") || "";
        state.playerModalOpen = true;
        state.visitsModalOpen = false;
        state.tab = "players";
        renderAll();
        return;
      }
      if (e.target.closest("[data-crm-close-player-modal]")) {
        closePlayerModal();
        return;
      }
      var useSeg = e.target.closest("[data-crm-use-segment]");
      if (useSeg) {
        state.filter = useSeg.getAttribute("data-crm-use-segment") || "all";
        state.tab = "players";
        state.selectedId = "";
        state.showAllPlayers = false;
        renderAll();
        return;
      }
      if (e.target && e.target.id === "playerCrmShowAllBtn") {
        state.showAllPlayers = true;
        renderList();
        return;
      }
      if (e.target.closest("[data-crm-close-dialog-modal]")) {
        closeManagerDialogModal();
        return;
      }
      if (e.target.closest("[data-crm-close-registration-modal]")) {
        closeRegistrationModal();
        return;
      }
      if (e.target.closest("[data-crm-close-pokerplus-modal]")) {
        closePokerPlusModal();
        return;
      }
      if (e.target.closest("[data-crm-close-general-messages-modal]")) {
        closeGeneralMessagesModal();
        return;
      }
      if (e.target.closest("[data-crm-close-visits-modal]")) {
        closeVisitsModal();
        return;
      }
      if (e.target.closest("[data-crm-close-bot-modal]")) {
        closeBotModal();
        return;
      }
      if (e.target.closest("[data-crm-close-push-modal]")) {
        closePushModal();
        return;
      }
      if (e.target.closest("[data-crm-general-messages-modal]")) {
        state.generalMessagesModalOpen = true;
        state.showAllGeneralMessagesModal = false;
        renderStats();
        renderGeneralMessagesModal();
        return;
      }
      if (e.target.closest("[data-crm-visits-modal]")) { state.visitsModalOpen = true; state.visitsModalMode = "users"; renderStats(); renderVisitsModal(); return; }
      if (e.target.closest("[data-crm-visits-sections-modal]")) { state.visitsModalOpen = true; state.visitsModalMode = "sections"; renderStats(); renderVisitsModal(); return; }
      if (e.target.closest("[data-crm-bot-modal]")) {
        state.botModalOpen = true;
        renderStats();
        renderBotModal();
        return;
      }
      if (e.target.closest("[data-crm-push-modal]")) {
        state.pushModalOpen = true;
        renderStats();
        renderPushModal();
        return;
      }
      if (e.target.closest("[data-crm-pokerplus-modal]")) {
        state.pokerPlusModalOpen = true;
        renderStats();
        renderPokerPlusModal();
        return;
      }
      var registrationModal = e.target.closest("[data-crm-registrations-modal]");
      if (registrationModal) {
        state.registrationModalMethod = registrationModal.getAttribute("data-crm-registrations-modal") || "";
        state.showAllRegistrationModal = false;
        renderStats();
        renderRegistrationModal();
        return;
      }
      if (e.target.closest("[data-crm-show-all-registrations]")) {
        state.showAllRegistrationModal = true;
        renderRegistrationModal();
        return;
      }
      if (e.target.closest("[data-crm-export-registrations]")) {
        exportRegistrationModalRows();
        return;
      }
      if (e.target.closest("[data-crm-show-all-general-messages]")) {
        state.showAllGeneralMessagesModal = true;
        renderGeneralMessagesModal();
        return;
      }
      var managerDialogs = e.target.closest("[data-crm-manager-dialogs]");
      if (managerDialogs) {
        var managerKey = managerDialogs.getAttribute("data-crm-manager-dialogs") || "";
        state.chatDialogManager = state.chatDialogManager === managerKey ? "" : managerKey;
        state.selectedManagerDialogId = "";
        renderStats();
        renderManagerDialogModal();
        return;
      }
      var managerDialog = e.target.closest("[data-crm-manager-dialog-id]");
      if (managerDialog) {
        state.selectedManagerDialogId = state.selectedManagerDialogId === managerDialog.getAttribute("data-crm-manager-dialog-id")
          ? ""
          : managerDialog.getAttribute("data-crm-manager-dialog-id");
        renderManagerDialogModal();
        return;
      }
      var datePicker = e.target.closest("[data-crm-date-picker]");
      if (datePicker) {
        e.preventDefault();
        openDatePicker(document.getElementById(datePicker.getAttribute("data-crm-date-picker") || ""));
        return;
      }
      var modalDatePicker = e.target.closest("[data-crm-modal-date-picker]");
      if (modalDatePicker) {
        e.preventDefault();
        var input = modalDatePicker.getAttribute("data-crm-modal-date-picker") === "to"
          ? modalDatePicker.closest(".player-crm__modal-period-row").querySelector("[data-crm-modal-date-to]")
          : modalDatePicker.closest(".player-crm__modal-period-row").querySelector("[data-crm-modal-date-from]");
        openDatePicker(input);
        return;
      }
      var broadSeg = e.target.closest("[data-crm-broadcast-segment]");
      if (broadSeg) {
        var seg = broadSeg.getAttribute("data-crm-broadcast-segment") || "has_bot";
        var sel = document.getElementById("playerCrmBroadcastSegment");
        if (sel) sel.value = seg;
        state.tab = "broadcast";
        syncTabs();
        updateBroadcastAudience();
      }
    });

    var search = document.getElementById("playerCrmSearch");
    if (search) {
      search.addEventListener("input", function () {
        state.search = search.value || "";
        state.selectedId = "";
        state.showAllPlayers = false;
        renderList();
        renderDetail();
      });
    }
    var period = document.getElementById("playerCrmPeriodSelect");
    if (period) {
      period.addEventListener("change", function () {
        state.period = period.value || "30";
        if (state.period === "custom") setDefaultDates();
        state.showAllPlayers = false;
        syncPeriodInputs();
        try {
          period.blur();
        } catch (ePeriodBlur) {}
        loadCrmData("data");
      });
    }
    var dateFrom = document.getElementById("playerCrmDateFrom");
    if (dateFrom) dateFrom.addEventListener("change", function () {
      state.dateFrom = dateFrom.value || "";
      state.period = "custom";
      normalizeDateRange("from");
      state.showAllPlayers = false;
      syncPeriodInputs();
      loadCrmData("data");
    });
    var dateTo = document.getElementById("playerCrmDateTo");
    if (dateTo) dateTo.addEventListener("change", function () {
      state.dateTo = dateTo.value || "";
      state.period = "custom";
      normalizeDateRange("to");
      state.showAllPlayers = false;
      syncPeriodInputs();
      loadCrmData("data");
    });
    var chartPeriod = document.getElementById("playerCrmChartPeriodSelect");
    if (chartPeriod) {
      chartPeriod.addEventListener("change", function () {
        state.chartPeriod = chartPeriod.value || "30";
        if (state.chartPeriod === "custom") setDefaultChartDates();
        syncPeriodInputs();
        try {
          chartPeriod.blur();
        } catch (eChartPeriodBlur) {}
        loadCrmData("chart");
      });
    }
    var chartDateFrom = document.getElementById("playerCrmChartDateFrom");
    if (chartDateFrom) chartDateFrom.addEventListener("change", function () {
      state.chartDateFrom = chartDateFrom.value || "";
      state.chartPeriod = "custom";
      normalizeChartDateRange("from");
      syncPeriodInputs();
      loadCrmData("chart");
    });
    var chartDateTo = document.getElementById("playerCrmChartDateTo");
    if (chartDateTo) chartDateTo.addEventListener("change", function () {
      state.chartDateTo = chartDateTo.value || "";
      state.chartPeriod = "custom";
      normalizeChartDateRange("to");
      syncPeriodInputs();
      loadCrmData("chart");
    });
    var registrationMethod = document.getElementById("playerCrmRegistrationMethod");
    if (registrationMethod) registrationMethod.addEventListener("change", function () {
      state.registrationMethod = registrationMethod.value || "all";
      renderRegistrations();
    });
    var registrationSort = document.getElementById("playerCrmRegistrationSort");
    if (registrationSort) registrationSort.addEventListener("change", function () {
      state.registrationSort = registrationSort.value || "name";
      renderRegistrations();
    });
    [
      ["playerCrmPokerLevelMin", "pokerPlusLevelMin"],
      ["playerCrmPokerLevelMax", "pokerPlusLevelMax"],
      ["playerCrmPokerDateFrom", "pokerPlusDateFrom"],
      ["playerCrmPokerDateTo", "pokerPlusDateTo"],
    ].forEach(function (pair) {
      var input = document.getElementById(pair[0]);
      if (!input) return;
      input.addEventListener("input", function () {
        state[pair[1]] = input.value || "";
        renderPokerPlusAccounts();
      });
      input.addEventListener("change", function () {
        state[pair[1]] = input.value || "";
        renderPokerPlusAccounts();
      });
    });
    root.addEventListener("change", function (e) {
      if (e.target.closest("[data-crm-modal-period]")) {
        state.period = e.target.value || "30";
        if (state.period === "custom") setDefaultDates();
        reloadCrmDataFromModal();
        return;
      }
      if (e.target.closest("[data-crm-modal-date-from]")) {
        state.dateFrom = e.target.value || "";
        state.period = "custom";
        normalizeDateRange("from");
        reloadCrmDataFromModal();
        return;
      }
      if (e.target.closest("[data-crm-modal-date-to]")) {
        state.dateTo = e.target.value || "";
        state.period = "custom";
        normalizeDateRange("to");
        reloadCrmDataFromModal();
      }
    });
    var broadcastSegment = document.getElementById("playerCrmBroadcastSegment");
    if (broadcastSegment) broadcastSegment.addEventListener("change", updateBroadcastAudience);
    var broadcastPreview = document.getElementById("playerCrmBroadcastPreviewBtn");
    if (broadcastPreview) broadcastPreview.addEventListener("click", function () {
      var players = updateBroadcastAudience();
      var out = document.getElementById("playerCrmBroadcastResult");
      if (out) out.textContent = "В выбранной группе " + players.length + " игроков. Бот/push-метрики видны в карточках.";
    });
    var broadcastPrepare = document.getElementById("playerCrmBroadcastPrepareBtn");
    if (broadcastPrepare) broadcastPrepare.addEventListener("click", prepareBroadcast);
    var broadcastSend = document.getElementById("playerCrmBroadcastSendBtn");
    if (broadcastSend) broadcastSend.addEventListener("click", sendBroadcastNow);
    root.addEventListener("click", function (e) {
      if (e.target && e.target.id === "playerCrmSavePlayerBtn") saveSelectedPlayer();
      if (e.target && e.target.id === "playerCrmAddEventBtn") addSelectedEvent();
      if (e.target && e.target.id === "playerCrmLinkIdentityBtn") linkSelectedIdentity();
      var chartToggle = e.target.closest("[data-crm-chart-series]");
      if (chartToggle) {
        state.chartSeriesEnabled[chartToggle.getAttribute("data-crm-chart-series") || ""] = chartToggle.checked;
        renderAnalytics();
      }
    });
    root.addEventListener("mousemove", function (e) {
      var point = e.target.closest("[data-crm-chart-point]");
      if (point) {
        showChartTooltip(point, e);
      } else if (!e.target.closest(".player-crm__chart-card")) {
        hideChartTooltip();
      }
    });
    root.addEventListener("mouseleave", hideChartTooltip);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && state.registrationModalMethod) closeRegistrationModal();
      if (e.key === "Escape" && state.pokerPlusModalOpen) closePokerPlusModal();
      if (e.key === "Escape" && state.generalMessagesModalOpen) closeGeneralMessagesModal();
      if (e.key === "Escape" && state.visitsModalOpen) closeVisitsModal();
      if (e.key === "Escape" && state.botModalOpen) closeBotModal();
      if (e.key === "Escape" && state.pushModalOpen) closePushModal();
      if (e.key === "Escape" && state.playerModalOpen) closePlayerModal();
      if (e.key === "Escape" && state.chatDialogManager) closeManagerDialogModal();
    });
  }

  var playerCrmViewportShellRuntime = typeof initPlayerCrmViewportShellRuntime === "function"
    ? initPlayerCrmViewportShellRuntime()
    : {};
  var syncCrmViewportShell = playerCrmViewportShellRuntime.syncCrmViewportShell || function () {};

  function pokerInitPlayerCrm() {
    syncCrmViewportShell();
    setTimeout(syncCrmViewportShell, 80);
    setTimeout(syncCrmViewportShell, 320);
    bindOnce();
    syncPeriodInputs();
    if (state.loading && state.loadStartedAt && Date.now() - state.loadStartedAt > 18000) {
      state.loading = false;
      state.loadingScope = "";
    }
    if (!state.loaded) loadCrmData();
    else renderAll();
  }

  window.pokerInitPlayerCrm = pokerInitPlayerCrm;
  window.pokerSyncPlayerCrmViewportShell = syncCrmViewportShell;
  window.addEventListener("resize", syncCrmViewportShell);
  window.addEventListener("orientationchange", function () {
    setTimeout(syncCrmViewportShell, 120);
    setTimeout(syncCrmViewportShell, 420);
  });
  if (window.visualViewport) {
    try {
      window.visualViewport.addEventListener("resize", syncCrmViewportShell);
      window.visualViewport.addEventListener("scroll", syncCrmViewportShell);
    } catch (eVvBind) {}
  }
  window.addEventListener("poker-admin-access", function () {
    if (document.body && document.body.getAttribute("data-view") === "player-crm") pokerInitPlayerCrm();
  });
  if (document.readyState !== "loading") {
    setTimeout(function () {
      if (document.getElementById("playerCrmView") && (window.__pokerPlayerCrmStandaloneOpen || (document.body && document.body.getAttribute("data-view") === "player-crm"))) pokerInitPlayerCrm();
    }, 0);
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      if (document.getElementById("playerCrmView") && (window.__pokerPlayerCrmStandaloneOpen || (document.body && document.body.getAttribute("data-view") === "player-crm"))) pokerInitPlayerCrm();
    });
  }
})();

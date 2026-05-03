// CRM игроков: компактная админ-панель для массового потока в переписке.
(function () {
  var state = {
    loaded: false,
    loading: false,
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
    botModalOpen: false,
    pushModalOpen: false,
    registrationMethod: "all",
    registrationSort: "name",
    pokerPlusAccounts: [],
    pokerPlusLevelMin: "",
    pokerPlusLevelMax: "",
    pokerPlusDateFrom: "",
    pokerPlusDateTo: "",
    campaigns: [],
    sourceAnalytics: [],
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
    permissions: null,
    pushConfigured: false,
    source: "api",
    crmError: "",
    showAllPlayers: false,
  };

  function esc(s) {
    if (s == null) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function money(n) {
    var x = Math.round(Number(n) || 0);
    return x.toLocaleString("ru-RU") + " ₽";
  }

  function pct(n) {
    return Math.round(Number(n) || 0) + "%";
  }

  function intFmt(n) {
    return Math.round(Number(n) || 0).toLocaleString("ru-RU");
  }

  function daysLabel(n) {
    if (n == null || Number(n) >= 999) return "—";
    var d = Math.max(0, Number(n) || 0);
    if (d === 0) return "сегодня";
    if (d === 1) return "1 день";
    if (d > 1 && d < 5) return d + " дня";
    return d + " дней";
  }

  function isoDate(d) {
    return d.toISOString().slice(0, 10);
  }

  function setDefaultDates() {
    var to = new Date();
    var from = new Date();
    from.setDate(from.getDate() - 29);
    if (!state.dateTo) state.dateTo = isoDate(to);
    if (!state.dateFrom) state.dateFrom = isoDate(from);
  }

  function setDefaultChartDates() {
    var to = new Date();
    var from = new Date();
    from.setDate(from.getDate() - 29);
    if (!state.chartDateTo) state.chartDateTo = isoDate(to);
    if (!state.chartDateFrom) state.chartDateFrom = isoDate(from);
  }

  function normalizeDateRange(changed) {
    if (!state.dateFrom || !state.dateTo) return;
    if (state.dateFrom <= state.dateTo) return;
    if (changed === "from") state.dateTo = state.dateFrom;
    else state.dateFrom = state.dateTo;
  }

  function normalizeChartDateRange(changed) {
    if (!state.chartDateFrom || !state.chartDateTo) return;
    if (state.chartDateFrom <= state.chartDateTo) return;
    if (changed === "from") state.chartDateTo = state.chartDateFrom;
    else state.chartDateFrom = state.chartDateTo;
  }

  function periodKey() {
    if (state.period === "all") return "all";
    return state.period === "custom" ? "custom" : String(state.period || "30");
  }

  function periodLabel() {
    if (state.period === "all") return "за все время";
    if (state.period === "custom") {
      return state.dateFrom && state.dateTo ? state.dateFrom + " — " + state.dateTo : "выбранные даты";
    }
    return state.period + " дней";
  }

  function chartPeriodLabel() {
    if (state.chartPeriod === "all") return "за все время";
    if (state.chartPeriod === "custom") {
      return state.chartDateFrom && state.chartDateTo ? state.chartDateFrom + " — " + state.chartDateTo : "выбранные даты";
    }
    return state.chartPeriod + " дней";
  }

  function periodData(p) {
    var k = periodKey();
    return {
      deposits: p.deposits && p.deposits[k] != null ? p.deposits[k] : 0,
      depositCount: p.depositCount && p.depositCount[k] != null ? p.depositCount[k] : 0,
      messages: p.messages && p.messages[k] != null ? p.messages[k] : 0,
    };
  }

  var segments = [
    { key: "all", label: "Все", desc: "Вся живая база CRM.", match: function () { return true; } },
    { key: "has_bot", label: "Подписан на бот", desc: "Игрок связан с Telegram-ботом и доступен для бот-рассылки.", match: function (p) { return !!(p.channels && p.channels.bot); } },
    { key: "has_deposit", label: "Есть депозит", desc: "Есть депозит в CRM-журнале за выбранный период.", match: function (p) { return periodData(p).deposits > 0; } },
    { key: "active_30", label: "Активность CRM", desc: "Есть депозит или сообщение в CRM за выбранный период.", match: function (p) { var pd = periodData(p); return pd.deposits > 0 || pd.messages > 0; } },
    { key: "has_push", label: "Есть push", desc: "Можно достать игрока push-уведомлением.", match: function (p) { return !!(p.channels && p.channels.push); } },
  ];

  function hasTag(p, tag) {
    return (p.tags || []).map(function (t) { return String(t).toLowerCase(); }).indexOf(String(tag).toLowerCase()) >= 0;
  }

  function segmentByKey(key) {
    for (var i = 0; i < segments.length; i++) {
      if (segments[i].key === key) return segments[i];
    }
    return segments[0];
  }

  function segmentPlayers(key) {
    var seg = segmentByKey(key);
    return state.players.filter(function (p) {
      return !seg || seg.match(p);
    });
  }

  function filteredPlayers() {
    var q = String(state.search || "").trim().toLowerCase();
    return segmentPlayers(state.filter).filter(function (p) {
      if (!q) return true;
      var hay = [p.name, p.handle, p.source, p.manager, p.note].concat(p.tags || []).join(" ").toLowerCase();
      return hay.indexOf(q) >= 0;
    });
  }

  function sortForWork(a, b) {
    function score(p) {
      var s = 0;
      if (!(p.channels && (p.channels.bot || p.channels.push))) s += 35;
      if (hasTag(p, "VIP")) s += 25;
      if (p.lastTouchDays == null || Number(p.lastTouchDays) >= 7) s += 20;
      s -= Math.min(20, p.lastReplyDays || 0);
      return s;
    }
    return score(b) - score(a);
  }

  function renderStats() {
    var el = document.getElementById("playerCrmStats");
    if (!el) return;
    if (state.crmError) {
      el.innerHTML = "<div class=\"player-crm__notice player-crm__notice--error\">" + esc(state.crmError) + "</div>";
      return;
    }
    var players = state.players;
    var pd = players.map(periodData);
    var deposits = pd.reduce(function (sum, x) { return sum + x.deposits; }, 0);
    var messages = pd.reduce(function (sum, x) { return sum + x.messages; }, 0);
    var botSubscribers = players.filter(function (p) { return !!(p.channels && p.channels.bot); }).length;
    var pushSubscribers = players.filter(function (p) { return !!(p.channels && p.channels.push); }).length;
    var registrations = Array.isArray(state.registeredAccounts) ? state.registeredAccounts : [];
    var registrationEmailOnlyCount = registrationRowsByMethod("email").length;
    var registrationTelegramOnlyCount = registrationRowsByMethod("telegram").length;
    var registrationBothCount = registrationRowsByMethod("both").length;
    var chat = state.chatStats || {};
    var pairHint = "Всего / за " + periodLabel();
    function pair(row) {
      return intFmt(row && row.total) + " / " + intFmt(row && row.period);
    }
    var stats = [
      ["Игроков в базе", players.length],
      ["Зарегано", registrations.length, "", "registrations"],
      ["Poker21", intFmt((state.pokerPlusAccounts || []).length), "привязали аккаунт", "pokerplus"],
      ["Подписан на бот", botSubscribers, "", "bot"],
      ["Подписан на push", pushSubscribers, "уведомления", "push"],
      ["Депозиты", money(deposits)],
    ];
    var chatStats = [
      ["Сообщений в главном чате", pair(chat.generalMessages), pairHint, "generalMessages"],
      ["Личных диалогов", pair(chat.personalDialogs), pairHint],
      ["Групповых чатов", pair(chat.groupChats), pairHint],
      ["Диалогов у Ани", pair(chat.managerDialogs && chat.managerDialogs.anna), pairHint, "anna"],
      ["Диалогов у Вики", pair(chat.managerDialogs && chat.managerDialogs.vika), pairHint, "vika"],
      ["Все остальные диалоги", pair(chat.managerDialogs && chat.managerDialogs.other), pairHint, "other"],
    ];
    function statCard(it) {
      if (it[3] === "registrations") {
        return "<div class=\"player-crm__stat player-crm__stat--registration\"><span class=\"player-crm__stat-label\">Зарегано</span>" +
          "<span class=\"player-crm__stat-value\">" + esc(intFmt(registrations.length)) + "</span>" +
          "<span class=\"player-crm__stat-mini-grid\">" +
            "<button type=\"button\" data-crm-registrations-modal=\"telegram\"><small>Только Telegram</small><strong>" + esc(intFmt(registrationTelegramOnlyCount)) + "</strong></button>" +
            "<button type=\"button\" data-crm-registrations-modal=\"email\"><small>Только email</small><strong>" + esc(intFmt(registrationEmailOnlyCount)) + "</strong></button>" +
            "<button type=\"button\" data-crm-registrations-modal=\"both\"><small>И то и то</small><strong>" + esc(intFmt(registrationBothCount)) + "</strong></button>" +
          "</span></div>";
      }
      if (it[3] === "pokerplus") {
        return "<button type=\"button\" class=\"player-crm__stat" + (state.pokerPlusModalOpen ? " player-crm__stat--active" : "") + "\" data-crm-pokerplus-modal><span class=\"player-crm__stat-label\">Poker21</span>" +
          "<span class=\"player-crm__stat-hint\">привязали аккаунт</span>" +
          "<span class=\"player-crm__stat-value\">" + esc(it[1]) + "</span></button>";
      }
      if (it[3] === "generalMessages") {
        return "<button type=\"button\" class=\"player-crm__stat" + (state.generalMessagesModalOpen ? " player-crm__stat--active" : "") + "\" data-crm-general-messages-modal><span class=\"player-crm__stat-label\">" + esc(it[0]) + "</span>" +
          "<span class=\"player-crm__stat-hint\">" + esc(it[2] || periodLabel()) + "</span>" +
          "<span class=\"player-crm__stat-value\">" + esc(it[1]) + "</span></button>";
      }
      if (it[3] === "bot") {
        return "<button type=\"button\" class=\"player-crm__stat" + (state.botModalOpen ? " player-crm__stat--active" : "") + "\" data-crm-bot-modal><span class=\"player-crm__stat-label\">Подписан на бот</span>" +
          "<span class=\"player-crm__stat-value\">" + esc(it[1]) + "</span></button>";
      }
      if (it[3] === "push") {
        return "<button type=\"button\" class=\"player-crm__stat" + (state.pushModalOpen ? " player-crm__stat--active" : "") + "\" data-crm-push-modal><span class=\"player-crm__stat-label\">Подписан на push</span>" +
          "<span class=\"player-crm__stat-hint\">уведомления</span>" +
          "<span class=\"player-crm__stat-value\">" + esc(it[1]) + "</span></button>";
      }
      var tag = it[3] ? "button" : "div";
      var typeAttr = it[3] ? " type=\"button\"" : "";
      var managerAttr = it[3] ? " data-crm-manager-dialogs=\"" + esc(it[3]) + "\"" : "";
      var activeCls = it[3] && state.chatDialogManager === it[3] ? " player-crm__stat--active" : "";
      return "<" + tag + typeAttr + " class=\"player-crm__stat" + activeCls + "\"" + managerAttr + "><span class=\"player-crm__stat-label\">" + esc(it[0]) + "</span>" +
        (it[2] ? "<span class=\"player-crm__stat-hint\">" + esc(it[2]) + "</span>" : "") +
        "<span class=\"player-crm__stat-value\">" + esc(it[1]) + "</span></" + tag + ">";
    }
    el.innerHTML =
      "<div class=\"player-crm__stats-grid\">" + stats.map(statCard).join("") + "</div>" +
      "<section class=\"player-crm__stats-section\" aria-label=\"Чатовые показатели\">" +
        "<div class=\"player-crm__stats-section-head\"><h3>Чат</h3><span>" + esc(periodLabel()) + "</span></div>" +
        "<div class=\"player-crm__stats-grid player-crm__stats-grid--chat\">" + chatStats.map(statCard).join("") + "</div>" +
      "</section>";
    var anaPeriod = document.getElementById("playerCrmAnalyticsPeriod");
    if (anaPeriod) anaPeriod.textContent = chartPeriodLabel();
    return { active: players.length, botSubscribers: botSubscribers, pushSubscribers: pushSubscribers, deposits: deposits, messages: messages };
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
    return "<div class=\"player-crm__manager-dialogs\" aria-label=\"" + esc(title) + "\">" + body + "</div>";
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
      if (document.body && !state.registrationModalMethod && !state.pokerPlusModalOpen && !state.generalMessagesModalOpen && !state.botModalOpen && !state.pushModalOpen) document.body.classList.remove("player-crm-dialog-modal-open");
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

  function hasRegistrationMethod(row, method) {
    return !!(row && row.methods && row.methods.indexOf(method) >= 0);
  }

  function registrationModalTitle(method) {
    if (method === "both") return "Есть Telegram и email";
    return method === "telegram" ? "Только через логин Telegram" : "Только через email";
  }

  function registrationRowsByMethod(method) {
    var rows = Array.isArray(state.registeredAccounts) ? state.registeredAccounts.slice() : [];
    rows = rows.filter(function (r) {
      var hasEmail = hasRegistrationMethod(r, "email");
      var hasTelegram = hasRegistrationMethod(r, "telegram");
      if (method === "both") return hasEmail && hasTelegram;
      if (method === "email") return hasEmail && !hasTelegram;
      if (method === "telegram") return hasTelegram && !hasEmail;
      return hasEmail || hasTelegram;
    });
    rows.sort(function (a, b) {
      function val(row) {
        return method === "email" || method === "both"
          ? row.email || row.name || row.accountId || ""
          : registrationTelegramLabel(row) || row.name || row.accountId || "";
      }
      return String(val(a)).toLowerCase().localeCompare(String(val(b)).toLowerCase(), "ru");
    });
    return rows;
  }

  function renderRegistrationModalList(method) {
    var rows = registrationRowsByMethod(method);
    if (!rows.length) return "<div class=\"player-crm__timeline-item\">По этому способу регистрации пока пусто.</div>";
    var visibleRows = state.showAllRegistrationModal ? rows : rows.slice(0, 15);
    return "<div class=\"player-crm__modal-content\"><div class=\"player-crm__source-table-wrap\"><table class=\"player-crm__source-table player-crm__registrations-table\"><thead><tr>" +
      "<th>Аккаунт</th><th>Telegram-логин</th><th>Email</th><th>Имя</th>" +
      "</tr></thead><tbody>" + visibleRows.map(function (r) {
        var tg = registrationTelegramLabel(r);
        return "<tr>" +
          "<td>" + esc(r.accountId || r.dtId || "—") + "</td>" +
          "<td>" + esc(tg || "—") + "</td>" +
          "<td>" + esc(r.email || "—") + "</td>" +
          "<td>" + esc(r.name || "—") + "</td>" +
        "</tr>";
      }).join("") + "</tbody></table></div>" +
      "<div class=\"player-crm__modal-actions\">" +
        (!state.showAllRegistrationModal && rows.length > 15
          ? "<button type=\"button\" class=\"player-crm__ghost-btn\" data-crm-show-all-registrations>Показать всех " + esc(intFmt(rows.length)) + "</button>"
          : "") +
        "<button type=\"button\" class=\"player-crm__primary-btn\" data-crm-export-registrations>Выгрузить</button>" +
      "</div></div>";
  }

  function renderRegistrationModal() {
    var modal = document.getElementById("playerCrmRegistrationModal");
    var titleEl = document.getElementById("playerCrmRegistrationModalTitle");
    var subtitleEl = document.getElementById("playerCrmRegistrationModalSubtitle");
    var bodyEl = document.getElementById("playerCrmRegistrationModalBody");
    if (!modal || !bodyEl) return;
    var method = state.registrationModalMethod;
    if (method !== "email" && method !== "telegram" && method !== "both") {
      modal.hidden = true;
      if (document.body && !state.chatDialogManager && !state.pokerPlusModalOpen && !state.generalMessagesModalOpen && !state.botModalOpen && !state.pushModalOpen) document.body.classList.remove("player-crm-dialog-modal-open");
      return;
    }
    var rows = registrationRowsByMethod(method);
    if (titleEl) titleEl.textContent = registrationModalTitle(method);
    if (subtitleEl) subtitleEl.textContent = intFmt(rows.length) + " аккаунтов";
    bodyEl.innerHTML = renderRegistrationModalList(method);
    modal.hidden = false;
    if (document.body) document.body.classList.add("player-crm-dialog-modal-open");
  }

  function closeRegistrationModal() {
    state.registrationModalMethod = "";
    state.showAllRegistrationModal = false;
    renderStats();
    renderRegistrationModal();
  }

  function csvCell(value) {
    var s = value == null ? "" : String(value);
    return "\"" + s.replace(/"/g, "\"\"") + "\"";
  }

  function exportRegistrationModalRows() {
    var method = state.registrationModalMethod;
    if (method !== "email" && method !== "telegram" && method !== "both") return;
    var rows = registrationRowsByMethod(method);
    var lines = [["accountId", "telegramLogin", "email", "name"].map(csvCell).join(",")];
    rows.forEach(function (r) {
      lines.push([
        r.accountId || r.dtId || "",
        registrationTelegramLabel(r) === "—" ? "" : registrationTelegramLabel(r),
        r.email || "",
        r.name || "",
      ].map(csvCell).join(","));
    });
    var blob = new Blob(["\uFEFF" + lines.join("\n")], { type: "text/csv;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "crm-registrations-" + method + ".csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
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
    if (!state.selectedId && items[0]) state.selectedId = items[0].id;
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
    return state.players[0] || null;
  }

  function renderDetail() {
    var el = document.getElementById("playerCrmDetail");
    var hint = document.getElementById("playerCrmSelectedHint");
    if (!el) return;
    var p = selectedPlayer();
    if (!p) {
      el.innerHTML = "<div class=\"player-crm__timeline-item\">Выберите игрока слева.</div>";
      if (hint) hint.textContent = "нет игрока";
      return;
    }
    var pd = periodData(p);
    if (hint) hint.textContent = p.handle || p.accountId || p.id || "игрок";
    var avg = pd.depositCount ? Math.round(pd.deposits / pd.depositCount) : 0;
    el.innerHTML =
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
      "</div>";
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
    var allRows = Array.isArray(state.registeredAccounts) ? state.registeredAccounts : [];
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

  function filteredPokerPlusAccounts() {
    var rows = Array.isArray(state.pokerPlusAccounts) ? state.pokerPlusAccounts : [];
    var min = parseInt(state.pokerPlusLevelMin, 10);
    var max = parseInt(state.pokerPlusLevelMax, 10);
    var from = state.pokerPlusDateFrom || "";
    var to = state.pokerPlusDateTo || "";
    return rows.filter(function (r) {
      var level = Number(r.level) || 0;
      var linked = dateOnly(r.linkedAt);
      if (Number.isFinite(min) && level < min) return false;
      if (Number.isFinite(max) && level > max) return false;
      if (from && (!linked || linked < from)) return false;
      if (to && (!linked || linked > to)) return false;
      return true;
    });
  }

  function renderPokerPlusAccounts() {
    var el = document.getElementById("playerCrmPokerPlusAccounts");
    if (!el) return;
    var all = Array.isArray(state.pokerPlusAccounts) ? state.pokerPlusAccounts : [];
    var rows = filteredPokerPlusAccounts();
    if (!all.length) {
      el.innerHTML = "<div class=\"player-crm__timeline-item\">Подтверждённых аккаунтов Poker21 пока нет.</div>";
      return;
    }
    var avgLevel = rows.length ? Math.round(rows.reduce(function (sum, r) { return sum + (Number(r.level) || 0); }, 0) / rows.length) : 0;
    var summary =
      "<div class=\"player-crm__metrics player-crm__metrics--registrations\">" +
        metric("Показано", intFmt(rows.length)) +
        metric("Всего", intFmt(all.length)) +
        metric("Средний уровень", avgLevel || "—") +
      "</div>";
    if (!rows.length) {
      el.innerHTML = summary + "<div class=\"player-crm__timeline-item\">По этим фильтрам пусто.</div>";
      return;
    }
    var table = "<div class=\"player-crm__source-table-wrap\"><table class=\"player-crm__source-table player-crm__pokerplus-table\"><thead><tr>" +
      "<th>Аккаунт</th><th>Poker21 ID</th><th>Ник</th><th>Уровень</th><th>Fee</th><th>Рук</th><th>Дата привязки</th><th>Email</th>" +
      "</tr></thead><tbody>" + rows.map(function (r) {
        return "<tr>" +
          "<td>" + esc(r.accountId || "—") + "</td>" +
          "<td>" + esc(r.pokerPlusUserId || "—") + "</td>" +
          "<td>" + esc(r.nickname || "—") + "</td>" +
          "<td>" + esc(r.level || "—") + "</td>" +
          "<td>" + esc(money(r.fee || 0)) + "</td>" +
          "<td>" + esc(intFmt(r.hands || 0)) + "</td>" +
          "<td>" + esc(dateOnly(r.linkedAt) || "—") + "</td>" +
          "<td>" + esc(r.email || "—") + "</td>" +
        "</tr>";
      }).join("") + "</tbody></table></div>";
    el.innerHTML = summary + table;
  }

  function renderPokerPlusModalList() {
    var rows = Array.isArray(state.pokerPlusAccounts) ? state.pokerPlusAccounts : [];
    if (!rows.length) return "<div class=\"player-crm__timeline-item\">Привязанных аккаунтов Poker21 пока нет.</div>";
    return "<div class=\"player-crm__modal-content\"><div class=\"player-crm__source-table-wrap\"><table class=\"player-crm__source-table player-crm__pokerplus-table\"><thead><tr>" +
      "<th>Аккаунт</th><th>Poker21 ID</th><th>Ник</th><th>Уровень</th><th>Fee</th><th>Рук</th><th>Дата привязки</th><th>Email</th>" +
      "</tr></thead><tbody>" + rows.map(function (r) {
        return "<tr>" +
          "<td>" + esc(r.accountId || "—") + "</td>" +
          "<td>" + esc(r.pokerPlusUserId || "—") + "</td>" +
          "<td>" + esc(r.nickname || "—") + "</td>" +
          "<td>" + esc(r.level || "—") + "</td>" +
          "<td>" + esc(money(r.fee || 0)) + "</td>" +
          "<td>" + esc(intFmt(r.hands || 0)) + "</td>" +
          "<td>" + esc(dateOnly(r.linkedAt) || "—") + "</td>" +
          "<td>" + esc(r.email || "—") + "</td>" +
        "</tr>";
      }).join("") + "</tbody></table></div></div>";
  }

  function renderPokerPlusModal() {
    var modal = document.getElementById("playerCrmPokerPlusModal");
    var subtitleEl = document.getElementById("playerCrmPokerPlusModalSubtitle");
    var bodyEl = document.getElementById("playerCrmPokerPlusModalBody");
    if (!modal || !bodyEl) return;
    if (!state.pokerPlusModalOpen) {
      modal.hidden = true;
      if (document.body && !state.chatDialogManager && !state.registrationModalMethod && !state.generalMessagesModalOpen && !state.botModalOpen && !state.pushModalOpen) document.body.classList.remove("player-crm-dialog-modal-open");
      return;
    }
    var rows = Array.isArray(state.pokerPlusAccounts) ? state.pokerPlusAccounts : [];
    if (subtitleEl) subtitleEl.textContent = intFmt(rows.length) + " аккаунтов";
    bodyEl.innerHTML = renderPokerPlusModalList();
    modal.hidden = false;
    if (document.body) document.body.classList.add("player-crm-dialog-modal-open");
  }

  function closePokerPlusModal() {
    state.pokerPlusModalOpen = false;
    renderStats();
    renderPokerPlusModal();
  }

  function renderGeneralMessagesModalList() {
    var chat = state.chatStats || {};
    var rows = chat.generalMessages && Array.isArray(chat.generalMessages.authors) ? chat.generalMessages.authors : [];
    if (!rows.length) return "<div class=\"player-crm__timeline-item\">За выбранный период сообщений в главном чате пока нет.</div>";
    return "<div class=\"player-crm__modal-content\"><div class=\"player-crm__source-table-wrap\"><table class=\"player-crm__source-table\"><thead><tr>" +
      "<th>Игрок</th><th>ID</th><th>Сообщений</th>" +
      "</tr></thead><tbody>" + rows.slice(0, 10).map(function (r) {
        return "<tr>" +
          "<td>" + esc(r.name || "—") + "</td>" +
          "<td>" + esc(r.handle || r.id || "—") + "</td>" +
          "<td>" + esc(intFmt(r.count || 0)) + "</td>" +
        "</tr>";
      }).join("") + "</tbody></table></div></div>";
  }

  function renderGeneralMessagesModal() {
    var modal = document.getElementById("playerCrmGeneralMessagesModal");
    var subtitleEl = document.getElementById("playerCrmGeneralMessagesModalSubtitle");
    var bodyEl = document.getElementById("playerCrmGeneralMessagesModalBody");
    if (!modal || !bodyEl) return;
    if (!state.generalMessagesModalOpen) {
      modal.hidden = true;
      if (document.body && !state.chatDialogManager && !state.registrationModalMethod && !state.pokerPlusModalOpen && !state.botModalOpen && !state.pushModalOpen) document.body.classList.remove("player-crm-dialog-modal-open");
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
    renderStats();
    renderGeneralMessagesModal();
  }

  function channelSubscribersRows(channel) {
    return (Array.isArray(state.players) ? state.players.slice() : [])
      .filter(function (p) { return !!(p.channels && p.channels[channel]); })
      .sort(function (a, b) {
        return String(a.name || a.handle || a.id || "").localeCompare(String(b.name || b.handle || b.id || ""), "ru");
      });
  }

  function renderChannelSubscribersTable(rows, emptyText) {
    if (!rows.length) return "<div class=\"player-crm__timeline-item\">" + esc(emptyText) + "</div>";
    return "<div class=\"player-crm__modal-content\"><div class=\"player-crm__source-table-wrap\"><table class=\"player-crm__source-table\"><thead><tr>" +
      "<th>Игрок</th><th>Telegram</th><th>ID</th><th>Источник</th>" +
      "</tr></thead><tbody>" + rows.map(function (p) {
        return "<tr>" +
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
    return renderChannelSubscribersTable(botSubscribersRows(), "Подписанных на бот пока нет.");
  }

  function renderBotModal() {
    var modal = document.getElementById("playerCrmBotModal");
    var subtitleEl = document.getElementById("playerCrmBotModalSubtitle");
    var bodyEl = document.getElementById("playerCrmBotModalBody");
    if (!modal || !bodyEl) return;
    if (!state.botModalOpen) {
      modal.hidden = true;
      if (document.body && !state.chatDialogManager && !state.registrationModalMethod && !state.pokerPlusModalOpen && !state.generalMessagesModalOpen && !state.pushModalOpen) document.body.classList.remove("player-crm-dialog-modal-open");
      return;
    }
    var rows = botSubscribersRows();
    if (subtitleEl) subtitleEl.textContent = intFmt(rows.length) + " игроков";
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
    return renderChannelSubscribersTable(pushSubscribersRows(), "Подписанных на push пока нет.");
  }

  function renderPushModal() {
    var modal = document.getElementById("playerCrmPushModal");
    var subtitleEl = document.getElementById("playerCrmPushModalSubtitle");
    var bodyEl = document.getElementById("playerCrmPushModalBody");
    if (!modal || !bodyEl) return;
    if (!state.pushModalOpen) {
      modal.hidden = true;
      if (document.body && !state.chatDialogManager && !state.registrationModalMethod && !state.pokerPlusModalOpen && !state.generalMessagesModalOpen && !state.botModalOpen) document.body.classList.remove("player-crm-dialog-modal-open");
      return;
    }
    var rows = pushSubscribersRows();
    if (subtitleEl) subtitleEl.textContent = intFmt(rows.length) + " игроков";
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

  function renderAnalytics() {
    var el = document.getElementById("playerCrmAnalytics");
    if (!el) return;
    el.innerHTML = renderChartAnalytics();
  }

  var chartColors = {
    players: "#f8d98a",
    registrations: "#60a5fa",
    poker21: "#c084fc",
    bot: "#34d399",
    push: "#f472b6",
    deposits: "#f59e0b",
    crmMessages: "#a3e635",
    generalMessages: "#38bdf8",
  };

  function formatChartDate(value) {
    var parts = String(value || "").split("-");
    if (parts.length !== 3) return String(value || "");
    return parts[2] + "." + parts[1];
  }

  function renderChartSummary(chart, series) {
    var datedSeries = series.filter(function (s) {
      return s.hasDates !== false && state.chartSeriesEnabled[s.key] !== false;
    });
    var rows = Array.isArray(chart.summary) ? chart.summary : [];
    var table = rows.length && datedSeries.length ? "<div class=\"player-crm__chart-summary-table-wrap\"><table class=\"player-crm__chart-summary-table\"><thead><tr><th>Дата</th>" +
      datedSeries.map(function (s) { return "<th>" + esc(s.label || s.key) + "</th>"; }).join("") +
      "<th>Итого</th></tr></thead><tbody>" +
      rows.slice(0, 20).map(function (row) {
        var total = 0;
        var cells = datedSeries.map(function (s) {
          var value = Number(row[s.key]) || 0;
          total += value;
          return "<td>" + esc(intFmt(value)) + "</td>";
        }).join("");
        return "<tr><td>" + esc(formatChartDate(row.date)) + "</td>" + cells + "<td><strong>" + esc(intFmt(total)) + "</strong></td></tr>";
      }).join("") + "</tbody></table></div>" :
      "<div class=\"player-crm__timeline-item\">" + (datedSeries.length ? "За выбранный период нет прироста с датой." : "Выберите хотя бы одну галочку, чтобы увидеть линии и сводку.") + "</div>";
    var undated = chart.undated || {};
    var undatedItems = series.filter(function (s) {
      return s.hasDates === false && Number(undated[s.key]) > 0;
    }).map(function (s) {
      return "<span><small>" + esc(s.label || s.key) + "</small><strong>" + esc(intFmt(undated[s.key])) + "</strong></span>";
    }).join("");
    var undatedBlock = undatedItems ? "<div class=\"player-crm__chart-undated\"><h4>Остаток без даты</h4><div>" + undatedItems + "</div></div>" : "";
    return "<div class=\"player-crm__chart-summary\"><h4>Сводка прироста по датам</h4>" + table + undatedBlock + "</div>";
  }

  function renderChartAnalytics() {
    var chart = state.chartAnalytics || {};
    var labels = Array.isArray(chart.labels) ? chart.labels : [];
    var series = Array.isArray(chart.series) ? chart.series : [];
    if (!labels.length || !series.length) return "<div class=\"player-crm__timeline-item\">График появится после загрузки данных.</div>";
    var enabledSeries = series.filter(function (s) {
      return s.hasDates !== false && state.chartSeriesEnabled[s.key] !== false;
    });
    var width = 960;
    var height = 320;
    var padL = 56;
    var padR = 18;
    var padT = 20;
    var padB = 46;
    var plotW = width - padL - padR;
    var plotH = height - padT - padB;
    var max = enabledSeries.reduce(function (m, s) {
      return Math.max(m, Math.max.apply(null, (s.values || []).map(function (v) { return Number(v) || 0; })));
    }, 0);
    max = Math.max(1, max);
    function x(i) {
      return padL + (labels.length <= 1 ? 0 : (i / (labels.length - 1)) * plotW);
    }
    function y(v) {
      return padT + plotH - ((Number(v) || 0) / max) * plotH;
    }
    function points(values) {
      return labels.map(function (_, idx) { return x(idx).toFixed(1) + "," + y(values[idx] || 0).toFixed(1); }).join(" ");
    }
    var grid = [0, 0.25, 0.5, 0.75, 1].map(function (part) {
      var gy = padT + plotH - part * plotH;
      var value = Math.round(max * part);
      return "<line x1=\"" + padL + "\" y1=\"" + gy.toFixed(1) + "\" x2=\"" + (width - padR) + "\" y2=\"" + gy.toFixed(1) + "\" />" +
        "<text x=\"10\" y=\"" + (gy + 4).toFixed(1) + "\">" + esc(intFmt(value)) + "</text>";
    }).join("");
    var step = Math.max(1, Math.ceil(labels.length / 6));
    var ticks = labels.map(function (label, idx) {
      if (idx !== 0 && idx !== labels.length - 1 && idx % step !== 0) return "";
      return "<text x=\"" + x(idx).toFixed(1) + "\" y=\"" + (height - 14) + "\">" + esc(String(label).slice(5)) + "</text>";
    }).join("");
    var lines = enabledSeries.map(function (s) {
      var color = chartColors[s.key] || "#e5e7eb";
      return "<polyline points=\"" + points(s.values || []) + "\" style=\"--line-color:" + esc(color) + "\" />" +
        "<circle cx=\"" + x(labels.length - 1).toFixed(1) + "\" cy=\"" + y((s.values || [0])[labels.length - 1] || 0).toFixed(1) + "\" r=\"4\" style=\"--line-color:" + esc(color) + "\" />";
    }).join("");
    var legend = series.map(function (s) {
      var hasDates = s.hasDates !== false;
      var checked = hasDates && state.chartSeriesEnabled[s.key] !== false ? " checked" : "";
      var disabled = hasDates ? "" : " disabled";
      var cls = hasDates ? "player-crm__chart-toggle" : "player-crm__chart-toggle player-crm__chart-toggle--disabled";
      var color = chartColors[s.key] || "#e5e7eb";
      var hint = hasDates ? "" : " · нет даты";
      return "<label class=\"" + cls + "\"><input type=\"checkbox\" data-crm-chart-series=\"" + esc(s.key) + "\"" + checked + disabled + " />" +
        "<span class=\"player-crm__chart-swatch\" style=\"--line-color:" + esc(color) + "\"></span><span>" + esc((s.label || s.key) + hint) + "</span></label>";
    }).join("");
    return "<div class=\"player-crm__chart-card\">" +
      "<div class=\"player-crm__chart-scroll\"><svg class=\"player-crm__chart\" viewBox=\"0 0 " + width + " " + height + "\" role=\"img\" aria-label=\"CRM график по дням\">" +
        "<g class=\"player-crm__chart-grid\">" + grid + "</g>" +
        "<g class=\"player-crm__chart-lines\">" + lines + "</g>" +
        "<g class=\"player-crm__chart-ticks\">" + ticks + "</g>" +
      "</svg></div>" +
      "<div class=\"player-crm__chart-toggles\">" + legend + "</div>" +
      renderChartSummary(chart, series) +
    "</div>";
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

  function loadCrmData() {
    if (state.loading) return Promise.resolve(false);
    state.loading = true;
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
      state.loaded = true;
      renderAll();
      return Promise.resolve(true);
    }
    return fetch(base + "/api/player-crm" + crmQuery())
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
        if (data && data.ok && Array.isArray(data.players)) {
          state.players = data.players;
          state.registeredAccounts = Array.isArray(data.registeredAccounts) ? data.registeredAccounts : [];
          state.pokerPlusAccounts = Array.isArray(data.pokerPlusAccounts) ? data.pokerPlusAccounts : [];
          state.campaigns = Array.isArray(data.campaigns) ? data.campaigns : [];
          state.sourceAnalytics = Array.isArray(data.sourceAnalytics) ? data.sourceAnalytics : [];
          state.chartAnalytics = data.chartAnalytics || null;
          state.chatStats = data.chatStats || null;
          state.permissions = data.permissions || null;
          state.pushConfigured = data.pushConfigured === true;
          state.source = data.source || "api";
          state.crmError = "";
          if (data.range && data.range.key === "custom") {
            state.period = "custom";
            state.dateFrom = data.range.from || state.dateFrom;
            state.dateTo = data.range.to || state.dateTo;
          }
          if (data.chartRange && data.chartRange.key === "custom") {
            state.chartPeriod = "custom";
            state.chartDateFrom = data.chartRange.from || state.chartDateFrom;
            state.chartDateTo = data.chartRange.to || state.chartDateTo;
          } else if (data.chartRange && data.chartRange.key) {
            state.chartPeriod = String(data.chartRange.key);
          }
        } else {
          state.players = [];
          state.registeredAccounts = [];
          state.pokerPlusAccounts = [];
          state.campaigns = [];
          state.sourceAnalytics = [];
          state.chartAnalytics = null;
          state.chatStats = null;
          state.permissions = null;
          state.source = data && data.__status === 403 ? "forbidden" : "empty";
          state.crmError = data && data.__status === 403
            ? ((data.error || "CRM доступна только владельцам") + ". Если ты уже вошёл под нужной почтой, выйди и войди по email ещё раз.")
            : ((data && data.error) || "CRM не загрузилась: API не вернул живые данные.");
        }
      })
      .catch(function () {
        state.players = [];
        state.registeredAccounts = [];
        state.pokerPlusAccounts = [];
        state.campaigns = [];
        state.sourceAnalytics = [];
        state.chartAnalytics = null;
        state.chatStats = null;
        state.permissions = null;
        state.source = "error";
        state.crmError = "CRM не загрузилась: ошибка сети или API.";
      })
      .then(function () {
        state.loading = false;
        state.loaded = true;
        renderAll();
        return true;
      });
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
    return state.period === "custom" && state.dateFrom && state.dateTo
      ? { from: state.dateFrom, to: state.dateTo }
      : null;
  }

  function crmQuery() {
    var q = authQuerySafe();
    var sep = q.indexOf("?") >= 0 ? "&" : "?";
    if (state.period === "custom") {
      setDefaultDates();
      q += sep + "from=" + encodeURIComponent(state.dateFrom) + "&to=" + encodeURIComponent(state.dateTo);
    } else if (state.period === "all") {
      q += sep + "period=all";
    } else {
      q += sep + "period=" + encodeURIComponent(state.period || "30");
    }
    sep = "&";
    if (state.chartPeriod === "custom") {
      setDefaultChartDates();
      q += sep + "chartFrom=" + encodeURIComponent(state.chartDateFrom) + "&chartTo=" + encodeURIComponent(state.chartDateTo);
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

  function channelLabel(channel) {
    if (channel === "push") return "push";
    if (channel === "bot_push") return "бот + push";
    return "бот";
  }

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
        state.tab = "players";
        renderAll();
        return;
      }
      var open = e.target.closest("[data-crm-open-player]");
      if (open) {
        state.selectedId = open.getAttribute("data-crm-open-player") || "";
        state.tab = "players";
        renderAll();
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
        renderStats();
        renderGeneralMessagesModal();
        return;
      }
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
        loadCrmData();
      });
    }
    var dateFrom = document.getElementById("playerCrmDateFrom");
    if (dateFrom) dateFrom.addEventListener("change", function () {
      state.dateFrom = dateFrom.value || "";
      state.period = "custom";
      normalizeDateRange("from");
      state.showAllPlayers = false;
      syncPeriodInputs();
      loadCrmData();
    });
    var dateTo = document.getElementById("playerCrmDateTo");
    if (dateTo) dateTo.addEventListener("change", function () {
      state.dateTo = dateTo.value || "";
      state.period = "custom";
      normalizeDateRange("to");
      state.showAllPlayers = false;
      syncPeriodInputs();
      loadCrmData();
    });
    var chartPeriod = document.getElementById("playerCrmChartPeriodSelect");
    if (chartPeriod) {
      chartPeriod.addEventListener("change", function () {
        state.chartPeriod = chartPeriod.value || "30";
        if (state.chartPeriod === "custom") setDefaultChartDates();
        syncPeriodInputs();
        loadCrmData();
      });
    }
    var chartDateFrom = document.getElementById("playerCrmChartDateFrom");
    if (chartDateFrom) chartDateFrom.addEventListener("change", function () {
      state.chartDateFrom = chartDateFrom.value || "";
      state.chartPeriod = "custom";
      normalizeChartDateRange("from");
      syncPeriodInputs();
      loadCrmData();
    });
    var chartDateTo = document.getElementById("playerCrmChartDateTo");
    if (chartDateTo) chartDateTo.addEventListener("change", function () {
      state.chartDateTo = chartDateTo.value || "";
      state.chartPeriod = "custom";
      normalizeChartDateRange("to");
      syncPeriodInputs();
      loadCrmData();
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
    var refresh = document.getElementById("playerCrmRefreshBtn");
    if (refresh) refresh.addEventListener("click", loadCrmData);
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
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && state.registrationModalMethod) closeRegistrationModal();
      if (e.key === "Escape" && state.pokerPlusModalOpen) closePokerPlusModal();
      if (e.key === "Escape" && state.generalMessagesModalOpen) closeGeneralMessagesModal();
      if (e.key === "Escape" && state.botModalOpen) closeBotModal();
      if (e.key === "Escape" && state.pushModalOpen) closePushModal();
      if (e.key === "Escape" && state.chatDialogManager) closeManagerDialogModal();
    });
  }

  function pokerInitPlayerCrm() {
    bindOnce();
    syncPeriodInputs();
    if (!state.loaded) loadCrmData();
    else renderAll();
  }

  window.pokerInitPlayerCrm = pokerInitPlayerCrm;
  window.addEventListener("poker-admin-access", function () {
    if (document.body && document.body.getAttribute("data-view") === "player-crm") pokerInitPlayerCrm();
  });
  if (document.readyState !== "loading") {
    setTimeout(function () {
      if (document.getElementById("playerCrmView")) pokerInitPlayerCrm();
    }, 0);
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      if (document.getElementById("playerCrmView")) pokerInitPlayerCrm();
    });
  }
})();

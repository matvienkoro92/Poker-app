// CRM игроков: компактная админ-панель для массового потока в переписке.
(function () {
  var state = {
    loaded: false,
    loading: false,
    tab: "queue",
    period: "30",
    filter: "needs_touch",
    search: "",
    selectedId: "",
    players: [],
    campaigns: [],
    sourceAnalytics: [],
    permissions: null,
    pushConfigured: false,
    source: "demo",
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

  function daysLabel(n) {
    var d = Math.max(0, Number(n) || 0);
    if (d === 0) return "сегодня";
    if (d === 1) return "1 день";
    if (d > 1 && d < 5) return d + " дня";
    return d + " дней";
  }

  function periodData(p) {
    var k = String(state.period || "30");
    return {
      games: p.games && p.games[k] != null ? p.games[k] : 0,
      deposits: p.deposits && p.deposits[k] != null ? p.deposits[k] : 0,
      depositCount: p.depositCount && p.depositCount[k] != null ? p.depositCount[k] : 0,
      messages: p.messages && p.messages[k] != null ? p.messages[k] : 0,
    };
  }

  function makePlayer(id, name, handle, status, tags, source, manager, days, values) {
    return {
      id: id,
      name: name,
      handle: handle,
      status: status,
      tags: tags,
      source: source,
      manager: manager,
      lastGameDays: days.game,
      lastDepositDays: days.deposit,
      lastMessageDays: days.message,
      lastReplyDays: days.reply,
      trend: values.trend,
      games: values.games,
      deposits: values.deposits,
      depositCount: values.depositCount,
      messages: values.messages,
      botOpenRate: values.botOpenRate,
      pushOpenRate: values.pushOpenRate,
      note: values.note,
      timeline: values.timeline,
    };
  }

  function demoPlayers() {
    return [
      makePlayer("crm-001", "Сергей Fast", "@fastserg", "active", ["VIP", "кэш", "дорогой лид"], "TG реклама", "Марина", { game: 2, deposit: 2, message: 1, reply: 1 }, {
        trend: "растёт",
        games: { 7: 5, 30: 18, 90: 47 },
        deposits: { 7: 96000, 30: 334000, 90: 870000 },
        depositCount: { 7: 3, 30: 9, 90: 24 },
        messages: { 7: 4, 30: 12, 90: 34 },
        botOpenRate: 88,
        pushOpenRate: 61,
        note: "Хорошо реагирует на конкретный стол и быстрый вход.",
        timeline: ["2 дня назад депозит 40 000 ₽", "3 дня назад играл PLO5", "7 дней назад открыл турнирную рассылку"],
      }),
      makePlayer("crm-002", "Андрей Новик", "@and_novik", "ready", ["новичок", "ждет игру"], "Фриролл", "Роман", { game: 99, deposit: 1, message: 0, reply: 0 }, {
        trend: "новый",
        games: { 7: 0, 30: 0, 90: 0 },
        deposits: { 7: 7000, 30: 7000, 90: 7000 },
        depositCount: { 7: 1, 30: 1, 90: 1 },
        messages: { 7: 7, 30: 7, 90: 7 },
        botOpenRate: 100,
        pushOpenRate: 0,
        note: "Пополнил, но ещё не дошёл до первой игры.",
        timeline: ["сегодня спросил про лимиты", "вчера депозит 7 000 ₽", "3 дня назад пришёл с фриролла"],
      }),
      makePlayer("crm-003", "Лена River", "@river_lena", "sleeping", ["турниры", "просела"], "Канал", "Марина", { game: 18, deposit: 31, message: 14, reply: 12 }, {
        trend: "падает",
        games: { 7: 0, 30: 2, 90: 19 },
        deposits: { 7: 0, 30: 0, 90: 126000 },
        depositCount: { 7: 0, 30: 0, 90: 7 },
        messages: { 7: 0, 30: 2, 90: 9 },
        botOpenRate: 63,
        pushOpenRate: 47,
        note: "Была активна в турнирах, лучше звать на расписание недели.",
        timeline: ["18 дней не играла", "31 день без депозита", "последний клик по рассылке 22 дня назад"],
      }),
      makePlayer("crm-004", "Илья МТТ", "@ilya_mtt", "dialog", ["MTT", "сомневается"], "Лендинг", "Роман", { game: 99, deposit: 99, message: 2, reply: 2 }, {
        trend: "прогрев",
        games: { 7: 0, 30: 0, 90: 0 },
        deposits: { 7: 0, 30: 0, 90: 0 },
        depositCount: { 7: 0, 30: 0, 90: 0 },
        messages: { 7: 5, 30: 5, 90: 5 },
        botOpenRate: 71,
        pushOpenRate: 0,
        note: "Спрашивал гарантии и расписание, ушёл думать.",
        timeline: ["2 дня назад ответил на условия", "4 дня назад спросил про MTT", "5 дней назад регистрация"],
      }),
      makePlayer("crm-005", "Макс 6max", "@max6max", "active", ["кэш", "регуляр"], "Рекомендация", "Дима", { game: 1, deposit: 6, message: 1, reply: 1 }, {
        trend: "стабилен",
        games: { 7: 8, 30: 27, 90: 73 },
        deposits: { 7: 34000, 30: 149000, 90: 456000 },
        depositCount: { 7: 2, 30: 8, 90: 19 },
        messages: { 7: 6, 30: 18, 90: 41 },
        botOpenRate: 79,
        pushOpenRate: 52,
        note: "Играет часто, не любит общие рассылки, лучше персонально.",
        timeline: ["вчера играл NLH", "6 дней назад депозит 20 000 ₽", "8 дней назад получил персональный инвайт"],
      }),
      makePlayer("crm-006", "Олег Deep", "@deepoleg", "sleeping", ["VIP", "реактивация"], "TG реклама", "Марина", { game: 34, deposit: 46, message: 28, reply: 25 }, {
        trend: "падает",
        games: { 7: 0, 30: 0, 90: 11 },
        deposits: { 7: 0, 30: 0, 90: 290000 },
        depositCount: { 7: 0, 30: 0, 90: 5 },
        messages: { 7: 0, 30: 1, 90: 8 },
        botOpenRate: 42,
        pushOpenRate: 29,
        note: "Был крупный игрок. Нужен мягкий персональный возврат.",
        timeline: ["34 дня не играл", "46 дней без депозита", "последняя активность после крупного турнира"],
      }),
      makePlayer("crm-007", "Никита PLO", "@plo_nikita", "ready", ["PLO", "готов играть"], "Чат TG", "Дима", { game: 9, deposit: 3, message: 0, reply: 0 }, {
        trend: "растёт",
        games: { 7: 1, 30: 5, 90: 5 },
        deposits: { 7: 18000, 30: 54000, 90: 54000 },
        depositCount: { 7: 1, 30: 3, 90: 3 },
        messages: { 7: 8, 30: 11, 90: 11 },
        botOpenRate: 91,
        pushOpenRate: 66,
        note: "Просит PLO-стол, если есть состав — писать сразу.",
        timeline: ["сегодня спросил про PLO", "3 дня назад депозит 18 000 ₽", "9 дней назад первая игра"],
      }),
      makePlayer("crm-008", "Влад Классик", "@vladclassic", "closed", ["не подходит"], "Лендинг", "Роман", { game: 99, deposit: 99, message: 21, reply: 21 }, {
        trend: "закрыт",
        games: { 7: 0, 30: 0, 90: 0 },
        deposits: { 7: 0, 30: 0, 90: 0 },
        depositCount: { 7: 0, 30: 0, 90: 0 },
        messages: { 7: 0, 30: 2, 90: 2 },
        botOpenRate: 0,
        pushOpenRate: 0,
        note: "Не наш формат, не включать в рассылки.",
        timeline: ["21 день назад закрыт менеджером", "отказался от условий"],
      }),
      makePlayer("crm-009", "Катя Bounty", "@kat_bounty", "active", ["турниры", "bounty"], "Канал", "Марина", { game: 4, deposit: 5, message: 3, reply: 3 }, {
        trend: "стабилен",
        games: { 7: 3, 30: 14, 90: 36 },
        deposits: { 7: 22000, 30: 118000, 90: 312000 },
        depositCount: { 7: 2, 30: 7, 90: 18 },
        messages: { 7: 2, 30: 8, 90: 21 },
        botOpenRate: 84,
        pushOpenRate: 58,
        note: "Лучше всего конвертируется на bounty-анонсы.",
        timeline: ["4 дня назад турнир", "5 дней назад депозит 12 000 ₽", "открыла 3 из 4 последних рассылок"],
      }),
      makePlayer("crm-010", "Павел Holdem", "@pavel_holdem", "new", ["новый", "без депозита"], "Реклама", "Дима", { game: 99, deposit: 99, message: 1, reply: 1 }, {
        trend: "новый",
        games: { 7: 0, 30: 0, 90: 0 },
        deposits: { 7: 0, 30: 0, 90: 0 },
        depositCount: { 7: 0, 30: 0, 90: 0 },
        messages: { 7: 3, 30: 3, 90: 3 },
        botOpenRate: 100,
        pushOpenRate: 0,
        note: "Новый лид, нужно довести до первого депозита.",
        timeline: ["вчера спросил как начать", "вчера пришёл с рекламы"],
      }),
    ];
  }

  var segments = [
    { key: "all", label: "Все", desc: "Вся база без исключения.", match: function (p) { return p.status !== "closed"; } },
    { key: "needs_touch", label: "Пора написать", desc: "Новые, готовые к игре, просевшие и те, кто ждёт ответа.", match: needsTouch },
    { key: "new_no_deposit", label: "Новые без депозита", desc: "Есть диалог, но нет первого депозита.", match: function (p) { return p.status !== "closed" && periodData(p).deposits <= 0 && (p.status === "new" || p.status === "dialog"); } },
    { key: "deposited_no_game", label: "Депозит без игры", desc: "Пополнили, но не дошли до первой/следующей игры.", match: function (p) { return p.status !== "closed" && periodData(p).deposits > 0 && p.lastGameDays > 7; } },
    { key: "inactive_14", label: "Не играли 14+ дней", desc: "Реактивация игроков с паузой по игре.", match: function (p) { return p.status !== "closed" && p.lastGameDays >= 14; } },
    { key: "vip_drop", label: "VIP просели", desc: "Крупные игроки без игры или депозита.", match: function (p) { return p.status !== "closed" && hasTag(p, "VIP") && (p.lastGameDays >= 14 || p.lastDepositDays >= 21); } },
    { key: "active_7", label: "Активные 7 дней", desc: "Играли или пополняли на этой неделе.", match: function (p) { return p.status !== "closed" && (p.lastGameDays <= 7 || p.lastDepositDays <= 7); } },
    { key: "tournament", label: "Турнирные", desc: "Интерес к MTT, bounty и расписанию.", match: function (p) { return p.status !== "closed" && (hasTag(p, "турниры") || hasTag(p, "MTT") || hasTag(p, "bounty")); } },
  ];

  function hasTag(p, tag) {
    return (p.tags || []).map(function (t) { return String(t).toLowerCase(); }).indexOf(String(tag).toLowerCase()) >= 0;
  }

  function needsTouch(p) {
    if (p.status === "closed") return false;
    if (p.status === "new" || p.status === "ready") return true;
    if (p.lastMessageDays <= 1 && p.lastReplyDays <= 1 && p.status !== "active") return true;
    if (p.lastGameDays >= 14) return true;
    if (p.lastDepositDays <= 7 && p.lastGameDays > 7) return true;
    if (hasTag(p, "VIP") && p.lastDepositDays >= 21) return true;
    return false;
  }

  function touchReason(p) {
    if (p.status === "new") return "Новый лид: быстро дать условия и довести до первого депозита.";
    if (p.status === "ready") return "Готов играть: нужен конкретный стол, время или менеджерский пинг.";
    if (p.lastDepositDays <= 7 && p.lastGameDays > 7) return "Депозит уже есть, но до игры не дошёл.";
    if (hasTag(p, "VIP") && p.lastDepositDays >= 21) return "VIP просел по депозитам, лучше персональное сообщение.";
    if (p.lastGameDays >= 14) return "Не играл " + daysLabel(p.lastGameDays) + ", подходит для реактивации.";
    return "Есть активность в переписке, нужно не потерять диалог.";
  }

  function statusLabel(s) {
    var map = {
      new: "Новый",
      dialog: "В диалоге",
      ready: "Готов играть",
      active: "Активный",
      sleeping: "Спящий",
      closed: "Закрыт",
    };
    return map[s] || s;
  }

  function statusOptions(active) {
    return ["new", "dialog", "ready", "active", "sleeping", "closed"].map(function (s) {
      return "<option value=\"" + esc(s) + "\"" + (s === active ? " selected" : "") + ">" + esc(statusLabel(s)) + "</option>";
    }).join("");
  }

  function statusBadgeClass(p) {
    if (p.status === "active" || p.status === "ready") return "player-crm__badge player-crm__badge--good";
    if (p.status === "sleeping" || p.status === "closed") return "player-crm__badge player-crm__badge--risk";
    return "player-crm__badge";
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
      var hay = [p.name, p.handle, p.status, p.source, p.manager, p.note].concat(p.tags || []).join(" ").toLowerCase();
      return hay.indexOf(q) >= 0;
    });
  }

  function sortForWork(a, b) {
    function score(p) {
      var s = 0;
      if (p.status === "new") s += 70;
      if (p.status === "ready") s += 65;
      if (p.lastDepositDays <= 7 && p.lastGameDays > 7) s += 55;
      if (hasTag(p, "VIP") && p.lastGameDays >= 14) s += 50;
      if (p.lastGameDays >= 14) s += 30;
      s -= Math.min(20, p.lastReplyDays || 0);
      return s;
    }
    return score(b) - score(a);
  }

  function renderStats() {
    var el = document.getElementById("playerCrmStats");
    if (!el) return;
    var active = state.players.filter(function (p) { return p.status !== "closed"; });
    var pd = active.map(periodData);
    var deposits = pd.reduce(function (sum, x) { return sum + x.deposits; }, 0);
    var games = pd.reduce(function (sum, x) { return sum + x.games; }, 0);
    var needs = active.filter(needsTouch).length;
    var inactive = active.filter(function (p) { return p.lastGameDays >= 14; }).length;
    var stats = [
      ["Игроков в базе", active.length],
      ["Пора написать", needs],
      ["Депозиты за " + state.period + "д", money(deposits)],
      ["Игр за " + state.period + "д", games],
    ];
    el.innerHTML = stats.map(function (it) {
      return "<div class=\"player-crm__stat\"><span class=\"player-crm__stat-label\">" + esc(it[0]) + "</span><span class=\"player-crm__stat-value\">" + esc(it[1]) + "</span></div>";
    }).join("");
    var anaPeriod = document.getElementById("playerCrmAnalyticsPeriod");
    if (anaPeriod) anaPeriod.textContent = state.period + " дней";
    var queueCount = document.getElementById("playerCrmQueueCount");
    if (queueCount) queueCount.textContent = needs + " задач";
    return { active: active.length, needs: needs, inactive: inactive, deposits: deposits, games: games };
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
    if (!state.selectedId && items[0]) state.selectedId = items[0].id;
    if (!items.length) {
      el.innerHTML = "<div class=\"player-crm__timeline-item\">По этому фильтру пока пусто.</div>";
      return;
    }
    el.innerHTML = items.map(function (p) {
      var pd = periodData(p);
      var cls = "player-crm__player" + (p.id === state.selectedId ? " player-crm__player--active" : "");
      return "<button type=\"button\" class=\"" + cls + "\" data-crm-player=\"" + esc(p.id) + "\">" +
        "<span class=\"player-crm__player-head\"><span class=\"player-crm__player-name\">" + esc(p.name) + "</span><span class=\"" + statusBadgeClass(p) + "\">" + esc(statusLabel(p.status)) + "</span></span>" +
        "<span class=\"player-crm__player-meta\">" + esc(p.handle) + " · " + esc(p.source) + " · " + esc(p.manager) + "</span>" +
        "<span class=\"player-crm__player-note\">" + esc(pd.games) + " игр · " + esc(money(pd.deposits)) + " · не играл " + esc(daysLabel(p.lastGameDays)) + "</span>" +
        "</button>";
    }).join("");
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
    if (hint) hint.textContent = p.handle + " · " + statusLabel(p.status);
    var avg = pd.depositCount ? Math.round(pd.deposits / pd.depositCount) : 0;
    el.innerHTML =
      "<div class=\"player-crm__detail-head\">" +
        "<div><h3 class=\"player-crm__detail-title\">" + esc(p.name) + "</h3><div class=\"player-crm__detail-muted\">" + esc(p.handle) + " · " + esc(p.source) + " · менеджер " + esc(p.manager) + "</div></div>" +
        "<span class=\"" + statusBadgeClass(p) + "\">" + esc(statusLabel(p.status)) + "</span>" +
      "</div>" +
      "<div>" + (p.tags || []).map(function (t) { return "<span class=\"player-crm__tag\">" + esc(t) + "</span>"; }).join("") + "</div>" +
      "<div class=\"player-crm__metrics\">" +
        metric("Игр " + state.period + "д", pd.games) +
        metric("Депозит " + state.period + "д", money(pd.deposits)) +
        metric("Средний депозит", avg ? money(avg) : "—") +
        metric("Сообщений", pd.messages) +
      "</div>" +
      "<div class=\"player-crm__metrics\">" +
        metric("Последняя игра", daysLabel(p.lastGameDays)) +
        metric("Последний депозит", daysLabel(p.lastDepositDays)) +
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
          "<label><span>Статус</span><select id=\"playerCrmEditStatus\">" + statusOptions(p.status) + "</select></label>" +
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
          "<label><span>Тип</span><select id=\"playerCrmEventType\"><option value=\"deposit\">Депозит</option><option value=\"game\">Игра</option><option value=\"message\">Сообщение</option></select></label>" +
          "<label><span>Сумма</span><input id=\"playerCrmEventAmount\" type=\"number\" inputmode=\"numeric\" min=\"0\" placeholder=\"0\" /></label>" +
        "</div>" +
        "<label class=\"player-crm__message-label\"><span>Комментарий к событию</span><input id=\"playerCrmEventNote\" placeholder=\"например: импорт из кассы / играл PLO\" /></label>" +
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

  function renderQueue() {
    var el = document.getElementById("playerCrmQueue");
    if (!el) return;
    var items = state.players.filter(needsTouch).sort(sortForWork);
    if (!items.length) {
      el.innerHTML = "<div class=\"player-crm__timeline-item\">Сейчас нет срочных касаний.</div>";
      return;
    }
    el.innerHTML = items.map(function (p) {
      return "<article class=\"player-crm__queue-item\">" +
        "<div><p class=\"player-crm__queue-title\">" + esc(p.name) + " · " + esc(statusLabel(p.status)) + "</p><p class=\"player-crm__queue-reason\">" + esc(touchReason(p)) + "</p></div>" +
        "<button type=\"button\" class=\"player-crm__ghost-btn\" data-crm-open-player=\"" + esc(p.id) + "\">Открыть</button>" +
      "</article>";
    }).join("");
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
        "<div class=\"player-crm__segment-actions\"><span class=\"player-crm__badge\">" + players.length + " игроков</span><span class=\"player-crm__detail-muted\">" + esc(money(dep)) + " за " + esc(state.period) + "д</span></div>" +
        "<div class=\"player-crm__broadcast-actions\"><button type=\"button\" class=\"player-crm__ghost-btn\" data-crm-use-segment=\"" + esc(seg.key) + "\">Открыть список</button><button type=\"button\" class=\"player-crm__primary-btn\" data-crm-broadcast-segment=\"" + esc(seg.key) + "\">Рассылка</button></div>" +
      "</article>";
    }).join("");
  }

  function renderBroadcastOptions() {
    var sel = document.getElementById("playerCrmBroadcastSegment");
    if (!sel) return;
    var prev = sel.value || state.filter || "needs_touch";
    sel.innerHTML = segments.filter(function (s) { return s.key !== "closed"; }).map(function (seg) {
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
    var active = state.players.filter(function (p) { return p.status !== "closed"; });
    var byStatus = ["new", "dialog", "ready", "active", "sleeping"].map(function (s) {
      return { label: statusLabel(s), value: active.filter(function (p) { return p.status === s; }).length };
    });
    var maxStatus = Math.max(1, byStatus.reduce(function (m, x) { return Math.max(m, x.value); }, 0));
    var segRows = segments.filter(function (s) { return s.key !== "all"; }).map(function (s) {
      return { label: s.label, value: segmentPlayers(s.key).length };
    });
    var maxSeg = Math.max(1, segRows.reduce(function (m, x) { return Math.max(m, x.value); }, 0));
    el.innerHTML =
      "<div class=\"player-crm__segment-card\"><h4>По статусам</h4>" + bars(byStatus, maxStatus) + "</div>" +
      "<div class=\"player-crm__segment-card\"><h4>По рабочим сегментам</h4>" + bars(segRows, maxSeg) + "</div>" +
      "<div class=\"player-crm__segment-card\"><h4>Источники</h4>" + renderSourceAnalytics() + "</div>" +
      "<div class=\"player-crm__segment-card\"><h4>Последние CRM-кампании</h4>" + renderCampaigns() + "</div>";
  }

  function renderSourceAnalytics() {
    var rows = state.sourceAnalytics || [];
    if (!rows.length) return "<p class=\"player-crm__detail-muted\">Источники появятся после загрузки живой базы.</p>";
    return "<div class=\"player-crm__source-table-wrap\"><table class=\"player-crm__source-table\"><thead><tr>" +
      "<th>Источник</th><th>Игроки</th><th>Активные</th><th>Нужны касания</th><th>Визиты</th><th>Игры 30д</th><th>Депозиты 30д</th><th>Fee</th><th>Push</th>" +
      "</tr></thead><tbody>" + rows.map(function (r) {
        return "<tr><td>" + esc(r.source || "—") + "</td><td>" + esc(r.players || 0) + "</td><td>" + esc(r.active || 0) + "</td><td>" + esc(r.needsTouch || 0) + "</td><td>" + esc(r.visits || 0) + "</td><td>" + esc(r.games30 || 0) + "</td><td>" + esc(money(r.deposits30 || 0)) + "</td><td>" + esc(money(r.fee || 0)) + "</td><td>" + esc(r.push || 0) + "</td></tr>";
      }).join("") + "</tbody></table></div>";
  }

  function renderCampaigns() {
    if (!state.campaigns || !state.campaigns.length) return "<p class=\"player-crm__detail-muted\">Пока нет сохранённых кампаний.</p>";
    return state.campaigns.slice(0, 8).map(function (c) {
      return "<div class=\"player-crm__timeline-item\"><strong>" + esc(c.status || "draft") + "</strong> · " + esc(c.segment || "segment") + " · " + esc(c.channel || "bot") + " · аудитория " + esc(c.audience || 0) + " · бот " + esc(c.sentBot || 0) + " · push " + esc(c.sentPush || 0) + "</div>";
    }).join("");
  }

  function bars(rows, max) {
    return "<div class=\"player-crm__bar\">" + rows.map(function (row) {
      var w = max ? Math.max(4, Math.round((row.value / max) * 100)) : 0;
      return "<div class=\"player-crm__bar-row\"><span>" + esc(row.label) + "</span><span class=\"player-crm__bar-track\"><span class=\"player-crm__bar-fill\" style=\"width:" + w + "%\"></span></span><strong>" + esc(row.value) + "</strong></div>";
    }).join("") + "</div>";
  }

  function renderAll() {
    renderStats();
    renderChips();
    renderList();
    renderQueue();
    renderDetail();
    renderSegments();
    renderBroadcastOptions();
    renderAnalytics();
    syncTabs();
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
      state.players = demoPlayers();
      state.source = "demo";
      state.loading = false;
      state.loaded = true;
      renderAll();
      return Promise.resolve(true);
    }
    return fetch(base + "/api/player-crm" + authQuerySafe())
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data && data.ok && Array.isArray(data.players)) {
          state.players = data.players;
          state.campaigns = Array.isArray(data.campaigns) ? data.campaigns : [];
          state.sourceAnalytics = Array.isArray(data.sourceAnalytics) ? data.sourceAnalytics : [];
          state.permissions = data.permissions || null;
          state.pushConfigured = data.pushConfigured === true;
          state.source = data.source || "api";
        } else {
          state.players = demoPlayers();
          state.campaigns = [];
          state.sourceAnalytics = [];
          state.permissions = null;
          state.source = "demo";
        }
      })
      .catch(function () {
        state.players = demoPlayers();
        state.campaigns = [];
        state.sourceAnalytics = [];
        state.permissions = null;
        state.source = "demo";
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
    var segment = segEl ? segEl.value : "needs_touch";
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
      if (out) out.textContent = "Нет авторизации/API: локально доступен только просмотр демо-аудитории (" + players.length + " игроков).";
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
      status: val("playerCrmEditStatus"),
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

  function importCrmEvents() {
    var text = val("playerCrmImportText");
    if (!text.trim()) return;
    postCrmAction({ action: "import_events", csv: text }, "Импорт событий выполнен.");
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
        state.tab = tab.getAttribute("data-crm-tab") || "queue";
        syncTabs();
        return;
      }
      var filter = e.target.closest("[data-crm-filter]");
      if (filter) {
        state.filter = filter.getAttribute("data-crm-filter") || "all";
        state.selectedId = "";
        renderAll();
        return;
      }
      var player = e.target.closest("[data-crm-player]");
      if (player) {
        state.selectedId = player.getAttribute("data-crm-player") || "";
        state.tab = "base";
        renderAll();
        return;
      }
      var open = e.target.closest("[data-crm-open-player]");
      if (open) {
        state.selectedId = open.getAttribute("data-crm-open-player") || "";
        state.tab = "base";
        renderAll();
        return;
      }
      var useSeg = e.target.closest("[data-crm-use-segment]");
      if (useSeg) {
        state.filter = useSeg.getAttribute("data-crm-use-segment") || "all";
        state.tab = "base";
        state.selectedId = "";
        renderAll();
        return;
      }
      var broadSeg = e.target.closest("[data-crm-broadcast-segment]");
      if (broadSeg) {
        var seg = broadSeg.getAttribute("data-crm-broadcast-segment") || "needs_touch";
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
        renderList();
        renderDetail();
      });
    }
    var period = document.getElementById("playerCrmPeriodSelect");
    if (period) {
      period.addEventListener("change", function () {
        state.period = period.value || "30";
        renderAll();
      });
    }
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
    var importBtn = document.getElementById("playerCrmImportBtn");
    if (importBtn) importBtn.addEventListener("click", importCrmEvents);
    root.addEventListener("click", function (e) {
      if (e.target && e.target.id === "playerCrmSavePlayerBtn") saveSelectedPlayer();
      if (e.target && e.target.id === "playerCrmAddEventBtn") addSelectedEvent();
      if (e.target && e.target.id === "playerCrmLinkIdentityBtn") linkSelectedIdentity();
    });
  }

  function pokerInitPlayerCrm() {
    bindOnce();
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

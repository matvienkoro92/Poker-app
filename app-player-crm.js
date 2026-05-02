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
    source: "api",
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
    if (n == null || Number(n) >= 999) return "—";
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

  var segments = [
    { key: "all", label: "Все", desc: "Вся живая база CRM.", match: function () { return true; } },
    { key: "needs_touch", label: "Пора написать", desc: "Есть депозит без игры, нет push/бот-канала или давно не было CRM-касания.", match: needsTouch },
    { key: "has_deposit", label: "Есть депозит", desc: "Есть депозит в CRM-журнале за выбранный период.", match: function (p) { return periodData(p).deposits > 0; } },
    { key: "deposited_no_game", label: "Депозит без игры", desc: "Есть депозит, но нет события игры за выбранный период.", match: function (p) { var pd = periodData(p); return pd.deposits > 0 && pd.games <= 0; } },
    { key: "no_deposit", label: "Без депозита в CRM", desc: "За выбранный период в CRM-журнале нет депозитов.", match: function (p) { return periodData(p).deposits <= 0; } },
    { key: "active_7", label: "Активность 7 дней", desc: "Есть игра, депозит или сообщение за последние 7 дней.", match: function (p) { var old = state.period; state.period = "7"; var pd = periodData(p); state.period = old; return pd.games > 0 || pd.deposits > 0 || pd.messages > 0; } },
    { key: "has_push", label: "Есть push", desc: "Можно достать игрока push-уведомлением.", match: function (p) { return !!(p.channels && p.channels.push); } },
    { key: "tournament", label: "Турнирные", desc: "Интерес к MTT, bounty, рейтингу или розыгрышам.", match: function (p) { return hasTag(p, "турниры") || hasTag(p, "MTT") || hasTag(p, "bounty") || hasTag(p, "рейтинг") || hasTag(p, "розыгрыши"); } },
  ];

  function hasTag(p, tag) {
    return (p.tags || []).map(function (t) { return String(t).toLowerCase(); }).indexOf(String(tag).toLowerCase()) >= 0;
  }

  function needsTouch(p) {
    var pd = periodData(p);
    if (pd.deposits > 0 && pd.games <= 0) return true;
    if (!(p.channels && (p.channels.bot || p.channels.push))) return true;
    if (p.lastTouchDays == null || Number(p.lastTouchDays) >= 7) return true;
    return false;
  }

  function touchReason(p) {
    var pd = periodData(p);
    if (pd.deposits > 0 && pd.games <= 0) return "Есть депозит в CRM-журнале, но нет события игры за выбранный период.";
    if (!(p.channels && (p.channels.bot || p.channels.push))) return "Нет доступного бот/push-канала, лучше связать Telegram или push.";
    if (p.lastTouchDays == null || Number(p.lastTouchDays) >= 7) return "Давно не было CRM-касания.";
    return "Есть активность, можно проверить диалог.";
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
      var pd = periodData(p);
      var s = 0;
      if (pd.deposits > 0 && pd.games <= 0) s += 60;
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
    var players = state.players;
    var pd = players.map(periodData);
    var deposits = pd.reduce(function (sum, x) { return sum + x.deposits; }, 0);
    var games = pd.reduce(function (sum, x) { return sum + x.games; }, 0);
    var needs = players.filter(needsTouch).length;
    var stats = [
      ["Игроков в базе", players.length],
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
    return { active: players.length, needs: needs, deposits: deposits, games: games };
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
        "<span class=\"player-crm__player-head\"><span class=\"player-crm__player-name\">" + esc(p.name) + "</span></span>" +
        "<span class=\"player-crm__player-meta\">" + esc(p.handle) + " · " + esc(p.source) + " · " + esc(p.manager) + "</span>" +
        "<span class=\"player-crm__player-note\">" + esc(pd.games) + " игр в CRM · " + esc(money(pd.deposits)) + " · сообщений " + esc(pd.messages) + "</span>" +
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
    if (hint) hint.textContent = p.handle || p.accountId || p.id || "игрок";
    var avg = pd.depositCount ? Math.round(pd.deposits / pd.depositCount) : 0;
    el.innerHTML =
      "<div class=\"player-crm__detail-head\">" +
        "<div><h3 class=\"player-crm__detail-title\">" + esc(p.name) + "</h3><div class=\"player-crm__detail-muted\">" + esc(p.handle) + " · " + esc(p.source) + " · менеджер " + esc(p.manager) + "</div></div>" +
      "</div>" +
      "<div>" + (p.tags || []).map(function (t) { return "<span class=\"player-crm__tag\">" + esc(t) + "</span>"; }).join("") + "</div>" +
      "<div class=\"player-crm__metrics\">" +
        metric("Игр " + state.period + "д", pd.games) +
        metric("Депозит " + state.period + "д", money(pd.deposits)) +
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
        "<div><p class=\"player-crm__queue-title\">" + esc(p.name) + "</p><p class=\"player-crm__queue-reason\">" + esc(touchReason(p)) + "</p></div>" +
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
    var segRows = segments.filter(function (s) { return s.key !== "all"; }).map(function (s) {
      return { label: s.label, value: segmentPlayers(s.key).length };
    });
    var maxSeg = Math.max(1, segRows.reduce(function (m, x) { return Math.max(m, x.value); }, 0));
    el.innerHTML =
      "<div class=\"player-crm__segment-card\"><h4>По рабочим сегментам</h4>" + bars(segRows, maxSeg) + "</div>" +
      "<div class=\"player-crm__segment-card\"><h4>Источники</h4>" + renderSourceAnalytics() + "</div>" +
      "<div class=\"player-crm__segment-card\"><h4>Последние CRM-кампании</h4>" + renderCampaigns() + "</div>";
  }

  function renderSourceAnalytics() {
    var rows = state.sourceAnalytics || [];
    if (!rows.length) return "<p class=\"player-crm__detail-muted\">Источники появятся после загрузки живой базы.</p>";
    return "<div class=\"player-crm__source-table-wrap\"><table class=\"player-crm__source-table\"><thead><tr>" +
      "<th>Источник</th><th>Игроки</th><th>Визиты</th><th>Игры 30д</th><th>Депозиты 30д</th><th>Fee</th><th>Push</th>" +
      "</tr></thead><tbody>" + rows.map(function (r) {
        return "<tr><td>" + esc(r.source || "—") + "</td><td>" + esc(r.players || 0) + "</td><td>" + esc(r.visits || 0) + "</td><td>" + esc(r.games30 || 0) + "</td><td>" + esc(money(r.deposits30 || 0)) + "</td><td>" + esc(money(r.fee || 0)) + "</td><td>" + esc(r.push || 0) + "</td></tr>";
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
      state.players = [];
      state.campaigns = [];
      state.sourceAnalytics = [];
      state.permissions = null;
      state.source = "no-auth";
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
          state.players = [];
          state.campaigns = [];
          state.sourceAnalytics = [];
          state.permissions = null;
          state.source = "empty";
        }
      })
      .catch(function () {
        state.players = [];
        state.campaigns = [];
        state.sourceAnalytics = [];
        state.permissions = null;
        state.source = "error";
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

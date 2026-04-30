// Посетители (админ): кнопка в футере, модалка со списком, отправка сообщения
(function () {
  var visitorsAdminData = null;

  function esc(s) {
    if (s == null) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function collectAdminIdentityCandidates() {
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
      var auth = window.__pokerTelegramAuth;
      if (auth && auth.user) users.push(auth.user);
    } catch (eAuth) {}
    try {
      var rec = typeof pokerReadPwaTgSessionRecord === "function" ? pokerReadPwaTgSessionRecord() : null;
      if (rec && rec.user) users.push(rec.user);
    } catch (eRec) {}
    return users;
  }

  function isKnownAdminUser(user) {
    if (!user) return false;
    var id = user.id != null ? String(user.id).replace(/^tg_/, "").trim() : "";
    if (id === "388008256" || id === "2144406710" || id === "1897001087") return true;
    var username = user.username != null ? String(user.username).replace(/^@+/, "").trim().toLowerCase() : "";
    if (username === "roman1_matvienko") return true;
    var email = user.email != null ? String(user.email).trim().toLowerCase() : "";
    return email === "matvienkoro92@gmail.com";
  }

  function renderHomeAdminIdentityStatus(forceVisible) {
    var el = document.getElementById("homeAdminVersionTop");
    if (!el) return;
    var version = document.documentElement.getAttribute("data-app-version") || "";
    var authAdmin = false;
    try {
      var auth = window.__pokerTelegramAuth;
      if (auth && auth.adminAccess === true) authAdmin = true;
      var rec = typeof pokerReadPwaTgSessionRecord === "function" ? pokerReadPwaTgSessionRecord() : null;
      if (rec && rec.adminAccess === true) authAdmin = true;
    } catch (eAuthFlag) {}
    var candidates = collectAdminIdentityCandidates();
    var shown = null;
    var knownAdmin = authAdmin;
    for (var i = 0; i < candidates.length; i++) {
      if (!shown && candidates[i]) shown = candidates[i];
      if (isKnownAdminUser(candidates[i])) knownAdmin = true;
    }
    var parts = [];
    if (version) parts.push("Version " + version);
    parts.push("admin: " + (knownAdmin ? "да" : "проверяется"));
    if (shown && shown.username) parts.push("@" + String(shown.username).replace(/^@+/, "").trim());
    if (shown && shown.id != null) parts.push("id " + String(shown.id).replace(/^tg_/, "").trim());
    if (shown && shown.email) parts.push(String(shown.email).trim());
    el.textContent = parts.join(" · ");
    if (forceVisible || knownAdmin) el.classList.remove("home-admin-version--hidden");
  }

  function checkAdminAndShowVisitorsButton() {
    var wrap = document.getElementById("footerAdminVisitorsWrap");
    var keyboardLabWrap = document.getElementById("footerKeyboardLabWrap");
    var ratingAdminRow = document.getElementById("winterRatingAdminRow");
    var gazetteAdminRow = document.getElementById("gazetteAdminRow");
    var reportBtn = document.getElementById("adminReportBtn");
    var homeFooterVersion = document.getElementById("homeFooterAppVersion");
    var homeAdminVersion = document.getElementById("homeAdminVersionTop");
    if (!wrap && !keyboardLabWrap && !ratingAdminRow && !gazetteAdminRow && !reportBtn && !homeAdminVersion) return;
    function showKeyboardLabOnly() {
      if (homeFooterVersion) homeFooterVersion.setAttribute("hidden", "hidden");
      renderHomeAdminIdentityStatus(true);
      if (keyboardLabWrap) keyboardLabWrap.classList.remove("footer-admin-visitors--hidden");
    }
    function showAdminUi() {
      try {
        var auth = window.__pokerTelegramAuth || {};
        auth.adminAccess = true;
        if (!auth.status) auth.status = "verified";
        window.__pokerTelegramAuth = auth;
      } catch (eAdminAuth) {}
      var footerStats = document.getElementById("footerVisitorStatsWrap");
      if (footerStats) footerStats.removeAttribute("hidden");
      if (homeFooterVersion) homeFooterVersion.setAttribute("hidden", "hidden");
      renderHomeAdminIdentityStatus(true);
      if (wrap) wrap.classList.remove("footer-admin-visitors--hidden");
      if (keyboardLabWrap) keyboardLabWrap.classList.remove("footer-admin-visitors--hidden");
      if (ratingAdminRow) ratingAdminRow.classList.remove("winter-rating__admin-row--hidden");
      if (window.updateRatingSubsCount) window.updateRatingSubsCount();
      if (gazetteAdminRow) gazetteAdminRow.classList.remove("gazette-admin-row--hidden");
      if (window.updateGazetteSubsCount) window.updateGazetteSubsCount();
      if (reportBtn) reportBtn.classList.remove("header-admin-report--hidden");
      if (typeof window.pokerInitAdminSectionViewsUi === "function") window.pokerInitAdminSectionViewsUi();
      if (typeof window.__pokerSyncRomanTaskPlanner === "function") window.__pokerSyncRomanTaskPlanner();
      try {
        if (typeof updateVisitorCounter === "function") updateVisitorCounter();
      } catch (eVisAd) {}
    }
    function pokerIsKnownClientAdmin() {
      try {
        var authFlag = window.__pokerTelegramAuth;
        if (authFlag && authFlag.adminAccess === true) return true;
        var recFlag = typeof pokerReadPwaTgSessionRecord === "function" ? pokerReadPwaTgSessionRecord() : null;
        if (recFlag && recFlag.adminAccess === true) return true;
      } catch (eFlag) {}
      var users = collectAdminIdentityCandidates();
      for (var i = 0; i < users.length; i++) {
        if (isKnownAdminUser(users[i])) return true;
      }
      return false;
    }
    // В локальной разработке всегда показываем кнопку админа,
    // чтобы можно было тестировать без Telegram initData.
    try {
      if (typeof window !== "undefined" && window.location && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
        showAdminUi();
        return;
      }
    } catch (e) {}
    if (typeof pokerShouldShowHomeTopVersionForSpecialUser === "function" && pokerShouldShowHomeTopVersionForSpecialUser()) {
      showKeyboardLabOnly();
    }
    if (pokerIsKnownClientAdmin()) {
      showAdminUi();
    }
    var base = getApiBase();
    if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return;
    var q = typeof pokerRafflesApiQueryLeading === "function" ? pokerRafflesApiQueryLeading() : "?initData=";
    fetch(base + "/api/visitors-list" + q)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data && data.ok && data.isAdmin) showAdminUi();
      })
      .catch(function () {});
    fetch(base + "/api/raffles" + q)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data && data.ok && data.isAdmin) showAdminUi();
      })
      .catch(function () {});
    renderHomeAdminIdentityStatus(false);
  }

  var MONTH_NAMES = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];
  function getMonthValue(d) {
    var y = d.getFullYear();
    var m = d.getMonth() + 1;
    return y + "-" + (m < 10 ? "0" + m : String(m));
  }
  function fillMonthFilterSelect() {
    var sel = document.getElementById("visitorsAdminMonthFilter");
    if (!sel) return;
    var d = new Date();
    sel.innerHTML = "";
    for (var i = 0; i < 12; i++) {
      var value = getMonthValue(d);
      var label = MONTH_NAMES[d.getMonth()] + " " + d.getFullYear();
      var opt = document.createElement("option");
      opt.value = value;
      opt.textContent = label;
      sel.appendChild(opt);
      d.setMonth(d.getMonth() - 1);
    }
    sel.value = getMonthValue(new Date());
  }
  function fetchVisitorsAdminStats(monthValue) {
    var elUnique = document.getElementById("visitorsAdminUnique");
    var elTotal = document.getElementById("visitorsAdminTotal");
    var elGazette = document.getElementById("visitorsAdminGazette");
    var elRating = document.getElementById("visitorsAdminRating");
    var elRaffle = document.getElementById("visitorsAdminRaffle");
    var base = getApiBase();
    if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return;
    var url = base + "/api/visitors-list" + (typeof pokerRafflesApiQueryLeading === "function" ? pokerRafflesApiQueryLeading() : "?initData=");
    fetch(url)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (!data || !data.ok || !data.isAdmin) return;
        visitorsAdminData = data;
        if (elUnique) elUnique.textContent = String(data.unique != null ? data.unique : data.uniqueThisMonth != null ? data.uniqueThisMonth : "—");
        if (elTotal) elTotal.textContent = String(data.total != null ? data.total : "—");
        if (elGazette) elGazette.textContent = String(data.gazetteSubscribers != null ? data.gazetteSubscribers : "—");
        if (elRating) elRating.textContent = String(data.ratingSubscribers != null ? data.ratingSubscribers : "—");
        if (elRaffle) elRaffle.textContent = String(data.raffleSubscribers != null ? data.raffleSubscribers : "—");
      })
      .catch(function () {});
  }
  function openVisitorsModal() {
    var modal = document.getElementById("visitorsAdminModal");
    var listWrap = document.getElementById("visitorsAdminListWrap");
    var listEl = document.getElementById("visitorsAdminList");
    var elUnique = document.getElementById("visitorsAdminUnique");
    var elTotal = document.getElementById("visitorsAdminTotal");
    var elGazette = document.getElementById("visitorsAdminGazette");
    var elRating = document.getElementById("visitorsAdminRating");
    var elRaffle = document.getElementById("visitorsAdminRaffle");
    if (!modal || !listWrap || !listEl) return;
    listWrap.classList.add("visitors-admin-modal__list-wrap--hidden");
    listEl.innerHTML = "";
    if (elUnique) elUnique.textContent = "—";
    if (elTotal) elTotal.textContent = "—";
    if (elGazette) elGazette.textContent = "—";
    if (elRating) elRating.textContent = "—";
    if (elRaffle) elRaffle.textContent = "—";
    visitorsAdminData = null;
    ["Visitors", "Gazette", "Rating", "Raffle"].forEach(function (name) {
      var btn = document.getElementById("visitorsAdminGroup" + name);
      updateGroupBtnState(btn, false);
    });
    modal.setAttribute("aria-hidden", "false");
    var base = getApiBase();
    if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return;
    fetchVisitorsAdminStats(null);
  }

  function closeVisitorsModal() {
    var modal = document.getElementById("visitorsAdminModal");
    if (modal) modal.setAttribute("aria-hidden", "true");
  }

  var selectedBroadcastGroups = [];
  function updateGroupBtnState(btn, pressed) {
    if (!btn) return;
    btn.setAttribute("aria-pressed", pressed ? "true" : "false");
    var check = btn.querySelector(".visitors-admin-modal__group-check");
    if (check) check.textContent = pressed ? "\u2611" : "\u2610";
  }
  function getSelectedBroadcastGroups() {
    var out = [];
    ["visitors", "gazette", "rating", "raffle"].forEach(function (g) {
      var btn = document.getElementById("visitorsAdminGroup" + (g.charAt(0).toUpperCase() + g.slice(1)));
      if (btn && btn.getAttribute("aria-pressed") === "true") out.push(g);
    });
    return out;
  }
  function openBroadcastModal() {
    selectedBroadcastGroups = getSelectedBroadcastGroups();
    if (selectedBroadcastGroups.length === 0) {
      var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (tg && tg.showAlert) tg.showAlert("Выберите хотя бы одну группу"); else alert("Выберите хотя бы одну группу");
      return;
    }
    var modal = document.getElementById("visitorsBroadcastModal");
    var hint = document.getElementById("visitorsBroadcastHint");
    var textEl = document.getElementById("visitorsBroadcastText");
    var fileEl = document.getElementById("visitorsBroadcastImageFile");
    var fileNameEl = document.getElementById("visitorsBroadcastFileName");
    if (hint)
      hint.textContent =
        "Выбрано групп: " +
        selectedBroadcastGroups.length +
        ", получателей: —, подписаны на бота: —, подписаны на канал: —";
    if (textEl) textEl.value = "";
    if (fileEl) { fileEl.value = ""; if (fileNameEl) fileNameEl.textContent = ""; }
    if (modal) modal.setAttribute("aria-hidden", "false");

    // Подсчитываем точное количество получателей через dryRun.
    try {
      var base = getApiBase();
      if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential() || !hint) return;
      var groupsForPayload = selectedBroadcastGroups;
      var month = groupsForPayload && groupsForPayload.indexOf("visitors") >= 0 ? "all" : undefined;
      var dryPayload =
        typeof pokerGuestOrAuthedPostBody === "function"
          ? pokerGuestOrAuthedPostBody({ groups: groupsForPayload, month: month, dryRun: true })
          : { groups: groupsForPayload, month: month, dryRun: true };
      fetch(base + "/api/send-bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dryPayload),
      })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (!data || !data.ok || data.total == null) return;
          // Цифры «на бота / на канал» осмыслены только для одной группы «Посетители»
          // (считаются по tg_ + visitor_dt_ids). Для газеты/рейтинга/розыгрыша и смесей — «—».
          var visitorsOnly =
            groupsForPayload.length === 1 && groupsForPayload.indexOf("visitors") >= 0;
          var botStr = "—";
          var channelStr = "—";
          if (visitorsOnly && data.total > 0) {
            botStr = String(data.botSubscribers != null ? data.botSubscribers : data.total);
            channelStr =
              data.channelSubscribers != null ? String(data.channelSubscribers) : "—";
          }
          hint.textContent =
            "Выбрано групп: " +
            groupsForPayload.length +
            ", получателей: " +
            data.total +
            ", подписаны на бота: " +
            botStr +
            ", подписаны на канал: " +
            channelStr;
        })
        .catch(function () {});
    } catch (e) {}
  }
  function closeBroadcastModal() {
    var modal = document.getElementById("visitorsBroadcastModal");
    if (modal) modal.setAttribute("aria-hidden", "true");
  }

  function openAdminPushModal() {
    var modal = document.getElementById("adminPushBroadcastModal");
    var titleEl = document.getElementById("adminPushTitleInput");
    var textEl = document.getElementById("adminPushBodyInput");
    var hint = document.getElementById("adminPushHint");
    if (titleEl) titleEl.value = "";
    if (textEl) textEl.value = "";
    if (hint) {
      hint.textContent =
        "Только для админов приложения; доставка на устройства с включённым пушем о чате (установленная PWA).";
    }
    if (modal) modal.setAttribute("aria-hidden", "false");
  }

  function closeAdminPushModal() {
    var modal = document.getElementById("adminPushBroadcastModal");
    if (modal) modal.setAttribute("aria-hidden", "true");
  }

  function sendAdminPush() {
    var titleEl = document.getElementById("adminPushTitleInput");
    var textEl = document.getElementById("adminPushBodyInput");
    var btn = document.getElementById("adminPushSendBtn");
    var hint = document.getElementById("adminPushHint");
    var title = (titleEl && titleEl.value) || "";
    title = String(title).trim();
    var text = (textEl && textEl.value) || "";
    text = String(text).trim();
    if (!title || !text) {
      var tgNeed = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (tgNeed && tgNeed.showAlert) tgNeed.showAlert("Укажите заголовок и текст пуша");
      else alert("Укажите заголовок и текст пуша");
      return;
    }
    var base = getApiBase();
    if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return;
    if (btn) {
      btn.disabled = true;
      if (btn.__adminPushLabel == null) btn.__adminPushLabel = btn.textContent ? btn.textContent.trim() : "Отправить";
      btn.textContent = "Отправка…";
    }
    if (hint) hint.textContent = "Отправляем…";
    fetch(base + "/api/chat-push-admin-send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokerApiAuthJsonBody({ title: title, text: text })),
    })
      .then(function (r) {
        return r.json();
      })
      .then(function (d) {
        if (btn) {
          btn.disabled = false;
          btn.textContent = btn.__adminPushLabel || "Отправить";
        }
        var tgw = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (d && d.ok) {
          if (hint) {
            hint.textContent =
              "Запрос выполнен. Уведомления получат админы с подпиской push (проверьте на устройстве).";
          }
          closeAdminPushModal();
          if (tgw && tgw.showAlert) tgw.showAlert("Пуш админам отправлен");
        } else {
          if (hint) hint.textContent = d && d.error ? d.error : "Ошибка";
          if (tgw && tgw.showAlert) tgw.showAlert(d && d.error ? d.error : "Ошибка");
          else alert(d && d.error ? d.error : "Ошибка");
        }
      })
      .catch(function () {
        if (btn) {
          btn.disabled = false;
          btn.textContent = btn.__adminPushLabel || "Отправить";
        }
        if (hint) hint.textContent = "Ошибка сети";
        var tgw = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tgw && tgw.showAlert) tgw.showAlert(typeof POKER_NET_ERR !== "undefined" ? POKER_NET_ERR : "Ошибка сети");
        else if (typeof POKER_NET_ERR !== "undefined") alert(POKER_NET_ERR);
      });
  }

  function ruPushCharsRemainLabel(remaining) {
    var n = Math.max(0, Math.floor(remaining));
    var w;
    if (n % 10 === 1 && n % 100 !== 11) w = "символ";
    else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) w = "символа";
    else w = "символов";
    return "Можно ввести ещё: " + n + " " + w;
  }
  function refreshAdminPushAllRemainInputs() {
    var tm = window.__adminPushAllTitleMax != null ? window.__adminPushAllTitleMax : 80;
    var bm = window.__adminPushAllBodyMax != null ? window.__adminPushAllBodyMax : 200;
    var t = document.getElementById("adminPushAllTitleInput");
    var b = document.getElementById("adminPushAllBodyInput");
    var tr = document.getElementById("adminPushAllTitleRemain");
    var br = document.getElementById("adminPushAllBodyRemain");
    if (t) {
      t.setAttribute("maxlength", String(tm));
      if (tr) tr.textContent = ruPushCharsRemainLabel(tm - (t.value || "").length);
    }
    if (b) {
      b.setAttribute("maxlength", String(bm));
      if (br) br.textContent = ruPushCharsRemainLabel(bm - (b.value || "").length);
    }
  }
  function closeAdminPushAllModal() {
    var modal = document.getElementById("adminChatPushAllModal");
    if (modal) modal.setAttribute("aria-hidden", "true");
  }
  function toggleAdminPushAllSubs() {
    var wrap = document.getElementById("adminPushAllSubsWrap");
    var listEl = document.getElementById("adminPushAllSubsList");
    var btn = document.getElementById("adminPushAllShowSubsBtn");
    if (!wrap || !listEl || !btn) return;
    var hidden = wrap.classList.contains("admin-chat-push-all__subs-wrap--hidden");
    if (hidden) {
      wrap.classList.remove("admin-chat-push-all__subs-wrap--hidden");
      wrap.setAttribute("aria-hidden", "false");
      btn.setAttribute("aria-expanded", "true");
      var subs = window.__adminPushAllSubs || [];
      if (!subs.length) {
        listEl.innerHTML = "<p class=\"admin-chat-push-all__subs-empty\">Нет активных подписчиков.</p>";
        return;
      }
      listEl.innerHTML = subs
        .map(function (s) {
          var d = esc(s.display != null ? s.display : s.memberId || "");
          var id = esc(s.memberId || "");
          return (
            '<div class="admin-chat-push-all__subs-item" role="listitem"><div>' +
            d +
            '</div><div class="admin-chat-push-all__subs-id">' +
            id +
            "</div></div>"
          );
        })
        .join("");
    } else {
      wrap.classList.add("admin-chat-push-all__subs-wrap--hidden");
      wrap.setAttribute("aria-hidden", "true");
      btn.setAttribute("aria-expanded", "false");
    }
  }
  function openAdminPushAllModal() {
    var modal = document.getElementById("adminChatPushAllModal");
    var titleEl = document.getElementById("adminPushAllTitleInput");
    var textEl = document.getElementById("adminPushAllBodyInput");
    var hint = document.getElementById("adminPushAllHint");
    var countEl = document.getElementById("adminPushAllCount");
    var wrap = document.getElementById("adminPushAllSubsWrap");
    var listEl = document.getElementById("adminPushAllSubsList");
    var toggleBtn = document.getElementById("adminPushAllShowSubsBtn");
    var targetSelect = document.getElementById("adminPushAllTargetSelect");
    if (titleEl) titleEl.value = "";
    if (textEl) textEl.value = "";
    if (targetSelect) targetSelect.value = "./?startapp=club_chat";
    window.__adminPushAllTitleMax = 80;
    window.__adminPushAllBodyMax = 200;
    window.__adminPushAllSubs = [];
    if (wrap) {
      wrap.classList.add("admin-chat-push-all__subs-wrap--hidden");
      wrap.setAttribute("aria-hidden", "true");
    }
    if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "false");
    if (listEl) listEl.innerHTML = "";
    if (countEl) countEl.textContent = "…";
    if (hint) {
      hint.textContent =
        "Пользователи с включёнными оповещениями о чате в профиле и сохранённой подпиской Web Push (PWA).";
    }
    refreshAdminPushAllRemainInputs();
    if (modal) modal.setAttribute("aria-hidden", "false");

    var base = getApiBase();
    if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
      if (countEl) countEl.textContent = "—";
      return;
    }
    var q = typeof pokerRafflesApiQueryLeading === "function" ? pokerRafflesApiQueryLeading() : "?initData=";
    fetch(base + "/api/chat-push-admin-broadcast" + q, { cache: "no-store" })
      .then(function (r) {
        return r.json();
      })
      .then(function (data) {
        if (!data || !data.ok) {
          if (countEl) countEl.textContent = "—";
          if (hint && data && data.error) hint.textContent = data.error;
          return;
        }
        window.__adminPushAllTitleMax = data.titleMax != null ? data.titleMax : 80;
        window.__adminPushAllBodyMax = data.bodyMax != null ? data.bodyMax : 200;
        window.__adminPushAllSubs = Array.isArray(data.subscribers) ? data.subscribers : [];
        if (countEl) countEl.textContent = String(data.count != null ? data.count : 0);
        var extra = "";
        if (data.pushConfigured === false) {
          extra = " На сервере не настроен VAPID — отправка не сработает.";
        }
        if (hint) {
          hint.textContent =
            "Пользователи с включёнными оповещениями о чате в профиле и сохранённой подпиской Web Push (PWA)." +
            extra;
        }
        refreshAdminPushAllRemainInputs();
      })
      .catch(function () {
        if (countEl) countEl.textContent = "—";
      });
  }
  function sendAdminPushAll() {
    var titleEl = document.getElementById("adminPushAllTitleInput");
    var textEl = document.getElementById("adminPushAllBodyInput");
    var targetSelect = document.getElementById("adminPushAllTargetSelect");
    var btn = document.getElementById("adminPushAllSendBtn");
    var hint = document.getElementById("adminPushAllHint");
    var title = (titleEl && titleEl.value) || "";
    title = String(title).trim();
    var text = (textEl && textEl.value) || "";
    text = String(text).trim();
    var openUrl = targetSelect && targetSelect.value ? String(targetSelect.value).trim() : "./?startapp=club_chat";
    if (!title || !text) {
      var tgNeed = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (tgNeed && tgNeed.showAlert) tgNeed.showAlert("Укажите заголовок и текст пуша");
      else alert("Укажите заголовок и текст пуша");
      return;
    }
    var base = getApiBase();
    if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return;
    if (btn) {
      btn.disabled = true;
      if (btn.__adminPushAllLabel == null) btn.__adminPushAllLabel = btn.textContent ? btn.textContent.trim() : "Отправить всем";
      btn.textContent = "Отправка…";
    }
    if (hint) hint.textContent = "Отправляем…";
    fetch(base + "/api/chat-push-admin-broadcast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokerApiAuthJsonBody({ title: title, text: text, openUrl: openUrl })),
    })
      .then(function (r) {
        return r.json();
      })
      .then(function (d) {
        if (btn) {
          btn.disabled = false;
          btn.textContent = btn.__adminPushAllLabel || "Отправить всем";
        }
        var tgw = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (d && d.ok) {
          var n = d.recipients != null ? d.recipients : "—";
          if (hint) hint.textContent = "Запрос выполнен. Активных подписчиков (по данным до отправки): " + n + ".";
          closeAdminPushAllModal();
          if (tgw && tgw.showAlert) tgw.showAlert("Пуш отправлен подписчикам чата");
        } else {
          if (hint) hint.textContent = d && d.error ? d.error : "Ошибка";
          if (tgw && tgw.showAlert) tgw.showAlert(d && d.error ? d.error : "Ошибка");
          else if (d && d.error) alert(d.error);
        }
      })
      .catch(function () {
        if (btn) {
          btn.disabled = false;
          btn.textContent = btn.__adminPushAllLabel || "Отправить всем";
        }
        if (hint) hint.textContent = "Ошибка сети";
        var tgw = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tgw && tgw.showAlert) tgw.showAlert(typeof POKER_NET_ERR !== "undefined" ? POKER_NET_ERR : "Ошибка сети");
        else if (typeof POKER_NET_ERR !== "undefined") alert(POKER_NET_ERR);
      });
  }

  function sendBroadcast() {
    var textEl = document.getElementById("visitorsBroadcastText");
    var fileEl = document.getElementById("visitorsBroadcastImageFile");
    var sendBtn = document.getElementById("visitorsBroadcastSendBtn");
    var sendBtnLabel = sendBtn && sendBtn.textContent ? sendBtn.textContent.trim() : "Отправить";
    var text = (textEl && textEl.value || "").trim();
    var file = fileEl && fileEl.files && fileEl.files[0];
    if (!text && !file) {
      var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (tg && tg.showAlert) tg.showAlert("Введите текст или прикрепите картинку"); else alert("Введите текст или прикрепите картинку");
      return;
    }
    var base = getApiBase();
    var groupsForPayload = getSelectedBroadcastGroups();
    var month = groupsForPayload && groupsForPayload.indexOf("visitors") >= 0 ? "all" : undefined;
    if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return;
    if (sendBtn) {
      sendBtn.disabled = true;
      sendBtn.textContent = "Отправляем…";
    }

    function restoreSendBtn() {
      if (sendBtn) {
        sendBtn.disabled = false;
        sendBtn.textContent = sendBtnLabel;
      }
    }

    var BROADCAST_RESUME_KEY = "poker_club_broadcast_resume_v1";
    function broadcastCampaignFingerprint(groups, monthVal, textVal, imageB64, imageMime) {
      var g = (groups || []).slice().sort().join(",");
      var imgSig =
        imageB64 && String(imageB64).length
          ? String(imageMime || "") + ":" + String(imageB64).length
          : "";
      return { groups: g, month: String(monthVal || ""), text: String(textVal || ""), imageSig: imgSig };
    }
    function broadcastFingerprintMatch(stored, fp) {
      return (
        stored &&
        fp &&
        stored.groups === fp.groups &&
        stored.month === fp.month &&
        stored.text === fp.text &&
        stored.imageSig === fp.imageSig
      );
    }
    function readBroadcastResume() {
      try {
        var raw = sessionStorage.getItem(BROADCAST_RESUME_KEY);
        if (!raw) return null;
        var o = JSON.parse(raw);
        if (!o || o.v !== 1 || typeof o.nextOffset !== "number" || typeof o.total !== "number") return null;
        return o;
      } catch (err) {
        return null;
      }
    }
    function writeBroadcastResume(fp, nextOff, tot, sentCum, failedCum) {
      try {
        sessionStorage.setItem(
          BROADCAST_RESUME_KEY,
          JSON.stringify({
            v: 1,
            groups: fp.groups,
            month: fp.month,
            text: fp.text,
            imageSig: fp.imageSig,
            nextOffset: nextOff,
            total: tot,
            sentSoFar: sentCum != null ? sentCum : 0,
            failedSoFar: failedCum != null ? failedCum : 0,
          })
        );
      } catch (err) {}
    }
    function clearBroadcastResume() {
      try {
        sessionStorage.removeItem(BROADCAST_RESUME_KEY);
      } catch (err) {}
    }

    function doSend(imageBase64, imageMimeType) {
      var BATCH_SIZE = 50;
      var sentAll = 0;
      var failedAll = 0;
      var total = 0;
      var fp = broadcastCampaignFingerprint(groupsForPayload, month, text, imageBase64, imageMimeType);

      function copyTg() {
        return window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      }

      function fetchTotalDryRun() {
        var dryBody =
          typeof pokerGuestOrAuthedPostBody === "function"
            ? pokerGuestOrAuthedPostBody({ groups: groupsForPayload, month: month, dryRun: true })
            : { groups: groupsForPayload, month: month, dryRun: true };
        return fetch(base + "/api/send-bulk", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dryBody),
        }).then(function (r) { return r.json(); });
      }

      function setBroadcastProgressBtn(to) {
        if (!sendBtn) return;
        sendBtn.textContent =
          "Отправляем… " +
          to +
          "/" +
          total +
          " (успешно: " +
          sentAll +
          ", ошибок: " +
          failedAll +
          ")";
      }

      function sendBatch(offset) {
        if (offset >= total) return Promise.resolve({ done: true });
        setBroadcastProgressBtn(Math.min(offset + BATCH_SIZE, total));
        var batchExtra = {
          groups: groupsForPayload,
          month: month,
          text: text,
          offset: offset,
          limit: BATCH_SIZE,
        };
        if (imageBase64) batchExtra.imageBase64 = imageBase64;
        if (imageMimeType) batchExtra.imageMimeType = imageMimeType;
        var payload =
          typeof pokerGuestOrAuthedPostBody === "function"
            ? pokerGuestOrAuthedPostBody(batchExtra)
            : batchExtra;
        return fetch(base + "/api/send-bulk", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
          .then(function (r) { return r.json(); })
          .then(function (data) {
            if (!data || !data.ok) throw new Error((data && data.error) || "Ошибка рассылки");
            sentAll += data.sent || 0;
            failedAll += data.failed || 0;
            writeBroadcastResume(fp, offset + BATCH_SIZE, total, sentAll, failedAll);
            setBroadcastProgressBtn(Math.min(offset + BATCH_SIZE, total));
            return { done: false, offset: offset + BATCH_SIZE };
          });
      }

      fetchTotalDryRun()
        .then(function (dryData) {
          var tg = copyTg();
          total = dryData && dryData.ok ? dryData.total || 0 : 0;
          if (!total) {
            restoreSendBtn();
            var msg0 = "Нет получателей в выбранных группах";
            if (tg && tg.showAlert) tg.showAlert(msg0); else alert(msg0);
            closeBroadcastModal();
            return;
          }
          var startOffset = 0;
          var stored = readBroadcastResume();
          if (stored && broadcastFingerprintMatch(stored, fp)) {
            if (stored.total !== total) {
              clearBroadcastResume();
            } else if (stored.nextOffset >= total) {
              clearBroadcastResume();
            } else if (stored.nextOffset > 0) {
              startOffset = stored.nextOffset;
              sentAll = typeof stored.sentSoFar === "number" ? stored.sentSoFar : 0;
              failedAll = typeof stored.failedSoFar === "number" ? stored.failedSoFar : 0;
            }
          }
          function loop(offset) {
            return sendBatch(offset).then(function (res) {
              if (res && res.done) return res;
              return loop(res.offset);
            });
          }
          return loop(startOffset);
        })
        .then(function () {
          if (!total) return;
          clearBroadcastResume();
          restoreSendBtn();
          var tg = copyTg();
          var msg =
            "Получателей: " + total +
            ". Отправлено: " + sentAll +
            ", ошибок: " + failedAll +
            " (пакетами по " + BATCH_SIZE + ")";
          if (tg && tg.showAlert) tg.showAlert(msg); else alert(msg);
          closeBroadcastModal();
        })
        .catch(function (e) {
          restoreSendBtn();
          var tg = copyTg();
          var msgErr = (e && e.message ? e.message : "Ошибка рассылки") +
            " Прогресс сохранён: при том же тексте и группах следующая отправка продолжит с места остановки.";
          if (tg && tg.showAlert) tg.showAlert(msgErr); else alert(msgErr);
        });
    }
    if (file) {
      var reader = new FileReader();
      reader.onload = function () {
        var dataUrl = reader.result;
        var match = typeof dataUrl === "string" && dataUrl.match(/^data:([^;]+);base64,(.+)$/);
        var mime = (match && match[1]) || "image/jpeg";
        var base64 = (match && match[2]) || "";
        doSend(base64, mime);
      };
      reader.onerror = function () {
        restoreSendBtn();
        var t = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (t && t.showAlert) t.showAlert("Не удалось прочитать файл"); else alert("Не удалось прочитать файл");
      };
      reader.readAsDataURL(file);
    } else {
      doSend();
    }
  }

  function renderVisitorsList() {
    var listWrap = document.getElementById("visitorsAdminListWrap");
    var listEl = document.getElementById("visitorsAdminList");
    if (!listWrap || !listEl || !visitorsAdminData || !visitorsAdminData.visitors) return;
    listWrap.classList.remove("visitors-admin-modal__list-wrap--hidden");
    var authQ = typeof pokerRafflesApiQueryLeading === "function" ? pokerRafflesApiQueryLeading() : "?initData=";
    var hasAuth = typeof pokerApiHasCredential === "function" && pokerApiHasCredential();
    var base = getApiBase();
    var visitors = visitorsAdminData.visitors;
    listEl.innerHTML = "";
    visitors.forEach(function (v) {
      var isTg = v.id && v.id.indexOf("tg_") === 0;
      var channelSpan = "Подписан на канал клуба: <span class=\"visitors-admin-item__channel\" data-user-id=\"" + esc(v.id) + "\">—</span>";
      if (!isTg) channelSpan = "Подписан на канал: —";
      var botSpan = " Подписан на бота: проверяется отправкой сообщения.";
      var sendBlock = "";
      if (isTg) {
        sendBlock =
          "<div class=\"visitors-admin-item__send\">" +
          "<input type=\"text\" class=\"visitors-admin-item__input\" placeholder=\"Сообщение...\" maxlength=\"4000\" data-user-id=\"" + esc(v.id) + "\" />" +
          "<button type=\"button\" class=\"visitors-admin-item__send-btn\" data-user-id=\"" + esc(v.id) + "\">Отправить</button>" +
          "</div>";
      }
      var row =
        "<div class=\"visitors-admin-item\" data-user-id=\"" + esc(v.id) + "\">" +
        "<div class=\"visitors-admin-item__row\">" +
        "<span class=\"visitors-admin-item__id\">" + esc(v.id) + "</span> " +
        (v.username && !pokerHideRomanTelegramUsername(v.username) ? "<span class=\"visitors-admin-item__meta\">@" + esc(v.username) + "</span>" : "") + " " +
        (v.dtId ? "<span class=\"visitors-admin-item__badge\">" + esc(v.dtId) + "</span>" : "") + " " +
        "<span class=\"visitors-admin-item__meta\">визитов: " + esc(v.count) + "</span>" +
        "</div>" +
        (isTg ? "<div class=\"visitors-admin-item__row\">" + channelSpan + "." + botSpan + "</div>" : "") +
        sendBlock +
        "</div>";
      listEl.insertAdjacentHTML("beforeend", row);
    });
    if (base && hasAuth) {
      listEl.querySelectorAll(".visitors-admin-item__channel[data-user-id]").forEach(function (el) {
        var uid = el.getAttribute("data-user-id");
        if (!uid) return;
        fetch(base + "/api/visitor-telegram-status" + authQ + "&userId=" + encodeURIComponent(uid))
          .then(function (r) { return r.json(); })
          .then(function (d) {
            if (d && d.ok) {
              if (d.channelSubscribedUnknown) el.textContent = "?";
              else el.textContent = d.channelSubscribed ? "да" : "нет";
              el.classList.add(d.channelSubscribed ? "visitors-admin-item__badge--yes" : "visitors-admin-item__badge--no");
            }
          })
          .catch(function () { el.textContent = "—"; });
      });
    }
    listEl.querySelectorAll(".visitors-admin-item__send-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var uid = btn.getAttribute("data-user-id");
        var input = listEl.querySelector(".visitors-admin-item__input[data-user-id=\"" + uid + "\"]");
        var text = (input && input.value || "").trim();
        if (!text || !base || !hasAuth) return;
        if (!btn.__visitorsSendLabel) btn.__visitorsSendLabel = btn.textContent || "Отправить";
        btn.disabled = true;
        btn.textContent = "Отправляем…";
        var sendBody =
          typeof pokerGuestOrAuthedPostBody === "function"
            ? pokerGuestOrAuthedPostBody({ user_id: uid, text: text })
            : { user_id: uid, text: text };
        fetch(base + "/api/send-to-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sendBody),
        })
          .then(function (r) { return r.json(); })
          .then(function (d) {
            btn.disabled = false;
            btn.textContent = btn.__visitorsSendLabel || "Отправить";
            var tgw = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
            if (d && d.ok) {
              if (input) input.value = "";
            } else {
              if (tgw && tgw.showAlert) tgw.showAlert(d && d.error ? d.error : "Ошибка отправки");
              else alert(d && d.error ? d.error : "Ошибка отправки");
            }
          })
          .catch(function () {
            btn.disabled = false;
            btn.textContent = btn.__visitorsSendLabel || "Отправить";
            var tgw = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
            if (tgw && tgw.showAlert) tgw.showAlert(POKER_NET_ERR);
            else alert(POKER_NET_ERR);
          });
      });
    });
    var modalBox = listWrap.closest(".visitors-admin-modal__box");
    if (modalBox && listWrap.scrollIntoView) {
      setTimeout(function () {
        listWrap.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  }

  function pokerInitVisitorsAdminUi() {
    checkAdminAndShowVisitorsButton();
    var btn = document.getElementById("adminVisitorsBtn");
    if (btn && btn.dataset.visitorsAdminBound !== "1") {
      btn.dataset.visitorsAdminBound = "1";
      btn.addEventListener("click", openVisitorsModal);
    }
    var modal = document.getElementById("visitorsAdminModal");
    if (modal && modal.dataset.visitorsAdminModalBound === "1") return;
    if (modal) modal.dataset.visitorsAdminModalBound = "1";
    var showListBtn = document.getElementById("visitorsAdminShowListBtn");
    var closeBtn = document.getElementById("visitorsAdminModalClose");
    var backdrop = document.getElementById("visitorsAdminModalBackdrop");
    var broadcastBtn = document.getElementById("visitorsAdminBroadcastBtn");
    var broadcastModalClose = document.getElementById("visitorsBroadcastModalClose");
    var broadcastModalBackdrop = document.getElementById("visitorsBroadcastModalBackdrop");
    var broadcastSendBtn = document.getElementById("visitorsBroadcastSendBtn");
    if (showListBtn) showListBtn.addEventListener("click", renderVisitorsList);
    if (closeBtn) closeBtn.addEventListener("click", closeVisitorsModal);
    if (backdrop) backdrop.addEventListener("click", closeVisitorsModal);
    if (broadcastBtn) broadcastBtn.addEventListener("click", openBroadcastModal);
    if (broadcastModalClose) broadcastModalClose.addEventListener("click", closeBroadcastModal);
    if (broadcastModalBackdrop) broadcastModalBackdrop.addEventListener("click", closeBroadcastModal);
    if (broadcastSendBtn) broadcastSendBtn.addEventListener("click", sendBroadcast);
    var adminPushBtn = document.getElementById("adminPushToAdminsBtn");
    var adminPushClose = document.getElementById("adminPushBroadcastModalClose");
    var adminPushBackdrop = document.getElementById("adminPushBroadcastModalBackdrop");
    var adminPushSend = document.getElementById("adminPushSendBtn");
    if (adminPushBtn) adminPushBtn.addEventListener("click", openAdminPushModal);
    if (adminPushClose) adminPushClose.addEventListener("click", closeAdminPushModal);
    if (adminPushBackdrop) adminPushBackdrop.addEventListener("click", closeAdminPushModal);
    if (adminPushSend) adminPushSend.addEventListener("click", sendAdminPush);
    var adminPushAllOpenBtn = document.getElementById("adminPushToAllChatSubsBtn");
    var adminPushAllClose = document.getElementById("adminChatPushAllModalClose");
    var adminPushAllBackdrop = document.getElementById("adminChatPushAllModalBackdrop");
    var adminPushAllSend = document.getElementById("adminPushAllSendBtn");
    var adminPushAllShowSubs = document.getElementById("adminPushAllShowSubsBtn");
    var adminPushAllTitleInp = document.getElementById("adminPushAllTitleInput");
    var adminPushAllBodyInp = document.getElementById("adminPushAllBodyInput");
    if (adminPushAllOpenBtn) adminPushAllOpenBtn.addEventListener("click", openAdminPushAllModal);
    if (adminPushAllClose) adminPushAllClose.addEventListener("click", closeAdminPushAllModal);
    if (adminPushAllBackdrop) adminPushAllBackdrop.addEventListener("click", closeAdminPushAllModal);
    if (adminPushAllSend) adminPushAllSend.addEventListener("click", sendAdminPushAll);
    if (adminPushAllShowSubs) adminPushAllShowSubs.addEventListener("click", toggleAdminPushAllSubs);
    if (adminPushAllTitleInp) {
      adminPushAllTitleInp.addEventListener("input", refreshAdminPushAllRemainInputs);
      adminPushAllTitleInp.addEventListener("keyup", refreshAdminPushAllRemainInputs);
    }
    if (adminPushAllBodyInp) {
      adminPushAllBodyInp.addEventListener("input", refreshAdminPushAllRemainInputs);
      adminPushAllBodyInp.addEventListener("keyup", refreshAdminPushAllRemainInputs);
    }
    try {
      window.pokerRecheckAdminFooter = checkAdminAndShowVisitorsButton;
    } catch (eExp) {}
    var broadcastFileEl = document.getElementById("visitorsBroadcastImageFile");
    var broadcastFileNameEl = document.getElementById("visitorsBroadcastFileName");
    if (broadcastFileEl && broadcastFileNameEl) {
      broadcastFileEl.addEventListener("change", function () {
        var f = this.files && this.files[0];
        broadcastFileNameEl.textContent = f ? f.name : "";
      });
    }
    ["Visitors", "Gazette", "Rating", "Raffle"].forEach(function (name) {
      var groupBtn = document.getElementById("visitorsAdminGroup" + name);
      if (groupBtn) {
        groupBtn.addEventListener("click", function () {
          var pressed = this.getAttribute("aria-pressed") !== "true";
          updateGroupBtnState(this, pressed);
        });
      }
    });
  }

  window.pokerInitVisitorsAdminUi = pokerInitVisitorsAdminUi;
  window.pokerRenderHomeAdminIdentityStatus = renderHomeAdminIdentityStatus;
  window.addEventListener("poker-telegram-auth", checkAdminAndShowVisitorsButton);
  window.addEventListener("poker-admin-access", checkAdminAndShowVisitorsButton);
  window.addEventListener("pageshow", checkAdminAndShowVisitorsButton);
  setTimeout(checkAdminAndShowVisitorsButton, 500);
  setTimeout(checkAdminAndShowVisitorsButton, 1500);
  setTimeout(checkAdminAndShowVisitorsButton, 3500);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", pokerInitVisitorsAdminUi);
  } else {
    pokerInitVisitorsAdminUi();
  }
})();

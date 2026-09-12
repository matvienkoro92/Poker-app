function initTrackingLinksAdminModal() {
  var openBtn = document.getElementById("adminTrackingLinksBtn");
  var modal = document.getElementById("trackingLinksAdminModal");
  var closeBtn = document.getElementById("trackingLinksAdminModalClose");
  var backdrop = document.getElementById("trackingLinksAdminModalBackdrop");
  var createBtn = document.getElementById("trackingLinksCreateBtn");
  var labelInput = document.getElementById("trackingLinksLabelInput");
  var paramsInput = document.getElementById("trackingLinksParamsInput");
  var createMsg = document.getElementById("trackingLinksCreateMsg");
  var newUrlWrap = document.getElementById("trackingLinksNewUrlWrap");
  var newUrlInput = document.getElementById("trackingLinksNewUrlInput");
  var copyBtn = document.getElementById("trackingLinksCopyUrlBtn");
  var tbody = document.getElementById("trackingLinksAdminTableBody");
  var visModal = document.getElementById("trackingLinksVisitorsModal");
  var visBackdrop = document.getElementById("trackingLinksVisitorsModalBackdrop");
  var visClose = document.getElementById("trackingLinksVisitorsModalClose");
  var visBack = document.getElementById("trackingLinksVisitorsBackBtn");
  var visTitle = document.getElementById("trackingLinksVisitorsTitle");
  var visTbody = document.getElementById("trackingLinksVisitorsTableBody");
  if (!openBtn || !modal || !tbody) return;
  if (openBtn.dataset.trackingLinksBound === "1") return;
  openBtn.dataset.trackingLinksBound = "1";

  function esc(s) {
    if (s == null) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escAttr(s) {
    if (s == null) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/\r|\n/g, " ");
  }

  var TRACKING_ACTION_LABELS = {
    "view:home": "Экран: главная",
    "view:chat": "Экран: чат",
    "view:download": "Экран: скачать",
    "view:cashout": "Экран: касса",
    "view:profile": "Экран: профиль",
    "view:spring-rating": "Экран: рейтинг весны",
    "view:summer-rating": "Экран: рейтинг лета",
    "view:winter-rating": "Экран: рейтинг зимы",
    "view:schedule": "Экран: расписание",
    "view:raffles": "Экран: розыгрыши",
    "view:streams": "Экран: стримы",
    "view:equilator": "Экран: эквилятор",
    "view:video-lessons": "Экран: видеокурс — 1 урок бесплатно, 17 уроков за 3 000 ₽ (тренер Николай FishKopcheny)",
    "deep:vl_reviews_nikolay": "Deep link: отзывы о тренере Николае FishKopcheny",
    "view:poker-tasks": "Экран: задачи",
    "view:bonus-game": "Экран: бонус-игра",
    "view:plasterer-game": "Экран: штукатур",
    "view:cooler-game": "Экран: кулер",
    "view:learn-play-hub": "Экран: научиться играть",
    "view:news": "Экран: новости",
    "view:hall": "Экран: зал славы",
    "view:tasks": "Экран: задания",
  };

  function formatActivityCell(activity) {
    if (!activity || typeof activity.total !== "number" || activity.total < 1 || !activity.counts) {
      return "<span class=\"tracking-links-admin__no-activity\">нет действий</span>";
    }
    var keys = Object.keys(activity.counts).sort(function (a, b) {
      return (activity.counts[b] || 0) - (activity.counts[a] || 0);
    });
    var lines = keys.map(function (k) {
      var n = activity.counts[k];
      var lab = TRACKING_ACTION_LABELS[k];
      if (!lab) {
        if (k.indexOf("open:") === 0) lab = "Клик → " + k.slice(5); else lab = k;
      }
      return esc(lab) + " <strong>×" + n + "</strong>";
    });
    return (
      "<div class=\"tracking-links-admin__act-block\"><div class=\"tracking-links-admin__act-total\">всего <strong>" +
      activity.total +
      "</strong></div>" +
      lines.join("<br>") +
      (activity.lastAt
        ? "<div class=\"tracking-links-admin__act-last\">посл. " + esc(activity.lastAt) + "</div>"
        : "") +
      "</div>"
    );
  }

  function copyUrlWithFeedback(text) {
    if (!text) return;
    if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
    function done(ok) {
      var tgLocal = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (tgLocal && tgLocal.showAlert) tgLocal.showAlert(ok ? "Ссылка скопирована" : "Не удалось скопировать");
      else if (!ok) alert("Не удалось скопировать");
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(function () {
          done(true);
        })
        .catch(function () {
          done(false);
        });
    } else {
      try {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        done(true);
      } catch (e) {
        done(false);
      }
    }
  }

  function buildStartUrl(startParam) {
    var u = getAppBaseUrlForLinks();
    u = String(u).replace(/\/$/, "");
    var sep = u.indexOf("?") >= 0 ? "&" : "?";
    return u + sep + "startapp=" + encodeURIComponent(startParam);
  }

  function closeVisitorsModal() {
    if (visModal) {
      visModal.setAttribute("aria-hidden", "true");
    }
  }

  function closeMainModal() {
    modal.setAttribute("aria-hidden", "true");
    if (document.body) document.body.style.overflow = "";
    closeVisitorsModal();
  }

  function openMainModal() {
    if (typeof window.pokerEnsureVisitorsAdminAccess === "function") {
      window.pokerEnsureVisitorsAdminAccess().then(function (allowed) {
        if (allowed) openMainModalChecked();
      });
      return;
    }
    openMainModalChecked();
  }

  function openMainModalChecked() {
    modal.setAttribute("aria-hidden", "false");
    if (document.body) document.body.style.overflow = "hidden";
    if (createMsg) {
      createMsg.textContent = "";
      createMsg.classList.remove("tracking-links-admin__create-msg--err");
    }
    if (newUrlWrap) newUrlWrap.classList.add("tracking-links-admin__new-url-wrap--hidden");
    if (newUrlInput) newUrlInput.value = "";
    if (labelInput) labelInput.value = "";
    if (paramsInput) paramsInput.value = "";
    ["Source", "Medium", "Campaign", "Content"].forEach(function (key) {
      var field = document.getElementById("trackingLinks" + key + "Input");
      if (field) field.value = "";
    });
    var landing = document.getElementById("trackingLinksLandingInput");
    if (landing) landing.value = "home";
    loadLinks();
  }

  function loadLinks() {
    tbody.innerHTML = "<tr><td colspan=\"7\">Загрузка…</td></tr>";
    var base = getApiBase();
    if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
      tbody.innerHTML = "<tr><td colspan=\"7\">Нет сессии. Войдите в Telegram или PWA.</td></tr>";
      return;
    }
    var q = typeof pokerRafflesApiQueryLeading === "function" ? pokerRafflesApiQueryLeading() : "?initData=";
    fetch(base + "/api/tracking-links" + q)
      .then(function (r) {
        return r.json();
      })
      .then(function (data) {
        if (!data || !data.ok || !Array.isArray(data.links)) {
          tbody.innerHTML = "<tr><td colspan=\"7\">Нет данных</td></tr>";
          return;
        }
        if (data.links.length === 0) {
          tbody.innerHTML = "<tr><td colspan=\"7\">Пока нет ссылок — создайте первую.</td></tr>";
          return;
        }
        tbody.innerHTML = data.links
          .map(function (link) {
            var title = (link.label && String(link.label).trim()) || link.id;
            var pj = JSON.stringify(link.params && typeof link.params === "object" ? link.params : {});
            var paramLine = pj.length > 56 ? pj.slice(0, 56) + "…" : pj;
            var total = link.totalClicks != null ? link.totalClicks : 0;
            var uniq = link.uniqueClicks != null ? link.uniqueClicks : 0;
            var activeV = link.activeVisitors != null ? link.activeVisitors : 0;
            var evN = link.actionEvents != null ? link.actionEvents : 0;
            var startParam = "ref_" + link.id;
            var fullUrl = buildStartUrl(startParam);
            var copyText = fullUrl || startParam;
            var displayText = fullUrl || startParam + " — укажите data-telegram-app-url в index.html";
            return (
              "<tr data-tracking-id=\"" +
              esc(link.id) +
              "\">" +
              "<td class=\"tracking-links-admin__cell-label\">" +
              esc(title) +
              "<span class=\"tracking-links-admin__cell-sub\">ref_" +
              esc(link.id) +
              "</span>" +
              (paramLine !== "{}"
                ? "<span class=\"tracking-links-admin__cell-sub\">" + esc(paramLine) + "</span>"
                : "") +
              "</td>" +
              "<td class=\"tracking-links-admin__cell-url\">" +
              "<button type=\"button\" class=\"tracking-links-admin__url-copy-btn\" data-url=\"" +
              escAttr(copyText) +
              "\" title=\"Нажмите, чтобы скопировать\">" +
              esc(displayText) +
              "</button></td>" +
              "<td>" +
              total +
              "</td>" +
              "<td>" +
              uniq +
              "</td>" +
              "<td title=\"Уникальные посетители с хотя бы одним действием после перехода\">" +
              activeV +
              "</td>" +
              "<td title=\"Сумма событий (переходы по экранам и клики)\">" +
              evN +
              "</td>" +
              "<td><button type=\"button\" class=\"visitors-admin-modal__show-btn primary-button tracking-links-admin__who-btn\" data-tracking-who=\"" +
              esc(link.id) +
              "\">Пути лидов</button></td>" +
              "</tr>"
            );
          })
          .join("");
      })
      .catch(function () {
        tbody.innerHTML = "<tr><td colspan=\"7\">Ошибка загрузки</td></tr>";
      });
  }

  var journeySlug = "", journeyOffset = null, journeyRows = [], journeyGeneration = 0, journeyTotal = 0;
  var journeyList = document.getElementById("trackingLinksJourneyList");
  var journeySummary = document.getElementById("trackingLinksJourneySummary");
  var journeyMore = document.getElementById("trackingLinksJourneyMore");
  var eventNames = { session_started: "Вход в приложение", section_opened: "Открыт раздел", registration_completed: "Регистрация завершена", deposit_confirmed: "Депозит в CRM", telegram_linked: "Привязан Telegram", email_linked: "Привязана почта", poker21_linked: "Привязан игровой аккаунт", referral_opened: "Переход по ссылке", raffle_joined: "Участие в розыгрыше", sng_joined: "Запись в турнир" };
  function dateLabel(at) { return new Date(at).toLocaleString("ru-RU"); }
  function moneyLabel(value) { return Number(value || 0).toLocaleString("ru-RU") + " ₽"; }
  function journeyRequest(params) {
    var q = typeof pokerRafflesApiQueryLeading === "function" ? pokerRafflesApiQueryLeading() : "?";
    return fetch(getApiBase() + "/api/tracking-links" + q + "&id=" + encodeURIComponent(journeySlug) + params)
      .then(function (r) { if (!r.ok) throw new Error("request_failed"); return r.json(); })
      .then(function (d) { if (!d.ok) throw new Error("request_failed"); return d; });
  }
  function renderJourneyRows() {
    var registered = journeyRows.filter(function (r) { return r.status === "new"; }).length;
    var linked = journeyRows.filter(function (r) { return r.pokerId; }).length;
    var depositors = journeyRows.filter(function (r) { return r.depositCount > 0; }).length;
    var acquired = journeyRows.filter(function (r) { return r.context.first.ref === journeySlug; });
    var amount = journeyRows.reduce(function (sum, r) { return sum + r.depositAmount; }, 0);
    journeySummary.textContent = "Посетители: " + journeyRows.length + " из " + journeyTotal + ". Регистрации после прихода: " + registered + ". С игровым ID: " + linked +
      ". Первый источник: " + acquired.length + ". С депозитом: " + depositors + " · " + moneyLabel(amount) +
      ". Конверсия первого источника в депозит: " + (acquired.length ? (depositors / acquired.length * 100).toFixed(1) + "%" : "—") +
      ". Итоги по загруженным людям. Депозиты — из доступного CRM-журнала после первого прихода, относятся к первому источнику. Полнота зависит от журнала.";
    journeyList.innerHTML = journeyRows.map(function (r) {
      var c = r.context;
      var status = { guest: "Гость", returning: "Аккаунт зарегистрирован до прихода", new: "Регистрация после прихода", unknown: "Дата регистрации неизвестна" }[r.status];
      return '<article class="tracking-journey"><h3>' + esc(r.accountId || "Гость · " + r.actor) + '</h3><p>' + esc(status) +
        (r.pokerId ? " · Игровой ID: " + esc(r.pokerId) : "") + '</p><p>Первый источник: <strong>' + esc(c.first.label || c.first.ref) +
        '</strong> · ' + esc(dateLabel(c.first.at)) + '<br>Последний источник: <strong>' + esc(c.last.label || c.last.ref) +
        '</strong> · ' + esc(dateLabel(c.last.at)) + '</p><p>Депозиты: <strong>' + esc(moneyLabel(r.depositAmount)) +
        '</strong> · ' + r.depositCount + ' шт.</p>' + (r.deposits.length ? '<ul>' + r.deposits.map(function (d) {
          return '<li>' + esc(dateLabel(d.at)) + ' — ' + esc(moneyLabel(d.amount)) + '</li>';
        }).join('') + '</ul>' : '') + '<button type="button" class="primary-button" data-journey-actor="' + escAttr(r.actor) + '">Показать путь</button><ol class="tracking-journey__events"></ol></article>';
    }).join("");
  }
  function loadJourneys(offset) {
    var generation = journeyGeneration;
    if (journeyMore) journeyMore.disabled = true;
    journeyRequest("&journey=1&offset=" + offset).then(function (d) {
      if (generation !== journeyGeneration) return;
      journeyTotal = d.total || 0;
      journeyRows = journeyRows.concat(d.rows || []);
      journeyOffset = d.nextOffset;
      renderJourneyRows();
      if (!journeyRows.length) journeySummary.textContent = "Новая история пока пуста. Она появится после входов по ссылке с обновлённой версией приложения. Старые переходы доступны ниже.";
      if (journeyMore) { journeyMore.hidden = journeyOffset == null; journeyMore.disabled = false; }
    }).catch(function () {
      if (generation !== journeyGeneration) return;
      journeySummary.textContent = "Не удалось загрузить историю. Нажмите «Повторить».";
      if (journeyMore) { journeyMore.hidden = false; journeyMore.disabled = false; journeyMore.textContent = "Повторить"; }
    });
  }
  if (journeyMore) journeyMore.addEventListener("click", function () { loadJourneys(journeyOffset || 0); });
  if (journeyList) journeyList.addEventListener("click", function (ev) {
    var button = ev.target.closest("[data-journey-actor]");
    if (!button || button.disabled) return;
    var generation = journeyGeneration;
    button.disabled = true;
    var actor = button.getAttribute("data-journey-actor");
    journeyRequest("&timeline=1&actor=" + encodeURIComponent(actor) + "&cursor=" + encodeURIComponent(button.dataset.cursor || "0"))
      .then(function (d) {
        if (generation !== journeyGeneration) return;
        button._events = (button._events || []).concat(d.events || []);
        var seen = {};
        button._events = button._events.filter(function (e) { if (seen[e.id]) return false; seen[e.id] = true; return true; });
        button._events.sort(function (a, b) { return a.at - b.at; });
        button.nextElementSibling.innerHTML = button._events.map(function (e) {
          var sectionLabel = TRACKING_ACTION_LABELS["view:" + e.section] || e.section;
          return '<li>' + esc(dateLabel(e.at)) + ' · ' + esc(eventNames[e.type] || e.type) + (e.amount ? ' · ' + esc(moneyLabel(e.amount)) : '') + (e.section ? " · " + esc(sectionLabel) : "") + ' <small>ref_' + esc(e.ref) + '</small></li>';
        }).join("");
        button.dataset.cursor = d.cursor || "";
        button.disabled = !d.cursor;
        button.textContent = d.cursor ? "Загрузить ещё действия" : "Вся сохранённая история загружена";
      }).catch(function () { button.disabled = false; button.textContent = "Повторить загрузку пути"; });
  });

  function openVisitorsForId(slug, labelText) {
    if (!visModal || !visTbody) return;
    journeySlug = slug; journeyOffset = 0; journeyRows = []; journeyGeneration += 1;
    if (journeyList) journeyList.innerHTML = "";
    if (journeySummary) journeySummary.textContent = "Загрузка истории…";
    if (journeyMore) { journeyMore.hidden = true; journeyMore.textContent = "Ещё посетители"; }
    if (journeyList && journeySummary) loadJourneys(0);
    visTbody.innerHTML = "<tr><td colspan=\"4\">Загрузка…</td></tr>";
    if (visTitle) visTitle.textContent = labelText ? "Пути лидов: " + labelText : "Пути лидов";
    visModal.setAttribute("aria-hidden", "false");
    var base = getApiBase();
    if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
      visTbody.innerHTML = "<tr><td colspan=\"4\">Нет сессии</td></tr>";
      return;
    }
    var q = typeof pokerRafflesApiQueryLeading === "function" ? pokerRafflesApiQueryLeading() : "?initData=";
    fetch(base + "/api/tracking-links" + q + "&id=" + encodeURIComponent(slug) + "&visitors=1")
      .then(function (r) {
        return r.json();
      })
      .then(function (data) {
        if (!data || !data.ok || !Array.isArray(data.visitors)) {
          visTbody.innerHTML = "<tr><td colspan=\"4\">Нет данных</td></tr>";
          return;
        }
        if (data.visitors.length === 0) {
          visTbody.innerHTML = "<tr><td colspan=\"4\">Пока никто не переходил</td></tr>";
          return;
        }
        visTbody.innerHTML = data.visitors
          .map(function (v) {
            var parts = [];
            if (v.firstName) parts.push(v.firstName);
            if (v.username && !pokerHideRomanTelegramUsername(v.username)) parts.push("@" + v.username);
            var nameCol = parts.length ? parts.join(" · ") : "—";
            var act = formatActivityCell(v.activity);
            return (
              "<tr><td>" +
              esc(v.t || "") +
              "</td><td>" +
              esc(v.visitorId || "") +
              "</td><td>" +
              esc(nameCol) +
              "</td><td class=\"tracking-links-admin__cell-activity\">" +
              act +
              "</td></tr>"
            );
          })
          .join("");
      })
      .catch(function () {
        visTbody.innerHTML = "<tr><td colspan=\"4\">Ошибка загрузки</td></tr>";
      });
  }

  openBtn.addEventListener("click", openMainModal);
  if (closeBtn) closeBtn.addEventListener("click", closeMainModal);
  if (backdrop) backdrop.addEventListener("click", closeMainModal);
  if (visClose) visClose.addEventListener("click", closeVisitorsModal);
  if (visBackdrop) visBackdrop.addEventListener("click", closeVisitorsModal);
  if (visBack) {
    visBack.addEventListener("click", function () {
      closeVisitorsModal();
    });
  }

  tbody.addEventListener("click", function (ev) {
    var t = ev.target;
    if (!t || !t.getAttribute) return;
    var urlBtn = t.closest && t.closest(".tracking-links-admin__url-copy-btn");
    if (urlBtn) {
      var urlToCopy = urlBtn.getAttribute("data-url");
      if (urlToCopy) copyUrlWithFeedback(urlToCopy);
      return;
    }
    var btn = t.closest && t.closest("[data-tracking-who]");
    if (!btn) return;
    var id = btn.getAttribute("data-tracking-who");
    if (!id) return;
    var row = btn.closest("tr");
    var firstTd = row && row.querySelector(".tracking-links-admin__cell-label");
    var labelText = firstTd ? firstTd.childNodes[0].textContent.trim() : id;
    openVisitorsForId(id, labelText);
  });

  if (createBtn) {
    createBtn.addEventListener("click", function () {
      if (createMsg) {
        createMsg.textContent = "";
        createMsg.classList.remove("tracking-links-admin__create-msg--err");
      }
      var base = getApiBase();
      if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
        if (createMsg) {
          createMsg.textContent = "Нет сессии. Войдите в Telegram или PWA.";
          createMsg.classList.add("tracking-links-admin__create-msg--err");
        }
        return;
      }
      var label = labelInput ? labelInput.value.trim() : "";
      var paramsRaw = paramsInput ? paramsInput.value.trim() : "";
      var paramsPayload = {};
      if (paramsRaw) {
        try {
          paramsPayload = JSON.parse(paramsRaw);
          if (!paramsPayload || typeof paramsPayload !== "object" || Array.isArray(paramsPayload)) {
            throw new Error("not_object");
          }
        } catch (e) {
          if (createMsg) {
            createMsg.textContent = "Параметры: введите корректный JSON-объект, например {\"utm\":\"story\"}";
            createMsg.classList.add("tracking-links-admin__create-msg--err");
          }
          return;
        }
      }
      [["Source", "utm_source"], ["Medium", "utm_medium"], ["Campaign", "utm_campaign"], ["Content", "utm_content"]].forEach(function (pair) {
        var field = document.getElementById("trackingLinks" + pair[0] + "Input");
        if (field && field.value.trim()) paramsPayload[pair[1]] = field.value.trim();
      });
      var landingField = document.getElementById("trackingLinksLandingInput");
      if (landingField && !paramsPayload.target_startapp && !paramsPayload.target_view && !paramsPayload.target_url) paramsPayload.target_view = landingField.value;
      createBtn.disabled = true;
      var createBody =
        typeof pokerGuestOrAuthedPostBody === "function"
          ? pokerGuestOrAuthedPostBody({ label: label, params: paramsPayload })
          : { label: label, params: paramsPayload };
      fetch(base + "/api/tracking-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createBody),
      })
        .then(function (r) {
          return r.json();
        })
        .then(function (data) {
          createBtn.disabled = false;
          if (!data || !data.ok || !data.startParam) {
            if (createMsg) {
              createMsg.textContent = (data && data.error) || "Не удалось создать";
              createMsg.classList.add("tracking-links-admin__create-msg--err");
            }
            return;
          }
          var url = buildStartUrl(data.startParam);
          if (createMsg) createMsg.textContent = "Ссылка создана.";
          if (newUrlWrap && newUrlInput) {
            newUrlWrap.classList.remove("tracking-links-admin__new-url-wrap--hidden");
            newUrlInput.value = url || data.startParam;
          }
          loadLinks();
        })
        .catch(function () {
          createBtn.disabled = false;
          if (createMsg) {
            createMsg.textContent = "Ошибка сети";
            createMsg.classList.add("tracking-links-admin__create-msg--err");
          }
        });
    });
  }

  if (copyBtn && newUrlInput) {
    copyBtn.addEventListener("click", function () {
      var text = newUrlInput.value;
      if (!text) return;
      copyUrlWithFeedback(text);
    });
  }
}
window.pokerInitTrackingLinksAdminModal = initTrackingLinksAdminModal;
initTrackingLinksAdminModal();

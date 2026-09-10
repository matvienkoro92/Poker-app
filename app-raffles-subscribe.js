// Raffles subscribe runtime: user subscribe/unsubscribe button.

function initRafflesSubscribeRuntime(opts) {
  initRafflesTournamentPush();
  opts = opts || {};
  with (opts) {
  // Подписка на уведомления о новых розыгрышах
  (function initRafflesSubscribe() {
    var raffleSubscribeInlineBtn = document.getElementById("raffleSubscribeInlineBtn");
    var raffleSubscribeButtons = [];
    if (rafflesSubscribeBtn) raffleSubscribeButtons.push(rafflesSubscribeBtn);
    if (raffleSubscribeInlineBtn && raffleSubscribeInlineBtn !== rafflesSubscribeBtn) {
      raffleSubscribeButtons.push(raffleSubscribeInlineBtn);
    }
    if (!raffleSubscribeButtons.length) return;
    var RAFFLE_SUBSCRIBED_KEY = "poker_raffles_subscribed";
    function forEachRaffleSubscribeButton(callback) {
      raffleSubscribeButtons.forEach(function (btn) {
        if (btn) callback(btn);
      });
    }
    function setRaffleSubscribeState(subscribed) {
      forEachRaffleSubscribeButton(function (btn) {
        btn.disabled = false;
        btn.textContent = subscribed ? "Отписаться" : "Подписаться";
        btn.dataset.subscribed = subscribed ? "1" : "0";
      });
    }
    function setRaffleSubscribePending() {
      forEachRaffleSubscribeButton(function (btn) {
        btn.disabled = true;
        btn.textContent = "Подписываем…";
      });
    }
    function openRaffleSubscribeBotLink(data) {
      var url = data && data.openUrl ? String(data.openUrl) : "";
      if (!url && data && data.botUrl) url = String(data.botUrl);
      if (!url && data && data.code === "BOT_REQUIRED") url = "https://t.me/Poker_dvatuza_bot";
      if (!url) return false;
      try {
        if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      } catch (eExpand) {}
      try {
        var tgOpen = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tgOpen && typeof tgOpen.openTelegramLink === "function") {
          tgOpen.openTelegramLink(url);
          return true;
        }
      } catch (eTgOpen) {}
      try {
        if (typeof window.open === "function") {
          window.open(url, "_blank");
          return true;
        }
      } catch (eWindowOpen) {}
      try {
        window.location.href = url;
        return true;
      } catch (eLocation) {}
      return false;
    }
    try {
      setRaffleSubscribeState(localStorage.getItem(RAFFLE_SUBSCRIBED_KEY) === "1");
    } catch (e) {
      setRaffleSubscribeState(false);
    }
    forEachRaffleSubscribeButton(function (subscribeBtn) {
      if (subscribeBtn.getAttribute("data-raffle-subscribe-bound") === "1") return;
      subscribeBtn.setAttribute("data-raffle-subscribe-bound", "1");
      subscribeBtn.addEventListener("click", function () {
      var tgLocal = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      var baseUrl = getApiBase();
      if (!baseUrl) {
        if (tgLocal && tgLocal.showAlert) tgLocal.showAlert("Не задан адрес API.");
        else alert("Не задан адрес API.");
        return;
      }
      if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
        if (tgLocal && tgLocal.showAlert) {
          tgLocal.showAlert(
            "Войдите в приложение (Telegram в мини‑аппе или через кнопку входа на сайте), чтобы подписаться."
          );
        } else {
          alert("Войдите в приложение, чтобы подписаться.");
        }
        return;
      }
      var subscribed = subscribeBtn.dataset.subscribed === "1";
      var payload =
        typeof pokerApiAuthJsonBody === "function"
          ? pokerApiAuthJsonBody({ unsubscribe: subscribed })
          : { initData: (tgLocal && tgLocal.initData) || initData || "", unsubscribe: subscribed };
      if (!payload.initData && !payload.pwaSession && !payload.pwaVkSession) {
        if (tgLocal && tgLocal.showAlert) tgLocal.showAlert("Не удалось определить аккаунт. Обновите страницу или войдите снова.");
        else alert("Не удалось определить аккаунт. Обновите страницу или войдите снова.");
        return;
      }
      setRaffleSubscribePending();
      fetch(baseUrl.replace(/\/$/, "") + "/api/raffle-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(function (r) {
          return r.json().catch(function () {
            return { ok: false, error: "Ошибка ответа сервера" };
          });
        })
        .then(function (data) {
          if (data && data.ok) {
            try {
              localStorage.setItem(RAFFLE_SUBSCRIBED_KEY, data.subscribed ? "1" : "0");
            } catch (e) {}
            try {
              window.dispatchEvent(new CustomEvent("poker-raffle-subscription-change", { detail: data }));
            } catch (eSubEvent) {}
            setRaffleSubscribeState(!!data.subscribed);
            if (data.subscribed && typeof window.playPokerSubscribeSound === "function") window.playPokerSubscribeSound();
            var tgNow = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
            if (tgNow && tgNow.showAlert) {
              tgNow.showAlert(
                data.subscribed
                  ? "Подписка оформлена. Уведомления о новых розыгрышах будут приходить в Telegram."
                  : "Вы отписаны от уведомлений о розыгрышах."
              );
            } else {
              alert(data.subscribed ? "Подписка оформлена." : "Вы отписаны.");
            }
          } else {
            var msg = (data && data.error) || "Ошибка. Попробуйте позже.";
            var tgNow2 = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
            if (tgNow2 && tgNow2.showAlert) tgNow2.showAlert(msg);
            else alert(msg);
            if (data && data.code === "BOT_REQUIRED") openRaffleSubscribeBotLink(data);
            setRaffleSubscribeState(subscribed);
          }
        })
        .catch(function () {
          var tgNow3 = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          if (tgNow3 && tgNow3.showAlert) tgNow3.showAlert(POKER_NET_ERR);
          else alert(POKER_NET_ERR);
          setRaffleSubscribeState(subscribed);
        })
        .finally(function () {
          forEachRaffleSubscribeButton(function (btn) {
            btn.disabled = false;
          });
        });
      });
    });
  })();
  }
}

function initRafflesTournamentPush() {
  var btn = document.getElementById("rafflesTournamentPushBtn");
  if (!btn || btn.dataset.bound === "1") return;
  btn.dataset.bound = "1";
  var label = document.getElementById("rafflesTournamentPushLabel");
  var feedback = document.getElementById("rafflesTournamentPushFeedback");
  var subscribed = false;
  var busy = false;
  var generation = 0;
  function message(text) { feedback.textContent = text || ""; feedback.hidden = !text; }
  function render(value) {
    subscribed = !!value;
    btn.textContent = subscribed ? "Включено" : "Включить";
    btn.setAttribute("aria-label", subscribed ? "Пуши включены. Нажмите, чтобы отключить" : "Включить пуши о старте турнирных розыгрышей");
    btn.setAttribute("aria-pressed", subscribed ? "true" : "false");
    label.textContent = subscribed ? "Пуш о старте турнирных розыгрышей включён" : "Включите пуш о старте турнирных розыгрышей";
  }
  function authenticated() { return typeof pokerApiHasCredential === "function" && pokerApiHasCredential(); }
  function request(action) {
    var base = typeof getApiBase === "function" ? getApiBase() : "";
    if (!base) return Promise.reject(new Error("Не удалось подключиться. Обновите страницу."));
    return fetch(base.replace(/\/$/, "") + "/api/raffle-tournament-push", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokerApiAuthJsonBody({ action: action })),
    }).then(function (r) { return r.json(); }).then(function (data) {
      if (!data || !data.ok) throw new Error(data && data.error || "Не удалось сохранить подписку. Попробуйте ещё раз.");
      return data;
    });
  }
  function refresh() {
    if (busy) return;
    var revision = ++generation;
    if (!authenticated()) { render(false); return; }
    request("status").then(function (data) {
      if (revision !== generation) return;
      render(data.subscribed);
      if (data.subscribed && !data.notificationsEnabled) message("Подписка сохранена. Чтобы получать пуши, включите уведомления в профиле.");
      else if (data.subscribed && !data.hasSubscription) message("Подписка сохранена. Настройте пуш-уведомления в профиле на вашем устройстве.");
      else message("");
    }).catch(function () { if (revision === generation) message("Не удалось проверить подписку. Попробуйте ещё раз."); });
  }
  btn.addEventListener("click", function () {
    if (busy) return;
    if (!authenticated()) { message("Войдите в аккаунт, чтобы включить уведомления о розыгрышах."); return; }
    busy = true; ++generation; btn.disabled = true; message("");
    // Read the account state again, so another device or a failed initial request cannot toggle the wrong state.
    request("status").then(function (current) {
      render(current.subscribed);
      if (!current.subscribed) {
        if (!current.notificationsEnabled) throw new Error("Включите уведомления в профиле, затем вернитесь сюда и нажмите «Включить».");
        if (typeof pokerChatPushIosNeedsStandalonePwa === "function" && pokerChatPushIosNeedsStandalonePwa()) throw new Error("На iPhone или iPad добавьте приложение на экран «Домой», откройте его оттуда и включите уведомления в профиле.");
        if (typeof pokerChatPushClientSupported !== "function" || !pokerChatPushClientSupported()) throw new Error("Здесь пуши недоступны. Откройте приложение в поддерживаемом браузере или с экрана «Домой» и включите уведомления в профиле.");
        if (typeof Notification !== "undefined" && Notification.permission === "denied") throw new Error("Уведомления запрещены. Разрешите их в настройках браузера или устройства, затем включите пуши в профиле.");
        if (typeof Notification === "undefined" || Notification.permission !== "granted") throw new Error("Откройте профиль, включите пуш-уведомления и подтвердите разрешение браузера. Затем нажмите здесь «Включить».");
        return navigator.serviceWorker.getRegistration().then(function (registration) {
          return registration && registration.pushManager ? registration.pushManager.getSubscription() : null;
        }).then(function (deviceSubscription) {
          if (!deviceSubscription) throw new Error("На этом устройстве пуши ещё не настроены. Включите уведомления в профиле, затем вернитесь сюда.");
          return request("enable");
        });
      }
      return request("disable");
    }).then(function (data) {
      render(data.subscribed);
      message(data.subscribed ? "Готово! При создании турнирного розыгрыша вам придёт пуш, если уведомления включены в профиле." : "Пуши о старте турнирных розыгрышей выключены.");
    }).catch(function (e) { message(e.message || "Ошибка сети. Попробуйте ещё раз."); })
      .finally(function () { busy = false; btn.disabled = false; });
  });
  window.addEventListener("poker-telegram-auth", refresh);
  window.addEventListener("focus", refresh);
  document.addEventListener("visibilitychange", function () { if (!document.hidden) refresh(); });
  refresh();
}

// Raffles subscribe runtime: user subscribe/unsubscribe button.

function initRafflesSubscribeRuntime(opts) {
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

// Raffles subscribe runtime: user subscribe/unsubscribe button.

function initRafflesSubscribeRuntime(opts) {
  opts = opts || {};
  with (opts) {
  // Подписка на уведомления о новых розыгрышах
  (function initRafflesSubscribe() {
    if (!rafflesSubscribeBtn) return;
    var RAFFLE_SUBSCRIBED_KEY = "poker_raffles_subscribed";
    function setRaffleSubscribeState(subscribed) {
      rafflesSubscribeBtn.disabled = false;
      rafflesSubscribeBtn.textContent = subscribed ? "Отписаться" : "Подписаться";
      rafflesSubscribeBtn.dataset.subscribed = subscribed ? "1" : "0";
    }
    try {
      setRaffleSubscribeState(localStorage.getItem(RAFFLE_SUBSCRIBED_KEY) === "1");
    } catch (e) {
      setRaffleSubscribeState(false);
    }
    rafflesSubscribeBtn.addEventListener("click", function () {
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
      var subscribed = rafflesSubscribeBtn.dataset.subscribed === "1";
      var payload =
        typeof pokerApiAuthJsonBody === "function"
          ? pokerApiAuthJsonBody({ unsubscribe: subscribed })
          : { initData: (tgLocal && tgLocal.initData) || initData || "", unsubscribe: subscribed };
      if (!payload.initData && !payload.pwaSession && !payload.pwaVkSession) {
        if (tgLocal && tgLocal.showAlert) tgLocal.showAlert("Не удалось определить аккаунт. Обновите страницу или войдите снова.");
        else alert("Не удалось определить аккаунт. Обновите страницу или войдите снова.");
        return;
      }
      rafflesSubscribeBtn.disabled = true;
      rafflesSubscribeBtn.textContent = "Подписываем…";
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
            setRaffleSubscribeState(!!data.subscribed);
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
          rafflesSubscribeBtn.disabled = false;
        });
    });
  })();
  }
}

// Raffles broadcast runtime: admin subscriber broadcast, reports, retry, and purge tools.

function initRafflesBroadcastRuntime(opts) {
  opts = opts || {};
  with (opts) {
  /** Разбор JSON от raffle-manual-subscribers; при HTML/таймауте — понятная ошибка */
  function raffleManualSubscribersParseResponse(r) {
    return r.text().then(function (t) {
      try {
        return JSON.parse(t);
      } catch (e) {
        return {
          ok: false,
          error:
            "Ответ не JSON" +
            (!r.ok ? " (HTTP " + r.status + ")" : "") +
            ". Часто это таймаут — рассылка могла выполниться частично. Нажмите «Отчёт последней рассылки»." +
            (t ? " Фрагмент: " + String(t).slice(0, 100) : ""),
        };
      }
    });
  }

  /** Поля для POST raffle-manual-subscribers (текущий активный розыгрыш в форме) */
  function raffleManualBroadcastBodyFromCurrentRaffle() {
    var endDate =
      currentRaffleData && currentRaffleData.endDate
        ? currentRaffleData.endDate
        : undefined;
    function pluralizeTickets(n) {
      var v = Math.abs(n) % 100;
      var d = v % 10;
      if (v >= 11 && v <= 19) return "билетов";
      if (d === 1) return "билет";
      if (d >= 2 && d <= 4) return "билета";
      return "билетов";
    }
    function pluralizeCashBuyins(n) {
      var v = Math.abs(n) % 100;
      var d = v % 10;
      if (v >= 11 && v <= 19) return "беккинг-байинов";
      if (d === 1) return "беккинг-байин";
      if (d >= 2 && d <= 4) return "беккинг-байина";
      return "беккинг-байинов";
    }
    var isCashPrize =
      typeof pokerRafflesIsCashPrize === "function" &&
      currentRaffleData &&
      pokerRafflesIsCashPrize(currentRaffleData);
    var ticketCount = 0;
    // Разбивка по номиналам (например: 3 за 1000 и 12 за 300)
    var nominalToCount = {};
    try {
      var groups =
        currentRaffleData && Array.isArray(currentRaffleData.groups)
          ? currentRaffleData.groups
          : [];
      for (var gi = 0; gi < groups.length; gi++) {
        var c = Math.max(0, parseInt(groups[gi].count, 10) || 0);
        ticketCount += c;
        var n = parsePrizeValue(groups[gi].prize);
        if (n > 0 && c > 0) {
          nominalToCount[n] = (nominalToCount[n] || 0) + c;
        }
      }
    } catch (e) {}
    var broadcastText = "";
    var nominalKeys = Object.keys(nominalToCount);
    if (ticketCount > 0 && nominalKeys.length) {
      // Для одного номинала оставляем старый формат
      if (nominalKeys.length === 1) {
        var nominalOnly = Number(nominalKeys[0]) || 0;
        var ticketNominalText = nominalOnly > 0 ? formatRaffleSum(nominalOnly) : "";
        if (ticketNominalText) {
          broadcastText = isCashPrize
            ? "Разыгрывается " + ticketCount + " " + pluralizeCashBuyins(ticketCount) + " на кеш за " + ticketNominalText + ". Столы Бонус гейм на Poker21."
            : "Разыгрывается " + ticketCount + " " + pluralizeTickets(ticketCount) + " за " + ticketNominalText + ".";
        }
      } else {
        // Составляем breakdown в порядке убывания номинала (обычно 1000, потом 300)
        nominalKeys
          .map(function (k) { return Number(k) || 0; })
          .filter(function (n) { return n > 0; })
          .sort(function (a, b) { return b - a; });
        var parts = nominalKeys
          .map(function (k) {
            var nominal = Number(k) || 0;
            return nominal > 0
              ? { nominal: nominal, count: nominalToCount[nominal] || 0 }
              : null;
          })
          .filter(function (x) { return x && x.count > 0; })
          .sort(function (a, b) { return b.nominal - a.nominal; })
          .map(function (p) {
            return p.count + " за " + formatRaffleSum(p.nominal);
          });
        if (parts.length) {
          var breakdownText = parts.length === 2 ? parts[0] + " и " + parts[1] : parts.slice(0, -1).join(", ") + " и " + parts[parts.length - 1];
          broadcastText = isCashPrize
            ? "Разыгрывается " +
              ticketCount +
              " " +
              pluralizeCashBuyins(ticketCount) +
              " на кеш: " +
              breakdownText +
              ". Столы Бонус гейм на Poker21."
            : "Разыгрывается " +
              ticketCount +
              " " +
              pluralizeTickets(ticketCount) +
              ": " +
              breakdownText +
              ".";
        }
      }
    }
    return {
      endDate: endDate,
      message: broadcastText || undefined,
      prizeKind: isCashPrize ? "cash" : "tournament_ticket",
      ticketsCount: ticketCount || undefined,
      // ticketPrice может не использоваться на сервере, но оставляем для совместимости: первый номинал
      ticketPrice:
        nominalKeys && nominalKeys.length ? Number(nominalKeys[0]) || undefined : undefined,
    };
  }

  // Админская рассылка подписчикам розыгрышей
  window.updateRaffleSubsCount = function () {
    if (!rafflesNotifySubsBtn) return;
    if (!base || !pokerApiHasCredential()) return;
    fetch(base + "/api/raffle-manual-subscribers?stats=1" + pokerRafflesApiQueryLeading().replace("?", "&"))
      .then(function (r) {
        if (!r.ok) return Promise.reject(new Error("http " + r.status));
        return r.json();
      })
      .then(function (data) {
        if (!data || !data.ok || typeof data.total !== "number") return;
        var total = data.total;
        var baseText = "Разослать подписчикам розыгрыша";
        var current = rafflesNotifySubsBtn.textContent || baseText;
        var idx = current.indexOf(" (");
        if (idx !== -1) current = current.slice(0, idx);
        rafflesNotifySubsBtn.textContent = current + " (" + total + ")";
      })
      .catch(function () {});
  };

  (function initRafflesSubscribersAdminNotify() {
    if (!rafflesNotifySubsBtn) return;
    rafflesNotifySubsBtn.addEventListener("click", function () {
      if (window.__pokerRaffleSubsBroadcastInFlight) return;
      if (!base || !pokerApiHasCredential()) {
        if (tg && tg.showAlert) tg.showAlert("Войдите в приложение (Telegram или PWA).");
        return;
      }
      window.__pokerRaffleSubsBroadcastInFlight = true;
      var btn = rafflesNotifySubsBtn;
      var originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Рассылаем…";
      if (rafflesNotifySubsHint) rafflesNotifySubsHint.textContent = "";
      var extra = raffleManualBroadcastBodyFromCurrentRaffle();
      var broadcastIdemKey =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : String(Date.now()) + "_" + Math.random().toString(36).slice(2, 11);
      fetch(base + "/api/raffle-manual-subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          Object.assign(pokerGuestOrAuthedPostBody({}), extra, {
            broadcastIdempotencyKey: broadcastIdemKey,
          })
        ),
      })
        .then(raffleManualSubscribersParseResponse)
        .then(function (data) {
          if (rafflesNotifySubsHint) {
            rafflesNotifySubsHint.classList.remove("raffles-admin-hint--pre");
          }
          if (data && data.ok) {
            var sent =
              data && typeof data.sent === "number" && data.sent >= 0 ? data.sent : 0;
            var total =
              data && typeof data.total === "number" && data.total >= 0
                ? data.total
                : 0;
            var failN =
              data && typeof data.failuresTotal === "number" && data.failuresTotal > 0
                ? data.failuresTotal
                : 0;
            if (rafflesNotifySubsHint) {
              var warn =
                data && data.warning
                  ? " " + data.warning
                  : "";
              rafflesNotifySubsHint.textContent =
                "Личные сообщения отправлены: " +
                sent +
                " из " +
                total +
                (data && data.retry ? " (досылка тем, кому не дошло)." : " подписчиков розыгрыша.") +
                (failN
                  ? " Не доставлено (ошибка Telegram): " + failN + ". Подробности — «Отчёт последней рассылки»."
                  : "") +
                warn;
            }
          } else if (rafflesNotifySubsHint) {
            rafflesNotifySubsHint.textContent =
              "Ошибка рассылки: " +
              (data && data.error ? data.error : "не удалось отправить") +
              " Если был таймаут — откройте «Отчёт последней рассылки».";
          }
        })
        .catch(function () {
          if (rafflesNotifySubsHint) rafflesNotifySubsHint.textContent = POKER_NET_ERR;
        })
        .finally(function () {
          window.__pokerRaffleSubsBroadcastInFlight = false;
          btn.disabled = false;
          btn.textContent = originalText;
        });
    });
  })();

  (function initRafflesLastBroadcastReport() {
    if (!rafflesLastBroadcastReportBtn) return;
    function formatLastBroadcastReport(last) {
      if (!last)
        return (
          "Нет сохранённого отчёта. Он появится после рассылки на сервере с поддержкой отчётов (или Redis недоступен)."
        );
      var lines = [];
      lines.push("Время старта рассылки (UTC): " + (last.at || "—"));
      if (last.inProgress) {
        lines.push(
          "⚠ Неполный отчёт (обрыв по таймауту или рассылка ещё шла): обработано " +
            (last.processed != null ? last.processed : "—") +
            " из " +
            (last.total != null ? last.total : "—")
        );
      }
      lines.push(
        "Успешных отправок (ответ Telegram ok): " +
          (last.sent != null ? last.sent : "—") +
          " из " +
          (last.total != null ? last.total : "—")
      );
      var fails = last.failures || [];
      if (fails.length) {
        lines.push("Chat ID — причина (не доставлено):");
        for (var fi = 0; fi < fails.length; fi++) {
          lines.push(
            "  " + fails[fi].chatId + " — " + (fails[fi].hint || "")
          );
        }
      } else {
        lines.push(
          "Список сбоев пуст (всем ответил ok или подписчиков не было)."
        );
      }
      if (last.failuresTruncated)
        lines.push("… в отчёте обрезано ещё ошибок: " + last.failuresTruncated);
      lines.push("");
      if (Array.isArray(last.successfulChatIds)) {
        lines.push(
          "В отчёте сохранены успешные chat_id — досылка идёт всем текущим подписчикам, кроме них (заблокировавших бота не беспокоим)."
        );
      } else {
        lines.push(
          "Старый отчёт: успешные id не сохранены — досылка только по списку ошибок (кроме user_blocked)."
        );
      }
      lines.push(
        "Сбойные id см. выше. Текст рассылки берётся из последнего отчёта."
      );
      return lines.join("\n");
    }
    rafflesLastBroadcastReportBtn.addEventListener("click", function () {
      if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
        if (tg && tg.showAlert) tg.showAlert("Войдите в приложение (Telegram или PWA).");
        return;
      }
      var btn = rafflesLastBroadcastReportBtn;
      btn.disabled = true;
      if (rafflesNotifySubsHint) {
        rafflesNotifySubsHint.textContent = "Загружаем отчёт…";
        rafflesNotifySubsHint.classList.add("raffles-admin-hint--pre");
      }
      var q = typeof pokerRafflesApiQueryLeading === "function" ? pokerRafflesApiQueryLeading() : "?initData=";
      fetch(base + "/api/raffle-manual-subscribers?lastLog=1" + q.replace("?", "&"))
        .then(raffleManualSubscribersParseResponse)
        .then(function (data) {
          if (!data || !data.ok) {
            if (rafflesNotifySubsHint) {
              rafflesNotifySubsHint.classList.remove("raffles-admin-hint--pre");
              rafflesNotifySubsHint.textContent =
                "Не удалось загрузить отчёт: " +
                (data && data.error ? data.error : "ошибка");
            }
            return;
          }
          var text = formatLastBroadcastReport(data.last);
          if (rafflesNotifySubsHint) {
            rafflesNotifySubsHint.textContent = text;
            rafflesNotifySubsHint.classList.add("raffles-admin-hint--pre");
          }
        })
        .catch(function () {
          if (rafflesNotifySubsHint) {
            rafflesNotifySubsHint.classList.remove("raffles-admin-hint--pre");
            rafflesNotifySubsHint.textContent = POKER_NET_ERR;
          }
        })
        .finally(function () {
          btn.disabled = false;
        });
    });
  })();

  (function initRafflesRetryFailedBroadcast() {
    if (!rafflesRetryFailedBroadcastBtn) return;
    function runRetryFailedBroadcast() {
      if (window.__pokerRaffleSubsBroadcastInFlight) return;
      if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
        if (tg && tg.showAlert && typeof isTelegramWebApp === "function" && isTelegramWebApp()) tg.showAlert("Войдите в приложение (Telegram или PWA).");
        else showRaffleFeedback("Войдите в приложение (Telegram или PWA).", "err");
        return;
      }
      window.__pokerRaffleSubsBroadcastInFlight = true;
      var btn = rafflesRetryFailedBroadcastBtn;
      var originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Шлём повтор…";
      if (rafflesNotifySubsHint) {
        rafflesNotifySubsHint.classList.remove("raffles-admin-hint--pre");
        rafflesNotifySubsHint.textContent = "";
      }
      var extra = raffleManualBroadcastBodyFromCurrentRaffle();
      var retryIdemKey =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : String(Date.now()) + "_" + Math.random().toString(36).slice(2, 11);
      var payload = Object.assign(pokerGuestOrAuthedPostBody({ retryFailedOnly: true }), extra, {
        broadcastIdempotencyKey: retryIdemKey,
      });
      fetch(base + "/api/raffle-manual-subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(raffleManualSubscribersParseResponse)
        .then(function (data) {
          if (rafflesNotifySubsHint) {
            rafflesNotifySubsHint.classList.remove("raffles-admin-hint--pre");
          }
          if (data && data.ok) {
            var sent =
              data && typeof data.sent === "number" && data.sent >= 0 ? data.sent : 0;
            var total =
              data && typeof data.total === "number" && data.total >= 0
                ? data.total
                : 0;
            var failN =
              data && typeof data.failuresTotal === "number" && data.failuresTotal > 0
                ? data.failuresTotal
                : 0;
            if (rafflesNotifySubsHint) {
              var warn =
                data && data.warning
                  ? " " + data.warning
                  : "";
              rafflesNotifySubsHint.textContent =
                "Досылка (кому не дошло): отправлено " +
                sent +
                " из " +
                total +
                "." +
                (failN
                  ? " Снова не доставлено: " + failN + ". Смотрите «Отчёт последней рассылки»."
                  : "") +
                warn;
            }
          } else if (rafflesNotifySubsHint) {
            rafflesNotifySubsHint.textContent =
              "Повтор не выполнен: " +
              (data && data.error ? data.error : "ошибка");
          }
        })
        .catch(function () {
          if (rafflesNotifySubsHint) rafflesNotifySubsHint.textContent = POKER_NET_ERR;
        })
        .finally(function () {
          window.__pokerRaffleSubsBroadcastInFlight = false;
          btn.disabled = false;
          btn.textContent = originalText;
        });
    }
    rafflesRetryFailedBroadcastBtn.addEventListener("click", function () {
      var msg =
        "Дослать тем же текстом всем из списка подписчиков, кому в прошлый раз не было успешной доставки (в т.ч. если оборвалось по таймауту)? Заблокировавших бота пропускаем.";
      confirmRaffleAdminAction(msg, function () {
        runRetryFailedBroadcast();
      });
    });
  })();

  (function initRafflesPurgeBlockedSubscribers() {
    if (!rafflesPurgeBlockedSubsBtn) return;
    function runPurge() {
      if (!base || typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) {
        if (tg && tg.showAlert && typeof isTelegramWebApp === "function" && isTelegramWebApp()) tg.showAlert("Войдите в приложение (Telegram или PWA).");
        else showRaffleFeedback("Войдите в приложение (Telegram или PWA).", "err");
        return;
      }
      var btn = rafflesPurgeBlockedSubsBtn;
      var originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Проверяем…";
      if (rafflesNotifySubsHint) {
        rafflesNotifySubsHint.classList.remove("raffles-admin-hint--pre");
        rafflesNotifySubsHint.textContent = "";
      }
      fetch(base + "/api/raffle-manual-subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pokerGuestOrAuthedPostBody({ purgeBlockedSubscribers: true })),
      })
        .then(raffleManualSubscribersParseResponse)
        .then(function (data) {
          if (data && data.ok && data.purgeBlocked) {
            var rem = typeof data.remaining === "number" ? data.remaining : "—";
            var rm = typeof data.removed === "number" ? data.removed : "—";
            var chk = typeof data.checked === "number" ? data.checked : "—";
            if (rafflesNotifySubsHint) {
              rafflesNotifySubsHint.textContent =
                "Проверено записей: " +
                chk +
                ". Удалено из подписчиков (бот заблокирован / чат недоступен): " +
                rm +
                ". Осталось в списке: " +
                rem +
                ".";
              if (data.rateLimitedHint) {
                rafflesNotifySubsHint.textContent += " " + data.rateLimitedHint;
              }
            }
            if (typeof window.updateRaffleSubsCount === "function") {
              window.updateRaffleSubsCount();
            }
            if (tg && tg.showAlert) {
              tg.showAlert(
                "Готово. Удалено: " + rm + ". Сейчас подписчиков в базе: " + rem + "."
              );
            }
          } else if (rafflesNotifySubsHint) {
            rafflesNotifySubsHint.textContent =
              "Очистка не выполнена: " +
              (data && data.error ? data.error : "ошибка");
          }
        })
        .catch(function () {
          if (rafflesNotifySubsHint) rafflesNotifySubsHint.textContent = POKER_NET_ERR;
        })
        .finally(function () {
          btn.disabled = false;
          btn.textContent = originalText;
        });
    }
    rafflesPurgeBlockedSubsBtn.addEventListener("click", function () {
      var msg =
        "Проверить всех подписчиков розыгрышей через Telegram и удалить из списка тех, кто заблокировал бота или недоступен? Счётчик «Разослать подписчикам (N)» обновится.";
      confirmRaffleAdminAction(msg, function () {
        runPurge();
      });
    });
  })();
  }
}

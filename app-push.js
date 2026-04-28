function pokerIsPwaDisplayStandalone() {
  try {
    if (window.__pokerDisplayStandaloneBoot === true) return true;
    if (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) return true;
    if (window.matchMedia && window.matchMedia("(display-mode: minimal-ui)").matches) return true;
    if (window.matchMedia && window.matchMedia("(display-mode: window-controls-overlay)").matches) return true;
    if (window.navigator && window.navigator.standalone) return true;
  } catch (e) {}
  return false;
}

/**
 * Web Push для личных сообщений: Android/Desktop в вкладке браузера; на iOS — только добавленное на экран «Домой» PWA
 * (в обычном Safari пуши сайта недоступны). В Telegram Mini App Push API часто отсутствует — тогда остаётся уведомление от бота в Telegram.
 */
function pokerChatPushClientSupported() {
  try {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) return false;
    if (typeof window.isSecureContext !== "undefined" && !window.isSecureContext) return false;
  } catch (e) {
    return false;
  }
  var ios =
    /iPhone|iPad|iPod/i.test(navigator.userAgent || "") ||
    (navigator.platform === "MacIntel" && (navigator.maxTouchPoints || 0) > 1);
  if (ios && !pokerIsPwaDisplayStandalone()) return false;
  return true;
}

(function syncTelegramMiniAppRootClass() {
  try {
    var root = document.documentElement;
    if (!root || !root.classList) return;
    root.classList.toggle("poker-telegram-miniapp", !!(window.Telegram && window.Telegram.WebApp));
  } catch (e) {}
})();

/** iOS / iPadOS: в обычном WebView (Telegram, Safari вне «Домой») веб-пуш недоступен — подписка в Redis не сохранится. */
function pokerChatPushIosNeedsStandalonePwa() {
  try {
    var ios =
      /iPhone|iPad|iPod/i.test(navigator.userAgent || "") ||
      (navigator.platform === "MacIntel" && (navigator.maxTouchPoints || 0) > 1);
    return ios && !pokerIsPwaDisplayStandalone();
  } catch (e) {
    return false;
  }
}

/** Класс на <html> для отступов таббара/главной на iOS PWA (14‑я серия и др.): надёжнее, чем только display-mode. */
function pokerSyncIosPwaRootClass() {
  try {
    var root = document.documentElement;
    var ios =
      /iPhone|iPad|iPod/i.test(navigator.userAgent || "") ||
      (navigator.platform === "MacIntel" && (navigator.maxTouchPoints || 0) > 1);
    if (pokerIsPwaDisplayStandalone() && ios) root.classList.add("poker-ios-pwa");
    else root.classList.remove("poker-ios-pwa");
  } catch (e) {}
}
pokerSyncIosPwaRootClass();
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", pokerSyncIosPwaRootClass);
}
window.addEventListener("orientationchange", pokerSyncIosPwaRootClass);
window.addEventListener("orientationchange", function pokerPwaTabbarGapOnOrientation() {
  try {
    var oRoot = document.documentElement;
    oRoot.style.removeProperty("--pwa-ios-tabbar-bottom-gap");
    oRoot.style.removeProperty("--pwa-ios-tabbar-pad-bottom");
  } catch (eOr) {}
  try {
    if (typeof pokerApplyBottomTabbarPad === "function") pokerApplyBottomTabbarPad();
  } catch (ePad) {}
});

function pokerChatPushUrlBase64ToUint8Array(base64String) {
  if (!base64String || typeof base64String !== "string") return null;
  try {
    var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    var base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    var rawData = atob(base64);
    var outputArray = new Uint8Array(rawData.length);
    for (var i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
    return outputArray;
  } catch (e2) {
    return null;
  }
}

function pokerFetchChatPushConfig() {
  var base = typeof getApiBase === "function" ? getApiBase() : "";
  if (!base) return Promise.resolve(null);
  return fetch(base + "/api/chat-push-subscribe", { cache: "no-store" })
    .then(function (x) {
      return x.json();
    })
    .catch(function () {
      return null;
    })
    .then(function (r) {
      return r && r.ok ? r : null;
    });
}

function pokerChatPushSetServerEnabled(wantOn) {
  var base = typeof getApiBase === "function" ? getApiBase() : "";
  if (!base || !pokerApiHasCredential()) return Promise.resolve({ ok: false, error: "no auth" });
  return fetch(base + "/api/chat-push-subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pokerApiAuthJsonBody({ action: wantOn ? "enable" : "disable" })),
  })
    .then(function (x) {
      return x.json();
    })
    .catch(function () {
      return { ok: false };
    });
}

/** После POST subscribe статус иногда кратко отстаёт (Redis); несколько попыток перед откатом галочки. */
function pokerChatPushVerifySubscriptionAfterSave(base, attempt) {
  attempt = attempt || 0;
  return fetch(base + "/api/chat-push-subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pokerApiAuthJsonBody({ action: "status" })),
    cache: "no-store",
  })
    .then(function (rs) {
      return rs.json().catch(function () {
        return null;
      });
    })
    .then(function (st) {
      if (st && st.ok && st.hasSubscription) return { ok: true };
      if (attempt < 8) {
        return new Promise(function (resolve) {
          setTimeout(function () {
            pokerChatPushVerifySubscriptionAfterSave(base, attempt + 1).then(resolve);
          }, 100);
        });
      }
      try {
        if (typeof console !== "undefined" && console.warn) {
          console.warn("[chat-push] subscribe ok но status.hasSubscription false после ожидания", st);
        }
      } catch (eSt) {}
      return {
        ok: false,
        error:
          "Сервер ответил на подписку, но не видит endpoint (пуш не сохранится). Проверьте домен API в приложении и повторите выкл/вкл.",
      };
    })
    .catch(function () {
      if (attempt < 8) {
        return new Promise(function (resolve) {
          setTimeout(function () {
            pokerChatPushVerifySubscriptionAfterSave(base, attempt + 1).then(resolve);
          }, 100);
        });
      }
      return { ok: false, error: "Не удалось проверить подписку на сервере." };
    });
}

var pokerChatPushSubscribeInFlight = null;
function pokerChatPushSubscribeToBrowser() {
  if (pokerChatPushSubscribeInFlight) return pokerChatPushSubscribeInFlight;
  var base = typeof getApiBase === "function" ? getApiBase() : "";
  if (!base || !pokerApiHasCredential()) return Promise.resolve({ ok: false, error: "auth" });
  if (!("serviceWorker" in navigator)) return Promise.resolve({ ok: false, error: "no_sw" });
  var run = pokerFetchChatPushConfig()
    .then(function (cfg) {
      if (!cfg || !cfg.pushConfigured || !cfg.publicKey) return { ok: false, error: "not_configured" };
      var keyArr = pokerChatPushUrlBase64ToUint8Array(cfg.publicKey);
      if (!keyArr) return { ok: false, error: "bad_key" };
      return navigator.serviceWorker.ready.then(function (reg) {
        return reg.pushManager
          .getSubscription()
          .then(function (existing) {
            if (existing) return existing.unsubscribe().catch(function () {});
          })
          .then(function () {
            return reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: keyArr });
          })
          .then(function (sub) {
            var json = sub.toJSON();
            return fetch(base + "/api/chat-push-subscribe", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(pokerApiAuthJsonBody({ action: "subscribe", subscription: json })),
            }).then(function (r) {
              return r
                .json()
                .catch(function () {
                  return {};
                })
                .then(function (data) {
                  if (!r.ok) {
                    return { ok: false, error: (data && data.error) || "HTTP " + r.status };
                  }
                  if (!(data && data.ok)) {
                    return { ok: false, error: (data && data.error) || "subscribe_save_failed" };
                  }
                  /* Сервер уже ответил ok на subscribe — не откатываем из‑за гонки status/hasSubscription. */
                  pokerChatPushVerifySubscriptionAfterSave(base, 0).then(function (ver) {
                    if (!ver || !ver.ok) {
                      try {
                        if (typeof console !== "undefined" && console.warn) {
                          console.warn("[chat-push] subscribe сохранён, status ещё без HLEN (догонит)", ver);
                        }
                      } catch (eV) {}
                    }
                  });
                  return { ok: true };
                });
            });
          });
      });
    })
    .catch(function (e) {
      var msg = e && e.message ? String(e.message) : "subscribe_failed";
      try {
        if (typeof console !== "undefined" && console.warn) console.warn("[chat-push] subscribe", msg);
      } catch (e2) {}
      return { ok: false, error: msg };
    });
  pokerChatPushSubscribeInFlight = run.finally(function () {
    pokerChatPushSubscribeInFlight = null;
  });
  return pokerChatPushSubscribeInFlight;
}

var pokerChatPushEnrollDebounce = null;
/** После успешного входа: тихая подписка при уже выданном разрешении; иначе один запрос разрешения за сессию (sessionStorage). */
function pokerMaybeAutoEnrollChatPush() {
  try {
    if (pokerChatPushEnrollDebounce) clearTimeout(pokerChatPushEnrollDebounce);
  } catch (eDeb) {}
  pokerChatPushEnrollDebounce = setTimeout(function () {
    pokerChatPushEnrollDebounce = null;
    pokerMaybeAutoEnrollChatPushInner();
  }, 1800);
}

function pokerMaybeAutoEnrollChatPushInner() {
  if (!pokerChatPushClientSupported() || !pokerApiHasCredential()) return;
  var base = typeof getApiBase === "function" ? getApiBase() : "";
  if (!base) return false;
  pokerFetchChatPushConfig().then(function (cfg) {
    if (!cfg || !cfg.pushConfigured || !cfg.publicKey) return;
    fetch(base + "/api/chat-push-subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokerApiAuthJsonBody({ action: "status" })),
    })
      .then(function (r) {
        return r.json();
      })
      .then(function (d) {
        if (!d || !d.ok || !d.notificationsEnabled) return;
        if (d.hasSubscription) return;
        if (typeof Notification === "undefined") return;
        if (Notification.permission === "granted") {
          pokerChatPushSubscribeToBrowser().catch(function () {});
          return;
        }
        if (Notification.permission !== "default") return;
        setTimeout(function () {
          if (!pokerApiHasCredential() || !pokerChatPushClientSupported()) return;
          if (typeof Notification === "undefined" || Notification.permission !== "default") return;
          try {
            if (sessionStorage.getItem("poker_chat_push_prompted") === "1") return;
            sessionStorage.setItem("poker_chat_push_prompted", "1");
          } catch (eS) {}
          Notification.requestPermission().then(function (perm) {
            if (perm !== "granted") return;
            pokerChatPushSetServerEnabled(true).then(function (en) {
              if (en && en.ok) pokerChatPushSubscribeToBrowser().catch(function () {});
            });
          });
        }, 2200);
      });
  });
}

/** При возврате во вкладку: восстановить подписку, если разрешение есть, а endpoint пропал (обновление SW и т.п.). */
function pokerChatPushSyncIfNeeded() {
  if (!pokerChatPushClientSupported() || !pokerApiHasCredential()) return;
  if (typeof Notification === "undefined" || Notification.permission !== "granted") return;
  var base = typeof getApiBase === "function" ? getApiBase() : "";
  if (!base) return;
  pokerFetchChatPushConfig().then(function (cfg) {
    if (!cfg || !cfg.pushConfigured) return;
    navigator.serviceWorker.ready
      .then(function (reg) {
        return Promise.all([
          fetch(base + "/api/chat-push-subscribe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pokerApiAuthJsonBody({ action: "status" })),
          })
            .then(function (r) {
              return r.json().catch(function () {
                return null;
              });
            })
            .catch(function () {
              return null;
            }),
          reg.pushManager.getSubscription().catch(function () {
            return null;
          }),
        ]);
      })
      .then(function (pair) {
        var d = pair && pair[0] ? pair[0] : null;
        var browserSub = pair && pair[1] ? pair[1] : null;
        if (!d || !d.ok || !d.notificationsEnabled) return;
        var serverHas = !!d.hasSubscription;
        var browserHas = !!(browserSub && browserSub.endpoint);
        if (serverHas && browserHas) return;
        pokerChatPushForceRepair("sync_mismatch");
      })
      .catch(function () {});
  });
}

function pokerChatPushForceRepair(reason) {
  if (!pokerChatPushClientSupported() || !pokerApiHasCredential()) return;
  if (typeof Notification === "undefined" || Notification.permission !== "granted") return;
  var base = typeof getApiBase === "function" ? getApiBase() : "";
  if (!base) return;
  pokerFetchChatPushConfig().then(function (cfg) {
    if (!cfg || !cfg.pushConfigured || !cfg.publicKey) return;
    pokerChatPushSetServerEnabled(true).then(function (en) {
      if (!en || !en.ok) return;
      pokerChatPushSubscribeToBrowser().catch(function (eRepair) {
        try {
          if (typeof console !== "undefined" && console.warn) {
            console.warn("[chat-push] force repair failed", reason || "repair", eRepair && eRepair.message ? eRepair.message : eRepair);
          }
        } catch (eLogRepair) {}
      });
    });
  });
}

function pokerChatPushUnsubscribeBrowser() {
  if (!("serviceWorker" in navigator)) return Promise.resolve();
  return navigator.serviceWorker.ready
    .then(function (reg) {
      return reg.pushManager.getSubscription();
    })
    .then(function (sub) {
      if (sub) return sub.unsubscribe();
    })
    .catch(function () {});
}

var PROFILE_CHAT_PUSH_UI_CACHE_KEY = "poker_profile_chat_push_ui_v1";
function pokerGetChatMemberIdForPushCache() {
  try {
    var dtId =
      (typeof sessionStorage !== "undefined" && sessionStorage.getItem("poker_dt_id")) ||
      (typeof localStorage !== "undefined" && localStorage.getItem("poker_dt_id")) ||
      "";
    dtId = String(dtId || "").trim().toUpperCase();
    if (/^ID\d{6}$/.test(dtId)) return dtId;
  } catch (eDtCache) {}
  try {
    var _auth = window.__pokerTelegramAuth;
    if (_auth && _auth.user && _auth.user.id != null && (_auth.status === "verified" || _auth.status === "dev_skip")) {
      var u = _auth.user;
      if (u.memberId != null && String(u.memberId).trim() !== "") return String(u.memberId).trim();
      var raw = String(u.id);
      if (raw.indexOf("tg_") === 0 || raw.indexOf("vk_") === 0) return raw;
      if (u.is_vk || u.vk) return "vk_" + raw;
      return "tg_" + raw;
    }
  } catch (eA) {}
  try {
    var wtg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    if (wtg && wtg.initDataUnsafe && wtg.initDataUnsafe.user && wtg.initDataUnsafe.user.id != null) {
      return "tg_" + String(wtg.initDataUnsafe.user.id);
    }
  } catch (eT) {}
  if (typeof window.pokerResolveMyChatMemberId === "function") {
    try {
      var m = window.pokerResolveMyChatMemberId();
      if (m) return String(m);
    } catch (eR) {}
  }
  return "";
}
function pokerProfileChatPushReadUiCache() {
  try {
    var raw = localStorage.getItem(PROFILE_CHAT_PUSH_UI_CACHE_KEY);
    if (!raw) return null;
    var o = JSON.parse(raw);
    if (!o || typeof o !== "object") return null;
    return o;
  } catch (e) {
    return null;
  }
}
function pokerProfileChatPushWriteUiCache(memberId, notificationsEnabled, hasSubscription) {
  try {
    localStorage.setItem(
      PROFILE_CHAT_PUSH_UI_CACHE_KEY,
      JSON.stringify({
        memberId: String(memberId || ""),
        notificationsEnabled: !!notificationsEnabled,
        hasSubscription: !!hasSubscription,
        t: Date.now(),
      })
    );
  } catch (e) {}
}
function pokerProfileChatPushClearUiCache() {
  try {
    localStorage.removeItem(PROFILE_CHAT_PUSH_UI_CACHE_KEY);
  } catch (e) {}
}
function pokerProfileChatPushApplyCachedToggle(toggle) {
  if (!toggle) return;
  var me = pokerGetChatMemberIdForPushCache();
  if (!me) return;
  var c = pokerProfileChatPushReadUiCache();
  if (!c || String(c.memberId) !== String(me)) return;
  if (typeof c.t === "number" && Date.now() - c.t > 86400000 * 30) return;
  toggle.checked = !!c.notificationsEnabled;
}

var profileChatPushBound = false;
/** Пока идёт вкл/выкл пуша — не вызывать refreshState (иначе старый status сбрасывает галочку). */
var profileChatPushApplying = false;
/** Инкремент при новом refresh / старте переключателя — отбрасываем устаревшие ответы fetch. */
var profileChatPushRefreshGen = 0;
function isInstalledPwaProfileMode() {
  try {
    if (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) return true;
    if (window.navigator && window.navigator.standalone === true) return true;
  } catch (ePwaProfileMode) {}
  return false;
}
function initProfileChatPush() {
  var row = document.getElementById("profileChatPushRow");
  var toggle = document.getElementById("profileChatPushToggle");
  var hint = document.getElementById("profileChatPushHint");
  if (!row || !toggle) return;

  if (typeof isTelegramWebApp === "function" && isTelegramWebApp()) {
    row.classList.add("profile-chat-push--hidden");
    row.classList.remove("profile-chat-push--ios-miniapp");
    row.setAttribute("aria-hidden", "true");
    return;
  }

  if (!isInstalledPwaProfileMode()) {
    row.classList.add("profile-chat-push--hidden");
    row.classList.remove("profile-chat-push--ios-miniapp");
    row.setAttribute("aria-hidden", "true");
    return;
  }

  function setHint(t) {
    if (hint) hint.textContent = t;
  }

  var cred = pokerApiHasCredential();
  var canUsePush = pokerChatPushClientSupported();
  var iosNeedsHomeScreen = pokerChatPushIosNeedsStandalonePwa();

  if (!cred) {
    row.classList.add("profile-chat-push--hidden");
    row.classList.remove("profile-chat-push--ios-miniapp");
    row.setAttribute("aria-hidden", "true");
    return;
  }

  if (iosNeedsHomeScreen && !canUsePush) {
    row.classList.remove("profile-chat-push--hidden");
    row.classList.add("profile-chat-push--ios-miniapp");
    row.setAttribute("aria-hidden", "false");
    setHint(
      "На iPhone и iPad внутри Telegram (и в Safari без режима «с экрана Домой») браузер не даёт сохранить веб-пуш — на сервере не будет подписки (в логах: subscriptionEndpointsInRedis: 0). Добавьте «Два туза» на экран «Домой», откройте приложение оттуда и включите уведомления в этом профиле."
    );
    return;
  }

  row.classList.remove("profile-chat-push--ios-miniapp");

  if (!canUsePush) {
    row.classList.add("profile-chat-push--hidden");
    row.setAttribute("aria-hidden", "true");
    return;
  }

  row.classList.remove("profile-chat-push--hidden");
  row.setAttribute("aria-hidden", "false");

  function refreshState() {
    if (profileChatPushApplying) return;
    profileChatPushRefreshGen++;
    var myGen = profileChatPushRefreshGen;
    var base = typeof getApiBase === "function" ? getApiBase() : "";
    if (!base) return;
    fetch(base + "/api/chat-push-subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokerApiAuthJsonBody({ action: "status" })),
    })
      .then(function (r) {
        return r.json();
      })
      .then(function (d) {
        if (profileChatPushApplying || myGen !== profileChatPushRefreshGen) return;
        if (!d || !d.ok) {
          setHint("Не удалось загрузить настройки.");
          return;
        }
        if (!d.pushConfigured) {
          setHint("Пуши на сервере не настроены (VAPID).");
          toggle.disabled = true;
          toggle.checked = false;
          return;
        }
        toggle.disabled = false;
        toggle.checked = !!d.notificationsEnabled;
        if (d.memberId) {
          pokerProfileChatPushWriteUiCache(d.memberId, d.notificationsEnabled, d.hasSubscription);
        }
        if (typeof Notification !== "undefined") {
          if (Notification.permission === "denied") {
            setHint("Уведомления заблокированы в настройках браузера.");
          } else if (d.notificationsEnabled && d.hasSubscription) {
            setHint(
              "Уведомления включены — приходят при закрытом приложении." +
                (d.memberId ? " Аккаунт для пушей на сервере: " + d.memberId + "." : "")
            );
          } else if (d.notificationsEnabled && !d.hasSubscription) {
            setHint("Разрешите уведомления в браузере — личные сообщения, когда приложение в фоне или закрыто.");
            if (Notification.permission === "granted" && !window.__pokerChatPushAutoSubOnce) {
              window.__pokerChatPushAutoSubOnce = true;
              pokerChatPushSubscribeToBrowser().then(function (subr) {
                if (!subr || !subr.ok) {
                  window.__pokerChatPushAutoSubOnce = false;
                  setHint((subr && subr.error) || "Не удалось подписаться. Выключите уведомления в профиле и включите снова.");
                }
                refreshState();
              });
            }
          } else {
            setHint("Уведомления о личных сообщениях: браузер Android/ПК или PWA с экрана «Домой» (iOS).");
          }
        }
      })
      .catch(function () {
        if (profileChatPushApplying || myGen !== profileChatPushRefreshGen) return;
        setHint("Ошибка сети.");
      });
  }

  if (!profileChatPushBound) {
    profileChatPushBound = true;
    toggle.addEventListener("change", function () {
      var on = toggle.checked;
      if (!on) {
        profileChatPushRefreshGen++;
        profileChatPushApplying = true;
        toggle.disabled = true;
        pokerChatPushUnsubscribeBrowser();
        pokerChatPushSetServerEnabled(false).then(function (r) {
          profileChatPushApplying = false;
          toggle.disabled = false;
          if (!r || !r.ok) toggle.checked = true;
          else pokerProfileChatPushClearUiCache();
          refreshState();
        });
        return;
      }
      profileChatPushRefreshGen++;
      profileChatPushApplying = true;
      toggle.disabled = true;
      /* requestPermission только в цепочке жеста: после await fetch Safari/Telegram часто дают «denied» без диалога. */
      function finishOnFail(msg, rollbackServer) {
        toggle.checked = false;
        if (rollbackServer) pokerChatPushSetServerEnabled(false);
        if (msg) setHint(msg);
        profileChatPushApplying = false;
        toggle.disabled = false;
        refreshState();
      }
      function runEnableAndSubscribe() {
        pokerChatPushSetServerEnabled(true)
          .then(function (r) {
            if (!r || !r.ok) {
              toggle.checked = false;
              profileChatPushApplying = false;
              toggle.disabled = false;
              refreshState();
              return;
            }
            pokerChatPushSubscribeToBrowser().then(function (subr) {
              if (!subr || !subr.ok) {
                toggle.checked = false;
                pokerChatPushSetServerEnabled(false);
                setHint((subr && subr.error) || "Не удалось подписаться.");
              }
              profileChatPushApplying = false;
              toggle.disabled = false;
              refreshState();
            });
          })
          .catch(function () {
            toggle.checked = false;
            profileChatPushApplying = false;
            toggle.disabled = false;
            refreshState();
          });
      }
      if (typeof Notification === "undefined") {
        finishOnFail(null, false);
        return;
      }
      if (Notification.permission === "denied") {
        finishOnFail(
          "Уведомления для этого сайта уже отключены в браузере или в системе. Включите их в настройках и попробуйте снова.",
          false
        );
        return;
      }
      if (Notification.permission === "granted") {
        runEnableAndSubscribe();
        return;
      }
      Notification.requestPermission().then(function (perm) {
        if (perm !== "granted") {
          finishOnFail(
            perm === "denied"
              ? "Разрешение не выдано (во встроенном браузере это бывает без запроса). Откройте приложение с экрана «Домой» или нажмите галочку ещё раз."
              : "Без разрешения пуши недоступны.",
            false
          );
          return;
        }
        runEnableAndSubscribe();
      });
    });
  }
  pokerProfileChatPushApplyCachedToggle(toggle);
  refreshState();
}
(function initPwaServiceWorkerGlobal() {
  if (!("serviceWorker" in navigator)) return;
  try {
    navigator.serviceWorker.addEventListener("message", function (ev) {
      var d = ev.data;
      if (!d) return;
      if (d.pokerChatPushSound) {
        var url = d.url || "";
        if (url) {
          try {
            var a = new Audio(url);
            a.volume = typeof d.volume === "number" ? d.volume : 0.88;
            var p = a.play();
            if (p && typeof p.catch === "function") p.catch(function () {});
          } catch (ePlay) {}
        }
      }
      if (d.pokerChatPushEvent && typeof window.__pokerHandleIncomingChatPush === "function") {
        try {
          window.__pokerHandleIncomingChatPush(d);
        } catch (ePushUi) {}
      }
      if (d.pokerChatOpenUrl && typeof window.__pokerOpenChatFromPushUrl === "function") {
        try {
          pokerPushOpenDebug("sw-message", d.pokerChatOpenUrl);
          window.__pokerOpenChatFromPushUrl(d.pokerChatOpenUrl);
        } catch (ePushOpen) {}
      }
      if (d.pokerChatPushRepair) {
        try {
          pokerChatPushForceRepair(d.reason || "service_worker_message");
        } catch (ePushRepair) {}
      }
    });
  } catch (eMsg) {}
  try {
    navigator.serviceWorker.addEventListener("controllerchange", function () {
      setTimeout(function () {
        try {
          pokerChatPushSyncIfNeeded();
          pokerMaybeAutoEnrollChatPushInner();
        } catch (eCtlSync) {}
      }, 600);
    });
  } catch (eCtl) {}
  /** Разблокировка звука после первого жеста (iOS PWA / Safari) — иначе play() из push может быть тихим. */
  function pokerUnlockNotifyAudioFromGesture() {
    try {
      var Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      var ctx = new Ctx();
      ctx.resume().then(function () {
        try {
          ctx.close();
        } catch (eC) {}
      });
    } catch (eA) {}
    try {
      document.removeEventListener("pointerdown", pokerUnlockNotifyAudioFromGesture, true);
    } catch (eR) {}
  }
  try {
    document.addEventListener("pointerdown", pokerUnlockNotifyAudioFromGesture, { capture: true, passive: true });
  } catch (eP) {}
  var swUrl = "./sw.js";
  try {
    var swBuild = document && document.documentElement ? String(document.documentElement.getAttribute("data-app-version") || document.documentElement.getAttribute("data-build") || "").trim() : "";
    if (swBuild) swUrl += "?v=" + encodeURIComponent(swBuild);
  } catch (eSwUrl) {}
  navigator.serviceWorker.register(swUrl, { updateViaCache: "none" }).then(function (reg) {
    try {
      if (reg && reg.waiting) {
        setTimeout(function () {
          try {
            pokerChatPushSyncIfNeeded();
          } catch (eWaitSync) {}
        }, 800);
      }
    } catch (eWait) {}
    return reg;
  }).catch(function () {});
})();

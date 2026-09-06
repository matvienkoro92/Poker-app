/* PWA: installability + push; safe GET requests use stale-while-revalidate unless caller explicitly asks for a fresh fetch. */
var POKER_CHAT_API_CACHE = "poker-chat-api-v4";
var POKER_CHAT_API_OLD_CACHES = ["poker-chat-api-v1", "poker-chat-api-v3"];
var POKER_PUSH_ASSETS_CACHE = "poker-push-assets-v4";
var POKER_PUSH_ASSETS_OLD_CACHES = ["poker-push-assets-v1", "poker-push-assets-v2", "poker-push-assets-v3"];
var POKER_STATIC_CACHE = "poker-static-v46";
var POKER_STATIC_OLD_CACHES = ["poker-static-v45", "poker-static-v44", "poker-static-v43", "poker-static-v42", "poker-static-v41", "poker-static-v40", "poker-static-v39", "poker-static-v38", "poker-static-v1", "poker-static-v2", "poker-static-v3", "poker-static-v4", "poker-static-v5", "poker-static-v6", "poker-static-v7", "poker-static-v8", "poker-static-v9", "poker-static-v10", "poker-static-v11", "poker-static-v12", "poker-static-v13", "poker-static-v14", "poker-static-v15", "poker-static-v16", "poker-static-v17", "poker-static-v18", "poker-static-v19", "poker-static-v20", "poker-static-v21", "poker-static-v22", "poker-static-v23", "poker-static-v24", "poker-static-v25", "poker-static-v26", "poker-static-v27", "poker-static-v28", "poker-static-v29", "poker-static-v30", "poker-static-v31", "poker-static-v32", "poker-static-v33", "poker-static-v34", "poker-static-v35", "poker-static-v36", "poker-static-v37"];
var POKER_PUBLIC_API_CACHE = "poker-public-api-v1";
var POKER_PUBLIC_API_OLD_CACHES = [];
var POKER_CHAT_NOTIFY_AUDIO = "./assets/chat-message-notify.mp3?v=20260505";
var POKER_SW_BUILD = "4.009";

self.addEventListener("install", function (e) {
  self.skipWaiting();
  e.waitUntil(
    caches.open(POKER_PUSH_ASSETS_CACHE).then(function (cache) {
      return cache.add(new Request(POKER_CHAT_NOTIFY_AUDIO, { cache: "reload" })).catch(function () {
        return cache.add(POKER_CHAT_NOTIFY_AUDIO).catch(function () {});
      });
    })
  );
});
self.addEventListener("activate", function (e) {
  e.waitUntil(
    Promise.all(
      POKER_CHAT_API_OLD_CACHES.map(function (name) {
        return caches.delete(name).catch(function () {});
      }).concat(POKER_PUSH_ASSETS_OLD_CACHES.map(function (name) {
        return caches.delete(name).catch(function () {});
      })).concat(POKER_STATIC_OLD_CACHES.map(function (name) {
        return caches.delete(name).catch(function () {});
      })).concat(POKER_PUBLIC_API_OLD_CACHES.map(function (name) {
        return caches.delete(name).catch(function () {});
      }))
    ).then(function () {
      return self.clients.claim();
    }).then(function () {
      return pokerSwRefreshOpenClients("activate");
    })
  );
});

function pokerSwRefreshOpenClients(reason) {
  return clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (cs) {
    var i;
    for (i = 0; i < cs.length; i++) {
      try {
        cs[i].postMessage({ pokerAppReloadRequired: true, version: POKER_SW_BUILD, reason: reason || "sw_update" });
      } catch (ePost) {}
      try {
        if (cs[i] && typeof cs[i].navigate === "function" && cs[i].url) {
          cs[i].navigate(cs[i].url).catch(function () {});
        }
      } catch (eNav) {}
    }
    // A navigation handled by this worker can wait for activation to finish.
    // Never make activation wait for that navigation in turn.
    return undefined;
  });
}

function pokerSwChatApiStaleWhileRevalidate(request) {
  return caches.open(POKER_CHAT_API_CACHE).then(function (cache) {
    return cache.match(request).then(function (cached) {
      var networkFetch = fetch(request)
        .then(function (response) {
          try {
            if (response && response.status === 200 && response.type === "basic") {
              cache.put(request, response.clone());
            }
          } catch (ePut) {}
          return response;
        })
        .catch(function () {
          return null;
        });
      if (cached) {
        networkFetch.catch(function () {});
        return cached;
      }
      return networkFetch.then(function (res) {
        return res || Response.error();
      });
    });
  });
}

function pokerSwStaleWhileRevalidate(cacheName, request) {
  return caches.open(cacheName).then(function (cache) {
    return cache.match(request).then(function (cached) {
      var networkFetch = fetch(request)
        .then(function (response) {
          try {
            if (response && response.status === 200 && (response.type === "basic" || response.type === "cors")) {
              cache.put(request, response.clone());
            }
          } catch (ePut) {}
          return response;
        })
        .catch(function () {
          return null;
        });
      if (cached) {
        networkFetch.catch(function () {});
        return cached;
      }
      return networkFetch.then(function (res) {
        return res || Response.error();
      });
    });
  });
}

function pokerSwCacheFirst(cacheName, request) {
  return caches.open(cacheName).then(function (cache) {
    return cache.match(request).then(function (cached) {
      if (cached) return cached;
      return fetch(request).then(function (response) {
        try {
          if (response && response.status === 200 && (response.type === "basic" || response.type === "cors")) {
            cache.put(request, response.clone());
          }
        } catch (ePut) {}
        return response;
      });
    });
  });
}

function pokerSwNetworkFirst(cacheName, request) {
  return caches.open(cacheName).then(function (cache) {
    return fetch(request)
      .then(function (response) {
        try {
          if (response && response.status === 200 && (response.type === "basic" || response.type === "cors")) {
            cache.put(request, response.clone());
          }
        } catch (ePut) {}
        return response;
      })
      .catch(function () {
        return cache.match(request).then(function (cached) {
          return cached || Response.error();
        });
      });
  });
}

function pokerSwIsStaticRequest(url) {
  var path = url && url.pathname ? url.pathname : "";
  if (path.indexOf("/html-fragments/") === 0) return true;
  if (path.indexOf("/assets/") === 0) return /\.(?:png|jpg|jpeg|webp|gif|svg|mp3|wav|json)$/i.test(path);
  return /\.(?:css|js|mjs|html|webmanifest)$/i.test(path);
}

function pokerSwIsStableStaticRequest(url) {
  var path = url && url.pathname ? url.pathname : "";
  if (path.indexOf("/assets/") === 0 && /\.(?:png|jpg|jpeg|webp|avif|gif|svg|mp3|wav|json|pdf)$/i.test(path)) return true;
  if (url && url.searchParams && url.searchParams.has("v") && /\.(?:css|js|mjs)$/i.test(path)) return true;
  return false;
}

function pokerSwIsVersionedCodeRequest(url) {
  var path = url && url.pathname ? url.pathname : "";
  return !!(url && url.searchParams && url.searchParams.has("v") && /\.(?:css|js|mjs)$/i.test(path));
}

function pokerSwCacheFirst(cacheName, request) {
  return caches.open(cacheName).then(function (cache) {
    return cache.match(request).then(function (cached) {
      if (cached) return cached;
      return fetch(request).then(function (response) {
        try {
          if (response && response.status === 200 && (response.type === "basic" || response.type === "cors")) {
            cache.put(request, response.clone());
          }
        } catch (ePut) {}
        return response;
      });
    });
  });
}

function pokerSwIsPublicApiRequest(url) {
  if (!url || !url.pathname) return false;
  if (url.pathname.indexOf("/api/player-crm") === 0) {
    return url.searchParams.get("publicLevels") === "1" ||
      url.searchParams.get("levels") === "1" ||
      url.searchParams.get("publicBirthdays") === "1" ||
      url.searchParams.get("birthdays") === "1";
  }
  if (url.pathname.indexOf("/api/club-choice-vote") === 0) {
    return url.searchParams.get("mode") === "achievements";
  }
  return false;
}

// Navigation must settle even when the network never returns the document.
function pokerSwNavigationFallback(request) {
  var retryUrl = String(request && request.url || "/").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return new Response(`<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#0f172a"><title>Два туза — загрузка</title><style>
  *{box-sizing:border-box}body{margin:0;min-height:100vh;min-height:100dvh;display:grid;place-items:center;padding:24px;background:#0f172a;color:#fff3d6;font:17px/1.5 system-ui,sans-serif;text-align:center}main{max-width:420px}h1{font-size:26px;line-height:1.2}p{color:#c4cbd8}.retry{display:inline-block;text-decoration:none;font:inherit;font-weight:700;border:0;border-radius:14px;padding:15px 24px;background:#ffd477;color:#201505;cursor:pointer}.retry:focus-visible{outline:3px solid white;outline-offset:4px}
  </style></head><body><main><h1>Не удалось загрузить клуб</h1><p>Соединение прервалось или сервер долго отвечает. Проверьте интернет и попробуйте ещё раз.</p><a class="retry" href="${retryUrl}">Повторить загрузку</a></main></body></html>`, {
    status: 503,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" }
  });
}

function pokerSwNavigation(request) {
  var controller = new AbortController();
  var timer;
  var timeout = new Promise(function (resolve) {
    timer = setTimeout(function () {
      resolve(pokerSwNavigationFallback(request));
      controller.abort();
    }, 7000);
  });
  var network = fetch(request, { signal: controller.signal }).then(function (response) {
    if (!response.ok) return pokerSwNavigationFallback(request);
    // Return the document stream immediately so the browser can paint the boot UI.
    // Waiting for clone().text() here blocked rendering until all HTML arrived.
    return response;
  }).catch(function () { return pokerSwNavigationFallback(request); });
  return Promise.race([network, timeout]).then(function (response) {
    clearTimeout(timer);
    return response;
  });
}

self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;
  try {
    var u = new URL(event.request.url);
    if (u.origin !== self.location.origin) return;
    if (event.request.mode === "navigate") {
      event.respondWith(pokerSwNavigation(event.request));
      return;
    }
    /* Бинарные ответы прокси картинок: stale-while-revalidate как у JSON чата даёт залипание битого кэша в PWA. */
    if (u.pathname.indexOf("/api/chat-image") === 0) return;
    /* fetch(..., { cache: "no-store" }) — не отдаём устаревший Cache Storage: иначе после тапа по пушу
 лента/личка рисуются из старого ответа, а фоновый revalidate не дергает UI (задержка ~интервал опроса). */
    var cmode = "";
    try {
      cmode = event.request.cache;
    } catch (eC) {}
    if (cmode === "no-store" || cmode === "reload") {
      event.respondWith(fetch(event.request));
      return;
    }
    // Rating imports regenerate this file daily. Cache-first/stale data can
    // leave the previous day hero selected while current win cards are shown.
    if (u.pathname === "/club-news-data.js") {
      event.respondWith(pokerSwNetworkFirst(POKER_STATIC_CACHE, event.request));
      return;
    }
    if (pokerSwIsStableStaticRequest(u)) {
      event.respondWith(
        pokerSwIsVersionedCodeRequest(u)
          ? pokerSwStaleWhileRevalidate(POKER_STATIC_CACHE, event.request)
          : pokerSwCacheFirst(POKER_STATIC_CACHE, event.request)
      );
      return;
    }
    if (pokerSwIsStaticRequest(u)) {
      event.respondWith(pokerSwStaleWhileRevalidate(POKER_STATIC_CACHE, event.request));
      return;
    }
    if (pokerSwIsPublicApiRequest(u)) {
      event.respondWith(pokerSwStaleWhileRevalidate(POKER_PUBLIC_API_CACHE, event.request));
      return;
    }
    /* Chat is live state. Do not stale-while-revalidate it: a cache hit still caused
       a background network request and could briefly surface an obsolete payload. */
    if (u.pathname.indexOf("/api/chat") === 0) return;
  } catch (eFetch) {}
});

function pokerSwNotifyClientsChatSound() {
  var base = self.location.origin || "";
  var url = base + "/assets/chat-message-notify.mp3?v=20260505";
  return clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (cs) {
    var i;
    for (i = 0; i < cs.length; i++) {
      try {
        cs[i].postMessage({ pokerChatPushSound: true, url: url, volume: 0.88 });
      } catch (ePost) {}
    }
  });
}

function pokerSwNotifyClientsChatPush(data) {
  var payload = data && typeof data === "object" ? data : {};
  return clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (cs) {
    var i;
    for (i = 0; i < cs.length; i++) {
      try {
        cs[i].postMessage({
          pokerChatPushEvent: true,
          openUrl: payload.openUrl || "./?startapp=club_chat",
          tag: payload.tag || "poker-chat",
          title: payload.title || "Два туза",
          body: payload.body || "Новое сообщение в чате",
          kind: payload.kind || "",
          campaignId: payload.campaignId || "",
          accountId: payload.accountId || "",
          at: Date.now(),
        });
      } catch (ePost) {}
    }
  });
}

function pokerSwNotifyClientsPushRepair(data) {
  var payload = data && typeof data === "object" ? data : {};
  return clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (cs) {
    var i;
    for (i = 0; i < cs.length; i++) {
      try {
        cs[i].postMessage({
          pokerChatPushRepair: true,
          reason: payload.reason || "subscription_changed",
          at: Date.now(),
        });
      } catch (ePostRepair) {}
    }
  });
}

function pokerSwNotificationData(data) {
  var payload = data && typeof data === "object" ? data : {};
  return {
    openUrl: payload.openUrl || "./?startapp=club_chat",
    tag: payload.tag || "poker-chat",
    kind: payload.kind || "",
    campaignId: payload.campaignId || "",
    accountId: payload.accountId || "",
  };
}

function pokerSwRecordCrmCampaignOpen(notificationData) {
  var payload = notificationData && typeof notificationData === "object" ? notificationData : {};
  if (payload.kind !== "crm_campaign" || !payload.campaignId) return Promise.resolve();
  return fetch(self.location.origin + "/api/player-crm-push-event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "push_open",
      campaignId: payload.campaignId || "",
      accountId: payload.accountId || "",
      tag: payload.tag || "",
      openUrl: payload.openUrl || "",
    }),
  }).catch(function () {});
}

self.addEventListener("push", function (event) {
  var root = self.location.origin || "";
  var data = {
    title: "Два туза",
    body: "Новое сообщение в чате",
    openUrl: "./?startapp=club_chat",
    tag: "poker-chat",
    kind: "",
    campaignId: "",
    accountId: "",
  };
  try {
    if (event.data) {
      var j = event.data.json();
      if (j && j.title) data.title = j.title;
      if (j && j.body) data.body = j.body;
      if (j && j.openUrl) data.openUrl = j.openUrl;
      if (j && j.tag) data.tag = j.tag;
      if (j && j.kind) data.kind = j.kind;
      if (j && j.campaignId) data.campaignId = j.campaignId;
      if (j && j.accountId) data.accountId = j.accountId;
    }
  } catch (e1) {}
  var iconUrl = root + "/assets/logo-two-aces.png";
  var notifOpts = {
    body: data.body,
    icon: iconUrl,
    badge: iconUrl,
    tag: data.tag || "poker-chat",
    renotify: true,
    silent: false,
    vibrate: [180, 80, 120],
    data: pokerSwNotificationData(data),
  };
  event.waitUntil(
    Promise.all([
      self.registration
        .showNotification(data.title, notifOpts)
        .catch(function (eShow) {
          try {
            console.error("[sw] showNotification", eShow && eShow.message ? eShow.message : eShow);
          } catch (eLog) {}
          return self.registration.showNotification(data.title, {
            body: data.body,
            tag: data.tag || "poker-chat",
            renotify: true,
            silent: false,
            vibrate: [180, 80, 120],
            data: pokerSwNotificationData(data),
          });
        }),
      pokerSwNotifyClientsChatSound(),
      pokerSwNotifyClientsChatPush(data),
    ])
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  var notificationData = event.notification.data || {};
  var raw = notificationData.openUrl || "./?startapp=club_chat";
  var targetUrl;
  try {
    targetUrl = new URL(raw.replace(/^\.\//, "/"), self.location.origin).href;
  } catch (e2) {
    targetUrl = self.location.origin + "/?startapp=club_chat";
  }
  function waitMs(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  }
  function notifyClient(client) {
    if (!client) return Promise.resolve();
    try {
      client.postMessage({ pokerChatOpenUrl: raw, pokerChatOpenUrlAbsolute: targetUrl });
    } catch (ePostFocus) {}
    return Promise.resolve();
  }
  function notifyClientRobust(client) {
    if (!client) return Promise.resolve();
    return notifyClient(client)
      .then(function () { return waitMs(80); })
      .then(function () { return notifyClient(client); })
      .catch(function () {});
  }
  function reopenAndNotifyTarget() {
    if (!clients.openWindow) return Promise.resolve();
    return clients.openWindow(targetUrl).then(function (openedClient) {
      if (openedClient) {
        return notifyClientRobust(openedClient);
      }
      return waitMs(700).then(function () {
        return clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (retryClients) {
          var i;
          for (i = 0; i < retryClients.length; i++) {
            var rc = retryClients[i];
            if (rc && rc.url && rc.url.indexOf(self.location.origin) === 0) {
              return notifyClientRobust(rc);
            }
          }
        });
      });
    });
  }
  event.waitUntil(
    Promise.all([
      pokerSwRecordCrmCampaignOpen(notificationData),
      clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (windowClients) {
        var i;
        var chosen = null;
        for (i = 0; i < windowClients.length; i++) {
          var c = windowClients[i];
          if (c.url.indexOf(self.location.origin) === 0) {
            if (!chosen) chosen = c;
            if (c.visibilityState === "visible" || c.focused) {
              chosen = c;
              break;
            }
          }
        }
        if (chosen) {
          return chosen.focus().then(function () {
            return notifyClientRobust(chosen);
          }).catch(function () {
            return reopenAndNotifyTarget();
          });
        }
        return reopenAndNotifyTarget();
      }),
    ])
  );
});

self.addEventListener("pushsubscriptionchange", function (event) {
  event.waitUntil(
    pokerSwNotifyClientsPushRepair({ reason: "pushsubscriptionchange" }).catch(function () {})
  );
});

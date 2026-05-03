/* PWA: installability + push; GET /api/chat uses stale-while-revalidate unless caller explicitly asks for a fresh fetch. */
var POKER_CHAT_API_CACHE = "poker-chat-api-v3";
var POKER_CHAT_API_OLD_CACHES = ["poker-chat-api-v1"];
var POKER_PUSH_ASSETS_CACHE = "poker-push-assets-v2";
var POKER_PUSH_ASSETS_OLD_CACHES = ["poker-push-assets-v1"];
var POKER_CHAT_NOTIFY_WAV = "./assets/chat-push-notify.wav?v=icq-1";

self.addEventListener("install", function (e) {
  self.skipWaiting();
  e.waitUntil(
    caches.open(POKER_PUSH_ASSETS_CACHE).then(function (cache) {
      return cache.add(new Request(POKER_CHAT_NOTIFY_WAV, { cache: "reload" })).catch(function () {
        return cache.add(POKER_CHAT_NOTIFY_WAV).catch(function () {});
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
      }))
    ).then(function () {
      return self.clients.claim();
    })
  );
});

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

self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;
  try {
    var u = new URL(event.request.url);
    if (u.origin !== self.location.origin) return;
    if (u.pathname.indexOf("/api/chat") !== 0) return;
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
    event.respondWith(pokerSwChatApiStaleWhileRevalidate(event.request));
  } catch (eFetch) {}
});

function pokerSwNotifyClientsChatSound() {
  var base = self.location.origin || "";
  var url = base + "/assets/chat-push-notify.wav?v=icq-1";
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

self.addEventListener("push", function (event) {
  var root = self.location.origin || "";
  var data = {
    title: "Два туза",
    body: "Новое сообщение в чате",
    openUrl: "./?startapp=club_chat",
    tag: "poker-chat",
  };
  try {
    if (event.data) {
      var j = event.data.json();
      if (j && j.title) data.title = j.title;
      if (j && j.body) data.body = j.body;
      if (j && j.openUrl) data.openUrl = j.openUrl;
      if (j && j.tag) data.tag = j.tag;
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
    data: { openUrl: data.openUrl },
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
            data: { openUrl: data.openUrl },
          });
        }),
      pokerSwNotifyClientsChatSound(),
      pokerSwNotifyClientsChatPush(data),
    ])
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  var raw = (event.notification.data && event.notification.data.openUrl) || "./?startapp=club_chat";
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
  function navigateClient(client) {
    if (!client || typeof client.navigate !== "function") return Promise.resolve(client);
    return client.navigate(targetUrl).catch(function () {
      return client;
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
    return navigateClient(client)
      .then(function (navigatedClient) {
        return notifyClient(navigatedClient || client);
      })
      .then(function () { return waitMs(450); })
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
    })
  );
});

self.addEventListener("pushsubscriptionchange", function (event) {
  event.waitUntil(
    pokerSwNotifyClientsPushRepair({ reason: "pushsubscriptionchange" }).catch(function () {})
  );
});

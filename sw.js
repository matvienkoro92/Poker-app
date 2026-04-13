/* PWA: installability + push; для GET /api/chat — stale-while-revalidate (ускоряет повторный холодный старт). */
var POKER_CHAT_API_CACHE = "poker-chat-api-v2";
var POKER_PUSH_ASSETS_CACHE = "poker-push-assets-v1";
var POKER_CHAT_NOTIFY_WAV = "./assets/chat-push-notify.wav";

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
  e.waitUntil(self.clients.claim());
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
 лента/личкарисуются из старого ответа, а фоновый revalidate не дергает UI (задержка ~интервал опроса). */
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
  var url = base + "/assets/chat-push-notify.wav";
  return clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (cs) {
    var i;
    for (i = 0; i < cs.length; i++) {
      try {
        cs[i].postMessage({ pokerChatPushSound: true, url: url, volume: 0.88 });
      } catch (ePost) {}
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
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (windowClients) {
      var i;
      for (i = 0; i < windowClients.length; i++) {
        var c = windowClients[i];
        if (c.url.indexOf(self.location.origin) === 0) {
          if (typeof c.navigate === "function") {
            return c.navigate(targetUrl).then(function () {
              return c.focus();
            }).catch(function () {
              return clients.openWindow(targetUrl);
            });
          }
          return c.focus().then(function () {
            return clients.openWindow(targetUrl);
          });
        }
      }
      if (clients.openWindow) return clients.openWindow(targetUrl);
    })
  );
});

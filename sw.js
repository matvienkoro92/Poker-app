/* PWA: кэш не используем — только installability + push-уведомления о чате */
self.addEventListener("install", function () {
  self.skipWaiting();
});
self.addEventListener("activate", function (e) {
  e.waitUntil(self.clients.claim());
});
self.addEventListener("fetch", function () {});

self.addEventListener("push", function (event) {
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
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "./assets/logo-two-aces.png",
      badge: "./assets/logo-two-aces.png",
      tag: data.tag || "poker-chat",
      renotify: true,
      data: { openUrl: data.openUrl },
    })
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

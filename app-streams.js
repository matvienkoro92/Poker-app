// Стримы: LiveKit Cloud для трансляции экрана и микрофона в реальном времени.
var streamsLiveKitScriptPromise = null;
var streamsHlsScriptPromise = null;
var streamsLiveKitBroadcastRoom = null;
var streamsLiveKitWatchRoom = null;
var streamsBroadcastStream = null;
var streamsBroadcastStartedAt = null;
var streamsBroadcastTimerInterval = null;
var streamsBroadcastRoomId = "";
var streamsBroadcastIntentActive = false;
var streamsBroadcastReconnectTimer = null;
var streamsBroadcastReconnectAttempt = 0;
var streamsBroadcastGeneration = 0;
var streamsWatchRoomId = "";
var streamsWatchIntentActive = false;
var streamsWatchReconnectTimer = null;
var streamsWatchReconnectAttempt = 0;
var streamsWatchGeneration = 0;
var streamsWatchRemoteStream = null;
var streamsCloudflareConfigPromise = null;
var streamsCloudflareConfig = null;
var streamsCloudflareEgressId = "";
var streamsCloudflareEgressRoomId = "";
var streamsCloudflareEgressStopping = false;
var streamsCloudflareHls = null;
var streamsCloudflareDelayInterval = null;
var streamsBroadcastLaunchMode = "delayed";
var streamsBroadcastActiveMode = "";

var STREAMS_RECONNECT_DELAYS_MS = [900, 1600, 2600, 4200, 6500, 9000, 12000];
var STREAMS_LIVEKIT_CDN_URLS = [
  "https://cdn.jsdelivr.net/npm/livekit-client@2/dist/livekit-client.umd.min.js",
  "https://unpkg.com/livekit-client@2/dist/livekit-client.umd.min.js"
];
var STREAMS_HLS_CDN_URLS = [
  "https://cdn.jsdelivr.net/npm/hls.js@1/dist/hls.min.js",
  "https://unpkg.com/hls.js@1/dist/hls.min.js"
];

function streamsReconnectDelayMs(attempt) {
  var index = Math.max(0, Math.min(STREAMS_RECONNECT_DELAYS_MS.length - 1, attempt || 0));
  return STREAMS_RECONNECT_DELAYS_MS[index];
}

function streamsClearWatchReconnect() {
  if (streamsWatchReconnectTimer) clearTimeout(streamsWatchReconnectTimer);
  streamsWatchReconnectTimer = null;
}

function streamsClearBroadcastReconnect() {
  if (streamsBroadcastReconnectTimer) clearTimeout(streamsBroadcastReconnectTimer);
  streamsBroadcastReconnectTimer = null;
}

function randomStreamRoomId() {
  return String(100000 + Math.floor(Math.random() * 900000));
}

function getStreamsAppUrl() {
  return getAppBaseUrlForLinks();
}

function buildMiniAppStartLink(startParam) {
  var appUrl = String(getAppBaseUrlForLinks() || "")
    .trim()
    .replace(/\/+$/, "");
  if (!appUrl) return "";
  var sep = appUrl.indexOf("?") >= 0 ? "&" : "?";
  var needSlash = sep === "?" && /^https?:\/\/[^/?#]+$/i.test(appUrl);
  return (
    appUrl +
    (needSlash ? "/" : "") +
    sep +
    "startapp=" +
    encodeURIComponent(String(startParam))
  );
}

function streamsGetLiveKitClient() {
  return window.LivekitClient || window.LiveKitClient || null;
}

function streamsGetHlsClient() {
  return window.Hls || null;
}

function streamsLoadScript(src) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.referrerPolicy = "no-referrer";
    script.onload = function () { resolve(true); };
    script.onerror = function () { reject(new Error("Failed to load " + src)); };
    (document.head || document.documentElement).appendChild(script);
  });
}

function streamsEnsureLiveKitClient() {
  var existing = streamsGetLiveKitClient();
  if (existing && existing.Room) return Promise.resolve(existing);
  if (streamsLiveKitScriptPromise) return streamsLiveKitScriptPromise;
  streamsLiveKitScriptPromise = STREAMS_LIVEKIT_CDN_URLS.reduce(function (chain, url) {
    return chain.catch(function () {
      return streamsLoadScript(url).then(function () {
        var loaded = streamsGetLiveKitClient();
        if (!loaded || !loaded.Room) throw new Error("LiveKit client is not available");
        return loaded;
      });
    });
  }, Promise.reject(new Error("start"))).catch(function (err) {
    streamsLiveKitScriptPromise = null;
    throw err;
  });
  return streamsLiveKitScriptPromise;
}

function streamsEnsureHlsClient() {
  var existing = streamsGetHlsClient();
  if (existing && existing.isSupported && existing.isSupported()) return Promise.resolve(existing);
  if (streamsHlsScriptPromise) return streamsHlsScriptPromise;
  streamsHlsScriptPromise = STREAMS_HLS_CDN_URLS.reduce(function (chain, url) {
    return chain.catch(function () {
      return streamsLoadScript(url).then(function () {
        var loaded = streamsGetHlsClient();
        if (!loaded || !loaded.isSupported || !loaded.isSupported()) throw new Error("HLS client is not available");
        return loaded;
      });
    });
  }, Promise.reject(new Error("start"))).catch(function (err) {
    streamsHlsScriptPromise = null;
    throw err;
  });
  return streamsHlsScriptPromise;
}

function streamsApiBase() {
  if (typeof getTelegramAuthApiBase === "function") return getTelegramAuthApiBase();
  if (typeof getApiBase === "function") return getApiBase();
  if (window.location && window.location.origin) return window.location.origin;
  return "";
}

function streamsAuthBody(extra) {
  if (typeof pokerGuestOrAuthedPostBody === "function") return pokerGuestOrAuthedPostBody(extra || {});
  if (typeof pokerApiAuthJsonBody === "function") return pokerApiAuthJsonBody(extra || {});
  var body = Object.assign({}, extra || {});
  var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
  if (tg && tg.initData) body.initData = tg.initData;
  return body;
}

function streamsFetchLiveKitToken(role, roomId) {
  var base = streamsApiBase();
  if (!base) return Promise.reject(new Error("api_base_missing"));
  var request = typeof pokerAuthFetch === "function" ? pokerAuthFetch : fetch;
  return request(base.replace(/\/$/, "") + "/api/livekit-token", {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(streamsAuthBody({ role: role, room: roomId }))
  }).then(function (res) {
    return res.json().catch(function () { return {}; }).then(function (data) {
      if (!res.ok || !data || data.ok !== true) {
        var code = data && data.error ? String(data.error) : "token_error";
        var err = new Error(code);
        err.status = res.status;
        err.data = data || {};
        throw err;
      }
      return data;
    });
  });
}

function streamsFetchCloudflareConfig(forceRefresh) {
  if (!forceRefresh && streamsCloudflareConfigPromise) return streamsCloudflareConfigPromise;
  var base = streamsApiBase();
  if (!base) return Promise.reject(new Error("api_base_missing"));
  var request = typeof pokerAuthFetch === "function" ? pokerAuthFetch : fetch;
  streamsCloudflareConfigPromise = request(base.replace(/\/$/, "") + "/api/cloudflare-stream", {
    method: "GET",
    cache: "no-store"
  }).then(function (res) {
    return res.json().catch(function () { return {}; }).then(function (data) {
      if (!res.ok || !data || data.ok !== true) {
        var code = data && data.error ? String(data.error) : "cloudflare_stream_config_error";
        var err = new Error(code);
        err.status = res.status;
        err.data = data || {};
        throw err;
      }
      streamsCloudflareConfig = data;
      return data;
    });
  }).catch(function (err) {
    streamsCloudflareConfigPromise = null;
    throw err;
  });
  return streamsCloudflareConfigPromise;
}

function streamsFetchLiveKitEgress(action, roomId, egressId) {
  var base = streamsApiBase();
  if (!base) return Promise.reject(new Error("api_base_missing"));
  var request = typeof pokerAuthFetch === "function" ? pokerAuthFetch : fetch;
  return request(base.replace(/\/$/, "") + "/api/livekit-egress", {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(streamsAuthBody({
      action: action,
      room: roomId || streamsCloudflareEgressRoomId || streamsBroadcastRoomId,
      egressId: egressId || streamsCloudflareEgressId,
    }))
  }).then(function (res) {
    return res.json().catch(function () { return {}; }).then(function (data) {
      if (!res.ok || !data || data.ok !== true) {
        var code = data && data.error ? String(data.error) : "livekit_egress_error";
        var err = new Error(code);
        err.status = res.status;
        err.data = data || {};
        throw err;
      }
      return data;
    });
  });
}

function streamsTokenErrorText(err, role) {
  var code = String(err && err.message || "");
  if (code === "livekit_not_configured") return "LiveKit ещё не настроен на сервере. Проверьте LIVEKIT_URL/API_KEY/API_SECRET и redeploy.";
  if (code === "auth_required_for_broadcast") return "Чтобы запускать стрим, откройте приложение с авторизацией Telegram/PWA.";
  if (code === "admin_required_for_broadcast") return "Запуск стрима доступен только администратору.";
  if (code === "bad_room") return "Некорректный код комнаты. Нужны ровно 6 цифр.";
  return role === "broadcast"
    ? "Не удалось получить токен для трансляции."
    : "Не удалось получить доступ к комнате.";
}

function streamsCloudflareErrorText(err) {
  var code = String(err && err.message || "");
  if (code === "api_base_missing") return "Не удалось определить адрес API для Cloudflare Stream.";
  if (code === "Method not allowed") return "Cloudflare Stream endpoint отвечает некорректно.";
  return "Не удалось загрузить Cloudflare-плеер.";
}

function streamsEgressErrorText(err) {
  var code = String(err && err.message || "");
  if (code === "cloudflare_rtmps_not_configured") return "Cloudflare-мост не настроен: добавьте CLOUDFLARE_STREAM_RTMPS_KEY в Vercel и сделайте redeploy.";
  if (code === "livekit_not_configured") return "LiveKit Egress не запущен: проверьте LIVEKIT_URL/API_KEY/API_SECRET.";
  if (code === "auth_required_for_broadcast") return "Cloudflare-мост доступен только авторизованному ведущему.";
  if (code === "admin_required_for_broadcast") return "Cloudflare-мост доступен только администратору.";
  if (code === "bad_room") return "Cloudflare-мост не получил корректный код комнаты.";
  if (code === "api_base_missing") return "Не удалось определить адрес API для LiveKit Egress.";
  if (err && err.data && err.data.message) return "LiveKit Egress: " + String(err.data.message).slice(0, 160);
  return "Не удалось включить режим с задержкой через Cloudflare.";
}

function streamsSetStatus(el, text, tone) {
  if (!el) return;
  text = String(text || "").trim();
  el.textContent = text;
  el.hidden = !text;
  el.classList.toggle("streams-status--ok", tone === "ok");
  el.classList.toggle("streams-status--warn", tone === "warn");
  el.classList.toggle("streams-status--error", tone === "error");
}

function streamsSetWatchStatus(text, tone) {
  streamsSetStatus(document.getElementById("streamsWatchStatus"), text, tone);
}

function streamsSetBroadcastStatus(text, tone) {
  streamsSetStatus(document.getElementById("streamsBroadcastStatus"), text, tone);
}

function streamsSetCloudflareStatus(text, tone) {
  streamsSetStatus(document.getElementById("streamsCloudflareStatus"), text, tone);
}

function streamsSetEgressStatus(text, tone) {
  streamsSetStatus(document.getElementById("streamsEgressStatus"), text, tone);
}

function streamsClearCloudflareDelayTimer() {
  if (streamsCloudflareDelayInterval) clearInterval(streamsCloudflareDelayInterval);
  streamsCloudflareDelayInterval = null;
}

function streamsDestroyCloudflareHls() {
  if (!streamsCloudflareHls) return;
  try { streamsCloudflareHls.destroy(); } catch (eDestroy) {}
  streamsCloudflareHls = null;
}

function streamsStopMediaStream(stream) {
  if (!stream || !stream.getTracks) return;
  try {
    stream.getTracks().forEach(function (track) { track.stop(); });
  } catch (eTracks) {}
}

function streamsDisconnectRoom(room) {
  if (!room) return;
  try { room.disconnect(); } catch (eDisconnect) {}
}

function streamsResetWatchConnection(keepIntent, keepVideo) {
  streamsClearWatchReconnect();
  streamsWatchGeneration += 1;
  var room = streamsLiveKitWatchRoom;
  streamsLiveKitWatchRoom = null;
  streamsDisconnectRoom(room);
  streamsWatchRemoteStream = null;
  if (!keepIntent) {
    streamsWatchIntentActive = false;
    streamsWatchRoomId = "";
    streamsWatchReconnectAttempt = 0;
  }
  var watchBtn = document.getElementById("streamsWatchBtn");
  var remoteVideo = document.getElementById("streamsRemoteVideo");
  var remoteWrap = document.getElementById("streamsRemoteWrap");
  if (watchBtn) watchBtn.disabled = false;
  if (!keepVideo && remoteVideo) remoteVideo.srcObject = null;
  if (!keepVideo && remoteWrap) remoteWrap.classList.add("streams-remote-wrap--hidden");
  if (!keepIntent) streamsSetWatchStatus("", "");
}

function streamsResetCloudflarePlayer(clearStatus) {
  var frame = document.getElementById("streamsCloudflareFrame");
  var video = document.getElementById("streamsCloudflareVideo");
  var wrap = document.getElementById("streamsCloudflareWrap");
  var refreshBtn = document.getElementById("streamsCloudflareRefreshBtn");
  streamsClearCloudflareDelayTimer();
  streamsDestroyCloudflareHls();
  if (frame) frame.src = "about:blank";
  if (video) {
    try { video.pause(); } catch (ePause) {}
    video.onloadedmetadata = null;
    video.oncanplay = null;
    video.onerror = null;
    video.removeAttribute("src");
    video.hidden = true;
    video.controls = false;
    try { video.load(); } catch (eLoad) {}
  }
  if (wrap) wrap.classList.add("streams-cloudflare-wrap--hidden");
  if (refreshBtn) refreshBtn.disabled = false;
  if (clearStatus) streamsSetCloudflareStatus("", "");
}

function streamsStartCloudflareEgress(roomId, generation) {
  if (!roomId) return Promise.resolve(false);
  if (streamsCloudflareEgressId && streamsCloudflareEgressRoomId === roomId) {
    streamsSetEgressStatus("Режим с задержкой уже отправляет поток в Cloudflare.", "ok");
    return Promise.resolve(true);
  }
  streamsSetEgressStatus("Подключаю Cloudflare Stream без OBS…", "warn");
  return streamsFetchLiveKitEgress("start", roomId, "")
    .then(function (data) {
      var egressId = String(data && data.egressId || "").trim();
      if (generation !== streamsBroadcastGeneration) {
        if (egressId) streamsFetchLiveKitEgress("stop", roomId, egressId).catch(function () {});
        return false;
      }
      streamsCloudflareEgressId = egressId;
      streamsCloudflareEgressRoomId = roomId;
      streamsCloudflareEgressStopping = false;
      streamsSetEgressStatus("Cloudflare-мост включён. Зрители могут открыть вкладку «С задержкой».", "ok");
      return true;
    })
    .catch(function (err) {
      if (generation !== streamsBroadcastGeneration) return false;
      streamsSetEgressStatus(streamsEgressErrorText(err), "error");
      return false;
    });
}

function streamsStopCloudflareEgress(clearStatus) {
  var egressId = streamsCloudflareEgressId;
  var roomId = streamsCloudflareEgressRoomId || streamsBroadcastRoomId;
  streamsCloudflareEgressId = "";
  streamsCloudflareEgressRoomId = "";
  if (!egressId || streamsCloudflareEgressStopping) {
    if (clearStatus) streamsSetEgressStatus("", "");
    return;
  }
  streamsCloudflareEgressStopping = true;
  streamsSetEgressStatus("Останавливаю Cloudflare-мост…", "warn");
  streamsFetchLiveKitEgress("stop", roomId, egressId)
    .then(function () {
      streamsCloudflareEgressStopping = false;
      if (clearStatus) streamsSetEgressStatus("", "");
      else streamsSetEgressStatus("Cloudflare-мост остановлен.", "warn");
    })
    .catch(function () {
      streamsCloudflareEgressStopping = false;
      if (clearStatus) streamsSetEgressStatus("", "");
      else streamsSetEgressStatus("LiveKit сам остановит Cloudflare-мост после закрытия комнаты.", "warn");
    });
}

function streamsResetBroadcastRuntime(btnText, disconnectRoom) {
  streamsClearBroadcastReconnect();
  streamsBroadcastIntentActive = false;
  streamsBroadcastRoomId = "";
  streamsBroadcastReconnectAttempt = 0;
  streamsBroadcastGeneration += 1;
  streamsBroadcastActiveMode = "";
  streamsSetBroadcastModeDisabled(false);
  if (disconnectRoom) streamsStopCloudflareEgress(false);
  if (disconnectRoom) {
    var room = streamsLiveKitBroadcastRoom;
    streamsLiveKitBroadcastRoom = null;
    streamsDisconnectRoom(room);
  } else {
    streamsLiveKitBroadcastRoom = null;
  }
  streamsStopMediaStream(streamsBroadcastStream);
  streamsBroadcastStream = null;
  if (streamsBroadcastTimerInterval) clearInterval(streamsBroadcastTimerInterval);
  streamsBroadcastTimerInterval = null;
  streamsBroadcastStartedAt = null;
  var timerEl = document.getElementById("streamsBroadcastTimer");
  var previewWrap = document.getElementById("streamsPreviewWrap");
  var previewVideo = document.getElementById("streamsPreviewVideo");
  var startBtn = document.getElementById("streamsStartBtn");
  if (timerEl) timerEl.textContent = "";
  if (previewWrap) previewWrap.classList.add("streams-preview-wrap--hidden");
  if (previewVideo) previewVideo.srcObject = null;
  if (startBtn) {
    startBtn.disabled = false;
    if (btnText) startBtn.textContent = btnText;
  }
}

function streamsCleanup() {
  streamsResetBroadcastRuntime(null, true);
  streamsResetWatchConnection(false, false);
  streamsResetCloudflarePlayer(true);
  streamsSetBroadcastStatus("", "");
  streamsSetWatchStatus("", "");
  streamsSetCloudflareStatus("", "");
  streamsSetEgressStatus("", "");
}

function streamsPad2(n) {
  return n < 10 ? "0" + n : String(n);
}

function streamsUpdateBroadcastTimerText() {
  var timerEl = document.getElementById("streamsBroadcastTimer");
  if (!timerEl) return;
  if (!streamsBroadcastStartedAt) {
    timerEl.textContent = "";
    return;
  }
  var elapsedSec = Math.floor((Date.now() - streamsBroadcastStartedAt) / 1000);
  var h = Math.floor(elapsedSec / 3600);
  var m = Math.floor((elapsedSec % 3600) / 60);
  var s = elapsedSec % 60;
  var t = h > 0 ? h + ":" + streamsPad2(m) + ":" + streamsPad2(s) : streamsPad2(m) + ":" + streamsPad2(s);
  timerEl.textContent = "Трансляция запущена: " + t;
}

function streamsNormalizeRoleTabName(name) {
  name = String(name || "").trim();
  return name === "broadcast" || name === "delayed" ? name : "watch";
}

function streamsSetRoleTab(name) {
  name = streamsNormalizeRoleTabName(name);
  Array.prototype.slice.call(document.querySelectorAll("[data-streams-tab-target]")).forEach(function (tab) {
    var isActive = tab.getAttribute("data-streams-tab-target") === name;
    tab.classList.toggle("streams-role-tab--active", isActive);
    tab.setAttribute("aria-selected", isActive ? "true" : "false");
  });
  Array.prototype.slice.call(document.querySelectorAll("[data-streams-tab-panel]")).forEach(function (panel) {
    panel.hidden = panel.getAttribute("data-streams-tab-panel") !== name;
  });
}

function streamsNormalizeBroadcastMode(mode) {
  mode = String(mode || "").trim();
  return mode === "instant" ? "instant" : "delayed";
}

function streamsSetBroadcastMode(mode) {
  mode = streamsNormalizeBroadcastMode(mode);
  streamsBroadcastLaunchMode = mode;
  Array.prototype.slice.call(document.querySelectorAll("[data-streams-broadcast-mode]")).forEach(function (btn) {
    var isActive = btn.getAttribute("data-streams-broadcast-mode") === mode;
    btn.classList.toggle("streams-broadcast-mode-btn--active", isActive);
    btn.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

function streamsSetBroadcastModeDisabled(disabled) {
  Array.prototype.slice.call(document.querySelectorAll("[data-streams-broadcast-mode]")).forEach(function (btn) {
    btn.disabled = !!disabled;
  });
}

function streamsAppendQueryParam(url, key, value) {
  url = String(url || "").trim();
  if (!url) return "";
  try {
    var parsed = new URL(url, window.location.href);
    parsed.searchParams.set(key, value);
    return parsed.toString();
  } catch (e) {
    return url + (url.indexOf("?") >= 0 ? "&" : "?") + encodeURIComponent(key) + "=" + encodeURIComponent(value);
  }
}

function streamsCloudflareDelaySeconds(data) {
  var n = Math.round(Number(data && data.delaySeconds));
  if (!isFinite(n) || n <= 0) n = 120;
  return Math.max(30, Math.min(1800, n));
}

function streamsCloudflareDelayLabel(seconds) {
  seconds = Math.max(1, Math.round(Number(seconds) || 120));
  if (seconds % 60 === 0) return String(seconds / 60) + " мин";
  return String(seconds) + " сек";
}

function streamsCloudflareDvrHlsUrl(data) {
  var url = String(data && (data.hlsDvrUrl || data.hlsUrl) || "").trim();
  return url ? streamsAppendQueryParam(url, "dvrEnabled", "true") : "";
}

function streamsCloudflareSeekableInfo(video) {
  if (!video || !video.seekable || video.seekable.length < 1) return null;
  try {
    var last = video.seekable.length - 1;
    return {
      start: video.seekable.start(0),
      edge: video.seekable.end(last),
    };
  } catch (e) {
    return null;
  }
}

function streamsApplyCloudflareDelay(video, delaySeconds, forceSeek) {
  var info = streamsCloudflareSeekableInfo(video);
  if (!info || !isFinite(info.edge) || !isFinite(info.start) || info.edge <= info.start) return null;
  var target = Math.max(info.start, info.edge - delaySeconds);
  var currentDelay = info.edge - (video.currentTime || info.start);
  var shouldSeek =
    forceSeek ||
    !isFinite(currentDelay) ||
    currentDelay < delaySeconds - 8 ||
    currentDelay > delaySeconds + 45;
  if (shouldSeek && isFinite(target)) {
    try { video.currentTime = target; } catch (eSeek) {}
    currentDelay = info.edge - target;
  }
  return {
    availableDelay: Math.max(0, info.edge - info.start),
    currentDelay: Math.max(0, currentDelay),
    target: target,
  };
}

function streamsStartCloudflareDelayLoop(video, delaySeconds) {
  streamsClearCloudflareDelayTimer();
  var label = streamsCloudflareDelayLabel(delaySeconds);
  function tick(forceSeek) {
    var state = streamsApplyCloudflareDelay(video, delaySeconds, !!forceSeek);
    if (!state) return;
    if (state.availableDelay < delaySeconds - 5) {
      streamsSetCloudflareStatus("Плеер работает, буфер " + label + " ещё набирается.", "warn");
      return;
    }
    streamsSetCloudflareStatus("Плеер держит задержку " + label + ".", "ok");
  }
  tick(true);
  streamsCloudflareDelayInterval = setInterval(function () { tick(false); }, 5000);
}

function streamsPlayCloudflareVideo(video, delaySeconds) {
  if (!video) return;
  streamsApplyCloudflareDelay(video, delaySeconds, true);
  try {
    var playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(function () {
        streamsSetCloudflareStatus("Плеер готов с задержкой " + streamsCloudflareDelayLabel(delaySeconds) + ". Нажмите видео, чтобы запустить.", "warn");
      });
    }
  } catch (e) {
    streamsSetCloudflareStatus("Плеер готов с задержкой " + streamsCloudflareDelayLabel(delaySeconds) + ". Нажмите видео, чтобы запустить.", "warn");
  }
}

function streamsLoadCloudflareDelayedVideo(data, forceRefresh) {
  var wrap = document.getElementById("streamsCloudflareWrap");
  var frame = document.getElementById("streamsCloudflareFrame");
  var video = document.getElementById("streamsCloudflareVideo");
  var hlsUrl = streamsCloudflareDvrHlsUrl(data);
  var delaySeconds = streamsCloudflareDelaySeconds(data);
  var label = streamsCloudflareDelayLabel(delaySeconds);
  if (!video || !hlsUrl) return Promise.resolve(false);

  streamsClearCloudflareDelayTimer();
  streamsDestroyCloudflareHls();
  if (frame) {
    frame.hidden = true;
    frame.src = "about:blank";
  }
  if (wrap) wrap.classList.remove("streams-cloudflare-wrap--hidden");
  video.hidden = false;
  video.controls = false;
  video.playsInline = true;
  video.muted = false;
  video.onloadedmetadata = function () {
    streamsApplyCloudflareDelay(video, delaySeconds, true);
  };
  video.oncanplay = function () {
    streamsStartCloudflareDelayLoop(video, delaySeconds);
    streamsPlayCloudflareVideo(video, delaySeconds);
  };
  video.onerror = function () {
    streamsSetCloudflareStatus("Не удалось открыть DVR-HLS поток Cloudflare.", "error");
  };
  if (!video.__streamsCloudflareClickHandlerAttached) {
    video.__streamsCloudflareClickHandlerAttached = true;
    video.addEventListener("click", function () {
      if (video.paused) streamsPlayCloudflareVideo(video, streamsCloudflareDelaySeconds(streamsCloudflareConfig));
      else video.pause();
    });
  }

  streamsSetCloudflareStatus((forceRefresh ? "Обновляю" : "Загружаю") + " плеер с задержкой " + label + "…", "warn");
  if (video.canPlayType && video.canPlayType("application/vnd.apple.mpegurl")) {
    if (forceRefresh || video.src !== hlsUrl) video.src = hlsUrl;
    try { video.load(); } catch (eLoad) {}
    return Promise.resolve(true);
  }
  return streamsEnsureHlsClient().then(function (Hls) {
    var hls = new Hls({
      liveSyncDuration: delaySeconds,
      liveMaxLatencyDuration: delaySeconds + 45,
      maxLiveSyncPlaybackRate: 1,
      lowLatencyMode: false,
    });
    streamsCloudflareHls = hls;
    hls.attachMedia(video);
    hls.on(Hls.Events.MEDIA_ATTACHED, function () {
      hls.loadSource(hlsUrl);
    });
    hls.on(Hls.Events.ERROR, function (event, dataErr) {
      if (!dataErr || !dataErr.fatal) return;
      streamsSetCloudflareStatus("HLS-плеер Cloudflare остановился. Нажмите «Обновить плеер».", "error");
    });
    return true;
  }).catch(function () {
    streamsSetCloudflareStatus("Этот браузер не смог загрузить HLS-плеер для задержки " + label + ".", "error");
    return false;
  });
}

function streamsInitCloudflarePlayer(forceRefresh) {
  var refreshBtn = document.getElementById("streamsCloudflareRefreshBtn");
  var video = document.getElementById("streamsCloudflareVideo");
  if (!video) return Promise.resolve(false);
  if (refreshBtn) refreshBtn.disabled = true;
  streamsSetCloudflareStatus(forceRefresh ? "Обновляю Cloudflare-плеер…" : "Загружаю Cloudflare-плеер…", "warn");
  return streamsFetchCloudflareConfig(!!forceRefresh)
    .then(function (data) {
      if (!data || data.configured !== true) {
        streamsResetCloudflarePlayer(false);
        streamsSetCloudflareStatus(
          "Cloudflare Stream ещё не настроен на сервере. Проверьте CLOUDFLARE_STREAM_CUSTOMER_CODE, CLOUDFLARE_STREAM_LIVE_INPUT_ID, CLOUDFLARE_STREAM_HLS_URL и redeploy.",
          "error"
        );
        return false;
      }
      return streamsLoadCloudflareDelayedVideo(data, forceRefresh);
    })
    .catch(function (err) {
      streamsResetCloudflarePlayer(false);
      streamsSetCloudflareStatus(streamsCloudflareErrorText(err), "error");
      return false;
    })
    .then(function (result) {
      if (refreshBtn) refreshBtn.disabled = false;
      return result;
    });
}

function streamsNormalizeRoomId(val) {
  if (!val || !String(val).trim()) return null;
  val = String(val).trim();
  var m =
    val.match(/startapp=streams_(\d{6})/i) ||
    val.match(/[?&]room=(\d{6})(?:&|#|$)/i) ||
    val.match(/#(\d{6})$/);
  if (m) return m[1];
  if (/^\d{6}$/.test(val)) return val;
  return null;
}

function streamsPlayVideo(video, showAlert) {
  if (!video) return;
  try {
    var playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(function () {
        if (showAlert) showAlert("Нажмите Play на видео, чтобы включить звук трансляции.");
      });
    }
  } catch (e) {}
}

function streamsAddRemoteTrack(track, remoteVideo, remoteWrap, showAlert) {
  var mediaTrack = track && track.mediaStreamTrack ? track.mediaStreamTrack : null;
  if (!mediaTrack || !streamsWatchRemoteStream) return;
  var exists = streamsWatchRemoteStream.getTracks().some(function (t) { return t.id === mediaTrack.id; });
  if (!exists) streamsWatchRemoteStream.addTrack(mediaTrack);
  if (remoteVideo.srcObject !== streamsWatchRemoteStream) remoteVideo.srcObject = streamsWatchRemoteStream;
  remoteVideo.muted = false;
  remoteVideo.volume = 1;
  if (remoteWrap) remoteWrap.classList.remove("streams-remote-wrap--hidden");
  streamsPlayVideo(remoteVideo, showAlert);
  streamsSetWatchStatus("Стрим подключён. LiveKit держит автопереподключение.", "ok");
}

function streamsRemoveRemoteTrack(track, remoteWrap) {
  var mediaTrack = track && track.mediaStreamTrack ? track.mediaStreamTrack : null;
  if (!mediaTrack || !streamsWatchRemoteStream) return;
  try { streamsWatchRemoteStream.removeTrack(mediaTrack); } catch (eRemove) {}
  if (streamsWatchRemoteStream.getTracks().length === 0) {
    if (remoteWrap) remoteWrap.classList.add("streams-remote-wrap--hidden");
    streamsSetWatchStatus("Комната открыта, но ведущий пока не отдаёт видео.", "warn");
  }
}

function streamsAttachExistingLiveKitTracks(room, remoteVideo, remoteWrap, showAlert) {
  if (!room || !room.remoteParticipants || typeof room.remoteParticipants.forEach !== "function") return;
  room.remoteParticipants.forEach(function (participant) {
    var publications = participant && participant.trackPublications;
    if (!publications || typeof publications.forEach !== "function") return;
    publications.forEach(function (publication) {
      if (publication && publication.track) streamsAddRemoteTrack(publication.track, remoteVideo, remoteWrap, showAlert);
    });
  });
}

function streamsAttachBroadcastTrackGuards(stream, btnText) {
  try {
    stream.getTracks().forEach(function (track) {
      track.addEventListener("ended", function () {
        if (stream !== streamsBroadcastStream) return;
        streamsResetBroadcastRuntime(btnText, true);
        streamsSetBroadcastStatus("Источник трансляции остановлен.", "warn");
      });
    });
  } catch (eTrackGuard) {}
}

function streamsPublishMediaStream(room, stream) {
  var LK = streamsGetLiveKitClient() || {};
  var sources = LK.Track && LK.Track.Source ? LK.Track.Source : {};
  var tasks = [];
  try {
    stream.getVideoTracks().forEach(function (track, index) {
      tasks.push(room.localParticipant.publishTrack(track, {
        name: index === 0 ? "screen" : "screen-" + index,
        source: sources.ScreenShare || "screen_share"
      }));
    });
    stream.getAudioTracks().forEach(function (track, index) {
      tasks.push(room.localParticipant.publishTrack(track, {
        name: index === 0 ? "microphone" : "microphone-" + index,
        source: sources.Microphone || "microphone"
      }));
    });
  } catch (ePublishList) {
    return Promise.reject(ePublishList);
  }
  return tasks.reduce(function (chain, task) {
    return chain.then(function () { return task; });
  }, Promise.resolve(true));
}

function streamsScheduleWatchReconnect(reason, keepVideo) {
  if (!streamsWatchIntentActive || !streamsWatchRoomId) return;
  streamsClearWatchReconnect();
  var delay = streamsReconnectDelayMs(streamsWatchReconnectAttempt);
  var seconds = Math.max(1, Math.ceil(delay / 1000));
  var roomId = streamsWatchRoomId;
  var generation = streamsWatchGeneration;
  streamsSetWatchStatus((reason || "Связь просела.") + " Переподключаюсь через " + seconds + " сек.", "warn");
  if (!keepVideo) {
    var remoteVideo = document.getElementById("streamsRemoteVideo");
    var remoteWrap = document.getElementById("streamsRemoteWrap");
    if (remoteVideo) remoteVideo.srcObject = null;
    if (remoteWrap) remoteWrap.classList.add("streams-remote-wrap--hidden");
  }
  streamsWatchReconnectTimer = setTimeout(function () {
    streamsWatchReconnectTimer = null;
    if (!streamsWatchIntentActive || streamsWatchRoomId !== roomId) return;
    if (generation !== streamsWatchGeneration) return;
    streamsWatchReconnectAttempt += 1;
    if (typeof window.startStreamsWatchByRoomId === "function") {
      window.startStreamsWatchByRoomId(roomId, 0, true);
    }
  }, delay);
}

function streamsScheduleBroadcastReconnect(reason, btnText, mode) {
  if (!streamsBroadcastIntentActive || !streamsBroadcastRoomId || !streamsBroadcastStream) return;
  mode = streamsNormalizeBroadcastMode(mode || streamsBroadcastActiveMode || streamsBroadcastLaunchMode);
  streamsClearBroadcastReconnect();
  var delay = streamsReconnectDelayMs(streamsBroadcastReconnectAttempt);
  var seconds = Math.max(1, Math.ceil(delay / 1000));
  var roomId = streamsBroadcastRoomId;
  var stream = streamsBroadcastStream;
  var generation = streamsBroadcastGeneration;
  streamsSetBroadcastStatus((reason || "Связь просела.") + " Восстанавливаю трансляцию через " + seconds + " сек.", "warn");
  streamsBroadcastReconnectTimer = setTimeout(function () {
    streamsBroadcastReconnectTimer = null;
    if (!streamsBroadcastIntentActive || streamsBroadcastRoomId !== roomId || streamsBroadcastStream !== stream) return;
    if (generation !== streamsBroadcastGeneration) return;
    streamsBroadcastReconnectAttempt += 1;
    streamsConnectLiveKitBroadcast(roomId, stream, btnText, true, mode);
  }, delay);
}

function streamsConnectLiveKitBroadcast(roomId, stream, btnText, reconnecting, mode) {
  var startBtn = document.getElementById("streamsStartBtn");
  var previewWrap = document.getElementById("streamsPreviewWrap");
  var previewVideo = document.getElementById("streamsPreviewVideo");
  var shareLinkInput = document.getElementById("streamsShareLink");
  var browserLinkInput = document.getElementById("streamsBrowserLinkInput");
  var roomInput = document.getElementById("streamsRoomInput");

  mode = streamsNormalizeBroadcastMode(mode || streamsBroadcastActiveMode || streamsBroadcastLaunchMode);
  streamsBroadcastActiveMode = mode;
  streamsSetBroadcastMode(mode);
  streamsSetBroadcastModeDisabled(true);
  streamsClearBroadcastReconnect();
  streamsBroadcastRoomId = roomId;
  streamsBroadcastIntentActive = true;
  streamsBroadcastGeneration += 1;
  var generation = streamsBroadcastGeneration;
  if (startBtn) startBtn.disabled = true;
  if (previewVideo) previewVideo.srcObject = stream;
  if (previewWrap) previewWrap.classList.remove("streams-preview-wrap--hidden");
  streamsSetBroadcastStatus(reconnecting ? "Восстанавливаю LiveKit-комнату…" : "Подключаю LiveKit…", "warn");
  if (mode === "instant") streamsSetEgressStatus("", "");
  if (streamsLiveKitBroadcastRoom) {
    var oldRoom = streamsLiveKitBroadcastRoom;
    streamsLiveKitBroadcastRoom = null;
    streamsDisconnectRoom(oldRoom);
  }

  streamsEnsureLiveKitClient()
    .then(function (LK) {
      if (generation !== streamsBroadcastGeneration) throw new Error("stale");
      return streamsFetchLiveKitToken("broadcast", roomId).then(function (tokenData) {
        return { LK: LK, tokenData: tokenData };
      });
    })
    .then(function (ctx) {
      if (generation !== streamsBroadcastGeneration) throw new Error("stale");
      var LK = ctx.LK;
      var events = LK.RoomEvent || {};
      var room = new LK.Room({ adaptiveStream: true, dynacast: true });
      streamsLiveKitBroadcastRoom = room;
      room.on(events.Reconnecting || "reconnecting", function () {
        if (generation !== streamsBroadcastGeneration) return;
        streamsSetBroadcastStatus("LiveKit переподключает трансляцию…", "warn");
      });
      room.on(events.Reconnected || "reconnected", function () {
        if (generation !== streamsBroadcastGeneration) return;
        streamsBroadcastReconnectAttempt = 0;
        streamsSetBroadcastStatus("Трансляция восстановлена.", "ok");
      });
      room.on(events.Disconnected || "disconnected", function () {
        if (generation !== streamsBroadcastGeneration) return;
        streamsLiveKitBroadcastRoom = null;
        if (streamsBroadcastIntentActive && streamsBroadcastStream) {
          streamsScheduleBroadcastReconnect("LiveKit закрыл соединение.", btnText, mode);
        }
      });
      return room.connect(ctx.tokenData.url, ctx.tokenData.token, { autoSubscribe: false }).then(function () {
        if (generation !== streamsBroadcastGeneration) throw new Error("stale");
        return streamsPublishMediaStream(room, stream).then(function () {
          var egressPromise = mode === "delayed"
            ? streamsStartCloudflareEgress(roomId, generation)
            : Promise.resolve(false);
          return egressPromise.then(function () {
            return ctx.tokenData;
          });
        });
      });
    })
    .then(function () {
      if (generation !== streamsBroadcastGeneration) return;
      var link = mode === "delayed"
        ? buildMiniAppStartLink("streams_delayed")
        : buildMiniAppStartLink("streams_" + roomId);
      if (shareLinkInput) shareLinkInput.value = link;
      if (browserLinkInput && typeof isTelegramWebApp === "function" && isTelegramWebApp()) browserLinkInput.value = link;
      if (roomInput) roomInput.placeholder = roomId;
      streamsBroadcastStartedAt = streamsBroadcastStartedAt || Date.now();
      if (streamsBroadcastTimerInterval) clearInterval(streamsBroadcastTimerInterval);
      streamsUpdateBroadcastTimerText();
      streamsBroadcastTimerInterval = setInterval(streamsUpdateBroadcastTimerText, 1000);
      streamsBroadcastReconnectAttempt = 0;
      if (startBtn) {
        startBtn.disabled = false;
        startBtn.textContent = btnText;
      }
      streamsSetBroadcastStatus(
        mode === "delayed"
          ? "Трансляция активна. Для зрителей включён режим против подсматривания."
          : "Трансляция активна без задержки через LiveKit.",
        "ok"
      );
    })
    .catch(function (err) {
      if (String(err && err.message || "") === "stale") return;
      if (generation !== streamsBroadcastGeneration) return;
      var text = err && err.data ? streamsTokenErrorText(err, "broadcast") : "Не удалось подключить LiveKit-трансляцию.";
      streamsResetBroadcastRuntime(btnText, true);
      streamsSetBroadcastStatus(text, "error");
      var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (tg && tg.showAlert) tg.showAlert(text);
      else if (typeof alert === "function") alert(text);
    });
}

function consumePendingStreamsWatchRoom() {
  try {
    if (window.__pendingStreamsDelayed) {
      window.__pendingStreamsDelayed = false;
      setTimeout(function () {
        streamsSetRoleTab("delayed");
        streamsInitCloudflarePlayer(false);
      }, 0);
      return;
    }
    if (!window.__pendingStreamsRoomId) return;
    if (typeof window.startStreamsWatchByRoomId !== "function") return;
    var pendingRoomId = window.__pendingStreamsRoomId;
    window.__pendingStreamsRoomId = null;
    setTimeout(function () {
      window.startStreamsWatchByRoomId(pendingRoomId);
    }, 0);
  } catch (e) {}
}

function initStreams() {
  var startBtn = document.getElementById("streamsStartBtn");
  var stopBtn = document.getElementById("streamsStopBtn");
  var previewVideo = document.getElementById("streamsPreviewVideo");
  var shareLinkInput = document.getElementById("streamsShareLink");
  var copyLinkBtn = document.getElementById("streamsCopyLinkBtn");
  var browserLinkInput = document.getElementById("streamsBrowserLinkInput");
  var copyBrowserLinkBtn = document.getElementById("streamsCopyBrowserLinkBtn");
  var openBrowserBtn = document.getElementById("streamsOpenBrowserBtn");
  var roomInput = document.getElementById("streamsRoomInput");
  var broadcastRoomInput = document.getElementById("streamsBroadcastRoomInput");
  var watchBtn = document.getElementById("streamsWatchBtn");
  var stopWatchBtn = document.getElementById("streamsStopWatchBtn");
  var remoteWrap = document.getElementById("streamsRemoteWrap");
  var remoteVideo = document.getElementById("streamsRemoteVideo");
  var previewFullscreenBtn = document.getElementById("streamsPreviewFullscreenBtn");
  var remoteFullscreenBtn = document.getElementById("streamsRemoteFullscreenBtn");
  var cloudflareRefreshBtn = document.getElementById("streamsCloudflareRefreshBtn");
  var broadcastModeButtons = document.querySelectorAll("[data-streams-broadcast-mode]");
  var roleTabs = document.querySelectorAll("[data-streams-tab-target]");
  var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;

  if (!startBtn || !previewVideo) return;
  window.__streamsInitAttached = true;

  function showAlert(msg) {
    if (tg && tg.showAlert) tg.showAlert(msg); else alert(msg);
  }

  function requestFullscreen(el) {
    if (!el) return;
    if (el.webkitEnterFullscreen) return el.webkitEnterFullscreen();
    if (el.webkitRequestFullscreen) return el.webkitRequestFullscreen();
    if (el.requestFullscreen) return el.requestFullscreen();
  }

  function exitFullscreen() {
    if (document.exitFullscreen) return document.exitFullscreen();
    if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
  }

  function isFullscreenEl(el) {
    try {
      return document.fullscreenElement === el || document.webkitFullscreenElement === el;
    } catch (e) {
      return false;
    }
  }

  function toggleFullscreen(el) {
    if (!el) return;
    if (isFullscreenEl(el)) exitFullscreen();
    else requestFullscreen(el);
  }

  function copyTextToClipboard(input, successMessage, failMessage) {
    if (!input) return;
    var text = String(input.value || "");
    if (!text) {
      showAlert("Ссылка ещё не готова.");
      return;
    }
    function fallbackCopy() {
      var copied = false;
      try {
        input.focus();
        input.select();
        if (typeof input.setSelectionRange === "function") input.setSelectionRange(0, text.length);
        copied = !!(document.execCommand && document.execCommand("copy"));
      } catch (eCopy) {
        copied = false;
      }
      if (copied) showAlert(successMessage);
      else showAlert(failMessage || "Не удалось скопировать ссылку. Скопируйте её вручную.");
    }
    var nav = window.navigator || null;
    if (nav && nav.clipboard && nav.clipboard.writeText && window.isSecureContext) {
      nav.clipboard.writeText(text).then(function () {
        showAlert(successMessage);
      }).catch(fallbackCopy);
      return;
    }
    fallbackCopy();
  }

  Array.prototype.slice.call(roleTabs || []).forEach(function (tab) {
    if (tab.__streamsRoleTabHandlerAttached) return;
    tab.__streamsRoleTabHandlerAttached = true;
    tab.addEventListener("click", function () {
      var target = streamsNormalizeRoleTabName(tab.getAttribute("data-streams-tab-target"));
      streamsSetRoleTab(target);
      if (target === "delayed") streamsInitCloudflarePlayer(false);
    });
  });

  if (cloudflareRefreshBtn && !cloudflareRefreshBtn.__streamsCloudflareHandlerAttached) {
    cloudflareRefreshBtn.__streamsCloudflareHandlerAttached = true;
    cloudflareRefreshBtn.addEventListener("click", function () {
      streamsInitCloudflarePlayer(true);
    });
  }

  Array.prototype.slice.call(broadcastModeButtons || []).forEach(function (btn) {
    if (btn.__streamsBroadcastModeHandlerAttached) return;
    btn.__streamsBroadcastModeHandlerAttached = true;
    btn.addEventListener("click", function () {
      if (streamsBroadcastStream || streamsLiveKitBroadcastRoom) return;
      streamsSetBroadcastMode(btn.getAttribute("data-streams-broadcast-mode"));
    });
  });
  streamsSetBroadcastMode(streamsBroadcastLaunchMode);

  var directAppUrl =
    typeof buildMiniAppStartLink === "function"
      ? buildMiniAppStartLink("streams")
      : window.location.origin + window.location.pathname + (window.location.search || "") + "#streams";
  if (browserLinkInput && !browserLinkInput.value) browserLinkInput.value = directAppUrl;

  window.startStreamsWatchByRoomId = function (roomId, attempt, autoReconnect) {
    roomId = streamsNormalizeRoomId(roomId);
    if (!roomId) return;
    if (!watchBtn || !roomInput || !remoteWrap || !remoteVideo) return;
    streamsSetRoleTab("watch");
    streamsWatchIntentActive = true;
    streamsWatchRoomId = roomId;
    if (!autoReconnect) streamsWatchReconnectAttempt = 0;
    streamsResetWatchConnection(true, !!autoReconnect && !!remoteVideo.srcObject);
    streamsWatchIntentActive = true;
    streamsWatchRoomId = roomId;
    var generation = streamsWatchGeneration;

    roomInput.value = roomId;
    watchBtn.disabled = true;
    streamsSetWatchStatus(autoReconnect ? "Восстанавливаю стрим через LiveKit…" : "Подключаюсь к LiveKit-комнате…", "warn");

    Promise.resolve()
      .then(streamsEnsureLiveKitClient)
      .then(function (LK) {
        if (generation !== streamsWatchGeneration) throw new Error("stale");
        return streamsFetchLiveKitToken("watch", roomId).then(function (tokenData) {
          return { LK: LK, tokenData: tokenData };
        });
      })
      .then(function (ctx) {
        if (generation !== streamsWatchGeneration) throw new Error("stale");
        var LK = ctx.LK;
        var events = LK.RoomEvent || {};
        streamsWatchRemoteStream = new MediaStream();
        remoteVideo.srcObject = streamsWatchRemoteStream;
        var room = new LK.Room({ adaptiveStream: true, dynacast: true });
        streamsLiveKitWatchRoom = room;
        room.on(events.TrackSubscribed || "trackSubscribed", function (track) {
          if (generation !== streamsWatchGeneration) return;
          streamsAddRemoteTrack(track, remoteVideo, remoteWrap, showAlert);
        });
        room.on(events.TrackUnsubscribed || "trackUnsubscribed", function (track) {
          if (generation !== streamsWatchGeneration) return;
          streamsRemoveRemoteTrack(track, remoteWrap);
        });
        room.on(events.Reconnecting || "reconnecting", function () {
          if (generation !== streamsWatchGeneration) return;
          streamsSetWatchStatus("LiveKit переподключает стрим…", "warn");
        });
        room.on(events.Reconnected || "reconnected", function () {
          if (generation !== streamsWatchGeneration) return;
          streamsWatchReconnectAttempt = 0;
          streamsSetWatchStatus("Стрим восстановлен.", "ok");
          streamsPlayVideo(remoteVideo, showAlert);
        });
        room.on(events.Disconnected || "disconnected", function () {
          if (generation !== streamsWatchGeneration) return;
          streamsLiveKitWatchRoom = null;
          if (streamsWatchIntentActive && streamsWatchRoomId) {
            streamsScheduleWatchReconnect("LiveKit закрыл соединение.", !!remoteVideo.srcObject);
          }
        });
        return room.connect(ctx.tokenData.url, ctx.tokenData.token, { autoSubscribe: true }).then(function () {
          if (generation !== streamsWatchGeneration) throw new Error("stale");
          streamsAttachExistingLiveKitTracks(room, remoteVideo, remoteWrap, showAlert);
          watchBtn.disabled = false;
          streamsWatchReconnectAttempt = 0;
          if (!streamsWatchRemoteStream || streamsWatchRemoteStream.getTracks().length === 0) {
            streamsSetWatchStatus("Комната открыта. Жду ведущего…", "warn");
          }
        });
      })
      .catch(function (err) {
        if (String(err && err.message || "") === "stale") return;
        if (generation !== streamsWatchGeneration) return;
        watchBtn.disabled = false;
        var text = err && err.data ? streamsTokenErrorText(err, "watch") : "Не удалось подключиться к LiveKit.";
        if (err && err.data) {
          streamsResetWatchConnection(false, false);
          streamsSetWatchStatus(text, "error");
        } else if (streamsWatchIntentActive) {
          streamsScheduleWatchReconnect(text, !!remoteVideo.srcObject);
        } else {
          streamsSetWatchStatus(text, "error");
        }
      });
  };

  if (openBrowserBtn && !openBrowserBtn.__streamsOpenBrowserHandlerAttached) {
    openBrowserBtn.__streamsOpenBrowserHandlerAttached = true;
    openBrowserBtn.addEventListener("click", function () {
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      var urlOpen = browserLinkInput && browserLinkInput.value ? browserLinkInput.value : directAppUrl;
      if (tg && tg.openLink) tg.openLink(urlOpen);
      else window.open(urlOpen, "_blank", "noopener");
    });
  }

  if (copyBrowserLinkBtn && browserLinkInput && !copyBrowserLinkBtn.__streamsCopyBrowserHandlerAttached) {
    copyBrowserLinkBtn.__streamsCopyBrowserHandlerAttached = true;
    copyBrowserLinkBtn.addEventListener("click", function () {
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      copyTextToClipboard(
        browserLinkInput,
        "Ссылка скопирована. Вставьте её в адресную строку Chrome и откройте.",
        "Не удалось скопировать ссылку. Скопируйте её вручную."
      );
    });
  }

  if (!startBtn.__streamsStartHandlerAttached) {
    startBtn.__streamsStartHandlerAttached = true;
    startBtn.addEventListener("click", function () {
      if (streamsLiveKitBroadcastRoom || streamsBroadcastStream) return;
      var mediaDevices = window.navigator && window.navigator.mediaDevices ? window.navigator.mediaDevices : null;
      if (!mediaDevices) {
        showAlert("Трансляция недоступна: нет доступа к медиа-устройствам.");
        return;
      }
      var getDisplayMedia = mediaDevices.getDisplayMedia || mediaDevices.webkitGetDisplayMedia;
      if (!getDisplayMedia) {
        showAlert("Трансляция экрана недоступна в Safari и в приложении Telegram. Откройте мини-приложение в Chrome (Android) или в браузере на компьютере.");
        return;
      }
      if (!window.isSecureContext) {
        showAlert("Трансляция экрана работает только по HTTPS. Откройте страницу по ссылке https://…");
        return;
      }
      var userRoomCode = broadcastRoomInput ? broadcastRoomInput.value.trim() : "";
      var roomId = userRoomCode || randomStreamRoomId();
      if (userRoomCode && !/^\d{6}$/.test(userRoomCode)) {
        showAlert("Некорректный код комнаты. Нужны ровно 6 цифр.");
        return;
      }
      if (broadcastRoomInput) broadcastRoomInput.value = roomId;
      startBtn.disabled = true;
      var btnText = startBtn.textContent;
      var selectedMode = streamsNormalizeBroadcastMode(streamsBroadcastLaunchMode);
      startBtn.textContent = "Запрос доступа к экрану…";
      getDisplayMedia.call(mediaDevices, { video: true, audio: false })
        .then(function (screenStream) {
          var combinedStream = new MediaStream();
          screenStream.getVideoTracks().forEach(function (track) { combinedStream.addTrack(track); });
          if (!mediaDevices.getUserMedia) return combinedStream;
          return mediaDevices.getUserMedia({ audio: true }).then(function (micStream) {
            micStream.getAudioTracks().forEach(function (track) { combinedStream.addTrack(track); });
            return combinedStream;
          }).catch(function () { return combinedStream; });
        })
        .then(function (stream) {
          streamsBroadcastStream = stream;
          streamsBroadcastStartedAt = Date.now();
          streamsBroadcastReconnectAttempt = 0;
          streamsAttachBroadcastTrackGuards(stream, btnText);
          streamsConnectLiveKitBroadcast(roomId, stream, btnText, false, selectedMode);
        })
        .catch(function (err) {
          startBtn.disabled = false;
          startBtn.textContent = btnText;
          var msg = "Не удалось запустить трансляцию. Разрешите доступ к экрану и микрофону.";
          if (err && (err.name === "NotAllowedError" || err.name === "PermissionDeniedError")) {
            msg = "Доступ к экрану отклонён. Нажмите «Запустить» снова и выберите экран или вкладку в окне браузера.";
          } else if (err && err.name === "NotFoundError") {
            msg = "Не найден источник для трансляции. Выберите вкладку или окно в диалоге браузера.";
          } else if (err) {
            msg = "Ошибка: " + (err.message || err.name || "неизвестная");
          }
          showAlert(msg);
        });
    });
  }

  if (stopBtn && !stopBtn.__streamsStopHandlerAttached) {
    stopBtn.__streamsStopHandlerAttached = true;
    stopBtn.addEventListener("click", function () {
      streamsResetBroadcastRuntime(null, true);
      var timerEl = document.getElementById("streamsBroadcastTimer");
      if (timerEl) timerEl.textContent = "Трансляция остановлена";
      streamsSetBroadcastStatus("Трансляция остановлена.", "warn");
    });
  }

  if (copyLinkBtn && shareLinkInput && !copyLinkBtn.__streamsCopyLinkHandlerAttached) {
    copyLinkBtn.__streamsCopyLinkHandlerAttached = true;
    copyLinkBtn.addEventListener("click", function () {
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      copyTextToClipboard(shareLinkInput, "Ссылка скопирована", "Не удалось скопировать ссылку. Скопируйте её вручную.");
    });
  }

  if (watchBtn && roomInput && remoteWrap && remoteVideo && !watchBtn.__streamsWatchHandlerAttached) {
    watchBtn.__streamsWatchHandlerAttached = true;
    watchBtn.addEventListener("click", function () {
      var roomId = streamsNormalizeRoomId(roomInput.value);
      if (!roomId) {
        showAlert("Введите код комнаты или ссылку от ведущего.");
        return;
      }
      window.startStreamsWatchByRoomId(roomId);
    });
  }

  if (stopWatchBtn && !stopWatchBtn.__streamsStopWatchHandlerAttached) {
    stopWatchBtn.__streamsStopWatchHandlerAttached = true;
    stopWatchBtn.addEventListener("click", function () {
      streamsResetWatchConnection(false, false);
      streamsSetWatchStatus("Просмотр остановлен.", "warn");
    });
  }

  if (!window.__streamsNetworkGuardAttached) {
    window.__streamsNetworkGuardAttached = true;
    window.addEventListener("offline", function () {
      if (streamsWatchIntentActive) streamsSetWatchStatus("Интернет пропал. LiveKit попробует вернуть стрим автоматически…", "warn");
      if (streamsBroadcastIntentActive) streamsSetBroadcastStatus("Интернет пропал. LiveKit попробует восстановить трансляцию…", "warn");
    });
    window.addEventListener("online", function () {
      if (streamsWatchIntentActive && streamsWatchRoomId) streamsScheduleWatchReconnect("Интернет вернулся.", true);
      if (streamsBroadcastIntentActive && streamsBroadcastRoomId) streamsScheduleBroadcastReconnect("Интернет вернулся.", startBtn ? startBtn.textContent : "Запустить трансляцию", streamsBroadcastActiveMode || streamsBroadcastLaunchMode);
    });
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) return;
      if (streamsWatchIntentActive && remoteVideo && remoteVideo.srcObject) streamsPlayVideo(remoteVideo, function () {});
      else if (streamsWatchIntentActive && streamsWatchRoomId) streamsScheduleWatchReconnect("Экран снова активен.", false);
    });
  }

  if (previewFullscreenBtn && previewVideo && !previewFullscreenBtn.__streamsFullscreenHandlerAttached) {
    previewFullscreenBtn.__streamsFullscreenHandlerAttached = true;
    previewFullscreenBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      toggleFullscreen(previewVideo);
    });
  }
  if (remoteFullscreenBtn && remoteVideo && !remoteFullscreenBtn.__streamsFullscreenHandlerAttached) {
    remoteFullscreenBtn.__streamsFullscreenHandlerAttached = true;
    remoteFullscreenBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      toggleFullscreen(remoteVideo);
    });
  }

  consumePendingStreamsWatchRoom();
}

// Стримы: трансляция экрана и микрофона в реальном времени (PeerJS). Задержка 2 мин — отдельный сервер.
var streamsBroadcastPeer = null;
var streamsBroadcastStream = null;
var streamsWatchPeer = null;
var streamsWatchCall = null;
var streamsBroadcastStartedAt = null;
var streamsBroadcastTimerInterval = null;
var streamsWatchRoomId = "";
var streamsWatchIntentActive = false;
var streamsWatchResetting = false;
var streamsWatchReconnectTimer = null;
var streamsWatchReconnectAttempt = 0;
var streamsWatchWatchdogTimer = null;
var streamsWatchGeneration = 0;
var streamsBroadcastRoomId = "";
var streamsBroadcastIntentActive = false;
var streamsBroadcastResetting = false;
var streamsBroadcastReconnectTimer = null;
var streamsBroadcastReconnectAttempt = 0;
var streamsBroadcastGeneration = 0;

var STREAMS_RECONNECT_DELAYS_MS = [900, 1600, 2600, 4200, 6500, 9000, 12000];

function streamsReconnectDelayMs(attempt) {
  var index = Math.max(0, Math.min(STREAMS_RECONNECT_DELAYS_MS.length - 1, attempt || 0));
  return STREAMS_RECONNECT_DELAYS_MS[index];
}

function streamsClearWatchReconnect() {
  if (streamsWatchReconnectTimer) clearTimeout(streamsWatchReconnectTimer);
  streamsWatchReconnectTimer = null;
}

function streamsClearWatchWatchdog() {
  if (streamsWatchWatchdogTimer) clearTimeout(streamsWatchWatchdogTimer);
  streamsWatchWatchdogTimer = null;
  if (window.__streamsWatchWatchdogTimer) {
    clearTimeout(window.__streamsWatchWatchdogTimer);
    window.__streamsWatchWatchdogTimer = null;
  }
}

function streamsClearBroadcastReconnect() {
  if (streamsBroadcastReconnectTimer) clearTimeout(streamsBroadcastReconnectTimer);
  streamsBroadcastReconnectTimer = null;
}

function randomStreamRoomId() {
  // Ровно 6 цифр (100000–999999), PeerJS id только из цифр.
  return String(100000 + Math.floor(Math.random() * 900000));
}

function getStreamsAppUrl() {
  return getAppBaseUrlForLinks();
}

/**
 * Ссылка на мини‑апп с startapp (если в base URL уже есть «?», добавляем «&»).
 * В Telegram Mini App базис всегда `POKER_DEFAULT_TELEGRAM_MINI_APP_URL`; примеры startParam:
 * raffles, club_chat, learn_play_hub, video_lessons, news / news_N, hall_fame_*, rating_*, streams / streams_123456, …
 */
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

function streamsCleanup() {
  if (streamsBroadcastTimerInterval) clearInterval(streamsBroadcastTimerInterval);
  streamsBroadcastTimerInterval = null;
  streamsBroadcastStartedAt = null;
  streamsBroadcastIntentActive = false;
  streamsBroadcastRoomId = "";
  streamsBroadcastReconnectAttempt = 0;
  streamsBroadcastGeneration += 1;
  streamsClearBroadcastReconnect();
  streamsWatchIntentActive = false;
  streamsWatchRoomId = "";
  streamsWatchReconnectAttempt = 0;
  streamsWatchGeneration += 1;
  streamsClearWatchReconnect();
  streamsClearWatchWatchdog();
  var streamsBroadcastTimerEl = document.getElementById("streamsBroadcastTimer");
  if (streamsBroadcastTimerEl) streamsBroadcastTimerEl.textContent = "";

  if (streamsBroadcastStream) {
    streamsBroadcastStream.getTracks().forEach(function (t) { t.stop(); });
    streamsBroadcastStream = null;
  }
  if (streamsBroadcastPeer) {
    try { streamsBroadcastPeer.destroy(); } catch (e) {}
    streamsBroadcastPeer = null;
  }
  if (streamsWatchCall) {
    try { streamsWatchCall.close(); } catch (e) {}
    streamsWatchCall = null;
  }
  if (streamsWatchPeer) {
    try { streamsWatchPeer.destroy(); } catch (e) {}
    streamsWatchPeer = null;
  }
  var previewWrap = document.getElementById("streamsPreviewWrap");
  var previewVideo = document.getElementById("streamsPreviewVideo");
  var remoteWrap = document.getElementById("streamsRemoteWrap");
  var remoteVideo = document.getElementById("streamsRemoteVideo");
  var watchStatusEl = document.getElementById("streamsWatchStatus");
  var broadcastStatusEl = document.getElementById("streamsBroadcastStatus");
  if (previewWrap) previewWrap.classList.add("streams-preview-wrap--hidden");
  if (previewVideo) previewVideo.srcObject = null;
  if (remoteWrap) remoteWrap.classList.add("streams-remote-wrap--hidden");
  if (remoteVideo) remoteVideo.srcObject = null;
  if (watchStatusEl) {
    watchStatusEl.textContent = "";
    watchStatusEl.hidden = true;
  }
  if (broadcastStatusEl) {
    broadcastStatusEl.textContent = "";
    broadcastStatusEl.hidden = true;
  }
}

/** Старт просмотра по deep link: вызывать после initStreams (в т.ч. когда initStreams вышел раньше из‑за __streamsInitAttached). */
function consumePendingStreamsWatchRoom() {
  try {
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
  // setView("streams") вызывает initStreams при каждом заходе — без guard на кнопке
  // копятся несколько обработчиков; второй getDisplayMedia в том же клике даёт
  // «getDisplayMedia must be called from a user gesture handler».
  if (window.__streamsInitAttached) {
    // При повторном заходе в view нужно:
    // 1) съесть pending deep-link
    // 2) но не навешивать дублей start/watch handlers (см. флаги ниже)
    consumePendingStreamsWatchRoom();
  }
  var startBtn = document.getElementById("streamsStartBtn");
  var stopBtn = document.getElementById("streamsStopBtn");
  var previewWrap = document.getElementById("streamsPreviewWrap");
  var previewVideo = document.getElementById("streamsPreviewVideo");
  var broadcastStatusEl = document.getElementById("streamsBroadcastStatus");
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
  var watchStatusEl = document.getElementById("streamsWatchStatus");
  var streamsBroadcastTimerEl = document.getElementById("streamsBroadcastTimer");
  var previewFullscreenBtn = document.getElementById("streamsPreviewFullscreenBtn");
  var remoteFullscreenBtn = document.getElementById("streamsRemoteFullscreenBtn");
  var roleTabs = document.querySelectorAll("[data-streams-tab-target]");
  var rolePanels = document.querySelectorAll("[data-streams-tab-panel]");
  var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;

  if (!startBtn || !previewWrap || !previewVideo) return;
  window.__streamsInitAttached = true;

  function showAlert(msg) {
    if (tg && tg.showAlert) tg.showAlert(msg); else alert(msg);
  }

  function setStreamsRoleTab(name) {
    name = name === "broadcast" ? "broadcast" : "watch";
    Array.prototype.slice.call(roleTabs || []).forEach(function (tab) {
      var isActive = tab.getAttribute("data-streams-tab-target") === name;
      tab.classList.toggle("streams-role-tab--active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    });
    Array.prototype.slice.call(rolePanels || []).forEach(function (panel) {
      panel.hidden = panel.getAttribute("data-streams-tab-panel") !== name;
    });
  }

  Array.prototype.slice.call(roleTabs || []).forEach(function (tab) {
    if (tab.__streamsRoleTabHandlerAttached) return;
    tab.__streamsRoleTabHandlerAttached = true;
    tab.addEventListener("click", function () {
      setStreamsRoleTab(tab.getAttribute("data-streams-tab-target"));
    });
  });

  var directAppUrl =
    typeof buildMiniAppStartLink === "function"
      ? buildMiniAppStartLink("streams")
      : window.location.origin + window.location.pathname + (window.location.search || "") + "#streams";
  if (browserLinkInput) browserLinkInput.value = directAppUrl;

  function streamsShowAlert(msg) {
    if (tg && tg.showAlert) tg.showAlert(msg);
    else if (typeof alert === "function") alert(msg);
  }

  function setStreamsStatus(el, text, tone) {
    if (!el) return;
    text = String(text || "").trim();
    el.textContent = text;
    el.hidden = !text;
    el.classList.toggle("streams-status--ok", tone === "ok");
    el.classList.toggle("streams-status--warn", tone === "warn");
    el.classList.toggle("streams-status--error", tone === "error");
  }

  function setWatchStatus(text, tone) {
    setStreamsStatus(watchStatusEl, text, tone);
  }

  function setBroadcastStatus(text, tone) {
    setStreamsStatus(broadcastStatusEl, text, tone);
  }

  function isRecoverableStreamsError(err) {
    var type = String(err && err.type || "").toLowerCase();
    var message = String(err && err.message || "").toLowerCase();
    if (/invalid|browser-incompatible|ssl-unavailable/.test(type)) return false;
    if (/permission|notallowed|not found|access/i.test(message)) return false;
    return !type || /network|socket|server|webrtc|disconnected|peer-unavailable|unavailable-id|connection/.test(type + " " + message);
  }

  function resetWatchConnection(keepIntent, keepVideo) {
    streamsClearWatchWatchdog();
    streamsClearWatchReconnect();
    streamsWatchGeneration += 1;
    streamsWatchResetting = true;
    if (streamsWatchCall) {
      try { streamsWatchCall.close(); } catch (eCall) {}
      streamsWatchCall = null;
    }
    if (streamsWatchPeer) {
      try { streamsWatchPeer.destroy(); } catch (ePeer) {}
      streamsWatchPeer = null;
    }
    streamsWatchResetting = false;
    if (!keepVideo && remoteVideo) remoteVideo.srcObject = null;
    if (!keepVideo && remoteWrap) remoteWrap.classList.add("streams-remote-wrap--hidden");
    if (!keepIntent) {
      streamsWatchIntentActive = false;
      streamsWatchRoomId = "";
      streamsWatchReconnectAttempt = 0;
      setWatchStatus("", "");
    }
    if (watchBtn) watchBtn.disabled = false;
  }

  function scheduleWatchReconnect(reason, keepVideo) {
    if (!streamsWatchIntentActive || !streamsWatchRoomId) return;
    streamsClearWatchWatchdog();
    streamsClearWatchReconnect();
    var delay = streamsReconnectDelayMs(streamsWatchReconnectAttempt);
    var seconds = Math.max(1, Math.ceil(delay / 1000));
    var scheduledGeneration = streamsWatchGeneration;
    setWatchStatus((reason || "Связь просела.") + " Переподключаюсь через " + seconds + " сек.", "warn");
    if (watchBtn) watchBtn.disabled = true;
    if (!keepVideo && remoteVideo) remoteVideo.srcObject = null;
    if (!keepVideo && remoteWrap) remoteWrap.classList.add("streams-remote-wrap--hidden");
    streamsWatchReconnectTimer = setTimeout(function () {
      streamsWatchReconnectTimer = null;
      if (!streamsWatchIntentActive || !streamsWatchRoomId) return;
      if (scheduledGeneration !== streamsWatchGeneration) return;
      streamsWatchReconnectAttempt += 1;
      startStreamsWatchByRoomId(streamsWatchRoomId, 0, true);
    }, delay);
  }

  function attachRemoteStreamGuards(stream, watchGeneration) {
    try {
      stream.getTracks().forEach(function (track) {
        track.addEventListener("ended", function () {
          if (watchGeneration !== streamsWatchGeneration) return;
          scheduleWatchReconnect("Поток оборвался.", false);
        });
        track.addEventListener("mute", function () {
          if (watchGeneration !== streamsWatchGeneration) return;
          setWatchStatus("Поток временно не отдаёт данные. Жду восстановления…", "warn");
        });
        track.addEventListener("unmute", function () {
          if (watchGeneration !== streamsWatchGeneration) return;
          if (streamsWatchIntentActive) setWatchStatus("Связь восстановлена. Автозащита активна.", "ok");
        });
      });
    } catch (eTracks) {}
  }

  function attachWatchCallGuards(call, watchGeneration) {
    var pc = call && call.peerConnection;
    if (!pc || pc.__streamsGuardAttached) return;
    pc.__streamsGuardAttached = true;
    function inspectState() {
      if (watchGeneration !== streamsWatchGeneration) return;
      var iceState = String(pc.iceConnectionState || "");
      var connectionState = String(pc.connectionState || "");
      if (/failed|closed/.test(iceState) || /failed|closed/.test(connectionState)) {
        scheduleWatchReconnect("Соединение стрима оборвалось.", false);
      } else if (/disconnected/.test(iceState) || /disconnected/.test(connectionState)) {
        scheduleWatchReconnect("Короткий обрыв связи.", true);
      } else if (/connected|completed/.test(iceState) || /connected/.test(connectionState)) {
        streamsClearWatchReconnect();
        if (streamsWatchIntentActive) setWatchStatus("Связь восстановлена. Автозащита активна.", "ok");
        if (watchBtn) watchBtn.disabled = false;
      }
    }
    try { pc.addEventListener("iceconnectionstatechange", inspectState); } catch (eIce) {}
    try { pc.addEventListener("connectionstatechange", inspectState); } catch (eState) {}
  }

  function showWatchFatalError(msg) {
    resetWatchConnection(false, false);
    setWatchStatus(msg || "Не удалось подключиться к стриму.", "error");
    streamsShowAlert(msg || "Не удалось подключиться к стриму.");
  }

  function requestFullscreen(el) {
    if (!el) return;
    // iOS Safari
    if (el.webkitEnterFullscreen) return el.webkitEnterFullscreen();
    if (el.webkitRequestFullscreen) return el.webkitRequestFullscreen();
    // Standard
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

  function pad2(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function updateBroadcastTimerText() {
    if (!streamsBroadcastTimerEl) return;
    if (!streamsBroadcastStartedAt) {
      streamsBroadcastTimerEl.textContent = "";
      return;
    }
    var elapsedSec = Math.floor((Date.now() - streamsBroadcastStartedAt) / 1000);
    var h = Math.floor(elapsedSec / 3600);
    var m = Math.floor((elapsedSec % 3600) / 60);
    var s = elapsedSec % 60;
    var t = h > 0 ? h + ":" + pad2(m) + ":" + pad2(s) : pad2(m) + ":" + pad2(s);
    streamsBroadcastTimerEl.textContent = "Трансляция запущена: " + t;
  }

  function resetBroadcastRuntime(btnText, destroyPeer) {
    streamsBroadcastIntentActive = false;
    streamsBroadcastRoomId = "";
    streamsBroadcastReconnectAttempt = 0;
    streamsBroadcastGeneration += 1;
    streamsClearBroadcastReconnect();
    if (streamsBroadcastStream) {
      try {
        streamsBroadcastStream.getTracks().forEach(function (t) { t.stop(); });
      } catch (eTracks) {}
      streamsBroadcastStream = null;
    }
    if (destroyPeer && streamsBroadcastPeer) {
      var peerToDestroy = streamsBroadcastPeer;
      streamsBroadcastPeer = null;
      streamsBroadcastResetting = true;
      try { peerToDestroy.destroy(); } catch (eDestroy) {}
      streamsBroadcastResetting = false;
    } else {
      streamsBroadcastPeer = null;
    }
    if (streamsBroadcastTimerInterval) clearInterval(streamsBroadcastTimerInterval);
    streamsBroadcastTimerInterval = null;
    streamsBroadcastStartedAt = null;
    if (streamsBroadcastTimerEl) streamsBroadcastTimerEl.textContent = "";
    if (previewWrap) previewWrap.classList.add("streams-preview-wrap--hidden");
    if (previewVideo) previewVideo.srcObject = null;
    if (startBtn) {
      startBtn.disabled = false;
      if (btnText) startBtn.textContent = btnText;
    }
  }

  function attachBroadcastTrackGuards(stream, btnText) {
    try {
      stream.getTracks().forEach(function (track) {
        track.addEventListener("ended", function () {
          if (stream !== streamsBroadcastStream) return;
          resetBroadcastRuntime(btnText, true);
          setBroadcastStatus("Источник трансляции остановлен.", "warn");
        });
      });
    } catch (eTrackGuard) {}
  }

  function scheduleBroadcastReconnect(reason, btnText) {
    if (!streamsBroadcastIntentActive || !streamsBroadcastRoomId || !streamsBroadcastStream) return;
    streamsClearBroadcastReconnect();
    var delay = streamsReconnectDelayMs(streamsBroadcastReconnectAttempt);
    var seconds = Math.max(1, Math.ceil(delay / 1000));
    var scheduledGeneration = streamsBroadcastGeneration;
    setBroadcastStatus((reason || "Связь просела.") + " Восстанавливаю трансляцию через " + seconds + " сек.", "warn");
    streamsBroadcastReconnectTimer = setTimeout(function () {
      streamsBroadcastReconnectTimer = null;
      if (!streamsBroadcastIntentActive || !streamsBroadcastRoomId || !streamsBroadcastStream) return;
      if (scheduledGeneration !== streamsBroadcastGeneration) return;
      streamsBroadcastReconnectAttempt += 1;
      reconnectBroadcastPeer(btnText);
    }, delay);
  }

  function createBroadcastPeer(roomId, btnText) {
    var PeerJs = typeof Peer !== "undefined" ? Peer : null;
    if (!PeerJs) {
      resetBroadcastRuntime(btnText, true);
      showAlert("Библиотека PeerJS не загружена. Проверьте интернет и обновите страницу.");
      return;
    }
    streamsBroadcastRoomId = roomId;
    streamsBroadcastIntentActive = true;
    streamsBroadcastGeneration += 1;
    var broadcastGeneration = streamsBroadcastGeneration;
    setBroadcastStatus("Поднимаю трансляцию…", "warn");
    var peer = new PeerJs(roomId, { debug: 0 });
    streamsBroadcastPeer = peer;
    peer.on("open", function () {
      if (broadcastGeneration !== streamsBroadcastGeneration) return;
      var link = buildMiniAppStartLink("streams_" + roomId);
      if (shareLinkInput) shareLinkInput.value = link;
      if (browserLinkInput && isTelegramWebApp()) browserLinkInput.value = link;
      if (roomInput) roomInput.placeholder = roomId;
      previewVideo.srcObject = streamsBroadcastStream;
      previewWrap.classList.remove("streams-preview-wrap--hidden");
      streamsBroadcastStartedAt = streamsBroadcastStartedAt || Date.now();
      if (streamsBroadcastTimerInterval) clearInterval(streamsBroadcastTimerInterval);
      updateBroadcastTimerText();
      streamsBroadcastTimerInterval = setInterval(updateBroadcastTimerText, 1000);
      streamsBroadcastReconnectAttempt = 0;
      if (startBtn) {
        startBtn.disabled = false;
        startBtn.textContent = btnText;
      }
      setBroadcastStatus("Трансляция активна. Автовосстановление от обрывов включено.", "ok");
    });
    peer.on("call", function (call) {
      if (broadcastGeneration !== streamsBroadcastGeneration) return;
      if (streamsBroadcastStream) call.answer(streamsBroadcastStream);
    });
    peer.on("disconnected", function () {
      if (broadcastGeneration !== streamsBroadcastGeneration) return;
      if (streamsBroadcastResetting) return;
      scheduleBroadcastReconnect("Сигнальный сервер временно недоступен.", btnText);
    });
    peer.on("close", function () {
      if (broadcastGeneration !== streamsBroadcastGeneration) return;
      if (streamsBroadcastResetting) return;
      if (streamsBroadcastIntentActive) scheduleBroadcastReconnect("Соединение трансляции закрыто.", btnText);
    });
    peer.on("error", function (err) {
      if (broadcastGeneration !== streamsBroadcastGeneration) return;
      if (streamsBroadcastResetting) return;
      if (err && err.type === "unavailable-id" && streamsBroadcastReconnectAttempt <= 0) {
        resetBroadcastRuntime(btnText, true);
        setBroadcastStatus("Этот код комнаты уже занят. Введите другой код.", "error");
        showAlert("Этот код комнаты уже занят. Введите другой код.");
        return;
      }
      if (isRecoverableStreamsError(err)) {
        scheduleBroadcastReconnect("Ошибка сети у трансляции.", btnText);
        return;
      }
      resetBroadcastRuntime(btnText, true);
      setBroadcastStatus("Ошибка трансляции: " + (err && (err.message || err.type) || "сеть"), "error");
      showAlert("Ошибка трансляции: " + (err && (err.message || err.type) || "сеть"));
    });
  }

  function reconnectBroadcastPeer(btnText) {
    if (!streamsBroadcastIntentActive || !streamsBroadcastRoomId || !streamsBroadcastStream) return;
    var peer = streamsBroadcastPeer;
    if (peer && peer.disconnected && !peer.destroyed && typeof peer.reconnect === "function") {
      try {
        peer.reconnect();
        return;
      } catch (eReconnect) {}
    }
    if (peer) {
      streamsBroadcastResetting = true;
      try { peer.destroy(); } catch (eDestroy) {}
      streamsBroadcastResetting = false;
      streamsBroadcastPeer = null;
    }
    createBroadcastPeer(streamsBroadcastRoomId, btnText);
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

  // Делаем стартер “смотреть” по комнате без зависимости от click-обработчика,
  // чтобы deep-link работал стабильно.
  function startStreamsWatchByRoomId(roomId, attempt, autoReconnect) {
    if (!roomId) return;
    attempt = attempt || 0;
    if (!watchBtn || !roomInput || !remoteWrap || !remoteVideo) return;
    setStreamsRoleTab("watch");
    streamsWatchIntentActive = true;
    streamsWatchRoomId = roomId;
    if (!autoReconnect) streamsWatchReconnectAttempt = 0;
    // Если пользователь/глубокая ссылка уже пытались смотреть и peer/call "завис",
    // старый объект может помешать повторному старту. Сбрасываем перед новой попыткой.
    resetWatchConnection(true, !!autoReconnect && !!remoteVideo.srcObject);
    var watchGeneration = streamsWatchGeneration;

    roomInput.value = roomId;
    watchBtn.disabled = true;
    setWatchStatus(autoReconnect ? "Восстанавливаю стрим после обрыва…" : "Подключаюсь к стриму…", "warn");

    var PeerJs = typeof Peer !== "undefined" ? Peer : null;
    if (!PeerJs) {
      if (attempt < 12) {
        // PeerJS может подгружаться после инициализации экрана.
        // Ждем пару сотен мс и пробуем снова.
        setTimeout(function () {
          if (!streamsWatchIntentActive || streamsWatchRoomId !== roomId) return;
          if (watchGeneration !== streamsWatchGeneration) return;
          startStreamsWatchByRoomId(roomId, attempt + 1, autoReconnect);
        }, 300);
        return;
      }
      showWatchFatalError("Библиотека PeerJS не загружена.");
      return;
    }

    var peer = new PeerJs({ debug: 0 });
    streamsWatchPeer = peer;
    function createDummyMediaStream() {
      try {
        // WebRTC через PeerJS иногда не отдаёт remote stream,
        // если caller передал пустой MediaStream без треков.
        // Canvas captureStream создаёт трек без разрешений пользователя.
        var canvas = document.createElement("canvas");
        canvas.width = 1;
        canvas.height = 1;
        if (canvas.captureStream) return canvas.captureStream(1);
      } catch (e) {}
      return new MediaStream();
    }
    peer.on("disconnected", function () {
      if (watchGeneration !== streamsWatchGeneration) return;
      if (streamsWatchResetting) return;
      scheduleWatchReconnect("Сигнальный сервер временно недоступен.", true);
    });
    peer.on("close", function () {
      if (watchGeneration !== streamsWatchGeneration) return;
      if (streamsWatchResetting) return;
      if (streamsWatchIntentActive) scheduleWatchReconnect("Соединение закрыто.", false);
    });
    peer.on("error", function (err) {
      if (watchGeneration !== streamsWatchGeneration) return;
      streamsClearWatchWatchdog();
      if (isRecoverableStreamsError(err)) {
        scheduleWatchReconnect("Связь со стримом временно потеряна.", !!remoteVideo.srcObject);
        return;
      }
      showWatchFatalError("PeerJS ошибка: " + (err && (err.message || err.type) || "сеть"));
    });
    peer.on("open", function () {
      if (watchGeneration !== streamsWatchGeneration) return;
      var call = peer.call(roomId, createDummyMediaStream());
      if (!call) {
        scheduleWatchReconnect("Не удалось создать соединение.", false);
        return;
      }
      streamsWatchCall = call;
      attachWatchCallGuards(call, watchGeneration);
      call.on("error", function (err) {
        if (watchGeneration !== streamsWatchGeneration) return;
        // Если call не смог поднять поток, нужно вернуть управление пользователю.
        streamsClearWatchWatchdog();
        streamsWatchCall = null;
        if (isRecoverableStreamsError(err)) {
          scheduleWatchReconnect("Не удалось удержать соединение.", !!remoteVideo.srcObject);
          return;
        }
        showWatchFatalError("Не удалось подключиться к комнате. " + ((err && (err.message || err.type)) || ""));
      });
      call.on("stream", function (stream) {
        if (watchGeneration !== streamsWatchGeneration) return;
        streamsClearWatchWatchdog();
        streamsClearWatchReconnect();
        streamsWatchReconnectAttempt = 0;
        remoteVideo.srcObject = stream;
        remoteVideo.muted = false;
        remoteVideo.volume = 1;
        attachRemoteStreamGuards(stream, watchGeneration);
        try {
          var playPromise = remoteVideo.play();
          if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch(function () {
              streamsShowAlert("Нажмите Play на видео, чтобы включить звук трансляции.");
            });
          }
        } catch (e) {}
        remoteWrap.classList.remove("streams-remote-wrap--hidden");
        watchBtn.disabled = false;
        setWatchStatus("Стрим подключён. Автовосстановление от обрывов активно.", "ok");
      });
      call.on("close", function () {
        if (watchGeneration !== streamsWatchGeneration) return;
        if (streamsWatchResetting) return;
        streamsWatchCall = null;
        streamsClearWatchWatchdog();
        if (streamsWatchIntentActive) scheduleWatchReconnect("Стрим прервался.", !!remoteVideo.srcObject);
        else {
          remoteWrap.classList.add("streams-remote-wrap--hidden");
          remoteVideo.srcObject = null;
          watchBtn.disabled = false;
        }
      });

      // Watchdog: если соединение зависнет (без stream/error/close),
      // вернем пользователю управление.
      streamsWatchWatchdogTimer = setTimeout(function () {
        streamsWatchWatchdogTimer = null;
        window.__streamsWatchWatchdogTimer = null;
        if (watchGeneration !== streamsWatchGeneration) return;
        if (!watchBtn) return;
        if (!watchBtn.disabled) return;
        scheduleWatchReconnect("Трансляция не отвечает.", false);
      }, 14000);
      window.__streamsWatchWatchdogTimer = streamsWatchWatchdogTimer;
    });
  }

  // Даем возможность deep-link вызывать просмотр напрямую.
  window.startStreamsWatchByRoomId = startStreamsWatchByRoomId;

  if (openBrowserBtn) {
    openBrowserBtn.addEventListener("click", function () {
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      var urlOpen = browserLinkInput && browserLinkInput.value ? browserLinkInput.value : directAppUrl;
      if (tg && tg.openLink) {
        tg.openLink(urlOpen);
      } else {
        window.open(urlOpen, "_blank", "noopener");
      }
    });
  }
  if (copyBrowserLinkBtn && browserLinkInput) {
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
    if (streamsBroadcastPeer || streamsBroadcastStream) return;
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
    startBtn.textContent = "Запрос доступа к экрану…";
    // getDisplayMedia должен вызываться только синхронно из этого клика (или в первом .then от него).
    // Второй вызов после getUserMedia в .catch ломает требование «user gesture» в Chrome.
    getDisplayMedia.call(mediaDevices, { video: true, audio: false })
      .then(function (screenStream) {
        var combinedStream = new MediaStream();
        screenStream.getVideoTracks().forEach(function (t) { combinedStream.addTrack(t); });
        if (!mediaDevices.getUserMedia) return combinedStream;
        return mediaDevices.getUserMedia({ audio: true }).then(function (micStream) {
          micStream.getAudioTracks().forEach(function (t) { combinedStream.addTrack(t); });
          return combinedStream;
        }).catch(function () { return combinedStream; });
      })
      .then(function (stream) {
        streamsBroadcastStream = stream;
        streamsBroadcastStartedAt = Date.now();
        streamsBroadcastReconnectAttempt = 0;
        attachBroadcastTrackGuards(stream, btnText);
        createBroadcastPeer(roomId, btnText);
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

  if (stopBtn) {
    stopBtn.addEventListener("click", function () {
      resetBroadcastRuntime(null, true);
      if (streamsBroadcastTimerEl) streamsBroadcastTimerEl.textContent = "Трансляция остановлена";
      setBroadcastStatus("Трансляция остановлена.", "warn");
    });
  }

  if (copyLinkBtn && shareLinkInput) {
    copyLinkBtn.addEventListener("click", function () {
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      copyTextToClipboard(shareLinkInput, "Ссылка скопирована", "Не удалось скопировать ссылку. Скопируйте её вручную.");
    });
  }

  function parseRoomIdFromInput(val) {
    if (!val || !val.trim()) return null;
    val = val.trim();
    var m =
      val.match(/startapp=streams_(\d{6})/i) ||
      val.match(/[?&]room=(\d{6})(?:&|#|$)/i) ||
      val.match(/#(\d{6})$/);
    if (m) return m[1];
    if (/^\d{6}$/.test(val)) return val;
    return null;
  }

  if (watchBtn && roomInput && remoteWrap && remoteVideo) {
    if (!watchBtn.__streamsWatchHandlerAttached) {
      watchBtn.__streamsWatchHandlerAttached = true;
      watchBtn.addEventListener("click", function () {
        var roomId = parseRoomIdFromInput(roomInput.value);
        if (!roomId) {
          showAlert("Введите код комнаты или ссылку от ведущего.");
          return;
        }
        startStreamsWatchByRoomId(roomId);
      });
    }

    if (stopWatchBtn && !stopWatchBtn.__streamsStopWatchHandlerAttached) {
      stopWatchBtn.__streamsStopWatchHandlerAttached = true;
      stopWatchBtn.addEventListener("click", function () {
        resetWatchConnection(false, false);
        setWatchStatus("Просмотр остановлен.", "warn");
      });
    }
  }

  if (!window.__streamsNetworkGuardAttached) {
    window.__streamsNetworkGuardAttached = true;
    window.addEventListener("offline", function () {
      if (streamsWatchIntentActive) setWatchStatus("Интернет пропал. Жду сеть и верну стрим автоматически…", "warn");
      if (streamsBroadcastIntentActive) setBroadcastStatus("Интернет пропал. Трансляция останется активной и переподключится после сети…", "warn");
    });
    window.addEventListener("online", function () {
      if (streamsWatchIntentActive && streamsWatchRoomId) scheduleWatchReconnect("Интернет вернулся.", !!(remoteVideo && remoteVideo.srcObject));
      if (streamsBroadcastIntentActive && streamsBroadcastRoomId) scheduleBroadcastReconnect("Интернет вернулся.", startBtn ? startBtn.textContent : "Запустить трансляцию");
    });
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) return;
      if (streamsWatchIntentActive && remoteVideo && remoteVideo.srcObject) {
        try {
          var playPromise = remoteVideo.play();
          if (playPromise && typeof playPromise.catch === "function") playPromise.catch(function () {});
        } catch (ePlay) {}
      } else if (streamsWatchIntentActive && streamsWatchRoomId) {
        scheduleWatchReconnect("Экран снова активен.", false);
      }
    });
  }

  // Fullscreen для превью и remote-видео
  if (previewFullscreenBtn && previewVideo) {
    if (!previewFullscreenBtn.__streamsFullscreenHandlerAttached) {
      previewFullscreenBtn.__streamsFullscreenHandlerAttached = true;
      previewFullscreenBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        toggleFullscreen(previewVideo);
      });
    }
  }
  if (remoteFullscreenBtn && remoteVideo) {
    if (!remoteFullscreenBtn.__streamsFullscreenHandlerAttached) {
      remoteFullscreenBtn.__streamsFullscreenHandlerAttached = true;
      remoteFullscreenBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        toggleFullscreen(remoteVideo);
      });
    }
  }
}

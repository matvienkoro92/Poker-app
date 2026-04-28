// Стримы: трансляция экрана и микрофона в реальном времени (PeerJS). Задержка 2 мин — отдельный сервер.
var streamsBroadcastPeer = null;
var streamsBroadcastStream = null;
var streamsWatchPeer = null;
var streamsWatchCall = null;
var streamsBroadcastStartedAt = null;
var streamsBroadcastTimerInterval = null;

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
  if (previewWrap) previewWrap.classList.add("streams-preview-wrap--hidden");
  if (previewVideo) previewVideo.srcObject = null;
  if (remoteWrap) remoteWrap.classList.add("streams-remote-wrap--hidden");
  if (remoteVideo) remoteVideo.srcObject = null;
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
  var streamsBroadcastTimerEl = document.getElementById("streamsBroadcastTimer");
  var previewFullscreenBtn = document.getElementById("streamsPreviewFullscreenBtn");
  var remoteFullscreenBtn = document.getElementById("streamsRemoteFullscreenBtn");
  var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;

  if (!startBtn || !previewWrap || !previewVideo) return;
  window.__streamsInitAttached = true;

  function showAlert(msg) {
    if (tg && tg.showAlert) tg.showAlert(msg); else alert(msg);
  }

  var directAppUrl =
    typeof buildMiniAppStartLink === "function"
      ? buildMiniAppStartLink("streams")
      : window.location.origin + window.location.pathname + (window.location.search || "") + "#streams";
  if (browserLinkInput) browserLinkInput.value = directAppUrl;

  function streamsShowAlert(msg) {
    if (tg && tg.showAlert) tg.showAlert(msg);
    else if (typeof alert === "function") alert(msg);
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

  // Делаем стартер “смотреть” по комнате без зависимости от click-обработчика,
  // чтобы deep-link работал стабильно.
  function startStreamsWatchByRoomId(roomId, attempt) {
    if (!roomId) return;
    attempt = attempt || 0;
    if (!watchBtn || !roomInput || !remoteWrap || !remoteVideo) return;
    // Если пользователь/глубокая ссылка уже пытались смотреть и peer/call "завис",
    // старый объект может помешать повторному старту. Сбрасываем перед новой попыткой.
    if (streamsWatchCall) {
      try { streamsWatchCall.close(); } catch (e) {}
      streamsWatchCall = null;
    }
    if (streamsWatchPeer) {
      try { streamsWatchPeer.destroy(); } catch (e) {}
      streamsWatchPeer = null;
    }
    if (remoteWrap) remoteWrap.classList.add("streams-remote-wrap--hidden");
    if (remoteVideo) remoteVideo.srcObject = null;
    if (window.__streamsWatchWatchdogTimer) {
      clearTimeout(window.__streamsWatchWatchdogTimer);
      window.__streamsWatchWatchdogTimer = null;
    }

    roomInput.value = roomId;
    watchBtn.disabled = true;

    var PeerJs = typeof Peer !== "undefined" ? Peer : null;
    if (!PeerJs) {
      if (attempt < 12) {
        // PeerJS может подгружаться после инициализации экрана.
        // Ждем пару сотен мс и пробуем снова.
        setTimeout(function () { startStreamsWatchByRoomId(roomId, attempt + 1); }, 300);
        return;
      }
      streamsShowAlert("Библиотека PeerJS не загружена.");
      watchBtn.disabled = false;
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
    peer.on("error", function (err) {
      if (window.__streamsWatchWatchdogTimer) {
        clearTimeout(window.__streamsWatchWatchdogTimer);
        window.__streamsWatchWatchdogTimer = null;
      }
      // Ошибки на уровне PeerJS (сигналинг/сервер) раньше не обрабатывались,
      // из-за чего кнопка могла оставаться выключенной.
      try { streamsWatchCall && streamsWatchCall.close && streamsWatchCall.close(); } catch (e) {}
      streamsWatchCall = null;
      streamsWatchPeer = null;
      if (remoteWrap) remoteWrap.classList.add("streams-remote-wrap--hidden");
      if (remoteVideo) remoteVideo.srcObject = null;
      watchBtn.disabled = false;
      streamsShowAlert("PeerJS ошибка: " + (err && (err.message || err.type)) || "сеть");
    });
    peer.on("open", function () {
      var call = peer.call(roomId, createDummyMediaStream());
      streamsWatchCall = call;
      call.on("error", function (err) {
        // Если call не смог поднять поток, нужно вернуть управление пользователю.
        if (window.__streamsWatchWatchdogTimer) {
          clearTimeout(window.__streamsWatchWatchdogTimer);
          window.__streamsWatchWatchdogTimer = null;
        }
        remoteWrap.classList.add("streams-remote-wrap--hidden");
        if (remoteVideo) remoteVideo.srcObject = null;
        streamsWatchCall = null;
        watchBtn.disabled = false;
        streamsShowAlert("Не удалось подключиться к комнате. " + (err && (err.message || err.type)) || "");
      });
      call.on("stream", function (stream) {
        if (window.__streamsWatchWatchdogTimer) {
          clearTimeout(window.__streamsWatchWatchdogTimer);
          window.__streamsWatchWatchdogTimer = null;
        }
        remoteVideo.srcObject = stream;
        remoteVideo.muted = true;
        try { remoteVideo.play(); } catch (e) {}
        remoteWrap.classList.remove("streams-remote-wrap--hidden");
        watchBtn.disabled = false;
      });
      call.on("close", function () {
        if (window.__streamsWatchWatchdogTimer) {
          clearTimeout(window.__streamsWatchWatchdogTimer);
          window.__streamsWatchWatchdogTimer = null;
        }
        remoteWrap.classList.add("streams-remote-wrap--hidden");
        remoteVideo.srcObject = null;
        streamsWatchCall = null;
        watchBtn.disabled = false;
      });
      call.on("error", function () {
        if (window.__streamsWatchWatchdogTimer) {
          clearTimeout(window.__streamsWatchWatchdogTimer);
          window.__streamsWatchWatchdogTimer = null;
        }
        remoteWrap.classList.add("streams-remote-wrap--hidden");
        watchBtn.disabled = false;
        streamsWatchCall = null;
      });

      // Watchdog: если соединение зависнет (без stream/error/close),
      // вернем пользователю управление.
      window.__streamsWatchWatchdogTimer = setTimeout(function () {
        if (!watchBtn) return;
        if (!watchBtn.disabled) return;
        watchBtn.disabled = false;
        if (remoteWrap) remoteWrap.classList.add("streams-remote-wrap--hidden");
        if (remoteVideo) remoteVideo.srcObject = null;
        streamsShowAlert("Трансляция не отвечает. Попробуйте ещё раз через 5–10 секунд.");
      }, 14000);
    });
    peer.on("error", function (err) {
      remoteWrap.classList.add("streams-remote-wrap--hidden");
      watchBtn.disabled = false;
      streamsWatchCall = null;
      if (err && (err.type === "peer-unavailable" || err.type === "network")) streamsShowAlert("Трансляция недоступна. Проверьте код комнаты.");
      else streamsShowAlert("Ошибка: " + (err && (err.message || err.type)) || "сеть");
      streamsWatchPeer = null;
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
      browserLinkInput.select();
      try {
        document.execCommand("copy");
        showAlert("Ссылка скопирована. Вставьте её в адресную строку Chrome и откройте.");
      } catch (e) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(browserLinkInput.value).then(function () {
            showAlert("Ссылка скопирована. Вставьте её в адресную строку Chrome и откройте.");
          }).catch(function () {});
        }
      }
    });
  }

  if (!startBtn.__streamsStartHandlerAttached) {
    startBtn.__streamsStartHandlerAttached = true;
    startBtn.addEventListener("click", function () {
    if (streamsBroadcastPeer || streamsBroadcastStream) return;
    if (!navigator.mediaDevices) {
      showAlert("Трансляция недоступна: нет доступа к медиа-устройствам.");
      return;
    }
    var getDisplayMedia = navigator.mediaDevices.getDisplayMedia || navigator.mediaDevices.webkitGetDisplayMedia;
    if (!getDisplayMedia) {
      showAlert("Трансляция экрана недоступна в Safari и в приложении Telegram. Откройте мини-приложение в Chrome (Android) или в браузере на компьютере.");
      return;
    }
    if (!window.isSecureContext) {
      showAlert("Трансляция экрана работает только по HTTPS. Откройте страницу по ссылке https://…");
      return;
    }
    startBtn.disabled = true;
    var btnText = startBtn.textContent;
    startBtn.textContent = "Запрос доступа к экрану…";
    // getDisplayMedia должен вызываться только синхронно из этого клика (или в первом .then от него).
    // Второй вызов после getUserMedia в .catch ломает требование «user gesture» в Chrome.
    getDisplayMedia.call(navigator.mediaDevices, { video: true, audio: false })
      .then(function (screenStream) {
        var combinedStream = new MediaStream();
        screenStream.getVideoTracks().forEach(function (t) { combinedStream.addTrack(t); });
        return navigator.mediaDevices.getUserMedia({ audio: true }).then(function (micStream) {
          micStream.getAudioTracks().forEach(function (t) { combinedStream.addTrack(t); });
          return combinedStream;
        }).catch(function () { return combinedStream; });
      })
      .then(function (stream) {
        streamsBroadcastStream = stream;
        var userRoomCode = broadcastRoomInput ? broadcastRoomInput.value.trim() : "";
        var roomId = null;
        if (userRoomCode) {
          if (!/^\d{6}$/.test(userRoomCode)) {
            // Код неверный: останавливаем захват, чтобы не оставлять активный stream.
            try {
              if (streamsBroadcastStream) streamsBroadcastStream.getTracks().forEach(function (t) { t.stop(); });
            } catch (e) {}
            streamsBroadcastStream = null;
            startBtn.disabled = false;
            startBtn.textContent = btnText;
            showAlert("Некорректный код комнаты. Нужны ровно 6 цифр.");
            return;
          }
          roomId = userRoomCode;
        } else {
          roomId = randomStreamRoomId();
          if (broadcastRoomInput) broadcastRoomInput.value = roomId;
        }
        var PeerJs = typeof Peer !== "undefined" ? Peer : null;
        if (!PeerJs) {
          streamsBroadcastStream.getTracks().forEach(function (t) { t.stop(); });
          streamsBroadcastStream = null;
          startBtn.disabled = false;
          startBtn.textContent = btnText;
          showAlert("Библиотека PeerJS не загружена. Проверьте интернет и обновите страницу.");
          return;
        }
        var peer = new PeerJs(roomId, { debug: 0 });
        streamsBroadcastPeer = peer;
        peer.on("open", function () {
          var link = buildMiniAppStartLink("streams_" + roomId);
          if (shareLinkInput) shareLinkInput.value = link;
          if (browserLinkInput && isTelegramWebApp()) browserLinkInput.value = link;
          if (roomInput) roomInput.placeholder = roomId;
          previewVideo.srcObject = streamsBroadcastStream;
          previewWrap.classList.remove("streams-preview-wrap--hidden");
          streamsBroadcastStartedAt = Date.now();
          if (streamsBroadcastTimerInterval) clearInterval(streamsBroadcastTimerInterval);
          updateBroadcastTimerText();
          streamsBroadcastTimerInterval = setInterval(updateBroadcastTimerText, 1000);
          startBtn.disabled = false;
          startBtn.textContent = btnText;
        });
        peer.on("call", function (call) {
          if (streamsBroadcastStream) call.answer(streamsBroadcastStream);
        });
        peer.on("error", function (err) {
          if (err.type !== "peer-unavailable") showAlert("Ошибка: " + (err.message || err.type || "сеть"));
        });
        peer.on("close", function () {
          if (streamsBroadcastStream) {
            streamsBroadcastStream.getTracks().forEach(function (t) { t.stop(); });
            streamsBroadcastStream = null;
          }
          streamsBroadcastPeer = null;
          if (streamsBroadcastTimerInterval) clearInterval(streamsBroadcastTimerInterval);
          streamsBroadcastTimerInterval = null;
          streamsBroadcastStartedAt = null;
          if (streamsBroadcastTimerEl) streamsBroadcastTimerEl.textContent = "";
          previewWrap.classList.add("streams-preview-wrap--hidden");
          previewVideo.srcObject = null;
        });
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
      if (streamsBroadcastStream) streamsBroadcastStream.getTracks().forEach(function (t) { t.stop(); });
      streamsBroadcastStream = null;
      if (streamsBroadcastPeer) {
        try { streamsBroadcastPeer.destroy(); } catch (e) {}
        streamsBroadcastPeer = null;
      }
      if (streamsBroadcastTimerInterval) clearInterval(streamsBroadcastTimerInterval);
      streamsBroadcastTimerInterval = null;
      streamsBroadcastStartedAt = null;
      if (streamsBroadcastTimerEl) streamsBroadcastTimerEl.textContent = "Трансляция остановлена";
      previewWrap.classList.add("streams-preview-wrap--hidden");
      previewVideo.srcObject = null;
    });
  }

  if (copyLinkBtn && shareLinkInput) {
    copyLinkBtn.addEventListener("click", function () {
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      shareLinkInput.select();
      try {
        document.execCommand("copy");
        showAlert("Ссылка скопирована");
      } catch (e) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(shareLinkInput.value).then(function () { showAlert("Ссылка скопирована"); }).catch(function () {});
        }
      }
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
        if (streamsWatchCall) {
          try { streamsWatchCall.close(); } catch (e) {}
          streamsWatchCall = null;
        }
        if (streamsWatchPeer) {
          try { streamsWatchPeer.destroy(); } catch (e) {}
          streamsWatchPeer = null;
        }
        remoteVideo.srcObject = null;
        remoteWrap.classList.add("streams-remote-wrap--hidden");
      });
    }
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

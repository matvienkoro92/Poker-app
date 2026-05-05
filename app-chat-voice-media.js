// Chat voice media helpers: playback speed, data URL normalization, and voice message markup.

function initChatVoiceMedia(opts) {
  opts = opts || {};
  var escapeHtml = typeof opts.escapeHtml === "function"
    ? opts.escapeHtml
    : function (s) {
        if (!s) return "";
        return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
      };
  var POKER_CHAT_VOICE_RATE_LS = "poker_chat_voice_playback_rate";

  function pokerNormalizeChatVoiceRate(x) {
    var n = typeof x === "number" ? x : parseFloat(String(x != null ? x : ""), 10);
    if (n === 2 || n > 1.75) return 2;
    if (Math.abs(n - 1.5) < 0.01 || (n > 1.25 && n < 1.75)) return 1.5;
    return 1;
  }

  function pokerGetSavedVoicePlaybackRate() {
    try {
      return pokerNormalizeChatVoiceRate(localStorage.getItem(POKER_CHAT_VOICE_RATE_LS));
    } catch (eR) {
      return 1;
    }
  }

  function pokerSetSavedVoicePlaybackRate(rate) {
    try {
      localStorage.setItem(POKER_CHAT_VOICE_RATE_LS, String(pokerNormalizeChatVoiceRate(rate)));
    } catch (eW) {}
  }

  function pokerApplyChatVoicePlaybackRateGlobally(rate) {
    var r = pokerNormalizeChatVoiceRate(rate);
    var auds = document.querySelectorAll("audio.chat-msg__voice");
    for (var ai = 0; ai < auds.length; ai++) {
      try {
        auds[ai].playbackRate = r;
      } catch (eA) {}
    }
    var btns = document.querySelectorAll(".chat-msg__voice-speed-btn");
    for (var bi = 0; bi < btns.length; bi++) {
      var b = btns[bi];
      var br = pokerNormalizeChatVoiceRate(b.getAttribute("data-voice-rate"));
      var on = br === r;
      b.classList.toggle("chat-msg__voice-speed-btn--active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    }
  }

  function pokerApplySavedRateToChatVoiceAudio(audioEl) {
    if (!audioEl || !audioEl.classList || !audioEl.classList.contains("chat-msg__voice")) return;
    try {
      audioEl.playbackRate = pokerGetSavedVoicePlaybackRate();
    } catch (eAudioRate) {}
  }

  function pokerNormalizeVoiceDataUrl(dataUrl, recorderMime) {
    if (typeof dataUrl !== "string" || dataUrl.indexOf("data:") !== 0) return dataUrl;
    var comma = dataUrl.indexOf(",");
    if (comma < 0) return dataUrl;
    var header = dataUrl.slice(0, comma);
    var low = header.toLowerCase();
    if (low.indexOf("audio/") !== -1) return dataUrl;
    var payload = dataUrl.slice(comma);
    var pickAudio = "audio/webm";
    try {
      var rm = recorderMime != null ? String(recorderMime).trim() : "";
      if (/^audio\//i.test(rm)) pickAudio = rm.split(";")[0].trim();
      else if (/mp4|m4a|aac|caf|mp4a|mpeg/i.test(rm)) pickAudio = "audio/mp4";
    } catch (ePick) {}
    if (/^data:video\/webm/i.test(header)) {
      return header.replace(/^data:video\/webm/i, "data:audio/webm") + payload;
    }
    if (/^data:video\/mp4/i.test(header)) {
      return header.replace(/^data:video\/mp4/i, "data:audio/mp4") + payload;
    }
    if (/^data:video\/quicktime/i.test(header)) {
      return header.replace(/^data:video\/quicktime/i, "data:audio/mp4") + payload;
    }
    if (low.indexOf("application/octet-stream") !== -1) {
      return "data:" + pickAudio + ";base64," + dataUrl.slice(comma + 1);
    }
    return dataUrl;
  }

  function chatVoiceMessageHtml(voiceSrc, opts2) {
    if (!voiceSrc) return "";
    opts2 = opts2 || {};
    var src = escapeHtml(String(voiceSrc));
    var r = pokerGetSavedVoicePlaybackRate();
    function speedBtn(rate, label) {
      var active = pokerNormalizeChatVoiceRate(rate) === r;
      return (
        '<button type="button" class="chat-msg__voice-speed-btn' +
        (active ? " chat-msg__voice-speed-btn--active" : "") +
        '" data-voice-rate="' +
        rate +
        '" aria-pressed="' +
        (active ? "true" : "false") +
        '">' +
        label +
        "</button>"
      );
    }
    var speedInner = speedBtn(1, "1×") + speedBtn(1.5, "1.5×") + speedBtn(2, "2×");
    var foot = opts2.footerToolbarHtml != null && String(opts2.footerToolbarHtml).trim() !== ""
      ? '<div class="chat-msg__footer chat-msg__footer--voice-toolbar">' + opts2.footerToolbarHtml + "</div>"
      : "";
    return (
      '<div class="chat-msg__voice-wrap">' +
      '<audio class="chat-msg__voice" controls preload="metadata" src="' +
      src +
      '"></audio>' +
      '<div class="chat-msg__voice-toolbar">' +
      '<div class="chat-msg__voice-speed" role="group" aria-label="Скорость воспроизведения">' +
      speedInner +
      "</div>" +
      foot +
      "</div></div>"
    );
  }

  function appendChatVoiceToTextWrap(textWrap, voiceUrl, voiceOpts) {
    if (!textWrap || !voiceUrl) return;
    voiceOpts = voiceOpts || {};
    var wrap = document.createElement("div");
    wrap.className = "chat-msg__voice-wrap";
    var aud = document.createElement("audio");
    aud.className = "chat-msg__voice";
    aud.controls = true;
    aud.preload = "metadata";
    aud.src = voiceUrl;
    pokerApplySavedRateToChatVoiceAudio(aud);
    aud.addEventListener(
      "loadedmetadata",
      function onVoiceMeta() {
        aud.removeEventListener("loadedmetadata", onVoiceMeta);
        pokerApplySavedRateToChatVoiceAudio(aud);
      },
      false
    );
    wrap.appendChild(aud);
    var toolbar = document.createElement("div");
    toolbar.className = "chat-msg__voice-toolbar";
    var speed = document.createElement("div");
    speed.className = "chat-msg__voice-speed";
    speed.setAttribute("role", "group");
    speed.setAttribute("aria-label", "Скорость воспроизведения");
    var r0 = pokerGetSavedVoicePlaybackRate();
    function addRateBtn(rate, label) {
      var bb = document.createElement("button");
      bb.type = "button";
      bb.className = "chat-msg__voice-speed-btn";
      if (pokerNormalizeChatVoiceRate(rate) === r0) bb.className += " chat-msg__voice-speed-btn--active";
      bb.setAttribute("data-voice-rate", String(rate));
      bb.setAttribute("aria-pressed", pokerNormalizeChatVoiceRate(rate) === r0 ? "true" : "false");
      bb.textContent = label;
      speed.appendChild(bb);
    }
    addRateBtn(1, "1×");
    addRateBtn(1.5, "1.5×");
    addRateBtn(2, "2×");
    toolbar.appendChild(speed);
    if (voiceOpts.footerToolbarHtml != null && String(voiceOpts.footerToolbarHtml).trim() !== "") {
      var ft = document.createElement("div");
      ft.className = "chat-msg__footer chat-msg__footer--voice-toolbar";
      ft.innerHTML = voiceOpts.footerToolbarHtml;
      toolbar.appendChild(ft);
    }
    wrap.appendChild(toolbar);
    textWrap.appendChild(wrap);
  }

  function chatMsgVoiceOnlyNoCaption(m) {
    if (!m || !m.voice) return false;
    if (m.image) return false;
    if (m.document) return false;
    var tx = m.text != null ? String(m.text).trim() : "";
    return tx === "";
  }

  (function bindChatVoicePlaybackSpeed() {
    if (window.__pokerChatVoiceRateUiBound) return;
    window.__pokerChatVoiceRateUiBound = true;
    document.addEventListener("click", function (e) {
      var btn = e.target && e.target.closest && e.target.closest(".chat-msg__voice-speed-btn");
      if (!btn) return;
      var rate = pokerNormalizeChatVoiceRate(btn.getAttribute("data-voice-rate"));
      e.preventDefault();
      e.stopPropagation();
      pokerSetSavedVoicePlaybackRate(rate);
      pokerApplyChatVoicePlaybackRateGlobally(rate);
    });
    document.addEventListener("loadedmetadata", function (ev) {
      var t = ev.target;
      pokerApplySavedRateToChatVoiceAudio(t);
    }, true);
    document.addEventListener("canplay", function (ev) {
      var t = ev.target;
      pokerApplySavedRateToChatVoiceAudio(t);
    }, true);
    document.addEventListener("play", function (ev) {
      var t = ev.target;
      if (!t || !t.classList || !t.classList.contains("chat-msg__voice")) return;
      setTimeout(function () {
        pokerApplySavedRateToChatVoiceAudio(t);
      }, 0);
    }, true);
    document.addEventListener("playing", function (ev) {
      var t = ev.target;
      if (!t || !t.classList || !t.classList.contains("chat-msg__voice")) return;
      function apply() {
        pokerApplySavedRateToChatVoiceAudio(t);
      }
      try {
        if (typeof requestAnimationFrame === "function") requestAnimationFrame(apply);
        else setTimeout(apply, 0);
      } catch (eRaf) {
        apply();
      }
    });
  })();

  return {
    appendChatVoiceToTextWrap: appendChatVoiceToTextWrap,
    chatMsgVoiceOnlyNoCaption: chatMsgVoiceOnlyNoCaption,
    chatVoiceMessageHtml: chatVoiceMessageHtml,
    pokerApplyChatVoicePlaybackRateGlobally: pokerApplyChatVoicePlaybackRateGlobally,
    pokerApplySavedRateToChatVoiceAudio: pokerApplySavedRateToChatVoiceAudio,
    pokerGetSavedVoicePlaybackRate: pokerGetSavedVoicePlaybackRate,
    pokerNormalizeChatVoiceRate: pokerNormalizeChatVoiceRate,
    pokerNormalizeVoiceDataUrl: pokerNormalizeVoiceDataUrl,
    pokerSetSavedVoicePlaybackRate: pokerSetSavedVoicePlaybackRate,
  };
}

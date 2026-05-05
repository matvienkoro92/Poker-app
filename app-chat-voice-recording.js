// Chat voice recording controls for general and personal composers.

function initChatVoiceRecordingRuntime(opts) {
  opts = opts || {};
  var tg = opts.tg || null;
  var generalVoiceBtn = opts.generalVoiceBtn || null;
  var generalVoiceRemove = opts.generalVoiceRemove || null;
  var generalVoicePreviewEl = opts.generalVoicePreviewEl || null;
  var generalSendBtn = opts.generalSendBtn || null;
  var sendBtn = opts.sendBtn || null;
  var bindChatSendTap = typeof opts.bindChatSendTap === "function" ? opts.bindChatSendTap : function () {};
  var getChatGeneralText = typeof opts.getChatGeneralText === "function" ? opts.getChatGeneralText : function () { return ""; };
  var getChatPersonalText = typeof opts.getChatPersonalText === "function" ? opts.getChatPersonalText : function () { return ""; };
  var getGeneralImage = typeof opts.getGeneralImage === "function" ? opts.getGeneralImage : function () { return null; };
  var getGeneralVoice = typeof opts.getGeneralVoice === "function" ? opts.getGeneralVoice : function () { return null; };
  var setGeneralVoice = typeof opts.setGeneralVoice === "function" ? opts.setGeneralVoice : function () {};
  var getGeneralDocument = typeof opts.getGeneralDocument === "function" ? opts.getGeneralDocument : function () { return null; };
  var getPersonalImage = typeof opts.getPersonalImage === "function" ? opts.getPersonalImage : function () { return null; };
  var getPersonalVoice = typeof opts.getPersonalVoice === "function" ? opts.getPersonalVoice : function () { return null; };
  var setPersonalVoice = typeof opts.setPersonalVoice === "function" ? opts.setPersonalVoice : function () {};
  var getPersonalDocument = typeof opts.getPersonalDocument === "function" ? opts.getPersonalDocument : function () { return null; };
  var sendGeneral = typeof opts.sendGeneral === "function" ? opts.sendGeneral : function () {};
  var sendMessage = typeof opts.sendMessage === "function" ? opts.sendMessage : function () {};
  var updateGeneralSendBtnIcon =
    typeof opts.updateGeneralSendBtnIcon === "function" ? opts.updateGeneralSendBtnIcon : function () {};
  var updatePersonalSendBtnIcon =
    typeof opts.updatePersonalSendBtnIcon === "function" ? opts.updatePersonalSendBtnIcon : function () {};
  var pokerNormalizeVoiceDataUrl =
    typeof opts.pokerNormalizeVoiceDataUrl === "function" ? opts.pokerNormalizeVoiceDataUrl : function (dataUrl) { return dataUrl; };

  var voiceTarget = null;
  var voiceStream = null;
  var voiceChunks = [];
  var voiceRecorder = null;
  var voiceFinalizeInProgress = false;
  var voiceRecordStartTime = null;
  var voiceRecordTimerInterval = null;
  var generalTimerEl = document.getElementById("chatGeneralVoiceTimer");
  var personalTimerEl = document.getElementById("chatPersonalVoiceTimer");
  var generalBtn = generalVoiceBtn || generalSendBtn;
  var personalBtn = document.getElementById("chatPersonalVoiceBtn") || sendBtn;

  function stopVoiceTimer() {
    if (voiceRecordTimerInterval) {
      clearInterval(voiceRecordTimerInterval);
      voiceRecordTimerInterval = null;
    }
    voiceRecordStartTime = null;
  }

  function updateVoiceTimer() {
    if (voiceRecordStartTime == null) return;
    var sec = Math.floor((Date.now() - voiceRecordStartTime) / 1000);
    if (generalTimerEl) generalTimerEl.textContent = String(sec);
    if (personalTimerEl) personalTimerEl.textContent = String(sec);
  }

  function startVoiceTimer() {
    stopVoiceTimer();
    voiceRecordStartTime = Date.now();
    if (generalTimerEl) generalTimerEl.textContent = "0";
    if (personalTimerEl) personalTimerEl.textContent = "0";
    updateVoiceTimer();
    voiceRecordTimerInterval = setInterval(updateVoiceTimer, 1000);
  }

  function stopAndDiscard() {
    voiceFinalizeInProgress = false;
    voiceTarget = null;
    stopVoiceTimer();
    if (voiceRecorder && voiceRecorder.state !== "inactive") voiceRecorder.stop();
    voiceRecorder = null;
    if (voiceStream) {
      voiceStream.getTracks().forEach(function (t) { t.stop(); });
      voiceStream = null;
    }
    voiceChunks = [];
  }

  function setRecordingUi(target, recording) {
    if (target === "general") {
      if (generalBtn) {
        generalBtn.classList.toggle("chat-voice-btn--recording", !!recording);
        generalBtn.title = recording ? "Остановить запись" : "Голосовое сообщение";
      }
      if (generalVoicePreviewEl) {
        generalVoicePreviewEl.classList.toggle("chat-voice-preview--recording", !!recording);
        generalVoicePreviewEl.classList.toggle("chat-voice-preview--hidden", !recording);
      }
    }
    if (target === "personal") {
      if (personalBtn) {
        personalBtn.classList.toggle("chat-voice-btn--recording", !!recording);
        personalBtn.title = recording ? "Остановить запись" : "Голосовое сообщение";
      }
      var pv = document.getElementById("chatPersonalVoicePreview");
      if (pv) {
        pv.classList.toggle("chat-voice-preview--recording", !!recording);
        pv.classList.toggle("chat-voice-preview--hidden", !recording);
      }
    }
  }

  function startRecording(target) {
    if (typeof navigator === "undefined" || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      if (tg && tg.showAlert) tg.showAlert("Микрофон не поддерживается");
      return;
    }
    voiceFinalizeInProgress = false;
    voiceTarget = target;
    setRecordingUi(target, true);
    navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
      if (voiceTarget !== target) {
        stream.getTracks().forEach(function (t) { t.stop(); });
        return;
      }
      voiceStream = stream;
      voiceChunks = [];
      var recorderOpts = { audioBitsPerSecond: 64000 };
      try {
        voiceRecorder = new MediaRecorder(stream, recorderOpts);
      } catch (eRecorderOpts) {
        voiceRecorder = new MediaRecorder(stream);
      }
      var savedTarget = target;
      voiceRecorder.ondataavailable = function (e) {
        if (e.data && e.data.size > 0) voiceChunks.push(e.data);
      };
      voiceRecorder.onstop = function () {
        stopVoiceTimer();
        var mime = voiceRecorder && voiceRecorder.mimeType ? voiceRecorder.mimeType : "audio/webm";
        voiceFinalizeInProgress = true;
        voiceRecorder = null;
        if (voiceStream) {
          voiceStream.getTracks().forEach(function (t) { t.stop(); });
          voiceStream = null;
        }
        var dest = savedTarget;
        var voiceFinalizeDone = false;
        var voiceAssembleDelaysMs = [0, 40, 100, 220, 450, 800];
        function discardEmptyVoiceUi() {
          voiceFinalizeInProgress = false;
          setRecordingUi(dest, false);
          voiceTarget = null;
        }
        function tryAssembleVoiceBlob(attemptIdx) {
          if (voiceFinalizeDone) return;
          if (voiceChunks.length === 0) {
            if (attemptIdx < voiceAssembleDelaysMs.length) {
              setTimeout(function () { tryAssembleVoiceBlob(attemptIdx + 1); }, voiceAssembleDelaysMs[attemptIdx]);
            } else {
              voiceFinalizeDone = true;
              discardEmptyVoiceUi();
            }
            return;
          }
          voiceFinalizeDone = true;
          var blob = new Blob(voiceChunks, { type: mime });
          voiceChunks = [];
          var reader = new FileReader();
          reader.onerror = function () { discardEmptyVoiceUi(); };
          reader.onloadend = function () {
            voiceFinalizeInProgress = false;
            var dataUrl = reader.result;
            if (typeof dataUrl === "string") dataUrl = pokerNormalizeVoiceDataUrl(dataUrl, mime);
            if (dest === "general") {
              setGeneralVoice(dataUrl);
              updateGeneralSendBtnIcon();
              if (generalVoicePreviewEl) {
                generalVoicePreviewEl.classList.remove("chat-voice-preview--recording");
                generalVoicePreviewEl.classList.remove("chat-voice-preview--hidden");
              }
            } else if (dest === "personal") {
              setPersonalVoice(dataUrl);
              updatePersonalSendBtnIcon();
              var pv = document.getElementById("chatPersonalVoicePreview");
              if (pv) {
                pv.classList.remove("chat-voice-preview--recording");
                pv.classList.remove("chat-voice-preview--hidden");
              }
            }
            voiceTarget = null;
          };
          reader.readAsDataURL(blob);
        }
        setTimeout(function () { tryAssembleVoiceBlob(0); }, 0);
      };
      try {
        voiceRecorder.start(250);
      } catch (eStartSlice) {
        voiceRecorder.start();
      }
      startVoiceTimer();
    }).catch(function () {
      voiceTarget = null;
      stopVoiceTimer();
      setRecordingUi(target, false);
      if (tg && tg.showAlert) tg.showAlert("Нет доступа к микрофону");
    });
  }

  function stopRecordingForTarget(target) {
    stopVoiceTimer();
    if (voiceRecorder) {
      try {
        if (voiceRecorder.state === "recording" && voiceRecorder.requestData) voiceRecorder.requestData();
        voiceRecorder.stop();
      } catch (err) {}
    } else if (!voiceFinalizeInProgress && !voiceStream) {
      voiceTarget = null;
      setRecordingUi(target, false);
    }
    setRecordingUi(target, false);
    if (target === "general") updateGeneralSendBtnIcon();
    else updatePersonalSendBtnIcon();
  }

  function runGeneralSendAction() {
    if (voiceTarget === "general") {
      stopRecordingForTarget("general");
    } else if (voiceTarget === "personal") {
      stopAndDiscard();
      setRecordingUi("personal", false);
      startRecording("general");
    } else if (getChatGeneralText().trim() || getGeneralImage() || getGeneralVoice() || getGeneralDocument()) {
      sendGeneral();
    } else {
      startRecording("general");
    }
  }

  function runPersonalSendAction() {
    if (voiceTarget === "personal") {
      stopRecordingForTarget("personal");
    } else if (voiceTarget === "general") {
      stopAndDiscard();
      setRecordingUi("general", false);
      startRecording("personal");
    } else if (getChatPersonalText().trim() || getPersonalImage() || getPersonalVoice() || getPersonalDocument()) {
      sendMessage();
    } else {
      startRecording("personal");
    }
  }

  bindChatSendTap(generalBtn, runGeneralSendAction);
  bindChatSendTap(personalBtn, runPersonalSendAction);

  if (generalVoiceRemove && generalVoicePreviewEl) {
    generalVoiceRemove.addEventListener("click", function () {
      setGeneralVoice(null);
      generalVoicePreviewEl.classList.add("chat-voice-preview--hidden");
      updateGeneralSendBtnIcon();
    });
  }
  var generalVoiceSend = document.getElementById("chatGeneralVoiceSend");
  if (generalVoiceSend) generalVoiceSend.addEventListener("click", function () { sendGeneral(); });
  var generalVoiceStop = document.getElementById("chatGeneralVoiceStop");
  if (generalVoiceStop) {
    generalVoiceStop.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (voiceTarget === "general") stopRecordingForTarget("general");
    });
  }

  var personalVoiceRemove = document.getElementById("chatPersonalVoiceRemove");
  var personalVoicePreviewEl = document.getElementById("chatPersonalVoicePreview");
  if (personalVoiceRemove && personalVoicePreviewEl) {
    personalVoiceRemove.addEventListener("click", function () {
      setPersonalVoice(null);
      personalVoicePreviewEl.classList.add("chat-voice-preview--hidden");
      updatePersonalSendBtnIcon();
    });
  }
  var personalVoiceSend = document.getElementById("chatPersonalVoiceSend");
  if (personalVoiceSend) personalVoiceSend.addEventListener("click", function () { sendMessage(); });
  var personalVoiceStop = document.getElementById("chatPersonalVoiceStop");
  if (personalVoiceStop) {
    personalVoiceStop.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (voiceTarget === "personal") stopRecordingForTarget("personal");
    });
  }

  return {
    startRecording: startRecording,
    stopAndDiscard: stopAndDiscard,
    runGeneralSendAction: runGeneralSendAction,
    runPersonalSendAction: runPersonalSendAction,
  };
}

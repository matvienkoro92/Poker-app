// Chat auth guards and notification sound helpers.

// PWA: короткий звук при новых сообщениях в чате.
function pokerReadChatMessageSoundEnabled() {
  try {
    var v = localStorage.getItem("poker_chat_msg_sound");
    if (v === null) return true;
    return v === "1" || String(v).toLowerCase() === "true" || String(v).toLowerCase() === "on";
  } catch (e) {
    // В приватных режимах/ограничениях localStorage может падать — тогда считаем, что звук включен.
    return true;
  }
}
function pokerPlayChatMessageNotificationSound() {
  try {
    var Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    var ctx = window.__msgAudioCtx;
    if (!ctx) ctx = window.__msgAudioCtx = new Ctx();
    if (ctx.state === "suspended") ctx.resume();
    var now = ctx.currentTime;
    // Два быстрых тона: коротко и заметно, но без долгого "пищания".
    var mkTone = function (freq, t0, dur, g0) {
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, t0);
      gain.gain.setValueAtTime(g0, t0);
      gain.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
      osc.start(t0);
      osc.stop(t0 + dur);
    };
    mkTone(740, now, 0.06, 0.05);
    mkTone(520, now + 0.08, 0.07, 0.04);
  } catch (err) {}
}

/** Состояние верификации Telegram для доступа к чату (см. __pokerTelegramAuth в initTelegramAuth) */
function getPokerChatTelegramAuthState() {
  try {
    var a = window.__pokerTelegramAuth;
    if (!a || !a.status) return "pending";
    if (a.status === "verified" || a.status === "dev_skip") {
      return a.user != null && a.user.id != null ? "ok" : "blocked";
    }
    if (a.status === "verifying" || a.status === "unknown") return "pending";
    return "blocked";
  } catch (e) {
    return "pending";
  }
}

/** Сообщение при попытке писать в чат без входа (браузер / PWA). */
var POKER_CHAT_NEED_AUTH_PWA_MSG =
  "Чтобы общаться в чатах, сначала авторизуйтесь.\n1. Добавьте ярлык на экран «Домой» (из Safari или Google Chrome).\n2. Зайдите с ярлыка и авторизуйтесь.";

function pokerSafeChatAlert(msg) {
  var text = msg != null ? String(msg) : "";
  try {
    var w = window.Telegram && window.Telegram.WebApp;
    if (w && typeof w.showAlert === "function") {
      w.showAlert(text);
      return;
    }
  } catch (eTgChatAlert) {}
  try {
    if (typeof alert === "function") alert(text);
  } catch (eBrowserChatAlert) {}
}

function pokerNotifyChatVerificationRequired() {
  var msg = isTelegramWebApp()
    ? "Чтобы общаться в чатах, сначала войдите: откройте Mini App из бота Telegram."
    : POKER_CHAT_NEED_AUTH_PWA_MSG;
  pokerSafeChatAlert(msg);
}

function pokerNotifyChatAuthPending() {
  var msg = "Выполняется проверка входа через Telegram… Повторите через несколько секунд.";
  pokerSafeChatAlert(msg);
}

/** false — прервать действие в чате (показано уведомление) */
function pokerEnsureChatTelegramVerified() {
  var st = getPokerChatTelegramAuthState();
  if (st === "pending") {
    pokerNotifyChatAuthPending();
    return false;
  }
  if (st !== "ok") {
    pokerNotifyChatVerificationRequired();
    return false;
  }
  return true;
}

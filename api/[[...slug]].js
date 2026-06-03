/**
 * Единая точка входа для всех API (лимит Vercel Hobby: 12 функций).
 * Маршруты: /api/chat, /api/users, /api/raffles и т.д. → handlers/chat.js, handlers/users.js, ...
 */
const pathSegment = (req) => {
  const pathname = (req.url || "").split("?")[0];
  const segment = pathname.replace(/^\/api\/?/, "").split("/")[0];
  return segment || null;
};

const path = require("path");
const handlersDir = path.join(__dirname, "..", "lib", "api-handlers");
const handlers = {
  "auth-telegram": () => require(path.join(handlersDir, "auth-telegram.js")),
  "auth-telegram-login": () => require(path.join(handlersDir, "auth-telegram-login.js")),
  "auth-email": () => require(path.join(handlersDir, "auth-email.js")),
  "auth-email-link": () => require(path.join(handlersDir, "auth-email-link.js")),
  "auth-pwa-code": () => require(path.join(handlersDir, "auth-pwa-code.js")),
  "pokerplus-bind": () => require(path.join(handlersDir, "pokerplus-bind.js")),
  "pokerplus-unbind": () => require(path.join(handlersDir, "pokerplus-unbind.js")),
  "pokerplus-player": () => require(path.join(handlersDir, "pokerplus-player.js")),
  "pokerplus-tables": () => require(path.join(handlersDir, "pokerplus-tables.js")),
  "pokerplus-competitions": () => require(path.join(handlersDir, "pokerplus-competitions.js")),
  "pokerplus-maintenance": () => require(path.join(handlersDir, "pokerplus-maintenance.js")),
  "pokerplus-club-league-data": () => require(path.join(handlersDir, "pokerplus-club-league-data.js")),
  "pokerplus-chip-logs": () => require(path.join(handlersDir, "pokerplus-chip-logs.js")),
  "player-crm": () => require(path.join(handlersDir, "player-crm.js")),
  "player-crm-push-event": () => require(path.join(handlersDir, "player-crm-push-event.js")),
  "telegram-bot-info": () => require(path.join(handlersDir, "telegram-bot-info.js")),
  "telegram-bot-webhook": () => require(path.join(handlersDir, "telegram-bot-webhook.js")),
  "livekit-token": () => require(path.join(handlersDir, "livekit-token.js")),
  "livekit-egress": () => require(path.join(handlersDir, "livekit-egress.js")),
  "cloudflare-stream": () => require(path.join(handlersDir, "cloudflare-stream.js")),
  "auth-vk-pwa": () => require(path.join(handlersDir, "auth-vk-pwa.js")),
  avatar: () => require(path.join(handlersDir, "avatar.js")),
  chat: () => require(path.join(handlersDir, "chat.js")),
  "chat-image": () => require(path.join(handlersDir, "chat-image.js")),
  "chat-push-subscribe": () => require(path.join(handlersDir, "chat-push-subscribe.js")),
  "chat-push-broadcast": () => require(path.join(handlersDir, "chat-push-broadcast.js")),
  "chat-push-admin-send": () => require(path.join(handlersDir, "chat-push-admin-send.js")),
  "chat-push-admin-broadcast": () => require(path.join(handlersDir, "chat-push-admin-broadcast.js")),
  visit: () => require(path.join(handlersDir, "visit.js")),
  "section-views": () => require(path.join(handlersDir, "section-views.js")),
  "account-debug": () => require(path.join(handlersDir, "account-debug.js")),
  users: () => require(path.join(handlersDir, "users.js")),
  user: () => require(path.join(handlersDir, "user.js")),
  admin: () => require(path.join(handlersDir, "admin.js")),
  promo: () => require(path.join(handlersDir, "promo.js")),
  pikhanina: () => require(path.join(handlersDir, "pikhanina.js")),
  "visitors-list": () => require(path.join(handlersDir, "visitors-list.js")),
  "visitor-telegram-status": () => require(path.join(handlersDir, "visitor-telegram-status.js")),
  "setup-qstash-reminder": () => require(path.join(handlersDir, "setup-qstash-reminder.js")),
  "freeroll-reminder-send": () => require(path.join(handlersDir, "freeroll-reminder-send.js")),
  "send-to-user": () => require(path.join(handlersDir, "send-to-user.js")),
  "send-bulk": () => require(path.join(handlersDir, "send-bulk.js")),
  "cron-reminder-10min": () => require(path.join(handlersDir, "cron-reminder-10min.js")),
  "cron-raffles": () => require(path.join(handlersDir, "cron-raffles.js")),
  "freeroll-reminder-subscribe": () => require(path.join(handlersDir, "freeroll-reminder-subscribe.js")),
  "gazette-subscribe": () => require(path.join(handlersDir, "gazette-subscribe.js")),
  "gazette-article-comments": () => require(path.join(handlersDir, "gazette-article-comments.js")),
  "gazette-editor-planner": () => require(path.join(handlersDir, "gazette-editor-planner.js")),
  "rating-subscribe": () => require(path.join(handlersDir, "rating-subscribe.js")),
  "raffle-subscribe": () => require(path.join(handlersDir, "raffle-subscribe.js")),
  "gazette-notify": () => require(path.join(handlersDir, "gazette-notify.js")),
  "gazette-notify-test": () => require(path.join(handlersDir, "gazette-notify-test.js")),
  "gazette-manual-subscribers": () => require(path.join(handlersDir, "gazette-manual-subscribers.js")),
  "rating-notify": () => require(path.join(handlersDir, "rating-notify.js")),
  "deploy-hook": () => require(path.join(handlersDir, "deploy-hook.js")),
  "rating-manual": () => require(path.join(handlersDir, "rating-manual.js")),
  "rating-manual-subscribers": () => require(path.join(handlersDir, "rating-manual-subscribers.js")),
  "raffle-manual-subscribers": () => require(path.join(handlersDir, "raffle-manual-subscribers.js")),
  raffles: () => require(path.join(handlersDir, "raffles.js")),
  "twitch-viewers": () => require(path.join(handlersDir, "twitch-viewers.js")),
  respect: () => require(path.join(handlersDir, "respect.js")),
  friends: () => require(path.join(handlersDir, "friends.js")),
  "share-button-stats": () => require(path.join(handlersDir, "share-button-stats.js")),
  "admin-report-shifts": () => require(path.join(handlersDir, "admin-report-shifts.js")),
  "tracking-links": () => require(path.join(handlersDir, "tracking-links.js")),
  "tracking-link-hit": () => require(path.join(handlersDir, "tracking-link-hit.js")),
  "tracking-link-event": () => require(path.join(handlersDir, "tracking-link-event.js")),
  "yandex-disk-play": () => require(path.join(handlersDir, "yandex-disk-play.js")),
  "video-lesson-reviews": () => require(path.join(handlersDir, "video-lesson-reviews.js")),
};

module.exports = async function handler(req, res) {
  const segment = pathSegment(req);
  if (!segment || !handlers[segment]) {
    res.status(404).json({ ok: false, error: "Not found" });
    return;
  }
  try {
    const fn = handlers[segment]();
    const handlerFn = typeof fn === "function" ? fn : fn.default || fn;
    await handlerFn(req, res);
  } catch (e) {
    console.error(e);
    if (segment === "player-crm") {
      res.status(500).json({ ok: false, error: "CRM API error", code: "crm_unhandled" });
      return;
    }
    res.status(500).json({ ok: false, error: "Server error" });
  }
};

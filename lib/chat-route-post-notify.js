"use strict";

function buildChatPostSnippet(payload) {
  payload = payload || {};
  return (
    payload.text ||
    (payload.image ? "Фото" : "") ||
    (payload.voice ? "Голосовое" : "") ||
    (payload.documentName ? payload.documentName : "") ||
    "Сообщение"
  );
}

function buildTelegramChatPostSnippet(payload) {
  payload = payload || {};
  return (
    payload.text ||
    (payload.image ? "📷 фото" : "") ||
    (payload.voice ? "🎤 голосовое" : "") ||
    (payload.documentName ? "📎 " + payload.documentName : "") ||
    "сообщение"
  );
}

function createChatPostNotifyHelpers(deps) {
  deps = deps || {};
  const {
    BOT_TOKEN,
    buildClubChatMiniAppLink,
    runAsyncChatSideEffect,
    sendTelegram,
  } = deps;

  function notifyGroupWebPush(payload) {
    payload = payload || {};
    const members = Array.isArray(payload.members) ? payload.members : [];
    const senderId = payload.senderId || "";
    const groupId = payload.groupId || "";
    const groupTitle = payload.groupTitle || "";
    const senderName = payload.senderName || "Игрок";
    const snippet = String(payload.snippet || "").slice(0, 120);
    runAsyncChatSideEffect("[chat] notifyChatGroupWebPush", async () => {
      const { notifyChatGroupWebPush } = require("./chat-webpush-notify");
      const tasks = [];
      for (let i = 0; i < members.length; i++) {
        const recipientId = String(members[i] || "").trim();
        if (!recipientId || recipientId === senderId) continue;
        tasks.push(
          notifyChatGroupWebPush({
            recipientId,
            groupId,
            senderName,
            snippet,
            groupTitle,
          })
        );
      }
      if (tasks.length) await Promise.all(tasks);
    });
  }

  function notifyTelegramDm(payload) {
    payload = payload || {};
    const otherId = String(payload.recipientId || "");
    if (!otherId.startsWith("tg_")) return;
    const otherTgId = otherId.replace(/^tg_/, "");
    if (!otherTgId.match(/^\d+$/) || !BOT_TOKEN) return;
    const senderName = payload.senderName || "Игрок";
    const tgBody = buildTelegramChatPostSnippet(payload);
    const openDm = buildClubChatMiniAppLink();
    runAsyncChatSideEffect("[chat] sendTelegram dm", function () {
      return sendTelegram(otherTgId, "💬 " + senderName + ": " + tgBody, {
        text: "Открыть чат",
        url: openDm,
      });
    });
  }

  function notifyDmWebPush(payload) {
    payload = payload || {};
    runAsyncChatSideEffect("[chat] notifyChatDmWebPush", async () => {
      const { notifyChatDmWebPush } = require("./chat-webpush-notify");
      await notifyChatDmWebPush({
        recipientId: payload.recipientId,
        senderId: payload.senderId,
        senderName: payload.senderName,
        snippet: String(payload.snippet || buildChatPostSnippet(payload)).slice(0, 120),
      });
    });
  }

  function notifyGeneralWebPush(payload) {
    payload = payload || {};
    runAsyncChatSideEffect("[chat] triggerGeneralChatWebPush", async () => {
      const { triggerGeneralChatWebPush } = require("./chat-webpush-notify");
      await triggerGeneralChatWebPush({
        senderId: payload.senderId,
        senderName: payload.senderName,
        snippet: String(payload.snippet || buildChatPostSnippet(payload)).slice(0, 120),
      });
    });
  }

  return {
    buildSnippet: buildChatPostSnippet,
    notifyGroupWebPush,
    notifyTelegramDm,
    notifyDmWebPush,
    notifyGeneralWebPush,
  };
}

module.exports = {
  buildChatPostSnippet,
  createChatPostNotifyHelpers,
};

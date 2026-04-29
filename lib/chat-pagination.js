"use strict";

const { chatMessageIsNewerThanLastViewed } = require("./chat-core");

const OLDER_MESSAGES_BATCH = 40;

function filterMessagesAfterCursor(messages, afterId, afterTime) {
  const list = Array.isArray(messages) ? messages : [];
  const idNeedle = afterId != null && afterId !== "" ? String(afterId) : "";
  const timeNeedle = afterTime != null && afterTime !== "" ? String(afterTime) : "";
  if (!idNeedle && !timeNeedle) return list;
  if (idNeedle) {
    for (let i = list.length - 1; i >= 0; i--) {
      const msg = list[i];
      if (msg && String(msg.id || "") === idNeedle) return list.slice(i + 1);
    }
  }
  if (timeNeedle) {
    return list.filter((m) => m && chatMessageIsNewerThanLastViewed(m.time, timeNeedle));
  }
  return list;
}

function sliceMessagesBeforeCursor(messages, beforeId, beforeTime, limit) {
  const list = Array.isArray(messages) ? messages : [];
  const idNeedle = beforeId != null && beforeId !== "" ? String(beforeId) : "";
  const timeNeedle = beforeTime != null && beforeTime !== "" ? String(beforeTime) : "";
  const batchLimit = Math.max(1, parseInt(String(limit), 10) || OLDER_MESSAGES_BATCH);
  let endExclusive = list.length;
  if (idNeedle) {
    const idx = list.findIndex((msg) => msg && String(msg.id || "") === idNeedle);
    if (idx >= 0) endExclusive = idx;
  } else if (timeNeedle) {
    const idx = list.findIndex((msg) => msg && !chatMessageIsNewerThanLastViewed(msg.time, timeNeedle));
    if (idx >= 0) endExclusive = idx;
  }
  const start = Math.max(0, endExclusive - batchLimit);
  return {
    messages: list.slice(start, endExclusive),
    hasMoreBefore: start > 0,
  };
}

module.exports = {
  OLDER_MESSAGES_BATCH,
  filterMessagesAfterCursor,
  sliceMessagesBeforeCursor,
};

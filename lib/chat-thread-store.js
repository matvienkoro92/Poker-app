"use strict";

const {
  buildThreadPreviewText,
  threadMessageIndexKey,
  threadMetaKeyByStorageKey,
} = require("./chat-storage");

async function writeThreadMeta(redisPipeline, redisKey, msg) {
  const k = String(redisKey || "").trim();
  if (!k || !msg || typeof msg !== "object") return;
  const lastTime = msg.time != null ? String(msg.time).trim() : "";
  const lastId = msg.id != null ? String(msg.id).trim() : "";
  const previewText = buildThreadPreviewText(msg);
  if (!lastTime && !lastId) return;
  const cmds = [];
  if (lastTime) cmds.push(["HSET", threadMetaKeyByStorageKey(k), "lastMessageTime", lastTime]);
  if (lastId) cmds.push(["HSET", threadMetaKeyByStorageKey(k), "lastMessageId", lastId]);
  if (previewText) cmds.push(["HSET", threadMetaKeyByStorageKey(k), "lastMessagePreview", previewText]);
  if (cmds.length) await redisPipeline(cmds);
}

// Kept as an API-compatible hook for callers. The list is the canonical history.
// Do not duplicate every full message/inline attachment into an unbounded hash.
// Existing index entries are retained until the explicit recovery audit has run.
async function writeThreadMessageIndex(redisPipeline, redisKey, msg, rawJsonOpt) {
  return;
}

async function deleteThreadMessageIndex(redisPipeline, redisKey, messageId) {
  const k = String(redisKey || "").trim();
  const id = messageId != null ? String(messageId).trim() : "";
  if (!k || !id) return;
  await redisPipeline([["HDEL", threadMessageIndexKey(k), id]]);
}

async function locateThreadMessageById(redisPipeline, redisKey, messageId) {
  const k = String(redisKey || "").trim();
  const id = messageId != null ? String(messageId).trim() : "";
  if (!k || !id) return { found: false };
  try {
    const fast = await redisPipeline([
      ["HGET", threadMessageIndexKey(k), id],
    ]);
    const rawIndexed = fast && fast[0] && fast[0].result != null ? String(fast[0].result) : "";
    if (rawIndexed) {
      const posRes = await redisPipeline([["LPOS", k, rawIndexed]]);
      const posRaw = posRes && posRes[0] ? posRes[0].result : null;
      if (posRaw != null && posRaw !== false) {
        let msgObj = null;
        try {
          msgObj = JSON.parse(rawIndexed);
        } catch (eParseIdx) {}
        return {
          found: true,
          index: parseInt(String(posRaw), 10),
          raw: rawIndexed,
          message: msgObj,
          fromIndex: true,
        };
      }
      // A legacy index may contain the only surviving copy of an old message.
    }
  } catch (eFastLocate) {}
  // Locate recent edits/deletes without downloading the complete retained history.
  const started = Date.now();
  for (let offset = 0; ; offset += 40) {
    if (Date.now() - started > 4000) throw new Error("chat_message_lookup_timeout");
    const results = await redisPipeline([["LRANGE", k, String(offset), String(offset + 39)]], {
      context: "chat.thread.locateMessage.page", throwOnError: true,
    });
    const list = results && results[0] && results[0].result;
    if (!Array.isArray(list)) throw new Error("chat_message_lookup_unavailable");
    for (let i = 0; i < list.length; i++) {
      let message;
      try { message = JSON.parse(list[i]); } catch (_) { continue; }
      if (message && String(message.id) === id) return {
        found: true, index: offset + i, raw: list[i], message, fromIndex: false,
      };
    }
    if (list.length < 40) return { found: false };
  }

}

module.exports = {
  deleteThreadMessageIndex,
  locateThreadMessageById,
  writeThreadMessageIndex,
  writeThreadMeta,
};

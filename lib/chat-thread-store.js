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

async function writeThreadMessageIndex(redisPipeline, redisKey, msg, rawJsonOpt) {
  const k = String(redisKey || "").trim();
  const id = msg && msg.id != null ? String(msg.id).trim() : "";
  if (!k || !id || !msg || typeof msg !== "object") return;
  const raw = rawJsonOpt != null ? String(rawJsonOpt) : JSON.stringify(msg);
  await redisPipeline([["HSET", threadMessageIndexKey(k), id, raw]]);
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
      await deleteThreadMessageIndex(redisPipeline, k, id);
    }
  } catch (eFastLocate) {}
  const results = await redisPipeline([["LRANGE", k, "0", "-1"]]);
  const raw = results && results[0] && results[0].result !== undefined ? results[0].result : [];
  const list = Array.isArray(raw) ? raw : [];
  for (let i = 0; i < list.length; i++) {
    try {
      const m = JSON.parse(list[i]);
      if (m && String(m.id) === id) {
        try {
          await writeThreadMessageIndex(redisPipeline, k, m, list[i]);
        } catch (eBackfillIdx) {}
        return {
          found: true,
          index: i,
          raw: list[i],
          message: m,
          fromIndex: false,
        };
      }
    } catch (eListLocate) {}
  }
  return { found: false };
}

module.exports = {
  deleteThreadMessageIndex,
  locateThreadMessageById,
  writeThreadMessageIndex,
  writeThreadMeta,
};

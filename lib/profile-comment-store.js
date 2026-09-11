"use strict";
const crypto = require("crypto");
const { pipeline } = require("./redis");
const SAVE = `-- profile_comment_save_v1
local kind = redis.call('TYPE', KEYS[1])
if type(kind) == 'table' then kind = kind.ok end
if kind ~= 'none' and kind ~= 'list' then return redis.error_reply('Invalid comments storage') end
if KEYS[2] ~= '' then
  local previous = redis.call('GET', KEYS[2])
  if previous then
    if previous == ARGV[3] then return 0 end
    return -1
  end
end
redis.call('LPUSH', KEYS[1], ARGV[1])
redis.call('LTRIM', KEYS[1], 0, tonumber(ARGV[2]) - 1)
if KEYS[2] ~= '' then redis.call('SET', KEYS[2], ARGV[3], 'EX', 86400) end
return 1`;
async function saveProfileComment(key, requestKey, comment, limit) {
  const fingerprint = crypto.createHash("sha256").update(JSON.stringify([comment.memberId, comment.text, comment.replyTo && comment.replyTo.id || ""])).digest("hex");
  const rows = await pipeline([["EVAL", SAVE, "2", key, requestKey || "", JSON.stringify(comment), String(limit), fingerprint]], { context: "profile-comment.save" });
  if (!rows) return null;
  return Number(rows[0].result);
}
module.exports = { saveProfileComment, SAVE };

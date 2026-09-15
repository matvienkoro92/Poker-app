"use strict";

const KEY = "poker_app:raffle_notification_retry_queue";
const INTERVAL_MS = 2 * 60 * 1000;
function createRetryQueue({ pipeline, processRaffle, now = Date.now }) {
  async function enqueue(raffleId) {
    if (!raffleId) return;
    await pipeline([["ZADD", KEY, "NX", now() + INTERVAL_MS, String(raffleId)]], { throwOnError: true, context: "raffle-notify.enqueue" });
  }
  async function drain() {
    const rows = await pipeline([["ZRANGEBYSCORE", KEY, "-inf", now(), "LIMIT", 0, 10]], { throwOnError: true, context: "raffle-notify.due" });
    const ids = rows && rows[0] && rows[0].result;
    if (!Array.isArray(ids)) throw new Error("Notification retry queue unavailable");
    const results = await Promise.allSettled(ids.map(async (id) => {
      // Move the job before attempting delivery. A process crash leaves it retryable.
      await pipeline([["ZADD", KEY, now() + INTERVAL_MS, id]], { throwOnError: true, context: "raffle-notify.reserve" });
      const pending = await processRaffle(id);
      if (!pending) await pipeline([["ZREM", KEY, id]], { throwOnError: true, context: "raffle-notify.finish" });
      return pending;
    }));
    return { processed: ids.length, failed: results.filter((row) => row.status === "rejected").length };
  }
  return { enqueue, drain };
}
module.exports = { createRetryQueue, KEY };

// Four timestamps separate server processing from network travel time (NTP midpoint).
export function clockSample(data, sent, received) {
 if (!Number.isFinite(data?.serverNow)) return null;
 const start = Number.isFinite(data.serverReceivedAt) && data.serverReceivedAt <= data.serverNow ? data.serverReceivedAt : data.serverNow;
 const processing = data.serverNow - start;
 return { offset: ((start - sent) + (data.serverNow - received)) / 2,
  rtt: Math.max(0, received - sent - processing), at: received };
}
export function createClockSync() {
 let best = null, displayOffset = null, lastLocal = null, lastNow = null;
 return {
  update(data, sent, received) {
   const sample = clockSample(data, sent, received);
   if (!sample) return best?.offset ?? null;
   // Slow, overlapping responses must not make either player's clock jump.
   if (!best || sample.rtt <= best.rtt || received - best.at > 30000) best = sample;
   return best.offset;
  },
  // Slew clock corrections instead of moving the countdown backwards on a poll.
  now(local = Date.now()) {
   const target = best?.offset ?? 0;
   if (displayOffset === null) displayOffset = target;
   const elapsed = lastLocal === null ? 0 : Math.max(0, local - lastLocal);
   const limit = elapsed * .05;
   displayOffset += Math.max(-limit, Math.min(limit, target - displayOffset));
   const value = Math.max(lastNow ?? -Infinity, local + displayOffset);
   lastLocal = local; lastNow = value;
   return value;
  },
  reset() { best = null; displayOffset = lastLocal = lastNow = null; }
 };
}

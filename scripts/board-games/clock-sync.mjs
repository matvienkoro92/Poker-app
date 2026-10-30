// Four timestamps separate server processing from network travel time (NTP midpoint).
export function clockSample(data, sent, received) {
 if (!Number.isFinite(data?.serverNow)) return null;
 const start = Number.isFinite(data.serverReceivedAt) && data.serverReceivedAt <= data.serverNow ? data.serverReceivedAt : data.serverNow;
 const processing = data.serverNow - start;
 return { offset: ((start - sent) + (data.serverNow - received)) / 2,
  rtt: Math.max(0, received - sent - processing), at: received };
}
export function createClockSync() {
 let best = null;
 return {
  update(data, sent, received) {
   const sample = clockSample(data, sent, received);
   if (!sample) return best?.offset ?? null;
   // Slow, overlapping responses must not make either player's clock jump.
   if (!best || sample.rtt <= best.rtt || received - best.at > 30000) best = sample;
   return best.offset;
  },
  reset() { best = null; }
 };
}

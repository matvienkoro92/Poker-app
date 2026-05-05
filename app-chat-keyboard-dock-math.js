// Pure keyboard dock math shared by viewport and dock runtimes.

function pokerChatClampNumber(value, min, max) {
  var n = Number(value);
  if (!isFinite(n)) n = 0;
  return Math.min(max, Math.max(min, n));
}

function pokerChatVisualViewportMetrics(input) {
  input = input || {};
  var vvh = Number(input.visualViewportHeight) || 0;
  var ih = Number(input.innerHeight) || 0;
  var offsetTop = Number(input.offsetTop) || 0;
  var heightLoss = Math.max(0, Math.round(ih - vvh));
  var overlap = Math.max(0, Math.round(ih - vvh - offsetTop));
  if (overlap < 20 && heightLoss > overlap + 6) {
    overlap = Math.max(overlap, Math.round(heightLoss - Math.max(0, offsetTop)));
  }
  if (overlap < 8 && vvh + 24 < ih) {
    overlap = Math.max(overlap, heightLoss);
  }
  return { vvh: vvh, ih: ih, offsetTop: offsetTop, heightLoss: heightLoss, overlap: overlap };
}

function pokerChatFallbackInsetMetrics(input) {
  input = input || {};
  var ih = Number(input.innerHeight) || 0;
  var baseline = Number(input.baseline) || 0;
  var cap = Math.min(520, Math.round(ih * 0.55));
  var loss = baseline > 260 && ih > 0 ? Math.max(0, Math.round(baseline - ih)) : 0;
  var inset = Math.min(cap, Math.max(140, Math.round(loss * 0.92)));
  if (inset < 170) inset = Math.min(cap, Math.max(inset, Math.round(ih * 0.36)));
  if (input.hasFocusedComposer) inset = Math.min(cap, Math.max(inset, Math.round(ih * 0.38)));
  return { cap: cap, loss: loss, inset: inset };
}

function pokerChatViewportCoverMetrics(input) {
  var m = pokerChatVisualViewportMetrics(input);
  var baseline = Number(input && input.baseline) || 0;
  var winLoss = baseline > 260 && m.ih > 0 ? Math.max(0, Math.round(baseline - m.ih)) : 0;
  return Object.assign({}, m, { winLoss: winLoss, cover: Math.max(m.overlap, winLoss) });
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    pokerChatClampNumber: pokerChatClampNumber,
    pokerChatVisualViewportMetrics: pokerChatVisualViewportMetrics,
    pokerChatFallbackInsetMetrics: pokerChatFallbackInsetMetrics,
    pokerChatViewportCoverMetrics: pokerChatViewportCoverMetrics,
  };
}

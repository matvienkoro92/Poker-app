// Pure chat message render signature helpers.

var CHAT_RENDER_TAIL_SIG_LIMIT = 8;
/** Порядок ключей объекта и элементов массивов реакций с бэкенда не гарантирован; JSON.stringify тогда «плавает» → сигнатура ленты меняется без реальных изменений и весь список перерисовывается (мерцание). */
function stableReactionsSignaturePart(reactions) {
  if (!reactions || typeof reactions !== "object" || Array.isArray(reactions)) return "";
  var keys = Object.keys(reactions);
  keys.sort();
  var parts = [];
  for (var ri = 0; ri < keys.length; ri++) {
    var rk = keys[ri];
    var rv = reactions[rk];
    if (rv == null) {
      parts.push(rk + ":");
      continue;
    }
    if (Array.isArray(rv)) {
      var sortedU = rv.map(function (x) { return String(x); }).sort();
      parts.push(rk + ":" + sortedU.join(","));
      continue;
    }
    if (typeof rv === "object") {
      var ok = Object.keys(rv).sort();
      parts.push(rk + ":" + ok.map(function (nk) { return nk + "=" + String(rv[nk]); }).join(","));
      continue;
    }
    parts.push(rk + ":" + String(rv));
  }
  return parts.join("|");
}
function generalMessagesSignature(messages) {
  if (!messages || messages.length === 0) return "";
  var last = messages[messages.length - 1];
  var reactionsPart = messages.map(function (m) {
    var r = m.reactions && typeof m.reactions === "object" && !Array.isArray(m.reactions) ? m.reactions : {};
    return (m.id || "") + ":" + stableReactionsSignaturePart(r);
  }).join(";");
  return messages.length + "-" + (last.id || "") + "-" + (last.time || "") + "-" + reactionsPart;
}
function chatMessagesTailSignature(messages, limit) {
  var list = Array.isArray(messages) ? messages : [];
  if (!list.length) return "";
  var take = Math.max(1, parseInt(String(limit), 10) || CHAT_RENDER_TAIL_SIG_LIMIT);
  var tail = list.slice(Math.max(0, list.length - take));
  return tail.map(function (m) {
    var r = m && m.reactions && typeof m.reactions === "object" && !Array.isArray(m.reactions) ? m.reactions : {};
    return (m && m.id ? String(m.id) : "") + ":" + stableReactionsSignaturePart(r);
  }).join(";");
}
function generalRenderSignature(messages, isPartial) {
  if (!messages || !messages.length) return "";
  if (!isPartial) return generalMessagesSignature(messages);
  var last = messages[messages.length - 1];
  return "tail:" + messages.length + "-" + (last.id || "") + "-" + (last.time || "") + "-" + chatMessagesTailSignature(messages, CHAT_RENDER_TAIL_SIG_LIMIT);
}
function personalRenderSignature(peerId, messages, isPartial) {
  var peer = peerId != null ? String(peerId) : "";
  if (!messages || !messages.length) return peer + "-0";
  if (!isPartial) {
    var reactionsPart = messages.map(function (m) {
      var r = m && m.reactions && typeof m.reactions === "object" && !Array.isArray(m.reactions) ? m.reactions : {};
      return (m && m.id ? String(m.id) : "") + ":" + stableReactionsSignaturePart(r);
    }).join(";");
    var last = messages[messages.length - 1];
    return peer + "-" + messages.length + "-" + (last.id || "") + "-" + (last.time || "") + "-" + reactionsPart;
  }
  var lastP = messages[messages.length - 1];
  return peer + "-tail-" + messages.length + "-" + (lastP.id || "") + "-" + (lastP.time || "") + "-" + chatMessagesTailSignature(messages, CHAT_RENDER_TAIL_SIG_LIMIT);
}

function canFastAppendMessages(prevMessages, nextMessages) {
  var prev = Array.isArray(prevMessages) ? prevMessages : [];
  var next = Array.isArray(nextMessages) ? nextMessages : [];
  if (!prev.length || next.length <= prev.length) return false;
  for (var i = 0; i < prev.length; i++) {
    var a = prev[i];
    var b = next[i];
    if (!a || !b) return false;
    if (String(a.id || "") !== String(b.id || "")) return false;
    if (String(a.time || "") !== String(b.time || "")) return false;
    if (stableReactionsSignaturePart(a.reactions || {}) !== stableReactionsSignaturePart(b.reactions || {})) return false;
  }
  return true;
}
function chatMessagesDomHasOptimisticNode(rootEl) {
  if (!rootEl || !rootEl.querySelector) return false;
  try {
    return !!rootEl.querySelector('.chat-msg[data-optimistic="true"]');
  } catch (eChatOptDom) {
    return false;
  }
}
function chatPokerPlusVerifiedBadgeHtml(isVerified) {
  return isVerified
    ? '<span class="chat-msg__verified" title="PokerPlus verified" aria-label="PokerPlus verified">✓</span>'
    : "";
}

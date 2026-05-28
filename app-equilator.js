(function equilatorHandEval() {
  var RANKS = "23456789TJQKA";
  var SUITS = "shdc";
  function cardToStr(c) { return (c && RANKS[c.r - 2] != null && SUITS[c.s] != null) ? RANKS[c.r - 2] + SUITS[c.s] : null; }
  function parseCard(str) {
    if (!str || str.length < 2) return null;
    var r = String(str).toUpperCase();
    var rankCh = r.charAt(0);
    var suitCh = r.charAt(1).toLowerCase();
    var ri = RANKS.indexOf(rankCh);
    var si = SUITS.indexOf(suitCh);
    if (ri < 0 || si < 0) return null;
    return { r: ri + 2, s: si };
  }
  function makeDeck() {
    var d = [];
    for (var s = 0; s < 4; s++) for (var r = 2; r <= 14; r++) d.push({ r: r, s: s });
    return d;
  }
  function cloneCards(arr) { return arr.map(function (c) { return { r: c.r, s: c.s }; }); }
  function rankCounts(cards) {
    var cnt = {};
    for (var i = 0; i < cards.length; i++) { var r = cards[i].r; cnt[r] = (cnt[r] || 0) + 1; }
    return cnt;
  }
  function suitCounts(cards) {
    var cnt = {};
    for (var i = 0; i < cards.length; i++) { var s = cards[i].s; cnt[s] = (cnt[s] || 0) + 1; }
    return cnt;
  }
  function sortRanksDesc(cards) {
    var r = cards.map(function (c) { return c.r; }).sort(function (a, b) { return b - a; });
    return r;
  }
  function isStraight(ranks) {
    var uniq = [];
    for (var i = 0; i < ranks.length; i++) if (uniq.indexOf(ranks[i]) < 0) uniq.push(ranks[i]);
    uniq.sort(function (a, b) { return b - a; });
    if (uniq.length < 5) return null;
    for (var j = 0; j <= uniq.length - 5; j++) {
      var a = uniq[j];
      if (uniq[j + 1] === a - 1 && uniq[j + 2] === a - 2 && uniq[j + 3] === a - 3 && uniq[j + 4] === a - 4) return a;
    }
    if (uniq.indexOf(14) >= 0 && uniq.indexOf(5) >= 0 && uniq.indexOf(4) >= 0 && uniq.indexOf(3) >= 0 && uniq.indexOf(2) >= 0) return 5;
    return null;
  }
  function eval5(cards) {
    if (cards.length !== 5) return [0, 0, 0, 0, 0, 0];
    var ranks = sortRanksDesc(cards);
    var rc = rankCounts(cards);
    var sc = suitCounts(cards);
    var flush = false;
    for (var s in sc) if (sc[s] >= 5) { flush = true; break; }
    var straightHigh = isStraight(ranks);
    var values = Object.keys(rc).map(Number);
    var byCount = {};
    for (var v in rc) { var n = rc[v]; if (!byCount[n]) byCount[n] = []; byCount[n].push(parseInt(v, 10)); }
    for (var n in byCount) byCount[n].sort(function (a, b) { return b - a; });
    if (flush && straightHigh !== null) return [8, straightHigh, 0, 0, 0, 0];
    if (byCount[4]) return [7, byCount[4][0], values.filter(function (x) { return x !== byCount[4][0]; }).sort(function (a, b) { return b - a; })[0] || 0, 0, 0, 0];
    if (byCount[3] && byCount[2]) return [6, byCount[3][0], byCount[2][0], 0, 0, 0];
    if (flush) { var fr = sortRanksDesc(cards); return [5, fr[0], fr[1], fr[2], fr[3], fr[4]]; }
    if (straightHigh !== null) return [4, straightHigh, 0, 0, 0, 0];
    if (byCount[3]) { var tk = byCount[3][0]; var kickers = values.filter(function (x) { return x !== tk; }).sort(function (a, b) { return b - a; }).slice(0, 2); return [3, tk, kickers[0] || 0, kickers[1] || 0, 0, 0]; }
    if (byCount[2] && byCount[2].length >= 2) { var p2 = byCount[2].slice(0, 2).sort(function (a, b) { return b - a; }); var k = values.filter(function (x) { return p2.indexOf(x) < 0; }).sort(function (a, b) { return b - a; })[0]; return [2, p2[0], p2[1], k, 0, 0]; }
    if (byCount[2]) { var p = byCount[2][0]; var k2 = values.filter(function (x) { return x !== p; }).sort(function (a, b) { return b - a; }).slice(0, 3); return [1, p, k2[0] || 0, k2[1] || 0, k2[2] || 0, 0]; }
    return [0, ranks[0], ranks[1], ranks[2], ranks[3], ranks[4]];
  }
  function comb5from7(cards) {
    var out = [];
    for (var i = 0; i < 7; i++) for (var j = i + 1; j < 7; j++) for (var k = j + 1; k < 7; k++) for (var l = k + 1; l < 7; l++) for (var m = l + 1; m < 7; m++) out.push([cards[i], cards[j], cards[k], cards[l], cards[m]]);
    return out;
  }
  function bestHandValue(cards7) {
    if (cards7.length < 5) return [0, 0, 0, 0, 0, 0];
    var fives = cards7.length === 5 ? [cards7] : (cards7.length === 7 ? comb5from7(cards7) : []);
    var best = [0, 0, 0, 0, 0, 0];
    for (var i = 0; i < fives.length; i++) {
      var v = eval5(fives[i]);
      for (var t = 0; t < 6; t++) {
        if (v[t] > best[t]) { best = v; break; }
        if (v[t] < best[t]) break;
      }
    }
    return best;
  }
  function handCompare(a, b) {
    for (var i = 0; i < 6; i++) {
      if (a[i] > b[i]) return 1;
      if (a[i] < b[i]) return -1;
    }
    return 0;
  }
  window.equilatorEvalHand = function (cards7) { return bestHandValue(cards7); };
  window.equilatorCompareHands = function (a7, b7) { return handCompare(bestHandValue(a7), bestHandValue(b7)); };
  window.equilatorParseCard = parseCard;
  window.equilatorMakeDeck = makeDeck;
  window.equilatorCloneCards = cloneCards;
})();

function initEquilator() {
  var RANKS = "23456789TJQKA";
  var RANKS_DISPLAY = { "2": "2", "3": "3", "4": "4", "5": "5", "6": "6", "7": "7", "8": "8", "9": "9", "T": "10", "J": "J", "Q": "Q", "K": "K", "A": "A" };
  var SUITS = "shdc";
  var SUITS_SYM = { "s": "♠", "h": "♥", "d": "♦", "c": "♣" };
  var BASE_SLOT_IDS = ["hero1", "hero2", "board1", "board2", "board3", "board4", "board5"];
  var calcBtn = document.getElementById("equilatorCalcBtn");
  var resultBlock = document.getElementById("equilatorResult");
  var winPct = document.getElementById("equilatorWinPct");
  var tiePct = document.getElementById("equilatorTiePct");
  var oppEquityLines = document.getElementById("equilatorOppEquityLines");
  var resultMeta = document.getElementById("equilatorResultMeta");
  var pickerWrap = document.getElementById("equilatorPickerWrap");
  var pickerGrid = document.getElementById("equilatorPickerGrid");
  var pickerTitle = document.getElementById("equilatorPickerTitle");
  var pickerClose = document.getElementById("equilatorPickerClose");
  var oppCardsContainer = document.getElementById("equilatorOppCards");
  var addPlayerBtn = document.getElementById("equilatorAddPlayerBtn");
  var rangeTabs = document.getElementById("equilatorRangeTabs");
  var rangeGrid = document.getElementById("equilatorRangeGrid");
  var rangeSummary = document.getElementById("equilatorRangeSummary");
  var rangePresetBtns = document.querySelectorAll("[data-equilator-range-preset]");
  var MATRIX_RANKS = "AKQJT98765432";
  var RANGE_TOP_ORDER = [
    "AA", "KK", "QQ", "JJ", "AKs", "TT", "AQs", "AJs", "KQs", "AKo",
    "99", "ATs", "KJs", "QJs", "KTs", "AQo", "AJo", "88", "QTs", "JTs",
    "A9s", "KQo", "77", "A8s", "K9s", "T9s", "A7s", "KJo", "66", "Q9s",
    "98s", "A5s", "A6s", "K8s", "QJo", "J9s", "87s", "A4s", "ATo", "55",
    "A3s", "K7s", "Q8s", "T8s", "97s", "A2s", "K6s", "44", "J8s", "86s",
    "K5s", "QTo", "T9o", "76s", "33", "K4s", "Q7s", "65s", "JTo", "K3s",
    "Q6s", "22", "K2s", "Q5s", "54s", "J7s", "T7s", "98o", "Q4s", "87o",
    "J9o", "Q3s", "T8o", "97o", "Q2s", "J6s", "76o", "75s", "64s", "J8o",
    "86o", "T6s", "96s", "65o", "54o", "T7o", "85s", "53s", "43s"
  ];
  var rangeState = { hero: {}, opps: [{}] };
  var activeRangeTarget = "hero";
  var activeSlotId = null;
  var numOpponents = 1;
  function getNumOpp() { return numOpponents; }
  function getOppSlotIds() {
    var n = numOpponents;
    var ids = [];
    for (var i = 1; i <= n * 2; i++) ids.push("opp" + i);
    return ids;
  }
  function getSlotIds() { return BASE_SLOT_IDS.concat(getOppSlotIds()); }
  function collectOppCards() {
    var out = [];
    for (var o = 0; o < numOpponents; o++) {
      var c1 = getSlotCard("opp" + (o * 2 + 1));
      var c2 = getSlotCard("opp" + (o * 2 + 2));
      out.push([c1, c2]);
    }
    return out;
  }
  function rangeLabelAt(row, col) {
    var r1 = MATRIX_RANKS.charAt(row);
    var r2 = MATRIX_RANKS.charAt(col);
    if (row === col) return r1 + r2;
    return row < col ? r1 + r2 + "s" : r2 + r1 + "o";
  }
  function rangeLabelKind(label) {
    if (!label || label.length < 2) return "offsuit";
    if (label.charAt(0) === label.charAt(1)) return "pair";
    return label.charAt(2) === "s" ? "suited" : "offsuit";
  }
  function rangeLabelBaseCombos(label) {
    var kind = rangeLabelKind(label);
    if (kind === "pair") return 6;
    return kind === "suited" ? 4 : 12;
  }
  function rangeTargetIndex(key) {
    if (key === "hero") return -1;
    if (String(key || "").indexOf("opp") !== 0) return -1;
    var idx = parseInt(String(key).slice(3), 10);
    return isFinite(idx) ? idx : -1;
  }
  function normalizeActiveRangeTarget() {
    var idx = rangeTargetIndex(activeRangeTarget);
    if (activeRangeTarget !== "hero" && (idx < 0 || idx >= numOpponents)) activeRangeTarget = "hero";
  }
  function ensureOppRangeState() {
    while (rangeState.opps.length < numOpponents) rangeState.opps.push({});
    if (rangeState.opps.length > numOpponents) rangeState.opps.length = numOpponents;
  }
  function getRangeMap(key) {
    ensureOppRangeState();
    if (key === "hero") return rangeState.hero;
    var idx = rangeTargetIndex(key);
    if (idx >= 0 && idx < rangeState.opps.length) return rangeState.opps[idx];
    return rangeState.hero;
  }
  function getActiveRangeMap() {
    normalizeActiveRangeTarget();
    return getRangeMap(activeRangeTarget);
  }
  function rangeTargetForSlot(slotId) {
    var id = String(slotId || "");
    if (id === "hero1" || id === "hero2") return "hero";
    if (id.indexOf("opp") === 0) {
      var cardNum = parseInt(id.slice(3), 10);
      if (isFinite(cardNum) && cardNum > 0) return "opp" + Math.floor((cardNum - 1) / 2);
    }
    return null;
  }
  function clearExactCardsForRangeTarget(key) {
    if (key === "hero") {
      clearSlot("hero1");
      clearSlot("hero2");
      return;
    }
    var idx = rangeTargetIndex(key);
    if (idx < 0) return;
    clearSlot("opp" + (idx * 2 + 1));
    clearSlot("opp" + (idx * 2 + 2));
  }
  function clearRangeForSlot(slotId) {
    var key = rangeTargetForSlot(slotId);
    if (!key) return;
    if (!rangeHasSelected(getRangeMap(key))) return;
    setRangeMap(key, []);
    renderRangeGrid();
    renderRangeTabs();
    updateRangeSummary();
  }
  function rangeTargetName(key) {
    if (key === "hero") return "Вы";
    var idx = rangeTargetIndex(key);
    return "Оппонент " + (idx + 1);
  }
  function rangeSelectedLabels(map) {
    var selected = map || {};
    var labels = [];
    for (var row = 0; row < MATRIX_RANKS.length; row++) {
      for (var col = 0; col < MATRIX_RANKS.length; col++) {
        var label = rangeLabelAt(row, col);
        if (selected[label]) labels.push(label);
      }
    }
    return labels;
  }
  function rangeHasSelected(map) {
    return rangeSelectedLabels(map).length > 0;
  }
  function rangeBaseComboCount(map) {
    var labels = rangeSelectedLabels(map);
    var count = 0;
    for (var i = 0; i < labels.length; i++) count += rangeLabelBaseCombos(labels[i]);
    return count;
  }
  function allRangeLabels() {
    var labels = [];
    for (var row = 0; row < MATRIX_RANKS.length; row++) {
      for (var col = 0; col < MATRIX_RANKS.length; col++) labels.push(rangeLabelAt(row, col));
    }
    return labels;
  }
  function setRangeMap(key, labels) {
    var map = getRangeMap(key);
    Object.keys(map).forEach(function (label) { delete map[label]; });
    (labels || []).forEach(function (label) { map[label] = true; });
  }
  function rangePresetLabels(preset) {
    if (preset === "clear") return [];
    var labels = [];
    if (preset === "all") return allRangeLabels();
    if (preset === "pairs") {
      for (var i = 0; i < MATRIX_RANKS.length; i++) labels.push(MATRIX_RANKS.charAt(i) + MATRIX_RANKS.charAt(i));
      return labels;
    }
    var targetPct = preset === "top10" ? 10 : preset === "top20" ? 20 : preset === "top50" ? 50 : 0;
    if (!targetPct) return labels;
    var ordered = RANGE_TOP_ORDER.slice();
    var seen = {};
    ordered.forEach(function (label) { seen[label] = true; });
    allRangeLabels().forEach(function (label) {
      if (!seen[label]) ordered.push(label);
    });
    var targetCombos = Math.round(1326 * targetPct / 100);
    var combos = 0;
    for (var j = 0; j < ordered.length && combos < targetCombos; j++) {
      if (labels.indexOf(ordered[j]) >= 0) continue;
      labels.push(ordered[j]);
      combos += rangeLabelBaseCombos(ordered[j]);
    }
    return labels;
  }
  function updateRangeSummary() {
    if (!rangeSummary) return;
    var map = getActiveRangeMap();
    var labels = rangeSelectedLabels(map);
    if (!labels.length) {
      rangeSummary.textContent = rangeTargetName(activeRangeTarget) + ": диапазон не выбран";
      return;
    }
    var combos = rangeBaseComboCount(map);
    var preview = labels.slice(0, 7).join(", ");
    if (labels.length > 7) preview += " +" + (labels.length - 7);
    rangeSummary.textContent = rangeTargetName(activeRangeTarget) + ": " + combos + " комб. · " + preview;
  }
  function renderRangeTabs() {
    if (!rangeTabs) return;
    ensureOppRangeState();
    normalizeActiveRangeTarget();
    rangeTabs.innerHTML = "";
    var keys = ["hero"];
    for (var o = 0; o < numOpponents; o++) keys.push("opp" + o);
    keys.forEach(function (key) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "equilator-range-tab" + (key === activeRangeTarget ? " equilator-range-tab--active" : "");
      btn.setAttribute("aria-pressed", key === activeRangeTarget ? "true" : "false");
      btn.setAttribute("data-equilator-range-target", key);
      btn.textContent = rangeTargetName(key);
      if (rangeHasSelected(getRangeMap(key))) btn.classList.add("equilator-range-tab--filled");
      btn.addEventListener("click", function () {
        activeRangeTarget = this.getAttribute("data-equilator-range-target") || "hero";
        renderRangeTabs();
        renderRangeGrid();
        updateRangeSummary();
      });
      rangeTabs.appendChild(btn);
    });
  }
  function renderRangeGrid() {
    if (!rangeGrid) {
      updateRangeSummary();
      return;
    }
    normalizeActiveRangeTarget();
    var gridTarget = activeRangeTarget;
    var map = getRangeMap(gridTarget);
    rangeGrid.innerHTML = "";
    for (var row = 0; row < MATRIX_RANKS.length; row++) {
      for (var col = 0; col < MATRIX_RANKS.length; col++) {
        var label = rangeLabelAt(row, col);
        var kind = rangeLabelKind(label);
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "equilator-range-cell equilator-range-cell--" + kind + (map[label] ? " equilator-range-cell--selected" : "");
        btn.setAttribute("data-equilator-range-label", label);
        btn.setAttribute("data-equilator-range-target", gridTarget);
        btn.setAttribute("aria-pressed", map[label] ? "true" : "false");
        btn.setAttribute("role", "gridcell");
        btn.textContent = label;
        btn.addEventListener("click", function () {
          var target = this.getAttribute("data-equilator-range-target") || activeRangeTarget;
          activeRangeTarget = target;
          var current = getRangeMap(target);
          var hand = this.getAttribute("data-equilator-range-label");
          if (current[hand]) delete current[hand];
          else {
            clearExactCardsForRangeTarget(target);
            current[hand] = true;
          }
          renderRangeGrid();
          renderRangeTabs();
          updateRangeSummary();
        });
        rangeGrid.appendChild(btn);
      }
    }
    updateRangeSummary();
  }
  function applyRangePreset(preset, targetKey) {
    var target = targetKey || activeRangeTarget;
    activeRangeTarget = target;
    var labels = rangePresetLabels(preset);
    if (labels.length) clearExactCardsForRangeTarget(target);
    setRangeMap(target, labels);
    renderRangeGrid();
    renderRangeTabs();
    updateRangeSummary();
  }
  function removeOpponent(idx) {
    if (numOpponents <= 1) return;
    var preserved = collectOppCards();
    preserved.splice(idx, 1);
    if (rangeState.opps[idx]) rangeState.opps.splice(idx, 1);
    if (activeRangeTarget === "opp" + idx) activeRangeTarget = "hero";
    else {
      var activeIdx = rangeTargetIndex(activeRangeTarget);
      if (activeIdx > idx) activeRangeTarget = "opp" + (activeIdx - 1);
    }
    numOpponents--;
    buildOppSlots(preserved);
  }
  function buildOppSlots(preservedCards) {
    if (!oppCardsContainer) return;
    ensureOppRangeState();
    oppCardsContainer.innerHTML = "";
    for (var o = 0; o < numOpponents; o++) {
      var row = document.createElement("div");
      row.className = "equilator-opp-row";
      var head = document.createElement("div");
      head.className = "equilator-opp-row-head";
      if (numOpponents > 1) {
        var minusBtn = document.createElement("button");
        minusBtn.type = "button";
        minusBtn.className = "equilator-opp-remove-btn";
        minusBtn.setAttribute("aria-label", "Удалить оппонента " + (o + 1));
        minusBtn.textContent = "−";
        minusBtn.dataset.oppIdx = String(o);
        minusBtn.addEventListener("click", function (e) {
          e.preventDefault();
          removeOpponent(parseInt(this.dataset.oppIdx, 10));
        });
        head.appendChild(minusBtn);
      }
      var label = document.createElement("span");
      label.className = "equilator-opp-label";
      label.textContent = "Оппонент " + (o + 1);
      head.appendChild(label);
      row.appendChild(head);
      var cardsWrap = document.createElement("div");
      cardsWrap.className = "equilator-cards";
      var prevCards = preservedCards && preservedCards[o] ? preservedCards[o] : [null, null];
      for (var c = 0; c < 2; c++) {
        var slotId = "opp" + (o * 2 + c + 1);
        var wrap = document.createElement("div");
        wrap.className = "equilator-slot-wrap";
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "equilator-card-slot";
        btn.setAttribute("data-equilator-slot", slotId);
        btn.setAttribute("aria-label", "Оппонент " + (o + 1) + " карта " + (c + 1));
        var card = prevCards[c];
        if (card) {
          var rankStr = (RANKS[card.r - 2] != null) ? RANKS[card.r - 2] : String(card.r);
          var suitStr = (SUITS[card.s] != null) ? SUITS[card.s] : String(card.s);
          btn.setAttribute("data-rank", rankStr);
          btn.setAttribute("data-suit", suitStr);
          btn.innerHTML = "<span class=\"equilator-card-slot__text\">" + ((RANKS_DISPLAY[rankStr] || rankStr) + (SUITS_SYM[suitStr] || suitStr)) + "</span>";
          btn.classList.add("equilator-card-slot--" + (suitStr === "s" ? "spade" : suitStr === "h" ? "heart" : suitStr === "d" ? "diamond" : "club"));
        } else {
          btn.innerHTML = "<span class=\"equilator-card-slot__text\">—</span>";
        }
        btn.addEventListener("click", function (e) { e.preventDefault(); openPicker(this.getAttribute("data-equilator-slot")); });
        wrap.appendChild(btn);
        var resetBtn = document.createElement("button");
        resetBtn.type = "button";
        resetBtn.className = "equilator-card-slot__reset" + (card ? "" : " equilator-card-slot__reset--hidden");
        resetBtn.setAttribute("data-equilator-slot", slotId);
        resetBtn.setAttribute("aria-label", "Сбросить карту");
        resetBtn.textContent = "×";
        wrap.appendChild(resetBtn);
        cardsWrap.appendChild(wrap);
      }
      row.appendChild(cardsWrap);
      oppCardsContainer.appendChild(row);
    }
    renderRangeTabs();
    renderRangeGrid();
  }
  if (addPlayerBtn) addPlayerBtn.addEventListener("click", function (e) {
    e.preventDefault();
    var preserved = collectOppCards();
    numOpponents++;
    rangeState.opps.push({});
    buildOppSlots(preserved);
  });
  Array.prototype.forEach.call(rangePresetBtns || [], function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var activeTab = rangeTabs ? rangeTabs.querySelector(".equilator-range-tab--active") : null;
      var target = activeTab ? activeTab.getAttribute("data-equilator-range-target") : activeRangeTarget;
      applyRangePreset(this.getAttribute("data-equilator-range-preset") || "clear", target);
    });
  });
  buildOppSlots();
  function slotEl(slotId) { return document.querySelector(".equilator-card-slot[data-equilator-slot=\"" + slotId + "\"]"); }
  function getSlotCard(slotId) {
    var el = slotEl(slotId);
    if (!el) return null;
    var r = el.getAttribute("data-rank");
    var s = el.getAttribute("data-suit");
    if (!r || !s) return null;
    return window.equilatorParseCard(r + s);
  }
  function getUsedCards(excludeSlotId) {
    var used = {};
    getSlotIds().forEach(function (id) {
      if (id === excludeSlotId) return;
      var c = getSlotCard(id);
      if (c) used[c.r + "_" + c.s] = true;
    });
    return used;
  }
  function clearSlot(slotId) {
    var el = slotEl(slotId);
    if (!el) return;
    el.removeAttribute("data-rank");
    el.removeAttribute("data-suit");
    var textEl = el.querySelector(".equilator-card-slot__text");
    if (textEl) textEl.textContent = "—";
    el.classList.remove("equilator-card-slot--spade", "equilator-card-slot--heart", "equilator-card-slot--diamond", "equilator-card-slot--club");
    var wrap = el.parentElement;
    if (wrap && wrap.classList.contains("equilator-slot-wrap")) {
      var resetBtn = wrap.querySelector(".equilator-card-slot__reset");
      if (resetBtn) resetBtn.classList.add("equilator-card-slot__reset--hidden");
    }
  }
  function setSlotCard(slotId, rank, suit) {
    var el = slotEl(slotId);
    if (!el) return;
    el.setAttribute("data-rank", rank);
    el.setAttribute("data-suit", suit);
    var label = (RANKS_DISPLAY[rank] || rank) + (SUITS_SYM[suit] || suit);
    var textEl = el.querySelector(".equilator-card-slot__text");
    if (textEl) textEl.textContent = label;
    el.classList.remove("equilator-card-slot--spade", "equilator-card-slot--heart", "equilator-card-slot--diamond", "equilator-card-slot--club");
    if (suit) el.classList.add("equilator-card-slot--" + (suit === "s" ? "spade" : suit === "h" ? "heart" : suit === "d" ? "diamond" : "club"));
    var wrap = el.parentElement;
    if (wrap && wrap.classList.contains("equilator-slot-wrap")) {
      var resetBtn = wrap.querySelector(".equilator-card-slot__reset");
      if (resetBtn) resetBtn.classList.remove("equilator-card-slot__reset--hidden");
    }
    clearRangeForSlot(slotId);
  }
  function openPicker(forSlotId) {
    activeSlotId = forSlotId;
    var used = getUsedCards(forSlotId);
    if (pickerTitle) pickerTitle.textContent = "Выберите карту";
    if (pickerGrid) {
      pickerGrid.innerHTML = "";
      for (var si = 0; si < SUITS.length; si++) {
        for (var ri = 0; ri < RANKS.length; ri++) {
          var r = RANKS[ri];
          var s = SUITS[si];
          var key = (window.equilatorParseCard(r + s).r) + "_" + (window.equilatorParseCard(r + s).s);
          var disabled = !!used[key];
          var btn = document.createElement("button");
          btn.type = "button";
          btn.className = "equilator-picker-card equilator-picker-card--" + (s === "s" ? "spade" : s === "h" ? "heart" : s === "d" ? "diamond" : "club");
          if (disabled) btn.disabled = true;
          btn.textContent = (RANKS_DISPLAY[r] || r) + (SUITS_SYM[s] || s);
          btn.setAttribute("data-rank", r);
          btn.setAttribute("data-suit", s);
          btn.addEventListener("click", function () {
            if (activeSlotId && !this.disabled) {
              setSlotCard(activeSlotId, this.getAttribute("data-rank"), this.getAttribute("data-suit"));
              closePicker();
            }
          });
          pickerGrid.appendChild(btn);
        }
      }
    }
    if (!pickerWrap) return;
    var slot = slotEl(forSlotId);
    if (!slot) {
      pickerWrap.classList.remove("equilator-picker-wrap--hidden");
      pickerWrap.setAttribute("aria-hidden", "false");
      return;
    }
    var rect = slot.getBoundingClientRect();
    var gap = 8;
    pickerWrap.style.position = "fixed";
    pickerWrap.style.visibility = "hidden";
    pickerWrap.classList.remove("equilator-picker-wrap--hidden");
    pickerWrap.setAttribute("aria-hidden", "false");
    var top = rect.bottom + gap;
    var left = rect.left;
    var width = pickerWrap.offsetWidth || 260;
    var height = pickerWrap.offsetHeight || 220;
    if (left + width + 8 > window.innerWidth) {
      left = Math.max(8, window.innerWidth - width - 8);
    }
    if (top + height + 8 > window.innerHeight) {
      top = rect.top - gap - height;
      if (top < 8) {
        top = Math.max(8, window.innerHeight - height - 8);
      }
    }
    if (left < 8) left = 8;
    pickerWrap.style.top = top + "px";
    pickerWrap.style.left = left + "px";
    pickerWrap.style.right = "auto";
    pickerWrap.style.maxWidth = "";
    pickerWrap.style.visibility = "";
  }
  function closePicker() {
    pickerWrap.classList.add("equilator-picker-wrap--hidden");
    pickerWrap.setAttribute("aria-hidden", "true");
    pickerWrap.style.position = "";
    pickerWrap.style.top = "";
    pickerWrap.style.left = "";
    pickerWrap.style.right = "";
    pickerWrap.style.maxWidth = "";
    activeSlotId = null;
  }
  BASE_SLOT_IDS.forEach(function (id) {
    var el = slotEl(id);
    if (el) el.addEventListener("click", function (e) { e.preventDefault(); openPicker(id); });
  });
  var formEl = document.querySelector(".equilator-form");
  if (formEl) formEl.addEventListener("click", function (e) {
    var resetBtn = e.target && e.target.closest ? e.target.closest(".equilator-card-slot__reset") : null;
    if (resetBtn && resetBtn.dataset.equilatorSlot) {
      e.preventDefault();
      e.stopPropagation();
      clearSlot(resetBtn.dataset.equilatorSlot);
    }
  });
  if (pickerClose) pickerClose.addEventListener("click", closePicker);
  var getHero = function () {
    var c1 = getSlotCard("hero1");
    var c2 = getSlotCard("hero2");
    if (!c1 || !c2 || (c1.r === c2.r && c1.s === c2.s)) return null;
    return [c1, c2];
  };
  var getBoard = function () {
    var out = [];
    for (var i = 1; i <= 5; i++) {
      var c = getSlotCard("board" + i);
      if (c) out.push(c);
    }
    return out;
  };
  var getFixedOpps = function () {
    var numOpp = getNumOpp();
    var out = [];
    for (var o = 0; o < numOpp; o++) {
      var c1 = getSlotCard("opp" + (o * 2 + 1));
      var c2 = getSlotCard("opp" + (o * 2 + 2));
      if (!c1 || !c2 || (c1.r === c2.r && c1.s === c2.s)) out.push(null);
      else out.push([c1, c2]);
    }
    return out;
  };
  var getUsed = function (hero, board, fixedOpps) {
    var used = {};
    hero.forEach(function (c) { used[c.r + "_" + c.s] = true; });
    if (board) board.forEach(function (c) { used[c.r + "_" + c.s] = true; });
    if (fixedOpps) fixedOpps.forEach(function (pair) { if (pair) pair.forEach(function (c) { used[c.r + "_" + c.s] = true; }); });
    return used;
  };
  var deckWithout = function (used) {
    var d = window.equilatorMakeDeck();
    return d.filter(function (c) { return !used[c.r + "_" + c.s]; });
  };
  var shuffle = function (arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  };
  function cardKey(c) {
    return c.r + "_" + c.s;
  }
  function copyUsed(used) {
    var out = {};
    Object.keys(used || {}).forEach(function (key) { out[key] = true; });
    return out;
  }
  function addCardToUsed(used, card) {
    var key = cardKey(card);
    if (used[key]) return false;
    used[key] = true;
    return true;
  }
  function addCardsToUsed(used, cards) {
    for (var i = 0; i < cards.length; i++) {
      if (!addCardToUsed(used, cards[i])) return false;
    }
    return true;
  }
  function cardsConflict(used, cards) {
    for (var i = 0; i < cards.length; i++) if (used[cardKey(cards[i])]) return true;
    return false;
  }
  function clonePair(pair) {
    return [pair[0], pair[1]];
  }
  function cardFromRankSuit(rank, suit) {
    return window.equilatorParseCard(rank + suit);
  }
  function concreteCombosForLabel(label, used) {
    var out = [];
    var r1 = label.charAt(0);
    var r2 = label.charAt(1);
    var kind = rangeLabelKind(label);
    function push(c1, c2) {
      if (!c1 || !c2) return;
      if (cardKey(c1) === cardKey(c2)) return;
      if (used && (used[cardKey(c1)] || used[cardKey(c2)])) return;
      out.push([c1, c2]);
    }
    if (kind === "pair") {
      for (var s1 = 0; s1 < SUITS.length; s1++) {
        for (var s2 = s1 + 1; s2 < SUITS.length; s2++) {
          push(cardFromRankSuit(r1, SUITS.charAt(s1)), cardFromRankSuit(r1, SUITS.charAt(s2)));
        }
      }
      return out;
    }
    if (kind === "suited") {
      for (var ss = 0; ss < SUITS.length; ss++) push(cardFromRankSuit(r1, SUITS.charAt(ss)), cardFromRankSuit(r2, SUITS.charAt(ss)));
      return out;
    }
    for (var a = 0; a < SUITS.length; a++) {
      for (var b = 0; b < SUITS.length; b++) {
        if (a !== b) push(cardFromRankSuit(r1, SUITS.charAt(a)), cardFromRankSuit(r2, SUITS.charAt(b)));
      }
    }
    return out;
  }
  function concreteCombosForRange(map, used) {
    var labels = rangeSelectedLabels(map);
    var out = [];
    labels.forEach(function (label) {
      var combos = concreteCombosForLabel(label, used);
      combos.forEach(function (combo) { out.push(combo); });
    });
    return out;
  }
  function concreteCombosForRandom(used) {
    var deck = deckWithout(used || {});
    var out = [];
    for (var i = 0; i < deck.length; i++) {
      for (var j = i + 1; j < deck.length; j++) out.push([deck[i], deck[j]]);
    }
    return out;
  }
  function getHeroSpec() {
    var heroRange = getRangeMap("hero");
    if (rangeHasSelected(heroRange)) return { kind: "range", range: heroRange, label: "Вы" };
    var hero = getHero();
    if (!hero) return null;
    return { kind: "fixed", cards: hero, label: "Вы" };
  }
  function getPlayerSpecs() {
    var specs = [];
    var heroSpec = getHeroSpec();
    if (!heroSpec) return null;
    specs.push(heroSpec);
    var fixedOpps = getFixedOpps();
    for (var o = 0; o < getNumOpp(); o++) {
      var key = "opp" + o;
      var oppRange = getRangeMap(key);
      if (rangeHasSelected(oppRange)) specs.push({ kind: "range", range: oppRange, label: "Оппонент " + (o + 1) });
      else if (fixedOpps[o]) specs.push({ kind: "fixed", cards: fixedOpps[o], label: "Оппонент " + (o + 1) });
      else specs.push({ kind: "random", label: "Оппонент " + (o + 1) });
    }
    return specs;
  }
  function collectKnownUsed(board, specs) {
    var used = {};
    var duplicate = false;
    (board || []).forEach(function (card) {
      if (!addCardToUsed(used, card)) duplicate = true;
    });
    (specs || []).forEach(function (spec) {
      if (spec && spec.kind === "fixed" && !addCardsToUsed(used, spec.cards)) duplicate = true;
    });
    return { used: used, duplicate: duplicate };
  }
  function compareHandValues(a, b) {
    for (var i = 0; i < 6; i++) {
      if (a[i] > b[i]) return 1;
      if (a[i] < b[i]) return -1;
    }
    return 0;
  }
  function scoreShowdown(playerHoleCards, boardCards) {
    var values = [];
    for (var i = 0; i < playerHoleCards.length; i++) {
      values.push(window.equilatorEvalHand(playerHoleCards[i].concat(boardCards)));
    }
    var best = values[0];
    var winners = [0];
    for (var p = 1; p < values.length; p++) {
      var cmp = compareHandValues(values[p], best);
      if (cmp > 0) {
        best = values[p];
        winners = [p];
      } else if (cmp === 0) {
        winners.push(p);
      }
    }
    var oppSoleWins = [];
    for (var o = 1; o < playerHoleCards.length; o++) oppSoleWins.push(winners.length === 1 && winners[0] === o ? 1 : 0);
    return {
      heroWin: winners.length === 1 && winners[0] === 0 ? 1 : 0,
      tie: winners.length > 1 ? 1 : 0,
      oppWins: oppSoleWins
    };
  }
  function buildComboPools(specs, knownUsed) {
    var pools = [];
    for (var i = 0; i < specs.length; i++) {
      if (specs[i].kind === "fixed") {
        pools.push(null);
      } else if (specs[i].kind === "range") {
        pools.push(concreteCombosForRange(specs[i].range, knownUsed));
      } else {
        pools.push(concreteCombosForRandom(knownUsed));
      }
    }
    return pools;
  }
  function sampleHoleCards(specs, comboPools, knownUsed) {
    for (var attempt = 0; attempt < 120; attempt++) {
      var used = copyUsed(knownUsed);
      var hands = [];
      var ok = true;
      for (var i = 0; i < specs.length; i++) {
        if (specs[i].kind === "fixed") {
          hands[i] = clonePair(specs[i].cards);
          continue;
        }
        var pool = comboPools[i] || [];
        if (!pool.length) {
          ok = false;
          break;
        }
        var combo = pool[Math.floor(Math.random() * pool.length)];
        if (cardsConflict(used, combo)) {
          ok = false;
          break;
        }
        hands[i] = clonePair(combo);
        addCardsToUsed(used, combo);
      }
      if (ok) return { hands: hands, used: used };
    }
    return null;
  }
  function renderCalcError(message) {
    if (winPct) winPct.textContent = "—";
    if (tiePct) tiePct.textContent = "—";
    if (oppEquityLines) oppEquityLines.innerHTML = "";
    if (resultMeta) resultMeta.textContent = message;
    if (calcBtn) calcBtn.disabled = false;
  }
  if (!calcBtn) return;
  calcBtn.addEventListener("click", function () {
    try {
      var calcScrollEl = document.scrollingElement || document.documentElement;
      var calcScrollTop = calcScrollEl ? calcScrollEl.scrollTop : null;
      var restoreCalcScroll = function () {
        if (calcScrollEl && calcScrollTop != null) calcScrollEl.scrollTop = calcScrollTop;
      };
      if (resultBlock) resultBlock.classList.remove("equilator-result--hidden");
      restoreCalcScroll();
      if (resultMeta) resultMeta.textContent = "Проверка…";
      var board = getBoard();
      var specs = getPlayerSpecs();
      if (!specs) {
        renderCalcError("Выберите две карты или диапазон для себя.");
        return;
      }
      var numOpp = getNumOpp();
      var known = collectKnownUsed(board, specs);
      if (known.duplicate) {
        renderCalcError("Одна карта выбрана дважды.");
        return;
      }
      var needBoard = Math.max(0, 5 - board.length);
      var unresolvedPlayers = specs.filter(function (spec) { return spec.kind !== "fixed"; }).length;
      if (deckWithout(known.used).length < needBoard + unresolvedPlayers * 2) {
        renderCalcError("Недостаточно карт в колоде.");
        return;
      }
      calcBtn.disabled = true;
      if (winPct) winPct.textContent = "…";
      if (tiePct) tiePct.textContent = "…";
      if (oppEquityLines) oppEquityLines.innerHTML = "<p class=\"equilator-result__line\"><span class=\"equilator-result__label\">…</span></p>";
      var trials = 10000;
      if (resultMeta) resultMeta.textContent = "Прогоняем " + trials.toLocaleString("ru-RU") + " раз";
      var showResult = function (wins, ties, trials, oppWins) {
        var winRaw = (100 * wins / trials);
        var tieRaw = (100 * ties / trials);
        if (winPct) winPct.textContent = winRaw.toFixed(1) + "%";
        if (tiePct) tiePct.textContent = tieRaw.toFixed(1) + "%";
        if (oppEquityLines) {
          var html = "";
          if (oppWins && oppWins.length > 0) {
            for (var i = 0; i < oppWins.length; i++) {
              var pct = (100 * oppWins[i] / trials).toFixed(1);
              var label = oppWins.length === 1 ? "Эквити оппонента на победу:" : "Эквити оппонента " + (i + 1) + " на победу:";
              html += "<p class=\"equilator-result__line\"><span class=\"equilator-result__label\">" + label + "</span> <strong>" + pct + "%</strong></p>";
            }
          } else {
            var oppRaw = 100 - winRaw - tieRaw;
            if (oppRaw < 0) oppRaw = 0;
            html = "<p class=\"equilator-result__line\"><span class=\"equilator-result__label\">Эквити оппонента на победу:</span> <strong>" + oppRaw.toFixed(1) + "%</strong></p>";
          }
          oppEquityLines.innerHTML = html;
        }
        if (resultMeta) resultMeta.textContent = trials === 1 ? "Точный расчёт (все карты известны)." : "По " + trials.toLocaleString("ru-RU") + " симуляциям.";
        calcBtn.disabled = false;
        restoreCalcScroll();
      };
      var allFixed = board.length === 5 && specs.every(function (spec) { return spec.kind === "fixed"; });
      if (allFixed) {
        var boardCardsExact = window.equilatorCloneCards(board);
        var fixedHandsExact = specs.map(function (spec) { return spec.cards; });
        var exactScore = scoreShowdown(fixedHandsExact, boardCardsExact);
        showResult(exactScore.heroWin, exactScore.tie, 1, exactScore.oppWins);
        return;
      }
      var comboPools = buildComboPools(specs, known.used);
      for (var pi = 0; pi < specs.length; pi++) {
        if (specs[pi].kind !== "fixed" && (!comboPools[pi] || !comboPools[pi].length)) {
          renderCalcError(specs[pi].label + ": нет доступных комбинаций с учетом выбранных карт.");
          return;
        }
      }
      var wins = 0;
      var ties = 0;
      var oppWins = [];
      for (var ow = 0; ow < numOpp; ow++) oppWins.push(0);
      var run = function (done) {
        var next = 0;
        var failedSamples = 0;
        function step() {
          var batch = 1000;
          for (var b = 0; b < batch && next < trials; b++) {
            var sampled = sampleHoleCards(specs, comboPools, known.used);
            if (!sampled) {
              failedSamples++;
              if (failedSamples > 1200) {
                done(new Error("Не удалось собрать совместимые руки из выбранных диапазонов."));
                return;
              }
              continue;
            }
            var boardCards = window.equilatorCloneCards(board);
            var deckForBoard = deckWithout(sampled.used);
            if (deckForBoard.length < needBoard) {
              failedSamples++;
              continue;
            }
            var sh = shuffle(deckForBoard);
            for (var bi = 0; bi < needBoard; bi++) boardCards.push(sh[bi]);
            var score = scoreShowdown(sampled.hands, boardCards);
            wins += score.heroWin;
            ties += score.tie;
            for (var oi = 0; oi < oppWins.length; oi++) oppWins[oi] += score.oppWins[oi] || 0;
            next++;
          }
          if (next < trials) setTimeout(step, 0);
          else done();
        }
        step();
      };
      run(function (error) {
        if (error) {
          renderCalcError(error.message || String(error));
          return;
        }
        showResult(wins, ties, trials, oppWins);
      });
    } catch (e) {
      calcBtn.disabled = false;
      if (resultMeta) resultMeta.textContent = "Ошибка: " + (e && e.message ? e.message : String(e));
      if (winPct) winPct.textContent = "—";
      if (tiePct) tiePct.textContent = "—";
      if (oppEquityLines) oppEquityLines.innerHTML = "";
    }
  });
}

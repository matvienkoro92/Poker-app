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
  function removeOpponent(idx) {
    if (numOpponents <= 1) return;
    var preserved = collectOppCards();
    preserved.splice(idx, 1);
    numOpponents--;
    buildOppSlots(preserved);
  }
  function buildOppSlots(preservedCards) {
    if (!oppCardsContainer) return;
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
  }
  if (addPlayerBtn) addPlayerBtn.addEventListener("click", function (e) {
    e.preventDefault();
    numOpponents++;
    buildOppSlots();
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
  if (!calcBtn) return;
  calcBtn.addEventListener("click", function () {
    var errMsg = null;
    try {
      if (resultBlock) resultBlock.classList.remove("equilator-result--hidden");
      if (resultMeta) resultMeta.textContent = "Проверка…";
      var hero = getHero();
      if (!hero) {
        errMsg = "Выберите две разные карты в руку.";
        if (winPct) winPct.textContent = "—";
        if (tiePct) tiePct.textContent = "—";
        if (oppEquityLines) oppEquityLines.innerHTML = "";
        if (resultMeta) resultMeta.textContent = errMsg;
        return;
      }
      var board = getBoard();
      var fixedOpps = getFixedOpps();
      var numOpp = getNumOpp();
      var used = getUsed(hero, board, fixedOpps);
      var deck = deckWithout(used);
      var needBoard = Math.max(0, 5 - board.length);
      var randomOppCount = 0;
      for (var ro = 0; ro < numOpp; ro++) { if (!fixedOpps[ro]) randomOppCount++; }
      var needRandomCards = needBoard + randomOppCount * 2;
      if (needRandomCards > 0 && deck.length < needRandomCards) {
        errMsg = "Недостаточно карт в колоде.";
        if (winPct) winPct.textContent = "—";
        if (tiePct) tiePct.textContent = "—";
        if (oppEquityLines) oppEquityLines.innerHTML = "";
        if (resultMeta) resultMeta.textContent = errMsg;
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
        if (resultMeta) resultMeta.textContent = trials === 1 ? "Точный расчёт (известна рука оппонента)." : "По " + trials + " симуляциям.";
        calcBtn.disabled = false;
        var scrollEl = document.scrollingElement || document.documentElement;
        if (scrollEl) scrollEl.scrollBy({ top: 100, behavior: "smooth" });
      };
      var allFixed = board.length === 5 && fixedOpps.every(function (p) { return p !== null; });
      if (allFixed) {
        var boardCardsExact = window.equilatorCloneCards(board);
        var heroHandExact = hero.concat(boardCardsExact);
        var oppHandsExact = fixedOpps.map(function (p) { return p.concat(boardCardsExact); });
        var winsExact = 0, tiesExact = 0;
        var oppWinsExact = [];
        for (var eo = 0; eo < numOpp; eo++) oppWinsExact.push(0);
        if (numOpp === 1) {
          var cmp01 = window.equilatorCompareHands(heroHandExact, oppHandsExact[0]);
          if (cmp01 > 0) winsExact = 1;
          else if (cmp01 < 0) oppWinsExact[0] = 1;
          else tiesExact = 1;
        } else if (numOpp === 2) {
          var cmpHero1 = window.equilatorCompareHands(heroHandExact, oppHandsExact[0]);
          var cmpHero2 = window.equilatorCompareHands(heroHandExact, oppHandsExact[1]);
          var cmp12 = window.equilatorCompareHands(oppHandsExact[0], oppHandsExact[1]);
          if (cmpHero1 > 0 && cmpHero2 > 0) winsExact = 1;
          else if (cmpHero1 < 0 && cmp12 > 0) oppWinsExact[0] = 1;
          else if (cmpHero2 < 0 && cmp12 < 0) oppWinsExact[1] = 1;
          else tiesExact = 1;
        } else {
          var anyLossExact = false;
          var anyTieExact = false;
          for (var eo = 0; eo < numOpp; eo++) {
            var c = window.equilatorCompareHands(heroHandExact, oppHandsExact[eo]);
            if (c < 0) anyLossExact = true;
            if (c === 0) anyTieExact = true;
          }
          winsExact = anyLossExact ? 0 : (anyTieExact ? 0 : 1);
          tiesExact = anyLossExact ? 0 : (anyTieExact ? 1 : 0);
        }
        showResult(winsExact, tiesExact, 1, numOpp <= 2 ? oppWinsExact : null);
        return;
      }
      var wins = 0;
      var ties = 0;
      var oppWins = [];
      for (var ow = 0; ow < numOpp; ow++) oppWins.push(0);
      var run = function (done) {
        var next = 0;
        function step() {
          var batch = 1000;
          for (var b = 0; b < batch && next < trials; b++, next++) {
            var sh = shuffle(deck);
            var boardCards = window.equilatorCloneCards(board);
            for (var bi = 0; bi < needBoard; bi++) {
              boardCards.push(sh[bi]);
            }
            var heroHand = hero.concat(boardCards);
            var heroVal = window.equilatorEvalHand(heroHand);
            var oppHands = [];
            var shOffset = needBoard;
            for (var o = 0; o < numOpp; o++) {
              var o1, o2;
              if (fixedOpps[o]) {
                o1 = fixedOpps[o][0];
                o2 = fixedOpps[o][1];
              } else {
                o1 = sh[shOffset];
                o2 = sh[shOffset + 1];
                shOffset += 2;
              }
              oppHands.push([o1, o2].concat(boardCards));
            }
            if (numOpp === 1) {
              var cmp = window.equilatorCompareHands(heroHand, oppHands[0]);
              if (cmp > 0) wins++;
              else if (cmp < 0) oppWins[0]++;
              else ties++;
            } else if (numOpp === 2) {
              var cmpHero1 = window.equilatorCompareHands(heroHand, oppHands[0]);
              var cmpHero2 = window.equilatorCompareHands(heroHand, oppHands[1]);
              var cmp12 = window.equilatorCompareHands(oppHands[0], oppHands[1]);
              if (cmpHero1 > 0 && cmpHero2 > 0) wins++;
              else if (cmpHero1 < 0 && cmp12 > 0) oppWins[0]++;
              else if (cmpHero2 < 0 && cmp12 < 0) oppWins[1]++;
              else ties++;
            } else {
              var anyLoss = false;
              var anyTie = false;
              for (var o = 0; o < numOpp; o++) {
                var c = window.equilatorCompareHands(heroHand, oppHands[o]);
                if (c < 0) anyLoss = true;
                if (c === 0) anyTie = true;
              }
              if (!anyLoss && anyTie) ties++;
              else if (!anyLoss) wins++;
            }
          }
          if (next < trials) setTimeout(step, 0);
          else done();
        }
        step();
      };
      run(function () {
        showResult(wins, ties, trials, numOpp <= 2 ? oppWins : null);
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


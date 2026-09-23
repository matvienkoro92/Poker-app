(function () {
  "use strict";
  function read(id) { var el = document.getElementById(id); return el ? el.textContent.trim() : ""; }
  function esc(value) { return String(value || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function link(start) { return typeof buildMiniAppStartLink === "function" ? buildMiniAppStartLink(start) : new URL("?startapp=" + encodeURIComponent(start), location.href).href; }
  function dataUrl(blob) { return new Promise(function (resolve, reject) { var reader = new FileReader(); reader.onload = function () { resolve(reader.result); }; reader.onerror = reject; reader.readAsDataURL(blob); }); }

  // Capture the live scene, including CSS artwork, pseudo-elements and local fonts.
  async function capture(scene) {
    if (document.fonts) await document.fonts.ready;
    var resources = new Map();
    var webkit = /AppleWebKit/.test(navigator.userAgent) && !/Chrome|Chromium|Edg\//.test(navigator.userAgent);
    function embed(raw) {
      var url = new URL(raw, location.href).href;
      if (/^(data:|#)/.test(raw)) return Promise.resolve(raw);
      if (!resources.has(url)) resources.set(url, fetch(url).then(function (r) { if (!r.ok) throw new Error("Не удалось загрузить ресурс карточки: " + new URL(url).pathname); return r.blob(); }).then(dataUrl));
      return resources.get(url);
    }
    async function urls(value) {
      for (var match of Array.from(String(value).matchAll(/url\(["']?([^"')]+)["']?\)/g))) {
        if (match[1].charAt(0) !== "#") value = value.replace(match[0], 'url("' + await embed(match[1]) + '")');
      }
      return value;
    }
    var pending = [];
    function styleCopy(style, target) {
      for (var property of Array.from(style)) {
        if (property.indexOf("--") === 0) continue;
        var value = style.getPropertyValue(property);
        // WebKit paints HTML box shadows as opaque bands inside foreignObject.
        if (webkit && property === "box-shadow") value = "none";
        target.style.setProperty(property, value);
        if (value.includes("url(")) {
          (function (prop, raw) { pending.push(urls(raw).then(function (embedded) { target.style.setProperty(prop, embedded); })); })(property, value);
        }
      }
      target.style.setProperty("animation", "none", "important");
      target.style.setProperty("transition", "none", "important");
    }
    function clone(original) {
      if (original.nodeType !== 1) return original.cloneNode(false);
      var style = getComputedStyle(original);
      if (style.display === "none" || original.tagName === "SCRIPT") return document.createTextNode("");
      var copy = original.cloneNode(false);
      // Snapshot styles before awaiting resources; live timers may render the source again.
      var pseudoStyles = [getComputedStyle(original, "::before"), getComputedStyle(original, "::after")];
      styleCopy(style, copy);
      for (var child of Array.from(original.childNodes)) copy.appendChild(clone(child));
      if (original.tagName === "IMG") {
        pending.push(embed(original.currentSrc || original.src).then(function (src) { copy.src = src; }));
        copy.removeAttribute("srcset"); copy.removeAttribute("loading");
      }
      if (original.namespaceURI !== "http://www.w3.org/2000/svg") {
        for (var i = 0; i < pseudoStyles.length; i++) {
          var ps = pseudoStyles[i], content = ps.content;
          if (!content || content === "none" || content === "normal" || ps.display === "none") continue;
          var pseudo = document.createElement("span");
          styleCopy(ps, pseudo);
          try { pseudo.textContent = JSON.parse(content); } catch (_) { pseudo.textContent = content.replace(/^['"]|['"]$/g, ""); }
          if (i === 0) copy.insertBefore(pseudo, copy.firstChild); else copy.appendChild(pseudo);
        }
      }
      return copy;
    }
    var width = scene.offsetWidth, height = scene.offsetHeight;
    var copy = clone(scene);
    await Promise.all(pending);
    copy.style.setProperty("width", width + "px", "important");
    copy.style.setProperty("height", height + "px", "important");
    ["margin", "translate", "transform"].forEach(function (p) { copy.style.setProperty(p, p === "margin" ? "0" : "none", "important"); });
    copy.style.setProperty("position", "relative", "important");
    var wrapper = document.createElement("div");
    wrapper.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
    wrapper.style.cssText = "width:" + width + "px;height:" + height + "px;background:#080a0c;overflow:hidden";
    var fonts = [];
    for (var sheet of Array.from(document.styleSheets)) {
      try { for (var rule of Array.from(sheet.cssRules)) if (rule.type === 5) fonts.push(await urls(rule.cssText)); } catch (_) {}
    }
    var fontStyle = document.createElement("style"); fontStyle.textContent = fonts.join("\n"); wrapper.appendChild(fontStyle); wrapper.appendChild(copy);
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '"><foreignObject width="100%" height="100%">' + new XMLSerializer().serializeToString(wrapper) + '</foreignObject></svg>';
    var image = new Image();
    await new Promise(function (resolve, reject) { image.onload = resolve; image.onerror = function () { reject(new Error("Не удалось создать изображение карточки")); }; image.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg); });
    // WebKit may fire SVG load before embedded image resources are painted.
    if (image.decode) await image.decode();
    await new Promise(function (resolve) { setTimeout(resolve, 150); });
    var canvas = document.createElement("canvas"), scale = Math.min(3, 1200 / width);
    canvas.width = Math.round(width * scale); canvas.height = Math.round(height * scale);
    var ctx = canvas.getContext("2d"); ctx.fillStyle = "#080a0c"; ctx.fillRect(0, 0, canvas.width, canvas.height); ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    // Safari needs a first rasterization to populate nested SVG image resources.
    if (webkit) {
      canvas.toDataURL("image/jpeg");
      await new Promise(function (resolve) { setTimeout(resolve, 150); });
      var warmed = new Image();
      await new Promise(function (resolve, reject) { warmed.onload = resolve; warmed.onerror = reject; warmed.src = image.src; });
      ctx.drawImage(warmed, 0, 0, canvas.width, canvas.height);
    }
    var blob = await new Promise(function (resolve) { canvas.toBlob(resolve, "image/jpeg", 0.92); });
    if (!blob) throw new Error("Не удалось создать изображение карточки");
    return blob;
  }

  function caption(scene, bet) {
    var text = "", entities = [], html = "", plain = "";
    function add(value, url) {
      value = String(value || "");
      if (url) entities.push({ type: "text_link", offset: text.length, length: value.length, url: url });
      text += value; html += url ? '<a href="' + esc(url) + '">' + esc(value) + '</a>' : esc(value);
      plain += value + (url ? " — " + url : "");
    }
    var name = read("tournamentDayHomeName"), selected = window._tournamentDayShare || {};
    add("Турнир вечера в клубе «Два туза»\n");
    add(name, link("schedule"));
    add("\n" + (selected.date ? selected.date.split("-").reverse().join(".") + " · " : "") + read("tournamentDayHomeWeekTime") + "\nБай-ин: " + read("tournamentDayBuyin") + "\nПризовой фонд: " + read("tournamentDayGuarantee"));
    var raffle = scene.dataset.tournamentCharacter === "shkarubo" && typeof chooseHomeTractorRaffle === "function" ? chooseHomeTractorRaffle(homeTractorRaffles, Date.now()) : null;
    var displayed = document.getElementById("homeTournamentRaffleBonus");
    if (!raffle && displayed && !displayed.hidden && typeof homeTournamentRaffleBonusData !== "undefined") raffle = homeTournamentRaffleBonusData;
    var raffleDate = raffle && Number.isFinite(Date.parse(raffle.endDate)) ? new Date(Date.parse(raffle.endDate) + 10800000).toISOString().slice(0, 10) : "";
    if (raffle && raffle.status === "active" && Date.parse(raffle.endDate) > Date.now() && (!selected.date || raffleDate === selected.date)) {
      var start = raffle.shareNumber ? "r_" + raffle.shareNumber : typeof window.pokerBuildRaffleActiveStartParam === "function" ? window.pokerBuildRaffleActiveStartParam(raffle.id) : "raffle_active_" + raffle.id;
      add("\n\n• 🎟 "); add("Розыгрыш к турниру", link(start));
      var prizes = (raffle.groups || []).map(function (group) { return group.count + " × " + group.prize; }).join("; ");
      add(": " + (prizes || raffle.title || "билеты на турнир").slice(0, 350));
    }
    // Share only the open Last Longer for the dated tournament on this card.
    if (typeof window.pokerTournamentBetMatchesSelected === "function" && window.pokerTournamentBetMatchesSelected(bet, selected)) {
      add("\n\n• ♠ "); add("Last Longer", link("tournament_bet_" + bet.id));
      add(" — " + String(bet.title || name).slice(0, 100) + ". Взнос: " + Number(bet.stakePrice || 0).toLocaleString("ru-RU") + " ₽. Банк: " + Number(bet.bank || 0).toLocaleString("ru-RU") + " ₽. Участников: " + Number(bet.participantsCount || 0) + "." + (bet.status === "closed" ? " Регистрация закрыта." : " Победит тот, кто продержится дольше."));
    }
    return { text: text, entities: entities, html: html.replace(/\n/g, "<br>"), plain: plain };
  }

  async function share(scene) {
    var button = scene.querySelector("#homeTournamentShareBtn");
    if (button.dataset.sharing) return;
    var name = read("tournamentDayHomeName");
    if (!name || name === "Турнир дня") { window.alert("Данные турнира ещё загружаются."); return; }
    button.dataset.sharing = "1"; button.setAttribute("aria-busy", "true");
    try {
      var bet = typeof window.pokerLoadTournamentBetHome === "function" ? await window.pokerLoadTournamentBetHome() : null;
      var message = caption(scene, bet), blob = await capture(scene);
      var file = new File([blob], "poker21-tournament.jpg", { type: "image/jpeg" });
      var url = URL.createObjectURL(blob), dialog = document.createElement("dialog");
      dialog.className = "tournament-share-preview"; dialog.id = "tournamentSharePreview";
      dialog.innerHTML = '<button type="button" data-close aria-label="Закрыть">×</button><h3>Поделиться турниром</h3><img alt="Карточка турнира"><div data-caption></div><div class="tournament-share-actions"><button type="button" data-send>Отправить</button><button type="button" data-save>Скачать</button><button type="button" data-copy title="Скопировать описание">Описание</button></div><p role="status"></p>';
      dialog.querySelector("img").src = url; dialog.querySelector("[data-caption]").innerHTML = message.html;
      dialog.querySelector("[data-close]").onclick = function () { dialog.close(); };
      dialog.addEventListener("close", function () { URL.revokeObjectURL(url); dialog.remove(); }, { once: true });
      dialog.querySelector("[data-save]").onclick = function () { var a = document.createElement("a"); a.href = url; a.download = file.name; dialog.appendChild(a); a.click(); a.remove(); };
      dialog.querySelector("[data-copy]").onclick = async function () {
        try {
          if (navigator.clipboard && window.ClipboardItem) await navigator.clipboard.write([new ClipboardItem({ "text/html": new Blob([message.html], { type: "text/html" }), "text/plain": new Blob([message.plain], { type: "text/plain" }) })]);
          else if (!await pokerCopyTextToClipboard(message.plain)) throw new Error();
          dialog.querySelector('[role="status"]').textContent = "Описание скопировано";
        } catch (_) { dialog.querySelector('[role="status"]').textContent = "Выделите и скопируйте описание выше."; }
      };
      var tg = window.Telegram && window.Telegram.WebApp;
      var telegram = tg && tg.initData && typeof tg.shareMessage === "function" && (!tg.isVersionAtLeast || tg.isVersionAtLeast("8.0"));
      var native = navigator.canShare && navigator.canShare({ files: [file] });
      var send = dialog.querySelector("[data-send]"), prepared = null;
      send.hidden = !telegram && !native;
      send.textContent = "Отправить";
      send.title = telegram ? "Отправить в Telegram" : "Отправить картинку";
      if (!telegram) {
        var notice = document.createElement("aside");
        notice.className = "tournament-share-notice";
        var hint = document.createElement("p");
        hint.textContent = "В Telegram можно отправить картинку с описанием и ссылками. Здесь отправляется только картинка, а описание копируется отдельно.";
        notice.appendChild(hint);
        var openTelegram = document.createElement("a");
        openTelegram.textContent = "Открыть в Telegram →";
        openTelegram.href = "https://t.me/Poker_dvatuza_bot/DvaTuza";
        openTelegram.target = "_blank"; openTelegram.rel = "noopener noreferrer";
        notice.appendChild(openTelegram);
        send.parentElement.before(notice);
      }
      send.onclick = async function () {
        if (send.disabled) return;
        send.disabled = true;
        var status = dialog.querySelector('[role="status"]'); status.textContent = "";
        try {
          if (telegram) {
            if (!prepared || prepared.expiration_date * 1000 <= Date.now()) {
              status.textContent = "Готовим сообщение…";
              var base = typeof getApiBase === "function" ? getApiBase() : "";
              var response = await fetch(base + "/api/tournament-share", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ initData: tg.initData, image: await dataUrl(blob), caption: message.text, entities: message.entities }) });
              prepared = await response.json();
              if (!response.ok || !prepared.ok) throw new Error(prepared.error || "Не удалось подготовить сообщение");
            }
            status.textContent = "";
            tg.shareMessage(prepared.id, function (sent) { status.textContent = sent ? "Отправлено" : "Отправка отменена"; });
          } else {
            // Telegram's system share target can discard files when text is supplied.
            // Rich caption entities are supported only by the Telegram prepared-message flow.
            await navigator.share({ files: [file] });
          }
        } catch (error) { if (error.name !== "AbortError") status.textContent = error.message || "Не удалось отправить. Скачайте картинку и скопируйте описание."; }
        finally { send.disabled = false; }
      };
      document.body.appendChild(dialog); dialog.showModal();
    } catch (error) { window.alert(error.message || "Не удалось подготовить карточку. Попробуйте ещё раз."); }
    finally { delete button.dataset.sharing; button.removeAttribute("aria-busy"); }
  }
  window.pokerShareTournamentScene = share;
  document.addEventListener("click", function (event) {
    var button = event.target.closest && event.target.closest("#homeTournamentShareBtn");
    if (!button) return;
    event.preventDefault(); event.stopPropagation(); share(button.closest(".tournament-day-home-dual--tournament-focus"));
  });
})();

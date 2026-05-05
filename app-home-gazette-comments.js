// Gazette and VPN article comment UI helpers.

function pokerGacEsc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
function pokerGacTrimUrlTrailing(s) {
  return String(s || "").replace(/[),.;:!?]+$/g, "");
}
function pokerGacLinkifyUrls(raw) {
  var s = String(raw || "");
  var re = /(https?:\/\/\S+)/gi;
  var parts = s.split(re);
  var out = "";
  for (var i = 0; i < parts.length; i++) {
    var p = parts[i];
    if (i % 2 === 1 && /^https?:\/\//i.test(p)) {
      var safeHref = pokerGacTrimUrlTrailing(p);
      var href = pokerGacEsc(safeHref);
      out +=
        '<a href="' +
        href +
        '" target="_blank" rel="noopener noreferrer" class="vpn-proxy-modal__text-link">' +
        pokerGacEsc(p) +
        "</a>";
    } else {
      out += pokerGacEsc(p);
    }
  }
  return out;
}
function pokerGacMyMemberId() {
  try {
    if (typeof window.pokerResolveMyChatMemberId === "function") return window.pokerResolveMyChatMemberId();
  } catch (eMid) {}
  return null;
}
function pokerReloadGazetteOrVpnCommentFeed(feed) {
  if (!feed) return;
  var vpnM = document.getElementById("vpnProxyModal");
  if (vpnM && vpnM.contains(feed)) {
    if (typeof window.__pokerVpnProxyReloadCommentFeed === "function") window.__pokerVpnProxyReloadCommentFeed(feed);
    return;
  }
  if (typeof window.__pokerGazetteReloadCommentFeed === "function") window.__pokerGazetteReloadCommentFeed(feed);
}
function pokerBuildGazetteCommentItemHtml(c, aidAttrEscaped, isAdmin, useLinkify) {
  var esc = pokerGacEsc;
  var textPlain = String((c && c.text) || "");
  var textBody = useLinkify ? pokerGacLinkifyUrls(textPlain) : esc(textPlain);
  var cd = c.chatDisplayName != null ? String(c.chatDisplayName).trim() : "";
  var slug = c.userNameSlug != null ? String(c.userNameSlug).replace(/^@+/, "").trim() : "";
  var authorPlain = cd
    ? cd
    : slug
      ? "@" + slug
      : c.author != null
        ? String(c.author)
        : "Читатель";
  var authorEsc = esc(authorPlain);
  var midRaw = c.memberId != null ? String(c.memberId).trim() : "";
  var authorNode =
    midRaw && (/^tg_\d+$/.test(midRaw) || /^vk_\d+$/.test(midRaw))
      ? '<button type="button" class="gazette-article-comments__author gazette-article-comments__author--profile" data-gazette-comment-member-id="' +
        esc(midRaw) +
        '" data-gazette-comment-display-name="' +
        esc(authorPlain) +
        '">' +
        authorEsc +
        "</button>"
      : '<span class="gazette-article-comments__author">' + authorEsc + "</span>";
  var ds = "";
  try {
    var d = new Date(c.at);
    if (!isNaN(d.getTime())) {
      ds = d.toLocaleString("ru-RU", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  } catch (eDs) {}
  var meta = ds ? '<time class="gazette-article-comments__time">' + esc(ds) + "</time>" : "";
  var editedBadge = c.editedAt
    ? '<span class="gazette-article-comments__edited" title="Отредактировано">изм.</span>'
    : "";
  var cid = c.id != null ? String(c.id) : "";
  var myMid = pokerGacMyMemberId();
  var cm = midRaw;
  var own = !!(myMid && cm && String(myMid).trim() === String(cm).trim());
  var showMods = !!cid && (isAdmin || own);
  var modActions = "";
  if (showMods) {
    modActions =
      '<span class="gazette-article-comments__mod-actions">' +
      '<button type="button" class="gazette-article-comments__edit">Изменить</button>' +
      '<button type="button" class="gazette-article-comments__delete" data-gazette-comment-delete="' +
      esc(cid) +
      '" data-gazette-comment-article="' +
      aidAttrEscaped +
      '">Удалить</button>' +
      "</span>";
  }
  var textEnc = esc(encodeURIComponent(textPlain));
  return (
    '<article class="gazette-article-comments__item" data-gazette-text-enc="' +
    textEnc +
    '"><header class="gazette-article-comments__item-head">' +
    authorNode +
    meta +
    editedBadge +
    modActions +
    '</header><div class="gazette-article-comments__body">' +
    '<p class="gazette-article-comments__text">' +
    textBody +
    '</p><div class="gazette-article-comments__edit-box" hidden>' +
    '<textarea class="gazette-article-comments__edit-textarea" maxlength="2000" rows="4" aria-label="Редактирование комментария"></textarea>' +
    '<div class="gazette-article-comments__edit-btns">' +
    '<button type="button" class="gazette-article-comments__edit-save">Сохранить</button>' +
    '<button type="button" class="gazette-article-comments__edit-cancel">Отмена</button>' +
    "</div></div></div></article>"
  );
}
function pokerGacGlobalCommentClick(ev) {
  var t = ev.target;
  if (!t || !t.closest) return;
  var delEl = t.closest("[data-gazette-comment-delete]");
  if (delEl) {
    var feedDel = delEl.closest(".gazette-article-comments__feed");
    if (!feedDel) return;
    ev.preventDefault();
    var cid = delEl.getAttribute("data-gazette-comment-delete");
    var artId = delEl.getAttribute("data-gazette-comment-article");
    if (!cid || !artId) return;
    if (!confirm("Удалить комментарий?")) return;
    var baseDel = typeof getApiBase === "function" ? getApiBase() : "";
    if (!baseDel || typeof pokerApiAuthJsonBody !== "function") return;
    if (typeof pokerApiHasCredential === "function" && !pokerApiHasCredential()) return;
    delEl.disabled = true;
    fetch(baseDel + "/api/gazette-article-comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        pokerApiAuthJsonBody({
          action: "delete",
          commentId: cid,
          articleId: parseInt(artId, 10),
        })
      ),
    })
      .then(function (r) {
        return r.json().then(function (data) {
          return { ok: r.ok, data: data };
        });
      })
      .then(function (res) {
        delEl.disabled = false;
        if (res.ok && res.data && res.data.ok) {
          pokerReloadGazetteOrVpnCommentFeed(feedDel);
          return;
        }
        var msg = res.data && res.data.error ? String(res.data.error) : "Не удалось удалить";
        var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tg && tg.showAlert) tg.showAlert(msg);
        else alert(msg);
      })
      .catch(function () {
        delEl.disabled = false;
        var tg2 = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tg2 && tg2.showAlert) tg2.showAlert("Сеть недоступна");
        else alert("Сеть недоступна");
      });
    return;
  }
  var editBtn = t.closest(".gazette-article-comments__edit");
  if (editBtn && !t.closest(".gazette-article-comments__edit-save") && !t.closest(".gazette-article-comments__edit-cancel")) {
    var feedE = editBtn.closest(".gazette-article-comments__feed");
    if (!feedE) return;
    ev.preventDefault();
    var art = editBtn.closest(".gazette-article-comments__item");
    if (!art) return;
    var enc = art.getAttribute("data-gazette-text-enc") || "";
    var raw = "";
    try {
      raw = decodeURIComponent(enc);
    } catch (eDec) {
      raw = "";
    }
    var p = art.querySelector(".gazette-article-comments__text");
    var box = art.querySelector(".gazette-article-comments__edit-box");
    var taEd = art.querySelector(".gazette-article-comments__edit-textarea");
    if (taEd) taEd.value = raw;
    if (p) p.hidden = true;
    if (box) box.hidden = false;
    art.classList.add("gazette-article-comments__item--editing");
    try {
      taEd.focus();
    } catch (eF) {}
    return;
  }
  var cancelBtn = t.closest(".gazette-article-comments__edit-cancel");
  if (cancelBtn) {
    var feedC = cancelBtn.closest(".gazette-article-comments__feed");
    if (!feedC) return;
    ev.preventDefault();
    var artC = cancelBtn.closest(".gazette-article-comments__item");
    if (!artC) return;
    var pC = artC.querySelector(".gazette-article-comments__text");
    var boxC = artC.querySelector(".gazette-article-comments__edit-box");
    if (pC) pC.hidden = false;
    if (boxC) boxC.hidden = true;
    artC.classList.remove("gazette-article-comments__item--editing");
    return;
  }
  var saveBtn = t.closest(".gazette-article-comments__edit-save");
  if (saveBtn) {
    var feedS = saveBtn.closest(".gazette-article-comments__feed");
    if (!feedS) return;
    ev.preventDefault();
    var artS = saveBtn.closest(".gazette-article-comments__item");
    if (!artS) return;
    var delBtnS = artS.querySelector("[data-gazette-comment-delete]");
    var cidS = delBtnS ? delBtnS.getAttribute("data-gazette-comment-delete") : "";
    var artIdS = delBtnS ? delBtnS.getAttribute("data-gazette-comment-article") : "";
    if (!cidS || !artIdS) return;
    var taS = artS.querySelector(".gazette-article-comments__edit-textarea");
    var textS = taS && taS.value ? taS.value.trim() : "";
    if (!textS) {
      var tgE = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (tgE && tgE.showAlert) tgE.showAlert("Введите текст");
      else alert("Введите текст");
      return;
    }
    if (typeof pokerApiHasCredential === "function" && !pokerApiHasCredential()) return;
    var baseS = typeof getApiBase === "function" ? getApiBase() : "";
    if (!baseS || typeof pokerApiAuthJsonBody !== "function") return;
    saveBtn.disabled = true;
    fetch(baseS + "/api/gazette-article-comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        pokerApiAuthJsonBody({
          action: "edit",
          commentId: cidS,
          articleId: parseInt(artIdS, 10),
          text: textS,
        })
      ),
    })
      .then(function (r) {
        return r.json().then(function (data) {
          return { ok: r.ok, data: data };
        });
      })
      .then(function (res) {
        saveBtn.disabled = false;
        if (res.ok && res.data && res.data.ok) {
          pokerReloadGazetteOrVpnCommentFeed(feedS);
          return;
        }
        var msgS = res.data && res.data.error ? String(res.data.error) : "Не удалось сохранить";
        var tgS = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tgS && tgS.showAlert) tgS.showAlert(msgS);
        else alert(msgS);
      })
      .catch(function () {
        saveBtn.disabled = false;
        var tgSc = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tgSc && tgSc.showAlert) tgSc.showAlert("Сеть недоступна");
        else alert("Сеть недоступна");
      });
  }
}

if (!window.__pokerGacCommentUiBound) {
  window.__pokerGacCommentUiBound = true;
  document.addEventListener("click", pokerGacGlobalCommentClick);
}

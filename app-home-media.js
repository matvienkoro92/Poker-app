// Home/media helpers: asset URLs, image lightbox, PDF preview and document download/share.

function getAssetUrl(relativePath) {
  try {
    var cleanPath = String(relativePath || "").replace(/^\.?\/?assets\//, "");
    var ratingDate = cleanPath.match(/rating-(\d{2})-(\d{2})-2026/i);
    var archiveBase = typeof window !== "undefined" ? String(window.POKER_ARCHIVE_ASSET_BASE_URL || "").replace(/\/+$/, "") : "";
    if (archiveBase && ratingDate && Number(ratingDate[2]) <= 5) {
      return archiveBase + "/" + cleanPath.replace(/^\/+/, "");
    }
    var base = typeof document !== "undefined" && document.baseURI ? document.baseURI : (typeof location !== "undefined" && location.href) || "";
    if (!base) return "./assets/" + cleanPath;
    var href = new URL("assets/" + cleanPath, base).href;
    return href || "./assets/" + cleanPath;
  } catch (e) {
    return "./assets/" + relativePath;
  }
}

function getRatingThumbnailUrl(relativePath) {
  var clean = String(relativePath || "").replace(/^\.?\/?assets\//, "").split("?")[0];
  var dot = clean.lastIndexOf(".");
  var thumbnailPath = "rating-thumbnails/" + (dot > clean.lastIndexOf("/") ? clean.slice(0, dot) : clean) + ".avif";
  return getAssetUrl(thumbnailPath);
}

// Лайтбокс: одиночные фото + галереи (МТТ 6 скринов, ученики тренера, сетка отзывов) со стрелками и ←/→
function initImageLightbox() {
  var lightbox = document.getElementById("imageLightbox");
  var lightboxImg = lightbox ? lightbox.querySelector(".image-lightbox__img") : null;
  var lightboxCaption = lightbox ? lightbox.querySelector(".image-lightbox__caption") : null;
  var backdrop = lightbox ? lightbox.querySelector(".image-lightbox__backdrop") : null;
  var closeBtn = lightbox ? lightbox.querySelector(".image-lightbox__close") : null;
  var prevBtn = lightbox ? lightbox.querySelector(".image-lightbox__prev") : null;
  var nextBtn = lightbox ? lightbox.querySelector(".image-lightbox__next") : null;
  var counterEl = lightbox ? lightbox.querySelector(".image-lightbox__counter") : null;
  if (!lightbox || !lightboxImg || lightbox.dataset.imageLightboxBound === "1") return;
  lightbox.dataset.imageLightboxBound = "1";

  var galleryList = null;
  var galleryIndex = 0;

  function syncGalleryNav() {
    var multi = galleryList && galleryList.length > 1;
    if (prevBtn) {
      prevBtn.hidden = !multi;
      prevBtn.disabled = !multi || galleryIndex <= 0;
    }
    if (nextBtn) {
      nextBtn.hidden = !multi;
      nextBtn.disabled = !multi || galleryIndex >= (galleryList ? galleryList.length - 1 : 0);
    }
    if (counterEl) counterEl.textContent = multi ? galleryIndex + 1 + " / " + galleryList.length : "";
  }

  function setLightboxCaption(text) {
    if (!lightboxCaption) return;
    var cap = text != null ? String(text).replace(/\s+/g, " ").trim() : "";
    if (cap) {
      lightboxCaption.textContent = cap;
      lightboxCaption.hidden = false;
    } else {
      lightboxCaption.textContent = "";
      lightboxCaption.hidden = true;
    }
  }

  function showGallerySlide() {
    if (!galleryList || !galleryList.length) return;
    var item = galleryList[galleryIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt ? item.alt : "Фото";
    setLightboxCaption(item.caption);
    syncGalleryNav();
  }

  function openSingle(src, alt, caption, fromAvatar) {
    galleryList = null;
    galleryIndex = 0;
    lightboxImg.src = src;
    var a = alt != null ? String(alt).trim() : "";
    lightboxImg.alt = a ? a : "Увеличено";
    setLightboxCaption(caption);
    syncGalleryNav();
    lightbox.classList.toggle("image-lightbox--avatar-preview", !!fromAvatar);
    lightbox.classList.add("image-lightbox--open");
    lightbox.setAttribute("aria-hidden", "false");
  }

  function getAvatarPreviewSrc(img) {
    if (!img) return "";
    return img.getAttribute("data-avatar-full") || img.currentSrc || img.src || "";
  }

  function openGallery(items, startIndex) {
    var arr = (items || []).filter(function (x) {
      return x && x.src;
    });
    if (!arr.length) return;
    lightbox.classList.remove("image-lightbox--avatar-preview");
    galleryList = arr;
    var si = startIndex == null || isNaN(Number(startIndex)) ? 0 : Number(startIndex);
    galleryIndex = Math.max(0, Math.min(si, arr.length - 1));
    showGallerySlide();
    lightbox.classList.add("image-lightbox--open");
    lightbox.setAttribute("aria-hidden", "false");
  }

  function openGalleryFromNodeList(imgs, clicked) {
    var arr = [];
    var idx = 0;
    for (var i = 0; i < imgs.length; i++) {
      var im = imgs[i];
      if (!im || !im.src) continue;
      if (clicked && im === clicked) idx = arr.length;
      arr.push({ src: im.src, alt: im.alt ? String(im.alt).trim() : "" });
    }
    openGallery(arr, idx);
  }

  function closeLightbox() {
    galleryList = null;
    galleryIndex = 0;
    lightbox.classList.remove("image-lightbox--open");
    lightbox.classList.remove("image-lightbox--avatar-preview");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.removeAttribute("src");
    setLightboxCaption("");
    syncGalleryNav();
  }

  function stepGallery(delta) {
    if (!galleryList || galleryList.length < 2) return;
    var n = galleryIndex + delta;
    if (n < 0 || n >= galleryList.length) return;
    galleryIndex = n;
    showGallerySlide();
  }

  if (backdrop) backdrop.addEventListener("click", closeLightbox);
  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (prevBtn) {
    prevBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      stepGallery(-1);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      stepGallery(1);
    });
  }
  /* В списке чатов клик по аватарке должен открывать сам диалог, а не лайтбокс. */
  document.body.addEventListener(
    "click",
    function (e) {
      var t = e.target;
      if (!t || !t.classList || !t.classList.contains("chat-contact__avatar") || !t.src) return;
      if (!t.closest || !t.closest(".chat-contact")) return;
      var rowBtn = t.closest(".chat-contact");
      if (rowBtn && typeof rowBtn.click === "function") {
        e.preventDefault();
        e.stopPropagation();
        rowBtn.click();
      }
    },
    true
  );
  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("image-lightbox--open")) return;
    if (e.key === "Escape") {
      closeLightbox();
      return;
    }
    if (!galleryList || galleryList.length < 2) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      stepGallery(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      stepGallery(1);
    }
  });

  document.body.addEventListener("click", function (e) {
    var t = e.target;
    var hallAlb = t.closest && t.closest(".hall-photo-album__btn");
    if (hallAlb) {
      var himg = hallAlb.querySelector("img");
      var hallGrid = hallAlb.closest(".hall-photo-album__grid");
      if (himg && himg.src && hallGrid) {
        e.preventDefault();
        var hallBtns = hallGrid.querySelectorAll(".hall-photo-album__btn");
        var hallArr = [];
        var hallIdx = 0;
        for (var hbi = 0; hbi < hallBtns.length; hbi++) {
          var hb = hallBtns[hbi];
          var him = hb.querySelector("img");
          if (!him || !him.src) continue;
          if (hb === hallAlb) hallIdx = hallArr.length;
          var hBody = hb.parentElement;
          var hCapEl = hBody && hBody.querySelector(".hall-photo-album__caption");
          var hCap = hCapEl ? String(hCapEl.textContent || "").replace(/\s+/g, " ").trim() : "";
          hallArr.push({
            src: him.src,
            alt: him.alt ? String(him.alt).trim() : "",
            caption: hCap,
          });
        }
        if (hallArr.length) openGallery(hallArr, hallIdx);
      } else if (himg && himg.src) {
        e.preventDefault();
        var soloBody = hallAlb.parentElement;
        var soloCapEl = soloBody && soloBody.querySelector(".hall-photo-album__caption");
        var soloCap = soloCapEl ? String(soloCapEl.textContent || "").replace(/\s+/g, " ").trim() : "";
        openSingle(himg.src, himg.alt, soloCap);
      }
      return;
    }
    var shameTh = t.closest && t.closest(".hall-shame-board__thumb-btn");
    if (shameTh) {
      var sImg = shameTh.querySelector("img");
      if (sImg && sImg.src) {
        e.preventDefault();
        openSingle(sImg.src);
      }
      return;
    }
    var gazetteArticleOut = t.closest && t.closest("a[data-gazette-article-link]");
    if (
      gazetteArticleOut &&
      !gazetteArticleOut.closest("#gazetteModal") &&
      typeof window.openGazette === "function"
    ) {
      e.preventDefault();
      var gIdx = gazetteArticleOut.getAttribute("data-gazette-article-link");
      var gNum = gIdx ? parseInt(gIdx, 10) : NaN;
      window.openGazette("news", isNaN(gNum) ? undefined : gNum);
      return;
    }
    var mttGrid = t.closest && t.closest(".video-lessons__mtt-grid");
    if (t.nodeName === "IMG" && mttGrid && t.src) {
      e.preventDefault();
      openGalleryFromNodeList(mttGrid.querySelectorAll("img"), t);
      return;
    }
    var coachGal = t.closest && t.closest(".video-lessons__coach-student-gallery");
    if (t.nodeName === "IMG" && coachGal && t.src) {
      e.preventDefault();
      openGalleryFromNodeList(coachGal.querySelectorAll("img"), t);
      return;
    }
    var revGrid = t.closest && t.closest(".video-lessons__coach-reviews-grid");
    if (t.nodeName === "IMG" && revGrid && t.src) {
      e.preventDefault();
      openGalleryFromNodeList(revGrid.querySelectorAll("img"), t);
      return;
    }
    if (t.classList && t.classList.contains("chat-msg__image") && t.src) {
      e.preventDefault();
      openSingle(t.src);
      return;
    }
    if (t.classList && t.classList.contains("chat-msg__avatar") && t.src) {
      e.preventDefault();
      openSingle(getAvatarPreviewSrc(t), t.alt, "", true);
      return;
    }
    if (t.classList && t.classList.contains("chat-pinned-self__thumb") && t.src) {
      e.preventDefault();
      openSingle(t.src, t.alt, "", true);
      return;
    }
    if (t.classList && t.classList.contains("chat-contact__avatar") && t.src && !(t.closest && t.closest(".chat-contact"))) {
      e.preventDefault();
      e.stopPropagation();
      openSingle(getAvatarPreviewSrc(t), t.alt, "", true);
    }
  });
  document.body.addEventListener("click", function (e) {
    var link = e.target && e.target.closest ? e.target.closest(".chat-msg__tg-link, .chat-msg__link") : null;
    if (!link || !link.href) return;
    e.preventDefault();

    // Внутренние ссылки с параметром startapp — не открываем приложение заново,
    // а переключаемся внутри текущего web-app.
    try {
      var urlObj = new URL(link.href, window.location.href);
      var sp = new URLSearchParams(urlObj.search || "");
      var startApp = pokerNormalizeWebAppStartParam(pokerStartAppQueryFromUrlSearchParams(sp));
      var raffleCompletedTargetId = typeof window !== "undefined" && typeof window.pokerParseRaffleCompletedStartParam === "function"
        ? window.pokerParseRaffleCompletedStartParam(startApp)
        : "";
      var raffleActiveTargetId = typeof window !== "undefined" && typeof window.pokerParseRaffleActiveStartParam === "function"
        ? window.pokerParseRaffleActiveStartParam(startApp)
        : "";
      if ((startApp === "raffles" || raffleActiveTargetId || raffleCompletedTargetId) && typeof setView === "function") {
        if (raffleActiveTargetId) window.__pendingRaffleActiveId = raffleActiveTargetId;
        if (raffleCompletedTargetId) window.__pendingRaffleCompletedId = raffleCompletedTargetId;
        setView(
          "raffles",
          raffleCompletedTargetId
            ? { raffleCompletedTarget: true }
            : raffleActiveTargetId
              ? { raffleActiveTarget: true }
              : undefined
        );
        return;
      }
      if (startApp === "video_lessons" && typeof setView === "function") {
        setView("video-lessons");
        return;
      }
      if (
        (startApp === "vl_reviews_nikolay" || startApp === "video_lessons_reviews_nikolay") &&
        typeof setView === "function"
      ) {
        window.__pendingVideoLessonsOpenReviews = true;
        setView("video-lessons");
        return;
      }
      if (startApp === "club_chat" && typeof setView === "function") {
        window.__pendingOpenClubChatGeneral = true;
        setView("chat");
        if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
        return;
      }
      var dmStart = typeof pokerParseClubChatDmStartParam === "function"
        ? pokerParseClubChatDmStartParam(startApp, sp.get("with") || "")
        : { match: startApp === "club_chat_dm", peer: (sp.get("with") || "").trim() };
      if (dmStart && dmStart.match && typeof setView === "function") {
        var peerDm = (sp.get("with") || "").trim();
        if (dmStart.peer || peerDm) {
          window.__pendingOpenChatPersonalFromDeepLink = {
            userId: dmStart.peer || peerDm,
            userName: null,
            peerP21Id: null,
          };
        }
        setView("chat");
        if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
        return;
      }
      var hallFromLink = resolveHallFameSectionFromStartParam(startApp);
      if (hallFromLink && typeof navigateToHallFameSection === "function") {
        navigateToHallFameSection(hallFromLink);
        return;
      }
      if (startApp && (startApp === "news" || startApp.indexOf("news_") === 0) && typeof openGazette === "function") {
        var articleNum = startApp === "news" ? undefined : parseInt(startApp.replace("news_", ""), 10);
        if (startApp !== "news" && (Number.isNaN(articleNum) || articleNum < 0)) articleNum = undefined;
        openGazette("news", articleNum);
        return;
      }
      if (startApp && (startApp === "spring_rating_league_1" || startApp === "spring_rating_league_2") && typeof setView === "function") {
        var leagueNum = startApp === "spring_rating_league_1" ? "1" : "2";
        setView("spring-rating");
        setTimeout(function () {
          if (typeof window.switchSpringRatingMainTab === "function") window.switchSpringRatingMainTab(leagueNum);
        }, 400);
        return;
      }
    } catch (ignore) {}

    var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    if (link.classList && link.classList.contains("chat-msg__tg-link") && tg && tg.openTelegramLink) {
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      tg.openTelegramLink(link.href);
    } else if (tg && tg.openLink) {
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      tg.openLink(link.href);
    } else {
      window.open(link.href, "_blank", "noopener,noreferrer");
    }
  });

  var pdfViewer = document.getElementById("pdfViewer");
  var pdfViewerIframe = document.getElementById("pdfViewerIframe");
  var pdfViewerBackdrop = pdfViewer ? pdfViewer.querySelector(".pdf-viewer__backdrop") : null;
  var pdfViewerClose = pdfViewer ? pdfViewer.querySelector(".pdf-viewer__close") : null;
  function openPdfViewer(url) {
    if (!pdfViewer || !pdfViewerIframe) return;
    pdfViewerIframe.src = url;
    pdfViewer.classList.add("pdf-viewer--open");
    pdfViewer.setAttribute("aria-hidden", "false");
  }
  function closePdfViewer() {
    if (!pdfViewer || !pdfViewerIframe) return;
    pdfViewer.classList.remove("pdf-viewer--open");
    pdfViewer.setAttribute("aria-hidden", "true");
    pdfViewerIframe.removeAttribute("src");
  }
  if (pdfViewer && pdfViewerIframe) {
    if (pdfViewerBackdrop) pdfViewerBackdrop.addEventListener("click", closePdfViewer);
    if (pdfViewerClose) pdfViewerClose.addEventListener("click", closePdfViewer);
    window.closePdfViewer = closePdfViewer;
  }

  var POKER_BLOB_DOWNLOAD_CLEANUP_MS = 180000;
  function pokerHiddenDownloadAnchorStyle() {
    /* Не off-screen display:none: часть WebView режет программный клик; не revoke сразу — iOS срывает «Сохранить». */
    return "position:fixed;top:0;left:0;width:1px;height:1px;opacity:0.01;pointer-events:none;";
  }
  function pokerSaveBlobAsFileDownload(blob, fileName) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = (fileName && String(fileName).trim()) || "document.pdf";
    a.rel = "noopener";
    a.style.cssText = pokerHiddenDownloadAnchorStyle();
    document.body.appendChild(a);
    try {
      a.click();
    } catch (eClick) {
      try {
        document.body.removeChild(a);
      } catch (eRm0) {}
      try {
        URL.revokeObjectURL(url);
      } catch (eRv0) {}
      if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.showAlert)
        window.Telegram.WebApp.showAlert("Не удалось скачать. Попробуйте ещё раз.");
      return;
    }
    setTimeout(function () {
      try {
        document.body.removeChild(a);
      } catch (eRmA) {}
      try {
        URL.revokeObjectURL(url);
      } catch (eRv) {}
    }, POKER_BLOB_DOWNLOAD_CLEANUP_MS);
  }
  /** Скачивание PDF из чата: нативный download в том же жесте пользователя, без раннего revokeObjectURL. */
  function pokerTriggerChatPdfDownload(href, fileName) {
    var name = (fileName && String(fileName).trim()) || "document.pdf";
    var failAlert = function () {
      if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.showAlert)
        window.Telegram.WebApp.showAlert("Не удалось скачать. Попробуйте ещё раз.");
    };
    if (!href) {
      failAlert();
      return false;
    }
    href = String(href);
    try {
      if (href.indexOf("blob:") === 0) {
        var ab = document.createElement("a");
        ab.href = href;
        ab.download = name;
        ab.rel = "noopener";
        ab.style.cssText = pokerHiddenDownloadAnchorStyle();
        document.body.appendChild(ab);
        try {
          ab.click();
        } catch (eBl) {
          try {
            document.body.removeChild(ab);
          } catch (eAb0) {}
          failAlert();
          return false;
        }
        setTimeout(function () {
          try {
            document.body.removeChild(ab);
          } catch (eAb) {}
        }, POKER_BLOB_DOWNLOAD_CLEANUP_MS);
        return true;
      }
      if (/^https?:\/\//i.test(href)) {
        /* fetch().then(blob) теряет user activation — на iOS/Telegram скачивание «вспыхивает» и отменяется. */
        var tgH = window.Telegram && window.Telegram.WebApp;
        if (tgH && typeof tgH.openLink === "function") {
          try {
            tgH.openLink(href);
          } catch (eTg) {
            var ox = window.open(href, "_blank", "noopener,noreferrer");
            if (!ox) failAlert();
          }
        } else {
          var ox2 = window.open(href, "_blank", "noopener,noreferrer");
          if (!ox2) failAlert();
        }
        return true;
      }
      if (href.indexOf("data:") === 0) {
        var m = href.match(/^data:([^;]+);base64,(.+)$/);
        if (!m || !m[2]) {
          failAlert();
          return false;
        }
        var binary = atob(m[2]);
        var arr = new Uint8Array(binary.length);
        for (var i = 0; i < binary.length; i++) arr[i] = binary.charCodeAt(i);
        var blob = new Blob([arr], { type: (m[1] || "application/pdf").split(";")[0] });
        pokerSaveBlobAsFileDownload(blob, name);
        return true;
      }
    } catch (err) {
      failAlert();
      return false;
    }
    failAlert();
    return false;
  }
  document.body.addEventListener("click", function (e) {
    var dlBtn = e.target && e.target.closest ? e.target.closest("button[data-chat-pdf-download]") : null;
    if (dlBtn) {
      e.preventDefault();
      e.stopPropagation();
      var wrapDl = dlBtn.closest(".chat-msg__document-wrap");
      var viewDl = wrapDl && wrapDl.querySelector("a.chat-msg__document-link--view");
      var hrefDl = viewDl && (viewDl.href || viewDl.getAttribute("href"));
      var fnDl = (wrapDl && wrapDl.getAttribute("data-document-name")) || "document.pdf";
      pokerTriggerChatPdfDownload(hrefDl, fnDl);
      return;
    }
    var shBtn = e.target && e.target.closest ? e.target.closest("button[data-chat-pdf-share]") : null;
    if (shBtn) {
      e.preventDefault();
      e.stopPropagation();
      var wrapSh = shBtn.closest(".chat-msg__document-wrap");
      var viewSh = wrapSh && wrapSh.querySelector("a.chat-msg__document-link--view");
      var hrefSh = viewSh && viewSh.getAttribute("href");
      var fnSh = (wrapSh && wrapSh.getAttribute("data-document-name")) || "document.pdf";
      if (!hrefSh || hrefSh.indexOf("data:") !== 0) return;
      try {
        var mSh = hrefSh.match(/^data:([^;]+);base64,(.+)$/);
        if (!mSh || !mSh[2]) throw new Error("bad_pdf_data");
        var binSh = atob(mSh[2]);
        var u8 = new Uint8Array(binSh.length);
        for (var j = 0; j < binSh.length; j++) u8[j] = binSh.charCodeAt(j);
        var mimeSh = (mSh[1] || "application/pdf").split(";")[0];
        var blobSh = new Blob([u8], { type: mimeSh });
        var fileSh = new File([blobSh], fnSh || "document.pdf", { type: mimeSh, lastModified: Date.now() });
        if (navigator.share && typeof navigator.canShare === "function" && navigator.canShare({ files: [fileSh] })) {
          navigator
            .share({ files: [fileSh], title: fnSh })
            .catch(function (ex) {
              if (ex && ex.name === "AbortError") return;
              if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.showAlert)
                window.Telegram.WebApp.showAlert("Не удалось поделиться. Попробуйте «Скачать».");
            });
          return;
        }
      } catch (eShare) {}
      if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.showAlert)
        window.Telegram.WebApp.showAlert("Поделиться файлом здесь не поддерживается. Сохраните через «Скачать».");
      else if (typeof alert === "function") alert("Поделиться файлом не поддерживается. Используйте «Скачать».");
      return;
    }
    var link = e.target && e.target.closest ? e.target.closest("a.chat-msg__document-link--view") : null;
    if (!link || !link.href) return;
    var href = link.getAttribute("href");
    if (!href || href.indexOf("data:") !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    if (pdfViewer && pdfViewerIframe) {
      openPdfViewer(href);
    } else {
      var w = window.open(href, "_blank", "noopener,noreferrer");
      if (!w && window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.showAlert) {
        window.Telegram.WebApp.showAlert("Нажмите «Скачать» и откройте файл в приложении для PDF.");
      }
    }
  }, true);
}
window.pokerInitImageLightbox = initImageLightbox;
initImageLightbox();

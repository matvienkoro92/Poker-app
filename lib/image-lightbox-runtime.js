(function initImageLightbox() {
  var lightbox = document.getElementById("imageLightbox");
  var lightboxImg = lightbox ? lightbox.querySelector(".image-lightbox__img") : null;
  var lightboxCaption = lightbox ? lightbox.querySelector(".image-lightbox__caption") : null;
  var backdrop = lightbox ? lightbox.querySelector(".image-lightbox__backdrop") : null;
  var closeBtn = lightbox ? lightbox.querySelector(".image-lightbox__close") : null;
  var prevBtn = lightbox ? lightbox.querySelector(".image-lightbox__prev") : null;
  var nextBtn = lightbox ? lightbox.querySelector(".image-lightbox__next") : null;
  var counterEl = lightbox ? lightbox.querySelector(".image-lightbox__counter") : null;
  if (!lightbox || !lightboxImg) return;

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
          hallArr.push({ src: him.src, alt: him.alt ? String(him.alt).trim() : "", caption: hCap });
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
    if (gazetteArticleOut && !gazetteArticleOut.closest("#gazetteModal") && typeof window.openGazette === "function") {
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
      openSingle(t.src, t.alt, "", true);
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
      openSingle(t.src, t.alt, "", true);
    }
  });
})();

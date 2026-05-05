// Chat media resizing and image-layout bottom pinning.

function initChatMediaLayoutRuntime(deps) {
  deps = deps || {};
  var snapChatMessagesToBottomIfPinned = typeof deps.snapChatMessagesToBottomIfPinned === "function"
    ? deps.snapChatMessagesToBottomIfPinned
    : function () {};

  function resizeImage(file, maxW, maxH, quality) {
    maxW = maxW || 800;
    maxH = maxH || 800;
    if (quality == null || isNaN(quality)) quality = 0.92;
    var JPEG_MAX_B64 = 400000;
    function jpegBase64Len(dataUrl) {
      var c = dataUrl.indexOf(",");
      return c >= 0 ? dataUrl.length - c - 1 : dataUrl.length;
    }
    return new Promise(function (resolve, reject) {
      var img = new Image();
      var url = URL.createObjectURL(file);
      img.onload = function () {
        URL.revokeObjectURL(url);
        var w = img.width, h = img.height;
        if (w > maxW || h > maxH) {
          if (w > h) { h = Math.round(h * maxW / w); w = maxW; } else { w = Math.round(w * maxH / h); h = maxH; }
        }
        var canvas = document.createElement("canvas");
        canvas.width = w; canvas.height = h;
        var ctx = canvas.getContext("2d");
        if (!ctx) { resolve(url); return; }
        function encodeUnderLimit() {
          var q = quality;
          var dataUrl = null;
          var a;
          for (a = 0; a < 12; a++) {
            dataUrl = canvas.toDataURL("image/jpeg", q);
            if (jpegBase64Len(dataUrl) <= JPEG_MAX_B64) return dataUrl;
            q = Math.max(0.74, q - 0.04);
          }
          return dataUrl;
        }
        ctx.drawImage(img, 0, 0, w, h);
        try {
          var out = encodeUnderLimit();
          if (jpegBase64Len(out) > JPEG_MAX_B64) {
            var w2 = Math.max(480, Math.round(w * 0.85));
            var h2 = Math.max(480, Math.round(h * 0.85));
            canvas.width = w2;
            canvas.height = h2;
            ctx = canvas.getContext("2d");
            if (!ctx) { resolve(out); return; }
            ctx.drawImage(img, 0, 0, w2, h2);
            quality = 0.92;
            out = encodeUnderLimit();
          }
          resolve(out);
        } catch (e) { reject(e); }
      };
      img.onerror = function () { URL.revokeObjectURL(url); reject(new Error("Не удалось загрузить")); };
      img.src = url;
    });
  }

  function pinChatMessagesToBottomImagesOnly(el) {
    if (!el) return;
    var imgs = el.querySelectorAll("img.chat-msg__image");
    for (var ii = 0; ii < imgs.length; ii++) {
      (function (im) {
        if (im.complete && im.naturalHeight) return;
        function onImg() {
          im.removeEventListener("load", onImg);
          im.removeEventListener("error", onImg);
          requestAnimationFrame(function () {
            try {
              if (el.__pokerChatOpeningStickBottom) {
                el.scrollTop = el.scrollHeight;
              } else {
                snapChatMessagesToBottomIfPinned(el);
              }
            } catch (eSnapImg) {}
          });
        }
        im.addEventListener("load", onImg);
        im.addEventListener("error", onImg);
      })(imgs[ii]);
    }
  }

  function settleChatOpeningMediaLayout(el, wrapEl, onDone) {
    if (!el) {
      if (typeof onDone === "function") onDone();
      return;
    }
    var doneCalled = false;
    function finish() {
      if (doneCalled) return;
      doneCalled = true;
      try {
        if (wrapEl && wrapEl.classList) wrapEl.classList.remove("chat-messages-wrap--settling");
      } catch (eWrapDone) {}
      try {
        if (typeof onDone === "function") onDone();
      } catch (eDoneCb) {}
    }
    var imgs = [];
    try {
      imgs = Array.prototype.slice.call(el.querySelectorAll("img.chat-msg__image"));
    } catch (eImgs) {
      finish();
      return;
    }
    if (!imgs.length) {
      finish();
      return;
    }
    var pending = 0;
    function markReady() {
      pending -= 1;
      if (pending <= 0) finish();
    }
    for (var i = 0; i < imgs.length; i++) {
      var im = imgs[i];
      if (im.complete && im.naturalHeight) continue;
      pending += 1;
      (function (imgNode) {
        var settled = false;
        function doneOne() {
          if (settled) return;
          settled = true;
          try {
            imgNode.removeEventListener("load", onLoad);
            imgNode.removeEventListener("error", onLoad);
          } catch (eImgOff) {}
          markReady();
        }
        function onLoad() {
          var raf = window.requestAnimationFrame || function (fn) { setTimeout(fn, 16); };
          raf(doneOne);
        }
        try {
          imgNode.addEventListener("load", onLoad);
          imgNode.addEventListener("error", onLoad);
        } catch (eImgOn) {
          doneOne();
        }
      })(im);
    }
    if (!pending) {
      finish();
      return;
    }
    setTimeout(finish, 260);
  }

  function pinChatMessagesToBottom(el, aggressive) {
    if (!el) return;
    function snap() {
      try {
        el.scrollTop = el.scrollHeight;
      } catch (eSnap) {}
    }
    var tripleSnap = !aggressive || document.body.classList.contains("chat-keyboard-open");
    if (tripleSnap) {
      snap();
      requestAnimationFrame(function () {
        snap();
        requestAnimationFrame(snap);
      });
    }
    var imgs = el.querySelectorAll("img.chat-msg__image");
    for (var ii = 0; ii < imgs.length; ii++) {
      (function (im) {
        if (im.complete && im.naturalHeight) return;
        function onImg() {
          im.removeEventListener("load", onImg);
          im.removeEventListener("error", onImg);
          snapChatMessagesToBottomIfPinned(el);
          if (document.body.classList.contains("chat-keyboard-open")) {
            requestAnimationFrame(function () {
              snapChatMessagesToBottomIfPinned(el);
              requestAnimationFrame(function () {
                snapChatMessagesToBottomIfPinned(el);
              });
            });
          } else {
            requestAnimationFrame(function () {
              snapChatMessagesToBottomIfPinned(el);
            });
          }
        }
        im.addEventListener("load", onImg);
        im.addEventListener("error", onImg);
      })(imgs[ii]);
    }
    if (aggressive && document.body.classList.contains("chat-keyboard-open")) {
      function snapPinned() {
        snapChatMessagesToBottomIfPinned(el);
      }
      setTimeout(snapPinned, 60);
      setTimeout(snapPinned, 200);
      setTimeout(snapPinned, 500);
      if (typeof window.visualViewport !== "undefined" && window.visualViewport.addEventListener) {
        var vvPin = function () {
          snapChatMessagesToBottomIfPinned(el);
        };
        window.visualViewport.addEventListener("resize", vvPin);
        setTimeout(function () {
          try {
            window.visualViewport.removeEventListener("resize", vvPin);
          } catch (eVv) {}
        }, 1200);
      }
    }
  }

  return {
    resizeImage: resizeImage,
    pinChatMessagesToBottomImagesOnly: pinChatMessagesToBottomImagesOnly,
    settleChatOpeningMediaLayout: settleChatOpeningMediaLayout,
    pinChatMessagesToBottom: pinChatMessagesToBottom,
  };
}

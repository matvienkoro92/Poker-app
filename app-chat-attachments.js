// Chat image/document attachment pickers for general and personal composers.

function initChatAttachmentsRuntime(opts) {
  opts = opts || {};
  with (opts) {
    var generalFileInput = document.getElementById("chatGeneralFileInput");
    var generalPdfInput = document.getElementById("chatGeneralPdfInput");
    var generalAttachBtn = document.getElementById("chatGeneralAttachBtn");
    var generalAttachDropdown = document.getElementById("chatGeneralAttachDropdown");
    var generalImagePreview = document.getElementById("chatGeneralImagePreview");
    function closeGeneralAttachDropdown() {
      if (generalAttachDropdown) { generalAttachDropdown.classList.add("chat-attach-dropdown--hidden"); generalAttachDropdown.setAttribute("aria-hidden", "true"); }
      if (generalAttachBtn) generalAttachBtn.setAttribute("aria-expanded", "false");
      document.removeEventListener("click", generalAttachDropdownOutside);
    }
    function generalAttachDropdownOutside(e) {
      if (generalAttachDropdown && !generalAttachDropdown.contains(e.target) && generalAttachBtn && !generalAttachBtn.contains(e.target)) closeGeneralAttachDropdown();
    }
    if (generalAttachBtn && generalFileInput) {
      generalAttachBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        if (generalAttachDropdown && generalAttachDropdown.classList.contains("chat-attach-dropdown--hidden")) {
          generalAttachDropdown.classList.remove("chat-attach-dropdown--hidden");
          generalAttachDropdown.setAttribute("aria-hidden", "false");
          generalAttachBtn.setAttribute("aria-expanded", "true");
          setTimeout(function () { document.addEventListener("click", generalAttachDropdownOutside); }, 0);
        } else closeGeneralAttachDropdown();
      });
      if (generalAttachDropdown) {
        generalAttachDropdown.querySelectorAll(".chat-attach-dropdown__item").forEach(function (item) {
          item.addEventListener("click", function (e) {
            e.stopPropagation();
            var action = item.getAttribute("data-action");
            if (action === "photo") generalFileInput.click();
            else if (action === "document" && generalPdfInput) generalPdfInput.click();
            else if (action === "contact" && typeof openConvFromDialogs === "function") openConvFromDialogs(item.getAttribute("data-user-id"), item.getAttribute("data-user-name"));
            closeGeneralAttachDropdown();
          });
        });
      }
      generalFileInput.addEventListener("change", function () {
        var f = generalFileInput.files && generalFileInput.files[0];
        if (!f || !f.type.startsWith("image/")) return;
        generalDocument = null;
        // До 800px по длинной стороне, JPEG ~0.92; при перегрузе лимита API плавно снижаем q (не «мыло» 0.6).
        resizeImage(f, 800, 800, 0.92).then(function (dataUrl) {
          generalImage = dataUrl;
          updateGeneralSendBtnIcon();
          if (generalImagePreview) {
            generalImagePreview.innerHTML = '<img class="chat-image-preview__thumb" src="' + dataUrl.replace(/"/g, "&quot;") + '" alt="" /><button type="button" class="chat-image-preview__remove">Убрать</button>';
            generalImagePreview.classList.add("chat-image-preview--visible");
            generalImagePreview.querySelector(".chat-image-preview__remove").addEventListener("click", function () {
              generalImage = null; generalFileInput.value = "";
              updateGeneralSendBtnIcon();
              generalImagePreview.classList.remove("chat-image-preview--visible"); generalImagePreview.innerHTML = "";
            });
          }
        }).catch(function () { if (tg && tg.showAlert) tg.showAlert("Не удалось обработать изображение"); });
        generalFileInput.value = "";
      });
      if (generalPdfInput) {
        generalPdfInput.addEventListener("change", function () {
          var f = generalPdfInput.files && generalPdfInput.files[0];
          if (!f || f.type !== "application/pdf") return;
          if (f.size > 8 * 1024 * 1024) {
            if (tg && tg.showAlert) tg.showAlert("Файл слишком большой. Максимум 8 МБ.");
            generalPdfInput.value = "";
            return;
          }
          generalImage = null;
          var reader = new FileReader();
          reader.onload = function () {
            var dataUrl = reader.result;
            if (dataUrl && typeof dataUrl === "string" && dataUrl.indexOf("data:application/pdf") === 0) {
              generalDocument = { dataUrl: dataUrl, fileName: (f.name || "document.pdf").replace(/[^\w\s.-]/g, "") || "document.pdf" };
              updateGeneralSendBtnIcon();
              if (generalImagePreview) {
                generalImagePreview.innerHTML = '<span class="chat-image-preview__doc">📄 ' + escapeHtml(generalDocument.fileName) + '</span><button type="button" class="chat-image-preview__remove">Убрать</button>';
                generalImagePreview.classList.add("chat-image-preview--visible");
                generalImagePreview.querySelector(".chat-image-preview__remove").addEventListener("click", function () {
                  generalDocument = null; generalPdfInput.value = "";
                  updateGeneralSendBtnIcon();
                  generalImagePreview.classList.remove("chat-image-preview--visible"); generalImagePreview.innerHTML = "";
                });
              }
            } else if (tg && tg.showAlert) tg.showAlert("Не удалось прочитать файл");
          };
          reader.onerror = function () { if (tg && tg.showAlert) tg.showAlert("Не удалось прочитать файл"); };
          reader.readAsDataURL(f);
          generalPdfInput.value = "";
        });
      }
    }
    var personalFileInput = document.getElementById("chatPersonalFileInput");
    var personalPdfInput = document.getElementById("chatPersonalPdfInput");
    var personalAttachBtn = document.getElementById("chatPersonalAttachBtn");
    var personalAttachDropdown = document.getElementById("chatPersonalAttachDropdown");
    var personalImagePreview = document.getElementById("chatPersonalImagePreview");
    function closePersonalAttachDropdown() {
      if (personalAttachDropdown) { personalAttachDropdown.classList.add("chat-attach-dropdown--hidden"); personalAttachDropdown.setAttribute("aria-hidden", "true"); }
      if (personalAttachBtn) personalAttachBtn.setAttribute("aria-expanded", "false");
      document.removeEventListener("click", personalAttachDropdownOutside);
    }
    function personalAttachDropdownOutside(e) {
      if (personalAttachDropdown && !personalAttachDropdown.contains(e.target) && personalAttachBtn && !personalAttachBtn.contains(e.target)) closePersonalAttachDropdown();
    }
    if (personalAttachBtn && personalFileInput) {
      personalAttachBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        if (personalAttachDropdown && personalAttachDropdown.classList.contains("chat-attach-dropdown--hidden")) {
          personalAttachDropdown.classList.remove("chat-attach-dropdown--hidden");
          personalAttachDropdown.setAttribute("aria-hidden", "false");
          personalAttachBtn.setAttribute("aria-expanded", "true");
          setTimeout(function () { document.addEventListener("click", personalAttachDropdownOutside); }, 0);
        } else closePersonalAttachDropdown();
      });
      if (personalAttachDropdown) {
        personalAttachDropdown.querySelectorAll(".chat-attach-dropdown__item").forEach(function (item) {
          item.addEventListener("click", function (e) {
            e.stopPropagation();
            var action = item.getAttribute("data-action");
            if (action === "photo") personalFileInput.click();
            else if (action === "document" && personalPdfInput) personalPdfInput.click();
            closePersonalAttachDropdown();
          });
        });
      }
      personalFileInput.addEventListener("change", function () {
        var f = personalFileInput.files && personalFileInput.files[0];
        if (!f || !f.type.startsWith("image/")) return;
        personalDocument = null;
        resizeImage(f, 800, 800, 0.92).then(function (dataUrl) {
          personalImage = dataUrl;
          updatePersonalSendBtnIcon();
          if (personalImagePreview) {
            personalImagePreview.innerHTML = '<img class="chat-image-preview__thumb" src="' + dataUrl.replace(/"/g, "&quot;") + '" alt="" /><button type="button" class="chat-image-preview__remove">Убрать</button>';
            personalImagePreview.classList.add("chat-image-preview--visible");
            personalImagePreview.querySelector(".chat-image-preview__remove").addEventListener("click", function () {
              personalImage = null; personalFileInput.value = "";
              updatePersonalSendBtnIcon();
              personalImagePreview.classList.remove("chat-image-preview--visible"); personalImagePreview.innerHTML = "";
            });
          }
        }).catch(function () { if (tg && tg.showAlert) tg.showAlert("Не удалось обработать изображение"); });
        personalFileInput.value = "";
      });
      if (personalPdfInput) {
        personalPdfInput.addEventListener("change", function () {
          var f = personalPdfInput.files && personalPdfInput.files[0];
          if (!f || f.type !== "application/pdf") return;
          if (f.size > 8 * 1024 * 1024) {
            if (tg && tg.showAlert) tg.showAlert("Файл слишком большой. Максимум 8 МБ.");
            personalPdfInput.value = "";
            return;
          }
          personalImage = null;
          var reader = new FileReader();
          reader.onload = function () {
            var dataUrl = reader.result;
            if (dataUrl && typeof dataUrl === "string" && dataUrl.indexOf("data:application/pdf") === 0) {
              personalDocument = { dataUrl: dataUrl, fileName: (f.name || "document.pdf").replace(/[^\w\s.-]/g, "") || "document.pdf" };
              updatePersonalSendBtnIcon();
              if (personalImagePreview) {
                personalImagePreview.innerHTML = '<span class="chat-image-preview__doc">📄 ' + escapeHtml(personalDocument.fileName) + '</span><button type="button" class="chat-image-preview__remove">Убрать</button>';
                personalImagePreview.classList.add("chat-image-preview--visible");
                personalImagePreview.querySelector(".chat-image-preview__remove").addEventListener("click", function () {
                  personalDocument = null; personalPdfInput.value = "";
                  updatePersonalSendBtnIcon();
                  personalImagePreview.classList.remove("chat-image-preview--visible"); personalImagePreview.innerHTML = "";
                });
              }
            } else if (tg && tg.showAlert) tg.showAlert("Не удалось прочитать файл");
          };
          reader.onerror = function () { if (tg && tg.showAlert) tg.showAlert("Не удалось прочитать файл"); };
          reader.readAsDataURL(f);
          personalPdfInput.value = "";
        });
      }
    }
    return {
      closeGeneralAttachDropdown: closeGeneralAttachDropdown,
      closePersonalAttachDropdown: closePersonalAttachDropdown
    };
  }
}

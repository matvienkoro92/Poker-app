(function () {
  "use strict";

  function initBroadcastReportsModal() {
    var btn = document.getElementById("adminBroadcastReportsBtn");
    var modal = document.getElementById("broadcastReportsModal");
    var closeBtn = document.getElementById("broadcastReportsModalClose");
    var backdrop = document.getElementById("broadcastReportsModalBackdrop");
    if (!btn || !modal) return;
    if (btn.dataset.broadcastReportsBound === "1") return;
    btn.dataset.broadcastReportsBound = "1";

    function closeModal() {
      modal.setAttribute("aria-hidden", "true");
      if (document.body) document.body.style.overflow = "";
    }

    function openModal() {
      modal.setAttribute("aria-hidden", "false");
      if (document.body) document.body.style.overflow = "hidden";
    }

    btn.addEventListener("click", openModal);
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (backdrop) backdrop.addEventListener("click", closeModal);
  }

  window.pokerInitBroadcastReportsModal = initBroadcastReportsModal;
})();

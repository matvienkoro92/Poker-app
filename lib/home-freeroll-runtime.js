(function initHomeFreerollRuntime() {
  window.openHomeFreerollModal = function openHomeFreerollModal(item) {
    var modal = document.getElementById("homeFreerollModal");
    if (!modal || !item) return;
    var dayEl = document.getElementById("homeFreerollModalDay");
    var titleEl = document.getElementById("homeFreerollModalTitle");
    var metaEl = document.getElementById("homeFreerollModalMeta");
    var descEl = document.getElementById("homeFreerollModalDesc");
    var playBtn = document.getElementById("homeFreerollModalPlayBtn");
    if (dayEl) dayEl.textContent = item.day;
    if (titleEl) titleEl.textContent = "Фриролл";
    if (metaEl) metaEl.textContent = item.title + " · " + item.time + " · " + item.room;
    if (descEl) descEl.textContent = item.desc || "";
    if (playBtn) playBtn.dataset.roomPage = item.roomPage || "poker21";
    modal.classList.remove("home-freeroll-modal--hidden");
    modal.setAttribute("aria-hidden", "false");
  };

  window.closeHomeFreerollModal = function closeHomeFreerollModal() {
    var modal = document.getElementById("homeFreerollModal");
    if (!modal) return;
    modal.classList.add("home-freeroll-modal--hidden");
    modal.setAttribute("aria-hidden", "true");
  };

  window.initHomeFreerollModal = function initHomeFreerollModal() {
    var modal = document.getElementById("homeFreerollModal");
    var playBtn = document.getElementById("homeFreerollModalPlayBtn");
    if (!modal || modal.__initedHomeFreeroll) return;
    modal.__initedHomeFreeroll = true;

    modal.addEventListener("click", function (e) {
      var closeBtn = e.target && e.target.closest ? e.target.closest("[data-home-freeroll-close]") : null;
      if (closeBtn) {
        e.preventDefault();
        window.closeHomeFreerollModal();
      }
    });

    if (playBtn) {
      playBtn.addEventListener("click", function () {
        var roomPage = playBtn.dataset.roomPage || "poker21";
        window.closeHomeFreerollModal();
        if (typeof setView === "function") setView("download");
        if (typeof setDownloadPage === "function") {
          setDownloadPage(roomPage);
          requestAnimationFrame(function () {
            setDownloadPage(roomPage);
          });
        }
      });
    }
  };
})();

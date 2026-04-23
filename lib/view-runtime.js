(function initSpringRatingLeagueTabs() {
  document.body.addEventListener(
    "click",
    function (e) {
      var el = e.target;
      var tab = null;
      while (el && el !== document.body) {
        if (el.classList && el.classList.contains("spring-rating-date-league-tab")) {
          tab = el;
          break;
        }
        el = el.parentElement;
      }
      if (!tab) return;

      var wrap = tab.parentElement;
      while (wrap && wrap !== document.body) {
        if (wrap.classList && wrap.classList.contains("spring-rating-date-leagues")) break;
        wrap = wrap.parentElement;
      }
      if (!wrap || wrap === document.body) return;

      e.preventDefault();
      e.stopPropagation();

      var league = tab.getAttribute("data-league");
      if (!league) return;

      var tabs = wrap.querySelectorAll(".spring-rating-date-league-tab");
      var blocks = wrap.querySelectorAll(".spring-rating-date-league");
      for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.toggle("spring-rating-date-league-tab--active", tabs[i].getAttribute("data-league") === league);
      }
      for (var j = 0; j < blocks.length; j++) {
        blocks[j].style.display = blocks[j].getAttribute("data-league") === league ? "" : "none";
      }
    },
    true
  );
})();

(function preinitChat() {
  var idle =
    window.requestIdleCallback ||
    function (cb) {
      setTimeout(cb, 150);
    };
  idle(function () {
    if (window.chatListenersAttached) return;
    if (typeof initChat === "function") initChat();
  });
})();

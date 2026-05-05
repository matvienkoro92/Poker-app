function initPokerShowsPlayer() {
  var iframe = document.getElementById("pokerShowsIframe");
  var tabs = document.querySelectorAll(".home-poker-shows__tab[data-poker-show]");
  if (!iframe || !tabs.length) return;
  var playlists = {
    afterdark: "PL2bAZuFpadxGdQdaYJuSUtw9JFgsMB8YV",
    highstakes: "PLzjpJOumIPMiQQhiCWYlawTFz7LNKPino"
  };
  tabs.forEach(function (tab) {
    if (tab.dataset.pokerShowsBound) return;
    tab.dataset.pokerShowsBound = "1";
    tab.addEventListener("click", function () {
      var show = tab.getAttribute("data-poker-show");
      var listId = playlists[show];
      if (!listId) return;
      iframe.src = "https://www.youtube.com/embed/videoseries?list=" + listId + "&rel=0";
      tabs.forEach(function (t) {
        t.classList.toggle("home-poker-shows__tab--active", t === tab);
        t.setAttribute("aria-pressed", t === tab ? "true" : "false");
      });
    });
  });
}

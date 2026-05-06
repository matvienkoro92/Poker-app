function initPlayerCrmViewportShellRuntime() {
  function stableViewportHeight() {
    var globalStableHeight = window.pokerGetStablePlayerCrmViewportHeight;
    if (typeof globalStableHeight === "function") {
      return globalStableHeight();
    }
    var values = [];
    function add(value) {
      var n = Number(value) || 0;
      if (n >= 320 && n < 2200) values.push(n);
    }
    try {
      add(window.visualViewport && window.visualViewport.height);
    } catch (eVvHeight) {}
    try {
      add(window.innerHeight);
    } catch (eInnerHeight) {}
    try {
      add(document.documentElement && document.documentElement.clientHeight);
    } catch (eDocHeight) {}
    try {
      add(window.screen && window.screen.availHeight);
      add(window.screen && window.screen.height);
    } catch (eScreenHeight) {}
    if (!values.length) return 0;
    return Math.round(Math.max.apply(Math, values));
  }

  function syncCrmViewportShell() {
    var root = document.getElementById("playerCrmView");
    if (!root) return;
    var section = root.querySelector(".player-crm");
    var active = root.classList && root.classList.contains("view--active");
    var isCrmView = false;
    try {
      isCrmView = document.body && document.body.getAttribute("data-view") === "player-crm";
    } catch (eBodyView) {}
    if (!active && !isCrmView) return;
    var h = stableViewportHeight();
    var px = h >= 320 ? Math.round(h) + "px" : "100vh";
    root.style.setProperty("position", "fixed", "important");
    root.style.setProperty("top", "0", "important");
    root.style.setProperty("right", "0", "important");
    root.style.setProperty("bottom", "auto", "important");
    root.style.setProperty("left", "0", "important");
    root.style.setProperty("min-height", px, "important");
    root.style.setProperty("height", px, "important");
    root.style.setProperty("max-height", px, "important");
    root.style.setProperty("overflow", "hidden", "important");
    root.style.setProperty("display", "flex", "important");
    root.style.setProperty("flex-direction", "column", "important");
    root.style.setProperty("align-items", "stretch", "important");
    root.style.setProperty("gap", "8px", "important");
    root.style.setProperty("visibility", "visible", "important");
    root.style.setProperty("opacity", "1", "important");
    root.style.setProperty("z-index", "2147483000", "important");
    root.style.setProperty("pointer-events", "auto", "important");
    root.style.setProperty("isolation", "isolate", "important");
    root.style.setProperty("background", "linear-gradient(150deg, #030407 0%, #070a10 42%, #020307 100%)", "important");
    if (section) {
      section.style.setProperty("display", "block", "important");
      section.style.setProperty("visibility", "visible", "important");
      section.style.setProperty("opacity", "1", "important");
      section.style.setProperty("flex", "1 1 auto", "important");
      section.style.setProperty("position", "absolute", "important");
      section.style.setProperty("top", "max(74px, calc(env(safe-area-inset-top, 0px) + 62px))", "important");
      section.style.setProperty("right", "max(12px, var(--screen-gutter-x, 12px))", "important");
      section.style.setProperty("bottom", "0", "important");
      section.style.setProperty("left", "max(12px, var(--screen-gutter-x, 12px))", "important");
      section.style.setProperty("z-index", "2", "important");
      section.style.setProperty("width", "auto", "important");
      section.style.setProperty("max-width", "100%", "important");
      section.style.setProperty("min-height", "0", "important");
      section.style.setProperty("height", "auto", "important");
      section.style.setProperty("margin", "0 auto", "important");
      section.style.setProperty("overflow-x", "hidden", "important");
      section.style.setProperty("overflow-y", "auto", "important");
      section.style.setProperty("-webkit-overflow-scrolling", "touch", "important");
      section.style.setProperty("box-sizing", "border-box", "important");
      section.style.setProperty("padding-bottom", "max(12px, calc(env(safe-area-inset-bottom, 0px) + 12px))", "important");
      section.style.removeProperty("max-height");
    }
  }

  return {
    syncCrmViewportShell: syncCrmViewportShell,
  };
}

function initPlayerCrmViewportShellRuntime() {
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
    var h = 0;
    try {
      h = window.visualViewport && window.visualViewport.height ? Number(window.visualViewport.height) : 0;
    } catch (eVv) {}
    if (!h || h < 320) {
      try {
        h = window.innerHeight || document.documentElement.clientHeight || 0;
      } catch (eWinH) {}
    }
    if (!h || h < 320) return;
    var px = Math.round(h) + "px";
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
    if (section) {
      section.style.setProperty("display", "block", "important");
      section.style.setProperty("visibility", "visible", "important");
      section.style.setProperty("opacity", "1", "important");
      section.style.setProperty("flex", "1 1 auto", "important");
      section.style.setProperty("position", "relative", "important");
      section.style.setProperty("z-index", "2", "important");
      section.style.setProperty("width", "min(1120px, 100%)", "important");
      section.style.setProperty("max-width", "100%", "important");
      section.style.setProperty("min-height", "0", "important");
      section.style.setProperty("height", "auto", "important");
      section.style.setProperty("margin", "0 auto", "important");
      section.style.setProperty("overflow-x", "hidden", "important");
      section.style.setProperty("overflow-y", "auto", "important");
      section.style.setProperty("-webkit-overflow-scrolling", "touch", "important");
      section.style.setProperty("box-sizing", "border-box", "important");
      section.style.setProperty("padding-bottom", "max(12px, calc(env(safe-area-inset-bottom, 0px) + 12px))", "important");
      section.style.removeProperty("top");
      section.style.removeProperty("right");
      section.style.removeProperty("bottom");
      section.style.removeProperty("left");
      section.style.removeProperty("max-height");
    }
  }

  return {
    syncCrmViewportShell: syncCrmViewportShell,
  };
}

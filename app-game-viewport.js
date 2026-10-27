(function () {
  'use strict';
  function fit() {
    if (parent === window) return;
    // A Telegram shell may already sit below native controls. Only reserve the
    // missing part inside the frame, including webviews that report zero inset.
    try {
      var frame = window.frameElement;
      var top = frame ? frame.getBoundingClientRect().top : 0;
      var mobile = parent.innerWidth <= 600;
      document.documentElement.style.setProperty('--game-safe-top', Math.max(0, (mobile ? 40 : 0) - top) + 'px');
    } catch (_) {
      document.documentElement.style.removeProperty('--game-safe-top');
    }
  }
  fit();
  window.addEventListener('resize', fit, {passive:true});
})();

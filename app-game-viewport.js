(function () {
  'use strict';
  // Embedded game shells already clear the device notch and Telegram controls.
  if (parent !== window) document.documentElement.style.setProperty('--game-safe-top', '0px');
})();

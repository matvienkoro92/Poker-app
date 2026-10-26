(function () {
  'use strict';
  // Apply before the first paint: the villa owns the room art behind this menu.
  if (parent !== window) document.documentElement.classList.add('billiards-embedded');
  if (parent !== window && new URLSearchParams(location.search).get('overlay') === 'villa') {
    document.documentElement.classList.add('billiards-villa-overlay');
  }
})();

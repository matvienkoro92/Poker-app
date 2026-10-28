(function () {
  'use strict';
  function fitViewport(){document.documentElement.style.setProperty('--billiards-viewport-height',(parent !== window ? innerHeight : Math.min(innerHeight,window.visualViewport?.height||innerHeight))+'px');}
  fitViewport();window.addEventListener('resize',fitViewport,{passive:true});window.visualViewport?.addEventListener('resize',fitViewport,{passive:true});
  // Apply before the first paint: the villa owns the room art behind this menu.
  if (parent !== window) document.documentElement.classList.add('billiards-embedded');
  if (parent !== window && new URLSearchParams(location.search).get('overlay') === 'villa') {
    document.documentElement.classList.add('billiards-villa-overlay');
  }
})();

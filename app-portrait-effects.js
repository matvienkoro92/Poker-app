(function () {
  "use strict";
  var selector = '.chat-user-modal__rating-art-img, .winter-rating-player-modal__art-img';
  var records = new Map();
  function sync(img) {
    if (!img.parentElement) return;
    var source = img.getAttribute('src') || '';
    // Cached profiles may still resolve the previous, non-layered portrait.
    if (/summer-rating-player-pokermanki-v2\.webp/.test(source)) {
      img.src = './assets/summer-rating-player-pokermanki-v3.webp?v=1';
      return;
    }
    var record = records.get(img);
    var active = /pokermanki/.test(img.getAttribute('src') || '') && !img.hidden;
    if (!record && active) {
      var layer = document.createElement('span');
      layer.className = 'pokermanki-rocket-effects';
      layer.setAttribute('aria-hidden', 'true');
      layer.innerHTML = '<i class="pokermanki-character-head"><i class="pokermanki-character-eyelids"></i></i><i class="pokermanki-rocket-flame"></i><i class="pokermanki-rocket-sparks"></i><i class="pokermanki-rocket-shine"></i>';
      img.parentElement.appendChild(layer);
      record = { layer: layer };
      records.set(img, record);
      img.addEventListener('load', function () { sync(img); });
      var resize = new ResizeObserver(function () { sync(img); });
      record.resize = resize;
      resize.observe(img);
      resize.observe(img.parentElement);
    }
    if (!record) return;
    var layered = active && /summer-rating-player-pokermanki-v3/.test(img.getAttribute('src') || '');
    record.layer.classList.toggle('pokermanki-rocket-effects--layered', layered);
    if (img.classList.contains('pokermanki-layered-body') !== layered) img.classList.toggle('pokermanki-layered-body', layered);
    var rect = img.getBoundingClientRect();
    record.layer.hidden = !active || !rect.width || !rect.height || !img.naturalWidth;
    if (record.layer.hidden) return;
    var parent = img.parentElement.getBoundingClientRect();
    var ratio = img.naturalWidth / img.naturalHeight;
    var width = Math.min(rect.width, rect.height * ratio);
    var height = width / ratio;
    Object.assign(record.layer.style, {
      left: (rect.left - parent.left + (rect.width - width) / 2) + 'px',
      top: (rect.top - parent.top + rect.height - height) + 'px',
      width: width + 'px', height: height + 'px'
    });
  }
  function scan(root) {
    if (root.nodeType !== 1) return;
    if (root.matches(selector)) sync(root);
    root.querySelectorAll(selector).forEach(sync);
  }
  new MutationObserver(function (changes) {
    changes.forEach(function (change) {
      if (change.type === 'attributes' && !change.target.closest('.pokermanki-rocket-effects')) scan(change.target);
      if (change.type === 'childList') change.addedNodes.forEach(scan);
    });
    records.forEach(function (record, img) {
      if (!img.isConnected) { record.resize.disconnect(); record.layer.remove(); records.delete(img); }
    });
  }).observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ['src', 'hidden', 'class', 'style'] });
  // An installed iOS PWA can return from suspension without DOM mutations.
  // Re-measure its portraits and resume animations when the page is shown again.
  function resume() {
    if (document.hidden) return;
    requestAnimationFrame(function () {
      scan(document.documentElement);
      records.forEach(function (record) {
        if (record.layer.hidden || !record.layer.getAnimations) return;
        record.layer.getAnimations({ subtree: true }).forEach(function (animation) {
          if (animation.playState === 'paused') animation.play();
        });
      });
    });
  }
  window.addEventListener('pageshow', resume);
  document.addEventListener('visibilitychange', resume);
  scan(document.documentElement);
})();

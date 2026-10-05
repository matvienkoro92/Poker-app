/* Same chip-only interface for every user; no reviewer or environment detection. */
(function () {
  'use strict';
  var blockedViews = ['cashout', 'admin-bonuses', 'player-crm', 'video-lessons', 'learn-play-hub'];
  var blockedSelector = blockedViews.map(function (view) {
    return '[data-view-target="' + view + '"], [data-view="' + view + '"]:not(body), [data-html-fragment-view="' + view + '"]';
  }).join(',') + ',[data-vpn-proxy-open],#vpnProxyOpenBtn,.evening-vpn-cat';

  function clean(root) {
    if (root.nodeType === 3) {
      var parent = root.parentElement;
      if (!parent || /^(SCRIPT|STYLE|TEXTAREA)$/i.test(parent.tagName) || parent.isContentEditable) return;
      var text = chipsText(root.nodeValue);
      if (text !== root.nodeValue) root.nodeValue = text;
      return;
    }
    if (root.nodeType !== 1 && root.nodeType !== 9) return;
    if (root.matches && root.matches(blockedSelector)) { root.remove(); return; }
    if (root.querySelectorAll) root.querySelectorAll(blockedSelector).forEach(function (el) { el.remove(); });
    var elements = root.querySelectorAll ? Array.from(root.querySelectorAll('[title],[aria-label],[alt]')) : [];
    if (root.nodeType === 1) elements.unshift(root);
    elements.forEach(function (element) {
      ['title', 'aria-label', 'alt'].forEach(function (name) {
        if (element.hasAttribute(name)) {
          var old = element.getAttribute(name), next = chipsText(old);
          if (old !== next) element.setAttribute(name, next);
        }
      });
    });
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) clean(node);
  }
  var observer = new MutationObserver(function (records) {
    records.forEach(function (record) {
      if (record.type === 'characterData' || record.type === 'attributes') clean(record.target);
      else record.addedNodes.forEach(clean);
    });
  });
  observer.observe(document.documentElement, { subtree: true, childList: true, characterData: true,
    attributes: true, attributeFilter: ['title', 'aria-label', 'alt'] });
  document.addEventListener('DOMContentLoaded', function () { clean(document); });
})();

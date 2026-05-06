// Restore page scroll state after browser back closes a modal.
window.addEventListener("popstate", function () {
  try {
    if (typeof pokerClearBodyDocumentScrollLockInline === "function") pokerClearBodyDocumentScrollLockInline();
  } catch (ePop) {}
});

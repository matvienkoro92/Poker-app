// Chat keyboard/viewport dock runtime orchestrator.

function initChatKeyboardDockRuntime(opts) {
  opts = opts || {};
  function mergeChatKeyboardDockRuntime(part) {
    if (part && typeof part === "object") Object.assign(opts, part);
  }
  if (typeof initChatKeyboardDockFoundation === "function") {
    mergeChatKeyboardDockRuntime(initChatKeyboardDockFoundation(opts));
  }
  if (typeof initChatKeyboardDockLifecycle === "function") {
    mergeChatKeyboardDockRuntime(initChatKeyboardDockLifecycle(opts));
  }
  if (typeof initChatKeyboardDockComposerLayout === "function") {
    mergeChatKeyboardDockRuntime(initChatKeyboardDockComposerLayout(opts));
  }
  if (typeof initChatKeyboardDockViewportEvents === "function") {
    mergeChatKeyboardDockRuntime(initChatKeyboardDockViewportEvents(opts));
  }
}

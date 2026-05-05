function setChatCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function parseChatBody(req) {
  try {
    return typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  } catch (e) {
    return {};
  }
}

function isAllowedChatMethod(method) {
  return method === "GET" || method === "POST" || method === "DELETE" || method === "PATCH";
}

function prepareChatRequest(req, res, deps) {
  deps = deps || {};
  setChatCorsHeaders(res);

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return { handled: true };
  }
  if (!isAllowedChatMethod(req.method)) {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return { handled: true };
  }
  if (req.method !== "GET") {
    if (deps.rejectIfPayloadTooLarge && deps.rejectIfPayloadTooLarge(req, res, 1_500_000)) return { handled: true };
    if (deps.rateLimit && deps.rateLimit(req, res, { bucket: "chat_write", limit: 80, windowMs: 60_000 })) return { handled: true };
  }
  if (!deps.redisConfigured || !deps.redisConfigured()) {
    res.status(500).json({ ok: false, error: "Redis not configured" });
    return { handled: true };
  }

  const body = parseChatBody(req);
  const identity = deps.resolveTelegramIdentity ? deps.resolveTelegramIdentity(req, body, deps.botToken || "") : null;
  if (!identity) {
    res.status(401).json({ ok: false, error: "Откройте в Telegram или войдите через сайт" });
    return { handled: true };
  }

  const myId = deps.memberIdFromIdentity ? deps.memberIdFromIdentity(identity) : "";
  if (!myId) {
    res.status(401).json({ ok: false, error: "Не удалось определить пользователя" });
    return { handled: true };
  }

  const admin = !!((deps.isAdmin && deps.isAdmin(myId)) || (deps.isApiAdminIdentity && deps.isApiAdminIdentity(identity, myId)));
  return { handled: false, req, res, body, identity, myId, admin };
}

function dispatchChatRoute(ctx, handlers) {
  const handler = handlers && handlers[ctx.req.method];
  if (!handler) return ctx.res.status(405).json({ ok: false, error: "Method not allowed" });
  return handler(ctx);
}

module.exports = {
  dispatchChatRoute,
  isAllowedChatMethod,
  parseChatBody,
  prepareChatRequest,
  setChatCorsHeaders,
};

const { pipeline: redisPipeline, isConfigured: redisConfigured, sscanall } = require("../redis");
/**
 * Список всех посетителей приложения.
 * GET /api/visitors-list?secret=CRON_SECRET — по секрету (cron).
 * GET /api/visitors-list?initData=...|pwaSession=... — для админа (JSON с uniqueThisMonth).
 * Ответ: { ok, visitors: [{ id, count, username, dtId }], total, unique, uniqueThisMonth?, isAdmin? }
 */
const { resolveTelegramIdentity, memberIdFromIdentity } = require("../resolve-telegram-auth");
const { isAdminIdentity } = require("../api-auth");
const CRON_SECRET = process.env.CRON_SECRET;
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || "";

function getMonthKey() {
  const now = new Date();
  return "poker_app:visitors_month:" + now.getUTCFullYear() + "-" + String(now.getUTCMonth() + 1).padStart(2, "0");
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "GET only" });

  const secret = req.query.secret || (req.headers["authorization"] || "").replace(/^Bearer\s+/i, "").trim();

  const isCron = !!(CRON_SECRET && secret === CRON_SECRET);
  const identity = !isCron ? resolveTelegramIdentity(req, {}, BOT_TOKEN) : null;
  const adminId = identity ? memberIdFromIdentity(identity) : null;
  const asAdmin = !isCron && identity && adminId && isAdminIdentity(identity, adminId);
  const adminCheck =
    req.query.adminCheck === "1" ||
    req.query.admin_check === "1" ||
    req.query.checkAdmin === "1" ||
    req.query.check_admin === "1";

  if (adminCheck) {
    return res.status(200).json({ ok: !!asAdmin, isAdmin: !!asAdmin });
  }

  if (!isCron && !asAdmin) {
    return res.status(403).json({ ok: false, error: "Invalid or missing secret, or not admin" });
  }

  if (!redisConfigured()) {
    return res.status(500).json({ ok: false, error: "Redis not configured" });
  }

  const monthParam = (req.query.month || "").trim();
  const selectedMonthValid = /^\d{4}-\d{2}$/.test(monthParam);
  const monthKey = selectedMonthValid ? "poker_app:visitors_month:" + monthParam : getMonthKey();

  const [idsRaw, monthIdsRaw] = await Promise.all([
    sscanall("poker_app:visitors", { context: "visitors-list.all", count: 400, maxPages: 50 }),
    sscanall(monthKey, { context: "visitors-list.month", count: 400, maxPages: 50 }),
  ]);
  if (!Array.isArray(idsRaw) || !Array.isArray(monthIdsRaw)) {
    return res.status(500).json({ ok: false, error: "Redis error" });
  }
  const ids = idsRaw.map((id) => String(id || "").trim()).filter(Boolean);
  const detailCommands = ids.length ? [
    ["HMGET", "poker_app:visits", ...ids],
    ["HMGET", "poker_app:visitor_usernames", ...ids],
    ["HMGET", "poker_app:visitor_dt_ids", ...ids],
  ] : [];
  const results = await redisPipeline(detailCommands.concat([
    ["SCARD", "poker_app:gazette_subscribers"],
    ["SCARD", "poker_app:rating_subscribers"],
    ["SCARD", "poker_app:raffle_subscribers"],
  ]));

  if (!results || !Array.isArray(results)) {
    return res.status(500).json({ ok: false, error: "Redis error" });
  }
  const detailOffset = ids.length ? 3 : 0;
  const visitValues = ids.length && Array.isArray(results[0]?.result) ? results[0].result : [];
  const usernameValues = ids.length && Array.isArray(results[1]?.result) ? results[1].result : [];
  const dtIdValues = ids.length && Array.isArray(results[2]?.result) ? results[2].result : [];
  const monthIds = monthIdsRaw;
  const monthSet = new Set(monthIds);

  const visitors = ids.map((id, index) => ({
    id,
    count: parseInt(visitValues[index], 10) || 1,
    username: usernameValues[index] ? String(usernameValues[index]).trim() : null,
    dtId: dtIdValues[index] ? String(dtIdValues[index]).trim() : null,
    inMonth: monthSet.has(id),
  }));
  visitors.sort((a, b) => b.count - a.count);

  const total = visitors.reduce((s, v) => s + (v.count || 0), 0);
  const uniqueThisMonth = monthSet.size;

  if (asAdmin) {
    const gazetteSubscribers = parseInt(results[detailOffset]?.result, 10) || 0;
    const ratingSubscribers = parseInt(results[detailOffset + 1]?.result, 10) || 0;
    const raffleSubscribers = parseInt(results[detailOffset + 2]?.result, 10) || 0;
    return res.status(200).json({
      ok: true,
      isAdmin: true,
      visitors,
      total,
      unique: visitors.length,
      uniqueThisMonth,
      uniqueInSelectedMonth: uniqueThisMonth,
      selectedMonth: selectedMonthValid ? monthParam : null,
      gazetteSubscribers,
      ratingSubscribers,
      raffleSubscribers,
    });
  }

  const format = (req.query.format || "").toLowerCase();
  const secretParam = escapeAttr(secret);

  if (format === "chats") {
    const chatUserIds = await sscanall("poker_app:chat_users", {
      context: "visitors-list.chat-users",
      count: 400,
      maxPages: 50,
    }) || [];
    const chatResults = chatUserIds.length
      ? await redisPipeline([["HMGET", "poker_app:visitor_usernames", ...chatUserIds]])
      : [];
    const usernamesMap = {};
    if (Array.isArray(chatResults?.[0]?.result)) {
      const u = chatResults[0].result;
      for (let i = 0; i < u.length; i += 1) if (chatUserIds[i] && u[i]) usernamesMap[chatUserIds[i]] = u[i];
    }
    const chatUsers = chatUserIds.map((id) => ({ id, username: usernamesMap[id] || null }));
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    const listItems = chatUsers.map(
      (u) =>
        `<li class="chat-user-item"><strong>${escapeHtml(u.id)}</strong> ${u.username ? "@" + escapeHtml(u.username) : ""}
        <button type="button" class="chat-open-btn" data-user-id="${escapeAttr(u.id)}" data-secret="${secretParam}">Ответить</button>
        <div class="chat-thread" id="chat-${escapeAttr(u.id)}" style="display:none">
          <div class="chat-messages-preview" data-user-id="${escapeAttr(u.id)}"></div>
          <div class="chat-reply-wrap">
            <input type="text" class="chat-reply-input" placeholder="Сообщение..." maxlength="500" data-user-id="${escapeAttr(u.id)}" />
            <button type="button" class="chat-reply-btn" data-user-id="${escapeAttr(u.id)}" data-secret="${secretParam}">Отправить</button>
          </div>
        </div>
        </li>`
    ).join("");
    return res.status(200).send(`<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Чаты с пользователями</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; margin: 24px; background: #1a1a2e; color: #eee; }
    h1 { font-size: 1.5rem; }
    ul { list-style: none; padding: 0; }
    .chat-user-item { padding: 12px; border-bottom: 1px solid #333; }
    .chat-open-btn, .chat-reply-btn { padding: 6px 12px; background: #2d5a87; color: #fff; border: none; border-radius: 6px; cursor: pointer; margin-left: 8px; }
    .chat-thread { margin-top: 12px; padding: 12px; background: #0f172a; border-radius: 8px; }
    .chat-messages-preview { max-height: 200px; overflow-y: auto; margin-bottom: 12px; font-size: 14px; }
    .chat-msg-admin { color: #4fc3f7; }
    .chat-msg-user { color: #aaa; }
    .chat-reply-wrap { display: flex; gap: 8px; }
    .chat-reply-input { flex: 1; padding: 8px; border-radius: 6px; background: #1e293b; border: 1px solid #333; color: #eee; }
  </style>
</head>
<body>
  <h1>Чаты с пользователями</h1>
  <p><a href="?format=html&secret=${secretParam}" style="color:#4fc3f7">← К списку посетителей</a></p>
  <ul id="chatList">${listItems || "<li class='empty'>Нет чатов</li>"}</ul>
  <script>
  var base = window.location.origin;
  document.querySelectorAll(".chat-open-btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
      var uid = this.dataset.userId;
      var thread = document.getElementById("chat-" + uid);
      if (thread.style.display === "none") {
        thread.style.display = "block";
        loadChat(uid);
      } else { thread.style.display = "none"; }
    });
  });
  document.querySelectorAll(".chat-reply-btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
      var uid = this.dataset.userId;
      var secret = this.dataset.secret;
      var input = document.querySelector(".chat-reply-input[data-user-id='" + uid + "']");
      var text = (input && input.value || "").trim();
      if (!text) return;
      btn.disabled = true;
      fetch(base + "/api/chat", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({secret: secret, userId: uid, text: text}) })
        .then(function(r){return r.json();})
        .then(function(d){ btn.disabled = false; if(d.ok){ input.value=""; loadChat(uid); } else alert(d.error||"Ошибка"); })
        .catch(function(){ btn.disabled = false; alert("Ошибка сети"); });
    });
  });
  function loadChat(uid) {
    var secret = document.querySelector(".chat-reply-btn[data-user-id='" + uid + "']")?.dataset.secret || "";
    var el = document.querySelector(".chat-messages-preview[data-user-id='" + uid + "']");
    if (!el) return;
    fetch(base + "/api/chat?userId=" + encodeURIComponent(uid) + "&secret=" + encodeURIComponent(secret))
      .then(function(r){return r.json();})
      .then(function(d){
        if (!d.ok || !d.messages) { el.innerHTML = "<p>Ошибка загрузки</p>"; return; }
        el.innerHTML = d.messages.map(function(m){
          var who = m.fromAdmin ? "Админ" : (m.userName || "Пользователь");
          var cls = m.fromAdmin ? "chat-msg-admin" : "chat-msg-user";
          var t = (m.text||"").replace(/</g,"&lt;").replace(/>/g,"&gt;");
          return "<p class="+cls+"><b>"+who+"</b>: "+t+" <small>"+(m.time?new Date(m.time).toLocaleString("ru-RU"):"")+"</small></p>";
        }).join("") || "<p>Нет сообщений</p>";
        el.scrollTop = el.scrollHeight;
      });
  }
  </script>
</body>
</html>`);
  }

  if (format === "html") {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    const rows = visitors.map((v, i) => {
      let linkCell = `<code>${escapeHtml(v.id)}</code>`;
      if (v.id.startsWith("tg_")) {
        const userId = v.id.replace(/^tg_/, "");
        const href = v.username
          ? "https://t.me/" + escapeAttr(v.username.replace(/^@/, ""))
          : "tg://user?id=" + escapeAttr(userId);
        linkCell = `<a href="${escapeAttr(href)}" target="_blank" rel="noopener" class="visitor-link" title="Открыть в Telegram">${escapeHtml(v.id)}</a>`;
      }
      const dtCell = v.dtId ? escapeHtml(v.dtId) : "—";
      return `<tr><td>${i + 1}</td><td>${linkCell}</td><td>${dtCell}</td><td>${v.count}</td><td>${v.id.startsWith("tg_") ? "Telegram" : "Web"}</td></tr>`;
    }).join("");
    return res.status(200).send(`<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Посетители</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; margin: 24px; background: #1a1a2e; color: #eee; }
    h1 { font-size: 1.5rem; }
    .stats { margin-bottom: 16px; color: #aaa; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 10px 12px; text-align: left; border-bottom: 1px solid #333; }
    th { background: #16213e; }
    tr:hover { background: #16213e; }
    code { font-size: 0.9em; background: #0f0f1a; padding: 2px 6px; border-radius: 4px; }
    a { color: #4fc3f7; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .visitor-link { color: #4fc3f7; }
    .empty { color: #666; padding: 24px; }
  </style>
</head>
<body>
  <h1>Посетители приложения</h1>
  <p class="stats">Всего визитов: <strong>${total}</strong> • Уникальных: <strong>${visitors.length}</strong> • <a href="?format=chats&secret=${secretParam}" style="color:#4fc3f7">Чаты</a></p>
  <table>
    <thead><tr><th>#</th><th>ID</th><th>DT#</th><th>Визитов</th><th>Тип</th></tr></thead>
    <tbody>${rows || '<tr><td colspan="5" class="empty">Нет данных</td></tr>'}</tbody>
  </table>
</body>
</html>`);
  }

  return res.status(200).json({
    ok: true,
    visitors,
    total,
    unique: visitors.length,
  });
};

function escapeHtml(s) {
  if (!s) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(s) {
  if (!s) return "";
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

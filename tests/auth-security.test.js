"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const { validateMiniAppInitData, resolveTelegramIdentity, memberIdFromIdentity } = require("../lib/resolve-telegram-auth");
const { isAdminIdentity, authRequired } = require("../lib/api-auth");
const { isAdminReportIdentity } = require("../lib/admin-report-access");
const { isBonusAdminIdentity } = require("../lib/bonus-admin-access");
const { signPwaSession } = require("../lib/poker-pwa-session");
const { signPwaVkSession } = require("../lib/poker-pwa-vk-session");
const bot = "isolated-security-test-token";
function initData(date, id = 123456) {
  const params = new URLSearchParams({ user: JSON.stringify({ id, username: "player", language_code: "ru", photo_url: "https://example.test/avatar" }) });
  if (date != null) params.set("auth_date", String(date));
  const data = [...params].sort(([a], [b]) => a.localeCompare(b)).map(([k,v]) => k + "=" + v).join("\n");
  const secret = crypto.createHmac("sha256", "WebAppData").update(bot).digest();
  params.set("hash", crypto.createHmac("sha256", secret).update(data).digest("hex"));
  return params.toString();
}
test("Mini App requires a fresh signed timestamp and preserves profile fields", (t) => {
  t.mock.method(Date, "now", () => 1788609600000);
  const now = Math.floor(Date.now() / 1000);
  assert.equal(validateMiniAppInitData(initData(now), bot).language_code, "ru");
  for (const date of [null, 1, now - 86401, now + 61, "NaN", 1.5]) assert.equal(validateMiniAppInitData(initData(date), bot), null);
  assert.equal(validateMiniAppInitData(initData(now) + "tampered", bot), null);
  assert.equal(validateMiniAppInitData(initData(now, -1), bot), null);
});
test("VK signed identity cannot acquire Telegram admin or report or bonus rights", () => {
  const original = process.env.PWA_VK_SESSION_SECRET;
  process.env.PWA_VK_SESSION_SECRET = "isolated-vk-test-secret";
  try {
    for (const user of [{ vkId: 388008256, domain: "player" }, { vkId: 123456, domain: "roman1_matvienko" }, { vkId: 123456, domain: "roman1787443" }]) {
      const token = signPwaVkSession(user);
      const identity = resolveTelegramIdentity({ query: {} }, { pwaVkSession: token }, bot);
      const member = memberIdFromIdentity(identity);
      assert.ok(member.startsWith("vk_"));
      assert.equal(isAdminIdentity(identity, member), false);
      assert.equal(isAdminReportIdentity(identity, member), false);
      assert.equal(isBonusAdminIdentity(identity, member), false);
      assert.equal(authRequired({ query: {} }, { pwaVkSession: token }, bot, { adminOnly: true }).status, 403);
    }
  } finally {
    if (original === undefined) delete process.env.PWA_VK_SESSION_SECRET;
    else process.env.PWA_VK_SESSION_SECRET = original;
  }
});
test("roles follow current IDs and verified emails, not username or old token role flags", () => {
  const regular = { id: 123456, memberId: "tg_123456", username: "roman1_matvienko", adminAccess: true, adminReportAccess: true };
  const auth = authRequired({ query: {} }, { pwaSession: signPwaSession(regular, bot) }, bot);
  assert.equal(auth.isAdmin, false);
  assert.equal(isAdminReportIdentity(auth.identity, auth.memberId), false);
  for (const user of [{ id: 388008256, memberId: "tg_388008256" }, { id: 0, memberId: "mail_ID000001", email: "matvienkoro92@gmail.com" }]) {
    const admin = authRequired({ query: {} }, { pwaSession: signPwaSession(user, bot) }, bot, { adminOnly: true });
    assert.equal(admin.ok, true);
    assert.equal(isAdminReportIdentity(admin.identity, admin.memberId), true);
  }
});
test("Telegram login endpoint cannot exchange stale initData for a fresh PWA session", async () => {
  const original = process.env.TELEGRAM_BOT_TOKEN;
  process.env.TELEGRAM_BOT_TOKEN = bot;
  try {
    const response = { setHeader() {}, status(code) { this.code = code; return this; }, json(body) { this.body = body; return this; } };
    await require("../lib/api-handlers/auth-telegram")({ method: "POST", body: { initData: initData(1), wantPwaSession: true } }, response);
    assert.equal(response.code, 401);
    assert.equal(response.body.pwaSession, undefined);
  } finally {
    if (original === undefined) delete process.env.TELEGRAM_BOT_TOKEN;
    else process.env.TELEGRAM_BOT_TOKEN = original;
  }
});

"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const vm = require("node:vm");
const fs = require("node:fs");
test("late visitor responses cannot replace another link's visitors", async () => {
  const nodes = new Map(), pending = [];
  function node(id) {
    if (!nodes.has(id)) nodes.set(id, { dataset: {}, listeners: {}, innerHTML: "", textContent: "", value: "", classList: { add() {}, remove() {} }, setAttribute() {}, addEventListener(type, fn) { this.listeners[type] = fn; } });
    return nodes.get(id);
  }
  const scope = {
    window: {}, document: { getElementById: node, body: { style: {} } },
    getApiBase: () => "https://test.invalid", pokerApiHasCredential: () => true,
    pokerRafflesApiQueryLeading: () => "?test=1", pokerHideRomanTelegramUsername: () => false,
    fetch: url => new Promise(resolve => pending.push({ url, resolve: data => resolve({ ok: true, json: async () => data }) })),
  };
  vm.runInNewContext(fs.readFileSync(require.resolve("../app-tracking-links.js"), "utf8"), scope);
  function open(id) {
    const button = { getAttribute: () => id, closest: () => null };
    node("trackingLinksAdminTableBody").listeners.click({ target: { getAttribute() {}, closest: selector => selector === "[data-tracking-who]" ? button : null } });
  }
  open("aaaaaaaa");
  open("bbbbbbbb");
  const visitors = pending.filter(p => p.url.includes("visitors=1"));
  visitors[1].resolve({ ok: true, visitors: [{ visitorId: "B_visitor" }] });
  await new Promise(resolve => setImmediate(resolve));
  assert.match(node("trackingLinksVisitorsTableBody").innerHTML, /B_visitor/);
  visitors[0].resolve({ ok: true, visitors: [{ visitorId: "A_visitor" }] });
  await new Promise(resolve => setImmediate(resolve));
  assert.match(node("trackingLinksVisitorsTableBody").innerHTML, /B_visitor/);
  assert.doesNotMatch(node("trackingLinksVisitorsTableBody").innerHTML, /A_visitor/);
});

"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const { buildSharedEvents } = require("../lib/friend-news");
const now = Date.parse("2026-09-10T12:00:00Z");
const self = { userId: "ID400800", pokerPlusNickname: "ПокерМанки" };
const friend = { userId: "ID403173", pokerPlusNickname: "Waaar" };
const rows = require("../lib/friend-tournament-results.json");

test("real September 9 result: PokerMonkey and Waaar share Big Boss prizes", () => {
  const events = buildSharedEvents(self, [friend], rows, now);
  const event = events.find((row) => row.at.startsWith("2026-09-09"));
  assert.ok(event);
  assert.match(event.text, /1-е место/);
  assert.match(event.text, /3-е место/);
  assert.match(event.text, /73\s198,45/);
  assert.match(event.text, /9\s768,75/);
  const reverse = buildSharedEvents(friend, [self], rows, now).find((row) => row.at === event.at);
  assert.equal(reverse.id, event.id);
});

test("same day is insufficient; non-prize, self and missing identities never pair", () => {
  const base = { date: "2026-09-09T12:00:00", place: 1, reward: 100, tournament: "T", tournamentId: "one" };
  const own = { ...base, nick: self.pokerPlusNickname };
  const other = { ...base, nick: friend.pokerPlusNickname };
  assert.equal(buildSharedEvents(self, [friend], [own, other], now).length, 1);
  for (const change of [{ tournamentId: "two" }, { reward: 0 }, { place: 0 }, { tournamentId: "" }, { date: "bad" }]) {
    assert.equal(buildSharedEvents(self, [friend], [own, { ...other, ...change }], now).length, 0);
  }
  assert.equal(buildSharedEvents(self, [self], [own, other], now).length, 0);
  assert.equal(buildSharedEvents(self, [], [own, other], now).length, 0);
  assert.equal(buildSharedEvents({}, [friend], [own, other], now).length, 0);
  assert.equal(buildSharedEvents(self, [friend, { ...friend, userId: "ID123456" }], [own, other], now).length, 0);
});

test("explicit aliases work; repeat rows deduplicate; old history cannot become new", () => {
  const aliased = { ...friend, pokerPlusNickname: " Waaarr " };
  const a = buildSharedEvents(self, [aliased], rows, now);
  const b = buildSharedEvents(self, [friend], rows.concat(rows), now);
  assert.deepEqual(a.map((r) => r.id), b.map((r) => r.id));
  assert.equal(buildSharedEvents(self, [friend], rows, now + 180 * 86400000).length, 0);
});

function browserHarness() {
  const callbacks = {};
  const storage = new Map();
  const document = { readyState: "loading", hidden: false, addEventListener() {}, getElementById() { return null; }, querySelectorAll() { return []; } };
  const window = { addEventListener(name, callback) { callbacks[name] = callback; } };
  const context = { window, document, console, Date: class extends Date { static now() { return now; } }, setTimeout, clearTimeout, setInterval, clearInterval,
    localStorage: { getItem(k) { return storage.get(k); }, setItem(k, v) { storage.set(k, v); } },
    sessionStorage: { getItem(k) { return storage.get(k); }, setItem(k, v) { storage.set(k, v); } } };
  let source = fs.readFileSync(require.resolve("../app-home-friend-news.js"), "utf8");
  source = source.replace('  if (document.readyState === "loading")', `  window.test = { setSelfBet: function (data) { selfBetNewsRows = clubSelfBetNewsEvents(data); }, friendSelfBetNewsEvents, clubSelfBetNewsEvents, placeSelfBetNewsThird, recentTournamentEvents, nicknameMatchKeys, readJson, writeJson, updateFriendNewsBadges, observeFriendNewsRead, load, flushFriendNewsRead, loadFriendNewsEnvelope, eventTextHtml,
    bumpLoad: function () { loadSequence++; }, bumpAuth: function () { friendAuthGeneration++; },
    setState: function (id, rows, read) { friendNewsAccountId = id; friendTrackingSince = Date.parse("2026-09-01T00:00:00Z"); events = rows; friendReadIds = read || {}; },
    pending: function () { return friendReadPending; },
    setTracking: function (value) { friendTrackingSince = value; },
    setMode: function (mode) { newsModalMode = mode; },
    setupLoad: function (roster) {
      loadFriendNewsEnvelope = function () { return Promise.resolve({ friends: roster }); };
      cachedFetchJson = function () { return Promise.resolve({}); };
      tournamentSnapshotsReady = function (friends) { window.test.loadedFriends = friends; return Promise.resolve({}); };
      apiBase = function () { return "https://example.test"; };
    }
  };
  if (document.readyState === "loading")`);
  vm.createContext(context); vm.runInContext(source, context);
  return { context, api: window.test, document, window, storage };
}

test("preview subset never determines membership of friend news", async () => {
  const h = browserHarness();
  const full = [friend, { userId: "ID000001", pokerPlusNickname: "Other" }, { userId: "ID000002", pokerPlusNickname: "Third" }, { userId: "ID000003", pokerPlusNickname: "Fourth" }];
  h.api.setupLoad(full);
  h.context.fetch = async () => ({ ok: true, json: async () => ({ ok: true, posts: [] }) });
  await h.api.load(full.slice(1));
  assert.equal(h.api.loadedFriends.length, 4);
  assert.equal(h.api.loadedFriends[0].pokerPlusNickname, "Waaar");
});

test("friend snapshot caches are isolated by account", () => {
  const h = browserHarness();
  h.api.setState(self.userId, []);
  h.api.writeJson("poker_home_friend_level_events_v1", ["private-event"]);
  h.api.setState(friend.userId, []);
  assert.equal(h.api.readJson("poker_home_friend_level_events_v1", []).length, 0);
  h.api.setState(self.userId, []);
  assert.equal(h.api.readJson("poker_home_friend_level_events_v1", [])[0], "private-event");
});

test("ordinary prize from Waaar is included regardless of amount and preview order", () => {
  const h = browserHarness();
  const results = rows.filter((r) => r.dateLabel === "09.09.2026" && r.nick === "Waaar");
  const events = h.api.recentTournamentEvents([{ ...friend, pokerPlusNickname: "Waaarr" }], { __recentEvents: results });
  assert.equal(events.length, 1);
  assert.equal(events[0].tournamentPlace, 3);
  assert.equal(events[0].prizeAmount, 9768.75);
});

test("dots do not clear by opening Profile; only visible friends-news cards count", () => {
  const h = browserHarness();
  const button = { classList: { toggle(_, value) { button.unread = value; } }, querySelector() { return { hidden: false }; } };
  h.document.querySelectorAll = (selector) => selector === "#homeFriendNewsOpen" ? [button] : [];
  const event = { id: "news:1", at: "2026-09-09T12:00:00Z" };
  h.api.setState(self.userId, [event]);
  h.api.updateFriendNewsBadges();
  assert.equal(button.unread, true);
  h.api.observeFriendNewsRead();
  assert.equal(Object.keys(h.api.pending()).length, 0);
  const modal = { hidden: false };
  const card = { getAttribute() { return event.id; } };
  const list = { querySelectorAll() { return [card]; } };
  h.document.getElementById = (id) => id === "homeFriendNewsModal" ? modal : list;
  let callback;
  h.context.IntersectionObserver = class { constructor(cb) { callback = cb; } observe() {} disconnect() {} };
  h.api.setMode("club"); h.api.observeFriendNewsRead(); assert.equal(callback, undefined);
  h.api.setMode("friends"); h.api.observeFriendNewsRead();
  callback([{ target: card, isIntersecting: true, intersectionRatio: 0.2 }]);
  assert.equal(button.unread, true);
  callback([{ target: card, isIntersecting: true, intersectionRatio: 0.8 }]);
  assert.equal(button.unread, false);
  h.api.setState("", []);
});

test("September enters achievement history without entering summer standings", () => {
  const c = { window: {}, normalizeWinterNick: (n) => String(n || "").trim(), winterRatingTournamentPlayerPoints: (p) => p.points || 0,
    getWinterRatingActiveSeasonTournamentsByDate: () => ({}), getWinterRatingActualSpringTournamentsByDate: () => ({}) };
  vm.createContext(c);
  vm.runInContext(fs.readFileSync(require.resolve("../summer-rating-data-september.js"), "utf8"), c);
  vm.runInContext(fs.readFileSync(require.resolve("../summer-rating-data.js"), "utf8"), c);
  vm.runInContext(fs.readFileSync(require.resolve("../app-rating-view-adapter.js"), "utf8"), c);
  assert.equal(Object.keys(c.SUMMER_RATING_TOURNAMENTS_BY_DATE).length, 0);
  assert.ok(c.pokerRatingAchievementAllTournamentRows().some((r) => r.date === "09.09.2026" && r.nick === "Waaar"));
});


test("profile and feed may share an in-flight request; account changes invalidate it", async () => {
  for (const changeAccount of [false, true]) {
    const h = browserHarness();
    let finish;
    h.context.fetch = () => new Promise(resolve => { finish = resolve; });
    const pending = h.api.loadFriendNewsEnvelope();
    if (changeAccount) h.api.bumpAuth(); else h.api.bumpLoad();
    finish({ ok: true, json: async () => ({ ok: true, accountId: self.userId, friends: [friend], readIds: [], sharedEvents: [] }) });
    if (changeAccount) await assert.rejects(pending, /stale/);
    else assert.equal((await pending).accountId, self.userId);
  }
});

test("fractional prize amounts are highlighted as one amount", () => {
  const h = browserHarness();
  const html = h.api.eventTextHtml("Waaar: 9 768,75 ₽");
  assert.match(html, /amount">\+9 768,75 ₽<\/span>/);
  assert.doesNotMatch(html, /768,\+/);
});


test("seen friend notices stay cleared and news never lights the friends list", () => {
  const storage = new Map(), nodes = new Map();
  const node = id => {
    if (!nodes.has(id)) nodes.set(id, { classes: new Map(), classList: { toggle(k, v) { nodes.get(id).classes.set(k, v); } }, setAttribute() {} });
    return nodes.get(id);
  };
  const c = { window: { addEventListener() {}, pokerGetFriendNewsSummary: () => ({ unread: 1 }) },
    document: { querySelector: () => node("nav"), getElementById: node, addEventListener() {} },
    localStorage: { getItem: k => storage.get(k), setItem: (k,v) => storage.set(k,v) }, Date };
  vm.createContext(c);
  vm.runInContext(fs.readFileSync(require.resolve("../app-profile-friends.js"), "utf8"), c);
  const data = { ok: true, friends: [{userId: "ID123456"}], incoming: [], notices: [{userId: "ID123456", status: "accepted"}] };
  c.pokerUpdateFriendsUnreadFromData(data);
  assert.equal(c.pokerReadFriendsUnreadFlag(), true);
  c.pokerMarkFriendsSeen(data);
  c.pokerUpdateFriendsUnreadFromData(data);
  assert.equal(c.pokerReadFriendsUnreadFlag(), false);
  assert.equal(node("profileFriendsBtn").classes.get("profile-friends__btn--unread"), false);
  assert.equal(node("nav").classes.get("bottom-nav__item--friends-unread"), true);
  c.window.pokerGetFriendNewsSummary = () => ({unread: 0});
  c.pokerRefreshFriendsUnreadIndicators();
  assert.equal(node("nav").classes.get("bottom-nav__item--friends-unread"), false);
});

test("historical feed does not become unread when tracking starts", () => {
  const h = browserHarness();
  h.api.setState(self.userId, [{id:"old",at:"2026-09-09T12:00:00Z"},{id:"new",at:"2026-09-10T11:00:00Z"}]);
  h.api.setTracking(Date.parse("2026-09-10T10:00:00Z"));
  assert.equal(h.window.pokerGetFriendNewsSummary().unread, 1);
  h.api.setTracking(null);
  assert.equal(h.window.pokerGetFriendNewsSummary().ready, false);
  assert.equal(h.window.pokerGetFriendNewsSummary().unread, 0);
});

test("September 10 self-bet result is third in its own day and keeps ordinary news shape", () => {
  const h = browserHarness();
  const event = h.api.clubSelfBetNewsEvents(selfBetFixture())[0];
  const newer={id:"newer",at:"2026-09-11T12:00:00+03:00"};
  const daily=[1,2,3,4].map(i=>({id:"day"+i,at:event.at}));
  const rows=h.api.placeSelfBetNewsThird([newer,event,...daily]);
  assert.equal(rows[0].id,"newer");
  assert.equal(rows[3].id,event.id);
  assert.equal(event.actorNick,"Shkarubo");
  assert.match(event.newsLines.join(" ").replace(/\s/g," "),/300 ₽.*7 000 ₽/);
  assert.equal(event.image,undefined);
  assert.equal(event._eventKind,"self-bet-result");
});

test("self-bet result only appears in the winner's friends feed", () => {
  const h = browserHarness();
  h.api.setSelfBet(selfBetFixture());
  assert.equal(h.api.friendSelfBetNewsEvents([{userId:"ID123456",pokerPlusNickname:"Shkarubo"}]).length,1);
  assert.equal(h.api.friendSelfBetNewsEvents([{userId:"ID654321",pokerPlusNickname:"Other"}]).length,0);
  assert.equal(h.api.friendSelfBetNewsEvents([]).length,0);
});

function selfBetFixture(overrides = {}) {
  return {ok:true,id:"settled-1",status:"settled",title:"Мистери",winnerPaidAt:"2026-09-10T10:00:00Z",winnerPaidAmount:7000,stakePrice:300,entries:[{name:"Shkarubo",winner:true,stake:300}],...overrides};
}
test("automatic self-bet news excludes open, unpaid and private events and deduplicates history", () => {
  const h=browserHarness();
  for (const overrides of [{status:"open"},{createdByPlayer:true},{winnerPaidAmount:null},{winnerPaidAt:""},{entries:[]}]) {
    assert.equal(h.api.clubSelfBetNewsEvents(selfBetFixture(overrides)).length,0);
  }
  assert.equal(h.api.clubSelfBetNewsEvents(selfBetFixture({completedEvents:[selfBetFixture()]})).length,1);
  const row=h.api.clubSelfBetNewsEvents(selfBetFixture({winnerPaidAt:"2026-09-10T01:00:00Z"}))[0];
  assert.equal(row.at,"2026-09-09T12:00:00+03:00");
});

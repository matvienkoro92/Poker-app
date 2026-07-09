/** Плейсхолдер профиля: лёгкий JPEG (~18 KB), не полноразмерный PNG. */
var POKER_PROFILE_AVATAR_PLACEHOLDER = "./assets/profile-pokerist.jpg";
var POKER_AVATAR_CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000;
var POKER_AVATAR_LAST_SELF_CACHE_KEY = "poker_avatar_data_v2:last_self";
var POKER_PROFILE_AVATAR_PRESETS = [
  { id: "tiger", src: "./assets/avatar-tiger.jpg", label: "Тигр" },
  { id: "raccoon", src: "./assets/avatar-raccoon.jpg", label: "Енот" },
  { id: "skull", src: "./assets/avatar-skull.jpg", label: "Череп" },
  { id: "phoenix", src: "./assets/avatar-phoenix.jpg", label: "Феникс" },
  { id: "octopus", src: "./assets/avatar-octopus.jpg", label: "Осьминог" },
  { id: "cat", src: "./assets/avatar-cat.jpg", label: "Кот" },
  { id: "robot", src: "./assets/avatar-robot.jpg", label: "Робот" },
  { id: "bulldog", src: "./assets/avatar-bulldog.jpg", label: "Бульдог" },
  { id: "monkey", src: "./assets/daily-poker-monkey.webp", label: "Обезьяна" },
  { id: "fox", src: "./assets/avatar-fox.jpg", label: "Лис" },
  { id: "chip", src: "./assets/avatar-chip.jpg", label: "Фишка" },
  { id: "koala", src: "./assets/avatar-koala.jpg", label: "Коала" },
  { id: "raven", src: "./assets/avatar-raven.jpg", label: "Ворон" },
  { id: "crocodile", src: "./assets/avatar-crocodile.jpg", label: "Крокодил" },
  { id: "rabbit", src: "./assets/avatar-rabbit.jpg", label: "Кролик" },
  { id: "chameleon", src: "./assets/avatar-chameleon.jpg", label: "Хамелеон" },
  { id: "panda", src: "./assets/avatar-panda.jpg", label: "Панда" },
  { id: "wolf", src: "./assets/avatar-wolf.jpg", label: "Волк" },
  { id: "owl", src: "./assets/avatar-owl.jpg", label: "Сова" },
  { id: "bat", src: "./assets/avatar-bat.jpg", label: "Летучая мышь" },
  { id: "gorilla", src: "./assets/avatar-gorilla.jpg", label: "Горилла" },
];

function pokerAvatarCacheStorageKey() {
  try {
    var id =
      typeof window.pokerResolveMyChatMemberId === "function"
        ? window.pokerResolveMyChatMemberId()
        : "";
    id = id != null ? String(id).trim() : "";
    return id ? "poker_avatar_data_v2:" + id : "";
  } catch (eK) {
    return "";
  }
}

function pokerAvatarCacheStorageKeys() {
  var keys = [];
  var userKey = pokerAvatarCacheStorageKey();
  if (userKey) keys.push(userKey);
  keys.push(POKER_AVATAR_LAST_SELF_CACHE_KEY);
  return keys;
}

function pokerAvatarCacheStorages() {
  var stores = [];
  try {
    if (typeof localStorage !== "undefined") stores.push(localStorage);
  } catch (eLocalAvatarStore) {}
  try {
    if (typeof sessionStorage !== "undefined") stores.push(sessionStorage);
  } catch (eSessionAvatarStore) {}
  return stores;
}

function pokerFindPresetAvatarById(id) {
  id = id != null ? String(id).trim() : "";
  if (!id) return null;
  for (var i = 0; i < POKER_PROFILE_AVATAR_PRESETS.length; i++) {
    if (POKER_PROFILE_AVATAR_PRESETS[i].id === id) return POKER_PROFILE_AVATAR_PRESETS[i];
  }
  return null;
}

function pokerFindPresetAvatarIdBySrc(src) {
  src = src != null ? String(src) : "";
  if (!src) return "";
  for (var i = 0; i < POKER_PROFILE_AVATAR_PRESETS.length; i++) {
    var preset = POKER_PROFILE_AVATAR_PRESETS[i];
    var filename = preset.src.split("/").pop();
    if (src.indexOf(preset.src) >= 0 || (filename && src.indexOf(filename) >= 0)) return preset.id;
  }
  return "";
}

function pokerReadAvatarCacheEntry() {
  var keys = pokerAvatarCacheStorageKeys();
  var stores = pokerAvatarCacheStorages();
  var emptyEntry = null;
  for (var s = 0; s < stores.length; s++) {
    for (var i = 0; i < keys.length; i++) {
      try {
        var raw = stores[s].getItem(keys[i]);
        if (!raw) continue;
        var o = JSON.parse(raw);
        if (!o || typeof o.t !== "number") continue;
        if (Date.now() - o.t > POKER_AVATAR_CACHE_TTL_MS) continue;
        var entry = { avatar: o.a ? String(o.a) : "", t: o.t };
        if (entry.avatar) return entry;
        if (!emptyEntry) emptyEntry = entry;
      } catch (eR) {}
    }
  }
  return emptyEntry;
}

function pokerWriteAvatarCacheEntry(avatarDataUrlOrEmpty) {
  var keys = pokerAvatarCacheStorageKeys();
  var stores = pokerAvatarCacheStorages();
  if (!stores.length) return;
  var avatarValue = avatarDataUrlOrEmpty ? String(avatarDataUrlOrEmpty) : "";
  var payload = JSON.stringify({
    a: avatarValue,
    t: Date.now(),
  });
  for (var s = 0; s < stores.length; s++) {
    for (var i = 0; i < keys.length; i++) {
      if (keys[i] === POKER_AVATAR_LAST_SELF_CACHE_KEY && !avatarValue) continue;
      try {
        stores[s].setItem(keys[i], payload);
      } catch (eW) {}
    }
  }
  try {
    window.dispatchEvent(new CustomEvent("poker-profile-avatar-change", { detail: { avatar: avatarValue } }));
  } catch (eAvatarEvent) {}
}

function pokerApplyProfileAvatarMirror(src) {
  var m = document.getElementById("profileAvatarMirror");
  if (!m) return;
  if (src) {
    m.src = src;
    m.alt = "Покерист";
    return;
  }
  try {
    m.removeAttribute("src");
  } catch (eMirror) {}
}

function loadHeaderAvatar() {
  var avatarEl = document.getElementById("authUserAvatar");
  if (!avatarEl) return;
  function applyTelegramPhotoFallback() {
    try {
      var au = window.__pokerTelegramAuth;
      if (au && au.user && au.user.photo_url && String(au.user.photo_url).indexOf("http") === 0) {
        avatarEl.src = au.user.photo_url;
        avatarEl.alt = "Аватар";
        avatarEl.style.display = "";
        return true;
      }
    } catch (eA) {}
    return false;
  }
  var base = getApiBase();
  if (!base || (typeof pokerApiHasCredential === "function" && !pokerApiHasCredential())) {
    if (!applyTelegramPhotoFallback()) avatarEl.style.display = "none";
    return;
  }
  var cached = pokerReadAvatarCacheEntry();
  if (cached) {
    if (cached.avatar) {
      avatarEl.src = cached.avatar;
      avatarEl.alt = "Аватар";
      avatarEl.style.display = "";
      return;
    }
    if (applyTelegramPhotoFallback()) return;
    avatarEl.removeAttribute("src");
    avatarEl.style.display = "none";
    return;
  }
  var hq = typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("?") : "?initData=";
  var tsSep = hq.indexOf("?") === 0 ? "&" : "?";
  fetch(base + "/api/avatar" + hq + tsSep + "_ts=" + Date.now(), { cache: "no-store" })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (data && data.ok) {
        pokerWriteAvatarCacheEntry(data.avatar || "");
      }
      if (data && data.ok && data.avatar) {
        avatarEl.src = data.avatar;
        avatarEl.alt = "Аватар";
        avatarEl.style.display = "";
        return;
      }
      if (!applyTelegramPhotoFallback()) {
        avatarEl.removeAttribute("src");
        avatarEl.style.display = "none";
      }
    })
    .catch(function () {
      if (!applyTelegramPhotoFallback()) avatarEl.style.display = "none";
    });
}

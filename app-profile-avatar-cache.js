/** Плейсхолдер профиля: лёгкий JPEG (~18 KB), не полноразмерный PNG. */
var POKER_PROFILE_AVATAR_PLACEHOLDER = "./assets/profile-pokerist.jpg";
var POKER_AVATAR_CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000;
var POKER_AVATAR_LAST_SELF_CACHE_KEY = "poker_avatar_data_v2:last_self";
var POKER_PROFILE_AVATAR_PRESETS = [
  { id: "tiger", src: "./assets/avatar-tiger-display-v1.webp", label: "Тигр" },
  { id: "raccoon", src: "./assets/avatar-raccoon-display-v1.webp", label: "Енот" },
  { id: "skull", src: "./assets/avatar-skull-display-v1.webp", label: "Череп" },
  { id: "phoenix", src: "./assets/avatar-phoenix-display-v1.webp", label: "Феникс" },
  { id: "octopus", src: "./assets/avatar-octopus-display-v1.webp", label: "Осьминог" },
  { id: "cat", src: "./assets/avatar-cat-display-v1.webp", label: "Кот" },
  { id: "robot", src: "./assets/avatar-robot-display-v1.webp", label: "Робот" },
  { id: "bulldog", src: "./assets/avatar-bulldog-display-v1.webp", label: "Бульдог" },
  { id: "monkey", src: "./assets/daily-poker-monkey-display-v1.webp", label: "Обезьяна" },
  { id: "fox", src: "./assets/avatar-fox-display-v1.webp", label: "Лис" },
  { id: "chip", src: "./assets/avatar-chip-display-v1.webp", label: "Фишка" },
  { id: "koala", src: "./assets/avatar-koala-display-v1.webp", label: "Коала" },
  { id: "raven", src: "./assets/avatar-raven-display-v1.webp", label: "Ворон" },
  { id: "crocodile", src: "./assets/avatar-crocodile-display-v1.webp", label: "Крокодил" },
  { id: "rabbit", src: "./assets/avatar-rabbit-display-v1.webp", label: "Кролик" },
  { id: "chameleon", src: "./assets/avatar-chameleon-display-v1.webp", label: "Хамелеон" },
  { id: "panda", src: "./assets/avatar-panda-display-v1.webp", label: "Панда" },
  { id: "wolf", src: "./assets/avatar-wolf-display-v1.webp", label: "Волк" },
  { id: "owl", src: "./assets/avatar-owl-display-v1.webp", label: "Сова" },
  { id: "bat", src: "./assets/avatar-bat-display-v1.webp", label: "Летучая мышь" },
  { id: "gorilla", src: "./assets/avatar-gorilla-display-v1.webp", label: "Горилла" },
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

/** Плейсхолдер профиля: лёгкий JPEG (~18 KB), не полноразмерный PNG. */
var POKER_PROFILE_AVATAR_PLACEHOLDER = "./assets/profile-pokerist.jpg";
var POKER_AVATAR_CACHE_TTL_MS = 20 * 60 * 1000;
var POKER_PROFILE_AVATAR_PRESETS = [
  { id: "tiger", src: "./assets/avatar-tiger.jpg", label: "Тигр" },
  { id: "raccoon", src: "./assets/avatar-raccoon.jpg", label: "Енот" },
  { id: "skull", src: "./assets/avatar-skull.jpg", label: "Череп" },
  { id: "phoenix", src: "./assets/avatar-phoenix.jpg", label: "Феникс" },
  { id: "octopus", src: "./assets/avatar-octopus.jpg", label: "Осьминог" },
  { id: "cat", src: "./assets/avatar-cat.jpg", label: "Кот" },
  { id: "robot", src: "./assets/avatar-robot.jpg", label: "Робот" },
  { id: "bulldog", src: "./assets/avatar-bulldog.jpg", label: "Бульдог" },
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
  var k = pokerAvatarCacheStorageKey();
  if (!k || typeof sessionStorage === "undefined") return null;
  try {
    var raw = sessionStorage.getItem(k);
    if (!raw) return null;
    var o = JSON.parse(raw);
    if (!o || typeof o.t !== "number") return null;
    if (Date.now() - o.t > POKER_AVATAR_CACHE_TTL_MS) return null;
    return { avatar: o.a ? String(o.a) : "", t: o.t };
  } catch (eR) {
    return null;
  }
}

function pokerWriteAvatarCacheEntry(avatarDataUrlOrEmpty) {
  var k = pokerAvatarCacheStorageKey();
  if (!k || typeof sessionStorage === "undefined") return;
  try {
    sessionStorage.setItem(
      k,
      JSON.stringify({
        a: avatarDataUrlOrEmpty ? String(avatarDataUrlOrEmpty) : "",
        t: Date.now(),
      })
    );
  } catch (eW) {}
}

function pokerApplyProfileAvatarMirror(src) {
  var m = document.getElementById("profileAvatarMirror");
  if (m && src) {
    m.src = src;
    m.alt = "Покерист";
  }
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

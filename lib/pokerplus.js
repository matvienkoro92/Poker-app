const crypto = require("crypto");
const { redisPipeline } = require("./account-id");

const POKERPLUS_BASE_URL = String(process.env.POKERPLUS_BASE_URL || "https://sp.poker21pro.com/service_v1").replace(/\/$/, "");
const POKERPLUS_MERCHANT_ID = String(process.env.POKERPLUS_MERCHANT_ID || "").trim();
const POKERPLUS_SECRET_KEY = String(process.env.POKERPLUS_SECRET_KEY || "").trim();
const POKERPLUS_STORAGE_SECRET = String(
  process.env.POKERPLUS_STORAGE_SECRET || process.env.POKERPLUS_CIPHERTEXT_SECRET || ""
).trim();

const TOKEN_CACHE_KEY = "poker_app:pokerplus:token";
const BIND_HASH_KEY = "poker_app:pokerplus_user_ids";
const BIND_AT_HASH_KEY = "poker_app:pokerplus_bound_at";
const PROFILE_HASH_KEY = "poker_app:pokerplus_profiles";
const PROFILE_SYNC_AT_HASH_KEY = "poker_app:pokerplus_profiles_synced_at";
const EMAIL_HASH_KEY = "poker_app:pokerplus_emails";
const CIPHERTEXT_HASH_KEY = "poker_app:pokerplus_ciphertexts";
const TELEGRAM_HASH_KEY = "poker_app:pokerplus_telegram_values";
const ENCRYPTED_PREFIX = "enc:v1:";
const KEY_BIND_FIELD_NAMES = Object.freeze(["ciphertext", "cipherText", "key", "code"]);
const CYRILLIC_KEY_LOOKALIKE_MAP = Object.freeze({
  "\u0410": "A",
  "\u0412": "B",
  "\u0415": "E",
  "\u041a": "K",
  "\u041c": "M",
  "\u041d": "H",
  "\u041e": "O",
  "\u0420": "P",
  "\u0421": "C",
  "\u0422": "T",
  "\u0423": "Y",
  "\u0425": "X",
  "\u0430": "a",
  "\u0432": "b",
  "\u0435": "e",
  "\u043a": "k",
  "\u043c": "m",
  "\u043d": "h",
  "\u043e": "o",
  "\u0440": "p",
  "\u0441": "c",
  "\u0442": "t",
  "\u0443": "y",
  "\u0445": "x",
});

function hasPokerPlusConfig() {
  return !!(POKERPLUS_BASE_URL && POKERPLUS_MERCHANT_ID && POKERPLUS_SECRET_KEY);
}

function normalizePokerPlusUserAppId(value) {
  return String(value || "").trim().replace(/^tg_/, "");
}

function normalizePokerPlusCiphertext(value) {
  return String(value || "")
    .replace(/\s+/g, "")
    .trim()
    .replace(/[\u0410\u0412\u0415\u041a\u041c\u041d\u041e\u0420\u0421\u0422\u0423\u0425\u0430\u0432\u0435\u043A\u043C\u043D\u043E\u0440\u0441\u0442\u0443\u0445]/g, function (ch) {
      return CYRILLIC_KEY_LOOKALIKE_MAP[ch] || ch;
    });
}

function buildPokerPlusUserAppIdVariants(value) {
  const input = Array.isArray(value) ? value : [value];
  const seen = new Set();
  const variants = [];
  input.forEach(function (item) {
    const normalized = normalizePokerPlusUserAppId(item);
    if (!normalized || seen.has(normalized)) return;
    seen.add(normalized);
    variants.push(normalized);
  });
  return variants;
}

function buildPokerPlusKeyBindUserAppIdVariants(value) {
  const variants = [""].concat(buildPokerPlusUserAppIdVariants(value));
  const seen = new Set();
  return variants.filter(function (item) {
    const normalized = String(item || "").trim();
    if (seen.has(normalized)) return false;
    seen.add(normalized);
    return true;
  });
}

function getCipherStorageKey() {
  if (!POKERPLUS_STORAGE_SECRET) return null;
  return crypto.createHash("sha256").update(POKERPLUS_STORAGE_SECRET).digest();
}

function encryptStoredCiphertext(ciphertext) {
  const key = getCipherStorageKey();
  if (!key) return "";
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const enc = Buffer.concat([cipher.update(String(ciphertext || ""), "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return ENCRYPTED_PREFIX + iv.toString("base64") + "." + tag.toString("base64") + "." + enc.toString("base64");
}

function decryptStoredCiphertext(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  if (raw.indexOf(ENCRYPTED_PREFIX) !== 0) return raw;
  const key = getCipherStorageKey();
  if (!key) return "";
  const payload = raw.slice(ENCRYPTED_PREFIX.length);
  const parts = payload.split(".");
  if (parts.length !== 3) {
    const err = new Error("PokerPlus ciphertext payload is invalid");
    err.statusCode = 500;
    throw err;
  }
  const iv = Buffer.from(parts[0], "base64");
  const tag = Buffer.from(parts[1], "base64");
  const enc = Buffer.from(parts[2], "base64");
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(enc), decipher.final()]).toString("utf8");
}

async function postForm(endpoint, payload) {
  const form = new FormData();
  Object.keys(payload || {}).forEach(function (key) {
    if (payload[key] == null) return;
    form.append(key, String(payload[key]));
  });
  const res = await fetch(POKERPLUS_BASE_URL + "/" + endpoint, {
    method: "POST",
    body: form,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error("PokerPlus HTTP " + res.status);
    err.statusCode = res.status;
    err.payload = data;
    throw err;
  }
  return data;
}

function unwrapSuccessResponse(data, fallbackMessage) {
  if (data && Number(data.status) === 1) return data.data || {};
  const err = new Error(
    (data && (data.message || data.error || data.msg)) || fallbackMessage || "PokerPlus request failed"
  );
  err.statusCode = 502;
  err.payload = data;
  throw err;
}

async function readCachedToken() {
  const pipe = await redisPipeline([["GET", TOKEN_CACHE_KEY]]);
  const value = pipe && pipe[0] && pipe[0].result != null ? String(pipe[0].result).trim() : "";
  return value || "";
}

async function writeCachedToken(token) {
  if (!token) return;
  await redisPipeline([["SETEX", TOKEN_CACHE_KEY, "28740", String(token)]]);
}

async function getPokerPlusToken(forceRefresh) {
  if (!hasPokerPlusConfig()) {
    const err = new Error("PokerPlus is not configured");
    err.statusCode = 500;
    throw err;
  }
  if (!forceRefresh) {
    const cached = await readCachedToken();
    if (cached) return cached;
  }
  const tokenResp = await postForm("getToken", {
    merchantId: POKERPLUS_MERCHANT_ID,
    secretKey: POKERPLUS_SECRET_KEY,
  });
  const tokenData = unwrapSuccessResponse(tokenResp, "PokerPlus token request failed");
  const token = tokenData && tokenData.token ? String(tokenData.token).trim() : "";
  if (!token) {
    const err = new Error("PokerPlus token is empty");
    err.statusCode = 502;
    throw err;
  }
  await writeCachedToken(token);
  return token;
}

async function requestWithToken(endpoint, payload, retryOnAuthError) {
  const token = await getPokerPlusToken(false);
  try {
    const res = await postForm(endpoint, Object.assign({}, payload || {}, { token }));
    return unwrapSuccessResponse(res, "PokerPlus request failed");
  } catch (err) {
    if (retryOnAuthError !== false) {
      const msg = String((err && err.payload && err.payload.message) || err.message || "").toLowerCase();
      if (msg.indexOf("token") !== -1 || msg.indexOf("expired") !== -1 || msg.indexOf("invalid") !== -1) {
        const freshToken = await getPokerPlusToken(true);
        const retryRes = await postForm(endpoint, Object.assign({}, payload || {}, { token: freshToken }));
        return unwrapSuccessResponse(retryRes, "PokerPlus request failed");
      }
    }
    throw err;
  }
}

function normalizeCounter(data) {
  const total = data && typeof data === "object" && !Array.isArray(data) ? data : {};
  return {
    fee: total.fee != null ? Number(total.fee) : null,
    mttWinnings: total.mtt_winnings != null ? Number(total.mtt_winnings) : null,
    sngWinnings: total.sng_winnings != null ? Number(total.sng_winnings) : null,
    hands: total.hands != null ? Number(total.hands) : null,
    winnings: total.winnings != null ? Number(total.winnings) : null,
    bb: total.bb != null ? Number(total.bb) : null,
    ofcWinnings: total.ofc_winnings != null ? Number(total.ofc_winnings) : null,
  };
}

function normalizePlayerProfile(data, linkedUserId) {
  return {
    linked: true,
    pokerPlusUserId: data && data.Id != null ? String(data.Id).trim() : linkedUserId || null,
    nickname: data && data.Nike != null ? String(data.Nike).trim() : "",
    avatarUrl: data && data.HeadImageUrl != null ? String(data.HeadImageUrl).trim() : "",
    leagueId: data && data.league_id != null ? String(data.league_id).trim() : "",
    groupId: data && data.group_id != null ? String(data.group_id).trim() : "",
    registerDate: data && data.RegisterDate != null ? String(data.RegisterDate).trim() : "",
    position: data && data.position != null ? String(data.position).trim() : "",
    balance: data && data.gold != null ? String(data.gold).trim() : "",
    lastLoginDate: data && data.LastLoginDate != null ? String(data.LastLoginDate).trim() : "",
    lastLoginIp: data && data.LastLoginIp != null ? String(data.LastLoginIp).trim() : "",
    country: data && data.Country != null ? String(data.Country).trim() : "",
    role: data && data.Role != null ? String(data.Role).trim() : "",
    email: data && data.email != null ? String(data.email).trim() : "",
    totalCounter: normalizeCounter(data && data.total_counter),
    todayCounter: normalizeCounter(data && data.today_counter),
    weekCounter: normalizeCounter(data && data.week_counter),
  };
}

function isPokerPlusPlayerNotFoundError(err) {
  const raw = String(
    (err && err.payload && (err.payload.message || err.payload.error || err.payload.msg)) ||
      (err && err.message) ||
      ""
  );
  return /player data not found/i.test(raw);
}

function isPokerPlusBindingFailedError(err) {
  const raw = String(
    (err && err.payload && (err.payload.message || err.payload.error || err.payload.msg)) ||
      (err && err.message) ||
      ""
  );
  return /\bbinding failed\b/i.test(raw) || /\bbind failed\b/i.test(raw);
}

function isPokerPlusParameterError(err) {
  const raw = String(
    (err && err.payload && (err.payload.message || err.payload.error || err.payload.msg)) ||
      (err && err.message) ||
      ""
  );
  return /parameter error|param(?:eter)? invalid|invalid param/i.test(raw);
}

function isPokerPlusNoBindingInfoError(err) {
  const raw = String(
    (err && err.payload && (err.payload.message || err.payload.error || err.payload.msg)) ||
      (err && err.message) ||
      ""
  );
  return /no binding information/i.test(raw);
}

function buildEmailCaseVariants(email) {
  const raw = String(email || "").trim().slice(0, 190);
  if (!raw) return [];
  const at = raw.indexOf("@");
  if (at <= 0) return [raw];
  const local = raw.slice(0, at);
  const domain = raw.slice(at + 1);
  const lowerLocal = local.toLowerCase();
  const lowerDomain = domain.toLowerCase();
  const titleLocal = lowerLocal.replace(/(^|[._+-])([a-z])/g, function (_, prefix, letter) {
    return prefix + letter.toUpperCase();
  });
  const variants = [
    raw,
    lowerLocal + "@" + lowerDomain,
    local + "@" + lowerDomain,
    lowerLocal.charAt(0).toUpperCase() + lowerLocal.slice(1) + "@" + lowerDomain,
    titleLocal + "@" + lowerDomain,
    lowerLocal.toUpperCase() + "@" + lowerDomain,
  ];
  const seen = new Set();
  return variants.filter(function (item) {
    const value = String(item || "").trim().slice(0, 190);
    if (!value || seen.has(value)) return false;
    seen.add(value);
    return true;
  });
}

function buildRefreshEmailVariants(email) {
  const input = Array.isArray(email) ? email : [email];
  const seen = new Set();
  const variants = [];
  input.forEach(function (item) {
    buildEmailCaseVariants(item).forEach(function (variant) {
      const value = String(variant || "").trim().slice(0, 190);
      if (!value || seen.has(value)) return;
      seen.add(value);
      variants.push(value);
    });
  });
  return variants;
}

function buildBindEmailVariants(email) {
  const variants = buildRefreshEmailVariants(email);
  const seen = new Set();
  return [""].concat(variants).filter(function (item) {
    const value = String(item || "").trim().slice(0, 190);
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
}

function isPokerPlusBindRetryableError(err) {
  return isPokerPlusBindingFailedError(err) || isPokerPlusPlayerNotFoundError(err) || isPokerPlusParameterError(err);
}

function pokerPlusBindAttemptErrorMessage(err) {
  return String(
    (err && err.payload && (err.payload.message || err.payload.error || err.payload.msg)) ||
      (err && err.message) ||
      "PokerPlus bind failed"
  );
}

function attachPokerPlusBindAttempts(err, attempts) {
  if (err && attempts && attempts.length) {
    err.pokerPlusBindAttempts = attempts.slice(-20);
  }
  return err;
}

function buildPokerPlusKeyBindMetadataVariants(userAppIdVariants, emailVariants) {
  const users = Array.isArray(userAppIdVariants) ? userAppIdVariants : [userAppIdVariants];
  const emails = Array.isArray(emailVariants) ? emailVariants : [emailVariants];
  const seen = new Set();
  const result = [];
  function push(userAppId, mail) {
    const normalizedUserAppId = normalizePokerPlusUserAppId(userAppId);
    const normalizedMail = String(mail || "").trim().slice(0, 190);
    const key = normalizedUserAppId + "\n" + normalizedMail;
    if (seen.has(key)) return;
    seen.add(key);
    result.push({ userAppId: normalizedUserAppId, mail: normalizedMail });
  }
  push("", "");
  emails.forEach(function (mail) {
    if (String(mail || "").trim()) push("", mail);
  });
  users.forEach(function (userAppId) {
    const normalizedUserAppId = normalizePokerPlusUserAppId(userAppId);
    if (!normalizedUserAppId) return;
    push(normalizedUserAppId, "");
    emails.forEach(function (mail) {
      if (String(mail || "").trim()) push(normalizedUserAppId, mail);
    });
  });
  return result;
}

function pokerPlusKeyBindPayload(userAppId, ciphertext, mail, keyField) {
  const field = KEY_BIND_FIELD_NAMES.indexOf(keyField) !== -1 ? keyField : KEY_BIND_FIELD_NAMES[0];
  const payload = {};
  payload[field] = ciphertext;
  const normalizedMail = String(mail || "").trim().slice(0, 190);
  if (normalizedMail) payload.mail = normalizedMail;
  const normalizedUserAppId = normalizePokerPlusUserAppId(userAppId);
  if (normalizedUserAppId) payload.user_app_id = normalizedUserAppId;
  return payload;
}

async function requestPokerPlusKeyBindVariants(userAppId, ciphertext, email) {
  const userAppIdVariants = buildPokerPlusKeyBindUserAppIdVariants(userAppId);
  const normalizedCiphertext = normalizePokerPlusCiphertext(ciphertext);
  const emailVariants = buildBindEmailVariants(email);
  if (!normalizedCiphertext) {
    const err = new Error("PokerPlus bind requires a key");
    err.statusCode = 400;
    throw err;
  }
  const metadataVariants = buildPokerPlusKeyBindMetadataVariants(userAppIdVariants, emailVariants);
  const attempts = [];
  let data = null;
  let matchedUserAppId = "";
  let matchedEmail = "";
  let matchedKeyField = KEY_BIND_FIELD_NAMES[0];
  let lastErr = null;
  for (let i = 0; i < metadataVariants.length && !data; i += 1) {
    const meta = metadataVariants[i];
    const keyFields = i === 0 ? KEY_BIND_FIELD_NAMES : [KEY_BIND_FIELD_NAMES[0]];
    for (let f = 0; f < keyFields.length; f += 1) {
      const keyField = keyFields[f];
      try {
        data = await requestWithToken(
          "getBindMiniAppPlayer",
          pokerPlusKeyBindPayload(meta.userAppId, normalizedCiphertext, meta.mail, keyField)
        );
        matchedUserAppId = meta.userAppId;
        matchedEmail = meta.mail;
        matchedKeyField = keyField;
        break;
      } catch (err) {
        lastErr = err;
        attempts.push({
          keyField,
          userAppId: meta.userAppId ? "present" : "omitted",
          mail: meta.mail ? "present" : "omitted",
          error: pokerPlusBindAttemptErrorMessage(err),
        });
        if (!isPokerPlusBindRetryableError(err)) throw attachPokerPlusBindAttempts(err, attempts);
      }
    }
  }
  if (!data) throw attachPokerPlusBindAttempts(lastErr || new Error("PokerPlus bind failed"), attempts);
  return {
    data,
    matchedEmail,
    matchedKeyField,
    matchedUserAppId,
    normalizedCiphertext,
  };
}

async function saveBoundPokerPlusUserId(accountId, pokerPlusUserId, options) {
  if (!accountId) return;
  if (pokerPlusUserId) {
    const commands = [["HSET", BIND_HASH_KEY, accountId, String(pokerPlusUserId)]];
    if (!options || options.recordBoundAt !== false) commands.push(["HSETNX", BIND_AT_HASH_KEY, accountId, String(Date.now())]);
    await redisPipeline(commands);
  } else {
    await redisPipeline([
      ["HDEL", BIND_HASH_KEY, accountId],
      ["HDEL", BIND_AT_HASH_KEY, accountId],
    ]);
  }
}

async function readBoundPokerPlusUserId(accountId) {
  if (!accountId) return "";
  const pipe = await redisPipeline([["HGET", BIND_HASH_KEY, accountId]]);
  return pipe && pipe[0] && pipe[0].result != null ? String(pipe[0].result).trim() : "";
}

async function savePokerPlusProfile(accountId, profile) {
  if (!accountId || !profile) return;
  await redisPipeline([
    ["HSET", PROFILE_HASH_KEY, accountId, JSON.stringify(profile)],
    ["HSET", PROFILE_SYNC_AT_HASH_KEY, accountId, String(Date.now())],
  ]);
}

async function savePokerPlusEmail(accountId, email) {
  if (!accountId) return;
  const normalized = String(email || "").trim().slice(0, 190);
  if (normalized) {
    await redisPipeline([["HSET", EMAIL_HASH_KEY, accountId, normalized]]);
  } else {
    await redisPipeline([["HDEL", EMAIL_HASH_KEY, accountId]]);
  }
}

async function readPokerPlusEmail(accountId) {
  if (!accountId) return "";
  const pipe = await redisPipeline([["HGET", EMAIL_HASH_KEY, accountId]]);
  return pipe && pipe[0] && pipe[0].result != null ? String(pipe[0].result).trim() : "";
}

async function savePokerPlusTelegramValue(accountId, telegramValue) {
  if (!accountId) return;
  const normalized = String(telegramValue || "").trim();
  if (normalized) {
    await redisPipeline([["HSET", TELEGRAM_HASH_KEY, accountId, normalized]]);
  } else {
    await redisPipeline([["HDEL", TELEGRAM_HASH_KEY, accountId]]);
  }
}

async function readPokerPlusTelegramValue(accountId) {
  if (!accountId) return "";
  const pipe = await redisPipeline([["HGET", TELEGRAM_HASH_KEY, accountId]]);
  return pipe && pipe[0] && pipe[0].result != null ? String(pipe[0].result).trim() : "";
}

async function savePokerPlusCiphertext(accountId, ciphertext) {
  if (!accountId) return;
  const normalized = normalizePokerPlusCiphertext(ciphertext);
  if (normalized) {
    const encrypted = encryptStoredCiphertext(normalized);
    if (!encrypted) {
      await redisPipeline([["HDEL", CIPHERTEXT_HASH_KEY, accountId]]);
      return;
    }
    await redisPipeline([["HSET", CIPHERTEXT_HASH_KEY, accountId, encrypted]]);
  } else {
    await redisPipeline([["HDEL", CIPHERTEXT_HASH_KEY, accountId]]);
  }
}

async function readPokerPlusCiphertext(accountId) {
  if (!accountId) return "";
  const pipe = await redisPipeline([["HGET", CIPHERTEXT_HASH_KEY, accountId]]);
  const raw = pipe && pipe[0] && pipe[0].result != null ? String(pipe[0].result).trim() : "";
  return normalizePokerPlusCiphertext(decryptStoredCiphertext(raw));
}

async function readPokerPlusProfile(accountId) {
  if (!accountId) return null;
  const pipe = await redisPipeline([
    ["HGET", PROFILE_HASH_KEY, accountId],
    ["HGET", PROFILE_SYNC_AT_HASH_KEY, accountId],
  ]);
  const raw = pipe && pipe[0] && pipe[0].result != null ? String(pipe[0].result) : "";
  if (!raw) return null;
  let parsed = null;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    parsed = null;
  }
  if (!parsed || typeof parsed !== "object") return null;
  const syncedAtRaw = pipe && pipe[1] && pipe[1].result != null ? String(pipe[1].result).trim() : "";
  if (syncedAtRaw) parsed.syncedAt = Number(syncedAtRaw) || null;
  return parsed;
}

async function clearPokerPlusBinding(accountId) {
  if (!accountId) return;
  await redisPipeline([
    ["HDEL", BIND_HASH_KEY, accountId],
    ["HDEL", BIND_AT_HASH_KEY, accountId],
    ["HDEL", PROFILE_HASH_KEY, accountId],
    ["HDEL", PROFILE_SYNC_AT_HASH_KEY, accountId],
    ["HDEL", EMAIL_HASH_KEY, accountId],
    ["HDEL", CIPHERTEXT_HASH_KEY, accountId],
    ["HDEL", TELEGRAM_HASH_KEY, accountId],
  ]);
}

async function bindMiniAppPlayer(accountId, userAppId, ciphertext, email) {
  const bindResult = await requestPokerPlusKeyBindVariants(userAppId, ciphertext, email);
  const data = bindResult.data;
  const matchedUserAppId = bindResult.matchedUserAppId;
  const matchedEmail = bindResult.matchedEmail;
  const normalizedCiphertext = bindResult.normalizedCiphertext;
  const pokerPlusUserId =
    data && data.Id != null ? String(data.Id).trim() : data && data.userId != null ? String(data.userId).trim() : "";
  if (!pokerPlusUserId) {
    const err = new Error("PokerPlus bind returned empty userId");
    err.statusCode = 502;
    throw err;
  }
  await saveBoundPokerPlusUserId(accountId, pokerPlusUserId);
  await savePokerPlusEmail(accountId, matchedEmail);
  await savePokerPlusCiphertext(accountId, normalizedCiphertext);
  await savePokerPlusTelegramValue(accountId, matchedUserAppId);
  const normalized = normalizePlayerProfile(
    Object.assign({}, data, { email: matchedEmail }),
    pokerPlusUserId
  );
  await savePokerPlusProfile(accountId, normalized);
  return normalized;
}

async function fetchPlayerInfo(accountId, fallbackUserAppId, fallbackEmail) {
  const savedTelegramValue = await readPokerPlusTelegramValue(accountId);
  const savedEmail = await readPokerPlusEmail(accountId);
  return refreshMiniAppPlayer(accountId, [savedTelegramValue].concat(Array.isArray(fallbackUserAppId) ? fallbackUserAppId : [fallbackUserAppId]), [savedEmail, fallbackEmail]);
}

async function refreshMiniAppPlayer(accountId, userAppId, email) {
  const emailVariants = buildRefreshEmailVariants(email);
  const savedEmail = emailVariants[0] || "";
  const userAppIdVariants = buildPokerPlusUserAppIdVariants(userAppId);
  let savedCiphertext = "";
  const linkedUserId = await readBoundPokerPlusUserId(accountId);
  if (!savedEmail) {
    savedCiphertext = await readPokerPlusCiphertext(accountId);
    if (!savedCiphertext && !linkedUserId) {
      const err = new Error("Для обновления PokerPlus сначала привяжите email или используйте ключ PokerPlus.");
      err.statusCode = 400;
      throw err;
    }
  }
  if (!userAppIdVariants.length) {
    if (!savedCiphertext) savedCiphertext = await readPokerPlusCiphertext(accountId);
  }
  if (!userAppIdVariants.length && !savedCiphertext) {
    const cached = await readPokerPlusProfile(accountId);
    if (cached) return cached;
    const err = new Error("PokerPlus refresh requires a saved Telegram ID");
    err.statusCode = 400;
    throw err;
  }
  const refreshEmails = savedEmail ? emailVariants : [""];
  let data = null;
  let matchedEmail = savedEmail;
  let matchedUserAppId = userAppIdVariants[0] || "";
  let lastErr = null;
  if (savedEmail) {
    for (let u = 0; u < userAppIdVariants.length && !data; u += 1) {
      const candidateUserAppId = userAppIdVariants[u];
      for (let i = 0; i < refreshEmails.length; i += 1) {
        const candidateEmail = refreshEmails[i];
        try {
          data = await requestWithToken("getBindMiniAppPlayer", {
            user_app_id: candidateUserAppId,
            mail: candidateEmail,
          });
          matchedEmail = candidateEmail;
          matchedUserAppId = candidateUserAppId;
          break;
        } catch (err) {
          lastErr = err;
          if (isPokerPlusBindingFailedError(err)) continue;
          if (!isPokerPlusPlayerNotFoundError(err)) throw err;
        }
      }
    }
  }
  if (!data) {
    if (!savedCiphertext) savedCiphertext = await readPokerPlusCiphertext(accountId);
    if (savedCiphertext) {
      try {
        const bindResult = await requestPokerPlusKeyBindVariants(userAppIdVariants, savedCiphertext, refreshEmails);
        data = bindResult.data;
        matchedEmail = bindResult.matchedEmail;
        matchedUserAppId = bindResult.matchedUserAppId;
      } catch (err) {
        lastErr = err;
        if (!isPokerPlusBindRetryableError(err)) throw err;
      }
    }
  }
  if (!data) throw lastErr;
  const pokerPlusUserId =
    data && data.Id != null ? String(data.Id).trim() : data && data.userId != null ? String(data.userId).trim() : linkedUserId || "";
  if (!pokerPlusUserId) {
    const err = new Error("PokerPlus refresh returned empty userId");
    err.statusCode = 502;
    throw err;
  }
  await savePokerPlusTelegramValue(accountId, matchedUserAppId);
  await saveBoundPokerPlusUserId(accountId, pokerPlusUserId, { recordBoundAt: false });
  await savePokerPlusEmail(accountId, matchedEmail);
  const normalized = normalizePlayerProfile(Object.assign({}, data, { email: matchedEmail || "" }), pokerPlusUserId);
  await savePokerPlusProfile(accountId, normalized);
  return normalized;
}

async function unbindMiniAppPlayer(accountId) {
  const linkedUserId = await readBoundPokerPlusUserId(accountId);
  const savedTelegramValue = await readPokerPlusTelegramValue(accountId);
  if (!linkedUserId) {
    await clearPokerPlusBinding(accountId);
    return "";
  }
  const normalizedUserAppId = normalizePokerPlusUserAppId(savedTelegramValue);
  if (!normalizedUserAppId) {
    await clearPokerPlusBinding(accountId);
    return linkedUserId;
  }
  let data = null;
  try {
    data = await requestWithToken("unBindMiniAppId", {
      user_app_id: normalizedUserAppId,
    });
  } catch (err) {
    if (!isPokerPlusNoBindingInfoError(err)) throw err;
  }
  const userId = data && data.userId != null ? String(data.userId).trim() : linkedUserId;
  await clearPokerPlusBinding(accountId);
  return userId;
}

async function getPlayingTables() {
  const data = await requestWithToken("getPlayingTables", {});
  const list = Array.isArray(data && data.list) ? data.list : [];
  return list.map(function (item) {
    return {
      playerCount: item && item.playerCount != null ? Number(item.playerCount) : 0,
      deskId: item && item.deskId != null ? String(item.deskId).trim() : "",
      deskName: item && item.deskName != null ? String(item.deskName).trim() : "",
      unionId: item && item.unionId != null ? String(item.unionId).trim() : "",
      leagueId: item && item.leagueId != null ? String(item.leagueId).trim() : "",
      groupId: item && item.groupId != null ? String(item.groupId).trim() : "",
      playType: item && item.playType != null ? String(item.playType).trim() : "",
      blindAnnotation: item && item.blindAnnotation != null ? String(item.blindAnnotation).trim() : "",
      entryFees: item && item.entryFees != null ? Number(item.entryFees) : null,
    };
  });
}

async function getUpcomingCompetitions() {
  const data = await requestWithToken("getTheUpcomingCompetitions", {});
  const list = Array.isArray(data && data.list) ? data.list : [];
  return list.map(function (item) {
    return {
      competitionId: item && item.competitionId != null ? String(item.competitionId).trim() : "",
      competitionName: item && item.competitionName != null ? String(item.competitionName).trim() : "",
      unionId: item && item.unionId != null ? String(item.unionId).trim() : "",
      leagueId: item && item.leagueId != null ? String(item.leagueId).trim() : "",
      groupId: item && item.groupId != null ? String(item.groupId).trim() : "",
      playType: item && item.playType != null ? String(item.playType).trim() : "",
      startTime: item && item.startTime != null ? Number(item.startTime) : null,
      endTime: item && item.endTime != null ? Number(item.endTime) : null,
    };
  });
}

async function getMaintenanceStatus() {
  const data = await requestWithToken("getGameMaintainStatus", {});
  return {
    maintainStatus: data && data.maintainStatus != null ? Number(data.maintainStatus) : -1,
    startTime: data && data.startTime != null ? String(data.startTime).trim() : "",
    endTime: data && data.endTime != null ? String(data.endTime).trim() : "",
    content: data && data.content != null ? String(data.content).trim() : "",
    title: data && data.title != null ? String(data.title).trim() : "",
  };
}

module.exports = {
  BIND_AT_HASH_KEY,
  BIND_HASH_KEY,
  CIPHERTEXT_HASH_KEY,
  EMAIL_HASH_KEY,
  PROFILE_HASH_KEY,
  PROFILE_SYNC_AT_HASH_KEY,
  TELEGRAM_HASH_KEY,
  bindMiniAppPlayer,
  clearPokerPlusBinding,
  fetchPlayerInfo,
  getMaintenanceStatus,
  getPlayingTables,
  getUpcomingCompetitions,
  hasPokerPlusConfig,
  readBoundPokerPlusUserId,
  readPokerPlusCiphertext,
  readPokerPlusEmail,
  readPokerPlusProfile,
  readPokerPlusTelegramValue,
  refreshMiniAppPlayer,
  savePokerPlusCiphertext,
  savePokerPlusEmail,
  savePokerPlusTelegramValue,
  unbindMiniAppPlayer,
};

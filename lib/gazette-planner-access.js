/**
 * Кто может читать/писать планер задач.
 * - Редакторы @roman1787443 и @roman1_matvienko (+ numeric ids из env) — общий список в Redis.
 * - Отдельные списки (solo): @polyapineapple и др. из SOLO_PLANNER_USERNAMES — свой ключ Redis.
 */
const ROMAN_SHARED_USERNAMES = { roman1787443: true, roman1_matvienko: true };
const SOLO_PLANNER_USERNAMES = { polyapineapple: true };

function allowedRomanTelegramIdsSet() {
  const raw = process.env.GAZETTE_EDITOR_PLANNER_TELEGRAM_IDS || "388008256";
  const set = {};
  String(raw)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .forEach((s) => {
      const n = parseInt(s, 10);
      if (!isNaN(n)) set[n] = true;
    });
  set[388008256] = true;
  return set;
}

const ALLOWED_ROMAN_TELEGRAM_IDS = allowedRomanTelegramIdsSet();

/** Если username скрыт: один id для @polyapineapple → тот же solo-ключ, что и по нику. */
const POLY_SOLO_TELEGRAM_ID = (() => {
  const n = parseInt(String(process.env.GAZETTE_EDITOR_PLANNER_POLY_TELEGRAM_ID || "").trim(), 10);
  return !isNaN(n) ? n : null;
})();

const REDIS_KEY_ROMAN_SHARED = "poker_app:gazette_editor_planner_tasks_v1";

function normUsername(identity) {
  if (!identity) return "";
  return String(identity.telegramUsername || identity.pwaUsername || "")
    .replace(/^@+/, "")
    .trim()
    .toLowerCase();
}

function soloPlannerBucketForIdentity(identity) {
  const u = normUsername(identity);
  if (u && SOLO_PLANNER_USERNAMES[u]) return u;
  if (POLY_SOLO_TELEGRAM_ID != null && identity.id != null && identity.id !== "") {
    const idNum = Number(identity.id);
    if (!isNaN(idNum) && idNum === POLY_SOLO_TELEGRAM_ID) return "polyapineapple";
  }
  return null;
}

function isSoloPlannerEditor(identity) {
  if (!identity || identity.vkId != null) return false;
  return !!soloPlannerBucketForIdentity(identity);
}

function isRomanSharedPlannerEditor(identity) {
  if (!identity || identity.vkId != null) return false;
  if (isSoloPlannerEditor(identity)) return false;
  const u = normUsername(identity);
  if (u && ROMAN_SHARED_USERNAMES[u]) return true;
  if (identity.id == null || identity.id === "") return false;
  const idNum = Number(identity.id);
  if (isNaN(idNum)) return false;
  return !!ALLOWED_ROMAN_TELEGRAM_IDS[idNum];
}

/**
 * @param {{ id?: number|string, telegramUsername?: string, pwaUsername?: string|null, vkId?: number|string }|null} identity
 */
function isGazettePlannerEditor(identity) {
  return isSoloPlannerEditor(identity) || isRomanSharedPlannerEditor(identity);
}

/**
 * Ключ Redis для списка задач этого пользователя.
 * @returns {string|null}
 */
function getGazettePlannerRedisKey(identity) {
  if (!isGazettePlannerEditor(identity)) return null;
  const bucket = soloPlannerBucketForIdentity(identity);
  if (bucket) {
    return "poker_app:gazette_editor_planner_tasks_solo_" + bucket + "_v1";
  }
  return REDIS_KEY_ROMAN_SHARED;
}

module.exports = {
  isGazettePlannerEditor,
  getGazettePlannerRedisKey,
};

/**
 * Кто может читать/писать общий планер (тот же список, что gazette-editor-planner).
 */
const ALLOWED_USERNAMES = { roman1787443: true, roman1_matvienko: true };

function allowedTelegramIdsSet() {
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

const ALLOWED_TELEGRAM_IDS = allowedTelegramIdsSet();

/**
 * @param {{ id?: number|string, telegramUsername?: string, pwaUsername?: string|null, vkId?: number|string }|null} identity
 */
function isGazettePlannerEditor(identity) {
  if (!identity || identity.vkId != null) return false;
  const u = String(identity.telegramUsername || identity.pwaUsername || "")
    .replace(/^@+/, "")
    .trim()
    .toLowerCase();
  if (u && ALLOWED_USERNAMES[u]) return true;
  if (identity.id == null || identity.id === "") return false;
  const idNum = Number(identity.id);
  if (isNaN(idNum)) return false;
  return !!ALLOWED_TELEGRAM_IDS[idNum];
}

module.exports = { isGazettePlannerEditor };

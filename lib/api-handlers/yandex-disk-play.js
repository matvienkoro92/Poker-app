/**
 * Прямая ссылка на скачивание/стрим публичного файла Яндекс.Диска (для <video> в мини-приложении).
 * GET ?public_key=<полная публичная ссылка> — только из белого списка уроков.
 * Документация API: https://yandex.ru/dev/disk/api/reference/public.html
 */
const ALLOWED_PUBLIC_KEYS = new Set([
  "https://disk.yandex.ru/i/zP4fadqf3vHPEA",
  "https://disk.yandex.ru/i/TurgMWNdlC_UVQ",
  "https://disk.yandex.ru/i/D01KoNyWLSktNw",
  "https://disk.yandex.ru/i/W98502-sTwSFEA",
  "https://disk.yandex.ru/i/RnRTBzuL53MNeQ",
  "https://disk.yandex.ru/i/QMsbD0BTf7LF2A",
  "https://disk.yandex.ru/i/00CDFAqFwc-URA",
  "https://disk.yandex.ru/i/plNlLdTd-BH9sw",
  "https://disk.yandex.ru/i/JMke_A00_A7qGA",
  "https://disk.yandex.ru/i/OlVyOoTjrlHWpQ",
  "https://disk.yandex.ru/i/3vkmNfyz9-rseA",
  "https://disk.yandex.ru/i/mm8YvgRGyEsRCg",
  "https://disk.yandex.ru/i/VL_EMriPKGKajQ",
  "https://disk.yandex.ru/i/GwxB4iibOxWlKA",
  "https://disk.yandex.ru/i/8WyHiEJDTlHCug",
  "https://disk.yandex.ru/i/tVoJ8UV0cWx6Ag",
  "https://disk.yandex.ru/i/VnZzgEqGqdjIfA",
  "https://disk.yandex.ru/i/cgE2rPfydTDMng",
]);

function parsePublicKey(reqUrl) {
  if (!reqUrl || typeof reqUrl !== "string") return "";
  const q = reqUrl.indexOf("?");
  if (q === -1) return "";
  const params = new URLSearchParams(reqUrl.slice(q + 1));
  return (params.get("public_key") || "").trim();
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "GET") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  let publicKey = parsePublicKey(req.url || "");
  try {
    publicKey = decodeURIComponent(publicKey);
  } catch (e) {
    /* keep as-is */
  }

  if (!publicKey || !ALLOWED_PUBLIC_KEYS.has(publicKey)) {
    res.status(400).json({ ok: false, error: "invalid_public_key" });
    return;
  }

  const yandexUrl =
    "https://cloud-api.yandex.net/v1/disk/public/resources/download?public_key=" +
    encodeURIComponent(publicKey);

  let yandexRes;
  try {
    yandexRes = await fetch(yandexUrl, {
      headers: { Accept: "application/json" },
    });
  } catch (e) {
    res.status(502).json({ ok: false, error: "yandex_unreachable" });
    return;
  }

  let data;
  try {
    data = await yandexRes.json();
  } catch (e) {
    res.status(502).json({ ok: false, error: "yandex_bad_json" });
    return;
  }

  if (!yandexRes.ok || !data || !data.href) {
    res.status(502).json({
      ok: false,
      error: (data && data.description) || data.message || "yandex_error",
    });
    return;
  }

  res.setHeader("Cache-Control", "private, max-age=30");
  res.status(200).json({ ok: true, href: data.href });
};

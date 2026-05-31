"use strict";

const { setCors } = require("../api-auth");

function jsonError(res, status, error, extra) {
  return res.status(status).json(Object.assign({ ok: false, error }, extra || {}));
}

function firstEnv(names) {
  for (const name of names) {
    const value = String(process.env[name] || "").trim();
    if (value) return value;
  }
  return "";
}

function normalizeUrl(raw) {
  const value = String(raw || "").trim();
  return /^https?:\/\//i.test(value) ? value : "";
}

function normalizeRtmpsUrl(raw) {
  const value = String(raw || "").trim();
  return /^rtmps?:\/\//i.test(value) || /^srt:\/\//i.test(value) ? value : "";
}

function parseCloudflareStreamUrl(raw) {
  const value = normalizeUrl(raw);
  if (!value) return {};
  try {
    const url = new URL(value);
    const hostMatch = url.hostname.match(/^customer-([a-z0-9]+)\.cloudflarestream\.com$/i);
    const parts = url.pathname.split("/").filter(Boolean);
    return {
      customerCode: hostMatch ? hostMatch[1] : "",
      liveInputId: parts[0] || "",
    };
  } catch (e) {
    return {};
  }
}

function normalizeCustomerCode(raw) {
  let value = String(raw || "").trim();
  if (!value) return "";
  const parsed = parseCloudflareStreamUrl(value);
  if (parsed.customerCode) value = parsed.customerCode;
  value = value.replace(/^customer-/i, "").replace(/\.cloudflarestream\.com$/i, "");
  return /^[a-z0-9]+$/i.test(value) ? value : "";
}

function normalizeLiveInputId(raw) {
  let value = String(raw || "").trim();
  if (!value) return "";
  const parsed = parseCloudflareStreamUrl(value);
  if (parsed.liveInputId) value = parsed.liveInputId;
  return /^[a-zA-Z0-9_-]{8,128}$/.test(value) ? value : "";
}

function streamUrl(customerCode, liveInputId, suffix) {
  if (!customerCode || !liveInputId) return "";
  return "https://customer-" + customerCode + ".cloudflarestream.com/" + liveInputId + suffix;
}

module.exports = async function handler(req, res) {
  setCors(res, "GET, OPTIONS", "Content-Type");
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return jsonError(res, 405, "Method not allowed");

  const configuredHlsUrl = normalizeUrl(firstEnv([
    "CLOUDFLARE_STREAM_HLS_URL",
    "CF_STREAM_HLS_URL",
  ]));
  const configuredIframeUrl = normalizeUrl(firstEnv([
    "CLOUDFLARE_STREAM_IFRAME_URL",
    "CF_STREAM_IFRAME_URL",
  ]));

  const hlsParts = parseCloudflareStreamUrl(configuredHlsUrl);
  const iframeParts = parseCloudflareStreamUrl(configuredIframeUrl);
  const customerCode = normalizeCustomerCode(firstEnv([
    "CLOUDFLARE_STREAM_CUSTOMER_CODE",
    "CF_STREAM_CUSTOMER_CODE",
  ]) || hlsParts.customerCode || iframeParts.customerCode);
  const liveInputId = normalizeLiveInputId(firstEnv([
    "CLOUDFLARE_STREAM_LIVE_INPUT_ID",
    "CF_STREAM_LIVE_INPUT_ID",
  ]) || hlsParts.liveInputId || iframeParts.liveInputId);

  const hlsUrl = configuredHlsUrl || streamUrl(customerCode, liveInputId, "/manifest/video.m3u8");
  const iframeUrl = configuredIframeUrl || streamUrl(customerCode, liveInputId, "/iframe");
  const rtmpsUrl = normalizeRtmpsUrl(firstEnv([
    "CLOUDFLARE_STREAM_RTMPS_URL",
    "CF_STREAM_RTMPS_URL",
  ]));
  const rtmpsKeyConfigured = Boolean(firstEnv([
    "CLOUDFLARE_STREAM_RTMPS_KEY",
    "CLOUDFLARE_STREAM_KEY",
    "CF_STREAM_RTMPS_KEY",
    "CF_STREAM_KEY",
    "CLOUDFLARE_STREAM_RTMPS_DESTINATION_URL",
    "CF_STREAM_RTMPS_DESTINATION_URL",
  ]));
  const configured = Boolean(customerCode && liveInputId && (iframeUrl || hlsUrl));

  return res.status(200).json({
    ok: true,
    configured,
    customerCode,
    liveInputId,
    hlsUrl,
    iframeUrl,
    rtmpsUrl,
    egressConfigured: Boolean(rtmpsUrl && rtmpsKeyConfigured),
    missing: configured ? {} : {
      customerCode: !customerCode,
      liveInputId: !liveInputId,
      playbackUrl: !(iframeUrl || hlsUrl),
    },
  });
};

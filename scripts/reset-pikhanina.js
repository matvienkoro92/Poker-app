#!/usr/bin/env node
/**
 * Сброс счётчика призов «Найди Пиханину» в Redis (остаток снова станет 15).
 * Нужны URL и токен Redis из настроек Vercel или из .env в корне проекта.
 *
 * Использование:
 *   node scripts/reset-pikhanina.js
 */
const path = require("path");
const fs = require("fs");
const { pipeline: redisPipeline, isConfigured: redisConfigured } = require("../lib/redis");
// Загрузить .env из корня проекта, если есть
const envPath = path.resolve(__dirname, "..", ".env");
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, "utf8").split("\n").forEach(function (line) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
  });
}
const KEY = "poker_app:pikhanina_claimed_count";

if (!redisConfigured()) {
  console.error("Задайте URL и токен Redis (из настроек Vercel или из .env в корне проекта).");
  process.exit(1);
}

async function reset() {
  const data = await redisPipeline([["SET", KEY, "0"]]);
  const ok = Array.isArray(data) && data[0] && data[0].result === "OK";
  if (ok) {
    console.log("Счётчик призов Пиханины сброшен. Остаток снова 15.");
  } else {
    console.error("Неожиданный ответ Redis:", data);
    process.exit(1);
  }
}

reset();

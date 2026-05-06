"use strict";

function pokerProfileStatusStepForLevelServer(level) {
  if (level <= 5) return 10000;
  if (level <= 15) return 20000;
  if (level <= 25) return 35000;
  if (level <= 35) return 50000;
  if (level <= 45) return 75000;
  return 100000;
}

function pokerProfileStatusFromRakeServer(value) {
  const rake = Math.max(0, Math.floor(Number(value) || 0));
  let level = 1;
  let levelStart = 0;
  while (level < 55) {
    const step = pokerProfileStatusStepForLevelServer(level);
    if (rake < levelStart + step) break;
    levelStart += step;
    level += 1;
  }
  const nextLevel = Math.min(55, level + 1);
  let nextStart = 0;
  for (let lvl = 1; lvl < nextLevel; lvl += 1) nextStart += pokerProfileStatusStepForLevelServer(lvl);
  const levelSize = Math.max(1, nextStart - levelStart);
  const valuePercent = level >= 55 ? 100 : Math.floor(Math.min(99, Math.max(0, ((rake - levelStart) / levelSize) * 100)));
  return { level, valuePercent };
}

function pokerProfileFeeFromCachedProfile(profile) {
  const total =
    profile && profile.totalCounter && typeof profile.totalCounter === "object"
      ? profile.totalCounter
      : profile && profile.total_counter && typeof profile.total_counter === "object"
        ? profile.total_counter
        : {};
  const fee = total.fee != null ? Number(total.fee) : null;
  return Number.isFinite(fee) ? fee : null;
}

module.exports = {
  pokerProfileFeeFromCachedProfile,
  pokerProfileStatusFromRakeServer,
};

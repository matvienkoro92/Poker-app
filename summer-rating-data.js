// Summer rating data entrypoint. Seasonal chunks are loaded before this file.
var SUMMER_RATING_TOURNAMENTS_BY_DATE = Object.assign(
  {},
  typeof SUMMER_RATING_TOURNAMENTS_JUNE_BY_DATE !== "undefined" ? SUMMER_RATING_TOURNAMENTS_JUNE_BY_DATE : {},
  typeof SUMMER_RATING_TOURNAMENTS_JULY_BY_DATE !== "undefined" ? SUMMER_RATING_TOURNAMENTS_JULY_BY_DATE : {},
  typeof SUMMER_RATING_TOURNAMENTS_AUGUST_BY_DATE !== "undefined" ? SUMMER_RATING_TOURNAMENTS_AUGUST_BY_DATE : {},
  typeof SUMMER_RATING_TOURNAMENTS_SEPTEMBER_BY_DATE !== "undefined" ? SUMMER_RATING_TOURNAMENTS_SEPTEMBER_BY_DATE : {}
);

try {
  if (typeof window !== "undefined" && typeof window.__pokerRefreshRatingSeasonAfterDataReady === "function") {
    window.__pokerRefreshRatingSeasonAfterDataReady("summer");
  }
} catch (e) {}

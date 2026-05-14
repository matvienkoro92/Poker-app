// Spring rating data entrypoint. Seasonal chunks are loaded before this file.
var SPRING_RATING_TOURNAMENTS_BY_DATE = Object.assign(
  {},
  typeof SPRING_RATING_TOURNAMENTS_MARCH_BY_DATE !== "undefined" ? SPRING_RATING_TOURNAMENTS_MARCH_BY_DATE : {},
  typeof SPRING_RATING_TOURNAMENTS_APRIL_BY_DATE !== "undefined" ? SPRING_RATING_TOURNAMENTS_APRIL_BY_DATE : {},
  typeof SPRING_RATING_TOURNAMENTS_MAY_BY_DATE !== "undefined" ? SPRING_RATING_TOURNAMENTS_MAY_BY_DATE : {}
);

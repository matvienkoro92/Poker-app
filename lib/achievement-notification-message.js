"use strict";

function achievementNotificationMessage(title, now = new Date()) {
  if (String(title).toLowerCase() !== "герой дня") return "Достижение добавлено в ваш профиль";
  // Only advertise a confirmed contest during its Moscow calendar month.
  const month = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Moscow", year: "numeric", month: "2-digit",
  }).formatToParts(now);
  const value = type => month.find(part => part.type === type).value;
  if (value("year") === "2026" && value("month") === "09") {
    return "Вы участвуете в гонке «Герой сентября» за 25 000 ₽. Соберите больше всех ачивок «Герой дня» в сентябре!";
  }
  return "Ачивка «Герой дня» добавлена в ваш профиль";
}

module.exports = { achievementNotificationMessage };

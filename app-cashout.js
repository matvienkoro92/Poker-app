// Депозит: показывать только менеджера, который сейчас в смене (по МСК)
// Анна: 06:00–18:00 мск, Вика: 18:00–02:00 мск, перерыв: 02:00–06:00 мск.
function getMskMinutes() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Moscow",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  let hour = 0;
  let minute = 0;
  parts.forEach((part) => {
    if (part.type === "hour") hour = Number(part.value) || 0;
    if (part.type === "minute") minute = Number(part.value) || 0;
  });
  return hour * 60 + minute;
}

function updateCashoutManager() {
  const minutes = getMskMinutes();
  const isAnna = minutes >= 6 * 60 && minutes < 18 * 60;
  const isVika = minutes >= 18 * 60 || minutes < 2 * 60;
  const activeManager = isAnna ? "anna" : (isVika ? "vika" : "");
  const viewName = document.body ? document.body.getAttribute("data-view") : "";
  const shouldLoadActiveImage = viewName === "cashout" || viewName === "download";

  const blocks = document.querySelectorAll(".cashout-manager-block");
  const subtitles = document.querySelectorAll(".cashout-now-subtitle");
  const subtitleText = isAnna
    ? "Сейчас на связи: Анна (06:00–18:00 МСК)"
    : (isVika
      ? "Сейчас на связи: Вика (18:00–02:00 МСК)"
      : "Перерыв, ожидайте смены. Следующая смена — Анна с 06:00 МСК");

  blocks.forEach((block) => {
    if (activeManager && block.dataset.manager === activeManager) {
      block.classList.remove("cashout-manager-block--hidden");
      if (shouldLoadActiveImage) {
        const img = block.querySelector(".cashout-image[data-src]");
        if (img && !img.getAttribute("src")) img.setAttribute("src", img.dataset.src || "");
      }
    } else {
      block.classList.add("cashout-manager-block--hidden");
    }
  });

  subtitles.forEach((subtitle) => {
    subtitle.textContent = subtitleText;
  });
}

updateCashoutManager();
setInterval(updateCashoutManager, 60000);

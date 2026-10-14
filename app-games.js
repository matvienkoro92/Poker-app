// Предсказание на день: тексты (расширенный список), без префиксов «День N»
var POKER_DAILY_PREDICTIONS = [
  "Сегодня за столом появится человек, который «только посмотреть». Через три минуты он будет главным героем раздачи.",
  "Твоё покерное лицо сегодня пройдёт проверку. Главное — не начинать улыбаться ещё до того, как карты доехали до тебя.",
  "Колода обещает сюжетный поворот. Если начнут играть тревожные скрипки, проверь: возможно, это просто твой телефон.",
  "Кто-то произнесёт «последняя раздача». Вселенная вежливо сделает вид, что поверила.",
  "Сегодня тебе достанется роль загадочного незнакомца. Не раскрывай её фразой «а что значит эта кнопка?».",
  "За столом найдётся режиссёр, который объяснит, как ты должен был сыграть. Титры его фильма можно не досматривать.",
  "Манки посмотрел в колоду и кивнул. Что это значит, он не объяснил: рот был занят бананом.",
  "Сегодня одна маленькая фишка окажется важнее красивой речи. Вообще фишки редко ценят ораторское искусство.",
  "Твой таймбанк сегодня похож на отпуск: кажется большим, пока не начинаешь им пользоваться.",
  "Предстоит встреча с человеком, который всё прочитал. Особенно твою руку — уже после вскрытия.",
  "У твоего стека сегодня будет архитектурное настроение. Построй башню, которой не стыдно попасть в кадр.",
  "Кто-то за столом скажет «я знал». Колода рекомендует спросить, почему тогда он так удивлён.",
  "Сегодня твоё самое убедительное движение — спокойно отпить воды. Даже если раздача уже закончилась.",
  "Вечер приготовил редкое комбо: интересную компанию и человека, который наконец выключит микрофон во время жевания.",
  "Тебя ждёт момент, когда все замолчат. Постарайся не испортить его вопросом «а чей сейчас ход?».",
  "Карты советуют проверить зарядку. Самый драматичный дисконнект всегда считает себя главным событием вечера.",
  "Сегодня кто-то попытается угадать твою руку по выражению лица. Жаль, что он видит только аватарку енота.",
  "Человек справа выглядит спокойным. Возможно, он сильный игрок. Возможно, у него просто ещё не загрузились карты.",
  "Сегодня слово «стандарт» прозвучит особенно нестандартно.",
  "На горизонте раздача, которую будут пересказывать три человека. Получатся три совершенно разные раздачи.",
  "Тебя ждёт небольшой триумф: хотя бы один раз нажать нужную кнопку с первого раза.",
  "Сегодня твоя интуиция попросит микрофон. Дай высказаться и математике — она тоже пришла не просто так.",
  "Колода предсказывает важную паузу. Вполне возможно, для бутерброда.",
  "Один из соперников сегодня будет непроницаем. Даже для собственного интернета.",
  "Сегодня ты заметишь деталь, которую раньше пропускал. Возможно, это размер ставки. Возможно, крошка на экране.",
  "Твой внутренний комментатор готов к эфиру. Внутреннему игроку разрешается иногда выключать звук.",
  "В этот вечер кто-то назовёт тебя хитрым. Самое время загадочно поправить очки, даже если они виртуальные.",
  "Колода предлагает не спорить с человеком, который помнит все свои переезды с 2018 года. У него слишком большая база.",
  "Тебя ждёт знакомство с новым словом. Вероятнее всего, кто-то опять придумает название своему странному коллу.",
  "Сегодня у тебя будет возможность уйти красиво. Начать можно с сохранения настроек и нормального прощания.",
  "Твои тузы сегодня требуют отдельную гримёрку. Напомни им, что они всё-таки часть команды.",
  "Валеты прислали сообщение: «Мы нормальные. Это у вас ожидания странные».",
  "Дамы сегодня выглядят так, будто знают концовку фильма. Спойлеров от них не дождёшься.",
  "Короли просят не произносить слово «туз» до флопа. Они немного суеверные.",
  "Маленькая карманная пара сегодня будет строить большие планы. Бюджет этих планов уточняется.",
  "Одномастные карты попытаются понравиться тебе одним лишь совпадением цвета. Красота ещё не резюме.",
  "Разномастные тузы и короли выясняют, кто здесь главный. Пока они спорят, не забывай смотреть на стол.",
  "Семёрка и двойка предлагают начать новую жизнь. Колода советует хотя бы выслушать другие предложения.",
  "Сегодня девятки будут выглядеть увереннее, чем чувствуют себя внутри. Очень человеческая история.",
  "Пятёрки обещают держаться вместе. На этом их официальные обязательства заканчиваются.",
  "Ты встретишь руку, которая красиво смотрится на скриншоте. Решение всё равно придётся принимать до фотосессии.",
  "Туз с маленьким кикером снова пришёл с большим самомнением.",
  "Карманные десятки сегодня выбрали девиз «мы уже почти картинки». Позволь им помечтать.",
  "Сегодня в колоде найдётся карта, которую ты давно не видел. Она тоже скажет, что ты совсем не изменился.",
  "Один король будет вести себя как VIP, второй — как его менеджер. Вместе они требуют уважения к позиции.",
  "Бубны сегодня сверкают так, будто готовятся к клубной фотосессии.",
  "Черви решили добавить вечеру романтики. Но взаимность соперника по ставкам они не гарантируют.",
  "Пики выбрали строгий костюм. Видимо, сегодня у них деловая встреча с банком.",
  "Трефы выглядят как маленькие деревья. Возможно, твоей концентрации тоже нужен свежий воздух.",
  "Сегодня твоя любимая рука узнает, что у тебя есть любимая рука. Не позволяй ей этим пользоваться.",
  "Кнопка сегодня сделает полный круг и вернётся. В отличие от человека, который пошёл «на минутку за чаем».",
  "На малом блайнде тебя посетит философский вопрос: почему за право действовать первым ещё и платят?",
  "Большой блайнд сегодня напомнит о себе ровно тогда, когда ты устроишься поудобнее.",
  "За столом ожидается дипломатический конфликт двух блайндов. Посредником назначен дилер.",
  "Кто-то сделает ставку таким движением, будто подписывает мирный договор. Содержание документа лучше проверить.",
  "Сегодня один чек прозвучит громче длинного монолога.",
  "Твой фолд может остаться незамеченным. Зато ему не понадобятся оправдания в клубном чате.",
  "На ривере возникнет пауза, достойная финала сериала. Реклама, к счастью, не предусмотрена.",
  "Сегодня чей-то маленький сайзинг вызовет большой разговор.",
  "Соперник поставит так уверенно, что даже его аватарка выпрямится. Карты при этом всё ещё лежат рубашкой вверх.",
  "Чек-рейз войдёт в комнату без стука. Просто держи дверь внимания открытой.",
  "Сегодня один банк будет выглядеть как спор о наследстве. Родственники при этом ни при чём.",
  "Ты увидишь флоп, на котором всем что-то померещится. Коллективное воображение — сильная вещь.",
  "Тёрн сегодня претендует на премию за лучший второй акт.",
  "Ривер приготовил реплику. Насколько она уместна, станет известно только после выхода на сцену.",
  "Одна раздача пройдёт подозрительно тихо. Не исключено, что всем просто удобно сидеть.",
  "Сегодня слово «колл» кто-то произнесёт голосом человека, который согласился помочь с переездом.",
  "За столом встретятся два человека, каждый из которых считает второго слишком упрямым.",
  "Кто-то попробует рассказать ставками целый роман. Ты не обязан покупать продолжение каждой главы.",
  "Самый необычный ход вечера может оказаться обычной ошибкой мышки. У великих историй бывают скромные начала.",
  "Сегодня тебе особенно подойдёт спокойствие человека, который знает, где лежит зарядка.",
  "Предсказано редкое достижение: заметить начало тильта раньше, чем о нём узнает весь стол.",
  "Сделай перерыв — вдруг именно в это время чайник приготовит тебе лучший спот вечера.",
  "Сегодня удачный фолд может дать больше внутреннего удовольствия, чем шумный спор после вскрытия.",
  "Твоя концентрация просит отдельный стул. Не сажай на него одновременно сериал, чат и доставку.",
  "Колода предсказывает ясную голову после короткой прогулки. Самый дешёвый апгрейд персонажа.",
  "Сегодня ты сумеешь сказать «интересная раздача» без продолжения на двадцать минут. Возможно.",
  "Твой запас терпения получит неожиданный бонус, если ты поешь до игры, а не будешь смотреть на еду между решениями.",
  "Вселенная рекомендует сначала проверить звук, потом эффектно выходить в голосовой чат.",
  "Сегодня ты можешь удивить соперников отсутствием спешки. Особенно тех, кто уже успел придумать тебе диапазон.",
  "Кофе будет пытаться выдать себя за полноценный сон. Документы у него поддельные.",
  "Тебе предстоит отличить скуку от хорошего повода участвовать в раздаче. Они опять пришли в одинаковых куртках.",
  "Сегодня внутренний герой боевика уступит место человеку с планом. Монтаж станет спокойнее, зато понятнее.",
  "Колода обещает минуту полной тишины. Используй её, пока кто-нибудь не вспомнил историю про свои валеты.",
  "Ты обнаружишь, что удобное кресло не принимает решения за тебя. Но поддерживает как умеет.",
  "Сегодня «я пас» может прозвучать очень уверенно. Репетировать перед зеркалом необязательно.",
  "Тебя ждёт встреча с собственным хорошим решением. Не забудь признать его, даже если результат оказался не таким красивым.",
  "Твой лучший покерный аксессуар сегодня — кнопка «не беспокоить».",
  "Один глубокий вдох окажется полезнее эффектного стука по столу. Стол тоже будет благодарен.",
  "Сегодня у тебя появится шанс закончить вечер вовремя. У этого достижения нет кубка, но есть завтрашнее утро.",
  "Манки протёр очки и увидел твоё будущее. Потом выяснилось, что он смотрел в историю раздач.",
  "В твоём гараже замечено движение: машина хочет на прогулку, но фишки опять заняли все сиденья.",
  "Сегодня твой виртуальный костюм выглядит так, будто у него собственный банкролл. Пусть оплачивает хотя бы химчистку.",
  "Кубок на полке намекает, что ему скучно без соседей. Ты можешь просто протереть пыль — намёк он тоже поймёт.",
  "Клубной колоде понравился твой образ. Она особенно оценила карманы: говорит, там удобно хранить интригу.",
  "Манки обещает хранить твою покерную тайну. Но если она связана с бананами, гарантия не действует.",
  "Стакан на столике услышал столько историй о переездах, что лёд теперь звенит с сочувствием.",
  "Сегодня твоя стопка фишек будет стоять ровнее, чем расписание человека, который «играет только по выходным».",
  "В зале игрока появилась загадочная тень. Это твой персонаж примеряет ещё одну шляпу.",
  "Колода просит не класть на неё телефон. Ей и без того тяжело хранить столько чужих надежд.",
  "Твоё кресло уверено, что ты главный герой. Оно поддержит тебя даже во время перерыва.",
  "Сегодня в клубе найдётся человек, который похвалит твой образ, а потом попытается забрать твои блайнды. Ничего личного, дресс-код.",
  "Манки назначил тебя капитаном спокойствия. Форма произвольная, паника на построение не допускается.",
  "Твоя машина сегодня сияет. Подозрительно: возможно, её помыли фишки, пока ждали твоего возвращения.",
  "На полке нашлось место для новой истории. Она необязательно должна начинаться словами «ты не поверишь, что мне раздали».",
  "Сегодня кто-то зайдёт в твой зал и задержится у кубков. Очки для скромного вида уже приготовлены.",
  "Колода заметила твой новый перстень. Теперь она хочет, чтобы ей тоже сделали красивую оправу.",
  "Счастливая фишка сегодня прячется среди обычных. Отличительный признак: она ничего не обещает и спокойно лежит.",
  "Столик рекомендует проверить предсказание завтра. Ему нравится, когда ты заходишь без повода что-то чинить.",
  "Сегодня Манки будет особенно серьёзен. Скорее всего, выбирает между двумя одинаково красивыми кепками.",
  "Тебя ждёт сообщение «ты где?». Автор, вероятно, сидит за соседним виртуальным столом.",
  "Сегодня кто-то пришлёт скриншот без контекста. Клубный консилиум всё равно начнётся немедленно.",
  "В чате появится раздача, по которой у пяти человек будет семь мнений. Два мнения один человек принесёт про запас.",
  "Тебе встретится игрок с ником, который труднее прочитать, чем его диапазон.",
  "Кто-то напишет «быстрый вопрос». Приготовься к предыстории, трём скриншотам и схеме рассадки.",
  "Сегодня один смайлик в чате заменит целый послематчевый разбор.",
  "Клубная легенда получит новую деталь. Каждый свидетель уверен, что именно она была с самого начала.",
  "Тебя вспомнят добрым словом. Вероятно, за компанию — но ты всё равно имеешь право улыбнуться.",
  "Сегодня найдётся человек, который поймёт твою шутку с первого раза. Береги эту редкую совместимость диапазонов.",
  "Колода закрывает прогноз простым знаком: ♠. Остальное сегодня допишешь ты."
];
var POKER_PREDICTION_CATALOG_VERSION = 2;
var pokerPredictionSessionState = null;

function getDailyPredictionStorage() {
  try {
    var raw = localStorage.getItem("poker_daily_prediction_state");
    return raw ? JSON.parse(raw) : pokerPredictionSessionState;
  } catch (e) {
    return pokerPredictionSessionState;
  }
}

function saveDailyPredictionStorage(state) {
  pokerPredictionSessionState = state;
  try {
    localStorage.setItem("poker_daily_prediction_state", JSON.stringify(state));
  } catch (e) {}
}

function getTodayKey() {
  var d = new Date();
  var y = d.getFullYear();
  var m = String(d.getMonth() + 1).padStart(2, "0");
  var day = String(d.getDate()).padStart(2, "0");
  return y + "-" + m + "-" + day;
}

function ensureTodayPredictionState() {
  var key = getTodayKey();
  var state = getDailyPredictionStorage();
  var count = POKER_DAILY_PREDICTIONS.length;
  var current = state && state.version === POKER_PREDICTION_CATALOG_VERSION;
  if (current && state.date === key && Number.isInteger(state.index) && state.index >= 0 && state.index < count) return state;
  var history = current && Array.isArray(state.history) ? state.history.filter(function (n) { return Number.isInteger(n) && n >= 0 && n < count; }) : [];
  // A full deck must pass before a prediction can return.
  history = history.slice(-Math.max(0, count - 1));
  var available = [];
  for (var i = 0; i < count; i++) if (history.indexOf(i) === -1) available.push(i);
  var index = available.length ? available[Math.floor(Math.random() * available.length)] : 0;
  state = { version: POKER_PREDICTION_CATALOG_VERSION, date: key, index: index, read: false, history: history.concat(index) };
  saveDailyPredictionStorage(state);
  return state;
}

function getPokerDailyPredictionForToday() {
  var state = ensureTodayPredictionState();
  return POKER_DAILY_PREDICTIONS[state.index] || "";
}

function markDailyPredictionRead() {
  var state = ensureTodayPredictionState();
  if (!state.read) {
    state.read = true;
    saveDailyPredictionStorage(state);
  }
}

function updateDailyPredictionBadge() {
  var badge = document.getElementById("dailyPredictionBadge");
  var preview = document.getElementById("dailyPredictionPreview");
  if (!badge) return;
  var state = ensureTodayPredictionState();
  var unread = !state.read;
  badge.classList.toggle("feature__badge--hidden", !unread);
  badge.setAttribute("aria-hidden", unread ? "false" : "true");
  if (preview && !unread) {
    preview.textContent = "Совет на сегодня уже открыт";
  }
}

var dailyPredictionTimerId = null;

function formatMsToHms(ms) {
  if (ms < 0) ms = 0;
  var totalSec = Math.floor(ms / 1000);
  var h = Math.floor(totalSec / 3600);
  var m = Math.floor((totalSec % 3600) / 60);
  var s = totalSec % 60;
  function pad(n) { return n < 10 ? "0" + n : String(n); }
  return pad(h) + ":" + pad(m) + ":" + pad(s);
}

function updateDailyPredictionTimer() {
  var el = document.getElementById("dailyPredictionTimer");
  if (!el) return;
  var now = new Date();
  var tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
  var diff = tomorrow - now;
  el.textContent = "Следующее через " + formatMsToHms(diff);
}

function startDailyPredictionTimer() {
  updateDailyPredictionTimer();
  if (dailyPredictionTimerId) clearInterval(dailyPredictionTimerId);
  dailyPredictionTimerId = setInterval(updateDailyPredictionTimer, 1000);
}

function stopDailyPredictionTimer() {
  if (dailyPredictionTimerId) {
    clearInterval(dailyPredictionTimerId);
    dailyPredictionTimerId = null;
  }
}

function playClickSound() {
  if (typeof window.playPokerClickSound === "function" && window.playPokerClickSound !== playClickSound) {
    window.playPokerClickSound();
    return;
  }
  var audio = null;
  try {
    audio = playClickSound.__audio;
    if (!audio) {
      audio = playClickSound.__audio = new Audio("./assets/gta-sa-menu.mp3?v=2026070602");
      audio.preload = "auto";
      audio.volume = 0.78;
      try {
        audio.load();
      } catch (errLoad) {}
    }
  } catch (errAudio) {}
  if (!audio) return;
  try {
    audio.pause();
    audio.currentTime = 0;
    var p = audio.play();
    if (p && typeof p.catch === "function") p.catch(function () {});
  } catch (err) {}
}

function tryChillRadioPlay() {
  var mode = localStorage.getItem("chill_radio_mode") || "";
  if (mode !== "chill" && mode !== "lounge" && mode !== "90s" && mode !== "radio7") return;
  var radio = document.getElementById("chillRadio");
  if (!radio) return;
  var urls = { chill: "https://ice2.somafm.com/groovesalad-128-mp3", lounge: "https://ice5.somafm.com/illstreet-128-mp3", "90s": "https://nostalgiafm.hostingradio.ru:8014/nostalgiafm.mp3", radio7: "https://stream.rcast.net/263744" };
  if (urls[mode]) radio.src = urls[mode];
  var p = radio.play();
  if (p && typeof p.then === "function") p.catch(function () {});
}

(function initChillRadio() {
  var radio = document.getElementById("chillRadio");
  if (!radio) return;
  function tryPlay() {
    tryChillRadioPlay();
  }
  document.addEventListener("click", tryPlay, { once: true, passive: true });
  document.addEventListener("touchstart", tryPlay, { once: true, passive: true });
  tryChillRadioPlay();
})();

// Модалка «Предсказание на день»
function openDailyPredictionModal() {
  var modal = document.getElementById("dailyPredictionModal");
  if (!modal) return;
  try {
    if (typeof window.pokerRecordSectionViewOpen === "function") window.pokerRecordSectionViewOpen("daily-prediction");
  } catch (eTrack) {}
  var textEl = document.getElementById("dailyPredictionText");
  if (textEl) {
    textEl.textContent = getPokerDailyPredictionForToday();
  }
  markDailyPredictionRead();
  updateDailyPredictionBadge();
  modal.setAttribute("aria-hidden", "false");
  modal.classList.add("daily-prediction-modal--open");
   startDailyPredictionTimer();
  if (document.body) document.body.style.overflow = "hidden";
}

function closeDailyPredictionModal() {
  var modal = document.getElementById("dailyPredictionModal");
  if (!modal) return;
  modal.setAttribute("aria-hidden", "true");
  modal.classList.remove("daily-prediction-modal--open");
  stopDailyPredictionTimer();
  if (document.body) document.body.style.overflow = "";
}

(function initDailyPredictionModal() {
  var btn = document.getElementById("dailyPredictionBtn");
  var modal = document.getElementById("dailyPredictionModal");
  if (!btn || !modal) return;
  if (modal.dataset.dailyPredictionBound === "1") return;
  modal.dataset.dailyPredictionBound = "1";
  var closeBtn = modal.querySelector(".daily-prediction-modal__close");
  var backdrop = modal.querySelector(".daily-prediction-modal__backdrop");
  var shareBtn = document.getElementById("dailyPredictionShareBtn");
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    openDailyPredictionModal();
  });
  if (closeBtn) closeBtn.addEventListener("click", function () { closeDailyPredictionModal(); });
  if (backdrop) backdrop.addEventListener("click", function () { closeDailyPredictionModal(); });
  if (shareBtn && !shareBtn._bound) {
    shareBtn._bound = true;
    shareBtn.addEventListener("click", function () {
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      var predictionTextEl = document.getElementById("dailyPredictionText");
      var prediction = predictionTextEl ? predictionTextEl.textContent.trim() : "";
      var link =
        typeof buildMiniAppStartLink === "function" ? buildMiniAppStartLink("daily_prediction") : "";
      var shortText = "Моё покерное предсказание на сегодня:";
      if (prediction) shortText += "\n\n" + prediction;
      shortText += "\n\nПосмотрите своё предсказание здесь.";
      var shareUrl =
        typeof pokerBuildTelegramShareUrlDialog === "function" ? pokerBuildTelegramShareUrlDialog(link, shortText) : "";
      pokerTryPwaWebShare({ text: shortText + "\n\n" + link, url: link }).then(function (pwaOk) {
        if (pwaOk) {
          if (typeof recordShareButtonClick === "function") recordShareButtonClick("daily_prediction");
          return;
        }
        var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tg && tg.openTelegramLink) {
          tg.openTelegramLink(shareUrl);
        } else if (tg && tg.openLink) {
          tg.openLink(shareUrl);
        } else {
          window.open(shareUrl, "_blank");
        }
        if (typeof recordShareButtonClick === "function") recordShareButtonClick("daily_prediction");
      });
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeDailyPredictionModal();
  });
  // Обновляем бейдж при инициализации
  updateDailyPredictionBadge();
})();
window.pokerInitDailyPredictionModal = function () {
  var btn = document.getElementById("dailyPredictionBtn");
  var modal = document.getElementById("dailyPredictionModal");
  if (!btn || !modal || modal.dataset.dailyPredictionBound === "1") return;
  modal.dataset.dailyPredictionBound = "1";
  var closeBtn = modal.querySelector(".daily-prediction-modal__close");
  var backdrop = modal.querySelector(".daily-prediction-modal__backdrop");
  var shareBtn = document.getElementById("dailyPredictionShareBtn");
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    openDailyPredictionModal();
  });
  if (closeBtn) closeBtn.addEventListener("click", function () { closeDailyPredictionModal(); });
  if (backdrop) backdrop.addEventListener("click", function () { closeDailyPredictionModal(); });
  if (shareBtn && !shareBtn._bound) {
    shareBtn._bound = true;
    shareBtn.addEventListener("click", function () {
      if (typeof window.tryTelegramWebAppExpandBurst === "function") window.tryTelegramWebAppExpandBurst();
      var predictionTextEl = document.getElementById("dailyPredictionText");
      var prediction = predictionTextEl ? predictionTextEl.textContent.trim() : "";
      var link =
        typeof buildMiniAppStartLink === "function" ? buildMiniAppStartLink("daily_prediction") : "";
      var shortText = "Моё покерное предсказание на сегодня:";
      if (prediction) shortText += "\n\n" + prediction;
      shortText += "\n\nПосмотрите своё предсказание здесь.";
      var shareUrl =
        typeof pokerBuildTelegramShareUrlDialog === "function" ? pokerBuildTelegramShareUrlDialog(link, shortText) : "";
      pokerTryPwaWebShare({ text: shortText + "\n\n" + link, url: link }).then(function (pwaOk) {
        if (pwaOk) return;
        var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tg && tg.openTelegramLink && shareUrl) tg.openTelegramLink(shareUrl);
        else if (shareUrl) window.open(shareUrl, "_blank", "noopener");
      });
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeDailyPredictionModal();
  });
  updateDailyPredictionBadge();
};

(function initChatNavDropdown() {
  window.closeChatNavDropdown = function () {};
})();

// Подстраницы раздела «Скачать»
const downloadAppButtons = document.querySelectorAll("[data-download-app]");
const downloadBackButtons = document.querySelectorAll("[data-download-back]");

function setDownloadPage(pageName) {
  // The download section is injected as an HTML fragment after this script can
  // initialize, so a module-level NodeList may be permanently empty.
  const downloadPages = document.querySelectorAll(".download-page[data-download-page]");
  downloadPages.forEach(function (page) {
    if (page.dataset.downloadPage === pageName) {
      page.classList.add("download-page--active");
    } else {
      page.classList.remove("download-page--active");
    }
  });
  var dlCc = typeof pokerGetDownloadCardContentScrollEl === "function" ? pokerGetDownloadCardContentScrollEl() : null;
  if (dlCc) dlCc.scrollTop = 0;
}

downloadAppButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    var app = btn.dataset.downloadApp;
    if (app) setDownloadPage(app);
  });
});

downloadBackButtons.forEach(function (btn) {
  btn.addEventListener("click", function () { setDownloadPage("main"); });
});

// Мини-игра «Найди Пиханину» — колода буби (13) + колода пики (13) + джокер Пиханина = 27 карт
const BONUS_DIAMONDS = ["2♦", "3♦", "4♦", "5♦", "6♦", "7♦", "8♦", "9♦", "10♦", "J♦", "Q♦", "K♦", "A♦"];
const BONUS_SPADES = ["2♠", "3♠", "4♠", "5♠", "6♠", "7♠", "8♠", "9♠", "10♠", "J♠", "Q♠", "K♠", "A♠"];
const BONUS_PIHANINA = "Пиханина";
const BONUS_ALL_SUITS = BONUS_DIAMONDS.concat(BONUS_SPADES);
const BONUS_GAME_CARDS_COUNT = 27;
const BONUS_PROMO_CODES = ["ПИХ200-7К2М", "ПИХ200-Л9Н4", "ПИХ200-П1РС", "ПИХ200-Т8УФ", "ПИХ200-Х3ЦЧ"];
const BONUS_MAX_ATTEMPTS = 5;
const BONUS_STORAGE_VERSION = "v3";
let bonusGameContents = [];
var bonusPikhaninaInterval = null;

function bonusStorageKey(name) {
  return name + getDeviceId() + "_" + BONUS_STORAGE_VERSION;
}

function getDeviceId() {
  var key = "poker_device_id";
  var id = localStorage.getItem(key);
  if (!id) {
    id = "dev_" + Date.now() + "_" + Math.random().toString(36).slice(2, 14);
    localStorage.setItem(key, id);
  }
  return id;
}

function getBonusAttempts() {
  return parseInt(localStorage.getItem(bonusStorageKey("poker_bonus_attempts_")) || "0", 10);
}

function setBonusAttempts(n) {
  localStorage.setItem(bonusStorageKey("poker_bonus_attempts_"), String(n));
}

function getUsedPromoIndices() {
  try {
    var raw = localStorage.getItem(bonusStorageKey("poker_bonus_used_promos_"));
    if (raw) return JSON.parse(raw);
    return [];
  } catch (_) {
    return [];
  }
}

function markPromoUsed(index) {
  var used = getUsedPromoIndices();
  if (used.indexOf(index) === -1) used.push(index);
  localStorage.setItem(bonusStorageKey("poker_bonus_used_promos_"), JSON.stringify(used));
}

function resetBonusLimitForDevice() {
  localStorage.removeItem(bonusStorageKey("poker_bonus_attempts_"));
  localStorage.removeItem(bonusStorageKey("poker_bonus_used_promos_"));
}

function updateBonusStats() {
  const attemptsEl = document.getElementById("bonusGameAttemptsCount");
  if (attemptsEl) attemptsEl.textContent = String(Math.max(0, BONUS_MAX_ATTEMPTS - getBonusAttempts()));
}

var PIKHANINA_DEFAULT_MAX = 15;

function updatePikhaninaStats() {
  const countEl = document.getElementById("bonusGamePromoCount");
  const allDoneEl = document.getElementById("bonusGameAllCodesDone");
  if (!countEl) return;
  const base = getApiBase();
  if (!base) {
    countEl.textContent = String(PIKHANINA_DEFAULT_MAX);
    if (allDoneEl) allDoneEl.style.display = "none";
    return;
  }
  fetch(base + "/api/pikhanina", { method: "GET" })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (data) {
      var remaining = (data && typeof data.remaining === "number") ? Math.min(data.remaining, PIKHANINA_DEFAULT_MAX) : PIKHANINA_DEFAULT_MAX;
      var s = String(remaining);
      if (countEl.textContent !== s) countEl.textContent = s;
      if (allDoneEl) {
        var show = remaining === 0 ? "block" : "none";
        if (allDoneEl.style.display !== show) allDoneEl.style.display = show;
      }
    })
    .catch(function () {
      var s = String(PIKHANINA_DEFAULT_MAX);
      if (countEl.textContent !== s) countEl.textContent = s;
      if (allDoneEl && allDoneEl.style.display !== "none") allDoneEl.style.display = "none";
    });
}

function notifyBonusWon(promoCode) {
  const base = getApiBase();
  if (!base) return;
  const tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
  const initData = tg && tg.initData ? tg.initData : "";
  if (!initData) return;
      fetch(base + "/api/pikhanina", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ initData: initData, promoCode: promoCode }),
  }).catch(function () {});
}

function getNextPromoCode() {
  const used = getUsedPromoIndices();
  const available = BONUS_PROMO_CODES.map(function (_, i) { return i; }).filter(function (i) { return used.indexOf(i) === -1; });
  if (available.length === 0) return null;
  const idx = available[Math.floor(Math.random() * available.length)];
  markPromoUsed(idx);
  return BONUS_PROMO_CODES[idx];
}

function getCardRank(str) {
  return str.replace("♦", "").replace("♠", "");
}

function buildCardFaceContent(value) {
  if (value === BONUS_PIHANINA) {
    return "<span class=\"bonus-card__face-text bonus-card__face--joker\">Пиханина</span>";
  }
  const rank = getCardRank(value);
  const isSpade = value.indexOf("♠") !== -1;
  const suit = isSpade ? "♠" : "♦";
  const suitClass = isSpade ? "bonus-card__suit bonus-card__suit--spade" : "bonus-card__suit";
  return "<span class=\"bonus-card__rank bonus-card__rank--tl\">" + rank + "</span>" +
         "<span class=\"bonus-card__rank bonus-card__rank--br\">" + rank + "</span>" +
         "<span class=\"" + suitClass + "\">" + suit + "</span>";
}

function initBonusGame() {
  const container = document.getElementById("bonusGameCards");
  const resultEl = document.getElementById("bonusGameResult");
  const retryBtn = document.getElementById("bonusGameRetry");
  const noAttemptsEl = document.getElementById("bonusGameNoAttempts");
  if (!container || !resultEl || !retryBtn) return;

  updateBonusStats();
  updatePikhaninaStats();
  const attempts = getBonusAttempts();
  if (attempts >= BONUS_MAX_ATTEMPTS) {
    container.innerHTML = "";
    container.style.display = "none";
    if (noAttemptsEl) noAttemptsEl.style.display = "block";
    retryBtn.style.display = "none";
    resultEl.textContent = "";
    return;
  }

  if (noAttemptsEl) noAttemptsEl.style.display = "none";
  container.style.display = "";

  const pihaninaIndex = Math.floor(Math.random() * BONUS_GAME_CARDS_COUNT);
  bonusGameContents = [];
  for (let i = 0; i < BONUS_GAME_CARDS_COUNT; i++) {
    bonusGameContents.push(i === pihaninaIndex ? BONUS_PIHANINA : BONUS_ALL_SUITS[i < pihaninaIndex ? i : i - 1]);
  }

  container.innerHTML = "";
  for (let i = 0; i < BONUS_GAME_CARDS_COUNT; i++) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "bonus-card";
    card.dataset.cardIndex = String(i);
    card.setAttribute("aria-label", "Карта " + (i + 1));
    card.innerHTML = "<span class=\"bonus-card__back\">Poker21</span><span class=\"bonus-card__face\" aria-hidden=\"true\"></span>";
    container.appendChild(card);
  }

  resultEl.textContent = "";
  resultEl.className = "bonus-game-result";
  retryBtn.style.display = "none";
}

document.getElementById("bonusGameCards")?.addEventListener("click", (e) => {
  const card = e.target.closest(".bonus-card");
  if (!card || card.classList.contains("bonus-card--revealed")) return;
  const resultEl = document.getElementById("bonusGameResult");
  const retryBtn = document.getElementById("bonusGameRetry");
  if (!resultEl || !retryBtn) return;

  const attempts = getBonusAttempts();
  if (attempts >= BONUS_MAX_ATTEMPTS) {
    resultEl.textContent = "Вы проиграли и не смогли поймать Пиханину, он ускользнул от вас и счастливый пошел пушить K6s.";
    resultEl.className = "bonus-game-result bonus-game-result--lose";
    return;
  }
  setBonusAttempts(attempts + 1);

  const cards = card.parentElement.querySelectorAll(".bonus-card");
  const clickedIndex = parseInt(card.dataset.cardIndex, 10);
  const isWin = bonusGameContents[clickedIndex] === BONUS_PIHANINA;

  cards.forEach((c, i) => {
    c.classList.add("bonus-card--revealed");
    c.disabled = true;
    const face = c.querySelector(".bonus-card__face");
    if (face) {
      face.innerHTML = buildCardFaceContent(bonusGameContents[i]);
    }
    if (bonusGameContents[i] === BONUS_PIHANINA) c.classList.add("bonus-card--win");
    else if (i === clickedIndex) c.classList.add("bonus-card--lose");
  });

  if (isWin) {
    const base = getApiBase();
    const onWinDone = function (remaining, promoCode) {
      updateBonusStats();
      let promoText;
      if (remaining === 0 || !promoCode) {
        promoText = "Их Пиханины уже выбили сегодня все бонусы, но вы можете сыграть просто так.";
      } else {
        promoText = "Поздравляем, вы поймали Пиханину! Ваш приз 200р. Промокод для получения — " + promoCode + ". Напишите его в чат игроков.";
      }
      resultEl.textContent = promoText;
      resultEl.classList.add("bonus-game-result--win");
      const tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (tg && tg.HapticFeedback) tg.HapticFeedback.notificationOccurred("success");
      if (promoCode) notifyBonusWon(promoCode);
      updatePikhaninaStats();
    };
    if (base) {
      fetch(base + "/api/pikhanina", { method: "GET" })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (data) {
          const remaining = (data && typeof data.remaining === "number") ? data.remaining : 0;
          const promoCode = remaining > 0 ? getNextPromoCode() : null;
          onWinDone(remaining, promoCode);
        })
        .catch(function () {
          const promoCode = getNextPromoCode();
          onWinDone(0, promoCode);
        });
    } else {
      const promoCode = getNextPromoCode();
      onWinDone(0, promoCode);
    }
  } else {
    const attemptsLeft = BONUS_MAX_ATTEMPTS - getBonusAttempts();
    resultEl.textContent = "Это не Пиханина. В следующий раз повезёт! Осталось попыток: " + attemptsLeft + ".";
    resultEl.classList.add("bonus-game-result--lose");
  }
  if (isWin) {
    retryBtn.style.display = "none";
    updateBonusStats();
  } else {
    const attemptsLeft = BONUS_MAX_ATTEMPTS - getBonusAttempts();
    updateBonusStats();
    if (attemptsLeft > 0) {
      retryBtn.style.display = "block";
    } else {
      retryBtn.style.display = "none";
      resultEl.textContent = "Вы проиграли и не смогли поймать Пиханину, он ускользнул от вас и счастливый пошел пушить K6s.";
    }
  }
  updateBonusStats();
});

document.getElementById("bonusGameRetry")?.addEventListener("click", function () {
  initBonusGame();
});

// Мини-игра «Слезы Кулера» — 27 карт (буби + пики + платок), найти платок = билет на турнир
const COOLER_HANDKERCHIEF = "Платок";
let coolerGameContents = [];

function buildCoolerCardFaceContent(value) {
  if (value === COOLER_HANDKERCHIEF) {
    return "<span class=\"bonus-card__face-text bonus-card__face--joker\">Платок</span>";
  }
  const rank = getCardRank(value);
  const isSpade = value.indexOf("♠") !== -1;
  const suit = isSpade ? "♠" : "♦";
  const suitClass = isSpade ? "bonus-card__suit bonus-card__suit--spade" : "bonus-card__suit";
  return "<span class=\"bonus-card__rank bonus-card__rank--tl\">" + rank + "</span>" +
         "<span class=\"bonus-card__rank bonus-card__rank--br\">" + rank + "</span>" +
         "<span class=\"" + suitClass + "\">" + suit + "</span>";
}

function initCoolerGame() {
  const container = document.getElementById("coolerGameCards");
  const resultEl = document.getElementById("coolerGameResult");
  const retryBtn = document.getElementById("coolerGameRetry");
  if (!container || !resultEl || !retryBtn) return;

  const handkerchiefIndex = Math.floor(Math.random() * BONUS_GAME_CARDS_COUNT);
  coolerGameContents = [];
  for (let i = 0; i < BONUS_GAME_CARDS_COUNT; i++) {
    coolerGameContents.push(i === handkerchiefIndex ? COOLER_HANDKERCHIEF : BONUS_ALL_SUITS[i < handkerchiefIndex ? i : i - 1]);
  }

  container.innerHTML = "";
  for (let i = 0; i < BONUS_GAME_CARDS_COUNT; i++) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "bonus-card";
    card.dataset.cardIndex = String(i);
    card.setAttribute("aria-label", "Карта " + (i + 1));
    card.innerHTML = "<span class=\"bonus-card__back\">Poker21</span><span class=\"bonus-card__face\" aria-hidden=\"true\"></span>";
    container.appendChild(card);
  }

  resultEl.textContent = "";
  resultEl.className = "bonus-game-result";
  retryBtn.style.display = "none";
}

document.getElementById("coolerGameCards")?.addEventListener("click", (e) => {
  const card = e.target.closest(".bonus-card");
  if (!card || card.classList.contains("bonus-card--revealed")) return;
  const resultEl = document.getElementById("coolerGameResult");
  const retryBtn = document.getElementById("coolerGameRetry");
  if (!resultEl || !retryBtn) return;

  const cards = card.parentElement.querySelectorAll(".bonus-card");
  const clickedIndex = parseInt(card.dataset.cardIndex, 10);
  const isWin = coolerGameContents[clickedIndex] === COOLER_HANDKERCHIEF;

  cards.forEach((c, i) => {
    c.classList.add("bonus-card--revealed");
    c.disabled = true;
    const face = c.querySelector(".bonus-card__face");
    if (face) {
      face.innerHTML = buildCoolerCardFaceContent(coolerGameContents[i]);
    }
    if (coolerGameContents[i] === COOLER_HANDKERCHIEF) c.classList.add("bonus-card--win");
    else if (i === clickedIndex) c.classList.add("bonus-card--lose");
  });

  if (isWin) {
    resultEl.textContent = "Спасибо! Кулер вытер слёзы и дал вам билет на турнир. Напишите в чат игроков.";
    resultEl.classList.add("bonus-game-result--win");
    retryBtn.style.display = "none";
    const tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    if (tg && tg.HapticFeedback) tg.HapticFeedback.notificationOccurred("success");
  } else {
    resultEl.textContent = "Это не платок. Попробуйте ещё раз!";
    resultEl.classList.add("bonus-game-result--lose");
    retryBtn.style.display = "block";
  }
});

document.getElementById("coolerGameRetry")?.addEventListener("click", function () {
  initCoolerGame();
});

// Игра «Переедь Штукатура» — попытки безлимитные, считаем попытки до победы
var PLASTERER_RANKS = "2 3 4 5 6 7 8 9 T J Q K A".split(" ");
var PLASTERER_SUITS = ["\u2660", "\u2665", "\u2666", "\u2663"];
var plastererDeck = [];
var plastererOpponentHand = [];
var plastererPlayerHand = [];
var plastererBoardCards = [];
var plastererAttemptCount = 0;
var plastererBoardStep = 0;

function buildPlastererDeck() {
  var d = [];
  for (var s = 0; s < PLASTERER_SUITS.length; s++) {
    for (var r = 0; r < PLASTERER_RANKS.length; r++) {
      d.push(PLASTERER_RANKS[r] + PLASTERER_SUITS[s]);
    }
  }
  return d;
}

function shufflePlasterer(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
  }
  return arr;
}

function plastererCardRank(card) {
  var r = card.charAt(0);
  var i = PLASTERER_RANKS.indexOf(r);
  return i >= 0 ? i : 0;
}

function plastererCardSuit(card) {
  return card.length >= 2 ? card.charAt(1) : "";
}

function plastererEval5(cards) {
  var ranks = cards.map(plastererCardRank).sort(function (a, b) { return b - a; });
  var suits = cards.map(plastererCardSuit);
  var countByRank = {};
  var countBySuit = {};
  for (var i = 0; i < 5; i++) {
    countByRank[ranks[i]] = (countByRank[ranks[i]] || 0) + 1;
    countBySuit[suits[i]] = (countBySuit[suits[i]] || 0) + 1;
  }
  var flush = Object.keys(countBySuit).length === 1;
  var sorted = ranks.slice().sort(function (a, b) { return a - b; });
  var wheel = sorted[0] === 0 && sorted[1] === 1 && sorted[2] === 2 && sorted[3] === 3 && sorted[4] === 12;
  var straight = wheel || (sorted[4] - sorted[0] === 4 && sorted[1] - sorted[0] === 1 && sorted[2] - sorted[1] === 1 && sorted[3] - sorted[2] === 1 && sorted[4] - sorted[3] === 1);
  var quads = false, set = false, pairCount = 0, pairRank = -1, pairRank2 = -1, setRank = -1, quadRank = -1;
  for (var r = 12; r >= 0; r--) {
    var c = countByRank[r] || 0;
    if (c === 4) { quads = true; quadRank = r; }
    if (c === 3) { set = true; setRank = r; }
    if (c === 2) { pairCount++; if (pairRank < 0) pairRank = r; else if (pairRank2 < 0) pairRank2 = r; }
  }
  var kickers = ranks.filter(function (x) {
    if (quadRank >= 0 && x === quadRank) return false;
    if (setRank >= 0 && x === setRank) return false;
    if (pairRank >= 0 && x === pairRank) return false;
    if (pairRank2 >= 0 && x === pairRank2) return false;
    return true;
  }).slice(0, 5);
  var score = 0;
  if (flush && straight) score = 11000000000 + (wheel ? 0 : sorted[4]) * 1e7;
  else if (quads) score = 10000000000 + quadRank * 1e8 + (kickers[0] !== undefined ? kickers[0] : 0) * 1e6;
  else if (set && pairCount >= 1) score = 9000000000 + setRank * 1e8 + pairRank * 1e6;
  else if (flush) score = 8000000000 + ranks[0] * 1e7 + ranks[1] * 1e5 + ranks[2] * 1e3 + ranks[3] * 10 + ranks[4];
  else if (straight) score = 7000000000 + (wheel ? 0 : sorted[4]) * 1e7;
  else if (set) score = 6000000000 + setRank * 1e8 + (kickers[0] !== undefined ? kickers[0] : 0) * 1e6 + (kickers[1] !== undefined ? kickers[1] : 0) * 1e4;
  else if (pairCount === 2) score = 4000000000 + Math.max(pairRank, pairRank2) * 1e8 + Math.min(pairRank, pairRank2) * 1e6 + (kickers[0] !== undefined ? kickers[0] : 0) * 1e4;
  else if (pairCount === 1) score = 2000000000 + pairRank * 1e8 + (kickers[0] !== undefined ? kickers[0] : 0) * 1e6 + (kickers[1] !== undefined ? kickers[1] : 0) * 1e4 + (kickers[2] !== undefined ? kickers[2] : 0) * 1e2;
  else score = 1000000000 + ranks[0] * 1e7 + ranks[1] * 1e5 + ranks[2] * 1e3 + ranks[3] * 10 + ranks[4];
  return score;
}

function plastererBestHand(seven) {
  var best = 0;
  for (var i = 0; i < 7; i++) {
    for (var j = i + 1; j < 7; j++) {
      var five = seven.filter(function (_, idx) { return idx !== i && idx !== j; });
      var s = plastererEval5(five);
      if (s > best) best = s;
    }
  }
  return best;
}

var PLASTERER_RANK_NAMES = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "валета", "дамы", "короля", "туза"];
var PLASTERER_RANK_NAMES_PLURAL = ["двоек", "троек", "четвёрок", "пятёрок", "шестёрок", "семёрок", "восьмёрок", "девяток", "десяток", "валетов", "дам", "королей", "тузов"];

function plastererGetHandName5(fiveCards) {
  if (!fiveCards || fiveCards.length !== 5) return "";
  var ranks = fiveCards.map(plastererCardRank).sort(function (a, b) { return b - a; });
  var suits = fiveCards.map(plastererCardSuit);
  var countByRank = {};
  var countBySuit = {};
  for (var i = 0; i < 5; i++) {
    countByRank[ranks[i]] = (countByRank[ranks[i]] || 0) + 1;
    countBySuit[suits[i]] = (countBySuit[suits[i]] || 0) + 1;
  }
  var flush = Object.keys(countBySuit).length === 1;
  var sorted = ranks.slice().sort(function (a, b) { return a - b; });
  var wheel = sorted[0] === 0 && sorted[1] === 1 && sorted[2] === 2 && sorted[3] === 3 && sorted[4] === 12;
  var straight = wheel || (sorted[4] - sorted[0] === 4 && sorted[1] - sorted[0] === 1 && sorted[2] - sorted[1] === 1 && sorted[3] - sorted[2] === 1 && sorted[4] - sorted[3] === 1);
  var quads = false, set = false, pairCount = 0, pairRank = -1, pairRank2 = -1, setRank = -1, quadRank = -1;
  for (var r = 12; r >= 0; r--) {
    var c = countByRank[r] || 0;
    if (c === 4) { quads = true; quadRank = r; }
    if (c === 3) { set = true; setRank = r; }
    if (c === 2) { pairCount++; if (pairRank < 0) pairRank = r; else if (pairRank2 < 0) pairRank2 = r; }
  }
  var rn = function (i) { return PLASTERER_RANK_NAMES[i] || ""; };
  var rnPlural = function (i) { return PLASTERER_RANK_NAMES_PLURAL[i] || rn(i); };
  if (flush && straight) return wheel ? "Стрит-флеш (колесо)" : "Стрит-флеш";
  if (quads) return "Каре " + rnPlural(quadRank);
  if (set && pairCount >= 1) return "Фулл-хаус (" + rnPlural(setRank) + " и " + rnPlural(pairRank) + ")";
  if (flush) return "Флеш";
  if (straight) return wheel ? "Стрит (колесо)" : "Стрит";
  if (set) return "Сет " + rnPlural(setRank);
  if (pairCount === 2) return "Две пары (" + rnPlural(Math.max(pairRank, pairRank2)) + " и " + rnPlural(Math.min(pairRank, pairRank2)) + ")";
  if (pairCount === 1) return "Пара " + rnPlural(pairRank);
  return "Старшая карта " + rn(ranks[0]);
}

function plastererPlayerBestHandName(knownBoardCount) {
  var cards = plastererPlayerHand.concat(plastererBoardCards.slice(0, knownBoardCount));
  if (cards.length < 5) return "";
  var bestScore = 0, bestFive = null;
  if (cards.length === 5) {
    bestFive = cards;
    bestScore = plastererEval5(cards);
  } else {
    if (cards.length === 6) {
      for (var i = 0; i < cards.length; i++) {
        var five = cards.filter(function (_, idx) { return idx !== i; });
        var s = plastererEval5(five);
        if (s > bestScore) { bestScore = s; bestFive = five; }
      }
    } else {
      for (var i = 0; i < cards.length; i++) {
        for (var j = i + 1; j < cards.length; j++) {
          var five = cards.filter(function (_, idx) { return idx !== i && idx !== j; });
          var s = plastererEval5(five);
          if (s > bestScore) { bestScore = s; bestFive = five; }
        }
      }
    }
  }
  return bestFive ? plastererGetHandName5(bestFive) : "";
}

function plastererOpponentBestHandName(knownBoardCount) {
  var cards = plastererOpponentHand.concat(plastererBoardCards.slice(0, knownBoardCount));
  if (cards.length < 5) return "";
  var bestScore = 0, bestFive = null;
  if (cards.length === 5) {
    bestFive = cards;
    bestScore = plastererEval5(cards);
  } else {
    if (cards.length === 6) {
      for (var i = 0; i < cards.length; i++) {
        var five = cards.filter(function (_, idx) { return idx !== i; });
        var s = plastererEval5(five);
        if (s > bestScore) { bestScore = s; bestFive = five; }
      }
    } else {
      for (var i = 0; i < cards.length; i++) {
        for (var j = i + 1; j < cards.length; j++) {
          var five = cards.filter(function (_, idx) { return idx !== i && idx !== j; });
          var s = plastererEval5(five);
          if (s > bestScore) { bestScore = s; bestFive = five; }
        }
      }
    }
  }
  return bestFive ? plastererGetHandName5(bestFive) : "";
}

var PLASTERER_RANK_DISPLAY = { "2": "2", "3": "3", "4": "4", "5": "5", "6": "6", "7": "7", "8": "8", "9": "9", "T": "10", "J": "J", "Q": "Q", "K": "K", "A": "A" };

function plastererSuitToKey(suitCh) {
  return suitCh === "\u2660" ? "s" : suitCh === "\u2665" ? "h" : suitCh === "\u2666" ? "d" : suitCh === "\u2663" ? "c" : "";
}

function renderPlastererCardBack() {
  return "<div class=\"equilator-card-slot plasterer-card\"><span class=\"equilator-card-slot__text\">—</span></div>";
}

function renderPlastererCard(card) {
  if (!card || card.length < 2) return "";
  var rankCh = card.charAt(0);
  var suitCh = card.charAt(1);
  var suitKey = plastererSuitToKey(suitCh);
  if (!suitKey) return "";
  var rank = rankCh;
  var label = (PLASTERER_RANK_DISPLAY[rank] || rank) + suitCh;
  var suitClass = suitKey === "s" ? "equilator-card-slot--spade" : suitKey === "h" ? "equilator-card-slot--heart" : suitKey === "d" ? "equilator-card-slot--diamond" : "equilator-card-slot--club";
  return "<div class=\"equilator-card-slot plasterer-card " + suitClass + "\" data-rank=\"" + rank.replace(/"/g, "&quot;") + "\" data-suit=\"" + suitKey + "\"><span class=\"equilator-card-slot__text\">" + label.replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</span></div>";
}

function renderPlastererCards(containerId, cards, showBacks) {
  var el = document.getElementById(containerId);
  if (!el) return;
  if (showBacks && cards.length > 0) {
    el.innerHTML = Array(cards.length).fill(0).map(function () { return renderPlastererCardBack(); }).join("");
  } else {
    el.innerHTML = cards.map(function (c) { return renderPlastererCard(c); }).join("");
  }
}

function initPlastererGame() {
  var nameEl = document.getElementById("plastererPlayerName");
  if (nameEl) {
    var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    var user = tg && tg.initDataUnsafe && tg.initDataUnsafe.user;
    nameEl.textContent = user && user.first_name ? user.first_name : "Вы";
  }
  plastererAttemptCount = 0;
  dealPlastererHands();
  renderPlastererCards("plastererOpponentCards", plastererOpponentHand, true);
  renderPlastererCards("plastererPlayerCards", plastererPlayerHand, true);
  plastererBoardStep = 0;
  ["plastererFlop0", "plastererFlop1", "plastererFlop2", "plastererTurn", "plastererRiver"].forEach(function (id) {
    var slot = document.getElementById(id);
    if (slot) { slot.innerHTML = ""; slot.classList.remove("has-card"); }
  });
  var resultEl = document.getElementById("plastererResult");
  if (resultEl) { resultEl.textContent = ""; resultEl.className = "plasterer-result"; }
  var oppEq = document.getElementById("plastererOpponentEquity");
  var plEq = document.getElementById("plastererPlayerEquity");
  if (oppEq) oppEq.textContent = "";
  if (plEq) plEq.textContent = "";
  var handNameEl = document.getElementById("plastererPlayerHandName");
  if (handNameEl) handNameEl.textContent = "";
  var oppHandNameEl = document.getElementById("plastererOpponentHandName");
  if (oppHandNameEl) oppHandNameEl.textContent = "";
  var avatarImg = document.getElementById("plastererOpponentAvatarImg");
  if (avatarImg) avatarImg.src = "./assets/plasterer-smile.png";
  var dealBtn = document.getElementById("plastererDealBtn");
  var spinBtn = document.getElementById("plastererSpinBtn");
  var againBtn = document.getElementById("plastererPlayAgainBtn");
  if (dealBtn) dealBtn.style.display = "";
  if (spinBtn) spinBtn.style.display = "none";
  if (againBtn) againBtn.style.display = "none";
}

function dealPlastererHands() {
  var deck = buildPlastererDeck();
  var aces = deck.filter(function (c) { return c.charAt(0) === "A"; });
  shufflePlasterer(aces);
  plastererOpponentHand = aces.slice(0, 2);
  var rest = deck.filter(function (c) { return plastererOpponentHand.indexOf(c) < 0; });
  shufflePlasterer(rest);
  plastererPlayerHand = rest.slice(0, 2);
  plastererBoardCards = rest.slice(2, 7);
}

function plastererEquity(knownBoardCount) {
  knownBoardCount = knownBoardCount || 0;
  var known = plastererOpponentHand.concat(plastererPlayerHand);
  var boardKnown = plastererBoardCards.slice(0, knownBoardCount);
  for (var i = 0; i < boardKnown.length; i++) known.push(boardKnown[i]);
  var deck = buildPlastererDeck();
  var remaining = deck.filter(function (c) { return known.indexOf(c) < 0; });
  var need = 5 - knownBoardCount;
  var playerWins = 0, oppWins = 0, ties = 0;
  var trials = 1500;
  for (var t = 0; t < trials; t++) {
    shufflePlasterer(remaining);
    var board = boardKnown.concat(remaining.slice(0, need));
    var oppScore = plastererBestHand(plastererOpponentHand.concat(board));
    var plScore = plastererBestHand(plastererPlayerHand.concat(board));
    if (plScore > oppScore) playerWins++;
    else if (plScore < oppScore) oppWins++;
    else ties++;
  }
  return {
    player: (playerWins / trials) * 100,
    opponent: (oppWins / trials) * 100,
    tie: (ties / trials) * 100
  };
}

function formatEquityPct(value) {
  if (value >= 99.95) return "100%";
  if (value > 0 && value < 1) return value.toFixed(2) + "%";
  if (value === 0) return "0.0%";
  if (value >= 1 && value < 99) return Math.round(value) + "%";
  if (value >= 99) return value.toFixed(1) + "%";
  return value.toFixed(1) + "%";
}

function updatePlastererEquity(knownBoardCount) {
  var eq = plastererEquity(knownBoardCount);
  var oppEl = document.getElementById("plastererOpponentEquity");
  var plEl = document.getElementById("plastererPlayerEquity");
  if (oppEl) oppEl.textContent = "Шансы на победу: " + formatEquityPct(eq.opponent);
  if (plEl) plEl.textContent = "Шансы на победу: " + formatEquityPct(eq.player);
  var plHandEl = document.getElementById("plastererPlayerHandName");
  if (plHandEl) plHandEl.textContent = knownBoardCount === 0 ? "—" : plastererPlayerBestHandName(knownBoardCount);
  var oppHandEl = document.getElementById("plastererOpponentHandName");
  if (oppHandEl) oppHandEl.textContent = knownBoardCount === 0 ? "—" : plastererOpponentBestHandName(knownBoardCount);
}

function showPlastererBoard() {
  var ids = ["plastererFlop0", "plastererFlop1", "plastererFlop2", "plastererTurn", "plastererRiver"];
  ids.forEach(function (id, i) {
    var slot = document.getElementById(id);
    if (slot && plastererBoardCards[i]) {
      slot.innerHTML = renderPlastererCard(plastererBoardCards[i]);
      slot.classList.add("has-card");
    }
  });
}

function dealPlastererOnly() {
  plastererAttemptCount++;
  dealPlastererHands();
  renderPlastererCards("plastererOpponentCards", plastererOpponentHand, false);
  renderPlastererCards("plastererPlayerCards", plastererPlayerHand, false);
  ["plastererFlop0", "plastererFlop1", "plastererFlop2", "plastererTurn", "plastererRiver"].forEach(function (id) {
    var slot = document.getElementById(id);
    if (slot) { slot.innerHTML = ""; slot.classList.remove("has-card"); }
  });
  var resultEl = document.getElementById("plastererResult");
  if (resultEl) resultEl.textContent = "";
  plastererBoardStep = 0;
  var dealBtn = document.getElementById("plastererDealBtn");
  var spinBtn = document.getElementById("plastererSpinBtn");
  if (dealBtn) dealBtn.style.display = "none";
  if (spinBtn) {
    spinBtn.style.display = "";
    spinBtn.textContent = "Крути шарманку";
  }
  updatePlastererEquity(0);
}

function runPlastererBoardStep() {
  var spinBtn = document.getElementById("plastererSpinBtn");
  var resultEl = document.getElementById("plastererResult");

  if (plastererBoardStep === 0) {
    var ids = ["plastererFlop0", "plastererFlop1", "plastererFlop2"];
    ids.forEach(function (id, i) {
      var slot = document.getElementById(id);
      if (slot && plastererBoardCards[i]) {
        slot.innerHTML = renderPlastererCard(plastererBoardCards[i]);
        slot.classList.add("has-card");
      }
    });
    plastererBoardStep = 1;
    if (spinBtn) spinBtn.textContent = "Показать терн";
    updatePlastererEquity(3);
    return;
  }

  if (plastererBoardStep === 1) {
    var slot = document.getElementById("plastererTurn");
    if (slot && plastererBoardCards[3]) {
      slot.innerHTML = renderPlastererCard(plastererBoardCards[3]);
      slot.classList.add("has-card");
    }
    plastererBoardStep = 2;
    if (spinBtn) spinBtn.textContent = "Показать ривер";
    updatePlastererEquity(4);
    return;
  }

  if (plastererBoardStep === 2) {
    var riverSlot = document.getElementById("plastererRiver");
    if (riverSlot && plastererBoardCards[4]) {
      riverSlot.innerHTML = renderPlastererCard(plastererBoardCards[4]);
      riverSlot.classList.add("has-card");
    }
    renderPlastererCards("plastererOpponentCards", plastererOpponentHand, false);
    renderPlastererCards("plastererPlayerCards", plastererPlayerHand, false);
    updatePlastererEquity(5);
    var oppScore = plastererBestHand(plastererOpponentHand.concat(plastererBoardCards));
    var plScore = plastererBestHand(plastererPlayerHand.concat(plastererBoardCards));
    if (resultEl) {
      var avatarImg = document.getElementById("plastererOpponentAvatarImg");
      if (plScore > oppScore) {
        if (avatarImg) avatarImg.src = "./assets/plasterer-sad.png";
        var ord = plastererAttemptCount === 1 ? "1-й" : plastererAttemptCount + "-й";
        resultEl.textContent = "Вы выиграли Штукатура с " + ord + " попытки!";
        resultEl.className = "plasterer-result plasterer-result--win";
        var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
        if (tg && tg.HapticFeedback) tg.HapticFeedback.notificationOccurred("success");
        var againBtn = document.getElementById("plastererPlayAgainBtn");
        if (spinBtn) spinBtn.style.display = "none";
        if (againBtn) againBtn.style.display = "";
      } else if (plScore < oppScore) {
        if (avatarImg) avatarImg.src = "./assets/plasterer-happy.png";
        resultEl.textContent = "Штукатур победил. В следующий раз повезёт!";
        resultEl.className = "plasterer-result plasterer-result--lose";
        if (spinBtn) spinBtn.style.display = "none";
        var dealBtn = document.getElementById("plastererDealBtn");
        if (dealBtn) dealBtn.style.display = "";
      } else {
        if (avatarImg) avatarImg.src = "./assets/plasterer-smile.png";
        resultEl.textContent = "Ничья!";
        resultEl.className = "plasterer-result";
        if (spinBtn) spinBtn.style.display = "none";
        var dealBtn = document.getElementById("plastererDealBtn");
        if (dealBtn) dealBtn.style.display = "";
      }
    }
  }
}

document.getElementById("plastererDealBtn")?.addEventListener("click", function () {
  dealPlastererOnly();
});

document.getElementById("plastererSpinBtn")?.addEventListener("click", function () {
  runPlastererBoardStep();
});

document.getElementById("plastererPlayAgainBtn")?.addEventListener("click", function () {
  initPlastererGame();
});

// Рендомайзер: из чисел 1..N выбрать K случайных
(function initRandomizer() {
  var maxInput = document.getElementById("randomizerMax");
  var countInput = document.getElementById("randomizerCount");
  var btn = document.getElementById("randomizerPickBtn");
  var resultEl = document.getElementById("randomizerResult");
  if (!btn || !maxInput || !countInput || !resultEl) return;
  btn.addEventListener("click", function () {
    var max = parseInt(maxInput.value, 10) || 0;
    var count = parseInt(countInput.value, 10) || 0;
    if (max < 1) { resultEl.textContent = "Введите число не меньше 1."; resultEl.className = "randomizer-result randomizer-result--error"; return; }
    if (count < 1) { resultEl.textContent = "Количество победителей не меньше 1."; resultEl.className = "randomizer-result randomizer-result--error"; return; }
    if (count > max) { resultEl.textContent = "Количество победителей не может быть больше " + max + "."; resultEl.className = "randomizer-result randomizer-result--error"; return; }
    var pool = [];
    for (var i = 1; i <= max; i++) pool.push(i);
    for (var j = pool.length - 1; j > 0; j--) {
      var r = Math.floor(Math.random() * (j + 1));
      var t = pool[j]; pool[j] = pool[r]; pool[r] = t;
    }
    var winners = pool.slice(0, count).sort(function (a, b) { return a - b; });
    resultEl.textContent = count === 1 ? "Победитель: " + winners[0] : "Победители: " + winners.join(", ");
    resultEl.className = "randomizer-result randomizer-result--ok";
  });
})();

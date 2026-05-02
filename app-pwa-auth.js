function telegramUserDisplayName(u) {
  if (!u || typeof u !== "object") return "";
  var fn = u.first_name != null ? String(u.first_name).trim() : "";
  if (fn) return fn;
  var ln = u.last_name != null ? String(u.last_name).trim() : "";
  if (ln) return ln;
  var un = u.username != null ? String(u.username).trim() : "";
  if (un) return un.replace(/^@+/, "");
  return "";
}

var POKER_PROFILE_DISPLAY_NAME_KEY = "poker_profile_display_name";
function pokerReadStoredProfileDisplayName() {
  try {
    var raw = typeof localStorage !== "undefined" ? localStorage.getItem(POKER_PROFILE_DISPLAY_NAME_KEY) : "";
    return String(raw || "").trim();
  } catch (eProfileNameRead) {
    return "";
  }
}
function pokerWriteStoredProfileDisplayName(name) {
  try {
    if (typeof localStorage === "undefined") return;
    var value = String(name || "").trim();
    if (value) localStorage.setItem(POKER_PROFILE_DISPLAY_NAME_KEY, value);
    else localStorage.removeItem(POKER_PROFILE_DISPLAY_NAME_KEY);
  } catch (eProfileNameWrite) {}
}

function pokerPreferredProfileDisplayName() {
  var profileName = "";
  try {
    profileName = String(window.__pokerChatDisplayName || "").trim();
  } catch (eStoredProfileName) {}
  if (profileName) return profileName;
  profileName = pokerReadStoredProfileDisplayName();
  if (profileName) return profileName;
  try {
    var input = document.getElementById("profileChatDisplayNameInput");
    var typed = input && input.value != null ? String(input.value).trim() : "";
    if (typed) return typed;
  } catch (eInputProfileName) {}
  return "";
}

/**
 * Пользователь Telegram для UI: сначала initDataUnsafe, затем серверно подтверждённый профиль.
 * Нужен, когда initData ещё пуст (гонка клиента) или профиль обновился после /api/auth-telegram.
 */
function getPokerResolvedTelegramUser() {
  var w = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
  var u = w && w.initDataUnsafe && w.initDataUnsafe.user;
  if (u && u.id != null) return u;
  try {
    var _auth = window.__pokerTelegramAuth;
    if (_auth && _auth.user && _auth.user.id != null && (_auth.status === "verified" || _auth.status === "dev_skip")) {
      return _auth.user;
    }
  } catch (eA) {}
  return null;
}

// Авторизация через Telegram: обязательная проверка подписи initData на сервере (/api/auth-telegram)
(function initTelegramAuth() {
  window.__pokerTelegramAuth = { status: "unknown", user: null, error: null };
  try {
    localStorage.removeItem(POKER_PWA_GUEST_KEY);
  } catch (eLegacyGuest) {}

  /** Актуальный WebApp (не замыкание на старый объект — иногда initData появляется с задержкой). */
  function getTelegramWebAppNow() {
    return isTelegramWebApp() && window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
  }

  var banner = document.getElementById("authBanner");
  var bannerLink = document.getElementById("authBannerLink");
  var bannerText = document.getElementById("authBannerText");
  var bannerRetry = document.getElementById("authBannerRetry");
  var userEl = document.getElementById("authUser");
  var appEl = document.getElementById("app");
  var pwaAuthScreenEl = document.getElementById("pwaAuthScreen");
  var pwaAuthLoginMountEl = document.getElementById("pwaAuthLoginMount");
  var telegramAppUrl = (appEl && appEl.getAttribute("data-telegram-app-url")) || "";
  var hintEl = document.getElementById("authBannerHint");
  var identifyingMiniEl = document.getElementById("authIdentifyingMini");
  var PWA_AUTH_LANG_KEY = "poker_pwa_auth_lang";
  var pwaAuthLangRuBtn = document.getElementById("pwaAuthLangRuBtn");
  var pwaAuthLangEnBtn = document.getElementById("pwaAuthLangEnBtn");
  var profileLangSwitch = document.getElementById("profileLangSwitch");
  var profileLangRuBtn = document.getElementById("profileLangRuBtn");
  var profileLangEnBtn = document.getElementById("profileLangEnBtn");
  var authFlowGeneration = 0;

  function restoreSavedPwaAuthBeforeGate() {
    try {
      if (typeof pokerReadPwaTgSessionRecord === "function") {
        var tgRecord = pokerReadPwaTgSessionRecord();
        if (tgRecord && tgRecord.user && tgRecord.user.id != null && tgRecord.token) {
          var tgUser = normalizeVerifiedUser(tgRecord.user, null);
          var tgAuth = { status: "verified", user: tgUser, error: null };
          if (tgRecord.gazettePlannerAccess === true) tgAuth.gazettePlannerAccess = true;
          if (tgRecord.adminAccess === true) tgAuth.adminAccess = true;
          if (tgRecord.adminReportAccess === true) tgAuth.adminReportAccess = true;
          window.__pokerTelegramAuth = tgAuth;
          pokerMaybeRememberMemberIdFromUser(tgUser);
          pokerSetAuthMethod(tgRecord.authMethod || "telegram");
          return true;
        }
      }
    } catch (eRestoreTgEarly) {}
    try {
      if (typeof pokerReadPwaVkSessionRecord === "function") {
        var vkRecord = pokerReadPwaVkSessionRecord();
        if (vkRecord && vkRecord.user && vkRecord.user.id != null && vkRecord.token) {
          var vkUser = normalizeVerifiedUser(vkRecord.user, null);
          window.__pokerTelegramAuth = { status: "verified", user: vkUser, error: null };
          pokerMaybeRememberMemberIdFromUser(vkUser);
          pokerSetAuthMethod(vkRecord.authMethod || "vk");
          return true;
        }
      }
    } catch (eRestoreVkEarly) {}
    return false;
  }

  function bumpAuthFlowGeneration() {
    authFlowGeneration += 1;
    return authFlowGeneration;
  }

  function getPwaAuthLocale() {
    try {
      var raw = typeof localStorage !== "undefined" ? localStorage.getItem(PWA_AUTH_LANG_KEY) : "";
      return String(raw || "").toLowerCase() === "en" ? "en" : "ru";
    } catch (eAuthLang) {
      return "ru";
    }
  }

  function setPwaAuthLocale(locale) {
    var next = String(locale || "").toLowerCase() === "en" ? "en" : "ru";
    var prev = getPwaAuthLocale();
    try {
      if (typeof localStorage !== "undefined") localStorage.setItem(PWA_AUTH_LANG_KEY, next);
    } catch (eSaveAuthLang) {}
    syncPwaAuthLanguageUi();
    syncProfileLanguageUi();
    syncGlobalAppLanguageUi();
    rerenderCurrentPwaAuthScreen();
  }

  function pwaAuthT(key) {
    var locale = getPwaAuthLocale();
    var dict = {
      ru: {
        langSwitchAria: "Выбор языка",
        identifying: "Подождите, идентифицируем ваш аккаунт",
        enterEmail: "Войти через почту",
        enterTelegram: "Войти через Telegram",
        enterGuest: "Войти, как гость",
        guestNote: "Гость не может участвовать в розыгрышах и общаться в чате",
        backToChoice: "Назад к выбору входа",
        rememberPassword: "Сохранить пароль",
        login: "Войти",
        register: "Зарегистрироваться",
        switchToLogin: "У меня уже есть аккаунт",
        switchToRegister: "Создать новый аккаунт или обновить пароль для старого",
        usernameIntro1: "Укажите ниже ваш @username из Телеграм.",
        usernameIntro2: "Если этот Telegram уже подтверждали раньше, дальше достаточно логина и пароля.",
        usernameIntro3: "Код подтверждения придёт в Telegram в бота",
        usernameIntro4: "Если входите впервые, нажмите «Зарегистрироваться», сначала откройте бота",
        usernameIntro5: "и отправьте /start, затем нажмите здесь «Получить код», введите код из бота и задайте пароль.",
        usernamePlaceholder: "@Username из Telegram",
        sendCode: "Получить код",
        sendingCode: "Отправляем…",
        codeFromTelegram: "Код из Telegram",
        done: "Подтвердить",
        verifying: "Проверяем…",
        setPassword: "Установите пароль",
        confirmPassword: "Подтверждение пароля",
        showPassword: "Показать пароль",
        hidePassword: "Скрыть пароль",
        invalidUsernameShort: "Сначала укажите корректный username.",
        invalidUsernameLong: "Укажите корректный username (5-32, латиница/цифры/_).",
        checkingPassword: "Проверяем пароль…",
        loginFailed: "Не удалось войти.",
        networkRetry: "Сеть недоступна. Попробуйте снова.",
        invalidServerResponse: "Некорректный ответ сервера",
        sentTelegramCode: "Код отправлен в Telegram.",
        sendCodeFailed: "Не удалось отправить код.",
        telegramPasswordSetupHint: "Пароль для этого Telegram ещё не задан. Нажмите «Получить код», введите код из бота и задайте пароль.",
        passwordsMismatch: "Пароли не совпадают.",
        enterTelegramCode: "Введите 6-значный код из Telegram.",
        codeNotVerified: "Код не подтверждён.",
        emailIntro1: "Введите ваш email.",
        emailIntro2: "Если вы уже подтверждали эту почту, дальше достаточно email и пароля.",
        emailIntro3: "Если входите впервые, нажмите «Зарегистрироваться», получите код, подтвердите его и этим же задайте пароль для всего аккаунта.",
        emailCodePlaceholder: "Код из письма",
        emailVerify: "Подтвердить",
        emailCheckingPassword: "Проверяем пароль…",
        emailSendCode: "Отправить код",
        emailSendingCode: "Отправляем код…",
        emailCheckingCode: "Проверяем код…",
        emailLoginFailed: "Не удалось войти.",
        emailSendFailed: "Не удалось отправить код.",
        emailSentDefault: "Код отправлен на почту.",
        emailSentRegister: "Код отправлен на почту. После подтверждения создадим новый аккаунт.",
        emailSentLogin: "Код отправлен на почту для входа.",
        emailCodeConfirmed: "Почта подтверждена, придумайте пароль ниже.",
        emailPasswordSetupHint: "Пароль для этой почты ещё не задан. Нажмите «Отправить код», введите код из письма и задайте пароль.",
        passwordRequired: "Введите пароль.",
        networkError: "Ошибка сети. Попробуйте ещё раз."
      },
      en: {
        langSwitchAria: "Language switch",
        identifying: "Please wait while we identify your account",
        enterEmail: "Continue with email",
        enterTelegram: "Continue with Telegram",
        enterGuest: "Continue as guest",
        guestNote: "Guests cannot join giveaways or chat",
        backToChoice: "Back to sign-in options",
        rememberPassword: "Remember password",
        login: "Sign in",
        register: "Sign up",
        switchToLogin: "I already have an account",
        switchToRegister: "Create a new account or update an old password",
        usernameIntro1: "Enter your Telegram @username below.",
        usernameIntro2: "If this Telegram account was already verified before, your username and password are enough.",
        usernameIntro3: "The verification code will be sent to our Telegram bot",
        usernameIntro4: "If this is your first time, tap “Sign up”, open the bot",
        usernameIntro5: "and send /start, then tap “Get code” here, enter the code from the bot, and create your password.",
        usernamePlaceholder: "@Telegram username",
        sendCode: "Get code",
        sendingCode: "Sending…",
        codeFromTelegram: "Code from Telegram",
        done: "Verify",
        verifying: "Verifying…",
        setPassword: "Create password",
        confirmPassword: "Confirm password",
        showPassword: "Show password",
        hidePassword: "Hide password",
        invalidUsernameShort: "Enter a valid username first.",
        invalidUsernameLong: "Enter a valid username (5-32 characters, letters/numbers/_).",
        checkingPassword: "Checking password…",
        loginFailed: "Unable to sign in.",
        networkRetry: "Network is unavailable. Please try again.",
        invalidServerResponse: "Invalid server response",
        sentTelegramCode: "The code was sent to Telegram.",
        sendCodeFailed: "Unable to send the code.",
        telegramPasswordSetupHint: "This Telegram account does not have a password yet. Tap “Get code”, enter the bot code, and create a password.",
        passwordsMismatch: "Passwords do not match.",
        enterTelegramCode: "Enter the 6-digit code from Telegram.",
        codeNotVerified: "The code could not be verified.",
        emailIntro1: "Enter your email address.",
        emailIntro2: "If this email was already verified before, your email and password are enough.",
        emailIntro3: "If this is your first time, tap “Sign up”, get the code, confirm it, and create a password for your account.",
        emailCodePlaceholder: "Code from email",
        emailVerify: "Verify",
        emailCheckingPassword: "Checking password…",
        emailSendCode: "Send code",
        emailSendingCode: "Sending code…",
        emailCheckingCode: "Verifying code…",
        emailLoginFailed: "Unable to sign in.",
        emailSendFailed: "Unable to send the code.",
        emailSentDefault: "The code was sent to your email.",
        emailSentRegister: "The code was sent to your email. We will create a new account after confirmation.",
        emailSentLogin: "The code was sent to your email for sign in.",
        emailCodeConfirmed: "Email confirmed, create a password below.",
        emailPasswordSetupHint: "This email does not have a password yet. Tap “Send code”, enter the email code, and create a password.",
        passwordRequired: "Enter a password.",
        networkError: "Network error. Please try again."
      }
    };
    var pack = dict[locale] || dict.ru;
    return pack[key] != null ? pack[key] : dict.ru[key] || "";
  }

  function syncPwaAuthLanguageUi() {
    var locale = getPwaAuthLocale();
    var identifyingText = document.getElementById("pwaAuthIdentifyingText");
    var langSwitch = document.getElementById("pwaAuthLangSwitch");
    var liveProfileLangSwitch = document.getElementById("profileLangSwitch");
    var liveProfileLangRuBtn = document.getElementById("profileLangRuBtn");
    var liveProfileLangEnBtn = document.getElementById("profileLangEnBtn");
    if (identifyingText) identifyingText.textContent = pwaAuthT("identifying");
    if (langSwitch) langSwitch.setAttribute("aria-label", pwaAuthT("langSwitchAria"));
    if (liveProfileLangSwitch) liveProfileLangSwitch.setAttribute("aria-label", pwaAuthT("langSwitchAria"));
    if (pwaAuthLangRuBtn) pwaAuthLangRuBtn.classList.toggle("pwa-auth-screen__lang-btn--active", locale === "ru");
    if (pwaAuthLangEnBtn) pwaAuthLangEnBtn.classList.toggle("pwa-auth-screen__lang-btn--active", locale === "en");
    if (liveProfileLangRuBtn) liveProfileLangRuBtn.classList.toggle("profile-lang-switch__btn--active", locale === "ru");
    if (liveProfileLangEnBtn) liveProfileLangEnBtn.classList.toggle("profile-lang-switch__btn--active", locale === "en");
  }
  function syncProfileLanguageUi() {
    var locale = getPwaAuthLocale();
    var dict = {
      ru: {
        profileTitle: "Профиль",
        profileClubTab: "Профиль в клубе",
        profilePoker21Tab: "Профиль Poker21",
        loginAccount: "Войти в аккаунт",
        nameCaption: "Введите ваше имя",
        save: "Сохранить",
        emailLogin: "Вход по почте",
        emailLoginText: "Привяжите email, чтобы потом можно было входить в аккаунт по почте.",
        yourEmail: "Ваш емейл:",
        yourTelegram: "Ваш телеграм:",
        emailAria: "Email для входа",
        getCode: "Получить код",
        code: "Код",
        verifyLink: "Привязать",
        telegramLogin: "Вход через Telegram",
        telegramLoginText: "Привяжите Telegram, чтобы потом можно было входить в этот же аккаунт через Telegram.",
        linkTelegram: "Привязать Telegram",
        pokerPlus: "Верификация через Poker21",
        pokerPlusText: 'Нажмите "Проверить по почте" если ваш емейл в Poker21 и здесь совпадают и тогда аккаунт привяжется автоматически.\nЕсли у вас разные емейлы, тогда введите ключ из Poker21.',
        pokerPlusKeyPh: "Ключ из PokerPlus",
        pokerPlusBind: "Привязать по ключу из Poker21",
        pokerPlusRefresh: "Проверить по почте",
        pokerPlusUnbind: "Отвязать",
        pokerPlusEmailLabel: "Email для проверки:",
        pokerPlusPlayer: "Связанный игрок:",
        pokerPlusAvatar: "Аватар:",
        pokerPlusBalance: "Баланс:",
        pokerPlusRegister: "Дата регистрации:",
        pokerPlusPosition: "Позиция:",
        pokerPlusLeague: "Лига:",
        pokerPlusGroup: "Группа:",
        pokerPlusCountry: "Страна:",
        pokerPlusRole: "Роль:",
        pokerPlusLastLogin: "Последний вход:",
        pokerPlusLastIp: "IP последнего входа:",
        pokerPlusStats: "Статистика:",
        friends: "Друзья",
        level: "Ваш уровень 1 из 55",
        tournaments: "Турниры",
        cash: "Кеш",
        notes: "Нотс про себя",
        displayNamePh: "Ваше имя"
      },
      en: {
        profileTitle: "Profile",
        profileClubTab: "Club profile",
        profilePoker21Tab: "Poker21 profile",
        loginAccount: "Sign in",
        nameCaption: "Enter your name",
        save: "Save",
        emailLogin: "Email sign in",
        emailLoginText: "Link your email so you can sign in to this account with email later.",
        yourEmail: "Your email:",
        yourTelegram: "Your Telegram:",
        emailAria: "Email for sign in",
        getCode: "Get code",
        code: "Code",
        verifyLink: "Link",
        telegramLogin: "Telegram sign in",
        telegramLoginText: "Link Telegram so you can sign in to this same account through Telegram later.",
        linkTelegram: "Link Telegram",
        pokerPlus: "Verification via Poker21",
        pokerPlusText: 'Tap "Check by email" if your email in Poker21 matches this account, and the account will link automatically.\nIf your emails are different, enter the key from Poker21.',
        pokerPlusKeyPh: "Key from PokerPlus",
        pokerPlusBind: "Link by key from Poker21",
        pokerPlusRefresh: "Check by email",
        pokerPlusUnbind: "Unlink",
        pokerPlusEmailLabel: "Verification email:",
        pokerPlusPlayer: "Linked player:",
        pokerPlusAvatar: "Avatar:",
        pokerPlusBalance: "Balance:",
        pokerPlusRegister: "Registered:",
        pokerPlusPosition: "Position:",
        pokerPlusLeague: "League:",
        pokerPlusGroup: "Group:",
        pokerPlusCountry: "Country:",
        pokerPlusRole: "Role:",
        pokerPlusLastLogin: "Last login:",
        pokerPlusLastIp: "Last login IP:",
        pokerPlusStats: "Stats:",
        friends: "Friends",
        level: "Your level 1 of 55",
        tournaments: "Tournaments",
        cash: "Cash",
        notes: "Notes about yourself",
        displayNamePh: "Your name"
      }
    };
    var t = dict[locale] || dict.ru;
    var setText = function (id, text) {
      var el = document.getElementById(id);
      if (el) {
        el.textContent = text;
      }
    };
    setText("profileTitle", t.profileTitle);
    setText("profileClubTabBtn", t.profileClubTab);
    setText("profilePoker21TabBtn", t.profilePoker21Tab);
    setText("profileNameCaption", t.nameCaption);
    setText("profileSaveBtn", t.save);
    setText("profileEmailAuthTitle", t.emailLogin);
    setText("profileEmailAuthText", t.emailLoginText);
    setText("profileEmailAuthLinkedLabel", t.yourEmail);
    setText("profileTelegramLinkedLabel", t.yourTelegram);
    setText("profileEmailAuthSendBtn", t.getCode);
    setText("profileEmailAuthVerifyBtn", t.verifyLink);
    setText("profileTelegramLinkTitle", t.telegramLogin);
    setText("profileTelegramLinkText", t.telegramLoginText);
    setText("profileTelegramLinkBtn", t.linkTelegram);
    setText("profilePokerPlusTitle", t.pokerPlus);
    setText("profilePokerPlusText", t.pokerPlusText);
    setText("profilePokerPlusBindBtn", t.pokerPlusBind);
    setText("profilePokerPlusRefreshBtn", t.pokerPlusRefresh);
    setText("profilePokerPlusUnbindBtn", t.pokerPlusUnbind);
    setText("profilePokerPlusEmailLabel", t.pokerPlusEmailLabel);
    setText("profilePokerPlusLinkedLabel", t.pokerPlusPlayer);
    setText("profilePokerPlusAvatarLabel", t.pokerPlusAvatar);
    setText("profilePokerPlusBalanceLabel", t.pokerPlusBalance);
    setText("profilePokerPlusRegisterLabel", t.pokerPlusRegister);
    setText("profilePokerPlusPositionLabel", t.pokerPlusPosition);
    setText("profilePokerPlusLeagueLabel", t.pokerPlusLeague);
    setText("profilePokerPlusGroupLabel", t.pokerPlusGroup);
    setText("profilePokerPlusCountryLabel", t.pokerPlusCountry);
    setText("profilePokerPlusRoleLabel", t.pokerPlusRole);
    setText("profilePokerPlusLastLoginLabel", t.pokerPlusLastLogin);
    setText("profilePokerPlusLastIpLabel", t.pokerPlusLastIp);
    setText("profilePokerPlusStatsLabel", t.pokerPlusStats);
    setText("profileFriendsBtn", t.friends);
    setText("profileStatusTitle", t.level);
    setText("profileTournamentsTitle", t.tournaments);
    setText("profileCashTitle", t.cash);
    setText("profilePersonalSaveBtn", t.save);
    var exitBtn = document.getElementById("profileExitBtn");
    if (exitBtn) exitBtn.textContent = t.loginAccount;
    var nameInput = document.getElementById("profileChatDisplayNameInput");
    if (nameInput) nameInput.placeholder = t.displayNamePh;
    var pokerPlusInput = document.getElementById("profilePokerPlusCiphertextInput");
    if (pokerPlusInput) pokerPlusInput.placeholder = t.pokerPlusKeyPh;
    var emailInput = document.getElementById("profileEmailAuthInput");
    if (emailInput) emailInput.setAttribute("aria-label", t.emailAria);
    var codeInput = document.getElementById("profileEmailAuthCodeInput");
    if (codeInput) codeInput.placeholder = t.code;
    var personalInput = document.getElementById("profilePersonalInput");
    if (personalInput) {
      personalInput.placeholder = t.notes;
      personalInput.setAttribute("aria-label", t.notes);
    }
  }
  function syncGlobalAppLanguageUi() {
    var locale = getPwaAuthLocale();
    var dict = {
      ru: {
        instructionTitle: "Добавьте ярлык на рабочий стол телефона",
        loginShort: "Войти",
        welcome: "Добро пожаловать!",
        homeSubtitle: "Закрытый покерный онлайн-клуб для своих.",
        tgChat: "Чат в ТГ",
        channel: "Канал",
        prediction: "Предсказание",
        raffles: "Розыгрыши",
        rating: "Рейтинг турнирщиков",
        nextFreeroll: "Следующий фриролл",
        playFreeroll: "Сыграть во фриролл",
        tournamentDay: "Турнир дня",
        prize: "Приз",
        buyin: "Вход",
        time: "Время",
        room: "Площадка",
        weeklySchedule: "Расписание на неделю",
        games: "Игры и приложения",
        equilator: "Эквилятор",
        learn: "Научиться играть",
        learnDesc: "Бесплатные уроки",
        streams: "Стримы",
        inDev: "(в разработке)",
        bonusGame: "Найди Пиханину",
        plasterer: "Переедь Штукатура",
        partner: "Партнёрство",
        footerNote: "Клуб «Два туза». Работаем с 2018г. Играйте ответственно.",
        navHome: "Главная",
        navChat: "Чаты",
        navDownload: "Скачать",
        navCashout: "Депозит",
        navProfile: "Профиль"
      },
      en: {
        instructionTitle: "Add a shortcut to your phone home screen",
        loginShort: "Sign in",
        welcome: "Welcome!",
        homeSubtitle: "A private online poker club for our own people.",
        tgChat: "TG Chat",
        channel: "Channel",
        prediction: "Prediction",
        raffles: "Raffles",
        rating: "Tournament ranking",
        nextFreeroll: "Next freeroll",
        playFreeroll: "Play freeroll",
        tournamentDay: "Tournament of the day",
        prize: "Prize",
        buyin: "Buy-in",
        time: "Time",
        room: "Room",
        weeklySchedule: "Weekly schedule",
        games: "Games and apps",
        equilator: "Equilator",
        learn: "Learn to play",
        learnDesc: "Free lessons",
        streams: "Streams",
        inDev: "(in development)",
        bonusGame: "Find Pikhanina",
        plasterer: "Run over the plasterer",
        partner: "Partnership",
        footerNote: "Two Aces Club. Since 2018. Play responsibly.",
        navHome: "Home",
        navChat: "Chats",
        navDownload: "Download",
        navCashout: "Deposit",
        navProfile: "Profile"
      }
    };
    var t = dict[locale] || dict.ru;
    var setText = function (id, text) {
      var el = document.getElementById(id);
      if (el) el.textContent = text;
    };
    var instructionBtn = document.getElementById("siteHomeInstructionBtn");
    if (instructionBtn) {
      instructionBtn.title = t.instructionTitle;
      instructionBtn.setAttribute("aria-label", t.instructionTitle);
    }
    var authBtn = document.getElementById("siteHomeAuthBtn");
    if (authBtn) {
      authBtn.title = t.loginShort;
      authBtn.setAttribute("aria-label", t.loginShort);
    }
    setText("siteHomeAuthBtnLabel", t.loginShort);
    setText("homeWelcomeTitleText", t.welcome);
    setText("homeSubtitle", t.homeSubtitle);
    setText("homeMiniChatLabel", t.tgChat);
    setText("homeMiniChannelLabel", t.channel);
    setText("homeMiniPredictionLabel", t.prediction);
    setText("homeMiniRafflesLabel", t.raffles);
    setText("homeSpringRatingTitle", t.rating);
    setText("homeFreerollTitle", t.nextFreeroll);
    setText("freerollHomePlayBtnText", t.playFreeroll);
    setText("homeTournamentDayTitle", t.tournamentDay);
    setText("homeTournamentPrizeLabel", t.prize);
    setText("homeTournamentBuyinLabel", t.buyin);
    setText("homeTournamentTimeLabel", t.time);
    setText("homeTournamentRoomLabel", t.room);
    setText("tournamentDayScheduleBtnText", t.weeklySchedule);
    setText("homeGamesTitle", t.games);
    setText("homeEquilatorTitle", t.equilator);
    setText("homeLearnTitle", t.learn);
    setText("homeLearnDesc", t.learnDesc);
    setText("homeStreamsTitle", t.streams);
    setText("homeStreamsDesc", t.inDev);
    setText("homeBonusGameTitle", t.bonusGame);
    setText("homePlastererTitle", t.plasterer);
    setText("homePartnerTitle", t.partner);
    setText("homeFooterNoteText", t.footerNote);
    setText("bottomNavHomeLabel", t.navHome);
    setText("chatNavLabel", t.navChat);
    setText("bottomNavDownloadLabel", t.navDownload);
    setText("bottomNavCashoutLabel", t.navCashout);
    setText("bottomNavProfileLabel", t.navProfile);
    try {
      document.documentElement.lang = locale === "en" ? "en" : "ru";
    } catch (eLangHtml) {}
  }
  if (pwaAuthLangRuBtn) {
    pwaAuthLangRuBtn.addEventListener("click", function () {
      setPwaAuthLocale("ru");
    });
  }
  if (pwaAuthLangEnBtn) {
    pwaAuthLangEnBtn.addEventListener("click", function () {
      setPwaAuthLocale("en");
    });
  }
  if (profileLangRuBtn) {
    profileLangRuBtn.addEventListener("click", function () {
      setPwaAuthLocale("ru");
    });
  }
  if (profileLangEnBtn) {
    profileLangEnBtn.addEventListener("click", function () {
      setPwaAuthLocale("en");
    });
  }
  if (!window.__pokerProfileLangSwitchDelegatedBound) {
    window.__pokerProfileLangSwitchDelegatedBound = true;
    document.addEventListener("click", function (e) {
      var btn = e.target && e.target.closest ? e.target.closest("#profileLangRuBtn,#profileLangEnBtn") : null;
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      setPwaAuthLocale(btn.id === "profileLangEnBtn" ? "en" : "ru");
    });
  }
  syncPwaAuthLanguageUi();
  syncProfileLanguageUi();
  syncGlobalAppLanguageUi();

  function isPwaStandaloneMode() {
    try {
      if (window.__pokerDisplayStandaloneBoot === true) return true;
      if (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) return true;
      if (window.matchMedia && window.matchMedia("(display-mode: minimal-ui)").matches) return true;
      if (window.matchMedia && window.matchMedia("(display-mode: window-controls-overlay)").matches) return true;
      if (window.navigator && window.navigator.standalone) return true;
    } catch (e) {}
    return false;
  }
  /**
   * PWA с иконки: WebApp может отдать initDataUnsafe.user без подписанного initData.
   * Старый критерий «есть user → Mini App» ломал вход: ждали initData, экран TWO ACES/«идентификация» зависал.
   * Режим display-mode: standalone / navigator.standalone достаточен: в Mini App Telegram это обычно не так.
   * Нельзя отключать PWA-экран по непустому initData — telegram-web-app.js кладёт tgWebAppData в sessionStorage;
   * после Safari/Mini App с тем же origin в установленном PWA подтягивается чужой initData → ветка Mini App,
   * shouldSuppress гасит баннер, вход не крепится — пользователь видит пустой/белый экран.
   */
  function isPwaStandaloneAuth() {
    return isPwaStandaloneMode();
  }
  function shouldUseOverlayAuthScreen() {
    return isPwaStandaloneMode();
  }
  /**
   * Не показываем карточку «Верификация для входа в PWA» внутри клиента Telegram (Mini App / WebView).
   * Скрипт telegram-web-app.js есть и в обычном браузере — отличаем по platform / version WebApp.
   */
  function shouldSuppressMiniAppPwaLoginBanner() {
    return false;
  }
  function showPwaAuthScreen() {
    if (!shouldUseOverlayAuthScreen() || !pwaAuthScreenEl) return;
    pwaAuthScreenEl.classList.remove("pwa-auth-screen--hidden");
    pwaAuthScreenEl.setAttribute("aria-hidden", "false");
    try {
      /* Сначала preinit: критический CSS в index.html держит #pwaAuthScreen видимым при гонках с --hidden */
      document.body.classList.add("pwa-auth-preinit");
      document.body.classList.add("pwa-auth-gated");
    } catch (e) {}
  }
  function hidePwaAuthScreen() {
    if (!pwaAuthScreenEl) return;
    try {
      pwaAuthScreenEl.classList.remove("pwa-auth-screen--identifying");
    } catch (eId) {}
    pwaAuthScreenEl.classList.add("pwa-auth-screen--hidden");
    pwaAuthScreenEl.setAttribute("aria-hidden", "true");
    try {
      document.body.classList.remove("pwa-auth-gated");
      document.body.classList.remove("pwa-auth-preinit");
    } catch (e) {}
  }

  function isOverlayAuthScreenActive() {
    if (!pwaAuthScreenEl) return false;
    if (document.body && document.body.classList.contains("pwa-auth-gated")) return true;
    return pwaAuthScreenEl.getAttribute("aria-hidden") === "false";
  }

  function rerenderCurrentPwaAuthScreen() {
    if (!shouldUseOverlayAuthScreen() && !isOverlayAuthScreenActive()) {
      syncPwaAuthLanguageUi();
      return;
    }
    var mount = pwaAuthLoginMountEl || document.getElementById("pwaAuthLoginMount");
    if (!mount) {
      syncPwaAuthLanguageUi();
      return;
    }
    syncPwaAuthLanguageUi();
    if (mount.querySelector(".auth-banner__email-login")) {
      var emailWrap = mount.querySelector(".auth-banner__email-login");
      var emailMode = emailWrap && emailWrap.getAttribute("data-auth-mode") === "register" ? "register" : "login";
      mount.innerHTML = "";
      mountPwaEmailLogin(mount, emailMode);
      return;
    }
    if (mount.querySelector(".auth-banner__code-login")) {
      var tgWrap = mount.querySelector(".auth-banner__code-login");
      var tgMode = tgWrap && tgWrap.getAttribute("data-auth-mode") === "register" ? "register" : "login";
      mount.innerHTML = "";
      var actionsMount = ensurePwaVerificationForm(mount) || mount;
      mountPwaUsernameCodeLogin(actionsMount, tgMode);
      return;
    }
    remountPwaStandaloneEnterScreen();
  }

  function showIdentifyingMini() {
    if (!identifyingMiniEl) return;
    identifyingMiniEl.classList.remove("auth-identifying-mini--hidden");
    identifyingMiniEl.setAttribute("aria-busy", "true");
  }

  function hideIdentifyingMini() {
    if (!identifyingMiniEl) return;
    identifyingMiniEl.classList.add("auth-identifying-mini--hidden");
    identifyingMiniEl.setAttribute("aria-busy", "false");
  }

  function setPwaAuthScreenNotice(message) {
    if (!pwaAuthScreenEl) return;
    var inner = pwaAuthScreenEl.querySelector(".pwa-auth-screen__inner");
    if (!inner) return;
    var notice = inner.querySelector(".pwa-auth-screen__notice");
    var text = message != null ? String(message).trim() : "";
    if (!text) {
      if (notice) notice.remove();
      return;
    }
    if (!notice) {
      notice = document.createElement("div");
      notice.className = "pwa-auth-screen__notice";
      notice.setAttribute("role", "status");
      notice.setAttribute("aria-live", "polite");
      inner.appendChild(notice);
    }
    notice.textContent = text;
  }

  function hideLegacyInlineAuthUi() {
    hideIdentifyingMini();
    if (banner) {
      banner.classList.add("auth-banner--hidden");
      banner.classList.remove("auth-banner--verifying");
    }
    if (bannerRetry) bannerRetry.hidden = true;
    if (bannerLink) bannerLink.style.display = "none";
    if (hintEl) {
      hintEl.textContent = "";
      hintEl.style.display = "none";
    }
  }

  function openOverlayAuthEntryScreen() {
    try {
      pokerSavePwaGuestMode(false);
    } catch (eGuestOff) {}
    try {
      if (window.__pokerTelegramAuth && window.__pokerTelegramAuth.status === "guest") {
        window.__pokerTelegramAuth = { status: "no_telegram", user: null, error: null };
      }
    } catch (eAuthReset) {}
    try {
      if (typeof setView === "function") setView("home");
    } catch (eSetViewAuth) {}
    hideLegacyInlineAuthUi();
    setPwaAuthScreenNotice("");
    if (pwaAuthScreenEl) {
      pwaAuthScreenEl.classList.remove("pwa-auth-screen--hidden");
      pwaAuthScreenEl.setAttribute("aria-hidden", "false");
    }
    try {
      document.body.classList.add("pwa-auth-preinit");
      document.body.classList.add("pwa-auth-gated");
    } catch (eBodyAuthOpen) {}
    try {
      setPwaAuthIdentifyingPhase(false);
    } catch (eOpenAuthId) {}
    remountPwaStandaloneEnterScreen();
    ensureOverlayAuthEntryMounted();
    setTimeout(function () {
      ensureOverlayAuthEntryMounted();
    }, 0);
    setTimeout(function () {
      ensureOverlayAuthEntryMounted();
    }, 120);
  }

  /** PWA: экран «идентификация» поверх приложения (не внутри скрытого #app). */
  var PWA_AUTH_IDENTIFY_MIN_MS = 620;
  function setPwaAuthIdentifyingPhase(on) {
    if (!pwaAuthScreenEl) return;
    var panel = document.getElementById("pwaAuthIdentifyingPanel");
    try {
      if (on) {
        /* Без панели в DOM (старый кэш HTML) нельзя вешать --identifying: CSS прячет .pwa-auth-screen__inner → пустой экран. */
        if (panel) {
          pwaAuthScreenEl.classList.add("pwa-auth-screen--identifying");
          panel.hidden = false;
          panel.setAttribute("aria-busy", "true");
        }
      } else {
        pwaAuthScreenEl.classList.remove("pwa-auth-screen--identifying");
        if (panel) {
          panel.hidden = true;
          panel.setAttribute("aria-busy", "false");
        }
      }
    } catch (ePwaId) {}
  }

  /* Резерв к data-onauth: иногда eval/callback виджета не срабатывает, а postMessage от oauth.telegram.org всё равно приходит. */
  if (!window.__pokerTelegramOauthMessageBridge) {
    window.__pokerTelegramOauthMessageBridge = true;
    window.addEventListener(
      "message",
      function (ev) {
        try {
          if (!ev || String(ev.origin) !== "https://oauth.telegram.org") return;
          var raw = ev.data;
          var data = typeof raw === "string" ? JSON.parse(raw) : raw;
          if (!data || data.event !== "auth_user" || data.init) return;
          var auth = data.auth_data;
          if (!auth || auth.hash == null || auth.id == null || auth.auth_date == null) return;
          if (typeof window.__pokerTelegramWidgetAuth === "function") {
            window.__pokerTelegramWidgetAuth(auth);
          }
        } catch (eBr) {}
      },
      false
    );
  }

  if (!isTelegramWebApp()) {
    if (bannerLink) bannerLink.style.display = "none";
    if (hintEl) hintEl.style.display = "none";
  } else if (bannerLink && telegramAppUrl && telegramAppUrl.indexOf("t.me") !== -1 && telegramAppUrl.indexOf("YourBotName") === -1) {
    bannerLink.href = telegramAppUrl;
    /* Не показываем «Открыть в Telegram»: во встроенном браузере TG часто есть WebApp, но без initData — нужен Login Widget */
    bannerLink.style.display = "none";
    if (hintEl) hintEl.style.display = "none";
  } else {
    if (bannerLink) bannerLink.style.display = "none";
    if (hintEl) hintEl.style.display = "block";
  }

  function getTelegramAuthApiBase() {
    var el = document.getElementById("app");
    var dataBase = el && el.getAttribute("data-api-base");
    if (dataBase && String(dataBase).trim()) return String(dataBase).trim().replace(/\/$/, "");
    if (typeof window !== "undefined" && window.location && window.location.origin) return window.location.origin;
    return "";
  }

  function pokerAuthFetch(url, init) {
    var opts = Object.assign({ cache: "no-store" }, init || {});
    if (typeof pokerFetchRetry === "function") {
      return pokerFetchRetry(url, opts, { timeoutMs: 15000, maxAttempts: 3, retryDelayMs: 500 });
    }
    return fetch(url, opts);
  }

  /** localhost / file / IP — виджет Login даёт «Bot domain invalid», домен должен совпадать с BotFather */
  function isPwaAuthLocalHost() {
    try {
      var p = window.location.protocol || "";
      var h = (window.location.hostname || "").toLowerCase();
      if (p === "file:") return true;
      if (!h) return true;
      if (h === "localhost" || h === "127.0.0.1" || h === "0.0.0.0") return true;
      if (/^\d{1,3}(\.\d{1,3}){3}$/.test(h)) return true;
      return false;
    } catch (eLoc) {
      return true;
    }
  }

  /**
   * URL для data-auth-url: текущая страница без ?query и #hash (как в telegram-widget.js для return_to).
   * После входа Telegram дописывает либо ?id=&hash=&auth_date=…, либо кладёт payload в #tgAuthResult=…
   */
  function getTelegramWidgetAuthCallbackUrl() {
    try {
      var page = new URL(window.location.href);
      page.search = "";
      page.hash = "";
      return page.toString();
    } catch (e0) {
      try {
        return window.location.origin.replace(/\/$/, "") + "/";
      } catch (e1) {
        return "";
      }
    }
  }

  /** То же, что haveTgAuthResult() в telegram-widget.js — данные после OAuth в hash. */
  function parseTelegramWidgetTgAuthResultFromHash() {
    try {
      var locationHash = String(window.location.hash || "");
      var re = /[#?&]tgAuthResult=([A-Za-z0-9\-_=]*)$/;
      var match = locationHash.match(re);
      if (!match) return null;
      var data = match[1] || "";
      data = data.replace(/-/g, "+").replace(/_/g, "/");
      var pad = data.length % 4;
      if (pad > 1) {
        data += new Array(5 - pad).join("=");
      }
      return JSON.parse(window.atob(data));
    } catch (eH) {
      return null;
    }
  }

  function normalizeVerifiedUser(serverUser, fallbackUnsafe) {
    if (serverUser && serverUser.id != null) {
      return {
        id: serverUser.id,
        memberId: serverUser.memberId != null ? String(serverUser.memberId).trim() : "",
        email: serverUser.email != null ? String(serverUser.email).trim() : "",
        first_name: serverUser.first_name != null ? serverUser.first_name : "",
        last_name: serverUser.last_name != null ? serverUser.last_name : "",
        username: serverUser.username != null ? serverUser.username : "",
        photo_url: serverUser.photo_url || (fallbackUnsafe && fallbackUnsafe.photo_url) || "",
        language_code: serverUser.language_code || "",
        is_premium: !!serverUser.is_premium,
        is_vk: !!serverUser.vk,
      };
    }
    return fallbackUnsafe || null;
  }

  function getVkAppIdForPwa() {
    var el = document.getElementById("app");
    var id = el && el.getAttribute("data-vk-app-id");
    id = id != null ? String(id).trim() : "";
    return /^\d+$/.test(id) ? id : "";
  }

  function deliverVkOAuthCode(code, redirectUri) {
    var base = getTelegramAuthApiBase();
    if (!base) return;
    setBannerVerifying();
    showUnauthorized();
    pokerAuthFetch(base + "/api/auth-vk-pwa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: code, redirect_uri: redirectUri }),
    })
      .then(function (res) {
        return res
          .json()
          .catch(function () {
            return {};
          })
          .then(function (data) {
            return { res: res, data: data || {} };
          });
      })
      .then(function (pack) {
        var res = pack.res;
        var data = pack.data || {};
        if (res.ok && data.ok && data.user && data.pwaVkSession) {
          var u = normalizeVerifiedUser(data.user, null);
          if (!pokerSavePwaVkSession(data.pwaVkSession, data.user)) pwaSessionPersistenceWarning();
          pokerSavePwaGuestMode(false);
          window.__pokerTelegramAuth = { status: "verified", user: u, error: null };
          pokerMaybeRememberMemberIdFromUser(u);
          pokerSetAuthMethod("vk");
          updateHeaderGreeting();
          showAuthorized(u);
          loadHeaderAvatar();
          try {
            window.dispatchEvent(new CustomEvent("poker-telegram-auth", { detail: { verified: true, user: u, pwa: true, vk: true } }));
          } catch (eVk) {}
          try {
            var uUrl = new URL(window.location.href);
            uUrl.searchParams.delete("code");
            uUrl.searchParams.delete("state");
            window.history.replaceState({}, "", uUrl.pathname + uUrl.search + uUrl.hash);
          } catch (eU) {}
          return;
        }
        updateHeaderGreeting();
        showUnauthorized();
        setBannerFailure(data && data.error ? String(data.error) : "Не удалось войти через ВКонтакте.", false);
        resetBannerForPwaLogin();
        mountTelegramLoginWidgetForPwa();
      })
      .catch(function () {
        updateHeaderGreeting();
        showUnauthorized();
        setBannerFailure("Ошибка сети при входе через ВКонтакте.", false);
        resetBannerForPwaLogin();
        mountTelegramLoginWidgetForPwa();
      });
  }

  function tryFinishVkOAuth() {
    try {
      var sp = new URLSearchParams(window.location.search || "");
      var code = sp.get("code");
      var state = sp.get("state") || "";
      if (!code || state !== "vk_pwa") return false;
      var redirect = window.location.origin + "/";
      deliverVkOAuthCode(code, redirect);
      return true;
    } catch (eVk2) {
      return false;
    }
  }

  /** В WebView Mini App редирект после Login Widget часто ломается — выход в системный браузер. */
  function mountTelegramExternalBrowserEscapeBtn(mount) {
    if (!mount || isPwaAuthLocalHost() || !isTelegramWebApp()) return;
    if (mount.querySelector(".auth-banner__external-browser-btn")) return;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "auth-banner__external-browser-btn";
    btn.textContent = "Открыть в браузере для входа";
    btn.addEventListener("click", function () {
      var wtg = getTelegramWebAppNow();
      var u = getTelegramWidgetAuthCallbackUrl();
      if (!u || !/^https:\/\//i.test(u)) {
        try {
          u = (getTelegramAuthApiBase() || window.location.origin).replace(/\/$/, "") + "/";
        } catch (eO) {
          u = "";
        }
      }
      if (wtg && typeof wtg.openLink === "function") {
        try {
          wtg.openLink(u, { try_instant_view: false });
        } catch (eL) {
          try {
            wtg.openLink(u);
          } catch (eL2) {}
        }
      } else if (u) {
        window.open(u, "_blank", "noopener,noreferrer");
      }
    });
    mount.appendChild(btn);
  }

  /** Опционально в #app: data-telegram-bot-id="123456789" — иначе id подтягивается с GET /api/telegram-bot-info */
  function getTelegramBotIdFromAppAttr() {
    var el = document.getElementById("app");
    var raw = el && el.getAttribute("data-telegram-bot-id");
    raw = raw != null ? String(raw).trim() : "";
    if (!/^\d+$/.test(raw)) return 0;
    var n = parseInt(raw, 10);
    return n > 0 ? n : 0;
  }

  function whenTelegramWidgetJsReady(cb) {
    if (typeof cb !== "function") return;
    if (window.Telegram && window.Telegram.Login && typeof window.Telegram.Login.auth === "function") {
      cb();
      return;
    }
    var n = 0;
    var t = setInterval(function () {
      n += 1;
      if (window.Telegram && window.Telegram.Login && typeof window.Telegram.Login.auth === "function") {
        clearInterval(t);
        cb();
        return;
      }
      if (n >= 60) {
        clearInterval(t);
      }
    }, 100);
  }

  /**
   * Запасной вход: официальный popup oauth.telegram.org (не iframe на странице).
   * Помогает, когда postMessage из встроенного виджета не доходит до родителя.
   */
  function mountTelegramLoginPopupButton(mount) {
    if (!mount || isPwaAuthLocalHost()) return;
    if (mount.querySelector(".auth-banner__tg-popup-login-btn")) return;
    function addBtn(botIdNum) {
      if (!botIdNum || botIdNum < 1) return;
      if (mount.querySelector(".auth-banner__tg-popup-login-btn")) return;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "auth-banner__tg-popup-login-btn";
      btn.textContent = "Войти через Telegram (отдельное окно)";
      btn.addEventListener("click", function () {
        if (!window.Telegram || !window.Telegram.Login || typeof window.Telegram.Login.auth !== "function") {
          if (hintEl) {
            hintEl.textContent = "Подождите загрузки страницы или обновите её, затем нажмите снова.";
            hintEl.style.display = "block";
          }
          return;
        }
        try {
          window.Telegram.Login.auth({ bot_id: botIdNum }, function (user) {
            if (user && typeof window.__pokerTelegramWidgetAuth === "function") {
              window.__pokerTelegramWidgetAuth(user);
            }
          });
        } catch (ePop) {
          setBannerFailure(
            "Не удалось открыть окно входа. Разрешите всплывающие окна для сайта или откройте страницу в обычном браузере.",
            false
          );
        }
      });
      mount.appendChild(btn);
    }
    var botIdAttr = getTelegramBotIdFromAppAttr();
    if (botIdAttr > 0) {
      whenTelegramWidgetJsReady(function () {
        addBtn(botIdAttr);
      });
      return;
    }
    if (mount.getAttribute("data-tg-popup-fetch-started") === "1") return;
    mount.setAttribute("data-tg-popup-fetch-started", "1");
    var base = getTelegramAuthApiBase();
    if (!base) return;
    pokerFetchWithTimeout(base + "/api/telegram-bot-info", { method: "GET", cache: "no-store" }, 14000)
      .then(function (res) {
        return res
          .json()
          .catch(function () {
            return {};
          })
          .then(function (data) {
            return { res: res, data: data || {} };
          });
      })
      .then(function (pack) {
        var d = pack.data || {};
        if (pack.res.ok && d.ok && d.botId != null) {
          var id = parseInt(d.botId, 10);
          if (id > 0) {
            whenTelegramWidgetJsReady(function () {
              addBtn(id);
            });
            return;
          }
        }
        try {
          mount.removeAttribute("data-tg-popup-fetch-started");
        } catch (eR) {}
      })
      .catch(function () {
        try {
          mount.removeAttribute("data-tg-popup-fetch-started");
        } catch (eR2) {}
      });
  }

  function mountVkLoginForPwa(mount) {
    if (!mount || isPwaAuthLocalHost()) return;
    var appId = getVkAppIdForPwa();
    if (!appId) return;
    if (mount.querySelector(".auth-banner__vk-login-btn")) return;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "auth-banner__vk-login-btn";
    btn.textContent = "Войти через ВКонтакте";
    btn.addEventListener("click", function () {
      var redirect = window.location.origin + "/";
      var authUrl =
        "https://oauth.vk.com/authorize?client_id=" +
        encodeURIComponent(appId) +
        "&display=page&redirect_uri=" +
        encodeURIComponent(redirect) +
        "&response_type=code&state=vk_pwa&v=5.131";
      window.location.href = authUrl;
    });
    mount.appendChild(btn);
  }

  function mountPwaUsernameCodeLogin(mount, initialMode) {
    if (!mount) return;
    if (mount.querySelector(".auth-banner__code-login")) return;
    var wrap = document.createElement("div");
    wrap.className = "auth-banner__code-login";
    var backRow =
      (shouldUseOverlayAuthScreen() || isOverlayAuthScreenActive())
        ? '<div class="auth-banner__code-row auth-banner__code-row--back">' +
          '<button type="button" class="pwa-auth-screen__back-icon-btn" id="authPwaCodeBackBtn" aria-label="' + pwaAuthT("backToChoice") + '">' +
          '<span class="pwa-auth-screen__back-icon" aria-hidden="true">←</span>' +
          "</button>" +
          "</div>"
        : "";
    var botUser = "";
    try {
      var mx = String(telegramAppUrl || "").match(/t\.me\/([a-zA-Z0-9_]+)/i);
      if (mx) botUser = mx[1];
    } catch (eBot) {}
    var botUrl = botUser ? "https://t.me/" + botUser : "";
    var linkTme =
      botUrl && botUser
        ? '<a href="' + botUrl + '" target="_blank" rel="noopener noreferrer" class="auth-banner__code-intro-link">t.me/' + botUser + "</a>"
        : '<a href="https://t.me/Poker_dvatuza_bot" target="_blank" rel="noopener noreferrer" class="auth-banner__code-intro-link">t.me/Poker_dvatuza_bot</a>';
    wrap.innerHTML =
      backRow +
      '<div class="auth-banner__code-intro-wrap" role="note">' +
        '<p class="auth-banner__code-intro">' + pwaAuthT("usernameIntro1") + "</p>" +
        '<p class="auth-banner__code-intro">' + pwaAuthT("usernameIntro2") + "</p>" +
        '<p class="auth-banner__code-intro">' + pwaAuthT("usernameIntro3") + " " + linkTme + ".</p>" +
        '<p class="auth-banner__code-intro">' + pwaAuthT("usernameIntro4") + " " + linkTme + " " + pwaAuthT("usernameIntro5") + "</p>" +
      "</div>" +
      '<div class="auth-banner__code-row">' +
        '<input type="text" class="auth-banner__code-input" id="authPwaUsernameInput" placeholder="' + pwaAuthT("usernamePlaceholder") + '" autocomplete="off" />' +
      "</div>" +
      '<label class="auth-banner__code-row" style="justify-content:flex-start;gap:10px;font-size:14px;color:#cbd5e1;">' +
        '<input type="checkbox" id="authPwaRememberPassword" />' +
        '<span>' + pwaAuthT("rememberPassword") + "</span>" +
      "</label>" +
      '<div class="auth-banner__mode-switch">' +
        '<button type="button" class="pwa-auth-screen__enter-btn" id="authPwaLoginModeBtn">' + pwaAuthT("login") + "</button>" +
        '<button type="button" class="auth-banner__mode-link" id="authPwaRegisterModeBtn">' + pwaAuthT("switchToRegister") + "</button>" +
      "</div>" +
      '<div class="auth-banner__code-row" id="authPwaCodeSendRow">' +
        '<button type="button" class="auth-banner__code-btn auth-banner__code-btn--send" id="authPwaCodeSendBtn">' + pwaAuthT("sendCode") + "</button>" +
      "</div>" +
      '<div class="auth-banner__code-hint auth-banner__code-hint--hidden" id="authPwaCodeHint" role="status" aria-live="polite"></div>' +
      '<div class="auth-banner__code-row auth-banner__code-row--verify" id="authPwaCodeVerifyRow">' +
        '<input type="text" class="auth-banner__code-input auth-banner__code-input--otp" id="authPwaCodeInput" placeholder="' + pwaAuthT("codeFromTelegram") + '" inputmode="numeric" autocomplete="one-time-code" />' +
        '<button type="button" class="auth-banner__code-btn auth-banner__code-btn--verify" id="authPwaCodeVerifyBtn">' + pwaAuthT("done") + "</button>" +
      "</div>" +
      '<div class="auth-banner__code-row" id="authPwaPasswordRow">' +
        '<div class="auth-banner__password-wrap">' +
          '<input type="password" class="auth-banner__code-input auth-banner__password-input" id="authPwaPasswordInput" placeholder="' + pwaAuthT("setPassword") + '" autocomplete="current-password" />' +
          '<button type="button" class="auth-banner__password-toggle" id="authPwaPasswordToggle" aria-label="' + pwaAuthT("showPassword") + '" aria-pressed="false">👁</button>' +
        "</div>" +
      "</div>" +
      '<div class="auth-banner__code-row" id="authPwaPasswordConfirmRow">' +
        '<input type="password" class="auth-banner__code-input" id="authPwaPasswordConfirmInput" placeholder="' + pwaAuthT("confirmPassword") + '" autocomplete="new-password" />' +
      "</div>" +
      '<div class="auth-banner__primary-action" id="authPwaRegisterActionRow">' +
        '<button type="button" class="pwa-auth-screen__enter-btn" id="authPwaRegisterSubmitBtn">' + pwaAuthT("register") + "</button>" +
      "</div>" +
      '<div class="auth-banner__secondary-action" id="authPwaRegisterBottomRow">' +
      "</div>";
    mount.appendChild(wrap);

    var backBtn = wrap.querySelector("#authPwaCodeBackBtn");
    var userInput = wrap.querySelector("#authPwaUsernameInput");
    var passwordInput = wrap.querySelector("#authPwaPasswordInput");
    var passwordToggle = wrap.querySelector("#authPwaPasswordToggle");
    var loginModeBtn = wrap.querySelector("#authPwaLoginModeBtn");
    var registerModeBtn = wrap.querySelector("#authPwaRegisterModeBtn");
    var rememberPassword = wrap.querySelector("#authPwaRememberPassword");
    var rememberPasswordRow = rememberPassword ? rememberPassword.parentElement : null;
    var passwordConfirmInput = wrap.querySelector("#authPwaPasswordConfirmInput");
    var codeSendRow = wrap.querySelector("#authPwaCodeSendRow");
    var codeVerifyRow = wrap.querySelector("#authPwaCodeVerifyRow");
    var passwordRow = wrap.querySelector("#authPwaPasswordRow");
    var passwordConfirmRow = wrap.querySelector("#authPwaPasswordConfirmRow");
    var codeInput = wrap.querySelector("#authPwaCodeInput");
    var sendBtn = wrap.querySelector("#authPwaCodeSendBtn");
    var verifyBtn = wrap.querySelector("#authPwaCodeVerifyBtn");
    var registerSubmitBtn = wrap.querySelector("#authPwaRegisterSubmitBtn");
    var registerBottomRow = wrap.querySelector("#authPwaRegisterBottomRow");
    var hint = wrap.querySelector("#authPwaCodeHint");
    var base = getTelegramAuthApiBase();
    if (!base) return;
    var TG_LOGIN_LAST_KEY = "poker_auth_last_tg_username";

    if (backBtn) {
      backBtn.addEventListener("click", function () {
        remountCurrentAuthEnterScreen();
      });
    }
    function shortenPwaAuthHintForUi(raw, isError) {
      var s = raw != null ? String(raw).trim() : "";
      if (!isError || !s) return s;
      if (s.indexOf("\n\n") !== -1 || s.length > 320) {
        return getPwaAuthLocale() === "en"
          ? "Unable to continue. Please check the username and the steps above."
          : "Не удалось. Проверьте @username и шаги в инструкции выше.";
      }
      return s;
    }
    function setHint(text, isError) {
      var display = shortenPwaAuthHintForUi(text, !!isError);
      if (!hint) {
        if (isError && display && shouldUseOverlayAuthScreen()) {
          try {
            alert(display);
          } catch (eA) {}
        }
        return;
      }
      hint.innerHTML = "";
      hint.textContent = display || "";
      hint.classList.toggle("auth-banner__code-hint--error", !!isError);
      hint.classList.toggle("auth-banner__code-hint--hidden", !display);
    }
    function showCodeSentToBotHint() {
      if (!hint) {
        if (shouldUseOverlayAuthScreen()) {
          try {
            alert(pwaAuthT("sentTelegramCode"));
          } catch (eAl) {}
        }
        return;
      }
      hint.classList.remove("auth-banner__code-hint--hidden");
      hint.classList.remove("auth-banner__code-hint--error");
      hint.innerHTML = "";
      hint.textContent = pwaAuthT("sentTelegramCode");
    }
    function normalizeUsernameInput() {
      var raw = userInput && userInput.value ? userInput.value : "";
      return String(raw).trim().replace(/^@+/, "").toLowerCase();
    }
    function readLastUsername() {
      try {
        var raw = typeof localStorage !== "undefined" ? localStorage.getItem(TG_LOGIN_LAST_KEY) : "";
        raw = String(raw || "").trim().replace(/^@+/, "").toLowerCase();
        return /^[a-z0-9_]{5,32}$/.test(raw) ? raw : "";
      } catch (eLastUser) {
        return "";
      }
    }
    function saveLastUsername(username) {
      try {
        if (typeof localStorage === "undefined") return;
        var v = String(username || "").trim().replace(/^@+/, "").toLowerCase();
        if (v) localStorage.setItem(TG_LOGIN_LAST_KEY, v);
      } catch (eSaveUser) {}
    }
    var lastUsername = readLastUsername();
    if (userInput && lastUsername) userInput.value = "@" + lastUsername;
    if (passwordInput) passwordInput.value = pokerReadSavedPassword();
    if (passwordToggle && passwordInput) {
      passwordToggle.addEventListener("click", function () {
        var show = passwordInput.getAttribute("type") === "password";
        passwordInput.setAttribute("type", show ? "text" : "password");
        passwordToggle.setAttribute("aria-pressed", show ? "true" : "false");
        passwordToggle.setAttribute("aria-label", show ? pwaAuthT("hidePassword") : pwaAuthT("showPassword"));
      });
    }
    if (rememberPassword) rememberPassword.checked = pokerShouldRememberPassword();
    function passwordValue() {
      return String(passwordInput && passwordInput.value ? passwordInput.value : "");
    }
    function passwordConfirmValue() {
      return String(passwordConfirmInput && passwordConfirmInput.value ? passwordConfirmInput.value : "");
    }
    function persistPassword() {
      pokerPersistPasswordPreference(passwordValue(), !!(rememberPassword && rememberPassword.checked));
    }
    var authMode = initialMode === "register" ? "register" : "login";
    function syncAuthModeUi() {
      var registerMode = authMode === "register";
      wrap.setAttribute("data-auth-mode", authMode);
      if (passwordRow && registerMode && passwordConfirmRow && passwordRow.nextSibling !== passwordConfirmRow) {
        wrap.insertBefore(passwordRow, passwordConfirmRow);
      }
      if (passwordRow && !registerMode && rememberPasswordRow && passwordRow.nextSibling !== rememberPasswordRow) {
        wrap.insertBefore(passwordRow, rememberPasswordRow);
      }
      if (loginModeBtn) loginModeBtn.style.display = registerMode ? "none" : "";
      if (registerModeBtn) registerModeBtn.textContent = registerMode ? pwaAuthT("switchToLogin") : pwaAuthT("switchToRegister");
      if (registerModeBtn && registerBottomRow && registerMode && registerModeBtn.parentElement !== registerBottomRow) {
        registerBottomRow.appendChild(registerModeBtn);
      }
      if (registerModeBtn && loginModeBtn && !registerMode && registerModeBtn.parentElement !== loginModeBtn.parentElement) {
        loginModeBtn.parentElement.appendChild(registerModeBtn);
      }
      if (codeSendRow) codeSendRow.style.display = registerMode ? "" : "none";
      if (codeVerifyRow) codeVerifyRow.style.display = registerMode ? "" : "none";
      if (passwordRow) passwordRow.style.display = "";
      if (passwordConfirmRow) passwordConfirmRow.style.display = registerMode ? "" : "none";
      if (registerSubmitBtn) registerSubmitBtn.style.display = registerMode ? "" : "none";
      if (registerBottomRow) registerBottomRow.style.display = registerMode ? "flex" : "none";
    }
    function switchTelegramToPasswordSetup() {
      authMode = "register";
      syncAuthModeUi();
      setHint(pwaAuthT("telegramPasswordSetupHint"), true);
      if (sendBtn && sendBtn.focus) sendBtn.focus();
    }
    if (loginModeBtn) {
      loginModeBtn.addEventListener("click", function () {
        authMode = "login";
        syncAuthModeUi();
        var username = normalizeUsernameInput();
        if (!/^[a-z0-9_]{5,32}$/.test(username)) {
          setHint(pwaAuthT("invalidUsernameShort"), true);
          return;
        }
        setHint(pwaAuthT("checkingPassword"), false);
        pokerAuthFetch(base + "/api/auth-pwa-code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            typeof pokerApiAuthJsonBody === "function"
              ? pokerApiAuthJsonBody({ action: "login", username: username, password: passwordValue() })
              : { action: "login", username: username, password: passwordValue() }
          ),
        })
          .then(function (r) { return r.json().catch(function () { return { ok: false, error: pwaAuthT("invalidServerResponse") }; }); })
          .then(function (data) {
            if (data && data.ok && data.user && data.pwaSession) {
              saveLastUsername(username);
              persistPassword();
              var u = normalizeVerifiedUser(data.user, null);
              if (
                !pokerSavePwaTgSession(
                  data.pwaSession,
                  data.user,
                  {
                    gazettePlannerAccess: data.gazettePlannerAccess === true,
                    adminAccess: data.adminAccess === true,
                    adminReportAccess: data.adminReportAccess === true,
                    authMethod: "telegram",
                  }
                )
              )
                pwaSessionPersistenceWarning();
              pokerSavePwaGuestMode(false);
              var _authPwaPassword = { status: "verified", user: u, error: null };
              if (data.gazettePlannerAccess === true) _authPwaPassword.gazettePlannerAccess = true;
              if (data.adminAccess === true) _authPwaPassword.adminAccess = true;
              if (data.adminReportAccess === true) _authPwaPassword.adminReportAccess = true;
              window.__pokerTelegramAuth = _authPwaPassword;
              pokerSetAuthMethod("telegram");
              updateHeaderGreeting();
              showAuthorized(u);
              loadHeaderAvatar();
              try {
                window.dispatchEvent(new CustomEvent("poker-telegram-auth", { detail: { verified: true, user: u, pwa: true } }));
              } catch (ePwDispatch) {}
              return;
            }
            if (data && data.passwordSetupRequired) {
              switchTelegramToPasswordSetup();
              return;
            }
            setHint((data && data.error) || pwaAuthT("loginFailed"), true);
          })
          .catch(function () {
            setHint(pwaAuthT("networkRetry"), true);
          });
      });
    }
    if (registerModeBtn) {
      registerModeBtn.addEventListener("click", function () {
        authMode = authMode === "register" ? "login" : "register";
        syncAuthModeUi();
      });
    }
    if (sendBtn) {
      sendBtn.addEventListener("click", function () {
        var username = normalizeUsernameInput();
        if (!/^[a-z0-9_]{5,32}$/.test(username)) {
          setHint(pwaAuthT("invalidUsernameLong"), true);
          return;
        }
        sendBtn.disabled = true;
        sendBtn.textContent = pwaAuthT("sendingCode");
        if (hint) {
          hint.innerHTML = "";
          hint.classList.add("auth-banner__code-hint--hidden");
          hint.classList.remove("auth-banner__code-hint--error");
        }
        pokerAuthFetch(base + "/api/auth-pwa-code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            typeof pokerApiAuthJsonBody === "function"
              ? pokerApiAuthJsonBody({ action: "request", username: username })
              : { action: "request", username: username }
          ),
        })
          .then(function (r) { return r.json().catch(function () { return { ok: false, error: pwaAuthT("invalidServerResponse") }; }); })
          .then(function (data) {
            if (data && data.ok) {
              saveLastUsername(username);
              showCodeSentToBotHint();
              if (codeInput && codeInput.focus) codeInput.focus();
            } else {
              setHint((data && data.error) || pwaAuthT("sendCodeFailed"), true);
            }
          })
          .catch(function () {
            setHint(pwaAuthT("networkRetry"), true);
          })
          .finally(function () {
            sendBtn.disabled = false;
            sendBtn.textContent = pwaAuthT("sendCode");
          });
      });
    }
    var verifyInflight = false;
    function tryVerifyCode(opts) {
      opts = opts || {};
      var fromButton = !!opts.fromButton;
      if (verifyInflight || !codeInput) return;
      var username = normalizeUsernameInput();
      var code = String(codeInput.value || "").replace(/\D/g, "").slice(0, 6);
      if (codeInput.value !== code) codeInput.value = code;
      if (!/^[a-z0-9_]{5,32}$/.test(username)) {
        if (code.length >= 6 || fromButton) setHint(pwaAuthT("invalidUsernameShort"), true);
        return;
      }
      if (passwordValue() !== passwordConfirmValue()) {
        setHint(pwaAuthT("passwordsMismatch"), true);
        return;
      }
      if (!/^\d{6}$/.test(code)) {
        if (fromButton) setHint(pwaAuthT("enterTelegramCode"), true);
        return;
      }
      verifyInflight = true;
      codeInput.disabled = true;
      if (verifyBtn) {
        verifyBtn.disabled = true;
        verifyBtn.textContent = pwaAuthT("verifying");
      }
      if (registerSubmitBtn) registerSubmitBtn.disabled = true;
      pokerAuthFetch(base + "/api/auth-pwa-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          typeof pokerApiAuthJsonBody === "function"
            ? pokerApiAuthJsonBody({ action: "verify", username: username, code: code, password: passwordValue() })
            : { action: "verify", username: username, code: code, password: passwordValue() }
        ),
      })
        .then(function (r) { return r.json().catch(function () { return { ok: false, error: pwaAuthT("invalidServerResponse") }; }); })
        .then(function (data) {
          if (data && data.ok && data.user && data.pwaSession) {
            saveLastUsername(username);
            persistPassword();
            var u = normalizeVerifiedUser(data.user, null);
            if (
              !pokerSavePwaTgSession(
                data.pwaSession,
                data.user,
                {
                  gazettePlannerAccess: data.gazettePlannerAccess === true,
                  adminAccess: data.adminAccess === true,
                  adminReportAccess: data.adminReportAccess === true,
                  authMethod: "telegram",
                }
              )
            )
              pwaSessionPersistenceWarning();
            pokerSavePwaGuestMode(false);
            var _authPwaCode = { status: "verified", user: u, error: null };
            if (data.gazettePlannerAccess === true) _authPwaCode.gazettePlannerAccess = true;
            if (data.adminAccess === true) _authPwaCode.adminAccess = true;
            if (data.adminReportAccess === true) _authPwaCode.adminReportAccess = true;
            window.__pokerTelegramAuth = _authPwaCode;
            pokerSetAuthMethod("telegram");
            updateHeaderGreeting();
            showAuthorized(u);
            loadHeaderAvatar();
            try {
              window.dispatchEvent(new CustomEvent("poker-telegram-auth", { detail: { verified: true, user: u, pwa: true } }));
            } catch (e1) {}
            return;
          }
          setHint((data && data.error) || pwaAuthT("codeNotVerified"), true);
        })
        .catch(function () {
          setHint(pwaAuthT("networkRetry"), true);
        })
        .finally(function () {
          verifyInflight = false;
          if (codeInput) codeInput.disabled = false;
          if (verifyBtn) {
            verifyBtn.disabled = false;
            verifyBtn.textContent = pwaAuthT("done");
          }
          if (registerSubmitBtn) registerSubmitBtn.disabled = false;
        });
    }
    if (verifyBtn) {
      verifyBtn.addEventListener("click", function () {
        tryVerifyCode({ fromButton: true });
      });
    }
    if (registerSubmitBtn) {
      registerSubmitBtn.addEventListener("click", function () {
        tryVerifyCode({ fromButton: true });
      });
    }
    syncAuthModeUi();
    if (codeInput) {
      codeInput.addEventListener("input", function () {
        var d = String(codeInput.value || "").replace(/\D/g, "").slice(0, 6);
        if (codeInput.value !== d) codeInput.value = d;
        if (d.length === 6) tryVerifyCode();
      });
      codeInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          tryVerifyCode({ fromButton: true });
        }
      });
    }
  }

  function ensurePwaVerificationForm(mount) {
    if (!mount) return null;
    if (shouldUseOverlayAuthScreen()) {
      if (!mount.querySelector(".pwa-auth-screen__enter-actions, .auth-banner__email-login, .auth-banner__code-login")) {
        try {
          mount.innerHTML = "";
        } catch (eClearOverlayVerify) {}
      }
      return mount;
    }
    var form = mount.querySelector(".auth-banner__verify-form");
    if (!form) {
      mount.innerHTML =
        '<div class="auth-banner__verify-form">' +
          '<div class="auth-banner__verify-actions"></div>' +
        "</div>";
      form = mount.querySelector(".auth-banner__verify-form");
    }
    return form ? form.querySelector(".auth-banner__verify-actions") : null;
  }

  function mountAuthEnterButtons(mount, opts) {
    opts = opts || {};
    var standaloneMode = !!opts.standaloneMode;
    var includeGuest = !!opts.includeGuest;
    var mountedAttr = opts.mountedAttr || "data-pwa-enter-mounted";
    var emailBtnId = opts.emailBtnId || "authEnterEmailBtn";
    var telegramBtnId = opts.telegramBtnId || "authEnterTelegramBtn";
    var guestBtnId = opts.guestBtnId || "authEnterGuestBtn";
    var guestBlock = includeGuest
      ? '<div class="pwa-auth-screen__guest-block">' +
        '<button type="button" class="pwa-auth-screen__enter-btn pwa-auth-screen__enter-btn--secondary" id="' + guestBtnId + '">' + pwaAuthT("enterGuest") + "</button>" +
        '<p class="pwa-auth-screen__guest-note">' + pwaAuthT("guestNote") + "</p>" +
        "</div>"
      : "";
    var wrapperClass = standaloneMode ? "pwa-auth-screen__enter-actions" : "auth-banner__verify-actions pwa-auth-screen__enter-actions";
    if (!mount) return false;
    if (mount.getAttribute(mountedAttr) === "1") return true;
    mount.setAttribute(mountedAttr, "1");
    mount.innerHTML =
      '<div class="' + wrapperClass + '">' +
        '<button type="button" class="pwa-auth-screen__enter-btn" id="' + emailBtnId + '">' + pwaAuthT("enterEmail") + "</button>" +
        '<button type="button" class="pwa-auth-screen__enter-btn" id="' + telegramBtnId + '">' + pwaAuthT("enterTelegram") + "</button>" +
        guestBlock +
      "</div>";
    var emailBtn = mount.querySelector("#" + emailBtnId);
    var btn = mount.querySelector("#" + telegramBtnId);
    var guestBtn = includeGuest ? mount.querySelector("#" + guestBtnId) : null;
    if (!emailBtn || !btn || (includeGuest && !guestBtn)) return true;
    emailBtn.addEventListener("click", function () {
      pokerSavePwaGuestMode(false);
      try {
        mount.removeAttribute(mountedAttr);
      } catch (e0) {}
      mount.innerHTML = "";
      mountPwaEmailLogin(mount);
    });
    btn.addEventListener("click", function () {
      pokerSavePwaGuestMode(false);
      try {
        mount.removeAttribute(mountedAttr);
      } catch (e) {}
      mount.innerHTML = "";
      var actionsMount = ensurePwaVerificationForm(mount) || mount;
      mountPwaUsernameCodeLogin(actionsMount);
    });
    if (guestBtn) {
      guestBtn.addEventListener("click", function () {
        pokerSavePwaGuestMode(false);
        try {
          window.__pokerTelegramAuth = { status: "guest", user: null, error: null };
        } catch (eAuth) {}
        updateHeaderGreeting();
        updateProfileExitBtnVisibility();
        hidePwaAuthScreen();
        hideIdentifyingMini();
        try {
          if (banner) {
            banner.classList.add("auth-banner--hidden");
            banner.classList.remove("auth-banner--verifying");
          }
        } catch (eB) {}
        try {
          mount.innerHTML = "";
        } catch (eM) {}
      });
    }
    return true;
  }

  function mountPwaStandaloneEnterButton() {
    var m = pwaAuthLoginMountEl || document.getElementById("pwaAuthLoginMount");
    if (!m) return false;
    return mountAuthEnterButtons(m, {
      standaloneMode: true,
      includeGuest: true,
      mountedAttr: "data-pwa-enter-mounted",
      emailBtnId: "pwaAuthEnterEmailBtn",
      telegramBtnId: "pwaAuthEnterTelegramBtn",
      guestBtnId: "pwaAuthEnterGuestBtn"
    });
  }

  function mountMiniAppAuthEnterButtons() {
    var mount = document.getElementById("authBannerLoginMount");
    if (!mount) return false;
    return mountAuthEnterButtons(mount, {
      standaloneMode: false,
      includeGuest: false,
      mountedAttr: "data-miniapp-auth-enter-mounted",
      emailBtnId: "miniAppAuthEnterEmailBtn",
      telegramBtnId: "miniAppAuthEnterTelegramBtn"
    });
  }

  function remountPwaStandaloneEnterScreen() {
    var m = pwaAuthLoginMountEl || document.getElementById("pwaAuthLoginMount");
    if (!m) return;
    m.innerHTML = "";
    try {
      m.removeAttribute("data-pwa-enter-mounted");
    } catch (eRm) {}
    mountPwaStandaloneEnterButton();
  }

  function ensureOverlayAuthEntryMounted() {
    var mount = pwaAuthLoginMountEl || document.getElementById("pwaAuthLoginMount");
    if (!mount) return false;
    if (mount.querySelector(".pwa-auth-screen__enter-actions, .auth-banner__email-login, .auth-banner__code-login")) {
      return true;
    }
    try {
      mount.innerHTML = "";
      mount.removeAttribute("data-pwa-enter-mounted");
      mount.removeAttribute("data-pwa-widget-mounted");
    } catch (eEnsureMount) {}
    return !!mountPwaStandaloneEnterButton();
  }

  function remountCurrentAuthEnterScreen() {
    if (shouldUseOverlayAuthScreen() || isOverlayAuthScreenActive()) {
      remountPwaStandaloneEnterScreen();
      return;
    }
    var mount = document.getElementById("authBannerLoginMount");
    if (!mount) return;
    mount.innerHTML = "";
    try {
      mount.removeAttribute("data-miniapp-auth-enter-mounted");
      mount.removeAttribute("data-pwa-widget-mounted");
    } catch (eMiniRm) {}
    mountMiniAppAuthEnterButtons();
  }

  function showPwaStandaloneEntryScreen() {
    if (!shouldUseOverlayAuthScreen()) return;
    try {
      showPwaAuthScreen();
    } catch (eShowPwa) {}
    try {
      setPwaAuthIdentifyingPhase(false);
    } catch (eIdOff) {}
    try {
      hideIdentifyingMini();
    } catch (eMini) {}
    try {
      resetBannerForPwaLogin();
    } catch (eBanner) {}
    try {
      remountPwaStandaloneEnterScreen();
    } catch (eRemount) {}
  }

  function mountPwaEmailLogin(mount, initialMode) {
    if (!mount) return;
    if (mount.querySelector(".auth-banner__email-login")) return;
    var wrap = document.createElement("div");
    wrap.className = "auth-banner__email-login auth-banner__code-login";
    wrap.innerHTML =
      '<div class="auth-banner__code-row auth-banner__code-row--back">' +
        '<button type="button" class="pwa-auth-screen__back-icon-btn" id="authPwaEmailBackBtn" aria-label="' + pwaAuthT("backToChoice") + '">' +
          '<span class="pwa-auth-screen__back-icon" aria-hidden="true">←</span>' +
        "</button>" +
      "</div>" +
      '<div class="auth-banner__code-intro-wrap" role="note">' +
        '<p class="auth-banner__code-intro">' + pwaAuthT("emailIntro1") + "</p>" +
        '<p class="auth-banner__code-intro">' + pwaAuthT("emailIntro2") + "</p>" +
        '<p class="auth-banner__code-intro">' + pwaAuthT("emailIntro3") + "</p>" +
      "</div>" +
      '<div class="auth-banner__code-row">' +
        '<input type="email" class="auth-banner__code-input" id="authPwaEmailInput" placeholder="your@email.com" autocomplete="email" />' +
      "</div>" +
      '<label class="auth-banner__code-row" style="justify-content:flex-start;gap:10px;font-size:14px;color:#cbd5e1;">' +
        '<input type="checkbox" id="authPwaEmailRememberPassword" />' +
        '<span>' + pwaAuthT("rememberPassword") + "</span>" +
      "</label>" +
      '<div class="auth-banner__mode-switch">' +
        '<button type="button" class="pwa-auth-screen__enter-btn" id="authPwaEmailLoginModeBtn">' + pwaAuthT("login") + "</button>" +
        '<button type="button" class="auth-banner__mode-link" id="authPwaEmailRegisterModeBtn">' + pwaAuthT("switchToRegister") + "</button>" +
      "</div>" +
      '<div class="auth-banner__code-row" id="authPwaEmailCodeSendRow">' +
        '<button type="button" class="auth-banner__code-btn auth-banner__code-btn--send" id="authPwaEmailSendBtn">' + pwaAuthT("emailSendCode") + "</button>" +
      "</div>" +
      '<div class="auth-banner__code-hint auth-banner__code-hint--hidden" id="authPwaEmailHint" role="status" aria-live="polite"></div>' +
      '<div class="auth-banner__code-row auth-banner__code-row--verify" id="authPwaEmailCodeVerifyRow">' +
        '<input type="text" class="auth-banner__code-input auth-banner__code-input--otp" id="authPwaEmailCodeInput" placeholder="' + pwaAuthT("emailCodePlaceholder") + '" inputmode="numeric" autocomplete="one-time-code" />' +
        '<button type="button" class="auth-banner__code-btn auth-banner__code-btn--verify" id="authPwaEmailVerifyBtn">' + pwaAuthT("emailVerify") + "</button>" +
      "</div>" +
      '<div class="auth-banner__code-row" id="authPwaEmailPasswordRow">' +
        '<div class="auth-banner__password-wrap">' +
          '<input type="password" class="auth-banner__code-input auth-banner__password-input" id="authPwaEmailPasswordInput" placeholder="' + pwaAuthT("setPassword") + '" autocomplete="current-password" />' +
        '<button type="button" class="auth-banner__password-toggle" id="authPwaEmailPasswordToggle" aria-label="' + pwaAuthT("showPassword") + '" aria-pressed="false">👁</button>' +
        "</div>" +
      "</div>" +
      '<div class="auth-banner__code-row" id="authPwaEmailPasswordConfirmRow">' +
        '<input type="password" class="auth-banner__code-input" id="authPwaEmailPasswordConfirmInput" placeholder="' + pwaAuthT("confirmPassword") + '" autocomplete="new-password" />' +
      "</div>" +
      '<div class="auth-banner__primary-action" id="authPwaEmailRegisterActionRow">' +
        '<button type="button" class="pwa-auth-screen__enter-btn" id="authPwaEmailRegisterSubmitBtn">' + pwaAuthT("register") + "</button>" +
      "</div>" +
      '<div class="auth-banner__secondary-action" id="authPwaEmailRegisterBottomRow">' +
      "</div>";
    mount.appendChild(wrap);

    var backBtn = wrap.querySelector("#authPwaEmailBackBtn");
    var emailInput = wrap.querySelector("#authPwaEmailInput");
    var passwordInput = wrap.querySelector("#authPwaEmailPasswordInput");
    var passwordToggle = wrap.querySelector("#authPwaEmailPasswordToggle");
    var loginModeBtn = wrap.querySelector("#authPwaEmailLoginModeBtn");
    var registerModeBtn = wrap.querySelector("#authPwaEmailRegisterModeBtn");
    var rememberPassword = wrap.querySelector("#authPwaEmailRememberPassword");
    var rememberPasswordRow = rememberPassword ? rememberPassword.parentElement : null;
    var passwordConfirmInput = wrap.querySelector("#authPwaEmailPasswordConfirmInput");
    var codeSendRow = wrap.querySelector("#authPwaEmailCodeSendRow");
    var codeVerifyRow = wrap.querySelector("#authPwaEmailCodeVerifyRow");
    var passwordRow = wrap.querySelector("#authPwaEmailPasswordRow");
    var passwordConfirmRow = wrap.querySelector("#authPwaEmailPasswordConfirmRow");
    var codeInput = wrap.querySelector("#authPwaEmailCodeInput");
    var sendBtn = wrap.querySelector("#authPwaEmailSendBtn");
    var verifyBtn = wrap.querySelector("#authPwaEmailVerifyBtn");
    var registerSubmitBtn = wrap.querySelector("#authPwaEmailRegisterSubmitBtn");
    var registerBottomRow = wrap.querySelector("#authPwaEmailRegisterBottomRow");
    var hint = wrap.querySelector("#authPwaEmailHint");
    var base = getTelegramAuthApiBase();
    if (!base) return;
    var EMAIL_LAST_KEY = "poker_auth_last_email";

    function setEmailHint(text, isError, isSuccess) {
      if (!hint) return;
      hint.textContent = text || "";
      hint.classList.toggle("auth-banner__code-hint--error", !!isError);
      hint.classList.toggle("auth-banner__code-hint--success", !!isSuccess && !isError);
      hint.classList.toggle("auth-banner__code-hint--hidden", !text);
    }
    function normalizeEmailInput() {
      return String(emailInput && emailInput.value ? emailInput.value : "").trim().toLowerCase();
    }
    if (emailInput) {
      emailInput.addEventListener("input", function () {
        resetEmailRegisterVerification();
      });
    }
    function readLastEmail() {
      try {
        var raw = typeof localStorage !== "undefined" ? localStorage.getItem(EMAIL_LAST_KEY) : "";
        raw = String(raw || "").trim().toLowerCase();
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw) ? raw : "";
      } catch (eLastEmail) {
        return "";
      }
    }
    function saveLastEmail(email) {
      try {
        if (typeof localStorage === "undefined") return;
        var v = String(email || "").trim().toLowerCase();
        if (v) localStorage.setItem(EMAIL_LAST_KEY, v);
      } catch (eSaveEmail) {}
    }
    function getEmailDtIdHint() {
      try {
        var v = (typeof localStorage !== "undefined" && localStorage.getItem("poker_dt_id")) || "";
        v = String(v || "").trim().toUpperCase();
        return /^ID\d{6}$/.test(v) ? v : "";
      } catch (eDtHint) {
        return "";
      }
    }

    if (backBtn) {
      backBtn.addEventListener("click", function () {
        remountCurrentAuthEnterScreen();
      });
    }
    var lastEmail = readLastEmail();
    if (emailInput && lastEmail) emailInput.value = lastEmail;
    if (passwordInput) passwordInput.value = pokerReadSavedPassword();
    if (passwordToggle && passwordInput) {
      passwordToggle.addEventListener("click", function () {
        var show = passwordInput.getAttribute("type") === "password";
        passwordInput.setAttribute("type", show ? "text" : "password");
        passwordToggle.setAttribute("aria-pressed", show ? "true" : "false");
        passwordToggle.setAttribute("aria-label", show ? pwaAuthT("hidePassword") : pwaAuthT("showPassword"));
      });
    }
    if (rememberPassword) rememberPassword.checked = pokerShouldRememberPassword();
    function passwordValue() {
      return String(passwordInput && passwordInput.value ? passwordInput.value : "");
    }
    function passwordConfirmValue() {
      return String(passwordConfirmInput && passwordConfirmInput.value ? passwordConfirmInput.value : "");
    }
    function persistPassword() {
      pokerPersistPasswordPreference(passwordValue(), !!(rememberPassword && rememberPassword.checked));
    }
    if (codeInput) {
      codeInput.addEventListener("input", function () {
        codeInput.value = String(codeInput.value || "").replace(/\D/g, "").slice(0, 6);
        resetEmailRegisterVerification();
      });
    }
    var authMode = initialMode === "register" ? "register" : "login";
    var emailCodeConfirmed = false;
    function resetEmailRegisterVerification() {
      emailCodeConfirmed = false;
    }
    function switchEmailToPasswordSetup() {
      authMode = "register";
      resetEmailRegisterVerification();
      syncAuthModeUi();
      setEmailHint(pwaAuthT("emailPasswordSetupHint"), true);
      if (sendBtn && sendBtn.focus) sendBtn.focus();
    }
    function syncAuthModeUi() {
      var registerMode = authMode === "register";
      wrap.setAttribute("data-auth-mode", authMode);
      if (passwordRow && registerMode && passwordConfirmRow && passwordRow.nextSibling !== passwordConfirmRow) {
        wrap.insertBefore(passwordRow, passwordConfirmRow);
      }
      if (passwordRow && !registerMode && rememberPasswordRow && passwordRow.nextSibling !== rememberPasswordRow) {
        wrap.insertBefore(passwordRow, rememberPasswordRow);
      }
      if (loginModeBtn) {
        loginModeBtn.style.display = registerMode ? "none" : "";
      }
      if (registerModeBtn) registerModeBtn.textContent = registerMode ? pwaAuthT("switchToLogin") : pwaAuthT("switchToRegister");
      if (registerModeBtn && registerBottomRow && registerMode && registerModeBtn.parentElement !== registerBottomRow) {
        registerBottomRow.appendChild(registerModeBtn);
      }
      if (registerModeBtn && loginModeBtn && !registerMode && registerModeBtn.parentElement !== loginModeBtn.parentElement) {
        loginModeBtn.parentElement.appendChild(registerModeBtn);
      }
      if (codeSendRow) codeSendRow.style.display = registerMode ? "" : "none";
      if (codeVerifyRow) codeVerifyRow.style.display = registerMode ? "" : "none";
      if (passwordRow) passwordRow.style.display = "";
      if (passwordConfirmRow) passwordConfirmRow.style.display = registerMode ? "" : "none";
      if (registerSubmitBtn) registerSubmitBtn.style.display = registerMode ? "" : "none";
      if (registerBottomRow) registerBottomRow.style.display = registerMode ? "flex" : "none";
    }
    if (loginModeBtn) {
      loginModeBtn.addEventListener("click", function () {
        authMode = "login";
        syncAuthModeUi();
        var email = normalizeEmailInput();
        setEmailHint(pwaAuthT("emailCheckingPassword"), false);
        pokerAuthFetch(base + "/api/auth-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "login",
            email: email,
            password: passwordValue(),
            dtIdHint: getEmailDtIdHint(),
            memberIdHint: pokerReadLastMemberIdHint(),
          }),
        })
          .then(function (res) {
            return res.json().catch(function () { return {}; }).then(function (data) { return { res: res, data: data || {} }; });
          })
          .then(function (pack) {
            var data = pack.data || {};
            if (pack.res.ok && data.ok && data.user && data.pwaSession) {
              saveLastEmail(email);
              persistPassword();
              var u = normalizeVerifiedUser(data.user, null);
              try {
                if (data.dtId) {
                  sessionStorage.setItem("poker_dt_id", data.dtId);
                  if (typeof localStorage !== "undefined") localStorage.setItem("poker_dt_id", data.dtId);
                }
              } catch (eDtSaveLogin) {}
              if (
                !pokerSavePwaTgSession(
                  data.pwaSession,
                  data.user,
                  {
                    gazettePlannerAccess: data.gazettePlannerAccess === true,
                    adminAccess: data.adminAccess === true,
                    adminReportAccess: data.adminReportAccess === true,
                    authMethod: "email",
                  }
                )
              ) {
                pwaSessionPersistenceWarning();
              }
              pokerSavePwaGuestMode(false);
              window.__pokerTelegramAuth = { status: "verified", user: u, error: null };
              if (data.gazettePlannerAccess === true) window.__pokerTelegramAuth.gazettePlannerAccess = true;
              if (data.adminAccess === true) window.__pokerTelegramAuth.adminAccess = true;
              if (data.adminReportAccess === true) window.__pokerTelegramAuth.adminReportAccess = true;
              pokerMaybeRememberMemberIdFromUser(u);
              pokerSetAuthMethod("email");
              updateHeaderGreeting();
              showAuthorized(u);
              loadHeaderAvatar();
              try {
                window.dispatchEvent(new CustomEvent("poker-telegram-auth", { detail: { verified: true, user: u, pwa: true, email: true } }));
              } catch (eEmailLoginDispatch) {}
              try {
                pokerClearUiCachesAfterAuthSwitch();
              } catch (eClearUiCachesLogin) {}
              return;
            }
            if (data && data.passwordSetupRequired) {
              switchEmailToPasswordSetup();
              return;
            }
            setEmailHint((data && data.error) || pwaAuthT("emailLoginFailed"), true);
          })
          .catch(function () {
            setEmailHint(pwaAuthT("networkError"), true);
          });
      });
    }
    if (registerModeBtn) {
      registerModeBtn.addEventListener("click", function () {
        authMode = authMode === "register" ? "login" : "register";
        if (authMode !== "register") resetEmailRegisterVerification();
        syncAuthModeUi();
      });
    }
    if (sendBtn) {
      sendBtn.addEventListener("click", function () {
        var email = normalizeEmailInput();
        resetEmailRegisterVerification();
        setEmailHint(pwaAuthT("emailSendingCode"), false);
        pokerAuthFetch(base + "/api/auth-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "request",
            email: email,
            dtIdHint: getEmailDtIdHint(),
            memberIdHint: pokerReadLastMemberIdHint(),
          }),
        })
          .then(function (r) { return r.json().catch(function () { return {}; }); })
          .then(function (data) {
            var okMsg = pwaAuthT("emailSentDefault");
            if (data && data.ok) saveLastEmail(email);
            if (data && data.ok && data.mode === "register") okMsg = pwaAuthT("emailSentRegister");
            if (data && data.ok && data.mode === "login") okMsg = pwaAuthT("emailSentLogin");
            setEmailHint(data && data.ok ? okMsg : ((data && data.error) || pwaAuthT("emailSendFailed")), !(data && data.ok), !!(data && data.ok));
          })
          .catch(function () {
            setEmailHint(pwaAuthT("networkError"), true);
          });
      });
    }
    if (verifyBtn) {
      verifyBtn.addEventListener("click", function () {
        var email = normalizeEmailInput();
        var code = String(codeInput && codeInput.value ? codeInput.value : "").trim();
        setEmailHint(pwaAuthT("emailCheckingCode"), false);
        pokerAuthFetch(base + "/api/auth-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "verify",
            email: email,
            code: code,
            dtIdHint: getEmailDtIdHint(),
            memberIdHint: pokerReadLastMemberIdHint(),
          }),
        })
          .then(function (res) {
            return res.json().catch(function () { return {}; }).then(function (data) { return { res: res, data: data || {} }; });
          })
          .then(function (pack) {
            var data = pack.data || {};
            if (pack.res.ok && data.ok) {
              emailCodeConfirmed = true;
              saveLastEmail(email);
              setEmailHint(pwaAuthT("emailCodeConfirmed"), false);
              if (passwordInput && passwordInput.focus) passwordInput.focus();
              return;
            }
            setEmailHint((data && data.error) || pwaAuthT("emailLoginFailed"), true);
          })
          .catch(function () {
            setEmailHint(pwaAuthT("networkError"), true);
          });
      });
    }
    if (registerSubmitBtn) {
      registerSubmitBtn.addEventListener("click", function () {
        var email = normalizeEmailInput();
        var code = String(codeInput && codeInput.value ? codeInput.value : "").trim();
        if (!emailCodeConfirmed) {
          if (verifyBtn) verifyBtn.click();
          return;
        }
        if (!passwordValue()) {
          setEmailHint(pwaAuthT("passwordRequired"), true);
          return;
        }
        if (passwordValue() !== passwordConfirmValue()) {
          setEmailHint(pwaAuthT("passwordsMismatch"), true);
          return;
        }
        setEmailHint(pwaAuthT("emailCheckingCode"), false);
        pokerAuthFetch(base + "/api/auth-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "verify",
            email: email,
            code: code,
            password: passwordValue(),
            dtIdHint: getEmailDtIdHint(),
            memberIdHint: pokerReadLastMemberIdHint(),
          }),
        })
          .then(function (res) {
            return res.json().catch(function () { return {}; }).then(function (data) { return { res: res, data: data || {} }; });
          })
          .then(function (pack) {
            var data = pack.data || {};
            if (pack.res.ok && data.ok && data.user && data.pwaSession) {
              saveLastEmail(email);
              persistPassword();
              var u = normalizeVerifiedUser(data.user, null);
              try {
                if (data.dtId) {
                  sessionStorage.setItem("poker_dt_id", data.dtId);
                  if (typeof localStorage !== "undefined") localStorage.setItem("poker_dt_id", data.dtId);
                }
              } catch (eDtSave) {}
              if (
                !pokerSavePwaTgSession(
                  data.pwaSession,
                  data.user,
                  {
                    gazettePlannerAccess: data.gazettePlannerAccess === true,
                    adminAccess: data.adminAccess === true,
                    adminReportAccess: data.adminReportAccess === true,
                    authMethod: "email",
                  }
                )
              ) {
                pwaSessionPersistenceWarning();
              }
              pokerSavePwaGuestMode(false);
              window.__pokerTelegramAuth = { status: "verified", user: u, error: null };
              if (data.gazettePlannerAccess === true) window.__pokerTelegramAuth.gazettePlannerAccess = true;
              if (data.adminAccess === true) window.__pokerTelegramAuth.adminAccess = true;
              if (data.adminReportAccess === true) window.__pokerTelegramAuth.adminReportAccess = true;
              pokerMaybeRememberMemberIdFromUser(u);
              pokerSetAuthMethod("email");
              updateHeaderGreeting();
              showAuthorized(u);
              loadHeaderAvatar();
              try {
                window.dispatchEvent(new CustomEvent("poker-telegram-auth", { detail: { verified: true, user: u, pwa: true, email: true } }));
              } catch (eEv) {}
              try {
                pokerClearUiCachesAfterAuthSwitch();
              } catch (eClearUiCaches) {}
              return;
            }
            setEmailHint((data && data.error) || pwaAuthT("emailLoginFailed"), true);
          })
          .catch(function () {
            setEmailHint(pwaAuthT("networkError"), true);
          });
      });
    }
    syncAuthModeUi();
  }

  function showAuthorized(user) {
    bumpAuthFlowGeneration();
    pokerSetHomeAuthResolved(true);
    try {
      if (typeof setView === "function") setView("home");
    } catch (eSetHomeAfterAuth) {}
    if (userEl) {
      var textEl = userEl.querySelector("#authUserText");
      if (textEl) {
        var dn = pokerPreferredProfileDisplayName() || telegramUserDisplayName(user);
        textEl.textContent = dn ? "Привет, " + dn + "!" : "Вы вошли";
      }
      userEl.classList.remove("auth-user--hidden");
      loadHeaderAvatar();
    }
    if (banner) {
      banner.classList.add("auth-banner--hidden");
      banner.classList.remove("auth-banner--verifying");
    }
    hidePwaAuthScreen();
    hideIdentifyingMini();
    if (bannerRetry) bannerRetry.hidden = true;
    syncSiteHomeInstructionMode();
  }

  function hasActiveVerifiedAuthState() {
    try {
      var auth = window.__pokerTelegramAuth;
      if (auth && auth.user && (auth.status === "verified" || auth.status === "dev_skip")) return true;
    } catch (eAuthState) {}
    return false;
  }

  function showUnauthorized(force) {
    if (!force && hasActiveVerifiedAuthState()) {
      try {
        pokerSetHomeAuthResolved(true);
        hidePwaAuthScreen();
        hideIdentifyingMini();
        if (banner) {
          banner.classList.add("auth-banner--hidden");
          banner.classList.remove("auth-banner--verifying");
        }
        if (userEl) userEl.classList.remove("auth-user--hidden");
        syncSiteHomeInstructionMode();
      } catch (eKeepAuth) {}
      return;
    }
    if (!force) {
      try {
        var hasStoredSessionForRestore =
          (typeof pokerReadPwaTgSessionToken === "function" && pokerReadPwaTgSessionToken()) ||
          (typeof pokerReadPwaVkSessionToken === "function" && pokerReadPwaVkSessionToken());
        var authNow = window.__pokerTelegramAuth;
        var canTryStoredSession =
          hasStoredSessionForRestore &&
          !(authNow && (authNow.status === "invalid" || authNow.status === "guest"));
        if (canTryStoredSession && typeof attemptPwaSideAuthRestoreAsync === "function") {
          try {
            setPwaAuthIdentifyingPhase(true);
          } catch (eIdStored) {}
          attemptPwaSideAuthRestoreAsync().then(function (restored) {
            try {
              setPwaAuthIdentifyingPhase(false);
            } catch (eIdStoredOff) {}
            if (!restored) showUnauthorized(true);
          });
          return;
        }
      } catch (eStoredRestore) {}
    }
    pokerSetHomeAuthResolved(false);
    if (userEl) userEl.classList.add("auth-user--hidden");
    if (shouldUseOverlayAuthScreen()) {
      if (pokerReadPwaGuestMode()) {
        try {
          window.__pokerTelegramAuth = { status: "guest", user: null, error: null };
        } catch (eGuest) {}
        updateHeaderGreeting();
        hidePwaAuthScreen();
        hideIdentifyingMini();
        if (banner) banner.classList.add("auth-banner--hidden");
        return;
      }
      if (banner) banner.classList.add("auth-banner--hidden");
      showPwaStandaloneEntryScreen();
    } else {
      if (banner) banner.classList.add("auth-banner--hidden");
    }
  }

  function updateHeaderGreeting() {
    var el = document.getElementById("headerGreeting");
    syncSiteHomeInstructionMode();
    if (typeof window.__pokerSyncProfileGuestWebsiteMode === "function") {
      window.__pokerSyncProfileGuestWebsiteMode();
    }
    if (!el) return;
    if (isSiteHomeInstructionMode()) {
      el.textContent = "Войти";
      return;
    }
    var profileName = pokerPreferredProfileDisplayName();
    if (profileName) {
      el.textContent = "Привет, " + profileName + "!";
      return;
    }
    var u = null;
    var auth = window.__pokerTelegramAuth;
    if (auth && (auth.status === "invalid" || auth.status === "network")) {
      u = null;
    } else if (auth && auth.user && (auth.status === "verified" || auth.status === "dev_skip")) {
      u = auth.user;
    } else {
      var tgGreeting = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (tgGreeting && tgGreeting.initDataUnsafe && tgGreeting.initDataUnsafe.user) {
        u = tgGreeting.initDataUnsafe.user;
      }
    }
    var dn = telegramUserDisplayName(u);
    el.textContent = dn ? "Привет, " + dn + "!" : "Привет!";
  }

  function hasResolvedHomeAuthUser() {
    try {
      if (window.__pokerHomeAuthResolved === true) return true;
    } catch (eHomeFlag) {}
    try {
      var auth = window.__pokerTelegramAuth;
      if (auth && (auth.status === "invalid" || auth.status === "network" || auth.status === "guest")) return false;
      if (auth && auth.user && (auth.status === "verified" || auth.status === "dev_skip")) return true;
    } catch (eAuthHome) {}
    try {
      if (typeof pokerApiHasCredential === "function" && pokerApiHasCredential()) return true;
    } catch (eCredHome) {}
    try {
      var tgNow = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
      if (tgNow && tgNow.initDataUnsafe && tgNow.initDataUnsafe.user) return true;
    } catch (eTgHome) {}
    try {
      if (pokerReadPwaTgSessionToken() || pokerReadPwaVkSessionToken()) return true;
    } catch (eSessionHome) {}
    return false;
  }

  function isSiteHomeInstructionMode() {
    var isStandaloneMode =
      (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
      window.navigator.standalone === true ||
      document.referrer.indexOf("android-app://") === 0;
    var hasResolvedAuth = hasResolvedHomeAuthUser();
    var bodyView = document.body && document.body.getAttribute("data-view");
    return !isStandaloneMode && !hasResolvedAuth && bodyView === "home";
  }

  function isTelegramHomeInstructionMode() {
    var isStandaloneMode =
      (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
      window.navigator.standalone === true ||
      document.referrer.indexOf("android-app://") === 0;
    var isTelegramMini = !!(window.Telegram && window.Telegram.WebApp);
    var bodyView = document.body && document.body.getAttribute("data-view");
    return !isStandaloneMode && isTelegramMini && bodyView === "home";
  }

  function syncSiteHomeInstructionMode() {
    var root = document.documentElement;
    var isStandaloneMode =
      (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
      window.navigator.standalone === true ||
      document.referrer.indexOf("android-app://") === 0;
    var hasResolvedAuth = hasResolvedHomeAuthUser();
    var isSiteMode = isSiteHomeInstructionMode();
    var isTelegramMode = isTelegramHomeInstructionMode();
    var showInstructionBtn = isSiteMode || isTelegramMode;
    var showAuthBtn = showInstructionBtn && !hasResolvedAuth;
    var instructionBtn = document.getElementById("siteHomeInstructionBtn");
    var authBtn = document.getElementById("siteHomeAuthBtn");
    var pwaInstallBtn = document.getElementById("pwaInstallBtn");
    var greetingArrow = document.getElementById("headerGreetingArrow");
    var hideInstructionBtn = !showInstructionBtn || isStandaloneMode;
    var hideAuthBtn = !showAuthBtn || isStandaloneMode;
    if (root) root.classList.toggle("site-home-header-mode", isSiteMode);
    if (instructionBtn) {
      instructionBtn.hidden = hideInstructionBtn;
      if (hideInstructionBtn) instructionBtn.style.display = "none";
      else instructionBtn.style.removeProperty("display");
    }
    if (authBtn) {
      authBtn.hidden = hideAuthBtn;
      if (hideAuthBtn) authBtn.style.display = "none";
      else authBtn.style.removeProperty("display");
    }
    if (pwaInstallBtn && isTelegramMode) {
      pwaInstallBtn.hidden = true;
      pwaInstallBtn.style.display = "none";
    } else if (pwaInstallBtn) {
      pwaInstallBtn.style.removeProperty("display");
    }
    if (greetingArrow) greetingArrow.hidden = !isSiteMode;
  }
  window.__pokerSyncSiteHomeInstructionMode = syncSiteHomeInstructionMode;

  function initSiteHomeInstructionModal() {
    var modal = document.getElementById("siteHomeInstructionModal");
    var openBtn = document.getElementById("siteHomeInstructionBtn");
    var authBtn = document.getElementById("siteHomeAuthBtn");
    var closeBtn = document.getElementById("siteHomeInstructionModalClose");
    var backdrop = document.getElementById("siteHomeInstructionModalBackdrop");
    var tabIphone = document.getElementById("siteHomeInstructionTabIphone");
    var tabAndroid = document.getElementById("siteHomeInstructionTabAndroid");
    var panelIphone = document.getElementById("siteHomeInstructionPanelIphone");
    var panelAndroid = document.getElementById("siteHomeInstructionPanelAndroid");
    if (!modal || !openBtn || !closeBtn || !backdrop) return;

    function setTab(name) {
      var iphoneOn = name !== "android";
      if (tabIphone) {
        tabIphone.classList.toggle("club-charter-modal__menu-item--active", iphoneOn);
        tabIphone.setAttribute("aria-selected", iphoneOn ? "true" : "false");
      }
      if (tabAndroid) {
        tabAndroid.classList.toggle("club-charter-modal__menu-item--active", !iphoneOn);
        tabAndroid.setAttribute("aria-selected", iphoneOn ? "false" : "true");
      }
      if (panelIphone) panelIphone.hidden = !iphoneOn;
      if (panelAndroid) panelAndroid.hidden = iphoneOn;
    }

    function openModal() {
      setTab("iphone");
      modal.setAttribute("aria-hidden", "false");
      document.documentElement.classList.add("club-charter-modal-open");
      try {
        if (typeof pokerApplyTelegramTopClearance === "function") pokerApplyTelegramTopClearance();
      } catch (eTgInstructionOpen) {}
    }

    function closeModal() {
      modal.setAttribute("aria-hidden", "true");
      if (!document.querySelector('.club-charter-modal[aria-hidden="false"]')) {
        document.documentElement.classList.remove("club-charter-modal-open");
      }
    }

    function handleOpenInstructionModal(e) {
      if (e && typeof e.preventDefault === "function") e.preventDefault();
      if (e && typeof e.stopPropagation === "function") e.stopPropagation();
      openModal();
    }
    function handleOpenAccountAuth(e) {
      if (e && typeof e.preventDefault === "function") e.preventDefault();
      if (typeof window.__pokerOpenSharedAccountAuthFlow === "function") {
        window.__pokerOpenSharedAccountAuthFlow();
      }
    }
    openBtn.onclick = handleOpenInstructionModal;
    openBtn.addEventListener("pointerdown", handleOpenInstructionModal, { passive: false, capture: true });
    openBtn.addEventListener("touchstart", handleOpenInstructionModal, { passive: false });
    openBtn.addEventListener("click", handleOpenInstructionModal);
    if (authBtn) {
      authBtn.onclick = handleOpenAccountAuth;
      authBtn.addEventListener("click", handleOpenAccountAuth);
    }
    if (tabIphone) tabIphone.addEventListener("click", function () { setTab("iphone"); });
    if (tabAndroid) tabAndroid.addEventListener("click", function () { setTab("android"); });
    closeBtn.addEventListener("click", closeModal);
    backdrop.addEventListener("click", closeModal);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeModal();
    });
    window.__pokerOpenSiteHomeInstructionModal = openModal;
  }
  window.__pokerInitSiteHomeInstructionModal = initSiteHomeInstructionModal;

  function openSharedAccountAuthFlow() {
    try {
      if (typeof window.__pokerOpenPwaLoginScreen === "function") {
        window.__pokerOpenPwaLoginScreen();
        return;
      }
    } catch (eOpenPwaLogin) {}
  }
  window.__pokerOpenSharedAccountAuthFlow = openSharedAccountAuthFlow;

  function isWebsiteGuestProfileMode() {
    var hasSession = !!(pokerReadPwaTgSessionToken() || pokerReadPwaVkSessionToken());
    var isPwaGuest = false;
    try {
      isPwaGuest = !!pokerReadPwaGuestMode();
    } catch (ePwaGuestProfile) {}
    var isStandaloneMode =
      (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
      window.navigator.standalone === true ||
      document.referrer.indexOf("android-app://") === 0;
    var hasResolvedAuth = hasResolvedHomeAuthUser();
    return !hasSession && !hasResolvedAuth && !isStandaloneMode && !isPwaGuest;
  }

  function syncProfileGuestWebsiteMode() {
    var chatRow = document.getElementById("profileChatNameRow");
    var saveWrap = document.getElementById("profileChatNameSaveWrap");
    var personalSection = document.getElementById("profilePersonalSection");
    var guestMode = isWebsiteGuestProfileMode();
    if (chatRow) chatRow.classList.toggle("profile-guest-hidden", guestMode);
    if (saveWrap) saveWrap.classList.toggle("profile-guest-hidden", guestMode);
    if (personalSection) personalSection.classList.toggle("profile-guest-hidden", guestMode);
    syncProfileStatusVisibility(!guestMode);
    syncProfileVerifiedContentVisibility(!guestMode);
  }
  window.__pokerSyncProfileGuestWebsiteMode = syncProfileGuestWebsiteMode;

  function setBannerVerifying() {
    if (shouldUseOverlayAuthScreen()) {
      hideLegacyInlineAuthUi();
      setPwaAuthScreenNotice("");
      showPwaAuthScreen();
      setPwaAuthIdentifyingPhase(true);
      return;
    }
    if (!shouldUseOverlayAuthScreen()) {
      if (banner) banner.classList.add("auth-banner--hidden");
      /* Mini App: баннер убран из DOM раньше ломал виджет; полоса «идентификация» должна быть видна */
      showIdentifyingMini();
      return;
    }
    if (bannerText) bannerText.textContent = "Профиль прогружается…";
    if (bannerLink) bannerLink.style.display = "none";
    if (hintEl) hintEl.style.display = "none";
    if (bannerRetry) bannerRetry.hidden = true;
    if (banner) {
      banner.classList.remove("auth-banner--hidden");
      banner.classList.add("auth-banner--verifying");
    }
    showIdentifyingMini();
  }

  function setBannerFailure(message, showRetry) {
    if (shouldUseOverlayAuthScreen()) {
      setPwaAuthIdentifyingPhase(false);
      openOverlayAuthEntryScreen();
      setPwaAuthScreenNotice(message || "Вход не подтверждён.");
      return;
    }
    if (!shouldUseOverlayAuthScreen()) {
      hideIdentifyingMini();
      if (bannerText) bannerText.textContent = message || "Вход не подтверждён.";
      if (banner) {
        banner.classList.remove("auth-banner--verifying");
        if (shouldSuppressMiniAppPwaLoginBanner()) {
          banner.classList.add("auth-banner--hidden");
        } else {
          banner.classList.remove("auth-banner--hidden");
        }
      }
      if (bannerRetry) bannerRetry.hidden = !showRetry;
      if (bannerLink) bannerLink.style.display = "none";
      return;
    }
    if (bannerText) bannerText.textContent = message || "Вход не подтверждён.";
    if (banner) {
      banner.classList.remove("auth-banner--verifying");
      banner.classList.remove("auth-banner--hidden");
    }
    hideIdentifyingMini();
    if (bannerRetry) bannerRetry.hidden = !showRetry;
    if (bannerLink) bannerLink.style.display = "none";
  }

  function resetBannerForPwaLogin() {
    if (shouldUseOverlayAuthScreen()) {
      hideLegacyInlineAuthUi();
      setPwaAuthScreenNotice("");
      return;
    }
    if (bannerText) bannerText.textContent = "";
    if (banner) banner.classList.add("auth-banner--hidden");
    if (bannerRetry) bannerRetry.hidden = true;
    if (bannerLink) bannerLink.style.display = "none";
    if (hintEl) {
      hintEl.textContent = "";
      hintEl.style.display = "none";
    }
    hideIdentifyingMini();
    if (!shouldUseOverlayAuthScreen()) return;
    var cb = getTelegramWidgetAuthCallbackUrl();
    var dom = "";
    try {
      dom = new URL(cb).hostname;
    } catch (eDom) {}
    if (bannerText) {
      if (isPwaAuthLocalHost()) {
        bannerText.textContent =
          "Локальный запуск: кнопка «Войти через Telegram» здесь не работает — в BotFather привязан боевой домен. Используйте ссылку ниже или откройте Mini App в Telegram.";
      } else if (isTelegramWebApp()) {
        bannerText.textContent =
          "После «подтвердите в Telegram» переключитесь в приложение Telegram (свайп снизу / кнопка «Домой») и нажмите «Принять» / «Разрешить» в диалоге — нового сообщения в списке чатов может не быть. Затем вернитесь в Mini App. Не помогает — «Открыть в браузере для входа».";
      } else {
        bannerText.textContent =
          "Вход с сайта: нажмите «Log in / Войти через Telegram» — подтвердите в приложении Telegram. Telegram сам решает, нужен ли номер или подтверждение по аккаунту. Если код/подтверждение не приходит — проверьте «Избранное / Saved Messages» и чат с ботом и попробуйте «Войти через Telegram (отдельное окно)».";
      }
    }
    if (banner) banner.classList.remove("auth-banner--verifying");
    if (bannerRetry) bannerRetry.hidden = true;
    if (bannerLink) bannerLink.style.display = "none";
    hideIdentifyingMini();
    if (hintEl) {
      if (isPwaAuthLocalHost()) {
        var elApp = document.getElementById("app");
        var prodBase = elApp && elApp.getAttribute("data-api-base");
        prodBase = prodBase ? String(prodBase).trim().replace(/\/$/, "") : "";
        hintEl.textContent =
          "Сообщение «Bot domain invalid» на localhost — нормально. Вход через виджет только на развёрнутом сайте (тот же домен, что в @BotFather)." +
          (prodBase ? " Боевой URL: " + prodBase : "");
      } else if (isTelegramWebApp()) {
        hintEl.textContent =
          "Текст «сообщение отправлено в Telegram» — это не обязательно новый чат: чаще нужно открыть само приложение Telegram и подтвердить запрос там. Уведомление может быть в шторке, а не в списке диалогов. После подтверждения вернитесь в Mini App — страница должна обновить вход. Домен в @BotFather: " +
          (dom || "example.com") +
          ". URL возврата: " +
          cb +
          ".";
      } else {
        hintEl.textContent =
          "Подтверждение — в приложении Telegram; в адресе страницы могут появиться параметры id и hash (это не SMS-код). Если вы не получили код/подтверждение, откройте «Избранное / Saved Messages» и чат с ботом (или попробуйте вход через «отдельное окно»). Домен в @BotFather (/setdomain) — hostname, например " +
          (dom || "example.com") +
          ", без https://. Страница: " +
          cb +
          ".";
      }
      hintEl.style.display = "block";
    }
  }

  /** Отправка данных виджета на сервер (и редирект с ?hash=… в URL, и callback data-onauth). */
  function deliverTelegramLoginWidgetPayload(payload, stripUrlParams) {
    var base = getTelegramAuthApiBase();
    if (!base) return;
    var sig =
      payload && payload.hash != null && payload.id != null && payload.auth_date != null
        ? "tglog:" + String(payload.hash) + ":" + String(payload.id) + ":" + String(payload.auth_date)
        : "";
    if (sig) {
      if (window.__pokerTgLoginInflightSig === sig) return;
      window.__pokerTgLoginInflightSig = sig;
    }
    setBannerVerifying();
    showUnauthorized();
    pokerAuthFetch(base + "/api/auth-telegram-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        Object.assign({}, payload, {
          dtIdHint:
            (typeof localStorage !== "undefined" && localStorage.getItem("poker_dt_id")) ||
            sessionStorage.getItem("poker_dt_id") ||
            "",
        })
      ),
    })
      .then(function (res) {
        return res
          .json()
          .catch(function () {
            return {};
          })
          .then(function (data) {
            return { res: res, data: data || {} };
          });
      })
      .then(function (pack) {
        var res = pack.res;
        var data = pack.data || {};
        if (res.ok && data.ok && data.user && data.pwaSession) {
          var u = normalizeVerifiedUser(data.user, null);
          if (
            !pokerSavePwaTgSession(
              data.pwaSession,
              data.user,
              {
                gazettePlannerAccess: data.gazettePlannerAccess === true,
                adminAccess: data.adminAccess === true,
                adminReportAccess: data.adminReportAccess === true,
                authMethod: "telegram",
              }
            )
          )
            pwaSessionPersistenceWarning();
          pokerSavePwaGuestMode(false);
          var _authTgWidget = { status: "verified", user: u, error: null };
          if (data.gazettePlannerAccess === true) _authTgWidget.gazettePlannerAccess = true;
          if (data.adminAccess === true) _authTgWidget.adminAccess = true;
          if (data.adminReportAccess === true) _authTgWidget.adminReportAccess = true;
          window.__pokerTelegramAuth = _authTgWidget;
          pokerMaybeRememberMemberIdFromUser(u);
          pokerSetAuthMethod("telegram");
          updateHeaderGreeting();
          showAuthorized(u);
          loadHeaderAvatar();
          try {
            window.dispatchEvent(new CustomEvent("poker-telegram-auth", { detail: { verified: true, user: u, pwa: true } }));
          } catch (e2) {}
          if (stripUrlParams) {
            try {
              var uUrl = new URL(window.location.href);
              ["id", "first_name", "last_name", "username", "photo_url", "auth_date", "hash"].forEach(function (k) {
                uUrl.searchParams.delete(k);
              });
              var lh = String(uUrl.hash || "");
              if (lh) {
                var stripped = lh.replace(/[#?&]tgAuthResult=[A-Za-z0-9\-_=]*/, "");
                uUrl.hash = stripped === "#" || stripped === "" ? "" : stripped;
              }
              window.history.replaceState({}, "", uUrl.pathname + uUrl.search + uUrl.hash);
            } catch (eU) {}
          }
          return;
        }
        if (sig) {
          try {
            window.__pokerTgLoginInflightSig = "";
          } catch (eSig) {}
        }
        updateHeaderGreeting();
        showUnauthorized();
        var errMsg = "Не удалось подтвердить вход через Telegram.";
        if (data && data.error) {
          errMsg = String(data.error);
          if (res.status === 401 || errMsg.indexOf("Invalid") !== -1) {
            errMsg +=
              " Проверьте TELEGRAM_BOT_TOKEN на сервере (тот же бот, что в t.me/…) и домен в @BotFather — он должен совпадать с hostname в адресной строке.";
          }
        } else if (!res.ok) {
          errMsg = "Сервер ответил HTTP " + res.status + ". Проверьте деплой и переменные окружения (TELEGRAM_BOT_TOKEN).";
        }
        setBannerFailure(errMsg, false);
        resetBannerForPwaLogin();
        mountTelegramLoginWidgetForPwa();
      })
      .catch(function () {
        if (sig) {
          try {
            window.__pokerTgLoginInflightSig = "";
          } catch (eSig2) {}
        }
        updateHeaderGreeting();
        showUnauthorized();
        setBannerFailure("Сеть: не удалось вызвать /api/auth-telegram-login. Проверьте интернет, блокировщики и что data-api-base указывает на живой API.", false);
        resetBannerForPwaLogin();
        mountTelegramLoginWidgetForPwa();
      });
  }

  function mountTelegramLoginWidgetForPwa() {
    var mount = shouldUseOverlayAuthScreen() && pwaAuthLoginMountEl ? pwaAuthLoginMountEl : document.getElementById("authBannerLoginMount");
    /*
     * v7: отдельная форма верификации в баннере + кнопка popup Telegram.Login.auth.
     * data-onauth + __pokerTelegramOauthMessageBridge; редирект — tryFinishTelegramLoginRedirect.
     */
    var WIDGET_MOUNT_VER = "7";
    var LOCAL_MOUNT_MARK = "local";
    if (!mount) return;

    if (shouldUseOverlayAuthScreen()) {
      try {
        mount.removeAttribute("data-pwa-widget-mounted");
      } catch (eOverlayWidgetAttr) {}
      return ensureOverlayAuthEntryMounted();
    }

    if (shouldUseOverlayAuthScreen() && mount.getAttribute("data-pwa-widget-mounted")) {
      mount.removeAttribute("data-pwa-widget-mounted");
      mount.innerHTML = "";
    }
    if (isPwaAuthLocalHost()) {
      if (mount.getAttribute("data-pwa-widget-mounted") === LOCAL_MOUNT_MARK) return;
      mount.innerHTML = "";
      var localActions = ensurePwaVerificationForm(mount) || mount;
      if (shouldUseOverlayAuthScreen()) {
        mountPwaUsernameCodeLogin(localActions);
        mount.setAttribute("data-pwa-widget-mounted", LOCAL_MOUNT_MARK);
        return;
      }
      var elApp2 = document.getElementById("app");
      var prodUrl = elApp2 && elApp2.getAttribute("data-api-base");
      prodUrl = prodUrl ? String(prodUrl).trim().replace(/\/$/, "") : "";
      var msg = document.createElement("p");
      msg.className = "auth-banner__local-login-msg";
      msg.textContent =
        "Виджет Telegram на localhost не показываем — будет «Bot domain invalid». Войдите на боевом сайте или через Mini App.";
      localActions.appendChild(msg);
      if (prodUrl && /^https:\/\//i.test(prodUrl)) {
        var a = document.createElement("a");
        a.href = prodUrl + "/";
        a.className = "auth-banner__local-login-link";
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        try {
          a.textContent = "Открыть " + new URL(prodUrl).hostname;
        } catch (eA) {
          a.textContent = "Открыть боевой сайт";
        }
        localActions.appendChild(a);
      }
      mount.setAttribute("data-pwa-widget-mounted", LOCAL_MOUNT_MARK);
      if (!shouldUseOverlayAuthScreen()) mountMiniAppAuthEnterButtons();
      return;
    }
    if (mount.getAttribute("data-pwa-widget-mounted") === LOCAL_MOUNT_MARK) {
      mount.removeAttribute("data-pwa-widget-mounted");
      mount.innerHTML = "";
    }
    if (mount.getAttribute("data-pwa-widget-mounted") === WIDGET_MOUNT_VER) {
      var mountedActions = ensurePwaVerificationForm(mount) || mount;
      if (!shouldUseOverlayAuthScreen()) {
        mountMiniAppAuthEnterButtons();
        return;
      }
      mountPwaUsernameCodeLogin(mountedActions);
      if (!shouldUseOverlayAuthScreen()) {
        mountVkLoginForPwa(mountedActions);
        mountTelegramExternalBrowserEscapeBtn(mountedActions);
        mountTelegramLoginPopupButton(mountedActions);
      }
      return;
    }
    var bot = "";
    try {
      var m = String(telegramAppUrl || "").match(/t\.me\/([^\/\?#]+)/i);
      if (m) bot = m[1];
    } catch (e1) {}
    mount.innerHTML = "";
    var actionsMount = ensurePwaVerificationForm(mount) || mount;
    try {
      actionsMount.removeAttribute("data-tg-popup-fetch-started");
    } catch (eRm) {}
    window.__pokerTelegramWidgetAuth = function (user) {
      try {
        if (!user || user.hash == null || user.id == null || user.auth_date == null) return;
        deliverTelegramLoginWidgetPayload(user, false);
      } catch (eCb) {}
    };
    if (bot && !shouldUseOverlayAuthScreen()) {
      var script = document.createElement("script");
      script.src = "https://telegram.org/js/telegram-widget.js?22";
      script.async = true;
      script.setAttribute("data-telegram-login", bot);
      script.setAttribute("data-size", "large");
      script.setAttribute("data-radius", "14");
      script.setAttribute("data-userpic", "true");
      script.setAttribute("data-onauth", "window.__pokerTelegramWidgetAuth(user)");
      actionsMount.appendChild(script);
    }
    mount.setAttribute("data-pwa-widget-mounted", WIDGET_MOUNT_VER);
    if (shouldUseOverlayAuthScreen()) {
      if (!mountPwaStandaloneEnterButton()) mountPwaUsernameCodeLogin(actionsMount);
    } else {
      mountMiniAppAuthEnterButtons();
    }
    if (!shouldUseOverlayAuthScreen()) {
      mountVkLoginForPwa(mount);
      mountTelegramExternalBrowserEscapeBtn(mount);
      mountTelegramLoginPopupButton(mount);
    }
  }

  function tryFinishTelegramLoginRedirect() {
    try {
      var sp = new URLSearchParams(window.location.search || "");
      if (sp.get("hash") && sp.get("id") && sp.get("auth_date")) {
        var payloadQ = {};
        sp.forEach(function (v, k) {
          payloadQ[k] = v;
        });
        deliverTelegramLoginWidgetPayload(payloadQ, true);
        return true;
      }
    } catch (e3) {}
    try {
      var authObj = parseTelegramWidgetTgAuthResultFromHash();
      if (authObj && authObj.hash && authObj.id != null && authObj.auth_date != null) {
        deliverTelegramLoginWidgetPayload(authObj, true);
        return true;
      }
    } catch (e4) {}
    return false;
  }

  function resetBannerForOutsideTelegram() {
    /* Раньше здесь была ссылка «Открыть в Telegram»; в WebView TG без initData это ломало ожидания — тот же сценарий, что и PWA */
    resetBannerForPwaLogin();
    mountTelegramLoginWidgetForPwa();
  }

  function postAuthTelegram(initData, wantPwaSession) {
    var base = getTelegramAuthApiBase();
    if (!base) return Promise.reject(new Error("no_base"));
    return pokerFetchRetry(
      base + "/api/auth-telegram",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          initData: initData,
          wantPwaSession: !!wantPwaSession,
          dtIdHint:
            (typeof localStorage !== "undefined" && localStorage.getItem("poker_dt_id")) ||
            sessionStorage.getItem("poker_dt_id") ||
            "",
        }),
        cache: "no-store",
      },
      { timeoutMs: POKER_FETCH_TIMEOUT_MS, maxAttempts: 3, retryDelayMs: 750 }
    ).then(function (res) {
      return res
        .json()
        .catch(function () {
          return {};
        })
        .then(function (data) {
          return { res: res, data: data || {} };
        });
    });
  }

  /**
   * PWA / браузер без Telegram WebApp: OAuth VK, редирект виджета, сессия из storage.
   * Вынесено в одну функцию — для standalone PWA обязательно вызывать и при наличии объекта WebApp без initData
   * (в index.html всегда подключается telegram-web-app.js).
   */
  function attemptPwaSideAuthRestore(hideBootOverlay) {
    if (tryFinishVkOAuth()) return true;
    if (tryFinishTelegramLoginRedirect()) return true;
    try {
      var so = pokerReadPwaTgSessionRecord();
      if (so && so.user && so.user.id != null && so.token) {
        var uP = normalizeVerifiedUser(so.user, null);
        var _authRestore = { status: "verified", user: uP, error: null };
        if (so.gazettePlannerAccess === true) _authRestore.gazettePlannerAccess = true;
        if (so.adminAccess === true) _authRestore.adminAccess = true;
        if (so.adminReportAccess === true) _authRestore.adminReportAccess = true;
        window.__pokerTelegramAuth = _authRestore;
        pokerMaybeRememberMemberIdFromUser(uP);
        pokerSetAuthMethod(so.authMethod || "telegram");
        updateHeaderGreeting();
        showAuthorized(uP);
        loadHeaderAvatar();
        if (typeof hideBootOverlay === "function") hideBootOverlay();
        try {
          window.dispatchEvent(new CustomEvent("poker-telegram-auth", { detail: { verified: true, user: uP, pwa: true } }));
        } catch (eP) {}
        return true;
      }
    } catch (eLs) {}
    try {
      var soV = pokerReadPwaVkSessionRecord();
      if (soV && soV.user && soV.user.id != null && soV.token) {
        var uVk = normalizeVerifiedUser(soV.user, null);
        window.__pokerTelegramAuth = { status: "verified", user: uVk, error: null };
        pokerSetAuthMethod(soV.authMethod || "vk");
        updateHeaderGreeting();
        showAuthorized(uVk);
        loadHeaderAvatar();
        if (typeof hideBootOverlay === "function") hideBootOverlay();
        try {
          window.dispatchEvent(new CustomEvent("poker-telegram-auth", { detail: { verified: true, user: uVk, pwa: true, vk: true } }));
        } catch (eVkLs) {}
        return true;
      }
    } catch (eLsVk) {}
    return false;
  }

  function restorePwaSideAuthRecord(record, opts) {
    var options = opts || {};
    if (!record || !record.user || record.user.id == null || !record.token) return false;
    var u = normalizeVerifiedUser(record.user, null);
    var _authRestore = { status: "verified", user: u, error: null };
    if (record.gazettePlannerAccess === true) _authRestore.gazettePlannerAccess = true;
    if (record.adminAccess === true) _authRestore.adminAccess = true;
    if (record.adminReportAccess === true) _authRestore.adminReportAccess = true;
    window.__pokerTelegramAuth = _authRestore;
    try {
      if (options.vk) {
        if (typeof pokerSavePwaVkSession === "function") pokerSavePwaVkSession(record.token, record.user);
      } else if (typeof pokerSavePwaTgSession === "function") {
        pokerSavePwaTgSession(record.token, record.user, {
          authMethod: record.authMethod || "telegram",
          gazettePlannerAccess: record.gazettePlannerAccess === true,
          adminAccess: record.adminAccess === true,
          adminReportAccess: record.adminReportAccess === true,
        });
      }
    } catch (eRehydratePwaAuth) {}
    pokerMaybeRememberMemberIdFromUser(u);
    pokerSetAuthMethod(record.authMethod || (options.vk ? "vk" : "telegram"));
    updateHeaderGreeting();
    showAuthorized(u);
    loadHeaderAvatar();
    if (typeof options.hideBootOverlay === "function") options.hideBootOverlay();
    try {
      window.dispatchEvent(new CustomEvent("poker-telegram-auth", { detail: { verified: true, user: u, pwa: true, vk: !!options.vk } }));
    } catch (ePwaRestoreDispatch) {}
    return true;
  }

  function attemptPwaSideAuthRestoreAsync(hideBootOverlay) {
    if (attemptPwaSideAuthRestore(hideBootOverlay)) return Promise.resolve(true);
    if (typeof pokerReadPwaSessionRecordAsync !== "function") return Promise.resolve(false);
    return pokerReadPwaSessionRecordAsync(POKER_PWA_TG_SESSION_KEY)
      .then(function (so) {
        if (restorePwaSideAuthRecord(so, { hideBootOverlay: hideBootOverlay })) return true;
        return pokerReadPwaSessionRecordAsync(POKER_PWA_VK_SESSION_KEY).then(function (soV) {
          return restorePwaSideAuthRecord(soV, { hideBootOverlay: hideBootOverlay, vk: true });
        });
      })
      .catch(function () {
        return false;
      });
  }

  /** PWA без initData: сначала видимый экран идентификации, затем вход (или сразу в приложение при restore сессии). */
  function runPwaStandaloneUnidentifiedFlow(hideBootOverlay) {
    if (restoreSavedPwaAuthBeforeGate()) {
      updateHeaderGreeting();
      try {
        var restoredAuth = window.__pokerTelegramAuth;
        if (restoredAuth && restoredAuth.user) {
          showAuthorized(restoredAuth.user);
          loadHeaderAvatar();
          window.dispatchEvent(new CustomEvent("poker-telegram-auth", { detail: { verified: true, user: restoredAuth.user, pwa: true, restored: true } }));
        }
      } catch (eEarlyStandaloneRestore) {}
      try {
        if (typeof hideBootOverlay === "function") hideBootOverlay();
      } catch (eEarlyStandaloneBoot) {}
      return;
    }
    showPwaAuthScreen();
    setPwaAuthIdentifyingPhase(true);
    try {
      if (typeof hideBootOverlay === "function") hideBootOverlay();
    } catch (eBoot0) {}
    if (attemptPwaSideAuthRestore(hideBootOverlay)) {
      setPwaAuthIdentifyingPhase(false);
      return;
    }
    try {
      window.__pokerTelegramAuth = { status: "no_telegram", user: null, error: null };
      updateHeaderGreeting();
    } catch (eHdr) {}
    function finishPwaStandaloneIdentifyUi() {
      try {
        showPwaStandaloneEntryScreen();
      } catch (ePwaFlow) {
        try {
          setPwaAuthIdentifyingPhase(false);
          document.body.classList.remove("pwa-auth-gated");
          document.body.classList.remove("pwa-auth-preinit");
        } catch (e2) {}
        if (typeof window.__pokerHideBootOverlay === "function") {
          try {
            window.__pokerHideBootOverlay();
          } catch (e3) {}
        }
      } finally {
        try {
          setPwaAuthIdentifyingPhase(false);
        } catch (eF) {}
      }
    }
    attemptPwaSideAuthRestoreAsync(hideBootOverlay).then(function (restored) {
      if (restored) {
        setPwaAuthIdentifyingPhase(false);
        return;
      }
      setTimeout(finishPwaStandaloneIdentifyUi, PWA_AUTH_IDENTIFY_MIN_MS);
    });
    /* Фолбэк: если основной таймер не отработал или фаза залипла — снять «идентификацию» и показать кнопки входа. */
    setTimeout(function () {
      try {
        if (!pwaAuthScreenEl || !pwaAuthScreenEl.classList.contains("pwa-auth-screen--identifying")) return;
        finishPwaStandaloneIdentifyUi();
      } catch (eWd) {}
    }, 5000);
  }

  function runVerifyFlow() {
    function hideBootOverlay() {
      try {
        if (typeof window.__pokerHideBootOverlay === "function") window.__pokerHideBootOverlay();
      } catch (eHide) {}
    }
    var wtg = getTelegramWebAppNow();
    var initData = wtg && wtg.initData ? String(wtg.initData) : "";
    var userUnsafe = wtg && wtg.initDataUnsafe && wtg.initDataUnsafe.user;

    var restoredAtStart = restoreSavedPwaAuthBeforeGate();

    if (isPwaStandaloneAuth()) {
      runPwaStandaloneUnidentifiedFlow(hideBootOverlay);
      return;
    }

    if (!wtg) {
      if (restoredAtStart) {
        updateHeaderGreeting();
        try {
          var authNoTg = window.__pokerTelegramAuth;
          if (authNoTg && authNoTg.user) {
            showAuthorized(authNoTg.user);
            loadHeaderAvatar();
            window.dispatchEvent(new CustomEvent("poker-telegram-auth", { detail: { verified: true, user: authNoTg.user, pwa: true, restored: true } }));
          }
        } catch (eRestoreNoTg) {}
        setTimeout(hideBootOverlay, 80);
        return;
      }
      attemptPwaSideAuthRestoreAsync(hideBootOverlay).then(function (restored) {
        if (restored) return;
        window.__pokerTelegramAuth = { status: "no_telegram", user: null, error: null };
        updateHeaderGreeting();
        showUnauthorized();
        resetBannerForPwaLogin();
        mountTelegramLoginWidgetForPwa();
        setTimeout(hideBootOverlay, 120);
      });
      return;
    }

    if (!initData) {
      if (restoredAtStart) {
        updateHeaderGreeting();
        try {
          var authNoInit = window.__pokerTelegramAuth;
          if (authNoInit && authNoInit.user) {
            showAuthorized(authNoInit.user);
            loadHeaderAvatar();
            window.dispatchEvent(new CustomEvent("poker-telegram-auth", { detail: { verified: true, user: authNoInit.user, pwa: true, restored: true } }));
          }
        } catch (eRestoreNoInit) {}
        setTimeout(hideBootOverlay, 80);
        return;
      }
      attemptPwaSideAuthRestoreAsync(hideBootOverlay).then(function (restored) {
        if (restored) return;
        window.__pokerTelegramAuth = { status: "no_init_data", user: null, error: null };
        updateHeaderGreeting();
        showUnauthorized();
        resetBannerForPwaLogin();
        hideIdentifyingMini();
        if (userUnsafe && bannerText) {
          bannerText.textContent =
            "Пустой initData в Mini App — это не про токен на сервере: Telegram не передал подпись сессии. Чаще всего страницу открыли обычной ссылкой из чата, а не кнопкой Web App у бота. Закройте мини-приложение и откройте снова из меню/кнопки бота; пока не получится — войдите через виджет ниже или «отдельное окно».";
        }
        mountTelegramLoginWidgetForPwa();
        if (banner) {
          banner.classList.remove("auth-banner--verifying");
          if (shouldSuppressMiniAppPwaLoginBanner()) {
            banner.classList.add("auth-banner--hidden");
          } else {
            banner.classList.remove("auth-banner--hidden");
          }
        }
        setTimeout(hideBootOverlay, 120);
      });
      return;
    }

    var restoredBeforeInitDataRefresh = false;
    try {
      restoredBeforeInitDataRefresh = attemptPwaSideAuthRestore(hideBootOverlay);
    } catch (ePreInitRestore) {}
    var hadVerifiedBeforeInitDataRefresh = restoredBeforeInitDataRefresh || hasActiveVerifiedAuthState();
    if (!hadVerifiedBeforeInitDataRefresh) window.__pokerTelegramAuth = { status: "verifying", user: null, error: null };
    var verifyFlowGeneration = bumpAuthFlowGeneration();
    if (!hadVerifiedBeforeInitDataRefresh) setBannerVerifying();
    if (hadVerifiedBeforeInitDataRefresh) {
      hidePwaAuthScreen();
      hideIdentifyingMini();
    }
    updateHeaderGreeting();
    // В PWA держим загрузочный оверлей чуть дольше, чтобы не мигал экран входа.
    setTimeout(hideBootOverlay, isPwaStandaloneMode() ? 1600 : 200);

    var maxAuthAttempts = 5;
    var attempts = 0;
    function keepRestoredAuthIfPossible() {
      if (!hadVerifiedBeforeInitDataRefresh) return false;
      try {
        var authKeep = window.__pokerTelegramAuth;
        if (!authKeep || !authKeep.user || authKeep.status !== "verified") return false;
        updateHeaderGreeting();
        showAuthorized(authKeep.user);
        hideBootOverlay();
        return true;
      } catch (eKeepRestored) {
        return false;
      }
    }
    function tryOnce() {
      if (verifyFlowGeneration !== authFlowGeneration) return;
      attempts += 1;
      postAuthTelegram(initData, true)
        .then(function (pack) {
          if (verifyFlowGeneration !== authFlowGeneration) return;
          var res = pack.res;
          var data = pack.data || {};
          if (res.ok && data.ok && data.user) {
            var u = normalizeVerifiedUser(data.user, userUnsafe);
            var _authMini = { status: "verified", user: u, error: null };
            if (data.gazettePlannerAccess === true) _authMini.gazettePlannerAccess = true;
            if (data.adminAccess === true) _authMini.adminAccess = true;
            if (data.adminReportAccess === true) _authMini.adminReportAccess = true;
            window.__pokerTelegramAuth = _authMini;
            pokerMaybeRememberMemberIdFromUser(u);
            pokerSetAuthMethod("telegram");
            if (data.pwaSession && data.user) {
              if (
                !pokerSavePwaTgSession(
                  data.pwaSession,
                  data.user,
                  {
                    gazettePlannerAccess: data.gazettePlannerAccess === true,
                    adminAccess: data.adminAccess === true,
                    adminReportAccess: data.adminReportAccess === true,
                  }
                )
              )
                pwaSessionPersistenceWarning();
              pokerSavePwaGuestMode(false);
            }
            updateHeaderGreeting();
            showAuthorized(u);
            hideBootOverlay();
            try {
              window.dispatchEvent(new CustomEvent("poker-telegram-auth", { detail: { verified: true, user: u } }));
            } catch (e1) {}
            return;
          }
          if (res.status === 401 || (data && String(data.error || "").indexOf("Invalid") !== -1)) {
            if (keepRestoredAuthIfPossible()) return;
            window.__pokerTelegramAuth = { status: "invalid", user: null, error: data.error || "invalid" };
            updateHeaderGreeting();
            showUnauthorized();
            setBannerFailure("Вход не подтверждён. Откройте приложение через официального бота в Telegram.", false);
            hideBootOverlay();
            try {
              window.dispatchEvent(new CustomEvent("poker-telegram-auth", { detail: { verified: false, reason: "invalid" } }));
            } catch (e2) {}
            return;
          }
          if (res.status === 500 && data && data.error === "Server config") {
            var uDev = normalizeVerifiedUser(null, userUnsafe);
            window.__pokerTelegramAuth = { status: "dev_skip", user: uDev, error: "server_config" };
            if (uDev) {
              pokerMaybeRememberMemberIdFromUser(uDev);
              updateHeaderGreeting();
              showAuthorized(uDev);
              hideBootOverlay();
              if (typeof console !== "undefined" && console.warn) {
                console.warn("[poker] auth-telegram: на сервере не задан TELEGRAM_BOT_TOKEN — вход без криптопроверки (только для разработки).");
              }
              try {
                window.dispatchEvent(new CustomEvent("poker-telegram-auth", { detail: { verified: true, user: uDev, dev: true } }));
              } catch (e3) {}
            } else {
              showUnauthorized();
              setBannerFailure("Не удалось подтвердить профиль.", true);
              hideBootOverlay();
            }
            return;
          }
          if (attempts < maxAuthAttempts) {
            setTimeout(tryOnce, authRetryDelayMs(attempts));
            return;
          }
          if (keepRestoredAuthIfPossible()) return;
          window.__pokerTelegramAuth = { status: "network", user: null, error: "bad_response" };
          updateHeaderGreeting();
          showUnauthorized();
          setBannerFailure(
            "Не удалось связаться с сервером (таймаут или нет сети). Нажмите «Повторить проверку», при необходимости смените Wi‑Fi / мобильный интернет или отключите VPN.",
            true
          );
          if (!pokerTryBootOverlayNetworkError("Нет связи с сервером или таймаут. Нажмите «Повторить».")) hideBootOverlay();
          try {
            window.dispatchEvent(new CustomEvent("poker-telegram-auth", { detail: { verified: false, reason: "network" } }));
          } catch (e4) {}
        })
        .catch(function () {
          if (verifyFlowGeneration !== authFlowGeneration) return;
          if (attempts < maxAuthAttempts) {
            setTimeout(tryOnce, authRetryDelayMs(attempts));
            return;
          }
          if (keepRestoredAuthIfPossible()) return;
          window.__pokerTelegramAuth = { status: "network", user: null, error: "fetch" };
          updateHeaderGreeting();
          showUnauthorized();
          setBannerFailure(
            "Не удалось связаться с сервером (таймаут или нет сети). Нажмите «Повторить проверку», при необходимости смените Wi‑Fi / мобильный интернет или отключите VPN.",
            true
          );
          if (!pokerTryBootOverlayNetworkError("Нет связи с сервером или таймаут. Нажмите «Повторить».")) hideBootOverlay();
          try {
            window.dispatchEvent(new CustomEvent("poker-telegram-auth", { detail: { verified: false, reason: "network" } }));
          } catch (e5) {}
        });
    }
    tryOnce();
  }

  /** Пауза между попытками /api/auth-telegram (VPN и прокси часто дают таймауты на первых запросах). */
  function authRetryDelayMs(attemptSoFar) {
    var n = Math.max(0, attemptSoFar - 1);
    return Math.min(450 + n * 550 + n * n * 220, 9000);
  }

  /** В Mini App initData иногда заполняется не с первого кадра — ждём перед отказом. */
  function waitForInitDataThenVerify(maxWaitMs, intervalMs) {
    var wtg = getTelegramWebAppNow();
    if (!wtg || wtg.initData) {
      runVerifyFlow();
      return;
    }
    var start = Date.now();
    var t = setInterval(function () {
      var w = getTelegramWebAppNow();
      if (w && w.initData) {
        clearInterval(t);
        runVerifyFlow();
        return;
      }
      if (Date.now() - start >= maxWaitMs) {
        clearInterval(t);
        runVerifyFlow();
      }
    }, intervalMs);
  }

  var lastAuthAutoRetryTs = 0;
  function maybeRetryAuthWhenNetworkBack() {
    var now = Date.now();
    if (now - lastAuthAutoRetryTs < 2500) return;
    try {
      var a = window.__pokerTelegramAuth;
      if (!a || a.status !== "network") return;
      var w = getTelegramWebAppNow();
      if (!w || !w.initData) return;
      lastAuthAutoRetryTs = now;
      runVerifyFlow();
    } catch (eNet) {}
  }

  if (bannerRetry) {
    bannerRetry.addEventListener("click", function () {
      var wtg = getTelegramWebAppNow();
      if (!wtg || !wtg.initData) {
        if (!isTelegramWebApp() && typeof window.location !== "undefined" && window.location.reload) {
          window.location.reload();
        } else {
          resetBannerForPwaLogin();
          mountTelegramLoginWidgetForPwa();
        }
        return;
      }
      runVerifyFlow();
    });
  }

  window.pokerRetryTelegramAuthVerification = function () {
    /* В PWA объект WebApp есть, initData часто пуст — иначе кнопка «Повторить» на оверлее ничего не делала */
    if (isPwaStandaloneAuth()) {
      runVerifyFlow();
      return;
    }
    var wtgR = getTelegramWebAppNow();
    if (wtgR && wtgR.initData) {
      runVerifyFlow();
      return;
    }
    if (!isTelegramWebApp() && typeof window.location !== "undefined" && window.location.reload) {
      window.location.reload();
    }
  };

  window.addEventListener("online", maybeRetryAuthWhenNetworkBack);
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") {
      setTimeout(maybeRetryAuthWhenNetworkBack, 400);
      setTimeout(function () {
        tryFinishTelegramLoginRedirect();
      }, 380);
      setTimeout(function () {
        try {
          var w = getTelegramWebAppNow();
          var a = window.__pokerTelegramAuth;
          if (w && w.initData && a && a.status === "no_init_data") {
            runVerifyFlow();
          }
        } catch (eVis) {}
      }, 520);
    }
  });
  window.addEventListener(
    "pageshow",
    function () {
      tryFinishTelegramLoginRedirect();
    },
    false
  );

  var wtgBoot = getTelegramWebAppNow();
  if (isPwaStandaloneAuth()) {
    /* В PWA initData из Telegram не придёт — не ждём таймер в WebApp-ветке (полоска в #app всё равно скрыта). */
    runVerifyFlow();
  } else if (isTelegramWebApp() && wtgBoot && !wtgBoot.initData) {
    // initData иногда появляется с задержкой даже при открытии кнопкой бота.
    // Не блокируем первый рендер на 25с: ждём немного и пускаем verify/виджет.
    showPwaAuthScreen();
    setPwaAuthIdentifyingPhase(true);
    waitForInitDataThenVerify(5000, 300);
  } else {
    runVerifyFlow();
  }

  window.__pokerOpenPwaLoginScreen = function () {
    try {
      openOverlayAuthEntryScreen();
    } catch (ePwaOpen) {}
  };

  window.__pokerShowLoggedOutState = function () {
    try {
      updateHeaderGreeting();
    } catch (eHdr) {}
    try {
      openOverlayAuthEntryScreen();
    } catch (eShowEntry) {}
    try {
      showUnauthorized(true);
    } catch (eUnauth) {}
    try {
      updateProfileExitBtnVisibility();
    } catch (eExitBtn) {}
    try {
      if (typeof loadHeaderAvatar === "function") loadHeaderAvatar();
    } catch (eAvatar) {}
  };

  (function pokerBindBootOverlayRetryOnce() {
    function bind() {
      var btn = document.getElementById("appBootOverlayRetryBtn");
      if (!btn || btn.dataset.bound === "1") return;
      btn.dataset.bound = "1";
      btn.addEventListener("click", function () {
        pokerResetBootOverlayLoading();
        if (typeof window.pokerRetryTelegramAuthVerification === "function") window.pokerRetryTelegramAuthVerification();
        else if (window.location && typeof window.location.reload === "function") window.location.reload();
      });
    }
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bind);
    else bind();
  })();

  /* Редкий залипший шлюз: #app скрыт по gated, экран входа остался --hidden — без UI */
  setTimeout(function pokerPwaStaleGateRecover() {
    try {
      if (!isPwaStandaloneMode()) return;
      var el = document.getElementById("pwaAuthScreen");
      if (!el || !document.body.classList.contains("pwa-auth-gated")) return;
      if (!el.classList.contains("pwa-auth-screen--hidden")) return;
      el.classList.remove("pwa-auth-screen--hidden");
      el.setAttribute("aria-hidden", "false");
      try {
        document.body.classList.add("pwa-auth-preinit");
      } catch (ePre) {}
      try {
        setPwaAuthIdentifyingPhase(false);
      } catch (eId) {}
      try {
        showPwaStandaloneEntryScreen();
      } catch (eMount) {}
    } catch (eRec) {}
  }, 10000);
})();

// PWA на весь экран: 100dvh не сжимается с клавиатурой — поднимаем экран входа по visualViewport
(function initPwaAuthVisualViewportLift() {
  var vvHandler = null;
  function isPwaDisplayStandalone() {
    try {
      if (window.__pokerDisplayStandaloneBoot === true) return true;
      if (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) return true;
      if (window.matchMedia && window.matchMedia("(display-mode: minimal-ui)").matches) return true;
      if (window.matchMedia && window.matchMedia("(display-mode: window-controls-overlay)").matches) return true;
      if (window.navigator && window.navigator.standalone) return true;
    } catch (e) {}
    return false;
  }
  function syncPwaAuthVvInset() {
    var screen = document.getElementById("pwaAuthScreen");
    if (!screen || screen.classList.contains("pwa-auth-screen--hidden")) {
      document.documentElement.style.removeProperty("--pwa-auth-vv-inset");
      return;
    }
    if (!document.documentElement.classList.contains("pwa-auth-vv-lift")) return;
    if (!window.visualViewport) {
      document.documentElement.style.removeProperty("--pwa-auth-vv-inset");
      return;
    }
    var vv = window.visualViewport;
    var ih = window.innerHeight || 0;
    if (!ih) return;
    var vvh = Number(vv.height) || 0;
    var offsetTop = Number(vv.offsetTop) || 0;
    var heightLoss = Math.max(0, Math.round(ih - vvh));
    var overlap = Math.max(0, Math.round(ih - vvh - offsetTop));
    if (overlap < 20 && heightLoss > overlap + 6) {
      overlap = Math.max(overlap, Math.round(heightLoss - Math.max(0, offsetTop)));
    }
    if (overlap < 8 && vvh + 24 < ih) {
      overlap = Math.max(overlap, heightLoss);
    }
    var cap = Math.min(460, Math.round(ih * 0.62));
    var inset = Math.max(0, Math.min(overlap, cap));
    document.documentElement.style.setProperty("--pwa-auth-vv-inset", inset + "px");
  }
  function detachVv() {
    if (vvHandler && window.visualViewport && window.visualViewport.removeEventListener) {
      try {
        window.visualViewport.removeEventListener("resize", vvHandler);
        window.visualViewport.removeEventListener("scroll", vvHandler);
      } catch (eDet) {}
    }
    vvHandler = null;
  }
  function clearPwaAuthKb() {
    document.documentElement.classList.remove("pwa-auth-vv-lift");
    document.documentElement.style.removeProperty("--pwa-auth-vv-inset");
    detachVv();
  }
  function attachVv() {
    if (vvHandler) return;
    vvHandler = function () {
      syncPwaAuthVvInset();
    };
    if (window.visualViewport && window.visualViewport.addEventListener) {
      window.visualViewport.addEventListener("resize", vvHandler);
      window.visualViewport.addEventListener("scroll", vvHandler);
    }
  }
  function onFocusIn(ev) {
    if (!isPwaDisplayStandalone()) return;
    var screen = document.getElementById("pwaAuthScreen");
    if (!screen || screen.classList.contains("pwa-auth-screen--hidden")) return;
    var t = ev.target;
    if (!t || (t.tagName !== "INPUT" && t.tagName !== "TEXTAREA")) return;
    if (!screen.contains(t)) return;
    document.documentElement.classList.add("pwa-auth-vv-lift");
    syncPwaAuthVvInset();
    attachVv();
    requestAnimationFrame(function () {
      syncPwaAuthVvInset();
      requestAnimationFrame(function () {
        syncPwaAuthVvInset();
      });
    });
    setTimeout(syncPwaAuthVvInset, 80);
    setTimeout(syncPwaAuthVvInset, 260);
  }
  function onFocusOut() {
    var screen = document.getElementById("pwaAuthScreen");
    function maybeClear() {
      var a = document.activeElement;
      if (screen && a && screen.contains(a) && (a.tagName === "INPUT" || a.tagName === "TEXTAREA")) return;
      clearPwaAuthKb();
    }
    setTimeout(maybeClear, 0);
    setTimeout(maybeClear, 100);
    setTimeout(maybeClear, 320);
    setTimeout(maybeClear, 550);
    setTimeout(maybeClear, 900);
  }
  if (window.visualViewport && window.visualViewport.addEventListener && !window.__pokerPwaAuthVvInsetFlushAttached) {
    window.__pokerPwaAuthVvInsetFlushAttached = true;
    var authInsetFlushT = null;
    window.visualViewport.addEventListener("resize", function () {
      clearTimeout(authInsetFlushT);
      authInsetFlushT = setTimeout(function () {
        if (document.documentElement.classList.contains("pwa-auth-vv-lift")) return;
        var ih = window.innerHeight || 0;
        var vvh = Number(window.visualViewport.height) || 0;
        if (!ih || vvh < ih - 36) return;
        document.documentElement.style.removeProperty("--pwa-auth-vv-inset");
      }, 120);
    });
  }
  document.addEventListener("focusin", onFocusIn, true);
  document.addEventListener("focusout", onFocusOut, true);
})();

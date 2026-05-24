// PWA auth language/profile/global UI bindings.
(function initPwaAuthLanguageUiModule() {
  var PWA_AUTH_LANG_KEY = "poker_pwa_auth_lang";
  var languageOpts = {};

  function getPwaAuthLocale() {
    try {
      var raw = typeof localStorage !== "undefined" ? localStorage.getItem(PWA_AUTH_LANG_KEY) : "";
      return String(raw || "").toLowerCase() === "en" ? "en" : "ru";
    } catch (eAuthLang) {
      return "ru";
    }
  }

  function pwaAuthT(key) {
    return typeof pokerPwaAuthText === "function" ? pokerPwaAuthText(getPwaAuthLocale(), key) : "";
  }

  function rerenderCurrentPwaAuthScreenFromLanguage() {
    try {
      if (typeof languageOpts.rerender === "function") {
        languageOpts.rerender();
        return;
      }
      if (typeof window.__pokerRerenderCurrentPwaAuthScreen === "function") window.__pokerRerenderCurrentPwaAuthScreen();
    } catch (eRerenderAuthLang) {}
  }

  function setPwaAuthLocale(locale) {
    var next = String(locale || "").toLowerCase() === "en" ? "en" : "ru";
    try {
      if (typeof localStorage !== "undefined") localStorage.setItem(PWA_AUTH_LANG_KEY, next);
    } catch (eSaveAuthLang) {}
    syncPwaAuthLanguageUi();
    syncProfileLanguageUi();
    syncGlobalAppLanguageUi();
    rerenderCurrentPwaAuthScreenFromLanguage();
  }

  function syncPwaAuthLanguageUi() {
    var locale = getPwaAuthLocale();
    var identifyingText = document.getElementById("pwaAuthIdentifyingText");
    var langSwitch = document.getElementById("pwaAuthLangSwitch");
    var liveProfileLangSwitch = document.getElementById("profileLangSwitch");
    var pwaAuthLangRuBtn = document.getElementById("pwaAuthLangRuBtn");
    var pwaAuthLangEnBtn = document.getElementById("pwaAuthLangEnBtn");
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
    var t = typeof pokerPwaAuthI18nPack === "function" ? pokerPwaAuthI18nPack("profile", locale) : {};
    var setText = function (id, text) {
      var el = document.getElementById(id);
      if (el) el.textContent = text;
    };
    setText("profileTitle", t.profileTitle);
    setText("profileClubTabBtn", t.profileClubTab);
    setText("profilePoker21TabBtn", t.profilePoker21Tab);
    setText("profileSkillsTabBtn", t.profileSkillsTab);
    setText("profileSkillsTitle", t.profileSkillsTab);
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
    var t = typeof pokerPwaAuthI18nPack === "function" ? pokerPwaAuthI18nPack("global", locale) : {};
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
    setText("homeTournamentWeekTitle", t.tournamentWeek);
    setText("tournamentDayWeekScheduleBtnText", t.fullCalendar);
    setText("homeTournamentFocusLabel", t.focusDay);
    setText("tournamentDayDetailsBtnText", t.details);
    setText("homeLiveTournamentTitle", t.nowRunning);
    setText("homeLiveTournamentCtaText", t.playNow);
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

  function bindLocaleButton(btn, locale) {
    if (!btn || btn.getAttribute("data-pwa-auth-lang-bound") === "1") return;
    btn.setAttribute("data-pwa-auth-lang-bound", "1");
    btn.addEventListener("click", function () {
      setPwaAuthLocale(locale);
    });
  }

  function pokerInitPwaAuthLanguageUi(opts) {
    languageOpts = opts || {};
    bindLocaleButton(document.getElementById("pwaAuthLangRuBtn"), "ru");
    bindLocaleButton(document.getElementById("pwaAuthLangEnBtn"), "en");
    bindLocaleButton(document.getElementById("profileLangRuBtn"), "ru");
    bindLocaleButton(document.getElementById("profileLangEnBtn"), "en");
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
    return {
      getLocale: getPwaAuthLocale,
      setLocale: setPwaAuthLocale,
      t: pwaAuthT,
      syncAuth: syncPwaAuthLanguageUi,
      syncProfile: syncProfileLanguageUi,
      syncGlobal: syncGlobalAppLanguageUi
    };
  }

  window.getPwaAuthLocale = getPwaAuthLocale;
  window.setPwaAuthLocale = setPwaAuthLocale;
  window.pwaAuthT = pwaAuthT;
  window.syncPwaAuthLanguageUi = syncPwaAuthLanguageUi;
  window.syncProfileLanguageUi = syncProfileLanguageUi;
  window.syncGlobalAppLanguageUi = syncGlobalAppLanguageUi;
  window.pokerInitPwaAuthLanguageUi = pokerInitPwaAuthLanguageUi;
})();

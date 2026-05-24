// Home planner: Roman task planner modal and delegated open bridge.

function pokerInitHomePlanner() {
  function initRomanGazetteTaskPlanner() {
    var plannerModal = document.getElementById("romanTaskPlannerModal");
    var plannerBackdrop = document.getElementById("romanTaskPlannerModalBackdrop");
    var plannerClose = document.getElementById("romanTaskPlannerModalClose");
    var openBtn = document.getElementById("romanTaskPlannerOpenBtn");
    var boardEl = document.getElementById("romanTaskPlannerBoard");
    var listAll = document.getElementById("romanTaskListAll");
    var form = document.getElementById("romanTaskAddForm");
    var input = document.getElementById("romanTaskInput");
    var importantCheckbox = document.getElementById("romanTaskImportantCheckbox");
    if (!openBtn) return;
    /** Общий планер двух Романов. */
    var PLANNER_ROMAN_SHARED_USERNAMES = { roman1787443: true, roman1_matvienko: true };
    /** Отдельный список задач (не общий с Романами). */
    var PLANNER_SOLO_USERNAMES = { polyapineapple: true };
    /**
     * Доступ по числовому Telegram id, если username в WebApp пустой (скрыт в настройках).
     * Штатные админы тоже видят общий планер: это важно для контроля задач без отдельной выдачи роли.
     * Для @polyapineapple при скрытом username задайте тот же id, что в env GAZETTE_EDITOR_PLANNER_POLY_TELEGRAM_ID на сервере.
     */
    var PLANNER_ALLOWED_TELEGRAM_IDS = { 388008256: true, 2144406710: true, 1897001087: true };
    /** Числовой id Telegram для @polyapineapple, если username скрыт (должен совпадать с серверным env). */
    var PLANNER_POLY_TELEGRAM_ID = null;
    var LEGACY_PLANNER_STORAGE_KEY = "poker_roman1787443_planner_v1";
    var PLANNER_SHARED_STORAGE_KEY = "poker_gazette_editor_planner_shared_v1";
    var PLANNER_OLD_KEYS_TO_MIGRATE = [
      LEGACY_PLANNER_STORAGE_KEY,
      "poker_gazette_editor_planner_v1_roman1787443",
      "poker_gazette_editor_planner_v1_roman1_matvienko",
    ];
    var plannerAccessRuntime = typeof initHomePlannerAccessRuntime === "function"
      ? initHomePlannerAccessRuntime({
        allowedTelegramIds: PLANNER_ALLOWED_TELEGRAM_IDS,
        polyTelegramId: PLANNER_POLY_TELEGRAM_ID,
        sharedStorageKey: PLANNER_SHARED_STORAGE_KEY,
        sharedUsernames: PLANNER_ROMAN_SHARED_USERNAMES,
        soloUsernames: PLANNER_SOLO_USERNAMES,
      })
      : {};
    var isPlannerAllowedUser = plannerAccessRuntime.isPlannerAllowedUser || function () { return false; };
    var plannerStorageKey = plannerAccessRuntime.plannerStorageKey || function () { return null; };
    function syncPlannerOpenButtonAccessOnly() {
      var visible = isPlannerAllowedUser();
      openBtn.classList.toggle("welcome-planner-icon--hidden", !visible);
      openBtn.toggleAttribute("disabled", !visible);
      openBtn.setAttribute("aria-hidden", visible ? "false" : "true");
      if (visible) openBtn.setAttribute("data-planner-access", "allowed");
      else openBtn.removeAttribute("data-planner-access");
      document.documentElement.classList.toggle("home-planner-access-granted", !!visible);
      if (!visible && plannerModal) plannerModal.setAttribute("aria-hidden", "true");
      return visible;
    }
    window.__pokerSyncRomanTaskPlanner = syncPlannerOpenButtonAccessOnly;
    syncPlannerOpenButtonAccessOnly();
    if (!plannerModal || !boardEl || !listAll || !form || !input) return;
    if (plannerModal.dataset.romanTaskPlannerBound === "1") return;
    plannerModal.dataset.romanTaskPlannerBound = "1";
    var PLANNER_TAB_STORAGE_KEY = "poker_gazette_planner_tab_v1";
    function readPlannerTabStorage() {
      try {
        var s = sessionStorage.getItem(PLANNER_TAB_STORAGE_KEY);
        if (s === "important" || s === "normal" || s === "done") return s;
        if (s === "tasks") return "important";
      } catch (eRd) {}
      return "important";
    }
    var plannerTab = readPlannerTabStorage();
    function writePlannerTabStorage(v) {
      try {
        sessionStorage.setItem(PLANNER_TAB_STORAGE_KEY, v);
      } catch (eWr) {}
    }
    var tabImportantBtn = document.getElementById("romanPlannerTabImportant");
    var tabNormalBtn = document.getElementById("romanPlannerTabNormal");
    var tabDoneBtn = document.getElementById("romanPlannerTabDone");
    var tabImportantCount = document.getElementById("romanPlannerTabImportantCount");
    var tabNormalCount = document.getElementById("romanPlannerTabNormalCount");
    var tabDoneCount = document.getElementById("romanPlannerTabDoneCount");
    function setPlannerTabUi() {
      var isDone = plannerTab === "done";
      var showAddForm = !isDone;
      if (tabImportantBtn) {
        tabImportantBtn.classList.toggle("roman-task-planner__tab--active", plannerTab === "important");
        tabImportantBtn.setAttribute("aria-selected", plannerTab === "important" ? "true" : "false");
      }
      if (tabNormalBtn) {
        tabNormalBtn.classList.toggle("roman-task-planner__tab--active", plannerTab === "normal");
        tabNormalBtn.setAttribute("aria-selected", plannerTab === "normal" ? "true" : "false");
      }
      if (tabDoneBtn) {
        tabDoneBtn.classList.toggle("roman-task-planner__tab--active", isDone);
        tabDoneBtn.setAttribute("aria-selected", isDone ? "true" : "false");
      }
      if (form) form.classList.toggle("roman-task-planner__add--hidden", !showAddForm);
    }
    var PLANNER_COMPOSER_MIN_PX = 52;
    var PLANNER_COMPOSER_MAX_PX = 280;
    var PLANNER_ORDER_STEP = 1000;
    function resizePlannerComposer() {
      if (!input || input.tagName !== "TEXTAREA") return;
      if (typeof pokerAutosizeTextarea === "function") {
        pokerAutosizeTextarea(input, {
          maxHeight: PLANNER_COMPOSER_MAX_PX,
          minHeight: PLANNER_COMPOSER_MIN_PX,
        });
      }
    }
    /** Общий планер двух Романов. */
    var PLANNER_ROMAN_SHARED_USERNAMES = { roman1787443: true, roman1_matvienko: true };
    /** Отдельный список задач (не общий с Романами). */
    var PLANNER_SOLO_USERNAMES = { polyapineapple: true };
    /**
     * Доступ по числовому Telegram id, если username в WebApp пустой (скрыт в настройках).
     * Штатные админы тоже видят общий планер: это важно для контроля задач без отдельной выдачи роли.
     * Для @polyapineapple при скрытом username задайте тот же id, что в env GAZETTE_EDITOR_PLANNER_POLY_TELEGRAM_ID на сервере.
     */
    var PLANNER_ALLOWED_TELEGRAM_IDS = { 388008256: true, 2144406710: true, 1897001087: true };
    /** Числовой id Telegram для @polyapineapple, если username скрыт (должен совпадать с серверным env). */
    var PLANNER_POLY_TELEGRAM_ID = null;
    var LEGACY_PLANNER_STORAGE_KEY = "poker_roman1787443_planner_v1";
    var PLANNER_SHARED_STORAGE_KEY = "poker_gazette_editor_planner_shared_v1";
    var PLANNER_OLD_KEYS_TO_MIGRATE = [
      LEGACY_PLANNER_STORAGE_KEY,
      "poker_gazette_editor_planner_v1_roman1787443",
      "poker_gazette_editor_planner_v1_roman1_matvienko",
    ];
    var plannerAccessRuntime = typeof initHomePlannerAccessRuntime === "function"
      ? initHomePlannerAccessRuntime({
        allowedTelegramIds: PLANNER_ALLOWED_TELEGRAM_IDS,
        polyTelegramId: PLANNER_POLY_TELEGRAM_ID,
        sharedStorageKey: PLANNER_SHARED_STORAGE_KEY,
        sharedUsernames: PLANNER_ROMAN_SHARED_USERNAMES,
        soloUsernames: PLANNER_SOLO_USERNAMES,
      })
      : {};
    var isPlannerAllowedUser = plannerAccessRuntime.isPlannerAllowedUser || function () { return false; };
    var plannerStorageKey = plannerAccessRuntime.plannerStorageKey || function () { return null; };
    function updatePlannerHintText(rawOpt) {
      var el = document.getElementById("romanTaskPlannerHint");
      if (!el) return;
      if (!isPlannerAllowedUser()) {
        el.textContent =
          "Планер задач редакторов: общий список или личный — подсказка обновится после входа.";
        return;
      }
      var raw = rawOpt != null ? rawOpt : loadTasks();
      if (!Array.isArray(raw)) raw = [];
      var total = 0;
      var imp = 0;
      var norm = 0;
      var doneC = 0;
      for (var hi = 0; hi < raw.length; hi++) {
        var t = raw[hi];
        if (!t) continue;
        if (t.done) {
          doneC++;
          continue;
        }
        total++;
        if (t.important) imp++;
        else norm++;
      }
      el.textContent = "Всего задач: " + total;
      if (tabImportantCount) tabImportantCount.textContent = "(" + imp + ")";
      if (tabNormalCount) tabNormalCount.textContent = "(" + norm + ")";
      if (tabDoneCount) tabDoneCount.textContent = "(" + doneC + ")";
      if (tabImportantBtn) tabImportantBtn.setAttribute("aria-label", "Важные (" + imp + ")");
      if (tabNormalBtn) tabNormalBtn.setAttribute("aria-label", "Не важные (" + norm + ")");
      if (tabDoneBtn) tabDoneBtn.setAttribute("aria-label", "Выполненные (" + doneC + ")");
    }
    var romanPlannerDirtySinceOpen = false;
    var romanPlannerPushTimer = null;
    var romanPlannerSaveGeneration = 0;
    var romanPlannerPullInFlight = false;
    var romanPlannerLiveSyncInterval = null;
    var romanPlannerLastAmbientPullMs = 0;
    function romanPlannerApiOk() {
      if (!isPlannerAllowedUser()) return false;
      if (typeof getApiBase !== "function" || !getApiBase()) return false;
      if (typeof pokerApiHasCredential !== "function" || !pokerApiHasCredential()) return false;
      return true;
    }
    function romanPlannerApplyServerTasksIfClean(tasks) {
      if (romanPlannerDirtySinceOpen) return;
      var key = plannerStorageKey();
      if (!key) return;
      try {
        localStorage.setItem(key, JSON.stringify(tasks));
      } catch (eSet) {}
      if (plannerModal.getAttribute("aria-hidden") === "false") renderTasks();
    }
    function romanPlannerPostFullList(tasks, onDone) {
      if (!romanPlannerApiOk()) {
        if (onDone) onDone(false);
        return;
      }
      var base = getApiBase();
      var body =
        typeof pokerApiAuthJsonBody === "function" ? pokerApiAuthJsonBody({ tasks: tasks }) : { tasks: tasks };
      fetch(base + "/api/gazette-editor-planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        cache: "no-store",
      })
        .then(function (r) {
          return r.json();
        })
        .then(function (data) {
          var ok = !!(data && data.ok);
          if (ok && Array.isArray(data.tasks) && !romanPlannerDirtySinceOpen) {
            try {
              var k = plannerStorageKey();
              if (k) localStorage.setItem(k, JSON.stringify(data.tasks));
            } catch (eSync) {}
            if (plannerModal.getAttribute("aria-hidden") === "false") renderTasks();
          }
          if (onDone) onDone(ok);
        })
        .catch(function () {
          if (onDone) onDone(false);
        });
    }
    function romanPlannerPullFromServer() {
      if (!romanPlannerApiOk()) return;
      if (romanPlannerPullInFlight) return;
      romanPlannerPullInFlight = true;
      var base = getApiBase();
      var q = typeof pokerApiAuthQuery === "function" ? pokerApiAuthQuery("?") : "?initData=";
      fetch(base + "/api/gazette-editor-planner" + q, { cache: "no-store" })
        .then(function (r) {
          return r.json();
        })
        .then(function (data) {
          if (!data || !data.ok || data.offline) return;
          var serverTasks = Array.isArray(data.tasks) ? data.tasks : [];
          if (serverTasks.length === 0) {
            var seed = loadTasks();
            if (seed.length) {
              romanPlannerPostFullList(seed, function () {});
            }
            return;
          }
          romanPlannerApplyServerTasksIfClean(serverTasks);
        })
        .catch(function () {})
        .then(function () {
          romanPlannerPullInFlight = false;
        });
    }
    /** Повторный GET с паузой — при возврате во вкладку / Mini App, чтобы второе устройство подтянуло список. */
    function romanPlannerPullAmbient() {
      var now = Date.now();
      if (now - romanPlannerLastAmbientPullMs < 1200) return;
      romanPlannerLastAmbientPullMs = now;
      romanPlannerPullFromServer();
    }
    function romanPlannerStopLiveSync() {
      if (romanPlannerLiveSyncInterval != null) {
        clearInterval(romanPlannerLiveSyncInterval);
        romanPlannerLiveSyncInterval = null;
      }
    }
    /** Пока модалка открыта — периодически синхронизировать с Redis (два телефона без смены вкладки). */
    function romanPlannerStartLiveSync() {
      romanPlannerStopLiveSync();
      if (!romanPlannerApiOk()) return;
      romanPlannerLiveSyncInterval = setInterval(function () {
        if (!plannerModal || plannerModal.getAttribute("aria-hidden") !== "false") {
          romanPlannerStopLiveSync();
          return;
        }
        romanPlannerPullFromServer();
      }, 18000);
    }
    function mergeRomanPlannerArraysFromKeys() {
      var arrs = [];
      for (var i = 0; i < PLANNER_OLD_KEYS_TO_MIGRATE.length; i++) {
        try {
          var r = localStorage.getItem(PLANNER_OLD_KEYS_TO_MIGRATE[i]);
          if (!r) continue;
          var a = JSON.parse(r);
          if (Array.isArray(a) && a.length) arrs.push(a);
        } catch (eK) {}
      }
      if (!arrs.length) return [];
      var seen = {};
      var out = [];
      for (var j = 0; j < arrs.length; j++) {
        var arr = arrs[j];
        for (var k = 0; k < arr.length; k++) {
          var t = arr[k];
          if (!t || t.id == null) continue;
          var id = String(t.id);
          if (seen[id]) continue;
          seen[id] = true;
          out.push(t);
        }
      }
      return out;
    }
    function cleanupRomanPlannerLegacyKeys() {
      for (var ci = 0; ci < PLANNER_OLD_KEYS_TO_MIGRATE.length; ci++) {
        try {
          localStorage.removeItem(PLANNER_OLD_KEYS_TO_MIGRATE[ci]);
        } catch (eRm) {}
      }
    }
    function mergeLegacyPlannerIntoList(list) {
      var key = plannerStorageKey();
      if (!key || key !== PLANNER_SHARED_STORAGE_KEY) return list;
      var merged = mergeRomanPlannerArraysFromKeys();
      if (!merged.length) return list;
      var base = Array.isArray(list) ? list : [];
      var byId = {};
      for (var i = 0; i < base.length; i++) {
        if (base[i] && base[i].id != null) byId[String(base[i].id)] = true;
      }
      var out = base.slice();
      var added = false;
      for (var j = 0; j < merged.length; j++) {
        var t = merged[j];
        if (!t || t.id == null) continue;
        var id = String(t.id);
        if (byId[id]) continue;
        byId[id] = true;
        out.push(t);
        added = true;
      }
      if (added) {
        try {
          localStorage.setItem(key, JSON.stringify(out));
          cleanupRomanPlannerLegacyKeys();
        } catch (eMg) {}
      }
      return out;
    }
    function escHtml(s) {
      return String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }
    function loadTasks() {
      var key = plannerStorageKey();
      if (!key) return [];
      try {
        var raw = localStorage.getItem(key);
        if (!raw) {
          if (key === PLANNER_SHARED_STORAGE_KEY) {
            var merged = mergeRomanPlannerArraysFromKeys();
            if (merged.length) {
              try {
                ensurePlannerOrdersMutateTasks(merged);
                localStorage.setItem(key, JSON.stringify(merged));
                cleanupRomanPlannerLegacyKeys();
              } catch (eMig) {}
              return merged;
            }
          }
          return [];
        }
        var arr = JSON.parse(raw);
        var list = Array.isArray(arr) ? arr : [];
        list = mergeLegacyPlannerIntoList(list);
        if (ensurePlannerOrdersMutateTasks(list)) {
          try {
            localStorage.setItem(key, JSON.stringify(list));
          } catch (eOrd) {}
        }
        return list;
      } catch (eLoad) {
        return [];
      }
    }
    function saveTasks(tasks) {
      var key = plannerStorageKey();
      if (!key) return;
      try {
        localStorage.setItem(key, JSON.stringify(tasks));
      } catch (eSave) {}
      romanPlannerDirtySinceOpen = true;
      if (!romanPlannerApiOk()) return;
      romanPlannerSaveGeneration++;
      var gen = romanPlannerSaveGeneration;
      var snapshot = tasks;
      clearTimeout(romanPlannerPushTimer);
      romanPlannerPushTimer = setTimeout(function () {
        romanPlannerPushTimer = null;
        romanPlannerPostFullList(snapshot, function (ok) {
          if (ok && gen === romanPlannerSaveGeneration) romanPlannerDirtySinceOpen = false;
        });
      }, 450);
    }
    function sortTasksByCreatedAsc(arr) {
      var copy = arr.slice();
      copy.sort(function (a, b) {
        var ta = a && a.createdAt ? Number(a.createdAt) : 0;
        var tb = b && b.createdAt ? Number(b.createdAt) : 0;
        return ta - tb;
      });
      return copy;
    }
    /** Порядок внутри вкладки «Важные» / «Не важные»: plannerOrder, затем «Выполняется», затем дата. */
    function sortBucketActiveTasks(arr) {
      var copy = arr.slice();
      copy.sort(function (a, b) {
        var oa = a && a.plannerOrder != null && !isNaN(Number(a.plannerOrder)) ? Number(a.plannerOrder) : Number.MAX_SAFE_INTEGER;
        var ob = b && b.plannerOrder != null && !isNaN(Number(b.plannerOrder)) ? Number(b.plannerOrder) : Number.MAX_SAFE_INTEGER;
        if (oa !== ob) return oa - ob;
        var da = a && a.doing ? 1 : 0;
        var db = b && b.doing ? 1 : 0;
        if (da !== db) return db - da;
        var ta = a && a.createdAt ? Number(a.createdAt) : 0;
        var tb = b && b.createdAt ? Number(b.createdAt) : 0;
        return ta - tb;
      });
      return copy;
    }
    function ensurePlannerOrdersMutateTasks(tasks) {
      if (!Array.isArray(tasks)) return false;
      var changed = false;
      function fix(pred) {
        var sub = [];
        for (var i = 0; i < tasks.length; i++) {
          var t = tasks[i];
          if (!t || t.done) continue;
          if (!pred(t)) continue;
          sub.push(t);
        }
        if (!sub.length) return;
        var missing = false;
        for (var k = 0; k < sub.length; k++) {
          var po = sub[k].plannerOrder;
          if (po == null || isNaN(Number(po))) {
            missing = true;
            break;
          }
        }
        if (!missing) return;
        sub.sort(function (a, b) {
          var da = a && a.doing ? 1 : 0;
          var db = b && b.doing ? 1 : 0;
          if (da !== db) return db - da;
          return (Number(a.createdAt) || 0) - (Number(b.createdAt) || 0);
        });
        for (var j = 0; j < sub.length; j++) {
          var want = j * PLANNER_ORDER_STEP;
          if (Number(sub[j].plannerOrder) !== want) {
            sub[j].plannerOrder = want;
            changed = true;
          }
        }
      }
      fix(function (t) {
        return !!t.important;
      });
      fix(function (t) {
        return !t.important;
      });
      return changed;
    }
    function nextPlannerOrderInBucket(tasks, wantImportant) {
      var max = 0;
      for (var i = 0; i < tasks.length; i++) {
        var t = tasks[i];
        if (!t || t.done) continue;
        if (!!t.important !== !!wantImportant) continue;
        var o = Number(t.plannerOrder);
        if (!isNaN(o) && o > max) max = o;
      }
      return max + PLANNER_ORDER_STEP;
    }
    function movePlannerTaskInList(taskId, delta) {
      var tid = taskId != null ? String(taskId) : "";
      if (!tid || (delta !== -1 && delta !== 1)) return;
      if (plannerTab !== "important" && plannerTab !== "normal") return;
      var keepListScrollTop = listAll ? listAll.scrollTop || 0 : 0;
      var keepPageScrollTop =
        (document.scrollingElement && document.scrollingElement.scrollTop) ||
        (document.documentElement && document.documentElement.scrollTop) ||
        (document.body && document.body.scrollTop) ||
        0;
      var tasks = loadTasks();
      ensurePlannerOrdersMutateTasks(tasks);
      var pred =
        plannerTab === "important"
          ? function (t) {
              return t && !t.done && !!t.important;
            }
          : function (t) {
              return t && !t.done && !t.important;
            };
      var bucket = [];
      for (var i = 0; i < tasks.length; i++) {
        if (pred(tasks[i])) bucket.push(tasks[i]);
      }
      bucket = sortBucketActiveTasks(bucket);
      var idx = -1;
      for (var j = 0; j < bucket.length; j++) {
        if (bucket[j] && String(bucket[j].id) === tid) {
          idx = j;
          break;
        }
      }
      if (idx < 0) return;
      var j2 = idx + delta;
      if (j2 < 0 || j2 >= bucket.length) return;
      var a = bucket[idx];
      var b = bucket[j2];
      var oa = Number(a.plannerOrder);
      var ob = Number(b.plannerOrder);
      if (isNaN(oa) || isNaN(ob)) {
        ensurePlannerOrdersMutateTasks(tasks);
        oa = Number(a.plannerOrder);
        ob = Number(b.plannerOrder);
      }
      a.plannerOrder = ob;
      b.plannerOrder = oa;
      saveTasks(tasks);
      try {
        if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
      } catch (eBlur) {}
      renderTasks();
      function restorePlannerMoveScroll() {
        if (listAll) listAll.scrollTop = keepListScrollTop;
        var se = document.scrollingElement || document.documentElement || document.body;
        if (se) se.scrollTop = keepPageScrollTop;
      }
      restorePlannerMoveScroll();
      try {
        requestAnimationFrame(restorePlannerMoveScroll);
      } catch (eRaf) {
        setTimeout(restorePlannerMoveScroll, 0);
      }
    }
    function findTaskById(tasks, id) {
      var sid = String(id);
      for (var i = 0; i < tasks.length; i++) {
        if (tasks[i] && String(tasks[i].id) === sid) return i;
      }
      return -1;
    }
    function renderTaskRow(t, columnDone, displayNum, reorderOpts) {
      var id = t.id != null ? String(t.id) : "";
      var text = t.text != null ? String(t.text) : "";
      var important = !!(t && t.important);
      var doing = !!(t && t.doing);
      var stage = t && (t.stage === "waiting" || t.stage === "checking") ? t.stage : "";
      var completeBtn =
        '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--complete" data-roman-task-complete="' +
        escHtml(id) +
        '">Выполнено</button>';
      var uncompleteBtn =
        '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--ghost" data-roman-task-uncomplete="' +
        escHtml(id) +
        '">Вернуть</button>';
      var badges = "";
      if (important && !columnDone) {
        badges += '<span class="roman-task-planner__badge roman-task-planner__badge--important">Важно</span>';
      }
      if (doing && !columnDone) {
        badges += '<span class="roman-task-planner__badge roman-task-planner__badge--doing">Выполняется</span>';
      }
      if (stage === "waiting" && !columnDone) {
        badges += '<span class="roman-task-planner__badge roman-task-planner__badge--waiting">Ожидаю выполнения</span>';
      }
      if (stage === "checking" && !columnDone) {
        badges += '<span class="roman-task-planner__badge roman-task-planner__badge--checking">Проверяю выполнение</span>';
      }
      var badgesRow = "";
      if (badges) badgesRow = '<div class="roman-task-planner__meta-badges">' + badges + "</div>";
      var numberBadge =
        displayNum != null && displayNum > 0
          ? '<span class="roman-task-planner__num-cell" aria-label="Номер в списке">' + displayNum + ".</span>"
          : "";
      var taskTopLine = numberBadge || badgesRow ? '<div class="roman-task-planner__top-line">' + numberBadge + badgesRow + "</div>" : "";
      var reorderBtns =
        !columnDone && reorderOpts
          ? '<div class="roman-task-planner__reorder-col">' +
            '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--reorder" data-roman-task-move-up="' +
            escHtml(id) +
            '"' +
            (reorderOpts.canUp ? "" : " disabled") +
            ' aria-label="Выше в списке">↑</button>' +
            '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--reorder" data-roman-task-move-down="' +
            escHtml(id) +
            '"' +
            (reorderOpts.canDown ? "" : " disabled") +
            ' aria-label="Ниже в списке">↓</button>' +
            '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--reorder-edit" data-roman-task-edit="' +
            escHtml(id) +
            '">Изм.</button>' +
            "</div>"
          : "";
      var bodyContent = "";
      if (displayNum != null && displayNum > 0) {
        bodyContent =
          '<div class="roman-task-planner__body-row">' +
          '<div class="roman-task-planner__main-col">' +
          taskTopLine +
          '<div class="roman-task-planner__text">' +
          escHtml(text) +
          "</div>" +
          "</div>" +
          reorderBtns +
          "</div>";
      } else {
        bodyContent =
          taskTopLine +
          '<div class="roman-task-planner__text">' +
          escHtml(text) +
          "</div>";
      }
      var statusBtns = "";
      if (!columnDone) {
        if (doing) {
          statusBtns +=
            '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--ghost" data-roman-task-clear-doing="' +
            escHtml(id) +
            '">Стоп</button>';
        } else {
          statusBtns +=
            '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--doing" data-roman-task-set-doing="' +
            escHtml(id) +
            '">В работе</button>';
        }
        if (important) {
          statusBtns +=
            '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--ghost" data-roman-task-clear-important="' +
            escHtml(id) +
            '">Не важно</button>';
        } else {
          statusBtns +=
            '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--important" data-roman-task-set-important="' +
            escHtml(id) +
            '">Важно</button>';
        }
        if (stage === "waiting") {
          statusBtns +=
            '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--ghost" data-roman-task-clear-stage="' +
            escHtml(id) +
            '">Не жду</button>';
        } else {
          statusBtns +=
            '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--waiting" data-roman-task-set-stage="' +
            escHtml(id) +
            '" data-roman-task-stage="waiting">Ожидаю</button>';
        }
        if (stage === "checking") {
          statusBtns +=
            '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--ghost" data-roman-task-clear-stage="' +
            escHtml(id) +
            '">Не провер.</button>';
        } else {
          statusBtns +=
            '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--checking" data-roman-task-set-stage="' +
            escHtml(id) +
            '" data-roman-task-stage="checking">Проверяю</button>';
        }
      }
      var actionsHtml =
        (columnDone ? uncompleteBtn : statusBtns + completeBtn) +
        '<button type="button" class="roman-task-planner__btn" data-roman-task-edit="' +
        escHtml(id) +
        '">Изм.</button>' +
        '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--danger" data-roman-task-delete="' +
        escHtml(id) +
        '">Удалить</button>';
      var itemClass =
        "roman-task-planner__item" +
        (columnDone ? " roman-task-planner__item--done" : "") +
        (important && !columnDone ? " roman-task-planner__item--flag-important" : "") +
        (doing && !columnDone ? " roman-task-planner__item--in-progress" : "");
      return (
        '<li class="' +
        itemClass +
        '" data-roman-task-id="' +
        escHtml(id) +
        '">' +
        '<div class="roman-task-planner__swipe-clip">' +
        '<div class="roman-task-planner__swipe-track">' +
        '<div class="roman-task-planner__swipe-front">' +
        '<div class="roman-task-planner__body">' +
        bodyContent +
        "</div></div>" +
        '<div class="roman-task-planner__swipe-actions">' +
        actionsHtml +
        "</div></div></div></li>"
      );
    }
    function romanPlannerCloseAllSwipes(exceptClip) {
      if (!boardEl) return;
      var tracks = boardEl.querySelectorAll(".roman-task-planner__swipe-track");
      var exceptId = "";
      for (var i = 0; i < tracks.length; i++) {
        var tr = tracks[i];
        var c = tr && tr.closest ? tr.closest(".roman-task-planner__swipe-clip") : null;
        if (exceptClip && c === exceptClip) {
          var exceptItem = c.closest(".roman-task-planner__item[data-roman-task-id]");
          exceptId = exceptItem ? String(exceptItem.getAttribute("data-roman-task-id") || "") : "";
          continue;
        }
        tr.style.transform = "";
        tr.classList.remove("roman-task-planner__swipe-track--open");
      }
      romanPlannerOpenSwipeTaskId = exceptId;
    }
    var romanPlannerSwipeActive = null;
    var romanPlannerReorderActive = null;
    var romanPlannerOpenSwipeTaskId = "";
    /** passive: false — иначе preventDefault на pointermove не гасит скролл во время горизонтального свайпа (iOS / часть WebView). */
    var romanPlannerSwipeDocListenerOpts = { capture: true, passive: false };
    var romanPlannerSwipeDocEndOpts = { capture: true, passive: true };
    /** Touch: в части WebView (TG / iOS) pointermove для касания не идёт, пока скроллит родитель — ведём жест через touch*. */
    var romanPlannerSwipeTouchDocMoveOpts = { capture: true, passive: false };
    var romanPlannerSwipeTouchDocEndOpts = { capture: true, passive: true };
    function romanPlannerApplyOpenForClip(clip) {
      var track = clip.querySelector(".roman-task-planner__swipe-track");
      var front = clip.querySelector(".roman-task-planner__swipe-front");
      var actionsEl = clip.querySelector(".roman-task-planner__swipe-actions");
      if (!track || !front) return null;
      var cw = clip.offsetWidth || 0;
      var openPx = cw > 0 ? Math.max(120, cw - 8) : 0;
      if (actionsEl && cw > 0) {
        actionsEl.style.width = openPx + "px";
        actionsEl.style.flex = "0 0 " + openPx + "px";
      }
      if (cw > 0) {
        track.style.width = cw + openPx + "px";
        front.style.flex = "0 0 " + cw + "px";
        if (actionsEl) {
          actionsEl.style.width = openPx + "px";
          actionsEl.style.flex = "0 0 " + openPx + "px";
        }
      }
      return { track: track, openPx: openPx };
    }
    function romanPlannerSwipeGetTx(track) {
      var m = (track.style.transform || "").match(/translateX\((-?[0-9.]+)px\)/);
      return m ? parseFloat(m[1], 10) || 0 : 0;
    }
    function romanPlannerSwipeSetTx(track, openPx, px) {
      var min = -openPx;
      var max = 0;
      var x = px;
      if (x < min) x = min;
      if (x > max) x = max;
      track.style.transform = "translateX(" + x + "px)";
    }
    function romanPlannerSwipeSnap(track, openPx) {
      var cur = romanPlannerSwipeGetTx(track);
      var frac = 0.35;
      var wasOpen = track.classList.contains("roman-task-planner__swipe-track--open");
      var item = track.closest ? track.closest(".roman-task-planner__item[data-roman-task-id]") : null;
      var taskId = item ? String(item.getAttribute("data-roman-task-id") || "") : "";
      if (wasOpen) {
        /* Уже открыто: закрываем, если увели полосу правее чем (1−frac) пути к 0 — иначе тот же порог, что «влево», ломал свайп вправо. */
        var closeThreshold = -openPx * (1 - frac);
        if (cur > closeThreshold) {
          track.classList.remove("roman-task-planner__swipe-track--open");
          romanPlannerSwipeSetTx(track, openPx, 0);
          if (romanPlannerOpenSwipeTaskId === taskId) romanPlannerOpenSwipeTaskId = "";
        } else {
          track.classList.add("roman-task-planner__swipe-track--open");
          romanPlannerSwipeSetTx(track, openPx, -openPx);
          romanPlannerOpenSwipeTaskId = taskId;
        }
      } else {
        var openThreshold = -openPx * frac;
        if (cur < openThreshold) {
          track.classList.add("roman-task-planner__swipe-track--open");
          romanPlannerSwipeSetTx(track, openPx, -openPx);
          romanPlannerOpenSwipeTaskId = taskId;
        } else {
          track.classList.remove("roman-task-planner__swipe-track--open");
          romanPlannerSwipeSetTx(track, openPx, 0);
          if (romanPlannerOpenSwipeTaskId === taskId) romanPlannerOpenSwipeTaskId = "";
        }
      }
    }
    function romanPlannerSwipeRemoveDocListeners() {
      if (!romanPlannerSwipeActive || !romanPlannerSwipeActive._docBound) return;
      var st = romanPlannerSwipeActive;
      if (st._touchDocBound) {
        document.removeEventListener("touchmove", romanPlannerSwipeTouchDocMove, romanPlannerSwipeTouchDocMoveOpts);
        document.removeEventListener("touchend", romanPlannerSwipeTouchDocEnd, romanPlannerSwipeTouchDocEndOpts);
        document.removeEventListener("touchcancel", romanPlannerSwipeTouchDocEnd, romanPlannerSwipeTouchDocEndOpts);
        st._touchDocBound = false;
      } else {
        document.removeEventListener("pointermove", romanPlannerSwipeDocMove, romanPlannerSwipeDocListenerOpts);
        document.removeEventListener("pointerup", romanPlannerSwipeDocEnd, romanPlannerSwipeDocEndOpts);
        document.removeEventListener("pointercancel", romanPlannerSwipeDocEnd, romanPlannerSwipeDocEndOpts);
      }
      if (st.clip && st._lostCapBound) {
        try {
          st.clip.removeEventListener("lostpointercapture", romanPlannerSwipeLostCap);
        } catch (eRm) {}
        st._lostCapBound = false;
      }
      st._docBound = false;
    }
    function romanPlannerSwipeEnd(doSnap) {
      var st = romanPlannerSwipeActive;
      if (!st) return;
      romanPlannerSwipeRemoveDocListeners();
      var pid = st.pointerId;
      var clip = st.clip;
      var track = st.track;
      var openPx = st.openPx;
      var hadCapture = st.pointerCaptureSet;
      romanPlannerSwipeActive = null;
      if (clip != null && pid != null && hadCapture) {
        try {
          clip.releasePointerCapture(pid);
        } catch (eRel) {}
      }
      if (doSnap && track) romanPlannerSwipeSnap(track, openPx);
    }
    function romanPlannerSwipeLostCap(evLost) {
      var st = romanPlannerSwipeActive;
      if (!st || !st.dragging || st.pointerId == null) return;
      if (evLost.pointerId !== st.pointerId) return;
      st.dragging = false;
      romanPlannerSwipeEnd(true);
    }
    function romanPlannerSwipeFindTouch(ev, id) {
      var i;
      for (i = 0; i < ev.touches.length; i++) {
        if (ev.touches[i].identifier === id) return ev.touches[i];
      }
      return null;
    }
    function romanPlannerSwipeFindTouchChanged(ev, id) {
      var i;
      for (i = 0; i < ev.changedTouches.length; i++) {
        if (ev.changedTouches[i].identifier === id) return ev.changedTouches[i];
      }
      return null;
    }
    /**
     * @param {number} clientX
     * @param {number} clientY
     * @param {Event} evPrevent — для preventDefault и setPointerCapture (PointerEvent); у TouchEvent capture не нужен.
     * @param {boolean} isMouse
     */
    function romanPlannerSwipeApplyMove(clientX, clientY, evPrevent, isMouse) {
      if (romanPlannerReorderActive && romanPlannerReorderActive.active) return;
      var st = romanPlannerSwipeActive;
      if (!st || !st.dragging) return;
      var dx = clientX - st.startX;
      var dy = clientY - st.startY;
      var adx = Math.abs(dx);
      var ady = Math.abs(dy);
      /** Пока палец не вышел из «мёртвой зоны», не трогаем скролл и не двигаем ряд — иначе preventDefault ломает вертикальный скролл списка. */
      var slop = isMouse ? 5 : 10;
      /** На тачскрине чуть шире допуск по диагонали — иначе вертикальный скролл списка часто «перебивает» свайп. */
      var tilt = isMouse ? 4 : 6;
      if (!st.swipeAxisLocked) {
        if (Math.max(adx, ady) < slop) return;
        /** Только явная вертикаль уступает скроллу списка; иначе — горизонтальный свайп (диагональ «влево» не обрываем). */
        if (ady > adx + tilt) {
          romanPlannerSwipeSetTx(st.track, st.openPx, st.baseTx);
          st.dragging = false;
          romanPlannerSwipeEnd(false);
          return;
        }
        st.swipeAxisLocked = true;
        if (romanPlannerReorderActive && !romanPlannerReorderActive.active) {
          romanPlannerReorderCancel();
        }
        if (!st.pointerCaptureSet && st.pointerId != null && evPrevent && typeof evPrevent.pointerId === "number") {
          st.pointerCaptureSet = true;
          try {
            st.clip.setPointerCapture(evPrevent.pointerId);
          } catch (eCap) {}
          if (!st._lostCapBound) {
            st._lostCapBound = true;
            try {
              st.clip.addEventListener("lostpointercapture", romanPlannerSwipeLostCap);
            } catch (eL) {}
          }
        }
      }
      try {
        evPrevent.preventDefault();
      } catch (ePm) {}
      romanPlannerSwipeSetTx(st.track, st.openPx, st.baseTx + dx);
    }
    function romanPlannerSwipeDocMove(ev) {
      var st = romanPlannerSwipeActive;
      if (!st || !st.dragging || ev.pointerId !== st.pointerId) return;
      var isMouse = ev.pointerType === "mouse";
      romanPlannerSwipeApplyMove(ev.clientX, ev.clientY, ev, isMouse);
    }
    function romanPlannerSwipeTouchDocMove(ev) {
      var reorder = romanPlannerReorderActive;
      if (reorder && reorder.active && reorder.touchId != null) {
        var dragTouch = romanPlannerSwipeFindTouch(ev, reorder.touchId);
        if (dragTouch) {
          try { ev.preventDefault(); } catch (eReorderTouchPd) {}
          romanPlannerReorderMoveTo(dragTouch.clientY);
          return;
        }
      }
      var st = romanPlannerSwipeActive;
      if (!st || !st.dragging || st.touchId == null) return;
      var touch = romanPlannerSwipeFindTouch(ev, st.touchId);
      if (!touch) return;
      romanPlannerSwipeApplyMove(touch.clientX, touch.clientY, ev, false);
    }
    function romanPlannerSwipeDocEnd(ev) {
      var st = romanPlannerSwipeActive;
      if (!st || ev.pointerId !== st.pointerId) return;
      if (!st.dragging) return;
      st.dragging = false;
      romanPlannerSwipeEnd(true);
    }
    function romanPlannerSwipeTouchDocEnd(ev) {
      var reorder = romanPlannerReorderActive;
      if (reorder && reorder.touchId != null && romanPlannerSwipeFindTouchChanged(ev, reorder.touchId)) {
        var wasReorderActive = reorder.active;
        var keepReorderScrollTop = reorder.keepScrollTop;
        var keepReorderPageScrollTop = reorder.keepPageScrollTop;
        if (wasReorderActive) {
          romanPlannerReorderClearTimer();
          reorder.item.classList.remove("roman-task-planner__item--dragging");
          if (listAll) listAll.classList.remove("roman-task-planner__list--dragging");
          document.body.classList.remove("tasks-drag-active");
          romanPlannerReorderActive = null;
          romanPlannerReorderSaveDomOrder(keepReorderScrollTop, keepReorderPageScrollTop);
          if (romanPlannerSwipeActive) romanPlannerSwipeEnd(false);
          return;
        }
        romanPlannerReorderCancel();
      }
      var st = romanPlannerSwipeActive;
      if (!st || st.touchId == null) return;
      if (!romanPlannerSwipeFindTouchChanged(ev, st.touchId)) return;
      if (!st.dragging) return;
      st.dragging = false;
      romanPlannerSwipeEnd(true);
    }
    function romanPlannerSwipeStartOnClip(clip, clientX, clientY, pointerId, touchId) {
      if (romanPlannerReorderActive && romanPlannerReorderActive.active) return false;
      romanPlannerCloseAllSwipes(clip);
      var layout = romanPlannerApplyOpenForClip(clip);
      if (!layout) return false;
      var track = layout.track;
      var openPx = layout.openPx;
      var useTouch = touchId != null;
      romanPlannerSwipeActive = {
        clip: clip,
        track: track,
        openPx: openPx,
        pointerId: pointerId,
        touchId: touchId,
        startX: clientX,
        startY: clientY,
        baseTx: romanPlannerSwipeGetTx(track),
        dragging: true,
        swipeAxisLocked: false,
        pointerCaptureSet: false,
        _lostCapBound: false,
        _docBound: true,
        _touchDocBound: useTouch,
      };
      if (useTouch) {
        document.addEventListener("touchmove", romanPlannerSwipeTouchDocMove, romanPlannerSwipeTouchDocMoveOpts);
        document.addEventListener("touchend", romanPlannerSwipeTouchDocEnd, romanPlannerSwipeTouchDocEndOpts);
        document.addEventListener("touchcancel", romanPlannerSwipeTouchDocEnd, romanPlannerSwipeTouchDocEndOpts);
      } else {
        document.addEventListener("pointermove", romanPlannerSwipeDocMove, romanPlannerSwipeDocListenerOpts);
        document.addEventListener("pointerup", romanPlannerSwipeDocEnd, romanPlannerSwipeDocEndOpts);
        document.addEventListener("pointercancel", romanPlannerSwipeDocEnd, romanPlannerSwipeDocEndOpts);
      }
      return true;
    }
    function romanPlannerReorderClearTimer() {
      if (romanPlannerReorderActive && romanPlannerReorderActive.timer) {
        clearTimeout(romanPlannerReorderActive.timer);
        romanPlannerReorderActive.timer = null;
      }
    }
    function romanPlannerReorderItemAt(clientY, draggingItem) {
      var items = Array.prototype.slice.call(listAll.querySelectorAll(".roman-task-planner__item[data-roman-task-id]"));
      var closest = { offset: Number.NEGATIVE_INFINITY, element: null };
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item === draggingItem) continue;
        var rect = item.getBoundingClientRect();
        var offset = clientY - rect.top - rect.height / 2;
        if (offset < 0 && offset > closest.offset) closest = { offset: offset, element: item };
      }
      return closest.element;
    }
    function romanPlannerReorderMoveTo(clientY) {
      var st = romanPlannerReorderActive;
      if (!st || !st.active || !st.item) return;
      var beforeEl = romanPlannerReorderItemAt(clientY, st.item);
      if (beforeEl) listAll.insertBefore(st.item, beforeEl);
      else listAll.appendChild(st.item);
    }
    function romanPlannerReorderSaveDomOrder(keepScrollTop, keepPageScrollTop) {
      var tasks = loadTasks();
      var byId = {};
      for (var i = 0; i < tasks.length; i++) {
        if (tasks[i] && tasks[i].id != null) byId[String(tasks[i].id)] = tasks[i];
      }
      var cards = Array.prototype.slice.call(listAll.querySelectorAll(".roman-task-planner__item[data-roman-task-id]"));
      var order = 0;
      for (var j = 0; j < cards.length; j++) {
        var id = cards[j].getAttribute("data-roman-task-id");
        if (!byId[id]) continue;
        if (plannerTab === "important") byId[id].important = true;
        if (plannerTab === "normal") byId[id].important = false;
        byId[id].plannerOrder = order * PLANNER_ORDER_STEP;
        order++;
      }
      saveTasks(tasks);
      renderTasks();
      function restore() {
        if (listAll) listAll.scrollTop = keepScrollTop || 0;
        var se = document.scrollingElement || document.documentElement || document.body;
        if (se) se.scrollTop = keepPageScrollTop || 0;
      }
      restore();
      try { requestAnimationFrame(restore); } catch (eRaf) { setTimeout(restore, 0); }
    }
    function romanPlannerReorderCancel() {
      romanPlannerReorderClearTimer();
      if (romanPlannerReorderActive && romanPlannerReorderActive.item) {
        romanPlannerReorderActive.item.classList.remove("roman-task-planner__item--dragging");
        try {
          if (romanPlannerReorderActive.pointerId != null) {
            romanPlannerReorderActive.item.releasePointerCapture(romanPlannerReorderActive.pointerId);
          }
        } catch (eRel) {}
      }
      if (listAll) listAll.classList.remove("roman-task-planner__list--dragging");
      document.body.classList.remove("tasks-drag-active");
      romanPlannerReorderActive = null;
    }
    function romanPlannerReorderStart() {
      var st = romanPlannerReorderActive;
      if (!st || st.active || !st.item) return;
      romanPlannerReorderClearTimer();
      if (romanPlannerSwipeActive) romanPlannerSwipeEnd(false);
      romanPlannerCloseAllSwipes();
      st.active = true;
      st.item.classList.add("roman-task-planner__item--dragging");
      listAll.classList.add("roman-task-planner__list--dragging");
      document.body.classList.add("tasks-drag-active");
    }
    function romanPlannerReorderPointerDown(ev) {
      if (!listAll || plannerTab === "done") return;
      if (ev.pointerType === "mouse" && ev.button !== 0) return;
      if (romanPlannerReorderActive) return;
      var t = ev.target;
      if (!t || !t.closest) return;
      if (t.closest(".roman-task-planner__btn, .roman-task-planner__edit-ta, input, textarea, select, a")) return;
      var item = t.closest(".roman-task-planner__item[data-roman-task-id]");
      if (!item || !listAll.contains(item)) return;
      romanPlannerReorderActive = {
        item: item,
        pointerId: ev.pointerId,
        startX: ev.clientX,
        startY: ev.clientY,
        startedAt: Date.now(),
        active: false,
        timer: setTimeout(romanPlannerReorderStart, 220),
        keepScrollTop: listAll.scrollTop || 0,
        keepPageScrollTop:
          (document.scrollingElement && document.scrollingElement.scrollTop) ||
          (document.documentElement && document.documentElement.scrollTop) ||
          (document.body && document.body.scrollTop) ||
          0,
      };
      try { item.setPointerCapture(ev.pointerId); } catch (eCap) {}
    }
    function romanPlannerReorderPointerMove(ev) {
      var st = romanPlannerReorderActive;
      if (!st || st.pointerId !== ev.pointerId) return;
      var dx = ev.clientX - st.startX;
      var dy = ev.clientY - st.startY;
      if (!st.active) {
        var elapsed = Date.now() - st.startedAt;
        if (Math.abs(dx) > 14 || (Math.abs(dy) > 14 && elapsed < 180)) {
          romanPlannerReorderCancel();
          return;
        }
        return;
      }
      try { ev.preventDefault(); } catch (ePd) {}
      romanPlannerReorderMoveTo(ev.clientY);
    }
    function romanPlannerReorderPointerUp(ev) {
      var st = romanPlannerReorderActive;
      if (!st || st.pointerId !== ev.pointerId) return;
      var wasActive = st.active;
      var keepScrollTop = st.keepScrollTop;
      var keepPageScrollTop = st.keepPageScrollTop;
      if (wasActive) {
        try { ev.preventDefault(); } catch (ePd) {}
        romanPlannerReorderClearTimer();
        st.item.classList.remove("roman-task-planner__item--dragging");
        try { st.item.releasePointerCapture(ev.pointerId); } catch (eRel) {}
        listAll.classList.remove("roman-task-planner__list--dragging");
        document.body.classList.remove("tasks-drag-active");
        romanPlannerReorderActive = null;
        romanPlannerReorderSaveDomOrder(keepScrollTop, keepPageScrollTop);
        return;
      }
      romanPlannerReorderCancel();
    }
    function romanPlannerListTouchStart(ev) {
      if (!listAll || !boardEl) return;
      if (ev.touches.length !== 1) return;
      var touch = ev.touches[0];
      var t = ev.target;
      if (!t || !t.closest) return;
      var clip = t.closest(".roman-task-planner__swipe-clip");
      if (!clip || !listAll.contains(clip)) return;
      if (t.closest(".roman-task-planner__btn")) return;
      if (t.closest(".roman-task-planner__edit-ta")) return;
      if (romanPlannerSwipeActive) return;
      if (romanPlannerReorderActive && romanPlannerReorderActive.active) return;
      var item = t.closest(".roman-task-planner__item[data-roman-task-id]");
      if (!romanPlannerReorderActive && item && listAll.contains(item) && plannerTab !== "done") {
        romanPlannerReorderActive = {
          item: item,
          pointerId: null,
          touchId: touch.identifier,
          startX: touch.clientX,
          startY: touch.clientY,
          startedAt: Date.now(),
          active: false,
          timer: setTimeout(romanPlannerReorderStart, 220),
          keepScrollTop: listAll.scrollTop || 0,
          keepPageScrollTop:
            (document.scrollingElement && document.scrollingElement.scrollTop) ||
            (document.documentElement && document.documentElement.scrollTop) ||
            (document.body && document.body.scrollTop) ||
            0,
        };
      }
      if (romanPlannerReorderActive && !romanPlannerReorderActive.active) {
        romanPlannerReorderActive.touchId = touch.identifier;
      }
      romanPlannerSwipeStartOnClip(clip, touch.clientX, touch.clientY, null, touch.identifier);
    }
    function romanPlannerListPointerDown(ev) {
      if (!listAll || !boardEl) return;
      var t = ev.target;
      if (!t || !t.closest) return;
      var clip = t.closest(".roman-task-planner__swipe-clip");
      if (!clip || !listAll.contains(clip)) return;
      if (t.closest(".roman-task-planner__btn")) return;
      if (t.closest(".roman-task-planner__edit-ta")) return;
      if (ev.pointerType === "mouse" && ev.button !== 0) return;
      if (romanPlannerSwipeActive) return;
      if (romanPlannerReorderActive && romanPlannerReorderActive.active) return;
      /** Касание уже обработано touchstart (там touchmove с passive:false). */
      if (ev.pointerType === "touch") return;
      try {
        ev.preventDefault();
      } catch (ePd) {}
      romanPlannerSwipeStartOnClip(clip, ev.clientX, ev.clientY, ev.pointerId, null);
    }
    function initRomanPlannerSwipeRows() {
      if (!boardEl) return;
      if (listAll && listAll.dataset.romanPlannerSwipeDelegation !== "1") {
        listAll.dataset.romanPlannerSwipeDelegation = "1";
        listAll.addEventListener("pointerdown", romanPlannerReorderPointerDown, true);
        listAll.addEventListener("pointermove", romanPlannerReorderPointerMove, true);
        listAll.addEventListener("pointerup", romanPlannerReorderPointerUp, true);
        listAll.addEventListener("pointercancel", romanPlannerReorderCancel, true);
        listAll.addEventListener("touchstart", romanPlannerListTouchStart, { capture: true, passive: true });
        listAll.addEventListener("pointerdown", romanPlannerListPointerDown);
        listAll.addEventListener(
          "dragstart",
          function (eDg) {
            if (eDg.target && eDg.target.closest && eDg.target.closest(".roman-task-planner__swipe-clip")) eDg.preventDefault();
          },
          true
        );
      }
      var clips = boardEl.querySelectorAll(".roman-task-planner__swipe-clip");
      for (var c = 0; c < clips.length; c++) {
        romanPlannerApplyOpenForClip(clips[c]);
      }
    }
    function romanPlannerRestoreOpenSwipe() {
      if (!romanPlannerOpenSwipeTaskId || !boardEl) return;
      var item = boardEl.querySelector(
        '.roman-task-planner__item[data-roman-task-id="' + cssEscape(romanPlannerOpenSwipeTaskId) + '"]'
      );
      var clip = item ? item.querySelector(".roman-task-planner__swipe-clip") : null;
      if (!clip) {
        romanPlannerOpenSwipeTaskId = "";
        return;
      }
      var layout = romanPlannerApplyOpenForClip(clip);
      if (!layout || !layout.track) {
        romanPlannerOpenSwipeTaskId = "";
        return;
      }
      layout.track.classList.add("roman-task-planner__swipe-track--open");
      romanPlannerSwipeSetTx(layout.track, layout.openPx, -layout.openPx);
    }
    function renderTasks() {
      setPlannerTabUi();
      var raw = loadTasks();
      var activeRaw = raw.filter(function (x) {
        return !x.done;
      });
      var importantActive = sortBucketActiveTasks(
        activeRaw.filter(function (x) {
          return !!x.important;
        })
      );
      var normalActive = sortBucketActiveTasks(
        activeRaw.filter(function (x) {
          return !x.important;
        })
      );
      var doneCol = sortTasksByCreatedAsc(raw.filter(function (x) {
        return !!x.done;
      }));
      var parts = [];
      parts.push('<li class="roman-task-planner__list-hint">Свайп влево открывает меню действий</li>');
      if (plannerTab === "important") {
        if (importantActive.length) {
          for (var ai = 0; ai < importantActive.length; ai++) {
            parts.push(
              renderTaskRow(importantActive[ai], false, ai + 1, {
                canUp: ai > 0,
                canDown: ai < importantActive.length - 1,
              })
            );
          }
        } else {
          parts.push(
            '<li class="roman-task-planner__empty roman-task-planner__empty--stacked">Нет важных задач</li>'
          );
        }
      } else if (plannerTab === "normal") {
        if (normalActive.length) {
          for (var ni = 0; ni < normalActive.length; ni++) {
            parts.push(
              renderTaskRow(normalActive[ni], false, ni + 1, {
                canUp: ni > 0,
                canDown: ni < normalActive.length - 1,
              })
            );
          }
        } else {
          parts.push(
            '<li class="roman-task-planner__empty roman-task-planner__empty--stacked">Нет неважных задач</li>'
          );
        }
      } else {
        if (doneCol.length) {
          for (var di = 0; di < doneCol.length; di++) {
            parts.push(renderTaskRow(doneCol[di], true, di + 1, null));
          }
        } else {
          parts.push(
            '<li class="roman-task-planner__empty roman-task-planner__empty--stacked">Нет выполненных</li>'
          );
        }
      }
      listAll.innerHTML = parts.join("");
      initRomanPlannerSwipeRows();
      romanPlannerRestoreOpenSwipe();
      updatePlannerHintText(raw);
    }
    function openPlannerModal() {
      if (!isPlannerAllowedUser() || !plannerModal) return;
      romanPlannerDirtySinceOpen = false;
      plannerTab = readPlannerTabStorage();
      renderTasks();
      plannerModal.setAttribute("aria-hidden", "false");
      romanPlannerPullFromServer();
      romanPlannerStartLiveSync();
      try {
        var raf = window.requestAnimationFrame || function (fn) {
          setTimeout(fn, 0);
        };
        raf(function () {
          resizePlannerComposer();
        });
      } catch (eRz) {}
    }
    window.pokerOpenRomanTaskPlanner = openPlannerModal;
    function closeHeaderMoreMenu() {
      var menu = document.getElementById("headerMoreMenu");
      var toggle = document.getElementById("headerMoreMenuBtn");
      if (menu) menu.hidden = true;
      if (toggle) {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Открыть меню");
      }
    }
    function closePlannerModal() {
      romanPlannerStopLiveSync();
      if (plannerModal) plannerModal.setAttribute("aria-hidden", "true");
      if (plannerModal) plannerModal.classList.remove("roman-task-planner-modal--keyboard");
      try {
        var ae = document.activeElement;
        if (ae && plannerModal && plannerModal.contains(ae) && ae.blur) ae.blur();
      } catch (eB) {}
      try {
        document.documentElement.classList.remove("gazette-comment-keyboard");
      } catch (eGk) {}
      try {
        if (typeof window.__pokerFinalizeChatKeyboardDismiss === "function") {
          window.__pokerFinalizeChatKeyboardDismiss();
        }
      } catch (eKb) {}
    }
    function setPlannerOpenButtonVisible(visible) {
      openBtn.classList.toggle("welcome-planner-icon--hidden", !visible);
      openBtn.toggleAttribute("disabled", !visible);
      openBtn.setAttribute("aria-hidden", visible ? "false" : "true");
      if (visible) openBtn.setAttribute("data-planner-access", "allowed");
      else openBtn.removeAttribute("data-planner-access");
      document.documentElement.classList.toggle("home-planner-access-granted", !!visible);
    }
    function syncVisibility() {
      if (!isPlannerAllowedUser()) {
        setPlannerOpenButtonVisible(false);
        closePlannerModal();
        return;
      }
      setPlannerOpenButtonVisible(true);
      if (plannerModal.getAttribute("aria-hidden") === "false") {
        renderTasks();
        romanPlannerPullFromServer();
        romanPlannerStartLiveSync();
      }
    }
    try {
      document.addEventListener("visibilitychange", function () {
        if (typeof document.visibilityState !== "undefined" && document.visibilityState !== "visible") return;
        if (!plannerModal || plannerModal.getAttribute("aria-hidden") !== "false") return;
        romanPlannerPullAmbient();
      });
    } catch (eVis) {}
    try {
      window.addEventListener("pageshow", function () {
        if (!plannerModal || plannerModal.getAttribute("aria-hidden") !== "false") return;
        romanPlannerPullAmbient();
      });
    } catch (ePs) {}
    if (tabImportantBtn) {
      tabImportantBtn.addEventListener("click", function () {
        plannerTab = "important";
        writePlannerTabStorage("important");
        renderTasks();
      });
    }
    if (tabNormalBtn) {
      tabNormalBtn.addEventListener("click", function () {
        plannerTab = "normal";
        writePlannerTabStorage("normal");
        renderTasks();
      });
    }
    if (tabDoneBtn) {
      tabDoneBtn.addEventListener("click", function () {
        plannerTab = "done";
        writePlannerTabStorage("done");
        renderTasks();
      });
    }
    openBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (!isPlannerAllowedUser()) return;
      openPlannerModal();
    });
    if (plannerBackdrop) {
      plannerBackdrop.addEventListener("click", function () {
        closePlannerModal();
      });
    }
    if (plannerClose) {
      plannerClose.addEventListener("click", function () {
        closePlannerModal();
      });
    }
    (function bindPlannerModalKeyboardRepair() {
      if (!plannerModal) return;
      var blurTimer = null;
      function updatePlannerKeyboardLayout() {
        var vv = window.visualViewport || null;
        var h = vv && vv.height ? Math.round(vv.height) : window.innerHeight || 0;
        var top = vv && vv.offsetTop ? Math.round(vv.offsetTop) : 0;
        if (h > 0) plannerModal.style.setProperty("--roman-planner-viewport-height", h + "px");
        plannerModal.style.setProperty("--roman-planner-viewport-top", top + "px");
      }
      function keepPlannerFieldVisible(field) {
        if (!field || !plannerModal.contains(field)) return;
        updatePlannerKeyboardLayout();
        try {
          field.scrollIntoView({ block: "center", inline: "nearest", behavior: "smooth" });
        } catch (eSv) {
          try { field.scrollIntoView(false); } catch (eSv2) {}
        }
      }
      function scheduleKeepPlannerFieldVisible(field) {
        keepPlannerFieldVisible(field);
        setTimeout(function () { keepPlannerFieldVisible(field); }, 180);
        setTimeout(function () { keepPlannerFieldVisible(field); }, 420);
      }
      function scheduleFinalizePlannerKb() {
        clearTimeout(blurTimer);
        blurTimer = setTimeout(function () {
          blurTimer = null;
          var active = document.activeElement;
          var kbField =
            active &&
            active.classList &&
            (active.classList.contains("roman-task-planner__input") ||
              active.classList.contains("roman-task-planner__edit-ta"));
          if (kbField && plannerModal.contains(active)) return;
          plannerModal.classList.remove("roman-task-planner-modal--keyboard");
          try {
            document.documentElement.classList.remove("gazette-comment-keyboard");
          } catch (eRm) {}
          try {
            if (typeof window.__pokerFinalizeChatKeyboardDismiss === "function") {
              window.__pokerFinalizeChatKeyboardDismiss();
            }
          } catch (eFin) {}
        }, 120);
      }
      plannerModal.addEventListener(
        "focusin",
        function (ev) {
          var t = ev.target;
          if (
            !t ||
            !t.classList ||
            (!t.classList.contains("roman-task-planner__input") &&
              !t.classList.contains("roman-task-planner__edit-ta"))
          ) {
            return;
          }
          if (!plannerModal.contains(t)) return;
          try {
            document.documentElement.classList.add("gazette-comment-keyboard");
          } catch (eIn) {}
          plannerModal.classList.add("roman-task-planner-modal--keyboard");
          scheduleKeepPlannerFieldVisible(t);
        },
        true
      );
      plannerModal.addEventListener(
        "focusout",
        function (ev) {
          var t = ev.target;
          if (
            !t ||
            !t.classList ||
            (!t.classList.contains("roman-task-planner__input") &&
              !t.classList.contains("roman-task-planner__edit-ta"))
          ) {
            return;
          }
          if (!plannerModal.contains(t)) return;
          scheduleFinalizePlannerKb();
        },
        true
      );
      try {
        if (window.visualViewport) {
          window.visualViewport.addEventListener("resize", function () {
            var active = document.activeElement;
            var kbField =
              active &&
              active.classList &&
              (active.classList.contains("roman-task-planner__input") ||
                active.classList.contains("roman-task-planner__edit-ta"));
            if (!kbField || !plannerModal.contains(active)) return;
            scheduleKeepPlannerFieldVisible(active);
          });
        }
      } catch (eVv) {}
    })();
    window.addEventListener("poker-telegram-auth", function () {
      syncVisibility();
    });
    window.__pokerSyncRomanTaskPlanner = syncVisibility;
    input.addEventListener("input", function () {
      resizePlannerComposer();
    });
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (!isPlannerAllowedUser()) return;
      var text = input.value ? input.value.trim() : "";
      if (!text) return;
      var wantImportant = !!(importantCheckbox && importantCheckbox.checked);
      var tasks = loadTasks();
      tasks.push({
        id: "t_" + Date.now() + "_" + Math.random().toString(36).slice(2, 9),
        text: text,
        done: false,
        doing: false,
        important: wantImportant,
        createdAt: Date.now(),
        plannerOrder: nextPlannerOrderInBucket(tasks, wantImportant),
      });
      saveTasks(tasks);
      input.value = "";
      if (importantCheckbox) importantCheckbox.checked = false;
      if (wantImportant && plannerTab !== "important") {
        plannerTab = "important";
        writePlannerTabStorage("important");
        setPlannerTabUi();
      }
      renderTasks();
      resizePlannerComposer();
    });
    boardEl.addEventListener("click", function (ev) {
      if (!isPlannerAllowedUser()) return;
      var t = ev.target;
      if (!t || !t.closest) return;
      var setDoing = t.closest("[data-roman-task-set-doing]");
      if (setDoing) {
        var idSd = setDoing.getAttribute("data-roman-task-set-doing");
        var tasksSd = loadTasks();
        var ixSd = findTaskById(tasksSd, idSd);
        if (ixSd >= 0 && !tasksSd[ixSd].done) {
          tasksSd[ixSd].doing = true;
          saveTasks(tasksSd);
          renderTasks();
        }
        return;
      }
      var clearDoing = t.closest("[data-roman-task-clear-doing]");
      if (clearDoing) {
        var idCd = clearDoing.getAttribute("data-roman-task-clear-doing");
        var tasksCd = loadTasks();
        var ixCd = findTaskById(tasksCd, idCd);
        if (ixCd >= 0) {
          tasksCd[ixCd].doing = false;
          saveTasks(tasksCd);
          renderTasks();
        }
        return;
      }
      var setImp = t.closest("[data-roman-task-set-important]");
      if (setImp) {
        var idSi = setImp.getAttribute("data-roman-task-set-important");
        var tasksSi = loadTasks();
        var ixSi = findTaskById(tasksSi, idSi);
        if (ixSi >= 0 && !tasksSi[ixSi].done) {
          tasksSi[ixSi].important = true;
          tasksSi[ixSi].plannerOrder = nextPlannerOrderInBucket(tasksSi, true);
          saveTasks(tasksSi);
          renderTasks();
        }
        return;
      }
      var clearImp = t.closest("[data-roman-task-clear-important]");
      if (clearImp) {
        var idCi = clearImp.getAttribute("data-roman-task-clear-important");
        var tasksCi = loadTasks();
        var ixCi = findTaskById(tasksCi, idCi);
        if (ixCi >= 0) {
          tasksCi[ixCi].important = false;
          tasksCi[ixCi].plannerOrder = nextPlannerOrderInBucket(tasksCi, false);
          saveTasks(tasksCi);
          renderTasks();
        }
        return;
      }
      var setStage = t.closest("[data-roman-task-set-stage]");
      if (setStage) {
        var idSt = setStage.getAttribute("data-roman-task-set-stage");
        var nextStage = setStage.getAttribute("data-roman-task-stage") || "";
        var tasksSt = loadTasks();
        var ixSt = findTaskById(tasksSt, idSt);
        if (ixSt >= 0 && !tasksSt[ixSt].done && (nextStage === "waiting" || nextStage === "checking")) {
          tasksSt[ixSt].stage = nextStage;
          saveTasks(tasksSt);
          renderTasks();
        }
        return;
      }
      var clearStage = t.closest("[data-roman-task-clear-stage]");
      if (clearStage) {
        var idCs = clearStage.getAttribute("data-roman-task-clear-stage");
        var tasksCs = loadTasks();
        var ixCs = findTaskById(tasksCs, idCs);
        if (ixCs >= 0) {
          delete tasksCs[ixCs].stage;
          saveTasks(tasksCs);
          renderTasks();
        }
        return;
      }
      var moveUpEl = t.closest("[data-roman-task-move-up]");
      if (moveUpEl) {
        if (moveUpEl.disabled) return;
        var idMu = moveUpEl.getAttribute("data-roman-task-move-up");
        movePlannerTaskInList(idMu, -1);
        return;
      }
      var moveDownEl = t.closest("[data-roman-task-move-down]");
      if (moveDownEl) {
        if (moveDownEl.disabled) return;
        var idMd = moveDownEl.getAttribute("data-roman-task-move-down");
        movePlannerTaskInList(idMd, 1);
        return;
      }
      var completeBtn = t.closest("[data-roman-task-complete]");
      if (completeBtn) {
        var idC = completeBtn.getAttribute("data-roman-task-complete");
        var tasksC = loadTasks();
        var ixC = findTaskById(tasksC, idC);
        if (ixC >= 0) {
          tasksC[ixC].done = true;
          saveTasks(tasksC);
          renderTasks();
        }
        return;
      }
      var uncompleteBtn = t.closest("[data-roman-task-uncomplete]");
      if (uncompleteBtn) {
        var idU = uncompleteBtn.getAttribute("data-roman-task-uncomplete");
        var tasksU = loadTasks();
        var ixU = findTaskById(tasksU, idU);
        if (ixU >= 0) {
          tasksU[ixU].done = false;
          tasksU[ixU].plannerOrder = nextPlannerOrderInBucket(tasksU, !!tasksU[ixU].important);
          saveTasks(tasksU);
          renderTasks();
        }
        return;
      }
      var del = t.closest("[data-roman-task-delete]");
      if (del) {
        var idD = del.getAttribute("data-roman-task-delete");
        if (!confirm("Удалить задачу?")) return;
        var tasksD = loadTasks();
        var ixD = findTaskById(tasksD, idD);
        if (ixD >= 0) {
          tasksD.splice(ixD, 1);
          saveTasks(tasksD);
          renderTasks();
        }
        return;
      }
      var saveB = t.closest("[data-roman-task-save]");
      if (saveB) {
        var idS = saveB.getAttribute("data-roman-task-save");
        var liS = saveB.closest(".roman-task-planner__item");
        var taS = liS && liS.querySelector(".roman-task-planner__edit-ta");
        var newText = taS && taS.value ? taS.value.trim() : "";
        if (!newText) {
          var tg0 = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
          if (tg0 && tg0.showAlert) tg0.showAlert("Введите текст задачи.");
          else alert("Введите текст задачи.");
          return;
        }
        var tasksS = loadTasks();
        var ixS = findTaskById(tasksS, idS);
        if (ixS >= 0) {
          tasksS[ixS].text = newText;
          saveTasks(tasksS);
          renderTasks();
        }
        return;
      }
      var cancelB = t.closest("[data-roman-task-cancel]");
      if (cancelB) {
        renderTasks();
        return;
      }
      var edit = t.closest("[data-roman-task-edit]");
      if (!edit) return;
      var idE = edit.getAttribute("data-roman-task-edit");
      var li = edit.closest(".roman-task-planner__item");
      if (!li || li.getAttribute("data-roman-editing") === "1") return;
      var tasksE = loadTasks();
      var ixE = findTaskById(tasksE, idE);
      if (ixE < 0) return;
      var body = li.querySelector(".roman-task-planner__body");
      if (!body) return;
      var editClip = li.querySelector(".roman-task-planner__swipe-clip");
      romanPlannerCloseAllSwipes();
      if (editClip) romanPlannerApplyOpenForClip(editClip);
      li.setAttribute("data-roman-editing", "1");
      var cur = tasksE[ixE].text != null ? String(tasksE[ixE].text) : "";
      body.innerHTML =
        '<textarea class="roman-task-planner__edit-ta" maxlength="500" aria-label="Редактирование задачи"></textarea>' +
        '<div class="roman-task-planner__edit-actions">' +
        '<button type="button" class="roman-task-planner__btn roman-task-planner__btn--primary" data-roman-task-save="' +
        escHtml(idE) +
        '">Сохранить</button>' +
        '<button type="button" class="roman-task-planner__btn" data-roman-task-cancel="' +
        escHtml(idE) +
        '">Отмена</button>' +
        "</div>";
      var taEd = body.querySelector(".roman-task-planner__edit-ta");
      if (taEd) taEd.value = cur;
      if (editClip) romanPlannerApplyOpenForClip(editClip);
      try {
        taEd.focus();
      } catch (eFoc) {}
    });
    syncVisibility();
    updatePlannerHintText();
    resizePlannerComposer();
  }
  window.pokerInitRomanGazetteTaskPlanner = initRomanGazetteTaskPlanner;
  initRomanGazetteTaskPlanner();
  if (!window.__pokerRomanPlannerDelegatedOpenBound) {
    window.__pokerRomanPlannerDelegatedOpenBound = true;
    document.addEventListener(
      "click",
      function (ev) {
        var btn = ev.target && ev.target.closest ? ev.target.closest("#romanTaskPlannerOpenBtn") : null;
        if (!btn) return;
        ev.preventDefault();
        ev.stopPropagation();
        closeHeaderMoreMenu();
        var ensure =
          typeof window.pokerEnsureGlobalModalsHtml === "function"
            ? window.pokerEnsureGlobalModalsHtml()
            : Promise.resolve(true);
        Promise.resolve(ensure)
          .then(function () {
            if (typeof window.pokerInitRomanGazetteTaskPlanner === "function") {
              window.pokerInitRomanGazetteTaskPlanner();
            }
            if (typeof window.pokerOpenRomanTaskPlanner === "function") {
              window.pokerOpenRomanTaskPlanner();
            }
          })
          .catch(function () {});
      },
      true
    );
  }
}

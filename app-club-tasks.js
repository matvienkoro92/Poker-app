var TASKS_STORAGE_KEY = "poker_tasks_board_v1";
var clubTasksPlannerInited = false;
var clubTasksPlannerDrag = null;
var CLUB_TASKS_STATUSES = ["important", "todo", "doing", "done"];

function getClubTasksPlannerItems() {
  try {
    var raw = localStorage.getItem(TASKS_STORAGE_KEY);
    var list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch (e) {
    return [];
  }
}

function saveClubTasksPlannerItems(tasks) {
  try {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks || []));
  } catch (e) {}
}

function normalizeClubTasksPlannerOrder(tasks) {
  var nextOrderByStatus = {};
  CLUB_TASKS_STATUSES.forEach(function (status) {
    nextOrderByStatus[status] = 0;
  });
  (tasks || []).forEach(function (task, index) {
    if (!task || typeof task !== "object") return;
    if (CLUB_TASKS_STATUSES.indexOf(task.status) === -1) task.status = "todo";
    if (typeof task.order !== "number" || !isFinite(task.order)) {
      task.order = nextOrderByStatus[task.status];
    }
    nextOrderByStatus[task.status] = Math.max(nextOrderByStatus[task.status], task.order + 1, index + 1);
  });
  return tasks || [];
}

function getNextClubTasksPlannerOrder(tasks, status, atStart) {
  var sameStatus = (tasks || []).filter(function (task) { return task.status === status; });
  if (!sameStatus.length) return 0;
  var orders = sameStatus.map(function (task) {
    return typeof task.order === "number" && isFinite(task.order) ? task.order : 0;
  });
  return atStart ? Math.min.apply(null, orders) - 1 : Math.max.apply(null, orders) + 1;
}

function sortClubTasksPlannerItems(tasks) {
  return (tasks || []).slice().sort(function (a, b) {
    var ao = typeof a.order === "number" && isFinite(a.order) ? a.order : 0;
    var bo = typeof b.order === "number" && isFinite(b.order) ? b.order : 0;
    if (ao !== bo) return ao - bo;
    return String(a.createdAt || "").localeCompare(String(b.createdAt || ""));
  });
}

function clubTasksPlannerEscape(text) {
  if (text == null) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function clubTasksPlannerStatusLabel(status) {
  if (status === "important") return "Важно";
  if (status === "doing") return "В работе";
  if (status === "done") return "Выполнено";
  return "Надо сделать";
}

function renderClubTasksPlanner() {
  var tasks = normalizeClubTasksPlannerOrder(getClubTasksPlannerItems());
  var statuses = CLUB_TASKS_STATUSES;
  var lists = {
    important: document.getElementById("tasksListImportant"),
    todo: document.getElementById("tasksListTodo"),
    doing: document.getElementById("tasksListDoing"),
    done: document.getElementById("tasksListDone")
  };
  var counters = {
    important: document.getElementById("tasksCountImportant"),
    todo: document.getElementById("tasksCountTodo"),
    doing: document.getElementById("tasksCountDoing"),
    done: document.getElementById("tasksCountDone")
  };

  statuses.forEach(function (status) {
    var listEl = lists[status];
    var countEl = counters[status];
    if (!listEl) return;
    var filtered = sortClubTasksPlannerItems(tasks.filter(function (task) { return task.status === status; }));
    if (countEl) countEl.textContent = String(filtered.length);
    if (!filtered.length) {
      listEl.innerHTML = '<p class="tasks-column__empty">Пока пусто.</p>';
      return;
    }
    listEl.innerHTML = filtered.map(function (task) {
      var created = task.createdAt ? new Date(task.createdAt) : null;
      var createdStr = created && !isNaN(created.getTime()) ? created.toLocaleString("ru-RU") : "";
      var actions = [];
      if (task.status !== "important") actions.push('<button type="button" class="tasks-task__action" data-task-action="move" data-task-id="' + clubTasksPlannerEscape(task.id) + '" data-task-status="important">В важное</button>');
      if (task.status !== "todo") actions.push('<button type="button" class="tasks-task__action" data-task-action="move" data-task-id="' + clubTasksPlannerEscape(task.id) + '" data-task-status="todo">В надо сделать</button>');
      if (task.status !== "doing") actions.push('<button type="button" class="tasks-task__action" data-task-action="move" data-task-id="' + clubTasksPlannerEscape(task.id) + '" data-task-status="doing">В работу</button>');
      if (task.status !== "done") actions.push('<button type="button" class="tasks-task__action" data-task-action="move" data-task-id="' + clubTasksPlannerEscape(task.id) + '" data-task-status="done">Выполнено</button>');
      actions.push('<button type="button" class="tasks-task__delete" data-task-action="delete" data-task-id="' + clubTasksPlannerEscape(task.id) + '">Удалить</button>');
      return '<article class="tasks-task' + (task.status === "important" ? ' tasks-task--important' : '') + '" data-task-id="' + clubTasksPlannerEscape(task.id) + '" data-task-status="' + clubTasksPlannerEscape(task.status) + '">' +
        '<div class="tasks-task__text">' + clubTasksPlannerEscape(task.text) + '</div>' +
        '<div class="tasks-task__meta">' + clubTasksPlannerStatusLabel(task.status) + (createdStr ? " • " + clubTasksPlannerEscape(createdStr) : "") + '</div>' +
        '<div class="tasks-task__controls">' + actions.join("") + '</div>' +
      '</article>';
    }).join("");
  });
}

function getClubTasksPlannerListFromPoint(x, y) {
  var el = document.elementFromPoint(x, y);
  var column = el && el.closest ? el.closest("[data-tasks-status]") : null;
  return column ? column.querySelector(".tasks-column__list") : null;
}

function getClubTasksPlannerAfterElement(listEl, y, draggingId) {
  var candidates = Array.prototype.slice.call(listEl.querySelectorAll(".tasks-task:not(.tasks-task--dragging)"))
    .filter(function (item) { return item.getAttribute("data-task-id") !== draggingId; });
  var closest = { offset: Number.NEGATIVE_INFINITY, element: null };
  candidates.forEach(function (item) {
    var box = item.getBoundingClientRect();
    var offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      closest = { offset: offset, element: item };
    }
  });
  return closest.element;
}

function moveClubTaskElementToPoint(taskEl, x, y) {
  var listEl = getClubTasksPlannerListFromPoint(x, y);
  if (!listEl) return;
  var afterEl = getClubTasksPlannerAfterElement(listEl, y, taskEl.getAttribute("data-task-id"));
  if (afterEl) listEl.insertBefore(taskEl, afterEl);
  else listEl.appendChild(taskEl);
}

function saveClubTasksPlannerDomOrder(board) {
  var tasks = getClubTasksPlannerItems();
  var byId = {};
  tasks.forEach(function (task) {
    byId[task.id] = task;
  });
  CLUB_TASKS_STATUSES.forEach(function (status) {
    var column = board.querySelector('[data-tasks-status="' + status + '"]');
    var cards = column ? Array.prototype.slice.call(column.querySelectorAll(".tasks-task[data-task-id]")) : [];
    cards.forEach(function (card, index) {
      var id = card.getAttribute("data-task-id");
      if (!byId[id]) return;
      byId[id].status = status;
      byId[id].order = index;
    });
  });
  saveClubTasksPlannerItems(tasks);
}

function clearClubTasksPlannerDragTimer() {
  if (clubTasksPlannerDrag && clubTasksPlannerDrag.timer) {
    clearTimeout(clubTasksPlannerDrag.timer);
    clubTasksPlannerDrag.timer = null;
  }
}

function startClubTasksPlannerDrag() {
  var drag = clubTasksPlannerDrag;
  if (!drag || drag.active || !drag.taskEl || !drag.board) return;
  clearClubTasksPlannerDragTimer();
  drag.active = true;
  drag.board.classList.add("tasks-board--dragging");
  drag.taskEl.classList.add("tasks-task--dragging");
  drag.taskEl.style.touchAction = "none";
  document.body.classList.add("tasks-drag-active");
}

function cancelClubTasksPlannerDrag() {
  clearClubTasksPlannerDragTimer();
  if (clubTasksPlannerDrag && clubTasksPlannerDrag.taskEl) {
    clubTasksPlannerDrag.taskEl.classList.remove("tasks-task--dragging");
    clubTasksPlannerDrag.taskEl.style.removeProperty("touch-action");
    if (clubTasksPlannerDrag.pointerId != null) {
      try { clubTasksPlannerDrag.taskEl.releasePointerCapture(clubTasksPlannerDrag.pointerId); } catch (err) {}
    }
  }
  if (clubTasksPlannerDrag && clubTasksPlannerDrag.board) {
    clubTasksPlannerDrag.board.classList.remove("tasks-board--dragging");
  }
  document.body.classList.remove("tasks-drag-active");
  clubTasksPlannerDrag = null;
}

function bindClubTasksPlannerDrag(board) {
  board.addEventListener("pointerdown", function (e) {
    if (e.button != null && e.button !== 0) return;
    var taskEl = e.target && e.target.closest ? e.target.closest(".tasks-task[data-task-id]") : null;
    if (!taskEl || !board.contains(taskEl)) return;
    if (e.target.closest(".tasks-task__controls, button, input, textarea, select, a")) return;
    clubTasksPlannerDrag = {
      active: false,
      board: board,
      taskEl: taskEl,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      startedAt: Date.now(),
      timer: setTimeout(function () {
        if (!clubTasksPlannerDrag || clubTasksPlannerDrag.taskEl !== taskEl) return;
        startClubTasksPlannerDrag();
      }, 180)
    };
    try { taskEl.setPointerCapture(e.pointerId); } catch (err) {}
  });

  board.addEventListener("pointermove", function (e) {
    var drag = clubTasksPlannerDrag;
    if (!drag || drag.pointerId !== e.pointerId) return;
    var dx = e.clientX - drag.startX;
    var dy = e.clientY - drag.startY;
    if (!drag.active) {
      var distance = Math.sqrt(dx * dx + dy * dy);
      var elapsed = Date.now() - drag.startedAt;
      if (Math.abs(dy) > 24 && Math.abs(dy) > Math.abs(dx) + 10 && elapsed < 180) {
        cancelClubTasksPlannerDrag();
        return;
      }
      if (distance < 7 || elapsed < 120) return;
      startClubTasksPlannerDrag();
    }
    e.preventDefault();
    moveClubTaskElementToPoint(drag.taskEl, e.clientX, e.clientY);
  });

  board.addEventListener("pointerup", function (e) {
    var drag = clubTasksPlannerDrag;
    if (!drag || drag.pointerId !== e.pointerId) return;
    clearClubTasksPlannerDragTimer();
    if (drag.active) {
      e.preventDefault();
      saveClubTasksPlannerDomOrder(board);
      renderClubTasksPlanner();
    }
    cancelClubTasksPlannerDrag();
  });

  board.addEventListener("pointercancel", function () {
    cancelClubTasksPlannerDrag();
  });
}

function initClubTasksPlanner() {
  var form = document.getElementById("tasksCreateForm");
  var input = document.getElementById("tasksCreateInput");
  var importantCheckbox = document.getElementById("tasksImportantCheckbox");
  var board = document.getElementById("tasksBoard");
  if (!form || !input || !importantCheckbox || !board) return;

  renderClubTasksPlanner();
  if (clubTasksPlannerInited) return;
  clubTasksPlannerInited = true;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var text = (input.value || "").trim();
    if (!text) return;
    var tasks = getClubTasksPlannerItems();
    tasks.unshift({
      id: "task_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8),
      text: text,
      status: importantCheckbox.checked ? "important" : "todo",
      createdAt: new Date().toISOString(),
      order: getNextClubTasksPlannerOrder(tasks, importantCheckbox.checked ? "important" : "todo", true)
    });
    saveClubTasksPlannerItems(tasks);
    input.value = "";
    importantCheckbox.checked = false;
    renderClubTasksPlanner();
  });

  board.addEventListener("click", function (e) {
    var btn = e.target && e.target.closest ? e.target.closest("[data-task-action]") : null;
    if (!btn) return;
    var action = btn.getAttribute("data-task-action");
    var taskId = btn.getAttribute("data-task-id");
    if (!taskId) return;
    var tasks = getClubTasksPlannerItems();
    var idx = tasks.findIndex(function (task) { return task.id === taskId; });
    if (idx === -1) return;
    if (action === "delete") {
      tasks.splice(idx, 1);
      saveClubTasksPlannerItems(tasks);
      renderClubTasksPlanner();
      return;
    }
    if (action === "move") {
      var nextStatus = btn.getAttribute("data-task-status") || "todo";
      tasks[idx].status = nextStatus;
      tasks[idx].order = getNextClubTasksPlannerOrder(tasks, nextStatus, true);
      saveClubTasksPlannerItems(tasks);
      renderClubTasksPlanner();
    }
  });

  bindClubTasksPlannerDrag(board);
}

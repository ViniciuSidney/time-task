console.log("Time-Task iniciado.");

/* =========================================================
   Time-Task - main.js
   Estrutura:
   01. Seletores DOM
   02. Constantes e estado global
   03. Fábricas e utilitários gerais
   04. Formatação e validação de tempo
   05. Interface e estados visuais
   06. Tarefas
   07. Missões e timer
   08. Armazenamento local
   09. Histórico
   10. Modais
   11. Modelos
   12. Eventos
   13. Inicialização
========================================================= */

/* =========================================================
   01. Seletores DOM
========================================================= */

const dom = {
  body: document.body,

  missionForm: document.querySelector(".mission-form"),
  missionTitleInput: document.querySelector("#mission-title"),
  missionTimeInput: document.querySelector("#mission-time"),
  timerDisplay: document.querySelector(".timer-display"),
  timerDisplayText: document.querySelector(".timer-display span"),

  taskList: document.querySelector("#task-list"),
  taskProgress: document.querySelector("#task-progress"),

  addTaskButton: document.querySelector("#add-task-button"),
  startMissionButton: document.querySelector("#start-mission-button"),

  historyButton: document.querySelector("#history-button"),
  pauseToggleButton: document.querySelector("#pause-toggle-button"),
  restartMissionButton: document.querySelector("#restart-mission-button"),
  cancelMissionButton: document.querySelector("#cancel-mission-button"),

  clearCurrentMissionButton: document.querySelector("#clear-current-mission-button"),
  repeatMissionButton: document.querySelector("#repeat-mission-button"),
  saveTemplateButton: document.querySelector("#save-template-button"),

  historyPanel: document.querySelector("#history-panel"),
  historyList: document.querySelector("#history-list"),
  closeHistoryButton: document.querySelector("#close-history-button"),
  clearHistoryButton: document.querySelector("#clear-history-button"),

  orientationLine1: document.querySelector("#orientation-line-1"),
  orientationLine2: document.querySelector("#orientation-line-2"),

  templatesButton: document.querySelector("#templates-button"),

  modalBackdrop: document.querySelector("#modal-backdrop"),

  confirmModal: document.querySelector("#confirm-modal"),
  confirmModalTitle: document.querySelector("#confirm-modal-title"),
  confirmModalMessage: document.querySelector("#confirm-modal-message"),
  confirmModalClose: document.querySelector("#confirm-modal-close"),
  confirmModalCancel: document.querySelector("#confirm-modal-cancel"),
  confirmModalConfirm: document.querySelector("#confirm-modal-confirm"),

  templatesModal: document.querySelector("#templates-modal"),
  templatesModalClose: document.querySelector("#templates-modal-close"),
  templateList: document.querySelector("#template-list"),
};

/* =========================================================
   02. Constantes e estado global
========================================================= */

const APP_STATES = {
  initial: "initial",
  running: "running",
  paused: "paused",
  finished: "finished",
};

const FINISH_REASONS = {
  manual: "manual",
  timeEnded: "time-ended",
};

const MAX_TASKS = 7;
const MAX_MISSION_MINUTES = 120;

const STORAGE_KEYS = {
  history: "time-task:history",
  templates: "time-task:templates",
  activeMission: "time-task:active-mission",
  finishedMission: "time-task:finished-mission",
};

const DANGER_CONFIRM_MESSAGES = {
  restart: {
    title: "Reiniciar missão",
    message: "Tem certeza que deseja reiniciar a missão atual? O tempo voltará ao início e as tarefas serão desmarcadas.",
    confirmLabel: "Reiniciar",
  },
  cancel: {
    title: "Cancelar missão",
    message: "Tem certeza que deseja cancelar a missão atual? O progresso desta execução será perdido.",
    confirmLabel: "Cancelar",
  },
  "clear-history": {
    title: "Apagar histórico",
    message: "Tem certeza que deseja apagar todo o histórico? Essa ação não poderá ser desfeita.",
    confirmLabel: "Apagar",
  },
  "delete-history-item": {
    title: "Excluir registro",
    message: "Tem certeza que deseja excluir esta missão do histórico?",
    confirmLabel: "Excluir",
  },
  "clear-current": {
    title: "Limpar missão atual",
    message: "Tem certeza que deseja limpar a missão atual e voltar para a tela inicial?",
    confirmLabel: "Limpar",
  },
  "delete-template": {
    title: "Excluir modelo",
    message: "Tem certeza que deseja excluir este modelo salvo?",
    confirmLabel: "Excluir",
  },
};

const state = {
  screen: APP_STATES.initial,
  countdownInterval: null,
  countdownDeadline: null,
  pendingConfirmAction: null,

  activeMission: null,
  lastFinishedMission: null,

  tasks: [createTask(), createTask(), createTask()],
};

/* =========================================================
   03. Fábricas e utilitários gerais
========================================================= */

function createTask(name = "") {
  return {
    id: createId(),
    name,
    completed: false,
  };
}

function createId() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function cloneData(data) {
  if (typeof structuredClone === "function") {
    return structuredClone(data);
  }

  return JSON.parse(JSON.stringify(data));
}

function escapeHTML(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function setOrientationMessage(line1, line2) {
  dom.orientationLine1.textContent = line1;
  dom.orientationLine2.textContent = line2;
}

/* =========================================================
   04. Formatação e validação de tempo
========================================================= */

function parseMissionMinutes(value) {
  const text = String(value).toLowerCase().trim();

  if (text === "") {
    return 0;
  }

  const hourMatch = text.match(/(\d+)\s*(?:h|hora|horas)\b/);
  const minuteMatch = text.match(/(\d+)\s*(?:m|min|minuto|minutos)\b/);

  if (hourMatch || minuteMatch) {
    const hours = hourMatch ? Number(hourMatch[1]) : 0;
    const minutes = minuteMatch ? Number(minuteMatch[1]) : 0;

    return hours * 60 + minutes;
  }

  const onlyNumbers = text.replace(/\D/g, "");
  return Number(onlyNumbers);
}

function limitMissionMinutes(minutes) {
  const safeMinutes = Number(minutes);

  if (!safeMinutes || safeMinutes <= 0) {
    return 0;
  }

  return Math.min(safeMinutes, MAX_MISSION_MINUTES);
}

function formatMinuteLabel(minutes) {
  const safeMinutes = Number(minutes);

  if (!safeMinutes || safeMinutes <= 0) {
    return "";
  }

  const hours = Math.floor(safeMinutes / 60);
  const remainingMinutes = safeMinutes % 60;

  if (hours === 0) {
    return safeMinutes === 1 ? "1 minuto" : `${safeMinutes} minutos`;
  }

  if (remainingMinutes === 0) {
    return hours === 1 ? "1 hora" : `${hours} horas`;
  }

  const hourLabel = hours === 1 ? "1 hora" : `${hours} horas`;
  const minuteLabel = remainingMinutes === 1 ? "1 minuto" : `${remainingMinutes} minutos`;

  return `${hourLabel} e ${minuteLabel}`;
}

function formatPlannedTimeLabel(minutes) {
  const label = formatMinuteLabel(minutes);

  if (!label) {
    return "Tempo não informado";
  }

  return `Planejado: ${label}`;
}

function formatTimer(totalSeconds) {
  const safeSeconds = Math.max(0, Number(totalSeconds) || 0);

  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;

  if (hours > 0) {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function formatDurationLabel(totalSeconds) {
  const safeSeconds = Math.max(0, Number(totalSeconds) || 0);

  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;

  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}min ${String(seconds).padStart(2, "0")}s`;
  }

  if (hours > 0) {
    return `${hours}h ${String(seconds).padStart(2, "0")}s`;
  }

  if (minutes > 0 && seconds > 0) {
    return `${minutes}min ${String(seconds).padStart(2, "0")}s`;
  }

  if (minutes > 0) {
    return `${minutes}min`;
  }

  return `${seconds}s`;
}

function calculateElapsedSeconds(mission) {
  if (!mission) {
    return 0;
  }

  return Math.max(0, mission.totalSeconds - mission.remainingSeconds);
}

function calculateHistoryElapsedSeconds(mission) {
  if (!mission) {
    return 0;
  }

  if (typeof mission.elapsedSeconds === "number") {
    return mission.elapsedSeconds;
  }

  if (typeof mission.totalSeconds === "number" && typeof mission.remainingSeconds === "number") {
    return Math.max(0, mission.totalSeconds - mission.remainingSeconds);
  }

  return 0;
}

function handleMissionTimeInput() {
  const rawMinutes = parseMissionMinutes(dom.missionTimeInput.value);

  if (!rawMinutes || rawMinutes <= 0) {
    updateTimerPreview();
    return;
  }

  if (rawMinutes > MAX_MISSION_MINUTES) {
    dom.missionTimeInput.value = String(MAX_MISSION_MINUTES);
    setOrientationMessage("Tempo máximo atingido.", `Use até ${formatMinuteLabel(MAX_MISSION_MINUTES)} por missão.`);
  }

  updateTimerPreview();
}

function normalizeMissionTimeInput() {
  const rawMinutes = parseMissionMinutes(dom.missionTimeInput.value);
  const limitedMinutes = limitMissionMinutes(rawMinutes);

  if (!limitedMinutes) {
    dom.missionTimeInput.value = "";
    updateTimerPreview();
    return;
  }

  dom.missionTimeInput.value = formatMinuteLabel(limitedMinutes);
  updateTimerPreview();
}

function prepareMissionTimeEditing() {
  if (state.screen !== APP_STATES.initial) {
    return;
  }

  const minutes = parseMissionMinutes(dom.missionTimeInput.value);
  dom.missionTimeInput.value = minutes ? String(limitMissionMinutes(minutes)) : "";
}

function updateTimerPreview() {
  if (state.screen !== APP_STATES.initial) {
    return;
  }

  const minutes = limitMissionMinutes(parseMissionMinutes(dom.missionTimeInput.value));

  if (!minutes || minutes <= 0) {
    updateTimerDisplay(0);
    return;
  }

  updateTimerDisplay(minutes * 60);
}

function updateTimerDisplay(seconds) {
  dom.timerDisplayText.textContent = formatTimer(seconds);
  dom.timerDisplay.classList.toggle("has-hours", seconds >= 3600);
}

/* =========================================================
   05. Interface e estados visuais
========================================================= */

function setAppState(newState) {
  state.screen = newState;
  dom.body.dataset.screen = newState;

  updateActionLabels();
  updateAddTaskButtonState();
}

function updateOverlayScrollLock() {
  const isHistoryOpen = dom.body.dataset.history === "open";
  const isModalOpen = !dom.modalBackdrop.hidden;
  const isMobileOverlay = window.matchMedia("(max-width: 760px)").matches;

  const shouldLockScroll = isModalOpen || (isHistoryOpen && isMobileOverlay);

  dom.body.classList.toggle("is-overlay-open", shouldLockScroll);
}

function updateActionLabels() {
  const labelsByState = {
    [APP_STATES.initial]: {
      addTask: "Adicionar Tarefa",
      main: "Começar Missão",
      pause: "Pausar/Retomar",
    },
    [APP_STATES.running]: {
      addTask: "Adicionar Tarefa",
      main: "Finalizar Missão!",
      pause: "Pausar",
    },
    [APP_STATES.paused]: {
      addTask: "Adicionar Tarefa",
      main: "Finalizar Missão!",
      pause: "Retomar",
    },
    [APP_STATES.finished]: {
      addTask: "Adicionar Tarefa",
      main: "Nova Missão",
      pause: "Pausar/Retomar",
    },
  };

  const labels = labelsByState[state.screen];

  dom.addTaskButton.textContent = labels.addTask;
  dom.startMissionButton.textContent = labels.main;
  dom.pauseToggleButton.textContent = labels.pause;
}

function resetMissionForm() {
  dom.missionTitleInput.value = "";
  dom.missionTimeInput.value = "";
  dom.missionTitleInput.readOnly = false;
  dom.missionTimeInput.readOnly = false;

  dom.timerDisplay.classList.remove("is-warning", "is-finished");
  updateTimerDisplay(0);
}

/* =========================================================
   06. Tarefas
========================================================= */

function renderTasks(focusTaskId = null) {
  dom.taskList.innerHTML = "";

  if (state.tasks.length === 0) {
    dom.taskList.innerHTML = `
			<li class="task-empty">
				Nenhuma tarefa adicionada.
			</li>
		`;

    updateTaskProgress();
    updateAddTaskButtonState();
    return;
  }

  state.tasks.forEach((task) => {
    const taskItem = createTaskElement(task);

    dom.taskList.appendChild(taskItem);

    const checkbox = taskItem.querySelector('input[type="checkbox"]');
    const taskNameInput = taskItem.querySelector(".task-name");
    const removeButton = taskItem.querySelector(".task-remove");

    checkbox.addEventListener("change", () => {
      updateTaskCompleted(task.id, checkbox.checked);
    });

    taskNameInput.addEventListener("input", () => {
      updateTaskName(task.id, taskNameInput.value);
    });

    taskNameInput.addEventListener("keydown", (event) => {
      handleTaskNameKeydown(event, taskNameInput);
    });

    removeButton.addEventListener("click", () => {
      removeTask(task.id);
    });

    if (task.id === focusTaskId) {
      taskNameInput.focus();
    }
  });

  updateTaskProgress();
  updateAddTaskButtonState();
}

function createTaskElement(task) {
  const taskItem = document.createElement("li");
  taskItem.className = "task-item";
  taskItem.dataset.taskId = task.id;

  if (task.completed) {
    taskItem.classList.add("is-completed");
  }

  taskItem.innerHTML = `
		<label class="task-check">
			<input type="checkbox" ${task.completed ? "checked" : ""} ${state.screen === APP_STATES.finished ? "disabled" : ""} />
			<span></span>
		</label>

		<input
			class="task-name"
			type="text"
			placeholder="Nome Tarefa"
			aria-label="Nome da tarefa"
			value="${escapeHTML(task.name)}"
			${state.screen === APP_STATES.finished ? "readonly" : ""}
		/>

		<button class="task-remove" type="button" aria-label="Remover tarefa">
			x
		</button>
	`;

  return taskItem;
}

function handleTaskNameKeydown(event, taskNameInput) {
  if (event.key !== "Enter") {
    return;
  }

  event.preventDefault();

  if (taskNameInput.value.trim() === "") {
    setOrientationMessage("Antes de adicionar outra tarefa,", "preencha a tarefa atual.");
    taskNameInput.focus();
    return;
  }

  addTask();
}

function updateTaskName(taskId, newName) {
  state.tasks = state.tasks.map((task) => {
    if (task.id !== taskId) {
      return task;
    }

    return {
      ...task,
      name: newName,
    };
  });

  syncActiveMissionTasks();
  saveActiveMissionSnapshot();
}

function updateTaskCompleted(taskId, completed) {
  state.tasks = state.tasks.map((task) => {
    if (task.id !== taskId) {
      return task;
    }

    return {
      ...task,
      completed,
    };
  });

  syncActiveMissionTasks();
  saveActiveMissionSnapshot();
  renderTasks();

  if (state.screen === APP_STATES.running || state.screen === APP_STATES.paused) {
    const completedTasks = state.tasks.filter((task) => task.completed).length;
    const totalTasks = state.tasks.length;

    setOrientationMessage("Missão em andamento...", `${completedTasks}/${totalTasks} tarefas concluídas.`);
  }
}

function addTask() {
  if (state.tasks.length >= MAX_TASKS) {
    setOrientationMessage("Limite recomendado atingido.", "Use até 7 microtarefas por missão.");
    return;
  }

  const newTask = createTask();

  state.tasks.push(newTask);
  syncActiveMissionTasks();
  saveActiveMissionSnapshot();
  renderTasks(newTask.id);

  setOrientationMessage("Nova tarefa adicionada.", "Descreva uma ação curta e objetiva.");
}

function removeTask(taskId) {
  if (state.tasks.length === 1) {
    state.tasks = [createTask()];
    syncActiveMissionTasks();
    saveActiveMissionSnapshot();
    renderTasks(state.tasks[0].id);

    setOrientationMessage("A missão precisa ter", "pelo menos uma tarefa.");
    return;
  }

  state.tasks = state.tasks.filter((task) => task.id !== taskId);

  syncActiveMissionTasks();
  saveActiveMissionSnapshot();
  renderTasks();

  setOrientationMessage("Tarefa removida.", "Mantenha apenas o essencial.");
}

function updateAddTaskButtonState() {
  const reachedLimit = state.tasks.length >= MAX_TASKS;
  const isFinished = state.screen === APP_STATES.finished;

  dom.addTaskButton.disabled = reachedLimit || isFinished;
  dom.addTaskButton.classList.toggle("is-disabled", reachedLimit || isFinished);
}

function updateTaskProgress() {
  const totalTasks = state.tasks.length;
  const completedTasks = state.tasks.filter((task) => task.completed).length;

  dom.taskProgress.textContent = `${completedTasks}/${totalTasks} Concluídas`;
}

function getFilledTasks() {
  return state.tasks
    .map((task) => ({
      ...task,
      name: task.name.trim(),
      completed: false,
    }))
    .filter((task) => task.name !== "");
}

function focusFirstEmptyTask() {
  const firstEmptyTask = state.tasks.find((task) => task.name.trim() === "");

  if (!firstEmptyTask) {
    return;
  }

  renderTasks(firstEmptyTask.id);
}

function syncActiveMissionTasks() {
  if (state.activeMission) {
    state.activeMission.tasks = state.tasks;
  }
}

/* =========================================================
   07. Missões e timer
========================================================= */

function validateMissionCreation() {
  const missionTitle = dom.missionTitleInput.value.trim();
  const rawMissionMinutes = parseMissionMinutes(dom.missionTimeInput.value);
  const missionMinutes = limitMissionMinutes(rawMissionMinutes);
  const filledTasks = getFilledTasks();

  if (missionTitle === "") {
    setOrientationMessage("Dê um nome para sua missão.", "Exemplo: revisar matemática.");
    dom.missionTitleInput.focus();
    return null;
  }

  if (!missionMinutes || missionMinutes <= 0) {
    setOrientationMessage("Defina um tempo válido.", "Use minutos acima de zero.");
    dom.missionTimeInput.focus();
    return null;
  }

  if (rawMissionMinutes > MAX_MISSION_MINUTES) {
    setOrientationMessage("Tempo acima do permitido.", `O máximo é ${formatMinuteLabel(MAX_MISSION_MINUTES)}.`);

    dom.missionTimeInput.value = formatMinuteLabel(MAX_MISSION_MINUTES);
    updateTimerPreview();
    dom.missionTimeInput.focus();

    return null;
  }

  if (filledTasks.length === 0) {
    setOrientationMessage("Adicione pelo menos uma tarefa.", "A missão precisa de ações claras.");
    focusFirstEmptyTask();
    return null;
  }

  return {
    title: missionTitle,
    durationMinutes: missionMinutes,
    totalSeconds: missionMinutes * 60,
    remainingSeconds: missionMinutes * 60,
    tasks: filledTasks,
  };
}

function startMission() {
  const missionData = validateMissionCreation();

  if (!missionData) {
    return;
  }

  clearFinishedMissionSnapshot();
  state.activeMission = {
    ...missionData,
    id: createId(),
    startedAt: new Date().toISOString(),
    finishedAt: null,
    savedToHistory: false,
  };

  state.tasks = state.activeMission.tasks;

  dom.missionTitleInput.value = state.activeMission.title;
  dom.missionTimeInput.value = formatMinuteLabel(state.activeMission.durationMinutes);

  dom.missionTitleInput.readOnly = true;
  dom.missionTimeInput.readOnly = true;

  dom.timerDisplay.classList.remove("is-warning", "is-finished");

  setAppState(APP_STATES.running);
  renderTasks();
  updateTimerDisplay(state.activeMission.remainingSeconds);
  startCountdown();

  setOrientationMessage("Missão em andamento...", "Foco na conclusão!");
  saveActiveMissionSnapshot();
}

function startCountdown() {
  stopCountdown();

  state.countdownDeadline = Date.now() + state.activeMission.remainingSeconds * 1000;

  state.countdownInterval = setInterval(() => {
    const remainingSeconds = Math.max(0, Math.ceil((state.countdownDeadline - Date.now()) / 1000));

    state.activeMission.remainingSeconds = remainingSeconds;
    updateTimerDisplay(remainingSeconds);

    dom.timerDisplay.classList.toggle("is-warning", remainingSeconds <= 60 && remainingSeconds > 0);

    if (remainingSeconds === 0) {
      handleTimeFinished();
    }
  }, 250);
}

function stopCountdown() {
  if (!state.countdownInterval) {
    return;
  }

  clearInterval(state.countdownInterval);
  state.countdownInterval = null;
}

function togglePauseMission() {
  if (!state.activeMission) {
    return;
  }

  if (state.screen === APP_STATES.running) {
    stopCountdown();
    setAppState(APP_STATES.paused);
    saveActiveMissionSnapshot();
    setOrientationMessage("Missão pausada.", "Retome quando estiver pronto.");
    return;
  }

  if (state.screen === APP_STATES.paused) {
    setAppState(APP_STATES.running);
    startCountdown();
    saveActiveMissionSnapshot();
    setOrientationMessage("Missão retomada.", "Volte para a execução.");
  }
}

function restartMission() {
  if (!state.activeMission) {
    return;
  }

  state.activeMission.remainingSeconds = state.activeMission.totalSeconds;

  state.tasks = state.tasks.map((task) => ({
    ...task,
    completed: false,
  }));

  syncActiveMissionTasks();

  dom.timerDisplay.classList.remove("is-warning", "is-finished");

  setAppState(APP_STATES.running);
  renderTasks();
  updateTimerDisplay(state.activeMission.remainingSeconds);
  startCountdown();

  setOrientationMessage("Missão reiniciada.", "Comece novamente com calma.");
  saveActiveMissionSnapshot();
}

function cancelMission() {
  stopCountdown();
  clearActiveMissionSnapshot();
  clearFinishedMissionSnapshot();

  state.activeMission = null;
  state.tasks = [createTask(), createTask(), createTask()];

  resetMissionForm();
  setAppState(APP_STATES.initial);
  renderTasks();

  setOrientationMessage("Missão cancelada.", "Crie uma nova quando quiser.");
}

function finishMission(reason = FINISH_REASONS.manual) {
  if (!state.activeMission) {
    return;
  }

  stopCountdown();
  clearActiveMissionSnapshot();

  state.activeMission.finishedAt = new Date().toISOString();
  state.activeMission.finishReason = reason;
  state.activeMission.completedTasks = state.tasks.filter((task) => task.completed).length;
  state.activeMission.totalTasks = state.tasks.length;
  state.activeMission.tasks = state.tasks;
  state.activeMission.elapsedSeconds = calculateElapsedSeconds(state.activeMission);

  saveMissionToHistory(state.activeMission);

  state.lastFinishedMission = cloneData(state.activeMission);
  saveFinishedMissionSnapshot(state.lastFinishedMission);

  dom.timerDisplay.classList.remove("is-warning");
  dom.timerDisplay.classList.add("is-finished");

  setAppState(APP_STATES.finished);
  renderTasks();
  updateTaskProgress();

  if (reason === FINISH_REASONS.timeEnded) {
    setOrientationMessage("Tempo encerrado!", "Missão adicionada ao histórico.");
    return;
  }

  setOrientationMessage("Missão concluída!", "Missão adicionada ao histórico.");
}

function resetToNewMission() {
  stopCountdown();
  clearActiveMissionSnapshot();
  clearFinishedMissionSnapshot();

  state.activeMission = null;
  state.tasks = [createTask(), createTask(), createTask()];

  resetMissionForm();
  setAppState(APP_STATES.initial);
  renderTasks();

  setOrientationMessage("Defina sua missão, escolha o tempo", "e organize pequenas tarefas.");
}

function handleTimeFinished() {
  finishMission(FINISH_REASONS.timeEnded);
}

function repeatLastMission() {
  if (!state.lastFinishedMission) {
    setOrientationMessage("Nenhuma missão finalizada.", "Finalize uma missão antes de repetir.");
    return;
  }

  startRepeatedMissionFromData(state.lastFinishedMission, "Missão repetida.", "Execute novamente com foco.");
}

function startRepeatedMissionFromData(missionData, line1, line2) {
  stopCountdown();
  clearFinishedMissionSnapshot();

  state.activeMission = {
    id: createId(),
    title: missionData.title,
    durationMinutes: missionData.durationMinutes,
    totalSeconds: missionData.totalSeconds,
    remainingSeconds: missionData.totalSeconds,
    startedAt: new Date().toISOString(),
    finishedAt: null,
    finishReason: null,
    savedToHistory: false,
    tasks: missionData.tasks.map((task) => ({
      id: createId(),
      name: task.name,
      completed: false,
    })),
  };

  state.tasks = state.activeMission.tasks;

  dom.missionTitleInput.value = state.activeMission.title;
  dom.missionTimeInput.value = formatMinuteLabel(state.activeMission.durationMinutes);

  dom.missionTitleInput.readOnly = true;
  dom.missionTimeInput.readOnly = true;

  dom.timerDisplay.classList.remove("is-warning", "is-finished");

  setAppState(APP_STATES.running);
  renderTasks();
  updateTimerDisplay(state.activeMission.remainingSeconds);
  startCountdown();

  setOrientationMessage(line1, line2);
  saveActiveMissionSnapshot();
}

/* =========================================================
   08. Armazenamento local
========================================================= */

function getStorageList(key) {
  const rawData = localStorage.getItem(key);

  if (!rawData) {
    return [];
  }

  try {
    const parsedData = JSON.parse(rawData);
    return Array.isArray(parsedData) ? parsedData : [];
  } catch (error) {
    console.error("Erro ao ler dados locais:", error);
    return [];
  }
}

function saveStorageList(key, list) {
  localStorage.setItem(key, JSON.stringify(list));
}

function getStorageItem(key, fallback = null) {
  const rawData = localStorage.getItem(key);

  if (!rawData) {
    return fallback;
  }

  try {
    return JSON.parse(rawData);
  } catch (error) {
    console.error("Erro ao ler item local:", error);
    return fallback;
  }
}

function saveStorageItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function removeStorageItem(key) {
  localStorage.removeItem(key);
}

function saveActiveMissionSnapshot() {
  if (!state.activeMission) {
    removeStorageItem(STORAGE_KEYS.activeMission);
    return;
  }

  if (state.screen === APP_STATES.initial || state.screen === APP_STATES.finished) {
    removeStorageItem(STORAGE_KEYS.activeMission);
    return;
  }

  const remainingSeconds =
    state.screen === APP_STATES.running && state.countdownDeadline
      ? Math.max(0, Math.ceil((state.countdownDeadline - Date.now()) / 1000))
      : state.activeMission.remainingSeconds;

  const snapshot = {
    screen: state.screen,
    countdownDeadline: state.screen === APP_STATES.running ? Date.now() + remainingSeconds * 1000 : null,
    savedAt: new Date().toISOString(),
    mission: {
      ...state.activeMission,
      remainingSeconds,
      tasks: state.tasks.map((task) => ({
        id: task.id,
        name: task.name,
        completed: task.completed,
      })),
    },
  };

  saveStorageItem(STORAGE_KEYS.activeMission, snapshot);
}

function clearActiveMissionSnapshot() {
  removeStorageItem(STORAGE_KEYS.activeMission);
}

function restoreActiveMissionSnapshot() {
  const snapshot = getStorageItem(STORAGE_KEYS.activeMission);

  if (!snapshot || !snapshot.mission) {
    return false;
  }

  if (![APP_STATES.running, APP_STATES.paused].includes(snapshot.screen)) {
    clearActiveMissionSnapshot();
    return false;
  }

  const restoredMission = snapshot.mission;

  if (!restoredMission.title || !restoredMission.durationMinutes || !Array.isArray(restoredMission.tasks)) {
    clearActiveMissionSnapshot();
    return false;
  }

  let remainingSeconds = Number(restoredMission.remainingSeconds) || 0;

  if (snapshot.screen === APP_STATES.running && snapshot.countdownDeadline) {
    remainingSeconds = Math.max(0, Math.ceil((snapshot.countdownDeadline - Date.now()) / 1000));
  }

  state.activeMission = {
    ...restoredMission,
    remainingSeconds,
    savedToHistory: false,
  };

  state.tasks = restoredMission.tasks.map((task) => ({
    id: task.id || createId(),
    name: task.name || "",
    completed: Boolean(task.completed),
  }));

  state.activeMission.tasks = state.tasks;

  dom.missionTitleInput.value = state.activeMission.title;
  dom.missionTimeInput.value = formatMinuteLabel(state.activeMission.durationMinutes);

  dom.missionTitleInput.readOnly = true;
  dom.missionTimeInput.readOnly = true;

  dom.timerDisplay.classList.remove("is-warning", "is-finished");

  renderTasks();
  updateTimerDisplay(state.activeMission.remainingSeconds);

  if (remainingSeconds <= 0) {
    finishMission(FINISH_REASONS.timeEnded);
    return true;
  }

  if (snapshot.screen === APP_STATES.paused) {
    setAppState(APP_STATES.paused);
    setOrientationMessage("Missão recuperada pausada.", "Retome quando estiver pronto.");
    return true;
  }

  setAppState(APP_STATES.running);
  startCountdown();

  setOrientationMessage("Missão recuperada.", "Continue de onde parou.");

  return true;
}

function saveFinishedMissionSnapshot(mission) {
  if (!mission) {
    clearFinishedMissionSnapshot();
    return;
  }

  const snapshot = {
    screen: APP_STATES.finished,
    savedAt: new Date().toISOString(),
    mission: {
      ...mission,
      tasks: mission.tasks.map((task) => ({
        id: task.id,
        name: task.name,
        completed: task.completed,
      })),
    },
  };

  saveStorageItem(STORAGE_KEYS.finishedMission, snapshot);
}

function clearFinishedMissionSnapshot() {
  removeStorageItem(STORAGE_KEYS.finishedMission);
}

function restoreFinishedMissionSnapshot() {
  const snapshot = getStorageItem(STORAGE_KEYS.finishedMission);

  if (!snapshot || !snapshot.mission) {
    return false;
  }

  const restoredMission = snapshot.mission;

  if (!restoredMission.title || !restoredMission.durationMinutes || !Array.isArray(restoredMission.tasks)) {
    clearFinishedMissionSnapshot();
    return false;
  }

  state.activeMission = {
    ...restoredMission,
    savedToHistory: true,
  };

  state.lastFinishedMission = cloneData(restoredMission);

  state.tasks = restoredMission.tasks.map((task) => ({
    id: task.id || createId(),
    name: task.name || "",
    completed: Boolean(task.completed),
  }));

  state.activeMission.tasks = state.tasks;

  dom.missionTitleInput.value = state.activeMission.title;
  dom.missionTimeInput.value = formatMinuteLabel(state.activeMission.durationMinutes);

  dom.missionTitleInput.readOnly = true;
  dom.missionTimeInput.readOnly = true;

  dom.timerDisplay.classList.remove("is-warning");
  dom.timerDisplay.classList.add("is-finished");

  updateTimerDisplay(state.activeMission.remainingSeconds || 0);

  setAppState(APP_STATES.finished);
  renderTasks();
  updateTaskProgress();

  setOrientationMessage("Missão finalizada recuperada.", "Você pode criar uma nova ou repetir.");

  return true;
}

function saveCurrentScreenSnapshot() {
  if (state.screen === APP_STATES.finished && state.lastFinishedMission) {
    saveFinishedMissionSnapshot(state.lastFinishedMission);
    return;
  }

  saveActiveMissionSnapshot();
}

/* =========================================================
   09. Histórico
========================================================= */

function saveMissionToHistory(mission) {
  if (mission.savedToHistory) {
    return;
  }

  const history = getStorageList(STORAGE_KEYS.history);

  const historyItem = {
    id: mission.id,
    title: mission.title,
    durationMinutes: mission.durationMinutes,
    remainingSeconds: mission.remainingSeconds,
    totalSeconds: mission.totalSeconds,
    elapsedSeconds: mission.elapsedSeconds,
    completedTasks: mission.completedTasks,
    totalTasks: mission.totalTasks,
    tasks: mission.tasks.map((task) => ({
      id: task.id,
      name: task.name,
      completed: task.completed,
    })),
    startedAt: mission.startedAt,
    finishedAt: mission.finishedAt,
    finishReason: mission.finishReason,
  };

  history.unshift(historyItem);

  saveStorageList(STORAGE_KEYS.history, history.slice(0, 30));

  mission.savedToHistory = true;

  refreshHistoryIfOpen();
}

function setHistoryOpen(isOpen) {
  dom.body.dataset.history = isOpen ? "open" : "closed";

  updateOverlayScrollLock();

  if (isOpen) {
    renderHistoryPanel();
    setOrientationMessage("Histórico aberto.", "Você pode repetir missões anteriores.");
    return;
  }

  setOrientationMessage("Histórico fechado.", "Volte para sua missão atual.");
}

function toggleHistoryPanel() {
  const isOpen = dom.body.dataset.history === "open";
  setHistoryOpen(!isOpen);
}

function renderHistoryPanel() {
  const history = getStorageList(STORAGE_KEYS.history);

  dom.historyList.innerHTML = "";

  if (history.length === 0) {
    dom.historyList.innerHTML = `
			<p class="history-empty">Nenhuma missão no histórico.</p>
		`;
    return;
  }

  history.forEach((mission) => {
    const historyCard = createHistoryCard(mission);
    dom.historyList.appendChild(historyCard);
  });
}

function createHistoryCard(mission) {
  const historyCard = document.createElement("article");
  historyCard.className = "history-card";
  historyCard.dataset.historyId = mission.id;

  const formattedDate = formatHistoryDate(mission.finishedAt);
  const formattedTime = formatHistoryTime(mission.finishedAt);
  const elapsedSeconds = mission.elapsedSeconds ?? calculateHistoryElapsedSeconds(mission);
  const usedTimeLabel = formatDurationLabel(elapsedSeconds);

  historyCard.innerHTML = `
		<div class="history-card__top">
			<div>
				<h3 class="history-card__title">${escapeHTML(mission.title)}</h3>
			</div>

			<div class="history-card__date">
				<span>${formattedDate}</span>
				<span>${formattedTime}</span>
			</div>
		</div>

		<div class="history-card__meta">
			<span>${mission.completedTasks}/${mission.totalTasks} tarefas concluídas</span>
			<span>${formatPlannedTimeLabel(mission.durationMinutes)}</span>
			<span>${usedTimeLabel} usados</span>
		</div>

		<div class="history-card__actions">
			<button class="button button--secondary history-repeat-button" type="button">
				Repetir Missão
			</button>

			<button class="button button--danger history-delete-button" type="button" aria-label="Excluir missão do histórico">
				X
			</button>
		</div>
	`;

  const repeatButton = historyCard.querySelector(".history-repeat-button");
  const deleteButton = historyCard.querySelector(".history-delete-button");

  repeatButton.addEventListener("click", () => {
    repeatMissionFromHistory(mission.id);
  });

  deleteButton.addEventListener("click", () => {
    deleteHistoryItem(mission.id);
  });

  return historyCard;
}

function formatHistoryDate(isoDate) {
  if (!isoDate) {
    return "--/--";
  }

  return new Date(isoDate).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  });
}

function formatHistoryTime(isoDate) {
  if (!isoDate) {
    return "--:--";
  }

  return new Date(isoDate).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function repeatMissionFromHistory(historyId) {
  if (state.screen === APP_STATES.running || state.screen === APP_STATES.paused) {
    setOrientationMessage("Finalize ou cancele a missão atual", "antes de repetir outra missão.");
    return;
  }

  const history = getStorageList(STORAGE_KEYS.history);
  const selectedMission = history.find((mission) => mission.id === historyId);

  if (!selectedMission) {
    setOrientationMessage("Missão não encontrada.", "O histórico pode ter sido atualizado.");
    renderHistoryPanel();
    return;
  }

  state.lastFinishedMission = cloneData(selectedMission);

  startRepeatedMissionFromData(selectedMission, "Missão repetida do histórico.", "Execute novamente com foco.");
}

function deleteHistoryItem(historyId) {
  requestDangerConfirmation("delete-history-item", () => {
    const history = getStorageList(STORAGE_KEYS.history);
    const updatedHistory = history.filter((mission) => mission.id !== historyId);

    saveStorageList(STORAGE_KEYS.history, updatedHistory);
    renderHistoryPanel();

    setOrientationMessage("Item removido do histórico.", "O restante foi mantido.");
  });
}

function clearHistory() {
  requestDangerConfirmation("clear-history", () => {
    saveStorageList(STORAGE_KEYS.history, []);
    renderHistoryPanel();

    setOrientationMessage("Histórico apagado.", "As missões anteriores foram removidas.");
  });
}

function isHistoryOpen() {
  return dom.body.dataset.history === "open";
}

function refreshHistoryIfOpen() {
  if (!isHistoryOpen()) {
    return;
  }

  renderHistoryPanel();
}

/* =========================================================
   10. Modais
========================================================= */

function openModal(modalElement) {
  dom.modalBackdrop.hidden = false;

  dom.confirmModal.hidden = true;
  dom.templatesModal.hidden = true;

  modalElement.hidden = false;

  updateOverlayScrollLock();
}

function closeModals() {
  dom.modalBackdrop.hidden = true;
  dom.confirmModal.hidden = true;
  dom.templatesModal.hidden = true;
  state.pendingConfirmAction = null;

  updateOverlayScrollLock();
}

function openConfirmModal({ title, message, confirmLabel = "Confirmar", onConfirm }) {
  state.pendingConfirmAction = onConfirm;

  dom.confirmModalTitle.textContent = title;
  dom.confirmModalMessage.textContent = message;
  dom.confirmModalConfirm.textContent = confirmLabel;

  openModal(dom.confirmModal);
}

function requestDangerConfirmation(actionName, callback) {
  const config = DANGER_CONFIRM_MESSAGES[actionName] ?? {
    title: "Confirmar ação",
    message: "Tem certeza que deseja continuar?",
    confirmLabel: "Confirmar",
  };

  openConfirmModal({
    title: config.title,
    message: config.message,
    confirmLabel: config.confirmLabel,
    onConfirm: callback,
  });
}

/* =========================================================
   11. Modelos
========================================================= */

function saveCurrentMissionAsTemplate() {
  if (!state.activeMission) {
    setOrientationMessage("Nenhuma missão disponível.", "Finalize ou crie uma missão primeiro.");
    return;
  }

  const templates = getStorageList(STORAGE_KEYS.templates);

  const template = {
    id: createId(),
    title: state.activeMission.title,
    durationMinutes: state.activeMission.durationMinutes,
    tasks: state.activeMission.tasks.map((task) => ({
      id: createId(),
      name: task.name,
      completed: false,
    })),
    createdAt: new Date().toISOString(),
  };

  templates.unshift(template);
  saveStorageList(STORAGE_KEYS.templates, templates.slice(0, 20));

  setOrientationMessage("Modelo salvo com sucesso.", "Você poderá reutilizá-lo depois.");

  openTemplatesModal();
}

function openTemplatesModal() {
  renderTemplatesModal();
  openModal(dom.templatesModal);

  setOrientationMessage("Modelos abertos.", "Escolha uma missão salva para reutilizar.");
}

function renderTemplatesModal() {
  const templates = getStorageList(STORAGE_KEYS.templates);

  dom.templateList.innerHTML = "";

  if (templates.length === 0) {
    dom.templateList.innerHTML = `
			<p class="modal-empty">Nenhum modelo salvo ainda.</p>
		`;
    return;
  }

  templates.forEach((template) => {
    const templateCard = createTemplateCard(template);
    dom.templateList.appendChild(templateCard);
  });
}

function createTemplateCard(template) {
  const templateCard = document.createElement("article");
  templateCard.className = "template-card";
  templateCard.dataset.templateId = template.id;

  const formattedDate = template.createdAt ? new Date(template.createdAt).toLocaleDateString("pt-BR") : "--/--/----";

  templateCard.innerHTML = `
		<div class="template-card__top">
			<h3 class="template-card__title">${escapeHTML(template.title)}</h3>
			<span>${formattedDate}</span>
		</div>

		<div class="template-card__meta">
			<span>${formatPlannedTimeLabel(template.durationMinutes)}</span>
			<span>${template.tasks.length} tarefa(s)</span>
		</div>

		<div class="template-card__actions">
			<button class="button button--secondary template-use-button" type="button">
				Usar Modelo
			</button>

			<button class="button button--danger template-delete-button" type="button">
				X
			</button>
		</div>
	`;

  const useButton = templateCard.querySelector(".template-use-button");
  const deleteButton = templateCard.querySelector(".template-delete-button");

  useButton.addEventListener("click", () => {
    useTemplate(template.id);
  });

  deleteButton.addEventListener("click", () => {
    deleteTemplate(template.id);
  });

  return templateCard;
}

function useTemplate(templateId) {
  if (state.screen === APP_STATES.running || state.screen === APP_STATES.paused) {
    setOrientationMessage("Finalize ou cancele a missão atual", "antes de usar um modelo.");
    return;
  }

  const templates = getStorageList(STORAGE_KEYS.templates);
  const selectedTemplate = templates.find((template) => template.id === templateId);

  if (!selectedTemplate) {
    setOrientationMessage("Modelo não encontrado.", "A lista será atualizada.");
    renderTemplatesModal();
    return;
  }

  stopCountdown();
  clearFinishedMissionSnapshot();

  state.activeMission = null;
  state.tasks = selectedTemplate.tasks.map((task) => ({
    id: createId(),
    name: task.name,
    completed: false,
  }));

  dom.missionTitleInput.value = selectedTemplate.title;
  dom.missionTimeInput.value = formatMinuteLabel(selectedTemplate.durationMinutes);

  dom.missionTitleInput.readOnly = false;
  dom.missionTimeInput.readOnly = false;

  dom.timerDisplay.classList.remove("is-warning", "is-finished");
  updateTimerDisplay(selectedTemplate.durationMinutes * 60);

  setAppState(APP_STATES.initial);
  renderTasks();
  closeModals();

  setOrientationMessage("Modelo carregado.", "Revise e comece a missão.");
}

function deleteTemplate(templateId) {
  requestDangerConfirmation("delete-template", () => {
    const templates = getStorageList(STORAGE_KEYS.templates);
    const updatedTemplates = templates.filter((template) => template.id !== templateId);

    saveStorageList(STORAGE_KEYS.templates, updatedTemplates);
    renderTemplatesModal();

    setOrientationMessage("Modelo excluído.", "Os outros modelos foram mantidos.");
  });
}

/* =========================================================
   12. Eventos
========================================================= */

function bindEvents() {
  dom.missionForm.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  dom.addTaskButton.addEventListener("click", addTask);

  dom.startMissionButton.addEventListener("click", handleMainActionClick);

  dom.pauseToggleButton.addEventListener("click", togglePauseMission);

  dom.restartMissionButton.addEventListener("click", () => {
    requestDangerConfirmation("restart", restartMission);
  });

  dom.cancelMissionButton.addEventListener("click", () => {
    requestDangerConfirmation("cancel", cancelMission);
  });

  dom.clearCurrentMissionButton.addEventListener("click", () => {
    requestDangerConfirmation("clear-current", resetToNewMission);
  });

  dom.repeatMissionButton.addEventListener("click", repeatLastMission);
  dom.saveTemplateButton.addEventListener("click", saveCurrentMissionAsTemplate);

  dom.historyButton.addEventListener("click", toggleHistoryPanel);

  dom.closeHistoryButton.addEventListener("click", () => {
    setHistoryOpen(false);
  });

  dom.clearHistoryButton.addEventListener("click", clearHistory);

  dom.templatesButton.addEventListener("click", openTemplatesModal);

  dom.templatesModalClose.addEventListener("click", closeModals);
  dom.confirmModalClose.addEventListener("click", closeModals);
  dom.confirmModalCancel.addEventListener("click", closeModals);

  dom.confirmModalConfirm.addEventListener("click", () => {
    if (typeof state.pendingConfirmAction === "function") {
      state.pendingConfirmAction();
    }

    closeModals();
  });

  dom.modalBackdrop.addEventListener("click", (event) => {
    if (event.target === dom.modalBackdrop) {
      closeModals();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !dom.modalBackdrop.hidden) {
      closeModals();
    }
  });

  dom.missionTimeInput.addEventListener("input", handleMissionTimeInput);

  dom.missionTitleInput.addEventListener("focus", () => {
    if (state.screen !== APP_STATES.initial) {
      return;
    }

    setOrientationMessage("Nomeie sua missão.", "Seja direto e específico.");
  });

  dom.missionTimeInput.addEventListener("blur", normalizeMissionTimeInput);

  dom.missionTimeInput.addEventListener("focus", () => {
    if (state.screen !== APP_STATES.initial) {
      return;
    }

    prepareMissionTimeEditing();
    setOrientationMessage("Escolha um tempo limite.", "Comece com blocos pequenos.");
  });

  window.addEventListener("beforeunload", () => {
    saveCurrentScreenSnapshot();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      saveCurrentScreenSnapshot();
    }
  });

  window.addEventListener("resize", updateOverlayScrollLock);
}

function handleMainActionClick() {
  if (state.screen === APP_STATES.initial) {
    startMission();
    return;
  }

  if (state.screen === APP_STATES.running || state.screen === APP_STATES.paused) {
    finishMission(FINISH_REASONS.manual);
    return;
  }

  if (state.screen === APP_STATES.finished) {
    resetToNewMission();
  }
}

/* =========================================================
   13. Inicialização
========================================================= */

function initApp() {
  bindEvents();

  dom.body.dataset.history = "closed";
  updateOverlayScrollLock();

  const restoredActiveMission = restoreActiveMissionSnapshot();

  if (restoredActiveMission) {
    return;
  }

  const restoredFinishedMission = restoreFinishedMissionSnapshot();

  if (restoredFinishedMission) {
    return;
  }

  renderTasks();
  updateTimerPreview();
  setAppState(APP_STATES.initial);
}

initApp();

console.log("Time-Task iniciado.");

const body = document.body;

const missionForm = document.querySelector(".mission-form");
const missionTitleInput = document.querySelector("#mission-title");
const missionTimeInput = document.querySelector("#mission-time");
const timerDisplay = document.querySelector(".timer-display");
const timerDisplayText = document.querySelector(".timer-display span");

const taskListElement = document.querySelector("#task-list");
const taskProgressElement = document.querySelector("#task-progress");

const addTaskButton = document.querySelector("#add-task-button");
const startMissionButton = document.querySelector("#start-mission-button");

const historyButton = document.querySelector("#history-button");
const pauseToggleButton = document.querySelector("#pause-toggle-button");
const restartMissionButton = document.querySelector("#restart-mission-button");
const cancelMissionButton = document.querySelector("#cancel-mission-button");

const clearCurrentMissionButton = document.querySelector("#clear-current-mission-button");
const repeatMissionButton = document.querySelector("#repeat-mission-button");
const saveTemplateButton = document.querySelector("#save-template-button");

const orientationLine1 = document.querySelector("#orientation-line-1");
const orientationLine2 = document.querySelector("#orientation-line-2");

const MAX_TASKS = 7;
const STORAGE_KEYS = {
  history: "time-task:history",
  templates: "time-task:templates",
};

let appState = "initial";
let countdownInterval = null;
let countdownDeadline = null;
let pendingDangerAction = null;
let pendingDangerTimeout = null;

let activeMission = null;
let lastFinishedMission = null;

let tasks = [createTask(""), createTask(""), createTask("")];

function createTask(name = "") {
  return {
    id: createId(),
    name,
    completed: false,
  };
}

function createId() {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `task-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function setOrientationMessage(line1, line2) {
  orientationLine1.textContent = line1;
  orientationLine2.textContent = line2;
}

function setAppState(newState) {
  appState = newState;
  body.dataset.screen = newState;

  updateActionLabels();
  updateAddTaskButtonState();
}

function updateActionLabels() {
  if (appState === "initial") {
    addTaskButton.textContent = "Adicionar Tarefa";
    startMissionButton.textContent = "Começar Missão";
    pauseToggleButton.textContent = "Pausar/Retomar";
    return;
  }

  if (appState === "running") {
    addTaskButton.textContent = "Adicionar Tarefa";
    startMissionButton.textContent = "Finalizar Missão!";
    pauseToggleButton.textContent = "Pausar";
    return;
  }

  if (appState === "paused") {
    addTaskButton.textContent = "Adicionar Tarefa";
    startMissionButton.textContent = "Finalizar Missão!";
    pauseToggleButton.textContent = "Retomar";
    return;
  }

  if (appState === "finished") {
    addTaskButton.textContent = "Adicionar Tarefa";
    startMissionButton.textContent = "Nova Missão";
    pauseToggleButton.textContent = "Pausar/Retomar";
  }
}

function parseMissionMinutes(value) {
  const onlyNumbers = String(value).replace(/\D/g, "");
  return Number(onlyNumbers);
}

function formatTime(totalSeconds) {
  const safeSeconds = Math.max(0, totalSeconds);

  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateTimerPreview() {
  if (appState !== "initial") {
    return;
  }

  const minutes = parseMissionMinutes(missionTimeInput.value);

  if (!minutes || minutes <= 0) {
    timerDisplayText.textContent = "00:00";
    return;
  }

  timerDisplayText.textContent = formatTime(minutes * 60);
}

function renderTasks(focusTaskId = null) {
  taskListElement.innerHTML = "";

  if (tasks.length === 0) {
    taskListElement.innerHTML = `
      <li class="task-empty">
        Nenhuma tarefa adicionada.
      </li>
    `;

    updateTaskProgress();
    updateAddTaskButtonState();
    return;
  }

  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";

    if (task.completed) {
      taskItem.classList.add("is-completed");
    }

    taskItem.dataset.taskId = task.id;

    taskItem.innerHTML = `
      <label class="task-check">
        <input type="checkbox" ${task.completed ? "checked" : ""} />
        <span></span>
      </label>

      <input
        class="task-name"
        type="text"
        placeholder="Nome Tarefa"
        aria-label="Nome da tarefa"
        value="${escapeHTML(task.name)}"
      />

      <button class="task-remove" type="button" aria-label="Remover tarefa">
        x
      </button>
    `;

    taskListElement.appendChild(taskItem);

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

function updateTaskName(taskId, newName) {
  tasks = tasks.map((task) => {
    if (task.id !== taskId) {
      return task;
    }

    return {
      ...task,
      name: newName,
    };
  });

  if (activeMission) {
    activeMission.tasks = tasks;
  }
}

function updateTaskCompleted(taskId, completed) {
  tasks = tasks.map((task) => {
    if (task.id !== taskId) {
      return task;
    }

    return {
      ...task,
      completed,
    };
  });

  if (activeMission) {
    activeMission.tasks = tasks;
  }

  renderTasks();

  if (appState === "running" || appState === "paused") {
    const completedTasks = tasks.filter((task) => task.completed).length;
    const totalTasks = tasks.length;

    setOrientationMessage("Missão em andamento...", `${completedTasks}/${totalTasks} tarefas concluídas.`);
  }
}

function addTask() {
  if (tasks.length >= MAX_TASKS) {
    setOrientationMessage("Limite recomendado atingido.", "Use até 7 microtarefas por missão.");
    return;
  }

  const newTask = createTask();

  tasks.push(newTask);

  if (activeMission) {
    activeMission.tasks = tasks;
  }

  renderTasks(newTask.id);

  setOrientationMessage("Nova tarefa adicionada.", "Descreva uma ação curta e objetiva.");
}

function removeTask(taskId) {
  if (tasks.length === 1) {
    tasks = [createTask("")];

    if (activeMission) {
      activeMission.tasks = tasks;
    }

    renderTasks(tasks[0].id);

    setOrientationMessage("A missão precisa ter", "pelo menos uma tarefa.");
    return;
  }

  tasks = tasks.filter((task) => task.id !== taskId);

  if (activeMission) {
    activeMission.tasks = tasks;
  }

  renderTasks();

  setOrientationMessage("Tarefa removida.", "Mantenha apenas o essencial.");
}

function updateAddTaskButtonState() {
  const reachedLimit = tasks.length >= MAX_TASKS;
  const isFinished = appState === "finished";

  addTaskButton.disabled = reachedLimit || isFinished;
  addTaskButton.classList.toggle("is-disabled", reachedLimit || isFinished);
}

function getFilledTasks() {
  return tasks
    .map((task) => ({
      ...task,
      name: task.name.trim(),
      completed: false,
    }))
    .filter((task) => task.name !== "");
}

function validateMissionCreation() {
  const missionTitle = missionTitleInput.value.trim();
  const missionMinutes = parseMissionMinutes(missionTimeInput.value);
  const filledTasks = getFilledTasks();

  if (missionTitle === "") {
    setOrientationMessage("Dê um nome para sua missão.", "Exemplo: revisar matemática.");
    missionTitleInput.focus();
    return null;
  }

  if (!missionMinutes || missionMinutes <= 0) {
    setOrientationMessage("Defina um tempo válido.", "Use minutos acima de zero.");
    missionTimeInput.focus();
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

  activeMission = {
    ...missionData,
    id: createId(),
    startedAt: new Date().toISOString(),
    finishedAt: null,
    savedToHistory: false,
  };

  tasks = activeMission.tasks;

  missionTitleInput.value = activeMission.title;
  missionTimeInput.value = `${activeMission.durationMinutes} minutos`;

  missionTitleInput.readOnly = true;
  missionTimeInput.readOnly = true;

  timerDisplay.classList.remove("is-warning", "is-finished");

  setAppState("running");
  renderTasks();
  updateTimerDisplay(activeMission.remainingSeconds);
  startCountdown();

  setOrientationMessage("Missão em andamento...", "Foco na conclusão!");
}

function startCountdown() {
  stopCountdown();

  countdownDeadline = Date.now() + activeMission.remainingSeconds * 1000;

  countdownInterval = setInterval(() => {
    const remainingSeconds = Math.max(0, Math.ceil((countdownDeadline - Date.now()) / 1000));

    activeMission.remainingSeconds = remainingSeconds;
    updateTimerDisplay(remainingSeconds);

    if (remainingSeconds <= 60 && remainingSeconds > 0) {
      timerDisplay.classList.add("is-warning");
    }

    if (remainingSeconds === 0) {
      handleTimeFinished();
    }
  }, 250);
}

function stopCountdown() {
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
}

function updateTimerDisplay(seconds) {
  timerDisplayText.textContent = formatTime(seconds);
}

function togglePauseMission() {
  if (!activeMission) {
    return;
  }

  if (appState === "running") {
    stopCountdown();
    setAppState("paused");
    setOrientationMessage("Missão pausada.", "Retome quando estiver pronto.");
    return;
  }

  if (appState === "paused") {
    setAppState("running");
    startCountdown();
    setOrientationMessage("Missão retomada.", "Volte para a execução.");
  }
}

function restartMission() {
  if (!activeMission) {
    return;
  }

  activeMission.remainingSeconds = activeMission.totalSeconds;

  tasks = tasks.map((task) => ({
    ...task,
    completed: false,
  }));

  activeMission.tasks = tasks;

  timerDisplay.classList.remove("is-warning", "is-finished");

  setAppState("running");
  renderTasks();
  updateTimerDisplay(activeMission.remainingSeconds);
  startCountdown();

  setOrientationMessage("Missão reiniciada.", "Comece novamente com calma.");
}

function cancelMission() {
  stopCountdown();

  activeMission = null;
  tasks = [createTask(""), createTask(""), createTask("")];

  missionTitleInput.value = "";
  missionTimeInput.value = "";
  missionTitleInput.readOnly = false;
  missionTimeInput.readOnly = false;

  timerDisplay.classList.remove("is-warning", "is-finished");
  timerDisplayText.textContent = "00:00";

  setAppState("initial");
  renderTasks();

  setOrientationMessage("Missão cancelada.", "Crie uma nova quando quiser.");
}

function finishMission(reason = "manual") {
  if (!activeMission) {
    return;
  }

  stopCountdown();

  activeMission.finishedAt = new Date().toISOString();
  activeMission.finishReason = reason;
  activeMission.completedTasks = tasks.filter((task) => task.completed).length;
  activeMission.totalTasks = tasks.length;
  activeMission.tasks = tasks;

  saveMissionToHistory(activeMission);

  lastFinishedMission = structuredClone(activeMission);

  timerDisplay.classList.remove("is-warning");
  timerDisplay.classList.add("is-finished");

  setAppState("finished");
  renderTasks();
  updateTaskProgress();

  if (reason === "time-ended") {
    setOrientationMessage("Tempo encerrado!", "Missão adicionada ao histórico.");
    return;
  }

  setOrientationMessage("Missão concluída!", "Missão adicionada ao histórico.");
}

function resetToNewMission() {
  stopCountdown();

  activeMission = null;

  tasks = [createTask(""), createTask(""), createTask("")];

  missionTitleInput.value = "";
  missionTimeInput.value = "";
  missionTitleInput.readOnly = false;
  missionTimeInput.readOnly = false;

  timerDisplay.classList.remove("is-warning", "is-finished");
  timerDisplayText.textContent = "00:00";

  setAppState("initial");
  renderTasks();

  setOrientationMessage("Defina sua missão, escolha o tempo", "e organize pequenas tarefas.");
}

function handleTimeFinished() {
  finishMission("time-ended");
}

function updateTaskProgress() {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  taskProgressElement.textContent = `${completedTasks}/${totalTasks} Concluídas`;
}

function focusFirstEmptyTask() {
  const firstEmptyTask = tasks.find((task) => task.name.trim() === "");

  if (!firstEmptyTask) {
    return;
  }

  renderTasks(firstEmptyTask.id);
}

function requestDangerConfirmation(actionName, callback) {
  if (pendingDangerAction !== actionName) {
    pendingDangerAction = actionName;

    clearTimeout(pendingDangerTimeout);

    pendingDangerTimeout = setTimeout(() => {
      pendingDangerAction = null;
    }, 3500);

    if (actionName === "restart") {
      setOrientationMessage("Clique em Reiniciar novamente", "para confirmar a ação.");
    }

    if (actionName === "cancel") {
      setOrientationMessage("Clique em Cancelar novamente", "para abandonar a missão.");
    }

    return;
  }

  pendingDangerAction = null;
  clearTimeout(pendingDangerTimeout);
  callback();
}

function escapeHTML(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function getStorageList(key) {
  const rawData = localStorage.getItem(key);

  if (!rawData) {
    return [];
  }

  try {
    const parsedData = JSON.parse(rawData);

    if (Array.isArray(parsedData)) {
      return parsedData;
    }

    return [];
  } catch (error) {
    console.error("Erro ao ler dados locais:", error);
    return [];
  }
}

function saveStorageList(key, list) {
  localStorage.setItem(key, JSON.stringify(list));
}

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

  const limitedHistory = history.slice(0, 30);

  saveStorageList(STORAGE_KEYS.history, limitedHistory);

  mission.savedToHistory = true;
}

function saveCurrentMissionAsTemplate() {
  if (!activeMission) {
    setOrientationMessage("Nenhuma missão disponível.", "Finalize ou crie uma missão primeiro.");
    return;
  }

  const templates = getStorageList(STORAGE_KEYS.templates);

  const template = {
    id: createId(),
    title: activeMission.title,
    durationMinutes: activeMission.durationMinutes,
    tasks: activeMission.tasks.map((task) => ({
      id: createId(),
      name: task.name,
      completed: false,
    })),
    createdAt: new Date().toISOString(),
  };

  templates.unshift(template);

  const limitedTemplates = templates.slice(0, 20);

  saveStorageList(STORAGE_KEYS.templates, limitedTemplates);

  setOrientationMessage("Modelo salvo com sucesso.", "Você poderá reutilizá-lo depois.");
}

function repeatLastMission() {
  if (!lastFinishedMission) {
    setOrientationMessage("Nenhuma missão finalizada.", "Finalize uma missão antes de repetir.");
    return;
  }

  stopCountdown();

  activeMission = {
    id: createId(),
    title: lastFinishedMission.title,
    durationMinutes: lastFinishedMission.durationMinutes,
    totalSeconds: lastFinishedMission.totalSeconds,
    remainingSeconds: lastFinishedMission.totalSeconds,
    startedAt: new Date().toISOString(),
    finishedAt: null,
    finishReason: null,
    savedToHistory: false,
    tasks: lastFinishedMission.tasks.map((task) => ({
      id: createId(),
      name: task.name,
      completed: false,
    })),
  };

  tasks = activeMission.tasks;

  missionTitleInput.value = activeMission.title;
  missionTimeInput.value = `${activeMission.durationMinutes} minutos`;

  missionTitleInput.readOnly = true;
  missionTimeInput.readOnly = true;

  timerDisplay.classList.remove("is-warning", "is-finished");

  setAppState("running");
  renderTasks();
  updateTimerDisplay(activeMission.remainingSeconds);
  startCountdown();

  setOrientationMessage("Missão repetida.", "Execute novamente com foco.");
}

function showHistorySummary() {
  const history = getStorageList(STORAGE_KEYS.history);

  if (history.length === 0) {
    setOrientationMessage("Histórico vazio.", "Finalize uma missão para registrar.");
    return;
  }

  const lastItem = history[0];

  setOrientationMessage(`${history.length} missão(ões) no histórico.`, `Última: ${lastItem.title}`);

  console.table(history);
}

missionForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

addTaskButton.addEventListener("click", addTask);

startMissionButton.addEventListener("click", () => {
  if (appState === "initial") {
    startMission();
    return;
  }

  if (appState === "running" || appState === "paused") {
    finishMission("manual");
    return;
  }

  if (appState === "finished") {
    resetToNewMission();
  }
});

pauseToggleButton.addEventListener("click", togglePauseMission);

restartMissionButton.addEventListener("click", () => {
  requestDangerConfirmation("restart", restartMission);
});

cancelMissionButton.addEventListener("click", () => {
  requestDangerConfirmation("cancel", cancelMission);
});

clearCurrentMissionButton.addEventListener("click", resetToNewMission);

repeatMissionButton.addEventListener("click", repeatLastMission);

saveTemplateButton.addEventListener("click", saveCurrentMissionAsTemplate);

historyButton.addEventListener("click", showHistorySummary);

missionTimeInput.addEventListener("input", updateTimerPreview);

missionTitleInput.addEventListener("focus", () => {
  if (appState !== "initial") {
    return;
  }

  setOrientationMessage("Nomeie sua missão.", "Seja direto e específico.");
});

missionTimeInput.addEventListener("focus", () => {
  if (appState !== "initial") {
    return;
  }

  setOrientationMessage("Escolha um tempo limite.", "Comece com blocos pequenos.");
});

renderTasks();
updateTimerPreview();
setAppState("initial");

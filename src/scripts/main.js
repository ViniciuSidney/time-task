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

const orientationLine1 = document.querySelector("#orientation-line-1");
const orientationLine2 = document.querySelector("#orientation-line-2");

const MAX_TASKS = 7;

let appState = "initial";
let countdownInterval = null;
let countdownDeadline = null;
let pendingDangerAction = null;
let pendingDangerTimeout = null;

let activeMission = null;

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

  activeMission = missionData;
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

function finishMission() {
  if (!activeMission) {
    return;
  }

  stopCountdown();

  timerDisplay.classList.remove("is-warning");
  timerDisplay.classList.add("is-finished");

  setAppState("finished");
  updateTaskProgress();

  setOrientationMessage("Missão concluída!", "A finalização completa vem na próxima etapa.");
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
  stopCountdown();

  timerDisplay.classList.remove("is-warning");
  timerDisplay.classList.add("is-finished");

  setAppState("finished");

  setOrientationMessage("Tempo encerrado!", "Confira o que conseguiu concluir.");
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
    finishMission();
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

historyButton.addEventListener("click", () => {
  setOrientationMessage("Histórico ainda não disponível.", "Essa tela será criada depois.");
});

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

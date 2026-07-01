console.log("Time-Task iniciado.");

const missionTitleInput = document.querySelector("#mission-title");
const missionTimeInput = document.querySelector("#mission-time");
const timerDisplay = document.querySelector(".timer-display span");

const taskListElement = document.querySelector("#task-list");
const addTaskButton = document.querySelector("#add-task-button");
const startMissionButton = document.querySelector("#start-mission-button");

const orientationLine1 = document.querySelector("#orientation-line-1");
const orientationLine2 = document.querySelector("#orientation-line-2");

const MAX_TASKS = 7;

let tasks = [
  createTask(""),
  createTask(""),
  createTask("")
];

function createTask(name = "") {
  return {
    id: crypto.randomUUID(),
    name,
    completed: false
  };
}

function setOrientationMessage(line1, line2) {
  orientationLine1.textContent = line1;
  orientationLine2.textContent = line2;
}

function formatTimerPreview(minutes) {
  const safeMinutes = Number(minutes);

  if (!safeMinutes || safeMinutes <= 0) {
    return "00:00";
  }

  return `${String(safeMinutes).padStart(2, "0")}:00`;
}

function updateTimerPreview() {
  timerDisplay.textContent = formatTimerPreview(missionTimeInput.value);
}

function renderTasks(focusTaskId = null) {
  taskListElement.innerHTML = "";

  if (tasks.length === 0) {
    taskListElement.innerHTML = `
      <li class="task-empty">
        Nenhuma tarefa adicionada.
      </li>
    `;

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

  updateAddTaskButtonState();
}

function updateTaskName(taskId, newName) {
  tasks = tasks.map((task) => {
    if (task.id !== taskId) {
      return task;
    }

    return {
      ...task,
      name: newName
    };
  });
}

function updateTaskCompleted(taskId, completed) {
  tasks = tasks.map((task) => {
    if (task.id !== taskId) {
      return task;
    }

    return {
      ...task,
      completed
    };
  });

  renderTasks();
}

function addTask() {
  if (tasks.length >= MAX_TASKS) {
    setOrientationMessage("Limite recomendado atingido.", "Use até 7 microtarefas por missão.");
    return;
  }

  const newTask = createTask();

  tasks.push(newTask);
  renderTasks(newTask.id);

  setOrientationMessage("Nova tarefa adicionada.", "Descreva uma ação curta e objetiva.");
}

function removeTask(taskId) {
  if (tasks.length === 1) {
    tasks = [createTask("")];
    renderTasks(tasks[0].id);

    setOrientationMessage("A missão precisa ter", "pelo menos uma tarefa.");
    return;
  }

  tasks = tasks.filter((task) => task.id !== taskId);
  renderTasks();

  setOrientationMessage("Tarefa removida.", "Mantenha apenas o essencial.");
}

function updateAddTaskButtonState() {
  const reachedLimit = tasks.length >= MAX_TASKS;

  addTaskButton.disabled = reachedLimit;
  addTaskButton.classList.toggle("is-disabled", reachedLimit);
}

function getFilledTasks() {
  return tasks
    .map((task) => ({
      ...task,
      name: task.name.trim()
    }))
    .filter((task) => task.name !== "");
}

function validateMissionCreation() {
  const missionTitle = missionTitleInput.value.trim();
  const missionMinutes = Number(missionTimeInput.value);
  const filledTasks = getFilledTasks();

  if (missionTitle === "") {
    setOrientationMessage("Dê um nome para sua missão.", "Exemplo: revisar matemática.");
    missionTitleInput.focus();
    return false;
  }

  if (!missionMinutes || missionMinutes <= 0) {
    setOrientationMessage("Defina um tempo válido.", "Use minutos acima de zero.");
    missionTimeInput.focus();
    return false;
  }

  if (filledTasks.length === 0) {
    setOrientationMessage("Adicione pelo menos uma tarefa.", "A missão precisa de ações claras.");
    focusFirstEmptyTask();
    return false;
  }

  setOrientationMessage("Missão pronta para começar.", "O timer será implementado em seguida.");

  console.table({
    missao: missionTitle,
    tempo: `${missionMinutes} minutos`,
    tarefas: filledTasks.map((task) => task.name).join(", ")
  });

  return true;
}

function focusFirstEmptyTask() {
  const firstEmptyTask = tasks.find((task) => task.name.trim() === "");

  if (!firstEmptyTask) {
    return;
  }

  renderTasks(firstEmptyTask.id);
}

function escapeHTML(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

addTaskButton.addEventListener("click", addTask);

startMissionButton.addEventListener("click", validateMissionCreation);

missionTimeInput.addEventListener("input", updateTimerPreview);

missionTitleInput.addEventListener("focus", () => {
  setOrientationMessage("Nomeie sua missão.", "Seja direto e específico.");
});

missionTimeInput.addEventListener("focus", () => {
  setOrientationMessage("Escolha um tempo limite.", "Comece com blocos pequenos.");
});

renderTasks();
updateTimerPreview();
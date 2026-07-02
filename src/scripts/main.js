console.log('Time-Task iniciado.');

const body = document.body;

const missionForm = document.querySelector('.mission-form');
const missionTitleInput = document.querySelector('#mission-title');
const missionTimeInput = document.querySelector('#mission-time');
const timerDisplay = document.querySelector('.timer-display');
const timerDisplayText = document.querySelector('.timer-display span');

const taskListElement = document.querySelector('#task-list');
const taskProgressElement = document.querySelector('#task-progress');

const addTaskButton = document.querySelector('#add-task-button');
const startMissionButton = document.querySelector('#start-mission-button');

const historyButton = document.querySelector('#history-button');
const pauseToggleButton = document.querySelector('#pause-toggle-button');
const restartMissionButton = document.querySelector('#restart-mission-button');
const cancelMissionButton = document.querySelector('#cancel-mission-button');

const clearCurrentMissionButton = document.querySelector('#clear-current-mission-button');
const repeatMissionButton = document.querySelector('#repeat-mission-button');
const saveTemplateButton = document.querySelector('#save-template-button');

const historyPanel = document.querySelector('#history-panel');
const historyListElement = document.querySelector('#history-list');
const closeHistoryButton = document.querySelector('#close-history-button');
const clearHistoryButton = document.querySelector('#clear-history-button');

const orientationLine1 = document.querySelector('#orientation-line-1');
const orientationLine2 = document.querySelector('#orientation-line-2');

const templatesButton = document.querySelector('#templates-button');

const modalBackdrop = document.querySelector('#modal-backdrop');

const confirmModal = document.querySelector('#confirm-modal');
const confirmModalTitle = document.querySelector('#confirm-modal-title');
const confirmModalMessage = document.querySelector('#confirm-modal-message');
const confirmModalClose = document.querySelector('#confirm-modal-close');
const confirmModalCancel = document.querySelector('#confirm-modal-cancel');
const confirmModalConfirm = document.querySelector('#confirm-modal-confirm');

const templatesModal = document.querySelector('#templates-modal');
const templatesModalClose = document.querySelector('#templates-modal-close');
const templateListElement = document.querySelector('#template-list');

const MAX_TASKS = 7;
const MAX_MISSION_MINUTES = 120;
const STORAGE_KEYS = {
	history: 'time-task:history',
	templates: 'time-task:templates'
};

let appState = 'initial';
let countdownInterval = null;
let countdownDeadline = null;
let pendingConfirmAction = null;

let activeMission = null;
let lastFinishedMission = null;

let tasks = [createTask(''), createTask(''), createTask('')];

function createTask(name = '') {
	return {
		id: createId(),
		name,
		completed: false
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
	if (appState === 'initial') {
		addTaskButton.textContent = 'Adicionar Tarefa';
		startMissionButton.textContent = 'Começar Missão';
		pauseToggleButton.textContent = 'Pausar/Retomar';
		return;
	}

	if (appState === 'running') {
		addTaskButton.textContent = 'Adicionar Tarefa';
		startMissionButton.textContent = 'Finalizar Missão!';
		pauseToggleButton.textContent = 'Pausar';
		return;
	}

	if (appState === 'paused') {
		addTaskButton.textContent = 'Adicionar Tarefa';
		startMissionButton.textContent = 'Finalizar Missão!';
		pauseToggleButton.textContent = 'Retomar';
		return;
	}

	if (appState === 'finished') {
		addTaskButton.textContent = 'Adicionar Tarefa';
		startMissionButton.textContent = 'Nova Missão';
		pauseToggleButton.textContent = 'Pausar/Retomar';
	}
}

function parseMissionMinutes(value) {
	const text = String(value).toLowerCase().trim();

	if (text === '') {
		return 0;
	}

	const hourMatch = text.match(/(\d+)\s*(?:h|hora|horas)\b/);
	const minuteMatch = text.match(/(\d+)\s*(?:m|min|minuto|minutos)\b/);

	if (hourMatch || minuteMatch) {
		const hours = hourMatch ? Number(hourMatch[1]) : 0;
		const minutes = minuteMatch ? Number(minuteMatch[1]) : 0;

		return hours * 60 + minutes;
	}

	const onlyNumbers = text.replace(/\D/g, '');
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
		return '';
	}

	const hours = Math.floor(safeMinutes / 60);
	const remainingMinutes = safeMinutes % 60;

	if (hours === 0) {
		return safeMinutes === 1 ? '1 minuto' : `${safeMinutes} minutos`;
	}

	if (remainingMinutes === 0) {
		return hours === 1 ? '1 hora' : `${hours} horas`;
	}

	const hourLabel = hours === 1 ? '1 hora' : `${hours} horas`;
	const minuteLabel = remainingMinutes === 1 ? '1 minuto' : `${remainingMinutes} minutos`;

	return `${hourLabel} e ${minuteLabel}`;
}

function handleMissionTimeInput() {
	const rawMinutes = parseMissionMinutes(missionTimeInput.value);

	if (!rawMinutes || rawMinutes <= 0) {
		updateTimerPreview();
		return;
	}

	if (rawMinutes > MAX_MISSION_MINUTES) {
		missionTimeInput.value = String(MAX_MISSION_MINUTES);

		setOrientationMessage('Tempo máximo atingido.', `Use até ${formatMinuteLabel(MAX_MISSION_MINUTES)} por missão.`);
	}

	updateTimerPreview();
}

function normalizeMissionTimeInput() {
	const rawMinutes = parseMissionMinutes(missionTimeInput.value);
	const limitedMinutes = limitMissionMinutes(rawMinutes);

	if (!limitedMinutes) {
		missionTimeInput.value = '';
		updateTimerPreview();
		return;
	}

	missionTimeInput.value = formatMinuteLabel(limitedMinutes);
	updateTimerPreview();
}

function prepareMissionTimeEditing() {
	if (appState !== 'initial') {
		return;
	}

	const minutes = parseMissionMinutes(missionTimeInput.value);
	missionTimeInput.value = minutes ? String(limitMissionMinutes(minutes)) : '';
}

function formatTime(totalSeconds) {
	const safeSeconds = Math.max(0, Number(totalSeconds) || 0);

	const hours = Math.floor(safeSeconds / 3600);
	const minutes = Math.floor((safeSeconds % 3600) / 60);
	const seconds = safeSeconds % 60;

	if (hours > 0) {
		return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
	}

	return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function calculateElapsedSeconds(mission) {
	if (!mission) {
		return 0;
	}

	return Math.max(0, mission.totalSeconds - mission.remainingSeconds);
}

function formatDurationLabel(totalSeconds) {
	const safeSeconds = Math.max(0, Number(totalSeconds) || 0);

	const minutes = Math.floor(safeSeconds / 60);
	const seconds = safeSeconds % 60;

	if (minutes === 0) {
		return `${seconds}s`;
	}

	if (seconds === 0) {
		return `${minutes} min`;
	}

	return `${minutes} min ${String(seconds).padStart(2, '0')}s`;
}

function updateTimerPreview() {
	if (appState !== 'initial') {
		return;
	}

	const minutes = limitMissionMinutes(parseMissionMinutes(missionTimeInput.value));

	if (!minutes || minutes <= 0) {
		updateTimerDisplay(0);
		return;
	}

	updateTimerDisplay(minutes * 60);
}

function renderTasks(focusTaskId = null) {
	taskListElement.innerHTML = '';

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
		const taskItem = document.createElement('li');
		taskItem.className = 'task-item';

		if (task.completed) {
			taskItem.classList.add('is-completed');
		}

		taskItem.dataset.taskId = task.id;

		taskItem.innerHTML = `
      <label class="task-check">
        <input type="checkbox" ${task.completed ? 'checked' : ''} />
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
		const taskNameInput = taskItem.querySelector('.task-name');
		const removeButton = taskItem.querySelector('.task-remove');

		checkbox.addEventListener('change', () => {
			updateTaskCompleted(task.id, checkbox.checked);
		});

		taskNameInput.addEventListener('input', () => {
			updateTaskName(task.id, taskNameInput.value);
		});

		taskNameInput.addEventListener('keydown', (event) => {
			if (event.key !== 'Enter') {
				return;
			}

			event.preventDefault();

			if (taskNameInput.value.trim() === '') {
				setOrientationMessage('Antes de adicionar outra tarefa,', 'preencha a tarefa atual.');
				taskNameInput.focus();
				return;
			}

			addTask();
		});

		removeButton.addEventListener('click', () => {
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
			name: newName
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
			completed
		};
	});

	if (activeMission) {
		activeMission.tasks = tasks;
	}

	renderTasks();

	if (appState === 'running' || appState === 'paused') {
		const completedTasks = tasks.filter((task) => task.completed).length;
		const totalTasks = tasks.length;

		setOrientationMessage('Missão em andamento...', `${completedTasks}/${totalTasks} tarefas concluídas.`);
	}
}

function addTask() {
	if (tasks.length >= MAX_TASKS) {
		setOrientationMessage('Limite recomendado atingido.', 'Use até 7 microtarefas por missão.');
		return;
	}

	const newTask = createTask();

	tasks.push(newTask);

	if (activeMission) {
		activeMission.tasks = tasks;
	}

	renderTasks(newTask.id);

	setOrientationMessage('Nova tarefa adicionada.', 'Descreva uma ação curta e objetiva.');
}

function removeTask(taskId) {
	if (tasks.length === 1) {
		tasks = [createTask('')];

		if (activeMission) {
			activeMission.tasks = tasks;
		}

		renderTasks(tasks[0].id);

		setOrientationMessage('A missão precisa ter', 'pelo menos uma tarefa.');
		return;
	}

	tasks = tasks.filter((task) => task.id !== taskId);

	if (activeMission) {
		activeMission.tasks = tasks;
	}

	renderTasks();

	setOrientationMessage('Tarefa removida.', 'Mantenha apenas o essencial.');
}

function updateAddTaskButtonState() {
	const reachedLimit = tasks.length >= MAX_TASKS;
	const isFinished = appState === 'finished';

	addTaskButton.disabled = reachedLimit || isFinished;
	addTaskButton.classList.toggle('is-disabled', reachedLimit || isFinished);
}

function getFilledTasks() {
	return tasks
		.map((task) => ({
			...task,
			name: task.name.trim(),
			completed: false
		}))
		.filter((task) => task.name !== '');
}

function validateMissionCreation() {
	const missionTitle = missionTitleInput.value.trim();
	const missionMinutes = limitMissionMinutes(parseMissionMinutes(missionTimeInput.value));
	const filledTasks = getFilledTasks();

	if (missionTitle === '') {
		setOrientationMessage('Dê um nome para sua missão.', 'Exemplo: revisar matemática.');
		missionTitleInput.focus();
		return null;
	}

	if (!missionMinutes || missionMinutes <= 0) {
		setOrientationMessage('Defina um tempo válido.', 'Use minutos acima de zero.');
		missionTimeInput.focus();
		return null;
	}

	if (parseMissionMinutes(missionTimeInput.value) > MAX_MISSION_MINUTES) {
		setOrientationMessage('Tempo acima do permitido.', `O máximo é ${formatMinuteLabel(MAX_MISSION_MINUTES)}.`);

		missionTimeInput.value = formatMinuteLabel(MAX_MISSION_MINUTES);
		updateTimerPreview();
		missionTimeInput.focus();

		return null;
	}

	if (filledTasks.length === 0) {
		setOrientationMessage('Adicione pelo menos uma tarefa.', 'A missão precisa de ações claras.');
		focusFirstEmptyTask();
		return null;
	}

	return {
		title: missionTitle,
		durationMinutes: missionMinutes,
		totalSeconds: missionMinutes * 60,
		remainingSeconds: missionMinutes * 60,
		tasks: filledTasks
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
		savedToHistory: false
	};

	tasks = activeMission.tasks;

	missionTitleInput.value = activeMission.title;
	missionTimeInput.value = formatMinuteLabel(activeMission.durationMinutes);

	missionTitleInput.readOnly = true;
	missionTimeInput.readOnly = true;

	timerDisplay.classList.remove('is-warning', 'is-finished');

	setAppState('running');
	renderTasks();
	updateTimerDisplay(activeMission.remainingSeconds);
	startCountdown();

	setOrientationMessage('Missão em andamento...', 'Foco na conclusão!');
}

function startCountdown() {
	stopCountdown();

	countdownDeadline = Date.now() + activeMission.remainingSeconds * 1000;

	countdownInterval = setInterval(() => {
		const remainingSeconds = Math.max(0, Math.ceil((countdownDeadline - Date.now()) / 1000));

		activeMission.remainingSeconds = remainingSeconds;
		updateTimerDisplay(remainingSeconds);

		if (remainingSeconds <= 60 && remainingSeconds > 0) {
			timerDisplay.classList.add('is-warning');
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
	timerDisplay.classList.toggle('has-hours', seconds >= 3600);
}

function togglePauseMission() {
	if (!activeMission) {
		return;
	}

	if (appState === 'running') {
		stopCountdown();
		setAppState('paused');
		setOrientationMessage('Missão pausada.', 'Retome quando estiver pronto.');
		return;
	}

	if (appState === 'paused') {
		setAppState('running');
		startCountdown();
		setOrientationMessage('Missão retomada.', 'Volte para a execução.');
	}
}

function restartMission() {
	if (!activeMission) {
		return;
	}

	activeMission.remainingSeconds = activeMission.totalSeconds;

	tasks = tasks.map((task) => ({
		...task,
		completed: false
	}));

	activeMission.tasks = tasks;

	timerDisplay.classList.remove('is-warning', 'is-finished');

	setAppState('running');
	renderTasks();
	updateTimerDisplay(activeMission.remainingSeconds);
	startCountdown();

	setOrientationMessage('Missão reiniciada.', 'Comece novamente com calma.');
}

function cancelMission() {
	stopCountdown();

	activeMission = null;
	tasks = [createTask(''), createTask(''), createTask('')];

	missionTitleInput.value = '';
	missionTimeInput.value = '';
	missionTitleInput.readOnly = false;
	missionTimeInput.readOnly = false;

	timerDisplay.classList.remove('is-warning', 'is-finished');
	timerDisplayText.textContent = '00:00';

	setAppState('initial');
	renderTasks();

	setOrientationMessage('Missão cancelada.', 'Crie uma nova quando quiser.');
}

function finishMission(reason = 'manual') {
	if (!activeMission) {
		return;
	}

	stopCountdown();

	activeMission.finishedAt = new Date().toISOString();
	activeMission.finishReason = reason;
	activeMission.completedTasks = tasks.filter((task) => task.completed).length;
	activeMission.totalTasks = tasks.length;
	activeMission.tasks = tasks;
	activeMission.elapsedSeconds = calculateElapsedSeconds(activeMission);

	saveMissionToHistory(activeMission);

	lastFinishedMission = structuredClone(activeMission);

	timerDisplay.classList.remove('is-warning');
	timerDisplay.classList.add('is-finished');

	setAppState('finished');
	renderTasks();
	updateTaskProgress();

	if (reason === 'time-ended') {
		setOrientationMessage('Tempo encerrado!', 'Missão adicionada ao histórico.');
		return;
	}

	setOrientationMessage('Missão concluída!', 'Missão adicionada ao histórico.');
}

function resetToNewMission() {
	stopCountdown();

	activeMission = null;

	tasks = [createTask(''), createTask(''), createTask('')];

	missionTitleInput.value = '';
	missionTimeInput.value = '';
	missionTitleInput.readOnly = false;
	missionTimeInput.readOnly = false;

	timerDisplay.classList.remove('is-warning', 'is-finished');
	timerDisplayText.textContent = '00:00';

	setAppState('initial');
	renderTasks();

	setOrientationMessage('Defina sua missão, escolha o tempo', 'e organize pequenas tarefas.');
}

function handleTimeFinished() {
	finishMission('time-ended');
}

function updateTaskProgress() {
	const totalTasks = tasks.length;
	const completedTasks = tasks.filter((task) => task.completed).length;

	taskProgressElement.textContent = `${completedTasks}/${totalTasks} Concluídas`;
}

function focusFirstEmptyTask() {
	const firstEmptyTask = tasks.find((task) => task.name.trim() === '');

	if (!firstEmptyTask) {
		return;
	}

	renderTasks(firstEmptyTask.id);
}

function requestDangerConfirmation(actionName, callback) {
	const messages = {
		restart: {
			title: 'Reiniciar missão',
			message: 'Tem certeza que deseja reiniciar a missão atual? O tempo voltará ao início e as tarefas serão desmarcadas.',
			confirmLabel: 'Reiniciar'
		},
		cancel: {
			title: 'Cancelar missão',
			message: 'Tem certeza que deseja cancelar a missão atual? O progresso desta execução será perdido.',
			confirmLabel: 'Cancelar'
		},
		'clear-history': {
			title: 'Apagar histórico',
			message: 'Tem certeza que deseja apagar todo o histórico? Essa ação não poderá ser desfeita.',
			confirmLabel: 'Apagar'
		},
		'delete-history-item': {
			title: 'Excluir registro',
			message: 'Tem certeza que deseja excluir esta missão do histórico?',
			confirmLabel: 'Excluir'
		},
		'clear-current': {
			title: 'Limpar missão atual',
			message: 'Tem certeza que deseja limpar a missão atual e voltar para a tela inicial?',
			confirmLabel: 'Limpar'
		},
		'delete-template': {
			title: 'Excluir modelo',
			message: 'Tem certeza que deseja excluir este modelo salvo?',
			confirmLabel: 'Excluir'
		}
	};

	const config = messages[actionName] ?? {
		title: 'Confirmar ação',
		message: 'Tem certeza que deseja continuar?',
		confirmLabel: 'Confirmar'
	};

	openConfirmModal({
		title: config.title,
		message: config.message,
		confirmLabel: config.confirmLabel,
		onConfirm: callback
	});
}

function escapeHTML(value) {
	return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
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
		console.error('Erro ao ler dados locais:', error);
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
		elapsedSeconds: mission.elapsedSeconds,
		completedTasks: mission.completedTasks,
		totalTasks: mission.totalTasks,
		tasks: mission.tasks.map((task) => ({
			id: task.id,
			name: task.name,
			completed: task.completed
		})),
		startedAt: mission.startedAt,
		finishedAt: mission.finishedAt,
		finishReason: mission.finishReason
	};

	history.unshift(historyItem);

	const limitedHistory = history.slice(0, 30);

	saveStorageList(STORAGE_KEYS.history, limitedHistory);

	mission.savedToHistory = true;

	refreshHistoryIfOpen();
}

function saveCurrentMissionAsTemplate() {
	if (!activeMission) {
		setOrientationMessage('Nenhuma missão disponível.', 'Finalize ou crie uma missão primeiro.');
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
			completed: false
		})),
		createdAt: new Date().toISOString()
	};

	templates.unshift(template);

	const limitedTemplates = templates.slice(0, 20);

	saveStorageList(STORAGE_KEYS.templates, limitedTemplates);

	setOrientationMessage('Modelo salvo com sucesso.', 'Você poderá reutilizá-lo depois.');

	openTemplatesModal();
}

function repeatLastMission() {
	if (!lastFinishedMission) {
		setOrientationMessage('Nenhuma missão finalizada.', 'Finalize uma missão antes de repetir.');
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
			completed: false
		}))
	};

	tasks = activeMission.tasks;

	missionTitleInput.value = activeMission.title;
	missionTimeInput.value = formatMinuteLabel(activeMission.durationMinutes);

	missionTitleInput.readOnly = true;
	missionTimeInput.readOnly = true;

	timerDisplay.classList.remove('is-warning', 'is-finished');

	setAppState('running');
	renderTasks();
	updateTimerDisplay(activeMission.remainingSeconds);
	startCountdown();

	setOrientationMessage('Missão repetida.', 'Execute novamente com foco.');
}

function setHistoryOpen(isOpen) {
	body.dataset.history = isOpen ? 'open' : 'closed';

	if (isOpen) {
		renderHistoryPanel();
		setOrientationMessage('Histórico aberto.', 'Você pode repetir missões anteriores.');
		return;
	}

	setOrientationMessage('Histórico fechado.', 'Volte para sua missão atual.');
}

function toggleHistoryPanel() {
	const isOpen = body.dataset.history === 'open';
	setHistoryOpen(!isOpen);
}

function renderHistoryPanel() {
	const history = getStorageList(STORAGE_KEYS.history);

	historyListElement.innerHTML = '';

	if (history.length === 0) {
		historyListElement.innerHTML = `
      <p class="history-empty">Nenhuma missão no histórico.</p>
    `;
		return;
	}

	history.forEach((mission) => {
		const historyCard = document.createElement('article');
		historyCard.className = 'history-card';
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

		const repeatButton = historyCard.querySelector('.history-repeat-button');
		const deleteButton = historyCard.querySelector('.history-delete-button');

		repeatButton.addEventListener('click', () => {
			repeatMissionFromHistory(mission.id);
		});

		deleteButton.addEventListener('click', () => {
			deleteHistoryItem(mission.id);
		});

		historyListElement.appendChild(historyCard);
	});
}

function formatPlannedTimeLabel(minutes) {
	const label = formatMinuteLabel(minutes);

	if (!label) {
		return 'Tempo não informado';
	}

	return `Planejado: ${label}`;
}

function calculateHistoryElapsedSeconds(mission) {
	if (!mission) {
		return 0;
	}

	if (typeof mission.elapsedSeconds === 'number') {
		return mission.elapsedSeconds;
	}

	if (typeof mission.totalSeconds === 'number' && typeof mission.remainingSeconds === 'number') {
		return Math.max(0, mission.totalSeconds - mission.remainingSeconds);
	}

	return 0;
}

function formatHistoryDate(isoDate) {
	if (!isoDate) {
		return '--/--';
	}

	return new Date(isoDate).toLocaleDateString('pt-BR', {
		day: '2-digit',
		month: '2-digit'
	});
}

function formatHistoryTime(isoDate) {
	if (!isoDate) {
		return '--:--';
	}

	return new Date(isoDate).toLocaleTimeString('pt-BR', {
		hour: '2-digit',
		minute: '2-digit'
	});
}

function repeatMissionFromHistory(historyId) {
	if (appState === 'running' || appState === 'paused') {
		setOrientationMessage('Finalize ou cancele a missão atual', 'antes de repetir outra missão.');
		return;
	}

	const history = getStorageList(STORAGE_KEYS.history);
	const selectedMission = history.find((mission) => mission.id === historyId);

	if (!selectedMission) {
		setOrientationMessage('Missão não encontrada.', 'O histórico pode ter sido atualizado.');
		renderHistoryPanel();
		return;
	}

	stopCountdown();

	activeMission = {
		id: createId(),
		title: selectedMission.title,
		durationMinutes: selectedMission.durationMinutes,
		totalSeconds: selectedMission.totalSeconds,
		remainingSeconds: selectedMission.totalSeconds,
		startedAt: new Date().toISOString(),
		finishedAt: null,
		finishReason: null,
		savedToHistory: false,
		tasks: selectedMission.tasks.map((task) => ({
			id: createId(),
			name: task.name,
			completed: false
		}))
	};

	tasks = activeMission.tasks;
	lastFinishedMission = structuredClone(activeMission);

	missionTitleInput.value = activeMission.title;
	missionTimeInput.value = formatMinuteLabel(activeMission.durationMinutes);

	missionTitleInput.readOnly = true;
	missionTimeInput.readOnly = true;

	timerDisplay.classList.remove('is-warning', 'is-finished');

	setAppState('running');
	renderTasks();
	updateTimerDisplay(activeMission.remainingSeconds);
	startCountdown();

	setOrientationMessage('Missão repetida do histórico.', 'Execute novamente com foco.');
}

function deleteHistoryItem(historyId) {
	requestDangerConfirmation('delete-history-item', () => {
		const history = getStorageList(STORAGE_KEYS.history);
		const updatedHistory = history.filter((mission) => mission.id !== historyId);

		saveStorageList(STORAGE_KEYS.history, updatedHistory);
		renderHistoryPanel();

		setOrientationMessage('Item removido do histórico.', 'O restante foi mantido.');
	});
}

function clearHistory() {
	requestDangerConfirmation('clear-history', () => {
		saveStorageList(STORAGE_KEYS.history, []);
		renderHistoryPanel();

		setOrientationMessage('Histórico apagado.', 'As missões anteriores foram removidas.');
	});
}

function isHistoryOpen() {
	return body.dataset.history === 'open';
}

function refreshHistoryIfOpen() {
	if (!isHistoryOpen()) {
		return;
	}

	renderHistoryPanel();
}

function openModal(modalElement) {
	modalBackdrop.hidden = false;

	confirmModal.hidden = true;
	templatesModal.hidden = true;

	modalElement.hidden = false;
}

function closeModals() {
	modalBackdrop.hidden = true;
	confirmModal.hidden = true;
	templatesModal.hidden = true;
	pendingConfirmAction = null;
}

function openConfirmModal({title, message, confirmLabel = 'Confirmar', onConfirm}) {
	pendingConfirmAction = onConfirm;

	confirmModalTitle.textContent = title;
	confirmModalMessage.textContent = message;
	confirmModalConfirm.textContent = confirmLabel;

	openModal(confirmModal);
}

function openTemplatesModal() {
	renderTemplatesModal();
	openModal(templatesModal);

	setOrientationMessage('Modelos abertos.', 'Escolha uma missão salva para reutilizar.');
}

function renderTemplatesModal() {
	const templates = getStorageList(STORAGE_KEYS.templates);

	templateListElement.innerHTML = '';

	if (templates.length === 0) {
		templateListElement.innerHTML = `
      <p class="modal-empty">Nenhum modelo salvo ainda.</p>
    `;
		return;
	}

	templates.forEach((template) => {
		const templateCard = document.createElement('article');
		templateCard.className = 'template-card';
		templateCard.dataset.templateId = template.id;

		const formattedDate = template.createdAt ? new Date(template.createdAt).toLocaleDateString('pt-BR') : '--/--/----';

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

		const useButton = templateCard.querySelector('.template-use-button');
		const deleteButton = templateCard.querySelector('.template-delete-button');

		useButton.addEventListener('click', () => {
			useTemplate(template.id);
		});

		deleteButton.addEventListener('click', () => {
			deleteTemplate(template.id);
		});

		templateListElement.appendChild(templateCard);
	});
}

function useTemplate(templateId) {
	if (appState === 'running' || appState === 'paused') {
		setOrientationMessage('Finalize ou cancele a missão atual', 'antes de usar um modelo.');
		return;
	}

	const templates = getStorageList(STORAGE_KEYS.templates);
	const selectedTemplate = templates.find((template) => template.id === templateId);

	if (!selectedTemplate) {
		setOrientationMessage('Modelo não encontrado.', 'A lista será atualizada.');
		renderTemplatesModal();
		return;
	}

	stopCountdown();

	activeMission = null;

	tasks = selectedTemplate.tasks.map((task) => ({
		id: createId(),
		name: task.name,
		completed: false
	}));

	missionTitleInput.value = selectedTemplate.title;
	missionTimeInput.value = formatMinuteLabel(selectedTemplate.durationMinutes);

	missionTitleInput.readOnly = false;
	missionTimeInput.readOnly = false;

	timerDisplay.classList.remove('is-warning', 'is-finished');
	timerDisplayText.textContent = formatTime(selectedTemplate.durationMinutes * 60);

	setAppState('initial');
	renderTasks();
	closeModals();

	setOrientationMessage('Modelo carregado.', 'Revise e comece a missão.');
}

function deleteTemplate(templateId) {
	requestDangerConfirmation('delete-template', () => {
		const templates = getStorageList(STORAGE_KEYS.templates);
		const updatedTemplates = templates.filter((template) => template.id !== templateId);

		saveStorageList(STORAGE_KEYS.templates, updatedTemplates);
		renderTemplatesModal();

		setOrientationMessage('Modelo excluído.', 'Os outros modelos foram mantidos.');
	});
}

// Event Listeners

missionForm.addEventListener('submit', (event) => {
	event.preventDefault();
});

addTaskButton.addEventListener('click', addTask);

startMissionButton.addEventListener('click', () => {
	if (appState === 'initial') {
		startMission();
		return;
	}

	if (appState === 'running' || appState === 'paused') {
		finishMission('manual');
		return;
	}

	if (appState === 'finished') {
		resetToNewMission();
	}
});

pauseToggleButton.addEventListener('click', togglePauseMission);

restartMissionButton.addEventListener('click', () => {
	requestDangerConfirmation('restart', restartMission);
});

cancelMissionButton.addEventListener('click', () => {
	requestDangerConfirmation('cancel', cancelMission);
});

clearCurrentMissionButton.addEventListener('click', () => {
	requestDangerConfirmation('clear-current', resetToNewMission);
});

repeatMissionButton.addEventListener('click', repeatLastMission);

saveTemplateButton.addEventListener('click', saveCurrentMissionAsTemplate);

historyButton.addEventListener('click', toggleHistoryPanel);

closeHistoryButton.addEventListener('click', () => {
	setHistoryOpen(false);
});

clearHistoryButton.addEventListener('click', clearHistory);

templatesButton.addEventListener('click', openTemplatesModal);

templatesModalClose.addEventListener('click', closeModals);
confirmModalClose.addEventListener('click', closeModals);
confirmModalCancel.addEventListener('click', closeModals);

confirmModalConfirm.addEventListener('click', () => {
	if (typeof pendingConfirmAction === 'function') {
		pendingConfirmAction();
	}

	closeModals();
});

modalBackdrop.addEventListener('click', (event) => {
	if (event.target === modalBackdrop) {
		closeModals();
	}
});

document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape' && !modalBackdrop.hidden) {
		closeModals();
	}
});

missionTimeInput.addEventListener('input', handleMissionTimeInput);

missionTitleInput.addEventListener('focus', () => {
	if (appState !== 'initial') {
		return;
	}

	setOrientationMessage('Nomeie sua missão.', 'Seja direto e específico.');
});

missionTimeInput.addEventListener('blur', normalizeMissionTimeInput);

missionTimeInput.addEventListener('focus', () => {
	if (appState !== 'initial') {
		return;
	}

	prepareMissionTimeEditing();
	setOrientationMessage('Escolha um tempo limite.', 'Comece com blocos pequenos.');
});

renderTasks();
updateTimerPreview();
setAppState('initial');
body.dataset.history = 'closed';

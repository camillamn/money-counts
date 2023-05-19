import FetchTasks from "./fetch-tasks.js";
import { toggleTaskButtons } from "./toggle-task-buttons.js";

export default async function TaskList() {
	const tasks = await FetchTasks();
	console.log(tasks);

	function createTaskItemDOM() {
		const taskListContainer = document.querySelector('.static-page-kids__tasks');
		const addTaskButton = document.createElement('button');
		const taskButtonsContainer = document.createElement('div');

		taskButtonsContainer.className = 'static-page-kids__task-buttons-container';

		addTaskButton.addEventListener('click', () => {
			toggleTaskButtons(taskButtonsContainer);
		});

		for (const task of tasks) {
			const taskButton = document.createElement('button');

			taskButton.className = 'static-page-kids__tasks-task-button box';
			taskButton.innerText = `${task.name} ${task.value} kroner`;

			taskButtonsContainer.appendChild(taskButton);
		}

		addTaskButton.innerText = 'Legg til oppgave';
		addTaskButton.className = 'static-page-kids__tasks-add-task';

		taskListContainer.appendChild(addTaskButton);
		taskListContainer.appendChild(taskButtonsContainer);

		return taskListContainer
	}

	function renderHTML() {
		const taskListContainer = createTaskItemDOM();
		document.body.appendChild(taskListContainer);
	}
	renderHTML();
}
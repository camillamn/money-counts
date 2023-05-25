/**
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
 */
import FetchTasks from "./fetch-tasks.js";
import { toggleTaskButtons } from "./toggle-task-buttons.js";

export default async function TaskList() {
	const tasks = await FetchTasks();
	console.log(tasks);

	function createTaskItemDOM() {
		const taskButtonsContainer = document.querySelector('.static-page-kids__task-buttons-container');
		const openTaskButtonsList = document.createElement('button');
		const taskButtonsList = document.createElement('div');

		openTaskButtonsList.className = 'static-page-kids__open-task-buttons-list';
		taskButtonsList.className = 'static-page-kids__task-buttons-list';

		openTaskButtonsList.addEventListener('click', () => {
			toggleTaskButtons(taskButtonsList);
		});

		for (const task of tasks) {
			const taskButton = document.createElement('button');

			taskButton.className = 'static-page-kids__task-button box';
			taskButton.innerText = `${task.name} ${task.value} kroner`;
			taskButton.dataset.taskId = task._id;

			taskButtonsList.appendChild(taskButton);
		}

		openTaskButtonsList.innerText = 'Legg til oppgave';
		openTaskButtonsList.className = 'static-page-kids__tasks-add-task';

		taskButtonsContainer.appendChild(openTaskButtonsList);
		taskButtonsContainer.appendChild(taskButtonsList);

		return taskButtonsContainer
	}

	function renderHTML() {
		const taskButtonsContainer = createTaskItemDOM();
		document.body.appendChild(taskButtonsContainer);
	}
	renderHTML();
}
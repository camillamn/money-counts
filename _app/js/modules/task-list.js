/**
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
 */
import addTaskToWeeklyList from "./add-task-to-weekly-list.js";
import FetchTasks from "./fetch-tasks.js";
import { toggleTaskButtons } from "./toggle-task-buttons.js";

export default async function TaskList() {
	const tasks = await FetchTasks();
	console.log(tasks);

	function createTaskItemDOM() {
		const taskButtonsContainer = document.querySelector('.dynamic-page-kids__task-buttons-container');
		const openTaskButtonsList = document.createElement('button');
		const taskButtonsList = document.createElement('div');

		openTaskButtonsList.classList.add(
			'dynamic-page-kids__open-task-buttons-list',
			'grid');
		taskButtonsList.classList.add('dynamic-page-kids__task-buttons-list');

		openTaskButtonsList.addEventListener('click', () => {
			toggleTaskButtons(taskButtonsList);
		});

		for (const task of tasks) {
			const taskButton = document.createElement('button');

			taskButton.classList.add(
				'dynamic-page-kids__task-button',
				'grid__column--3', 
				'box');
			taskButton.innerText = `${task.name} ${task.value} kroner`;
			taskButton.dataset.taskId = task._id;

			taskButton.addEventListener('click', async (event) => {
				try {
					const clickedButton = event.target;
					const taskId = clickedButton.dataset.taskId;
					console.log(`Button with taskId: ${taskId} clicked`);
					
					const response = await addTaskToWeeklyList(taskId);
					console.log(response);

					// reload the page after clicking on a button to update the list
					location.reload();
				} catch (error) {
					console.error('An error occurred while sending the post request');
				}
			});

			taskButtonsList.appendChild(taskButton);
		}

		openTaskButtonsList.innerText = 'Legg til oppgave';
		openTaskButtonsList.className = 'dynamic-page-kids__tasks-add-task';

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
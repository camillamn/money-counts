/**
 * Displays a list of tasks and allow to add tasks to the weekly list.
 * It also creates the DOM element for the task items and handles a click event
 * for adding tasks and reload the page to see the newly added tasks
 * 
 * The createTaskItemDOM:
 * @returns {HTMLElement} - The container element for the tasksbutton
 * 
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
 */
import FetchTasks from "./fetch-tasks.js";
import addTaskToWeeklyList from "./add-task-to-weekly-list.js";
import { toggleTaskButtons } from "./toggle-task-buttons.js";

export default async function TaskList() {
	// fetch the list of tasks from the database
	const tasks = await FetchTasks();

	// create the DOM elements
	function createTaskItemDOM() {
		const taskButtonsContainer = document.querySelector('.dynamic-page-kids__task-buttons-container');
		const openTaskButtonsList = document.createElement('button');
		const taskButtonsList = document.createElement('div');

		// add CSS classes to the elements
		openTaskButtonsList.classList.add(
			'dynamic-page-kids__open-task-buttons-list',
			'grid'
		);
		taskButtonsList.classList.add(
			'dynamic-page-kids__task-buttons-list'
		);

		// toggle visibility of task buttonw when the "open" button is clicked
		openTaskButtonsList.addEventListener('click', () => {
			toggleTaskButtons(taskButtonsList);
		});

		// iterate over the tasks and create task buttons for all of them
		for (const task of tasks) {
			const taskButton = document.createElement('button');

			taskButton.classList.add(
				'dynamic-page-kids__task-button',
				'grid__column--3', 
				'box'
			);
			taskButton.innerText = `${task.name} ${task.value} kroner`;
			taskButton.dataset.taskId = task._id;

			// handle click event for adding tasks to the weekly list
			taskButton.addEventListener('click', async (event) => {
				try {
					const clickedButton = event.target;
					const taskId = clickedButton.dataset.taskId;
					console.log(`Button with taskId: ${taskId} clicked`);
					
					// add the task to the weekly List
					const response = await addTaskToWeeklyList(taskId);
					console.log(response);

					// reload the page after clicking on a button to update the list
					location.reload();
				} catch (error) {
					console.error('An error occurred while sending the post request');
				}
			});

			// append child element to the parent elemment
			taskButtonsList.appendChild(taskButton);
		}

		// add CSS class to the element
		openTaskButtonsList.classList.add(
			'dynamic-page-kids__tasks-add-task'
		);

		// set the text content of the elements
		openTaskButtonsList.innerText = 'Legg til oppgave';

		// add child elements to the task buttons container
		taskButtonsContainer.appendChild(openTaskButtonsList);
		taskButtonsContainer.appendChild(taskButtonsList);

		return taskButtonsContainer
	}

	// renders the task list by creating the DOM elements and appending them to document body
	function renderHTML() {
		const taskButtonsContainer = createTaskItemDOM();
		document.body.appendChild(taskButtonsContainer);
	}
	renderHTML();
}
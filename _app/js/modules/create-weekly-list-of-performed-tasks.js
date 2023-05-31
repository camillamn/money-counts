/**
 * Creates a weekly list of performed tasks based on the provided data
 * @param {object} weeklyList - The weekly list object with the information about the week's tasks.
 * @param {number} earnings - The total earnings for a week.
 * @returns {HTMLElement} - The created weekly list of performed tasks element.
 */

import { formatDateToFrontend } from '../util/format-date.js';

export default function createWeeklyListOfPerformedTasks(weeklyList, earnings) {
	// create the DOM elements
	const weekNumber = document.createElement('div');
	const paidOrNot = document.createElement('div');
	const performedTasksList = document.createElement('div');
	const earningsItem = document.createElement('div');
	const weeklyListOfPerformedTasks = document.createElement('div');
	
	// add CSS classes to the elements
	weekNumber.classList.add(
		'dynamic-page-kids__week-number', 
		'grid__column--8', 
		'box'
	);
	paidOrNot.classList.add(
		'dynamic-page-kids__week-paid-or-not', 
		'grid__column--6'
	);
	performedTasksList.classList.add(
		'dynamic-page-kids__performed-tasks-list', 
		'box'
	);
	earningsItem.classList.add(
		'dynamic-page-kids__earnings', 
		'box'
	);
	weeklyListOfPerformedTasks.classList.add(
		'dynamic-page-kids__weekly-list', 
		'box'
	);
	

	// set the text content of the elements
	// used this to learn about conditional operator
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator
	weekNumber.textContent = `Uke ${weeklyList.weekNumber}`;
	earningsItem.textContent = `Du har tjent ${earnings.toString()} kroner denne uken`;
	paidOrNot.textContent = `${weeklyList.paid ? 'Pengene er vippset til din konto' : 'Ikke utbetalt enda'}`;
	
	if (weeklyList.tasks && weeklyList.tasks.length > 0) {
		// create the performed task list item
		for (const task of weeklyList.tasks) {
			const taskListItem = document.createElement('li');
			const taskDate = document.createElement('div');
			const taskName = document.createElement('div');
			const taskValue = document.createElement('div');
			
			// add CSS classes to the elements
			taskListItem.classList.add(
				'dynamic-page-kids__performed-tasks-list-item', 
				'grid'
			);
			taskDate.classList.add(
				'dynamic-page-kids__task-date', 
				'grid__column--3', 
				'grid__column-mobile--3'
			);
			taskName.classList.add(
				'dynamic-page-kids__task-name', 
				'grid__column--8',
				'grid__column-mobile--8',
			);
			taskValue.classList.add(
				'dynamic-page-kids__task-value', 
				'grid__column-1',
				'grid__column-mobile--1'
			);
			
			// set the text content of the elements
			taskName.textContent = task.task.name;
			taskDate.textContent = formatDateToFrontend(task.date);
			taskValue.textContent = task.task.value;
			
			// append the child elements to the parent element
			taskListItem.appendChild(taskDate);
			taskListItem.appendChild(taskName);
			taskListItem.appendChild(taskValue);
			
			// append the task list item to the performed tasks list
			performedTasksList.appendChild(taskListItem);
		}

		weekNumber.appendChild(paidOrNot);
		// append the child elements to the weekly list of performed tasks
		weeklyListOfPerformedTasks.appendChild(weekNumber);
		weeklyListOfPerformedTasks.appendChild(earningsItem);
		weeklyListOfPerformedTasks.appendChild(performedTasksList);
	} else {
		// create the no tasks message element
		const noTasksMessage = document.createElement('div');

		// add CSS class to the element
		noTasksMessage.classList.add(
			'dynamic-page-kids__no-tasks-message',
			'box'
		);

		// set the text content of the elements
		noTasksMessage.textContent = 'Du har ikke lagt til noen oppgaver denne uken';

		// append the child elements to the weekly list of performed tasks
		weeklyListOfPerformedTasks.appendChild(weekNumber);
		weeklyListOfPerformedTasks.appendChild(noTasksMessage);
	}
	
	// set the dataset attribute for the weekly list of performed tasks
	weeklyListOfPerformedTasks.dataset.week = `${weeklyList.weekNumber}`;

	// return the created weekly list of performed tasks element
	return weeklyListOfPerformedTasks;
	}

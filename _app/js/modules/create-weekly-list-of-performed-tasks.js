/**
 * used the reference below to 
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator
 */
import { formatDateToFrontend } from '../util/format-date.js';

export default function createWeeklyListOfPerformedTasks(weeklyList, earnings, weeklyInformation, weekNumberElements) {
	const weekNumber = document.createElement('div');
	const paidOrNot = document.createElement('div');
	const performedTasksList = document.createElement('div');
	const earningsItem = document.createElement('div');
	const weeklyListOfPerformedTasks = document.createElement('div');
	
	weekNumber.className = 'dynamic-page-kids__week-number grid__column--8 box';
	paidOrNot.className = 'dynamic-page-kids__week-paid-or-not grid__column--6'
	performedTasksList.className = 'dynamic-page-kids__performed-tasks-list box';
	earningsItem.className = 'dynamic-page-kids__earnings box';
	weeklyListOfPerformedTasks.className = 'dynamic-page-kids__weekly-list box';

	
	weekNumber.textContent = `Uke ${weeklyList.weekNumber}`;
	earningsItem.textContent = `Du har tjent ${earnings.toString()} kroner denne uken`;
	paidOrNot.textContent = `${weeklyList.paid ? 'Pengene er vippset til din konto' : 'Ikke utbetalt enda'}`;
	
	if (weeklyList.tasks && weeklyList.tasks.length > 0) {
		for (const task of weeklyList.tasks) {
			const taskListItem = document.createElement('li');
			const taskDate = document.createElement('div');
			const taskName = document.createElement('div');
			const taskValue = document.createElement('div');
			
			taskListItem.className = 'dynamic-page-kids__performed-tasks-list-item grid';
			taskDate.className = 'dynamic-page-kids__task-date grid__column--3 grid__column-mobile--3';
			taskName.className = 'dynamic-page-kids__task-name grid__column--8 grid__column-mobile--8';
			taskValue.className = 'dynamic-page-kids__task-value grid__column-1 grid__column-mobile--1';
			
			taskName.textContent = task.task.name;
			taskDate.textContent = formatDateToFrontend(task.date);
			taskValue.textContent = task.task.value;
			
			taskListItem.appendChild(taskDate);
			taskListItem.appendChild(taskName);
			taskListItem.appendChild(taskValue);
			
			performedTasksList.appendChild(taskListItem);
		}
		weekNumber.appendChild(paidOrNot);

		weeklyListOfPerformedTasks.appendChild(weekNumber);
		weeklyListOfPerformedTasks.appendChild(earningsItem);
		weeklyListOfPerformedTasks.appendChild(performedTasksList);
	} else {
		const noTasksMessage = document.createElement('div');
		noTasksMessage.textContent = 'Du har ikke lagt til noen oppgaver denne uken';
		weeklyListOfPerformedTasks.appendChild(weekNumber);
		weeklyListOfPerformedTasks.appendChild(noTasksMessage);
	}
	
	
	
	weeklyListOfPerformedTasks.dataset.week = `${weeklyList.weekNumber}`;

	return weeklyListOfPerformedTasks;
	}

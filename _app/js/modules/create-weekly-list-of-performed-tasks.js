/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator
 */
import formatDate from '../util/format-date.js';

export default function createWeeklyListOfPerformedTasks(weeklyList, earnings) {
	const weekNumber = document.createElement('div');
	const paidOrNot = document.createElement('div');
	const performedTasksList = document.createElement('ul');
	const earningsItem = document.createElement('div');

	weekNumber.className = 'static-page-kids__week-number grid__column--6 box';
	paidOrNot.className = 'static-page-kids__paid-or-not grid__column--6'
	performedTasksList.className = 'static-page-kids__performed-tasks-list box';
	earningsItem.className = 'static-page-kids__earnings box';

	weekNumber.textContent = `Uke ${weeklyList.weekNumber}`;
	earningsItem.textContent = `Du har tjent ${earnings.toString()} kroner denne uken`;
	paidOrNot.textContent = `${weeklyList.paid ? 'Pengene er vippset til din konto' : 'Ikke utbetalt enda'}`;
	
	for (const task of weeklyList.tasks) {
		const taskListItem = document.createElement('li');
		const taskDate = document.createElement('div');
		const taskName = document.createElement('div');
		const taskValue = document.createElement('div');

		taskListItem.className = 'static-page-kids__performed-tasks-list-item grid';
		taskDate.className = 'static-page-kids__task-date grid__column--3 grid__column-mobile--3';
		taskName.className = 'static-page-kids__task-name grid__column--8 grid__column-mobile--8';
		taskValue.className = 'static-page-kids__task-value grid__column-1 grid__column-mobile--1';
		
		taskName.textContent = task.task.name;
		taskDate.textContent = formatDate(task.date);
		taskValue.textContent = task.task.value;

		taskListItem.appendChild(taskDate);
		taskListItem.appendChild(taskName);
		taskListItem.appendChild(taskValue);
		performedTasksList.appendChild(taskListItem);
	}

	const weeklyListOfPerformedTasks = document.createElement('div');
	weeklyListOfPerformedTasks.className = 'static-page-kids__week-list box';

	weekNumber.appendChild(performedTasksList);
	weekNumber.appendChild(earningsItem);
	weekNumber.appendChild(paidOrNot);
	weeklyListOfPerformedTasks.appendChild(weekNumber);

return weeklyListOfPerformedTasks;
}
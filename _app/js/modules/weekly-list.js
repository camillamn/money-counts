/** 
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 * 
 * @TODO - need to fetch userAlt as well
 * 		- add errormessage if the slug is not to be found
 * 		- create the user no matter if there is a weeklyList of performed tasks or not
*/

import FetchWeeklyList from './fetch-weekly-lists.js';
import { togglePerformedTasksList } from './toggle-performed-tasks-list.js';
import { sumEarnings } from './calculate-earnings.js';
import { readSlug } from '../util/read-slug.js';
import formatDate from '../util/format-date.js';

export default async function WeeklyList() {
	const slug = readSlug();
	const weeklyListOfPerformedTasks = await FetchWeeklyList();

	let currentUser = null;
	let weekList = null;
	let totalEarnings = null;

	const filteredWeeklyList = weeklyListOfPerformedTasks.filter(
		task => task.user.username === slug);

		if (!filteredWeeklyList.length) {
		return null;
	}

	const weeklyListContainer = document.querySelector('.static-page-users');


	for (const weeklyListOfPerformedTask of filteredWeeklyList) {
		// check if its the same user or not and either adds another task to the current user, or updates the current user
		if (currentUser !== weeklyListOfPerformedTask.user.username) {
			currentUser = weeklyListOfPerformedTask.user.username;

			const userInfo = document.createElement('div');
			const userImage = document.createElement('figure');
			const userImg = document.createElement('img');
			const userName = document.createElement('div');
			
			weekList = document.createElement('ul');

			userInfo.className = 'static-page-users__user-information grid__column--6 box';
			userImage.className = 'static-page-users__user-image';
			userImg.className = 'static-page-users__user-img';
			
			userName.className = 'static-page-users__user-name grid__column--12 box';
			weekList.className = 'static-page-users__week-list grid';

			userName.innerText = weeklyListOfPerformedTask.user.username;
			userImg.src = weeklyListOfPerformedTask.userAvatar;
			// userImg.alt = weeklyListOfPerformedTask.username;

			userImage.appendChild(userImg);
			userInfo.appendChild(userImg);
			userInfo.appendChild(userName);
			userInfo.appendChild(weekList);
			weeklyListContainer.appendChild(userInfo);
		}

		const weekNumber = document.createElement('button');
		const performedTasksList = document.createElement('ul');
		const earningsItem = document.createElement('div');

		const earnings = sumEarnings(weeklyListOfPerformedTask.tasks);
		totalEarnings += earnings;

		weekNumber.className = 'static-page-users__week-number grid__column--12 box';
		performedTasksList.className = 'static-page-users__performed-tasks-list box';
		earningsItem.className = 'static-page-users__earnings';
		
		weekNumber.textContent = `Uke ${weeklyListOfPerformedTask.weekNumber} --- Du har tjent ${earnings.toString()} kroner`;
		// earningsItem.textContent = `Du har tjent ${earnings.toString()} kroner denne uken`;
		
		weekList.appendChild(weekNumber);

		weekNumber.addEventListener('click', () => {
			togglePerformedTasksList(performedTasksList);
		});
		
		for (const task of weeklyListOfPerformedTask.tasks) {
			const taskListItem = document.createElement('li');
			const taskDate = document.createElement('div');
			const taskName = document.createElement('div');
			const taskValue = document.createElement('div');
			
			taskListItem.className = 'static-page-users__performed-tasks-list-item grid';
			taskDate.className = 'static-page-users__task-date grid__column--3 grid__column-mobile--3';
			taskName.className = 'static-page-users__task-name grid__column--8 grid__column-mobile--8';
			taskValue.className = 'static-page-users__task-value grid__column-1 grid__column-mobile--1';
			
			taskName.textContent = task.task.name;
			taskDate.textContent = formatDate(task.date);
			taskValue.textContent = task.task.value;

			performedTasksList.appendChild(taskListItem);
			taskListItem.appendChild(taskDate);
			taskListItem.appendChild(taskName);
			taskListItem.appendChild(taskValue);
		}
		weekNumber.appendChild(performedTasksList);
		weekNumber.appendChild(earningsItem);
	}

	// total earnings
	const totalEarningsItem = document.createElement('div');
	totalEarningsItem.className = 'static-page-users__total-earnings grid__column--12 box';
	totalEarningsItem.textContent = `Totalt har du tjent ${totalEarnings} kroner i år`;
	weeklyListContainer.appendChild(totalEarningsItem);

	return weeklyListContainer;
}

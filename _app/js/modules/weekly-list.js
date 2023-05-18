/** 
 * @TODO - need to fetch userAlt as well
 *  - change button to div, because its not allowed to have a a and button together
*/

import FetchWeeklyList from './fetch-weekly-lists.js';
import { sumEarnings } from './calculate-earnings.js';
import { readSlug } from '../util/read-slug.js';

export default async function WeeklyList() {

	const slug = readSlug();
	console.log(slug);
	const weeklyListOfPerformedTasks = await FetchWeeklyList();
	const filteredWeeklyList = weeklyListOfPerformedTasks.filter(task => task.user.username === slug);
	
	if (!filteredWeeklyList.length) {
		return null;
	}

	const weeklyListContainer = document.querySelector('.static-page-users');

	let currentUser = '';
	let weekList = null;
	let totalEarnings = 0;

	for (const weeklyListOfPerformedTask of filteredWeeklyList) {
		if (currentUser !== weeklyListOfPerformedTask.user.username) {
			currentUser = weeklyListOfPerformedTask.user.username;

			const userInfo = document.createElement('a');
			const userImage = document.createElement('figure');
			const userImg = document.createElement('img');
			const userName = document.createElement('div');
			
			weekList = document.createElement('ul');

			userInfo.className = 'static-page-users__user-information grid__column--4 box';
			userImage.className = 'static-page-users__user-image';
			userImg.className = 'static-page-users__user-img';
			
			userName.className = 'static-page-users__user-name grid__column--12 box';
			weekList.className = 'static-page-users__week-list';

			userName.innerText = weeklyListOfPerformedTask.user.username;
			userImg.src = weeklyListOfPerformedTask.userAvatar;
			// userImg.alt = weeklyListOfPerformedTask.username;

			userImage.appendChild(userImg);
			userInfo.appendChild(userImg);
			userInfo.appendChild(userName);
			userInfo.appendChild(weekList);
			weeklyListContainer.appendChild(userInfo);
		}

		const weekNumber = document.createElement('li');
		const tasksList = document.createElement('ul');
		const earningsItem = document.createElement('div');

		const earnings = sumEarnings(weeklyListOfPerformedTask.tasks);
		console.log(typeof earnings, earnings);
		totalEarnings += earnings;

		weekNumber.className = 'static-page-users__week-number grid__column--12 box';
		tasksList.className = 'static-page-users__tasks-list';
		earningsItem.className = 'static-page-users__earnings box';
		
		weekNumber.textContent = `Uke ${weeklyListOfPerformedTask.weekNumber}`;
		earningsItem.textContent = `Du har tjent ${earnings.toString()} kroner denne uken`;
		
		weekList.appendChild(weekNumber);
		weekList.appendChild(earningsItem);
		
		for (const task of weeklyListOfPerformedTask.tasks) {
			
			const taskListItem = document.createElement('li');
			const taskDate = document.createElement('div');
			const taskName = document.createElement('div');
			const taskValue = document.createElement('div');
			
			taskListItem.className = 'static-page-users__tasks-list-item grid';
			taskDate.className = 'static-page-users__task-date grid__column--3';
			taskName.className = 'static-page-users__task-name grid__column--8';
			taskValue.className = 'static-page-users__task-value grid__column--1';
			
			taskName.textContent = task.task.name;
			taskDate.textContent = task.date;
			taskValue.textContent = task.task.value;

			tasksList.appendChild(taskListItem);
			taskListItem.appendChild(taskDate);
			taskListItem.appendChild(taskName);
			taskListItem.appendChild(taskValue);
		}
		
		weekNumber.appendChild(tasksList);
	}
	// total earnings
	const totalEarningsItem = document.createElement('div');
	totalEarningsItem.className = 'static-page-users__total-earnings grid__column--12 box';
	totalEarningsItem.textContent = `Total earnings: ${totalEarnings}`;
	weeklyListContainer.appendChild(totalEarningsItem);

	return weeklyListContainer;
}

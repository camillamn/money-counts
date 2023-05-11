/** 
 * @TODO - need to fetch userAlt as well
*/

import FetchWeeklyList from './fetch-weekly-lists.js';

export default async function WeeklyList() {

	const weeklyListOfPerformedTasks = await FetchWeeklyList();
	const weeklyListContainer = document.querySelector('.static-page-users');

	let currentUser = '';
	let weekList = null;

	for (const weeklyListOfPerformedTask of weeklyListOfPerformedTasks) {
		if (currentUser !== weeklyListOfPerformedTask.user.username) {
			currentUser = weeklyListOfPerformedTask.user.username;

			const userInfo = document.createElement('div');
			const userImage = document.createElement('figure');
			const userImg = document.createElement('img');
			const userName = document.createElement('div');
			
			weekList = document.createElement('ul');

			userInfo.className = 'static-page-users__user-information grid__column--4 box';
			userImage.className = 'static-page-users__user-image';
			userImg.className = 'static-page-users__user-img';
			
			userName.className = 'static-page-users__user-name box';
			weekList.className = 'static-page-users__week-list box';

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

		weekNumber.className = 'static-page-users__week-number box';
		tasksList.className = 'static-page-users__tasks-list';

		weekNumber.textContent = `Week ${weeklyListOfPerformedTask.weekNumber}`;

		weekList.appendChild(weekNumber);

		for (const task of weeklyListOfPerformedTask.tasks) {
			
			const taskListItem = document.createElement('li');
			const taskDate = document.createElement('div');
			const taskName = document.createElement('div');
			const taskValue = document.createElement('div');
			
			taskListItem.className = 'static-page-users__tasks-list-item grid';
			taskDate.className = 'static-page-users__task-date grid__column--4';
			taskName.className = 'static-page-users__task-name grid__column--6';
			taskValue.className = 'static-page-users__task-value grid__column--2';
			
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
	return weeklyListContainer;
}

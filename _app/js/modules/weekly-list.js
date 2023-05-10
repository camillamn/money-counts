// import { sanity } from '../sanity.js';
import FetchWeeklyList from './fetch-weekly-lists.js';

export default async function WeeklyList() {

	const weeklyListOfPerformedTasks = await FetchWeeklyList('user');
const weeklyListContainer = document.querySelector('.weekly-list__container');

	for (const weeklyListOfPerformedTask of weeklyListOfPerformedTasks) {

		const weekNumber = document.createElement('h3');
		weekNumber.textContent = `Week ${weeklyListOfPerformedTask.weekNumber}`;

		const userAvatar = weeklyListOfPerformedTask.userAvatar;
		const userName = weeklyListOfPerformedTask.user.username;
		
		const userInfo = document.createElement('div');
		userInfo.classList.add('user-info');

		const userAvatarImg = document.createElement('img');
		userAvatarImg.src = userAvatar;

		const userNameSpan = document.createElement('span');
		userNameSpan.textContent = `User: ${userName}`;

		userInfo.appendChild(userAvatarImg);
		userInfo.appendChild(userNameSpan);
		weeklyListContainer.appendChild(userInfo);


		const tasksList = document.createElement('ul');

		for (const task of weeklyListOfPerformedTask.tasks) {
			
			const taskListItem = document.createElement('li');
			
			const taskDate = document.createElement('span');
			taskDate.textContent = task.date;
			
			const taskName = document.createElement('span');
			taskName.textContent = task.task.name;
			
			const taskValue = document.createElement('span');
			taskValue.textContent = task.task.value;
			
			taskListItem.appendChild(taskDate);
			taskListItem.appendChild(taskName);
			taskListItem.appendChild(taskValue);
			tasksList.appendChild(taskListItem);
		}
			weeklyListContainer.appendChild(weekNumber);
			weeklyListContainer.appendChild(tasksList);
		}

	 return weeklyListContainer;
  }


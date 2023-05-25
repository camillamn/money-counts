/** 
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set
 * 
 * @TODO - need to fetch userAlt as well
 * 		- add errormessage if the slug is not to be found
 * 		- create the user no matter if there is a weeklyList of performed tasks or not
*/

// import UserList from './user-list.js';
// import { togglePerformedTasksList } from './toggle-performed-tasks-list.js';
// import { createDropdownMenu } from './create-dropdown-menu.js';
// import formatDate from '../util/format-date.js';
// import { getWeekNumber } from '../../../_studio/schemas/utils.js';
import FetchWeeklyLists from './fetch-weekly-lists.js';
import { createUserInfo } from './create-user-info.js';
import { sumEarnings } from './calculate-earnings.js';
import { readSlug } from '../util/read-slug.js';
import createWeeklyListOfPerformedTasks from './create-weekly-list-of-performed-tasks.js';
import AddTasksToWeeklyList from './add-tasks-to-weekly-list.js';

export default async function WeeklyLists() {
	const weeklyListsContainer = document.querySelector('.static-page-kids');
	
	const weeklyListsOfPerformedTasks = await FetchWeeklyLists();
	const slug = readSlug();
	console.log(slug);

	let currentUser = null;
	const weeklyInfo = document.createElement('section');
	weeklyInfo.className = 'static-page-kids__weekly-information grid__column--6 box';

	const filteredWeeklyListsBySlug = weeklyListsOfPerformedTasks.filter(
		weeklyList => weeklyList.user.username === slug
	)
	console.log(filteredWeeklyListsBySlug);

	for (const weeklyList of filteredWeeklyListsBySlug) {
		// prevent duplicate of user and add the weekly lists to the current user based on slug
		if (currentUser !== weeklyList.user.username) {
			currentUser = weeklyList.user.username;

		const userInfo = createUserInfo(
			weeklyList.user.username, 
			weeklyList.userAvatar
		);
			weeklyListsContainer.appendChild(userInfo);
		}
		
		const earnings = sumEarnings(weeklyList.tasks);

		const performedTasksList = createWeeklyListOfPerformedTasks(
			weeklyList, 
			earnings
		);
		weeklyInfo.appendChild(performedTasksList);

		// const taskButtonsContainer = document.querySelector('.static-page-kids__task-buttons-container');
		const taskButtons = document.querySelectorAll('.static-page-kids__task-button');
		taskButtons.forEach(button => {
			button.addEventListener('click', handleTaskButtonClick);
			});
		
		function handleTaskButtonClick(event) {
			const button = event.currentTarget;
			const taskId = button.dataset.taskId;
			AddTasksToWeeklyList(currentUser, taskId, weeklyList.user_id, weeklyList.weekNumber);
			console.log("Clicked on button. Current user:", currentUser, "Task ID",taskId);
			};
		
		}
	weeklyListsContainer.appendChild(weeklyInfo);
}
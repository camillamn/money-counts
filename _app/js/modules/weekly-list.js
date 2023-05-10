import { sanity } from '../sanity.js';

export default async function WeeklyList(user) {
	const query = `*[_type == 'weeklyList'] | order(weekNumber asc){
		weekNumber,
		"user": user->{username},
		 "userAvatar": user->avatar.asset->url,
		 tasks[]{
			date,
			 "task": task->{
				 name,
			  	value
			}
		 }
	  }`;

	// fetch weekly-lists sorted by weekNumber from sanity
	const weeklyPerformedTasksLists = await sanity.fetch(query);

	console.log(weeklyPerformedTasksLists)

	const weeklyListContainer = document.createElement('div');

	for (const weeklyPerformedTasksList of weeklyPerformedTasksLists) {

		const weekNumber = document.createElement('h3');
		weekNumber.textContent = `Week ${weeklyPerformedTasksList.weekNumber}`;

		const tasksList = document.createElement('ul');

		for (const task of weeklyPerformedTasksList.tasks) {
			
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


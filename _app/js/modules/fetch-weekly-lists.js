import { sanity } from '../sanity.js';

export default async function FetchWeeklyList() {
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
	const weeklyListOfPerformedTasks = await sanity.fetch(query);

	console.log(weeklyListOfPerformedTasks)

	return weeklyListOfPerformedTasks;
}
import { sanity } from '../sanity.js';

export default async function WeeklyList() {
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
}
import { sanity } from '../sanity.js';

export default async function FetchWeeklyLists() {
	const query = `*[_type == 'weeklyList'] | order(weekNumber asc, tasks.date asc) {
		_id,
		weekNumber,
		paid,
		"user": user->{username},
		"slug": user->slug.current,
		"userAvatar": user->avatar.asset->url,
		 tasks[]{
			date,
			 "task": task->{
				name,
			  	value
			}
		 } | order(date asc)
	  }`;

	// fetch weekly-lists sorted by weekNumber from sanity
	const weeklyListsOfPerformedTasks = await sanity.fetch(query);

	// console.log(weeklyListOfPerformedTasks)

	return weeklyListsOfPerformedTasks;
}
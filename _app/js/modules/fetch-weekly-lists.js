/**
 * Fetches the list of all weekly lists in the database
 * @returns {Promise<Array<object>>} - A promise that returns an array of all the weekly list objects
 */

import { sanity } from '../sanity.js';

export default async function FetchWeeklyLists() {
	// define the query to fetch all lists
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

	return weeklyListsOfPerformedTasks;
}
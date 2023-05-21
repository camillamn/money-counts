/**
 * documentation;
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
 * https://www.sanity.io/docs/date-type
 * https://www.sanity.io/docs/query-cheat-sheet
 * https://www.delftstack.com/howto/javascript/javascript-get-week-number/?utm_content=cmp-true
 * 
 */

import { sanity } from "../../_app/js/sanity.js";

/* function to get the weekNumber based on the given date (ISO8601 standard)
	sets the first week of the year to the week with the first Thursday in it */
export function getWeekNumber(date) {
	const currentDate = new Date(date);
	// sets the time to midnight to remove the hours and minutes
	currentDate.setHours(0, 0, 0, 0);

	// sets the first day of the week to monday
	const dayOfTheWeek = (currentDate.getDay() + 6) % 7;
	currentDate.setDate(currentDate.getDate() - dayOfTheWeek + 3);

	const startOfTheYear = new Date(currentDate.getFullYear(), 0, 1);
	const diff = currentDate - startOfTheYear;

	// calculates the week number by dividing the difference
	// by the number of milliseconds in one week,
	// then adding 1 to start week number with 1
	const weekNumber = Math.floor(diff / 604800000) + 1;

	return weekNumber;
}


/* function to prevent the user from creating more than one list per week */
export async function validateWeeklyListCreation(userRef, weekNumber, existingWeeklyListId) {
	const query = `
		*[(_type == 'weeklyList' || _type == 'weeklyList.draft') && 
			user._ref == $userRef &&
			weekNumber == $weekNumber
		]`;

	// fetch existing weekly lists and drafts
	const existingWeeklyLists = await sanity.fetch(query, { 
		userRef, 
		weekNumber
	});

	// check if there is any drafts for the given user and week number
	// and allow publish if there is a draft for the given week
	const draftExists = existingWeeklyLists.some(list => list._id.startsWith('drafts.'));
	if (draftExists) {
		return true;
	}

	// check if there is any list for the given user and week number
	// and if there is, it checks if the existing list id matches the
	// existingWeeklyListId (for update purposes)
	if (existingWeeklyLists.length > 0) {
		if (!existingWeeklyListId || existingWeeklyLists[0]._id !== existingWeeklyListId) {
			throw new Error(`You already have a list for the week ${weekNumber}`)
		}
	}
	// allow creation if no draft or existing list is found for the
	// given user and week
	return true;
	}
/**
 * this function is made to find the week number based on
 * the ISO8601 standard that sets the first week of the
 * year to the week with the first Thursday in it.
 * 
 * documentation I've used;
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
 * https://www.sanity.io/docs/date-type
 * https://www.sanity.io/docs/query-cheat-sheet
 * https://www.delftstack.com/howto/javascript/javascript-get-week-number/?utm_content=cmp-true
 * 
 */

export function getWeekNumber(date) {
	const currentDate = new Date(date);
	// sets the time to midnight
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
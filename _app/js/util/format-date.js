/**
 * Formats a date to a local string for frontend use
 * @param {Date} date - The date that needs to be formatted
 * @returns {string} - The formatted date as a string
 * 
 * Reference:
 * Date-time-format - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
 *
 */


export function formatDateToFrontend(date) {
	const options = {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
	}
	const formattedDateToFrontend = new Date(date).toLocaleDateString('no-NO', options);
	return formattedDateToFrontend;
}
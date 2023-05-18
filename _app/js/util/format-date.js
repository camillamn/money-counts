/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
 */

export default function formatDate(date) {
	const options = {
		// weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}
	const formattedDate = new Date(date).toLocaleDateString('no-NO', options);
	return formattedDate;
}
/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
 */

export function formatDateToFrontend(date) {
	const options = {
		// weekday: 'long',
		day: '2-digit',
		month: 'long',
		year: 'numeric',
	}
	const formattedDateToFrontend = new Date(date).toLocaleDateString('no-NO', options);
	return formattedDateToFrontend;
}

export function formatDateToSanity(date) {
	const options = {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	}
	const formattedDateToSanity = new Date(date).toLocaleDateString('nl-NL', options);
	return formattedDateToSanity;
	
}
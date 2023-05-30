/**
 * function to generate a unique key string in order to 
 * edit the weekly list with the use of sanity API client
 * based on this code
 * https://stackoverflow.com/questions/3231459/how-can-i-create-unique-ids-with-javascript
*/
export function generateUniqueKey() {
	const timestamp = new Date().getTime();
	const randomNumber = Math.floor(Math.random() * 1000);
	const key = `${timestamp}_${randomNumber}`;

	return key;
}
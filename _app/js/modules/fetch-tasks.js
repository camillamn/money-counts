/**
 * Fetches the list of all tasks in the database
 * @returns {Promise<Array<object>>} - A promise that returns an array of task objects
 */
import { sanity } from '../sanity.js';

export default async function FetchTasks() {
	// define the query to fetch all tasks
   const query = `*[_type == 'task'] | order(name asc) {
		_id,
      name,
      value
   }`;

   // fetch tasks from the sanity database using query
   const tasks = await sanity.fetch(query);

	return tasks;
}
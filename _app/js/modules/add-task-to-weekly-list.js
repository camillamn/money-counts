/**
 * The function adds a task to the selected weekly list.
 * @param {string} taskId - ID of the task that should be added.
 * @returns {Promise<void} - Resolves when the task is successfully added to the list.
 * 
 * I used this to learn more about how to add tasks at the and of an array
 * https://www.sanity.io/docs/http-patches
 * 
 * @TODO - Need to figure out why is's possible to add tasks to a date that is not within the given week
 *  when i patch from frontend, but in Sanity I have a rule that prohibits dates outside the given week.
 *  I've added a temporarly function that sends an error to the console if the user tries to add a task to
 *  the "wrong" week.
 */

import { getWeekNumber } from "../../../_studio/schemas/utils.js";
import { sanity } from "../sanity.js";
import { generateUniqueKey } from "../util/generate-unique-key.js";
import FetchWeeklyLists from "./fetch-weekly-lists.js";

export default async function addTaskToWeeklyList(taskId) {
	// get the ID of the selected weekly list
	const selectedWeeklyListId = document.querySelector('.dynamic-page-kids__select-week-number').value;

	try {
		// fetch weekly lists from the API and find the selected weekly list amoung them
		const weeklyLists = await FetchWeeklyLists();
		const selectedWeeklyList = weeklyLists.find((list) => list._id === selectedWeeklyListId);

		if (selectedWeeklyList) {
			// get the current week number
			const currentWeek = getWeekNumber(new Date());

			if (selectedWeeklyList.weekNumber === currentWeek) {
				// get the current date and format it to fit sanity schema
				const currentDate = new Date();
				const formattedDate = currentDate.toISOString();

				// create a new task object to add to the array
				const newTask = {
					_key: generateUniqueKey(),
					task: {
						_ref: taskId,
						_type: 'reference'
					},
					date: formattedDate
				};

				// create an array to store mutations to update the model
				let mutations = [];

				// check if there are tasks in the selected week or not
				if (selectedWeeklyList.tasks && selectedWeeklyList.tasks.length > 0) {
					// insert the new task after the last task in the array
					const insertMutation = {
						'patch': {
							id: selectedWeeklyList._id,
							insert: {
								after: 'tasks[-1]',
								items: [newTask],
							},
						},
					};
					mutations.push(insertMutation);
					// if no tasks exist yet, set the array with the new task
					} else {
					const setMutation = {
						patch: {
							id: selectedWeeklyList._id,
							set: { tasks: [newTask] }
						}
					};
					mutations.push(setMutation);
				}
				
			// set dryRun to true to test the mutation, it will return the document with
			// mutations in the console, without affecting the real document
			const params = {
				dryRun: false
			};
			
			const result = await sanity.mutate(mutations, params);
			console.log(result);
			} else {
				console.error('Its only possible to add tasks to the current week');
			}
		} else {
			console.error('Selected weekly list is not found');
		}
	} catch(error) {
		// handle error if it occurs during the process
		console.error(error.message);
		throw error;
	}
}
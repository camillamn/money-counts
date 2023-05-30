/**
 * used this to learn more about how to add tasks at the and of an array
 * https://www.sanity.io/docs/http-patches
 */

import { sanity } from "../sanity.js";
import { generateUniqueKey } from "../util/generate-unique-key.js";
import FetchWeeklyLists from "./fetch-weekly-lists.js";

export default async function addTaskToWeeklyList(taskId) {
	// model
	const selectedWeeklyListId = document.querySelector('.static-page-kids__select-week-number').value;

		try {
			// fetch weekly lists from the model and 
			// find the selected weekly list amoung them
			const weeklyLists = await FetchWeeklyLists();
			const selectedWeeklyList = weeklyLists.find((list) => list._id === selectedWeeklyListId);

			if (selectedWeeklyList) {
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

				// check if there are tasks in the array or not
				if (selectedWeeklyList.tasks && selectedWeeklyList.tasks.length > 0) {
					// insert newTask after the last task in the array
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
					// if no array of tasks yet(it's empty), 
					// set the array with the new task
					} else {
					const setMutation = {
						patch: {
							id: selectedWeeklyList._id,
							set: { tasks: [newTask] }
						}
					};
					mutations.push(setMutation);
				}
				
				// set to true to test the mutation, it will return the document with
				// mutations, only in the console, without affecting the real document
				const params = {
					dryRun: false
				};
				
				const result = await sanity.mutate(mutations, params);
				console.log(result);
			} else {
				console.error('Selected weekly list is not found');
			}

		} catch(error) {
			// handle error if it occurs during the process
			console.error(error.message);
			throw error;
		}
	}
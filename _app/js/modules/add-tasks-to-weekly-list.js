/**
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
 */
import { getWeekNumber } from "../../../_studio/schemas/utils.js";
import { sanity } from "../sanity.js";
import FetchWeeklyLists from "./fetch-weekly-lists.js";

export default async function AddTasksToWeeklyList(currentUser, taskId, userId, weekNumber) {
	const addTaskButton = document.createElement('button');
	addTaskButton.className = 'static-page-kids__week-list-add-task-button';

	addTaskButton.addEventListener('click', addTaskToExistingList);

	async function addTaskToExistingList(event) {
		// get the taskId from the clicked button
		const taskId = event.target.dataset.taskId;

		try {
			const weeklyLists = await FetchWeeklyLists();

			const currentUserWeeklyList = weeklyLists.find(weeklyList => 
				weeklyList.user.username === currentUser && 
				weeklyList.weekNumber === weekNumber
				);
				console.log(currentUserWeeklyList);

			if (!currentUserWeeklyList) {
				console.log('There is no current weekly list for this user');
				return;
			}

			const newTask = {
				task: { _ref: taskId },
				date: new Date().toISOString().split('T')[0],
			};

			const mutations = {
					'patch': {
						id: 'currentUserWeeklyList._id',
						set: {
							tasks: [
								...currentUserWeeklyList.tasks, 
								newTask
							],
						},
					},
			};

			const params = {
				dryRun: false
			}

			const result = await sanity.mutate(mutations, params);
			console.log(result);
		} catch(error) {
			console.error(error.message);
		}
	}
}
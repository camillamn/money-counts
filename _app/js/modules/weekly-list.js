/** 
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set
 * 
 * @TODO - need to fetch userAlt as well
 * 		- add errormessage if the slug is not to be found
 * 		- create the user no matter if there is a weeklyList of performed tasks or not
*/

// import { getWeekNumber } from '../../../_studio/schemas/utils.js';
import FetchWeeklyLists from './fetch-weekly-lists.js';
import { createUserInfo } from './create-user-info.js';
import { sumEarnings } from './calculate-earnings.js';
import { readSlug } from '../util/read-slug.js';
import createWeeklyListOfPerformedTasks from './create-weekly-list-of-performed-tasks.js';
import { getWeekNumber } from '../../../_studio/schemas/utils.js';
// import AddTasksToWeeklyList from './add-tasks-to-weekly-list.js';

export default async function WeeklyLists() {
	// import all the weekly lists
	const weeklyListsOfPerformedTasks = await FetchWeeklyLists();

	// read the slug in the path
	const slug = readSlug();
	console.log(slug);

	let selectedWeekNumber = null;

	function createWeeklyListContainerDOM() {
		// set the container element
		const weeklyListsContainer = document.querySelector('.static-page-kids');

		// create the container children
		const userInfo = document.createElement('section');
		const weeklyInfo = document.createElement('section');
		
		userInfo.classList.add(
			'static-page-kids__user-information', 
			'grid__column--6', 
			'box'
		);

		weeklyInfo.classList.add(
			'static-page-kids__weekly-information', 
			'grid__column--6', 
			'box'
		);

		// create the dropdown container
		const dropdownContainer = document.createElement('div');
			dropdownContainer.classList.add(
				'static-page-kids__week-number-dropdown', 
				'grid__column--19', 
				'box'
			);
		
		const selectWeekNumber = document.createElement('select');
			selectWeekNumber.classList.add(
				'static-page-kids__select-week-number'
			);
		
		const defaultOption = document.createElement('option');
			defaultOption.textContent = `Velg ukenummer`;
			defaultOption.selected = true;

		selectWeekNumber.appendChild(defaultOption);
		dropdownContainer.appendChild(selectWeekNumber);

		// filter all the weekly lists by the slug so that only the weekly lists that
		// belongs to the user with the slug is available
		const filteredWeeklyListsBySlug = weeklyListsOfPerformedTasks.filter(
			weeklyList => weeklyList.user.username === slug)
			
			// set the current user to null
			let currentUser = null;
			
		// find and add user information to the DOM
		for (const weeklyList of filteredWeeklyListsBySlug) {
			// prevent duplicate of user and add the weekly lists to the current user based on slug
			if (currentUser !== weeklyList.user.username) {
				currentUser = weeklyList.user.username;
				
				const userInfo = createUserInfo(
					weeklyList.user.username, 
					weeklyList.userAvatar
				);
				weeklyListsContainer.appendChild(userInfo);
			}
		}

		weeklyInfo.appendChild(dropdownContainer);

		// get the week numbers and year from the weekly lists and add them to the dropdown options
		const weekNumbers = filteredWeeklyListsBySlug.map((weeklyList) => {
			const tasks = weeklyList.tasks;
			const year = tasks.length > 0 ? new Date(tasks[0].date).getFullYear() : new Date().getFullYear();
			return {
				weekNumber: weeklyList.weekNumber,
				year: year
			};
		});

		// sort week numbers based on the year
		weekNumbers.sort((a, b) => a.year - b.year);

		weekNumbers.forEach((weekData) => {
			const option = document.createElement('option');
			option.textContent = `${weekData.year} - uke ${weekData.weekNumber}`;
			option.value = filteredWeeklyListsBySlug.find(
				(weeklyList) => weeklyList.weekNumber === weekData.weekNumber)._id;

			const currentWeek = getWeekNumber(new Date());
				if (weekData.weekNumber === currentWeek) {
					option.selected = true;
				}
				console.log(currentWeek)
			selectWeekNumber.appendChild(option);
		});

			weeklyListsContainer.appendChild(weeklyInfo);

			function updateFilteredWeeklyListsBySlug(selectedWeekNumber) {
				if (selectedWeekNumber === null) {
					const currentWeek = getWeekNumber(new Date());
					selectedWeekNumber = filteredWeeklyListsBySlug.find(
						(weeklyList) => weeklyList.weekNumber === currentWeek)?._id;
				}
				const weeklyListContainer = document.querySelector('.static-page-kids__weekly-list');

				if (weeklyListContainer) {
					weeklyListContainer.remove();
				}

				// get the selected week based on the option
				const selectedWeeklyList = filteredWeeklyListsBySlug.find(weeklyList => weeklyList._id === selectedWeekNumber);
					if( selectedWeeklyList) {
						const weeklyListOfPerformedTasks = createWeeklyListOfPerformedTasks(
						selectedWeeklyList,
						selectedWeeklyList.tasks ? sumEarnings(selectedWeeklyList.tasks) : 0,
						weeklyInfo,
						weekNumbers
						);
						weeklyInfo.appendChild(weeklyListOfPerformedTasks);
					}
				}

					selectWeekNumber.addEventListener('change', (event) => {
						selectedWeekNumber = event.target.value;
						updateFilteredWeeklyListsBySlug(selectedWeekNumber);
						console.log(selectedWeekNumber);
					});

				updateFilteredWeeklyListsBySlug(selectedWeekNumber);

				return weeklyListsContainer;
			
		}	
		function renderHTML() {
			console.log('rendering HTML...');
			const weeklyListsContainer = createWeeklyListContainerDOM();
			document.body.appendChild(weeklyListsContainer);
			}
		renderHTML();
}
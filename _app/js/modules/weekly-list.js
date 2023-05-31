/** 
 * References:
 * Array.filter - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 * Array.flatMap - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap
 * Date.getFullYear - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear
 * Set - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set
 * 
 * @TODO - need to fetch userAlt as well
 * 		- add errormessage if the slug is not to be found
*/

// import { getWeekNumber } from '../../../_studio/schemas/utils.js';
import FetchWeeklyLists from './fetch-weekly-lists.js';
import { createUserInfo } from './create-user-info.js';
import { sumEarnings } from '../util/calculate-earnings.js';
import { readSlug } from '../util/read-slug.js';
import createWeeklyListOfPerformedTasks from './create-weekly-list-of-performed-tasks.js';
import { getWeekNumber } from '../../../_studio/schemas/utils.js';

export default async function WeeklyLists() {
	// import all the weekly lists
	const weeklyListsOfPerformedTasks = await FetchWeeklyLists();

	// read the slug in the path
	const slug = readSlug();
	console.log(slug);

	let selectedWeekNumber = null;

	function createWeeklyListContainerDOM() {
		// set the container element
		const weeklyListsContainer = document.querySelector('.dynamic-page-kids');

		// create the container children
		const userInfo = document.createElement('section');
		const weeklyInfo = document.createElement('section');
		const dropdownContainer = document.createElement('div');
		const selectWeekNumber = document.createElement('select');
		const defaultOption = document.createElement('option');

		// add CSS classes to the elements
		userInfo.classList.add(
			'dynamic-page-kids__user-information', 
			'grid__column--6', 
			'box'
		);
		weeklyInfo.classList.add(
			'dynamic-page-kids__weekly-information', 
			'grid__column--6', 
			'box'
		);
		dropdownContainer.classList.add(
			'dynamic-page-kids__week-number-dropdown', 
			'grid__column--19', 
			'box'
		);
		selectWeekNumber.classList.add(
			'dynamic-page-kids__select-week-number'
		);

		// create a default option in the select element
		defaultOption.textContent = `Velg ukenummer`;
		defaultOption.selected = true;

		// append child elements to the parent element
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
		// add child element to the parent element
		weeklyInfo.appendChild(dropdownContainer);

		// get the week numbers and year from the weekly lists and add them to the dropdown options
		const weekNumbers = filteredWeeklyListsBySlug.map((weeklyList) => {
			const tasks = weeklyList.tasks;
			let year;
			if( tasks && tasks.length > 0) {
				year = new Date(tasks[0].date).getFullYear()
			} else {
				year = new Date().getFullYear()
			}
			return {
				weekNumber: weeklyList.weekNumber,
				year: year
			};
		});

		// sort week numbers based on the year
		weekNumbers.sort((a, b) => a.year - b.year);

		// create a week number option based on the weekly lists
		weekNumbers.forEach((weekData) => {
			const option = document.createElement('option');
			option.textContent = `${weekData.year} - uke ${weekData.weekNumber}`;
			option.value = filteredWeeklyListsBySlug.find(
				(weeklyList) => weeklyList.weekNumber === weekData.weekNumber)._id;

			// if there is a weekly list for the current week, it will be selected by default
			const currentWeek = getWeekNumber(new Date());
				if (weekData.weekNumber === currentWeek) {
					option.selected = true;
				}
			// add child element to the parent element
			selectWeekNumber.appendChild(option);
		});
		// add weekly info element to weekly lists element
		weeklyListsContainer.appendChild(weeklyInfo);

		// sets the week number to the curent week if no week is selected
		function updateFilteredWeeklyListsBySlug(selectedWeekNumber) {
			if (selectedWeekNumber === null) {
				const currentWeek = getWeekNumber(new Date());
				selectedWeekNumber = filteredWeeklyListsBySlug.find(
					(weeklyList) => weeklyList.weekNumber === currentWeek)?._id;
			}
			const weeklyListContainer = document.querySelector('.dynamic-page-kids__weekly-list');

			// empty the container 
			if (weeklyListContainer) {
				weeklyListContainer.remove();
			}

			// get the selected week based on the option
			const selectedWeeklyList = filteredWeeklyListsBySlug.find(weeklyList => 
				weeklyList._id === selectedWeekNumber);
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

			// handle click event to update the weekly list that is displayed
			selectWeekNumber.addEventListener('change', (event) => {
				selectedWeekNumber = event.target.value;
				updateFilteredWeeklyListsBySlug(selectedWeekNumber);
				console.log(`Selected weekNumberID: ${selectedWeekNumber}`);
			});
			const eventChange = new Event('change');
			selectWeekNumber.dispatchEvent(eventChange);
			
			updateFilteredWeeklyListsBySlug(selectedWeekNumber);

		return weeklyListsContainer;
		}

		// renders the weekly list by creating the DOM elements and appending them to document body
		function renderHTML() {
			const weeklyListsContainer = createWeeklyListContainerDOM();
			document.body.appendChild(weeklyListsContainer);
			}
		renderHTML();
}
/**
 * used these sites as referance to the code below
 * https://stackoverflow.com/questions/69375652/how-to-get-the-years-from-an-array-of-dates-in-order
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
 */
import { getWeekNumber, validateWeeklyListCreation } from "../utils.js";

export default {
	title: 'Weekly list',
	name: 'weeklyList',
	type: 'document',
	fields: [
		{
			title: 'User',
			name: 'user',
			type: 'reference',
			to: [{ type: 'user' }],
			validation: Rule => Rule.required(),
	 	},
	  	{
			title: 'Week number',
			name: 'weekNumber',
			type: 'number',
			initialValue: () => ({ 
				weekNumber: getWeekNumber(new Date()),
			}),
			validation: Rule =>
				Rule.required().custom(async (weekNumber, { document }) => {
					const userRef = document.user._ref;
					const existingWeeklyListId = document._id;

			// validate the creation of weekly list
			try {
				await validateWeeklyListCreation(userRef, existingWeeklyListId, weekNumber);
				return true;
			} catch (error) {
				return error.message;
			}
		 }),
		},
	  	{
			title: 'Tasks',
			name: 'tasks',
			type: 'array',
			of: [{
			  type: 'object',
			  fields: [
				 {
					title: 'Task',
					name: 'task',
					type: 'reference',
					to: [{ type: 'task' }]
				 },
				 {
					title: 'Date',
					name: 'date',
					type: 'date',
					options: {
					  dateFormat: 'DD.MM.YYYY',
					  calendarTodayLabel: 'today',
					},
					// check if the date is in selected week number
					validation: Rule =>
						Rule.required().custom((date, { document }) => {
							const selectedWeekNumber = getWeekNumber(date);

							if (selectedWeekNumber === document.weekNumber) {
								return true;
							} else {
								return 'Du kan bare legge inn dato for uke ' + document.weekNumber;
							}
						}),
					},
			  ],
				preview: {
					select: {
						taskName: 'task.name',
						date: 'date',
						value: 'task.value'
				 	},
					prepare: ({ taskName, value }) => {

						return {
							title: `${taskName} - ${value} NOK`,
						}
				 },
			  }
			}
		],
	  	},
		{
		  title: 'Paid',
		  name: 'paid',
		  type: 'boolean',
		},
	],
	preview: {
	  select: {
			username: 'user.name',
			weekNumber: 'weekNumber',
			tasks: 'tasks',
	  	},
		prepare: ({ username, weekNumber, tasks }) => {
			let year;
			if (tasks && tasks.length > 0) {
				// convert the tasks dates to Date objects and extract the unique years from it,
				// then make a new array based on theese years
				year = [...new Set(tasks.map(task => new Date(task.date).getFullYear()))];
			} else {
				year = 'undefined';
			} 
			return {
			title: `${username} - Week ${weekNumber} - ${year}`,
			}
		},
	},
	initialValue: () => ({
		paid: false,
		weekNumber: getWeekNumber(new Date()),
	}),

};

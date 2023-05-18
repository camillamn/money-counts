import { getWeekNumber } from "../utils.js";

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
		 validation: (Rule) => Rule.required(),
	  },
	  {
		title: 'Week number',
		name: 'weekNumber',
		type: 'number',
		initialValue: () => ({
			weekNumber: getWeekNumber(new Date()),
		 }),
	 },
	  {
		 title: 'Tasks',
		 name: 'tasks',
		 type: 'array',
		 of: [
			{
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
					  dateFormat: 'DD-MMMM-YYYY WW',
					  calendarTodayLabel: 'today',
					},
					validation: (Rule) =>
						Rule.required().custom((date, { document }) => {
							const selectedWeekNumber = getWeekNumber(date);

							if (selectedWeekNumber === document.weekNumber) {
								return true;
							} else {
								return 'Du kan bare legge inn dato for uke ' + document.weekNumber;
							}
						}),
						}
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
		 validation: (Rule) => Rule.required(),
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
		 tasks: 'tasks'
	  },
		prepare: ({ username, weekNumber }) => {
		return {
			title: `${username} - Week ${weekNumber}`,
		 }
		},
	},
	initialValue: () => ({
		paid: false,
		weekNumber: getWeekNumber(new Date()),
	}),

};
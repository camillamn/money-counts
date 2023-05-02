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
		 validation: Rule => Rule.required().min(1).max(53),
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
					  dateFormat: 'DD-MM-YYYY',
					},
					validation: (Rule) => Rule.required(),
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
 }
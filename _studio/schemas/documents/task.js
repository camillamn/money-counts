export default {
	title: 'Task',
	name: 'task',
	type: 'document',
	fields: [
		{
			title: 'Name',
			name: 'name',
			type: 'string',
		},
		{
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			options: {
				source: 'name'
			}
		},
		{
			title: 'Value',
			description: 'Value in NOK',
			name: 'value',
			type: 'number',
		},
	]
}
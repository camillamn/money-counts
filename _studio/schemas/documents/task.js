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
			title: 'Description',
			name: 'description',
			type: 'text',
		},
		{
			title: 'Value',
			description: 'Value in NOK',
			name: 'value',
			type: 'number',
		},
	]
}
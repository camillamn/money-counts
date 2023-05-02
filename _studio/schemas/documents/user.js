export default {
	title: 'User',
	name: 'user',
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
			title: 'Role',
			name: 'role',
			type: 'string',
		},
		{
			title: 'Avatar',
			name: 'avatar',
			type: 'image',
		},

	]
}
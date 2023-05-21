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
			title: 'Username',
			name: 'username',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			title: 'Password',
			name: 'password',
			type: 'string',
			validation: Rule => Rule.required(),
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
	],
	preview: {
		select: {
			name: 'name',
			avatar: 'avatar',
		},

		prepare: (fields) => {
			return {
				title: fields.name,
				media: fields.avatar,
			}
		},
	},
}
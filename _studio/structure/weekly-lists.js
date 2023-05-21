export default Structure => {
	const { divider, editor, list, listItem, documentTypeList, documentTypeListItem } = Structure

	return list()
			.title('Content')
			.items([
				documentTypeListItem('weeklyList'),

				divider(),

				documentTypeListItem('user'),
				documentTypeListItem('task'),
			])
}
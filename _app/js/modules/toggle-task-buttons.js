export function toggleTaskButtons(taskButtonsList) {
	if (taskButtonsList.classList.contains('static-page-kids__task-buttons-list--visible')) {
		taskButtonsList.classList.remove('static-page-kids__task-buttons-list--visible');
	} else {
		taskButtonsList.classList.add('static-page-kids__task-buttons-list--visible');
	}
}
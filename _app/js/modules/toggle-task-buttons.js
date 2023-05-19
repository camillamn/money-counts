export function toggleTaskButtons(taskButtonsContainer) {
	if (taskButtonsContainer.classList.contains('static-page-kids__task-buttons-container--visible')) {
		taskButtonsContainer.classList.remove('static-page-kids__task-buttons-container--visible');
	} else {
		taskButtonsContainer.classList.add('static-page-kids__task-buttons-container--visible');
	}
}
export function togglePerformedTasksList(performedTasksList) {
	if (performedTasksList.classList.contains('static-page-kids__performed-tasks-list--visible')) {
		performedTasksList.classList.remove('static-page-kids__performed-tasks-list--visible');
	} else {
		performedTasksList.classList.add('static-page-kids__performed-tasks-list--visible');
	}
}
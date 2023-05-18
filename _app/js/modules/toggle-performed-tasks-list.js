export function togglePerformedTasksList(performedTasksList) {
	if (performedTasksList.classList.contains('static-page-users__performed-tasks-list--visible')) {
		performedTasksList.classList.remove('static-page-users__performed-tasks-list--visible');
	} else {
		performedTasksList.classList.add('static-page-users__performed-tasks-list--visible');
	}
}
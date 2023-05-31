/**
 * Toggles the visibility of the task buttons list by adding or removing dynamic-page-kids__task-buttons-list--visible class
 * @param {HTMLElement} taskButtonsList - The element is representing the task button list
 */

export function toggleTaskButtons(taskButtonsList) {
taskButtonsList.classList.toggle('dynamic-page-kids__task-buttons-list--visible');
}
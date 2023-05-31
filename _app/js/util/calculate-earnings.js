/**
 *  Calculate the sum of earnings from an array of tasks
 * @param {Array<object>} tasks - An array of tasks with a 'value' property.
 * @returns {number} - The total earnings as a number
 */

export function sumEarnings(tasks) {
	const earnings = tasks.reduce((total, task) => {
		return total + task.task.value;
	}, 0);
	return Number(earnings);
	}
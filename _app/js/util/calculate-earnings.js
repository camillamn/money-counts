
export function sumEarnings(tasks) {
	const earnings = tasks.reduce((total, task) => {
		return total + task.task.value;
	}, 0);
	return Number(earnings);
	}
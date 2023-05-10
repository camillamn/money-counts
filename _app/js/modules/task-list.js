import FetchTasks from "./fetch-tasks.js";

export default async function TaskList() {
	const tasks = await FetchTasks();

	console.log(tasks);
}
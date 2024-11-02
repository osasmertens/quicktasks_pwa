import { Task, TasksOfUser } from "../../../constants/tasks";

export const saveTask = (userId: number, task: Task) => {
	const storedTasks = JSON.parse(
		localStorage.getItem("tasks") || "{}"
	) as TasksOfUser;
	const tasks = storedTasks[userId] || [];
	const index = tasks.findIndex((t) => t.id === task.id);

	if (index === -1) {
		storedTasks[userId] = [...tasks, task];
	} else {
		storedTasks[userId] = [
			...tasks.slice(0, index),
			task,
			...tasks.slice(index + 1),
		];
	}

	localStorage.setItem("tasks", JSON.stringify(storedTasks));
};

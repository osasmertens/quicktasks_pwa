import { Task, TasksOfUser } from "../../../constants/tasks";

export const getTasksOfUser = (userId: number): Task[] => {
	const storedTasks = JSON.parse(
		localStorage.getItem("tasks") || "{}"
	) as TasksOfUser;
	const tasks = storedTasks[userId] || [];
	return tasks;
};

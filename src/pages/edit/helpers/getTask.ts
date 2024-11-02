import { Task, TasksOfUser } from "../../../constants/tasks";
import { v4 as uuidv4 } from "uuid";

const createNewTask = (): Task => ({
	id: uuidv4(),
	title: "",
	content: "",
	labels: [],
	dueDate: new Date().toDateString(),
	completed: false,
});

export const getTask = (id: string | undefined, userId: string): Task => {
	if (!id || id === "new") {
		return createNewTask();
	}

	const storedTasks = JSON.parse(
		localStorage.getItem("tasks") || "{}"
	) as TasksOfUser;
	const tasks = storedTasks[userId] || [];

	const task = tasks.find((t) => t.id === id);

	return task ?? createNewTask();
};

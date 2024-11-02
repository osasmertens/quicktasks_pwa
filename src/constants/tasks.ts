export type Task = {
	id: string;
	title: string;
	content: string;
	labels: string[];
	dueDate: string;
	completed: boolean;
};

export type TasksOfUser = {
	[userId: string]: Task[];
};

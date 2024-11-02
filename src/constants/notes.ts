export type Note = {
	id: string;
	title: string;
	content: string;
	labels: string[];
	dueDate: string;
	completed: boolean;
};

export type NotesOfUser = {
	[userId: number]: Note[];
};

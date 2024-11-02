import { Note, NotesOfUser } from "../../../constants/notes";
import { v4 as uuidv4 } from "uuid";

const createNewNote = (): Note => ({
	id: uuidv4(),
	title: "",
	content: "",
	labels: [],
	dueDate: new Date().toDateString(),
	completed: false,
});

export const getNote = (id: string | undefined, userId: number): Note => {
	if (!id || id === "new") {
		return createNewNote();
	}

	const storedNotes = JSON.parse(
		localStorage.getItem("notes") || "{}"
	) as NotesOfUser;
	const notes = storedNotes[userId] || [];

	const note = notes.find((n) => n.id === id);

	return note ?? createNewNote();
};

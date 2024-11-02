import { Note, NotesOfUser } from "../../../constants/notes";

export const getNotesOfUser = (userId: number): Note[] => {
	const storedNotes = JSON.parse(
		localStorage.getItem("notes") || "{}"
	) as NotesOfUser;
	const notes = storedNotes[userId] || [];
	return notes;
};

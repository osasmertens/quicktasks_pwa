import { Note, NotesOfUser } from "../../../constants/notes";

export const saveNote = (userId: number, note: Note) => {
  const storedNotes = JSON.parse(
    localStorage.getItem("notes") || "{}"
  ) as NotesOfUser;
  const notes = storedNotes[userId] || [];
  const index = notes.findIndex((n) => n.id === note.id);

  if (index === -1) {
    storedNotes[userId] = [...notes, note];
  } else {
    storedNotes[userId] = [
      ...notes.slice(0, index),
      note,
      ...notes.slice(index + 1),
    ];
  }

  localStorage.setItem("notes", JSON.stringify(storedNotes));
};

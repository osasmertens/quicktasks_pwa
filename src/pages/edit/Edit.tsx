import { Box, Card } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Note, NotesOfUser } from "../../constants/notes";
import "@mdxeditor/editor/style.css";
import { getNote } from "./helpers/getNote";
import { MDXEditor } from "@mdxeditor/editor";
import { ALL_PLUGINS } from "./helpers/editorPlugins";
import { TitleInput } from "./partials/TitleInput";
import { LabelsInput } from "./partials/LabelsInput";
import { useUserContext } from "../../providers/UserProvider";
import { getNotesOfUser } from "../home/helpers/getNotesOfUser";
import { DueDateInput } from "./partials/DueDateInput";
import { TaskCompleteInput } from "./partials/TaskCompleteInput";

export const EditPage: FC = () => {
	const { id } = useParams<{ id?: string }>();
	const { user } = useUserContext();
	const [note, setNote] = useState<Note>(getNote(id, user?.userId ?? 0));
	const userNotes = getNotesOfUser(user?.userId ?? 0);
	const navigate = useNavigate();

	function onSave(): void {
		const userId = user?.userId ?? "0";
		const storedNotes = JSON.parse(
			localStorage.getItem("notes") || "{}"
		) as NotesOfUser;

		if (
			storedNotes[userId] &&
			storedNotes[userId].find((existingNote) => existingNote.id === note.id)
		) {
			const index = storedNotes[userId].findIndex(
				(existingNote) => note.id === existingNote.id
			);
			storedNotes[userId][index] = note;
		}

		if (!storedNotes[userId]) {
			storedNotes[userId] = [note];
		}

		if (
			storedNotes[userId] &&
			!storedNotes[userId].find((existingNote) => existingNote.id === note.id)
		) {
			storedNotes[userId].push(note);
		}

		localStorage.setItem("notes", JSON.stringify(storedNotes));
		navigate("/", { replace: true });
	}

	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			flexGrow={1}
			p={2}
		>
			<Box display="flex" flexDirection="column" flexGrow={1} width={1}>
				<TitleInput note={note} setNote={setNote} onSave={onSave} />
				<LabelsInput note={note} setNote={setNote} />
				<DueDateInput note={note} setNote={setNote} />
				<TaskCompleteInput note={note} setNote={setNote} />
				<Box flexGrow={1} marginTop={2}>
					<Card sx={{ height: 1 }}>
						<MDXEditor
							markdown={note.content}
							onChange={(content) => setNote((prev) => ({ ...prev, content }))}
							plugins={ALL_PLUGINS}
						/>
					</Card>
				</Box>
			</Box>
		</Box>
	);
};

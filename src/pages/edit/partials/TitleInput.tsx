import { Box, Button, TextField } from "@mui/material";
import { FC, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { Note } from "../../../constants/notes";

export type TitleInputProps = {
	note: Note;
	setNote: React.Dispatch<React.SetStateAction<Note>>;
	onSave: () => void;
};

export const TitleInput: FC<TitleInputProps> = ({ note, setNote, onSave }) => {
	return (
		<Box display="flex" width={1} alignItems="center">
			<Box flexGrow={1} p={1}>
				<TextField
					fullWidth
					label="Title"
					value={note.title}
					onChange={(event) =>
						setNote((prev) => ({
							...prev,
							title: event.target.value,
						}))
					}
				/>
			</Box>
			<Button
				variant="contained"
				endIcon={<SaveIcon />}
				sx={{ height: 55 }}
				onClick={onSave}
			>
				Save
			</Button>
		</Box>
	);
};

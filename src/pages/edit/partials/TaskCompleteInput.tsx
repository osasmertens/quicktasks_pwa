import React, { FC } from "react";
import { Note } from "../../../constants/notes";
import { Box, Checkbox, Typography } from "@mui/material";

export type TaskCompleteInputProps = {
	note: Note;
	setNote: React.Dispatch<React.SetStateAction<Note>>;
};

export const TaskCompleteInput: FC<TaskCompleteInputProps> = ({
	note,
	setNote,
}) => {
	return (
		<Box display="flex" width={1} alignItems="center" gap={1}>
			<Typography fontWeight="bolt">Task completed?: </Typography>
			<Checkbox
				checked={note.completed}
				onChange={(event) =>
					setNote((prev) => ({
						...prev,
						completed: event.target.checked,
					}))
				}
			/>
		</Box>
	);
};

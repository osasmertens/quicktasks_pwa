import { Box, Button, TextField } from "@mui/material";
import { FC, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { Task } from "../../../constants/tasks";

export type TitleInputProps = {
	task: Task;
	setTask: React.Dispatch<React.SetStateAction<Task>>;
	onSave: () => void;
};

export const TitleInput: FC<TitleInputProps> = ({ task, setTask, onSave }) => {
	return (
		<Box display="flex" width={1} alignItems="center">
			<Box flexGrow={1} p={1}>
				<TextField
					fullWidth
					label="Title"
					value={task.title}
					onChange={(event) =>
						setTask((prev) => ({
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

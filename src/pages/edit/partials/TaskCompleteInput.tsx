import React, { FC } from "react";
import { Task } from "../../../constants/tasks";
import { Box, Checkbox, Typography } from "@mui/material";

export type TaskCompleteInputProps = {
	task: Task;
	setTask: React.Dispatch<React.SetStateAction<Task>>;
};

export const TaskCompleteInput: FC<TaskCompleteInputProps> = ({
	task,
	setTask,
}) => {
	return (
		<Box display="flex" width={1} alignItems="center" gap={1}>
			<Typography fontWeight="bolt">Task completed?: </Typography>
			<Checkbox
				checked={task.completed}
				onChange={(event) =>
					setTask((prev) => ({
						...prev,
						completed: event.target.checked,
					}))
				}
			/>
		</Box>
	);
};

import {
	Box,
	Card,
	CardActionArea,
	Chip,
	Stack,
	Typography,
} from "@mui/material";
import { Task } from "../../../constants/tasks";
import { FC } from "react";

export type TaskDetailProps = {
	task: Task;
	today: boolean;
};

export const TaskDetail: FC<TaskDetailProps> = ({ task, today }) => {
	return (
		<Card sx={{ margin: 1, border: today ? "0.0625rem solid red" : 0 }}>
			<CardActionArea>
				<Box p={2}>
					<Typography variant="h6">{task.title}</Typography>
					<Stack spacing={1} direction="row">
						{task.labels.map((label) => (
							<Chip key={label} label={label} />
						))}
					</Stack>
					<Box textAlign={"right"}>
						<Typography variant="body1">{task.dueDate}</Typography>
					</Box>
				</Box>
			</CardActionArea>
		</Card>
	);
};

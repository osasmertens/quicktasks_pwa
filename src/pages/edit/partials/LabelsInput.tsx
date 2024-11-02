import { FC, useState } from "react";
import { Task } from "../../../constants/tasks";
import { Box, Button, Chip, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export type LabelsInputProps = {
	task: Task;
	setTask: React.Dispatch<React.SetStateAction<Task>>;
};

export const LabelsInput: FC<LabelsInputProps> = ({ task, setTask }) => {
	const [newLabel, setNewLabel] = useState("");

	const onAddLabel = () => {
		setTask((prev) => ({
			...prev,
			labels: [...prev.labels, newLabel],
		}));
		setNewLabel("");
	};

	const onDeleteLebel = (label: string) => {
		setTask((prev) => ({
			...prev,
			labels: prev.labels.filter((l) => l !== label),
		}));
	};

	return (
		<Box display="flex" width={1} alignItems="center" gap={1}>
			<Typography fontWeight="bolt">Labels: </Typography>
			{task.labels.map((label) => (
				<Chip key={label} label={label} onDelete={() => onDeleteLebel(label)} />
			))}
			<TextField
				value={newLabel}
				onChange={(event) => setNewLabel(event.target.value)}
				label="New label"
			/>
			<Button variant="contained" onClick={onAddLabel}>
				Add
			</Button>
		</Box>
	);
};

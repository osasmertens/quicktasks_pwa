import { FC, useState } from "react";
import { Note } from "../../../constants/notes";
import { Box, Button, Chip, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export type LabelsInputProps = {
	note: Note;
	setNote: React.Dispatch<React.SetStateAction<Note>>;
};

export const LabelsInput: FC<LabelsInputProps> = ({ note, setNote }) => {
	const [newLabel, setNewLabel] = useState("");

	const onAddLabel = () => {
		setNote((prev) => ({
			...prev,
			labels: [...prev.labels, newLabel],
		}));
		setNewLabel("");
	};

	const onDeleteLebel = (label: string) => {
		setNote((prev) => ({
			...prev,
			labels: prev.labels.filter((l) => l !== label),
		}));
	};

	return (
		<Box display="flex" width={1} alignItems="center" gap={1}>
			<Typography fontWeight="bolt">Labels: </Typography>
			{note.labels.map((label) => (
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

import {
	Box,
	Card,
	CardActionArea,
	Chip,
	Stack,
	Typography,
} from "@mui/material";
import { Note } from "../../../constants/notes";
import { FC } from "react";

export type NoteDetailProps = {
	note: Note;
	today: boolean;
};

export const NoteDetail: FC<NoteDetailProps> = ({ note, today }) => {
	return (
		<Card sx={{ margin: 1, border: today ? "0.0625rem solid red" : 0 }}>
			<CardActionArea>
				<Box p={2}>
					<Typography variant="h6">{note.title}</Typography>
					<Stack spacing={1} direction="row">
						{note.labels.map((label) => (
							<Chip key={label} label={label} />
						))}
					</Stack>
					<Box textAlign={"right"}>
						<Typography variant="body1">{note.dueDate}</Typography>
					</Box>
				</Box>
			</CardActionArea>
		</Card>
	);
};

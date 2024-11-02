import { Box, Button, Stack, Typography } from "@mui/material";
import { FC } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import { getNotesOfUser } from "./helpers/getNotesOfUser";
import { useUserContext } from "../../providers/UserProvider";
import { NoteDetail } from "./partials/NoteDetail";
import { isThisWeek, isToday } from "./helpers/dateFunctions";

export const HomePage: FC = () => {
	const navigate = useNavigate();
	const { user } = useUserContext();

	const notes = getNotesOfUser(user?.userId ?? 0);
	//console.log(notes);

	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			flexGrow={1}
			p={2}
		>
			<Box display="flex" flexDirection="column" width={1} maxWidth={600}>
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					margin={2}
				>
					<Typography variant="h3">Tasks</Typography>
				</Box>
				<Box display="flex" width={1} justifyContent="space-between">
					<Typography variant="h6">Today</Typography>
					<Button
						variant="contained"
						endIcon={<AddIcon />}
						onClick={() => navigate("/edit/new")}
					>
						Add new task
					</Button>
				</Box>
				<Box display="flex" flexDirection="column" marginTop={2}>
					{notes
						.filter((note) => isToday(note.dueDate) && !note.completed)
						.map((note) => (
							<Link style={{ textDecoration: 0 }} to={`/edit/${note.id}`}>
								<NoteDetail
									key={note.id}
									note={note}
									today={isToday(note.dueDate)}
								/>
							</Link>
						))}
				</Box>
				<Box display="flex" width={1} justifyContent="space-between">
					<Typography variant="h6">This week</Typography>
				</Box>
				<Box display="flex" flexDirection="column" marginTop={2}>
					{notes
						.filter((note) => isThisWeek(note.dueDate) && !note.completed)
						.map((note) => (
							<Link style={{ textDecoration: 0 }} to={`/edit/${note.id}`}>
								<NoteDetail
									key={note.id}
									note={note}
									today={isToday(note.dueDate)}
								/>
							</Link>
						))}
				</Box>
				<Box display="flex" width={1} justifyContent="space-between">
					<Typography variant="h6">Remaining tasks</Typography>
				</Box>
				<Box display="flex" flexDirection="column" marginTop={2}>
					{notes
						.filter(
							(note) =>
								!isToday(note.dueDate) &&
								!isThisWeek(note.dueDate) &&
								!note.completed
						)
						.map((note) => (
							<Link style={{ textDecoration: 0 }} to={`/edit/${note.id}`}>
								<NoteDetail
									key={note.id}
									note={note}
									today={isToday(note.dueDate)}
								/>
							</Link>
						))}
				</Box>
			</Box>
		</Box>
	);
};

import { Box, Button, Stack, Typography } from "@mui/material";
import { FC } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../providers/UserProvider";
import { NoteDetail } from "../home/partials/NoteDetail";
import { getNotesOfUser } from "../home/helpers/getNotesOfUser";

export const CompletedPage: FC = () => {
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
				<Box display="flex" flexDirection="column" marginTop={2}>
					{notes
						.filter((note) => note.completed)
						.map((note) => (
							<Link style={{ textDecoration: 0 }} to={`/edit/${note.id}`}>
								<NoteDetail key={note.id} note={note} today={false} />
							</Link>
						))}
				</Box>
			</Box>
		</Box>
	);
};

import { Box, Button, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../providers/UserProvider";
import { TaskDetail } from "../home/partials/TaskDetail";
import { getTasksOfUser } from "../home/helpers/getTasksOfUser";

export const CompletedPage: FC = () => {
	const navigate = useNavigate();
	const { user } = useUserContext();

	const tasks = getTasksOfUser(user?.uid ?? "0");
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
					{tasks
						.filter((task) => task.completed)
						.map((task) => (
							<Link style={{ textDecoration: 0 }} to={`/edit/${task.id}`}>
								<TaskDetail key={task.id} task={task} today={false} />
							</Link>
						))}
				</Box>
			</Box>
		</Box>
	);
};

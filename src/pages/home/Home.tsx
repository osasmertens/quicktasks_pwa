import { Box, Button, Stack, Typography } from "@mui/material";
import { FC } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import { getTasksOfUser } from "./helpers/getTasksOfUser";
import { useUserContext } from "../../providers/UserProvider";
import { TaskDetail } from "./partials/TaskDetail";
import { isThisWeek, isToday } from "./helpers/dateFunctions";

export const HomePage: FC = () => {
	const navigate = useNavigate();
	const { user } = useUserContext();

	const tasks = getTasksOfUser(user?.userId ?? 0);
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
					{tasks
						.filter((task) => isToday(task.dueDate) && !task.completed)
						.map((task) => (
							<Link style={{ textDecoration: 0 }} to={`/edit/${task.id}`}>
								<TaskDetail
									key={task.id}
									task={task}
									today={isToday(task.dueDate)}
								/>
							</Link>
						))}
				</Box>
				<Box display="flex" width={1} justifyContent="space-between">
					<Typography variant="h6">This week</Typography>
				</Box>
				<Box display="flex" flexDirection="column" marginTop={2}>
					{tasks
						.filter((task) => isThisWeek(task.dueDate) && !task.completed)
						.map((task) => (
							<Link style={{ textDecoration: 0 }} to={`/edit/${task.id}`}>
								<TaskDetail
									key={task.id}
									task={task}
									today={isToday(task.dueDate)}
								/>
							</Link>
						))}
				</Box>
				<Box display="flex" width={1} justifyContent="space-between">
					<Typography variant="h6">Remaining tasks</Typography>
				</Box>
				<Box display="flex" flexDirection="column" marginTop={2}>
					{tasks
						.filter(
							(task) =>
								!isToday(task.dueDate) &&
								!isThisWeek(task.dueDate) &&
								!task.completed
						)
						.map((task) => (
							<Link style={{ textDecoration: 0 }} to={`/edit/${task.id}`}>
								<TaskDetail
									key={task.id}
									task={task}
									today={isToday(task.dueDate)}
								/>
							</Link>
						))}
				</Box>
			</Box>
		</Box>
	);
};

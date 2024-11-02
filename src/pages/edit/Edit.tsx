import { Box, Card } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Task, TasksOfUser } from "../../constants/tasks";
import "@mdxeditor/editor/style.css";
import { getTask } from "./helpers/getTask";
import { MDXEditor } from "@mdxeditor/editor";
import { ALL_PLUGINS } from "./helpers/editorPlugins";
import { TitleInput } from "./partials/TitleInput";
import { LabelsInput } from "./partials/LabelsInput";
import { useUserContext } from "../../providers/UserProvider";
import { getTasksOfUser } from "../home/helpers/getTasksOfUser";
import { DueDateInput } from "./partials/DueDateInput";
import { TaskCompleteInput } from "./partials/TaskCompleteInput";

export const EditPage: FC = () => {
	const { id } = useParams<{ id?: string }>();
	const { user } = useUserContext();
	const [task, setTask] = useState<Task>(getTask(id, user?.userId ?? 0));
	const userNotes = getTasksOfUser(user?.userId ?? 0);
	const navigate = useNavigate();

	function onSave(): void {
		const userId = user?.userId ?? "0";
		const storedTasks = JSON.parse(
			localStorage.getItem("tasks") || "{}"
		) as TasksOfUser;

		if (
			storedTasks[userId] &&
			storedTasks[userId].find((existingTask) => existingTask.id === task.id)
		) {
			const index = storedTasks[userId].findIndex(
				(existingTask) => task.id === existingTask.id
			);
			storedTasks[userId][index] = task;
		}

		if (!storedTasks[userId]) {
			storedTasks[userId] = [task];
		}

		if (
			storedTasks[userId] &&
			!storedTasks[userId].find((existingTask) => existingTask.id === task.id)
		) {
			storedTasks[userId].push(task);
		}

		localStorage.setItem("tasks", JSON.stringify(storedTasks));
		navigate("/", { replace: true });
	}

	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			flexGrow={1}
			p={2}
		>
			<Box display="flex" flexDirection="column" flexGrow={1} width={1}>
				<TitleInput task={task} setTask={setTask} onSave={onSave} />
				<LabelsInput task={task} setTask={setTask} />
				<DueDateInput task={task} setTask={setTask} />
				<TaskCompleteInput task={task} setTask={setTask} />
				<Box flexGrow={1} marginTop={2}>
					<Card sx={{ height: 1 }}>
						<MDXEditor
							markdown={task.content}
							onChange={(content) => setTask((prev) => ({ ...prev, content }))}
							plugins={ALL_PLUGINS}
						/>
					</Card>
				</Box>
			</Box>
		</Box>
	);
};

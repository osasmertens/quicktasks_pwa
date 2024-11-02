import { doc, setDoc, Timestamp } from "firebase/firestore";
import { Task } from "../constants/tasks";
import { firestoreDB } from "./config";

export const addNewTask = (task: Task, userId: string) => {
	setDoc(doc(firestoreDB, "tasks", task.id), {
		task,
		userId,
		createdAt: Timestamp.fromDate(new Date()),
	});
};

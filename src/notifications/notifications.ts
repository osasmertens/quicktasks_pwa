import { useEffect } from "react";
import { getTasksOfUser } from "../pages/home/helpers/getTasksOfUser";
import { User } from "firebase/auth";

const getPendingTasksCount = (user: User | undefined) => {
	return getTasksOfUser(user?.uid ?? "0").filter((t) => !t.completed).length;
};

const showNotification = (taskCount: number) => {
	navigator.serviceWorker.ready.then((registration) => {
		registration.showNotification("QuickTasks", {
			body: `You have ${taskCount} tasks left to complete!`,
			icon: "%PUBLIC_URL%/logo-144.png",
		});
	});
};

export const TaskNotificationScheduler = (user: User | undefined) => {
	useEffect(() => {
		if (!user || !user.uid) {
			return;
		}

		// Generate a unique key for the notification flag based on user uid
		const notificationKey = `notificationShown_${user.uid}`;

		// Check if notification has already been shown
		const hasShownNotification =
			localStorage.getItem(notificationKey) === "true";

		if (!hasShownNotification) {
			// Get the pending tasks count
			const taskCount = getPendingTasksCount(user);

			// If there are pending tasks, show the notification
			if (taskCount > 0) {
				showNotification(taskCount);

				// Mark the notification as shown
				localStorage.setItem(notificationKey, "true");
			}
		}
	}, [user]);
};

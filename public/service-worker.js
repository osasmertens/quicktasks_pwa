self.addEventListener("push", (event) => {
	const data = event.data?.json() || {};
	const title = data.title || "QuickTasks";
	const options = {
		body: data.body || "You have pending tasks to complete!",
		icon: "logo-144.png",
	};
	event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
	event.notification.close();
	event.waitUntil(
		clients.matchAll({ type: "window" }).then((clientList) => {
			if (clientList.length > 0) {
				return clientList[0].focus();
			}
			return clients.openWindow("/");
		})
	);
});

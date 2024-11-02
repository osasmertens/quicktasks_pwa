import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/home/Home";
import { LoginPage } from "../pages/login/Login";
import { PrivateRoute } from "../pages/private/private";
import { EditPage } from "../pages/edit/Edit";
import { CompletedPage } from "../pages/uncompleted_tasks/CompletedTasks";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <PrivateRoute />,
		children: [
			{ path: "/edit/:id", element: <EditPage /> },
			{ path: "/", element: <HomePage /> },
			{ path: "/completed", element: <CompletedPage /> },
		],
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
]);

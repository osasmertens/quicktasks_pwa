import {
	AppBar,
	Box,
	Button,
	CircularProgress,
	IconButton,
	Toolbar,
	Typography,
	Icon,
} from "@mui/material";
import { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUserContext } from "../../providers/UserProvider";
import LogoutIcon from "@mui/icons-material/Logout";
import { SidePanel } from "./partials/SidePanel";

export const PrivateRoute: FC = () => {
	const { user, logout, isLoading } = useUserContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user && !isLoading) {
			navigate("/login", { replace: true });
		}
	}, [user, navigate, isLoading]);

	if (isLoading) {
		return (
			<Box
				height="100vh"
				width={1}
				display="flex"
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
			>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Box height="100vh" display="flex" flexDirection="column">
			<AppBar position="static">
				<Toolbar>
					<SidePanel />
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						QuickTasks
					</Typography>
					<Typography variant="body1" sx={{ margin: 2 }}>
						{user?.firstName + " " + user?.lastName}
					</Typography>
					<Button
						color="inherit"
						variant="outlined"
						endIcon={<LogoutIcon />}
						onClick={logout}
					>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
			<Box flexGrow={1} overflow="auto" display="flex" flexDirection="column">
				<Outlet />
			</Box>
		</Box>
	);
};

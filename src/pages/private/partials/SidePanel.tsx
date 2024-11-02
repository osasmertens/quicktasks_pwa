import {
	Box,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
} from "@mui/material";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MenuIcon from "@mui/icons-material/Menu";
import React, { FC, useState } from "react";
import { Link } from "react-router-dom";

export const SidePanel: FC = () => {
	const [open, setOpen] = useState(false);

	const toggleSidePanel = (newOpen: boolean) => () => {
		setOpen(newOpen);
	};

	const SidePanel = (
		<Box
			sx={{ width: 250 }}
			role="presentation"
			onClick={toggleSidePanel(false)}
		>
			<List>
				<Toolbar />
				<Divider />
				{["Uncompleted tasks", "Completed tasks"].map((text, index) => (
					<Link
						style={{ textDecoration: 0 }}
						to={index % 2 === 0 ? "/" : "/completed"}
					>
						<ListItem key={text} disablePadding>
							<ListItemButton>
								<ListItemIcon>
									{index % 2 === 0 ? (
										<AssignmentIcon />
									) : (
										<AssignmentTurnedInIcon />
									)}
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItemButton>
						</ListItem>
					</Link>
				))}
			</List>
		</Box>
	);

	return (
		<div>
			<IconButton
				size="large"
				edge="start"
				color="inherit"
				aria-label="menu"
				sx={{ mr: 2 }}
				onClick={toggleSidePanel(true)}
			>
				<MenuIcon />
			</IconButton>
			<Drawer open={open} onClose={toggleSidePanel(false)}>
				{SidePanel}
			</Drawer>
		</div>
	);
};

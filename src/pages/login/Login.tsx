import { Box, Button, TextField, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useUserContext } from "../../providers/UserProvider";
import { useNavigate } from "react-router-dom";

export const LoginPage: FC = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string>();
	const { user, login } = useUserContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate("/", { replace: true });
		}
	}, [user, navigate]);

	const onLogin = async () => {
		setError(undefined);

		const result = await login(username, password);

		if (result.user) {
			navigate("/", { replace: true });
		}

		if (result.error) {
			setError(result.error);
		}
	};

	return (
		<Box
			height={"100vh"}
			display={"flex"}
			flexDirection={"column"}
			width={1}
			sx={{
				background:
					"linear-gradient(34deg, rgba(242,246,255,1) 0%, rgba(194,194,246,1) 50%, rgba(212,219,230,1) 100%);",
			}}
		>
			<Box
				display={"flex"}
				flexDirection={"column"}
				alignItems={"center"}
				justifyContent={"center"}
				flexGrow={1}
				p={2}
			>
				<Box
					display={"flex"}
					flexDirection={"column"}
					alignItems={"center"}
					justifyContent={"center"}
					p={5}
					width={1}
					maxWidth={350}
					borderRadius={4}
					sx={{ background: "white" }}
				>
					<Box
						component={"img"}
						src={"https://cdn-icons-png.freepik.com/512/3982/3982361.png"}
						alt={"Logo"}
						width={100}
						height={100}
						mb={2}
					/>
					<Typography color="error" marginBottom={2}>
						{error}
					</Typography>
					<TextField
						label="Username"
						fullWidth
						sx={{ marginBottom: 2 }}
						value={username}
						onChange={(event) => setUsername(event.target.value)}
					/>
					<TextField
						label="Password"
						type="password"
						fullWidth
						sx={{ marginBottom: 2 }}
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
					<Button variant="contained" fullWidth size="large" onClick={onLogin}>
						Login
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

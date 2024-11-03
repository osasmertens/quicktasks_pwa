import { Box, Button, TextField, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../providers/UserProvider";

export const LoginPage: FC = () => {
	const [email, setEmail] = useState("");
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
		const result = await login(email, password);
		if (result.error) {
			setError(result.error);
		}
		if (result.user) {
			navigate("/");
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
					<Typography variant="h4">Login</Typography>
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
						label="Email"
						fullWidth
						sx={{ marginBottom: 2 }}
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
					<TextField
						label="Password"
						type="password"
						fullWidth
						sx={{ marginBottom: 2 }}
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
					<Box display="flex" gap={2}>
						<Button variant="contained" size="large" onClick={onLogin}>
							Login
						</Button>
						<Link style={{ textDecoration: 0 }} to={"/signup"}>
							<Button variant="contained" size="large">
								Sign up
							</Button>
						</Link>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

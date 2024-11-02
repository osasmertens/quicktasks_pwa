import {
	FC,
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { User, users } from "../constants/users";

export type UserContextType = {
	user?: User;
	isLoading: boolean;
	login: (
		userName: string,
		password: string
	) => Promise<{ user?: User; error?: string }>;
	logout: () => Promise<void>;
};

const UserContext = createContext<UserContextType>({
	login: async () => ({}),
	logout: async () => {},
	isLoading: true,
});

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | undefined>(undefined);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const userId = localStorage.getItem("userId");

		if (userId) {
			const user = users.find((user) => user.userId.toString() === userId);
		}

		setIsLoading(false);
	}, []);

	const login = async (
		userName: string,
		password: string
	): Promise<{ user?: User; error?: string }> => {
		const user = users.find(
			(user) => user.username === userName && user.password === password
		);

		if (!user) {
			return { error: "Invalid username or password" };
		}

		localStorage.setItem("userId", user.userId.toString());
		setUser(user);
		return {
			user: user,
		};
	};

	const logout = async () => {
		localStorage.removeItem("userId");
		setUser(undefined);
	};

	const value: UserContextType = { user, isLoading, login, logout };

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = (): UserContextType => {
	return useContext(UserContext);
};

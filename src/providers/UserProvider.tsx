import {
	FC,
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	User,
} from "firebase/auth";
import { firebaseAuth } from "../firebase/config";

export type UserContextType = {
	user?: User;
	isLoading: boolean;
	signup: (
		email: string,
		password: string
	) => Promise<{ user?: User; error?: string }>;
	login: (
		email: string,
		password: string
	) => Promise<{ user?: User; error?: string }>;
	logout: () => Promise<void>;
};

const UserContext = createContext<UserContextType>({
	login: async () => ({}),
	signup: async () => ({}),
	logout: async () => {},
	isLoading: true,
});

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | undefined>(undefined);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		onAuthStateChanged(firebaseAuth, (user) => {
			setIsLoading(false);
			if (user) {
				setUser(user);
			} else {
				setUser(undefined);
			}
		});
	}, []);

	const signup = async (
		email: string,
		password: string
	): Promise<{ user?: User; error?: string }> => {
		try {
			console.log("reached signup function");
			console.log("reached");
			const userCredential = await createUserWithEmailAndPassword(
				firebaseAuth,
				email,
				password
			);

			setUser(userCredential.user);
			return { user: userCredential.user };
		} catch (error) {
			console.log(error);
			return { error: (error as { message: string; code: string }).message };
		}
	};

	const login = async (
		email: string,
		password: string
	): Promise<{ user?: User; error?: string }> => {
		try {
			console.log("reached login function");
			const userCredential = await signInWithEmailAndPassword(
				firebaseAuth,
				email,
				password
			);

			setUser(userCredential.user);
			return { user: userCredential.user };
		} catch (error) {
			console.log(error);
			return { error: (error as { message: string; code: string }).message };
		}
	};

	const logout = async () => {
		await firebaseAuth.signOut();
		setUser(undefined);
	};

	const value: UserContextType = { user, isLoading, signup, login, logout };

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = (): UserContextType => {
	return useContext(UserContext);
};

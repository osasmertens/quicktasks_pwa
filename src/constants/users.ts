export type User = {
	userId: number;
	username: string;
	password: string;
	firstName: string;
	lastName: string;
};

export const users: User[] = [
	{
		userId: 1,
		username: "john_doe",
		password: "password123",
		firstName: "John",
		lastName: "Doe",
	},
	{
		userId: 2,
		username: "jane_smith",
		password: "abc123",
		firstName: "Jane",
		lastName: "Smith",
	},
	{
		userId: 3,
		username: "mike_jackson",
		password: "passw0rd",
		firstName: "Mike",
		lastName: "Jackson",
	},
	{
		userId: 4,
		username: "sarah_jones",
		password: "sarahpass",
		firstName: "Sarah",
		lastName: "Jones",
	},
	{
		userId: 5,
		username: "alex_white",
		password: "white1234",
		firstName: "Alex",
		lastName: "White",
	},
	{
		userId: 6,
		username: "emily_brown",
		password: "brownie",
		firstName: "Emily",
		lastName: "Brown",
	},
];

import User from "./Model/UserSchema.js";

export const addUser = async (id, name, room) => {
	const existingUser = await User.find({ name, room });
	if (existingUser.length !== 0) return { error: "Username has already been taken for the current room" };
	if (!name && !room) return { error: "Username and room are required" };
	if (!name) return { error: "Username is required" };
	if (!room) return { error: "Room is required" };

	const user = await User.create({ socketId: id, name, room });
	return { user };
};

export const getUser = async (id) => {
	console.log(id);
	let user = await User.findOne({ socketId: id });
	console.log(user);
	return user;
};

export const deleteUser = async (id) => {
	const user = User.findOneAndDelete({ socketId: id });
	return user;
};

export const getUsers = async (room) => await User.find({ room });

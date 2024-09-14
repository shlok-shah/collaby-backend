import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	socketId: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	room: {
		type: String,
		required: true,
	},
});

const User = mongoose.model("User", userSchema);

export default User;

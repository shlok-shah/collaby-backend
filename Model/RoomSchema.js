import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
	{
		room: {
			type: String,
			required: true,
			unique: true,
		},
		content: {
			type: mongoose.Schema.Types.Mixed, // Mixed allows storing dynamic content (like a Quill Delta object)
			required: true,
			default: "{}",
		},
		users: {
			type: [String], // Array of usernames in the room
			default: [], // Initialize with an empty array
		},
	},
	{ timestamps: true }
); // Automatically adds createdAt and updatedAt fields

// Create the Room Model
const Room = mongoose.model("Room", RoomSchema);

export default Room;

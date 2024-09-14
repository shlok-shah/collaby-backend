import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import connectDB from "./mongo.js";
import { addUser, getUser, deleteUser, getUsers } from "./users.js";
import { createServer } from "http";
import { Server } from "socket.io";
import Room from "./Model/RoomSchema.js";

const app = express();
const http = createServer(app);
const PORT = process.env.PORT || 5000;

const io = new Server(http);

app.use(cors());

connectDB();

io.on("connection", (socket) => {
	socket.on("login", async ({ name, room }, callback) => {
		const { user, error } = await addUser(socket.id, name, room);
		if (error) return callback(error);
		socket.join(room);
		socket
			.in(room)
			.emit("notification", { title: "Someone's here", description: `${user.name} just entered the room` });
		console.log("times");
		io.in(room).emit("users", await getUsers(room));

		console.log("<Query Execution>");
		try {
			let roomData = await Room.findOne({ room });
			if (!roomData) {
				roomData = new Room({
					room: room,
					users: [name],
				});
				await roomData.save();
				console.log(`Room ${room} created with user ${name}`);
			} else {
				if (!roomData.users.includes(name)) {
					roomData.users.push(name);
					await roomData.save();
					console.log(`User ${name} added to room ${room}`);
				}
			}

			const existingDocumentState = roomData.content;
			// waiting for client side needs fix
			setTimeout(() => {
				socket.emit("initialize-document", existingDocumentState);
			}, 1000);

			callback();
		} catch (err) {
			console.error("Error handling login:", err);
			socket.emit("document-error", "Error retrieving or creating the room");
		}
	});

	socket.on("text-change", async ({ delta, room, username }) => {
		try {
			await Room.findOneAndUpdate({ room }, { content: delta }, { upsert: true, new: true });
			console.log("document updated");
			socket.to(room).emit("text-change", { delta, username });
		} catch (err) {
			console.error("Error updating document state:", err);
		}
	});

	socket.on("save-document", async ({ room, content }) => {
		try {
			// Update the document's content in the room with the provided content
			await Room.findOneAndUpdate(
				{ room: room }, // Find the room by roomId
				{ content: content }, // Update content with the saved content
				{ new: true } // Return the updated document
			);
		} catch (err) {
			console.error("Error saving document:", err);
		}
	});

	socket.on("sendMessage", async (message) => {
		const user = await getUser(socket.id);
		if (!user) return console.log("Not found user");
		io.in(user.room).emit("message", { name: user.name, text: message });
	});

	socket.on("disconnect", async () => {
		try {
			const user = await deleteUser(socket.id);
			if (user && user.room) {
				let roomData = await Room.findOne({ room: user.room });

				if (roomData) {
					roomData.users = roomData.users.filter((username) => username !== user.name);

					if (roomData.users.length === 0) {
						await Room.deleteOne({ room: user.room });
						console.log(`Room ${user.room} deleted after all users left`);
					} else {
						await roomData.save();
						console.log(`User ${user.name} removed from room ${user.room}`);

						io.in(user.room).emit("notification", {
							title: "Someone just left",
							description: `${user.name} just left the room`,
						});

						io.in(user.room).emit("users", await getUsers(user.room));
					}
				}
			}
		} catch (err) {
			console.error("Error handling disconnect:", err);
		}
	});
});

http.listen(PORT, () => {
	console.log(`Listening to ${PORT}`);
});

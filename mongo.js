import mongoose from "mongoose";

const mongoURI = `mongodb+srv://shlokshah321:3VRqzshMSBeDmbeW@collaby.xxbr8.mongodb.net/?retryWrites=true&w=majority&appName=Collaby`;

async function connectDB() {
	try {
		await mongoose.connect(mongoURI);
		console.log("MongoDB connected successfully");
	} catch (error) {
		console.error("MongoDB connection error:", error);
	}
}

export default connectDB;

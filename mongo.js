import mongoose from "mongoose";

const mongoURI = "mongodb://127.0.0.1:27017/collaby";

async function connectDB() {
	try {
		await mongoose.connect(mongoURI);
		console.log("MongoDB connected successfully");
	} catch (error) {
		console.error("MongoDB connection error:", error);
	}
}

export default connectDB;

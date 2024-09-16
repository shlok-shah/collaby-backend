import mongoose from "mongoose";
import "dotenv/config";

const mongoURI = process.env.NODE_ENV === "development" ? "mongodb://localhost:27017/collaby" : process.env.MONGO_URL;

async function connectDB() {
	try {
		await mongoose.connect(mongoURI);
		console.log("MongoDB connected successfully");
	} catch (error) {
		console.error("MongoDB connection error:", error);
	}
}

export default connectDB;

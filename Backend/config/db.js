import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const dbConnection = async () => {
    const apiURL = process.env.MONGO_URI
    try {
        await mongoose.connect(apiURL);
        console.log("✅ MongoDB connected...");
    } catch (err) {
        console.log("❌ MongoDB connection error:", err);
    }
};

export default dbConnection;
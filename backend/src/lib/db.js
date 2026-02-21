import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

export const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI;

        if (!mongoUri || mongoUri === "mongodb://localhost:27017/chat_db") {
            console.log("⚠️ No production MONGODB_URI found. Starting DEMO MODE with in-memory database...");
            const mongoServer = await MongoMemoryServer.create();
            const uri = mongoServer.getUri();
            await mongoose.connect(uri);
            console.log(`✅ Demo Database started successfully at: ${uri}`);
            return;
        }

        const conn = await mongoose.connect(mongoUri);
        console.log(`✅ MongoDB connected: ${conn.connection.host}`);

    } catch (error) {
        console.log("❌ MongoDB connection error", error);

        // Final fallback if something else fails
        if (process.env.NODE_ENV !== "production") {
            console.log("⚠️ Attempting final fallback to DEMO MODE...");
            const mongoServer = await MongoMemoryServer.create();
            const uri = mongoServer.getUri();
            await mongoose.connect(uri);
            console.log(`✅ Final Demo Database started successfully: ${uri}`);
        }
    }
};
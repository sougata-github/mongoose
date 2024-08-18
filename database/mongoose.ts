import mongoose from "mongoose";
import { User } from "./models/user.model";

let isConnected = false;

const MONGODB_URI = "mongodb://localhost:27017";

export async function connectToDatabase() {
  if (!MONGODB_URI) {
    console.log("MISSING MOGODB_URL");
    return;
  }

  if (isConnected) {
    console.log("MongoDB already connected.");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "testdb",
    });

    isConnected = true;
    console.log("MongoDB connected.");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}

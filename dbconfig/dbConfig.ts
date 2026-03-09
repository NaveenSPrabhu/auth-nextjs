import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.mongo_url!);
    const connection = mongoose.connection;
    connection.on('connected', () => {
      console.log("Connected to MongoDB");
    })
    connection.on('error', (err) => {
      console.error("MongoDB connection error:", err);
    })
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
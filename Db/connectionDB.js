import mongoose from "mongoose";

import env from "dotenv";
env.config();

const MONGO_URL = process.env.MONGO_URL;

const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URL);

    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);

    process.exit(1);
  }
};

export default connectDb;

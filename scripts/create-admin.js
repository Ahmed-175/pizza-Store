import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Admin from "../models/admin.models.js";
import env from "dotenv";
env.config();
const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL);
const createAdmin = async () => {
  try {
    const email = "admin@example.com";
    const password = "admin123456";
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await Admin.findOne({ email });

    if (existingUser) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const newAdmin = new Admin({
      fullName: "Ahmed Admin",
      email,
      password: hashedPassword,
      phone: "01023456789",
      role: "admin",
    });
    await newAdmin.save();
    console.log("Admin created successfully!");

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();

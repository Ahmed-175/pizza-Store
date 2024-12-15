import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;

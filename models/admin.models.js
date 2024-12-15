import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  fullName:String ,
  email: String , 
  avatar: {
    type: String , 
    default: "/avatar.webp"
  },
  password: String,
  phone: String, 
  role: String, 
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  orders: {
    type: [mongoose.Schema.ObjectId],
    default: [],
    ref: "Product",
  },
});

const User = mongoose.model("User", userSchema);

export default User;

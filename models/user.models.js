import mongoose from "mongoose";

/**
 * User Schema
 * Defines the structure of the User document in MongoDB.
 */
const userSchema = new mongoose.Schema({
  fullName: String, // The full name of the user
  email: String, // The email address of the user
  password: String, // The hashed password of the user
  phone: String, // The phone number of the user
  avatar: {
    type: String,
    default: "/avatar.webp",
  },
  orders: {
    type: [mongoose.Schema.ObjectId], // Array of references to Product documents
    default: [], // Default is an empty array
    ref: "Order", // Reference to the Product model
  },
  cart : {
    type : [mongoose.Schema.ObjectId],
    ref : "Product"
  }

});

// Create the User model from the schema
const User = mongoose.model("User", userSchema);

export default User;

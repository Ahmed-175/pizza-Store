import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  orders: {
    type: [mongoose.Schema.ObjectId],
    default: [],
    ref: "Product",
  },
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;

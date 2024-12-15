import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name : String,
  description : String,
  price : String,
  imageUrl : String, 
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;

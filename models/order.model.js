import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    statusOrder: {
      type: String,
      enum: ["finished", "unfinished"],
      default : "unfinished"
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;

import Product from "../models/product.mdels.js";
import admin from "../models/admin.models.js";
import Order from "../models/order.model.js";
import User from "../models/user.models.js";

export const addNewProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const id = req.user.id;

    const foundAdmin = await admin.findById(id);

    if (!foundAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (!name || !description || !price) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Product image is required." });
    }

    if (req.file) {
      const fileUrl = `${req.protocol}://${req.get("host")}/assets/userFiles/${
        req.file.filename
      }`;
      req.fileUrl = fileUrl;
      req.fileType = req.file.mimetype.split("/")[0];
    }

    const newProduct = new Product({
      name,
      description,
      price,
      imageUrl: req.fileUrl,
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product created successfully!",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

export const getNewOrders = async (req, res) => {
  try {
    const id = req.user.id;

    const foundAdmin = await admin.findById(id);

    if (!foundAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const newOrders = await Order.find({ statusOrder: "unfinished" });

    if (newOrders.length === 0) {
      return res.status(200).json({ message: "No new orders available" });
    }

    return res.status(200).json(newOrders);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const updateStatusOrder = async (req, res) => {
  try {
    const id = req.user.id;
    const { orderId } = req.body;

    const foundAdmin = await admin.findById(id);

    if (!foundAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.statusOrder = "finished";

    await order.save();

    return res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const id = req.user.id;

    const foundAdmin = await admin.findById(id);

    if (!foundAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const users = await User.find();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

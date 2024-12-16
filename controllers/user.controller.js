import User from "../models/user.models.js";
import Order from "../models/order.model.js";

// Fetches user information excluding password
export const getInfo = async (req, res) => {
  try {
    const userId = req.user.id;  // Get the user ID from the token
    const user = await User.findById(userId).select("-password");  // Find user by ID and exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);  // Return user data
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });  // Handle server error
  }
};

// Adds a new order for the user
export const addOrder = async (req, res) => {
  try {
    const userId = req.user.id;  // Get the user ID from the token
    const { orderId } = req.body;  // Get the order ID from the request body
    const newOrder = new Order({
      userId,
      orderId,
    });

    await newOrder.save();  // Save the new order to the database
    return res
      .status(201)
      .json({ message: "Order added successfully", order: newOrder });  // Return success response
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });  // Handle server error
  }
};

// Adds an item to the user's shopping cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;  // Get the user ID from the token
    const { productId } = req.body;  // Get the product ID from the request body

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add product to user's cart
    user.cart.push(productId);
    await user.save();

    return res
      .status(200)
      .json({ message: "Item added to cart", cart: user.cart });  // Return updated cart
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });  // Handle server error
  }
};

// Removes an item from the user's shopping cart
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;  // Get the user ID from the token
    const { productId } = req.body;  // Get the product ID to remove from the request body

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove product from user's cart
    user.cart = user.cart.filter((item) => item.productId !== productId);
    await user.save();

    return res
      .status(200)
      .json({ message: "Item removed from cart", cart: user.cart });  // Return updated cart
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });  // Handle server error
  }
};

// Changes the user's avatar
export const changeAvatar = async (req, res) => {
  try {
    const userId = req.user.id;  // Get the user ID from the token

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Avatar image is required." });  // Check if file is provided
    }

    // Generate the file URL after uploading
    const fileUrl = `${req.protocol}://${req.get("host")}/assets/userFiles/${req.file.filename}`;
    req.fileUrl = fileUrl;  // Store the file URL in the request object

    user.avatar = fileUrl;  // Update the avatar in the user document
    await user.save();

    return res
      .status(200)
      .json({ message: "Avatar updated successfully", avatar: fileUrl });  // Return success response with new avatar URL
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });  // Handle server error
  }
};

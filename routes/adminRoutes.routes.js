import express from "express";
import {
  addNewProduct,
  getNewOrders,
  getUsers,
  updateStatusOrder,
} from "../controllers/admin.controller.js";
import verifyToken from "../middlewares/prodectRoutes.js"; // Ensure token verification middleware is correctly imported
import multer from "multer";
const upload = multer({ dest: "assets/" });
const router = express.Router();

// Use verifyToken middleware for all routes
router.use(verifyToken);

// Route for adding a new product with image upload
router.post("/addNewProduct", upload.single("image"), addNewProduct); // Use fileUpload as middleware

// Example routes for getting users, new orders, and updating order status
router.get("/getUsers", getUsers);

router.get("/getNewOrders", getNewOrders);

router.patch("/updateStatusOrder", updateStatusOrder);

export default router;

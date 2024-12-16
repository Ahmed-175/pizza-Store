import express from "express";
import multer from "multer";
import verifyToken from "../middlewares/prodectRoutes.js";
import {
  addOrder,
  addToCart,
  changeAvatar,
  getInfo,
  removeFromCart,
} from "../controllers/user.controller.js";

const router = express.Router();
const upload = multer({ dest: "assets/" });

router.use(verifyToken);
router.get("/getInfo", getInfo);
router.post("addOrder", addOrder);
router.patch("/addToCart", addToCart);
router.patch("/removeFromCart", removeFromCart);
router.patch("/changeAvatar", upload.single("avatar"), changeAvatar);

export default router;

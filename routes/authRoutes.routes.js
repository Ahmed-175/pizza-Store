import express from "express";
import { logIn, signUp } from "../controllers/auth.cotroller.js";

const router = express.Router();


router.post("/signUp", signUp);
router.post("/logIn", logIn);



export default router;
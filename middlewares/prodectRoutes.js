import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = decoded;

    next();
  } catch (error) {
    res.status(400).json({
      message: "Invalid or expired token.",
      error: error.message,
    });
  }
};

export default verifyToken;

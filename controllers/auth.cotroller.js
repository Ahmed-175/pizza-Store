import bcrypt from "bcrypt";
import User from "../models/user.models.js";
import { generateToken } from "../utils/jwt.js";

/**
 * Sign-up function
 * Registers a new user by saving their details to the database.
 *
 * @param {Object} req - The request object containing user details in the body.
 * @param {Object} res - The response object used to send back the result.
 *
 * @returns {Object} Response indicating success or failure of the sign-up process.
 */

export const signUp = async (req, res) => {
  try {
    const { fullName, email, phone, password, confirmPassword } = req.body;

    if (!fullName || !email || !phone || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();

    const token = generateToken(newUser);

    // Send a success response with user details
    res
      .status(201)
      .json({ message: "User created successfully!", token, newUser });
  } catch (error) {
    // Handle unexpected errors and log them
    res.status(500).json({ message: "Something went wrong.", error });
    console.error(error);
  }
};

/**
 * Log-in function
 * Verifies user credentials and returns a JWT token upon successful login.
 *
 * @param {Object} req - The request object containing login details (email and password).
 * @param {Object} res - The response object used to send back the result.
 *
 * @returns {Object} Response indicating success or failure of the login process.
 */
export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const token = generateToken(existingUser);

    res
      .status(200)
      .json({ message: "Login successful!", token, user: existingUser });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", error });
    console.error(error);
  }
};

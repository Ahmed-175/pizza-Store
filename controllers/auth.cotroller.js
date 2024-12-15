import bcrypt from "bcrypt";
import User from "../models/user.models.js";
import { generateToken } from "../utils/jwt.js";
import Admin from "../models/admin.models.js";

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

    // Check if all required fields are provided
    if (!fullName || !email || !phone || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    // Check if the email is already in use by a user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user object and save to the database
    const newUser = new User({
      fullName,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate a token for the new user
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

    // Ensure both email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    // Check if user or admin exists
    const existingUser = await User.findOne({ email });
    const existingAdmin = await Admin.findOne({ email });

    // If no user or admin exists with the email
    if (!existingUser && !existingAdmin) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    let user = existingUser || existingAdmin; // Select user or admin based on existence

    // Compare the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Generate a token for the user/admin
    const token = generateToken(user);

    // Respond with success message and token
    res.status(200).json({ message: "Login successful!", token, user });
  } catch (error) {
    // Handle unexpected errors
    res.status(500).json({ message: "Something went wrong.", error });
    console.error(error);
  }
};

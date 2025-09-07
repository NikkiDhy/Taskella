import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const addUser = async (req, res) => {
  try {
    const { FullName, Username, Password } = req.body;

    if (
      !FullName ||
      !Username ||
      !Password ||
      FullName.trim() === "" ||
      Username.trim() === "" ||
      Password.trim() === ""
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (Password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const existingUser = await userModel.findOne({ Username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(Password, 12);
    //console.log("Hashed Password:", hashedPassword); // Debugging line
    const newUser = new userModel({
      FullName,
      Username,
      Password: hashedPassword,
    });
    await newUser.save();
    const token = jwt.sign(
      { userId: newUser._id, username: newUser.Username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.status(200).json({
      message: "Registration successful! You are now logged in.",
      token: token,
      user: {
        Username: newUser.Username,
        FullName: newUser.FullName,
        id: newUser._id,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id, FullName, Username, Password } = req.body;

    if (!id || id.trim() === "") {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (
      !FullName ||
      !Username ||
      !Password ||
      FullName.trim() === "" ||
      Username.trim() === "" ||
      Password.trim() === ""
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { FullName, Username, Password },
      { new: true },
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { Username, Password } = req.body;
    if (!Username || !Password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await userModel.findOne({ Username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(Password, user.Password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.Username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.status(200).json({
      message: "Login successful",
      token: token,
      user: {
        Username: user.Username,
        FullName: user.FullName,
        id: user._id,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

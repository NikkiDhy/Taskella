import userModel from "../models/userModel.js";

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

    const existingUser = await userModel.findOne({ Username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newUser = new userModel({ FullName, Username, Password });
    await newUser.save();
    res.status(200).json({ message: "User added successfully", newUser });
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

// db connection only
//mongodb+srv://dhyaniriya1403:Riya1403@todo.tux3f.mongodb.net/

import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "../constants.js";

dotenv.config(); // Load environment variables

const connectDB = async () => {
  try {
    const connInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`,
    );
    console.log(`MongoDB Connected ${connInstance.connection.host}`);
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1); // Exit process on failure
  }
};

export default connectDB;

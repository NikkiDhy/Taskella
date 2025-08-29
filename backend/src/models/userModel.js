import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  FullName: {
    type: String,
    required: true,
  },
  Username: {
    type: String,
    default: false,
  },
  Password: {
    type: String,
    ref: "User",
  },
  CreatedDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);

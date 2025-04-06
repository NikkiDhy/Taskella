import mongoose from "mongoose";

// mongoose each document stored is assigned a unique id  => no need to have a primary key defined
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  MarkAsCompleted: {
    type: Boolean,
    default: false,
  },
  CreatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Todo", todoSchema);
//module.exports = Student;

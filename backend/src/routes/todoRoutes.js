import express from "express";
import Todo from "../models/todoModel.js";
import {
  addTodo,
  getTodoList,
  updateTodo,
} from "../controllers/todoContoller.js";

const router = express.Router();

// router.post("/add", async (req, res) => {
//   try {
//     // const { task } = req.body;
//     // const newTodo = new Todo({ task });
//     // awaiconst { task } = req.body;
//     // const newTodo = new Todo({ task });
//     // await newTodo.save();
//     res.status(201).json({ message: "To-Do added successfully" });
//   } catch (error) {
//     //res.status(500).json({ error: error.message });
//   }
// });

//addTodo => fn reference
//addTodo() => imediately executes the function
router.route("/add").post(addTodo);
router.route("/getAll").get(getTodoList);
router.route("/update").post(updateTodo);

export default router;

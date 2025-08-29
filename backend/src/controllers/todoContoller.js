import todoModel from "../models/todoModel.js";

//add a todo
export const addTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const newTodo = new todoModel({ title });

    await newTodo.save();
    res.status(200).json({ message: "To-Do added successfully", newTodo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get all todos
export const getTodoList = async (req, res) => {
  try {
    // const startOfDay = new Date();
    // startOfDay.setHours(0, 0, 0, 0);
    // const endOfDay = new Date();
    // endOfDay.setHours(23, 59, 59, 999);
    // console.log("Start of day:", startOfDay);
    // console.log("End of day:", endOfDay);
    // const todoList = await todoModel.find({
    //   createdAt: { $gte: startOfDay, $lte: endOfDay },
    // });
    const todoList = await todoModel.find().sort({ createdAt: -1 });
    res.json(todoList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//mark/unmark todo as completed
export const updateTodo = async (req, res) => {
  const { id, completed } = req.body;

  try {
    const todoToUpdate = await todoModel.findById(id);
    todoToUpdate.IsCompleted = completed;
    const updatedRecord = await todoToUpdate.save();
    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const id = req.body.id;
    const deletedTodo = await todoModel.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
    // console.log("todo to delete :", deletedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

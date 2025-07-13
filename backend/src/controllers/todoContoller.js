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
    const todoList = await todoModel.find();
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

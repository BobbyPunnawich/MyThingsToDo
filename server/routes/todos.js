const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// Create todo
router.post("/", async (req, res) => {
  const { title, description, deadline, urgent } = req.body;

  const newTodo = new Todo({
    title,
    description,
    deadline,
    urgent,
  });

  try {
    const todo = await newTodo.save();
    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create todo" });
  }
});

// Get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ deadline: 1 });
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch todos" });
  }
});

// Update a todo
router.put("/:id", async (req, res) => {
  const { title, description, deadline, urgent, completed } = req.body;

  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, deadline, urgent, completed },
      { new: true }
    );
    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update todo" });
  }
});

// Delete a todo
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete todo" });
  }
});

module.exports = router;

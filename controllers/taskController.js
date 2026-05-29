import Task from "../models/Task.js";

// Get Tasks

export const getTasks = async (req, res) => {
  const tasks = await Task.find({
    user: req.user._id,
  });

  res.json(tasks);
};

// Create Task

export const createTask = async (req, res) => {
  const { title, category } = req.body;

  const task = await Task.create({
    title,
    category,
    user: req.user._id,
  });

  res.status(201).json(task);
};

// Update Task

export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task) {
    task.title =
      req.body.title || task.title;

    task.category =
      req.body.category || task.category;

    const updatedTask = await task.save();

    res.json(updatedTask);
  } else {
    res.status(404);

    throw new Error("Task Not Found");
  }
};

// Delete Task

export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task) {
    await task.deleteOne();

    res.json({
      message: "Task Removed",
    });
  } else {
    res.status(404);

    throw new Error("Task Not Found");
  }
};
const express = require("express");
const router = express.Router();

const Task = require("../models/task.model");
const verifyToken = require("../middlewares/verifyToken");

// 👉 Create Task
router.post("/", verifyToken, async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      user: req.user.id,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

// 👉 Get All Tasks of Logged In User
router.get("/", verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// 👉 Update Task
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Task not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

// 👉 TOGGLE Complete Status
router.put("/:id/toggle", verifyToken, async (req, res) => {
  try {
    console.log("🟢 Toggle route HIT");
    console.log("➡️ Task ID:", req.params.id);
    console.log("👤 User ID from token:", req.user.id);

    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) return res.status(404).json({ msg: "Task not found" });

    task.completed = !task.completed;
    await task.save();

    res.json(task);
  } catch (err) {
    console.error("🔴 Toggle Error:", err.message);
    res.status(500).json({ msg: "Failed to toggle task" });
  }
});

// 👉 Delete Task
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!deleted) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

module.exports = router;

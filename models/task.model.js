const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  completed: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: Date,
    required: true, // Agar optional chahiye ho to false kar sakta hai
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);

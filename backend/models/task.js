const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    status: {
  type: String,
  enum: ["To Do", "In Progress", "Completed"],
  default: "To Do",
},
    assignedTo: {
      type: String,
      default: "",
    },

    dueDate: {
      type: Date,
    },

    comments: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
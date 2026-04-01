import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 100,
    },
    content: {
      type: String,
      required: true,
      maxLength: 500,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);

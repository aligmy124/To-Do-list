import mongoose from "mongoose";

export type Status = "To-Do" | "In-Progress" | "Done";
export type Priority = "Low" | "Medium" | "High";

export interface Task {
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new mongoose.Schema<Task>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minLength: [3, "title must be at least 3 letters"],
      maxLength:[50, "Title must not exceed 50 characters"]
    },
    description: {
      type: String,
      required: [true, "description is required"],
      trim: true,
      minLength: [20, "description must be at least 20 letters"],
      maxLength:[500, "Description must not exceed 500 characters"]
    },
    status: {
      type: String,
      enum: ["To-Do", "In-Progress", "Done"],
      default: "To-Do",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },
  },
  { timestamps: true },
);

export const Tasks= mongoose.model<Task>('Task',TaskSchema);
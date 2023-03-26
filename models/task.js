import mongoose from 'mongoose';

// database schema
const userSchema = new mongoose.Schema({
  title: String,
  description: String,
  isCompleted: Boolean,
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
  },
});

// database model
export const Task = mongoose.model("Task", userSchema);

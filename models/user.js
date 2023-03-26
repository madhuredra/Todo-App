import mongoose from 'mongoose';

// database schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  createdAt: Date,
});
// database model
export const User = mongoose.model("User", userSchema);

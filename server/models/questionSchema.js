import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // unique ID for question
  question: { type: String, required: true },
  options: { type: [String], required: true },
  answer: { type: Number, required: true }, // index of correct option
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Question", questionSchema);

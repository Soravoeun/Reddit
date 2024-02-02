import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  title: { type: String },
  content: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [
    {
      id: { type: mongoose.Schema.Types.ObjectId },
      author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      content: { type: String },
    },
  ],
});

export const Post = mongoose.model("Post", postSchema);

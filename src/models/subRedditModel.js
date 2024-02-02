import mongoose, { Schema } from "mongoose";

const subRedditSchema = new Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  name: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  description: { type: String },
  moderators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }]
//     [
//     {
//       id: { type: mongoose.Schema.Types.ObjectId },
//       title: { type: String },
//       content: { type: String },
//       author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//       comments: [
//         {
//           id: { type: mongoose.Schema.Types.ObjectId },
//           author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//           content: { type: String },
//         },
//       ],
//     },
//   ],
});

const SubReddit = mongoose.model("Subreddit", subRedditSchema);

export default SubReddit;

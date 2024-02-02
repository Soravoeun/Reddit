import mongoose, { Schema } from "mongoose";

const commentaireSchema = new Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: { type: String },
});

export const Commentaire = mongoose.model('Commentaire', commentaireSchema);    
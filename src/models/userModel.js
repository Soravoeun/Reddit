import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: { type: String, required: true },
  password: {
    type: String,
    required: true,
    min: [6, "must be at least 6 characters"],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  name: String,
  email: { type: String, required: true },
  password: {
    type: String,
    required: true,
    min: [6, "must be at least 6 characters"],
  },
});

//ajout dans le schema le moyen de caché le password avec salt et hash de bcrypt
userSchema.methods.crypto = async (password) => { 
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

// ajout de la methode verification du password
userSchema.methods.verify = async (password, oldPassword) => {
  const result = await bcrypt.compare(password, oldPassword);
  console.log("vérification du password");
  return result;
};



const User = mongoose.model("User", userSchema);

export default User;
import { generateToken } from "../middlewares/auth";
import User from "../models/userModel";

export const inscription = async (req, res) => {
  try {
    const newUser = new User();
    newUser.email = req.body.email;
    newUser.password = await newUser.crypto(req.body.password);
    newUser.save();
      console.log("vous êtes connecté");
      // ajout du token 
      const token = generateToken(newUser);
      // ajout token dans le res.json
    res.json({newUser, token});
  } catch (error) {
    res.status(404);
    console.error({ message: error.message });
  }
};

export const login = async (req, res) => {
    // ajout des paramètres pour la verification du password avec le salt
   const { email, password } = req.body;
  try {
      const user = await User.findOne({ email }).select("+password");
      const verify = await user.verify(password, user.password)

      if (!verify) { 
          const error = new Error("Invalid password");
          throw error;
      }
      const token = generateToken(user);
    console.log("token");
    res.json({ message: "Vous êtes connecté", token });
  } catch (error) {
    res.status(404);
    console.error({ message: error.message });
  }
};

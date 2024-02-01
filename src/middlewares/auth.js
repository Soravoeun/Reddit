import jwt from "jsonwebtoken";
import "dotenv/config"; 

export const auth = (req, res, next) => {
  const tokenHeader = req.headers.authorization;
  const token = tokenHeader.split(" ")[1];

  if (!token) {
    return res
      .status(403)
      .json({ message: "Access non autorisé, token manquant" });
  }

  try {
    const decodedJwt = jwt.verify(token.process.env.JWT_SECRET);
      req.user = decodedJwt.user;
      next();
  } catch (error) {
    res.status(403).json({ message: "Token invalide" });
  }
};

export const generateToken = (user) => {
    const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return token;
 }

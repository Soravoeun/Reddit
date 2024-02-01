import { Router } from "express";
import { inscription, login } from "../controllers/userController";

export const userRouter = Router();

userRouter.post('/register', inscription);
userRouter.get('/login', login)
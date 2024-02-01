import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { userRouter } from "./routes/userRoute";
dotenv.config();

const app = express();
const port = process.env.PORT;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log(`[📚 DATABASE ] MongoDB Reddit est connecté ici!!`);
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send("Welcome to the API of Reddit !!!"));
app.use('/user', userRouter)

app.listen(port, () =>
  console.log(`[SERVER] is running on http://localhost:${port}`)
);

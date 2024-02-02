import { Router } from "express";
import { createSubReddit, getAllSubReddits, getOneSubReddit, removeSubReddit, updateOneSubReddit } from "../controllers/subRedditController";

export const subRedditRouter = Router();

subRedditRouter.post('/create', createSubReddit);
subRedditRouter.get('/all', getAllSubReddits); 
subRedditRouter.get("/:id/one", getOneSubReddit); 
subRedditRouter.put('/:id/edit', updateOneSubReddit)
subRedditRouter.delete('/:id/delete', removeSubReddit)

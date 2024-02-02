import { Router } from "express";
import { allPosts, createPost, deleteOnePost, getOnePost, updateOnePost } from "../controllers/postController";

export const postRouter = Router();

postRouter.post('/create', createPost); 
postRouter.get('/all', allPosts);
postRouter.get('/one', getOnePost);
postRouter.put('/:id/edit', updateOnePost);
postRouter.delete('/:id/delete', deleteOnePost);
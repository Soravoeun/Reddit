import { Router } from "express";
import {
  allPosts,
  createPost,
  deleteOnePost,
  getOnePost,
  updateOnePost,
} from "../controllers/postController";

export const postRouter = Router();

postRouter.post("/:subRedditId/create", createPost);
postRouter.get("/:subRedditId/all", allPosts);
postRouter.get("/:subRedditId/:postId/one", getOnePost);
postRouter.put("/:subRedditId/:postId/edit", updateOnePost);
postRouter.delete("/:subRedditId/:postId/delete", deleteOnePost);


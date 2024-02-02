import { Router } from "express";
import {
  allCommentaire,
  createCommentaire,
  deleteOneCommentaire,
  getOneCommentaire,
  updateOneCommentaire,
} from "../controllers/commentaireController";

export const commentaireRouter = Router();

commentaireRouter.post("/:postId/create", createCommentaire);
commentaireRouter.get("/:postId/all", allCommentaire);
commentaireRouter.get("/:postId/:commentId/one", getOneCommentaire);
commentaireRouter.put("/:postId/:commentId/edit", updateOneCommentaire);
commentaireRouter.delete(
  "/:postId/:commentId/delete",
  deleteOneCommentaire
);

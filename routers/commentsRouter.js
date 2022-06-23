import { Router } from "express";
import { commentsCounter, getComments, postComment } from "../controllers/commentsController.js";
import validToken from "../middwares/validateTokenMiddware.js";

const commentsRouter=Router();
commentsRouter.post("/comments", validToken, postComment);
commentsRouter.get("/comments/:postId", validToken, getComments);
commentsRouter.get("/comments/counter/:postId", validToken, commentsCounter);

export default commentsRouter;

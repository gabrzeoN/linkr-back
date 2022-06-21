import {Router} from "express";
import validToken from "../middwares/validateTokenMiddware.js";
import { likeDislikePost, checkLikeStatus } from "../controllers/likesController.js";

const likesRouter = Router();

likesRouter.post("/likes/:postId", validToken, likeDislikePost);
likesRouter.get("/likes/:postId", validToken, checkLikeStatus);

export default likesRouter;

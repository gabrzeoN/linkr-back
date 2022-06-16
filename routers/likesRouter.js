import {Router} from "express";
import validToken from "../middwares/validateTokenMiddware.js";
import { likeDislikePost } from "../controllers/likesController.js";

const likesRouter = Router();

likesRouter.post("/likes/:postId", validToken, likeDislikePost);
// likesRouter.delete("/likes/:postId", validToken, dislikePost);

export default likesRouter;

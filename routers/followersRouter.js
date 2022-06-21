import {Router} from "express";
import validToken from "../middwares/validateTokenMiddware.js";
import { checkFollowingStatus, followUnfollowUser } from "../controllers/followersController.js";

const followersRouter = Router();

followersRouter.post("/followers/:userId", validToken, followUnfollowUser);
followersRouter.get("/followers/:userId", validToken, checkFollowingStatus);

export default followersRouter;
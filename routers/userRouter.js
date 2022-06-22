import { Router } from "express";
import { getPostsByUserId } from "../controllers/userController.js";
import validToken from "../middwares/validateTokenMiddware.js";

const userRouter = Router();
userRouter.get("/users/:id", validToken, getPostsByUserId);

export default userRouter;
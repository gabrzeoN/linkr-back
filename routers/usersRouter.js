import {Router} from "express";
import { getPostsByUser } from "../controllers/postsController.js";
//import validToken from "./../middwares/validateTokenMiddware.js";


const userRouter = Router();
userRouter.get("/users/:id", getPostsByUser);

export default userRouter;
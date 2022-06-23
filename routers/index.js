import { Router } from "express";
import trendingRouter from "./trendingRouter.js";
import authRouter from "./authRouter.js"
import postRouter from "./postRouter.js";
import tagsRouter from "./tagsRouter.js";
import likesRouter from "./likesRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use(authRouter);
router.use(postRouter);
router.use(trendingRouter);
router.use(tagsRouter);
router.use(likesRouter);
router.use(userRouter);

export default router;
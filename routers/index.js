import { Router } from "express";
import trendingRouter from "./trendingRouter.js";
import authRouter from "./authRouter.js"
import postRouter from "./postRouter.js";
import tagsRouter from "./tagsRouter.js";
import likesRouter from "./likesRouter.js";
import followersRouter from "./followersRouter.js";
import userRouter from "./userRouter.js";
import commentsRouter from "./commentsRouter.js";

const router = Router();

router.use(authRouter);
router.use(postRouter);
router.use(trendingRouter);
router.use(tagsRouter);
router.use(likesRouter);
router.use(followersRouter);
router.use(commentsRouter);
router.use(userRouter);

export default router;
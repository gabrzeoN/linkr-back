import { Router } from "express";
import trendingRouter from "./trendingRouter.js";
import authRouter from "./authRouter.js"
import postRouter from "./postRouter.js";
import tagsRouter from "./tagsRouter.js";

const router = Router();

router.use(authRouter);
router.use(postRouter);
router.use(trendingRouter);
router.use(tagsRouter);

export default router;
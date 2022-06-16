import { Router } from "express";
import authRouter from "./authRouter.js"
import postRouter from "./postRouter.js";
import likesRouter from "./likesRouter.js";

const router = Router();

router.use(authRouter);
router.use(postRouter);
router.use(likesRouter);

export default router;
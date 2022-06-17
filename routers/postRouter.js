import { Router } from "express";
import { getPost } from "../controllers/postsController.js";
import validSchema from "../middwares/validateSchemaMiddware.js";
import { postSchema } from "../schemas/postSchema.js";

const postRouter = Router();

postRouter.post("/timeline", validSchema(postSchema),);
postRouter.get("/timeline", getPost);

export default postRouter;
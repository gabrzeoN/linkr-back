import { Router } from "express";
import { createPost, getPost } from "../controllers/postsController.js";
import validSchema from "../middwares/validateSchemaMiddware.js";
import { postSchema } from "../schemas/postSchema.js";

const postRouter = Router();

/* postRouter.post("/posts", validSchema(postSchema), createPost); */
postRouter.get("/posts", validSchema(userSchema), getPost);

export default postRouter;
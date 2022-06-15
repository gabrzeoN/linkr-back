import {Router} from "express";
import postSchema from "../schemas/postSchema.js";
import { addPost } from "../controllers/postsController.js";
import validSchema from "../middwares/validateSchemaMiddware.js";
import { addHashtags } from "../middwares/hashtagMiddleware.js";

const postRouter = Router();

postRouter.post("/posts", validSchema(postSchema), addHashtags, addPost);

export default postRouter;

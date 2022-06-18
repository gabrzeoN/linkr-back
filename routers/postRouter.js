import {Router} from "express";
import postSchema from "../schemas/postSchema.js";
import { addPost, getPost, updatePost } from "../controllers/postsController.js";
import validSchema from "../middwares/validateSchemaMiddware.js";
import { addHashtags } from "../middwares/hashtagMiddleware.js";
import validToken from "../middwares/validateTokenMiddware.js";
import { verifyPost } from "../middwares/postMiddlewares.js";

const postRouter = Router();

postRouter.post("/posts", validToken, validSchema(postSchema), addHashtags, addPost);
postRouter.get("/timeline", getPost);
postRouter.put("/posts", validToken, verifyPost, updatePost);


export default postRouter;


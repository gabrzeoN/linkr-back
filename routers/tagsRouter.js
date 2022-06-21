import { Router } from "express";
import { getTagPosts } from "../controllers/tagsController.js";
import validToken from "../middwares/validateTokenMiddware.js";

const tagsRouter = Router();

tagsRouter.get("/hashtag/:hashtag", validToken, getTagPosts);

export default tagsRouter;
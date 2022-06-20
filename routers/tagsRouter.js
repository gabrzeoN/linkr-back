import { Router } from "express";
import { getTagPosts } from "../controllers/tagsController.js";
import { validateToken } from "../middwares/validateTokenMiddware.js";

const tagsRouter = Router();

tagsRouter.get("/hashtag/:hashtag", validateToken, getTagPosts);

export default tagsRouter;
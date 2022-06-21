import { Router } from "express";
import { getTrending } from '../controllers/trendingController.js'
import { validateToken } from "../middwares/validateTokenMiddware.js"

const trendingRouter = Router();

trendingRouter.get('/trending',validateToken, getTrending);

export default trendingRouter;
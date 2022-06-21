import { Router } from "express";
import { trendingController } from '../controllers/trendingController.js'
import validateToken from "../middwares/validateTokenMiddware.js"

const trendingRouter = Router();

trendingRouter.get('/trending',validateToken, trendingController);

export default trendingRouter;
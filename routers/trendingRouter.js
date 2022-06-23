import { Router } from "express";
import { trendingController } from '../controllers/trendingController.js'
import validToken from "../middwares/validateTokenMiddware.js"

const trendingRouter = Router();

trendingRouter.get('/trending',validToken, trendingController);

export default trendingRouter;
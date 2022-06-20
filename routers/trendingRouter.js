import { Router } from "express";
import { getTrending } from '../controllers/trendingController.js'

const trendingRouter = Router();

trendingRouter.get('/trending/:limit', getTrending);

export default trendingRouter;
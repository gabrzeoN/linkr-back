import { Router } from "express";
import { signUp } from "../Controllers/authController.js";
import validateSchemaMiddleware from "../Middlewares/validateSchemaMiddleware.js";
import userSchema from "../Schemas/userSchema.js";

const authRouter = Router();

authRouter.post('/sign-up', validateSchemaMiddleware(userSchema), signUp);

export default authRouter;
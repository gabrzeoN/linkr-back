import { Router } from "express";
import { signIn, signUp } from "./../controllers/authController.js";
import { signInSchema, userSchema } from "../schemas/authSchemas.js";
import validSchema from "../middwares/validateSchemaMiddware.js";

const authRouter = Router();

authRouter.post("/sign-in", validSchema(signInSchema), signIn);
authRouter.post('/sign-up', validSchema(userSchema), signUp);

export default authRouter;
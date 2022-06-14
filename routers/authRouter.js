import { Router } from "express";
import { signIn } from "./../controllers/authController.js";
import { signInSchema } from "../schemas/authSchemas.js";
import validSchema from "../middwares/validateSchemaMiddware.js";

const authRouter = Router();

authRouter.post("/sign-in", validSchema(signInSchema), signIn);

export default authRouter;
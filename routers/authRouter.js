import { Router } from "express";
import { signIn, signUp, signOut, getUserFromSearch } from "./../controllers/authController.js";
import { signInSchema, userSchema } from "../schemas/authSchemas.js";
import validSchema from "../middwares/validateSchemaMiddware.js";
import validToken from "../middwares/validateTokenMiddware.js";

const authRouter = Router();

authRouter.post("/sign-in", validSchema(signInSchema), signIn);
authRouter.post('/sign-up', validSchema(userSchema), signUp);
authRouter.patch('/sign-out', validToken, signOut);
authRouter.get('/search', getUserFromSearch);

export default authRouter;
import joi from "joi";

export const signInSchema = joi.object({
    email: joi.string().trim().email().required(),
    password: joi.string().required()
});
import joi from "joi";

export const signInSchema = joi.object({
    email: joi.string().trim().email().required(),
    password: joi.string().required()
});

export const userSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    image: joi.string().uri().required()
});
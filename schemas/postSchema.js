import Joi from "joi";

export const postSchema = Joi.object({
    url: Joi.string().uri().required(),
    message: Joi.string().min(0)
});
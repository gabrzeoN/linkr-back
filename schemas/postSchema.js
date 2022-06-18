import Joi from "joi";
  
const postSchema = Joi.object({
    url: Joi.string().uri().required(),
    message: Joi.string().min(0)
})

export default postSchema;
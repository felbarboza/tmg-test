import Joi from "joi";

const paramKeySchema = Joi.object({
	key: Joi.string().max(255).required(),
});

export default paramKeySchema;

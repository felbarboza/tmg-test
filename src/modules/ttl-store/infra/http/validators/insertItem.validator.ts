import Joi from "joi";

const insertItemSchema = Joi.object({
	key: Joi.string().max(255).required(),
	value: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
	ttl: Joi.number().positive().max(60000).optional(),
});

export default insertItemSchema;

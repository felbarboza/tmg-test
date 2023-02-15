import Joi from "joi";

const insertItemSchema = Joi.object({
	value: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
});

export default insertItemSchema;

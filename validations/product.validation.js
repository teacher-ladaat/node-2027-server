import Joi from "joi";

// ברירת מחדל שדה חובה
export const newProductSchame = Joi.object({
    name: Joi.string().alphanum().required(),
    price: Joi.number().positive().required(),
    amount: Joi.number().integer().positive().default(0),
    category: Joi.string().valid('fruit', 'milk', 'meat', 'other').required()
});
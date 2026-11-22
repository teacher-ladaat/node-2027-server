import Joi from "joi";

export const newOrderScheme = new Schema({
    date: Joi.date().min("now"), // תאריך אספקה

    // כל המוצרים שהוזמנו - לכל מוצר גם כמות
    products: [{
        _id: Joi.any().required(),
        amount: Joi.number().positive().required().default(1),
        name: Joi.string().optional(),
        price: Joi.number().positive().optional(),
    }],

    // לקוח
    // userId: { type: SchemaTypes.ObjectId, ref: 'User' }
});
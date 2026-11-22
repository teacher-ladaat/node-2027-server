import Joi from "joi";

// ברירת מחדל שדה חובה
export const newProductScheme = Joi.object({
    name: Joi.string().alphanum().required(),
    price: Joi.number().positive().required(),
    amount: Joi.number().integer().positive().default(0),
    category: Joi.string().valid('fruit', 'milk', 'meat', 'other').required()
});

// Joi יתרונות של בדיקות תקינות של
// 1. ניתן לבדוק גם כאשר לא מוסיפים/מעדכנים דטהבייס
// 2. לא לוקח הרבה זמן - סינכרוני
// 3. ניתן ליצור כמה סכמות לאותו אוביקט
// 4. קל לבצע בדיקות יחידה על הקוד - unit test
// 5. ניתן לקחת לפרויקט של קליינט, למשל: ריאקט
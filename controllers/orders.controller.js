import { isValidObjectId } from "mongoose";
import Order from "../models/order.model.js";

export const addOrder = async (req, res, next) => {
    // TODO: בדיקה שכל המוצרים שנשלחו קיימים בדטהבייס
    // מונגו לא בודק תקינות של מפתח זר, ולכן חובה לבדוק זאת ידנית
    // ורק אח"כ להכניס לדטהבייס
    // find/exists

    // 1. יצירת אוביקט חדש
    const newOrder = new Order(req.body);

    // 2. שמירה בדטהבייס
    await newOrder.save();

    res.status(201).json(newOrder);
};

export const getOrderById = async (req, res, next) => {
    const id = req.params.id;

    // אם האיי-די לא חוקי
    if (!isValidObjectId(id)) {
        return next({ status: 404, msg: `order ${id} is not found!`, type: 'resource-not-found' });
    }

    // JOIN-בד"כ לא נצטרך להשתמש ב
    // populate אם נרצה להשתמש בו נשתמש בפונקציה
    // ref שיש לו ObjectId כלל: פונקציה זו עובדת רק על שדה מסוג
    const o = await Order.findById(id)
        .populate('products._id');

    if (!o) {
        return next({ status: 404, msg: `order ${id} is not found!`, type: 'resource-not-found' });
    }

    return res.json(o);
};
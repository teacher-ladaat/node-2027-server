import { isValidObjectId } from "mongoose";
import Product from "../models/product.model.js";
import { newProductSchame } from "../validations/product.validation.js";

// pagintation, sort
export const getAllProducts = async (req, res, next) => {
    try {
        //#region דוגמאות לשאילתות
        // const products = await Product.find({ name: "milk", price: 10 }); // כל המוצרים שהשם שלהם "חלב" והמחיר שווה לעשר
        // const products = await Product.find({ price: { $gte: 10, $lt: 50 } }); // כל המוצרים שמחירם גדול/שווה עשר וגם קטן מחמישים
        // const products = await Product.find({
        //     $or: [
        //         { price: { $gte: 10 } },
        //         { price: { $lt: 50 } },
        //         { name: /^a/i }, // LIKE 'a%' or 'A%'
        //         { name: /a$/i }, // LIKE '%a' or '%A'
        //         { name: /a/i }, // LIKE '%a%' or '%A%'
        //     ]
        // }); // כל המוצרים שמחירם גדול/שווה עשר או קטן מחמישים
        //#endregion

        const { page = 1, limit = 5 } = req.query; // ?...

        const products = await Product.find() // כל המוצרים
            .skip((page - 1) * limit) // כמה תדלג
            .limit(limit); // כמה תביא לכל היותר

        const total = await Product.countDocuments();

        // תמיד כשעושים עימוד, מחזירים גם סה"כ כמה מוצרים יש
        return res.json({ data: products, total });
    } catch (error) {
        next({});
    }
};

export const getProductById = async (req, res, next) => {
    try {
        const p = await Product.findById(req.params.idx);
        if (p) {
            res.json(p);
        } else {
            next({ status: 404, msg: `product ${req.params.idx} not found!`, type: 'resource-not-found' });
        }
    } catch (error) {
        next({});
    }
};

export const addProduct = async (req, res, next) => {
    try {
        const { value, error } = newProductSchame.validate(req.body);

        if (error)
            return next({ status: 409, msg: error });
        else {
            const newP = new Product(value); // מותר כי כבר בדקנו שהנתונים תקינים
            await newP.save();
            return res.status(201).json(newP);
        }
    } catch (error) {
        next({});
    }
};

export const updateProduct = async (req, res, next) => {
    const { id } = req.params;

    try {
        // עדכון אוביקט במונגו
        // 1. עדכון/הוספת שדה, שינוי ערך = $set
        // 2. מחיקת שדה = $unset
        // 3. שינוי שם לשדה - $rename
        // 4. הוספה/מחיקה ממערך
        /*
        Product.findByIdAndUpdate(id, {
            $set: { price: 100 },
            $unset: { name: true },
            $rename: { categories: 'category' },
            $push: { categories: ['aaa', 'bbb'] }, // הוספה עם כפולים
            $addToSet: { categories: ['aaa', 'bbb'] }, // הוספה ללא כפולים
        });
        */

        if (!isValidObjectId(id)) {
            return next({ status: 404, msg: `product ${id} is not found!`, type: 'resource-not-found' });
        }

        const p = await Product.findByIdAndUpdate(id, // 1. תנאי
            { $set: req.body }, // 2. מה לעדכן במסמך
            { returnDocument: 'after', runValidators: true }  // 3. הגדרות נוספות - למשל החזרת האוביקט המעודכן, הפעלת בדיקות בעת עדכון
            // { new: true } // כנ"ל בדרך ישנה יותר
        );

        if (!p) {
            return next({ status: 404, msg: `product ${id} is not found!`, type: 'resource-not-found' });
        }

        return res.json(p);
    } catch (error) {
        next({});
    }

    const index = products.findIndex(p => p.id === +req.params.id);

    if (index === -1) {
        return next({ status: 404, msg: `product ${req.params.idx} not found!`, type: 'resource-not-found' });
    }

    products[index] = req.body;
    res.json(req.body);
};

export const deleteProduct = async (req, res, next) => {
    const { id } = req.params;
    try {
        // תמיד נבדוק קודם חוקיות של איי-די
        // ורק אח"כ נחפש לפיו
        // catch-אחרת מונגו יזרוק שגיאה ל
        if (!isValidObjectId(id)) {
            return next({ status: 404, msg: `product ${id} is not found!`, type: 'resource-not-found' });
        }

        // לא מחזיר שגיאה עבור מוצר לא קיים
        const p = await Product.findByIdAndDelete(id);

        if (!p) {
            return next({ status: 404, msg: `product ${id} is not found!`, type: 'resource-not-found' });
        }

        // 204 - הצלחה ללא תוכן
        return res.status(204).json();
    } catch (error) {
        next({});
    }
};
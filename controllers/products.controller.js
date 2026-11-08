import { isValidObjectId } from "mongoose";
import Product from "../models/product.model.js";
import { newProductSchame } from "../validations/product.validation.js";

const products = [
    { id: 1, name: 'milk', price: 5 },
    { id: 2, name: 'bread', price: 3 },
    { id: 3, name: 'cheese', price: 4.5 },
];

// pagintation, sort
export const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        return res.json(products);
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

export const updateProduct = (req, res, next) => {
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
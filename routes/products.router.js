import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/products.controller.js";
import { printHello } from "../middlewares/demo.middleware.js";

// ראוטר הוא מיני שרת
// מכיל ניתוב אחד בתוך השרת - למשל מוצרים
// "http://localhost:4000/products"
const router = Router();

// כך נוסיף מידלוואר על כל הראוטר
// router.use(printHello);

// GET
// http://localhost:4000/products?startP=4
router.get('/', printHello, getAllProducts);

// GET
// http://localhost:4000/products/1
// כדי לשלוח פרמטר בכתובת, נכתוב אותו עם נקודותיים
router.get('/:idx', getProductById);

// POST
router.post('/', addProduct);

// PUT - עדכון מלא
router.put('/:id', updateProduct);

// PATCH - עדכון חלקי, למשל: עדכון סיסמא

// DELETE - מחיקה לפי קוד
router.delete('/:id', deleteProduct);

// default ניתן לייבא בכל שם כי ייצאנו עם
export default router;
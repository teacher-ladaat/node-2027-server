import { Router } from "express";

const products = [
    { id: 1, name: 'milk', price: 5 },
    { id: 2, name: 'bread', price: 3 },
    { id: 3, name: 'cheese', price: 4.5 },
];

// ראוטר הוא מיני שרת
// מכיל ניתוב אחד בתוך השרת - למשל מוצרים
// "http://localhost:4000/products"
const router = Router();

// GET
// http://localhost:4000/products?startP=4
router.get('/', (req, res) => {
    const x = req.query.startP;
    if (x) {
        res.send(products.filter(p => p.price >= x));
    }
    else {
        res.send(products);
    }
});

// GET
// http://localhost:4000/products/1
// כדי לשלוח פרמטר בכתובת, נכתוב אותו עם נקודותיים
router.get('/:idx', (req, res) => {
    // console.log(req.params); // כך נקבל את הפרמטרים שנשלחו כאוביקט
    // הערכים מתקבלים כמחרוזות

    const p = products.find(product => product.id === +req.params.idx); // +המרת מחרוזת למספר

    if (p) {
        res.send(p);
    } else {
        // מחזיר סטטוס של שגיאה
        res.status(404).send('product not found!');
    }
});

// POST
router.post('/', (req, res) => {
    products.push(req.body);
    res.status(201).send(req.body);
});


// PUT - עדכון מלא
router.put('/:id', (req, res) => {
    const index = products.findIndex(p => p.id === +req.params.id);
    products[index] = req.body;
    res.send(req.body);
});

// PATCH - עדכון חלקי, למשל: עדכון סיסמא

// DELETE - מחיקה לפי קוד
router.delete('/:id', (req, res) => {
    const index = products.findIndex(p => p.id === +req.params.id);
    products.splice(index, 1); // מחיקת איבר אחד החל מהמקום האינדקס
    res.status(204).send();
});

// default ניתן לייבא בכל שם כי ייצאנו עם
export default router;
// 1. ייבוא לאחר התקנה
import createApp, { json } from 'express';

// 2. יצירת שרת משוכלל
const app = createApp();

// כך מקבלים את הבאדי
app.use(json());

let count = 0;

// GET
// http://localhost:4000/
// http://localhost:4000
app.get('/', (req, res) => {
    res.send('count: ' + count);
});

// POST
// http://localhost:4000/
// http://localhost:4000
app.post('/', (req, res) => {
    count++;
    res.send('success');
});


const products = [
    { id: 1, name: 'milk', price: 5 },
    { id: 2, name: 'bread', price: 3 },
    { id: 3, name: 'cheese', price: 4.5 },
];

// GET
// http://localhost:4000/products?startP=4
app.get('/products', (req, res) => {
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
app.get('/products/:idx', (req, res) => {
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
app.post('/products', (req, res) => {
    products.push(req.body);
    res.status(201).send(req.body);
});


// PUT - עדכון מלא
app.put('/products/:id', (req, res) => {
    const index = products.findIndex(p => p.id === +req.params.id);
    products[index] = req.body;
    res.send(req.body);
});

// PATCH - עדכון חלקי, למשל: עדכון סיסמא

// DELETE - מחיקה לפי קוד
app.delete('/products/:id', (req, res) => {
    const index = products.findIndex(p => p.id === +req.params.id);
    products.splice(index, 1); // מחיקת איבר אחד החל מהמקום האינדקס
    res.status(204).send();
});

// 3. הרצת השרת על כתובת מסוימת
const port = 4000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
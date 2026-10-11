// 1. ייבוא לאחר התקנה
import createApp, { json } from 'express';
import productRouter from './routes/products.router.js';
import countRouter from './routes/count.router.js';

// 2. יצירת שרת משוכלל
const app = createApp();

// כך מקבלים את הבאדי
app.use(json());

// כל הניתובים בשרת
app.use('/', countRouter);
app.use('/products', productRouter);

// 3. הרצת השרת על כתובת מסוימת
const port = 4000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
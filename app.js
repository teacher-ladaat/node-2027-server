// 1. ייבוא לאחר התקנה
import createApp, { json } from 'express';
import productRouter from './routes/products.router.js';
import countRouter from './routes/count.router.js';
import { printHello } from './middlewares/demo.middleware.js';

// 2. יצירת שרת משוכלל
const app = createApp();

// app.use - הגדרות על כל השרת
// כל פעולה תיגש קודם כל לכאן
// יש חשיבות לסדר השליחה למידלוואר
// app.use(printHello);

// כך מקבלים את הבאדי
// חובה לכתוב אותו לפני הניתובים
// אחרת לא נקבל בהם באדי
app.use(json());

// כל הניתובים בשרת
app.use('/', countRouter);
// כך נוסיף מידלוואר על כל הראוטר
// app.use('/products', printHello, printHello, productRouter);
app.use('/products', productRouter);

// 3. הרצת השרת על כתובת מסוימת
const port = 4000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
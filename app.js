// 1. ייבוא לאחר התקנה
import createApp, { json } from 'express';
import productRouter from './routes/products.router.js';
import countRouter from './routes/count.router.js';
import { blockHoursCreator } from './middlewares/demo.middleware.js';
// import { blockHours, printHello } from './middlewares/demo.middleware.js';

// 2. יצירת שרת משוכלל
const app = createApp();

// app.use - הגדרות על כל השרת
// כל פעולה תיגש קודם כל לכאן
// יש חשיבות לסדר השליחה למידלוואר
// app.use(printHello);

// 1. יצירת מידלוואר לפי פרמטרים
// const block_8_20 = blockHoursCreator(8, 20);
// const block_19_22 = blockHoursCreator(19, 22); 

// 2. app.use-שליחת המידלוואר שחזר ל
// app.use(block_19_22);

app.use(blockHoursCreator(8, 22));

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
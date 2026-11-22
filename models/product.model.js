import { model, Schema } from "mongoose";

// בדיקות תקינות אלו נבדקות בעת הוספה/עדכון לדטהבייס
// יתרון
// גם אם מנסים להוסיף דרך שאילתות ולא דרך נוד, עדיין יופעלו
// ולכן נשתמש ב-2 הסוגים של הבדיקות
const productSchema = new Schema({
    // _id - אם לא כותבים נוצר אוטומטית
    name: {
        type: String,
        /* required: true, minlength: 2, unique: true */ // כאן אפשר ליצור בדיקות תקינות נוספות בתוך האוביקט
    },
    price: Number,
    amount: { type: Number, min: 0 },
    imgUrl: String,
    categories: [String], // מערך מחרוזות
});

const Product = model('Product', productSchema);
// הופך את שם הטבלה לרבים באותיות קטנות
// const Product = model('products', productSchema);

export default Product;
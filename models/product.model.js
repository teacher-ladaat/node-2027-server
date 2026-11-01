import { model, Schema } from "mongoose";

const productSchema = new Schema({
    // _id - אם לא כותבים נוצר אוטומטית
    name: String,
    price: Number,
    amount: Number,
    categories: [String], // מערך מחרוזות
});

const Product = model('Product', productSchema);
// הופך את שם הטבלה לרבים באותיות קטנות
// const Product = model('products', productSchema);

export default Product;
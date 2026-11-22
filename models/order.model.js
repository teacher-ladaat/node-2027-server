import { model, Schema, SchemaTypes } from "mongoose";

const orderSchema = new Schema({
    // _id
    date: Date,
    // totalPrice: Number,// שדה חישובי
    status: Boolean,

    // כל המוצרים שהוזמנו - לכל מוצר גם כמות
    products: [{
        _id: { type: SchemaTypes.ObjectId, ref: 'Product' },
        name: String, // SQL - ❌
        amount: Number,
        price: Number, // SQL - ✔️
    }],

    // לקוח
    user: { type: SchemaTypes.ObjectId, ref: 'User' }
});

const Order = model('Order', orderSchema);

export default Order;
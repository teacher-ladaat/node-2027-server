import { connect } from "mongoose";

export const connectDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/test';
        await connect(MONGO_URI);
        console.log('mongodb connected successfuly');
    } catch (error) {
        console.log('mongodb error', error.message);
    }
};
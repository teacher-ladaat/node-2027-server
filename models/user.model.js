// 'User'

import { model, Schema } from "mongoose";

const userSchema = new Schema({
    username: String,
    password: String,
    address: {
        num: Number,
        street: String,
        city: String
    }
});

const User = model('User', userSchema);

export default User;
import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    address: {
        num: Number,
        street: String,
        city: String
    }
});

// save, findByIdAndUpdate, updateOne, ...
userSchema.pre(['save', /update/i], async function () {
    // this - המשתמש שנשמר עכשיו בדטהבייס
    
    // TODO: לבדוק אם הסיסמא שונתה
    const salt = bcrypt.genSalt(+process.env.BCRYPT_ROUNDS);
    this.password = await bcrypt.hash(this.password, salt);

    // this בסיום הפונקציה ממשיך לשמירה בדטהבייס
});

const User = model('User', userSchema);

export default User;
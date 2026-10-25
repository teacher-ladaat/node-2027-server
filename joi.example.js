import Joi from 'joi';

const schema = Joi.object({
    username: Joi.string(). // מחרוזת
        alphanum(). // אותיות ומספרים
        lowercase(). // ממיר לאותיות קטנות
        min(3). // אורך מינימלי
        max(30). // אורך מקסימלי
        required(), // חובה
    password: Joi.string().
        pattern(/^[a-zA-Z0-9]{3,30}$/), // תבנית של מחרוזת
    repeat_password: Joi.ref('password'), // זהה לשדה סיסמא

    access_token: [Joi.string(), Joi.number()], // מחרוזת/מספר

    birth_year: Joi.number(). // מספר
        integer(). // שלם
        min(1900).max(2013), // טווח

    email: Joi.string().email({ // מייל תקין
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] }, // סיומת
    }),
})
    .with('username', 'birth_year')
    .xor('password', 'access_token')
    .with('password', 'repeat_password');

// ==========================================================
// value - ערך לאחר ההמרות אם הוא תקין
// error - השגיאה/השגיאות
// warning - אזהרות אם קיימות
const { error, value, warning } = schema.validate({ username: 'abc', birth_year: 1994 });
// -> { value: { username: 'abc', birth_year: 1994 } }

schema.validate({});
// -> { value: {}, error: '"username" is required' }

// Also -

try {
    const value = await schema.validateAsync({
        username: 'abc',
        birth_year: 1994,
    });
} catch (err) { }
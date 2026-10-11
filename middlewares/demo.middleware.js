/**
 * מידלוואר של הדפסה
 * @param {import("express").Request} req בקשה
 * @param {import("express").Response} res תגובה
 * @param {import("express").NextFunction} next פונקציה שמעבירה הלאה
 */
export const printHello = (req, res, next) => {
    console.log('hello middleware!!!!!!!!!');

    // שליחה למידלוואר הבא
    req.myUser = { username: 'admin', password: '1234' };
    next();

    // אם שולחים משהו לנקסט
    // יזרוק שגיאה
    // next('aaa', '1111');
};

/*
export const isAdmin = (req, res, next) => {
    // ללכת לדטהבייס ולשלוף לפי שם וסיסמא האם הוא מנהל
    if (req.isAdmin) {
        next();
    } else {
        res.status(401).json('אין הרשאה');
    }
};
*/
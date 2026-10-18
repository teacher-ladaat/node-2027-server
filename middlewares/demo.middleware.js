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


// middleware creator - פונקציה שיוצרת מידלוואר
// ומחזירה אותו
// ?איך נפעיל אותה
// נזמן את המידלוואר קריאטור ונשלח את הפרמטרים הרלוונטיים בסוגריים
export const blockHoursCreator = (fromHour = 0, toHour = 23) => {
    /**
     * חסימת השרת בשעות מסוימות
     * יהיה פתוח רק בין השעות שנשלחו
     * @param {import("express").Request} req בקשה
     * @param {import("express").Response} res תגובה
     * @param {import("express").NextFunction} next פונקציה שמעבירה הלאה
     */
    const mdl = (req, res, next) => {
        const now = new Date();
        if (now.getHours() >= fromHour && now.getHours() <= toHour) {
            next();
        } else {
            next({ msg: `Server is sleeping at ${now.getHours()}!`, type: 'block-server' })
            // res.status(500).json({ error: `Server is sleeping at ${now.getHours()}!` });
        }
    };

    return mdl;
};
/**
 * מידלוואר שמטפל בכל השגיאות
 * כדי שלכל השגיאות יהיה אותו פורמט
 * @param {{ status?: number, msg?: string, type?: string }} err השגיאה שנשלחה ע"י הפונקציה נקסט
 * @param {import("express").Request} req בקשה
 * @param {import("express").Response} res תגובה
 * @param {import("express").NextFunction} next פונקציה שמעבירה הלאה
 */
export const errorHandler = (err, req, res, next) => {
    const st = err.status ?? 500;
    const myError = {
        message: err.msg ?? 'Server Error',
        type: err.type ?? 'server-error'
    };

    return res.status(st).json({ error: myError })
};

export const URLNotFound = (req, res, next) => {
    next({ status: 404, msg: `${req.url} ${req.method} is not found!!!!!!`, type: 'path-not-found' })
};
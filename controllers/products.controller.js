const products = [
    { id: 1, name: 'milk', price: 5 },
    { id: 2, name: 'bread', price: 3 },
    { id: 3, name: 'cheese', price: 4.5 },
];

// .json intead of .send
// כי מקובל שהשרת מחזיר תמיד אוביקט
export const getAllProducts = (req, res, next) => {
    console.log(req.myUser);

    const x = req.query.startP;
    if (x) {
        res.json(products.filter(p => p.price >= x));
    }
    else {
        res.json(products);
    }
};

export const getProductById = (req, res, next) => {
    // console.log(req.params); // כך נקבל את הפרמטרים שנשלחו כאוביקט
    // הערכים מתקבלים כמחרוזות

    const p = products.find(product => product.id === +req.params.idx); // +המרת מחרוזת למספר

    if (p) {
        res.json(p);
    } else {
        // מחזיר סטטוס של שגיאה
        // res.status(404).json('product not found!');

        // במקום השורה שלעיל נשלח תמיד דרך הנקסט למידלוואר של השגיאות
        next({ status: 404, msg: `product ${req.params.idx} not found!`, type: 'resource-not-found' });
    }
};

export const addProduct = (req, res, next) => {
    if (!req.body.name || !req.body.price || !req.body.id)
        return next({ status: 409, msg: 'invalid body' });

    products.push(req.body);
    res.status(201).json(req.body);
};

export const updateProduct = (req, res, next) => {
    const index = products.findIndex(p => p.id === +req.params.id);

    if (index === -1) {
        return next({ status: 404, msg: `product ${req.params.idx} not found!`, type: 'resource-not-found' });
    }

    products[index] = req.body;
    res.json(req.body);
};

export const deleteProduct = (req, res, next) => {
    const index = products.findIndex(p => p.id === +req.params.id);

    if (index === -1) {
        return next({ status: 404, msg: `product ${req.params.idx} not found!`, type: 'resource-not-found' });
    }

    products.splice(index, 1); // מחיקת איבר אחד החל מהמקום האינדקס
    res.status(204).json();
};
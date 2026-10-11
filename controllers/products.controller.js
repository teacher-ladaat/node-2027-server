const products = [
    { id: 1, name: 'milk', price: 5 },
    { id: 2, name: 'bread', price: 3 },
    { id: 3, name: 'cheese', price: 4.5 },
];

export const getAllProducts = (req, res) => {
    const x = req.query.startP;
    if (x) {
        res.send(products.filter(p => p.price >= x));
    }
    else {
        res.send(products);
    }
};

export const getProductById = (req, res) => {
    // console.log(req.params); // כך נקבל את הפרמטרים שנשלחו כאוביקט
    // הערכים מתקבלים כמחרוזות

    const p = products.find(product => product.id === +req.params.idx); // +המרת מחרוזת למספר

    if (p) {
        res.send(p);
    } else {
        // מחזיר סטטוס של שגיאה
        res.status(404).send('product not found!');
    }
};

export const addProduct = (req, res) => {
    products.push(req.body);
    res.status(201).send(req.body);
};

export const updateProduct = (req, res) => {
    const index = products.findIndex(p => p.id === +req.params.id);
    products[index] = req.body;
    res.send(req.body);
};

export const deleteProduct = (req, res) => {
    const index = products.findIndex(p => p.id === +req.params.id);
    products.splice(index, 1); // מחיקת איבר אחד החל מהמקום האינדקס
    res.status(204).send();
};
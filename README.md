# קשרי גומלין במונגו
1. **references -** הפניות, קשר בין אוספים בדומה ל-SQL, מפתח זר שמתקשר למפתח ראשי
```js
userId: { type: SchemaTypes.ObjectId, ref: 'User' }
```

2. **embedded document -** מסמכים משובצים, האוביקט שנרצה לקשר ייכנס לתוך האוסף האחר. למשל: כתובת תיכנס לתוך האוסף של משתמשים.
```js
    new Schema({
        ...
        address: {
            num: Number,
            street: String,
            city: String
        }
        ...
    })
```

3. שילוב של 2 הדרכים שלעיל - את הפרטים שנפוץ לשלוף יחד, נשים באותה טבלה. ובשביל השאר - נשמור גם את האיי-די ונעשה ג'וין
```js
const orderSchema = new Schema({
    ...
    products: [{
        _id: SchemaTypes.ObjectId,
        name: String, // SQL - ❌
        amount: Number,
        price: Number, // SQL - ✔️
    }],
    ...
});
```
import { Router } from "express";

let count = 0;

const router = Router();

// GET
// http://localhost:4000/
// http://localhost:4000
router.get('/', (req, res) => {
    res.send('count: ' + count);
});

// POST
// http://localhost:4000/
// http://localhost:4000
router.post('/', (req, res) => {
    count++;
    res.send('success');
});

export default router;
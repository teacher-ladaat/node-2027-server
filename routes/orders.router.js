
import { Router } from "express";
import { addOrder, getOrderById } from "../controllers/orders.controller.js";

const router = Router();

router.get('/:id', getOrderById);

router.post('/', addOrder);

export default router;
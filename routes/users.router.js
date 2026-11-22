
import { Router } from "express";
import { getAllUsers, getProfile, login, register, updatePassword } from "../controllers/users.controller.js";

const router = Router();

// http://localhost:4000/users            GET
router.get('/', getAllUsers);

// http://localhost:4000/users/:id        GET
router.get('/:id', getProfile);

// http://localhost:4000/users            POST
router.post('/', register);

// http://localhost:4000/users/login      POST
router.post('/login', login);

// http://localhost:4000/users/:id        PATCH
router.patch('/:id', updatePassword);

export default router;
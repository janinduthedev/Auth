import express from 'express';
import { register, login } from '../controllers/AuthController.js';

const router = express.Router();

// Register route: /api/auth/register
router.post('/register', register);

// Login route: /api/auth/login
router.post('/login', login);

export default router;
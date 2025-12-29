import express from 'express';
import { register, login } from '../controllers/AuthController.js';
import { verifyToken } from '../middleware/AuthMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Private route to get user profile info
router.get('/me', verifyToken, (req, res) => {
    // Send back the user data saved in the token
    res.json({ user: req.user });
});

export default router;
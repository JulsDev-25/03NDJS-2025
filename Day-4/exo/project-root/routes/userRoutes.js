import express from 'express'
import { protect, admin } from '../middleware/authmiddleware.js';
import {registerUser, loginUser, me, getAllUsers, deleteUser} from '../controlleurs/userController.js'

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Route protégée
router.get('/me', protect, me);

// GET all users (protected)
router.get('/users', protect, admin, getAllUsers);

// DELETE user by ID (admin only)
router.delete('/users/:id', protect, admin, deleteUser);


export default router;